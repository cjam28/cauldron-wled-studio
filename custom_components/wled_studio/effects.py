"""Effect/palette name maps and fxdata sound flags."""

from __future__ import annotations

from typing import Any


def build_effect_name_map(effects: list[str]) -> dict[str, int]:
    """Map effect name → id; skip RSVD / '-' placeholders."""
    out: dict[str, int] = {}
    for idx, name in enumerate(effects):
        if not isinstance(name, str):
            continue
        n = name.strip()
        if not n or n in ("RSVD", "-"):
            continue
        out[n] = idx
    return out


def build_palette_name_map(palettes: list[str]) -> dict[str, int]:
    """Map palette name → id."""
    out: dict[str, int] = {}
    for idx, name in enumerate(palettes):
        if isinstance(name, str) and name.strip():
            out[name.strip()] = idx
    return out


def parse_fxdata_sound_flags(fxdata: str, effect_count: int) -> list[str | None]:
    """Section 4 char per effect: v=volume, f=freq, 2=2d-only, else None."""
    if not fxdata or effect_count < 1:
        return [None] * max(effect_count, 0)
    sections = fxdata.split(";")
    if len(sections) < 4:
        return [None] * effect_count
    flags_section = sections[3]
    flags: list[str | None] = []
    for i in range(effect_count):
        if i >= len(flags_section):
            flags.append(None)
            continue
        ch = flags_section[i]
        if ch == "v":
            flags.append("v")
        elif ch == "f":
            flags.append("f")
        elif ch == "2":
            flags.append("2")
        else:
            flags.append(None)
    return flags
