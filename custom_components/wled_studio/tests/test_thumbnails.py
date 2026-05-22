"""Thumbnail helper tests."""

from wled_studio.thumbnails import should_skip_effect_name


def test_should_skip_effect_name_string() -> None:
    assert should_skip_effect_name("RSVD") is True
    assert should_skip_effect_name("-") is True
    assert should_skip_effect_name("") is True
    assert should_skip_effect_name("Solid") is False


def test_should_skip_effect_name_int_not_crash() -> None:
    """Regression: thumb_capture total count must not pass fx id as name."""
    assert should_skip_effect_name(0) is False
    assert should_skip_effect_name(42) is False
