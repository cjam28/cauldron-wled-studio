import { css, html } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import type { HomeAssistant } from "custom-card-helpers";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { debounce } from "../utils/debounce.js";
import { throttle } from "../utils/throttle.js";
import { formatHaError } from "../utils/ha-error.js";
import { fetchDeviceState } from "../api/wled-state.js";
import { layoutList, type LayoutRecord } from "../api/layout.js";
import { paintFrame, paintStart, paintStop } from "../api/paint.js";
import {
  brushToPaintMode,
  defaultBrushSettings,
  defaultFillSettings,
  type PaintBrushSettings,
  type UnpaintedFillMode,
} from "../utils/paint-settings-types.js";
import { bufferToPreviewPixels } from "../utils/paint-buffer.js";
import type { WledGeometryPreview } from "../components/geometry-preview.js";
import "../components/paint-settings.js";
import "../components/geometry-preview.js";

@safeCustomElement("wled-view-paint")
export class WledViewPaint extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property({ attribute: false }) override hass?: HomeAssistant;
  @property() controllerId = "";
  /** Card embed: paint on a parent ``wled-geometry-preview`` instead of an internal canvas. */
  @property({ type: Boolean, attribute: "embed-mode" }) embedMode = false;
  @property() embedLayoutId = "";
  @property() embedFixtureId = "";
  @property({ type: Number }) embedPixelCount = 0;

  @state() private _pixelCount = 210;
  @state() private _rgbw = true;
  @state() private _active = false;
  @state() private _brush = defaultBrushSettings();
  @state() private _fill = defaultFillSettings("off");
  @state() private _brushSize = 6;
  @state() private _status = "";
  @state() private _warn = "";
  @state() private _effectsByName: Record<string, number> = {};
  @state() private _layouts: LayoutRecord[] = [];
  @state() private _layoutId = "";
  @state() private _fixtureId = "";

  private _buffer: Uint8Array | null = null;
  private _previewPixels: Uint8ClampedArray | null = null;
  private _touched = new Set<number>();
  @query("wled-geometry-preview") private _internalPreview?: WledGeometryPreview;
  private _externalPreview?: WledGeometryPreview;

  private _previewEl(): WledGeometryPreview | undefined {
    return this.embedMode ? this._externalPreview : this._internalPreview;
  }

  get brushSize(): number {
    return this._brushSize;
  }

  get paintLivePreview(): boolean {
    return this._brushIsEffect();
  }

  get paintExternalLive(): boolean {
    return !this._brushIsEffect();
  }

  bindExternalPreview(el: WledGeometryPreview | undefined): void {
    this._externalPreview = el;
    if (el && this._active) {
      el.setStatus("live paint");
    }
    if (el && this._previewPixels) {
      this._syncPreviewPixels();
    } else if (el) {
      void el.refresh();
    }
  }

  handleExternalPaintStroke(ev: CustomEvent<{ leds: number[] }>): void {
    void this._onPaintStroke(ev);
  }

  private _emitPaintConfig(): void {
    this.dispatchEvent(
      new CustomEvent("paint-config-change", { bubbles: true, composed: true })
    );
  }
  private _flushInFlight = false;
  private _flushQueued = false;
  private _flushColor = throttle(() => void this._flushNow(), 20, { trailing: true });
  private _flushEffect = debounce(() => void this._flushNow(), 60, 180);

  private _brushIsEffect(): boolean {
    return brushToPaintMode(this._brush, this._effectsByName) === "effect";
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    if (
      changed.has("_fill") ||
      changed.has("_brush") ||
      changed.has("_buffer") ||
      changed.has("_layoutId")
    ) {
      this._applyFillToBuffer();
      if (this._brushIsEffect()) {
        this._previewEl()?.setPaintPixels(null);
      } else {
        this._syncPreviewPixels();
      }
    }
    if (changed.has("_brush") || changed.has("_brushSize")) {
      this.requestUpdate();
      this._emitPaintConfig();
    }
    if (
      this.embedMode &&
      (changed.has("embedLayoutId") ||
        changed.has("embedFixtureId") ||
        changed.has("embedPixelCount"))
    ) {
      if (this.embedLayoutId) this._layoutId = this.embedLayoutId;
      if (this.embedFixtureId) this._fixtureId = this.embedFixtureId;
      if (this.embedPixelCount > 0) this._pixelCount = this.embedPixelCount;
      void this._previewEl()?.refresh();
    }
  }

  protected override async onPoweredConnect(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      const [snap, layouts] = await Promise.all([
        fetchDeviceState(this.connection, this.controllerId),
        layoutList(this.connection, this.controllerId),
      ]);
      const leds = snap.info?.leds as { count?: number; rgbw?: boolean } | undefined;
      if (leds?.count) this._pixelCount = leds.count;
      if (typeof leds?.rgbw === "boolean") this._rgbw = leds.rgbw;
      this._effectsByName = snap.effects_by_name ?? {};
      const seg0 = snap.segments?.[0];
      if (seg0) {
        const col = seg0.col?.[0];
        const parsed =
          Array.isArray(col) && col.length >= 3
            ? ([col[0], col[1], col[2], col[3] ?? 0] as [
                number,
                number,
                number,
                number,
              ])
            : undefined;
        this._brush = defaultBrushSettings(seg0.fx ?? 0, parsed);
      }
      this._layouts = layouts;
      if (this.embedMode && this.embedLayoutId) {
        this._layoutId = this.embedLayoutId;
        this._fixtureId = this.embedFixtureId || "fixture-0";
        if (this.embedPixelCount > 0) this._pixelCount = this.embedPixelCount;
      } else {
        this._applyLayout(layouts[0]);
      }
      this._allocBuffer();
      this._status = this.embedMode
        ? this._layoutId
          ? "Drag on the strip preview to paint"
          : "Create a layout in Studio → Layout first"
        : layouts.length
          ? "Drag on the layout to paint"
          : "Create a layout in the Layout tab first";
    } catch (err) {
      this._status = formatHaError(err);
    }
  }

  private _applyLayout(layout: LayoutRecord | undefined): void {
    if (!layout) {
      this._layoutId = "";
      this._fixtureId = "";
      return;
    }
    this._layoutId = layout.id;
    const first = layout.fixtures[0] as Record<string, unknown> | undefined;
    this._fixtureId = first ? String(first.id ?? "fixture-0") : "fixture-0";
    if (layout.pixel_count) this._pixelCount = layout.pixel_count;
    void this._previewEl()?.refresh();
  }

  private _onLayoutPick(ev: Event): void {
    const id = (ev.target as HTMLSelectElement).value;
    const layout = this._layouts.find((l) => l.id === id);
    this._applyLayout(layout);
    this._allocBuffer();
  }

  protected override async onPoweredDisconnect(): Promise<void> {
    this._flushColor.cancel();
    this._flushEffect.cancel();
    if (this._active && this.connection && this.controllerId) {
      try {
        await paintStop(this.connection, this.controllerId, false);
      } catch {
        /* ignore */
      }
    }
    this._active = false;
    this._touched.clear();
  }

  private async _ensureSession(): Promise<boolean> {
    if (this._active || !this.connection || !this.controllerId) return this._active;
    try {
      const res = await paintStart(this.connection, this.controllerId);
      this._active = true;
      this._touched.clear();
      this._warn = res.wifi_sleep_warning ?? "";
      if (res.pixel_count) this._pixelCount = res.pixel_count;
      if (typeof res.rgbw === "boolean") this._rgbw = res.rgbw;
      this._allocBuffer();
      this._previewEl()?.setStatus("live paint");
      this._status = "Live paint";
      return true;
    } catch (err) {
      this._status = formatHaError(err);
      return false;
    }
  }

  private _allocBuffer(): void {
    const bpp = this._rgbw ? 4 : 3;
    this._buffer = new Uint8Array(this._pixelCount * bpp);
    this._previewPixels = null;
    this._applyFillToBuffer();
    this._syncPreviewPixels();
  }

  private _syncPreviewPixels(changedLeds?: number[]): void {
    const preview = this._previewEl();
    if (!this._buffer || !preview) return;
    const needFull =
      !this._previewPixels || this._previewPixels.length !== this._pixelCount * 4;
    if (needFull) {
      this._previewPixels = bufferToPreviewPixels(
        this._buffer,
        this._pixelCount,
        this._rgbw
      );
    } else if (changedLeds?.length) {
      const bpp = this._rgbw ? 4 : 3;
      const px = this._previewPixels!;
      for (const i of changedLeds) {
        const o = i * bpp;
        const p = i * 4;
        px[p] = this._buffer[o] ?? 0;
        px[p + 1] = this._buffer[o + 1] ?? 0;
        px[p + 2] = this._buffer[o + 2] ?? 0;
        px[p + 3] = this._rgbw ? (this._buffer[o + 3] ?? 0) : 255;
      }
    } else {
      this._previewPixels = bufferToPreviewPixels(
        this._buffer,
        this._pixelCount,
        this._rgbw
      );
    }
    preview.setPaintPixels(this._previewPixels);
  }

  private _brushRgb(): [number, number, number] {
    const f = Math.max(0, Math.min(255, this._brush.bri)) / 255;
    return [
      Math.round(this._brush.col[0] * f),
      Math.round(this._brush.col[1] * f),
      Math.round(this._brush.col[2] * f),
    ];
  }

  /** End live paint without commit (restores layout segments on device). */
  async cancelLiveIfActive(): Promise<boolean> {
    if (!this._active || !this.connection || !this.controllerId) return false;
    this._flushColor.cancel();
    this._flushEffect.cancel();
    try {
      await paintStop(this.connection, this.controllerId, false);
      this._status = "Live paint ended — layout segments restored";
      this._previewEl()?.setStatus("ready");
    } catch (err) {
      this._status = formatHaError(err);
      return false;
    }
    this._active = false;
    this._touched.clear();
    this._applyFillToBuffer();
    this._syncPreviewPixels();
    this.dispatchEvent(
      new CustomEvent("wled-paint-ended", { bubbles: true, composed: true })
    );
    this._emitPaintConfig();
    return true;
  }

  private _writeLed(led: number, rgb: [number, number, number]): void {
    if (!this._buffer) return;
    const bpp = this._rgbw ? 4 : 3;
    const o = led * bpp;
    this._buffer[o] = rgb[0];
    this._buffer[o + 1] = rgb[1];
    this._buffer[o + 2] = rgb[2];
    if (this._rgbw) this._buffer[o + 3] = 0;
  }

  private _applyFillToBuffer(): void {
    if (!this._buffer) return;
    const fillRgb: [number, number, number] =
      this._fill.mode === "off"
        ? [0, 0, 0]
        : this._fill.mode === "custom"
          ? [this._fill.col[0], this._fill.col[1], this._fill.col[2]]
          : [40, 40, 40];
    for (let i = 0; i < this._pixelCount; i++) {
      if (this._touched.has(i)) continue;
      this._writeLed(i, fillRgb);
    }
  }

  private _scheduleFlush(): void {
    if (this._brushIsEffect()) {
      this._flushEffect();
    } else {
      this._flushColor();
    }
  }

  private _strokeLeds(leds: number[]): void {
    if (!this._buffer || !leds.length) return;
    const effectBrush = this._brushIsEffect();
    if (!effectBrush) {
      const rgb = this._brushRgb();
      for (const idx of leds) {
        this._writeLed(idx, rgb);
        this._touched.add(idx);
      }
      this._syncPreviewPixels(leds);
    } else {
      for (const idx of leds) {
        this._touched.add(idx);
      }
      this._previewEl()?.setPaintPixels(null);
    }
    this._scheduleFlush();
  }

  private async _onPaintStroke(ev: CustomEvent<{ leds: number[] }>): Promise<void> {
    if (!(await this._ensureSession())) return;
    this._strokeLeds(ev.detail.leds);
  }

  private async _flushNow(): Promise<void> {
    if (!this._active || !this.connection || !this._buffer) return;
    if (this._flushInFlight) {
      this._flushQueued = true;
      return;
    }
    this._flushInFlight = true;
    try {
      await paintFrame(this.connection, this.controllerId, this._buffer, {
        rgbw: this._rgbw,
        touched: [...this._touched],
        brush: this._brush,
        fill: this._fill,
        effectsByName: this._effectsByName,
      });
      const modeLabel = this._brushIsEffect() ? "effect (device preview)" : "color";
      this._status = `Live paint · ${this._touched.size} LEDs · ${modeLabel} · fill: ${this._fill.mode}`;
    } catch (err) {
      this._status = formatHaError(err);
    } finally {
      this._flushInFlight = false;
      if (this._flushQueued) {
        this._flushQueued = false;
        void this._flushNow();
      }
    }
  }

  private _onBrushChange(ev: CustomEvent<PaintBrushSettings>): void {
    this._brush = ev.detail;
    this._emitPaintConfig();
    if (this._active) this._scheduleFlush();
  }

  private _onFillChange(ev: CustomEvent<PaintBrushSettings>): void {
    this._fill = { ...ev.detail, mode: this._fill.mode };
    this._applyFillToBuffer();
    this._syncPreviewPixels();
    if (this._active) this._scheduleFlush();
  }

  private _onFillModeChange(mode: UnpaintedFillMode): void {
    this._fill = defaultFillSettings(mode);
    this._applyFillToBuffer();
    this._syncPreviewPixels();
    if (this._active) void this._flushNow();
  }

  private async _commit(): Promise<void> {
    if (!this.connection || !this._active) return;
    this._flushColor.cancel();
    this._flushEffect.cancel();
    await this._flushNow();
    try {
      await paintStop(this.connection, this.controllerId, true);
      this._status = "Committed to WLED";
      this._previewEl()?.setStatus("committed");
    } catch (err) {
      this._status = formatHaError(err);
    }
    this._active = false;
    this._touched.clear();
    this._applyFillToBuffer();
    this._syncPreviewPixels();
  }

  private async _cancel(): Promise<void> {
    if (!this.connection || !this._active) return;
    this._flushColor.cancel();
    this._flushEffect.cancel();
    try {
      await paintStop(this.connection, this.controllerId, false);
      this._status = "Live mode released";
      this._previewEl()?.setStatus("ready");
    } catch (err) {
      this._status = formatHaError(err);
    }
    this._active = false;
    this._touched.clear();
    this._applyFillToBuffer();
    this._syncPreviewPixels();
  }

  protected override render() {
    const hasLayout = Boolean(this._layoutId);
    const compact = this.embedMode;

    return html`
      <section class="paint ${compact ? "compact" : ""}">
        ${compact
          ? null
          : html`
              <p class="lead">
                Paint on your saved fixture layout (${this._pixelCount} LEDs). Unpainted
                areas use the fill below (default <strong>Off</strong>).
              </p>
            `}
        ${this._warn ? html`<p class="warn">${this._warn}</p>` : null}

        ${!this.embedMode && this._layouts.length > 1
          ? html`
              <label class="layout-pick">
                Layout
                <select .value=${this._layoutId} @change=${this._onLayoutPick}>
                  ${this._layouts.map(
                    (l) => html`<option value=${l.id}>${l.name || l.id}</option>`
                  )}
                </select>
              </label>
            `
          : !hasLayout
            ? html`
                <p class="hint warn-layout">
                  No layout saved —
                  ${this.embedMode
                    ? html`open <strong>Studio → Layout</strong> first.`
                    : html`open <strong>Layout</strong> and save a fixture path first.`}
                </p>
              `
            : null}

        ${this.embedMode
          ? null
          : html`
              <div class="layout-canvas">
                <wled-geometry-preview
                  paintMode
                  .externalLive=${!this._brushIsEffect()}
                  .paintLivePreview=${this._brushIsEffect()}
                  .connection=${this.connection}
                  .controllerId=${this.controllerId}
                  .layoutId=${this._layoutId}
                  .fixtureId=${this._fixtureId}
                  .pixelCount=${this._pixelCount}
                  .paintBrushSize=${this._brushSize}
                  @paint-stroke=${this._onPaintStroke}
                ></wled-geometry-preview>
              </div>
            `}

        <div class="settings-grid">
          <wled-paint-settings
            .connection=${this.connection}
            .hass=${this.hass}
            .controllerId=${this.controllerId}
            heading="Brush"
            .settings=${this._brush}
            @settings-change=${this._onBrushChange}
          ></wled-paint-settings>

          <div class="fill-panel">
            <h3 class="heading">Unpainted areas</h3>
            <label class="fill-mode">
              Fill
              <select
                .value=${this._fill.mode}
                @change=${(e: Event) =>
                  this._onFillModeChange(
                    (e.target as HTMLSelectElement).value as UnpaintedFillMode
                  )}
              >
                <option value="off">Off</option>
                <option value="preserve">Keep current look</option>
                <option value="custom">Custom look</option>
              </select>
            </label>
            ${this._fill.mode === "custom"
              ? html`
                  <wled-paint-settings
                    .connection=${this.connection}
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    heading="Fill look"
                    .settings=${this._fill}
                    .showOnToggle=${true}
                    @settings-change=${this._onFillChange}
                  ></wled-paint-settings>
                `
              : this._fill.mode === "preserve"
                ? html`<p class="hint">Unpainted LEDs keep colors from before live paint.</p>`
                : html`<p class="hint">Unpainted LEDs commit as off.</p>`}
          </div>
        </div>

        <div class="tools">
          <label class="brush-row">
            <span>Brush · ${this._brushSize} px</span>
            <ha-slider
              min="1"
              max="20"
              step="1"
              .value=${this._brushSize}
              @change=${(e: Event) => {
                this._brushSize = Number((e.target as HTMLInputElement).value);
                this._emitPaintConfig();
              }}
            ></ha-slider>
          </label>
          <button type="button" ?disabled=${!this._active} @click=${() => this._commit()}>
            End live &amp; commit
          </button>
          <button type="button" ?disabled=${!this._active} @click=${() => this._cancel()}>
            Cancel live
          </button>
        </div>

        <p class="status">${this._status}</p>
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .paint {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .paint.compact {
        gap: 8px;
      }
      .paint.compact .settings-grid {
        grid-template-columns: 1fr;
      }
      .paint.compact .tools {
        gap: 8px;
      }
      .paint.compact .tools button {
        font-size: 0.82rem;
        padding: 6px 10px;
      }
      .lead {
        margin: 0;
        opacity: 0.85;
        font-size: 0.9rem;
      }
      .warn,
      .warn-layout {
        color: var(--warning-color, #e6a700);
        margin: 0;
      }
      .layout-pick {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
        max-width: 320px;
      }
      .layout-canvas {
        width: 100%;
        max-height: min(70vh, 480px);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
      }
      .layout-canvas wled-geometry-preview {
        display: block;
        width: 100%;
      }
      .settings-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: 1fr;
      }
      @media (min-width: 900px) {
        .settings-grid {
          grid-template-columns: 1fr 1fr;
        }
      }
      .fill-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .heading {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
      }
      .fill-mode {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .hint {
        margin: 0;
        font-size: 0.85rem;
        opacity: 0.75;
      }
      .tools {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .brush-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 160px;
        font-size: 0.85rem;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `,
  ];
}
