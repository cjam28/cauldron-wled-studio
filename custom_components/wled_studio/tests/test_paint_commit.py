"""Paint commit state builder tests."""

import pytest

from wled_studio.paint_commit import (
    FILL_OFF,
    FILL_PRESERVE,
    build_paint_commit_state,
    build_segment_individual_i,
    count_paint_segments,
    estimate_segment_runs,
)


def test_unpainted_default_off_not_white() -> None:
    """Paint 0–10 on white strip; 11+ commit as off segments."""
    pixel_count = 30
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    for led in range(0, 11):
        o = led * bpp
        payload[o : o + 3] = bytes([255, 0, 0])
    touched = set(range(0, 11))
    live = [{"id": 0, "start": 0, "stop": 30}]
    patch = build_paint_commit_state(
        payload=bytes(payload),
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_OFF},
        brush={"fx": 0, "bri": 255, "on": True},
    )
    segs = patch["seg"]
    assert len(segs) >= 2
    off_runs = [s for s in segs if s.get("on") is False]
    assert off_runs
    on_runs = [s for s in segs if s.get("on") is not False]
    assert on_runs
    assert any(s["start"] == 0 and s["stop"] == 11 for s in on_runs)
    assert any(s["start"] == 11 and s["stop"] == 30 for s in off_runs)


def test_preserve_mode_keeps_untouched_colors() -> None:
    pixel_count = 30
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    for led in range(5, 26):
        o = led * bpp
        payload[o : o + 3] = bytes([255, 0, 0])
    touched = set(range(5, 26))
    live = [{"id": 1, "start": 0, "stop": 30}]
    patch = build_paint_commit_state(
        payload=bytes(payload),
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_PRESERVE},
    )
    seg = patch["seg"][0]
    assert "i" in seg
    i = seg["i"]
    rel4 = i.index(4)
    assert i[rel4 + 1] == [255, 255, 255, 0]
    rel5 = i.index(5)
    assert i[rel5 + 1] == [255, 0, 0, 0]


def test_custom_fill_applies_effect() -> None:
    payload = bytes([255, 0, 0, 0] * 20)
    baseline = bytes([255, 255, 255, 0] * 20)
    touched = {0, 1}
    live = [{"id": 0, "start": 0, "stop": 20}]
    patch = build_paint_commit_state(
        payload=payload,
        rgbw=True,
        live_segments=live,
        pixel_count=20,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": "custom", "fx": 7, "on": True, "bri": 200, "col": [0, 0, 255, 0]},
        brush={"fx": 0, "on": True, "bri": 255},
    )
    fx_vals = {s["fx"] for s in patch["seg"]}
    assert 0 in fx_vals
    assert 7 in fx_vals


def test_color_commit_uses_payload_color_verbatim() -> None:
    """Commit must NOT scale the payload color by brush brightness again.

    The frontend bakes brush bri into the paint buffer (`_brushRgbw`) so the
    DDP live preview is WYSIWYG — the payload color IS the final display
    value. Scaling here a second time committed `col x (bri/255)^2`, visibly
    darker than the live preview for any brush brightness below 255.
    """
    from wled_studio.paint_commit import _brush_assignment

    payload = bytes([200, 100, 50, 0] * 5)
    paint = _brush_assignment(
        0,
        payload=payload,
        rgbw=True,
        brush={"fx": 0, "col": [255, 255, 255, 0], "bri": 128, "on": True},
        solid_fx=0,
        touched_fx={},
        paint_mode="color",
    )
    assert paint.bri == 255
    assert paint.col[0] == 200
    assert paint.col[1] == 100
    assert paint.col[2] == 50


def test_effect_brush_uses_brush_color_not_ddp_pixel() -> None:
    """Effect strokes use brush palette colors, not solid RGB from the DDP buffer."""
    from wled_studio.paint_commit import _brush_assignment

    payload = bytes([255, 0, 0, 0] * 10)
    paint = _brush_assignment(
        0,
        payload=payload,
        rgbw=True,
        brush={"fx": 7, "col": [0, 255, 0, 0], "bri": 200, "on": True},
        solid_fx=0,
        touched_fx={0: 7},
        paint_mode="effect",
    )
    assert paint.fx == 7
    assert paint.col == [0, 255, 0, 0]


def test_build_segment_individual_i_sparse() -> None:
    payload = bytes([255, 0, 0, 0] * 10)
    baseline = bytes([0, 0, 255, 0] * 10)
    i = build_segment_individual_i(
        0, 10, payload=payload, rgbw=True, baseline=baseline, touched={2}
    )
    assert 2 in i
    assert i[i.index(2) + 1] == [255, 0, 0, 0]


# --- SP-5: pre-commit segment-count validation --------------------------------


def _alternating_paint(pixel_count: int) -> tuple[bytes, bytes, set[int]]:
    """A buffer that paints every other LED → one run per painted/off pair."""
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    touched: set[int] = set()
    for led in range(0, pixel_count, 2):
        o = led * bpp
        payload[o : o + 3] = bytes([255, 0, 0])
        touched.add(led)
    return bytes(payload), baseline, touched


def test_count_paint_segments_warns_near_max() -> None:
    """A buffer producing >=80% of max_segments runs reports seg_warn true."""
    pixel_count = 40
    payload, baseline, touched = _alternating_paint(pixel_count)
    max_segments = 10  # warn_at = int(0.8 * 10) = 8
    live = [{"id": 0, "start": 0, "stop": pixel_count}]

    res = count_paint_segments(
        payload,
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_OFF},
        brush={"fx": 0, "bri": 255, "on": True},
        max_segments=max_segments,
    )
    assert res["seg_warn"] is True
    assert res["max_segments"] == max_segments
    assert res["seg_count"] >= int(0.8 * max_segments)

    # The estimate must match the count an actual (non-overflowing) commit makes.
    est = estimate_segment_runs(
        payload=payload,
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_OFF},
        brush={"fx": 0, "bri": 255, "on": True},
        max_segments=64,
    )
    patch = build_paint_commit_state(
        payload=payload,
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_OFF},
        brush={"fx": 0, "bri": 255, "on": True},
        max_segments=64,
    )
    assert est == len(patch["seg"])
    assert res["seg_count"] == est


def test_estimate_matches_commit_preserve_fast_path() -> None:
    """SP-5: in the preserve fast-path the estimate must equal len(commit['seg']).

    The committer (_build_color_commit_preserve_i) skips any touched segment whose
    per-LED ``i`` array comes back empty; the estimator must apply the same skip so
    it can never over-count. Covers a multi-segment buffer where one segment is
    touched and others are not, plus a degenerate (stop<=start) segment.
    """
    pixel_count = 30
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    for led in range(5, 26):
        o = led * bpp
        payload[o : o + 3] = bytes([255, 0, 0])
    touched = set(range(5, 26))
    live = [
        {"id": 0, "start": 0, "stop": 10},   # intersects touched
        {"id": 1, "start": 10, "stop": 20},  # intersects touched
        {"id": 2, "start": 20, "stop": 30},  # intersects touched
        {"id": 3, "start": 0, "stop": 0},    # degenerate -> skipped by both
    ]

    est = estimate_segment_runs(
        payload=bytes(payload),
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_PRESERVE},
    )
    patch = build_paint_commit_state(
        payload=bytes(payload),
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_PRESERVE},
    )
    assert "i" in patch["seg"][0]  # confirm we took the preserve fast-path
    assert est == len(patch["seg"])


def test_estimate_matches_commit_preserve_synthetic_fallback() -> None:
    """SP-5: preserve estimate == commit when only the synthetic seg-0 patch fires.

    Touched LEDs land outside every declared segment, so the committer emits its
    single fallback patch over [0, pixel_count); the estimate must report 1, not
    one-per-declared-segment.
    """
    pixel_count = 30
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    for led in (20, 21, 22):
        o = led * bpp
        payload[o : o + 3] = bytes([0, 0, 255])
    touched = {20, 21, 22}
    live = [{"id": 0, "start": 0, "stop": 5}]  # does NOT intersect touched

    est = estimate_segment_runs(
        payload=bytes(payload),
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_PRESERVE},
    )
    patch = build_paint_commit_state(
        payload=bytes(payload),
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_PRESERVE},
    )
    assert est == len(patch["seg"]) == 1


def test_count_paint_segments_sparse_no_warn() -> None:
    """A sparse buffer (few contiguous runs) reports seg_warn false."""
    pixel_count = 40
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    touched = {0, 1, 2}
    for led in touched:
        o = led * bpp
        payload[o : o + 3] = bytes([0, 255, 0])
    res = count_paint_segments(
        bytes(payload),
        rgbw=True,
        live_segments=[{"id": 0, "start": 0, "stop": pixel_count}],
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_OFF},
        brush={"fx": 0, "bri": 255, "on": True},
        max_segments=10,
    )
    assert res["seg_warn"] is False
    assert res["seg_count"] < int(0.8 * 10)


def test_count_paint_segments_empty_buffer() -> None:
    """No paintable buffer → zero count, no warning, never raises."""
    res = count_paint_segments(
        b"",
        rgbw=True,
        live_segments=[],
        pixel_count=0,
        effects_by_name={"Solid": 0},
        touched=set(),
        max_segments=32,
    )
    assert res == {"seg_count": 0, "max_segments": 32, "seg_warn": False}


def test_commit_still_raises_when_exceeding_max() -> None:
    """Existing behavior preserved: an over-budget buffer raises on actual commit."""
    pixel_count = 40
    payload, baseline, touched = _alternating_paint(pixel_count)
    live = [{"id": 0, "start": 0, "stop": pixel_count}]

    # The non-throwing estimator still reports the (large) count without raising.
    res = count_paint_segments(
        payload,
        rgbw=True,
        live_segments=live,
        pixel_count=pixel_count,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        fill={"mode": FILL_OFF},
        brush={"fx": 0, "bri": 255, "on": True},
        max_segments=10,
    )
    assert res["seg_warn"] is True

    # ...but a real commit over the budget still hard-fails.
    with pytest.raises(ValueError):
        build_paint_commit_state(
            payload=payload,
            rgbw=True,
            live_segments=live,
            pixel_count=pixel_count,
            effects_by_name={"Solid": 0},
            touched=touched,
            baseline=baseline,
            fill={"mode": FILL_OFF},
            brush={"fx": 0, "bri": 255, "on": True},
            max_segments=10,
        )
