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


SLIDER_KEYS = ("sx", "ix", "c1", "c2", "c3", "o1", "o2", "o3")


def split_fxdata_rows(fxdata: str) -> list[str]:
    """One metadata row per effect (newline-separated)."""
    if not fxdata:
        return []
    rows = [line.strip() for line in fxdata.split("\n") if line.strip()]
    return rows


def parse_effect_meta_row(row: str) -> dict[str, Any]:
    """Parse one effect's fxdata row (five ;-sections)."""
    parts = row.split(";")
    while len(parts) < 5:
        parts.append("")
    sliders_raw = parts[0]
    slider_tokens = [t.strip() for t in sliders_raw.split(",") if t.strip()]
    sliders: dict[str, bool] = {}
    for i, key in enumerate(SLIDER_KEYS):
        if i >= len(slider_tokens):
            sliders[key] = False
            continue
        tok = slider_tokens[i]
        sliders[key] = tok == "!" or bool(tok)
    colors_enabled = parts[1].strip() != ""
    palette_enabled = parts[2].strip() == "!"
    flag = parts[3].strip()[:1] if parts[3] else None
    defaults: dict[str, Any] = {}
    if parts[4]:
        for pair in parts[4].split(","):
            if "=" in pair:
                k, v = pair.split("=", 1)
                defaults[k.strip()] = v.strip()
    return {
        "sliders": sliders,
        "colors_enabled": colors_enabled,
        "palette_enabled": palette_enabled,
        "flag": flag,
        "defaults": defaults,
    }


def effect_meta_for_id(fxdata: str, effect_id: int) -> dict[str, Any]:
    """Metadata for a single effect index."""
    rows = split_fxdata_rows(fxdata)
    if effect_id < len(rows):
        return parse_effect_meta_row(rows[effect_id])
    if rows:
        return parse_effect_meta_row(rows[0])
    return parse_effect_meta_row("!,!;;!;")


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
