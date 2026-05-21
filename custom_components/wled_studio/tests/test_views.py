"""Tests for layout background HTTP/WS helpers."""

from pathlib import Path
from unittest.mock import MagicMock

from wled_studio.views import layout_bg_dir, save_layout_background


def test_layout_bg_dir_uses_config_path_method(tmp_path: Path) -> None:
    hass = MagicMock()
    hass.config.path.return_value = str(tmp_path / "www")

    directory = layout_bg_dir(hass, "ctrl-1")
    assert directory == tmp_path / "www" / "wled_studio" / "layouts" / "ctrl-1"
    assert directory.is_dir()
    hass.config.path.assert_called_with("www")


def test_save_layout_background_writes_jpeg(tmp_path: Path) -> None:
    hass = MagicMock()
    hass.config.path.return_value = str(tmp_path / "www")

    url = save_layout_background(
        hass,
        "ctrl-1",
        "kitchen-island",
        b"\xff\xd8\xff",
        "image/jpeg",
    )
    assert url == "/local/wled_studio/layouts/ctrl-1/kitchen-island.jpg"
    dest = tmp_path / "www" / "wled_studio" / "layouts" / "ctrl-1" / "kitchen-island.jpg"
    assert dest.is_file()
    assert dest.read_bytes() == b"\xff\xd8\xff"
