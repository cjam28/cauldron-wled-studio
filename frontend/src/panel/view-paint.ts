import { css, html } from "lit";
import { property, query, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { debounce } from "../utils/debounce.js";
import { formatHaError } from "../utils/ha-error.js";
import { fetchDeviceState } from "../api/wled-state.js";
import { paintFrame, paintStart, paintStop } from "../api/paint.js";

@safeCustomElement("wled-view-paint")
export class WledViewPaint extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _pixelCount = 210;
  @state() private _rgbw = true;
  @state() private _active = false;
  @state() private _color = "#ff3366";
  @state() private _brush = 6;
  @state() private _status = "";
  @state() private _warn = "";

  private _buffer: Uint8Array | null = null;
  @query(".strip") private _canvas!: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D | null = null;
  private _painting = false;
  private _flushDebounced = debounce(() => void this._flushNow(), 33, 120);

  protected override updated(): void {
    if (this._canvas && !this._ctx) {
      this._ctx = this._canvas.getContext("2d");
      this._drawStrip();
    }
  }

  protected override async onPoweredConnect(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      const leds = snap.info?.leds as { count?: number; rgbw?: boolean } | undefined;
      if (leds?.count) this._pixelCount = leds.count;
      if (typeof leds?.rgbw === "boolean") this._rgbw = leds.rgbw;
      this._allocBuffer();
      this._status = "Drag the strip to start live paint";
    } catch (err) {
      this._status = formatHaError(err);
    }
  }

  protected override async onPoweredDisconnect(): Promise<void> {
    this._flushDebounced.cancel();
    if (this._active && this.connection && this.controllerId) {
      try {
        await paintStop(this.connection, this.controllerId, false);
      } catch {
        /* ignore */
      }
    }
    this._active = false;
  }

  private async _ensureSession(): Promise<boolean> {
    if (this._active || !this.connection || !this.controllerId) return this._active;
    try {
      const res = await paintStart(this.connection, this.controllerId);
      this._active = true;
      this._warn = res.wifi_sleep_warning ?? "";
      if (res.pixel_count) this._pixelCount = res.pixel_count;
      if (typeof res.rgbw === "boolean") this._rgbw = res.rgbw;
      this._allocBuffer();
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
    for (let i = 0; i < this._pixelCount; i++) {
      const o = i * bpp;
      this._buffer[o] = 0;
      this._buffer[o + 1] = 0;
      this._buffer[o + 2] = 0;
      if (this._rgbw) this._buffer[o + 3] = 0;
    }
  }

  private _parseColor(): [number, number, number] {
    const hex = this._color.replace("#", "");
    if (hex.length < 6) return [255, 51, 102];
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }

  private _strokeAt(led: number): void {
    if (!this._buffer) return;
    const [r, g, b] = this._parseColor();
    const bpp = this._rgbw ? 4 : 3;
    const half = Math.max(1, Math.floor(this._brush / 2));
    for (let d = -half; d <= half; d++) {
      const idx = led + d;
      if (idx < 0 || idx >= this._pixelCount) continue;
      const o = idx * bpp;
      this._buffer[o] = r;
      this._buffer[o + 1] = g;
      this._buffer[o + 2] = b;
      if (this._rgbw) this._buffer[o + 3] = 0;
    }
    this._flushDebounced();
    this._drawStrip();
  }

  private async _flushNow(): Promise<void> {
    if (!this._active || !this.connection || !this._buffer) return;
    try {
      await paintFrame(this.connection, this.controllerId, this._buffer, this._rgbw);
      this._status = "Live paint";
    } catch (err) {
      this._status = formatHaError(err);
    }
  }

  private _drawStrip(): void {
    if (!this._ctx || !this._buffer) return;
    const w = this._canvas?.width ?? 640;
    const h = this._canvas?.height ?? 48;
    this._ctx.clearRect(0, 0, w, h);
    const bpp = this._rgbw ? 4 : 3;
    const cell = w / this._pixelCount;
    for (let i = 0; i < this._pixelCount; i++) {
      const o = i * bpp;
      this._ctx.fillStyle = `rgb(${this._buffer[o]},${this._buffer[o + 1]},${this._buffer[o + 2]})`;
      this._ctx.fillRect(i * cell, 0, Math.max(1, cell), h);
    }
  }

  private async _onPointer(ev: PointerEvent): Promise<void> {
    if (!this._canvas) return;
    if (!(await this._ensureSession())) return;
    const rect = this._canvas.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const led = Math.min(
      this._pixelCount - 1,
      Math.max(0, Math.floor((x / rect.width) * this._pixelCount))
    );
    this._strokeAt(led);
  }

  private async _commit(): Promise<void> {
    if (!this.connection || !this._active) return;
    this._flushDebounced.cancel();
    await this._flushNow();
    try {
      await paintStop(this.connection, this.controllerId, true);
      this._status = "Committed";
    } catch (err) {
      this._status = formatHaError(err);
    }
    this._active = false;
  }

  private async _cancel(): Promise<void> {
    if (!this.connection || !this._active) return;
    this._flushDebounced.cancel();
    try {
      await paintStop(this.connection, this.controllerId, false);
      this._status = "Live mode released";
    } catch (err) {
      this._status = formatHaError(err);
    }
    this._active = false;
  }

  protected override render() {
    return html`
      <section class="paint">
        <p class="lead">
          1D strip paint over UDP DDP (${this._pixelCount} LEDs). Drag across the strip.
          Commit applies Solid colors per WLED segment (average of painted LEDs in each
          segment).
        </p>
        ${this._warn
          ? html`<p class="warn">${this._warn}</p>`
          : null}
        <div class="tools">
          <label>
            Color
            <input
              type="color"
              .value=${this._color}
              @input=${(e: Event) => {
                this._color = (e.target as HTMLInputElement).value;
              }}
            />
          </label>
          <label>
            Brush
            <input
              type="range"
              min="1"
              max="20"
              .value=${String(this._brush)}
              @input=${(e: Event) => {
                this._brush = parseInt((e.target as HTMLInputElement).value, 10);
              }}
            />
          </label>
          <button type="button" ?disabled=${!this._active} @click=${() => this._commit()}>
            End live &amp; commit
          </button>
          <button type="button" ?disabled=${!this._active} @click=${() => this._cancel()}>
            Cancel live
          </button>
        </div>
        <canvas
          class="strip"
          width="640"
          height="48"
          aria-label="Paint strip"
          @pointerdown=${(e: PointerEvent) => {
            this._painting = true;
            this._onPointer(e);
          }}
          @pointermove=${(e: PointerEvent) => {
            if (this._painting) this._onPointer(e);
          }}
          @pointerup=${() => {
            this._painting = false;
          }}
          @pointerleave=${() => {
            this._painting = false;
          }}
        ></canvas>
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
      .lead {
        margin: 0;
        opacity: 0.85;
      }
      .warn {
        color: var(--warning-color, #e6a700);
        margin: 0;
      }
      .tools {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .strip {
        width: 100%;
        touch-action: none;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        cursor: crosshair;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `,
  ];
}
