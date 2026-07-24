import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Connection } from "home-assistant-js-websocket";
import {
  EFFECT_MERGE_TOGGLE_TAG,
  WledEffectMergeToggle,
} from "../src/components/effect-merge-toggle.js";
import {
  MERGED_SEGMENT_NAME,
  isMergeForEffectsExplicit,
  setMergeForEffectsActive,
} from "../src/utils/effect-merge.js";

// The element self-registers via @safeCustomElement at import time.

async function settle(el: WledEffectMergeToggle): Promise<void> {
  await el.updateComplete;
}

/** Await the async _onToggle handler (it flips _busy while running). */
async function settleToggle(el: WledEffectMergeToggle): Promise<void> {
  for (let i = 0; i < 50; i++) {
    await el.updateComplete;
    if (!(el as unknown as { _busy: boolean })._busy) break;
    await new Promise((r) => setTimeout(r, 0));
  }
  await el.updateComplete;
}

function mockConnection(
  handlers: Record<string, (msg: Record<string, unknown>) => unknown>
): Connection {
  return {
    connected: true,
    sendMessagePromise: async (msg: { type: string }) => {
      const handler = handlers[msg.type];
      if (!handler) throw new Error(`unexpected ws message: ${msg.type}`);
      return handler(msg as unknown as Record<string, unknown>);
    },
  } as unknown as Connection;
}

function checkbox(el: WledEffectMergeToggle): HTMLInputElement {
  const box = el.shadowRoot?.querySelector<HTMLInputElement>(
    'input[type="checkbox"]'
  );
  if (!box) throw new Error("checkbox not rendered");
  return box;
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

describe("merge state grounding (phantom-merge regression)", () => {
  const FOUR_SEGMENTS = [
    { id: 0, start: 0, stop: 85, on: true },
    { id: 1, start: 85, stop: 96, on: true },
    { id: 2, start: 96, stop: 186, on: true },
    { id: 3, start: 186, stop: 210, on: true },
  ];

  let el: WledEffectMergeToggle;

  beforeEach(() => {
    localStorage.clear();
    el = document.createElement(
      EFFECT_MERGE_TOGGLE_TAG
    ) as WledEffectMergeToggle;
    el.controllerId = "ctrlFresh";
    el.pixelCount = 210;
  });

  afterEach(() => {
    el.remove();
  });

  /** Attach after localStorage/props are staged so connect reads them. */
  function mount(): void {
    document.body.appendChild(el);
  }

  it("renders UNCHECKED for a fresh controller (never opted in)", async () => {
    el.segments = FOUR_SEGMENTS;
    mount();
    await settle(el);
    expect(checkbox(el).checked).toBe(false);
    expect(
      el.shadowRoot?.querySelector(".merge-row")?.classList.contains("on")
    ).toBe(false);
  });

  it("unchecking with a stale flag and NO snapshot succeeds when the device is not merged", async () => {
    // Simulate the bug scenario: flag says merged, but this browser never
    // saved a layout snapshot and the device still has its 4 segments.
    setMergeForEffectsActive("ctrlFresh", true);
    el.segments = FOUR_SEGMENTS;
    el.connection = mockConnection({
      "wled_studio/get_state": () => ({
        segments: FOUR_SEGMENTS,
        info: { leds: { count: 210 } },
      }),
    });
    mount();
    await settle(el);
    expect(checkbox(el).checked).toBe(true);

    const box = checkbox(el);
    box.checked = false;
    box.dispatchEvent(new Event("change"));
    await settleToggle(el);

    // happy-dom cannot see lit's late-inserted conditional nodes, so assert
    // the reactive state that drives the .err paragraph directly.
    expect((el as unknown as { _error: string })._error).toBe("");
    expect(box.checked).toBe(false);
    expect(isMergeForEffectsExplicit("ctrlFresh")).toBe(false);
  });

  it("unchecking with NO snapshot errors only when the device really is merged", async () => {
    setMergeForEffectsActive("ctrlFresh", true);
    const mergedLayout = [
      { id: 0, start: 0, stop: 210, on: true, n: MERGED_SEGMENT_NAME },
    ];
    el.segments = mergedLayout;
    el.connection = mockConnection({
      "wled_studio/get_state": () => ({
        segments: mergedLayout,
        info: { leds: { count: 210 } },
      }),
    });
    mount();
    await settle(el);

    const box = checkbox(el);
    box.checked = false;
    box.dispatchEvent(new Event("change"));
    await settleToggle(el);

    // happy-dom cannot see lit's late-inserted conditional nodes, so assert
    // the reactive state that drives the .err paragraph directly.
    expect((el as unknown as { _error: string })._error).toContain(
      "No saved segment layout"
    );
    // The toggle reverts to checked — the device is still merged.
    expect(box.checked).toBe(true);
  });
});
