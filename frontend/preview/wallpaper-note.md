# Preview wallpaper

The M3 design harness (`index.html` + `preview-entry.ts`) needs a wallpaper
behind the cards so the **glass / translucent surfaces** and the dashboards'
**scrim** read correctly — exactly like the live md3-wall / md3-port wall.

## Why there is no image file here

This directory ships **no binary wallpaper asset** on purpose:

- The harness must be **self-contained** and **dependency-free** so
  `npm run preview` works on any checkout with no extra fetch step, and so the
  repo stays free of large binaries.
- Screenshots for design review need a **deterministic** background — a fixed
  CSS gradient produces byte-identical output every run, unlike a rotating
  photo.

So `preview-entry.ts` paints a **synthetic gradient "wallpaper"** (a colorful
mesh of radial gradients seeded from the same hue family as the active M3
scheme) directly onto `document.body`, then layers the **dashboards' scrim** on
top of it.

## The scrim (matched to the live wall)

The wall injects a top→bottom dark scrim above the wallpaper so bright images
don't wash out the cards. Source of truth:

- `CauldronOS/dashboards/md3-wall/build/assemble.py`
  → `BG = "linear-gradient(rgba(10,12,18,0.5), rgba(10,12,18,0.72)), url(<wallpaper>)"`
- `CauldronOS/cauldron-pi/homeassistant_config/www/material-you/bg-live.js`
  → live re-applies the same `linear-gradient(rgba(10,12,18, top), rgba(10,12,18, bot))`
    scrim (defaults `top≈0.5`, `bot≈0.72`).

The harness uses the **identical** scrim stop values
(`rgba(10,12,18,0.5)` → `rgba(10,12,18,0.72)`) so what you screenshot here
matches what lands on the wall.

## Using a real wallpaper instead (optional)

To eyeball a card over an actual rotating wall image, drop a JPG/PNG into this
directory (e.g. `wallpaper.jpg`) and set, in the browser devtools console:

```js
document.body.style.setProperty(
  "--wled-preview-wallpaper",
  'url("/wallpaper.jpg")'
);
```

`preview-entry.ts` reads `--wled-preview-wallpaper` first and only falls back to
the synthetic gradient when it is unset, so no code change is required. Do **not**
commit large wallpaper binaries — keep them local.

## Dark mode

The harness also exposes a light/dark toggle. Dark mode swaps the injected
`--md-sys-color-*` set to the dark TONAL_SPOT scheme (scheme **follows HA /
Material You** on the real dashboards; standalone uses `m3-color.ts` with
`prefers-color-scheme`). The scrim is unchanged in both modes — it is a fixed
dark overlay on the live wall regardless of scheme.
