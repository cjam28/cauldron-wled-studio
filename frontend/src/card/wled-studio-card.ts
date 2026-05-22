import { css, html, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { LovelaceCard } from "custom-card-helpers";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { isWledStudioStale } from "../utils/build-stamp.js";
import { onHaConnectionReady } from "../api/reconnect.js";
import { listControllers, subscribeLive } from "../api/live-stream.js";
import { applyState, fetchDeviceState } from "../api/wled-state.js";
import { layoutList, type LayoutRecord } from "../api/layout.js";
import type { WledGeometryPreview } from "../components/geometry-preview.js";
import type { WledViewPaint } from "../panel/view-paint.js";
import { pctTo255, readBrightnessPct } from "../utils/ha-brightness.js";
import "../components/geometry-preview.js";
import "../components/segment-controls.js";
import "../panel/view-effects.js";
import "../panel/view-scenes.js";
import "../panel/view-paint.js";
import "../components/wled-toast-host.js";

export const CARD_TAG = "wled-studio-card";

export interface WledStudioCardConfig {
  type: string;
  controller?: string;
  /** Preview area min height (px); layout uses 16:9 aspect. */
  height?: number;
  /** Saved layout id; defaults to first layout for the controller. */
  layout_id?: string;
  show_scenes?: boolean;
  show_paint?: boolean;
  show_segments?: boolean;
  show_effects?: boolean;
}

type CardModeTab = "color" | "effects" | "scenes" | "segments" | "paint";

const MODE_TABS: Array<{ id: CardModeTab; label: string; icon: string }> = [
  { id: "color", label: "Color", icon: "mdi:palette" },
  { id: "effects", label: "Effects", icon: "mdi:animation-play" },
  { id: "scenes", label: "Scenes", icon: "mdi:palette-swatch" },
  { id: "segments", label: "Segments", icon: "mdi:vector-line" },
  { id: "paint", label: "Paint", icon: "mdi:brush" },
];

export class WledStudioCard extends BasePoweredElement implements LovelaceCard {
  @property({ attribute: false }) public config?: WledStudioCardConfig;

  @state() private _controllerId = "";
  @state() private _masterEntity = "";
  @state() private _pixelCount = 210;
  @state() private _previewStatus = "connecting";
  @state() private _hint = "";
  @state() private _layoutId = "";
  @state() private _fixtureId = "";
  @state() private _cardTab: CardModeTab = "color";

  @query("wled-geometry-preview") private _preview?: WledGeometryPreview;
  @query("wled-segment-controls") private _segmentControls?: import("../components/segment-controls.js").WledSegmentControls;
  @query("wled-view-effects") private _effectsView?: import("../panel/view-effects.js").WledViewEffects;
  @query("wled-view-paint") private _paintPanel?: WledViewPaint;

  @state() private _selectedSegId = -1;
  @state() private _highlightSegIds: number[] = [];
  /** Optimistic global brightness (0–100) while dragging until HA state catches up. */
  @state() private _globalBriPct: number | null = null;
  /** Last non-zero brightness for restore when dragging up from off. */
  @state() private _lastNonZeroBri = 100;
  @state() private _segments: import("../api/wled-state.js").WledSegment[] = [];

  private _unsubLive?: () => void;
  private _bootstrapGen = 0;
  private _offConnReady?: () => void;
  private _bootstrapControllerKey = "";
  private _tabTouchStartX = 0;
  private _tabTouchStartY = 0;
  private _tabSwiping = false;

  public setConfig(config: WledStudioCardConfig): void {
    if (!config.type?.startsWith("custom:")) {
      throw new Error("Invalid card type");
    }
    this.config = config;
  }

  public getCardSize(): number {
    return 8;
  }

  public static getConfigElement(): HTMLElement {
    const el = document.createElement(
      "wled-studio-card-editor"
    ) as import("./wled-studio-card-editor.js").WledStudioCardEditor;
    el.setConfig(WledStudioCard.getStubConfig());
    return el;
  }

  public static getStubConfig(): WledStudioCardConfig {
    return {
      type: `custom:${CARD_TAG}`,
      controller: "Cloud",
      height: 200,
      show_segments: false,
    };
  }

  private _visibleModeTabs(): Array<{ id: CardModeTab; label: string; icon: string }> {
    return MODE_TABS.filter((t) => {
      if (t.id === "scenes" && this.config?.show_scenes === false) return false;
      if (t.id === "paint" && this.config?.show_paint === false) return false;
      if (t.id === "segments" && this.config?.show_segments !== true) return false;
      if (t.id === "effects" && this.config?.show_effects === false) return false;
      return true;
    });
  }

  private _tabId(tab: CardModeTab): string {
    return `wled-card-tab-${tab}`;
  }

  private _panelId(tab: CardModeTab): string {
    return `wled-card-panel-${tab}`;
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    const visibleTabs = this._visibleModeTabs().map((t) => t.id);
    if (!visibleTabs.includes(this._cardTab)) {
      this._cardTab = visibleTabs[0] ?? "color";
    }
    this._syncSegmentsFromControls();
    if (changed.has("hass") && this._globalBriPct !== null) {
      const actual = this._readGlobalBrightnessPct();
      if (actual === 0 || Math.abs(actual - this._globalBriPct) <= 1) {
        this._globalBriPct = null;
      }
    }
    if (changed.has("hass") || changed.has("_globalBriPct")) {
      this._syncGlobalBriToSegmentControls();
    }
    if (changed.has("_cardTab")) {
      void this._onCardTabChanged(
        changed.get("_cardTab") as CardModeTab | undefined
      );
    }
    if (changed.has("_cardTab") || changed.has("_paintPanel")) {
      this._syncPaintPreview();
    }
    if (
      changed.has("_cardTab") &&
      (this._cardTab === "color" || this._cardTab === "segments")
    ) {
      this.scheduleRaf(() => this._syncGlobalBriToSegmentControls());
    }
    if (changed.has("config")) {
      this._bindConnectionReady();
      void this._bootstrap(true);
      return;
    }
    if (changed.has("hass") && this.hass && !this._controllerId) {
      this._bindConnectionReady();
      void this._bootstrap();
    }
  }

  private async _onCardTabChanged(prev: CardModeTab | undefined): Promise<void> {
    if (prev === "paint" && this._cardTab !== "paint") {
      await this._paintPanel?.cancelLiveIfActive();
    }
    this._syncPaintPreview();
  }

  private _syncPaintPreview(): void {
    const paintActive = this._cardTab === "paint";
    if (this._preview) {
      this._preview.paintMode = paintActive;
      if (paintActive && this._paintPanel) {
        this._preview.paintBrushSize = this._paintPanel.brushSize;
        this._preview.externalLive = this._paintPanel.paintExternalLive;
        this._preview.paintLivePreview = this._paintPanel.paintLivePreview;
        this._paintPanel.bindExternalPreview(this._preview);
      }
    }
  }

  private _onPaintStroke(ev: CustomEvent<{ leds: number[] }>): void {
    this._paintPanel?.handleExternalPaintStroke(ev);
  }

  private _onPaintConfigChange(): void {
    this._syncPaintPreview();
  }

  private _selectCardTab(tab: CardModeTab): void {
    if (tab === this._cardTab) return;
    this._cardTab = tab;
  }

  private _swipeTab(deltaX: number): void {
    const tabs = this._visibleModeTabs();
    const idx = tabs.findIndex((t) => t.id === this._cardTab);
    if (idx < 0) return;
    if (deltaX < 0 && idx < tabs.length - 1) {
      this._selectCardTab(tabs[idx + 1].id);
    } else if (deltaX > 0 && idx > 0) {
      this._selectCardTab(tabs[idx - 1].id);
    }
  }

  private _onTabPanelTouchStart(ev: TouchEvent): void {
    if (ev.touches.length !== 1) return;
    this._tabTouchStartX = ev.touches[0].clientX;
    this._tabTouchStartY = ev.touches[0].clientY;
    this._tabSwiping = false;
  }

  private _onTabPanelTouchMove(ev: TouchEvent): void {
    if (ev.touches.length !== 1) return;
    const dx = ev.touches[0].clientX - this._tabTouchStartX;
    const dy = ev.touches[0].clientY - this._tabTouchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      this._tabSwiping = true;
    }
  }

  private _onTabPanelTouchEnd(ev: TouchEvent): void {
    if (!this._tabSwiping || ev.changedTouches.length !== 1) {
      this._tabSwiping = false;
      return;
    }
    const dx = ev.changedTouches[0].clientX - this._tabTouchStartX;
    if (Math.abs(dx) >= 50) {
      this._swipeTab(dx);
    }
    this._tabSwiping = false;
  }

  private _focusModeTab(tab: CardModeTab): void {
    const root = this.renderRoot as ShadowRoot;
    const btn = root.querySelector<HTMLButtonElement>(`#${this._tabId(tab)}`);
    btn?.focus();
  }

  private _onModeTabsKeydown(ev: KeyboardEvent): void {
    const tabs = this._visibleModeTabs();
    const idx = tabs.findIndex((t) => t.id === this._cardTab);
    if (idx < 0) return;

    let next = idx;
    switch (ev.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (idx + 1) % tabs.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (idx - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    ev.preventDefault();
    const tab = tabs[next].id;
    this._selectCardTab(tab);
    this.scheduleRaf(() => this._focusModeTab(tab));
  }

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
    void this._paintPanel?.cancelLiveIfActive();
  }

  private _bindConnectionReady(): void {
    if (!this.hass?.connection || this._offConnReady) return;
    this._offConnReady = onHaConnectionReady(this.hass.connection, () => {
      void this._bootstrap();
    });
    this.addUnsub(() => this._offConnReady?.());
  }

  private _pickController(
    controllers: Array<Record<string, unknown>>
  ): Record<string, unknown> | undefined {
    const key = (this.config?.controller ?? "").trim();
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
    const key = (this.config?.layout_id ?? "").trim();
    if (key) {
      return layouts.find((l) => l.id === key || l.name === key);
    }
    return layouts[0];
  }

  private async _bootstrap(force = false): Promise<void> {
    if (!this.hass?.connection) return;
    const controllerKey = (this.config?.controller ?? "").trim();
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
        const controllers = await listControllers(this.hass.connection);
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
    if (!this.hass?.connection || !this._controllerId) return;
    try {
      const layouts = await layoutList(this.hass.connection, this._controllerId);
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
    if (!this.hass?.connection || !this._controllerId) return;
    const wasLive = this._previewStatus === "live";
    this._unsubLive?.();
    if (!wasLive) {
      this._previewStatus = "connecting";
      this._preview?.setStatus(this._previewStatus);
    }
    this._unsubLive = subscribeLive(
      this.hass.connection,
      this._controllerId,
      (frame) => {
        this._previewStatus = "live";
        this._preview?.setFrame(frame);
      },
      { remote: this.remote.state.isRemote }
    );
    this.addUnsub(() => this._unsubLive?.());
  }

  private _onStripSegmentSelect(ev: CustomEvent<{ segmentId: number }>): void {
    if (this._cardTab === "paint") return;
    this._selectedSegId = ev.detail.segmentId;
    if (this._cardTab === "color") {
      this._segmentControls?.selectSegment(ev.detail.segmentId);
    } else if (this._cardTab === "effects") {
      this._effectsView?.selectSegmentFromPreview(ev.detail.segmentId);
    } else if (this._cardTab === "segments") {
      this._segmentControls?.selectSegment(ev.detail.segmentId);
    }
  }

  private _onSegmentTargetsChanged(
    ev: CustomEvent<{
      segmentId: number;
      editIds?: number[];
      highlightIds?: number[];
    }>
  ): void {
    this._selectedSegId = ev.detail.segmentId;
    if (ev.detail.highlightIds?.length) {
      this._highlightSegIds = ev.detail.highlightIds;
    } else if (ev.detail.editIds?.length) {
      this._highlightSegIds = ev.detail.editIds;
    } else {
      this._highlightSegIds = [ev.detail.segmentId];
    }
    this.requestUpdate();
  }

  private _onSegmentChange(ev: CustomEvent<{ segmentId: number; editIds?: number[] }>): void {
    this._selectedSegId = ev.detail.segmentId;
    if (ev.detail.editIds?.length) {
      this._highlightSegIds = ev.detail.editIds;
    }
    this.requestUpdate();
  }

  private async _loadSegments(): Promise<void> {
    if (!this.hass?.connection || !this._controllerId) return;
    try {
      const snap = await fetchDeviceState(this.hass.connection, this._controllerId);
      this._segments = snap.segments ?? [];
      if (this._segments.length && this._selectedSegId < 0) {
        this._selectedSegId = this._segments[0].id;
      }
      this.requestUpdate();
    } catch {
      /* tap-to-select degrades gracefully */
    }
  }

  private _syncSegmentsFromControls(): void {
    const segs = this._segmentControls?.segments;
    if (segs?.length) this._segments = segs;
  }

  private _readGlobalBrightnessPct(): number {
    if (!this.hass || !this._masterEntity) return 0;
    return readBrightnessPct(this.hass.states[this._masterEntity]);
  }

  private _syncGlobalBriToSegmentControls(): void {
    const bri = pctTo255(this._globalBrightnessPct());
    for (const el of this.renderRoot.querySelectorAll("wled-segment-controls")) {
      (el as import("../components/segment-controls.js").WledSegmentControls).applyGlobalBrightness(
        bri
      );
    }
  }

  private _globalBrightnessPct(): number {
    if (this._globalBriPct !== null) return this._globalBriPct;
    return this._readGlobalBrightnessPct();
  }

  private _onGlobalBriInput(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    let value = Number(input.value);
    const current = this._globalBriPct ?? this._readGlobalBrightnessPct();
    if (current === 0 && value > 0 && this._lastNonZeroBri > 0) {
      value = this._lastNonZeroBri;
      input.value = String(value);
    }
    if (value > 0) {
      this._lastNonZeroBri = value;
    }
    this._globalBriPct = value;
    this._syncGlobalBriToSegmentControls();
  }

  private _setGlobalBrightness(ev: Event): void {
    if (!this.hass || !this._masterEntity) return;
    const value = Number((ev.target as HTMLInputElement).value);
    if (value === 0) {
      const prev = this._globalBriPct ?? this._readGlobalBrightnessPct();
      if (prev > 0) {
        this._lastNonZeroBri = prev;
      }
    } else {
      this._lastNonZeroBri = value;
    }
    this._globalBriPct = value;
    const bri = pctTo255(value);
    this._syncGlobalBriToSegmentControls();

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

    if (this.hass.connection && this._controllerId) {
      void applyState(this.hass.connection, this._controllerId, {
        bri,
        on: value > 0,
      });
    }
  }

  private _togglePower(): void {
    if (!this.hass || !this._masterEntity) return;
    this.hass.callService("light", "toggle", { entity_id: this._masterEntity });
  }

  private _renderModeTabs(): import("lit").TemplateResult {
    const tabs = this._visibleModeTabs();
    return html`
      <div
        class="mode-tabs"
        role="tablist"
        aria-label="Control mode"
        @keydown=${this._onModeTabsKeydown}
      >
        ${tabs.map((t) => {
          const active = this._cardTab === t.id;
          return html`
            <button
              type="button"
              id=${this._tabId(t.id)}
              role="tab"
              class="mode-tab ${active ? "active" : ""}"
              aria-label=${t.label}
              aria-selected=${active ? "true" : "false"}
              aria-controls=${this._panelId(t.id)}
              tabindex=${active ? "0" : "-1"}
              @click=${() => this._selectCardTab(t.id)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span class="mode-tab-label">${t.label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderTabPanel(): import("lit").TemplateResult | null {
    if (!this._controllerId || !this.hass?.connection) return null;
    const conn = this.hass.connection;
    const hass = this.hass;
    const panelId = this._panelId(this._cardTab);
    const tabId = this._tabId(this._cardTab);

    switch (this._cardTab) {
      case "color":
        return html`
          <div
            id=${panelId}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${tabId}
          >
            <wled-segment-controls
              class="tab-panel"
              .hass=${hass}
              .connection=${conn}
              .controllerId=${this._controllerId}
              .masterEntity=${this._masterEntity}
              .selectedSegId=${this._selectedSegId}
              compact
              hideSegmentBrightness
              @segment-change=${this._onSegmentChange}
              @segment-targets-changed=${this._onSegmentTargetsChanged}
            ></wled-segment-controls>
          </div>
        `;
      case "effects":
        return html`
          <div
            id=${panelId}
            class="tab-panel-host effects-panel"
            role="tabpanel"
            aria-labelledby=${tabId}
          >
            <wled-view-effects
              class="tab-panel"
              compact
              .hass=${hass}
              .connection=${conn}
              .controllerId=${this._controllerId}
              @segment-targets-changed=${this._onSegmentTargetsChanged}
            ></wled-view-effects>
          </div>
        `;
      case "scenes":
        return html`
          <div
            id=${panelId}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${tabId}
          >
            <wled-view-scenes
              class="tab-panel"
              .connection=${conn}
              .controllerId=${this._controllerId}
              compact
            ></wled-view-scenes>
          </div>
        `;
      case "segments":
        return html`
          <div
            id=${panelId}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${tabId}
          >
            <wled-segment-controls
              class="tab-panel"
              .hass=${hass}
              .connection=${conn}
              .controllerId=${this._controllerId}
              .masterEntity=${this._masterEntity}
              .selectedSegId=${this._selectedSegId}
              compact
              @segment-change=${this._onSegmentChange}
              @segment-targets-changed=${this._onSegmentTargetsChanged}
            ></wled-segment-controls>
          </div>
        `;
      case "paint":
        return html`
          <div
            id=${panelId}
            class="tab-panel-host"
            role="tabpanel"
            aria-labelledby=${tabId}
          >
            <wled-view-paint
              class="tab-panel"
              embed-mode
              .connection=${conn}
              .hass=${hass}
              .controllerId=${this._controllerId}
              .embedLayoutId=${this._layoutId}
              .embedFixtureId=${this._fixtureId}
              .embedPixelCount=${this._pixelCount}
              @paint-config-change=${this._onPaintConfigChange}
            ></wled-view-paint>
          </div>
        `;
      default:
        return null;
    }
  }

  protected override render() {
    const height = this.config?.height ?? 200;
    const remote = this.remote.state;
    const previewStyle = `--wled-preview-height: ${height}px`;
    const paintTab = this._cardTab === "paint";
    const paintBrush = this._paintPanel?.brushSize ?? 6;
    const paintExternalLive = paintTab
      ? (this._paintPanel?.paintExternalLive ?? true)
      : true;
    const paintLivePreview = paintTab && (this._paintPanel?.paintLivePreview ?? false);

    return html`
      <div class="card" role="region" aria-label="WLED Studio card">
        ${isWledStudioStale()
          ? html`
              <ha-alert alert-type="warning" class="stale-banner">
                WLED Studio updated — refresh this page to apply changes.
              </ha-alert>
            `
          : null}
        <header class="header">
          <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          <span class="title">${this.config?.controller ?? "WLED Studio"}</span>
          ${remote.isRemote
            ? html`<span class="badge">Remote</span>`
            : null}
          <button
            class="icon-btn"
            @click=${this._togglePower}
            ?disabled=${!this._masterEntity}
            aria-label="Toggle power"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </header>

        <wled-geometry-preview
          class="layout-preview"
          style=${previewStyle}
          compact
          externalLive
          .heightPx=${height}
          .connection=${this.hass?.connection}
          .controllerId=${this._controllerId}
          .layoutId=${this._layoutId}
          .fixtureId=${this._fixtureId}
          .pixelCount=${this._pixelCount}
          .segments=${this._segments}
          .selectedSegId=${paintTab ? -1 : this._selectedSegId}
          .highlightSegIds=${paintTab ? [] : this._highlightSegIds}
          .paintMode=${paintTab}
          .paintBrushSize=${paintBrush}
          .paintLivePreview=${paintLivePreview}
          .externalLive=${paintExternalLive}
          @segment-select=${this._onStripSegmentSelect}
          @paint-stroke=${this._onPaintStroke}
        ></wled-geometry-preview>

        ${this._renderModeTabs()}

        <div
          class="tab-body"
          @touchstart=${this._onTabPanelTouchStart}
          @touchmove=${this._onTabPanelTouchMove}
          @touchend=${this._onTabPanelTouchEnd}
          @touchcancel=${() => {
            this._tabSwiping = false;
          }}
        >${this._renderTabPanel()}</div>

        <div class="controls">
          <div class="bri-row">
            <label class="bri-label" for="global-brightness">Brightness</label>
            <span class="bri-pct" aria-live="polite">${this._globalBrightnessPct()}%</span>
          </div>
          <ha-slider
            id="global-brightness"
            min="0"
            max="100"
            step="1"
            .value=${this._globalBrightnessPct()}
            ?disabled=${!this._masterEntity}
            @input=${this._onGlobalBriInput}
            @change=${this._setGlobalBrightness}
          ></ha-slider>
        </div>

        <button
          class="studio-link"
          @click=${this._openStudio}
          aria-label="Open WLED Studio panel"
        >
          Open Studio
        </button>
        ${this._hint
          ? html`<p class="hint">${this._hint}</p>`
          : null}
        ${!this._layoutId && this._controllerId
          ? html`<p class="hint layout-hint">
              No saved layout — create one in Studio → Layout to show your floorplan here.
            </p>`
          : null}
      </div>
      <wled-toast-host></wled-toast-host>
    `;
  }

  private _openStudio(): void {
    history.pushState(null, "", "/wled-studio");
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .card {
        display: flex;
        flex-direction: column;
        padding: 12px 16px;
        background: var(--wled-surface);
        border-radius: var(--wled-radius);
        box-shadow: var(--wled-shadow);
      }
      .stale-banner {
        display: block;
        margin-bottom: 10px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      .title {
        font-weight: 600;
        flex: 1;
        color: var(--wled-text);
      }
      .badge {
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--warning-color, orange);
        color: var(--primary-text-color, #1a1200);
        font-weight: 600;
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        min-width: var(--wled-tap);
        min-height: var(--wled-tap);
      }
      .layout-preview {
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }
      .mode-tabs {
        display: flex;
        flex-wrap: nowrap;
        gap: 4px;
        min-height: 48px;
        margin-bottom: 8px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        border-bottom: 1px solid var(--wled-border);
      }
      .mode-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        flex: 0 0 auto;
        min-width: var(--wled-tap);
        min-height: 48px;
        padding: 6px 8px 4px;
        border: none;
        border-bottom: 3px solid transparent;
        border-radius: 0;
        background: transparent;
        color: var(--wled-text-muted);
        cursor: pointer;
        font-size: 11px;
        line-height: 1.2;
        transition:
          color var(--wled-transition-fast),
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .mode-tab ha-icon {
        --mdc-icon-size: 24px;
      }
      .mode-tab-label {
        font-size: 11px;
        white-space: nowrap;
      }
      .mode-tab.active {
        color: var(--wled-text);
        border-bottom-color: var(--wled-accent);
        font-weight: 600;
      }
      .mode-tab:active {
        transform: scale(0.97);
      }
      .tab-body {
        flex: 1 1 auto;
        max-height: min(48vh, 380px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        margin: 0 0 10px;
        border-top: 1px solid var(--wled-border);
        padding-top: 10px;
      }
      .tab-panel-host {
        display: block;
        animation: tab-fade-in var(--m-view-transition) ease;
      }
      @keyframes tab-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .tab-panel-host {
          animation: none;
        }
      }
      .tab-panel {
        display: block;
      }
      .controls {
        margin: 0;
        padding-top: 10px;
        border-top: 1px solid var(--wled-border);
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
        color: var(--wled-text-muted);
      }
      .bri-pct {
        font-size: 0.8rem;
        font-variant-numeric: tabular-nums;
        color: var(--wled-text);
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: var(--wled-radius-sm);
        background: var(--wled-accent);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        margin-top: 10px;
        min-height: var(--wled-tap);
        transition: transform var(--wled-transition-fast);
      }
      .studio-link:active {
        transform: scale(0.97);
      }
      .hint {
        font-size: 0.8rem;
        color: var(--wled-text-muted);
        margin: 8px 0 0;
      }
      .layout-hint {
        font-style: italic;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: WledStudioCard;
  }
}

export function getStubConfig(): WledStudioCardConfig {
  return { type: `custom:${CARD_TAG}`, controller: "", height: 200, show_segments: false };
}
