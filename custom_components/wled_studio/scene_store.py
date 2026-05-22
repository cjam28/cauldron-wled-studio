"""HA Store persistence for per-controller WLED Studio scenes."""

from __future__ import annotations

import asyncio
import logging
import uuid
from dataclasses import asdict, dataclass, field
from datetime import UTC, datetime
from typing import Any, Callable

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store

from .const import DOMAIN, STORAGE_VERSION

_LOGGER = logging.getLogger(__name__)

STORAGE_KEY = f"{DOMAIN}.scenes"
SAVE_DELAY_SEC = 2.0


@dataclass
class SceneRecord:
    """Saved look — full or partial WLED /json/state snapshot."""

    id: str
    controller_id: str
    name: str
    wled_state: dict[str, Any] = field(default_factory=dict)
    layout_id: str | None = None
    transition_ms: int = 2500
    etag: str = ""
    seeded: bool = False
    preview_url: str | None = None
    updated_at: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> SceneRecord:
        return cls(
            id=str(data.get("id", "")),
            controller_id=str(data.get("controller_id", "")),
            name=str(data.get("name", "Scene")),
            wled_state=dict(data.get("wled_state") or {}),
            layout_id=data.get("layout_id"),
            transition_ms=int(data.get("transition_ms", 2500)),
            etag=str(data.get("etag", "")),
            seeded=bool(data.get("seeded", False)),
            preview_url=data.get("preview_url"),
            updated_at=str(data.get("updated_at", "")),
        )


class SceneStore:
    """CRUD for scenes keyed by controller entry_id."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._data: dict[str, Any] | None = None
        self._save_task: asyncio.Task[None] | None = None
        self._listeners: list[Callable[[str], None]] = []

    @callback
    def async_add_listener(self, listener: Callable[[str], None]) -> Callable[[], None]:
        """Notify when scenes for a controller change."""

        self._listeners.append(listener)

        @callback
        def remove() -> None:
            if listener in self._listeners:
                self._listeners.remove(listener)

        return remove

    def _notify(self, controller_id: str) -> None:
        for listener in self._listeners:
            try:
                listener(controller_id)
            except Exception:  # noqa: BLE001
                _LOGGER.exception("Scene store listener failed")

    async def async_load(self) -> dict[str, Any]:
        if self._data is None:
            loaded = await self._store.async_load() or {}
            self._data = {
                "meta": loaded.get("meta") if isinstance(loaded.get("meta"), dict) else {},
                "scenes": loaded.get("scenes")
                if isinstance(loaded.get("scenes"), dict)
                else {},
            }
        return self._data

    def _schedule_save(self) -> None:
        if self._save_task and not self._save_task.done():
            self._save_task.cancel()

        async def _delayed() -> None:
            await asyncio.sleep(SAVE_DELAY_SEC)
            data = self._data
            if data is not None:
                await self._store.async_save(data)

        self._save_task = self._hass.async_create_task(_delayed())

    async def async_flush(self) -> None:
        """Persist immediately (e.g. on unload)."""
        if self._save_task and not self._save_task.done():
            self._save_task.cancel()
            self._save_task = None
        if self._data is not None:
            await self._store.async_save(self._data)

    def _bucket(self, controller_id: str) -> dict[str, Any]:
        assert self._data is not None
        scenes = self._data.setdefault("scenes", {})
        if controller_id not in scenes or not isinstance(scenes[controller_id], dict):
            scenes[controller_id] = {}
        return scenes[controller_id]

    def is_seeded(self, controller_id: str) -> bool:
        assert self._data is not None
        meta = self._data.setdefault("meta", {})
        seeded = meta.get("seeded_controllers")
        return isinstance(seeded, list) and controller_id in seeded

    def mark_seeded(self, controller_id: str) -> None:
        assert self._data is not None
        meta = self._data.setdefault("meta", {})
        seeded = meta.setdefault("seeded_controllers", [])
        if controller_id not in seeded:
            seeded.append(controller_id)
        self._schedule_save()

    def get_starter_revision(self, controller_id: str) -> int:
        assert self._data is not None
        meta = self._data.setdefault("meta", {})
        revs = meta.get("starter_revision")
        if not isinstance(revs, dict):
            return 0
        return int(revs.get(controller_id, 0))

    def set_starter_revision(self, controller_id: str, revision: int) -> None:
        assert self._data is not None
        meta = self._data.setdefault("meta", {})
        revs = meta.setdefault("starter_revision", {})
        if not isinstance(revs, dict):
            meta["starter_revision"] = {}
            revs = meta["starter_revision"]
        revs[controller_id] = int(revision)
        self._schedule_save()

    async def async_list(self, controller_id: str) -> list[SceneRecord]:
        await self.async_load()
        bucket = self._bucket(controller_id)
        out: list[SceneRecord] = []
        for raw in bucket.values():
            if isinstance(raw, dict):
                out.append(SceneRecord.from_dict(raw))
        out.sort(key=lambda s: (not s.seeded, s.name.lower()))
        return out

    async def async_get(
        self, controller_id: str, scene_id: str
    ) -> SceneRecord | None:
        await self.async_load()
        raw = self._bucket(controller_id).get(scene_id)
        if not isinstance(raw, dict):
            return None
        return SceneRecord.from_dict(raw)

    async def async_save(
        self,
        scene: SceneRecord,
        *,
        if_match_etag: str | None = None,
    ) -> SceneRecord:
        """Save scene; optional optimistic concurrency via etag."""
        await self.async_load()
        bucket = self._bucket(scene.controller_id)
        existing_raw = bucket.get(scene.id)
        if if_match_etag and isinstance(existing_raw, dict):
            current_etag = str(existing_raw.get("etag", ""))
            if current_etag and current_etag != if_match_etag:
                raise SceneConflictError(
                    SceneRecord.from_dict(existing_raw), current_etag
                )
        scene.etag = str(uuid.uuid4())
        scene.updated_at = datetime.now(UTC).isoformat()
        bucket[scene.id] = scene.to_dict()
        self._schedule_save()
        self._notify(scene.controller_id)
        return scene

    async def async_delete(self, controller_id: str, scene_id: str) -> bool:
        await self.async_load()
        bucket = self._bucket(controller_id)
        if scene_id not in bucket:
            return False
        del bucket[scene_id]
        self._schedule_save()
        self._notify(controller_id)
        return True

    async def async_save_many(self, scenes: list[SceneRecord]) -> list[SceneRecord]:
        """Bulk save without per-item etag checks (seeding)."""
        await self.async_load()
        saved: list[SceneRecord] = []
        for scene in scenes:
            scene.etag = str(uuid.uuid4())
            scene.updated_at = datetime.now(UTC).isoformat()
            self._bucket(scene.controller_id)[scene.id] = scene.to_dict()
            saved.append(scene)
        if saved:
            self._schedule_save()
            self._notify(saved[0].controller_id)
        return saved


class SceneConflictError(Exception):
    """Raised when if_match_etag does not match stored scene."""

    def __init__(self, remote: SceneRecord, etag: str) -> None:
        self.remote = remote
        self.etag = etag
        super().__init__(f"Scene etag mismatch (remote {etag})")
