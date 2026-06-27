"""WS paint-status surface tests (SP-4 health + SP-5 segment-count estimate).

These cover the ZERO-coverage seams added for Phase 4.5:

- ``ws_paint_frame`` spreads ``**status`` into its result so the painter learns
  connection health (SP-4) and the segment-count estimate (SP-5) on every frame
  ack, additively, without touching the FROZEN DDP wire.
- the new ``wled_studio/paint_status`` WS endpoint (active + inactive sessions).
- ``PaintSession.segment_count_status()`` (SP-5) and its merge into
  ``connection_status()``.

The WS handlers are decorated with HA's ``@websocket_command`` /
``@async_response``; ``functools.wraps`` preserves ``__wrapped__``, so we call
the bare ``async def`` (signature ``(hass, connection, msg)``) directly with
lightweight fakes — no full HA websocket plumbing required.

Run from the repo root so ``pythonpath = custom_components`` resolves
``wled_studio``::

    source .venv/bin/activate && python -m pytest custom_components/wled_studio/tests/
"""

from __future__ import annotations

import base64
from typing import Any

import pytest

from wled_studio.const import DOMAIN, SCHEMA_VERSION
from wled_studio.paint import UNHEALTHY_FAILURE_THRESHOLD, PaintSession
from wled_studio.ws_api import ws_paint_frame, ws_paint_status

# The bare async handlers behind HA's decorator chain.
_paint_frame = ws_paint_frame.__wrapped__
_paint_status = ws_paint_status.__wrapped__


# --------------------------------------------------------------------------- #
# Fakes
# --------------------------------------------------------------------------- #


class FakeWledClient:
    """Minimal WledClient stand-in (no network)."""

    def __init__(self, *, pixel_count: int = 40, rgbw: bool = True) -> None:
        self.info: dict[str, Any] = {
            "leds": {"count": pixel_count, "rgbw": rgbw, "maxseg": 10},
            "wifi": {"sleep": False},
        }
        self.state: dict[str, Any] = {
            "bri": 255,
            "seg": [{"id": 0, "start": 0, "stop": pixel_count}],
        }
        self.effects_by_name: dict[str, int] = {"Solid": 0, "Blink": 1}

    async def get_state(self, *, refresh: bool = False) -> dict[str, Any]:
        return self.state

    async def apply_state(
        self, patch: dict[str, Any], *, full_response: bool = False
    ) -> dict[str, Any]:
        return self.state


class FakeCoordinator:
    """Holds a single PaintSession, like the real coordinator does."""

    def __init__(self, host: str = "10.0.0.5", *, pixel_count: int = 40) -> None:
        self.host = host
        self.client = FakeWledClient(pixel_count=pixel_count)
        self.paint_session: PaintSession | None = None

    def get_paint_session(self) -> PaintSession:
        if self.paint_session is None:
            self.paint_session = PaintSession(self.host, self.client)  # type: ignore[arg-type]
        return self.paint_session


class FakeHass:
    """Carries ``hass.data[DOMAIN][controller_id] -> coordinator``."""

    def __init__(self) -> None:
        self.data: dict[str, Any] = {}


class FakeConnection:
    """Records the single result/error the handler emits."""

    def __init__(self) -> None:
        self.results: list[tuple[int, dict[str, Any]]] = []
        self.errors: list[tuple[int, str, str]] = []

    def send_result(self, msg_id: int, result: dict[str, Any]) -> None:
        self.results.append((msg_id, result))

    def send_error(self, msg_id: int, code: str, message: str) -> None:
        self.errors.append((msg_id, code, message))

    @property
    def result(self) -> dict[str, Any]:
        assert len(self.results) == 1, f"expected exactly one result, got {self.results}"
        return self.results[0][1]


def _register(hass: FakeHass, coord: FakeCoordinator, controller_id: str = "c1") -> str:
    hass.data.setdefault(DOMAIN, {})[controller_id] = coord
    return controller_id


def _rgbw_payload(pixel_count: int) -> bytes:
    return bytes([200, 0, 0, 0] * pixel_count)


def _b64(payload: bytes) -> str:
    return base64.b64encode(payload).decode("ascii")


async def _start_session(coord: FakeCoordinator, monkeypatch: pytest.MonkeyPatch):
    """Start the coordinator's paint session against a recording fake transport."""
    import asyncio

    sent: list[tuple[bytes, Any]] = []

    class _T(asyncio.DatagramTransport):
        def sendto(self, data: Any, addr: Any = None) -> None:  # type: ignore[override]
            sent.append((bytes(data), addr))

        def close(self) -> None:  # type: ignore[override]
            pass

    async def _fake_create_endpoint(*_a: Any, **_k: Any):
        return _T(), object()

    loop = asyncio.get_running_loop()
    monkeypatch.setattr(loop, "create_datagram_endpoint", _fake_create_endpoint)
    session = coord.get_paint_session()
    await session.start(None)
    # Kill the 1.5s keepalive loop; tests drive sends deterministically.
    if session._keepalive_task:
        session._keepalive_task.cancel()
        try:
            await session._keepalive_task
        except asyncio.CancelledError:
            pass
    return session, sent


# --------------------------------------------------------------------------- #
# SP-5: PaintSession.segment_count_status() + merge into connection_status()
# --------------------------------------------------------------------------- #


def _alternating(pixel_count: int) -> tuple[bytes, bytes, set[int]]:
    """Paint every other LED → many short runs (forces a high seg_count)."""
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    touched: set[int] = set()
    for led in range(0, pixel_count, 2):
        o = led * bpp
        payload[o : o + 3] = bytes([255, 0, 0])
        touched.add(led)
    return bytes(payload), baseline, touched


def _seed_buffer(session: PaintSession, payload: bytes, baseline: bytes, touched: set[int]) -> None:
    session._last_payload = payload
    session._last_rgbw = True
    session._baseline_payload = baseline
    session._segment_snapshot = [{"id": 0, "start": 0, "stop": len(payload) // 4}]
    session._touched = touched
    session._paint_mode = "color"
    session._brush = {"fx": 0, "bri": 255, "on": True}
    session._fill = {"mode": "off"}


def test_segment_count_status_empty_when_no_buffer() -> None:
    """No frame yet → empty dict (nothing to estimate); never raises."""
    session = PaintSession("1.2.3.4", FakeWledClient())  # type: ignore[arg-type]
    assert session.segment_count_status() == {}


def test_segment_count_status_warns_near_max() -> None:
    """A dense buffer (>=80% of maxseg runs) reports seg_warn True with the count."""
    pixel_count = 40
    payload, baseline, touched = _alternating(pixel_count)
    session = PaintSession("1.2.3.4", FakeWledClient(pixel_count=pixel_count))  # type: ignore[arg-type]
    _seed_buffer(session, payload, baseline, touched)

    status = session.segment_count_status()
    # maxseg=10 → warn_at = int(0.8 * 10) = 8.
    assert status["max_segments"] == 10
    assert status["seg_warn"] is True
    assert status["seg_count"] >= int(0.8 * 10)


def test_segment_count_status_sparse_no_warn() -> None:
    """A sparse buffer (few contiguous runs) reports seg_warn False."""
    pixel_count = 40
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    touched = {0, 1, 2}
    for led in touched:
        o = led * bpp
        payload[o : o + 3] = bytes([0, 255, 0])
    session = PaintSession("1.2.3.4", FakeWledClient(pixel_count=pixel_count))  # type: ignore[arg-type]
    _seed_buffer(session, bytes(payload), baseline, touched)

    status = session.segment_count_status()
    assert status["seg_warn"] is False
    assert status["seg_count"] < int(0.8 * 10)


def test_segment_count_status_swallows_estimate_errors(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """SP-5 must never break a frame: a broken estimator yields {} not a raise."""
    pixel_count = 40
    payload, baseline, touched = _alternating(pixel_count)
    session = PaintSession("1.2.3.4", FakeWledClient(pixel_count=pixel_count))  # type: ignore[arg-type]
    _seed_buffer(session, payload, baseline, touched)

    def _boom(*_a: Any, **_k: Any) -> dict[str, Any]:
        raise RuntimeError("estimator blew up")

    # The estimate is computed via paint.count_paint_segments (imported there).
    monkeypatch.setattr("wled_studio.paint.count_paint_segments", _boom)
    assert session.segment_count_status() == {}
    # And the merge into connection_status() degrades gracefully too.
    assert "seg_count" not in session.connection_status()


def test_connection_status_merges_segment_count() -> None:
    """connection_status() additively folds in segment_count_status() keys."""
    pixel_count = 40
    payload, baseline, touched = _alternating(pixel_count)
    session = PaintSession("1.2.3.4", FakeWledClient(pixel_count=pixel_count))  # type: ignore[arg-type]
    _seed_buffer(session, payload, baseline, touched)

    status = session.connection_status()
    # SP-4 health keys still present and unchanged...
    assert status["connection_healthy"] is True
    assert status["connection_reason"] is None
    assert status["consecutive_send_failures"] == 0
    assert "last_success_ts" in status
    # ...plus the SP-5 estimate merged in.
    assert status["seg_warn"] is True
    assert status["seg_count"] == session.segment_count_status()["seg_count"]
    assert status["max_segments"] == 10


def test_connection_status_without_buffer_has_no_seg_keys() -> None:
    """Before any frame, the merge contributes nothing (empty dict spread)."""
    session = PaintSession("1.2.3.4", FakeWledClient())  # type: ignore[arg-type]
    status = session.connection_status()
    assert "seg_count" not in status
    assert "seg_warn" not in status
    assert status["connection_healthy"] is True


# --------------------------------------------------------------------------- #
# ws_paint_frame: result is {ok, schema_version, **status}
# --------------------------------------------------------------------------- #


@pytest.mark.asyncio
async def test_ws_paint_frame_result_spreads_status(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """The frame ack carries ok + schema_version + every connection_status key."""
    pixel_count = 40
    coord = FakeCoordinator(pixel_count=pixel_count)
    hass = FakeHass()
    cid = _register(hass, coord)
    await _start_session(coord, monkeypatch)

    # A dense buffer so the SP-5 estimate is meaningful (seg_warn True).
    payload, _baseline, touched = _alternating(pixel_count)
    conn = FakeConnection()
    await _paint_frame(
        hass,
        conn,
        {
            "id": 1,
            "type": "wled_studio/paint_frame",
            "controller_id": cid,
            "data": _b64(payload),
            "rgbw": True,
            "touched": sorted(touched),
            "paint_mode": "color",
            "brush": {"fx": 0, "bri": 255, "on": True},
        },
    )

    assert conn.errors == []
    result = conn.result
    assert result["ok"] is True
    assert result["schema_version"] == SCHEMA_VERSION
    # The ack must equal {ok, schema_version} unioned with the live status.
    session = coord.paint_session
    assert session is not None
    status = session.connection_status()
    for key, val in status.items():
        assert result[key] == val
    # SP-4 + SP-5 keys are actually present (not just trivially absent).
    assert result["connection_healthy"] is True
    assert result["seg_warn"] is True
    assert result["seg_count"] >= int(0.8 * 10)


@pytest.mark.asyncio
async def test_ws_paint_frame_status_reports_unhealthy_after_failures(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """SP-4: once sends fail past the threshold, the frame ack flips unhealthy.

    The DDP frame is still produced (freshest data) — health is informational,
    never a freeze signal.
    """
    coord = FakeCoordinator(pixel_count=8)
    hass = FakeHass()
    cid = _register(hass, coord)
    session, _sent = await _start_session(coord, monkeypatch)

    # Make every sendto raise to simulate a mid-paint link loss.
    def _boom(*_a: Any, **_k: Any) -> None:
        raise OSError("network unreachable")

    monkeypatch.setattr(session._transport, "sendto", _boom)

    payload = _rgbw_payload(8)
    last_result: dict[str, Any] = {}
    for i in range(UNHEALTHY_FAILURE_THRESHOLD):
        conn = FakeConnection()
        await _paint_frame(
            hass,
            conn,
            {
                "id": 10 + i,
                "type": "wled_studio/paint_frame",
                "controller_id": cid,
                "data": _b64(payload),
                "rgbw": True,
                "paint_mode": "color",
            },
        )
        assert conn.errors == []
        last_result = conn.result

    assert last_result["ok"] is True
    assert last_result["connection_healthy"] is False
    assert isinstance(last_result["connection_reason"], str)
    assert last_result["consecutive_send_failures"] >= UNHEALTHY_FAILURE_THRESHOLD


@pytest.mark.asyncio
async def test_ws_paint_frame_invalid_base64_errors() -> None:
    """Bad payload → invalid_payload error, no result (wire untouched)."""
    coord = FakeCoordinator()
    hass = FakeHass()
    cid = _register(hass, coord)
    conn = FakeConnection()
    await _paint_frame(
        hass,
        conn,
        {
            "id": 2,
            "type": "wled_studio/paint_frame",
            "controller_id": cid,
            "data": "!!!not-base64!!!",
            "rgbw": True,
        },
    )
    assert conn.results == []
    assert len(conn.errors) == 1
    assert conn.errors[0][1] == "invalid_payload"


@pytest.mark.asyncio
async def test_ws_paint_frame_unknown_controller_errors() -> None:
    hass = FakeHass()
    conn = FakeConnection()
    await _paint_frame(
        hass,
        conn,
        {
            "id": 3,
            "type": "wled_studio/paint_frame",
            "controller_id": "missing",
            "data": _b64(_rgbw_payload(4)),
            "rgbw": True,
        },
    )
    assert conn.results == []
    assert conn.errors and conn.errors[0][1] == "not_found"


# --------------------------------------------------------------------------- #
# ws_paint_status endpoint
# --------------------------------------------------------------------------- #


@pytest.mark.asyncio
async def test_ws_paint_status_inactive_session() -> None:
    """No session (or inactive) → active False, healthy defaults, no seg keys."""
    coord = FakeCoordinator()
    hass = FakeHass()
    cid = _register(hass, coord)
    conn = FakeConnection()
    await _paint_status(
        hass,
        conn,
        {"id": 1, "type": "wled_studio/paint_status", "controller_id": cid},
    )
    assert conn.errors == []
    result = conn.result
    assert result["ok"] is True
    assert result["schema_version"] == SCHEMA_VERSION
    assert result["active"] is False
    assert result["connection_healthy"] is True
    assert result["connection_reason"] is None
    assert result["consecutive_send_failures"] == 0
    assert result["last_success_ts"] is None


@pytest.mark.asyncio
async def test_ws_paint_status_active_session_includes_health_and_segcount(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """Active session → active True + the full connection_status() (SP-4 + SP-5)."""
    pixel_count = 40
    coord = FakeCoordinator(pixel_count=pixel_count)
    hass = FakeHass()
    cid = _register(hass, coord)
    session, _sent = await _start_session(coord, monkeypatch)

    payload, baseline, touched = _alternating(pixel_count)
    _seed_buffer(session, payload, baseline, touched)

    conn = FakeConnection()
    await _paint_status(
        hass,
        conn,
        {"id": 5, "type": "wled_studio/paint_status", "controller_id": cid},
    )
    assert conn.errors == []
    result = conn.result
    assert result["ok"] is True
    assert result["active"] is True
    # SP-4 health.
    assert result["connection_healthy"] is True
    assert "consecutive_send_failures" in result
    # SP-5 estimate merged through connection_status().
    assert result["seg_warn"] is True
    assert result["seg_count"] >= int(0.8 * 10)
    assert result["max_segments"] == 10


@pytest.mark.asyncio
async def test_ws_paint_status_unknown_controller_errors() -> None:
    hass = FakeHass()
    conn = FakeConnection()
    await _paint_status(
        hass,
        conn,
        {"id": 9, "type": "wled_studio/paint_status", "controller_id": "nope"},
    )
    assert conn.results == []
    assert conn.errors and conn.errors[0][1] == "not_found"
