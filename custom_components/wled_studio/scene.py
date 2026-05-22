"""HA scene entities for saved WLED Studio looks."""

from __future__ import annotations

import logging

from homeassistant.components.scene import Scene
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import WledStudioCoordinator
from .scene_store import SceneRecord
from .wled_client import is_client_unavailable

_LOGGER = logging.getLogger(__name__)


class WledStudioStoredScene(Scene):
    """Activates a stored WLED state snapshot with device-side crossfade."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: WledStudioCoordinator, record: SceneRecord) -> None:
        self.coordinator = coordinator
        self.record = record
        self._attr_name = record.name
        self._attr_unique_id = f"{record.controller_id}_{record.id}"
        if coordinator.device_info:
            self._attr_device_info = coordinator.device_info

    def update_record(self, record: SceneRecord) -> None:
        """Refresh after save from panel."""
        self.record = record
        self._attr_name = record.name

    async def async_activate(self, **kwargs: object) -> None:
        transition = kwargs.get("transition")
        transition_ms = None
        if isinstance(transition, (int, float)):
            transition_ms = int(transition * 1000)
        try:
            await self.coordinator.async_apply_scene(
                self.record.id, transition_ms=transition_ms
            )
        except Exception as err:
            if is_client_unavailable(err):
                _LOGGER.debug(
                    "Scene %s activate skipped: client unavailable", self.record.id
                )
                return
            raise


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Register scene entities for all stored scenes on this controller."""
    coord: WledStudioCoordinator = hass.data[DOMAIN][entry.entry_id]
    coord.register_scene_platform(async_add_entities)
    await coord.async_ensure_starter_scenes()
    scenes = await coord.scene_store.async_list(entry.entry_id)
    async_add_entities(
        [WledStudioStoredScene(coord, s) for s in scenes],
        update_before_add=True,
    )
    _LOGGER.debug(
        "Registered %s WLED Studio scene(s) for %s",
        len(scenes),
        entry.entry_id,
    )
