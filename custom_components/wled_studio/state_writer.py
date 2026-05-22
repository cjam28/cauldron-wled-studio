"""Coalesced /json/state writer — queue depth 1, newest wins."""

from __future__ import annotations

import asyncio
import logging
from typing import Any

_LOGGER = logging.getLogger(__name__)


class StateWriter:
    """Serialize WLED state POSTs; at most one in-flight, pending replaced by newest."""

    def __init__(self) -> None:
        self._pending: dict[str, Any] | None = None
        self._in_flight: asyncio.Task[Any] | None = None
        self._lock = asyncio.Lock()
        self._flush_event = asyncio.Event()
        self._closed = False

    async def shutdown_async(self) -> None:
        """Cancel queued writes before the HTTP session is closed."""
        self._closed = True
        flight: asyncio.Task[Any] | None = None
        async with self._lock:
            if self._in_flight is not None and not self._in_flight.done():
                flight = self._in_flight
                flight.cancel()
            self._pending = None
            self._in_flight = None
            self._flush_event.clear()
        if flight is not None:
            try:
                await flight
            except (asyncio.CancelledError, Exception):
                pass

    async def apply(
        self,
        post_fn: Any,
        patch: dict[str, Any],
        *,
        full_response: bool = False,
    ) -> dict[str, Any] | None:
        """Queue *patch*; merge with any pending payload; return last response if any."""
        if self._closed:
            return None
        async with self._lock:
            if self._closed:
                return None
            if self._pending is None:
                self._pending = dict(patch)
            else:
                self._pending = _merge_state(self._pending, patch)
            self._flush_event.set()
        return await self._drain(post_fn, full_response=full_response)

    async def _drain(
        self, post_fn: Any, *, full_response: bool
    ) -> dict[str, Any] | None:
        last: dict[str, Any] | None = None
        while True:
            if self._closed:
                return last
            async with self._lock:
                if self._closed:
                    return last
                if self._in_flight is not None and not self._in_flight.done():
                    flight = self._in_flight
                elif self._pending is None:
                    return last
                else:
                    payload = self._pending
                    self._pending = None
                    self._flush_event.clear()
                    flight = asyncio.create_task(
                        post_fn(payload, full_response=full_response)
                    )
                    self._in_flight = flight

            try:
                last = await flight
            except asyncio.CancelledError:
                if self._closed:
                    return last
                raise
            except Exception as err:
                if self._closed:
                    return last
                from .wled_client import WledClientUnavailable, is_client_unavailable

                if isinstance(err, WledClientUnavailable) or is_client_unavailable(err):
                    raise
                _LOGGER.exception("WLED state POST failed")
                raise
            async with self._lock:
                if self._in_flight is flight:
                    self._in_flight = None
                more_pending = self._pending is not None
            if not more_pending:
                return last


def _merge_state(base: dict[str, Any], patch: dict[str, Any]) -> dict[str, Any]:
    """Shallow merge; segment lists merge by segment id."""
    out = dict(base)
    for key, val in patch.items():
        if key != "seg" or not isinstance(val, list):
            out[key] = val
            continue
        existing = out.get("seg")
        if not isinstance(existing, list):
            out["seg"] = list(val)
            continue
        by_id: dict[int, dict[str, Any]] = {}
        for seg in existing:
            if isinstance(seg, dict) and "id" in seg:
                by_id[int(seg["id"])] = dict(seg)
        for seg in val:
            if not isinstance(seg, dict) or "id" not in seg:
                continue
            sid = int(seg["id"])
            merged = dict(by_id.get(sid, {"id": sid}))
            merged.update(seg)
            by_id[sid] = merged
        out["seg"] = list(by_id.values())
    return out
