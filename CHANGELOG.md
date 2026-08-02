# Changelog

## 0.12.5

### Fixed
- **Master light resolution is now keyed to the device MAC.** `_resolve_master_entity` picked the alphabetically-first non-segment light entity, which mis-bound the master to segment 0 whenever the registry held a segment at `light.<device>` — Studio's master brightness then drove one segment only. The stock WLED master's `unique_id` is the bare MAC (segments carry a `_<seg>` suffix), so resolution now matches on that, with the old heuristic kept as fallback.

## 0.12.4

### Fixed
- **A temporarily unreachable strip no longer permanently kills the integration.** `async_setup_entry` raised a bare `WledClientUnavailable` when the WLED device was offline during setup (device reboot, Wi-Fi sleep, stock-WLED reload cascade), leaving the entry in a failed state with no retry — the Studio panel and card reported no controllers until a manual reload. Setup now raises `ConfigEntryNotReady`, so Home Assistant retries with backoff and the integration comes back on its own.

## 0.12.3

### Fixed
- **Flashing "throttled" hint no longer shifts page content.** The live-strip status was rendered directly from each frame's status, which flaps live/throttled at frame rate for coalesced viewers — the hint popped in and out, bouncing everything below it. The hint is now sticky (stays up ~4 s past the last coalesced frame) and lives in a fixed-height slot, so nothing below the strip moves. The strip canvas overlay also no longer dims/strobes for "throttled" frames (they are painted fresh; the overlay is reserved for genuine non-painting states).
- Build stamp brought back in sync with `manifest.json` (v0.12.2 shipped with a stale `WLED_STUDIO_BUILD`).

## 0.12.2

### Fixed
- **"No saved segment layout to restore" on un-merge.** The merge-for-effects flag defaulted to ON for any browser that had never toggled it, so the toggle rendered checked with no layout snapshot behind it — unchecking then errored even though the device still had its real segments. The flag now defaults to OFF (presence in storage ⟺ explicit opt-in), unchecking with a stale flag on an un-merged device is a clean no-op, and the error only appears when the device genuinely holds a Studio-merged span that this browser cannot reconstruct (clearer message included). The merged span is recognized by its `Merged (effects)` name stamp, so naturally single-segment strips are never mistaken for merged ones.
- The merge toggle now reflects device truth: a Studio-stamped merged span shows as checked even if the merge was applied from another browser.
- Merge toggle no longer dereferences a stale `Event.target` after awaits when reverting the checkbox on error.

### Fixed (review pass)
- **Captured multi-segment scenes replay each segment's own look.** `expand_scene_state` broadcast the FIRST scene segment as the template for every target id, so applying a captured scene collapsed a 4-segment design to segment 0's color/effect everywhere. Scene segments are now matched by id, with the first entry kept as the broadcast fallback for starter scenes.
- **Merge state is now grounded in the device layout everywhere.** `view-effects` and `segment-controls` treated the localStorage merge flag as "merged" even when the device still had its real segments — hiding the segment bar and silently collapsing effect/color writes to segment 0 while the UI claimed whole-strip. `_mergeActive` now requires the device layout to actually be merged; flag-on-but-unmerged keeps per-segment targeting (and, in Effects, shows the apply-merge prompt).
- **Partial merges no longer destroy unselected segments.** `buildMergeForEffectsState` deleted every non-zero segment and hijacked id 0 even when only a subset was selected; it now folds only the targeted segments (merged span takes the lowest targeted id) and leaves the rest untouched.
- **Paint commit no longer double-applies brush brightness.** The frontend bakes `bri/255` into the paint buffer for the WYSIWYG DDP preview, and the commit path scaled the payload by brush brightness again — committing `col x (bri/255)^2` (visibly darker than painted at any brightness below 255). Commit now uses the payload color verbatim.
- **`paint_start` is race-safe.** Backend `PaintSession.start()` takes a lock (overlapping ws calls leaked UDP transports and duplicated keepalive tasks); the painter frontend shares one in-flight start promise across the pointermove burst that begins a stroke.
- Floorplan uploads no longer block the event loop (disk writes moved to the executor, both the ws command and the HTTP view).
- Frontend re-registration on integration update now works without an HA restart: the version check ran after the registered-guard early-return (unreachable), pinning the panel/card to the previous `?hacstag` until reboot.
- Sleep-fade minutes input is clamped (an empty/invalid value silently skipped the fade); thumbnail-capture cancel surfaces errors instead of rejecting unhandled.

### Tests
- Regression tests for the phantom-merge state (fresh controller renders unchecked; stale-flag uncheck succeeds; real merged-without-snapshot still errors), partial-merge preservation, and per-segment scene replay.
- `test/setup.ts` shims `localStorage` when Node's experimental global shadows happy-dom's (Node ≥22 broke every localStorage-touching suite locally).

## 0.12.1

Phase 2 (part) of the v2 architecture: the card joins the shared shell controllers. No user-facing change.

### Internal
- `wled-studio-card` now shares `StudioSelectionController` with the panel, removing its duplicate segment-selection state and the `segment-targets-changed` / `segment-change` reducers (delegated via getters; template unchanged).
- The card's bootstrap/nav/live extraction (the larger, preview-coupled part of Phase 2) is folded into the Phase 4 `<wled-studio-shell>`, where it consolidates once instead of being extracted twice. CS-3/CS-4 move to the Phase 7.5 polish pass.

### Tests
- 143 vitest (was 141): +2 selection-controller tests.

## 0.12.0

Phase 1 of the v2 architecture: shared shell controllers; panel adopts them. No user-facing change.

### Internal
- New `frontend/src/core/` Lit `ReactiveController`s extracting the duplicated shell logic: `StudioSessionController` (controller discovery/pick + master entity), `StudioNavController` (active view + normalize-based hidden-view redirect), `StudioSelectionController` (selected/highlight segments + targets-changed reducer).
- `wled-studio-panel` now delegates its shell state to these controllers via getters; template and behavior unchanged. The "segments → color" redirect is enforced at the source (`normalize`) instead of a `willUpdate` guard.
- First controller unit tests (`test/studio-controllers.test.ts`); the card adopts the same controllers in the next phase.

### Tests
- 141 vitest (was 130): +11 controller tests.

## 0.11.5

Phase 0 of the v2 redesign: P1 bug fixes and functional blockers on a clean baseline. No new features; behavior-preserving except where noted.

### Fixes
- **Scenes (blocker):** "Overwrite anyway" now passes the remote `etag` to `scene_save`, so resolving a scene conflict succeeds instead of looping on the same conflict. (SC-1)
- **Scenes:** scene capture surfaces a server-side conflict as a typed error and keeps the typed name with an actionable message instead of a dead-end "Save failed" toast. (SC-2; defensive/forward-compatible — capture is a server-side upsert today.)
- **Effects/Segments/Paint:** all numeric sliders (Effects, Segment controls, and Paint brush) reject `NaN`/empty input and clamp to WLED's 0–255 range instead of writing invalid values to the device — consistent across every tab. (EF-2)
- **Effects/Segments:** "Merge for effects" no longer silently reshapes your segment selection on load — the merge reshape now requires an explicit per-controller opt-in (the default-on toggle state alone never mutates edit targets). (P1-1)
- **Effects:** removed dead `.compact-merge` styles that could not cross the merge-toggle's shadow boundary; compact styling is driven solely by the toggle's `compact` property. (P1-2)
- **Card:** the hidden-tab redirect runs in `willUpdate` instead of `updated`, eliminating a wasted extra render cycle. (P1-3)
- **Audio reactive:** default tuning now matches WLED's documentation — frequency scale square-root (was linear), limiter rise 60 ms (was 100), limiter fall 800 ms (was 400). Device-reported values still take precedence. (AU-1)

### Internal
- Extracted pure, unit-tested helpers: `isMergeForEffectsExplicit`, `clampSliderByte`, `parseAudioReactiveConfig`.
- Verified `_applyLibraryEntry`/`sliderValuesFromSegment` already filter undefined slider keys (P1-4 was already resolved in code); locked with a regression test.

### Tests
- 130 vitest (was 119): new coverage for scene conflict etag/translation, slider clamp/NaN, merge opt-in, and audio defaults.

## 0.11.4

### Palettes
- Palette picker on Color and Effects tabs when the active effect supports palettes (`palette_enabled`)
- Gradient previews from device `/json/palx` with name-based fallback
- Embedded palette editor overlay (iframe to WLED `cpal.htm`) plus open-in-new-tab link
- `host` and `palette_previews` included in `get_state`; `get_palette_previews` websocket for refresh after editing

### Effects UX
- Effects tab split layout: scrollable effect grid with fixed tuning footer (palette, advanced, sliders)
- Card Effects tab body no longer scrolls as one long page

### Thumbnails
- Effect tiles prefer palette-specific captures when available (`{fxId}_p{paletteId}_…`)

### Tests
- Palette gradient + palx parsing tests; 118 vitest, 62 pytest

## 0.11.3

### Audio reactive
- New AudioReactive control panel on the Audio view: GEQ input level, squelch, gain, AGC mode (Off/Normal/Vivid/Lazy), frequency scale (Linear/Sqrt/Log), limiter rise/fall, sync mode (Off/Send/Receive), sync port, palette injection toggle — writes to the WLED AudioReactive usermod via `apply_state`

### Per-segment advanced options
- New `wled-segment-advanced` disclosure on the Color and Effects tabs: grouping/spacing/offset, reverse, mirror, freeze, selected, sound simulation (Off/GEQ/WaveSin/Sweep), 1D-in-2D mode (For each/Bar/Arc/Corner), blend mode (Replace/Add/Subtract/Multiply/Lighten/Darken)
- Effect option checkboxes O1/O2/O3 surface when the current effect's metadata advertises them (and use the effect's defaults string for the label)

### API
- `WledSegment` extended with `frz`, `m12`, `bm`, `tt`
- New `applyAudioReactive()` helper that wraps `apply_state({ AudioReactive: … })`

## 0.11.2

### Segment targeting UX
- Segments tab hidden by default (opt-in via card editor); segment bar + merge toggle on Color and Effects tabs
- Merge for effects checked by default for new controllers — Studio no longer mutates device segments on load; instead it prompts to apply merge when WLED has a multi-segment layout
- **Breaking:** existing cards that relied on the Segments tab now need `show_segments: true` set in the card editor

### Color
- Save current state as a scene from the Color tab (compact card mode)

### Effects
- Card Effects tab: search, merge toggle, segment chips, Speed/Intensity/Custom sliders (compact mode)
- Save as default, save named copy to library, save as scene; pinned effects library row + star toggle
- Sound filter matches reactive effects by fxdata flags and name heuristics (e.g. DJ Light)

### Preview
- Segment highlight follows all targeted segments; thinner path-edge outline that no longer covers LEDs
- Remote badge uses dark text on warning background for readability

### Color
- Saved swatches renamed to Color library with Save to library action

### Tests
- 115 vitest

## 0.11.1

### UX polish
- Toast host component with auto-dismiss; skeleton loaders for effects/scenes/segments
- Tab fade transitions, scene-apply strip pulse, primary button press scale
- Swipe-between-tabs on card; long-press swatch delete; segment drag handles (visual reorder)

### Accessibility
- ARIA labels on icon controls; effect grid listbox semantics; improved scrim contrast

### Panel views
- Audio: band labels, peak meter, empty-state CTA
- Voice: entity copy buttons, Assist docs link
- Schedules: fade progress bar; shared `.primary` buttons on settings/firmware
- Card editor: tab visibility toggles (show_effects, show_scenes, show_segments, show_paint)

### Backend
- AudioSyncListener per config entry (fixes singleton unload bug)

### Tests
- 114 vitest, 58 pytest

## 0.11.0

### Design system
- Add `wledDesignTokens` CSS variables on HA tokens (Graphite-targeted)
- Global focus-visible styles and motion token aliases
- Replace hard-coded preview/wheel/tile colors with `--wled-*` tokens

### Card
- 5-tab IA: Color / Effects / Scenes / Segments / Paint
- Header → preview → tabs → panel → pinned global brightness with `%` label
- Scrollable WAI-ARIA tab bar with keyboard navigation
- Compact effects grid (2-column tiles); segment brightness hidden on Color tab

### Panel
- Primary nav mirrors card; secondary "More" section for Layout/Devices/Audio/etc.
- Active nav accent border; onboarding modal overlay with Escape dismiss

### Scenes
- Gradient scene tiles from stored WLED colors; reserved `scene_thumb_url` field

### Color & brightness
- Responsive color wheel (180–280px); external HA color sync
- Brightness off semantics (`turn_off` at 0, restore on drag-up)
- Paint brush uses `ha-slider`

### Tests
- Tab keyboard nav, scene gradients, expanded brightness/color sync (107 vitest)

## 0.10.23

### Backend
- Fix `StateWriter` propagating `WledClientUnavailable` instead of silently succeeding with stale state
- Harden `is_client_unavailable` with isinstance checks (ClientConnectorError, CancelledError, etc.)
- Route `_get_text` through session guards; add `_ws_call` helper for all HTTP websocket handlers
- Idempotent coordinator shutdown with awaited task cancellation
- Shutdown-aware debug logging in paint, thumb capture, notify, scene modules
- Throttle live_proxy reconnect warnings after 3 attempts

### Frontend
- Bundle version stamp + stale-page refresh banner after integration reload
- Fix panel paint missing `hass` (effect thumbnails)
- Dedupe custom element registration on card/panel entry points
- Recover card editor source; wire `show_scenes` config
- Color wheel isPowered lifecycle; global brightness load race + off-state + percentage label
- Add safe-custom-element and expanded wheel/brightness tests

### Tests
- Add pytest suite: client unavailable, WS error mapping, coordinator shutdown (55 tests)
