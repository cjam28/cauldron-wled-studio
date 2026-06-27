/**
 * WLED Studio — local Material 3 design harness (preview-entry).
 *
 * Goal: design + screenshot the card in the **same M3 token environment** the
 * md3-wall / md3-port dashboards give it, with **no Home Assistant** running.
 * Served by the existing rollup preview server: `npm run preview` then open
 * http://localhost:5174/ (rollup bundles this to preview/preview-bundle.js and
 * serves preview/index.html).
 *
 * What it does (per the M3 foundation spec, §"frontend/preview/"):
 *   (a) Injects a Material-Theme-Builder-style `--md-sys-color-*` set on :root
 *       (the dashboards' Material You HACS module owns generation in HA; here we
 *       stand in for it). The values are the authentic TONAL_SPOT scheme for the
 *       M3 reference seed #6750A4 (contrast 0) — light + dark — generated with
 *       @material/material-color-utilities, the same engine `core/m3-color.ts`
 *       uses via `applyDynamicScheme(host, seedHex, {dark})`. m3-color.ts is OUT
 *       OF SCOPE for this task, so the harness ships the precomputed set inline
 *       to stay self-contained and keep the foundation build green; swapping in
 *       `applyDynamicScheme(document.documentElement, SEED, { dark })` is a
 *       drop-in once that module lands.
 *   (b) Paints a synthetic wallpaper + the dashboards' scrim on <body>
 *       (see preview/wallpaper-note.md), so glass / translucent surfaces read
 *       like the live wall.
 *   (c) Renders <wled-studio-card> at 414 / 500 / 1680 widths in compact + full
 *       density, side by side.
 *
 * Respecting the foundation contract:
 *   - The card CONSUMES `--md-sys-color-*`; the harness does NOT touch the card's
 *     internal palette — it only sets the upstream :root vars (cascade head).
 *   - This element extends BasePoweredElement and registers via safeCustomElement
 *     (idempotent), like every other Lit component in the bundle.
 *   - Layout uses container queries only (no viewport media queries; the
 *     light/dark default honors prefers-color-scheme).
 *   - The card is registered through the normal lovelace entry so its
 *     safeCustomElement registration and customCards push run unchanged.
 */
import { css, html, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import { BasePoweredElement } from "../src/base/base-powered-element.js";
import { safeCustomElement } from "../src/utils/safe-custom-element.js";
import { CARD_TAG, WledStudioCard } from "../src/lovelace.js";

/** The M3 reference seed (same as tokens.ts baseline + m3-color.ts test seed). */
const SEED = "#6750A4";

/**
 * The full `--md-sys-color-*` role set for `SEED`, TONAL_SPOT, contrast 0.
 *
 * Generated with @material/material-color-utilities (SchemeTonalSpot →
 * MaterialDynamicColors), i.e. the exact values `applyDynamicScheme(host, SEED,
 * {dark})` would write. Kept inline (not imported from m3-color.ts) so the
 * harness is self-contained and the foundation build stays green before
 * m3-color.ts exists. If you change SEED, regenerate both maps.
 *
 * The token names below are the frozen role-name contract — do not invent names.
 */
const SCHEME_LIGHT: Record<string, string> = {
  "--md-sys-color-primary": "#65558f",
  "--md-sys-color-on-primary": "#ffffff",
  "--md-sys-color-primary-container": "#e9ddff",
  "--md-sys-color-on-primary-container": "#4d3d75",
  "--md-sys-color-secondary": "#625b71",
  "--md-sys-color-on-secondary": "#ffffff",
  "--md-sys-color-secondary-container": "#e8def8",
  "--md-sys-color-on-secondary-container": "#4a4458",
  "--md-sys-color-tertiary": "#7e5260",
  "--md-sys-color-on-tertiary": "#ffffff",
  "--md-sys-color-tertiary-container": "#ffd9e3",
  "--md-sys-color-on-tertiary-container": "#633b48",
  "--md-sys-color-error": "#ba1a1a",
  "--md-sys-color-on-error": "#ffffff",
  "--md-sys-color-error-container": "#ffdad6",
  "--md-sys-color-on-error-container": "#93000a",
  "--md-sys-color-background": "#fdf7ff",
  "--md-sys-color-on-background": "#1d1b20",
  "--md-sys-color-surface": "#fdf7ff",
  "--md-sys-color-on-surface": "#1d1b20",
  "--md-sys-color-surface-variant": "#e7e0eb",
  "--md-sys-color-on-surface-variant": "#49454e",
  "--md-sys-color-surface-container-lowest": "#ffffff",
  "--md-sys-color-surface-container-low": "#f8f2fa",
  "--md-sys-color-surface-container": "#f2ecf4",
  "--md-sys-color-surface-container-high": "#ece6ee",
  "--md-sys-color-surface-container-highest": "#e6e0e9",
  "--md-sys-color-outline": "#7a757f",
  "--md-sys-color-outline-variant": "#cac4cf",
  "--md-sys-color-inverse-surface": "#322f35",
  "--md-sys-color-inverse-on-surface": "#f5eff7",
  "--md-sys-color-inverse-primary": "#cfbdfe",
  "--md-sys-color-shadow": "#000000",
  "--md-sys-color-scrim": "#000000",
  "--md-sys-color-surface-tint": "#65558f",
};

const SCHEME_DARK: Record<string, string> = {
  "--md-sys-color-primary": "#cfbdfe",
  "--md-sys-color-on-primary": "#36275d",
  "--md-sys-color-primary-container": "#4d3d75",
  "--md-sys-color-on-primary-container": "#e9ddff",
  "--md-sys-color-secondary": "#cbc2db",
  "--md-sys-color-on-secondary": "#332d41",
  "--md-sys-color-secondary-container": "#4a4458",
  "--md-sys-color-on-secondary-container": "#e8def8",
  "--md-sys-color-tertiary": "#efb8c8",
  "--md-sys-color-on-tertiary": "#4a2532",
  "--md-sys-color-tertiary-container": "#633b48",
  "--md-sys-color-on-tertiary-container": "#ffd9e3",
  "--md-sys-color-error": "#ffb4ab",
  "--md-sys-color-on-error": "#690005",
  "--md-sys-color-error-container": "#93000a",
  "--md-sys-color-on-error-container": "#ffdad6",
  "--md-sys-color-background": "#141218",
  "--md-sys-color-on-background": "#e6e0e9",
  "--md-sys-color-surface": "#141218",
  "--md-sys-color-on-surface": "#e6e0e9",
  "--md-sys-color-surface-variant": "#49454e",
  "--md-sys-color-on-surface-variant": "#cac4cf",
  "--md-sys-color-surface-container-lowest": "#0f0d13",
  "--md-sys-color-surface-container-low": "#1d1b20",
  "--md-sys-color-surface-container": "#211f24",
  "--md-sys-color-surface-container-high": "#2b292f",
  "--md-sys-color-surface-container-highest": "#36343a",
  "--md-sys-color-outline": "#948f99",
  "--md-sys-color-outline-variant": "#49454e",
  "--md-sys-color-inverse-surface": "#e6e0e9",
  "--md-sys-color-inverse-on-surface": "#322f35",
  "--md-sys-color-inverse-primary": "#65558f",
  "--md-sys-color-shadow": "#000000",
  "--md-sys-color-scrim": "#000000",
  "--md-sys-color-surface-tint": "#cfbdfe",
};

/**
 * M3 shape (corner radius) scale — scheme-independent, M3 spec values. Mirrors
 * tokens.ts, which declares these as plain literals (so they already resolve);
 * we set them on :root here too so the harness stands in for the dashboards'
 * Material You environment. The standard `--md-sys-shape-corner-large` is the M3
 * spec 16px; the 24px dashboards' card radius lives on the bespoke `--wled-radius`
 * (set in COLORS/below), NOT by overloading the standard token.
 */
const SHAPE: Record<string, string> = {
  "--md-sys-shape-corner-none": "0px",
  "--md-sys-shape-corner-extra-small": "4px",
  "--md-sys-shape-corner-small": "8px",
  "--md-sys-shape-corner-medium": "12px",
  "--md-sys-shape-corner-large": "16px",
  "--md-sys-shape-corner-large-increased": "20px",
  "--md-sys-shape-corner-extra-large": "28px",
  "--md-sys-shape-corner-full": "9999px",
  // Bespoke dashboard card radius (matches md3-wall / md3-port cards).
  "--wled-radius": "24px",
};

/**
 * M3 typescale — size / line-height / weight per role, scheme-independent.
 * Mirrors tokens.ts. These are plain (non-self-referential) literals in
 * tokens.ts so they already resolve; we set them here too so the harness chrome
 * and any host-scoped consumer get the same values even without tokens.ts in
 * scope. role -> [size, line-height, weight].
 */
const TYPESCALE: Record<string, [string, string, string]> = {
  "display-large": ["57px", "64px", "400"],
  "display-medium": ["45px", "52px", "400"],
  "display-small": ["36px", "44px", "400"],
  "headline-large": ["32px", "40px", "400"],
  "headline-medium": ["28px", "36px", "400"],
  "headline-small": ["24px", "32px", "400"],
  "title-large": ["22px", "28px", "400"],
  "title-medium": ["16px", "24px", "500"],
  "title-small": ["14px", "20px", "500"],
  "body-large": ["16px", "24px", "400"],
  "body-medium": ["14px", "20px", "400"],
  "body-small": ["12px", "16px", "400"],
  "label-large": ["14px", "20px", "500"],
  "label-medium": ["12px", "16px", "500"],
  "label-small": ["11px", "16px", "500"],
};

/**
 * The dashboards' scrim, copied verbatim from the live wall so screenshots match
 * what lands on the Pi.
 *   - assemble.py:           linear-gradient(rgba(10,12,18,0.5), rgba(10,12,18,0.72))
 *   - www/.../bg-live.js:    same rgb (10,12,18), top≈0.5 bot≈0.72
 */
const SCRIM = "linear-gradient(rgba(10,12,18,0.5), rgba(10,12,18,0.72))";

/**
 * Synthetic, deterministic "wallpaper" — a mesh of radial gradients in the M3
 * seed's hue family. No binary asset (see wallpaper-note.md). Overridable at
 * runtime via the `--wled-preview-wallpaper` CSS var on <body>.
 */
const SYNTH_WALLPAPER = [
  "radial-gradient(120% 90% at 8% 12%, #4d3d75 0%, transparent 55%)",
  "radial-gradient(110% 80% at 92% 18%, #7e5260 0%, transparent 50%)",
  "radial-gradient(130% 100% at 78% 96%, #2b3a67 0%, transparent 55%)",
  "radial-gradient(120% 90% at 18% 88%, #355c4f 0%, transparent 55%)",
  "linear-gradient(135deg, #1a1730 0%, #221b33 50%, #14233a 100%)",
].join(", ");

/** Density columns. The card has no `density` attr yet; the harness reflects it
 * onto the card host (forward-compatible: future card code can react), and also
 * scopes a `--wled-density` hint the surrounding shell uses for spacing. */
type Density = "compact" | "full";
const WIDTHS = [414, 500, 1680] as const;
const DENSITIES: Density[] = ["compact", "full"];

/**
 * A minimal fake `hass` so the card mounts and renders its chrome (header, tabs,
 * brightness, "Open Studio") in the harness. There is no live HA connection, so
 * the card shows its normal graceful "connecting / not responding" hint — that
 * is expected and honest for a no-HA design harness. We do NOT fake a websocket;
 * the harness is for layout + theming review, not live data.
 */
function fakeHass(): HomeAssistant {
  return {
    states: {},
    config: {},
    themes: {},
    language: "en",
    localize: (k: string) => k,
    formatEntityState: () => "",
    callService: async () => undefined,
    callWS: async () => undefined,
    // No `connection` -> card stays in its "connecting" state, by design.
  } as unknown as HomeAssistant;
}

class WledStudioPreview extends BasePoweredElement {
  @state() private _dark = false;

  /** Cache of card instances by `${width}-${density}` so a scheme toggle only
   * rewrites tokens on the existing cards (no rebuild / no re-bootstrap). */
  private readonly _cards = new Map<string, WledStudioCard>();

  override connectedCallback(): void {
    super.connectedCallback();
    // Default scheme follows prefers-color-scheme (mirrors the standalone/admin
    // path: m3-color.ts + prefers-color-scheme). On the wall the scheme follows
    // Material You; here we have no module, so prefers-* is the right default.
    this._dark =
      typeof matchMedia === "function" &&
      matchMedia("(prefers-color-scheme: dark)").matches;
    this._applyScheme();
    this._applyWallpaper();
  }

  protected override updated(): void {
    this._applyScheme();
  }

  /**
   * Write the active M3 `--md-sys-color-*` set onto a host element's inline
   * style — exactly what `core/m3-color.ts`'s `applyDynamicScheme(host, …)`
   * does. This mirrors the spec contract: "writes each --md-sys-color-* … onto
   * host".
   *
   * Why per-host and also :root: on the real wall the Material You module sets
   * the `--md-sys-color-*` set on :root and the card inherits it (tokens.ts does
   * NOT declare these roles on :host, so nothing shadows the inherited values).
   * Writing inline on the host is exactly what core/m3-color.ts does for the
   * admin panel / accent-from-LED path, so the harness exercises both delivery
   * mechanisms. We also set :root so plain DOM (the harness chrome) inherits it.
   */
  private _writeScheme(host: HTMLElement, dark: boolean): void {
    const scheme = dark ? SCHEME_DARK : SCHEME_LIGHT;
    for (const [name, value] of Object.entries(scheme)) {
      host.style.setProperty(name, value);
    }
    // Shape + typescale are scheme-independent; tokens.ts declares them as plain
    // literals so they already resolve. We mirror them on the host so the harness
    // stands in for the dashboards' :root environment (incl. --wled-radius=24px).
    for (const [name, value] of Object.entries(SHAPE)) {
      host.style.setProperty(name, value);
    }
    for (const [role, [size, lh, weight]] of Object.entries(TYPESCALE)) {
      host.style.setProperty(`--md-sys-typescale-${role}-size`, size);
      host.style.setProperty(`--md-sys-typescale-${role}-line-height`, lh);
      host.style.setProperty(`--md-sys-typescale-${role}-weight`, weight);
    }
  }

  /** Inject the M3 set on :root (stand-in for the Material You HACS module) and
   * keep the harness's own host in sync. Cards get the same set on their host
   * in `_renderCard` (see `_writeScheme`). */
  private _applyScheme(): void {
    this._writeScheme(document.documentElement, this._dark);
    this._writeScheme(this, this._dark);
    document.documentElement.style.colorScheme = this._dark ? "dark" : "light";
    // Re-sync any already-built cards on a scheme toggle.
    this._cards.forEach((c) => this._writeScheme(c, this._dark));
  }

  /** Paint synthetic wallpaper + the dashboards' scrim on <body>. */
  private _applyWallpaper(): void {
    const body = document.body;
    const wallpaper =
      body.style.getPropertyValue("--wled-preview-wallpaper").trim() ||
      SYNTH_WALLPAPER;
    body.style.backgroundImage = `${SCRIM}, ${wallpaper}`;
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "cover";
  }

  private _toggleDark(): void {
    this._dark = !this._dark;
  }

  private _card(width: number, density: Density): TemplateResult {
    return html`
      <div class="frame" style="width:${width}px">
        <div class="frame-label">
          <span class="frame-w">${width}px</span>
          <span class="frame-d">${density}</span>
        </div>
        <div class="card-host">${this._cardEl(width, density)}</div>
      </div>
    `;
  }

  /** Imperatively build (and cache) the card so we can set `.hass` (a property,
   * not an attr) and reflect the forward-compat `density` attribute. */
  private _cardEl(width: number, density: Density): WledStudioCard {
    const key = `${width}-${density}`;
    let el = this._cards.get(key);
    if (!el) {
      el = document.createElement(CARD_TAG) as WledStudioCard;
      el.setConfig({
        ...WledStudioCard.getStubConfig(),
        controller: `Demo (${density})`,
        height: density === "compact" ? 160 : 220,
      });
      el.hass = fakeHass();
      // Forward-compat: the card does not yet read `density`, but reflecting it
      // here means the same harness screenshots both densities once it does.
      el.setAttribute("density", density);
      this._cards.set(key, el);
    }
    // Drive the card's appearance from the harness scheme. This is the
    // m3-color.ts `applyDynamicScheme(host, …)` host-write contract: writing the
    // M3 `--md-sys-color-*` set inline on the card host (tokens.ts declares no
    // roles on :host, so the card consumes whatever is set here / inherited).
    this._writeScheme(el, this._dark);
    return el;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="harness">
        <header class="bar">
          <h1>WLED Studio · M3 design harness</h1>
          <div class="meta">
            <span class="seed" title="M3 seed (TONAL_SPOT, contrast 0)">
              seed ${SEED}
            </span>
            <button class="toggle" @click=${this._toggleDark}>
              ${this._dark ? "Dark" : "Light"} scheme
            </button>
          </div>
        </header>
        <p class="note">
          Card renders at 414 / 500 / 1680 widths × compact / full density. No
          HA — cards show their graceful "connecting" state; this view is for M3
          theming + layout review and chrome-devtools screenshots.
        </p>
        ${DENSITIES.map(
          (density) => html`
            <section class="density-row">
              <h2 class="density-title">${density} density</h2>
              <div class="cards">
                ${WIDTHS.map((w) => this._card(w, density))}
              </div>
            </section>
          `
        )}
      </div>
    `;
  }

  static override styles = [
    ...BasePoweredElement.styles,
    css`
      :host {
        display: block;
        /* Container-query context: layout adapts to the harness width, never to
         * the viewport (foundation rule: container queries only). */
        container-type: inline-size;
        container-name: harness;
        color: var(--md-sys-color-on-surface, #fff);
        min-height: 100vh;
      }
      .harness {
        padding: 24px;
        box-sizing: border-box;
      }
      .bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 8px;
      }
      h1 {
        margin: 0;
        font-size: var(--md-sys-typescale-title-large-size, 22px);
        line-height: var(--md-sys-typescale-title-large-line-height, 28px);
        font-weight: 500;
        color: #fff;
        text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
      }
      .meta {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .seed {
        font:
          500 13px/1.4 "Roboto Mono", ui-monospace, monospace;
        color: rgba(255, 255, 255, 0.85);
        background: rgba(255, 255, 255, 0.12);
        padding: 4px 10px;
        border-radius: var(--md-sys-shape-corner-full, 9999px);
      }
      .toggle {
        cursor: pointer;
        border: 1px solid var(--md-sys-color-outline, rgba(255, 255, 255, 0.4));
        background: color-mix(
          in srgb,
          var(--md-sys-color-surface-container, #222) 80%,
          transparent
        );
        color: var(--md-sys-color-on-surface, #fff);
        padding: 8px 16px;
        border-radius: var(--md-sys-shape-corner-full, 9999px);
        font: inherit;
        font-size: var(--md-sys-typescale-label-large-size, 14px);
        font-weight: var(--md-sys-typescale-label-large-weight, 500);
        backdrop-filter: blur(12px);
      }
      .note {
        margin: 0 0 24px;
        max-width: 70ch;
        color: rgba(255, 255, 255, 0.85);
        font-size: var(--md-sys-typescale-body-medium-size, 14px);
        line-height: var(--md-sys-typescale-body-medium-line-height, 20px);
        text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
      }
      .density-row {
        margin-bottom: 32px;
      }
      .density-title {
        margin: 0 0 12px;
        font-size: var(--md-sys-typescale-title-medium-size, 16px);
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        text-transform: capitalize;
        text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
      }
      .cards {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 24px;
      }
      .frame {
        /* Honest fixed render widths (414 / 500 / 1680) so each column is a
         * real screenshot target. The row wraps; the 1680 column overflows
         * narrow harness widths and the page scrolls — screenshot per width
         * with chrome-devtools. */
        flex: 0 0 auto;
      }
      .frame-label {
        display: flex;
        align-items: baseline;
        gap: 8px;
        margin-bottom: 6px;
        color: rgba(255, 255, 255, 0.8);
        text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
      }
      .frame-w {
        font:
          600 13px/1 "Roboto Mono", ui-monospace, monospace;
      }
      .frame-d {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        opacity: 0.7;
      }
      .card-host {
        /* Each card lives in its own container so the card's own container
         * queries resolve against the frame width, not the viewport. */
        container-type: inline-size;
      }
    `,
  ];
}

safeCustomElement("wled-studio-preview")(WledStudioPreview);

declare global {
  interface HTMLElementTagNameMap {
    "wled-studio-preview": WledStudioPreview;
  }
}

console.info("[wled-studio] M3 design harness loaded", { seed: SEED });

export { WledStudioPreview };
