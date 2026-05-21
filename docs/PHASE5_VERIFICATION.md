# Phase 5 verification (Studio panel + scenes) — v0.8.0

After HACS **Redownload** of `0.8.0+` and **Reload** WLED Studio:

## Panel navigation

1. Open **WLED Studio** sidebar panel.
2. Left rail (or hamburger drawer &lt;600px) shows: Devices, Layout, Scenes, Effects, Paint, Segments, Audio, Voice, Settings.
3. **Devices** lists attached controllers (host, LED count, master entity).
4. **Layout** and **Segments** behave as before.
5. **Paint / Audio / Voice / Settings** show “not built yet” placeholders.

## Scenes

1. First open **Scenes** auto-seeds eight starters: Movie, Party, Warm Read, Sunrise, Sunset, Music Mode, Off, Notification Flash.
2. Tap a scene tile — strip crossfades via WLED `tt` (device-side), not rapid client POSTs.
3. **Save current look** captures `/json/state` into a new scene (deletable; starters are not deletable).
4. Developer Tools → States: `scene.*` entities appear per saved scene (usable with Assist `scene.turn_on`).

## WebSocket (browser console)

```js
const c = document.querySelector("home-assistant")?.hass?.connection;
const ctrls = await c.sendMessagePromise({ type: "wled_studio/list_controllers", schema_version: 1 });
const id = ctrls.controllers[0].entry_id;
await c.sendMessagePromise({ type: "wled_studio/scene_list", schema_version: 1, controller_id: id });
await c.sendMessagePromise({
  type: "wled_studio/scene_apply",
  schema_version: 1,
  controller_id: id,
  scene_id: "movie",
});
```

## Conflict (optional)

Save the same scene from two browsers with a stale `etag` → `conflict` error and reload/overwrite UI.
