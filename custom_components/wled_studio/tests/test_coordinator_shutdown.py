"""Coordinator async_shutdown idempotency and cleanup."""

from __future__ import annotations

from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from wled_studio.coordinator import WledStudioCoordinator


def _make_coordinator() -> WledStudioCoordinator:
    hass = MagicMock()
    hass.data = {}
    entry = SimpleNamespace(
        entry_id="test-entry",
        data={"wled_config_entry": "wled-entry", "host": "192.168.1.50"},
        title="Test Studio",
    )
    coord = WledStudioCoordinator(hass, entry)
    coord.scene_store = MagicMock()
    coord.scene_store.async_flush = AsyncMock()
    coord.client = MagicMock()
    coord.client.shutdown_writes = AsyncMock()
    coord._session = MagicMock()
    coord._session.close = AsyncMock()
    return coord


@pytest.mark.asyncio
async def test_async_shutdown_idempotent() -> None:
    coord = _make_coordinator()
    client = coord.client
    session = coord._session

    with patch(
        "wled_studio.coordinator.shutdown_live_proxy",
        new_callable=AsyncMock,
    ) as shutdown_proxy:
        await coord.async_shutdown()
        await coord.async_shutdown()

    assert coord._shutting_down is True
    shutdown_proxy.assert_awaited_once()
    client.shutdown_writes.assert_awaited_once()
    session.close.assert_awaited_once()
    assert coord.client is None
    assert coord._session is None


@pytest.mark.asyncio
async def test_async_shutdown_clears_client_and_session() -> None:
    coord = _make_coordinator()
    client = coord.client
    session = coord._session

    with patch(
        "wled_studio.coordinator.shutdown_live_proxy",
        new_callable=AsyncMock,
    ):
        await coord.async_shutdown()

    coord.scene_store.async_flush.assert_awaited_once()
    client.shutdown_writes.assert_awaited_once()
    session.close.assert_awaited_once()
    assert coord.client is None
    assert coord._session is None
