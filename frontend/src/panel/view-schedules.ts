import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { applyState, fetchDeviceState } from "../api/wled-state.js";

@safeCustomElement("wled-view-schedules")
export class WledViewSchedules extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _minutes = 15;
  @state() private _status = "";
  @state() private _fading = false;
  @state() private _fadeProgress = 0;

  private async _sleepFade(): Promise<void> {
    if (!this.connection || !this.controllerId || this._fading) return;
    this._status = "Starting sleep fade…";
    this._fading = true;
    this._fadeProgress = 0;
    try {
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      const startBri =
        (snap.state?.bri as number | undefined) ??
        snap.segments?.[0]?.bri ??
        128;
      const steps = Math.max(4, Math.min(30, Math.floor(this._minutes * 2)));
      const stepMs = (this._minutes * 60 * 1000) / steps;
      for (let i = 0; i <= steps; i++) {
        const bri = Math.round(startBri * (1 - i / steps));
        await applyState(this.connection, this.controllerId, {
          bri,
          on: i < steps,
          tt: Math.min(25, Math.ceil(stepMs / 100)),
        });
        this._fadeProgress = Math.round((i / steps) * 100);
        this._status = `Sleep fade ${this._fadeProgress}% — ${this._minutes} min total`;
        if (i < steps) {
          await new Promise((r) => setTimeout(r, stepMs));
        }
      }
      this._fadeProgress = 100;
      this._status = `Sleep fade complete (${this._minutes} min)`;
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._fading = false;
    }
  }

  protected override render() {
    return html`
      <section class="schedules">
        <h2>Schedules</h2>
        <p class="lead">
          Sleep timer fades brightness to off over the selected duration using device-side
          <code>tt</code> crossfade steps.
        </p>
        <div class="card">
          <h3>Sleep timer</h3>
          <label>
            Minutes
            <input
              type="number"
              min="1"
              max="120"
              ?disabled=${this._fading}
              .value=${String(this._minutes)}
              @change=${(e: Event) => {
                this._minutes = parseInt(
                  (e.target as HTMLInputElement).value,
                  10
                );
              }}
            />
          </label>
          <button
            type="button"
            class="primary"
            ?disabled=${this._fading}
            @click=${() => this._sleepFade()}
          >
            Start sleep fade
          </button>
          ${this._fading
            ? html`
                <div
                  class="progress-wrap"
                  role="progressbar"
                  aria-label="Sleep fade progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow=${this._fadeProgress}
                >
                  <div class="progress-bar" style="width:${this._fadeProgress}%"></div>
                </div>
              `
            : null}
        </div>
        <p class="status">${this._status}</p>
        <p class="hint">
          Sunrise alarms and multi-controller groups are planned; use HA automations with
          <code>wled_studio.notify</code> for doorbell flashes today.
        </p>
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .schedules h2 {
        margin: 0 0 8px;
      }
      .lead {
        opacity: 0.85;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin: 12px 0;
      }
      .card h3 {
        margin: 0 0 8px;
      }
      label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 8px;
      }
      .progress-wrap {
        margin-top: 12px;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color, rgba(255, 255, 255, 0.12));
        overflow: hidden;
      }
      .progress-bar {
        height: 100%;
        background: var(--primary-color);
        border-radius: 4px;
        transition: width 200ms ease;
      }
      .status {
        font-size: 0.85rem;
      }
      .hint {
        font-size: 0.85rem;
        opacity: 0.75;
      }
    `,
  ];
}
