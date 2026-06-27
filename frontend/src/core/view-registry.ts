/**
 * core/view-registry.ts — viewId -> lazy render thunk.
 *
 * The registry is the ONLY place that decides eager-vs-lazy loading for a view.
 * It keeps the heavy views (Konva layout designer, audio FFT, paint canvas,
 * firmware/devices/settings/voice/schedules/controller) OUT of the card's
 * critical path so that the card bundle eagerly pulls only the light views
 * (color / effects / scenes / segments / home).
 *
 * How the split works:
 *  - Light views are STATICALLY imported at the top of this module. They ride
 *    along with the card bundle (they are already part of the card today).
 *  - Heavy views are loaded via dynamic `import()` INSIDE {@link ensureViewLoaded}.
 *    Because the registry never top-level-imports those modules, Phase-3
 *    `manualChunks` ("wled-studio-core") can split them out of the card bundle.
 *    The shell calls `ensureViewLoaded(id)` (which resolves the import) before
 *    rendering the thunk, showing a <wled-skeleton> until the import settles.
 *
 * Constraints honored:
 *  - Thunks never declare `--md-sys-color-*`; they consume token roles from
 *    styles/tokens.ts via the view elements themselves.
 *  - Every view element already extends BasePoweredElement + registers via
 *    safeCustomElement, so importing a module is enough to define its tag.
 *  - Thunks reproduce the existing card templates verbatim (same props/events
 *    as wled-studio-card._renderTabPanel) — see V2_REDESIGN_PLAN Phase 4.
 */

import { html, type TemplateResult } from "lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { Connection } from "home-assistant-js-websocket";
import type { WledSegment } from "../api/wled-state.js";
import type { ViewId } from "./nav-manifest.js";

// --- Light views: statically imported (ship with the card critical path). ---
import "../components/segment-controls.js";
import "../panel/view-effects.js";
import "../panel/view-scenes.js";

/**
 * Everything a thunk needs to render a view. The shell wires this up from its
 * own resolved state and event handlers (reusing the existing card handlers
 * verbatim), so the views behave identically whether hosted by the card or the
 * shell.
 */
export interface ViewRenderContext {
  hass?: HomeAssistant;
  connection?: Connection;
  controllerId: string;
  masterEntity: string;
  layoutId: string;
  fixtureId: string;
  pixelCount: number;
  selectedSegId: number;
  highlightSegIds: number[];
  segments: WledSegment[];
  /** Resolved density (never "auto") — views adapt their sub-layout. */
  density: "compact" | "full";
  /** `=== density === "compact"`; convenience for existing `compact` props. */
  compact: boolean;
  // Event handlers the shell wires (reuse existing card handlers verbatim):
  onSegmentChange: (ev: CustomEvent) => void;
  onSegmentTargetsChanged: (ev: CustomEvent) => void;
  onPaintConfigChange: (ev: CustomEvent) => void;
}

/** A view's render function: pure given a context, returns a Lit template. */
export type ViewRenderThunk = (ctx: ViewRenderContext) => TemplateResult;

/**
 * Heavy view module loaders. Each is a dynamic `import()` thunk so the module
 * is NOT in the import graph at module-eval time — this is what lets the build
 * split them into a separate chunk. Importing the module is enough to define
 * the element's custom tag (safeCustomElement runs as a side effect).
 *
 * Light views (color / effects / scenes / segments / home) are intentionally
 * absent: they are statically imported above and need no async load.
 */
const HEAVY_LOADERS: Partial<Record<ViewId, () => Promise<unknown>>> = {
  paint: () => import("../panel/view-paint.js"),
  layout: () => import("../panel/view-layout.js"),
  audio: () => import("../panel/view-audio.js"),
  voice: () => import("../panel/view-voice.js"),
  schedules: () => import("../panel/view-schedules.js"),
  devices: () => import("../panel/view-devices.js"),
  controller: () => import("../panel/view-firmware.js"),
  settings: () => import("../panel/view-settings.js"),
  firmware: () => import("../panel/view-firmware.js"),
};

/**
 * Idempotent per-id promise cache. The first call to {@link ensureViewLoaded}
 * for an id starts (and stores) the import; later calls return the SAME
 * promise, so the module is fetched/evaluated at most once.
 */
const loadCache = new Map<ViewId, Promise<void>>();

/**
 * True when `id` is a LIGHT view — statically imported above, so its element is
 * defined synchronously at module-eval time and it can render its real content
 * on the very first paint (no boot skeleton flicker). A view is light iff it has
 * no entry in {@link HEAVY_LOADERS}. The shell uses this to decide whether to
 * show a `<wled-skeleton>` placeholder (heavy, not-yet-loaded) or render
 * immediately (light, already ready).
 */
export function isViewLight(id: ViewId): boolean {
  return !(id in HEAVY_LOADERS);
}

/**
 * Ensure the heavy module backing `id` is loaded before its thunk renders.
 *
 * Light views resolve immediately (they are statically imported). Heavy views
 * go through their dynamic `import()` loader. Idempotent: the in-flight/settled
 * promise is cached per id, so `ensureViewLoaded("paint")` called twice resolves
 * the underlying import only once.
 */
export function ensureViewLoaded(id: ViewId): Promise<void> {
  const cached = loadCache.get(id);
  if (cached) return cached;

  const loader = HEAVY_LOADERS[id];
  // Light views (and unknown ids) have no heavy loader: nothing to fetch.
  const promise: Promise<void> = loader
    ? loader().then(() => undefined)
    : Promise.resolve();

  loadCache.set(id, promise);
  return promise;
}

// --- View thunks: reproduce the existing card/panel templates verbatim. ----

const renderColor: ViewRenderThunk = (ctx) => html`
  <wled-segment-controls
    class="tab-panel"
    .hass=${ctx.hass}
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
    .masterEntity=${ctx.masterEntity}
    .selectedSegId=${ctx.selectedSegId}
    compact
    hideSegmentBrightness
    @segment-change=${ctx.onSegmentChange}
    @segment-targets-changed=${ctx.onSegmentTargetsChanged}
  ></wled-segment-controls>
`;

const renderSegments: ViewRenderThunk = (ctx) => html`
  <wled-segment-controls
    class="tab-panel"
    .hass=${ctx.hass}
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
    .masterEntity=${ctx.masterEntity}
    .selectedSegId=${ctx.selectedSegId}
    compact
    @segment-change=${ctx.onSegmentChange}
    @segment-targets-changed=${ctx.onSegmentTargetsChanged}
  ></wled-segment-controls>
`;

const renderEffects: ViewRenderThunk = (ctx) => html`
  <wled-view-effects
    class="tab-panel"
    compact
    .hass=${ctx.hass}
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
    @segment-targets-changed=${ctx.onSegmentTargetsChanged}
  ></wled-view-effects>
`;

const renderScenes: ViewRenderThunk = (ctx) => html`
  <wled-view-scenes
    class="tab-panel"
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
    compact
  ></wled-view-scenes>
`;

const renderPaint: ViewRenderThunk = (ctx) => html`
  <wled-view-paint
    class="tab-panel"
    embed-mode
    .connection=${ctx.connection}
    .hass=${ctx.hass}
    .controllerId=${ctx.controllerId}
    .embedLayoutId=${ctx.layoutId}
    .embedFixtureId=${ctx.fixtureId}
    .embedPixelCount=${ctx.pixelCount}
    @paint-config-change=${ctx.onPaintConfigChange}
  ></wled-view-paint>
`;

/**
 * The WLED+ Home aggregate. The geometry preview already lives in the shell,
 * so this composite renders the color/wheel surface (segment controls) and the
 * top-scenes row beneath it. Both are light, statically-imported views.
 */
const renderHome: ViewRenderThunk = (ctx) => html`
  <wled-segment-controls
    class="tab-panel"
    .hass=${ctx.hass}
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
    .masterEntity=${ctx.masterEntity}
    .selectedSegId=${ctx.selectedSegId}
    compact
    hideSegmentBrightness
    @segment-change=${ctx.onSegmentChange}
    @segment-targets-changed=${ctx.onSegmentTargetsChanged}
  ></wled-segment-controls>
  <wled-view-scenes
    class="tab-panel"
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
    compact
  ></wled-view-scenes>
`;

// --- Heavy panel-view thunks (mirror wled-studio-panel._renderView). -------

const renderLayout: ViewRenderThunk = (ctx) => html`
  <wled-view-layout
    .connection=${ctx.connection}
    .hass=${ctx.hass}
    .controllerId=${ctx.controllerId}
  ></wled-view-layout>
`;

const renderAudio: ViewRenderThunk = (ctx) => html`
  <wled-view-audio
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
  ></wled-view-audio>
`;

const renderVoice: ViewRenderThunk = (ctx) => html`
  <wled-view-voice
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
    .masterEntity=${ctx.masterEntity}
  ></wled-view-voice>
`;

const renderSchedules: ViewRenderThunk = (ctx) => html`
  <wled-view-schedules
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
  ></wled-view-schedules>
`;

const renderDevices: ViewRenderThunk = (ctx) => html`
  <wled-view-devices .connection=${ctx.connection}></wled-view-devices>
`;

const renderController: ViewRenderThunk = (ctx) => html`
  <wled-view-firmware
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
  ></wled-view-firmware>
`;

const renderSettings: ViewRenderThunk = (ctx) => html`
  <wled-view-settings
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
  ></wled-view-settings>
`;

const renderFirmware: ViewRenderThunk = (ctx) => html`
  <wled-view-firmware
    .connection=${ctx.connection}
    .controllerId=${ctx.controllerId}
  ></wled-view-firmware>
`;

/**
 * The registry: viewId -> render thunk. Every {@link ViewId} has an entry.
 * The shell selects a thunk by the active view, having already awaited
 * {@link ensureViewLoaded} for heavy ids.
 */
export const VIEW_REGISTRY: Record<ViewId, ViewRenderThunk> = {
  home: renderHome,
  color: renderColor,
  effects: renderEffects,
  scenes: renderScenes,
  segments: renderSegments,
  paint: renderPaint,
  layout: renderLayout,
  audio: renderAudio,
  voice: renderVoice,
  schedules: renderSchedules,
  devices: renderDevices,
  controller: renderController,
  settings: renderSettings,
  firmware: renderFirmware,
};

/**
 * Render a view by id. Returns `VIEW_REGISTRY[id](ctx)`. The shell is expected
 * to have called {@link ensureViewLoaded} first (in willUpdate/updated when the
 * active view changes) so a heavy view's element is defined before its thunk
 * runs; otherwise the element renders as an undefined custom element until its
 * module settles.
 */
export function renderView(id: ViewId, ctx: ViewRenderContext): TemplateResult {
  return VIEW_REGISTRY[id](ctx);
}
