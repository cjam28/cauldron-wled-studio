import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  fetchDeviceState,
  fetchEffectMeta,
  parseColSlot,
  type DeviceStateSnapshot,
  type EffectMeta,
} from "../api/wled-state.js";
import { formatHaError } from "../utils/ha-error.js";
import { solidEffectId } from "../utils/effect-categories.js";
import type { PaintBrushSettings } from "../utils/paint-settings-types.js";
import "./color-wheel-rgbw.js";
import "./effect-chips.js";

const SLIDER_LABELS: Record<string, string> = {
  sx: "Speed",
  ix: "Intensity",
  c1: "Custom 1",
  c2: "Custom 2",
  c3: "Custom 3",
  o1: "Option 1",
  o2: "Option 2",
  o3: "Option 3",
};

@safeCustomElement("wled-paint-settings")
export class WledPaintSettings extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property({ attribute: false }) override hass?: HomeAssistant;
  @property() controllerId = "";
  @property() heading = "Brush";
  @property({ attribute: false }) settings!: PaintBrushSettings;
  @property({ type: Boolean }) showOnToggle = false;

  @state() private _loadingEffects = true;
  @state() private _error = "";
  @state() private _snapshot?: DeviceStateSnapshot;
  @state() private _meta?: EffectMeta;
  @state() private _effectFilter = "";

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(changed: import("lit").PropertyValues): void {
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      void this._load();
    }
    if (changed.has("settings") && this.settings?.fx !== undefined) {
      void this._refreshMeta();
    }
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._loadingEffects = true;
    this._error = "";
    try {
      this._snapshot = await fetchDeviceState(this.connection, this.controllerId);
      await this._refreshMeta();
    } catch (err) {
      this._error = formatHaError(err);
    } finally {
      this._loadingEffects = false;
    }
  }

  private async _refreshMeta(): Promise<void> {
    if (!this.connection || !this.controllerId || !this.settings) return;
    this._meta = await fetchEffectMeta(
      this.connection,
      this.controllerId,
      this.settings.fx
    );
  }

  private _emit(patch: Partial<PaintBrushSettings>): void {
    const next = { ...this.settings, ...patch };
    this.dispatchEvent(
      new CustomEvent("settings-change", {
        detail: next,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onColor(ev: CustomEvent<{ rgb: [number, number, number]; white: number }>): void {
    const { rgb, white } = ev.detail;
    const patch: Partial<PaintBrushSettings> = {
      col: [rgb[0], rgb[1], rgb[2], white],
    };
    if (this.heading !== "Fill look") {
      patch.fx = solidEffectId(this._snapshot?.effects_by_name ?? {});
    }
    this._emit(patch);
  }

  private async _onEffectSelect(ev: CustomEvent<{ effectId: number }>): Promise<void> {
    this._emit({ fx: ev.detail.effectId });
    await this._refreshMeta();
  }

  private _slider(key: keyof PaintBrushSettings, ev: Event): void {
    const raw = (ev.target as HTMLInputElement).value;
    const value = key.startsWith("o")
      ? Number(raw) > 0
      : Number(raw);
    this._emit({ [key]: value } as Partial<PaintBrushSettings>);
  }

  protected override render() {
    if (!this.settings) {
      return null;
    }
    const col = parseColSlot(this.settings.col);
    const meta = this._meta;
    const sliders = meta?.sliders ?? {};
    const busRgbwm = this._snapshot?.rgbwm ?? 0;

    return html`
      <div class="block">
        <h3 class="heading">${this.heading}</h3>
        ${this._error
          ? html`<p class="err">${this._error}</p>`
          : null}
        ${this.showOnToggle
          ? html`
              <label class="row">
                <input
                  type="checkbox"
                  .checked=${this.settings.on}
                  @change=${(e: Event) =>
                    this._emit({ on: (e.target as HTMLInputElement).checked })}
                />
                On
              </label>
            `
          : null}
        <label class="bri-label">
          Brightness
          <ha-slider
            min="0"
            max="255"
            step="1"
            .value=${this.settings.bri}
            @change=${(ev: Event) => this._slider("bri", ev)}
          ></ha-slider>
        </label>

        <wled-color-wheel-rgbw
          .controllerId=${this.controllerId}
          .rgb=${[col[0], col[1], col[2]] as [number, number, number]}
          .white=${col[3]}
          .awm=${busRgbwm}
          .showWhite=${(this._snapshot?.led_order ?? 0) > 0}
          @color-change=${this._onColor}
        ></wled-color-wheel-rgbw>

        ${this._loadingEffects
          ? html`<p class="muted">Loading effects…</p>`
          : html`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${(e: Event) => {
                  this._effectFilter = (e.target as HTMLInputElement).value;
                }}
              />

              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${this._snapshot?.fw_ver ?? (this._snapshot?.info?.ver as string) ?? ""}
                .thumbBasenames=${this._snapshot?.thumb_basenames ?? []}
                .effectsByName=${this._snapshot?.effects_by_name ?? {}}
                .soundFlags=${this._snapshot?.sound_flags ?? []}
                .selectedFx=${this.settings.fx}
                .filter=${this._effectFilter}
                @effect-select=${this._onEffectSelect}
              ></wled-effect-chips>

              <div class="sliders">
                ${Object.entries(SLIDER_LABELS).map(([key, label]) => {
                  if (!sliders[key]) return null;
                  const val = this.settings[key as keyof PaintBrushSettings];
                  if (typeof val === "boolean") {
                    return html`
                      <label class="row">
                        <input
                          type="checkbox"
                          .checked=${val}
                          @change=${(e: Event) =>
                            this._slider(key as keyof PaintBrushSettings, e)}
                        />
                        ${label}
                      </label>
                    `;
                  }
                  return html`
                    <label>
                      ${label}
                      <ha-slider
                        min="0"
                        max="255"
                        step="1"
                        .value=${val as number}
                        @change=${(ev: Event) =>
                          this._slider(key as keyof PaintBrushSettings, ev)}
                      ></ha-slider>
                    </label>
                  `;
                })}
              </div>
            `}
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .block {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .heading {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
      }
      .bri-label,
      .sliders label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
      }
      .fx-search {
        width: 100%;
        box-sizing: border-box;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .err {
        color: var(--error-color, #cf6679);
      }
    `,
  ];
}
