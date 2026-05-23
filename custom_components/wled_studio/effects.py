"""Effect/palette name maps and fxdata sound flags."""

from __future__ import annotations

import json
import logging
from typing import Any

_LOGGER = logging.getLogger(__name__)


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


def normalize_fxdata_response(body: str) -> str:
    """Turn WLED /json/fxdata body into newline-separated metadata rows.

    WLED may label the response application/json while the payload is a fragile
    JSON array, a quoted string, or raw semicolon-separated text. Never let a
    JSONDecodeError block integration setup.
    """
    text = (body or "").strip()
    if not text:
        return ""
    if text[0] not in ("[", '"', "{"):
        return text
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        _LOGGER.debug("fxdata is not valid JSON; using raw text (%d bytes)", len(text))
        return text
    if isinstance(parsed, str):
        return parsed.strip()
    if isinstance(parsed, list):
        rows: list[str] = []
        for item in parsed:
            if item is None:
                rows.append("")
            elif isinstance(item, str):
                rows.append(item.strip())
            else:
                rows.append(str(item).strip())
        return "\n".join(rows)
    if isinstance(parsed, dict):
        for key in ("fxdata", "data", "value"):
            val = parsed.get(key)
            if isinstance(val, str):
                return val.strip()
            if isinstance(val, list):
                return "\n".join(str(x).strip() for x in val)
    return text


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
    flag = _extract_flag_char(parts)
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


def _extract_flag_char(parts: list[str]) -> str | None:
    """Section 4 may shift when optional sections are omitted (e.g. `!,!;;v;`)."""
    while len(parts) < 5:
        parts.append("")
    for idx in (3, 2, 4):
        ch = (parts[idx] or "").strip()[:1]
        if ch in ("v", "f", "2"):
            return ch
    return (parts[3] or "").strip()[:1] or None


def _flag_from_char(ch: str) -> str | None:
    if ch == "v":
        return "v"
    if ch == "f":
        return "f"
    if ch == "2":
        return "2"
    return None


def parse_palx_stops(stops_raw: Any) -> list[tuple[int, int, int, int] | str]:
    """Parse one palette entry from /json/palx ``p`` object."""
    out: list[tuple[int, int, int, int] | str] = []
    if not isinstance(stops_raw, list):
        return out
    for stop in stops_raw:
        if isinstance(stop, str):
            out.append(stop.strip())
            continue
        if isinstance(stop, list) and len(stop) >= 4:
            try:
                out.append(
                    (
                        int(stop[0]),
                        int(stop[1]),
                        int(stop[2]),
                        int(stop[3]),
                    )
                )
            except (TypeError, ValueError):
                continue
    return out


def stops_to_css_gradient(stops: list[tuple[int, int, int, int] | str]) -> str | None:
    """Convert WLED palette stops to a CSS linear-gradient preview."""
    if not stops or any(isinstance(s, str) for s in stops):
        return None
    rgb_stops: list[str] = []
    for stop in stops:
        if not isinstance(stop, tuple):
            continue
        idx, r, g, b = stop
        pct = round(max(0, min(255, idx)) / 255 * 100, 2)
        rgb_stops.append(f"rgb({r},{g},{b}) {pct}%")
    if len(rgb_stops) < 2:
        return None
    return f"linear-gradient(90deg, {', '.join(rgb_stops)})"


def merge_palx_page(target: dict[int, str], page: dict[str, Any]) -> None:
    """Merge one /json/palx page into palette_id → CSS gradient map."""
    palettes = page.get("p")
    if not isinstance(palettes, dict):
        return
    for key, raw in palettes.items():
        try:
            palette_id = int(key)
        except (TypeError, ValueError):
            continue
        css = stops_to_css_gradient(parse_palx_stops(raw))
        if css:
            target[palette_id] = css


def parse_fxdata_sound_flags(fxdata: str, effect_count: int) -> list[str | None]:
    """Section 4 char per effect: v=volume, f=freq, 2=2d-only, else None."""
    if not fxdata or effect_count < 1:
        return [None] * max(effect_count, 0)

    rows = split_fxdata_rows(fxdata)
    if len(rows) > 1:
        flags: list[str | None] = []
        for i in range(effect_count):
            if i >= len(rows):
                flags.append(None)
                continue
            meta = parse_effect_meta_row(rows[i])
            flags.append(_flag_from_char(str(meta.get("flag") or "")))
        return flags

    sections = fxdata.split(";")
    if len(sections) < 4:
        return [None] * effect_count
    flags_section = sections[3]
    flags = []
    for i in range(effect_count):
        if i >= len(flags_section):
            flags.append(None)
            continue
        flags.append(_flag_from_char(flags_section[i]))
    return flags
