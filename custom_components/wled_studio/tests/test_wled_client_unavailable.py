"""Tests for is_client_unavailable error classification."""

from __future__ import annotations

import asyncio

import aiohttp
import pytest
from aiohttp import ClientConnectorError, ClientResponseError
from yarl import URL

from wled_studio.wled_client import WledClientUnavailable, is_client_unavailable


def test_wled_client_unavailable() -> None:
    assert is_client_unavailable(WledClientUnavailable("session closed")) is True


def test_cancelled_error() -> None:
    assert is_client_unavailable(asyncio.CancelledError()) is True


def test_client_connector_error() -> None:
    err = ClientConnectorError(
        connection_key=(),
        os_error=OSError("Connection refused"),
    )
    assert is_client_unavailable(err) is True


def test_runtime_error_session_closed() -> None:
    assert is_client_unavailable(RuntimeError("Session is closed")) is True


def test_client_response_error_not_unavailable() -> None:
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
    assert is_client_unavailable(err) is False


@pytest.mark.parametrize(
    "message",
    [
        "server disconnected",
        "Connection reset by peer",
    ],
)
def test_message_heuristics(message: str) -> None:
    assert is_client_unavailable(RuntimeError(message)) is True
