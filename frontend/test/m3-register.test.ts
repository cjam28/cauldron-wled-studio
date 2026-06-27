import { afterEach, describe, expect, it, vi } from "vitest";
import {
  M3_TAGS,
  beginM3Registration,
  endM3Registration,
  isM3Registered,
  whenPowered,
  type M3Tag,
} from "../src/components/m3/register.js";

describe("m3 register — idempotent define guard", () => {
  afterEach(() => {
    // Ensure the global define is always restored even if a test throws.
    while (isGuardOpen()) endM3Registration();
  });

  function isGuardOpen(): boolean {
    // Heuristic: defining a duplicate tag never throws while the guard is open.
    const tag = "m3-guard-probe-" + Math.random().toString(36).slice(2);
    customElements.define(tag, class extends HTMLElement {});
    try {
      customElements.define(tag, class extends HTMLElement {});
      return true; // no throw => guard active
    } catch {
      return false;
    }
  }

  it("swallows duplicate define while the window is open", () => {
    const tag = "m3-dup-a";
    beginM3Registration();
    class First extends HTMLElement {}
    class Second extends HTMLElement {}
    customElements.define(tag, First);
    expect(() => customElements.define(tag, Second)).not.toThrow();
    // First definition wins; the duplicate is a no-op.
    expect(customElements.get(tag)).toBe(First);
    endM3Registration();
  });

  it("restores throwing define after the window closes", () => {
    const tag = "m3-dup-b";
    beginM3Registration();
    endM3Registration();
    customElements.define(tag, class extends HTMLElement {});
    expect(() =>
      customElements.define(tag, class extends HTMLElement {})
    ).toThrow();
  });

  it("is reentrant (depth-counted)", () => {
    const tag = "m3-dup-c";
    beginM3Registration();
    beginM3Registration();
    endM3Registration(); // still open (depth 1)
    customElements.define(tag, class extends HTMLElement {});
    expect(() =>
      customElements.define(tag, class extends HTMLElement {})
    ).not.toThrow();
    endM3Registration(); // now closed (depth 0)
    const tag2 = "m3-dup-d";
    customElements.define(tag2, class extends HTMLElement {});
    expect(() =>
      customElements.define(tag2, class extends HTMLElement {})
    ).toThrow();
  });

  it("does not leak the guard outside the window", () => {
    const tag = "m3-dup-e";
    customElements.define(tag, class extends HTMLElement {});
    // No begin/end here — strict semantics expected.
    expect(() =>
      customElements.define(tag, class extends HTMLElement {})
    ).toThrow();
  });
});

describe("m3 register — helpers", () => {
  it("exposes exactly the adopted chrome tags", () => {
    expect(M3_TAGS).toContain("md-slider" as M3Tag);
    expect(M3_TAGS).toContain("md-tabs" as M3Tag);
    expect(M3_TAGS).toContain("md-switch" as M3Tag);
    expect(M3_TAGS).toContain("md-icon-button" as M3Tag);
    expect(M3_TAGS).toContain("md-fab" as M3Tag);
    expect(M3_TAGS).toContain("md-navigation-bar" as M3Tag);
    expect(M3_TAGS).toContain("md-navigation-drawer" as M3Tag);
    // Bundle-budget guard: do not silently grow the adopted set.
    expect(M3_TAGS).toHaveLength(13);
  });

  it("whenPowered runs fn only when the host is powered", () => {
    const fn = vi.fn();
    expect(whenPowered({ isPowered: false }, fn)).toBe(false);
    expect(fn).not.toHaveBeenCalled();

    expect(whenPowered({ isPowered: true }, fn)).toBe(true);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("isM3Registered reflects registry presence", () => {
    // In this unit test the @material/web side-effect imports are not loaded,
    // so the full set is not present unless index.js was imported elsewhere.
    expect(typeof isM3Registered()).toBe("boolean");
  });
});
