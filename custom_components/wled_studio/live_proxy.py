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
    LIVE_REMOTE_FPS,
    LIVE_STALE_SEC,
    LIVE_TARGET_FPS,
)
from .lv_frame import parse_lv_binary, parse_lv_message

_LOGGER = logging.getLogger(__name__)

FrameCallback = Callable[[dict[str, Any]], None]

# Per-subscriber status values surfaced as the additive `status` key on each
# delivered frame so the frontend can render a liveness badge (LV-4).
STATUS_LIVE = "live"
STATUS_STALE = "stale"
STATUS_DROP = "drop"


@dataclass
class _Subscription:
    """HA WS subscriber with per-sub delivery rate-limiting state (LV-2)."""

    callback: FrameCallback
    remote: bool = False
    # Loop-time of the last delivered tick; -inf so the first tick always fires.
    last_sent: float = field(default=float("-inf"))
    # Count of frames actually delivered to this subscriber (LV-4).
    frames_delivered: int = 0
    # Last ingest frame-counter value this subscriber saw delivered (LV-4); used
    # to compute how many freshly-ingested frames were dropped between deliveries.
    last_frame_seq: int = 0

    def target_fps(self) -> int:
        """Effective delivery rate for this subscriber kind."""
        return LIVE_REMOTE_FPS if self.remote else LIVE_TARGET_FPS


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
        # Monotonically increasing ingest counter (LV-4). Each ingested frame
        # bumps this; subscribers compare it against their own last-seen seq to
        # report how many frames were dropped between deliveries.
        self._frame_seq = 0
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
        # LV-4: seed last_frame_seq to the current ingest counter so a new/late
        # subscriber's FIRST delivery reports dropped=0. Without this seed the
        # first tick would compute dropped = _frame_seq - 0 - 1 (every frame the
        # proxy has ever ingested), spuriously flagging a brand-new viewer as
        # having "dropped" hundreds of frames it was never entitled to.
        self._subs[sub_id] = _Subscription(
            callback=callback, remote=remote, last_frame_seq=self._frame_seq
        )
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
        # LV-1: single-slot "latest wins" coalescing buffer. The broadcast loop
        # always reads _last_good_frame, so there is no queue — the freshest
        # frame simply overwrites the previous one. This removes inter-frame
        # jitter and the unbounded drop path the old maxsize=3 queue created.
        self._last_frame_at = asyncio.get_running_loop().time()
        frame["entry_id"] = self.entry_id
        frame["controller_id"] = self.entry_id
        # LV-4: bump the monotonic ingest counter so subscribers can detect how
        # many frames they missed between deliveries.
        self._frame_seq += 1
        self._last_good_frame = frame

    async def _maybe_probe_stale(self) -> bool:
        if self._refcount == 0:
            return True
        loop = asyncio.get_running_loop()
        if self._last_frame_at is None:
            return False
        if loop.time() - self._last_frame_at < LIVE_NO_FRAME_PROBE_SEC:
            return False
        # Liveness: no frame for LIVE_NO_FRAME_PROBE_SEC — connection likely dead.
        _LOGGER.info(
            "live_proxy no frames for %ss, reconnecting entry=%s",
            LIVE_NO_FRAME_PROBE_SEC,
            self.entry_id,
            extra={"entry_id": self.entry_id},
        )
        # LV-5: hard, clean reconnect. Force-close the current ws so the
        # _ws_loop reconnect path starts fresh, and reset freshness state so the
        # broadcast loop's staleness guard suppresses the stale _last_good_frame
        # during the reconnect window instead of replaying it. We deliberately
        # leave _last_good_frame untouched as the paint baseline, but null
        # _last_frame_at so it is treated as not-fresh until the next ingest.
        await self._force_reconnect()
        if self._on_unreachable:
            self._on_unreachable()
        return True

    async def _force_reconnect(self) -> None:
        """Close the live ws and clear freshness so reconnect starts clean."""
        # Null freshness first so any concurrent broadcast tick already sees the
        # stale state and refuses to emit the carried-over last_good_frame.
        self._last_frame_at = None
        ws = self._ws
        if ws is not None and not ws.closed:
            try:
                await ws.close()
            except (aiohttp.ClientError, asyncio.TimeoutError):
                pass

    async def _broadcast_loop(self) -> None:
        # Loop ticks at the full local rate so local subs get every frame. Remote
        # subs are individually rate-limited inside _deliver_tick (LV-2).
        interval = 1.0 / LIVE_TARGET_FPS
        while self._running:
            await asyncio.sleep(interval)
            self._deliver_tick(asyncio.get_running_loop().time())

    def _deliver_tick(self, now: float) -> None:
        """Deliver the freshest frame to each subscriber for one loop tick.

        Per-subscriber (LV-2): local subs receive every tick at LIVE_TARGET_FPS;
        remote subs are throttled to LIVE_REMOTE_FPS by tracking last-sent
        loop-time on each _Subscription. One remote viewer never lowers a local
        subscriber's effective rate.

        Per-subscriber status (LV-4): each delivered frame carries additive keys
        — `fps` (the subscriber's kind rate), `dropped` (frames ingested but not
        delivered to this sub since its last delivery), `stale` (bool) and
        `status` ('live' | 'stale' | 'drop'). lv_frame.py output keys are never
        mutated; only additive keys are added.
        """
        if not self._subs:
            return
        # LV-5 / staleness guard: when freshness has been nulled (probe-stale
        # reconnect, or no frame ingested yet) refuse to replay the carried-over
        # last_good_frame so the reconnect window emits NOTHING. _last_frame_at
        # is None only after _force_reconnect() or before the first ingest.
        if self._last_frame_at is None or self._last_good_frame is None:
            return
        age = now - self._last_frame_at
        # Beyond the probe window the connection is presumed dead and the probe
        # path will reconnect — never emit a frame this old.
        if age > LIVE_NO_FRAME_PROBE_SEC:
            return
        base = self._last_good_frame
        # Soft-stale: ws still alive but frames have genuinely PAUSED — the held
        # frame has aged past LIVE_STALE_SEC (~0.75 s), DECOUPLED from the 50 ms
        # broadcast tick. Crucially this must NOT fire merely because upstream
        # ingest is slower than the broadcast tick during healthy steady state:
        # a held-but-fresh frame is still the freshest data and is delivered as
        # "live"/"drop", never "stale". Only a real pause flips to stale so the
        # frontend may freeze pixels + badge it (LV-4) — distinct from the hard
        # reconnect window above which emits nothing.
        soft_stale = age > LIVE_STALE_SEC
        for sub in list(self._subs.values()):
            min_interval = 1.0 / sub.target_fps()
            # Remote-throttle: skip this tick if the sub was delivered too
            # recently for its target rate. Tiny epsilon absorbs float drift so
            # a sub due "exactly now" still fires.
            if now - sub.last_sent < min_interval - 1e-9:
                continue
            dropped = max(0, self._frame_seq - sub.last_frame_seq - 1)
            if soft_stale:
                status = STATUS_STALE
            elif dropped > 0:
                status = STATUS_DROP
            else:
                status = STATUS_LIVE
            out = dict(base)
            out["fps"] = sub.target_fps()
            out["dropped"] = dropped
            out["stale"] = soft_stale
            out["status"] = status
            sub.last_sent = now
            sub.last_frame_seq = self._frame_seq
            sub.frames_delivered += 1
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
