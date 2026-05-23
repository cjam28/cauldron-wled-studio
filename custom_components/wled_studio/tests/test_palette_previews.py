"""Palette preview parsing from WLED /json/palx."""

from custom_components.wled_studio.effects import (
    merge_palx_page,
    parse_palx_stops,
    stops_to_css_gradient,
)


def test_stops_to_css_gradient_rgb_stops() -> None:
    css = stops_to_css_gradient(
        [
            (0, 0, 0, 0),
            (128, 255, 128, 0),
            (255, 255, 255, 255),
        ]
    )
    assert css is not None
    assert css.startswith("linear-gradient(90deg,")
    assert "rgb(0,0,0)" in css
    assert "rgb(255,255,255)" in css


def test_stops_to_css_gradient_special_tokens() -> None:
    assert stops_to_css_gradient(["c1", "c2"]) is None


def test_merge_palx_page() -> None:
    previews: dict[int, str] = {}
    merge_palx_page(
        previews,
        {
            "m": 1,
            "p": {
                "13": [[0, 0, 0, 32], [255, 0, 128, 255]],
            },
        },
    )
    assert 13 in previews
    assert "linear-gradient" in previews[13]


def test_parse_palx_stops_mixed() -> None:
    stops = parse_palx_stops([[0, 1, 2, 3], "r"])
    assert stops == [(0, 1, 2, 3), "r"]
