"""Starter scenes auto-seeded on first run per controller."""

from __future__ import annotations

from typing import Any

from .scene_expand import build_starter_segment_template
from .scene_store import SceneRecord
from .wled_client import WledClient

# Bump when starter names/colors change so existing installs re-sync seeded scenes.
STARTER_SCENE_REVISION = 2

_STARTER_DEFS: list[dict[str, Any]] = [
    {
        "id": "movie",
        "name": "Movie",
        "effect": "Solid",
        "bri": 90,
        "col": [[255, 120, 40, 0]],
        "transition_ms": 2500,
    },
    {
        "id": "party",
        "name": "Party",
        "effect": "Colorloop",
        "bri": 200,
        "col": [[255, 0, 255, 0]],
        "transition_ms": 1500,
    },
    {
        "id": "warm_read",
        "name": "Reading Light",
        "effect": "Solid",
        "bri": 120,
        "col": [[255, 180, 100, 0]],
        "transition_ms": 2500,
    },
    {
        "id": "warm_red",
        "name": "Warm Red",
        "effect": "Solid",
        "bri": 160,
        "col": [[255, 48, 12, 0]],
        "transition_ms": 2500,
    },
    {
        "id": "sunrise",
        "name": "Sunrise",
        "effect": "Solid",
        "bri": 180,
        "col": [[255, 200, 120, 0]],
        "transition_ms": 5000,
    },
    {
        "id": "sunset",
        "name": "Sunset",
        "effect": "Solid",
        "bri": 140,
        "col": [[255, 80, 40, 0]],
        "transition_ms": 5000,
    },
    {
        "id": "music_mode",
        "name": "Music Mode",
        "effect": None,
        "sound": True,
        "bri": 200,
        "transition_ms": 1000,
    },
    {
        "id": "off",
        "name": "Off",
        "off": True,
        "transition_ms": 1500,
    },
    {
        "id": "notification_flash",
        "name": "Notification Flash",
        "effect": "Blink",
        "bri": 255,
        "col": [[0, 120, 255, 0]],
        "transition_ms": 0,
    },
]


def _resolve_fx(client: WledClient, name: str | None, *, sound: bool = False) -> int:
    if sound:
        for idx, flag in enumerate(client.sound_flags):
            if flag in ("v", "f"):
                for fx_name, fx_id in client.effects_by_name.items():
                    if fx_id == idx:
                        return idx
        for fallback in ("Soundwaves", "GEQ", "Noisemove", "DJ"):
            if fallback in client.effects_by_name:
                return client.effects_by_name[fallback]
    if name and name in client.effects_by_name:
        return client.effects_by_name[name]
    return client.effects_by_name.get("Solid", 0)


def build_starter_scenes(controller_id: str, client: WledClient) -> list[SceneRecord]:
    """Build starter SceneRecords resolved against this controller's catalog."""
    out: list[SceneRecord] = []
    for spec in _STARTER_DEFS:
        if spec.get("off"):
            wled_state = build_starter_segment_template(
                fx=0, bri=0, col=None, off=True
            )
        else:
            fx = _resolve_fx(
                client,
                spec.get("effect"),
                sound=bool(spec.get("sound")),
            )
            wled_state = build_starter_segment_template(
                fx=fx,
                bri=int(spec.get("bri", 128)),
                col=spec.get("col"),
            )
        out.append(
            SceneRecord(
                id=str(spec["id"]),
                controller_id=controller_id,
                name=str(spec["name"]),
                wled_state=wled_state,
                transition_ms=int(spec.get("transition_ms", 2500)),
                seeded=True,
            )
        )
    return out
