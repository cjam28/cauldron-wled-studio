import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import type { LiveFrameEvent } from "../api/live-stream.js";
import { expandToFixture } from "../api/lv-frame-parser.js";
import type { WledSegment } from "../api/wled-state.js";

/** Live strip preview — 2D canvas with optional bloom; WebGL path in Phase 1 uses 2D glow. */
@safeCustomElement("wled-strip-preview")
export class WledStripPreview extends BasePoweredElement {
  @property({ type: Number }) heightPx = 56;
  @property({ type: Number }) pixelCount = 210;
  @property({ type: Array }) segments: WledSegment[] = [];
  @property({ type: Number }) selectedSegId = -1;
  @property({ type: Array }) highlightSegIds: number[] = [];

  @state() private _status = "waiting";
  @state() private _hoverLed = -1;
  private _canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private _lastPixels?: Uint8ClampedArray;
  private _raf = 0;

  setFrame(frame: LiveFrameEvent | null): void {
    if (!frame) return;
    this._lastPixels = expandToFixture(frame, this.pixelCount);
    this._status = "live";
    this.requestUpdate();
    if (this.isPowered) {
      this._schedulePaint();
    }
  }

  setStatus(status: string): void {
    this._status = status;
    this.requestUpdate();
  }

  /** Brief scale/opacity pulse after scene or effect apply. */
  pulseApply(): void {
    const wrap = this.renderRoot.querySelector(".wrap");
    if (!wrap) return;
    wrap.classList.remove("scene-pulse");
    void wrap.getBoundingClientRect();
    wrap.classList.add("scene-pulse");
    window.setTimeout(() => wrap.classList.remove("scene-pulse"), 200);
  }

  protected override onPoweredConnect(): void {
    if (this._lastPixels) {
      this._schedulePaint();
    }
  }

  protected override onPoweredDisconnect(): void {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
  }

  protected override firstUpdated(): void {
    this._canvas = this.renderRoot.querySelector("canvas") ?? undefined;
    if (this._canvas) {
      this._ctx = this._canvas.getContext("2d", { alpha: false }) ?? undefined;
      this._canvas.addEventListener("click", this._onCanvasClick);
      this._canvas.addEventListener("mousemove", this._onCanvasMove);
      this._canvas.addEventListener("mouseleave", this._onCanvasLeave);
      this.addUnsub(() => {
        this._canvas?.removeEventListener("click", this._onCanvasClick);
        this._canvas?.removeEventListener("mousemove", this._onCanvasMove);
        this._canvas?.removeEventListener("mouseleave", this._onCanvasLeave);
      });
    }
  }

  private _onCanvasClick = (ev: MouseEvent): void => {
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

  private _onCanvasMove = (ev: MouseEvent): void => {
    const led = this._ledAtEvent(ev);
    if (led !== this._hoverLed) {
      this._hoverLed = led;
      this.requestUpdate();
      if (this._lastPixels) this._schedulePaint();
    }
  };

  private _onCanvasLeave = (): void => {
    if (this._hoverLed >= 0) {
      this._hoverLed = -1;
      this.requestUpdate();
      if (this._lastPixels) this._schedulePaint();
    }
  };

  private _ledAtEvent(ev: MouseEvent): number {
    const canvas = this._canvas;
    if (!canvas) return -1;
    const rect = canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const ratio = x / rect.width;
    return Math.min(this.pixelCount - 1, Math.max(0, Math.floor(ratio * this.pixelCount)));
  }

  private _segmentForLed(led: number): number {
    for (const seg of this.segments) {
      const start = seg.start ?? 0;
      const stop = seg.stop ?? seg.len ?? this.pixelCount;
      if (led >= start && led < stop) return seg.id;
    }
    if (this.segments.length === 1) return this.segments[0].id;
    return -1;
  }

  private _ledInSelectedSeg(led: number): boolean {
    const ids =
      this.highlightSegIds.length > 0
        ? this.highlightSegIds
        : this.selectedSegId >= 0
          ? [this.selectedSegId]
          : [];
    for (const segId of ids) {
      const seg = this.segments.find((s) => s.id === segId);
      if (!seg) continue;
      const start = seg.start ?? 0;
      const stop = seg.stop ?? seg.len ?? this.pixelCount;
      if (led >= start && led < stop) return true;
    }
    return false;
  }

  private _surfaceFill(): string {
    const value = getComputedStyle(this).getPropertyValue("--wled-surface").trim();
    return value || "#1e1e1e";
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

    ctx.fillStyle = this._surfaceFill();
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < n; i++) {
      const o = i * 4;
      const r = this._lastPixels[o];
      const g = this._lastPixels[o + 1];
      const b = this._lastPixels[o + 2];
      const selected = this._ledInSelectedSeg(i);
      const hover = i === this._hoverLed;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.85)`;
      ctx.shadowBlur = this.remote.state.disableBloom ? 0 : selected || hover ? 10 : 6;
      const y = selected ? 0 : 2;
      const bh = selected ? h : h - 4;
      ctx.fillRect(i * segW, y, Math.max(1, segW - 1), bh);
      if (selected) {
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 2;
        ctx.strokeRect(i * segW + 0.5, 0.5, Math.max(1, segW - 2), h - 1);
      }
    }
    ctx.shadowBlur = 0;
  }

  protected override render() {
    const w = Math.max(320, this.pixelCount * 3);
    return html`
      <div class="wrap" role="img" aria-label="Live LED strip preview — tap a pixel to select its segment">
        <canvas
          width=${w}
          height=${this.heightPx}
          style="cursor: crosshair"
        ></canvas>
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
        border-radius: var(--wled-radius-sm);
        overflow: hidden;
        background: var(--wled-surface);
        transform-origin: center center;
      }
      .wrap.scene-pulse {
        animation: scene-apply-pulse var(--m-scene-confirm) ease;
      }
      @keyframes scene-apply-pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        45% {
          transform: scale(1.02);
          opacity: 0.88;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .wrap.scene-pulse {
          animation: none;
        }
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
        color: var(--wled-text-muted);
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
