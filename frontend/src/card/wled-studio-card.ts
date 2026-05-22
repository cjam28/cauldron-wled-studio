import { css, html, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import type { LovelaceCard } from "custom-card-helpers";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { onHaConnectionReady } from "../api/reconnect.js";
import { listControllers, subscribeLive } from "../api/live-stream.js";
import { applyState, fetchDeviceState } from "../api/wled-state.js";
import { layoutList, type LayoutRecord } from "../api/layout.js";
import type { WledGeometryPreview } from "../components/geometry-preview.js";
import type { WledViewPaint } from "../panel/view-paint.js";
import "../components/geometry-preview.js";
import "../components/segment-controls.js";
import "../panel/view-scenes.js";
import "../panel/view-paint.js";

export const CARD_TAG = "wled-studio-card";

export interface WledStudioCardConfig {
  type: string;
  controller?: string;
  /** Preview area min height (px); layout uses 16:9 aspect. */
  height?: number;
  /** Saved layout id; defaults to first layout for the controller. */
  layout_id?: string;
  show_scenes?: boolean;
}

type CardModeTab = "solid" | "segments" | "scenes" | "paint";

const MODE_TABS: Array<{ id: CardModeTab; label: string; icon: string }> = [
  { id: "solid", label: "Solid", icon: "mdi:palette" },
  { id: "segments", label: "Segments", icon: "mdi:vector-line" },
  { id: "scenes", label: "Scenes", icon: "mdi:palette-swatch" },
  { id: "paint", label: "Paint", icon: "mdi:brush" },
];

@safeCustomElement(CARD_TAG)
export class WledStudioCard extends BasePoweredElement implements LovelaceCard {
  @property({ attribute: false }) public config?: WledStudioCardConfig;

  @state() private _controllerId = "";
  @state() private _masterEntity = "";
  @state() private _pixelCount = 210;
  @state() private _previewStatus = "connecting";
  @state() private _hint = "";
  @state() private _layoutId = "";
  @state() private _fixtureId = "";
  @state() private _cardTab: CardModeTab = "solid";

  @query("wled-geometry-preview") private _preview?: WledGeometryPreview;
  @query("wled-segment-controls") private _segmentControls?: import("../components/segment-controls.js").WledSegmentControls;
  @query("wled-view-paint") private _paintPanel?: WledViewPaint;

  @state() private _selectedSegId = -1;
  /** Optimistic global brightness (0–100) while dragging until HA state catches up. */
  @state() private _globalBriPct: number | null = null;
  @state() private _segments: import("../api/wled-state.js").WledSegment[] = [];

  private _unsubLive?: () => void;
  private _bootstrapGen = 0;
  private _offConnReady?: () => void;
  private _bootstrapControllerKey = "";

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
    return { type: `custom:${CARD_TAG}`, controller: "Cloud", height: 200 };
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._syncSegmentsFromControls();
    if (changed.has("hass") && this._globalBriPct !== null) {
      const actual = this._readGlobalBrightnessPct();
      if (Math.abs(actual - this._globalBriPct) <= 1) {
        this._globalBriPct = null;
      }
    }
    if (changed.has("_cardTab")) {
      void this._onCardTabChanged(
        changed.get("_cardTab") as CardModeTab | undefined
      );
    }
    if (changed.has("_cardTab") || changed.has("_paintPanel")) {
      this._syncPaintPreview();
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
    if (this._cardTab !== "segments") return;
    this._selectedSegId = ev.detail.segmentId;
    this._segmentControls?.selectSegment(ev.detail.segmentId);
  }

  private _onSegmentChange(ev: CustomEvent<{ segmentId: number }>): void {
    this._selectedSegId = ev.detail.segmentId;
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
    const st = this.hass.states[this._masterEntity];
    if (!st) return 0;
    const pct = st.attributes.brightness_pct;
    if (typeof pct === "number" && Number.isFinite(pct)) {
      return Math.max(0, Math.min(100, Math.round(pct)));
    }
    const bri = st.attributes.brightness;
    if (typeof bri === "number" && Number.isFinite(bri)) {
      return Math.round((Math.max(0, Math.min(255, bri)) / 255) * 100);
    }
    return st.state === "on" ? 100 : 0;
  }

  private _globalBrightnessPct(): number {
    if (this._globalBriPct !== null) return this._globalBriPct;
    return this._readGlobalBrightnessPct();
  }

  private _onGlobalBriInput(ev: Event): void {
    this._globalBriPct = Number((ev.target as HTMLInputElement).value);
  }

  private _setGlobalBrightness(ev: Event): void {
    if (!this.hass || !this._masterEntity) return;
    const value = Number((ev.target as HTMLInputElement).value);
    this._globalBriPct = value;
    const bri = Math.round((value / 100) * 255);

    void this.hass.callService("light", "turn_on", {
      entity_id: this._masterEntity,
      brightness_pct: value,
    });

    if (this.hass.connection && this._controllerId) {
      void applyState(this.hass.connection, this._controllerId, { bri, on: true });
    }
  }

  private _togglePower(): void {
    if (!this.hass || !this._masterEntity) return;
    this.hass.callService("light", "toggle", { entity_id: this._masterEntity });
  }

  private _renderModeTabs(): import("lit").TemplateResult {
    return html`
      <div class="mode-tabs" role="tablist" aria-label="Control mode">
        ${MODE_TABS.map(
          (t) => html`
            <button
              type="button"
              role="tab"
              class="mode-tab ${this._cardTab === t.id ? "active" : ""}"
              aria-selected=${this._cardTab === t.id ? "true" : "false"}
              @click=${() => this._selectCardTab(t.id)}
            >
              <ha-icon .icon=${t.icon}></ha-icon>
              <span>${t.label}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderTabPanel(): import("lit").TemplateResult | null {
    if (!this._controllerId || !this.hass?.connection) return null;
    const conn = this.hass.connection;
    const hass = this.hass;

    switch (this._cardTab) {
      case "solid":
        return html`
          <wled-segment-controls
            class="tab-panel"
            .hass=${hass}
            .connection=${conn}
            .controllerId=${this._controllerId}
            wholeMode
            compact
          ></wled-segment-controls>
        `;
      case "segments":
        return html`
          <wled-segment-controls
            class="tab-panel"
            .hass=${hass}
            .connection=${conn}
            .controllerId=${this._controllerId}
            .selectedSegId=${this._selectedSegId}
            compact
            @segment-change=${this._onSegmentChange}
          ></wled-segment-controls>
        `;
      case "scenes":
        return html`
          <wled-view-scenes
            class="tab-panel"
            .connection=${conn}
            .controllerId=${this._controllerId}
            compact
          ></wled-view-scenes>
        `;
      case "paint":
        return html`
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

        <div class="controls">
          <label class="bri-label" for="global-brightness">Brightness</label>
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

        ${this._renderModeTabs()}

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
          .paintMode=${paintTab}
          .paintBrushSize=${paintBrush}
          .paintLivePreview=${paintLivePreview}
          .externalLive=${paintExternalLive}
          @segment-select=${this._onStripSegmentSelect}
          @paint-stroke=${this._onPaintStroke}
        ></wled-geometry-preview>

        <div class="tab-body">${this._renderTabPanel()}</div>

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
        padding: 12px 16px;
        background: var(--card-background-color, var(--ha-card-background));
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
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
      }
      .badge {
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--warning-color, orange);
      }
      .icon-btn {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
      }
      .layout-preview {
        display: block;
        width: 100%;
        margin-bottom: 4px;
      }
      .controls {
        margin: 0 0 10px;
      }
      .bri-label {
        display: block;
        font-size: 0.8rem;
        opacity: 0.85;
        margin-bottom: 4px;
      }
      .mode-tabs {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin-bottom: 10px;
      }
      .mode-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 8px 4px;
        border: none;
        border-radius: 10px;
        background: var(--secondary-background-color);
        color: inherit;
        cursor: pointer;
        font-size: 0.68rem;
        line-height: 1.2;
        transition: background 0.15s ease, color 0.15s ease;
      }
      .mode-tab ha-icon {
        --mdc-icon-size: 22px;
      }
      .mode-tab.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .tab-body {
        max-height: min(48vh, 380px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        margin: 8px 0 4px;
        border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.3));
        padding-top: 10px;
      }
      .tab-panel {
        display: block;
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        margin-top: 8px;
      }
      .hint {
        font-size: 0.8rem;
        opacity: 0.75;
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
  return { type: `custom:${CARD_TAG}`, controller: "", height: 200 };
}
