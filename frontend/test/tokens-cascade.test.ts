import { describe, it, expect } from "vitest";
import { wledDesignTokens } from "../src/styles/tokens.js";

/**
 * Architectural guard for the M3 token foundation (foundation spec 2026-06-26).
 *
 * happy-dom does NOT resolve CSS custom-property dependency cycles, so a unit
 * test can't *render* the bug. Instead we assert the SOURCE rules that the
 * cycle bug violated — these would have failed the original
 * `--md-sys-color-X: var(--md-sys-color-X, …)` self-reference at build time:
 *
 *  1. No custom property references itself in its own value (self-cycle ->
 *     guaranteed-invalid value, NOT the fallback).
 *  2. `--md-sys-color-*` roles are never *declared* on :host (a :host
 *     declaration shadows the inherited :root Material You scheme). They must
 *     only ever appear as the *referenced* token inside a `var(--md-sys-color-X, …)`.
 *  3. Every `--wled-*` alias references a DIFFERENT token (no self-cycle) and
 *     carries a non-empty fallback so it resolves with no upstream scheme.
 */
function cssText(): string {
  // CSSResult.toString() / .cssText yields the raw CSS.
  return (wledDesignTokens as unknown as { cssText: string }).cssText;
}

/** All `--name: <value>;` declarations in the stylesheet. */
function declarations(css: string): Array<{ name: string; value: string }> {
  const out: Array<{ name: string; value: string }> = [];
  const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    out.push({ name: m[1], value: m[2].trim() });
  }
  return out;
}

describe("M3 token cascade — architectural guards", () => {
  const css = cssText();
  const decls = declarations(css);

  it("declares no self-referential custom property (no var() cycle)", () => {
    const offenders = decls.filter((d) =>
      new RegExp(`var\\(\\s*${d.name}\\b`).test(d.value),
    );
    expect(
      offenders.map((o) => `${o.name}: ${o.value}`),
      "self-referential custom properties resolve to the guaranteed-invalid value, not the fallback",
    ).toEqual([]);
  });

  it("never declares --md-sys-color-* roles on :host (would shadow :root Material You)", () => {
    const roleDecls = decls.filter((d) => d.name.startsWith("--md-sys-color-"));
    expect(
      roleDecls.map((d) => d.name),
      "color roles must arrive by inheritance (:root) or inline (m3-color.ts), never be declared here",
    ).toEqual([]);
  });

  it("every --wled-* alias references a different token and has a fallback", () => {
    const aliases = decls.filter((d) => d.name.startsWith("--wled-"));
    expect(aliases.length).toBeGreaterThan(0);
    for (const a of aliases) {
      // no self-reference
      expect(
        new RegExp(`var\\(\\s*${a.name}\\b`).test(a.value),
        `${a.name} must not reference itself`,
      ).toBe(false);
      // if it consumes an --md-sys-color-* role, it must supply a fallback arg
      if (/var\(\s*--md-sys-color-/.test(a.value)) {
        expect(
          /var\(\s*--md-sys-color-[a-z0-9-]+\s*,/.test(a.value),
          `${a.name} must give --md-sys-color-* a fallback (resolve with no scheme)`,
        ).toBe(true);
      }
    }
  });

  it("keeps the standard M3 corner-large at the spec value (16px), not the 24px card radius", () => {
    const large = decls.find((d) => d.name === "--md-sys-shape-corner-large");
    expect(large?.value).toBe("16px");
    // the 24px dashboard card radius lives on the bespoke alias instead
    const radius = decls.find((d) => d.name === "--wled-radius");
    expect(radius?.value).toBe("24px");
  });
});
