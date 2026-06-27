/**
 * core/studio-shell.ts — `<wled-studio-shell>`.
 *
 * The ONE component that renders the studio chrome: header (title + Remote badge
 * + power + expand FAB) → geometry preview → adaptive navigation (compact bottom
 * bar / full left rail) → the active view body → a brightness slider. Card and
 * panel become thin wrappers around it (Phase 4 ships card-on-shell; the panel
 * follows in Phase 5).
 *
 * Design rules honored (see docs/superpowers/specs/2026-06-26-wled-m3-foundation
 * -design.md and docs/v2-handoff/V2_REDESIGN_PLAN.md):
 *  - Built ON the M3 foundation: consumes `--md-sys-color-*` / typescale / shape
 *    via styles/tokens.ts; uses styles/glass.ts for the surface and
 *    styles/state-layer.ts for bespoke controls.
 *  - The shell NEVER declares `--md-sys-color-*` on its host — it inherits the
 *    dashboard's Material You scheme. The only host-scoped color it writes is the
 *    accent-from-LED tint on `--wled-led-accent` (via StudioSessionController).
 *  - HYBRID @material/web: md-slider (brightness), md-navigation-bar (compact) /
 *    md-navigation-drawer (full rail), md-icon-button (power), md-fab (expand) —
 *    only the components actually used are imported (m3/index.ts).
 *  - Density: `surface`/`density` reflect to attributes; `density="auto"` lets a
 *    PURE-CSS `@container wled-studio` query (>= 600px => full rail) decide
 *    compact↔full. Both nav variants are rendered and shown/hidden by the
 *    container query, and the body layout (column vs row) is keyed off the same
 *    query — so resizing the container reflows density with NO JS re-render. NO
 *    `getBoundingClientRect` measurement, NO ResizeObserver, NO viewport media
 *    queries. (Explicit `compact`/`full` still render a single nav element.)
 *  - Off-screen power-down: subscribeLive runs through BasePoweredElement's
 *    lifecycle; streamed brightness writes to md-slider are gated by whenPowered.
 *  - Light views (color/effects/scenes/segments/home) are statically imported
 *    and render their REAL content on first paint (no boot skeleton flicker);
 *    only genuinely-not-yet-loaded HEAVY lazy views show a <wled-skeleton> until
 *    their core/view-registry.ts import settles.
 */

import { css, html, type PropertyValues, type TemplateResult } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { onHaConnectionReady } from "../api/reconnect.js";
import { listControllers, subscribeLive } from "../api/live-stream.js";
import { applyState, fetchDeviceState, type WledSegment } from "../api/wled-state.js";
import { layoutList, type LayoutRecord } from "../api/layout.js";
import { pctTo255, readBrightnessPct } from "../utils/ha-brightness.js";
import { StudioSelectionController } from "./studio-selection.js";
import { StudioSessionController } from "./studio-session.js";
import { StudioNavController } from "./studio-nav.js";
import {
  DEFAULT_NAV,
  navItem,
  visibleNav,
  type NavItem,
  type ViewId,
} from "./nav-manifest.js";
import {
  ensureViewLoaded,
  isViewLight,
  renderView,
  type ViewRenderContext,
} from "./view-registry.js";
import type { WledViewPaint } from "../panel/view-paint.js";
import { glassStyles, type GlassSurface } from "../styles/glass.js";
import { stateLayerStyles } from "../styles/state-layer.js";
import { whenPowered } from "../components/m3/index.js";
import "../components/geometry-preview.js";
import "../components/wled-skeleton.js";
import type { WledGeometryPreview } from "../components/geometry-preview.js";

export const SHELL_TAG = "wled-studio-shell";

/** Surface tier names accepted by the `surface` host attribute. */
export type WledStudioShellSurface = GlassSurface;

/** Density modes; `auto` defers to the container-query breakpoint. */
export type WledStudioShellDensity = "compact" | "full" | "auto";

/**
 * `<wled-studio-shell>` — the self-contained studio surface.
 *
 * Props mirror the frozen shell contract exactly:
 *  - surface / density / defaultView reflect to attributes (CSS + container-query
 *    density);
 *  - visibleViews / controller / layoutId / previewHeight / hass / connection are
 *    `@property({ attribute: false })` (hass is inherited from BasePoweredElement).
 */
@safeCustomElement(SHELL_TAG)
export class WledStudioShell extends BasePoweredElement {
  /** card | panel — drives glass alpha tier + panel-stronger tokens. */
  @property({ reflect: true }) surface: WledStudioShellSurface = "card";
  /** compact | full | auto — `auto` lets the container query decide. */
  @property({ reflect: true }) density: WledStudioShellDensity = "auto";
  /** Initial active view; normalized to a visible view by the nav controller. */
  @property({ reflect: true, attribute: "default-view" }) defaultView: ViewId = "home";

  /** Subset/order of nav ids to show; undefined => DEFAULT_NAV filtered to surface. */
  @property({ attribute: false }) visibleViews?: ViewId[];
  /** Controller name/title/entry_id key (e.g. "Cloud"). */
  @property({ attribute: false }) controller?: string;
  /** Saved layout id/name; defaults to the first layout for the controller. */
  @property({ attribute: false }) layoutId?: string;
  /** Geometry-preview min height (px); the body grows independently. */
  @property({ attribute: false }) previewHeight = 200;
  /** HA Connection; derived from hass.connection when omitted. */
  @property({ attribute: false }) connection?: Connection;

  // --- Resolved session state (mirrors the card's @state). -------------------
  @state() private _controllerId = "";
  @state() private _masterEntity = "";
  @state() private _pixelCount = 210;
  @state() private _layoutId = "";
  @state() private _fixtureId = "";
  @state() private _previewStatus = "connecting";
  @state() private _hint = "";
  /** Optimistic global brightness (0–100) while dragging until HA catches up. */
  @state() private _globalBriPct: number | null = null;
  /** Last non-zero brightness for restore when dragging up from off. */
  @state() private _lastNonZeroBri = 100;
  /**
   * True once the active HEAVY view's module has loaded. Light views are
   * statically imported (ready synchronously) so they ignore this flag entirely
   * — see {@link _renderBody}, which only shows a skeleton for a heavy view whose
   * module has not settled yet. Starts `true` so the (light) default view paints
   * its real content on first render with no boot-skeleton flicker.
   */
  @state() private _viewReady = true;

  @query("wled-geometry-preview") private _preview?: WledGeometryPreview;
  @query("md-slider") private _slider?: HTMLElement & { value: number };
  @query("wled-view-paint") private _paintPanel?: WledViewPaint;

  /** The geometry preview last handed to the paint panel (avoid rebinding). */
  private _boundPaintPreview?: WledViewPaint;
  /** Previous active view — used to fire cancelLiveIfActive() on leaving paint. */
  private _prevView: ViewId = "home";

  private readonly _selection = new StudioSelectionController(this);
  private readonly _session = new StudioSessionController(this);
  private readonly _nav = new StudioNavController<ViewId>(this, {
    initial: this.defaultView,
    normalize: (v) => this._normalizeView(v),
  });

  private _unsubLive?: () => void;
  private _bootstrapGen = 0;
  private _offConnReady?: () => void;
  private _bootstrapControllerKey = "";
  private _loadedViewKey = "";
  /**
   * The nav controller captures `defaultView` at CONSTRUCTION (the field
   * default "home"), before the `default-view` attribute/prop arrives from the
   * card config. This guards a one-time re-seed of the active view from the
   * resolved `defaultView` on its first arrival, BEFORE any user navigation.
   */
  private _defaultViewSeeded = false;

  // --- Selection getters (keep template/handlers reading the same names). ----
  private get _selectedSegId(): number {
    return this._selection.selectedSegId;
  }
  private get _highlightSegIds(): number[] {
    return this._selection.highlightSegIds;
  }
  private get _segments(): WledSegment[] {
    return this._selection.segments;
  }

  /** Active connection (explicit prop wins, else derived from hass). */
  private get _connection(): Connection | undefined {
    return this.connection ?? this.hass?.connection;
  }

  /**
   * Resolve `density` to a concrete tier for the VIEW CONTEXT (which sub-layout
   * a view renders) and nav active-index. Explicit `compact`/`full` map through;
   * `auto` defaults to `"compact"` — the visual compact↔full density is driven
   * PURELY by the `@container wled-studio` query in CSS (both nav variants are
   * rendered and the body layout flips at >= 600px), so this getter never
   * measures the DOM and resizing the container needs NO JS re-render.
   */
  private get _resolvedDensity(): "compact" | "full" {
    if (this.density === "full") return "full";
    return "compact";
  }

  /** Navigation items visible for the current surface/visibleViews. */
  private visibleNav(): NavItem[] {
    return visibleNav(this.visibleViews, this.surface);
  }

  /** Map a requested view to the first visible nav id when it is not visible. */
  private _normalizeView(view: ViewId): ViewId {
    const items = visibleNav(this.visibleViews, this.surface);
    if (items.some((i) => i.id === view)) return view;
    return items[0]?.id ?? view;
  }

  // --- Lifecycle -------------------------------------------------------------

  protected override onPoweredConnect(): void {
    this._bindConnectionReady();
    void this._bootstrap();
  }

  protected override onPoweredDisconnect(): void {
    this._bootstrapGen += 1;
    this._offConnReady?.();
    this._offConnReady = undefined;
    this._unsubLive?.();
    this._unsubLive = undefined;
  }

  protected override willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);

    // Seed the active view from `defaultView` on its FIRST arrival, before any
    // user nav. The nav controller captured the field default ("home") at
    // construction; once the real `default-view` prop lands we adopt it (it is
    // normalized to the first visible view if the default itself is hidden).
    if (!this._defaultViewSeeded && changed.has("defaultView")) {
      this._defaultViewSeeded = true;
      this._nav.select(this.defaultView);
    }

    // Keep the active view valid against the visible set (redirect at the source).
    if (
      changed.has("visibleViews") ||
      changed.has("surface") ||
      changed.has("defaultView")
    ) {
      this._nav.revalidate();
    }
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);

    if (changed.has("hass") && this._globalBriPct !== null) {
      const actual = this._readGlobalBrightnessPct();
      if (actual === 0 || Math.abs(actual - this._globalBriPct) <= 1) {
        this._globalBriPct = null;
      }
    }
    if (changed.has("hass") || changed.has("_globalBriPct")) {
      this._syncGlobalBriToSlider();
    }

    // Lazy-load the active view's module, showing a skeleton until it settles.
    void this._ensureActiveViewLoaded();

    // Wire the shared preview <-> paint panel (bind once both exist; cancel any
    // live paint session when navigation leaves the paint view).
    this._syncPaintWiring();

    if (changed.has("controller") || changed.has("connection")) {
      this._bindConnectionReady();
      void this._bootstrap(true);
      return;
    }
    if (changed.has("hass") && this.hass && !this._controllerId) {
      this._bindConnectionReady();
      void this._bootstrap();
    }
  }

  /**
   * Resolve the module for the active view (idempotent + cached).
   *
   * Light views are statically imported and ready synchronously: we keep
   * `_viewReady = true` so they render their real content immediately (no boot
   * flicker). Only a genuinely-not-yet-loaded HEAVY view flips `_viewReady`
   * false → true, showing a skeleton until its dynamic import settles.
   */
  private async _ensureActiveViewLoaded(): Promise<void> {
    const id = this._nav.view;
    if (this._loadedViewKey === id) return;
    this._loadedViewKey = id;
    if (isViewLight(id)) {
      // Statically imported — already defined; render real content now.
      this._viewReady = true;
      return;
    }
    this._viewReady = false;
    try {
      await ensureViewLoaded(id);
    } finally {
      if (this._loadedViewKey === id) {
        this._viewReady = true;
        this.requestUpdate();
      }
    }
  }

  private _bindConnectionReady(): void {
    const conn = this._connection;
    if (!conn || this._offConnReady) return;
    this._offConnReady = onHaConnectionReady(conn, () => {
      void this._bootstrap();
    });
    this.addUnsub(() => this._offConnReady?.());
  }

  // --- Controller / layout pick (mirror card._pickController/_pickLayout). ----

  private _pickController(
    controllers: Array<Record<string, unknown>>
  ): Record<string, unknown> | undefined {
    const key = (this.controller ?? "").trim();
    if (!key) return controllers[0];
    const lower = key.toLowerCase();
    return (
      controllers.find((c) => {
        const title = String(c.title ?? "");
        const entryId = String(c.entry_id ?? "");
        return (
          entryId === key ||
          title === key ||
          title.toLowerCase().includes(lower) ||
          title.toLowerCase().endsWith(`— ${lower}`) ||
          title.toLowerCase().endsWith(`- ${lower}`)
        );
      }) ?? controllers[0]
    );
  }

  private _pickLayout(layouts: LayoutRecord[]): LayoutRecord | undefined {
    const key = (this.layoutId ?? "").trim();
    if (key) {
      return layouts.find((l) => l.id === key || l.name === key);
    }
    return layouts[0];
  }

  // --- Bootstrap retry-ladder (lifted from the card). ------------------------

  private async _bootstrap(force = false): Promise<void> {
    const conn = this._connection;
    if (!conn) return;
    const controllerKey = (this.controller ?? "").trim();
    if (
      !force &&
      this._controllerId &&
      this._unsubLive &&
      this._bootstrapControllerKey === controllerKey
    ) {
      return;
    }

    const gen = ++this._bootstrapGen;
    if (!this._controllerId) {
      this._hint = "Connecting to WLED Studio…";
      this.requestUpdate();
    }

    const delays = [0, 400, 1200, 2500];
    for (const delay of delays) {
      if (gen !== this._bootstrapGen || !this.isConnected) return;
      if (delay > 0) {
        await new Promise((r) => setTimeout(r, delay));
      }
      try {
        const controllers = await listControllers(conn);
        const pick = this._pickController(controllers);
        if (!pick?.entry_id) {
          if (gen === this._bootstrapGen) {
            this._hint =
              controllers.length === 0
                ? "No WLED Studio controllers found. Add the integration under Settings → Devices & services."
                : "Controller not found in list.";
            this.requestUpdate();
          }
          continue;
        }
        if (gen !== this._bootstrapGen) return;

        this._controllerId = String(pick.entry_id);
        this._masterEntity = String(pick.master_entity_id ?? "");
        this._pixelCount = Number(pick.pixel_count) || 210;
        this._bootstrapControllerKey = controllerKey;
        this._hint = "";
        await this._loadLayout();
        this._startLive();
        void this._loadSegments();
        this.requestUpdate();
        return;
      } catch (err) {
        const lastErr =
          err instanceof Error ? err.message : String(err ?? "unknown");
        if (gen === this._bootstrapGen) {
          this._hint = `Connecting… (${lastErr})`;
          this.requestUpdate();
        }
      }
    }

    if (gen !== this._bootstrapGen) return;
    this._previewStatus = "offline";
    this._preview?.setStatus(this._previewStatus);
    this._hint =
      "WLED Studio is not responding. In Settings → Devices & services, open WLED Studio — Cloud → Reload, then hard-refresh this page (Ctrl+Shift+R).";
    this.requestUpdate();
  }

  private async _loadLayout(): Promise<void> {
    const conn = this._connection;
    if (!conn || !this._controllerId) return;
    try {
      const layouts = await layoutList(conn, this._controllerId);
      const layout = this._pickLayout(layouts);
      if (!layout) {
        this._layoutId = "";
        this._fixtureId = "";
        return;
      }
      this._layoutId = layout.id;
      const first = layout.fixtures[0] as Record<string, unknown> | undefined;
      this._fixtureId = first ? String(first.id ?? "fixture-0") : "fixture-0";
      if (layout.pixel_count) this._pixelCount = layout.pixel_count;
      await this._preview?.refresh();
    } catch {
      this._layoutId = "";
      this._fixtureId = "";
    }
  }

  private _startLive(): void {
    const conn = this._connection;
    if (!conn || !this._controllerId) return;
    const wasLive = this._previewStatus === "live";
    this._unsubLive?.();
    if (!wasLive) {
      this._previewStatus = "connecting";
      this._preview?.setStatus(this._previewStatus);
    }
    this._unsubLive = subscribeLive(
      conn,
      this._controllerId,
      (frame) => {
        this._previewStatus = "live";
        this._preview?.setFrame(frame);
      },
      { remote: this.remote.state.isRemote }
    );
    this.addUnsub(() => this._unsubLive?.());
  }

  private async _loadSegments(): Promise<void> {
    const conn = this._connection;
    if (!conn || !this._controllerId) return;
    try {
      const snap = await fetchDeviceState(conn, this._controllerId);
      const segs = snap.segments ?? [];
      this._selection.setSegments(segs);
      if (segs.length && this._selection.selectedSegId < 0) {
        this._selection.selectSegment(segs[0].id);
      }
      this._refreshAccent();
    } catch {
      /* tap-to-select degrades gracefully */
    }
  }

  // --- Selection + accent (lifted from the card). ----------------------------

  private _onStripSegmentSelect(ev: CustomEvent<{ segmentId: number }>): void {
    if (this._nav.view === "paint") return;
    this._selection.selectSegment(ev.detail.segmentId);
    this._refreshAccent();
  }

  private _onSegmentTargetsChanged = (
    ev: CustomEvent<{
      segmentId: number;
      editIds?: number[];
      highlightIds?: number[];
    }>
  ): void => {
    this._selection.applyTargetsChanged(ev.detail);
  };

  private _onSegmentChange = (
    ev: CustomEvent<{ segmentId: number; editIds?: number[] }>
  ): void => {
    this._selection.applySegmentChange(ev.detail);
    this._refreshAccent();
  };

  /**
   * The paint panel changed brush/mode (or ended a live session). Re-render so
   * the shared preview picks up the panel's new `brushSize` / `paintLivePreview`
   * / `paintExternalLive` (read in {@link _renderPreview}).
   */
  private _onPaintConfigChange = (): void => {
    this.requestUpdate();
  };

  /**
   * Connect the embedded paint panel to the shared geometry preview, and tear
   * down a live paint session when navigation leaves the paint view.
   *
   *  - On entering paint: once BOTH the `wled-view-paint` panel and the
   *    `wled-geometry-preview` are in the DOM, hand the preview to the panel via
   *    `bindExternalPreview(preview)` (once — guarded against rebinding the same
   *    panel) so the panel paints onto the shared preview canvas.
   *  - On leaving paint: call `panel.cancelLiveIfActive()` so a mid-paint live
   *    DDP session is cleanly restored before the panel unmounts.
   */
  private _syncPaintWiring(): void {
    const view = this._nav.view;
    const prev = this._prevView;
    this._prevView = view;

    if (view === "paint") {
      const panel = this._paintPanel;
      const preview = this._preview;
      if (panel && preview && this._boundPaintPreview !== panel) {
        panel.bindExternalPreview(preview);
        this._boundPaintPreview = panel;
      }
      return;
    }

    // Left the paint view: end any live session and forget the bound panel.
    if (prev === "paint" && this._boundPaintPreview) {
      void this._boundPaintPreview.cancelLiveIfActive();
      this._boundPaintPreview = undefined;
    }
  }

  /**
   * Drive accent-from-LED off the active segment's primary color (scoped to
   * `--wled-led-accent`; never a full `--md-sys-color-*` override). No-op when
   * nothing usable is selected — the inherited scheme shows through.
   */
  private _refreshAccent(): void {
    const segs = this._selection.segments;
    const sel = this._selection.selectedSegId;
    const seg = segs.find((s) => s.id === sel);
    this._session.applyAccentFromSegment(seg);
  }

  // --- Brightness (lifted from the card; writes to md-slider). ---------------

  private _readGlobalBrightnessPct(): number {
    if (!this.hass || !this._masterEntity) return 0;
    return readBrightnessPct(this.hass.states[this._masterEntity]);
  }

  private _globalBrightnessPct(): number {
    if (this._globalBriPct !== null) return this._globalBriPct;
    return this._readGlobalBrightnessPct();
  }

  /**
   * Push the resolved brightness into the md-slider. Streamed/state-driven
   * writes are gated by `whenPowered` so a backgrounded shell does no work; the
   * value is still kept in sync for the next render.
   */
  private _syncGlobalBriToSlider(): void {
    const slider = this._slider;
    if (!slider) return;
    const value = this._globalBrightnessPct();
    // Gate the streamed write behind the host's power state (off-screen / hidden
    // tab => skip the work). `isPowered` is the base lifecycle gate.
    whenPowered({ isPowered: this.isPowered }, () => {
      slider.value = value;
    });
  }

  private _onGlobalBriInput(ev: Event): void {
    const input = ev.target as HTMLElement & { value: number };
    let value = Number(input.value);
    const current = this._globalBriPct ?? this._readGlobalBrightnessPct();
    if (current === 0 && value > 0 && this._lastNonZeroBri > 0) {
      value = this._lastNonZeroBri;
      input.value = value;
    }
    if (value > 0) {
      this._lastNonZeroBri = value;
    }
    this._globalBriPct = value;
  }

  private _setGlobalBrightness(ev: Event): void {
    if (!this.hass || !this._masterEntity) return;
    const value = Number((ev.target as HTMLElement & { value: number }).value);
    if (value === 0) {
      const prev = this._globalBriPct ?? this._readGlobalBrightnessPct();
      if (prev > 0) this._lastNonZeroBri = prev;
    } else {
      this._lastNonZeroBri = value;
    }
    this._globalBriPct = value;
    const bri = pctTo255(value);

    if (value === 0) {
      void this.hass.callService("light", "turn_off", {
        entity_id: this._masterEntity,
      });
    } else {
      void this.hass.callService("light", "turn_on", {
        entity_id: this._masterEntity,
        brightness_pct: value,
      });
    }

    const conn = this._connection;
    if (conn && this._controllerId) {
      void applyState(conn, this._controllerId, { bri, on: value > 0 });
    }
  }

  private _togglePower(): void {
    if (!this.hass || !this._masterEntity) return;
    this.hass.callService("light", "toggle", { entity_id: this._masterEntity });
  }

  /**
   * Expand-to-panel deep link. Carries the active view + resolved controller in
   * the hash (`#view=<active>&controller=<id>`) so the full panel opens on the
   * same view/controller the card was showing. Wired to the header md-fab.
   */
  private _onExpand(): void {
    const view = this._nav.view;
    const controller = this._controllerId || (this.controller ?? "").trim();
    const params = new URLSearchParams();
    params.set("view", view);
    if (controller) params.set("controller", controller);
    history.pushState(null, "", `/wled-studio#${params.toString()}`);
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  // --- Navigation ------------------------------------------------------------

  private _selectView(id: ViewId): void {
    this._nav.select(id);
  }

  /** Read the `view` from an md-navigation/md-tabs activation event. */
  private _onNavActivate(ev: Event): void {
    const target = ev.target as (HTMLElement & { activeIndex?: number }) | null;
    const idx = target?.activeIndex;
    const items = this.visibleNav();
    if (typeof idx === "number" && items[idx]) {
      this._selectView(items[idx].id);
    }
  }

  // --- Render ----------------------------------------------------------------

  private _renderHeader(): TemplateResult {
    const remote = this.remote.state;
    const item = navItem(this._nav.view) ?? DEFAULT_NAV[0];
    const title = this.controller?.trim() || item.label || "WLED Studio";
    return html`
      <header class="header glass" part="header">
        <ha-icon icon="mdi:led-strip-variant"></ha-icon>
        <span class="title">${title}</span>
        ${remote.isRemote ? html`<span class="badge">Remote</span>` : null}
        <md-icon-button
          class="state-layer-target"
          aria-label="Toggle power"
          ?disabled=${!this._masterEntity}
          @click=${this._togglePower}
        >
          <ha-icon icon="mdi:power"></ha-icon>
        </md-icon-button>
        ${this.surface === "card"
          ? html`
              <md-fab
                size="small"
                class="expand-fab"
                aria-label="Open WLED Studio"
                @click=${this._onExpand}
              >
                <ha-icon slot="icon" icon="mdi:arrow-expand"></ha-icon>
              </md-fab>
            `
          : null}
      </header>
    `;
  }

  private _renderPreview(): TemplateResult {
    const paintTab = this._nav.view === "paint";
    const previewStyle = `--wled-preview-height: ${this.previewHeight}px`;
    // Paint props are sourced from the active view-paint element so the shared
    // preview paints the right buffer/brush. Defaults apply until the panel
    // exists (e.g. before the paint view first renders) — see _onPaintConfigChange
    // which re-syncs these once the panel reports a brush/mode change.
    const panel = this._paintPanel;
    const brushSize = panel?.brushSize ?? 6;
    const paintLivePreview = paintTab ? (panel?.paintLivePreview ?? false) : false;
    // In paint mode the preview only subscribes to live WS for EFFECT brushes
    // (paintLivePreview); color brushes draw the DDP buffer the panel pushes, so
    // the preview stays externalLive (parent feeds frames). Outside paint mode
    // the shell always feeds frames => externalLive.
    const externalLive = paintTab ? (panel?.paintExternalLive ?? true) : true;
    return html`
      <wled-geometry-preview
        class="preview"
        style=${previewStyle}
        compact
        .externalLive=${externalLive}
        .paintLivePreview=${paintLivePreview}
        .paintBrushSize=${brushSize}
        .heightPx=${this.previewHeight}
        .connection=${this._connection}
        .controllerId=${this._controllerId}
        .layoutId=${this._layoutId}
        .fixtureId=${this._fixtureId}
        .pixelCount=${this._pixelCount}
        .segments=${this._segments}
        .selectedSegId=${paintTab ? -1 : this._selectedSegId}
        .highlightSegIds=${paintTab ? [] : this._highlightSegIds}
        .paintMode=${paintTab}
        @segment-select=${this._onStripSegmentSelect}
        @paint-stroke=${this._onPreviewPaintStroke}
      ></wled-geometry-preview>
    `;
  }

  /**
   * Route a brush stroke painted on the shared preview into the active paint
   * panel. The preview emits `paint-stroke` (composed); the panel turns it into
   * a DDP write. No-op when the paint view is not mounted.
   */
  private _onPreviewPaintStroke(ev: Event): void {
    this._paintPanel?.handleExternalPaintStroke(
      ev as CustomEvent<{ leds: number[] }>
    );
  }

  /** Full: left rail (md-navigation-drawer) with one entry per visible view. */
  private _renderRail(): TemplateResult {
    const items = this.visibleNav();
    const active = this._nav.view;
    return html`
      <md-navigation-drawer class="nav nav-rail glass" opened part="nav">
        ${items.map(
          (it) => html`
            <button
              type="button"
              class="rail-item state-layer-target ${it.id === active
                ? "active"
                : ""}"
              role="tab"
              aria-selected=${it.id === active ? "true" : "false"}
              @click=${() => this._selectView(it.id)}
            >
              <ha-icon .icon=${it.icon}></ha-icon>
              <span class="rail-label">${it.label}</span>
            </button>
          `
        )}
      </md-navigation-drawer>
    `;
  }

  /** Compact: bottom bar (md-navigation-bar). */
  private _renderBar(): TemplateResult {
    const items = this.visibleNav();
    const active = this._nav.view;
    const activeIndex = Math.max(
      0,
      items.findIndex((i) => i.id === active)
    );
    return html`
      <md-navigation-bar
        class="nav nav-bar"
        part="nav"
        .activeIndex=${activeIndex}
        @navigation-bar-activated=${this._onNavActivate}
      >
        ${items.map(
          (it) => html`
            <md-navigation-tab
              data-view=${it.id}
              ?active=${it.id === active}
              aria-label=${it.label}
              @click=${() => this._selectView(it.id)}
            >
              <ha-icon slot="active-icon" .icon=${it.icon}></ha-icon>
              <ha-icon slot="inactive-icon" .icon=${it.icon}></ha-icon>
              <span>${it.label}</span>
            </md-navigation-tab>
          `
        )}
      </md-navigation-bar>
    `;
  }

  private _viewContext(): ViewRenderContext {
    const density = this._resolvedDensity;
    return {
      hass: this.hass,
      connection: this._connection,
      controllerId: this._controllerId,
      masterEntity: this._masterEntity,
      layoutId: this._layoutId,
      fixtureId: this._fixtureId,
      pixelCount: this._pixelCount,
      selectedSegId: this._selectedSegId,
      highlightSegIds: this._highlightSegIds,
      segments: this._segments,
      density,
      compact: density === "compact",
      onSegmentChange: this._onSegmentChange,
      onSegmentTargetsChanged: this._onSegmentTargetsChanged,
      onPaintConfigChange: this._onPaintConfigChange,
    };
  }

  private _renderBody(): TemplateResult {
    const id = this._nav.view;
    // Skeleton ONLY for a genuinely-not-yet-loaded HEAVY view. Light views are
    // statically imported, so they always render their real content (no boot
    // flicker — the default view paints content on the very first render).
    if (!isViewLight(id) && !this._viewReady) {
      return html`<div class="body" part="body">
        <wled-skeleton height="160px"></wled-skeleton>
      </div>`;
    }
    return html`<div class="body" part="body">
      ${renderView(id, this._viewContext())}
    </div>`;
  }

  private _renderBrightness(): TemplateResult {
    const value = this._globalBrightnessPct();
    return html`
      <div class="controls glass" part="controls">
        <div class="bri-row">
          <label class="bri-label" for="shell-brightness">Brightness</label>
          <span class="bri-pct" aria-live="polite">${value}%</span>
        </div>
        <md-slider
          id="shell-brightness"
          class="bri-slider"
          min="0"
          max="100"
          step="1"
          labeled
          .value=${value}
          ?disabled=${!this._masterEntity}
          @input=${this._onGlobalBriInput}
          @change=${this._setGlobalBrightness}
        ></md-slider>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    // Density is driven by the `@container wled-studio` query (pure CSS), NOT by
    // a JS width measurement. For `auto` we render BOTH nav variants and let the
    // container query show/hide them (and flip the body layout) with no JS
    // re-render on resize. Explicit `compact`/`full` render a single nav element.
    const mode = this.density === "full"
      ? "is-full"
      : this.density === "compact"
        ? "is-compact"
        : "is-auto";

    const main = html`
      <div class="main">
        ${this._renderPreview()}
        ${this._renderBody()}
        ${this._renderBrightness()}
        ${this._hint ? html`<p class="hint">${this._hint}</p>` : null}
      </div>
    `;

    if (mode === "is-full") {
      return html`
        <div class="shell is-full" role="region" aria-label="WLED Studio">
          ${this._renderHeader()}
          <div class="layout">${this._renderRail()}${main}</div>
        </div>
      `;
    }

    if (mode === "is-compact") {
      return html`
        <div class="shell is-compact" role="region" aria-label="WLED Studio">
          ${this._renderHeader()}
          <div class="layout">${main}</div>
          ${this._renderBar()}
        </div>
      `;
    }

    // auto: render both; the container query decides which is visible + the
    // layout direction. The rail slot collapses below 600px (bar shows), and
    // the bar slot collapses at/above 600px (rail shows).
    return html`
      <div class="shell is-auto" role="region" aria-label="WLED Studio">
        ${this._renderHeader()}
        <div class="layout">
          <div class="nav-slot rail-slot">${this._renderRail()}</div>
          ${main}
        </div>
        <div class="nav-slot bar-slot">${this._renderBar()}</div>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    glassStyles,
    stateLayerStyles,
    css`
      :host {
        display: block;
        color: var(--md-sys-color-on-surface, var(--primary-text-color, #1d1b20));
      }
      .shell {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px;
      }
      .layout {
        display: flex;
        gap: 12px;
        min-height: 0;
      }
      .shell.is-full .layout {
        flex-direction: row;
      }
      /* auto density: pure-CSS @container reflow (no JS width measurement). */
      .shell.is-auto .layout {
        flex-direction: column;
      }
      .nav-slot {
        display: contents;
      }
      /* Below the breakpoint: bottom bar shows, left rail collapses. */
      .shell.is-auto .rail-slot {
        display: none;
      }
      .shell.is-auto .bar-slot {
        display: block;
      }
      @container wled-studio (min-width: 600px) {
        .shell.is-auto .layout {
          flex-direction: row;
        }
        .shell.is-auto .rail-slot {
          display: block;
          flex: 0 0 auto;
        }
        .shell.is-auto .bar-slot {
          display: none;
        }
      }
      .main {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex: 1 1 auto;
        min-width: 0;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
      }
      .title {
        font: var(--md-sys-typescale-title-medium, 600 16px/1.2 system-ui);
        flex: 1;
        color: var(--md-sys-color-on-surface, var(--wled-text));
      }
      .badge {
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--md-sys-color-tertiary-container, var(--warning-color, orange));
        color: var(--md-sys-color-on-tertiary-container, var(--primary-text-color, #1a1200));
        font-weight: 600;
      }
      .expand-fab {
        --md-fab-container-width: 40px;
        --md-fab-container-height: 40px;
      }
      .preview {
        display: block;
        width: 100%;
      }
      .body {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      /* Compact: bottom navigation bar. */
      .nav-bar {
        width: 100%;
        position: sticky;
        bottom: 0;
      }
      /* Full: left rail. */
      .nav-rail {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 8px;
        min-width: 96px;
      }
      .rail-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 8px 6px;
        border: none;
        border-radius: var(--md-sys-shape-corner-large, 16px);
        background: transparent;
        color: var(--md-sys-color-on-surface-variant, var(--wled-text-muted));
        cursor: pointer;
        font: inherit;
        min-height: var(--wled-tap, 44px);
      }
      .rail-item.active {
        color: var(--md-sys-color-on-secondary-container, var(--wled-text));
        background: var(--md-sys-color-secondary-container, transparent);
      }
      .rail-item ha-icon {
        --mdc-icon-size: 24px;
      }
      .rail-label {
        font-size: 11px;
        white-space: nowrap;
      }
      .controls {
        padding: 8px 10px;
      }
      .bri-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 4px;
      }
      .bri-label {
        font-size: 0.8rem;
        color: var(--md-sys-color-on-surface-variant, var(--wled-text-muted));
      }
      .bri-pct {
        font-size: 0.8rem;
        font-variant-numeric: tabular-nums;
        color: var(--md-sys-color-on-surface, var(--wled-text));
      }
      .bri-slider {
        width: 100%;
      }
      .hint {
        font-size: 0.8rem;
        color: var(--md-sys-color-on-surface-variant, var(--wled-text-muted));
        margin: 4px 0 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [SHELL_TAG]: WledStudioShell;
  }
}
