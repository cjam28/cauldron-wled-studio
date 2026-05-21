"""Expand scene state across WLED segments (full-strip apply)."""

from __future__ import annotations

from typing import Any

_PRESERVE_KEYS = ("start", "stop", "len", "startY", "stopY", "grp", "spc", "of")


def expand_scene_state(
    wled_state: dict[str, Any],
    live_segments: list[dict[str, Any]],
    *,
    target_ids: list[int] | None = None,
) -> dict[str, Any]:
    """Merge scene template onto all or selected segments, keeping bus layout."""
    out = dict(wled_state)
    scene_segs = out.get("seg")
    if not isinstance(scene_segs, list) or not scene_segs:
        return out

    template = dict(scene_segs[0]) if isinstance(scene_segs[0], dict) else {}
    live_by_id: dict[int, dict[str, Any]] = {}
    for raw in live_segments:
        if isinstance(raw, dict) and "id" in raw:
            live_by_id[int(raw["id"])] = raw

    if target_ids is not None:
        ids = [int(i) for i in target_ids]
    else:
        ids = sorted(live_by_id.keys()) if live_by_id else [0]

    if not ids:
        ids = [0]

    new_segs: list[dict[str, Any]] = []
    for sid in ids:
        base = dict(live_by_id.get(sid, {"id": sid}))
        # Live layout first, then scene template overwrites fx/col/bri (not start/stop).
        merged = {**base, **template, "id": sid}
        for key in _PRESERVE_KEYS:
            if key in base:
                merged[key] = base[key]
        merged["id"] = sid
        new_segs.append(merged)

    out["seg"] = new_segs
    return out


def build_starter_segment_template(
    *,
    fx: int,
    bri: int,
    col: list[list[int]] | None,
    off: bool = False,
) -> dict[str, Any]:
    """Single-segment template for starter scenes (expanded on apply)."""
    seg: dict[str, Any] = {
        "id": 0,
        "on": not off,
        "bri": 255 if not off else 0,
        "fx": fx,
    }
    if col is not None:
        seg["col"] = col
    return {
        "on": not off,
        "bri": bri,
        "seg": [seg],
    }
