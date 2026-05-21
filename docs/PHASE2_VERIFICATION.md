# Phase 2 verification (segment control + color)

After HACS **Redownload** of `0.4.0+` and **Reload** WLED Studio:

## Lovelace card

1. Card shows segment tabs (from stock `light.*_segment_N` entities).
2. iro color wheel + W slider + Auto-white dropdown change `light.cloud` segment colors on the strip.
3. Effect chip strip: pick an effect; strip updates within ~100 ms.
4. Speed / custom sliders appear only when `/json/fxdata` marks them with `!` for that effect.
5. Quick-load preset circles (if any `ql` labels exist in `/presets.json`) load a preset.

## WebSocket (browser console)

```js
const c = document.querySelector("home-assistant")?.hass?.connection;
const ctrls = await c.sendMessagePromise({ type: "wled_studio/list_controllers", schema_version: 1 });
const id = ctrls.controllers[0].entry_id;
await c.sendMessagePromise({ type: "wled_studio/get_state", schema_version: 1, controller_id: id });
await c.sendMessagePromise({
  type: "wled_studio/apply_state",
  schema_version: 1,
  controller_id: id,
  state: { seg: [{ id: 0, fx: 0, col: [[255, 0, 0, 0]] }] },
});
```

## Studio panel

Open **WLED Studio** → **Segments** — full effect search + all fxdata sliders (not compact).
