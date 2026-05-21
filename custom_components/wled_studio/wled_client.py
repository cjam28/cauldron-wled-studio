"""Async HTTP client for WLED JSON API with rate limiting."""

from __future__ import annotations

import asyncio
import json
import logging
import time
from typing import Any

import aiohttp

from .const import HTTP_BURST, HTTP_MAX_IN_FLIGHT, HTTP_RATE_PER_SEC
from .effects import (
    build_effect_name_map,
    build_palette_name_map,
    effect_meta_for_id,
    normalize_fxdata_response,
    parse_fxdata_sound_flags,
)
from .state_writer import StateWriter

_LOGGER = logging.getLogger(__name__)


class TokenBucket:
    """Simple token bucket for WLED HTTP calls."""

    def __init__(
        self,
        rate: float = HTTP_RATE_PER_SEC,
        burst: int = HTTP_BURST,
        max_in_flight: int = HTTP_MAX_IN_FLIGHT,
    ) -> None:
        self._rate = rate
        self._tokens = float(burst)
        self._burst = burst
        self._last = time.monotonic()
        self._sem = asyncio.Semaphore(max_in_flight)
        self._lock = asyncio.Lock()

    async def acquire(self) -> None:
        wait = 0.0
        async with self._lock:
            now = time.monotonic()
            elapsed = now - self._last
            self._last = now
            self._tokens = min(self._burst, self._tokens + elapsed * self._rate)
            if self._tokens < 1:
                wait = (1 - self._tokens) / self._rate
                self._tokens = 0
            else:
                self._tokens -= 1
        if wait > 0:
            await asyncio.sleep(wait)
        await self._sem.acquire()

    def release(self) -> None:
        self._sem.release()


class WledClient:
    """HTTP access to a single WLED device."""

    def __init__(self, host: str, session: aiohttp.ClientSession) -> None:
        self.host = host.rstrip("/")
        self._session = session
        self._bucket = TokenBucket()
        self._base = f"http://{self.host}"
        self.effects_by_name: dict[str, int] = {}
        self.palettes_by_name: dict[str, int] = {}
        self.sound_flags: list[str | None] = []
        self.fxdata: str = ""
        self.info: dict[str, Any] = {}
        self.state: dict[str, Any] = {}
        self.cfg: dict[str, Any] = {}
        self.presets: dict[str, Any] = {}
        self.fw_ver: str = ""
        self._state_writer = StateWriter()

    async def _request(
        self, method: str, path: str, **kwargs: Any
    ) -> Any:
        await self._bucket.acquire()
        try:
            url = f"{self._base}{path}"
            async with self._session.request(
                method, url, timeout=aiohttp.ClientTimeout(total=10), **kwargs
            ) as resp:
                resp.raise_for_status()
                if resp.content_type and "json" in resp.content_type:
                    body = await resp.text()
                    try:
                        return json.loads(body)
                    except json.JSONDecodeError:
                        _LOGGER.debug(
                            "JSON decode failed for %s (%d bytes), using raw text",
                            path,
                            len(body),
                        )
                        return body
                return await resp.text()
        finally:
            self._bucket.release()

    async def _get_text(self, path: str) -> str:
        """GET endpoint as raw text (avoids fragile JSON decode on fxdata)."""
        await self._bucket.acquire()
        try:
            url = f"{self._base}{path}"
            async with self._session.get(
                url, timeout=aiohttp.ClientTimeout(total=15)
            ) as resp:
                resp.raise_for_status()
                return await resp.text()
        finally:
            self._bucket.release()

    async def _fetch_fxdata(self) -> str:
        """Load /json/fxdata; WLED often returns invalid JSON despite content-type."""
        try:
            raw = await self._get_text("/json/fxdata")
            return normalize_fxdata_response(raw)
        except Exception:
            _LOGGER.warning("Failed to load /json/fxdata from %s", self.host, exc_info=True)
            return ""

    async def get_info(self) -> dict[str, Any]:
        self.info = await self._request("GET", "/json/info") or {}
        ver = self.info.get("ver") or self.info.get("version")
        self.fw_ver = str(ver) if ver else ""
        return self.info

    async def refresh_catalog(self) -> None:
        """Load effects, palettes (paged), and fxdata."""
        effects_raw = await self._request("GET", "/json/eff")
        if isinstance(effects_raw, list):
            self.effects_by_name = build_effect_name_map(effects_raw)
            effect_count = len(effects_raw)
        else:
            effect_count = self.info.get("fxcount", 0) or 0

        palettes: list[str] = []
        pal_fallback = await self._request("GET", "/json/pal")
        if isinstance(pal_fallback, list):
            palettes.extend(pal_fallback)
        page = 0
        while page < 64:
            chunk = await self._request("GET", f"/json/palx?page={page}")
            if not isinstance(chunk, list) or len(chunk) == 0:
                break
            palettes.extend(chunk)
            page += 1
        self.palettes_by_name = build_palette_name_map(palettes)

        self.fxdata = await self._fetch_fxdata()
        self.sound_flags = parse_fxdata_sound_flags(self.fxdata, effect_count)

    async def get_state(self, *, refresh: bool = False) -> dict[str, Any]:
        if refresh or not self.state:
            data = await self._request("GET", "/json/state")
            if isinstance(data, dict):
                self.state = data
        return self.state

    async def get_cfg(self, *, refresh: bool = False) -> dict[str, Any]:
        if refresh or not self.cfg:
            data = await self._request("GET", "/json/cfg")
            if isinstance(data, dict):
                self.cfg = data
        return self.cfg

    async def get_presets(self) -> dict[str, Any]:
        data = await self._request("GET", "/presets.json")
        if isinstance(data, dict):
            self.presets = data
        return self.presets

    async def _post_state_raw(
        self, patch: dict[str, Any], *, full_response: bool = False
    ) -> dict[str, Any]:
        body = dict(patch)
        if full_response:
            body["v"] = True
        result = await self._request("POST", "/json/state", json=body)
        if isinstance(result, dict):
            if full_response or "seg" in result:
                self.state = result
            return result
        return {}

    async def apply_state(
        self, patch: dict[str, Any], *, full_response: bool = False
    ) -> dict[str, Any] | None:
        """Coalesced state write (queue depth 1)."""
        return await self._state_writer.apply(
            self._post_state_raw, patch, full_response=full_response
        )

    def effect_meta(self, effect_id: int) -> dict[str, Any]:
        return effect_meta_for_id(self.fxdata, effect_id)

    def led_bus_order(self) -> int:
        """First LED bus `order` nibble (RGB + W-swap)."""
        try:
            ins = self.cfg.get("hw", {}).get("led", {}).get("ins", [])
            if ins and isinstance(ins[0], dict):
                return int(ins[0].get("order", 0))
        except (TypeError, ValueError):
            pass
        return 0

    def led_bus_rgbwm(self, bus_index: int = 0) -> int:
        """Per-bus auto-white mode from /json/cfg (persistent LED settings).

        Matches WLED UI "Auto-calculate W channel from RGB". Values: 0 Manual,
        1 Brighter, 2 Accurate, 3 Dual, 4 Max. Segment ``awm`` in /json/state is
        only a per-request override and is often omitted when unset.
        """
        try:
            hw = self.cfg.get("hw")
            if not isinstance(hw, dict):
                return 0
            led = hw.get("led")
            if not isinstance(led, dict):
                return 0
            global_raw = led.get("rgbwm", 255)
            global_rgbwm = int(global_raw) if global_raw is not None else 255
            ins = led.get("ins", [])
            if not isinstance(ins, list) or not ins:
                if global_rgbwm != 255:
                    return max(0, min(4, global_rgbwm))
                return 0
            idx = max(0, min(bus_index, len(ins) - 1))
            bus = ins[idx]
            if not isinstance(bus, dict):
                return 0
            if global_rgbwm != 255:
                return max(0, min(4, global_rgbwm))
            bus_raw = bus.get("rgbwm", 0)
            return max(0, min(4, int(bus_raw)))
        except (TypeError, ValueError):
            return 0

    async def apply_cfg(self, patch: dict[str, Any]) -> dict[str, Any]:
        """POST /json/cfg and refresh cached config."""
        await self._request("POST", "/json/cfg", json=patch)
        return await self.get_cfg(refresh=True)

    async def bootstrap(self) -> None:
        await self.get_info()
        await self.refresh_catalog()
        await self.get_cfg()
        await self.get_state(refresh=True)
