import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import type { LiveFrameEvent } from "../api/live-stream.js";
import { subscribeLive } from "../api/live-stream.js";
import { expandToFixture } from "../api/lv-frame-parser.js";
import { layoutGet, layoutResolvePositions, type LedPosition } from "../api/layout.js";
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
  private _raf = 0;
  private _resizeObs?: ResizeObserver;

  /** Called externally (e.g. by view-layout) when a live frame arrives. */
  setFrame(frame: LiveFrameEvent | null): void {
    if (!frame) return;
    this._pixels = expandToFixture(frame, this.pixelCount);
    this._status = "live";
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
    this._attachLiveStream();
  }

  protected override onPoweredDisconnect(): void {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._resizeObs?.disconnect();
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
      this._attachLiveStream();
    }
  }

  protected override firstUpdated(): void {
    this._canvas = this.renderRoot.querySelector("canvas") ?? undefined;
    if (this._canvas) {
      this._ctx = this._canvas.getContext("2d", { alpha: true }) ?? undefined;
      this._resizeObs = new ResizeObserver(() => this._onResize());
      this._resizeObs.observe(this);
    }
    this._onResize();
  }

  private _onResize(): void {
    const canvas = this._canvas;
    if (!canvas) return;
    const rect = this.getBoundingClientRect();
    const w = Math.max(320, rect.width || 320);
    const h = Math.max(200, rect.height || 200);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
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
      this._schedPaint();
    } catch {
      this._positions = [];
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
    if (!this.connection || !this.controllerId) return;
    const unsub = subscribeLive(this.connection, this.controllerId, (frame) => {
      this.setFrame(frame);
    });
    this.addUnsub(unsub);
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

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, w, h);

    if (this._bgImage?.complete && this._bgLayer) {
      drawBackgroundLayer(ctx, w, h, this._bgImage, this._bgLayer);
    }

    const pixels = this._pixels;
    const positions = [...this._positions].sort((a, b) => a.led - b.led);
    const r = this.dotRadius;

    if (positions.length > 0) {
      let minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity;
      for (const p of positions) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      }
      const rangeX = maxX - minX || 1;
      const rangeY = maxY - minY || 1;
      const pad = r * 3;
      const scaleX = (w - pad * 2) / rangeX;
      const scaleY = (h - pad * 2) / rangeY;
      const scale = Math.min(scaleX, scaleY);

      const toCanvas = (x: number, y: number): [number, number] => [
        pad + (x - minX) * scale,
        pad + (y - minY) * scale,
      ];

      const disableBloom = this.remote.state.disableBloom;
      const lineW = Math.max(2.5, r * 1.35);

      if (!this._showDots) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = lineW;

        const drawSegment = (from: LedPosition, to: LedPosition): void => {
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
          drawSegment(positions[i], positions[i + 1]);
        }
        if (this._closed && positions.length >= 2) {
          drawSegment(positions[positions.length - 1], positions[0]);
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

  protected override render() {
    return html`
      <div class="preview-shell">
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
        <div
          class="wrap"
          role="img"
          aria-label="LED geometry preview — positions mapped from fixture layout"
        >
          <canvas></canvas>
          ${this._status !== "live"
            ? html`<span class="overlay">${this._status}</span>`
            : null}
        </div>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .preview-shell {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
        height: 100%;
        min-height: 200px;
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
      .wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #0d0d0d;
        width: 100%;
        flex: 1;
        min-height: 180px;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
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
