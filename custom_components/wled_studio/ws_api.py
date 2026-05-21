"""Home Assistant WebSocket API for wled_studio/* commands."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN, SCHEMA_VERSION


def _check_schema(msg: dict[str, Any]) -> dict[str, Any] | None:
    """Validate schema_version on inbound WS commands."""
    version = msg.get("schema_version", SCHEMA_VERSION)
    if version != SCHEMA_VERSION:
        return {
            "error": {
                "code": "schema_mismatch",
                "message": f"Expected schema_version {SCHEMA_VERSION}, got {version}",
                "reload_required": True,
            }
        }
    return None


@callback
def async_register_ws_api(hass: HomeAssistant) -> None:
    """Register wled_studio WebSocket commands."""

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
        if err := _check_schema(msg):
            connection.send_error(msg["id"], "schema_mismatch", err["error"]["message"])
            return
        connection.send_result(
            msg["id"], {"ok": True, "schema_version": SCHEMA_VERSION}
        )
