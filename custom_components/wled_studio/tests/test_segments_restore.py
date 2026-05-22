"""Tests for paint segment restore helpers."""

from wled_studio.segments_restore import build_segment_restore_patch


def test_restore_disables_extra_paint_segments() -> None:
    target = [
        {"id": 0, "start": 0, "stop": 85, "n": "Side 1"},
        {"id": 1, "start": 85, "stop": 96, "n": "Side 2"},
    ]
    current = [
        *target,
        {"id": 2, "start": 96, "stop": 100, "on": True},
        {"id": 3, "start": 100, "stop": 110, "on": True},
    ]
    patch = build_segment_restore_patch(target, current_segments=current)
    assert len(patch) == 4
    extras = [s for s in patch if s["id"] in (2, 3)]
    assert all(s["stop"] == s["start"] and s["on"] is False for s in extras)


def test_restore_without_current_returns_copy() -> None:
    target = [{"id": 0, "start": 0, "stop": 10}]
    patch = build_segment_restore_patch(target, current_segments=None)
    assert patch == target
    assert patch is not target
