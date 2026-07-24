/**
 * Idempotent-registration guard for `@material/web` chrome + small lifecycle
 * helpers for coexistence with `BasePoweredElement`.
 *
 * Why this exists: `@material/web` elements self-register via Lit's
 * `@customElement(tag)` decorator, which calls `customElements.define()`
 * unconditionally at import time. Under a Lovelace resource re-evaluation (HA
 * cache-bust) a second bare `define()` of an already-registered tag throws
 * `NotSupportedError`. `utils/safe-custom-element.ts` solves this for OUR
 * elements (it checks the registry first), but we cannot edit `@material/web`'s
 * decorators. So during the M3 side-effect imports we temporarily wrap
 * `customElements.define` to be idempotent — the same guarantee `safeCustomElement`
 * gives, applied to third-party self-registration.
 *
 * This module deliberately has NO other imports so it evaluates before the
 * `@material/web` imports in `./index.ts` (ES modules evaluate depth-first in
 * import order). `beginM3Registration()` MUST be called before those imports and
 * `endM3Registration()` immediately after.
 */

/** Custom-element tags this module makes available (the adopted M3 chrome). */
export const M3_TAGS = [
  "md-slider",
  "md-tabs",
  "md-primary-tab",
  "md-secondary-tab",
  "md-navigation-bar",
  "md-navigation-tab",
  "md-navigation-drawer",
  "md-switch",
  "md-icon-button",
  "md-filled-icon-button",
  "md-filled-tonal-icon-button",
  "md-outlined-icon-button",
  "md-fab",
] as const;

export type M3Tag = (typeof M3_TAGS)[number];

/** Original (throwing) `customElements.define`, captured for restore. */
type DefineFn = typeof customElements.define;
let originalDefine: DefineFn | null = null;
let depth = 0;

/**
 * Begin a guarded-registration window: wrap `customElements.define` so that
 * re-defining an already-registered tag is a no-op instead of a throw. Reentrant
 * (depth-counted) and safe to call when `customElements` is unavailable (SSR).
 */
export function beginM3Registration(): void {
  if (typeof customElements === "undefined") return;
  depth += 1;
  if (originalDefine) return; // window already open

  originalDefine = customElements.define.bind(customElements);
  const guarded: DefineFn = (
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions
  ): void => {
    if (customElements.get(name)) {
      // Already registered (first bundle eval, or another bundle) — skip the
      // duplicate define exactly like safeCustomElement does for our elements.
      return;
    }
    originalDefine!(name, constructor, options);
  };
  // Assign through `any` because `define`'s lib type is a non-optional method.
  (customElements as unknown as { define: DefineFn }).define = guarded;
}

/**
 * Close the guarded-registration window and restore the original
 * `customElements.define`. Balanced with `beginM3Registration()`.
 */
export function endM3Registration(): void {
  if (typeof customElements === "undefined") return;
  if (depth > 0) depth -= 1;
  if (depth > 0) return;
  if (!originalDefine) return;
  (customElements as unknown as { define: DefineFn }).define = originalDefine;
  originalDefine = null;
}

/** True once every adopted M3 tag is present in the registry. */
export function isM3Registered(): boolean {
  if (typeof customElements === "undefined") return false;
  return M3_TAGS.every((tag) => customElements.get(tag) != null);
}

/**
 * Minimal shape of the powered host these chrome elements live inside. Matches
 * `BasePoweredElement.isPowered` (visible tab AND in viewport) without importing
 * the base class (keeps this module dependency-free / cheaply tree-shaken).
 */
export interface PoweredHost {
  readonly isPowered: boolean;
}

/**
 * Power-aware gate for high-frequency writes to M3 chrome.
 *
 * The M3 elements are inert leaf controls; the powered HOST owns the lifecycle.
 * When the host is off-screen or its tab is hidden (`host.isPowered === false`)
 * a backgrounded card should not keep pushing rapid `value` / `open` / `selected`
 * updates into them. Wrap such writes:
 *
 *   whenPowered(this, () => { slider.value = bri; });
 *
 * One-shot, user-driven writes don't need this — only ongoing/streamed updates
 * (e.g. live brightness following a DDP frame). Returns true if the work ran.
 */
export function whenPowered(host: PoweredHost, fn: () => void): boolean {
  if (!host.isPowered) return false;
  fn();
  return true;
}
