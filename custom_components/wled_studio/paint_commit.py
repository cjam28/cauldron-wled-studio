"""Map paint buffers to WLED /json/state (per-LED ``i`` or effect segment splits)."""

from __future__ import annotations

import copy
from dataclasses import dataclass
from typing import Any

DEFAULT_MAX_SEGMENTS = 32


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


def _read_led_color(
    payload: bytes, *, rgbw: bool, led: int
) -> list[int]:
    bpp = 4 if rgbw else 3
    offset = led * bpp
    if offset + 2 >= len(payload):
        return [0, 0, 0, 0]
    r, g, b = payload[offset], payload[offset + 1], payload[offset + 2]
    w = payload[offset + 3] if rgbw and offset + 3 < len(payload) else 0
    return [r, g, b, w] if rgbw else [r, g, b]


def live_frame_to_payload(
    frame: dict[str, Any], pixel_count: int, *, rgbw: bool
) -> bytes | None:
    """Convert a live-view frame dict to a raw RGB(W) buffer."""
    hexes = frame.get("leds_hex")
    if not isinstance(hexes, list) or not hexes:
        return None
    bpp = 4 if rgbw else 3
    out = bytearray(pixel_count * bpp)
    for i, raw in enumerate(hexes[:pixel_count]):
        if not isinstance(raw, str) or len(raw) < 6:
            continue
        r = int(raw[0:2], 16)
        g = int(raw[2:4], 16)
        b = int(raw[4:6], 16)
        o = i * bpp
        out[o] = r
        out[o + 1] = g
        out[o + 2] = b
        if rgbw:
            out[o + 3] = int(raw[6:8], 16) if len(raw) >= 8 else 0
    return bytes(out)


def expand_segments_to_payload(
    segments: list[dict[str, Any]], pixel_count: int, *, rgbw: bool
) -> bytes:
    """Approximate current strip colors from segment ``col`` (solid per segment)."""
    bpp = 4 if rgbw else 3
    out = bytearray(pixel_count * bpp)
    if not segments:
        return bytes(out)
    for raw in segments:
        if not isinstance(raw, dict):
            continue
        start, stop = _segment_led_range(raw, pixel_count)
        col_raw = raw.get("col")
        color = [0, 0, 0, 0]
        if isinstance(col_raw, list) and col_raw:
            first = col_raw[0]
            if isinstance(first, (list, tuple)) and len(first) >= 3:
                color = list(first[:4]) if rgbw else list(first[:3]) + [0]
        for led in range(start, stop):
            o = led * bpp
            out[o] = color[0]
            out[o + 1] = color[1]
            out[o + 2] = color[2]
            if rgbw:
                out[o + 3] = color[3] if len(color) > 3 else 0
    return bytes(out)


def build_segment_individual_i(
    seg_start: int,
    seg_stop: int,
    *,
    payload: bytes,
    rgbw: bool,
    baseline: bytes | None,
    touched: set[int],
) -> list[Any]:
    """WLED per-segment ``i`` array (relative indices) for painted + untouched LEDs."""
    touched_in = [led for led in range(seg_start, seg_stop) if led in touched]
    if not touched_in:
        return []

    i: list[Any] = []
    for led in range(seg_start, seg_stop):
        rel = led - seg_start
        if led in touched:
            color = _read_led_color(payload, rgbw=rgbw, led=led)
        elif baseline is not None:
            color = _read_led_color(baseline, rgbw=rgbw, led=led)
        else:
            continue
        i.append(rel)
        i.append(color)
    return i


@dataclass
class _LedPaint:
    fx: int
    col: list[int]
    on: bool = True
    bri: int = 255
    pal: int = 0


def _segment_template(seg: dict[str, Any], *, solid_fx: int) -> _LedPaint:
    col_raw = seg.get("col")
    col = [255, 255, 255, 0]
    if isinstance(col_raw, list) and col_raw:
        first = col_raw[0]
        if isinstance(first, (list, tuple)) and len(first) >= 3:
            col = list(first[:4])
    return _LedPaint(
        fx=int(seg.get("fx") if seg.get("fx") is not None else solid_fx),
        col=col,
        on=bool(seg.get("on", True)),
        bri=int(seg.get("bri") or 255),
        pal=int(seg.get("pal") or 0),
    )


def _find_segment_for_led(
    led: int, segments: list[dict[str, Any]], pixel_count: int
) -> dict[str, Any] | None:
    for raw in segments:
        if not isinstance(raw, dict):
            continue
        start, stop = _segment_led_range(raw, pixel_count)
        if start <= led < stop:
            return raw
    return None


def _consolidate_runs(
    assignments: list[_LedPaint | None],
    *,
    max_segments: int,
) -> list[tuple[int, int, _LedPaint]]:
    """Merge adjacent LEDs with identical paint into (start, stop, state) runs."""
    runs: list[tuple[int, int, _LedPaint]] = []
    n = len(assignments)
    i = 0
    while i < n:
        state = assignments[i]
        if state is None:
            i += 1
            continue
        start = i
        i += 1
        while i < n and assignments[i] == state:
            i += 1
        runs.append((start, i, state))
    if len(runs) <= max_segments:
        return runs
    # Over WLED segment limit — merge adjacent runs that share the same fx.
    merged: list[tuple[int, int, _LedPaint]] = [runs[0]]
    for start, stop, state in runs[1:]:
        p_start, p_stop, prev = merged[-1]
        if prev.fx == state.fx:
            merged[-1] = (p_start, stop, prev)
        else:
            merged.append((start, stop, state))
    if len(merged) > max_segments:
        raise ValueError(
            f"Paint effect commit needs {len(merged)} segments but device allows "
            f"{max_segments}. Paint fewer effect zones or simplify."
        )
    return merged


def build_paint_commit_state(
    *,
    payload: bytes,
    rgbw: bool,
    live_segments: list[dict[str, Any]],
    pixel_count: int,
    effects_by_name: dict[str, int],
    touched: set[int],
    baseline: bytes | None = None,
    paint_mode: str = "color",
    touched_fx: dict[int, int] | None = None,
    max_segments: int = DEFAULT_MAX_SEGMENTS,
) -> dict[str, Any]:
    """Build state patch to persist paint and exit live mode."""
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
    segments = live_segments if live_segments else [{"id": 0, "start": 0, "stop": pixel_count}]
    touched = set(touched)

    if paint_mode == "effect" and touched_fx:
        return _build_effect_commit(
            payload=payload,
            rgbw=rgbw,
            segments=segments,
            pixel_count=pixel_count,
            touched=touched,
            touched_fx=touched_fx,
            baseline=baseline,
            solid_fx=solid_fx,
            max_segments=max_segments,
        )

    return _build_color_commit(
        payload=payload,
        rgbw=rgbw,
        segments=segments,
        pixel_count=pixel_count,
        touched=touched,
        baseline=baseline,
        solid_fx=solid_fx,
    )


def _build_color_commit(
    *,
    payload: bytes,
    rgbw: bool,
    segments: list[dict[str, Any]],
    pixel_count: int,
    touched: set[int],
    baseline: bytes | None,
    solid_fx: int,
) -> dict[str, Any]:
    seg_patches: list[dict[str, Any]] = []
    for raw in segments:
        if not isinstance(raw, dict):
            continue
        sid = int(raw.get("id", 0))
        start, stop = _segment_led_range(raw, pixel_count)
        if stop <= start:
            continue
        if not any(start <= led < stop for led in touched):
            continue
        i_arr = build_segment_individual_i(
            start,
            stop,
            payload=payload,
            rgbw=rgbw,
            baseline=baseline,
            touched=touched,
        )
        if not i_arr:
            continue
        seg_patches.append(
            {
                "id": sid,
                "on": True,
                "fx": solid_fx,
                "i": i_arr,
            }
        )

    if not seg_patches and touched:
        i_arr = build_segment_individual_i(
            0,
            pixel_count,
            payload=payload,
            rgbw=rgbw,
            baseline=baseline,
            touched=touched,
        )
        seg_patches.append({"id": 0, "on": True, "fx": solid_fx, "i": i_arr})

    return {"live": False, "on": True, "seg": seg_patches}


def _build_effect_commit(
    *,
    payload: bytes,
    rgbw: bool,
    segments: list[dict[str, Any]],
    pixel_count: int,
    touched: set[int],
    touched_fx: dict[int, int],
    baseline: bytes | None,
    solid_fx: int,
    max_segments: int,
) -> dict[str, Any]:
    assignments: list[_LedPaint | None] = [None] * pixel_count
    seg_snapshot = copy.deepcopy(segments)

    for led in range(pixel_count):
        seg = _find_segment_for_led(led, seg_snapshot, pixel_count)
        if seg is not None:
            assignments[led] = _segment_template(seg, solid_fx=solid_fx)

    for led in touched:
        if led < 0 or led >= pixel_count:
            continue
        fx = int(touched_fx.get(led, solid_fx))
        col = _read_led_color(payload, rgbw=rgbw, led=led)
        base = assignments[led]
        bri = base.bri if base else 255
        pal = base.pal if base else 0
        on = base.on if base else True
        assignments[led] = _LedPaint(fx=fx, col=col, on=on, bri=bri, pal=pal)

    runs = _consolidate_runs(assignments, max_segments=max_segments)
    seg_patches: list[dict[str, Any]] = []
    for idx, (start, stop, state) in enumerate(runs):
        seg_patches.append(
            {
                "id": idx,
                "start": start,
                "stop": stop,
                "on": state.on,
                "bri": state.bri,
                "fx": state.fx,
                "col": [state.col],
                "pal": state.pal,
            }
        )

    return {"live": False, "on": True, "seg": seg_patches}


# Backwards-compatible helper used in older tests
def average_led_color(
    payload: bytes, *, rgbw: bool, start: int, stop: int
) -> list[int]:
    total = [0, 0, 0, 0]
    count = 0
    for led in range(start, stop):
        c = _read_led_color(payload, rgbw=rgbw, led=led)
        for i in range(len(c)):
            total[i] += c[i]
        count += 1
    if count == 0:
        return [0, 0, 0, 0]
    return [total[i] // count for i in range(len(total))]
