import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  WledColorSwatchBar,
  COLOR_SWATCH_BAR_TAG,
} from "../src/components/color-swatch-bar.js";
import { defineCustomElement } from "../src/utils/safe-custom-element.js";
import {
  addColorSwatch,
  loadColorSwatches,
} from "../src/utils/color-swatch-storage.js";

defineCustomElement(COLOR_SWATCH_BAR_TAG, WledColorSwatchBar);

describe("WledColorSwatchBar mobile gestures", () => {
  let el: WledColorSwatchBar;
  const controllerId = "test-controller";

  beforeEach(() => {
    localStorage.clear();
    addColorSwatch(controllerId, {
      name: "Sunset",
      rgb: [255, 100, 0],
      white: 0,
    });
    el = new WledColorSwatchBar();
    el.controllerId = controllerId;
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("long-press opens delete confirm and removes swatch when confirmed", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    await el.updateComplete;

    const chip = el.shadowRoot?.querySelector<HTMLButtonElement>(".chip");
    expect(chip).toBeTruthy();

    chip!.dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 520));
    chip!.dispatchEvent(new TouchEvent("touchend", { bubbles: true }));
    await el.updateComplete;

    expect(window.confirm).toHaveBeenCalledWith('Delete swatch "Sunset"?');
    expect(loadColorSwatches(controllerId)).toHaveLength(0);
  });

  it("long-press cancel keeps swatch when confirm declined", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    await el.updateComplete;

    const chip = el.shadowRoot?.querySelector<HTMLButtonElement>(".chip");
    chip!.dispatchEvent(new TouchEvent("touchstart", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 520));
    chip!.dispatchEvent(new TouchEvent("touchend", { bubbles: true }));
    await el.updateComplete;

    expect(loadColorSwatches(controllerId)).toHaveLength(1);
  });

  it("shows chip actions on active swatch via CSS class", async () => {
    el.rgb = [255, 100, 0];
    await el.updateComplete;

    const activeWrap = el.shadowRoot?.querySelector(".chip-wrap.active");
    expect(activeWrap).toBeTruthy();
    expect(activeWrap?.querySelector(".chip-actions")).toBeTruthy();
  });
});
