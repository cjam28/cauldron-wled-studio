# `components/m3` — Material 3 chrome (hybrid `@material/web`)

This directory is the **hybrid** half of the WLED Studio M3 foundation: it makes a
small, fixed set of standard [`@material/web`](https://github.com/material-components/material-web)
components usable inside the card + admin panel. Everything bespoke (color wheel,
painter canvas, DDP preview strip, audio meter, layout designer, tiles/chips)
stays **token-themed custom Lit** — see `styles/state-layer.ts` and the
`components/` widgets. This split is the owner-locked decision in the spec
(`docs/superpowers/specs/2026-06-26-wled-m3-foundation-design.md`, §"Owner
decisions" #2 and §"Fit assessment").

> Status: foundation only. This makes the M3 chrome **available**; it does **not**
> rewire existing views yet. Adopt the tags in views during the redesign phases.

## Usage

Import the module **once** anywhere a WLED Studio host is defined (it is
side-effect only — it registers the custom-element tags):

```ts
import "../components/m3/index.js";
```

Then use the tags in any host template. The host **must extend
`BasePoweredElement`** (it already does for every WLED Studio component):

```ts
import { LitElement, html } from "lit";
import { BasePoweredElement } from "../base/base-powered-element.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { whenPowered } from "../components/m3/index.js";
import "../components/m3/index.js";

@safeCustomElement("wled-example")
class WledExample extends BasePoweredElement {
  render() {
    return html`
      <md-slider
        min="0" max="255" .value=${this.bri}
        @input=${(e: Event) =>
          this.setBri((e.target as HTMLInputElement).valueAsNumber)}
      ></md-slider>

      <md-tabs>
        <md-primary-tab>Effects</md-primary-tab>
        <md-primary-tab>Scenes</md-primary-tab>
      </md-tabs>

      <md-switch ?selected=${this.on} @change=${this.toggle}></md-switch>
      <md-icon-button @click=${this.expand}>
        <span class="material-icons">expand_more</span>
      </md-icon-button>
      <md-fab variant="primary" label="Add"></md-fab>
    `;
  }

  // High-frequency / streamed writes: gate behind the powered state so a
  // backgrounded card does no needless work (see "Power-down coexistence").
  private onLiveFrame(bri: number) {
    whenPowered(this, () => {
      (this.renderRoot.querySelector("md-slider") as HTMLInputElement).value =
        String(bri);
    });
  }
}
```

### What's exported

`index.js` is mostly side effects (tag registration). It also re-exports a few
helpers from `register.js`:

| Export | Purpose |
|---|---|
| `M3_TAGS` | Readonly list of the registered tags (the adopted chrome). |
| `isM3Registered()` | `true` once every M3 tag is in the registry. |
| `whenPowered(host, fn)` | Run `fn` only while `host.isPowered` (skips work when the host is off-screen / tab hidden). |
| `beginM3Registration()` / `endM3Registration()` | Open/close the idempotent-`define` window. Already called around the imports in `index.js`; exported for advanced/manual registration only. |

## Adopted components (and ONLY these)

Bundle budget is a first-class constraint (spec §"Risks": *import only ~5
components*). We import each family by its deep path and **never** import
`@material/web/all.js`.

Two things differ: the adopted **vocabulary** (`M3_TAGS` in `register.ts`) is the
full hybrid set the card AND the Phase-5 panel may use; the **eager imports** in
`index.ts` are only the families the shell (`core/studio-shell.ts`) renders
*today*. Tags marked "panel (deferred)" are part of the vocabulary but are NOT
imported until the panel surface renders them (importing them now would only add
dead weight to the card bundle on the wall).

| Tag | WLED surface | Module | Imported by `index.ts`? |
|---|---|---|---|
| `<md-slider>` | master / brightness | `@material/web/slider/slider.js` | ✅ eager (shell) |
| `<md-navigation-bar>`, `<md-navigation-tab>` | adaptive nav — compact bar | `@material/web/labs/{navigationbar/navigation-bar,navigationtab/navigation-tab}.js` | ✅ eager (shell) |
| `<md-navigation-drawer>` | adaptive nav — wide rail/drawer | `@material/web/labs/navigationdrawer/navigation-drawer.js` | ✅ eager (shell) |
| `<md-icon-button>` | buttons / affordances | `@material/web/iconbutton/icon-button.js` | ✅ eager (shell) |
| `<md-fab>` | expand / primary action | `@material/web/fab/fab.js` | ✅ eager (shell) |
| `<md-tabs>`, `<md-primary-tab>`, `<md-secondary-tab>` | in-content tabs | `@material/web/tabs/{tabs,primary-tab,secondary-tab}.js` | ⏳ panel (deferred) |
| `<md-switch>` | settings toggles | `@material/web/switch/switch.js` | ⏳ panel (deferred) |
| `<md-filled-icon-button>` / `<md-filled-tonal-icon-button>` / `<md-outlined-icon-button>` | button variants | `@material/web/iconbutton/*.js` | ⏳ panel (deferred) |

> The `navigationbar` / `navigationtab` / `navigationdrawer` elements are in
> `@material/web/labs/*` (not yet stable). They cover the spec's "compact tab-bar
> ↔ wide rail" adaptive nav. Pick `md-tabs` for in-content tabs and the
> navigation family for app-level view switching; choose at adoption time per
> view. Adaptive switching is driven by **container queries** (see
> `styles/container.ts`) — no viewport media queries.

## M3 tokens these components consume

Every adopted element themes itself **entirely from `--md-sys-color-*`,
`--md-sys-typescale-*`, and `--md-sys-shape-corner-*`**, all defined with the
spec's fallback cascade in `styles/tokens.ts` (Material You module → HA theme var
→ M3 baseline literal). The components **consume** the palette; they never
generate it (the Material You module owns generation on the dashboards;
`core/m3-color.ts`'s `applyDynamicScheme` owns it for the admin/standalone path).

Because `@material/web` reads its own `--md-comp-*` component tokens, which in turn
default to these `--md-sys-*` roles, setting the system roles is sufficient — no
per-component overrides are needed for the WLED look.

### Color roles by component (primary roles only)

| Component | Key `--md-sys-color-*` roles consumed |
|---|---|
| `md-slider` | `primary`, `on-primary`, `primary-container`, `on-surface`, `on-surface-variant`, `surface-container-highest` |
| `md-tabs` / `md-primary-tab` / `md-secondary-tab` | `primary`, `on-surface`, `on-surface-variant`, `surface` |
| `md-navigation-bar` / `md-navigation-tab` | `secondary-container`, `on-secondary-container`, `on-surface`, `on-surface-variant`, `surface-container` |
| `md-navigation-drawer` | `surface-container-low`, `on-surface`, `on-surface-variant`, `secondary-container`, `on-secondary-container` |
| `md-switch` | `primary`, `on-primary`, `surface-container-highest`, `outline`, `on-surface`, `on-surface-variant`, `surface` |
| `md-icon-button` (+ variants) | `on-surface-variant`, `primary`, `on-primary`, `secondary-container`, `on-secondary-container`, `outline` |
| `md-fab` | `primary-container`, `on-primary-container`, `surface-container-high`, `shadow` |

The full role contract these draw from (defined in `styles/tokens.ts`):

```
--md-sys-color-primary / on-primary / primary-container / on-primary-container
--md-sys-color-secondary / on-secondary / secondary-container / on-secondary-container
--md-sys-color-tertiary / on-tertiary / tertiary-container / on-tertiary-container
--md-sys-color-error / on-error / error-container / on-error-container
--md-sys-color-background / on-background
--md-sys-color-surface / on-surface / surface-variant / on-surface-variant
--md-sys-color-surface-container-lowest / -low / (base) / -high / -highest
--md-sys-color-outline / outline-variant
--md-sys-color-inverse-surface / inverse-on-surface / inverse-primary
--md-sys-color-shadow / scrim
```

### Typescale

Tabs, navigation labels, and FAB/button labels render with the **`label-large`**
and **`title-*`** typescale roles
(`--md-sys-typescale-label-large-{size,line-height,weight}`,
`--md-sys-typescale-title-{large,medium,small}-{size,line-height,weight}`). The
full display/headline/title/body/label scale is defined in `styles/tokens.ts`.

### Shape

`@material/web` rounds its surfaces from the corner scale:

```
--md-sys-shape-corner-none           0px
--md-sys-shape-corner-extra-small    4px
--md-sys-shape-corner-small          8px
--md-sys-shape-corner-medium        12px
--md-sys-shape-corner-large         24px   ← the dashboards' card radius
--md-sys-shape-corner-large-increased 20px
--md-sys-shape-corner-extra-large   28px   (e.g. FAB)
--md-sys-shape-corner-full        9999px   (e.g. switch handle/track, slider handle)
```

`--wled-*` legacy names remain valid **aliases** onto these M3 roles (see
`styles/tokens.ts`), so existing consumers keep compiling during incremental
migration — no big-bang rename.

## Idempotent registration (safeCustomElement-style)

`@material/web` elements self-register via Lit's `@customElement(tag)` decorator,
which calls `customElements.define()` **unconditionally** at import time. WLED
Studio ships as a Lovelace resource and HA cache-busts the URL — the bundle can be
**re-evaluated while the previous registrations are still live**, and a second bare
`define()` of an existing tag throws `NotSupportedError`, taking the card down.

Our own elements avoid this with `safeCustomElement` (registry check first). We
can't edit `@material/web`'s decorators, so `register.ts` applies the same idea one
level up: `beginM3Registration()` temporarily wraps `customElements.define` so a
duplicate tag is a **no-op**, the M3 side-effect imports run, then
`endM3Registration()` restores the original throwing `define`. The wrapper is only
active during the M3 imports — the rest of the app keeps strict `define`
semantics. `index.ts` does this automatically around its imports.

## Power-down coexistence with `BasePoweredElement`

These M3 elements are **leaf controls** inside the shadow DOM of hosts that all
extend `BasePoweredElement`. They have no animation loops or websocket
subscriptions of their own, so the host's power-down contract already covers them:

- **Disconnect:** when the host is removed, its children tear down with it —
  `disconnectedCallback` chains normally. No manual cleanup needed.
- **Off-screen / hidden tab:** the host's `isPowered` flips `false` (it watches
  `IntersectionObserver` + `visibilitychange`). Gate any **high-frequency / streamed**
  write into an M3 control behind `whenPowered(host, fn)` so a backgrounded card
  does no needless work. One-shot, user-driven writes don't need it.

Do **not** subclass these `@material/web` elements to inject `BasePoweredElement`
— they are `@final`. Use them as-is and let the powered host own the lifecycle.

## Icons

`md-icon-button` / `md-fab` expect a slotted icon. WLED Studio already relies on
HA's Material icon stack; slot a `<span class="material-icons">…</span>` or an
`<svg>`. (No extra `@material/web/icon` import — keeps the bundle within budget.)
