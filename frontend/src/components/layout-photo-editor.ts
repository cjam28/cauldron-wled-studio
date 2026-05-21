import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  DEFAULT_BACKGROUND,
  drawBackgroundLayer,
  normalizeBackground,
  renderBackgroundBlob,
  type BackgroundLayer,
} from "../utils/background-layer.js";

export const PHOTO_EDITOR_TAG = "wled-layout-photo-editor";

/** Full-screen crop + adjust UI before committing a floorplan photo. */
@safeCustomElement(PHOTO_EDITOR_TAG)
export class WledLayoutPhotoEditor extends BasePoweredElement {
  @property({ type: Boolean }) open = false;

  @state() private _img: HTMLImageElement | null = null;
  @state() private _layer: BackgroundLayer | null = null;
  @state() private _cropDrag: "move" | "nw" | "se" | null = null;
  @state() private _cropStart = { x: 0, y: 0, cx: 0, cy: 0, cw: 1, ch: 1 };

  private _canvas?: HTMLCanvasElement;
  private _file?: File;

  async openWithFile(file: File): Promise<void> {
    this._file = file;
    const url = URL.createObjectURL(file);
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = url;
    });
    this._img = img;
    this._layer = normalizeBackground(url, DEFAULT_BACKGROUND);
    this.open = true;
    await this.updateComplete;
    this._paint();
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    super.updated(changed);
    if (changed.has("open") && this.open) {
      requestAnimationFrame(() => this._paint());
    }
  }

  protected override firstUpdated(): void {
    this._canvas = this.renderRoot.querySelector("canvas") ?? undefined;
    if (this._canvas) {
      this._canvas.addEventListener("pointerdown", this._onDown);
      this._canvas.addEventListener("pointermove", this._onMove);
      this._canvas.addEventListener("pointerup", this._onUp);
    }
  }

  private _canvasRect(): DOMRect {
    return this._canvas!.getBoundingClientRect();
  }

  private _normFromEvent(ev: PointerEvent): [number, number] {
    const r = this._canvasRect();
    return [(ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height];
  }

  private _hitCropHandle(nx: number, ny: number): "nw" | "se" | "move" | null {
    const l = this._layer;
    if (!l) return null;
    const cx = l.cropX ?? 0;
    const cy = l.cropY ?? 0;
    const cw = l.cropW ?? 1;
    const ch = l.cropH ?? 1;
    const pad = 0.04;
    if (Math.hypot(nx - cx, ny - cy) < pad) return "nw";
    if (Math.hypot(nx - (cx + cw), ny - (cy + ch)) < pad) return "se";
    if (nx >= cx && nx <= cx + cw && ny >= cy && ny <= cy + ch) return "move";
    return null;
  }

  private _onDown = (ev: PointerEvent): void => {
    if (!this._layer) return;
    const [nx, ny] = this._normFromEvent(ev);
    const hit = this._hitCropHandle(nx, ny);
    if (!hit) return;
    this._cropDrag = hit;
    this._cropStart = {
      x: nx,
      y: ny,
      cx: this._layer.cropX ?? 0,
      cy: this._layer.cropY ?? 0,
      cw: this._layer.cropW ?? 1,
      ch: this._layer.cropH ?? 1,
    };
    this._canvas?.setPointerCapture(ev.pointerId);
  };

  private _onMove = (ev: PointerEvent): void => {
    if (!this._cropDrag || !this._layer) return;
    const [nx, ny] = this._normFromEvent(ev);
    const dx = nx - this._cropStart.x;
    const dy = ny - this._cropStart.y;
    const s = this._cropStart;
    let cx = s.cx;
    let cy = s.cy;
    let cw = s.cw;
    let ch = s.ch;

    if (this._cropDrag === "move") {
      cx = Math.max(0, Math.min(1 - cw, s.cx + dx));
      cy = Math.max(0, Math.min(1 - ch, s.cy + dy));
    } else if (this._cropDrag === "nw") {
      const x2 = s.cx + s.cw;
      const y2 = s.cy + s.ch;
      cx = Math.max(0, Math.min(x2 - 0.05, s.cx + dx));
      cy = Math.max(0, Math.min(y2 - 0.05, s.cy + dy));
      cw = x2 - cx;
      ch = y2 - cy;
    } else if (this._cropDrag === "se") {
      cw = Math.max(0.05, Math.min(1 - s.cx, s.cw + dx));
      ch = Math.max(0.05, Math.min(1 - s.cy, s.ch + dy));
    }

    this._layer = { ...this._layer, cropX: cx, cropY: cy, cropW: cw, cropH: ch };
    this._paint();
  };

  private _onUp = (ev: PointerEvent): void => {
    this._cropDrag = null;
    this._canvas?.releasePointerCapture(ev.pointerId);
  };

  private _paint(): void {
    const canvas = this._canvas;
    const ctx = canvas?.getContext("2d");
    const img = this._img;
    const layer = this._layer;
    if (!canvas || !ctx || !img || !layer) return;

    const r = canvas.parentElement?.getBoundingClientRect();
    const w = Math.max(320, Math.floor((r?.width ?? 640) * (window.devicePixelRatio || 1)));
    const h = Math.max(240, Math.floor((r?.height ?? 400) * (window.devicePixelRatio || 1)));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);
    drawBackgroundLayer(ctx, w, h, img, layer);

    const cx = (layer.cropX ?? 0) * w;
    const cy = (layer.cropY ?? 0) * h;
    const cw = (layer.cropW ?? 1) * w;
    const ch = (layer.cropH ?? 1) * h;
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, w, cy);
    ctx.fillRect(0, cy + ch, w, h - cy - ch);
    ctx.fillRect(0, cy, cx, ch);
    ctx.fillRect(cx + cw, cy, w - cx - cw, ch);
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, cy, cw, ch);
    const hs = 10;
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(cx - hs / 2, cy - hs / 2, hs, hs);
    ctx.fillRect(cx + cw - hs / 2, cy + ch - hs / 2, hs, hs);
  }

  private _resetCrop(): void {
    if (!this._layer) return;
    this._layer = {
      ...this._layer,
      cropX: 0,
      cropY: 0,
      cropW: 1,
      cropH: 1,
    };
    this._paint();
  }

  private _cancel(): void {
    this.open = false;
    this._img = null;
    this._layer = null;
    this._file = undefined;
  }

  private async _apply(): Promise<void> {
    if (!this._img || !this._layer) return;
    try {
      const blob = await renderBackgroundBlob(this._img, this._layer);
      const file = new File(
        [blob],
        this._file?.name?.replace(/\.\w+$/, "") + ".jpg" || "floorplan.jpg",
        { type: "image/jpeg" }
      );
      this.dispatchEvent(
        new CustomEvent("photo-apply", {
          detail: { file, layer: this._layer },
          bubbles: true,
          composed: true,
        })
      );
      this._cancel();
    } catch (err) {
      this.dispatchEvent(
        new CustomEvent("photo-error", {
          detail: { message: err instanceof Error ? err.message : String(err) },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  protected override render() {
    if (!this.open) return html``;

    const l = this._layer;
    return html`
      <div class="overlay" role="dialog" aria-label="Edit floorplan photo">
        <div class="panel">
          <header>
            <h2>Photo overlay</h2>
            <button class="icon" @click=${this._cancel} aria-label="Close">✕</button>
          </header>
          <p class="hint">Crop the room photo, tune brightness, then apply. Draw your LED path on top in the designer.</p>
          <div class="preview-wrap">
            <canvas></canvas>
          </div>
          ${l
            ? html`
                <div class="sliders">
                  <label
                    >Opacity
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.05"
                      .value=${String(l.opacity ?? 0.55)}
                      @input=${(e: Event) => {
                        this._layer = {
                          ...l,
                          opacity: parseFloat((e.target as HTMLInputElement).value),
                        };
                        this._paint();
                      }}
                    />
                  </label>
                  <label
                    >Brightness
                    <input
                      type="range"
                      min="0.4"
                      max="1.8"
                      step="0.05"
                      .value=${String(l.brightness ?? 1)}
                      @input=${(e: Event) => {
                        this._layer = {
                          ...l,
                          brightness: parseFloat((e.target as HTMLInputElement).value),
                        };
                        this._paint();
                      }}
                    />
                  </label>
                  <label
                    >Saturation
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.05"
                      .value=${String(l.saturation ?? 1)}
                      @input=${(e: Event) => {
                        this._layer = {
                          ...l,
                          saturation: parseFloat((e.target as HTMLInputElement).value),
                        };
                        this._paint();
                      }}
                    />
                  </label>
                  <label
                    >Rotation (°)
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="1"
                      .value=${String(l.rotation ?? 0)}
                      @input=${(e: Event) => {
                        this._layer = {
                          ...l,
                          rotation: parseFloat((e.target as HTMLInputElement).value),
                        };
                        this._paint();
                      }}
                    />
                  </label>
                </div>
              `
            : null}
          <div class="actions">
            <button class="secondary" @click=${this._resetCrop}>Reset crop</button>
            <button class="secondary" @click=${this._cancel}>Cancel</button>
            <button class="primary" @click=${() => this._apply()}>Use photo</button>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .overlay {
        position: fixed;
        inset: 0;
        z-index: 200;
        background: rgba(0, 0, 0, 0.72);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        box-sizing: border-box;
      }
      .panel {
        background: var(--card-background-color, #1e293b);
        border-radius: 12px;
        max-width: 720px;
        width: 100%;
        max-height: 95vh;
        overflow: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      h2 {
        margin: 0;
        font-size: 1.1rem;
      }
      .icon {
        border: none;
        background: transparent;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
      }
      .hint {
        margin: 0;
        font-size: 0.82rem;
        opacity: 0.75;
      }
      .preview-wrap {
        height: min(50vh, 360px);
        border-radius: 8px;
        overflow: hidden;
        background: #111;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
        touch-action: none;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .sliders label {
        font-size: 0.8rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .sliders input[type="range"] {
        width: 100%;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .primary,
      .secondary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 0.85rem;
      }
      .primary {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .secondary {
        background: var(--card-background-color, #334155);
        color: inherit;
        border: 1px solid var(--divider-color, #475569);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "wled-layout-photo-editor": WledLayoutPhotoEditor;
  }
}
