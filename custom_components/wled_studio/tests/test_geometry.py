"""Geometry: closed-path LED placement and segment ranges."""

from wled_studio.geometry import (
    fixture_to_wled_segments,
    kitchen_island_fixture,
    resolve_led_positions,
)


def test_closed_last_segment_led_positions_along_closing_edge() -> None:
    """Segment 4 (186–209) maps LEDs along the auto-close edge, not only vtx 186."""
    fixture = kitchen_island_fixture()
    pixel_count = 210
    positions = resolve_led_positions(fixture, pixel_count)
    by_led = {led: (x, y) for x, y, led in positions}

    assert 186 in by_led
    assert 209 in by_led
    assert 187 in by_led

    # Closing edge vtx3 → vtx0 (reference fixture: toward origin).
    x186, y186 = by_led[186]
    x209, y209 = by_led[209]
    assert x209 < x186
    assert y209 < y186

    segs = fixture_to_wled_segments(fixture, pixel_count)
    seg4 = next(s for s in segs if s["id"] == 3)
    assert seg4["start"] == 186
    assert seg4["stop"] == pixel_count
