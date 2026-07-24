import { describe, expect, it } from "vitest";
import {
  applyDynamicScheme,
  applyDynamicSchemeFromRgb,
  buildDynamicScheme,
  buildDynamicSchemeFromRgb,
  contrastRatio,
  generateScheme,
  generateSchemeFromRgb,
  resolveScheme,
  writeSchemeToHost,
  M3_COLOR_ROLE_TOKEN_NAMES,
  VARIANT_TONAL_SPOT,
  type M3ColorScheme,
} from "../src/core/m3-color.js";

/**
 * The frozen token contract — these EXACT names must all be emitted, and only
 * these. Mirrors the `tokenRoles` list in the task contract / spec.
 */
const CONTRACT_TOKENS = [
  "--md-sys-color-primary",
  "--md-sys-color-on-primary",
  "--md-sys-color-primary-container",
  "--md-sys-color-on-primary-container",
  "--md-sys-color-secondary",
  "--md-sys-color-on-secondary",
  "--md-sys-color-secondary-container",
  "--md-sys-color-on-secondary-container",
  "--md-sys-color-tertiary",
  "--md-sys-color-on-tertiary",
  "--md-sys-color-tertiary-container",
  "--md-sys-color-on-tertiary-container",
  "--md-sys-color-error",
  "--md-sys-color-on-error",
  "--md-sys-color-error-container",
  "--md-sys-color-on-error-container",
  "--md-sys-color-background",
  "--md-sys-color-on-background",
  "--md-sys-color-surface",
  "--md-sys-color-on-surface",
  "--md-sys-color-surface-variant",
  "--md-sys-color-on-surface-variant",
  "--md-sys-color-surface-container-lowest",
  "--md-sys-color-surface-container-low",
  "--md-sys-color-surface-container",
  "--md-sys-color-surface-container-high",
  "--md-sys-color-surface-container-highest",
  "--md-sys-color-outline",
  "--md-sys-color-outline-variant",
  "--md-sys-color-inverse-surface",
  "--md-sys-color-inverse-on-surface",
  "--md-sys-color-inverse-primary",
  "--md-sys-color-shadow",
  "--md-sys-color-scrim",
  "--md-sys-color-surface-tint",
] as const;

/**
 * Golden seed = the M3 baseline source color (#6750A4). Expected role hexes
 * captured from MCU 0.3.0 `SchemeTonalSpot` (contrastLevel 0). Asserting exact
 * values locks the engine to deterministic, reproducible output.
 */
const SEED = "#6750a4";

const EXPECTED_LIGHT: Partial<Record<(typeof CONTRACT_TOKENS)[number], string>> =
  {
    "--md-sys-color-primary": "#65558f",
    "--md-sys-color-on-primary": "#ffffff",
    "--md-sys-color-primary-container": "#e9ddff",
    "--md-sys-color-on-primary-container": "#4d3d75",
    "--md-sys-color-secondary": "#625b71",
    "--md-sys-color-on-secondary": "#ffffff",
    "--md-sys-color-tertiary": "#7e5260",
    "--md-sys-color-on-tertiary": "#ffffff",
    "--md-sys-color-background": "#fdf7ff",
    "--md-sys-color-on-background": "#1d1b20",
    "--md-sys-color-surface": "#fdf7ff",
    "--md-sys-color-on-surface": "#1d1b20",
    "--md-sys-color-surface-variant": "#e7e0eb",
    "--md-sys-color-on-surface-variant": "#49454e",
    "--md-sys-color-surface-container": "#f2ecf4",
    "--md-sys-color-outline": "#7a757f",
    "--md-sys-color-outline-variant": "#cac4cf",
    "--md-sys-color-inverse-surface": "#322f35",
    "--md-sys-color-inverse-on-surface": "#f5eff7",
    "--md-sys-color-inverse-primary": "#cfbdfe",
    "--md-sys-color-shadow": "#000000",
    "--md-sys-color-scrim": "#000000",
    "--md-sys-color-error": "#ba1a1a",
    "--md-sys-color-on-error": "#ffffff",
  };

const EXPECTED_DARK: Partial<Record<(typeof CONTRACT_TOKENS)[number], string>> =
  {
    "--md-sys-color-primary": "#cfbdfe",
    "--md-sys-color-on-primary": "#36275d",
    "--md-sys-color-primary-container": "#4d3d75",
    "--md-sys-color-on-primary-container": "#e9ddff",
    "--md-sys-color-secondary": "#cbc2db",
    "--md-sys-color-on-secondary": "#332d41",
    "--md-sys-color-tertiary": "#efb8c8",
    "--md-sys-color-on-tertiary": "#4a2532",
    "--md-sys-color-background": "#141218",
    "--md-sys-color-on-background": "#e6e0e9",
    "--md-sys-color-surface": "#141218",
    "--md-sys-color-on-surface": "#e6e0e9",
    "--md-sys-color-inverse-surface": "#e6e0e9",
    "--md-sys-color-inverse-on-surface": "#322f35",
    "--md-sys-color-inverse-primary": "#65558f",
    "--md-sys-color-error": "#ffb4ab",
    "--md-sys-color-on-error": "#690005",
  };

/** A WCAG AA-ish floor we expect on-* over its base to clear (text contrast). */
const AA_CONTRAST = 4.5;

/** on-role -> base-role pairs whose contrast we verify in both modes. */
const ON_PAIRS: Array<
  [(typeof CONTRACT_TOKENS)[number], (typeof CONTRACT_TOKENS)[number]]
> = [
  ["--md-sys-color-on-primary", "--md-sys-color-primary"],
  ["--md-sys-color-on-primary-container", "--md-sys-color-primary-container"],
  ["--md-sys-color-on-secondary", "--md-sys-color-secondary"],
  ["--md-sys-color-on-tertiary", "--md-sys-color-tertiary"],
  ["--md-sys-color-on-error", "--md-sys-color-error"],
  ["--md-sys-color-on-background", "--md-sys-color-background"],
  ["--md-sys-color-on-surface", "--md-sys-color-surface"],
  ["--md-sys-color-on-surface-variant", "--md-sys-color-surface-variant"],
];

const HEX_RE = /^#[0-9a-f]{6}$/;

describe("m3-color token contract", () => {
  it("emits exactly the frozen --md-sys-color-* role set, in order", () => {
    expect(M3_COLOR_ROLE_TOKEN_NAMES).toEqual([...CONTRACT_TOKENS]);
  });

  it("invents no token names beyond the contract", () => {
    const scheme = generateScheme(SEED);
    for (const key of Object.keys(scheme)) {
      expect(CONTRACT_TOKENS).toContain(key);
    }
    expect(Object.keys(scheme).length).toBe(CONTRACT_TOKENS.length);
  });
});

describe("buildDynamicScheme (pure, TONAL_SPOT, contrast 0)", () => {
  it("uses the TONAL_SPOT variant at standard contrast", () => {
    const scheme = buildDynamicScheme(SEED, { dark: false });
    expect(scheme.variant).toBe(VARIANT_TONAL_SPOT);
    expect(scheme.contrastLevel).toBe(0);
    expect(scheme.isDark).toBe(false);
  });

  it("honors the dark flag", () => {
    expect(buildDynamicScheme(SEED, { dark: true }).isDark).toBe(true);
    // defaults to light when omitted
    expect(buildDynamicScheme(SEED).isDark).toBe(false);
  });

  it("is DOM-free / deterministic across calls", () => {
    expect(resolveScheme(buildDynamicScheme(SEED))).toEqual(
      resolveScheme(buildDynamicScheme(SEED)),
    );
  });
});

describe("generateScheme produces the expected role hexes", () => {
  it("matches golden LIGHT scheme for the M3 baseline seed", () => {
    const scheme = generateScheme(SEED, { dark: false });
    for (const [token, hex] of Object.entries(EXPECTED_LIGHT)) {
      expect(scheme[token as keyof M3ColorScheme]).toBe(hex);
    }
  });

  it("matches golden DARK scheme for the M3 baseline seed", () => {
    const scheme = generateScheme(SEED, { dark: true });
    for (const [token, hex] of Object.entries(EXPECTED_DARK)) {
      expect(scheme[token as keyof M3ColorScheme]).toBe(hex);
    }
  });

  it("every role resolves to a #rrggbb hex in both modes", () => {
    for (const dark of [false, true]) {
      const scheme = generateScheme(SEED, { dark });
      for (const token of CONTRACT_TOKENS) {
        expect(scheme[token]).toMatch(HEX_RE);
      }
    }
  });

  it("light and dark schemes differ", () => {
    expect(generateScheme(SEED, { dark: false })).not.toEqual(
      generateScheme(SEED, { dark: true }),
    );
  });
});

describe("on-* roles meet contrast against their base", () => {
  it("clears AA in light mode", () => {
    const scheme = generateScheme(SEED, { dark: false });
    for (const [on, base] of ON_PAIRS) {
      const ratio = contrastRatio(scheme[on], scheme[base]);
      expect(
        ratio,
        `${on} over ${base} = ${ratio.toFixed(2)}`,
      ).toBeGreaterThanOrEqual(AA_CONTRAST);
    }
  });

  it("clears AA in dark mode", () => {
    const scheme = generateScheme(SEED, { dark: true });
    for (const [on, base] of ON_PAIRS) {
      const ratio = contrastRatio(scheme[on], scheme[base]);
      expect(
        ratio,
        `${on} over ${base} = ${ratio.toFixed(2)}`,
      ).toBeGreaterThanOrEqual(AA_CONTRAST);
    }
  });

  it("contrastRatio is symmetric and bounded 1..21", () => {
    const scheme = generateScheme(SEED);
    const a = scheme["--md-sys-color-on-primary"];
    const b = scheme["--md-sys-color-primary"];
    expect(contrastRatio(a, b)).toBeCloseTo(contrastRatio(b, a), 5);
    expect(contrastRatio(a, a)).toBeCloseTo(1, 1);
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });
});

describe("accent-from-LED (arbitrary RGB -> deterministic TONAL_SPOT scheme)", () => {
  it("builds a TONAL_SPOT scheme from a raw RGB triplet", () => {
    const scheme = buildDynamicSchemeFromRgb(255, 87, 34); // a vivid orange LED
    expect(scheme.variant).toBe(VARIANT_TONAL_SPOT);
    expect(scheme.contrastLevel).toBe(0);
  });

  it("is deterministic for identical RGB input", () => {
    expect(generateSchemeFromRgb(255, 87, 34)).toEqual(
      generateSchemeFromRgb(255, 87, 34),
    );
  });

  it("produces the expected accent hexes and AA-legible on-primary", () => {
    const scheme = generateSchemeFromRgb(255, 87, 34);
    expect(scheme["--md-sys-color-primary"]).toBe("#8f4c38");
    expect(scheme["--md-sys-color-on-primary"]).toBe("#ffffff");
    expect(
      contrastRatio(
        scheme["--md-sys-color-on-primary"],
        scheme["--md-sys-color-primary"],
      ),
    ).toBeGreaterThanOrEqual(AA_CONTRAST);
  });

  it("matches the hex path when given the equivalent seed", () => {
    // argbFromRgb(255,87,34) === #ff5722
    expect(generateSchemeFromRgb(255, 87, 34)).toEqual(
      generateScheme("#ff5722"),
    );
  });

  it("clamps out-of-range channels", () => {
    expect(generateSchemeFromRgb(300, -10, 34.6)).toEqual(
      generateSchemeFromRgb(255, 0, 35),
    );
  });
});

describe("host write step (thin DOM layer, separate from generation)", () => {
  function recordingTarget() {
    const props = new Map<string, string>();
    return {
      props,
      setProperty(name: string, value: string) {
        props.set(name, value);
      },
    };
  }

  it("writes every role token onto an element's style", () => {
    const host = document.createElement("div");
    const scheme = applyDynamicScheme(host, SEED, { dark: false });
    for (const token of CONTRACT_TOKENS) {
      expect(host.style.getPropertyValue(token)).toBe(scheme[token]);
    }
  });

  it("writeSchemeToHost accepts a raw style target", () => {
    const target = recordingTarget();
    const scheme = generateScheme(SEED);
    writeSchemeToHost(target, scheme);
    expect(target.props.size).toBe(CONTRACT_TOKENS.length);
    expect(target.props.get("--md-sys-color-primary")).toBe(
      scheme["--md-sys-color-primary"],
    );
  });

  it("applyDynamicScheme returns the scheme it wrote", () => {
    const host = document.createElement("div");
    expect(applyDynamicScheme(host, SEED, { dark: true })).toEqual(
      generateScheme(SEED, { dark: true }),
    );
  });

  it("accent-from-LED writes onto a host", () => {
    const host = document.createElement("div");
    const scheme = applyDynamicSchemeFromRgb(host, 255, 87, 34);
    expect(host.style.getPropertyValue("--md-sys-color-primary")).toBe(
      scheme["--md-sys-color-primary"],
    );
  });
});
