import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  EFFECT_CHIPS_TAG,
  WledEffectChips,
} from "../src/components/effect-chips.js";
import {
  effectPreviewBackgroundCss,
  effectUsesPalette,
} from "../src/utils/effect-preview.js";
import {
  PALETTE_CHIPS_TAG,
  WledPaletteChips,
} from "../src/components/palette-chips.js";

async function settle(el: WledEffectChips): Promise<void> {
  await el.updateComplete;
}

function mount(): WledEffectChips {
  const el = document.createElement(EFFECT_CHIPS_TAG) as WledEffectChips;
  el.controllerId = "ctrlPreview";
  el.showRecents = false;
  // No captured thumbnails — the common case that must still preview.
  el.thumbBasenames = [];
  document.body.appendChild(el);
  return el;
}

describe("effectPreviewBackgroundCss (visual preview, no capture)", () => {
  it("always returns a gradient/color, never empty", () => {
    expect(effectPreviewBackgroundCss("Blink")).toMatch(/gradient|hsl|rgb/);
    expect(effectPreviewBackgroundCss("Solid", { isSolid: true })).toMatch(
      /gradient|hsl|rgb/
    );
  });

  it("uses the device palette preview when palette-aware", () => {
    const device = "linear-gradient(90deg, rgb(1,2,3), rgb(4,5,6))";
    const css = effectPreviewBackgroundCss("Palette", {
      paletteAware: true,
      selectedPaletteId: 7,
      palettePreviews: { "7": device },
    });
    expect(css).toBe(device);
  });

  it("degrades to built-in palette gradient when previews empty (offline)", () => {
    const css = effectPreviewBackgroundCss("Colorloop", {
      paletteAware: true,
      selectedPaletteId: 3,
      selectedPaletteName: "Ocean",
      palettePreviews: {},
    });
    expect(css).toContain("linear-gradient");
  });

  it("is stable per effect name (deterministic category gradient)", () => {
    expect(effectPreviewBackgroundCss("Chase")).toBe(
      effectPreviewBackgroundCss("Chase")
    );
    expect(effectPreviewBackgroundCss("Chase")).not.toBe(
      effectPreviewBackgroundCss("Sparkle")
    );
  });

  it("detects palette-driven effects by name", () => {
    expect(effectUsesPalette("Palette")).toBe(true);
    expect(effectUsesPalette("Rainbow Runner")).toBe(true);
    expect(effectUsesPalette("Blink")).toBe(false);
  });
});

describe("wled-effect-chips no-thumbnail preview chip", () => {
  let el: WledEffectChips;

  beforeEach(() => {
    localStorage.clear();
    el = mount();
  });

  afterEach(() => {
    el.remove();
  });

  it("renders a visual background (not bare text) when no thumbnail exists", async () => {
    el.effectsByName = { Blink: 5 };
    el.soundFlags = [];
    await settle(el);

    const chip = el.shadowRoot?.querySelector(".chip.preview") as HTMLElement;
    expect(chip).toBeTruthy();
    // Background gradient is carried via the --chip-preview custom property.
    expect(chip.getAttribute("style") ?? "").toMatch(/--chip-preview:/);
    const bg = chip.querySelector(".chip-bg");
    expect(bg).toBeTruthy();
    // The name is still present (inside a scrim-backed span).
    expect(chip.querySelector(".chip-name")?.textContent).toContain("Blink");
  });

  it("preserves role=option, aria-selected, and selected state", async () => {
    el.effectsByName = { Blink: 5, Solid: 0 };
    el.selectedFx = 5;
    await settle(el);

    const chips = el.shadowRoot?.querySelectorAll(".chip.preview");
    expect(chips && chips.length).toBeGreaterThan(0);
    const active = el.shadowRoot?.querySelector(
      ".chip.preview.active"
    ) as HTMLElement;
    expect(active).toBeTruthy();
    expect(active.getAttribute("role")).toBe("option");
    expect(active.getAttribute("aria-selected")).toBe("true");
  });

  it("keeps the sound/2D badges on preview chips", async () => {
    el.effectsByName = { Gravimeter: 3 };
    el.soundFlags = [];
    el.soundFlags[3] = "v";
    await settle(el);

    const chip = el.shadowRoot?.querySelector(".chip.preview");
    expect(chip?.querySelector(".badge")?.textContent).toContain("♪");
  });

  it("still uses the <wled-effect-tile> thumbnail path when a thumbUrl exists", async () => {
    // Provide a captured basename so thumbUrlForFx resolves a URL.
    el.fwVer = "0.16.0";
    el.thumbBasenames = ["5_0.16.0_strip.webp"];
    el.effectsByName = { Blink: 5 };
    await settle(el);

    expect(el.shadowRoot?.querySelector("wled-effect-tile")).toBeTruthy();
    // Must NOT regress to a preview chip for a captured effect.
    expect(el.shadowRoot?.querySelector(".chip.preview")).toBeNull();
  });
});

describe("wled-palette-chips tiles render real colors", () => {
  let el: WledPaletteChips;

  beforeEach(() => {
    el = document.createElement(PALETTE_CHIPS_TAG) as WledPaletteChips;
    el.palettesByName = { Ocean: 13, Custom: 50 };
    el.palettePreviews = {
      "50": "linear-gradient(90deg, rgb(9,9,9), rgb(200,10,10))",
    };
    document.body.appendChild(el);
  });

  afterEach(() => el.remove());

  it("uses the device palette_preview gradient when present", async () => {
    await el.updateComplete;
    const swatches = Array.from(
      el.shadowRoot?.querySelectorAll(".swatch") ?? []
    ) as HTMLElement[];
    const styles = swatches.map((s) => s.getAttribute("style") ?? "");
    expect(styles.some((s) => s.includes("rgb(200,10,10)"))).toBe(true);
  });

  it("falls back to a built-in gradient when no preview (offline)", async () => {
    await el.updateComplete;
    const swatches = Array.from(
      el.shadowRoot?.querySelectorAll(".swatch") ?? []
    ) as HTMLElement[];
    // Every swatch has a real gradient/color background, never blank.
    expect(swatches.length).toBeGreaterThan(0);
    for (const s of swatches) {
      expect(s.getAttribute("style") ?? "").toMatch(/gradient|rgb|hsl/);
    }
  });
});
