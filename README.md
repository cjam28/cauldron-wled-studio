# WLED Studio

Govee-grade WLED visual controller for Home Assistant — HACS card + companion integration with Layout Designer, Effect Builder, and Voice Assist config.

**Requires:** Home Assistant ≥ 2024.6.0 and the stock [WLED](https://www.home-assistant.io/integrations/wled/) integration. WLED Studio **attaches** to existing WLED config entries; it does not replace them.

## Highlights (v1)

- Live pixel preview on your physical layout (not just a 1D strip)
- Layout Designer — draw fixtures, pin LED indices, auto-segments
- Geometry-aware paint via DDP (browser → HA → integration → WLED)
- HA-side scenes with device-side crossfade and `scene.*` entities for Assist
- Effect Builder, Voice config, schedules, multi-device groups

If you want a native phone app device manager, [WLED+](https://github.com/pixel-heart/wledplus-releases) is excellent for that lane. WLED Studio is HA-native: dashboards, automations, and Assist.

## Install

1. Add this repo as a custom HACS repository (private until post-v1 decision).
2. Install **WLED Studio** from HACS (Frontend + Integration).
3. Configure **Settings → Devices & services → Add integration → WLED Studio** and pick an existing WLED device.

## Development

```bash
cd frontend && npm ci && npm run build
```

Built assets land in `dist/` and are committed for HACS installs.

## License

MIT — see [LICENSE](LICENSE).
