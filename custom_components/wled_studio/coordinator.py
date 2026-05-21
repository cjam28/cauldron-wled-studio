"""Thin coordinator wrapper around stock WLED + Studio extras (Phase 1+)."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant


class WledStudioCoordinator:
    """Placeholder coordinator; expanded in Phase 1."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self.wled_entry_id: str = entry.data["wled_config_entry"]
