import { describe, expect, it } from "vitest";
import {
  DEFAULT_NAV,
  navItem,
  visibleNav,
  type NavItem,
  type ViewId,
} from "../src/core/nav-manifest.js";

describe("nav-manifest DEFAULT_NAV", () => {
  it("contains the expected ids in canonical order", () => {
    const ids = DEFAULT_NAV.map((item) => item.id);
    expect(ids).toEqual([
      "home",
      "color",
      "effects",
      "scenes",
      "segments",
      "paint",
      "layout",
      "audio",
      "voice",
      "schedules",
      "devices",
      "controller",
      "settings",
      "firmware",
    ]);
  });

  it("every item has label, mdi icon, group and density tags", () => {
    for (const item of DEFAULT_NAV) {
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.icon).toMatch(/^mdi:/);
      expect(["primary", "more"]).toContain(item.group);
      expect(["both", "full"]).toContain(item.density);
    }
  });

  it("starts with home as the WLED+ aggregate primary view", () => {
    expect(DEFAULT_NAV[0]).toMatchObject({
      id: "home",
      group: "primary",
      density: "both",
    });
  });

  it("tags color/effects/scenes/segments/paint as the light card views", () => {
    const lightCardViews: ViewId[] = [
      "color",
      "effects",
      "scenes",
      "segments",
      "paint",
    ];
    for (const id of lightCardViews) {
      const item = navItem(id);
      expect(item, `expected ${id} in manifest`).toBeDefined();
      expect(item!.density, `${id} should be density:both`).toBe("both");
    }
  });

  it("merges card MODE_TABS (color/effects/scenes/segments/paint) as available views", () => {
    // These come from today's card; the merge must preserve them.
    expect(navItem("color")).toBeDefined();
    expect(navItem("effects")).toBeDefined();
    expect(navItem("scenes")).toBeDefined();
    expect(navItem("segments")).toBeDefined();
    expect(navItem("paint")).toBeDefined();
  });

  it("tags the heavy panel views as density:full overflow items", () => {
    const heavyViews: ViewId[] = [
      "layout",
      "audio",
      "voice",
      "schedules",
      "devices",
      "controller",
      "settings",
      "firmware",
    ];
    for (const id of heavyViews) {
      const item = navItem(id);
      expect(item, `expected ${id} in manifest`).toBeDefined();
      expect(item!.density, `${id} should be density:full`).toBe("full");
      expect(item!.group, `${id} should be group:more`).toBe("more");
    }
  });

  it("places color/effects/scenes/segments in group:primary", () => {
    for (const id of ["color", "effects", "scenes", "segments"] as ViewId[]) {
      expect(navItem(id)!.group).toBe("primary");
    }
  });

  it("places paint in group:more (overflow) but density:both", () => {
    const paint = navItem("paint")!;
    expect(paint.group).toBe("more");
    expect(paint.density).toBe("both");
  });
});

describe("navItem", () => {
  it("returns the NavItem for a known id", () => {
    expect(navItem("scenes")).toMatchObject({ id: "scenes", label: "Scenes" });
  });

  it("returns undefined for an unknown id", () => {
    // Cast through unknown — exercising the runtime drop path.
    expect(navItem("nope" as unknown as ViewId)).toBeUndefined();
  });
});

describe("visibleNav", () => {
  it("respects the given order of an explicit list", () => {
    const result = visibleNav(["scenes", "color"]);
    expect(result.map((i) => i.id)).toEqual(["scenes", "color"]);
  });

  it("returns full NavItem objects for the explicit list", () => {
    const result = visibleNav(["scenes", "color"]);
    expect(result).toEqual<NavItem[]>([
      navItem("scenes")!,
      navItem("color")!,
    ]);
  });

  it("drops unknown ids from an explicit list", () => {
    const result = visibleNav([
      "color",
      "bogus" as unknown as ViewId,
      "effects",
    ]);
    expect(result.map((i) => i.id)).toEqual(["color", "effects"]);
  });

  it("honors explicit density:full views even on a card surface", () => {
    // Explicitly listed => kept regardless of density (caller asked for it).
    const result = visibleNav(["color", "layout"], "card");
    expect(result.map((i) => i.id)).toEqual(["color", "layout"]);
  });

  it("on surface=card with no list, omits density:full items", () => {
    const result = visibleNav(undefined, "card");
    const ids = result.map((i) => i.id);
    expect(ids).toEqual(["home", "color", "effects", "scenes", "segments", "paint"]);
    expect(ids).not.toContain("layout");
    expect(ids).not.toContain("audio");
    expect(ids).not.toContain("firmware");
  });

  it("defaults surface to card when omitted", () => {
    expect(visibleNav()).toEqual(visibleNav(undefined, "card"));
  });

  it("on surface=panel with no list, returns the full DEFAULT_NAV order", () => {
    const result = visibleNav(undefined, "panel");
    expect(result.map((i) => i.id)).toEqual(DEFAULT_NAV.map((i) => i.id));
  });

  it("is pure — does not mutate DEFAULT_NAV", () => {
    const before = DEFAULT_NAV.map((i) => i.id);
    const out = visibleNav(undefined, "panel");
    out.reverse();
    expect(DEFAULT_NAV.map((i) => i.id)).toEqual(before);
  });
});
