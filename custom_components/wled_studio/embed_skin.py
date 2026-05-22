"""Upload WLED Studio embed skin.css for outline-only segment selection."""

from __future__ import annotations

from pathlib import Path

_SKIN_PATH = Path(__file__).parent / "data" / "wled-embed-skin.css"


def embed_skin_bytes() -> bytes:
    return _SKIN_PATH.read_bytes()


def embed_skin_cfg_patch() -> dict:
    """Enable custom CSS in WLED UI settings (cfg.comp.css in index.js)."""
    return {"comp": {"css": True}}
