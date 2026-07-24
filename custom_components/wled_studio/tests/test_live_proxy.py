"""LiveProxy queue/broadcast/subscriber plumbing (LV-1, LV-2, LV-4, LV-5).

These tests exercise the reworked coalescing buffer and per-subscriber
broadcast logic WITHOUT touching the lv_frame parser or any DDP/wire bytes.
The delivery loop is driven deterministically via LiveProxy._deliver_tick(now)
with a simulated wall clock, and stale-probe via _maybe_probe_stale().
"""

from __future__ import annotations

import asyncio
from typing import Any
from unittest.mock import AsyncMock, MagicMock

import pytest

from wled_studio.const import (
    LIVE_NO_FRAME_PROBE_SEC,
    LIVE_REMOTE_FPS,
    LIVE_STALE_SEC,
    LIVE_TARGET_FPS,
)
from wled_studio.live_proxy import (
    STATUS_DROP,
    STATUS_LIVE,
    STATUS_STALE,
    LiveProxy,
    _Subscription,
)


def _make_proxy() -> LiveProxy:
    """Construct a LiveProxy with a dummy session (no network is touched)."""
    session = MagicMock()
    return LiveProxy("entry-1", "192.168.1.50", session)


def _frame(tag: int) -> dict[str, Any]:
    """A minimal lv_frame-shaped dict; `marker` lets us identify which frame."""
    return {
        "leds_hex": ["{:06x}".format(tag)],
        "n": 1,
        "channels": 3,
        "scale": 1.0,
        "count": 1,
        "marker": tag,
    }


def _ingest(proxy: LiveProxy, frame: dict[str, Any], *, at: float) -> None:
    """Ingest a frame with an explicit loop-time, bypassing the real clock.

    Mirrors _ingest_frame's bookkeeping but with a controllable timestamp so the
    broadcast freshness math is deterministic.
    """
    frame["entry_id"] = proxy.entry_id
    frame["controller_id"] = proxy.entry_id
    proxy._frame_seq += 1
    proxy._last_good_frame = frame
    proxy._last_frame_at = at


# --------------------------------------------------------------------------- #
# LV-1: single-slot "latest wins" coalescing buffer; no _frame_queue.
# --------------------------------------------------------------------------- #


@pytest.mark.asyncio
async def test_lv1_no_frame_queue_attribute() -> None:
    """The dead drop-oldest queue is gone entirely."""
    proxy = _make_proxy()
    assert not hasattr(proxy, "_frame_queue")


@pytest.mark.asyncio
async def test_lv1_ingest_many_delivers_latest_no_queuefull() -> None:
    """Ingesting N>3 frames rapidly then broadcasting delivers the LATEST frame.

    The old maxsize=3 asyncio.Queue would have hit QueueFull after 3 frames; the
    coalescing buffer simply keeps the freshest and never raises.
    """
    proxy = _make_proxy()
    received: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=received.append, remote=False)

    n = 10  # N > 3
    for i in range(n):
        _ingest(proxy, _frame(i), at=1.0)
    assert proxy._frame_seq == n

    # One broadcast tick: local sub gets exactly the latest frame, once.
    proxy._deliver_tick(now=1.0)

    assert len(received) == 1
    assert received[0]["marker"] == n - 1
    # leds_hex (a lv_frame output key) is untouched / passed through verbatim.
    assert received[0]["leds_hex"] == ["{:06x}".format(n - 1)]


# --------------------------------------------------------------------------- #
# LV-2: per-subscriber fps + rate-limit; local rate independent of remote subs.
# --------------------------------------------------------------------------- #


def _run_ticks(
    proxy: LiveProxy,
    *,
    duration: float,
    frame_at: float = 0.0,
) -> None:
    """Drive _deliver_tick across a fixed simulated wall clock at the loop rate.

    A fresh frame is (re)ingested every tick so the buffer always has live data;
    `_last_frame_at` is pinned to the current simulated time.
    """
    interval = 1.0 / LIVE_TARGET_FPS
    ticks = round(duration / interval)
    seq = 0
    for i in range(ticks):
        now = (i + 1) * interval
        _ingest(proxy, _frame(seq), at=now)
        seq += 1
        proxy._deliver_tick(now=now)


@pytest.mark.asyncio
async def test_lv2_local_and_remote_rates() -> None:
    """Over a fixed wall clock, local ~= LIVE_TARGET_FPS, remote ~= LIVE_REMOTE_FPS."""
    proxy = _make_proxy()
    local: list[dict[str, Any]] = []
    remote: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=local.append, remote=False)
    proxy._subs[2] = _Subscription(callback=remote.append, remote=True)

    duration = 1.0  # one simulated second
    _run_ticks(proxy, duration=duration)

    # Local gets every tick (one per 1/LIVE_TARGET_FPS).
    assert len(local) == LIVE_TARGET_FPS
    # Remote is throttled to LIVE_REMOTE_FPS (+/- 1 for boundary rounding).
    assert abs(len(remote) - LIVE_REMOTE_FPS) <= 1
    # And remote really is slower than local.
    assert len(remote) < len(local)


@pytest.mark.asyncio
async def test_lv2_local_rate_unaffected_by_remote_presence() -> None:
    """LV-2 isolation: the local sub's rate is identical with or without a remote sub."""
    duration = 1.0

    # Without a remote sub.
    proxy_a = _make_proxy()
    local_a: list[dict[str, Any]] = []
    proxy_a._subs[1] = _Subscription(callback=local_a.append, remote=False)
    _run_ticks(proxy_a, duration=duration)

    # With a remote sub present alongside.
    proxy_b = _make_proxy()
    local_b: list[dict[str, Any]] = []
    remote_b: list[dict[str, Any]] = []
    proxy_b._subs[1] = _Subscription(callback=local_b.append, remote=False)
    proxy_b._subs[2] = _Subscription(callback=remote_b.append, remote=True)
    _run_ticks(proxy_b, duration=duration)

    # One remote viewer must NEVER reduce the local subscriber's effective rate.
    assert len(local_a) == len(local_b) == LIVE_TARGET_FPS
    # Sanity: the remote sub WAS throttled (so this is a real isolation check).
    assert len(remote_b) < len(local_b)


# --------------------------------------------------------------------------- #
# LV-4: additive per-subscriber fps + status/stale/dropped keys.
# --------------------------------------------------------------------------- #


@pytest.mark.asyncio
async def test_lv4_delivered_frame_has_fps_per_kind_and_status() -> None:
    """Each delivered frame carries fps matching the sub kind and status/stale."""
    proxy = _make_proxy()
    local: list[dict[str, Any]] = []
    remote: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=local.append, remote=False)
    proxy._subs[2] = _Subscription(callback=remote.append, remote=True)

    _ingest(proxy, _frame(0), at=0.0)
    proxy._deliver_tick(now=0.0)

    assert local and remote
    assert local[-1]["fps"] == LIVE_TARGET_FPS
    assert remote[-1]["fps"] == LIVE_REMOTE_FPS
    for out in (local[-1], remote[-1]):
        assert out["status"] in (STATUS_LIVE, STATUS_STALE, STATUS_DROP)
        assert "stale" in out
        assert isinstance(out["stale"], bool)
        assert "dropped" in out
    # First delivery of a fresh frame is live, not stale, with nothing dropped.
    assert local[-1]["status"] == STATUS_LIVE
    assert local[-1]["stale"] is False
    assert local[-1]["dropped"] == 0


@pytest.mark.asyncio
async def test_lv4_dropped_count_for_throttled_remote() -> None:
    """A remote sub that skips ticks reports the intervening frames as dropped."""
    proxy = _make_proxy()
    remote: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=remote.append, remote=True)

    interval = 1.0 / LIVE_TARGET_FPS
    # Two local-rate ticks before the remote sub is due again: the first delivers,
    # subsequent ones are throttled, accumulating dropped frames.
    for i in range(LIVE_TARGET_FPS):
        now = i * interval
        _ingest(proxy, _frame(i), at=now)
        proxy._deliver_tick(now=now)

    assert len(remote) == LIVE_REMOTE_FPS
    # After the first (live) delivery, later deliveries skipped intervening
    # ingested frames -> status drop with dropped > 0.
    later = remote[1:]
    assert later, "expected more than one remote delivery"
    assert all(out["status"] == STATUS_DROP for out in later)
    assert all(out["dropped"] > 0 for out in later)


@pytest.mark.asyncio
async def test_lv4_soft_stale_when_frame_ages() -> None:
    """A held frame older than LIVE_STALE_SEC (ws alive) is flagged stale."""
    proxy = _make_proxy()
    local: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=local.append, remote=False)

    # Frame ingested at t=0, but we tick well past LIVE_STALE_SEC (still inside
    # the probe window so the ws is presumed alive). This is a GENUINE pause.
    _ingest(proxy, _frame(0), at=0.0)
    proxy._deliver_tick(now=LIVE_STALE_SEC + 0.5)

    assert local
    assert local[-1]["status"] == STATUS_STALE
    assert local[-1]["stale"] is True


@pytest.mark.asyncio
async def test_lv4_soft_stale_decoupled_from_broadcast_tick() -> None:
    """A held frame older than the 50ms broadcast tick but younger than
    LIVE_STALE_SEC must STAY live — the stale flag is decoupled from the tick.

    This guards the core contract bug: soft_stale must NOT fire merely because
    the held frame outlived one 1/LIVE_TARGET_FPS broadcast interval. WLED's
    upstream ingest is frequently slower than the broadcast loop in healthy
    steady state, and that held-but-fresh frame is still the freshest data.
    """
    proxy = _make_proxy()
    local: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=local.append, remote=False)

    tick = 1.0 / LIVE_TARGET_FPS  # 50ms broadcast interval
    # The held frame is several broadcast ticks old (well past 50ms) but still
    # comfortably younger than the real LIVE_STALE_SEC timeout.
    age = tick * 4
    assert tick < age < LIVE_STALE_SEC  # the regime that used to false-positive
    _ingest(proxy, _frame(0), at=0.0)
    proxy._deliver_tick(now=age)

    assert local
    assert local[-1]["status"] == STATUS_LIVE
    assert local[-1]["stale"] is False


@pytest.mark.asyncio
async def test_lv4_steady_state_slow_ingest_stays_live_no_flicker() -> None:
    """Steady state where upstream ingest interval > broadcast interval must
    stay status=="live" on every delivery — no flicker to stale or drop.

    The broadcast loop ticks at LIVE_TARGET_FPS (50ms) but upstream only
    produces a fresh frame every ~120ms. Each delivery carries the freshest
    available frame; because ingest is slower than the broadcast tick the
    proxy re-delivers a held-but-fresh frame on intervening ticks. None of
    these may be flagged stale, and a single local sub never coalesces frames
    (dropped stays 0), so every status is exactly "live".
    """
    proxy = _make_proxy()
    local: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=local.append, remote=False)

    tick = 1.0 / LIVE_TARGET_FPS  # 50ms broadcast interval
    ingest_interval = tick * 2.4  # ~120ms: slower than the broadcast tick
    assert ingest_interval < LIVE_STALE_SEC  # still healthy, never a real pause

    now = 0.0
    next_ingest = 0.0
    duration = 1.0
    while now <= duration:
        if now + 1e-9 >= next_ingest:
            _ingest(proxy, _frame(int(now / tick)), at=now)
            next_ingest += ingest_interval
        proxy._deliver_tick(now=now)
        now += tick

    assert local, "expected steady-state deliveries"
    # No flicker: every delivery is live, never stale, never a drop badge.
    assert all(out["status"] == STATUS_LIVE for out in local)
    assert all(out["stale"] is False for out in local)
    assert all(out["dropped"] == 0 for out in local)


@pytest.mark.asyncio
async def test_lv4_late_subscriber_first_delivery_dropped_zero() -> None:
    """A subscriber that joins after _frame_seq has advanced gets dropped=0 on
    its FIRST delivery (subscribe() seeds last_frame_seq to the current seq).

    Without the seed, the first tick would compute dropped against seq 0 and
    spuriously report every frame the proxy ever ingested as dropped.
    """
    proxy = _make_proxy()

    # Advance the ingest counter far before anyone subscribes.
    for i in range(50):
        _ingest(proxy, _frame(i), at=1.0)
    assert proxy._frame_seq == 50

    received: list[dict[str, Any]] = []
    # Go through the real subscribe() path so the seq-seed logic is exercised.
    proxy.subscribe(received.append)
    try:
        assert proxy._subs, "subscribe() should have registered the subscription"
        sub = next(iter(proxy._subs.values()))
        assert sub.last_frame_seq == proxy._frame_seq

        # Deliver the freshest held frame: late joiner's first is clean/live.
        proxy._deliver_tick(now=1.0)

        assert received
        assert received[0]["dropped"] == 0
        assert received[0]["status"] == STATUS_LIVE
        assert received[0]["stale"] is False
    finally:
        # subscribe() scheduled _async_subscribe()/_start() background tasks via
        # create_task; let them run, then tear everything down so no orphaned
        # ws/broadcast task leaks into later tests sharing the event loop.
        for _ in range(5):
            await asyncio.sleep(0)
        await proxy.async_shutdown()


@pytest.mark.asyncio
async def test_lv4_genuine_gap_yields_stale_after_drop_phase() -> None:
    """A genuine >LIVE_STALE_SEC gap yields stale, while a fresh-but-coalesced
    frame for the same sub stays a (painting) drop — the two are distinct.
    """
    proxy = _make_proxy()
    remote: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=remote.append, remote=True)

    tick = 1.0 / LIVE_TARGET_FPS
    # Healthy phase: ingest+tick fast enough that the remote sub coalesces
    # intervening frames -> status drop, but the frame is fresh (not stale).
    for i in range(LIVE_TARGET_FPS):
        now = i * tick
        _ingest(proxy, _frame(i), at=now)
        proxy._deliver_tick(now=now)

    coalesced = [out for out in remote if out["status"] == STATUS_DROP]
    assert coalesced, "expected at least one coalesced (drop) delivery"
    assert all(out["stale"] is False for out in coalesced)
    assert all(out["dropped"] > 0 for out in coalesced)

    # Now upstream genuinely pauses for > LIVE_STALE_SEC: the held frame ages out.
    last_ingest_at = (LIVE_TARGET_FPS - 1) * tick
    proxy._deliver_tick(now=last_ingest_at + LIVE_STALE_SEC + 0.2)

    assert remote[-1]["status"] == STATUS_STALE
    assert remote[-1]["stale"] is True


# --------------------------------------------------------------------------- #
# LV-5: stale-probe forces a clean reconnect; no stale frame during reconnect.
# --------------------------------------------------------------------------- #


@pytest.mark.asyncio
async def test_lv5_probe_stale_closes_ws_and_clears_freshness() -> None:
    """After LIVE_NO_FRAME_PROBE_SEC with no frames, the probe hard-reconnects.

    It closes the ws and clears _last_frame_at so the broadcast loop refuses to
    replay the stale last_good_frame during the reconnect window.
    """
    proxy = _make_proxy()
    proxy._refcount = 1  # there is a subscriber, so the probe won't early-return

    ws = MagicMock()
    ws.closed = False
    ws.close = AsyncMock()
    proxy._ws = ws

    on_unreachable = MagicMock()
    proxy._on_unreachable = on_unreachable

    # Pretend the last frame arrived long enough ago to trip the probe.
    loop = asyncio.get_running_loop()
    proxy._last_good_frame = _frame(7)
    proxy._last_frame_at = loop.time() - (LIVE_NO_FRAME_PROBE_SEC + 1.0)

    result = await proxy._maybe_probe_stale()

    assert result is True
    ws.close.assert_awaited_once()
    assert proxy._last_frame_at is None
    on_unreachable.assert_called_once()


@pytest.mark.asyncio
async def test_lv5_no_stale_frame_broadcast_during_reconnect() -> None:
    """With freshness cleared (reconnect window), _deliver_tick emits NOTHING."""
    proxy = _make_proxy()
    received: list[dict[str, Any]] = []
    proxy._subs[1] = _Subscription(callback=received.append, remote=False)

    # Simulate the post-probe reconnect state: a stale last_good_frame is still
    # held for the paint baseline, but _last_frame_at was nulled by the probe.
    proxy._last_good_frame = _frame(99)
    proxy._last_frame_at = None

    proxy._deliver_tick(now=10.0)

    assert received == []  # the stale frame must NOT be replayed.

    # Once a fresh frame is ingested, delivery resumes as live.
    _ingest(proxy, _frame(100), at=10.0)
    proxy._deliver_tick(now=10.0)
    assert len(received) == 1
    assert received[0]["marker"] == 100
    assert received[0]["status"] == STATUS_LIVE


@pytest.mark.asyncio
async def test_lv5_force_reconnect_idempotent_when_ws_closed() -> None:
    """_force_reconnect tolerates a missing/closed ws and still clears freshness."""
    proxy = _make_proxy()
    proxy._ws = None
    proxy._last_frame_at = 5.0

    await proxy._force_reconnect()

    assert proxy._last_frame_at is None
