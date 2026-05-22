# Changelog

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
