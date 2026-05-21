"""Notification flash service — brief DDP flash then restore."""

from __future__ import annotations

import asyncio
import logging
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN
from .ddp import build_ddp_packets

_LOGGER = logging.getLogger(__name__)

SERVICE_NOTIFY = "notify"

SCHEMA_NOTIFY = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
        vol.Optional("color", default="#ffffff"): cv.string,
        vol.Optional("count", default=3): vol.All(vol.Coerce(int), vol.Range(1, 20)),
        vol.Optional("duration_ms", default=400): vol.All(
            vol.Coerce(int), vol.Range(50, 5000)
        ),
        vol.Optional("restore", default=True): cv.boolean,
    }
)


def _hex_to_rgbw(hex_color: str, rgbw: bool) -> bytes:
    h = hex_color.lstrip("#")
    if len(h) < 6:
        h = "ffffff"
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    if rgbw:
        return bytes([r, g, b, 0])
    return bytes([r, g, b])


async def _flash_ddp(host: str, pixel_count: int, color: bytes, rgbw: bool) -> None:
    bpp = len(color)
    payload = color * pixel_count if bpp else b""
    packets = build_ddp_packets(payload, rgbw=rgbw)
    loop = asyncio.get_running_loop()
    transport, _ = await loop.create_datagram_endpoint(
        asyncio.DatagramProtocol,
        local_addr=("0.0.0.0", 0),
        family=2,
    )
    try:
        for pkt in packets:
            transport.sendto(pkt, (host, 4048))
    finally:
        transport.close()


async def async_setup_services(hass: HomeAssistant) -> None:
    """Register wled_studio.notify."""

    async def handle_notify(call: ServiceCall) -> None:
        entity_id = call.data["entity_id"]
        ent = hass.states.get(entity_id)
        if ent is None:
            _LOGGER.warning("notify: unknown entity %s", entity_id)
            return
        entry_id = ent.attributes.get("wled_studio_entry_id")
        if not entry_id:
            for coord in hass.data.get(DOMAIN, {}).values():
                if getattr(coord, "client", None) and coord._master_entity_id == entity_id:
                    entry_id = coord.entry_id
                    break
        coord = hass.data.get(DOMAIN, {}).get(entry_id) if entry_id else None
        if coord is None or coord.client is None:
            _LOGGER.warning("notify: no coordinator for %s", entity_id)
            return
        client = coord.client
        await client.get_state(refresh=True)
        saved = dict(client.state) if call.data.get("restore", True) else None
        leds = client.info.get("leds") or {}
        pixel_count = int(leds.get("count") or 210)
        rgbw = bool(leds.get("rgbw", True))
        color = _hex_to_rgbw(str(call.data.get("color", "#ffffff")), rgbw)
        count = int(call.data["count"])
        duration_ms = int(call.data["duration_ms"])
        for _ in range(count):
            await _flash_ddp(coord.host, pixel_count, color, rgbw)
            await asyncio.sleep(duration_ms / 1000.0)
        if saved:
            await client.apply_state(saved)

    hass.services.async_register(
        DOMAIN,
        SERVICE_NOTIFY,
        handle_notify,
        schema=SCHEMA_NOTIFY,
    )


async def async_unload_services(hass: HomeAssistant) -> None:
    hass.services.async_remove(DOMAIN, SERVICE_NOTIFY)
