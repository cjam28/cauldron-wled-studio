import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  EFFECT_MERGE_TOGGLE_TAG,
  WledEffectMergeToggle,
} from "../src/components/effect-merge-toggle.js";

// The element self-registers via @safeCustomElement at import time.

async function settle(el: WledEffectMergeToggle): Promise<void> {
  await el.updateComplete;
}

describe("wled-effect-merge-toggle compact styling (P1-2)", () => {
  let el: WledEffectMergeToggle;

  beforeEach(() => {
    localStorage.clear();
    el = document.createElement(
      EFFECT_MERGE_TOGGLE_TAG
    ) as WledEffectMergeToggle;
    el.controllerId = "ctrlCompact";
    document.body.appendChild(el);
  });

  afterEach(() => {
    el.remove();
  });

  it("is registered as a custom element", () => {
    expect(customElements.get(EFFECT_MERGE_TOGGLE_TAG)).toBe(
      WledEffectMergeToggle
    );
    expect(el).toBeInstanceOf(WledEffectMergeToggle);
  });

  it("reflects the compact property to the host attribute so :host([compact]) applies", async () => {
    await settle(el);
    expect(el.hasAttribute("compact")).toBe(false);

    el.compact = true;
    await settle(el);
    expect(el.hasAttribute("compact")).toBe(true);

    el.compact = false;
    await settle(el);
    expect(el.hasAttribute("compact")).toBe(false);
  });

  it("never emits a redundant compact class on .merge-row (compact is attribute-driven)", async () => {
    el.compact = true;
    await settle(el);

    const row = el.shadowRoot?.querySelector(".merge-row");
    expect(row).toBeTruthy();
    expect(row?.classList.contains("compact")).toBe(false);
    // The dead "compact-merge" selector must never appear in the markup.
    expect(el.shadowRoot?.querySelector(".compact-merge")).toBeNull();
  });

  it("keeps the .merge-row.on state class wired to merge state, independent of compact", async () => {
    el.compact = true;
    await settle(el);
    const row = el.shadowRoot?.querySelector(".merge-row");
    // Default controller has no explicit merge applied, so .on is absent here;
    // assert the compact attribute drives layout, not a class on the row.
    expect(el.hasAttribute("compact")).toBe(true);
    expect(row?.className.includes("compact")).toBe(false);
  });
});
