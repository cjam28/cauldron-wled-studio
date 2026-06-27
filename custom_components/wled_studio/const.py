"""Constants for WLED Studio."""

import json
from pathlib import Path
from typing import Final

_INTEGRATION_ROOT = Path(__file__).parent
with (_INTEGRATION_ROOT / "manifest.json").open(encoding="utf-8") as _manifest_fp:
    INTEGRATION_VERSION: Final[str] = str(
        json.load(_manifest_fp).get("version", "0.0.0")
    )

DOMAIN = "wled_studio"
SCHEMA_VERSION = 1

CONF_WLED_CONFIG_ENTRY = "wled_config_entry"
CONF_DEVICE_ID = "device_id"
CONF_HOST = "host"

STATIC_URL_PREFIX = "/wled_studio_static"
THUMB_API_URL = "/api/wled_studio/thumb/{controller_id}/{filename}"
LAYOUT_BG_API_URL = "/api/wled_studio/layout_bg/{controller_id}/{layout_id}"
LAYOUT_BG_LOCAL_PREFIX = "/local/wled_studio/layouts"
PANEL_URL_PATH = "wled-studio"
PANEL_MODULE = "wled-studio-panel"

STORAGE_VERSION = 1

# Live preview
LIVE_TARGET_FPS = 20
# Remote (Nabu Casa / WAN) subscribers are rate-limited to this cap so a single
# remote viewer never throttles LAN viewers (LV-2). Local subs always get the
# full LIVE_TARGET_FPS regardless of how many remote subs are present.
LIVE_REMOTE_FPS = 10
LIVE_LINGER_SECONDS = 5
LIVE_RECONNECT_BASE_SEC = 0.25
LIVE_RECONNECT_MAX_SEC = 8.0
LIVE_NO_FRAME_PROBE_SEC = 5
# Soft-stale threshold (LV-4): the held frame is considered genuinely OLD only
# once it has aged past this many seconds with the ws still alive. DECOUPLED
# from the broadcast tick (1/LIVE_TARGET_FPS = 50 ms) on purpose — upstream WLED
# ingest is frequently slower than the broadcast tick during healthy steady
# state, and a held-but-fresh frame must NOT be flagged stale. Only a real pause
# (>= LIVE_STALE_SEC) is "stale". Kept well under LIVE_NO_FRAME_PROBE_SEC so the
# soft-stale badge shows before the hard probe/reconnect window.
LIVE_STALE_SEC = 0.75

# HTTP client
HTTP_MAX_IN_FLIGHT = 5
HTTP_RATE_PER_SEC = 30
HTTP_BURST = 5

EVENT_LIVE_FRAME = f"{DOMAIN}_live_frame"
