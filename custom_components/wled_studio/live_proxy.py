"""Single upstream WLED WS client per controller; lv:true text JSON proxy."""

from __future__ import annotations

import asyncio
import json
import logging
import random
from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

import aiohttp

from .const import (
    LIVE_LINGER_SECONDS,
    LIVE_NO_FRAME_PROBE_SEC,
    LIVE_RECONNECT_BASE_SEC,
    LIVE_RECONNECT_MAX_SEC,
    LIVE_TARGET_FPS,
)
from .lv_frame import parse_lv_binary, parse_lv_message

_LOGGER = logging.getLogger(__name__)

FrameCallback = Callable[[dict[str, Any]], None]


@dataclass
class _Subscription:
    """HA WS subscriber."""

    callback: FrameCallback
    remote: bool = False


class LiveProxy:
    """One WLED /ws connection per studio entry; refcounted lv subscribers."""

    def __init__(
        self,
        entry_id: str,
        host: str,
        session: aiohttp.ClientSession,
        on_unreachable: Callable[[], None] | None = None,
    ) -> None:
        self.entry_id = entry_id
        self.host = host
        self._session = session
        self._on_unreachable = on_unreachable
        self._subs: dict[int, _Subscription] = {}
        self._sub_id = 0
        self._refcount = 0
        self._ws: aiohttp.ClientWebSocketResponse | None = None
        self._task: asyncio.Task[None] | None = None
        self._linger_task: asyncio.Task[None] | None = None
        self._running = False
        self._lv_active = False
        self._reconnect_attempt = 0
        self._last_frame_at: float | None = None
        self._last_good_frame: dict[str, Any] | None = None
        self._frame_queue: asyncio.Queue[dict[str, Any]] = asyncio.Queue(maxsize=3)
        self._broadcast_task: asyncio.Task[None] | None = None
        self._lock = asyncio.Lock()

    @property
    def subscriber_count(self) -> int:
        return self._refcount

    @property
    def last_good_frame(self) -> dict[str, Any] | None:
        """Latest coalesced live frame (for paint baseline capture)."""
        return self._last_good_frame

    def subscribe(
        self, callback: FrameCallback, *, remote: bool = False
    ) -> Callable[[], None]:
        """Subscribe to coalesced live frames; returns unsubscribe callable."""

        def _unsub() -> None:
            asyncio.create_task(self._async_unsubscribe(sub_id))

        self._sub_id += 1
        sub_id = self._sub_id
        self._subs[sub_id] = _Subscription(callback=callback, remote=remote)
        asyncio.create_task(self._async_subscribe())
        return _unsub

    async def _async_subscribe(self) -> None:
        async with self._lock:
            if self._linger_task and not self._linger_task.done():
                self._linger_task.cancel()
                self._linger_task = None
            self._refcount += 1
            if self._refcount == 1:
                await self._start()

    async def _async_unsubscribe(self, sub_id: int) -> None:
        async with self._lock:
            self._subs.pop(sub_id, None)
            self._refcount = max(0, self._refcount - 1)
            if self._refcount == 0:
                self._linger_task = asyncio.create_task(self._linger_close())

    async def _linger_close(self) -> None:
        await asyncio.sleep(LIVE_LINGER_SECONDS)
        async with self._lock:
            if self._refcount == 0:
                await self._stop(send_lv_false=True)

    async def _start(self) -> None:
        if self._running:
            return
        self._running = True
        self._reconnect_attempt = 0
        self._broadcast_task = asyncio.create_task(self._broadcast_loop())
        self._task = asyncio.create_task(self._ws_loop())

    async def _stop(self, *, send_lv_false: bool = False) -> None:
        self._running = False
        if self._task and not self._task.done():
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
        self._task = None
        if self._broadcast_task and not self._broadcast_task.done():
            self._broadcast_task.cancel()
            try:
                await self._broadcast_task
            except asyncio.CancelledError:
                pass
        self._broadcast_task = None
        if send_lv_false and self._ws and not self._ws.closed:
            try:
                await self._ws.send_str(json.dumps({"lv": False}))
            except (aiohttp.ClientError, asyncio.TimeoutError):
                pass
        if self._ws and not self._ws.closed:
            await self._ws.close()
        self._ws = None
        self._lv_active = False

    async def _ws_loop(self) -> None:
        ws_url = f"ws://{self.host}/ws"
        while self._running:
            try:
                async with self._session.ws_connect(
                    ws_url, heartbeat=None, timeout=15
                ) as ws:
                    self._ws = ws
                    self._reconnect_attempt = 0
                    await ws.send_str(json.dumps({"lv": True}))
                    self._lv_active = True
                    _LOGGER.debug(
                        "live_proxy connected entry=%s host=%s",
                        self.entry_id,
                        self.host,
                        extra={"entry_id": self.entry_id},
                    )
                    async for msg in ws:
                        if not self._running:
                            break
                        if msg.type == aiohttp.WSMsgType.BINARY:
                            await self._handle_binary(msg.data)
                        elif msg.type == aiohttp.WSMsgType.TEXT:
                            await self._handle_text(msg.data)
                        elif msg.type in (
                            aiohttp.WSMsgType.CLOSED,
                            aiohttp.WSMsgType.ERROR,
                        ):
                            break
                        else:
                            continue
                        if await self._maybe_probe_stale():
                            break
            except asyncio.CancelledError:
                raise
            except Exception as err:  # noqa: BLE001
                log = _LOGGER.debug if self._reconnect_attempt >= 3 else _LOGGER.warning
                log(
                    "live_proxy ws error entry=%s: %s",
                    self.entry_id,
                    err,
                    extra={"entry_id": self.entry_id},
                )
            finally:
                self._ws = None
                self._lv_active = False

            if not self._running:
                break
            delay = min(
                LIVE_RECONNECT_MAX_SEC,
                LIVE_RECONNECT_BASE_SEC * (2**self._reconnect_attempt),
            )
            delay *= 0.5 + random.random()
            self._reconnect_attempt += 1
            await asyncio.sleep(delay)

    async def _handle_binary(self, data: bytes) -> None:
        frame = parse_lv_binary(data)
        if frame is None:
            return
        self._ingest_frame(frame)

    async def _handle_text(self, data: str) -> None:
        try:
            raw = json.loads(data)
        except json.JSONDecodeError:
            return
        frame = parse_lv_message(raw)
        if frame is None:
            return
        self._ingest_frame(frame)

    def _ingest_frame(self, frame: dict[str, Any]) -> None:
        self._last_frame_at = asyncio.get_running_loop().time()
        frame["entry_id"] = self.entry_id
        frame["controller_id"] = self.entry_id
        self._last_good_frame = frame
        try:
            self._frame_queue.put_nowait(frame)
        except asyncio.QueueFull:
            try:
                self._frame_queue.get_nowait()
            except asyncio.QueueEmpty:
                pass
            self._frame_queue.put_nowait(frame)

    async def _maybe_probe_stale(self) -> bool:
        if self._refcount == 0:
            return True
        loop = asyncio.get_running_loop()
        if self._last_frame_at is None:
            return False
        if loop.time() - self._last_frame_at < LIVE_NO_FRAME_PROBE_SEC:
            return False
        # Liveness: no frame for 5s — connection likely dead
        _LOGGER.info(
            "live_proxy no frames for %ss, reconnecting entry=%s",
            LIVE_NO_FRAME_PROBE_SEC,
            self.entry_id,
            extra={"entry_id": self.entry_id},
        )
        self._last_frame_at = loop.time()
        if self._on_unreachable:
            self._on_unreachable()
        return True

    async def _broadcast_loop(self) -> None:
        interval = 1.0 / LIVE_TARGET_FPS
        while self._running:
            await asyncio.sleep(interval)
            if not self._subs:
                continue
            loop = asyncio.get_running_loop()
            if (
                self._last_frame_at is None
                or loop.time() - self._last_frame_at > LIVE_NO_FRAME_PROBE_SEC
            ):
                continue
            frame = dict(self._last_good_frame) if self._last_good_frame else None
            if not frame:
                continue
            any_remote = any(s.remote for s in self._subs.values())
            out = dict(frame)
            if any_remote:
                out["fps"] = 10
            else:
                out["fps"] = LIVE_TARGET_FPS
            for sub in list(self._subs.values()):
                try:
                    sub.callback(out)
                except Exception:  # noqa: BLE001
                    _LOGGER.exception("live_proxy subscriber callback failed")

    async def async_shutdown(self) -> None:
        async with self._lock:
            self._refcount = 0
            self._subs.clear()
            await self._stop(send_lv_false=True)


# Module-level registry: one LiveProxy per studio entry_id
_PROXIES: dict[str, LiveProxy] = {}


def get_live_proxy(
    entry_id: str,
    host: str,
    session: aiohttp.ClientSession,
) -> LiveProxy:
    """Return or create the LiveProxy for an entry."""
    if entry_id not in _PROXIES:
        _PROXIES[entry_id] = LiveProxy(entry_id, host, session)
    return _PROXIES[entry_id]


async def shutdown_live_proxy(entry_id: str) -> None:
    proxy = _PROXIES.pop(entry_id, None)
    if proxy:
        await proxy.async_shutdown()
