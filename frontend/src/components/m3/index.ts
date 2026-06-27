/**
 * WLED Studio — Material 3 chrome (`@material/web`) hybrid integration.
 * =====================================================================
 *
 * This module is the SINGLE entry point that makes the high-value standard
 * Material 3 components usable inside WLED Studio cards/panels. Per the M3
 * foundation spec (`docs/superpowers/specs/2026-06-26-wled-m3-foundation-design.md`,
 * §"Components of the foundation" / "Hybrid components"), only this small,
 * fixed set of `@material/web` elements is adopted — everything else bespoke
 * stays token-themed custom Lit:
 *
 *   - <md-slider>            master / brightness
 *   - <md-tabs> + tabs       view nav (compact tab-bar)
 *       <md-primary-tab>
 *       <md-secondary-tab>
 *   - <md-navigation-bar> +  adaptive view nav (compact bar)
 *       <md-navigation-tab>
 *   - <md-navigation-drawer> adaptive view nav (wide rail/drawer)
 *   - <md-switch>            settings toggles
 *   - <md-icon-button>       buttons / affordances
 *       <md-filled-icon-button>
 *       <md-filled-tonal-icon-button>
 *       <md-outlined-icon-button>
 *   - <md-fab>               expand / primary action
 *
 * IMPORTANT — bundle budget
 * -------------------------
 * Import ONLY the modules above. `@material/web` ships an `all.js` barrel that
 * pulls in every component (~hundreds of KB). We never import it. Each adopted
 * family is imported by its own deep path so the tree-shaker / rollup keeps the
 * footprint to ~5 components. Do not add new `@material/web` imports here
 * without an owner decision — that is the bundle-weight risk called out in the
 * spec ("import only ~5 components").
 *
 * IMPORTANT — idempotent registration (safeCustomElement-style)
 * ------------------------------------------------------------
 * `@material/web` elements self-register at import time via Lit's
 * `@customElement(tag)` decorator, which calls `customElements.define(tag, …)`
 * unconditionally. WLED Studio ships as a Lovelace resource; HA cache-busts the
 * resource URL and can RE-EVALUATE the bundle while the previous custom-element
 * registrations are still live. A second bare `define()` of an existing tag
 * throws `NotSupportedError` and takes the whole card down.
 *
 * Our own elements avoid this with `safeCustomElement` (see
 * `utils/safe-custom-element.ts`), which checks the registry first. We cannot
 * edit `@material/web`'s decorators, so we apply the same idea one level up:
 * while the `@material/web` side-effect imports run, `customElements.define` is
 * temporarily wrapped so a duplicate tag is a no-op instead of a throw. The
 * wrapper is installed BEFORE those imports evaluate (it lives in
 * `./register.js`, which is imported first; ES modules evaluate in import order)
 * and removed once they finish — so global `define` behavior is only relaxed for
 * the M3 chrome, never for the rest of the app.
 *
 * IMPORTANT — coexistence with BasePoweredElement (off-screen power-down)
 * ----------------------------------------------------------------------
 * These M3 elements are LEAF custom elements rendered inside the shadow DOM of
 * WLED Studio hosts, every one of which extends `BasePoweredElement`. They have
 * no animation loops or websocket subscriptions of their own, so the host's
 * power-down contract already covers them:
 *
 *   - When the host is removed / disconnected, its children (including these M3
 *     elements) are torn down with it — `disconnectedCallback` chains normally.
 *   - When the host goes off-screen or the tab is hidden, `host.isPowered`
 *     flips false; the host SHOULD stop pushing rapid `value`/`open` updates
 *     into these elements. `whenPowered()` (below) is the helper for that: gate
 *     any high-frequency write to an M3 control behind it so a backgrounded card
 *     does no needless work. (M3 elements are otherwise inert when idle.)
 *
 * Do NOT subclass these `@material/web` elements to inject BasePoweredElement —
 * they are `@final`. Use them as-is and let the powered HOST own the lifecycle.
 *
 * M3 design tokens consumed
 * -------------------------
 * Every adopted element themes itself entirely from `--md-sys-color-*`,
 * `--md-sys-typescale-*`, and `--md-sys-shape-corner-*`, which WLED Studio's
 * token layer (`styles/tokens.ts`) defines with the spec's fallback cascade
 * (Material You module → HA theme var → M3 baseline literal). On the md3-wall /
 * md3-port dashboards the Material You Utilities HACS module injects the dynamic
 * scheme on `:root`; in the admin panel / standalone harness `core/m3-color.ts`
 * (`applyDynamicScheme`) writes it on the host. Either way these elements
 * CONSUME the palette — they never generate it. See README.md in this directory
 * for the per-component token table and usage examples.
 *
 * This module is side-effect only (it registers tags). Importing it once,
 * anywhere a WLED Studio host is defined, makes all the M3 tags usable in that
 * host's templates.
 */

// 1. Install the idempotent-define guard FIRST. `register.js` has no further
//    imports, so it evaluates before the `@material/web` side-effect imports
//    below — guaranteeing the wrapper is in place when they self-register.
import { beginM3Registration, endM3Registration } from "./register.js";

beginM3Registration();

// 2. Side-effect imports — ONLY the adopted M3 chrome (bundle budget). Each of
//    these runs `customElements.define(<tag>, …)` at evaluation time; the guard
//    makes a re-eval (duplicate tag) a no-op instead of a throw.
import "@material/web/slider/slider.js";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import "@material/web/tabs/secondary-tab.js";
import "@material/web/labs/navigationbar/navigation-bar.js";
import "@material/web/labs/navigationtab/navigation-tab.js";
import "@material/web/labs/navigationdrawer/navigation-drawer.js";
import "@material/web/switch/switch.js";
import "@material/web/iconbutton/icon-button.js";
import "@material/web/iconbutton/filled-icon-button.js";
import "@material/web/iconbutton/filled-tonal-icon-button.js";
import "@material/web/iconbutton/outlined-icon-button.js";
import "@material/web/fab/fab.js";

// 3. Restore the global `customElements.define` to its normal (throwing)
//    behavior so the rest of the app is unaffected.
endM3Registration();

export {
  M3_TAGS,
  whenPowered,
  isM3Registered,
  beginM3Registration,
  endM3Registration,
} from "./register.js";
