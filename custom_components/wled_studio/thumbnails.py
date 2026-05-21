"""Effect thumbnail paths and cache helpers for captured WebP loops."""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

# Under HA www: /config/www/wled_studio/thumbs/{controller_id}/
THUMBS_WWW_SUBDIR = Path("wled_studio") / "thumbs"

# Filename variants (see plan): {fx_id}_strip.webp, {fx_id}_geom.webp
THUMB_VARIANTS = ("strip", "geom")

_SKIP_NAMES = frozenset({"RSVD", "-"})


@dataclass(frozen=True, slots=True)
class ThumbKey:
    """Cache key for one captured effect thumbnail."""

    fx_id: int
    palette_id: int = 0
    fw_ver: str = ""


def should_skip_effect_name(name: str) -> bool:
    """True for WLED placeholder rows that must not be captured.

    Skip rules (aligned with ``effects.build_effect_name_map``):
    - empty / whitespace-only names
    - ``RSVD`` reserved slots
    - ``-`` placeholder entries
    """
    n = (name or "").strip()
    return not n or n in _SKIP_NAMES


def _sanitize_fw_ver(fw_ver: str) -> str:
    safe = re.sub(r"[^\w.-]+", "_", (fw_ver or "").strip())
    return safe or "unknown"


def thumb_filename(key: ThumbKey, variant: str = "strip") -> str:
    """Build on-disk filename for one variant (``strip`` or ``geom``)."""
    if variant not in THUMB_VARIANTS:
        msg = f"variant must be one of {THUMB_VARIANTS}, got {variant!r}"
        raise ValueError(msg)
    base = str(key.fx_id)
    if key.palette_id:
        base = f"{base}_p{key.palette_id}"
    if (key.fw_ver or "").strip():
        base = f"{base}_{_sanitize_fw_ver(key.fw_ver)}"
    return f"{base}_{variant}.webp"


def thumbs_root(hass: HomeAssistant) -> Path:
    """Absolute path to ``/config/www/wled_studio/thumbs/``."""
    return Path(hass.config.path("www")) / THUMBS_WWW_SUBDIR


def controller_thumb_dir(hass: HomeAssistant, controller_id: str) -> Path:
    """Per-controller thumbnail directory (created on demand)."""
    safe_id = re.sub(r"[^\w.-]+", "_", (controller_id or "").strip()) or "unknown"
    return thumbs_root(hass) / safe_id


def thumb_path(
    hass: HomeAssistant,
    controller_id: str,
    key: ThumbKey,
    *,
    variant: str = "strip",
) -> Path:
    """Absolute path for one thumbnail file."""
    return controller_thumb_dir(hass, controller_id) / thumb_filename(key, variant)


def ensure_thumb_dir(hass: HomeAssistant, controller_id: str) -> Path:
    """Create ``.../thumbs/{controller_id}/`` if missing; return the directory."""
    directory = controller_thumb_dir(hass, controller_id)
    directory.mkdir(parents=True, exist_ok=True)
    return directory


def list_thumbs(hass: HomeAssistant, controller_id: str) -> list[str]:
    """Basenames of cached thumbnails for a controller (empty if none)."""
    directory = controller_thumb_dir(hass, controller_id)
    if not directory.is_dir():
        return []
    return sorted(
        p.name
        for p in directory.iterdir()
        if p.is_file() and p.suffix.lower() in (".webp", ".png", ".jpg", ".jpeg")
    )
