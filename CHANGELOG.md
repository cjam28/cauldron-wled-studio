# Changelog

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
