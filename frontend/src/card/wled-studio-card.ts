import { css, html, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import type { LovelaceCard } from "custom-card-helpers";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { onHaConnectionReady } from "../api/reconnect.js";
import { listControllers, subscribeLive } from "../api/live-stream.js";
import { fetchDeviceState } from "../api/wled-state.js";
import { layoutList, type LayoutRecord } from "../api/layout.js";
import type { WledGeometryPreview } from "../components/geometry-preview.js";
import "../components/geometry-preview.js";
import "../components/segment-controls.js";

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

  @query("wled-geometry-preview") private _preview?: WledGeometryPreview;
  @query("wled-segment-controls") private _segmentControls?: import("../components/segment-controls.js").WledSegmentControls;

  @state() private _selectedSegId = -1;
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
    return 6;
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

  private _togglePower(): void {
    if (!this.hass || !this._masterEntity) return;
    this.hass.callService("light", "toggle", { entity_id: this._masterEntity });
  }

  private _setBrightness(ev: Event): void {
    if (!this.hass || !this._masterEntity) return;
    const value = Number((ev.target as HTMLInputElement).value);
    this.hass.callService("light", "turn_on", {
      entity_id: this._masterEntity,
      brightness_pct: value,
    });
  }

  protected override render() {
    const height = this.config?.height ?? 200;
    const remote = this.remote.state;
    const previewStyle = `--wled-preview-height: ${height}px`;

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
          .selectedSegId=${this._selectedSegId}
          @segment-select=${this._onStripSegmentSelect}
        ></wled-geometry-preview>

        <div class="controls">
          <label class="sr-only" for="brightness">Brightness</label>
          <ha-slider
            id="brightness"
            min="0"
            max="100"
            step="1"
            ?disabled=${!this._masterEntity}
            @change=${this._setBrightness}
          ></ha-slider>
        </div>

        ${this._controllerId && this.hass?.connection
          ? html`
              <wled-segment-controls
                class="segment-block"
                .hass=${this.hass}
                .connection=${this.hass.connection}
                .controllerId=${this._controllerId}
                .selectedSegId=${this._selectedSegId}
                compact
                @segment-change=${this._onSegmentChange}
              ></wled-segment-controls>
            `
          : null}

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
        margin: 10px 0;
      }
      .segment-block {
        margin: 8px 0 4px;
        border-top: 1px solid var(--divider-color, rgba(128, 128, 128, 0.3));
        padding-top: 10px;
      }
      .studio-link {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .hint {
        font-size: 0.8rem;
        opacity: 0.75;
        margin: 8px 0 0;
      }
      .layout-hint {
        font-style: italic;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
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
