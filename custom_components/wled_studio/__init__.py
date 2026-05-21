"""WLED Studio — companion integration attaching to stock WLED."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType

from .const import (
    DOMAIN,
    INTEGRATION_VERSION,
    PANEL_MODULE,
    PANEL_URL_PATH,
    STATIC_URL_PREFIX,
)
from .coordinator import WledStudioCoordinator
from .lovelace_resources import (
    async_register_lovelace_resources,
    async_remove_lovelace_resources,
    card_resource_url,
    resource_hacstag,
)
from .ws_api import async_register_ws_api

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = []


async def _async_register_frontend(hass: HomeAssistant) -> None:
    """Register static JS bundle and sidebar panel (idempotent)."""
    if hass.data.get(f"{DOMAIN}_frontend_registered"):
        return

    integration_dir = Path(__file__).parent
    www_dir = integration_dir / "www"
    www_dir.mkdir(parents=True, exist_ok=True)

    card_bundle = www_dir / "wled-studio-card.js"
    panel_bundle = www_dir / "wled-studio-panel.js"
    if not card_bundle.is_file() or not panel_bundle.is_file():
        _LOGGER.warning(
            "WLED Studio bundles missing in %s — run: cd frontend && npm run build",
            www_dir,
        )

    version = INTEGRATION_VERSION
    prev_version = hass.data.get(f"{DOMAIN}_frontend_version")
    if str(prev_version or "") != version:
        hass.data.pop(f"{DOMAIN}_frontend_registered", None)

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                STATIC_URL_PREFIX,
                str(www_dir),
                cache_headers=False,
            )
        ]
    )

    card_url = card_resource_url(version)
    tag = resource_hacstag(version)
    panel_url = f"{STATIC_URL_PREFIX}/wled-studio-panel.js?hacstag={tag}"

    from homeassistant.components import frontend

    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title="WLED Studio",
        sidebar_icon="mdi:led-strip-variant",
        frontend_url_path=PANEL_URL_PATH,
        config={
            "_panel_custom": {
                "name": PANEL_MODULE,
                "module_url": panel_url,
                "embed_iframe": False,
                "require_admin": False,
            }
        },
        require_admin=False,
    )

    # Do not use add_extra_js_url — loading the same card bundle twice causes
    # duplicate customElements.define and breaks the Lovelace card editor.

    hass.data[f"{DOMAIN}_frontend_registered"] = True
    hass.data[f"{DOMAIN}_frontend_version"] = version
    try:
        await async_register_lovelace_resources(hass, version)
    except Exception:  # noqa: BLE001
        _LOGGER.exception(
            "Lovelace resource registration failed; card JS is still at %s",
            STATIC_URL_PREFIX,
        )
    _LOGGER.debug(
        "WLED Studio frontend card=%s panel=%s",
        card_url,
        panel_url,
    )


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up WLED Studio domain."""
    await _async_register_frontend(hass)
    async_register_ws_api(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up WLED Studio from a config entry."""
    await _async_register_frontend(hass)
    async_register_ws_api(hass)
    coordinator = WledStudioCoordinator(hass, entry)
    await coordinator.async_setup()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = coordinator
    entry.async_on_unload(coordinator.async_shutdown)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    if unload_ok := await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        coord = hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
        if coord is not None:
            await coord.async_shutdown()
        if not hass.data.get(DOMAIN):
            from .ws_api import _WS_REGISTERED_KEY

            hass.data.pop(_WS_REGISTERED_KEY, None)
            await async_remove_lovelace_resources(hass)
    return unload_ok
