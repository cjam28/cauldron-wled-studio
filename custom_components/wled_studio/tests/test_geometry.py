"""Geometry resolver tests."""

from wled_studio.geometry import kitchen_island_fixture, resolve_led_positions


def test_kitchen_island_anchor_leds_present() -> None:
    fixture = kitchen_island_fixture()
    positions = resolve_led_positions(fixture, 210)
    leds = {p[2] for p in positions}
    for expected in (0, 85, 96, 186, 209):
        assert expected in leds
