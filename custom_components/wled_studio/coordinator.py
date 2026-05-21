"""WLED Studio coordinator — HTTP catalog + live proxy per entry."""

from __future__ import annotations

import logging
from typing import Any

import aiohttp

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .attach import resolve_wled_entry
from .const import CONF_DEVICE_ID, CONF_HOST, CONF_WLED_CONFIG_ENTRY
from .layout_store import LayoutStore
from .live_proxy import LiveProxy, get_live_proxy, shutdown_live_proxy
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
        self._session: aiohttp.ClientSession | None = None
        self._master_entity_id: str | None = None
        self._segment_entities: list[dict[str, Any]] = []

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

    def _resolve_segment_entities(self) -> list[dict[str, Any]]:
        ent_reg = er.async_get(self.hass)
        segments: list[dict[str, Any]] = []
        for entity in ent_reg.entities.values():
            if entity.config_entry_id != self.wled_entry_id:
                continue
            if entity.domain != "light":
                continue
            eid = entity.entity_id
            if "_segment_" not in eid:
                continue
            suffix = eid.rsplit("_segment_", 1)[-1] if "_segment_" in eid else ""
            try:
                seg_num = int(suffix)
            except ValueError:
                seg_num = len(segments)
            segments.append(
                {
                    "entity_id": eid,
                    "segment_index": seg_num,
                    "wled_segment_id": seg_num,
                    "name": entity.name or entity.original_name or eid,
                }
            )
        segments.sort(key=lambda s: s["segment_index"])
        return segments

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

    async def async_shutdown(self) -> None:
        await shutdown_live_proxy(self.entry_id)
        if self._session:
            await self._session.close()
        self._session = None
        self.client = None
