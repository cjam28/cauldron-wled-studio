"""Parse WLED 16.x live-view frames: binary L\\x01 RGB or text JSON (never raises)."""

from __future__ import annotations

import logging
import re
from typing import Any

_LOGGER = logging.getLogger(__name__)
_HEX_RE = re.compile(r"^[0-9a-fA-F]+$")
_LV_MAGIC = ord("L")


def parse_lv_binary(data: bytes | bytearray | memoryview) -> dict[str, Any] | None:
    """Parse WLED 16.x WebSocket binary live frames (L\\x01 + RGB triplets)."""
    if len(data) < 5:
        return None
    buf = bytes(data)
    if buf[0] != _LV_MAGIC:
        return None
    body = buf[2:]
    if len(body) < 3 or len(body) % 3 != 0:
        return None

    # Dim/off placeholder: fixed-size packet filled with ';' (0x3b) separators.
    if body[0] == ord(";") and all(b == ord(";") for b in body):
        n = len(body) // 3
        return {
            "leds_hex": ["000000"] * n,
            "n": n,
            "channels": 3,
            "scale": 1.0,
            "count": n,
        }

    leds_hex: list[str] = []
    for i in range(0, len(body), 3):
        r, g, b = body[i], body[i + 1], body[i + 2]
        leds_hex.append(f"{r:02x}{g:02x}{b:02x}")
    n = len(leds_hex)
    return {
        "leds_hex": leds_hex,
        "n": n,
        "channels": 3,
        "scale": 1.0,
        "count": n,
    }


def parse_lv_message(raw: Any) -> dict[str, Any] | None:
    """Parse a WS JSON message; return normalized frame or None."""
    if not isinstance(raw, dict):
        return None
    leds = raw.get("leds")
    if not isinstance(leds, list) or not leds:
        return None

    parsed_hex: list[str] = []
    channels = 3
    for item in leds:
        if not isinstance(item, str):
            continue
        s = item.strip().lstrip("#")
        if not s or len(s) % 2 != 0 or not _HEX_RE.match(s):
            continue
        if len(s) == 8:
            channels = max(channels, 4)
        elif len(s) != 6:
            continue
        parsed_hex.append(s.lower())

    if not parsed_hex:
        return None

    n = raw.get("n")
    try:
        n_int = int(n) if n is not None else len(parsed_hex)
    except (TypeError, ValueError):
        n_int = len(parsed_hex)
    if n_int < 1:
        return None

    scale = n_int / len(parsed_hex)
    return {
        "leds_hex": parsed_hex,
        "n": n_int,
        "channels": channels,
        "scale": scale,
        "count": len(parsed_hex),
    }
