"""Geometry resolver tests."""

from wled_studio.geometry import (
    fixture_to_wled_segments,
    kitchen_island_fixture,
    resolve_led_positions,
)


def test_fixture_to_wled_segments_kitchen_island() -> None:
    fixture = kitchen_island_fixture()
    segs = fixture_to_wled_segments(fixture, 210)
    assert len(segs) == 4
    assert segs[0]["start"] == 0 and segs[0]["stop"] == 85
    assert segs[1]["start"] == 85 and segs[1]["stop"] == 96
    assert segs[2]["start"] == 96 and segs[2]["stop"] == 186
    assert segs[3]["start"] == 186 and segs[3]["stop"] == 210


def test_kitchen_island_anchor_leds_present() -> None:
    fixture = kitchen_island_fixture()
    positions = resolve_led_positions(fixture, 210)
    leds = {p[2] for p in positions}
    for expected in (0, 85, 96, 186, 209):
        assert expected in leds
