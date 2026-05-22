"""Paint commit state builder tests."""

from wled_studio.paint_commit import (
    average_led_color,
    build_paint_commit_state,
)


def test_average_led_color_rgb() -> None:
    payload = bytes([255, 0, 0, 0, 255, 0, 0])
    assert average_led_color(payload, rgbw=False, start=0, stop=2) == [255, 0, 0, 0]


def test_build_commit_per_segment() -> None:
    # Two LEDs: red, blue — two segments one LED each
    payload = bytes(
        [
            255,
            0,
            0,
            0,
            0,
            0,
            255,
            0,
        ]
    )
    live = [
        {"id": 0, "start": 0, "stop": 1},
        {"id": 1, "start": 1, "stop": 2},
    ]
    patch = build_paint_commit_state(
        payload=payload,
        rgbw=True,
        live_segments=live,
        pixel_count=2,
        effects_by_name={"Solid": 0},
    )
    assert patch["live"] is False
    assert patch["on"] is True
    assert len(patch["seg"]) == 2
    assert patch["seg"][0]["col"] == [[255, 0, 0, 0]]
    assert patch["seg"][1]["col"] == [[0, 0, 255, 0]]
    assert patch["seg"][0]["fx"] == 0
