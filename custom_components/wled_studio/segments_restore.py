"""Helpers to restore WLED segment maps after live paint."""

from __future__ import annotations

import copy
from typing import Any


def build_segment_restore_patch(
    target_segments: list[dict[str, Any]],
    *,
    current_segments: list[dict[str, Any]] | None = None,
) -> list[dict[str, Any]]:
    """Restore ``target_segments`` and disable extras left by paint preview."""
    restored = copy.deepcopy(target_segments)
    snap_ids = {
        int(seg.get("id", idx))
        for idx, seg in enumerate(target_segments)
        if isinstance(seg, dict)
    }
    if not current_segments:
        return restored

    for raw in current_segments:
        if not isinstance(raw, dict):
            continue
        sid = int(raw.get("id", -1))
        if sid < 0 or sid in snap_ids:
            continue
        start = int(raw.get("start") or 0)
        restored.append(
            {
                "id": sid,
                "start": start,
                "stop": start,
                "on": False,
                "sel": False,
            }
        )
    return restored
