import { css, html } from "lit";
import { property, query } from "lit/decorators.js";
import iro from "@jaames/iro";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";

export const COLOR_WHEEL_TAG = "wled-color-wheel-rgbw";

@safeCustomElement(COLOR_WHEEL_TAG)
export class WledColorWheelRgbw extends BasePoweredElement {
  @property({ type: Array }) rgb: [number, number, number] = [255, 128, 0];
  @property({ type: Number }) white = 0;
  @property({ type: Number }) awm = 0;
  @property({ type: Boolean }) showWhite = true;

  @query(".wheel-host") private _host?: HTMLDivElement;

  private _picker?: iro.ColorPicker;
  private _suppress = false;

  protected override updated(): void {
    if (!this._host || this._picker) return;
    this._picker = iro.ColorPicker(this._host, {
      width: 140,
      color: {
        r: this.rgb[0],
        g: this.rgb[1],
        b: this.rgb[2],
      },
      borderWidth: 1,
      borderColor: "var(--divider-color, #444)",
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

  protected override willUpdate(): void {
    if (this._picker) this._syncPicker();
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

  protected override render() {
    return html`
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
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
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
