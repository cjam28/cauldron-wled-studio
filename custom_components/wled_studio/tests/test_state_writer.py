"""StateWriter shutdown and coalescing."""

from __future__ import annotations

import asyncio

import pytest

from wled_studio.state_writer import StateWriter


async def _slow_post(
    patch: dict, *, full_response: bool = False
) -> dict:
    await asyncio.sleep(0.05)
    return {"ok": True, **patch}


async def _closed_session_post(
    patch: dict, *, full_response: bool = False
) -> dict:
    raise RuntimeError("Session is closed")


@pytest.mark.asyncio
async def test_shutdown_cancels_in_flight() -> None:
    writer = StateWriter()
    apply_task = asyncio.create_task(
        writer.apply(_slow_post, {"bri": 128}, full_response=False)
    )
    await asyncio.sleep(0.01)
    await writer.shutdown_async()
    result = await apply_task
    assert result is None


@pytest.mark.asyncio
async def test_shutdown_drops_new_apply() -> None:
    writer = StateWriter()
    await writer.shutdown_async()
    result = await writer.apply(_slow_post, {"bri": 100})
    assert result is None


@pytest.mark.asyncio
async def test_closed_session_does_not_raise_after_shutdown() -> None:
    writer = StateWriter()
    await writer.shutdown_async()
    result = await writer.apply(_closed_session_post, {"on": True})
    assert result is None


@pytest.mark.asyncio
async def test_unavailable_error_reraises_when_active() -> None:
    writer = StateWriter()
    with pytest.raises(RuntimeError, match="Session is closed"):
        await writer.apply(_closed_session_post, {"on": True})


@pytest.mark.asyncio
async def test_merge_pending_segments_by_id() -> None:
    from wled_studio.state_writer import _merge_state

    base = {"seg": [{"id": 0, "bri": 100, "fx": 1}]}
    patch = {"seg": [{"id": 0, "bri": 200}, {"id": 1, "bri": 50}]}
    merged = _merge_state(base, patch)
    segs = {int(s["id"]): s for s in merged["seg"]}
    assert segs[0]["bri"] == 200
    assert segs[0]["fx"] == 1
    assert segs[1]["bri"] == 50
