"""Layout / fixture geometry — arc-length LED placement (Phase 3)."""

from __future__ import annotations

import math
from dataclasses import asdict, dataclass, field
from typing import Any


@dataclass
class Anchor:
    """Pinned LED index at a path vertex."""

    led: int
    vertex_index: int


@dataclass
class Fixture:
    """One drawable path with optional LED anchors."""

    id: str
    name: str
    kind: str = "polyline"
    points: list[tuple[float, float]] = field(default_factory=list)
    anchors: list[Anchor] = field(default_factory=list)
    closed: bool = False


@dataclass
class Layout:
    """Physical layout for one controller."""

    id: str
    controller_id: str
    name: str = "Default"
    pixel_count: int = 210
    fixtures: list[Fixture] = field(default_factory=list)
    background_url: str | None = None
    scale_px_per_m: float | None = None
    etag: str = ""

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Layout:
        fixtures = []
        for raw in data.get("fixtures") or []:
            if not isinstance(raw, dict):
                continue
            anchors = [
                Anchor(int(a["led"]), int(a["vertex_index"]))
                for a in raw.get("anchors") or []
                if isinstance(a, dict)
            ]
            pts = [
                (float(p[0]), float(p[1]))
                for p in raw.get("points") or []
                if isinstance(p, (list, tuple)) and len(p) >= 2
            ]
            fixtures.append(
                Fixture(
                    id=str(raw.get("id", "fixture-0")),
                    name=str(raw.get("name", "Fixture")),
                    kind=str(raw.get("kind", "polyline")),
                    points=pts,
                    anchors=anchors,
                    closed=bool(raw.get("closed")),
                )
            )
        return cls(
            id=str(data.get("id", "layout-0")),
            controller_id=str(data.get("controller_id", "")),
            name=str(data.get("name", "Default")),
            pixel_count=int(data.get("pixel_count", 210)),
            fixtures=fixtures,
            background_url=data.get("background_url"),
            scale_px_per_m=data.get("scale_px_per_m"),
            etag=str(data.get("etag", "")),
        )


def _path_lengths(points: list[tuple[float, float]], closed: bool) -> tuple[list[float], float]:
    if len(points) < 2:
        return [], 0.0
    seg_lens: list[float] = []
    total = 0.0
    n = len(points)
    limit = n if closed else n - 1
    for i in range(limit):
        j = (i + 1) % n
        dx = points[j][0] - points[i][0]
        dy = points[j][1] - points[i][1]
        d = math.hypot(dx, dy)
        seg_lens.append(d)
        total += d
    return seg_lens, total


def resolve_led_positions(
    fixture: Fixture, pixel_count: int
) -> list[tuple[float, float, int]]:
    """Map LED indices to (x, y) along fixture path using anchor arc-lengths.

    Returns list of (x, y, led_index).
    """
    points = fixture.points
    if len(points) < 2 or not fixture.anchors:
        return []

    seg_lens, total_len = _path_lengths(points, fixture.closed)
    if total_len <= 0:
        return []

    anchor_map = {a.vertex_index: a.led for a in fixture.anchors}
    verts = sorted(anchor_map.keys())
    if not verts:
        return []

    # Cumulative distance to each vertex along path
    vert_dist: dict[int, float] = {0: 0.0}
    acc = 0.0
    n = len(points)
    limit = n if fixture.closed else n - 1
    for i in range(limit):
        acc += seg_lens[i] if i < len(seg_lens) else 0.0
        vert_dist[(i + 1) % n if fixture.closed else i + 1] = acc

    def point_at_distance(d: float) -> tuple[float, float]:
        d = d % total_len if fixture.closed else min(max(d, 0.0), total_len)
        walked = 0.0
        for i in range(limit):
            seg = seg_lens[i] if i < len(seg_lens) else 0.0
            if walked + seg >= d and seg > 0:
                t = (d - walked) / seg
                j = (i + 1) % n if fixture.closed else i + 1
                x = points[i][0] + t * (points[j][0] - points[i][0])
                y = points[i][1] + t * (points[j][1] - points[i][1])
                return (x, y)
            walked += seg
        return points[-1]

    # Build LED ranges between consecutive anchors
    led_positions: dict[int, tuple[float, float]] = {}
    ordered = sorted(fixture.anchors, key=lambda a: a.led)
    for idx, anchor in enumerate(ordered):
        vx = min(anchor.vertex_index, len(points) - 1)
        led_positions[anchor.led] = points[vx]
        if idx + 1 >= len(ordered):
            continue
        nxt = ordered[idx + 1]
        d0 = vert_dist.get(
            min(anchor.vertex_index, max(vert_dist.keys(), default=0)), 0.0
        )
        v1 = min(nxt.vertex_index, len(points) - 1)
        d1 = vert_dist.get(v1, total_len)
        span = nxt.led - anchor.led
        if span <= 1:
            continue
        arc = (d1 - d0) % total_len if fixture.closed else d1 - d0
        if arc < 0:
            arc += total_len
        for k in range(1, span):
            led = anchor.led + k
            if led >= pixel_count or led >= nxt.led:
                break
            dist = d0 + arc * (k / span)
            led_positions[led] = point_at_distance(dist)

    return [(xy[0], xy[1], led) for led, xy in sorted(led_positions.items())]


def fixture_to_wled_segments(
    fixture: Fixture, pixel_count: int, name_prefix: str = "Side"
) -> list[dict[str, Any]]:
    """Build WLED /json/state seg entries from anchor pairs (stop is exclusive)."""
    if not fixture.anchors:
        return []
    ordered = sorted(fixture.anchors, key=lambda a: a.led)
    out: list[dict[str, Any]] = []
    for i, anchor in enumerate(ordered):
        start = max(0, min(anchor.led, pixel_count - 1))
        if i + 1 < len(ordered):
            stop = max(start + 1, min(ordered[i + 1].led, pixel_count))
        else:
            stop = pixel_count
        out.append(
            {
                "id": i,
                "start": start,
                "stop": stop,
                "n": f"{name_prefix} {i + 1}",
                "on": True,
            }
        )
    return out


def kitchen_island_fixture() -> Fixture:
    """Reference fixture: sides 0→85→96→186→210 (v1 plan)."""
    return Fixture(
        id="kitchen-island",
        name="Kitchen island",
        kind="polyline",
        closed=True,
        points=[
            (0.0, 0.0),
            (100.0, 0.0),
            (110.0, 10.0),
            (200.0, 10.0),
            (0.0, 0.0),
        ],
        anchors=[
            Anchor(0, 0),
            Anchor(85, 1),
            Anchor(96, 2),
            Anchor(186, 3),
        ],
    )
