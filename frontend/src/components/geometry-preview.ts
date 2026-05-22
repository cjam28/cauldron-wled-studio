import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import type { LiveFrameEvent } from "../api/live-stream.js";
import { subscribeLive } from "../api/live-stream.js";
import { expandToFixture } from "../api/lv-frame-parser.js";
import { layoutGet, layoutResolvePositions, type LedPosition } from "../api/layout.js";
import type { WledSegment } from "../api/wled-state.js";
import {
  backgroundFromLayout,
  drawBackgroundLayer,
  type BackgroundLayer,
} from "../utils/background-layer.js";
import { loadHaImage } from "../utils/ha-image.js";

/**
 * 2-D scatter preview: one circle per LED positioned from resolved geometry.
 * Falls back to a linear strip layout when positions are unavailable.
 */
@safeCustomElement("wled-geometry-preview")
export class WledGeometryPreview extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @property() layoutId = "";
  @property() fixtureId = "";
  @property({ type: Number }) pixelCount = 210;
  @property({ type: Number }) dotRadius = 4;
  /** Card / compact embed: fixed preview height, no dots toggle, parent feeds live frames. */
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Number }) heightPx = 200;
  /** When true, do not subscribe to live WS (parent calls setFrame). */
  @property({ type: Boolean }) externalLive = false;
  /** Paint tool: layout canvas drives brush strokes via ``paint-stroke`` events. */
  @property({ type: Boolean, reflect: true }) paintMode = false;
  /** Effect brush: show device live stream instead of solid DDP buffer overlay. */
  @property({ type: Boolean }) paintLivePreview = false;
  @property({ type: Number }) paintBrushSize = 6;
  @property({ type: Array }) segments: WledSegment[] = [];
  @property({ type: Number }) selectedSegId = -1;

  @state() private _positions: LedPosition[] = [];
  @state() private _status = "waiting";
  /** false = solid strip (default); true = per-LED dots */
  @state() private _showDots = false;
  @state() private _closed = false;
  private _bgLayer: BackgroundLayer | null = null;
  private _bgImage: HTMLImageElement | null = null;
  private _canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private _pixels?: Uint8ClampedArray;
  private _paintPixels?: Uint8ClampedArray;
  private _raf = 0;
  private _resizeObs?: ResizeObserver;
  private _unsubLive?: () => void;
  private _hoverLed = -1;
  private _painting = false;
  private _lastLivePaintMs = 0;

  /** Called externally (e.g. by view-layout) when a live frame arrives. */
  setFrame(frame: LiveFrameEvent | null): void {
    if (!frame || (this.paintMode && !this.paintLivePreview)) return;
    if (this.paintMode && this.paintLivePreview) {
      const now = performance.now();
      if (now - this._lastLivePaintMs < 50) return;
      this._lastLivePaintMs = now;
    }
    this._pixels = expandToFixture(frame, this.pixelCount);
    this._status = "live";
    this._schedPaint();
  }

  /** Paint tool: parent pushes RGBA pixels (one LED per 4 bytes). */
  setPaintPixels(pixels: Uint8ClampedArray | null): void {
    this._paintPixels = pixels ?? undefined;
    if (this.paintMode) {
      this._status = pixels ? "paint" : "ready";
    }
    this._schedPaint();
  }

  setStatus(s: string): void {
    this._status = s;
    this.requestUpdate();
  }

  /** Reload positions from saved layout (e.g. after Save layout). */
  async refresh(): Promise<void> {
    await this._resolvePositions();
  }

  protected override onPoweredConnect(): void {
    void this._resolvePositions();
    this._syncLiveSubscription();
  }

  protected override onPoweredDisconnect(): void {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._resizeObs?.disconnect();
    this._unsubLive?.();
    this._unsubLive = undefined;
  }

  private _wantsLiveStream(): boolean {
    return !this.externalLive || (this.paintMode && this.paintLivePreview);
  }

  private _syncLiveSubscription(): void {
    if (this._wantsLiveStream()) {
      if (!this._unsubLive) this._attachLiveStream();
      return;
    }
    this._unsubLive?.();
    this._unsubLive = undefined;
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    super.updated(changed);
    if (
      changed.has("connection") ||
      changed.has("controllerId") ||
      changed.has("layoutId") ||
      changed.has("fixtureId")
    ) {
      void this._resolvePositions();
      this._syncLiveSubscription();
    }
    if (
      changed.has("externalLive") ||
      changed.has("paintLivePreview") ||
      changed.has("paintMode")
    ) {
      this._syncLiveSubscription();
    }
    if (changed.has("selectedSegId") || changed.has("segments") || changed.has("paintMode")) {
      this._schedPaint();
      if (changed.has("paintMode") && this._canvas) {
        this._canvas.style.cursor = this.paintMode ? "crosshair" : "pointer";
        if (this.paintMode) {
          queueMicrotask(() => this._onResize());
        }
      }
    }
  }

  protected override firstUpdated(): void {
    this._canvas = this.renderRoot.querySelector("canvas") ?? undefined;
    if (this._canvas) {
      this._ctx = this._canvas.getContext("2d", { alpha: true }) ?? undefined;
      this._resizeObs = new ResizeObserver(() => this._onResize());
      this._resizeObs.observe(this._canvas);
      const c = this._canvas;
      c.style.touchAction = "none";
      c.addEventListener("pointerdown", this._onPaintPointerDown);
      c.addEventListener("pointermove", this._onPaintPointerMove);
      c.addEventListener("pointerup", this._onPaintPointerUp);
      c.addEventListener("pointerleave", this._onPaintPointerLeave);
      c.addEventListener("click", this._onCanvasClick);
      c.addEventListener("mousemove", this._onCanvasMove);
      c.addEventListener("mouseleave", this._onCanvasLeave);
      this.addUnsub(() => {
        c.removeEventListener("pointerdown", this._onPaintPointerDown);
        c.removeEventListener("pointermove", this._onPaintPointerMove);
        c.removeEventListener("pointerup", this._onPaintPointerUp);
        c.removeEventListener("pointerleave", this._onPaintPointerLeave);
        c.removeEventListener("click", this._onCanvasClick);
        c.removeEventListener("mousemove", this._onCanvasMove);
        c.removeEventListener("mouseleave", this._onCanvasLeave);
      });
    }
    this._onResize();
  }

  private _onCanvasClick = (ev: MouseEvent): void => {
    if (this.paintMode) return;
    const led = this._ledAtEvent(ev);
    if (led < 0) return;
    const segId = this._segmentForLed(led);
    if (segId < 0) return;
    this.dispatchEvent(
      new CustomEvent("segment-select", {
        detail: { segmentId: segId, ledIndex: led },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _emitPaintStroke(led: number): void {
    if (led < 0) return;
    const half = Math.max(1, Math.floor(this.paintBrushSize / 2));
    const leds: number[] = [];
    for (let d = -half; d <= half; d++) {
      const idx = led + d;
      if (idx >= 0 && idx < this.pixelCount) leds.push(idx);
    }
    if (!leds.length) return;
    this.dispatchEvent(
      new CustomEvent("paint-stroke", {
        detail: { led, leds },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onPaintPointerDown = (ev: PointerEvent): void => {
    if (!this.paintMode) return;
    this._painting = true;
    (ev.target as HTMLCanvasElement).setPointerCapture(ev.pointerId);
    const led = this._ledAtEvent(ev);
    this._emitPaintStroke(led);
  };

  private _onPaintPointerMove = (ev: PointerEvent): void => {
    if (!this.paintMode || !this._painting) return;
    const led = this._ledAtEvent(ev);
    this._emitPaintStroke(led);
  };

  private _onPaintPointerUp = (ev: PointerEvent): void => {
    if (!this.paintMode) return;
    this._painting = false;
    try {
      (ev.target as HTMLCanvasElement).releasePointerCapture(ev.pointerId);
    } catch {
      /* ignore */
    }
  };

  private _onPaintPointerLeave = (): void => {
    this._painting = false;
  };

  private _onCanvasMove = (ev: MouseEvent): void => {
    const led = this._ledAtEvent(ev);
    if (led !== this._hoverLed) {
      this._hoverLed = led;
      this._schedPaint();
    }
  };

  private _onCanvasLeave = (): void => {
    if (this._hoverLed >= 0) {
      this._hoverLed = -1;
      this._schedPaint();
    }
  };

  private _segmentForLed(led: number): number {
    for (const seg of this.segments) {
      const start = seg.start ?? 0;
      const stop = seg.stop ?? seg.len ?? this.pixelCount;
      if (led >= start && led < stop) return seg.id;
    }
    if (this.segments.length === 1) return this.segments[0].id;
    return -1;
  }

  private _ledInSegment(led: number, segId: number): boolean {
    if (segId < 0) return false;
    const seg = this.segments.find((s) => s.id === segId);
    if (!seg) return false;
    const start = seg.start ?? 0;
    const stop = seg.stop ?? seg.len ?? this.pixelCount;
    return led >= start && led < stop;
  }

  private _ledAtEvent(ev: MouseEvent): number {
    const hit = this._hitTest(ev.clientX, ev.clientY);
    return hit?.led ?? -1;
  }

  /** Logical draw size (matches ctx after DPR transform). */
  private _logicalCanvasSize(): { w: number; h: number } {
    const canvas = this._canvas;
    if (!canvas) return { w: 0, h: 0 };
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    return { w: canvas.width / dpr, h: canvas.height / dpr };
  }

  /** Map screen pointer to layout canvas coordinates (handles CSS scaling). */
  private _pointerToLogical(clientX: number, clientY: number): [number, number] | null {
    const canvas = this._canvas;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return null;
    const { w, h } = this._logicalCanvasSize();
    return [
      ((clientX - rect.left) / rect.width) * w,
      ((clientY - rect.top) / rect.height) * h,
    ];
  }

  private _hitTest(clientX: number, clientY: number): LedPosition | null {
    const canvas = this._canvas;
    if (!canvas || this._positions.length === 0) return null;
    const logical = this._pointerToLogical(clientX, clientY);
    if (!logical) return null;
    const [x, y] = logical;
    const { w, h } = this._logicalCanvasSize();
    const map = this._layoutMap(w, h);
    if (!map) return null;
    const { toCanvas, hitR } = map;
    let best: LedPosition | null = null;
    let bestD = hitR * hitR;
    for (const p of this._positions) {
      const [cx, cy] = toCanvas(p.x, p.y);
      const dx = cx - x;
      const dy = cy - y;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestD) {
        bestD = d2;
        best = p;
      }
    }
    return best;
  }

  private _positionExtents(): {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    rangeX: number;
    rangeY: number;
  } | null {
    if (this._positions.length === 0) return null;
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (const p of this._positions) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    return {
      minX,
      maxX,
      minY,
      maxY,
      rangeX: maxX - minX || 1,
      rangeY: maxY - minY || 1,
    };
  }

  private _applyLayoutAspectCss(): void {
    if (!this.paintMode) {
      this.style.removeProperty("--wled-layout-aspect");
      return;
    }
    const ext = this._positionExtents();
    if (!ext) {
      this.style.removeProperty("--wled-layout-aspect");
      return;
    }
    const aspect = Math.max(0.35, Math.min(3.5, ext.rangeX / ext.rangeY));
    this.style.setProperty("--wled-layout-aspect", String(aspect));
    queueMicrotask(() => this._onResize());
  }

  private _layoutMap(
    w: number,
    h: number
  ): {
    toCanvas: (x: number, y: number) => [number, number];
    hitR: number;
    lineW: number;
  } | null {
    const ext = this._positionExtents();
    if (!ext) return null;
    const { minX, minY, rangeX, rangeY } = ext;
    const r = this.dotRadius;
    const pad = this.paintMode ? r * 2 : r * 3;
    const scaleX = (w - pad * 2) / rangeX;
    const scaleY = (h - pad * 2) / rangeY;
    const scale = Math.min(scaleX, scaleY);
    const toCanvas = (x: number, y: number): [number, number] => [
      pad + (x - minX) * scale,
      pad + (y - minY) * scale,
    ];
    const lineW = Math.max(2.5, r * 1.35);
    return { toCanvas, hitR: Math.max(10, lineW * 2.5), lineW };
  }

  private _accentStroke(): string {
    const css = getComputedStyle(this);
    const primary = css.getPropertyValue("--primary-color").trim();
    return primary || "#18a0fb";
  }

  private _onResize(): void {
    const canvas = this._canvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    // Cap bitmap size — canvas width/height attrs affect layout in some browsers.
    const cssW = Math.min(1200, Math.max(1, Math.floor(rect.width)));
    const cssH = Math.min(600, Math.max(1, Math.floor(rect.height)));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const bmpW = Math.floor(cssW * dpr);
    const bmpH = Math.floor(cssH * dpr);
    if (canvas.width !== bmpW || canvas.height !== bmpH) {
      canvas.width = bmpW;
      canvas.height = bmpH;
      const ctx = this._ctx;
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      this._schedPaint();
    }
  }

  private async _resolvePositions(): Promise<void> {
    if (!this.connection || !this.controllerId || !this.fixtureId) return;
    try {
      if (this.layoutId) {
        const layout = await layoutGet(
          this.connection,
          this.controllerId,
          this.layoutId
        );
        if (layout) {
          this._bgLayer = backgroundFromLayout(layout);
          this._loadBackgroundImage();
          const fixtures = layout.fixtures ?? [];
          const fixture = (
            this.fixtureId
              ? fixtures.find(
                  (f) =>
                    String((f as Record<string, unknown>).id ?? "") === this.fixtureId
                )
              : fixtures[0]
          ) as Record<string, unknown> | undefined;
          this._closed = Boolean(fixture?.closed ?? false);
        }
      }
      this._positions = await layoutResolvePositions(
        this.connection,
        this.controllerId,
        this.fixtureId,
        this.layoutId || undefined
      );
      this._applyLayoutAspectCss();
      queueMicrotask(() => this._onResize());
      this._schedPaint();
    } catch {
      this._positions = [];
      this._applyLayoutAspectCss();
    }
  }

  private _loadBackgroundImage(): void {
    const url = this._bgLayer?.url;
    if (!url) {
      this._bgImage = null;
      return;
    }
    void loadHaImage(url).then(
      (img) => {
        this._bgImage = img;
        this._schedPaint();
      },
      () => {
        this._bgImage = null;
      }
    );
  }

  private _attachLiveStream(): void {
    if (!this.connection || !this.controllerId || this._unsubLive) return;
    this._unsubLive = subscribeLive(this.connection, this.controllerId, (frame) => {
      this.setFrame(frame);
    });
    this.addUnsub(() => {
      this._unsubLive?.();
      this._unsubLive = undefined;
    });
  }

  private _schedPaint(): void {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this._paint();
    });
  }

  private _rgbForLed(
    pixels: Uint8ClampedArray | undefined,
    led: number
  ): [number, number, number] {
    if (!pixels) return [80, 80, 80];
    const o = led * 4;
    return [pixels[o], pixels[o + 1], pixels[o + 2]];
  }

  private _paint(): void {
    const ctx = this._ctx;
    const canvas = this._canvas;
    if (!ctx || !canvas) return;

    const { w, h } = this._logicalCanvasSize();
    if (w < 1 || h < 1) return;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, w, h);

    if (this._bgImage?.complete && this._bgLayer) {
      drawBackgroundLayer(ctx, w, h, this._bgImage, this._bgLayer);
    }

    const pixels =
      this.paintMode && this._paintPixels && !this.paintLivePreview
        ? this._paintPixels
        : this._pixels;
    const positions = [...this._positions].sort((a, b) => a.led - b.led);
    const r = this.dotRadius;
    const map = this._layoutMap(w, h);

    if (positions.length > 0 && map) {
      const { toCanvas, lineW } = map;
      const disableBloom = this.remote.state.disableBloom;

      if (!this._showDots) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lineW;

        const drawStripEdge = (from: LedPosition, to: LedPosition): void => {
          const [x0, y0] = toCanvas(from.x, from.y);
          const [x1, y1] = toCanvas(to.x, to.y);
          const [red, green, blue] = this._rgbForLed(pixels, from.led);
          if (!disableBloom && (red > 10 || green > 10 || blue > 10)) {
            ctx.shadowColor = `rgba(${red},${green},${blue},0.55)`;
            ctx.shadowBlur = lineW * 1.5;
          } else {
            ctx.shadowBlur = 0;
          }
          ctx.strokeStyle = `rgb(${red},${green},${blue})`;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        };

        for (let i = 0; i < positions.length - 1; i++) {
          drawStripEdge(positions[i], positions[i + 1]);
        }
        if (this._closed && positions.length >= 2) {
          drawStripEdge(positions[positions.length - 1], positions[0]);
        }
        ctx.shadowBlur = 0;
      }

      if (this._showDots) {
        for (const { x, y, led } of positions) {
          const [cx, cy] = toCanvas(x, y);
          const [red, green, blue] = this._rgbForLed(pixels, led);

          if (!disableBloom && (red > 10 || green > 10 || blue > 10)) {
            ctx.shadowColor = `rgba(${red},${green},${blue},0.7)`;
            ctx.shadowBlur = r * 2.5;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${red},${green},${blue})`;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      if (!this.paintMode) {
        this._paintSegmentSelection(ctx, positions, toCanvas, lineW);
      } else if (this._hoverLed >= 0) {
        this._paintBrushHover(ctx, positions, toCanvas);
      }
    } else {
      // Linear fallback
      const n = this.pixelCount;
      const segW = (w - 8) / n;
      const cy = h / 2;
      for (let i = 0; i < n; i++) {
        let red = 80, green = 80, blue = 80;
        if (pixels) {
          const o = i * 4;
          red = pixels[o];
          green = pixels[o + 1];
          blue = pixels[o + 2];
        }
        ctx.beginPath();
        ctx.arc(4 + i * segW + segW / 2, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${red},${green},${blue})`;
        ctx.fill();
      }
    }
  }

  /** Paint mode: ring at hovered LED so crosshair aligns with the stroke target. */
  private _paintBrushHover(
    ctx: CanvasRenderingContext2D,
    positions: LedPosition[],
    toCanvas: (x: number, y: number) => [number, number]
  ): void {
    const pt = positions.find((p) => p.led === this._hoverLed);
    if (!pt) return;
    const [cx, cy] = toCanvas(pt.x, pt.y);
    const r = Math.max(8, this.dotRadius * 2.5);
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = this._accentStroke();
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - r - 4, cy);
    ctx.lineTo(cx + r + 4, cy);
    ctx.moveTo(cx, cy - r - 4);
    ctx.lineTo(cx, cy + r + 4);
    ctx.stroke();
    ctx.restore();
  }

  /** Accent border along the selected segment path (no per-LED white overlay). */
  private _paintSegmentSelection(
    ctx: CanvasRenderingContext2D,
    positions: LedPosition[],
    toCanvas: (x: number, y: number) => [number, number],
    lineW: number
  ): void {
    const highlightId =
      this.selectedSegId >= 0
        ? this.selectedSegId
        : this._hoverLed >= 0
          ? this._segmentForLed(this._hoverLed)
          : -1;
    if (highlightId < 0 || this.segments.length === 0) return;

    const segPts = positions
      .filter((p) => this._ledInSegment(p.led, highlightId))
      .sort((a, b) => a.led - b.led);
    if (segPts.length < 2) return;

    const accent = this._accentStroke();
    const drawPath = (): void => {
      const [x0, y0] = toCanvas(segPts[0].x, segPts[0].y);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      for (let i = 1; i < segPts.length; i++) {
        const [xi, yi] = toCanvas(segPts[i].x, segPts[i].y);
        ctx.lineTo(xi, yi);
      }
    };

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "rgba(0, 0, 0, 0.45)";
    ctx.lineWidth = lineW + 6;
    drawPath();
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = lineW + 3;
    drawPath();
    ctx.stroke();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    drawPath();
    ctx.stroke();

    ctx.restore();
  }

  protected override render() {
    const aria = this.paintMode
      ? "Paint on layout — drag along the fixture path"
      : this.compact
        ? "Live layout preview — tap the strip to select a segment"
        : "LED geometry preview — positions mapped from fixture layout";
    const showOverlay =
      !this.paintMode && this._status !== "live" && this._status !== "paint";
    return html`
      <div class="preview-shell ${this.compact ? "compact" : ""} ${this.paintMode ? "paint" : ""}">
        ${this.compact || this.paintMode
          ? null
          : html`
              <label class="mode-toggle">
                <input
                  type="checkbox"
                  .checked=${this._showDots}
                  @change=${(e: Event) => {
                    this._showDots = (e.target as HTMLInputElement).checked;
                    this._schedPaint();
                  }}
                />
                LED dots
              </label>
            `}
        <div class="wrap" role="img" aria-label=${aria}>
          <canvas></canvas>
          ${showOverlay
            ? html`<span class="overlay">${this._status}</span>`
            : null}
          ${this.paintMode && this._positions.length === 0
            ? html`<span class="overlay">No layout — create one in Layout view</span>`
            : null}
        </div>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 0;
        max-height: 100%;
        overflow: hidden;
      }
      :host([paintmode]) {
        display: block;
        flex: none;
        max-height: none;
        overflow: visible;
      }
      :host([compact]) {
        display: block;
        flex: none;
        max-height: none;
        overflow: visible;
      }
      .preview-shell {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        height: 100%;
        min-height: 0;
        max-height: 100%;
        overflow: hidden;
      }
      .mode-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        opacity: 0.85;
        cursor: pointer;
        user-select: none;
        flex-shrink: 0;
      }
      .mode-toggle input {
        margin: 0;
      }
      .preview-shell.compact .wrap {
        min-height: var(--wled-preview-height, 200px);
        aspect-ratio: 16 / 9;
        max-height: none;
        flex: none;
      }
      .preview-shell.paint .wrap {
        width: 100%;
        max-width: 100%;
        max-height: min(70vh, 480px);
        aspect-ratio: var(--wled-layout-aspect, 1);
        min-height: 120px;
        flex: none;
        height: auto;
      }
      .wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #0d0d0d;
        width: 100%;
        flex: 1;
        min-height: 160px;
        max-height: 100%;
      }
      .preview-shell.paint {
        height: auto;
        max-height: none;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        max-height: 100%;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        background: rgba(0, 0, 0, 0.45);
        pointer-events: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "wled-geometry-preview": WledGeometryPreview;
  }
}
