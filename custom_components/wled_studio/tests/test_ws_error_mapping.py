"""Tests for websocket client-unavailable error mapping."""

from __future__ import annotations

import asyncio
from unittest.mock import AsyncMock, MagicMock

import aiohttp
import pytest
from aiohttp import ClientConnectorError, ClientResponseError
from yarl import URL

from wled_studio.ws_api import _ws_call, _ws_client_error
from wled_studio.wled_client import WledClientUnavailable


def _mock_connection() -> MagicMock:
    connection = MagicMock()
    connection.send_error = MagicMock()
    return connection


def test_ws_client_error_handles_unavailable() -> None:
    connection = _mock_connection()
    err = WledClientUnavailable("reloading")

    handled = _ws_client_error(connection, 42, err)

    assert handled is True
    connection.send_error.assert_called_once_with(
        42,
        "not_ready",
        "WLED client is reloading or unreachable — retry in a moment",
    )


def test_ws_client_error_ignores_http_errors() -> None:
    connection = _mock_connection()
    request_info = aiohttp.RequestInfo(
        url=URL("http://192.168.1.1/json/state"),
        method="POST",
        headers={},
        real_url=URL("http://192.168.1.1/json/state"),
    )
    err = ClientResponseError(
        request_info=request_info,
        history=(),
        status=404,
        message="Not Found",
    )

    handled = _ws_client_error(connection, 7, err)

    assert handled is False
    connection.send_error.assert_not_called()


@pytest.mark.asyncio
async def test_ws_call_returns_none_on_unavailable() -> None:
    connection = _mock_connection()

    async def failing() -> dict:
        raise ClientConnectorError(
            connection_key=(),
            os_error=OSError("Connection refused"),
        )

    result = await _ws_call(connection, 99, failing())

    assert result is None
    connection.send_error.assert_called_once_with(
        99,
        "not_ready",
        "WLED client is reloading or unreachable — retry in a moment",
    )


@pytest.mark.asyncio
async def test_ws_call_reraises_non_unavailable() -> None:
    connection = _mock_connection()
    request_info = aiohttp.RequestInfo(
        url=URL("http://192.168.1.1/json/state"),
        method="POST",
        headers={},
        real_url=URL("http://192.168.1.1/json/state"),
    )
    err = ClientResponseError(
        request_info=request_info,
        history=(),
        status=500,
        message="Internal Server Error",
    )

    async def failing() -> None:
        raise err

    with pytest.raises(ClientResponseError):
        await _ws_call(connection, 11, failing())

    connection.send_error.assert_not_called()


@pytest.mark.asyncio
async def test_ws_call_returns_result_on_success() -> None:
    connection = _mock_connection()

    async def ok() -> dict[str, str]:
        return {"ok": "yes"}

    result = await _ws_call(connection, 3, ok())

    assert result == {"ok": "yes"}
    connection.send_error.assert_not_called()


@pytest.mark.asyncio
async def test_ws_call_propagates_cancelled_error() -> None:
    connection = _mock_connection()

    async def cancelled() -> None:
        raise asyncio.CancelledError()

    with pytest.raises(asyncio.CancelledError):
        await _ws_call(connection, 5, cancelled())

    connection.send_error.assert_not_called()
