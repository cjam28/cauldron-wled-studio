"""UDP AudioReactive audiosync v2 listener (port 11988)."""

from __future__ import annotations

import asyncio
import logging
import struct
from typing import TYPE_CHECKING, Any

from .const import DOMAIN

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

AUDIOSYNC_PORT = 11988
PACKET_SIZE = 44


class AudioSyncListener:
    """Rate-limited broadcast of FFT bins to HA event bus."""

    def __init__(self, hass: HomeAssistant, entry_id: str) -> None:
        self.hass = hass
        self.entry_id = entry_id
        self._transport: asyncio.DatagramTransport | None = None
        self._last_emit = 0.0
        self._latest: dict[str, Any] = {}

    async def start(self) -> None:
        if self._transport:
            return
        loop = asyncio.get_running_loop()

        class _Proto(asyncio.DatagramProtocol):
            def __init__(self, outer: AudioSyncListener) -> None:
                self.outer = outer

            def datagram_received(self, data: bytes, _addr: tuple) -> None:
                self.outer._on_packet(data)

        self._transport, _ = await loop.create_datagram_endpoint(
            lambda: _Proto(self),
            local_addr=("0.0.0.0", AUDIOSYNC_PORT),
            family=2,
        )
        _LOGGER.info("AudioSync listener on UDP %s for %s", AUDIOSYNC_PORT, self.entry_id)

    async def stop(self) -> None:
        transport = self._transport
        self._transport = None
        if transport is not None:
            transport.close()

    def _on_packet(self, data: bytes) -> None:
        if len(data) < PACKET_SIZE:
            return
        try:
            sample_raw, sample_smth = struct.unpack_from("<ff", data, 0)
            sample_peak = data[8]
            fft = list(data[9:25])
            magnitude, major_peak = struct.unpack_from("<ff", data, 25)
        except (struct.error, IndexError):
            return
        import time

        now = time.monotonic()
        if now - self._last_emit < 0.1:
            self._latest = {
                "sample_raw": sample_raw,
                "sample_smth": sample_smth,
                "sample_peak": sample_peak,
                "fft": fft,
                "magnitude": magnitude,
                "major_peak": major_peak,
            }
            return
        self._last_emit = now
        payload = {
            "controller_id": self.entry_id,
            "sample_raw": sample_raw,
            "sample_smth": sample_smth,
            "sample_peak": int(sample_peak),
            "fft": [int(x) for x in fft],
            "magnitude": magnitude,
            "major_peak": major_peak,
        }
        self.hass.bus.async_fire(f"{DOMAIN}_audio_frame", payload)
