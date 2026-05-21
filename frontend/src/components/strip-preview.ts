import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import type { LiveFrameEvent } from "../api/live-stream.js";
import { expandToFixture } from "../api/lv-frame-parser.js";

/** Live strip preview — 2D canvas with optional bloom; WebGL path in Phase 1 uses 2D glow. */
@customElement("wled-strip-preview")
export class WledStripPreview extends BasePoweredElement {
  @property({ type: Number }) heightPx = 56;
  @property({ type: Number }) pixelCount = 210;

  @state() private _status = "waiting";
  private _canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private _lastPixels?: Uint8ClampedArray;
  private _raf = 0;

  setFrame(frame: LiveFrameEvent | null): void {
    if (!frame || !this.isPowered) {
      return;
    }
    this._lastPixels = expandToFixture(frame, this.pixelCount);
    this._status = "live";
    this._schedulePaint();
  }

  setStatus(status: string): void {
    this._status = status;
    this.requestUpdate();
  }

  protected override onPoweredConnect(): void {
    this._schedulePaint();
  }

  protected override onPoweredDisconnect(): void {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  protected override firstUpdated(): void {
    this._canvas = this.renderRoot.querySelector("canvas") ?? undefined;
    if (this._canvas) {
      this._ctx = this._canvas.getContext("2d", { alpha: false }) ?? undefined;
    }
  }

  private _schedulePaint(): void {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      this._paint();
    });
  }

  private _paint(): void {
    const ctx = this._ctx;
    const canvas = this._canvas;
    if (!ctx || !canvas || !this._lastPixels) return;

    const w = canvas.width;
    const h = canvas.height;
    const n = this.pixelCount;
    const segW = w / n;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < n; i++) {
      const o = i * 4;
      const r = this._lastPixels[o];
      const g = this._lastPixels[o + 1];
      const b = this._lastPixels[o + 2];
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.85)`;
      ctx.shadowBlur = this.remote.state.disableBloom ? 0 : 6;
      ctx.fillRect(i * segW, 2, Math.max(1, segW - 1), h - 4);
    }
    ctx.shadowBlur = 0;
  }

  protected override render() {
    const w = Math.max(320, this.pixelCount * 3);
    return html`
      <div class="wrap" role="img" aria-label="Live LED strip preview">
        <canvas width=${w} height=${this.heightPx}></canvas>
        ${this._status !== "live"
          ? html`<span class="overlay">${this._status}</span>`
          : null}
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #111;
      }
      canvas {
        display: block;
        width: 100%;
        height: auto;
      }
      .overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        background: rgba(0, 0, 0, 0.35);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "wled-strip-preview": WledStripPreview;
  }
}
