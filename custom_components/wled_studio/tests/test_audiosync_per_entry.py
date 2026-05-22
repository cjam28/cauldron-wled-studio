"""AudioSyncListener is owned per config entry, not a hass.data singleton."""

from __future__ import annotations

from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from wled_studio.audiosync import AudioSyncListener
from wled_studio.coordinator import WledStudioCoordinator


def _make_entry(entry_id: str) -> SimpleNamespace:
    return SimpleNamespace(
        entry_id=entry_id,
        data={"wled_config_entry": f"wled-{entry_id}", "host": "192.168.1.50"},
        title=f"Studio {entry_id}",
    )


def _make_coordinator(entry_id: str) -> WledStudioCoordinator:
    hass = MagicMock()
    hass.data = {}
    return WledStudioCoordinator(hass, _make_entry(entry_id))


async def _setup_with_ar(coord: WledStudioCoordinator) -> None:
    client = MagicMock()
    client.bootstrap = AsyncMock()
    client.info = {"u": {"AudioReactive": "1.0"}}
    coord._resolve_master_entity = MagicMock(return_value="light.test")  # type: ignore[method-assign]
    coord._resolve_segment_entities = MagicMock(return_value=[])  # type: ignore[method-assign]

    async def fake_start(self: AudioSyncListener) -> None:
        self._transport = MagicMock()

    with (
        patch(
            "wled_studio.coordinator.resolve_wled_entry",
            new_callable=AsyncMock,
            return_value=SimpleNamespace(data={"host": "192.168.1.50"}),
        ),
        patch("wled_studio.coordinator.aiohttp.ClientSession"),
        patch("wled_studio.coordinator.WledClient", return_value=client),
        patch("wled_studio.coordinator.get_live_proxy", return_value=MagicMock()),
        patch.object(AudioSyncListener, "start", fake_start),
    ):
        await coord.async_setup()


@pytest.mark.asyncio
async def test_audiosync_stop_idempotent() -> None:
    listener = AudioSyncListener(MagicMock(), "entry-a")
    transport = MagicMock()
    listener._transport = transport

    await listener.stop()
    await listener.stop()

    transport.close.assert_called_once()
    assert listener._transport is None


@pytest.mark.asyncio
async def test_async_setup_creates_listener_per_entry() -> None:
    coord_a = _make_coordinator("entry-a")
    coord_b = _make_coordinator("entry-b")

    await _setup_with_ar(coord_a)
    await _setup_with_ar(coord_b)

    assert coord_a.audio_listener is not None
    assert coord_b.audio_listener is not None
    assert coord_a.audio_listener is not coord_b.audio_listener
    assert coord_a.audio_listener.entry_id == "entry-a"
    assert coord_b.audio_listener.entry_id == "entry-b"
    assert "wled_studio_audio_listener" not in coord_a.hass.data
    assert "wled_studio_audio_listener" not in coord_b.hass.data


@pytest.mark.asyncio
async def test_shutdown_stops_only_own_listener() -> None:
    coord_a = _make_coordinator("entry-a")
    coord_b = _make_coordinator("entry-b")
    listener_a = MagicMock(spec=AudioSyncListener)
    listener_a.stop = AsyncMock()
    listener_b = MagicMock(spec=AudioSyncListener)
    listener_b.stop = AsyncMock()
    coord_a.audio_listener = listener_a
    coord_b.audio_listener = listener_b
    coord_a.scene_store = MagicMock()
    coord_a.scene_store.async_flush = AsyncMock()
    coord_b.scene_store = MagicMock()
    coord_b.scene_store.async_flush = AsyncMock()

    with patch(
        "wled_studio.coordinator.shutdown_live_proxy",
        new_callable=AsyncMock,
    ):
        await coord_a.async_shutdown()

    listener_a.stop.assert_awaited_once()
    listener_b.stop.assert_not_awaited()
    assert coord_a.audio_listener is None
    assert coord_b.audio_listener is listener_b
