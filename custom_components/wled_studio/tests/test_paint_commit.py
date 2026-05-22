"""Paint commit state builder tests."""

from wled_studio.paint_commit import (
    FILL_OFF,
    FILL_PRESERVE,
    build_paint_commit_state,
    build_segment_individual_i,
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
