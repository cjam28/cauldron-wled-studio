import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  thumbCaptureCancel,
  thumbCaptureStart,
} from "../api/paint.js";
import { formatHaError } from "../utils/ha-error.js";

const ONBOARD_KEY = "wled_studio.onboarded";

@safeCustomElement("wled-view-settings")
export class WledViewSettings extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _thumbStatus = "";
  @state() private _capturing = false;

  protected override onPoweredConnect(): void {
    const conn = this.hass?.connection;
    if (!conn?.subscribeEvents) return;
    const p = conn.subscribeEvents(
      (ev: { data?: Record<string, unknown> }) => {
        const d = ev.data ?? {};
        const st = String(d.status ?? "");
        if (st === "started") {
          this._thumbStatus = `Capturing 0/${d.total ?? "?"}`;
          this._capturing = true;
        } else if (st === "progress") {
          this._thumbStatus = `${d.done}/${d.total}: ${d.name}`;
          this._capturing = true;
        } else if (st === "complete" || st === "cancelled") {
          this._thumbStatus =
            st === "complete"
              ? "Thumbnails complete — open Effects to view tiles"
              : "Cancelled";
          this._capturing = false;
        } else if (st === "error") {
          this._thumbStatus = String(d.message ?? "Error");
          this._capturing = false;
        }
        this.requestUpdate();
      },
      "wled_studio_thumb_progress"
    );
    this.addUnsub(() => {
      void p.then((fn) => fn?.());
    });
  }

  private async _recapture(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._capturing = true;
    this._thumbStatus = "Starting capture…";
    try {
      await thumbCaptureStart(this.connection, this.controllerId);
    } catch (err) {
      this._capturing = false;
      this._thumbStatus = formatHaError(err);
    }
  }

  private async _cancelCapture(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    await thumbCaptureCancel(this.connection, this.controllerId);
    this._capturing = false;
    this._thumbStatus = "Cancel requested";
  }

  private _clearOnboard(): void {
    localStorage.removeItem(ONBOARD_KEY);
    this._thumbStatus = "Onboarding flag cleared — reload Studio";
  }

  protected override render() {
    return html`
      <section class="settings">
        <h2>Settings</h2>
        <div class="card">
          <h3>Effect thumbnails</h3>
          <p>Captures ~2s WebP loops per effect (several minutes total).</p>
          <div class="row">
            <button
              type="button"
              class="primary"
              ?disabled=${this._capturing}
              @click=${() => this._recapture()}
            >
              Recapture thumbnails
            </button>
            ${this._capturing
              ? html`
                  <button type="button" @click=${() => this._cancelCapture()}>
                    Cancel
                  </button>
                `
              : null}
          </div>
          <p class="status">${this._thumbStatus}</p>
        </div>
        <div class="card">
          <h3>Onboarding</h3>
          <button type="button" @click=${() => this._clearOnboard()}>
            Reset first-run wizard
          </button>
        </div>
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .settings h2 {
        margin: 0 0 12px;
      }
      .card {
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        margin-bottom: 12px;
      }
      .card h3 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      .row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .status {
        font-size: 0.85rem;
        opacity: 0.8;
      }
    `,
  ];
}
