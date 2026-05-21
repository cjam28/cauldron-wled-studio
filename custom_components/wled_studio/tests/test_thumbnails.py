"""Tests for thumbnail path helpers."""

from pathlib import Path
from unittest.mock import MagicMock

from wled_studio.thumbnails import (
    ThumbKey,
    ensure_thumb_dir,
    list_thumbs,
    should_skip_effect_name,
    thumb_filename,
    thumb_path,
    thumbs_root,
)


def test_should_skip_effect_name() -> None:
    assert should_skip_effect_name("RSVD") is True
    assert should_skip_effect_name("-") is True
    assert should_skip_effect_name("  ") is True
    assert should_skip_effect_name("Solid") is False


def test_thumb_filename_defaults() -> None:
    key = ThumbKey(fx_id=42)
    assert thumb_filename(key) == "42_strip.webp"
    assert thumb_filename(key, variant="geom") == "42_geom.webp"


def test_thumb_filename_with_palette_and_fw() -> None:
    key = ThumbKey(fx_id=7, palette_id=3, fw_ver="0.16.0")
    assert thumb_filename(key) == "7_p3_0.16.0_strip.webp"


def test_thumb_path_and_list(tmp_path: Path) -> None:
    hass = MagicMock()
    hass.config.path.return_value = str(tmp_path / "www")

    root = thumbs_root(hass)
    assert root == tmp_path / "www" / "wled_studio" / "thumbs"

    directory = ensure_thumb_dir(hass, "kitchen")
    assert directory.is_dir()

    key = ThumbKey(fx_id=1)
    path = thumb_path(hass, "kitchen", key)
    path.write_bytes(b"RIFF")
    assert list_thumbs(hass, "kitchen") == ["1_strip.webp"]
