"""ws_paint_baseline_frame: the additive "Keep current look" baseline command.

Covers the handler that returns the controller's current per-LED frame
(live_proxy's last good frame) so the painter's preserve fill mode can seed its
canvas with the real colors instead of a gray placeholder. The DDP wire is
untouched — the handler only reads the already-decoded frame.

Two seams:
- frame PRESENT  → ok, rgbw, count=pixel_count, pixels = flat RGB(W) bytes.
- frame ABSENT   → ok, count 0 / empty pixels (graceful client fallback).

Run from the repo root so ``pythonpath = custom_components`` resolves
``wled_studio``::

    source .venv/bin/activate && python -m pytest custom_components/wled_studio/tests/
"""

from __future__ import annotations

from typing import Any

import pytest

from wled_studio.const import DOMAIN, SCHEMA_VERSION
from wled_studio.ws_api import ws_paint_baseline_frame

_baseline_frame = ws_paint_baseline_frame.__wrapped__


class FakeWledClient:
    def __init__(
        self,
        *,
        pixel_count: int = 4,
        rgbw: bool = True,
        state: dict[str, Any] | None = None,
    ) -> None:
        self.info: dict[str, Any] = {
            "leds": {"count": pixel_count, "rgbw": rgbw},
        }
        # WLED cached state (segments drive the segment-expansion fallback when
        # no live frame is available — the common painter case).
        self.state: dict[str, Any] = state if isinstance(state, dict) else {}


class FakeProxy:
    def __init__(self, frame: dict[str, Any] | None) -> None:
        self._frame = frame

    @property
    def last_good_frame(self) -> dict[str, Any] | None:
        return self._frame


class FakeCoordinator:
    def __init__(
        self,
        *,
        pixel_count: int = 4,
        rgbw: bool = True,
        frame: dict[str, Any] | None = None,
        proxy: bool = True,
        state: dict[str, Any] | None = None,
    ) -> None:
        self.client = FakeWledClient(
            pixel_count=pixel_count, rgbw=rgbw, state=state
        )
        self.live_proxy = FakeProxy(frame) if proxy else None


class FakeHass:
    def __init__(self) -> None:
        self.data: dict[str, Any] = {}


class FakeConnection:
    def __init__(self) -> None:
        self.results: list[tuple[int, dict[str, Any]]] = []
        self.errors: list[tuple[int, str, str]] = []

    def send_result(self, msg_id: int, result: dict[str, Any]) -> None:
        self.results.append((msg_id, result))

    def send_error(self, msg_id: int, code: str, message: str) -> None:
        self.errors.append((msg_id, code, message))

    @property
    def result(self) -> dict[str, Any]:
        assert len(self.results) == 1, f"expected one result, got {self.results}"
        return self.results[0][1]


def _register(hass: FakeHass, coord: FakeCoordinator, cid: str = "c1") -> str:
    hass.data.setdefault(DOMAIN, {})[cid] = coord
    return cid


@pytest.mark.asyncio
async def test_baseline_frame_present_returns_pixels() -> None:
    """A current frame → flat RGB(W) bytes for the whole strip."""
    pixel_count = 3
    # leds_hex: red, green, blue (RGB hex; W appended as 00 on the RGBW strip).
    frame = {"leds_hex": ["ff0000", "00ff00", "0000ff"]}
    coord = FakeCoordinator(pixel_count=pixel_count, rgbw=True, frame=frame)
    hass = FakeHass()
    cid = _register(hass, coord)

    conn = FakeConnection()
    await _baseline_frame(
        hass,
        conn,
        {
            "id": 1,
            "type": "wled_studio/paint_baseline_frame",
            "controller_id": cid,
        },
    )

    assert conn.errors == []
    result = conn.result
    assert result["ok"] is True
    assert result["schema_version"] == SCHEMA_VERSION
    assert result["rgbw"] is True
    assert result["count"] == pixel_count
    # 4 bytes/LED on RGBW; W defaults to 0 (frame hex carried only RGB).
    assert result["pixels"] == [
        255, 0, 0, 0,
        0, 255, 0, 0,
        0, 0, 255, 0,
    ]


@pytest.mark.asyncio
async def test_baseline_frame_absent_returns_empty() -> None:
    """No current frame (proxy not ingesting) → ok, count 0, empty pixels."""
    coord = FakeCoordinator(pixel_count=4, rgbw=True, frame=None)
    hass = FakeHass()
    cid = _register(hass, coord)

    conn = FakeConnection()
    await _baseline_frame(
        hass,
        conn,
        {
            "id": 2,
            "type": "wled_studio/paint_baseline_frame",
            "controller_id": cid,
        },
    )

    assert conn.errors == []
    result = conn.result
    assert result["ok"] is True
    assert result["count"] == 0
    assert result["pixels"] == []


@pytest.mark.asyncio
async def test_baseline_frame_falls_back_to_segment_colors() -> None:
    """No live frame, but WLED state has segments → reconstruct the current look
    from segment colors (the common painter case — proxy not ingesting). This is
    the same source the preserve commit-merge uses, so canvas == commit result."""
    pixel_count = 3
    # One segment spanning all 3 LEDs, solid red; no live frame.
    state = {"seg": [{"start": 0, "stop": 3, "col": [[255, 0, 0]]}]}
    coord = FakeCoordinator(
        pixel_count=pixel_count, rgbw=True, frame=None, state=state
    )
    hass = FakeHass()
    cid = _register(hass, coord)

    conn = FakeConnection()
    await _baseline_frame(
        hass,
        conn,
        {
            "id": 5,
            "type": "wled_studio/paint_baseline_frame",
            "controller_id": cid,
        },
    )

    assert conn.errors == []
    result = conn.result
    assert result["ok"] is True
    assert result["count"] == pixel_count
    # All 3 LEDs red, W=0 — NOT the empty fallback (the bug the owner saw on-device).
    assert result["pixels"] == [
        255, 0, 0, 0,
        255, 0, 0, 0,
        255, 0, 0, 0,
    ]


@pytest.mark.asyncio
async def test_baseline_frame_no_proxy_returns_empty() -> None:
    """A coordinator without a live_proxy degrades to the empty fallback."""
    coord = FakeCoordinator(pixel_count=4, proxy=False)
    hass = FakeHass()
    cid = _register(hass, coord)

    conn = FakeConnection()
    await _baseline_frame(
        hass,
        conn,
        {
            "id": 3,
            "type": "wled_studio/paint_baseline_frame",
            "controller_id": cid,
        },
    )

    assert conn.errors == []
    assert conn.result["count"] == 0
    assert conn.result["pixels"] == []


@pytest.mark.asyncio
async def test_baseline_frame_unknown_controller_errors() -> None:
    hass = FakeHass()
    conn = FakeConnection()
    await _baseline_frame(
        hass,
        conn,
        {
            "id": 9,
            "type": "wled_studio/paint_baseline_frame",
            "controller_id": "missing",
        },
    )
    assert conn.results == []
    assert conn.errors and conn.errors[0][1] == "not_found"
