"""Async HTTP client for WLED JSON API with rate limiting."""

from __future__ import annotations

import asyncio
import logging
import time
from typing import Any

import aiohttp

from .const import HTTP_BURST, HTTP_MAX_IN_FLIGHT, HTTP_RATE_PER_SEC
from .effects import (
    build_effect_name_map,
    build_palette_name_map,
    parse_fxdata_sound_flags,
)

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
        async with self._lock:
            now = time.monotonic()
            elapsed = now - self._last
            self._last = now
            self._tokens = min(self._burst, self._tokens + elapsed * self._rate)
            if self._tokens < 1:
                wait = (1 - self._tokens) / self._rate
                await asyncio.sleep(wait)
                self._tokens = 0
            else:
                self._tokens -= 1
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
        self.fw_ver: str = ""

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
                if resp.content_type == "application/json":
                    return await resp.json()
                return await resp.text()
        finally:
            self._bucket.release()

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
        page = 0
        while True:
            chunk = await self._request("GET", f"/json/palx?page={page}")
            if not isinstance(chunk, list) or not chunk:
                break
            palettes.extend(chunk)
            if len(chunk) < 10:
                break
            page += 1
            if page > 50:
                break
        if not palettes:
            pal_fallback = await self._request("GET", "/json/pal")
            if isinstance(pal_fallback, list):
                palettes = pal_fallback
        self.palettes_by_name = build_palette_name_map(palettes)

        self.fxdata = await self._request("GET", "/json/fxdata") or ""
        if not isinstance(self.fxdata, str):
            self.fxdata = ""
        self.sound_flags = parse_fxdata_sound_flags(self.fxdata, effect_count)

    async def bootstrap(self) -> None:
        await self.get_info()
        await self.refresh_catalog()
