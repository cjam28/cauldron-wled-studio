"""Paint commit state builder tests."""

from wled_studio.paint_commit import (
    build_paint_commit_state,
    build_segment_individual_i,
)


def test_per_led_commit_preserves_untouched_in_segment() -> None:
    """Paint LEDs 5–25 in a 0–30 segment; others keep baseline colors."""
    pixel_count = 30
    bpp = 4
    baseline = bytes([255, 255, 255, 0] * pixel_count)
    payload = bytearray(baseline)
    for led in range(5, 26):
        o = led * bpp
        payload[o] = 255
        payload[o + 1] = 0
        payload[o + 2] = 0
        payload[o + 3] = 0
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
        paint_mode="color",
    )
    seg = patch["seg"][0]
    assert "i" in seg
    assert seg["fx"] == 0
    # LED 4 untouched (white), LED 5 touched (red)
    i = seg["i"]
    rel4 = i.index(4)
    assert i[rel4 + 1] == [255, 255, 255, 0]
    rel5 = i.index(5)
    assert i[rel5 + 1] == [255, 0, 0, 0]


def test_effect_commit_splits_runs() -> None:
    payload = bytes([0, 0, 0, 0] * 20)
    baseline = bytes([10, 10, 10, 0] * 20)
    touched = {5, 6, 7, 15, 16}
    touched_fx = {5: 3, 6: 3, 7: 3, 15: 7, 16: 7}
    live = [{"id": 0, "start": 0, "stop": 20, "fx": 0, "col": [[10, 10, 10, 0]]}]
    patch = build_paint_commit_state(
        payload=payload,
        rgbw=True,
        live_segments=live,
        pixel_count=20,
        effects_by_name={"Solid": 0},
        touched=touched,
        baseline=baseline,
        paint_mode="effect",
        touched_fx=touched_fx,
        max_segments=32,
    )
    segs = patch["seg"]
    assert len(segs) >= 2
    fx_vals = {s["fx"] for s in segs}
    assert 3 in fx_vals
    assert 7 in fx_vals


def test_build_segment_individual_i_sparse() -> None:
    payload = bytes([255, 0, 0, 0] * 10)
    baseline = bytes([0, 0, 255, 0] * 10)
    i = build_segment_individual_i(
        0, 10, payload=payload, rgbw=True, baseline=baseline, touched={2}
    )
    assert 2 in i
    assert i[i.index(2) + 1] == [255, 0, 0, 0]
