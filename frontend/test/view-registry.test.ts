import { describe, expect, it, vi } from "vitest";
import { render, type TemplateResult } from "lit";

// konva's node entry `require("canvas")` (native module, not installed in the
// test env). The layout view dynamically imports konva; stub it so
// ensureViewLoaded("layout") can evaluate the module graph in node. This does
// not affect the browser bundle — konva is real there.
vi.mock("konva", () => ({ default: class {}, Stage: class {}, Layer: class {} }));
import {
  VIEW_REGISTRY,
  renderView,
  ensureViewLoaded,
  type ViewRenderContext,
} from "../src/core/view-registry.js";
import { DEFAULT_NAV, type ViewId } from "../src/core/nav-manifest.js";

const ALL_VIEW_IDS = DEFAULT_NAV.map((n) => n.id);
const LIGHT_VIEWS: ViewId[] = ["color", "effects", "scenes", "segments"];

function makeCtx(overrides: Partial<ViewRenderContext> = {}): ViewRenderContext {
  return {
    hass: undefined,
    connection: undefined,
    controllerId: "ctrl-1",
    masterEntity: "light.wled_master",
    layoutId: "layout-1",
    fixtureId: "fixture-1",
    pixelCount: 210,
    selectedSegId: 0,
    highlightSegIds: [],
    segments: [],
    density: "compact",
    compact: true,
    onSegmentChange: () => {},
    onSegmentTargetsChanged: () => {},
    onPaintConfigChange: () => {},
    ...overrides,
  };
}

/** Render a TemplateResult into a detached container and return its innerHTML. */
function renderToHtml(tpl: TemplateResult): string {
  const host = document.createElement("div");
  render(tpl, host);
  return host.innerHTML.toLowerCase();
}

describe("view-registry: registry shape", () => {
  it("has a thunk for every ViewId in DEFAULT_NAV", () => {
    for (const id of ALL_VIEW_IDS) {
      expect(typeof VIEW_REGISTRY[id]).toBe("function");
    }
    // No stray/missing keys beyond the manifest.
    expect(Object.keys(VIEW_REGISTRY).sort()).toEqual([...ALL_VIEW_IDS].sort());
  });
});

describe("view-registry: renderView returns a TemplateResult per ViewId", () => {
  for (const id of ALL_VIEW_IDS) {
    it(`renderView("${id}") yields a TemplateResult`, () => {
      const result = renderView(id, makeCtx());
      // Lit TemplateResult duck-type: has a strings TemplateStringsArray + values.
      expect(result).toBeTruthy();
      expect(Array.isArray((result as TemplateResult).strings)).toBe(true);
      expect("values" in (result as TemplateResult)).toBe(true);
    });
  }

  it('renderView("color") yields a template containing wled-segment-controls', () => {
    const htmlStr = renderToHtml(renderView("color", makeCtx()));
    expect(htmlStr).toContain("wled-segment-controls");
  });

  it('renderView("segments") yields a template containing wled-segment-controls', () => {
    const htmlStr = renderToHtml(renderView("segments", makeCtx()));
    expect(htmlStr).toContain("wled-segment-controls");
  });

  it('renderView("effects") yields a template containing wled-view-effects', () => {
    const htmlStr = renderToHtml(renderView("effects", makeCtx()));
    expect(htmlStr).toContain("wled-view-effects");
  });

  it('renderView("scenes") yields a template containing wled-view-scenes', () => {
    const htmlStr = renderToHtml(renderView("scenes", makeCtx()));
    expect(htmlStr).toContain("wled-view-scenes");
  });

  it('renderView("paint") yields a template containing wled-view-paint', () => {
    const htmlStr = renderToHtml(renderView("paint", makeCtx()));
    expect(htmlStr).toContain("wled-view-paint");
  });

  it('renderView("home") composes the color surface + scenes', () => {
    const htmlStr = renderToHtml(renderView("home", makeCtx()));
    expect(htmlStr).toContain("wled-segment-controls");
    expect(htmlStr).toContain("wled-view-scenes");
  });
});

describe("view-registry: light views are statically present", () => {
  it("light view thunks render without any ensureViewLoaded() call", () => {
    // Light views (color/effects/scenes/segments) are statically imported, so
    // their tags are already defined and the thunks render synchronously.
    for (const id of LIGHT_VIEWS) {
      const htmlStr = renderToHtml(renderView(id, makeCtx()));
      expect(htmlStr.length).toBeGreaterThan(0);
    }
    // segment-controls is the canonical light element and must be registered.
    expect(customElements.get("wled-segment-controls")).toBeTruthy();
    expect(customElements.get("wled-view-effects")).toBeTruthy();
    expect(customElements.get("wled-view-scenes")).toBeTruthy();
  });
});

describe("view-registry: ensureViewLoaded resolves + caches per id", () => {
  it("light views resolve immediately", async () => {
    await expect(ensureViewLoaded("color")).resolves.toBeUndefined();
    await expect(ensureViewLoaded("home")).resolves.toBeUndefined();
  });

  it("heavy views resolve and define their custom element", async () => {
    await ensureViewLoaded("paint");
    expect(customElements.get("wled-view-paint")).toBeTruthy();

    await ensureViewLoaded("layout");
    expect(customElements.get("wled-view-layout")).toBeTruthy();
  });

  it('calling ensureViewLoaded("paint") twice resolves once (cached)', () => {
    const first = ensureViewLoaded("paint");
    const second = ensureViewLoaded("paint");
    // Same promise instance => the underlying import() ran at most once.
    expect(second).toBe(first);
  });

  it("caches per id (different ids get different promises)", () => {
    const paint = ensureViewLoaded("paint");
    const audio = ensureViewLoaded("audio");
    expect(paint).not.toBe(audio);
    // ...but repeated calls for the same id stay cached.
    expect(ensureViewLoaded("audio")).toBe(audio);
  });

  it("every ViewId is loadable without throwing", async () => {
    await Promise.all(ALL_VIEW_IDS.map((id) => ensureViewLoaded(id)));
  });
});
