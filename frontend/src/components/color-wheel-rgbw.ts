import { css, html, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import iro from "@jaames/iro";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import "./color-swatch-bar.js";

export const COLOR_WHEEL_TAG = "wled-color-wheel-rgbw";

function rgbEqual(
  a: [number, number, number],
  b: [number, number, number]
): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

@safeCustomElement(COLOR_WHEEL_TAG)
export class WledColorWheelRgbw extends BasePoweredElement {
  @property({
    type: Array,
    hasChanged: (
      a: [number, number, number] | undefined,
      b: [number, number, number] | undefined
    ) => !a || !b || !rgbEqual(a, b),
  })
  rgb: [number, number, number] = [255, 128, 0];

  @property({ type: Number }) white = 0;
  @property({ type: Number }) awm = 0;
  @property({ type: Boolean }) showWhite = true;
  /** When set, shows saved swatches persisted per controller. */
  @property() controllerId = "";

  @query(".wheel-host") private _host?: HTMLDivElement;

  private _picker?: iro.ColorPicker;
  private _suppress = false;
  private _ro?: ResizeObserver;
  private _lastSize = 0;

  protected override onPoweredConnect(): void {
    if (!this.isPowered) return;
    this.scheduleRaf(() => {
      if (!this.isPowered) return;
      this._ensurePicker();
    });
  }

  protected override firstUpdated(): void {
    if (!this.isPowered) return;
    this._bindResizeObserver();
  }

  protected override onPoweredDisconnect(): void {
    this._destroyPicker();
    super.onPoweredDisconnect();
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this.isPowered) {
      this._destroyPicker();
      return;
    }
    void this.updateComplete.then(() => {
      if (!this.isConnected || !this.isPowered) return;
      this._ensurePicker();
      if (this._picker && changed.has("rgb")) {
        this._syncPicker();
      }
    });
  }

  /** Lit re-renders can clear imperative iro DOM while `_picker` stays set. */
  private _pickerInDom(): boolean {
    const host = this._host;
    if (!host) return false;
    return Boolean(host.querySelector(".IroColorPicker, .IroWheel"));
  }

  private _ensurePicker(): void {
    if (this._picker && !this._pickerInDom()) {
      this._destroyPicker();
    }
    if (!this._picker) {
      this._tryMountOrResize();
    }
  }

  private _bindResizeObserver(): void {
    const host = this._host;
    if (!host || this._ro) return;
    this._ro = new ResizeObserver(() => {
      if (!this.isPowered) return;
      this._ensurePicker();
    });
    this._ro.observe(host);
    this.addUnsub(() => {
      this._ro?.disconnect();
      this._ro = undefined;
    });
    if (this.isPowered) {
      this._ensurePicker();
    }
  }

  private _hostBox(host: HTMLDivElement): { width: number; height: number } {
    const rect = host.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;
    if (width < 8 || height < 8) {
      width = host.offsetWidth;
      height = host.offsetHeight;
    }
    if (width < 8 || height < 8) {
      const cs = getComputedStyle(host);
      width = parseFloat(cs.width) || 0;
      height = parseFloat(cs.height) || 0;
    }
    return { width, height };
  }

  private _wheelSize(width: number, height: number): number {
    const side = Math.min(width, height);
    return Math.max(120, Math.min(160, Math.floor(side) || 140));
  }

  private _tryMountOrResize(): void {
    const host = this._host;
    if (!host) return;
    const { width, height } = this._hostBox(host);
    if (width < 8 || height < 8) return;

    const size = this._wheelSize(width, height);
    if (!this._picker) {
      this._createPicker(host, size);
      return;
    }
    if (size !== this._lastSize && typeof this._picker.resize === "function") {
      this._picker.resize(size);
      this._lastSize = size;
    }
  }

  private _createPicker(host: HTMLDivElement, size: number): void {
    if (this._picker) return;
    host.replaceChildren();
    this._lastSize = size;
    this._picker = iro.ColorPicker(host, {
      width: size,
      color: {
        r: this.rgb[0],
        g: this.rgb[1],
        b: this.rgb[2],
      },
      borderWidth: 1,
      borderColor: "#555",
      layout: [{ component: iro.ui.Wheel }],
    });
    this._picker.on("color:change", (color: iro.Color) => {
      if (this._suppress) return;
      this.dispatchEvent(
        new CustomEvent("color-change", {
          detail: {
            rgb: [color.rgb.r, color.rgb.g, color.rgb.b] as [number, number, number],
            white: this.white,
          },
          bubbles: true,
          composed: true,
        })
      );
    });
    this._syncPicker();
  }

  private _destroyPicker(): void {
    this._host?.replaceChildren();
    this._picker = undefined;
    this._lastSize = 0;
  }

  private _syncPicker(): void {
    if (!this._picker) return;
    this._suppress = true;
    this._picker.color.rgb = { r: this.rgb[0], g: this.rgb[1], b: this.rgb[2] };
    this._suppress = false;
  }

  private _onWhite(ev: Event): void {
    const white = Number((ev.target as HTMLInputElement).value);
    this.dispatchEvent(
      new CustomEvent("color-change", {
        detail: { rgb: this.rgb, white },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onAwm(ev: Event): void {
    const awm = Number((ev.target as HTMLSelectElement).value);
    this.dispatchEvent(
      new CustomEvent("awm-change", {
        detail: { awm },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onSwatchSelect(
    ev: CustomEvent<{ rgb: [number, number, number]; white: number }>
  ): void {
    this.dispatchEvent(
      new CustomEvent("color-change", {
        detail: ev.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  protected override render() {
    return html`
      <div class="picker">
        <div class="wrap">
          <div class="wheel-host" aria-label="Color wheel"></div>
          <div class="extras">
            ${this.showWhite
              ? html`
                  <label>
                    W
                    <ha-slider
                      min="0"
                      max="255"
                      step="1"
                      .value=${this.white}
                      @change=${this._onWhite}
                    ></ha-slider>
                  </label>
                `
              : null}
            <label>
              Auto-calculate W
              <select @change=${this._onAwm} aria-label="Auto-calculate W channel from RGB">
                <option value="0" ?selected=${this.awm === 0}>Manual</option>
                <option value="1" ?selected=${this.awm === 1}>Brighter</option>
                <option value="2" ?selected=${this.awm === 2}>Accurate</option>
                <option value="3" ?selected=${this.awm === 3}>Dual</option>
                <option value="4" ?selected=${this.awm === 4}>Max</option>
              </select>
            </label>
            <p class="w-hint">
              Auto-calculate W is saved in WLED LED settings (device-wide). The W slider sets
              manual white in the segment color — full control in Manual; in Accurate, WLED still
              derives white from RGB and the slider can add extra W.
            </p>
          </div>
        </div>
        ${this.controllerId
          ? html`
              <wled-color-swatch-bar
                .controllerId=${this.controllerId}
                .rgb=${this.rgb}
                .white=${this.white}
                @swatch-select=${this._onSwatchSelect}
              ></wled-color-swatch-bar>
            `
          : null}
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }
      .picker {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      .wheel-host {
        width: 140px;
        height: 140px;
        min-width: 140px;
        min-height: 140px;
        flex-shrink: 0;
        position: relative;
      }
      .wheel-host .IroColorPicker {
        display: block;
      }
      .wrap {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      .extras {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 120px;
        flex: 1;
      }
      label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      select {
        border-radius: 6px;
        padding: 4px 8px;
        background: var(--card-background-color);
        color: inherit;
      }
      .w-hint {
        margin: 0;
        font-size: 0.7rem;
        opacity: 0.72;
        line-height: 1.35;
        max-width: 18rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [COLOR_WHEEL_TAG]: WledColorWheelRgbw;
  }
}
