"""Parse WLED 16.x text JSON lv:true frames (defensive, never raises)."""

from __future__ import annotations

import logging
import re
from typing import Any

_LOGGER = logging.getLogger(__name__)
_HEX_RE = re.compile(r"^[0-9a-fA-F]+$")


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
