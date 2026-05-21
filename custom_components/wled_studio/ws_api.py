"""Home Assistant WebSocket API for wled_studio/* commands."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN, SCHEMA_VERSION

_LOGGER = logging.getLogger(__name__)

_WS_REGISTERED_KEY = f"{DOMAIN}_ws_api_registered"


def _check_schema(msg: dict[str, Any]) -> bool:
    version = msg.get("schema_version", SCHEMA_VERSION)
    return version == SCHEMA_VERSION


def _get_coordinator(hass: HomeAssistant, entry_id: str):
    coord = hass.data.get(DOMAIN, {}).get(entry_id)
    return coord


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/ping",
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_ping(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    connection.send_result(
        msg["id"], {"ok": True, "schema_version": SCHEMA_VERSION}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/list_controllers",
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_list_controllers(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    controllers = [
        c.controller_info()
        for c in hass.data.get(DOMAIN, {}).values()
        if hasattr(c, "controller_info")
    ]
    _LOGGER.debug(
        "list_controllers returned %s controller(s): %s",
        len(controllers),
        [c.get("entry_id") for c in controllers],
    )
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "controllers": controllers,
            "schema_version": SCHEMA_VERSION,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/get_state",
        vol.Required("controller_id"): str,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_get_state(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None:
        connection.send_error(
            msg["id"], "not_found", f"Unknown controller {msg['controller_id']}"
        )
        return
    client = coord.client
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "info": client.info if client else {},
            "effects_by_name": client.effects_by_name if client else {},
            "palettes_by_name": client.palettes_by_name if client else {},
            "sound_flags": client.sound_flags if client else [],
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/subscribe_live",
        vol.Required("controller_id"): str,
        vol.Optional("remote", default=False): bool,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_subscribe_live(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None:
        connection.send_error(
            msg["id"], "not_found", f"Unknown controller {msg['controller_id']}"
        )
        return
    proxy = coord.live_proxy

    @callback
    def forward_frame(frame: dict[str, Any]) -> None:
        connection.send_message(
            {
                "id": msg["id"],
                "type": "event",
                "event": {
                    "type": "wled_studio_live_frame",
                    "data": frame,
                },
            }
        )

    unsub = proxy.subscribe(forward_frame, remote=msg.get("remote", False))

    @callback
    def on_close() -> None:
        unsub()

    connection.subscriptions[msg["id"]] = on_close
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "subscription_id": msg["id"],
        },
    )


_WS_HANDLERS = (ws_ping, ws_list_controllers, ws_get_state, ws_subscribe_live)


@callback
def async_register_ws_api(hass: HomeAssistant) -> None:
    """Register wled_studio WebSocket commands with Home Assistant."""
    if hass.data.get(_WS_REGISTERED_KEY):
        return
    for handler in _WS_HANDLERS:
        websocket_api.async_register_command(hass, handler)
    hass.data[_WS_REGISTERED_KEY] = True
    _LOGGER.debug("Registered %s websocket commands", len(_WS_HANDLERS))
