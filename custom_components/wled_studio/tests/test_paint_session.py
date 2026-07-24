"""PaintSession transport tests (SP-1 instant feedback, SP-4 disconnect health).

Run from the repo root so the ``pythonpath = custom_components`` from pytest.ini
resolves ``wled_studio``:

    source .venv/bin/activate && python -m pytest custom_components/wled_studio/tests/
"""

from __future__ import annotations

import asyncio
from typing import Any

import pytest

from wled_studio.ddp import reassemble_ddp_packets
from wled_studio.paint import DDP_PORT, UNHEALTHY_FAILURE_THRESHOLD, PaintSession


class FakeDatagramTransport(asyncio.DatagramTransport):
    """Records ``sendto`` calls (DDP packets) without touching the network."""

    def __init__(self) -> None:
        self.sent: list[tuple[bytes, tuple[str, int]]] = []
        self.closed = False
        self.fail = False  # when True, sendto raises (simulated link loss)

    def sendto(self, data: Any, addr: Any = None) -> None:  # type: ignore[override]
        if self.fail:
            raise OSError("network unreachable")
        self.sent.append((bytes(data), addr))

    def close(self) -> None:  # type: ignore[override]
        self.closed = True

    def is_closing(self) -> bool:  # type: ignore[override]
        return self.closed


class FakeWledClient:
    """Minimal WledClient stand-in for paint transport tests."""

    def __init__(self, *, pixel_count: int = 8, rgbw: bool = True) -> None:
        self.info: dict[str, Any] = {
            "leds": {"count": pixel_count, "rgbw": rgbw, "maxseg": 32},
            "wifi": {"sleep": False},
        }
        self.state: dict[str, Any] = {
            "bri": 255,
            "seg": [{"id": 0, "start": 0, "stop": pixel_count}],
        }
        self.effects_by_name: dict[str, int] = {"Solid": 0, "Blink": 1}
        self.applied_states: list[dict[str, Any]] = []

    async def get_state(self, *, refresh: bool = False) -> dict[str, Any]:
        return self.state

    async def apply_state(
        self, patch: dict[str, Any], *, full_response: bool = False
    ) -> dict[str, Any]:
        self.applied_states.append(patch)
        return self.state


def _rgbw_payload(pixel_count: int) -> bytes:
    """A red-ish RGBW buffer (4 bytes/pixel)."""
    return bytes([200, 0, 0, 0] * pixel_count)


async def _make_started_session(
    monkeypatch: pytest.MonkeyPatch,
    *,
    pixel_count: int = 8,
) -> tuple[PaintSession, FakeWledClient, FakeDatagramTransport]:
    """Build a started session with a fake transport (no real UDP socket)."""
    client = FakeWledClient(pixel_count=pixel_count)
    session = PaintSession("10.0.0.5", client)  # type: ignore[arg-type]
    transport = FakeDatagramTransport()

    async def _fake_create_endpoint(*_args: Any, **_kwargs: Any):
        return transport, object()

    loop = asyncio.get_running_loop()
    monkeypatch.setattr(loop, "create_datagram_endpoint", _fake_create_endpoint)
    await session.start(None)
    # Drop the keepalive loop: tests drive send paths deterministically and a
    # 1.5s background loop would only add flakiness.
    if session._keepalive_task:
        session._keepalive_task.cancel()
        try:
            await session._keepalive_task
        except asyncio.CancelledError:
            pass
    return session, client, transport


@pytest.mark.asyncio
async def test_effect_stroke_emits_immediate_ddp_and_schedules_preview(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """SP-1: an effect-mode stroke now produces an immediate DDP send.

    Before this change, effect strokes routed ONLY through the debounced device
    preview and emitted zero ``sendto`` calls — blank LEDs for 60-180ms. Now the
    painted buffer lights instantly via DDP while the effect preview is debounced.
    """
    session, client, transport = await _make_started_session(monkeypatch)
    payload = _rgbw_payload(8)

    assert transport.sent == []  # no frames yet

    await session.send_frame(
        payload,
        rgbw=True,
        touched=[0, 1, 2],
        paint_mode="effect",
        effect_id=1,
        brush={"fx": 1, "col": [0, 255, 0, 0], "bri": 255, "on": True},
    )

    # (1a) Immediate DDP frame for the stroke — proves instant feedback.
    assert len(transport.sent) >= 1, "effect stroke must emit at least one DDP frame"
    merged, rgbw = reassemble_ddp_packets([pkt for pkt, _ in transport.sent])
    assert rgbw is True
    assert merged == payload  # the painted color buffer, not blank
    assert transport.sent[0][1] == ("10.0.0.5", DDP_PORT)

    # (1b) The debounced device-effect preview is still scheduled (not run inline).
    assert session._effect_preview_task is not None
    assert not session._effect_preview_task.done()

    # Let the debounce fire; it pushes the animated effect to the device.
    await session._await_effect_preview_idle()
    assert client.applied_states, "effect preview should push a /json/state patch"
    assert any("seg" in p for p in client.applied_states)

    # The device-effect push leaves the device in non-live state; the next
    # effect stroke must re-enable live (color path at 175-177) before its
    # immediate DDP frame so it isn't suppressed.
    assert session._ddp_live is False
    sent_before = len(transport.sent)
    client.applied_states.clear()
    await session.send_frame(
        payload,
        rgbw=True,
        touched=[3, 4],
        paint_mode="effect",
        effect_id=1,
        brush={"fx": 1, "col": [0, 255, 0, 0], "bri": 255, "on": True},
    )
    assert session._ddp_live is True
    assert {"live": True} in client.applied_states
    assert len(transport.sent) == sent_before + 1  # another instant DDP frame

    await session.stop(commit=False)


@pytest.mark.asyncio
async def test_color_stroke_behavior_unchanged(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """SP-1 regression guard: color strokes still DDP + toggle live (lines 175-177)."""
    session, client, transport = await _make_started_session(monkeypatch)
    payload = _rgbw_payload(8)

    # Force the "not live" branch so we can assert the live re-enable toggle.
    session._ddp_live = False
    client.applied_states.clear()

    await session.send_frame(
        payload,
        rgbw=True,
        touched=[0, 1],
        paint_mode="color",
        brush={"fx": 0, "col": [255, 0, 0, 0], "bri": 255, "on": True},
    )

    # Still sends DDP.
    assert len(transport.sent) == 1
    merged, _ = reassemble_ddp_packets([pkt for pkt, _ in transport.sent])
    assert merged == payload
    # Still toggles live back on (the color path at 175-177).
    assert session._ddp_live is True
    assert {"live": True} in client.applied_states

    # No device-effect preview scheduled for color strokes.
    assert (
        session._effect_preview_task is None
        or session._effect_preview_task.done()
    )

    await session.stop(commit=False)


@pytest.mark.asyncio
async def test_keepalive_send_failures_flip_health_then_recover(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """SP-4: a run of failed sends flips connection_healthy False with a reason;
    a recovered send flips it back True."""
    session, _client, transport = await _make_started_session(monkeypatch)
    payload = _rgbw_payload(8)

    # Healthy at start.
    assert session.connection_healthy is True
    assert session.connection_reason is None or isinstance(
        session.connection_reason, str
    )

    # Simulate the link dropping mid-paint: every sendto now raises.
    transport.fail = True
    for _ in range(UNHEALTHY_FAILURE_THRESHOLD):
        await session.send_frame(payload, rgbw=True, paint_mode="color")

    assert session.connection_healthy is False
    reason = session.connection_reason
    assert isinstance(reason, str) and reason  # surfaced cause for the banner
    status = session.connection_status()
    assert status["connection_healthy"] is False
    assert status["consecutive_send_failures"] >= UNHEALTHY_FAILURE_THRESHOLD

    # The link recovers: a successful send flips health back to True.
    transport.fail = False
    await session.send_frame(payload, rgbw=True, paint_mode="color")

    assert session.connection_healthy is True
    assert session.connection_status()["consecutive_send_failures"] == 0

    await session.stop(commit=False)


@pytest.mark.asyncio
async def test_wifi_sleep_surfaced_as_health_reason(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """SP-4: wifi_sleep_warning is reused as a connection_reason cause."""
    session, client, _transport = await _make_started_session(monkeypatch)
    client.info["wifi"] = {"sleep": True}

    # Healthy connection still surfaces the wifi-sleep hint as the reason.
    assert session.connection_healthy is True
    assert session.connection_reason == session.wifi_sleep_warning()
    assert "WiFi sleep" in (session.connection_reason or "")

    await session.stop(commit=False)
