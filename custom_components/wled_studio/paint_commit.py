"""Map paint buffers to WLED /json/state (segment runs with brush + fill)."""

from __future__ import annotations

import copy
from dataclasses import dataclass
from typing import Any

DEFAULT_MAX_SEGMENTS = 32
FILL_OFF = "off"
FILL_PRESERVE = "preserve"
FILL_CUSTOM = "custom"


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
    sx: int = 128
    ix: int = 128
    c1: int = 128
    c2: int = 128
    c3: int = 128
    o1: bool = False
    o2: bool = False
    o3: bool = False


def _col_from_settings(settings: dict[str, Any], *, rgbw: bool) -> list[int]:
    col_raw = settings.get("col")
    if isinstance(col_raw, list) and len(col_raw) >= 3:
        if isinstance(col_raw[0], (list, tuple)):
            base = list(col_raw[0][:4])
        else:
            base = list(col_raw[:4])
        if not rgbw:
            return base[:3]
        while len(base) < 4:
            base.append(0)
        return base[:4]
    return [0, 0, 0, 0] if rgbw else [0, 0, 0]


def _paint_from_settings(
    settings: dict[str, Any],
    *,
    solid_fx: int,
    rgbw: bool,
    col_override: list[int] | None = None,
) -> _LedPaint:
    col = col_override if col_override is not None else _col_from_settings(settings, rgbw=rgbw)
    return _LedPaint(
        fx=int(settings.get("fx") if settings.get("fx") is not None else solid_fx),
        col=col,
        on=bool(settings.get("on", True)),
        bri=int(settings.get("bri") if settings.get("bri") is not None else 255),
        pal=int(settings.get("pal") or 0),
        sx=int(settings.get("sx") if settings.get("sx") is not None else 128),
        ix=int(settings.get("ix") if settings.get("ix") is not None else 128),
        c1=int(settings.get("c1") if settings.get("c1") is not None else 128),
        c2=int(settings.get("c2") if settings.get("c2") is not None else 128),
        c3=int(settings.get("c3") if settings.get("c3") is not None else 128),
        o1=bool(settings.get("o1", False)),
        o2=bool(settings.get("o2", False)),
        o3=bool(settings.get("o3", False)),
    )


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
        sx=int(seg.get("sx") if seg.get("sx") is not None else 128),
        ix=int(seg.get("ix") if seg.get("ix") is not None else 128),
        c1=int(seg.get("c1") if seg.get("c1") is not None else 128),
        c2=int(seg.get("c2") if seg.get("c2") is not None else 128),
        c3=int(seg.get("c3") if seg.get("c3") is not None else 128),
        o1=bool(seg.get("o1", False)),
        o2=bool(seg.get("o2", False)),
        o3=bool(seg.get("o3", False)),
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
    merged: list[tuple[int, int, _LedPaint]] = [runs[0]]
    for start, stop, state in runs[1:]:
        p_start, p_stop, prev = merged[-1]
        if prev == state:
            merged[-1] = (p_start, stop, state)
        elif prev.fx == state.fx and prev.on == state.on:
            merged[-1] = (p_start, stop, state)
        else:
            merged.append((start, stop, state))
    if len(merged) > max_segments:
        raise ValueError(
            f"Paint commit needs {len(merged)} segments but device allows "
            f"{max_segments}. Paint fewer zones or simplify fill/brush."
        )
    return merged


def _run_to_seg_patch(idx: int, start: int, stop: int, state: _LedPaint) -> dict[str, Any]:
    patch: dict[str, Any] = {
        "id": idx,
        "start": start,
        "stop": stop,
        "on": state.on,
        "bri": state.bri,
        "fx": state.fx,
        "col": [state.col],
        "pal": state.pal,
        "sx": state.sx,
        "ix": state.ix,
        "c1": state.c1,
        "c2": state.c2,
        "c3": state.c3,
        "o1": state.o1,
        "o2": state.o2,
        "o3": state.o3,
    }
    return patch


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
    brush: dict[str, Any] | None = None,
    fill: dict[str, Any] | None = None,
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
    brush = dict(brush or {})
    fill = dict(fill or {})
    fill_mode = str(fill.get("mode") or FILL_OFF)

    if fill_mode == FILL_PRESERVE and not brush and paint_mode == "color" and not touched_fx:
        return _build_color_commit_preserve_i(
            payload=payload,
            rgbw=rgbw,
            segments=segments,
            pixel_count=pixel_count,
            touched=touched,
            baseline=baseline,
            solid_fx=solid_fx,
        )

    return _build_run_commit(
        payload=payload,
        rgbw=rgbw,
        segments=segments,
        pixel_count=pixel_count,
        touched=touched,
        baseline=baseline,
        solid_fx=solid_fx,
        max_segments=max_segments,
        brush=brush,
        fill=fill,
        fill_mode=fill_mode,
        touched_fx=touched_fx or {},
        paint_mode=paint_mode,
    )


def _build_color_commit_preserve_i(
    *,
    payload: bytes,
    rgbw: bool,
    segments: list[dict[str, Any]],
    pixel_count: int,
    touched: set[int],
    baseline: bytes | None,
    solid_fx: int,
) -> dict[str, Any]:
    """Legacy per-LED ``i`` commit when fill mode is preserve (no brush/fill split)."""
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


def _fill_assignment(
    led: int,
    *,
    fill_mode: str,
    fill: dict[str, Any],
    baseline: bytes | None,
    segments: list[dict[str, Any]],
    pixel_count: int,
    rgbw: bool,
    solid_fx: int,
) -> _LedPaint:
    if fill_mode == FILL_OFF:
        return _LedPaint(
            fx=solid_fx,
            col=[0, 0, 0, 0] if rgbw else [0, 0, 0],
            on=False,
            bri=0,
        )
    if fill_mode == FILL_CUSTOM:
        return _paint_from_settings(fill, solid_fx=solid_fx, rgbw=rgbw)
    # preserve
    if baseline is not None:
        col = _read_led_color(baseline, rgbw=rgbw, led=led)
    else:
        seg = _find_segment_for_led(led, segments, pixel_count)
        if seg is not None:
            return _segment_template(seg, solid_fx=solid_fx)
        col = [0, 0, 0, 0] if rgbw else [0, 0, 0]
    seg = _find_segment_for_led(led, segments, pixel_count)
    base = _segment_template(seg, solid_fx=solid_fx) if seg else _LedPaint(fx=solid_fx, col=col)
    return _LedPaint(
        fx=base.fx,
        col=col,
        on=base.on,
        bri=base.bri,
        pal=base.pal,
        sx=base.sx,
        ix=base.ix,
        c1=base.c1,
        c2=base.c2,
        c3=base.c3,
        o1=base.o1,
        o2=base.o2,
        o3=base.o3,
    )


def _brush_assignment(
    led: int,
    *,
    payload: bytes,
    rgbw: bool,
    brush: dict[str, Any],
    solid_fx: int,
    touched_fx: dict[int, int],
    paint_mode: str,
) -> _LedPaint:
    settings = dict(brush)
    if paint_mode == "effect" and led in touched_fx:
        settings["fx"] = touched_fx[led]
    elif paint_mode == "effect" and "fx" not in settings:
        settings["fx"] = solid_fx
    if paint_mode == "effect":
        return _paint_from_settings(settings, solid_fx=solid_fx, rgbw=rgbw)
    col = _read_led_color(payload, rgbw=rgbw, led=led)
    return _paint_from_settings(settings, solid_fx=solid_fx, rgbw=rgbw, col_override=col)


def _build_run_commit(
    *,
    payload: bytes,
    rgbw: bool,
    segments: list[dict[str, Any]],
    pixel_count: int,
    touched: set[int],
    baseline: bytes | None,
    solid_fx: int,
    max_segments: int,
    brush: dict[str, Any],
    fill: dict[str, Any],
    fill_mode: str,
    touched_fx: dict[int, int],
    paint_mode: str,
) -> dict[str, Any]:
    seg_snapshot = copy.deepcopy(segments)
    assignments: list[_LedPaint | None] = [None] * pixel_count

    for led in range(pixel_count):
        if led in touched:
            assignments[led] = _brush_assignment(
                led,
                payload=payload,
                rgbw=rgbw,
                brush=brush,
                solid_fx=solid_fx,
                touched_fx=touched_fx,
                paint_mode=paint_mode,
            )
        else:
            assignments[led] = _fill_assignment(
                led,
                fill_mode=fill_mode,
                fill=fill,
                baseline=baseline,
                segments=seg_snapshot,
                pixel_count=pixel_count,
                rgbw=rgbw,
                solid_fx=solid_fx,
            )

    runs = _consolidate_runs(assignments, max_segments=max_segments)
    seg_patches = [
        _run_to_seg_patch(idx, start, stop, state)
        for idx, (start, stop, state) in enumerate(runs)
    ]
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
