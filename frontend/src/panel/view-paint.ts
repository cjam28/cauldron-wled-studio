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
import {
  fetchPaintBaselineFrame,
  paintFrame,
  paintStart,
  paintStatus,
  paintStop,
} from "../api/paint.js";
import type { PaintConnectionHealth } from "../api/paint.js";
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

/**
 * SP-4: while a paint session is active, poll the backend paint_status on this
 * cadence so an IDLE mid-paint disconnect (no new strokes → no paint_frame) is
 * surfaced on the recovery banner. Polling stops the moment the session ends.
 */
const PAINT_HEALTH_POLL_MS = 2000;

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
  /** SP-4: paint-session connection health; drives the recovery banner. */
  @state() private _connectionHealthy = true;
  @state() private _connectionReason = "";
  /** SP-5: live pre-commit segment-count warning (chip shown near 80% of maxseg). */
  @state() private _segWarn = false;
  @state() private _segCount: number | null = null;
  @state() private _maxSegments: number | null = null;

  private _buffer: Uint8Array | null = null;
  private _previewPixels: Uint8ClampedArray | null = null;
  private _touched = new Set<number>();
  /**
   * "Keep current look" baseline: the device's ACTUAL current per-LED frame
   * (live_proxy's last good frame), stored as a flat RGB(W) buffer aligned to
   * _pixelCount + _rgbw. Seeds the UNPAINTED LEDs of the canvas in preserve mode
   * so the user paints over the real colors, not a gray placeholder. Null until
   * fetched, or when the fetch came back empty (→ dim-placeholder fallback).
   */
  private _baselineFrame: Uint8Array | null = null;
  /** SP-4: active-session health poll timer (idle-disconnect detection). */
  private _healthPollTimer: ReturnType<typeof setInterval> | null = null;
  private _healthPollInFlight = false;
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
    this._stopHealthPoll();
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

  /** In-flight start, so a burst of pointermove strokes shares ONE paint_start. */
  private _startPromise: Promise<boolean> | null = null;

  private _ensureSession(): Promise<boolean> {
    if (this._active || !this.connection || !this.controllerId) {
      return Promise.resolve(this._active);
    }
    // pointermove fires paint-stroke events faster than the paint_start
    // round-trip resolves; without this guard every early stroke issued its
    // own paint_start (leaking transports/keepalives server-side too).
    if (!this._startPromise) {
      this._startPromise = this._startSession().finally(() => {
        this._startPromise = null;
      });
    }
    return this._startPromise;
  }

  private async _startSession(): Promise<boolean> {
    const connection = this.connection;
    if (!connection || !this.controllerId) return false;
    try {
      // Preserve mode: capture the device's current look BEFORE paintStart puts
      // the device into live paint. Fetching AFTER start would capture the
      // live-paint state (wiping the current look out from under the strokes).
      // The backend also freezes this baseline for the session as a backstop.
      if (this._fill.mode === "preserve") {
        await this._refreshBaselineFrame();
      }
      const res = await paintStart(connection, this.controllerId);
      this._active = true;
      this._touched.clear();
      this._connectionHealthy = true;
      this._connectionReason = "";
      this._segWarn = false;
      this._segCount = null;
      this._maxSegments = null;
      this._warn = res.wifi_sleep_warning ?? "";
      if (res.pixel_count) this._pixelCount = res.pixel_count;
      if (typeof res.rgbw === "boolean") this._rgbw = res.rgbw;
      this._allocBuffer();
      this._previewEl()?.setStatus("live paint");
      this._status = "Live paint";
      this._startHealthPoll();
      // Baseline was captured BEFORE paintStart (above) and _allocBuffer() has
      // already seeded the unpainted LEDs from it — do NOT re-fetch here, that
      // would read the live-paint state and wipe the current look.
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
    const [r, g, b] = this._brushRgbw();
    return [r, g, b];
  }

  /**
   * Brush color scaled by brush brightness, including the W (white) channel.
   *
   * Mirrors the Python commit path (`_scale_col_by_bri`): all four channels are
   * multiplied by `bri/255`. `_writeLed` consumes the W element on RGBW strips so
   * the paint buffer (and thus the DDP frame + preview) preserves white. RGB
   * strips ignore the 4th element.
   */
  private _brushRgbw(): [number, number, number, number] {
    const f = Math.max(0, Math.min(255, this._brush.bri)) / 255;
    return [
      Math.round(this._brush.col[0] * f),
      Math.round(this._brush.col[1] * f),
      Math.round(this._brush.col[2] * f),
      Math.round((this._brush.col[3] ?? 0) * f),
    ];
  }

  /** End live paint without commit (restores layout segments on device). */
  async cancelLiveIfActive(): Promise<boolean> {
    if (!this._active || !this.connection || !this.controllerId) return false;
    this._flushColor.cancel();
    this._flushEffect.cancel();
    this._stopHealthPoll();
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

  /**
   * Write one LED into the paint buffer.
   *
   * `rgb` may carry an optional 4th element (W). On an RGBW strip the W channel
   * is written through to the buffer (the brush supplies a scaled W; the fill
   * path omits it so unpainted W stays 0). On an RGB strip no 4th byte exists,
   * so any W is ignored.
   */
  private _writeLed(
    led: number,
    rgb: [number, number, number] | [number, number, number, number]
  ): void {
    if (!this._buffer) return;
    const bpp = this._rgbw ? 4 : 3;
    const o = led * bpp;
    this._buffer[o] = rgb[0];
    this._buffer[o + 1] = rgb[1];
    this._buffer[o + 2] = rgb[2];
    if (this._rgbw) this._buffer[o + 3] = rgb[3] ?? 0;
  }

  private _applyFillToBuffer(): void {
    if (!this._buffer) return;
    // Preserve ("Keep current look"): seed each UNPAINTED LED from the device's
    // actual current frame so the canvas shows the real colors the user is
    // painting over. Falls back to the dim placeholder when no baseline frame
    // has been fetched (or it came back empty) — no regression vs. the old gray.
    if (this._fill.mode === "preserve" && this._hasBaselineFrame()) {
      const base = this._baselineFrame!;
      const bpp = this._rgbw ? 4 : 3;
      for (let i = 0; i < this._pixelCount; i++) {
        if (this._touched.has(i)) continue;
        const o = i * bpp;
        const rgbw: [number, number, number, number] = [
          base[o] ?? 0,
          base[o + 1] ?? 0,
          base[o + 2] ?? 0,
          this._rgbw ? (base[o + 3] ?? 0) : 0,
        ];
        this._writeLed(i, rgbw);
      }
      return;
    }
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

  /** True when a baseline ("current look") frame is cached and aligned. */
  private _hasBaselineFrame(): boolean {
    const bpp = this._rgbw ? 4 : 3;
    return (
      this._baselineFrame !== null &&
      this._baselineFrame.length >= this._pixelCount * bpp
    );
  }

  /**
   * Fetch the device's current per-LED frame for preserve ("Keep current look")
   * mode and seed the canvas's unpainted LEDs from it. No-op when not in
   * preserve mode. On an empty/failed fetch the baseline is cleared so
   * _applyFillToBuffer falls back to the dim placeholder (no regression).
   * Painted (_touched) LEDs are never disturbed — _applyFillToBuffer skips them.
   */
  private async _refreshBaselineFrame(): Promise<void> {
    if (this._fill.mode !== "preserve") return;
    if (!this.connection || !this.controllerId) return;
    try {
      const frame = await fetchPaintBaselineFrame(
        this.connection,
        this.controllerId
      );
      // The fill mode may have changed while the fetch was in flight.
      if (this._fill.mode !== "preserve") return;
      if (frame.count > 0 && frame.pixels.length) {
        const buf = Uint8Array.from(frame.pixels);
        // Align the source bpp (frame.rgbw) to our buffer's bpp (_rgbw).
        this._baselineFrame =
          frame.rgbw === this._rgbw
            ? buf
            : this._realignBaseline(buf, frame.rgbw, frame.count);
      } else {
        this._baselineFrame = null;
      }
    } catch {
      // Network/RPC failure → dim-placeholder fallback (no regression).
      this._baselineFrame = null;
    }
    this._applyFillToBuffer();
    this._syncPreviewPixels();
  }

  /** Re-pack a baseline frame from its source bpp into the canvas's bpp. */
  private _realignBaseline(
    src: Uint8Array,
    srcRgbw: boolean,
    count: number
  ): Uint8Array {
    const srcBpp = srcRgbw ? 4 : 3;
    const dstBpp = this._rgbw ? 4 : 3;
    const out = new Uint8Array(count * dstBpp);
    for (let i = 0; i < count; i++) {
      const s = i * srcBpp;
      const d = i * dstBpp;
      out[d] = src[s] ?? 0;
      out[d + 1] = src[s + 1] ?? 0;
      out[d + 2] = src[s + 2] ?? 0;
      if (this._rgbw) out[d + 3] = srcRgbw ? (src[s + 3] ?? 0) : 0;
    }
    return out;
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
      // RGBW strips keep the scaled W channel; RGB strips need only [r,g,b].
      const col = this._rgbw ? this._brushRgbw() : this._brushRgb();
      for (const idx of leds) {
        this._writeLed(idx, col);
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
      const health = await paintFrame(
        this.connection,
        this.controllerId,
        this._buffer,
        {
          rgbw: this._rgbw,
          touched: [...this._touched],
          brush: this._brush,
          fill: this._fill,
          effectsByName: this._effectsByName,
        }
      );
      this._applyPaintHealth(health);
      const modeLabel = this._brushIsEffect() ? "effect (device preview)" : "color";
      this._status = `Live paint · ${this._touched.size} LEDs · ${modeLabel} · fill: ${this._fill.mode}`;
    } catch (err) {
      this._status = formatHaError(err);
      // SP-4: a flush failure may be the first sign of a lost connection — probe
      // paint_status immediately so the recovery banner updates without waiting
      // for the next poll tick.
      void this._pollHealthNow();
    } finally {
      this._flushInFlight = false;
      if (this._flushQueued) {
        this._flushQueued = false;
        void this._flushNow();
      }
    }
  }

  /** SP-4: surface a "paint connection lost — reconnecting" recovery banner. */
  private _applyPaintHealth(health: PaintConnectionHealth): void {
    this._connectionHealthy = health.connectionHealthy;
    this._connectionReason = health.connectionHealthy
      ? ""
      : health.connectionReason || "Paint connection lost — reconnecting…";
    // SP-5: live segment-count warning. Keep the last reported count so the chip
    // shows e.g. "Using 26/32 segments" even between frames.
    this._segWarn = health.segWarn;
    if (health.segCount !== null) this._segCount = health.segCount;
    if (health.maxSegments !== null) this._maxSegments = health.maxSegments;
  }

  /**
   * SP-4: begin polling paint_status while a session is active so an IDLE
   * mid-paint disconnect surfaces on the recovery banner WITHOUT requiring new
   * strokes. Idempotent; cleaned up on disconnect via addUnsub.
   */
  private _startHealthPoll(): void {
    if (this._healthPollTimer !== null) return;
    this._healthPollTimer = setInterval(
      () => void this._pollHealthNow(),
      PAINT_HEALTH_POLL_MS
    );
    this.addUnsub(() => this._stopHealthPoll());
  }

  /** SP-4: stop the active-session health poll (session ended / element gone). */
  private _stopHealthPoll(): void {
    if (this._healthPollTimer !== null) {
      clearInterval(this._healthPollTimer);
      this._healthPollTimer = null;
    }
    this._healthPollInFlight = false;
  }

  /**
   * SP-4: one paint_status probe. Feeds the result into _applyPaintHealth so the
   * "connection lost — reconnecting" banner updates between strokes. A failed
   * probe (the idle-disconnect signal) drives the banner unhealthy directly.
   * Also invoked on flush failure for a faster signal.
   */
  private async _pollHealthNow(): Promise<void> {
    if (!this._active || !this.connection || !this.controllerId) return;
    if (this._healthPollInFlight) return;
    this._healthPollInFlight = true;
    try {
      const status = await paintStatus(this.connection, this.controllerId);
      // The session may have ended while the probe was in flight.
      if (!this._active) return;
      if (!status.active) {
        // Backend dropped the session out from under us — treat as a lost
        // connection so the banner shows even though no stroke is happening.
        this._applyPaintHealth({
          ...status,
          connectionHealthy: false,
          connectionReason:
            status.connectionReason || "Paint connection lost — reconnecting…",
        });
        return;
      }
      this._applyPaintHealth(status);
    } catch {
      // An idle poll failure IS the disconnect signal: surface the banner.
      // Preserve the last-known segment-count state (don't clobber the chip).
      if (this._active) {
        this._applyPaintHealth({
          connectionHealthy: false,
          connectionReason: "Paint connection lost — reconnecting…",
          consecutiveSendFailures: 0,
          segCount: this._segCount,
          maxSegments: this._maxSegments,
          segWarn: this._segWarn,
        });
      }
    } finally {
      this._healthPollInFlight = false;
    }
  }

  /** SP-5: human-readable segment-budget warning, or "" when not warning. */
  private _segWarnText(): string {
    if (!this._segWarn) return "";
    const max = this._maxSegments ?? "?";
    const count = this._segCount ?? "?";
    return `Using ${count}/${max} segments — simplify to avoid commit failure`;
  }

  /** Read-only view of the live paint connection health (test/host hook). */
  get paintConnectionHealthy(): boolean {
    return this._connectionHealthy;
  }

  /** SP-5 test/host hook: true when the segment-budget warning chip is shown. */
  get paintSegmentWarn(): boolean {
    return this._segWarn;
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
    // Leaving preserve mode drops the stale baseline so a later re-entry refetches.
    if (mode !== "preserve") this._baselineFrame = null;
    this._applyFillToBuffer();
    this._syncPreviewPixels();
    if (this._active) void this._flushNow();
    // Switching the Fill dropdown to "Keep current look" fetches the device's
    // current frame and reseeds the canvas's unpainted LEDs from it.
    if (mode === "preserve") void this._refreshBaselineFrame();
  }

  private async _commit(): Promise<void> {
    if (!this.connection || !this._active) return;
    this._flushColor.cancel();
    this._flushEffect.cancel();
    this._stopHealthPoll();
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
    this._stopHealthPoll();
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
        ${this._active && !this._connectionHealthy
          ? html`<p class="recovery" role="status">
              ${this._connectionReason || "Paint connection lost — reconnecting…"}
            </p>`
          : null}
        ${this._active && this._segWarn
          ? html`<p class="seg-warn" role="status">${this._segWarnText()}</p>`
          : null}

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
      .recovery {
        margin: 0;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 0.85rem;
        color: var(--error-color, #db4437);
        background: color-mix(in srgb, var(--error-color, #db4437) 12%, transparent);
      }
      .seg-warn {
        margin: 0;
        padding: 6px 10px;
        border-radius: 999px;
        align-self: flex-start;
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--warning-color, #e6a700);
        background: color-mix(in srgb, var(--warning-color, #e6a700) 16%, transparent);
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
