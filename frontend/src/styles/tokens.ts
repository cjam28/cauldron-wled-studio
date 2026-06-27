import { css } from "lit";

/**
 * WLED Studio — Material 3 token foundation.
 *
 * This is the canonical M3 layer for the card + admin panel. It defines the full
 * `--md-sys-color-*` role set, `--md-sys-typescale-*`, `--md-sys-shape-corner-*`,
 * and elevation tokens, then keeps every legacy `--wled-*` name working as a thin
 * alias mapped onto the M3 roles (no big-bang migration of the ~19 consumers).
 *
 * Per the M3 foundation spec (2026-06-26), custom cards CONSUME `--md-sys-color-*`
 * — they do NOT generate the palette. On the md3-wall / md3-port dashboards the
 * Material You Utilities HACS module injects the dynamic `--md-sys-color-*` set on
 * `:root` (HCT from the rotating wallpaper). The admin panel / standalone harness
 * uses `core/m3-color.ts` (`applyDynamicScheme(host, seedHex, {dark})`) instead.
 *
 * Color-role resolution (IMPORTANT — why `--md-sys-color-*` is NOT declared here):
 * CSS custom properties inherit, and a `var(--x, fb)` that references the property
 * it is defining is a self-cycle that resolves to the guaranteed-invalid value (the
 * fallback is NOT used). A `:host` declaration would also SHADOW the inherited
 * `:root` value the Material You module sets. So we deliberately do NOT redeclare
 * `--md-sys-color-*` on `:host`. Instead the roles arrive by inheritance:
 *   - md3-wall / md3-port dashboards: Material You Utilities sets them on `:root`.
 *   - admin panel / standalone harness: `core/m3-color.ts`
 *     `applyDynamicScheme(host, seedHex, {dark})` writes them INLINE on the host
 *     (an inline write wins the cascade, so no cycle, no shadowing).
 * The resilient fallback cascade lives on the differently-named `--wled-*` aliases
 * below (no cycle, since the alias name differs from the role it references):
 *   var(--md-sys-color-X, var(--ha-fallback, <M3 baseline literal>))
 * Baseline literals are the Material Theme Builder light scheme for the M3
 * reference seed `#6750A4` (TONAL_SPOT, contrast 0).
 *
 * Shape / typescale / elevation HAVE no upstream provider (Material You only emits
 * colors), so they are declared here as plain literals (no self-reference).
 */
export const wledDesignTokens = css`
  :host {
    /* ---------------------------------------------------------------------
     * M3 shape — corner radius scale (plain literals; M3 spec values).
     * Stock M3 "large" is 16px. The dashboards use 24px cards — that is a
     * bespoke radius, exposed as --wled-radius below, NOT by overloading the
     * standard --md-sys-shape-corner-large token.
     * ------------------------------------------------------------------- */
    --md-sys-shape-corner-none: 0px;
    --md-sys-shape-corner-extra-small: 4px;
    --md-sys-shape-corner-small: 8px;
    --md-sys-shape-corner-medium: 12px;
    --md-sys-shape-corner-large: 16px;
    --md-sys-shape-corner-large-increased: 20px;
    --md-sys-shape-corner-extra-large: 28px;
    --md-sys-shape-corner-full: 9999px;

    /* ---------------------------------------------------------------------
     * M3 typescale — size / line-height / weight per role.
     * Weights are exposed as their own *-weight tokens so callers can build
     * shorthand (font: weight size/line-height) or use pieces individually.
     * ------------------------------------------------------------------- */

    /* Display */
    --md-sys-typescale-display-large-size: 57px;
    --md-sys-typescale-display-large-line-height: 64px;
    --md-sys-typescale-display-large-weight: 400;
    --md-sys-typescale-display-medium-size: 45px;
    --md-sys-typescale-display-medium-line-height: 52px;
    --md-sys-typescale-display-medium-weight: 400;
    --md-sys-typescale-display-small-size: 36px;
    --md-sys-typescale-display-small-line-height: 44px;
    --md-sys-typescale-display-small-weight: 400;

    /* Headline */
    --md-sys-typescale-headline-large-size: 32px;
    --md-sys-typescale-headline-large-line-height: 40px;
    --md-sys-typescale-headline-large-weight: 400;
    --md-sys-typescale-headline-medium-size: 28px;
    --md-sys-typescale-headline-medium-line-height: 36px;
    --md-sys-typescale-headline-medium-weight: 400;
    --md-sys-typescale-headline-small-size: 24px;
    --md-sys-typescale-headline-small-line-height: 32px;
    --md-sys-typescale-headline-small-weight: 400;

    /* Title */
    --md-sys-typescale-title-large-size: 22px;
    --md-sys-typescale-title-large-line-height: 28px;
    --md-sys-typescale-title-large-weight: 400;
    --md-sys-typescale-title-medium-size: 16px;
    --md-sys-typescale-title-medium-line-height: 24px;
    --md-sys-typescale-title-medium-weight: 500;
    --md-sys-typescale-title-small-size: 14px;
    --md-sys-typescale-title-small-line-height: 20px;
    --md-sys-typescale-title-small-weight: 500;

    /* Body */
    --md-sys-typescale-body-large-size: 16px;
    --md-sys-typescale-body-large-line-height: 24px;
    --md-sys-typescale-body-large-weight: 400;
    --md-sys-typescale-body-medium-size: 14px;
    --md-sys-typescale-body-medium-line-height: 20px;
    --md-sys-typescale-body-medium-weight: 400;
    --md-sys-typescale-body-small-size: 12px;
    --md-sys-typescale-body-small-line-height: 16px;
    --md-sys-typescale-body-small-weight: 400;

    /* Label */
    --md-sys-typescale-label-large-size: 14px;
    --md-sys-typescale-label-large-line-height: 20px;
    --md-sys-typescale-label-large-weight: 500;
    --md-sys-typescale-label-medium-size: 12px;
    --md-sys-typescale-label-medium-line-height: 16px;
    --md-sys-typescale-label-medium-weight: 500;
    --md-sys-typescale-label-small-size: 11px;
    --md-sys-typescale-label-small-line-height: 16px;
    --md-sys-typescale-label-small-weight: 500;

    /* ---------------------------------------------------------------------
     * M3 elevation — tonal/shadow levels.
     * Dashboards use 0 6px 18px rgba(0,0,0,.10) for cards (level-2-ish).
     * The --wled-shadow alias below maps to level 2.
     * ------------------------------------------------------------------- */
    --md-sys-elevation-level0: none;
    --md-sys-elevation-level1: 0 1px 2px rgba(0, 0, 0, 0.3),
      0 1px 3px 1px rgba(0, 0, 0, 0.15);
    --md-sys-elevation-level2: var(
      --ha-card-box-shadow,
      0 6px 18px rgba(0, 0, 0, 0.1)
    );
    --md-sys-elevation-level3: 0 4px 8px 3px rgba(0, 0, 0, 0.15),
      0 1px 3px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-level4: 0 6px 10px 4px rgba(0, 0, 0, 0.15),
      0 2px 3px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-level5: 0 8px 12px 6px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.3);

    /* =====================================================================
     * Legacy --wled-* aliases — the resilient consumer-facing layer.
     * Each alias carries the FULL non-cyclic fallback cascade
     *   var(--md-sys-color-X, var(--ha-fallback, <M3 baseline literal>))
     * so every existing var(--wled-X) consumer resolves in all 3 scenarios:
     * Material You on :root, HA theme var, or bare baseline (panel/tests).
     * The alias name differs from the role it references, so there is no
     * self-cycle. Migrate references per-file as phases touch them.
     * =================================================================== */
    --wled-accent: var(--md-sys-color-primary, var(--primary-color, #6750a4));
    --wled-accent-soft: color-mix(in srgb, var(--wled-accent) 18%, transparent);
    --wled-surface: var(
      --md-sys-color-surface,
      var(--card-background-color, #fef7ff)
    );
    --wled-surface-elevated: var(
      --md-sys-color-surface-container-high,
      var(--secondary-background-color, #ece6f0)
    );
    --wled-text: var(
      --md-sys-color-on-surface,
      var(--primary-text-color, #1d1b20)
    );
    --wled-text-muted: var(
      --md-sys-color-on-surface-variant,
      var(--secondary-text-color, #49454f)
    );
    --wled-border: var(
      --md-sys-color-outline-variant,
      var(--divider-color, #cac4d0)
    );
    /* Dashboards use 24px cards — a bespoke radius, not a standard M3 step. */
    --wled-radius: 24px;
    --wled-radius-sm: var(--md-sys-shape-corner-small);
    --wled-radius-lg: var(--md-sys-shape-corner-extra-large);
    --wled-shadow: var(--md-sys-elevation-level2);
    --wled-tap: 44px;
  }
`;
