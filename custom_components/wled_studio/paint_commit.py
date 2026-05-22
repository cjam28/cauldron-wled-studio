"""Map a DDP paint buffer to WLED /json/state segment colors for commit."""

from __future__ import annotations

from typing import Any


def solid_effect_id(effects_by_name: dict[str, int]) -> int:
    return int(effects_by_name.get("Solid", 0))


def _segment_led_range(seg: dict[str, Any], pixel_count: int) -> tuple[int, int]:
    start = int(seg.get("start") or 0)
    stop = int(seg.get("stop") or 0)
    if stop <= start:
        stop = start + int(seg.get("len") or 0)
    if stop <= start:
        stop = pixel_count
    return max(0, start), min(pixel_count, stop)


def average_led_color(
    payload: bytes, *, rgbw: bool, start: int, stop: int
) -> list[int]:
    """Return [R, G, B, W] averaged over LEDs in [start, stop)."""
    bpp = 4 if rgbw else 3
    total_r = total_g = total_b = total_w = 0
    count = 0
    for led in range(start, stop):
        offset = led * bpp
        if offset + 2 >= len(payload):
            break
        total_r += payload[offset]
        total_g += payload[offset + 1]
        total_b += payload[offset + 2]
        if rgbw and offset + 3 < len(payload):
            total_w += payload[offset + 3]
        count += 1
    if count == 0:
        return [0, 0, 0, 0]
    return [
        total_r // count,
        total_g // count,
        total_b // count,
        (total_w // count) if rgbw else 0,
    ]


def build_paint_commit_state(
    *,
    payload: bytes,
    rgbw: bool,
    live_segments: list[dict[str, Any]],
    pixel_count: int,
    effects_by_name: dict[str, int],
) -> dict[str, Any]:
    """Build a state patch that applies painted colors and exits live mode.

    Each WLED segment gets the average RGB(W) of painted LEDs in its range,
    with effect set to Solid so colors are visible after ``live: false``.
    """
    if not payload:
        raise ValueError("empty paint buffer")
    if pixel_count <= 0:
        raise ValueError("invalid pixel_count")

    bpp = 4 if rgbw else 3
    expected = pixel_count * bpp
    if len(payload) < expected:
        raise ValueError(
            f"paint buffer length {len(payload)} < expected {expected}"
        )

    solid_fx = solid_effect_id(effects_by_name)
    seg_patches: list[dict[str, Any]] = []

    segments = live_segments if live_segments else [{"id": 0, "start": 0, "stop": pixel_count}]
    for raw in segments:
        if not isinstance(raw, dict):
            continue
        sid = int(raw.get("id", 0))
        start, stop = _segment_led_range(raw, pixel_count)
        if stop <= start:
            continue
        color = average_led_color(payload, rgbw=rgbw, start=start, stop=stop)
        seg_patches.append(
            {
                "id": sid,
                "on": True,
                "fx": solid_fx,
                "col": [color],
            }
        )

    if not seg_patches:
        color = average_led_color(payload, rgbw=rgbw, start=0, stop=pixel_count)
        seg_patches.append(
            {"id": 0, "on": True, "fx": solid_fx, "col": [color]}
        )

    return {"live": False, "on": True, "seg": seg_patches}
