import { css, unsafeCSS, type CSSResult } from "lit";

/**
 * WLED Studio — glass as a Material 3 surface.
 *
 * Per the M3 foundation spec (2026-06-26 §4), "glass" is NOT a bespoke token
 * family — it is the M3 `--md-sys-color-surface-container` role rendered at a
 * reduced alpha with a `backdrop-filter` blur, so the rotating wallpaper /
 * Material You background shows through and the surface reads native against the
 * md3-wall / md3-port dashboards.
 *
 *   .glass        = surface-container @ reduced alpha + blur(24px) saturate(140%)
 *   @supports not (backdrop-filter)  -> opaque surface-container (no blur)
 *   :host([surface="card"])  -> translucent (wallpaper shows through)
 *   :host([surface="panel"]) -> stronger alpha (more opaque, less see-through)
 *
 * The alpha is applied to the M3 role color via `color-mix(... transparent)`,
 * so the tint always follows whatever scheme owns `--md-sys-color-surface-container`
 * (the Material You HACS module on the dashboards, or `core/m3-color.ts` in the
 * admin panel / standalone harness). We never hand-pick a glass color.
 *
 * Components opt in by adding the `glass` class to a surface element and (where
 * the host itself is the surface) reflecting a `surface` attribute. Every Lit
 * component that uses this still extends `BasePoweredElement` and registers via
 * the idempotent `safeCustomElement` — this file only contributes styles.
 */

/**
 * Glass alpha contract (fraction of the opaque surface-container kept).
 *
 * `card` is the default see-through surface; `panel` is heavier so dense control
 * panels stay legible over a busy wallpaper. The `@supports` opaque fallback
 * uses the full role color (alpha 1) because blur is unavailable.
 */
export const GLASS_ALPHA = {
  /** Base `.glass` surface (used when no `surface` attribute is set). */
  base: 0.72,
  /** `:host([surface="card"])` — translucent, wallpaper shows through. */
  card: 0.6,
  /** `:host([surface="panel"])` — stronger alpha, more opaque. */
  panel: 0.86,
} as const;

/** M3 glass blur + saturate filter (matches the dashboards' glass convention). */
export const GLASS_BACKDROP = "blur(24px) saturate(140%)";

/**
 * Build a `color-mix` that keeps `pct` (0..1) of surface-container and fills the
 * rest with transparent. Emitted as a literal so the alpha is fixed per surface
 * tier while the color still resolves from the live M3 scheme.
 */
function glassFill(pct: number): string {
  const percent = Math.round(pct * 100);
  // Fallback baseline (HA card bg -> M3 light surface-container literal) so glass
  // still renders in the admin panel before core/m3-color.ts writes a scheme and
  // in the standalone harness/tests. color-mix with an empty arg is invalid, so a
  // non-empty fallback here is required, not optional.
  return `color-mix(in srgb, var(--md-sys-color-surface-container, var(--ha-card-background, #f3edf7)) ${percent}%, transparent)`;
}

/**
 * Glass surface mixin. Drop into a component's static `styles` array. Apply the
 * `glass` class to the surface element, and/or reflect a `surface` attribute on
 * the host (`card` | `panel`) to drive the alpha tier.
 *
 * Notes:
 *  - Container queries / `prefers-*` / `@supports` only — no viewport media
 *    queries (per the foundation rules).
 *  - The `@supports not (backdrop-filter)` branch falls back to an OPAQUE
 *    surface-container so there is no muddy semi-transparent panel on engines
 *    without backdrop-filter support.
 */
export const glassStyles: CSSResult = css`
  .glass {
    background-color: ${unsafeCSS(glassFill(GLASS_ALPHA.base))};
    backdrop-filter: ${unsafeCSS(GLASS_BACKDROP)};
    -webkit-backdrop-filter: ${unsafeCSS(GLASS_BACKDROP)};
    border: 1px solid
      var(--md-sys-color-outline-variant, var(--divider-color, #cac4d0));
    /* 24px to match the md3-wall/md3-port card convention (bespoke radius,
       not the standard M3 corner-large=16px which @material/web rounds from). */
    border-radius: var(--wled-radius, 24px);
    box-shadow: var(--md-sys-elevation-level2, 0 6px 18px rgba(0, 0, 0, 0.1));
    color: var(--md-sys-color-on-surface, var(--primary-text-color, #1d1b20));
  }

  /* Card surface: most translucent — wallpaper reads through. */
  :host([surface="card"]) .glass,
  .glass[data-surface="card"] {
    background-color: ${unsafeCSS(glassFill(GLASS_ALPHA.card))};
  }

  /* Panel surface: stronger alpha — denser, more opaque chrome. */
  :host([surface="panel"]) .glass,
  .glass[data-surface="panel"] {
    background-color: ${unsafeCSS(glassFill(GLASS_ALPHA.panel))};
  }

  /*
   * No backdrop-filter support -> opaque surface-container, no blur. The card /
   * panel translucency is intentionally dropped: a partially-transparent panel
   * with nothing blurred behind it looks broken, so we go fully opaque.
   */
  @supports not ((backdrop-filter: blur(1px)) or
    (-webkit-backdrop-filter: blur(1px))) {
    .glass,
    :host([surface="card"]) .glass,
    :host([surface="panel"]) .glass,
    .glass[data-surface="card"],
    .glass[data-surface="panel"] {
      background-color: var(--md-sys-color-surface-container, var(--ha-card-background, #f3edf7));
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }

  /* Honor reduced transparency where the platform exposes it. */
  @media (prefers-reduced-transparency: reduce) {
    .glass,
    :host([surface="card"]) .glass,
    :host([surface="panel"]) .glass,
    .glass[data-surface="card"],
    .glass[data-surface="panel"] {
      background-color: var(--md-sys-color-surface-container, var(--ha-card-background, #f3edf7));
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
`;

/** Surface tier names accepted by the `surface` host attribute. */
export type GlassSurface = "card" | "panel";
