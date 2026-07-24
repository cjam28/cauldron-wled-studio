import { afterEach, describe, expect, it, vi } from "vitest";

// view-registry's heavy loaders dynamically import konva-backed modules; konva's
// node entry `require("canvas")` is a native module not installed in the test
// env. Stub it so any ensureViewLoaded() that reaches the layout view can
// evaluate without throwing. Light views (home/color/effects/scenes/segments)
// don't need it, but the mock is harmless and keeps the suite robust.
vi.mock("konva", () => ({ default: class {}, Stage: class {}, Layer: class {} }));

import {
  WledStudioShell,
  SHELL_TAG,
} from "../src/core/studio-shell.js";
import { defineCustomElement } from "../src/utils/safe-custom-element.js";
import { DEFAULT_NAV } from "../src/core/nav-manifest.js";
import { M3_COLOR_ROLE_TOKEN_NAMES } from "../src/core/m3-color.js";
import { WledViewPaint } from "../src/panel/view-paint.js";
import type { WledGeometryPreview } from "../src/components/geometry-preview.js";

defineCustomElement(SHELL_TAG, WledStudioShell);

/** Mount a shell with optional attribute overrides; flush the first update. */
async function mount(
  attrs: Partial<Record<"surface" | "density" | "default-view", string>> = {}
): Promise<WledStudioShell> {
  const el = new WledStudioShell();
  for (const [k, v] of Object.entries(attrs)) {
    if (v !== undefined) el.setAttribute(k, v);
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

function q<T extends Element = Element>(el: WledStudioShell, sel: string): T | null {
  return el.shadowRoot?.querySelector<T>(sel) ?? null;
}

describe("wled-studio-shell — structure", () => {
  let el: WledStudioShell;

  afterEach(() => {
    el?.remove();
  });

  it("registers under the contract tag", () => {
    expect(customElements.get(SHELL_TAG)).toBe(WledStudioShell);
  });

  it("renders header, preview, nav, body and brightness slider", async () => {
    el = await mount();
    const root = el.shadowRoot!;
    expect(root.querySelector(".header")).toBeTruthy();
    expect(root.querySelector("wled-geometry-preview")).toBeTruthy();
    // nav element — bottom bar in the default (compact) density.
    expect(
      root.querySelector("md-navigation-bar, md-navigation-drawer")
    ).toBeTruthy();
    // active view element lives inside the body region.
    expect(root.querySelector(".body")).toBeTruthy();
    expect(root.querySelector("md-slider")).toBeTruthy();
  });

  it("renders the active view element once its module is ready", async () => {
    el = await mount({ "default-view": "home" });
    // home composes the (statically-imported) light views; wait for the lazy
    // ensureViewLoaded() resolve + re-render.
    await el.updateComplete;
    await el.updateComplete;
    const body = q(el, ".body");
    expect(body).toBeTruthy();
    // "home" renders segment-controls; before ready a skeleton shows instead.
    expect(
      body!.querySelector("wled-segment-controls, wled-skeleton")
    ).toBeTruthy();
  });

  it("reflects surface/density/default-view to attributes", async () => {
    el = await mount({ surface: "panel", density: "full", "default-view": "color" });
    expect(el.getAttribute("surface")).toBe("panel");
    expect(el.getAttribute("density")).toBe("full");
    expect(el.getAttribute("default-view")).toBe("color");
  });
});

describe("wled-studio-shell — nav reflects visible views", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("compact card nav shows only the light (density:both) primary+more views", async () => {
    el = await mount(); // surface=card, density=auto -> compact
    const bar = q(el, "md-navigation-bar");
    expect(bar).toBeTruthy();
    const tabs = [...el.shadowRoot!.querySelectorAll("md-navigation-tab")];
    const views = tabs.map((t) => t.getAttribute("data-view"));
    // card drops density:"full" items; "paint" (more/both) stays.
    const expected = DEFAULT_NAV.filter((n) => n.density !== "full").map((n) => n.id);
    expect(views).toEqual(expected);
    expect(views).not.toContain("layout");
  });

  it("honors an explicit visibleViews list (order + membership)", async () => {
    el = await mount();
    el.visibleViews = ["scenes", "color", "home"];
    await el.updateComplete;
    const views = [...el.shadowRoot!.querySelectorAll("md-navigation-tab")].map(
      (t) => t.getAttribute("data-view")
    );
    expect(views).toEqual(["scenes", "color", "home"]);
  });
});

describe("wled-studio-shell — density switches the nav element", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("density='full' renders the rail (md-navigation-drawer)", async () => {
    el = await mount({ density: "full" });
    expect(q(el, "md-navigation-drawer")).toBeTruthy();
    expect(q(el, "md-navigation-bar")).toBeNull();
  });

  it("density='compact' renders the bottom bar (md-navigation-bar)", async () => {
    el = await mount({ density: "compact" });
    expect(q(el, "md-navigation-bar")).toBeTruthy();
    expect(q(el, "md-navigation-drawer")).toBeNull();
  });

  it("switching the density attribute swaps the nav element", async () => {
    el = await mount({ density: "compact" });
    expect(q(el, "md-navigation-bar")).toBeTruthy();
    el.setAttribute("density", "full");
    await el.updateComplete;
    expect(q(el, "md-navigation-drawer")).toBeTruthy();
    expect(q(el, "md-navigation-bar")).toBeNull();
  });
});

describe("wled-studio-shell — selecting a nav item changes the active view", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("clicking a compact nav tab updates _nav.view via StudioNavController", async () => {
    el = await mount({ density: "compact", "default-view": "home" });
    const nav = (el as unknown as { _nav: { view: string } })._nav;
    expect(nav.view).toBe("home");

    const colorTab = el.shadowRoot!.querySelector<HTMLElement>(
      'md-navigation-tab[data-view="color"]'
    );
    expect(colorTab).toBeTruthy();
    colorTab!.click();
    await el.updateComplete;
    expect(nav.view).toBe("color");
  });

  it("clicking a full-rail item updates _nav.view", async () => {
    el = await mount({ density: "full", "default-view": "home" });
    const nav = (el as unknown as { _nav: { view: string } })._nav;
    const rail = el.shadowRoot!.querySelectorAll<HTMLElement>(".rail-item");
    // pick the second rail item (color) and click it.
    const labels = [...rail].map((r) => r.textContent?.trim());
    const colorIdx = labels.findIndex((l) => l === "Color");
    expect(colorIdx).toBeGreaterThanOrEqual(0);
    rail[colorIdx].click();
    await el.updateComplete;
    expect(nav.view).toBe("color");
  });

  it("normalizes a default-view that is not visible to the first visible id", async () => {
    // "layout" is density:"full" so the card (compact, default visibleViews)
    // drops it; the nav controller must redirect to the first visible view.
    el = await mount({ surface: "card", density: "compact", "default-view": "layout" });
    const nav = (el as unknown as { _nav: { view: string } })._nav;
    expect(nav.view).not.toBe("layout");
    expect(nav.view).toBe("home"); // first visible id for the default card nav
  });
});

describe("wled-studio-shell — Material You discipline", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("never sets a --md-sys-color-* custom property on host.style", async () => {
    el = await mount();
    // Exercise the accent path: a selected colored segment must tint ONLY the
    // scoped --wled-led-accent, never the full M3 scheme on the host.
    (el as unknown as {
      _selection: { setSegments(s: unknown[]): void; selectSegment(id: number): void };
      _refreshAccent(): void;
    })._selection.setSegments([{ id: 0, col: [[255, 87, 34]] }]);
    (el as unknown as {
      _selection: { selectSegment(id: number): void };
    })._selection.selectSegment(0);
    (el as unknown as { _refreshAccent(): void })._refreshAccent();
    await el.updateComplete;

    for (const role of M3_COLOR_ROLE_TOKEN_NAMES) {
      expect(el.style.getPropertyValue(role)).toBe("");
    }
  });
});

// --- (a) PAINT ROUTING -----------------------------------------------------
describe("wled-studio-shell — preview <-> paint routing", () => {
  let el: WledStudioShell;
  afterEach(() => {
    el?.remove();
    vi.restoreAllMocks();
  });

  /**
   * Mount on the paint view and wait for the heavy view-paint module + bind.
   * Uses density='full' (left rail) to avoid an unrelated md-navigation-bar
   * activeIndex-out-of-bounds warning under jsdom slot timing.
   */
  async function mountPaint(): Promise<WledStudioShell> {
    const node = new WledStudioShell();
    node.setAttribute("density", "full");
    node.setAttribute("default-view", "paint");
    node.visibleViews = ["paint"];
    document.body.appendChild(node);
    await node.updateComplete;
    await node.updateComplete;
    // ensureViewLoaded("paint") resolves the dynamic import async; flush it.
    await new Promise((r) => setTimeout(r, 20));
    await node.updateComplete;
    return node;
  }

  it("binds the shared preview to the paint panel and routes paint-stroke into it", async () => {
    const bindSpy = vi.spyOn(WledViewPaint.prototype, "bindExternalPreview");
    const strokeSpy = vi.spyOn(
      WledViewPaint.prototype,
      "handleExternalPaintStroke"
    );

    el = await mountPaint();

    // The paint panel mounted and the shell handed it the shared preview.
    const panel = el.shadowRoot!.querySelector("wled-view-paint");
    expect(panel).toBeTruthy();
    expect(bindSpy).toHaveBeenCalled();
    const boundArg = bindSpy.mock.calls[0][0] as WledGeometryPreview;
    expect(boundArg?.tagName.toLowerCase()).toBe("wled-geometry-preview");

    // A stroke painted on the preview reaches the panel via handleExternalPaintStroke.
    const preview = el.shadowRoot!.querySelector("wled-geometry-preview")!;
    preview.dispatchEvent(
      new CustomEvent("paint-stroke", {
        detail: { led: 5, leds: [4, 5, 6] },
        bubbles: true,
        composed: true,
      })
    );
    expect(strokeSpy).toHaveBeenCalledTimes(1);
    const ev = strokeSpy.mock.calls[0][0] as CustomEvent<{ leds: number[] }>;
    expect(ev.detail.leds).toEqual([4, 5, 6]);
  });

  it("sources preview paint props (brushSize/externalLive/paintLivePreview) from the panel", async () => {
    el = await mountPaint();
    const preview = el.shadowRoot!.querySelector<WledGeometryPreview>(
      "wled-geometry-preview"
    )!;
    const panel = el.shadowRoot!.querySelector<WledViewPaint>("wled-view-paint")!;
    expect(preview.paintMode).toBe(true);
    // Default color brush => external live (panel feeds buffer, not WS stream).
    expect(preview.externalLive).toBe(panel.paintExternalLive);
    expect(preview.paintLivePreview).toBe(panel.paintLivePreview);
    expect(preview.paintBrushSize).toBe(panel.brushSize);
  });

  it("cancels a live paint session when navigation leaves the paint view", async () => {
    const cancelSpy = vi.spyOn(WledViewPaint.prototype, "cancelLiveIfActive");
    el = await mountPaint();
    el.visibleViews = ["paint", "color"];
    await el.updateComplete;

    (el as unknown as { _selectView(id: string): void })._selectView("color");
    await el.updateComplete;

    expect((el as unknown as { _nav: { view: string } })._nav.view).toBe("color");
    expect(cancelSpy).toHaveBeenCalled();
  });

  it("_onPaintConfigChange re-syncs (requests a re-render of the preview props)", async () => {
    el = await mountPaint();
    const before = el.shadowRoot!.querySelector<WledGeometryPreview>(
      "wled-geometry-preview"
    )!;
    // Drive the config-change handler the registry wires to the panel.
    (el as unknown as { _onPaintConfigChange(): void })._onPaintConfigChange();
    await el.updateComplete;
    const after = el.shadowRoot!.querySelector<WledGeometryPreview>(
      "wled-geometry-preview"
    )!;
    // The preview is still present and still in paint mode after the re-sync.
    expect(after).toBe(before);
    expect(after.paintMode).toBe(true);
  });
});

// --- (b) BOOT FLICKER ------------------------------------------------------
describe("wled-studio-shell — no boot-skeleton flicker for light views", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("paints the default (light) view's REAL content on the FIRST render — no skeleton", async () => {
    // First synchronous render only: do NOT await extra microtasks, so we
    // observe what the user sees on the very first paint.
    el = new WledStudioShell();
    el.setAttribute("default-view", "home");
    document.body.appendChild(el);
    await el.updateComplete; // a single update cycle

    const body = el.shadowRoot!.querySelector(".body")!;
    // home is a light, statically-imported view => real content immediately.
    expect(body.querySelector("wled-segment-controls")).toBeTruthy();
    expect(body.querySelector("wled-skeleton")).toBeNull();
  });

  it("a light view never shows the skeleton even before extra update cycles", async () => {
    el = new WledStudioShell();
    el.setAttribute("default-view", "color");
    document.body.appendChild(el);
    await el.updateComplete;
    const body = el.shadowRoot!.querySelector(".body")!;
    expect(body.querySelector("wled-skeleton")).toBeNull();
    expect(body.querySelector("wled-segment-controls")).toBeTruthy();
  });
});

// --- (c) DENSITY via CONTAINER QUERY ---------------------------------------
describe("wled-studio-shell — density is a pure-CSS container query", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("density='auto' renders BOTH nav variants (bar + rail) for the container query to toggle", async () => {
    el = await mount(); // density defaults to auto
    expect(el.density).toBe("auto");
    const root = el.shadowRoot!;
    expect(root.querySelector("md-navigation-bar")).toBeTruthy();
    expect(root.querySelector("md-navigation-drawer")).toBeTruthy();
    // both are rendered concurrently inside their CSS-toggled slots.
    expect(root.querySelector(".bar-slot md-navigation-bar")).toBeTruthy();
    expect(root.querySelector(".rail-slot md-navigation-drawer")).toBeTruthy();
  });

  it("uses an @container (NOT a viewport @media) query, with NO getBoundingClientRect width branch", () => {
    // The compiled styles must drive density off `@container wled-studio` and
    // must not contain a viewport width media query for layout density.
    const cssText = (
      WledStudioShell as unknown as { styles: Array<{ cssText?: string }> }
    ).styles
      .map((s) => s.cssText ?? "")
      .join("\n");
    expect(cssText).toContain("@container wled-studio (min-width: 600px)");
    // no viewport width media query (color-scheme/prefers-* are allowed).
    expect(cssText).not.toMatch(/@media[^{]*\bmin-width\b/);

    // and the source no longer measures the DOM for density.
    const src = WledStudioShell.prototype.constructor.toString();
    expect(src).not.toContain("getBoundingClientRect");
  });

  it("resizing the container does NOT trigger a JS re-render (no width measurement to react to)", async () => {
    el = await mount();
    const renderSpy = vi.spyOn(
      el as unknown as { requestUpdate(): void },
      "requestUpdate"
    );
    // Simulate a container resize. With pure-CSS density there is no
    // ResizeObserver / width read, so the shell schedules no update.
    el.dispatchEvent(new Event("resize"));
    window.dispatchEvent(new Event("resize"));
    await Promise.resolve();
    expect(renderSpy).not.toHaveBeenCalled();
    renderSpy.mockRestore();
  });
});

// --- (e) NAV THEMING + WIDE-LAYOUT CAP (layout & responsiveness polish) -----
describe("wled-studio-shell — M3 nav theming + wide-layout cap", () => {
  /** Compiled static styles for token/selector assertions. */
  function compiledCss(): string {
    return (WledStudioShell as unknown as { styles: Array<{ cssText?: string }> })
      .styles.map((s) => s.cssText ?? "")
      .join("\n");
  }

  it("pins the nav container tokens to the M3 scheme so dark mode is never white", () => {
    const css = compiledCss();
    // The drawer's stock container-color defaults to #fff — it MUST be themed
    // off our scheme (transparent so the .glass surface shows through).
    expect(css).toContain("--md-navigation-drawer-container-color: transparent");
    expect(css).toContain("--md-navigation-bar-container-color: transparent");
    // No raw white literal leaks into the nav container theming.
    expect(css).not.toMatch(/--md-navigation-[a-z-]*container-color:\s*#fff/i);
    // Active indicator + on-surface roles wired from --md-sys-color-* (whitespace
    // between the property and its var() is irrelevant — match loosely).
    expect(css).toMatch(
      /--md-navigation-bar-active-indicator-color:\s*var\(\s*--md-sys-color-secondary-container/
    );
    expect(css).toMatch(
      /--md-navigation-bar-inactive-icon-color:\s*var\(\s*--md-sys-color-on-surface-variant/
    );
  });

  it("caps AND centers the full-density row so it never stretches edge-to-edge or pools dead space", () => {
    const css = compiledCss();
    // Explicit full density caps + centers the whole rail+content row (and the
    // header), not just the main column — so the row stays balanced/centered.
    expect(css).toMatch(/\.shell\.is-full \.layout[\s\S]*?max-width/);
    expect(css).toMatch(/\.shell\.is-full \.(layout|header)[\s\S]*?margin-inline:\s*auto/);
    // The wide auto layout caps + centers it inside the @container query (NOT a
    // viewport media query — container queries only).
    expect(css).toContain("@container wled-studio (min-width: 600px)");
    expect(css).toMatch(/\.shell\.is-auto \.layout[\s\S]*?max-width/);
    expect(css).not.toMatch(/@media[^{]*\bmin-width\b/);
  });

  it("the full-rail host carries a fixed width so the row stays balanced", () => {
    const css = compiledCss();
    expect(css).toMatch(/\.nav-rail\s*{[^}]*width:\s*var\(--wled-rail-width/);
    // and the drawer's stock 360px container width is overridden to match.
    expect(css).toContain("--md-navigation-drawer-container-width: var(--wled-rail-width");
  });
});

// --- (d) default_view ------------------------------------------------------
describe("wled-studio-shell — default_view seeds the active view", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("the ACTIVE view equals default_view after mount (not the construction-time field default)", async () => {
    el = await mount({ "default-view": "scenes" });
    const nav = (el as unknown as { _nav: { view: string } })._nav;
    expect(el.defaultView).toBe("scenes");
    expect(nav.view).toBe("scenes");
  });

  it("a default_view hidden by visibleViews falls back to the first visible id", async () => {
    el = new WledStudioShell();
    el.visibleViews = ["color", "effects"]; // 'home' default not visible
    el.setAttribute("default-view", "segments"); // also not visible
    document.body.appendChild(el);
    await el.updateComplete;
    const nav = (el as unknown as { _nav: { view: string } })._nav;
    expect(nav.view).toBe("color");
  });
});

// --- de-vacuous existing wiring --------------------------------------------
describe("wled-studio-shell — exercises nav-activate / header / preview wiring", () => {
  let el: WledStudioShell;
  afterEach(() => el?.remove());

  it("_onNavActivate (md-navigation-bar activeIndex) drives the active view", async () => {
    el = await mount({ density: "compact", "default-view": "home" });
    const nav = (el as unknown as { _nav: { view: string } })._nav;
    const bar = el.shadowRoot!.querySelector<HTMLElement & { activeIndex?: number }>(
      "md-navigation-bar"
    )!;
    // The visible order is DEFAULT_NAV non-full: index 1 === "color".
    bar.activeIndex = 1;
    bar.dispatchEvent(
      new CustomEvent("navigation-bar-activated", { bubbles: true })
    );
    await el.updateComplete;
    expect(nav.view).toBe("color");
  });

  it("the header shows the controller title, power button and (card) expand FAB", async () => {
    el = await mount({ surface: "card" });
    el.controller = "Cloud";
    await el.updateComplete;
    const header = el.shadowRoot!.querySelector(".header")!;
    expect(header.querySelector(".title")!.textContent).toContain("Cloud");
    expect(header.querySelector("md-icon-button")).toBeTruthy(); // power
    expect(header.querySelector("md-fab.expand-fab")).toBeTruthy(); // card-only expand
  });

  it("the panel surface header omits the expand FAB", async () => {
    el = await mount({ surface: "panel" });
    const header = el.shadowRoot!.querySelector(".header")!;
    expect(header.querySelector("md-fab.expand-fab")).toBeNull();
  });

  it("previewHeight flows into the geometry preview (.heightPx + --wled-preview-height)", async () => {
    el = await mount();
    el.previewHeight = 321;
    await el.updateComplete;
    const preview = el.shadowRoot!.querySelector<WledGeometryPreview>(
      "wled-geometry-preview"
    )!;
    expect(preview.heightPx).toBe(321);
    expect(preview.getAttribute("style")).toContain("--wled-preview-height: 321px");
  });
});
