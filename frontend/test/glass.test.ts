import { describe, expect, it, afterEach } from "vitest";
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import {
  glassStyles,
  GLASS_ALPHA,
  GLASS_BACKDROP,
  type GlassSurface,
} from "../src/styles/glass.js";
import { defineCustomElement } from "../src/utils/safe-custom-element.js";

/**
 * The glass mixin's visual behavior (real blur, real wallpaper bleed-through)
 * is verified in the preview harness + on the Pi. happy-dom does not compute
 * `backdrop-filter` or the `:host([surface])` cascade, so here we assert the two
 * things that ARE deterministic and meaningful in JSDOM/happy-dom:
 *
 *   1. the attribute-driven surface contract — a component reflects the
 *      `surface` attribute the glass selectors key off of; and
 *   2. the emitted CSS text contract — alpha tiers (card < base < panel), the
 *      blur+saturate backdrop, and the `@supports not (backdrop-filter)` opaque
 *      fallback are present and key off `--md-sys-color-surface-container`.
 */

const TAG = "wled-glass-test-host";

/** Minimal glass host: reflects `surface` so the glass selectors can match. */
class GlassTestHost extends LitElement {
  static override styles = [glassStyles];

  @property({ reflect: true }) surface?: GlassSurface;

  override render() {
    return html`<div class="glass" data-surface=${this.surface ?? "base"}>
      glass
    </div>`;
  }
}
defineCustomElement(TAG, GlassTestHost);

function cssText(): string {
  return glassStyles.cssText;
}

describe("glass surface mixin — attribute-driven behavior", () => {
  let el: GlassTestHost;

  afterEach(() => {
    el?.remove();
  });

  it("reflects the `surface` attribute onto the host (card)", async () => {
    el = new GlassTestHost();
    el.surface = "card";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("surface")).toBe("card");
    const inner = el.shadowRoot?.querySelector(".glass");
    expect(inner?.getAttribute("data-surface")).toBe("card");
  });

  it("reflects the `surface` attribute onto the host (panel)", async () => {
    el = new GlassTestHost();
    el.surface = "panel";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.getAttribute("surface")).toBe("panel");
    expect(
      el.shadowRoot?.querySelector(".glass")?.getAttribute("data-surface")
    ).toBe("panel");
  });

  it("has no `surface` attribute by default (base tier)", async () => {
    el = new GlassTestHost();
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.hasAttribute("surface")).toBe(false);
    expect(
      el.shadowRoot?.querySelector(".glass")?.getAttribute("data-surface")
    ).toBe("base");
  });

  it("registers idempotently (safeCustomElement)", () => {
    expect(customElements.get(TAG)).toBe(GlassTestHost);
    expect(() => defineCustomElement(TAG, GlassTestHost)).not.toThrow();
  });
});

describe("glass alpha contract", () => {
  it("orders tiers card < base < panel (card most translucent)", () => {
    expect(GLASS_ALPHA.card).toBeLessThan(GLASS_ALPHA.base);
    expect(GLASS_ALPHA.base).toBeLessThan(GLASS_ALPHA.panel);
  });

  it("keeps all alphas strictly translucent (0..1, never fully opaque)", () => {
    for (const a of Object.values(GLASS_ALPHA)) {
      expect(a).toBeGreaterThan(0);
      expect(a).toBeLessThan(1);
    }
  });
});

describe("glass emitted CSS contract", () => {
  it("blurs and saturates via backdrop-filter (24px / 140%)", () => {
    expect(GLASS_BACKDROP).toBe("blur(24px) saturate(140%)");
    expect(cssText()).toContain(`backdrop-filter: ${GLASS_BACKDROP}`);
    expect(cssText()).toContain(`-webkit-backdrop-filter: ${GLASS_BACKDROP}`);
  });

  it("tints from the M3 surface-container role (consumes, never generates)", () => {
    const css = cssText();
    // Role is referenced (with a non-cyclic fallback baseline for the admin
    // panel / harness before m3-color writes a scheme — paren omitted so the
    // assertion holds for both bare and fallback forms).
    expect(css).toContain("var(--md-sys-color-surface-container");
    // alpha applied via color-mix against transparent
    expect(css).toContain("color-mix(in srgb, var(--md-sys-color-surface-container");
    expect(css).toContain("transparent");
  });

  it("emits the per-tier alpha percentages (card/base/panel)", () => {
    const css = cssText();
    expect(css).toContain(`${Math.round(GLASS_ALPHA.base * 100)}%`);
    expect(css).toContain(`${Math.round(GLASS_ALPHA.card * 100)}%`);
    expect(css).toContain(`${Math.round(GLASS_ALPHA.panel * 100)}%`);
  });

  it("keys card/panel tiers off the host surface attribute", () => {
    const css = cssText();
    expect(css).toContain(`:host([surface="card"]) .glass`);
    expect(css).toContain(`:host([surface="panel"]) .glass`);
  });

  it("falls back to opaque surface-container with no backdrop-filter", () => {
    const css = cssText();
    expect(css).toContain("@supports not");
    expect(css).toContain("backdrop-filter: none");
    // fallback uses the full (opaque) role color, not a color-mix
    const supportsBlock = css.slice(css.indexOf("@supports not"));
    expect(supportsBlock).toContain(
      "background-color: var(--md-sys-color-surface-container"
    );
  });

  it("uses the 24px card radius + M3 elevation token for the surface", () => {
    const css = cssText();
    // 24px dashboard card radius via the bespoke --wled-radius (NOT the
    // standard M3 corner-large=16px, which @material/web components round from).
    expect(css).toContain("var(--wled-radius");
    expect(css).toContain("var(--md-sys-elevation-level2");
  });
});
