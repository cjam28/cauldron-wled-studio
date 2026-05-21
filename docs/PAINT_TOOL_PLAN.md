# Paint tool plan — per-LED brush + equal zones between major vertices

**Status:** Design (pre–Phase 6 implementation)  
**Related:** Phase 6 in `wled_visual_controller_hacs` plan, `geometry.py`, layout designer (major vertices only)

## Goals

1. **Per-LED painting** on the physical layout (brush, fill, eyedropper, gradients) via DDP — independent of WLED segment count.
2. **Equal-zone splitter** on an edge between two **major** layout vertices: “I want **N** colors on the run from V0 → V1” → auto-create **N − 1** evenly spaced division points along that edge (by LED index and arc length).
3. **Layout designer stays simple:** only major vertices (corners, structural breaks). Zone splits live in the **Paint** workspace, not as extra layout vertices.

## Concepts (terminology)

| Term | Where it lives | Purpose |
|------|----------------|---------|
| **Major vertex** | Layout fixture `points[]` + optional `anchorLed` | Shape + WLED segment boundaries when user applies segments |
| **Edge** | Derived: consecutive major vertices along closed/open path | One side of the island, one LED run between two anchors |
| **Paint zone** | Paint document only (see data model) | A contiguous LED range on one edge, used for fill/color/effect targeting |
| **Zone split** | Paint-only point on an edge | LED index + (x,y) from resolver; **not** a layout vertex |

Example: rectangle V0–V1 with anchors LED **0** and **85**, user chooses **4 zones** → zones are LEDs `[0,21)`, `[21,42)`, `[42,63)`, `[63,85]` (equal count split; arc-length split optional v1.1).

## Architecture split

```
Layout Designer                    Paint view (Phase 6)
─────────────────                  ────────────────────
• Draw guide / place               • Load layout + resolved positions
  major vertices                   • kdbush hit-test → LED index
• Pin anchors at corners           • Brush → DDP frame buffer
• Save layout → HA Store           • Equal-zone tool on selected edge
• Apply segments → WLED          • Optional: “Push zones as WLED segments”
  (major segments only)
```

Paint **reads** layout geometry and anchor LED indices; it **does not** write back to `fixture.points[]` when splitting zones.

## Equal-zone tool — UX

### Entry

- User opens **Paint** (panel chunk), layout is already saved with major vertices.
- Select **edge** (click V0→V1 highlight on canvas, or pick “Side 1 (0–85)” in inspector).
- Tool: **Split into N zones** (number input 2–16, default 4).

### Action

1. Resolve `led_start` / `led_stop` from anchors at V0 and V1 (ordered along path direction).
2. Compute **N** contiguous LED ranges:
   - **v1 (recommended):** equal **LED count** per zone — `floor(span * k / N)` boundaries (simple, predictable for “4 colors”).
   - **v1.1 option:** equal **arc length** along path (matches physical spacing when strip density varies).
3. Create **N − 1** zone splits at interior boundaries (store LED index + resolved x,y for display).
4. Show **N** colored bands on that edge (inspector swatches); click a zone → active fill target.

### Example (your rectangle face V0–V1, 4 colors)

- Anchors: V0 = LED 0, V1 = LED 85 → span = 85 LEDs.
- Zones (equal count):  
  - Z0: 0–21  
  - Z1: 21–42  
  - Z2: 42–63  
  - Z3: 63–85  
- **3 split points** at LEDs 21, 42, 63 (shown as small ticks on the edge, not layout vertices).

### Painting workflow after split

- **Fill zone** — one color for all LEDs in range (DDP).
- **Brush** — still per-LED; splits are guides (snap optional).
- **Apply gradient along edge** — across all N zones or within one zone.
- **Clear edge** — reset zones on that edge only.

## Data model (paint document)

Stored separately from layout (HA Store key e.g. `paint_overlays/{controller_id}/{layout_id}`), etag’d:

```json
{
  "schema_version": 1,
  "layout_id": "kitchen-island",
  "fixture_id": "kitchen-island",
  "edges": {
    "0-1": {
      "vertex_a": 0,
      "vertex_b": 1,
      "zone_count": 4,
      "split_mode": "equal_led_count",
      "zones": [
        { "id": "z0", "led_start": 0, "led_stop": 21, "color": [255, 0, 0, 0] },
        { "id": "z1", "led_start": 21, "led_stop": 42, "color": [0, 255, 0, 0] },
        { "id": "z2", "led_start": 42, "led_stop": 63, "color": [0, 0, 255, 0] },
        { "id": "z3", "led_start": 63, "led_stop": 85, "color": [255, 255, 0, 0] }
      ]
    }
  },
  "pixel_buffer": null
}
```

- `zones[].led_stop` is **exclusive** (matches WLED segment convention).
- Re-splitting with a new N **replaces** zones on that edge (confirm dialog).
- Unpinned vertices on layout are ignored for zone tools (only **anchored** major vertices define edges).

## Optional: push zones to WLED (not required for paint)

| Mode | Behavior |
|------|----------|
| **Paint only (default)** | DDP writes pixels; WLED may stay on one segment or existing major segments |
| **Push zones as segments** | One-shot `layout_to_segments`-style push using zone boundaries → many WLED segments for HA `light.*` per zone |

Layout designer **Apply segments** continues to use **major anchors only**. Paint offers a separate button: **“Sync WLED segments to paint zones”** when the user wants HA/voice control per color band.

## Implementation phases (within / after Phase 6)

### 6a — Core paint (existing plan)

- `geometry-mapper.ts` + kdbush from `layout_resolve_positions`
- Brush → `paint_frame` / `paint_stop` (DDP)
- Undo stack (immer) on pixel buffer

### 6b — Equal zones (this doc)

- `edge-zones.ts`: `splitEdgeIntoZones(anchorA, anchorB, n, mode)` using same arc math as `geometry.py`
- Paint UI: edge picker, N spinner, zone list with color wells
- Overlay render: tick marks at splits on geometry canvas (reuse Konva stage or dedicated paint canvas)
- Persist `paint_overlays` store + load on Paint open

### 6c — Polish

- Snap brush to zone boundary
- “Copy zones from edge V0–V1 to V2–V3” (same zone count)
- Arc-length split mode toggle

## API additions (companion integration)

| Command | Purpose |
|---------|---------|
| `wled_studio/paint_overlay_get` | Load paint overlay for layout |
| `wled_studio/paint_overlay_save` | Save zones + optional committed buffer hash |
| `wled_studio/paint_edge_split` | Server-side zone split (optional; can be client-only math mirroring `geometry.py`) |
| `wled_studio/paint_frame` | (planned) DDP push |
| `wled_studio/paint_zones_to_segments` | Optional: push zone boundaries to WLED |

Server-side split is optional if the frontend duplicates `resolve_led_positions` boundary math; prefer **one shared Python function** `split_anchor_span(led_start, led_stop, n, mode)` in `geometry.py` for tests and kitchen-island fixture.

## Layout designer — unchanged

- No new tools for “minor vertices” in layout.
- Instructions: *Place anchors at corners → Save. Use **Paint** to split edges into color zones.*
- Geometry preview / live strip unchanged for major segments.

## Testing

- Unit: `split_anchor_span(0, 85, 4)` → `[0,21), [21,42), [42,63), [63,85]`
- Unit: closed path edge V3→V0 uses wrap arc if anchors warrant
- Unit: `n=2` on edge → one split, two zones
- E2E: paint overlay save/load round-trip with etag

## Open decisions (for you)

1. **Equal LED count vs equal arc length** as default — recommend **equal LED count** for “4 colors” intuition; arc length as advanced toggle.
2. **Max zones per edge** — cap at 16 (WLED segment practical limit per device varies).
3. **Whether zone colors commit to a Scene** on Save scene vs ephemeral until “Commit paint to device”.

---

**Summary:** Major vertices in Layout; Paint adds **ephemeral zone splits** between two major anchors for multi-color edges without cluttering the layout model. Individual LED brush works everywhere; equal-zone tool is the fast path for “N colors between V0 and V1.”
