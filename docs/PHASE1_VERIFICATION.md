# Phase 1 verification checklist (WLED Studio card)

What **should** work today vs what comes later (layout designer, paint, scenes).

## What Phase 1 includes

| Feature | Expected behavior |
|---------|-------------------|
| Integration + HACS install | Loads without setup errors; version in Settings matches `manifest.json` |
| Lovelace resource | Auto-added: `/wled_studio_static/wled-studio-card.js?hacstag=…` |
| `list_controllers` | Browser console returns Cloud entry, `master_entity_id`, `pixel_count: 210` |
| Live preview pipe | WLED → HA `live_proxy` → `subscribe_live` → card canvas |
| Strip preview | **1D bar**, 210 segments, colors **roughly** match the strip (not physical layout on ceiling) |
| Power button | Toggles `light.cloud` (stock WLED entity) |
| Brightness slider | `light.turn_on` with `brightness_pct` on same entity |

## What is **not** built yet (OK if wrong)

- Preview mapped to **your room layout** (which LED is which physical position)
- Paint / effects / scenes from the card
- Segment-accurate control per zone
- Studio panel beyond placeholder navigation

---

## Quick tests

### 1. Browser console (on the dashboard page)

```javascript
// Custom element registered
customElements.get("wled-studio-card");

// Backend API
await window.hassConnection.sendMessagePromise({
  type: "wled_studio/list_controllers",
  schema_version: 1,
});
// Expect: { ok: true, controllers: [{ entry_id, master_entity_id: "light.cloud", pixel_count: 210, host: "192.168.20.71" }] }

// Bundle loaded
// Look for: [wled-studio] lovelace bundle loaded
```

### 2. Live preview vs real strip

1. Set WLED to a **solid, obvious color** (e.g. bright red) in WLED app or HA.
2. Card strip should show a **mostly uniform red bar** (210 thin columns).
3. Change to **solid blue** — preview should follow within ~1 s.
4. Turn **off** — preview may go dark/black (WLED may send semicolon placeholder frames).

Mismatch in **which physical LED** is which color is expected until layout mapping exists. Mismatch in **overall hue** (red vs blue) is a bug.

### 3. Controls

- **Power** on card ↔ `light.cloud` state in Developer Tools → States.
- **Slider** ↔ brightness changes on same entity and visible on strip.

### 4. HA logs (optional)

After opening the dashboard with the card visible:

```text
# Should appear (debug/info):
live_proxy connected entry=... host=192.168.20.71
```

No repeating `unknown_command` or `AwesomeVersion` errors.

### 5. “connecting” overlay

- **Brief** once on load: normal.
- **Rapid flashing**: bug (fixed in 0.3.2 — card was re-bootstrapping on every `hass` state update).

---

## Success criteria for Phase 1 “wow moment”

- [ ] Integration loads and stays loaded
- [ ] Card renders without `Custom element not found`
- [ ] Preview updates when WLED colors change (solid colors test)
- [ ] Power + brightness control `light.cloud`
- [ ] No constant `connecting` flicker after 0.3.2+
