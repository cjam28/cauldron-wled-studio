import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  applyAudioReactive,
  fetchDeviceState,
  type AudioReactiveConfig,
} from "../api/wled-state.js";
import { showToast } from "../utils/toast.js";

export const AUDIO_REACTIVE_TAG = "wled-audio-reactive-controls";

const AGC_LABELS = ["Off", "Normal", "Vivid", "Lazy"];
const SYNC_LABELS = ["Off", "Send", "Receive"];
const FREQ_LABELS = ["Linear", "Square root", "Logarithmic"];
const SIM_LABELS = ["Off", "GEQ pulse", "WaveSin", "Sweep"];

@safeCustomElement(AUDIO_REACTIVE_TAG)
export class WledAudioReactiveControls extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _cfg: AudioReactiveConfig = {};
  @state() private _info: Record<string, unknown> = {};
  @state() private _status = "idle";
  @state() private _busy = false;

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(
    changed: import("lit").PropertyValues
  ): void {
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      void this._load();
    }
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._status = "loading";
    try {
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      const stateRaw = snap.state as Record<string, unknown>;
      const ar = (stateRaw?.AudioReactive ?? {}) as Record<string, unknown>;
      this._cfg = {
        inputLevel: typeof ar.inputLevel === "number" ? ar.inputLevel : 128,
        squelch: typeof ar.squelch === "number" ? ar.squelch : 10,
        gain: typeof ar.gain === "number" ? ar.gain : 40,
        AGC: typeof ar.AGC === "number" ? ar.AGC : 2,
        sync: typeof ar.sync === "number" ? ar.sync : 0,
        port: typeof ar.port === "number" ? ar.port : 11988,
        freqDist: typeof ar.freqDist === "number" ? ar.freqDist : 0,
        limiterRise: typeof ar.limiterRise === "number" ? ar.limiterRise : 100,
        limiterFall: typeof ar.limiterFall === "number" ? ar.limiterFall : 400,
        PalAR: ar.PalAR === true,
      };
      this._info = ar;
      this._status = "ready";
    } catch (err) {
      this._status = err instanceof Error ? err.message : "error";
    }
  }

  private async _patch(patch: AudioReactiveConfig): Promise<void> {
    if (!this.connection || !this.controllerId || this._busy) return;
    this._busy = true;
    this._cfg = { ...this._cfg, ...patch };
    try {
      await applyAudioReactive(this.connection, this.controllerId, patch);
    } catch (err) {
      showToast(this, err instanceof Error ? err.message : String(err));
    } finally {
      this._busy = false;
    }
  }

  private _slider(
    key: keyof AudioReactiveConfig,
    label: string,
    min: number,
    max: number,
    suffix = ""
  ) {
    const val = (this._cfg[key] as number | undefined) ?? min;
    return html`
      <label class="ctrl">
        <span class="ctrl-label">${label}<span class="ctrl-val">${val}${suffix}</span></span>
        <ha-slider
          min=${min}
          max=${max}
          step="1"
          .value=${val}
          @change=${(ev: Event) => {
            const v = Number((ev.target as HTMLInputElement).value);
            void this._patch({ [key]: v } as AudioReactiveConfig);
          }}
        ></ha-slider>
      </label>
    `;
  }

  private _select(
    key: keyof AudioReactiveConfig,
    label: string,
    options: readonly string[]
  ) {
    const val = (this._cfg[key] as number | undefined) ?? 0;
    return html`
      <label class="ctrl">
        <span class="ctrl-label">${label}</span>
        <select
          .value=${String(val)}
          @change=${(ev: Event) => {
            const v = Number((ev.target as HTMLSelectElement).value);
            void this._patch({ [key]: v } as AudioReactiveConfig);
          }}
        >
          ${options.map(
            (opt, i) => html`<option value=${i} ?selected=${i === val}>${opt}</option>`
          )}
        </select>
      </label>
    `;
  }

  private _checkbox(key: keyof AudioReactiveConfig, label: string) {
    const checked = Boolean(this._cfg[key]);
    return html`
      <label class="ctrl-check">
        <input
          type="checkbox"
          .checked=${checked}
          @change=${(ev: Event) =>
            void this._patch({
              [key]: (ev.target as HTMLInputElement).checked,
            } as AudioReactiveConfig)}
        />
        <span>${label}</span>
      </label>
    `;
  }

  protected override render() {
    if (this._status === "loading") {
      return html`<p class="muted">Loading audio settings…</p>`;
    }
    return html`
      <section class="ar" aria-label="AudioReactive usermod controls">
        <h3>AudioReactive</h3>
        <p class="hint">
          Tunes the AudioReactive usermod on the device — affects every reactive effect.
        </p>
        <div class="grid">
          ${this._slider("inputLevel", "GEQ input level", 0, 255)}
          ${this._slider("squelch", "Squelch (noise floor)", 0, 255)}
          ${this._slider("gain", "Gain", 0, 255)}
          ${this._select("AGC", "AGC mode", AGC_LABELS)}
          ${this._select("freqDist", "Frequency scale", FREQ_LABELS)}
          ${this._slider("limiterRise", "Limiter rise", 1, 1000, " ms")}
          ${this._slider("limiterFall", "Limiter fall", 1, 1000, " ms")}
          ${this._select("sync", "Audio sync", SYNC_LABELS)}
          ${this._slider("port", "Sync port", 1, 65535)}
          ${this._checkbox("PalAR", "AudioReactive palette injection")}
        </div>
        ${typeof this._info.samplePeak === "number"
          ? html`
              <p class="meta">
                Peak ${this._info.samplePeak} · FPS ${this._info.FPS ?? "?"} · Source
                ${this._info.audioSource ?? "?"}
              </p>
            `
          : null}
      </section>
    `;
  }

  /** Per-segment sound simulation simulator label (helper for other components). */
  static simulationLabels(): readonly string[] {
    return SIM_LABELS;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .ar h3 {
        margin: 0 0 6px;
        font-size: 1rem;
      }
      .hint {
        margin: 0 0 12px;
        opacity: 0.75;
        font-size: 0.82rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 10px 16px;
      }
      .ctrl {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.8rem;
      }
      .ctrl-label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .ctrl-val {
        font-variant-numeric: tabular-nums;
        opacity: 0.75;
      }
      .ctrl-check {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
      }
      select {
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.82rem;
      }
      .meta {
        margin: 10px 0 0;
        font-size: 0.75rem;
        opacity: 0.65;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [AUDIO_REACTIVE_TAG]: WledAudioReactiveControls;
  }
}
