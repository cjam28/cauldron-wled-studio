"""HA Store persistence for per-controller layouts."""

from __future__ import annotations

import uuid
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, STORAGE_VERSION
from .geometry import Layout

STORAGE_KEY = f"{DOMAIN}.layouts"


class LayoutStore:
    """CRUD for layouts keyed by controller entry_id."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY)

    async def async_load_all(self) -> dict[str, dict[str, Any]]:
        data = await self._store.async_load() or {}
        layouts = data.get("layouts")
        if isinstance(layouts, dict):
            return layouts
        return {}

    async def async_get(self, controller_id: str, layout_id: str) -> Layout | None:
        all_layouts = await self.async_load_all()
        bucket = all_layouts.get(controller_id) or {}
        raw = bucket.get(layout_id)
        if not isinstance(raw, dict):
            return None
        return Layout.from_dict(raw)

    async def async_list(self, controller_id: str) -> list[Layout]:
        all_layouts = await self.async_load_all()
        bucket = all_layouts.get(controller_id) or {}
        out: list[Layout] = []
        for raw in bucket.values():
            if isinstance(raw, dict):
                out.append(Layout.from_dict(raw))
        return out

    async def async_save(self, layout: Layout) -> Layout:
        all_layouts = await self.async_load_all()
        bucket = dict(all_layouts.get(layout.controller_id) or {})
        layout.etag = str(uuid.uuid4())
        bucket[layout.id] = layout.to_dict()
        all_layouts[layout.controller_id] = bucket
        await self._store.async_save({"layouts": all_layouts})
        return layout
