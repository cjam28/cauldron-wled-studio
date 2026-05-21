"""Home Assistant WebSocket API for wled_studio/* commands."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN, SCHEMA_VERSION
from .geometry import Layout, resolve_led_positions

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
    if client:
        await client.get_state(refresh=True)
    state = client.state if client else {}
    seg = state.get("seg") if isinstance(state.get("seg"), list) else []
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "info": client.info if client else {},
            "state": state,
            "segments": seg,
            "effects_by_name": client.effects_by_name if client else {},
            "palettes_by_name": client.palettes_by_name if client else {},
            "sound_flags": client.sound_flags if client else [],
            "fxdata": client.fxdata if client else "",
            "led_order": client.led_bus_order() if client else 0,
            "segment_entities": coord._segment_entities,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/apply_state",
        vol.Required("controller_id"): str,
        vol.Required("state"): dict,
        vol.Optional("full_response", default=False): bool,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_apply_state(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None or coord.client is None:
        connection.send_error(
            msg["id"], "not_found", f"Unknown controller {msg['controller_id']}"
        )
        return
    try:
        result = await coord.client.apply_state(
            msg["state"],
            full_response=msg.get("full_response", False),
        )
    except Exception as err:
        connection.send_error(msg["id"], "wled_error", str(err))
        return
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "state": result or coord.client.state,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/get_presets",
        vol.Required("controller_id"): str,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_get_presets(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None or coord.client is None:
        connection.send_error(
            msg["id"], "not_found", f"Unknown controller {msg['controller_id']}"
        )
        return
    presets = await coord.client.get_presets()
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "presets": presets,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/effect_meta",
        vol.Required("controller_id"): str,
        vol.Required("effect_id"): int,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_effect_meta(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None or coord.client is None:
        connection.send_error(
            msg["id"], "not_found", f"Unknown controller {msg['controller_id']}"
        )
        return
    meta = coord.client.effect_meta(msg["effect_id"])
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "meta": meta,
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


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/layout_list",
        vol.Required("controller_id"): str,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_layout_list(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None:
        connection.send_error(msg["id"], "not_found", "Unknown controller")
        return
    layouts = await coord.layout_store.async_list(msg["controller_id"])
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "layouts": [lay.to_dict() for lay in layouts],
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/layout_save",
        vol.Required("controller_id"): str,
        vol.Required("layout"): dict,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_layout_save(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None:
        connection.send_error(msg["id"], "not_found", "Unknown controller")
        return
    raw = dict(msg["layout"])
    raw["controller_id"] = msg["controller_id"]
    layout = Layout.from_dict(raw)
    saved = await coord.layout_store.async_save(layout)
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "layout": saved.to_dict(),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "wled_studio/layout_resolve_positions",
        vol.Required("controller_id"): str,
        vol.Required("fixture_id"): str,
        vol.Optional("layout_id"): str,
        vol.Optional("schema_version", default=SCHEMA_VERSION): int,
    }
)
@websocket_api.async_response
async def ws_layout_resolve(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    if not _check_schema(msg):
        connection.send_error(msg["id"], "schema_mismatch", "Reload to update")
        return
    coord = _get_coordinator(hass, msg["controller_id"])
    if coord is None:
        connection.send_error(msg["id"], "not_found", "Unknown controller")
        return
    layout_id = msg.get("layout_id")
    fixture_id = msg["fixture_id"]
    layout = None
    if layout_id:
        layout = await coord.layout_store.async_get(msg["controller_id"], layout_id)
    if layout is None:
        layouts = await coord.layout_store.async_list(msg["controller_id"])
        layout = layouts[0] if layouts else None
    if layout is None:
        connection.send_error(msg["id"], "not_found", "No layout saved")
        return
    fixture = next((f for f in layout.fixtures if f.id == fixture_id), None)
    if fixture is None:
        connection.send_error(msg["id"], "not_found", "Fixture not found")
        return
    positions = resolve_led_positions(fixture, layout.pixel_count)
    connection.send_result(
        msg["id"],
        {
            "ok": True,
            "schema_version": SCHEMA_VERSION,
            "positions": [
                {"x": x, "y": y, "led": led} for x, y, led in positions
            ],
        },
    )


_WS_HANDLERS = (
    ws_ping,
    ws_list_controllers,
    ws_get_state,
    ws_apply_state,
    ws_get_presets,
    ws_effect_meta,
    ws_layout_list,
    ws_layout_save,
    ws_layout_resolve,
    ws_subscribe_live,
)


@callback
def async_register_ws_api(hass: HomeAssistant) -> None:
    """Register wled_studio WebSocket commands with Home Assistant."""
    if hass.data.get(_WS_REGISTERED_KEY):
        return
    for handler in _WS_HANDLERS:
        websocket_api.async_register_command(hass, handler)
    hass.data[_WS_REGISTERED_KEY] = True
    _LOGGER.debug("Registered %s websocket commands", len(_WS_HANDLERS))
