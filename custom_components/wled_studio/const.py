"""Constants for WLED Studio."""

DOMAIN = "wled_studio"
SCHEMA_VERSION = 1

CONF_WLED_CONFIG_ENTRY = "wled_config_entry"
CONF_DEVICE_ID = "device_id"
CONF_HOST = "host"

STATIC_URL_PREFIX = "/wled_studio_static"
PANEL_URL_PATH = "wled-studio"
PANEL_MODULE = "wled-studio-panel"

STORAGE_VERSION = 1

# Live preview
LIVE_TARGET_FPS = 20
LIVE_LINGER_SECONDS = 5
LIVE_RECONNECT_BASE_SEC = 0.25
LIVE_RECONNECT_MAX_SEC = 8.0
LIVE_NO_FRAME_PROBE_SEC = 5

# HTTP client
HTTP_MAX_IN_FLIGHT = 5
HTTP_RATE_PER_SEC = 30
HTTP_BURST = 5

EVENT_LIVE_FRAME = f"{DOMAIN}_live_frame"
