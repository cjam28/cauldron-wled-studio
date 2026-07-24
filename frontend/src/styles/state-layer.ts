import { css, unsafeCSS, type CSSResult } from "lit";

/**
 * Material 3 state layer + ripple mixin for bespoke (non-`@material/web`) Lit
 * controls — tiles, color wheel, painter, preview strip, audio meter, etc.
 *
 * Per M3 (and the WLED M3 foundation spec, 2026-06-26) an interactive element
 * shows a translucent overlay of its content/role color on top of its
 * container, at fixed state opacities:
 *
 *   hover    0.08
 *   focus    0.12
 *   pressed  0.12   (+ a quick ripple)
 *
 * The overlay color defaults to `currentColor` so it follows the element's text
 * (`--md-sys-color-on-*`) color, but any `--md-sys-color-*` role var can be fed
 * in via `stateLayer(role)`.
 */

/** M3 state-layer opacities (the canonical contract). */
export const STATE_LAYER_OPACITY = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
} as const;

/**
 * Build a state-layer mixin bound to a specific overlay color.
 *
 * The host (or any element these styles are applied to) must declare a class
 * `.state-layer-target` and be `position: relative; overflow: hidden;`. The
 * overlay is a `::before` pseudo-element; the ripple is `::after`.
 *
 * @param color CSS color expression for the overlay (default `currentColor`).
 *   Pass a role var for a fixed tint, e.g. `stateLayer("var(--md-sys-color-primary)")`.
 */
export function stateLayer(color = "currentColor"): CSSResult {
  const c = unsafeCSS(color);
  return css`
    .state-layer-target {
      position: relative;
      overflow: hidden;
      isolation: isolate;
    }

    .state-layer-target::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      border-radius: inherit;
      background-color: ${c};
      opacity: 0;
      transition: opacity 15ms linear;
    }

    /* Content above the overlay. */
    .state-layer-target > * {
      position: relative;
      z-index: 1;
    }

    @media (hover: hover) {
      .state-layer-target:hover::before {
        opacity: ${unsafeCSS(STATE_LAYER_OPACITY.hover)};
      }
    }

    .state-layer-target:focus-visible::before {
      opacity: ${unsafeCSS(STATE_LAYER_OPACITY.focus)};
    }

    .state-layer-target:active::before {
      opacity: ${unsafeCSS(STATE_LAYER_OPACITY.pressed)};
    }

    .state-layer-target[disabled]::before,
    .state-layer-target:disabled::before {
      opacity: 0;
    }

    /* ---- Ripple (pressed feedback) ------------------------------------- */
    .state-layer-target::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      border-radius: inherit;
      background: radial-gradient(
        circle at center,
        ${c} 0%,
        transparent 60%
      );
      opacity: 0;
      transform: scale(0.2);
    }

    .state-layer-target.is-rippling::after {
      animation: wled-ripple 450ms cubic-bezier(0.2, 0, 0, 1);
    }

    @keyframes wled-ripple {
      0% {
        opacity: ${unsafeCSS(STATE_LAYER_OPACITY.pressed)};
        transform: scale(0.2);
      }
      100% {
        opacity: 0;
        transform: scale(1.6);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .state-layer-target.is-rippling::after {
        animation: none;
      }
    }
  `;
}

/**
 * Default state-layer styles (overlay = `currentColor`). Drop into a
 * component's static `styles` array and mark interactive elements with
 * `class="state-layer-target"`.
 */
export const stateLayerStyles: CSSResult = stateLayer();

/**
 * Imperatively trigger the pressed ripple on a target element. Toggles the
 * `is-rippling` class and clears it when the animation ends (or after a
 * fallback timeout, so it never sticks if `animationend` is missed).
 */
export function triggerRipple(el: HTMLElement): void {
  el.classList.remove("is-rippling");
  // Force reflow so re-adding the class restarts the animation.
  void el.offsetWidth;
  el.classList.add("is-rippling");
  const clear = () => el.classList.remove("is-rippling");
  el.addEventListener("animationend", clear, { once: true });
  window.setTimeout(clear, 500);
}
