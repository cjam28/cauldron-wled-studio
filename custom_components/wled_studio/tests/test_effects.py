"""Tests for fxdata parsing."""

import json

from wled_studio.effects import (
    build_effect_name_map,
    effect_meta_for_id,
    normalize_fxdata_response,
    parse_effect_meta_row,
    parse_fxdata_sound_flags,
)


def test_build_effect_name_map_skips_rsvd() -> None:
    names = ["Solid", "RSVD", "-", "Blink"]
    m = build_effect_name_map(names)
    assert m["Solid"] == 0
    assert m["Blink"] == 3
    assert "RSVD" not in m


def test_parse_aurora_meta() -> None:
    meta = parse_effect_meta_row("!,!;;!;1;sx=24,pal=50")
    assert meta["sliders"]["sx"] is True
    assert meta["sliders"]["ix"] is True
    assert meta["sliders"]["c1"] is False
    assert meta["flag"] == "1"
    assert meta["defaults"]["sx"] == "24"


def test_normalize_fxdata_json_array() -> None:
    raw = json.dumps(["!,!;;!;1", ",,,,,,,,;;;"])
    assert normalize_fxdata_response(raw).count("\n") == 1


def test_normalize_fxdata_invalid_json() -> None:
    raw = "!,!;;!;1\n,,,,,,,,,;;;"
    assert normalize_fxdata_response(raw) == raw


def test_sound_flags_per_row() -> None:
    fxdata = "a;b;c;d;\ne;f;g;h;\n!,!;;v;\n"
    flags = parse_fxdata_sound_flags(fxdata, 3)
    assert flags[2] == "v"


def test_sound_flags_volume() -> None:
    # section 4: one char per effect index
    fxdata = "a;b;c;vf2;"
    flags = parse_fxdata_sound_flags(fxdata, 4)
    assert flags[0] == "v"
    assert flags[1] == "f"
    assert flags[2] == "2"
    assert flags[3] is None


def test_effect_meta_for_id_by_line() -> None:
    fxdata = "!,!;;!;1\n,,,,,,,;;;\n!,sx;;v;"
    meta0 = effect_meta_for_id(fxdata, 0)
    meta2 = effect_meta_for_id(fxdata, 2)
    assert meta0["sliders"]["sx"] is True
    assert meta2["flag"] == "v"
