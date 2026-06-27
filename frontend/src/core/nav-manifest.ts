/**
 * core/nav-manifest.ts — SINGLE source of truth for studio views.
 *
 * Pure data + pure helpers (no DOM, no token declarations). Merges today's
 * card MODE_TABS (color/effects/scenes/segments/paint) with the panel's
 * PRIMARY_NAV + MORE_NAV so the card and the panel render their navigation
 * from ONE manifest (Phase 5 reuse). "home" is the WLED+ Home aggregate
 * (master + wheel + top scenes + preview) and is the card's default view.
 *
 * Constraints honored:
 *  - No `--md-sys-color-*` declared here (this module is pure data; surfaces
 *    consume tokens from styles/tokens.ts elsewhere).
 *  - `visibleNav` is pure & order-preserving so it is unit-testable.
 */

/** Canonical view identifiers. The shell, card and panel all key off these. */
export type ViewId =
  | "home"
  | "color"
  | "effects"
  | "scenes"
  | "segments"
  | "paint"
  | "layout"
  | "audio"
  | "voice"
  | "schedules"
  | "devices"
  | "controller"
  | "settings"
  | "firmware";

/**
 * Navigation grouping:
 *  - `primary` => compact bottom-bar / rail top section
 *  - `more`    => overflow ("More" sheet on compact, lower rail section on full)
 */
export type NavGroup = "primary" | "more";

export interface NavItem {
  readonly id: ViewId;
  /** Human label ("Color"). */
  readonly label: string;
  /** mdi:* icon name (matches existing PRIMARY_NAV / MORE_NAV). */
  readonly icon: string;
  /** primary|more — drives bottom-bar vs overflow + rail section. */
  readonly group: NavGroup;
  /**
   * "full" = panel/wide-only (heavy views never shown on a compact card by
   * default); "both" = available in compact + full surfaces.
   */
  readonly density: "both" | "full";
}

/**
 * The single manifest of views. Order here is the canonical render order.
 *
 * Merge map:
 *  - card MODE_TABS  -> color, effects, scenes, segments, paint (density "both")
 *  - panel PRIMARY/MORE_NAV -> layout, audio, voice, schedules, devices,
 *    controller, settings, firmware (heavy, density "full")
 *  - "home" is added as the new card default aggregate view.
 */
export const DEFAULT_NAV: readonly NavItem[] = [
  { id: "home", label: "Home", icon: "mdi:home-variant", group: "primary", density: "both" },
  { id: "color", label: "Color", icon: "mdi:palette", group: "primary", density: "both" },
  { id: "effects", label: "Effects", icon: "mdi:animation-play", group: "primary", density: "both" },
  { id: "scenes", label: "Scenes", icon: "mdi:palette-swatch", group: "primary", density: "both" },
  { id: "segments", label: "Segments", icon: "mdi:vector-line", group: "primary", density: "both" },
  { id: "paint", label: "Paint", icon: "mdi:brush", group: "more", density: "both" },
  { id: "layout", label: "Layout", icon: "mdi:vector-polygon", group: "more", density: "full" },
  { id: "audio", label: "Audio", icon: "mdi:music", group: "more", density: "full" },
  { id: "voice", label: "Voice", icon: "mdi:microphone-message", group: "more", density: "full" },
  { id: "schedules", label: "Schedules", icon: "mdi:clock-outline", group: "more", density: "full" },
  { id: "devices", label: "Devices", icon: "mdi:devices", group: "more", density: "full" },
  { id: "controller", label: "Controller", icon: "mdi:web", group: "more", density: "full" },
  { id: "settings", label: "Settings", icon: "mdi:cog", group: "more", density: "full" },
  { id: "firmware", label: "Firmware", icon: "mdi:chip", group: "more", density: "full" },
] as const;

/** O(n) lookup of a NavItem by id. Returns undefined for unknown ids. */
export function navItem(id: ViewId): NavItem | undefined {
  return DEFAULT_NAV.find((item) => item.id === id);
}

/**
 * Resolve the visible navigation for a surface.
 *
 *  1. if `visibleViews` provided: map ids -> NavItem in the GIVEN order,
 *     dropping unknown ids (explicitly-listed items are kept regardless of
 *     density — the caller asked for them);
 *  2. else: start from DEFAULT_NAV;
 *  3. on `surface === "card"` drop `density === "full"` items by default
 *     (the card stays light per bundle budget) — this only applies to the
 *     DEFAULT_NAV path, since an explicit `visibleViews` list is honored as-is.
 *
 * Always order-preserving and pure (no DOM) so it is unit-testable.
 */
export function visibleNav(
  visibleViews?: ViewId[],
  surface: "card" | "panel" = "card"
): NavItem[] {
  if (visibleViews) {
    // Explicit list: honor order, drop unknown ids, keep density as listed.
    return visibleViews
      .map((id) => navItem(id))
      .filter((item): item is NavItem => item !== undefined);
  }

  // Default list: on a card, drop heavy (full-only) views per bundle budget.
  if (surface === "card") {
    return DEFAULT_NAV.filter((item) => item.density !== "full");
  }
  return [...DEFAULT_NAV];
}
