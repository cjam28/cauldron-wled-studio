"""Auto-register Lovelace resources for the WLED Studio card (storage mode)."""

from __future__ import annotations

import logging
import re
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_call_later

from .const import STATIC_URL_PREFIX

_LOGGER = logging.getLogger(__name__)

CARD_FILENAME = "wled-studio-card.js"
RESOURCE_PATH = f"{STATIC_URL_PREFIX}/{CARD_FILENAME}"


def resource_hacstag(version: str) -> str:
    """Digits-only tag (same idea as HACS plugin hacstag) for cache busting."""
    return re.sub(r"\D+", "", version) or "0"


def card_resource_url(version: str) -> str:
    return f"{RESOURCE_PATH}?hacstag={resource_hacstag(version)}"


def _lovelace_resource_mode(lovelace: object) -> str | None:
    """HA 2026.2+ uses resource_mode; older builds used mode."""
    mode = getattr(lovelace, "resource_mode", None)
    if mode is not None:
        return str(mode)
    legacy = getattr(lovelace, "mode", None)
    return str(legacy) if legacy is not None else None


def _lovelace_resources(hass: HomeAssistant):
    """Return ResourceStorageCollection when Lovelace uses storage mode."""
    lovelace_data = hass.data.get("lovelace")
    if lovelace_data is None:
        return None

    resources = (
        lovelace_data.resources
        if hasattr(lovelace_data, "resources")
        else lovelace_data.get("resources")
    )
    if resources is None:
        return None
    store = getattr(resources, "store", None)
    if store is None or getattr(store, "key", None) != "lovelace_resources":
        return None
    return resources


async def async_register_lovelace_resources(hass: HomeAssistant, version: str) -> None:
    """Add or update the card module in dashboard resources."""
    lovelace = hass.data.get("lovelace")
    if lovelace is None:
        _LOGGER.debug("Lovelace not ready; card resource registration deferred")
        return

    resource_mode = _lovelace_resource_mode(lovelace)
    if resource_mode == "yaml":
        _LOGGER.info(
            "Lovelace resource_mode=yaml: add this resource manually: %s",
            card_resource_url(version),
        )
        return

    url = card_resource_url(version)

    async def _register(_now: Any | None = None) -> None:
        resources = _lovelace_resources(hass)
        if resources is None:
            _LOGGER.debug("Lovelace resources not available yet, retrying in 5s")
            async_call_later(hass, 5, _register)
            return

        if not resources.loaded:
            await resources.async_load()

        for entry in resources.async_items():
            entry_url = entry.get("url", "")
            if not entry_url.startswith(STATIC_URL_PREFIX):
                continue
            if entry_url != url:
                _LOGGER.info(
                    "Updating WLED Studio Lovelace resource: %s -> %s",
                    entry_url,
                    url,
                )
                await resources.async_update_item(
                    entry["id"],
                    {"res_type": "module", "url": url},
                )
            return

        _LOGGER.info("Adding WLED Studio Lovelace resource: %s", url)
        await resources.async_create_item({"res_type": "module", "url": url})

    await _register()


async def async_remove_lovelace_resources(hass: HomeAssistant) -> None:
    """Remove card resources when the integration is fully unloaded."""
    resources = _lovelace_resources(hass)
    if resources is None:
        return
    if not resources.loaded:
        await resources.async_load()

    for entry in resources.async_items():
        if entry.get("url", "").startswith(STATIC_URL_PREFIX):
            _LOGGER.info("Removing WLED Studio Lovelace resource: %s", entry["url"])
            await resources.async_delete_item(entry["id"])
