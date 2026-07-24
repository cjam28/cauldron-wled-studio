/**
 * m3-color.ts — Material 3 dynamic color engine for WLED Studio.
 *
 * Wires `@material/material-color-utilities` (MCU ^0.3.0) into the WLED Studio
 * frontend so admin/standalone surfaces and the accent-from-LED path can
 * generate a full Material 3 `--md-sys-color-*` role set from a single seed
 * color.
 *
 * Design contract (spec §2, `docs/.../2026-06-26-wled-m3-foundation-design.md`):
 *
 *   applyDynamicScheme(host, seedHex, {dark})
 *     argbFromHex(seedHex) -> Hct -> DynamicScheme({variant: TONAL_SPOT,
 *     isDark: dark, contrastLevel: 0}) -> writes each --md-sys-color-* from
 *     MaterialDynamicColors.* onto `host`.
 *
 * MCU 0.3.0 realizes a TONAL_SPOT `DynamicScheme` through the `SchemeTonalSpot`
 * subclass (its `.variant === Variant.TONAL_SPOT`); the bare `DynamicScheme`
 * constructor in this version requires all five tonal palettes explicitly, so
 * we use the subclass which fills them per the TONAL_SPOT design spec.
 *
 * IMPORTANT: pure scheme generation (`buildDynamicScheme` / `generateScheme`)
 * is DOM-free and unit-testable. The host write (`applyDynamicScheme` /
 * `writeSchemeToHost`) is a thin, separate step.
 *
 * Consumers MUST only ever *consume* `--md-sys-color-*`. On the md3 dashboards
 * the Material You HACS module owns generation on `:root`; this engine is for
 * the admin panel / standalone (configurable seed, dark/light follows HA) and
 * the accent-from-LED feature (segment RGB -> deterministic scheme).
 */

import {
  argbFromHex,
  hexFromArgb,
  argbFromRgb,
  Hct,
  DynamicScheme,
  SchemeTonalSpot,
  MaterialDynamicColors,
  Contrast,
  lstarFromArgb,
} from "@material/material-color-utilities";

/**
 * `Variant.TONAL_SPOT` as a runtime constant.
 *
 * MCU 0.3.0 declares `Variant` as a TS enum but its package `index.js` does NOT
 * re-export the enum object at runtime (only types flow through), so importing
 * `Variant` from the package would be `undefined` once bundled. We pin the
 * TONAL_SPOT ordinal here (matches `enum Variant { ... TONAL_SPOT = 2 ... }`)
 * so consumers/tests can assert `scheme.variant === VARIANT_TONAL_SPOT`.
 */
export const VARIANT_TONAL_SPOT = 2;

/** Options for scheme generation / application. */
export interface DynamicSchemeOptions {
  /** Whether to generate the dark-mode variant. Defaults to light. */
  dark?: boolean;
}

/**
 * Mapping from an M3 system color role token name to the corresponding
 * `MaterialDynamicColors` static. This is the single source of truth for which
 * `--md-sys-color-*` custom properties the engine emits, and it matches the
 * frozen token contract exactly (do not invent token names).
 */
export const M3_COLOR_ROLE_TOKENS = {
  "--md-sys-color-primary": MaterialDynamicColors.primary,
  "--md-sys-color-on-primary": MaterialDynamicColors.onPrimary,
  "--md-sys-color-primary-container": MaterialDynamicColors.primaryContainer,
  "--md-sys-color-on-primary-container":
    MaterialDynamicColors.onPrimaryContainer,
  "--md-sys-color-secondary": MaterialDynamicColors.secondary,
  "--md-sys-color-on-secondary": MaterialDynamicColors.onSecondary,
  "--md-sys-color-secondary-container":
    MaterialDynamicColors.secondaryContainer,
  "--md-sys-color-on-secondary-container":
    MaterialDynamicColors.onSecondaryContainer,
  "--md-sys-color-tertiary": MaterialDynamicColors.tertiary,
  "--md-sys-color-on-tertiary": MaterialDynamicColors.onTertiary,
  "--md-sys-color-tertiary-container": MaterialDynamicColors.tertiaryContainer,
  "--md-sys-color-on-tertiary-container":
    MaterialDynamicColors.onTertiaryContainer,
  "--md-sys-color-error": MaterialDynamicColors.error,
  "--md-sys-color-on-error": MaterialDynamicColors.onError,
  "--md-sys-color-error-container": MaterialDynamicColors.errorContainer,
  "--md-sys-color-on-error-container": MaterialDynamicColors.onErrorContainer,
  "--md-sys-color-background": MaterialDynamicColors.background,
  "--md-sys-color-on-background": MaterialDynamicColors.onBackground,
  "--md-sys-color-surface": MaterialDynamicColors.surface,
  "--md-sys-color-on-surface": MaterialDynamicColors.onSurface,
  "--md-sys-color-surface-variant": MaterialDynamicColors.surfaceVariant,
  "--md-sys-color-on-surface-variant": MaterialDynamicColors.onSurfaceVariant,
  "--md-sys-color-surface-container-lowest":
    MaterialDynamicColors.surfaceContainerLowest,
  "--md-sys-color-surface-container-low":
    MaterialDynamicColors.surfaceContainerLow,
  "--md-sys-color-surface-container": MaterialDynamicColors.surfaceContainer,
  "--md-sys-color-surface-container-high":
    MaterialDynamicColors.surfaceContainerHigh,
  "--md-sys-color-surface-container-highest":
    MaterialDynamicColors.surfaceContainerHighest,
  "--md-sys-color-outline": MaterialDynamicColors.outline,
  "--md-sys-color-outline-variant": MaterialDynamicColors.outlineVariant,
  "--md-sys-color-inverse-surface": MaterialDynamicColors.inverseSurface,
  "--md-sys-color-inverse-on-surface": MaterialDynamicColors.inverseOnSurface,
  "--md-sys-color-inverse-primary": MaterialDynamicColors.inversePrimary,
  "--md-sys-color-shadow": MaterialDynamicColors.shadow,
  "--md-sys-color-scrim": MaterialDynamicColors.scrim,
  "--md-sys-color-surface-tint": MaterialDynamicColors.surfaceTint,
} as const;

/** A `--md-sys-color-*` token name emitted by this engine. */
export type M3ColorRoleToken = keyof typeof M3_COLOR_ROLE_TOKENS;

/** The full, ordered list of color role tokens this engine emits. */
export const M3_COLOR_ROLE_TOKEN_NAMES = Object.keys(
  M3_COLOR_ROLE_TOKENS,
) as M3ColorRoleToken[];

/** A resolved color scheme: every role token mapped to a `#rrggbb` hex. */
export type M3ColorScheme = Record<M3ColorRoleToken, string>;

/**
 * Anything we can write CSS custom properties onto: an `HTMLElement`'s style,
 * a `CSSStyleDeclaration` (e.g. `document.documentElement.style`), or a shadow
 * `:host`'s style. Kept minimal so generation stays DOM-free.
 */
export interface CssStyleTarget {
  setProperty(property: string, value: string, priority?: string): void;
}

/** A host we can apply a scheme onto — an element or a raw style target. */
export type SchemeHost = { style: CssStyleTarget } | CssStyleTarget;

function isElementLike(host: SchemeHost): host is { style: CssStyleTarget } {
  return (host as { style?: CssStyleTarget }).style !== undefined;
}

function styleOf(host: SchemeHost): CssStyleTarget {
  return isElementLike(host) ? host.style : host;
}

/**
 * PURE: build the M3 `DynamicScheme` for a seed. No DOM access.
 *
 * `argbFromHex(seedHex)` -> `Hct.fromInt` -> TONAL_SPOT `DynamicScheme`
 * (`contrastLevel: 0`). The returned scheme's `.variant` is
 * `Variant.TONAL_SPOT` and `.contrastLevel` is `0`.
 */
export function buildDynamicScheme(
  seedHex: string,
  options: DynamicSchemeOptions = {},
): DynamicScheme {
  const dark = options.dark ?? false;
  const sourceArgb = argbFromHex(seedHex);
  const sourceHct = Hct.fromInt(sourceArgb);
  // SchemeTonalSpot === DynamicScheme with variant TONAL_SPOT, contrastLevel 0.
  return new SchemeTonalSpot(sourceHct, dark, 0);
}

/**
 * PURE: build a TONAL_SPOT scheme directly from an arbitrary LED segment RGB
 * triplet (0–255 each). This is the accent-from-LED entry point: the same RGB
 * always yields the same deterministic scheme, with MCU-derived `on-*`
 * contrast (never hand-mixed).
 */
export function buildDynamicSchemeFromRgb(
  r: number,
  g: number,
  b: number,
  options: DynamicSchemeOptions = {},
): DynamicScheme {
  const dark = options.dark ?? false;
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const sourceArgb = argbFromRgb(clamp(r), clamp(g), clamp(b));
  const sourceHct = Hct.fromInt(sourceArgb);
  return new SchemeTonalSpot(sourceHct, dark, 0);
}

/**
 * PURE: resolve a `DynamicScheme` into the flat `{token -> #rrggbb}` map. No
 * DOM access — this is the unit-testable core of the engine.
 */
export function resolveScheme(scheme: DynamicScheme): M3ColorScheme {
  const out = {} as M3ColorScheme;
  for (const token of M3_COLOR_ROLE_TOKEN_NAMES) {
    const dynamicColor = M3_COLOR_ROLE_TOKENS[token];
    out[token] = hexFromArgb(dynamicColor.getArgb(scheme));
  }
  return out;
}

/**
 * PURE convenience: seed hex + options -> resolved `{token -> hex}` map.
 * Equivalent to `resolveScheme(buildDynamicScheme(seedHex, options))`.
 */
export function generateScheme(
  seedHex: string,
  options: DynamicSchemeOptions = {},
): M3ColorScheme {
  return resolveScheme(buildDynamicScheme(seedHex, options));
}

/**
 * PURE convenience: arbitrary LED RGB -> resolved `{token -> hex}` map.
 * Deterministic; used by the accent-from-LED path.
 */
export function generateSchemeFromRgb(
  r: number,
  g: number,
  b: number,
  options: DynamicSchemeOptions = {},
): M3ColorScheme {
  return resolveScheme(buildDynamicSchemeFromRgb(r, g, b, options));
}

/**
 * THIN DOM STEP: write a resolved scheme onto a host's CSS custom properties.
 * Separated from generation so the engine stays unit-testable.
 */
export function writeSchemeToHost(
  host: SchemeHost,
  scheme: M3ColorScheme,
): void {
  const style = styleOf(host);
  for (const token of M3_COLOR_ROLE_TOKEN_NAMES) {
    style.setProperty(token, scheme[token]);
  }
}

/**
 * Apply a dynamic Material 3 scheme to `host` from a seed hex.
 *
 * Contract entry point: `argbFromHex(seedHex)` -> `Hct` ->
 * `DynamicScheme({variant: TONAL_SPOT, isDark: dark, contrastLevel: 0})` ->
 * writes each `--md-sys-color-*` from `MaterialDynamicColors.*` onto `host`.
 *
 * @returns the resolved `{token -> hex}` scheme that was written.
 */
export function applyDynamicScheme(
  host: SchemeHost,
  seedHex: string,
  options: DynamicSchemeOptions = {},
): M3ColorScheme {
  const scheme = generateScheme(seedHex, options);
  writeSchemeToHost(host, scheme);
  return scheme;
}

/**
 * Apply a dynamic Material 3 scheme to `host` from an arbitrary LED RGB
 * triplet (accent-from-LED). Deterministic for a given RGB + options.
 *
 * @returns the resolved `{token -> hex}` scheme that was written.
 */
export function applyDynamicSchemeFromRgb(
  host: SchemeHost,
  r: number,
  g: number,
  b: number,
  options: DynamicSchemeOptions = {},
): M3ColorScheme {
  const scheme = generateSchemeFromRgb(r, g, b, options);
  writeSchemeToHost(host, scheme);
  return scheme;
}

/** A scoped accent pair derived from an LED color (no full-scheme override). */
export interface M3AccentPair {
  /** The accent color (`#rrggbb`) — M3 `primary` tone for the seed RGB. */
  accent: string;
  /** A legible on-accent color (`#rrggbb`) — M3 `on-primary` for the seed. */
  onAccent: string;
}

/**
 * PURE: derive ONLY an accent pair (accent + MCU-contrast on-accent) from an LED
 * RGB triplet. Use this for the accent-from-LED path so the card stays fully
 * themed by Material You (`--md-sys-color-*`) and the LED color only drives a
 * scoped `--wled-led-accent` token — it never overrides the M3 color roles.
 */
export function accentPairFromRgb(
  r: number,
  g: number,
  b: number,
  options: DynamicSchemeOptions = {},
): M3AccentPair {
  const scheme = buildDynamicSchemeFromRgb(r, g, b, options);
  return {
    accent: hexFromArgb(MaterialDynamicColors.primary.getArgb(scheme)),
    onAccent: hexFromArgb(MaterialDynamicColors.onPrimary.getArgb(scheme)),
  };
}

/**
 * PURE: WCAG-style contrast ratio (1–21) between two `#rrggbb` hex colors,
 * computed via MCU's tone-based `Contrast.ratioOfTones` (L* of each color).
 * Useful for asserting `on-*` legibility in tests and at runtime.
 */
export function contrastRatio(hexA: string, hexB: string): number {
  const toneA = lstarFromArgb(argbFromHex(hexA));
  const toneB = lstarFromArgb(argbFromHex(hexB));
  return Contrast.ratioOfTones(toneA, toneB);
}
