"""Attach WLED Studio to stock WLED integration config entries."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

WLED_DOMAIN = "wled"


async def resolve_wled_entry(
    hass: HomeAssistant, wled_entry_id: str
) -> ConfigEntry | None:
    """Return the stock WLED config entry if it still exists."""
    entry = hass.config_entries.async_get_entry(wled_entry_id)
    if entry is None or entry.domain != WLED_DOMAIN:
        return None
    return entry


async def get_wled_entries(hass: HomeAssistant) -> list[ConfigEntry]:
    """List all configured stock WLED integrations."""
    return [
        entry
        for entry in hass.config_entries.async_entries(WLED_DOMAIN)
        if entry.state is not None
    ]
