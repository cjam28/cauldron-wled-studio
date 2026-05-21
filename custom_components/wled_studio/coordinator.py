"""WLED Studio coordinator — HTTP catalog + live proxy per entry."""

from __future__ import annotations

import asyncio
import logging
from typing import Any

import aiohttp

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .attach import resolve_wled_entry
from .const import CONF_DEVICE_ID, CONF_HOST, CONF_WLED_CONFIG_ENTRY, DOMAIN
from .layout_store import LayoutStore
from .live_proxy import LiveProxy, get_live_proxy, shutdown_live_proxy
from .paint import PaintSession
from .thumb_capture import ThumbCaptureRunner
from .audiosync import AudioSyncListener
from .scene_expand import expand_scene_state
from .scene_seed import build_starter_scenes
from .scene_store import SceneRecord, SceneStore
from .wled_client import WledClient

_LOGGER = logging.getLogger(__name__)
WLED_DOMAIN = "wled"


class WledStudioCoordinator:
    """Per-entry coordinator wrapping WLED HTTP + live WS proxy."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self.entry_id = entry.entry_id
        self.wled_entry_id: str = entry.data[CONF_WLED_CONFIG_ENTRY]
        self.device_id: str | None = entry.data.get(CONF_DEVICE_ID)
        self.host: str = entry.data.get(CONF_HOST, "")
        self.title = entry.title or "WLED Studio"
        self.client: WledClient | None = None
        self.live_proxy: LiveProxy | None = None
        self.layout_store = LayoutStore(hass)
        self.scene_store = SceneStore(hass)
        self._session: aiohttp.ClientSession | None = None
        self._master_entity_id: str | None = None
        self._segment_entities: list[dict[str, Any]] = []
        self._scene_entities: dict[str, Any] = {}
        self._async_add_scenes: AddEntitiesCallback | None = None
        self._apply_abort: asyncio.Task[Any] | None = None
        self.paint_session: PaintSession | None = None
        self.thumb_runner: ThumbCaptureRunner | None = None
        self.audio_listener: AudioSyncListener | None = None

    async def async_setup(self) -> None:
        wled_entry = await resolve_wled_entry(self.hass, self.wled_entry_id)
        if wled_entry is None:
            raise RuntimeError("Parent WLED integration no longer exists")
        self.host = wled_entry.data.get("host", self.host)
        if not self.host:
            raise RuntimeError("WLED host unknown")

        self._session = aiohttp.ClientSession()
        self.client = WledClient(self.host, self._session)
        await self.client.bootstrap()
        self._master_entity_id = self._resolve_master_entity()
        self._segment_entities = self._resolve_segment_entities()
        self.live_proxy = get_live_proxy(self.entry_id, self.host, self._session)
        info = self.client.info if self.client else {}
        has_ar = bool(
            isinstance(info.get("u"), dict)
            and "AudioReactive" in str(info.get("u"))
        )
        audio_key = f"{DOMAIN}_audio_listener"
        existing = self.hass.data.get(audio_key)
        if has_ar:
            if existing is None:
                self.audio_listener = AudioSyncListener(self.hass, self.entry_id)
                await self.audio_listener.start()
                self.hass.data[audio_key] = self.audio_listener
            else:
                self.audio_listener = existing
        _LOGGER.info(
            "WLED Studio ready entry=%s host=%s master=%s",
            self.entry_id,
            self.host,
            self._master_entity_id,
        )

    def _resolve_master_entity(self) -> str | None:
        ent_reg = er.async_get(self.hass)
        candidates: list[str] = []
        for entity in ent_reg.entities.values():
            if entity.config_entry_id != self.wled_entry_id:
                continue
            if entity.domain != "light":
                continue
            eid = entity.entity_id
            if "_segment_" in eid:
                continue
            candidates.append(eid)
        if not candidates and self.device_id:
            for entity in er.async_entries_for_device(ent_reg, self.device_id):
                if entity.domain == "light" and "_segment_" not in entity.entity_id:
                    candidates.append(entity.entity_id)
        if candidates:
            return sorted(candidates)[0]
        for entity in ent_reg.entities.values():
            if entity.config_entry_id == self.wled_entry_id and entity.domain == "light":
                return entity.entity_id
        return None

    @staticmethod
    def _segment_id_from_entity(entity: er.RegistryEntry) -> int | None:
        """Map a stock WLED light entity to WLED segment id (``unique_id`` suffix)."""
        uid = entity.unique_id or ""
        if "_" in uid:
            try:
                return int(uid.rsplit("_", 1)[-1])
            except ValueError:
                pass
        eid = entity.entity_id
        if "_segment_" in eid:
            try:
                return int(eid.rsplit("_segment_", 1)[-1])
            except ValueError:
                return None
        return None

    def _resolve_segment_entities(self) -> list[dict[str, Any]]:
        ent_reg = er.async_get(self.hass)
        segments: list[dict[str, Any]] = []
        for entity in ent_reg.entities.values():
            if entity.config_entry_id != self.wled_entry_id:
                continue
            if entity.domain != "light":
                continue
            seg_num = self._segment_id_from_entity(entity)
            if seg_num is None:
                continue
            segments.append(
                {
                    "entity_id": entity.entity_id,
                    "segment_index": seg_num,
                    "wled_segment_id": seg_num,
                    "name": entity.name or entity.original_name or entity.entity_id,
                }
            )
        segments.sort(key=lambda s: s["segment_index"])
        return segments

    @property
    def device_info(self) -> dict[str, Any]:
        """Link scene entities to the stock WLED device."""
        dev_reg = dr.async_get(self.hass)
        if self.device_id and dev_reg:
            device = dev_reg.async_get(self.device_id)
            if device and device.identifiers:
                return {"identifiers": device.identifiers}
        return {"identifiers": {(DOMAIN, self.entry_id)}}

    def register_scene_platform(self, async_add_entities: AddEntitiesCallback) -> None:
        """Called from scene platform setup."""
        self._async_add_scenes = async_add_entities

    async def async_ensure_starter_scenes(self) -> None:
        """Seed eight starter scenes once per controller."""
        if self.client is None:
            return
        await self.scene_store.async_load()
        if self.scene_store.is_seeded(self.entry_id):
            return
        starters = build_starter_scenes(self.entry_id, self.client)
        await self.scene_store.async_save_many(starters)
        self.scene_store.mark_seeded(self.entry_id)
        for record in starters:
            await self.async_register_scene_entity(record)

    async def async_register_scene_entity(self, record: SceneRecord) -> None:
        """Add or update a scene.* entity after save."""
        from .scene import WledStudioStoredScene

        existing = self._scene_entities.get(record.id)
        if existing is not None:
            existing.update_record(record)
            self.hass.async_create_task(existing.async_update_ha_state())
            return
        if self._async_add_scenes is None:
            return
        entity = WledStudioStoredScene(self, record)
        self._scene_entities[record.id] = entity
        self._async_add_scenes([entity])

    async def async_remove_scene_entity(self, scene_id: str) -> None:
        entity = self._scene_entities.pop(scene_id, None)
        if entity is not None:
            await entity.async_remove()

    def transition_tt(self, transition_ms: int | None, scene: SceneRecord) -> int:
        """WLED tt field: tenths of a second."""
        ms = transition_ms if transition_ms is not None else scene.transition_ms
        return max(0, min(255, ms // 100))

    async def async_apply_scene(
        self,
        scene_id: str,
        *,
        transition_ms: int | None = None,
        segment_ids: list[int] | None = None,
    ) -> dict[str, Any]:
        """Apply stored state with device-side crossfade (tt)."""
        if self.client is None:
            raise RuntimeError("WLED client not ready")
        scene = await self.scene_store.async_get(self.entry_id, scene_id)
        if scene is None:
            raise ValueError(f"Unknown scene {scene_id}")

        await self.client.get_state(refresh=True)
        live_segs = self.client.state.get("seg")
        if not isinstance(live_segs, list):
            live_segs = []
        patch = expand_scene_state(
            scene.wled_state,
            live_segs,
            target_ids=segment_ids,
        )
        patch["tt"] = self.transition_tt(transition_ms, scene)

        async def _run() -> dict[str, Any]:
            result = await self.client.apply_state(patch, full_response=True)
            return result or self.client.state

        self._apply_abort = asyncio.create_task(_run())
        try:
            return await self._apply_abort
        finally:
            if self._apply_abort and self._apply_abort.done():
                self._apply_abort = None

    @property
    def master_entity_id(self) -> str | None:
        return self._master_entity_id

    def controller_info(self) -> dict[str, Any]:
        info = self.client.info if self.client else {}
        leds = info.get("leds") or {}
        return {
            "entry_id": self.entry_id,
            "controller_id": self.entry_id,
            "title": self.title,
            "host": self.host,
            "mac": info.get("mac"),
            "pixel_count": leds.get("count", 0),
            "fxcount": info.get("fxcount", 0),
            "palcount": info.get("palcount", 0),
            "fw_ver": self.client.fw_ver if self.client else "",
            "master_entity_id": self._master_entity_id,
            "segment_entities": self._segment_entities,
            "has_ar": bool(
                isinstance(info.get("u"), dict)
                and "AudioReactive" in str(info.get("u"))
            ),
        }

    def get_paint_session(self) -> PaintSession:
        if self.client is None:
            raise RuntimeError("WLED client not ready")
        if self.paint_session is None:
            self.paint_session = PaintSession(self.host, self.client)
        return self.paint_session

    def get_thumb_runner(self) -> ThumbCaptureRunner:
        if self.thumb_runner is None:
            self.thumb_runner = ThumbCaptureRunner(self.hass, self)
        return self.thumb_runner

    async def async_shutdown(self) -> None:
        if self._apply_abort and not self._apply_abort.done():
            self._apply_abort.cancel()
        if self.thumb_runner and self.thumb_runner.running:
            self.thumb_runner.cancel()
        if self.paint_session:
            await self.paint_session.stop()
            self.paint_session = None
        audio_key = f"{DOMAIN}_audio_listener"
        if self.audio_listener and self.hass.data.get(audio_key) is self.audio_listener:
            await self.audio_listener.stop()
            self.hass.data.pop(audio_key, None)
        self.audio_listener = None
        await self.scene_store.async_flush()
        await shutdown_live_proxy(self.entry_id)
        if self._session:
            await self._session.close()
        self._session = None
        self.client = None
