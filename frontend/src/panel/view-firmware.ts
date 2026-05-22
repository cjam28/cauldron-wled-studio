import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { SCHEMA_VERSION } from "../api/types.js";
import { formatHaError } from "../utils/ha-error.js";

export const VIEW_FIRMWARE_TAG = "wled-view-firmware";

const SKIN_APPLIED_KEY = "wled_studio.embed_skin_applied";

@safeCustomElement(VIEW_FIRMWARE_TAG)
export class WledViewFirmware extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @property() host = "";
  @property() controllerTitle = "";

  @state() private _frameKey = 0;
  @state() private _skinStatus = "";
  @state() private _skinBusy = false;

  protected override onPoweredConnect(): void {
    void this._maybeApplyEmbedSkin();
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      void this._maybeApplyEmbedSkin();
    }
  }

  private _skinStorageKey(): string {
    return `${SKIN_APPLIED_KEY}.${this.controllerId}`;
  }

  private async _maybeApplyEmbedSkin(): Promise<void> {
    if (!this.connection || !this.controllerId || !this.host) return;
    try {
      if (localStorage.getItem(this._skinStorageKey())) return;
    } catch {
      /* apply once per session below */
    }
    await this._applyEmbedSkin(true);
  }

  private async _applyEmbedSkin(silent = false): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._skinBusy = true;
    if (!silent) this._skinStatus = "Applying outline style to WLED…";
    try {
      await this.connection.sendMessagePromise({
        type: "wled_studio/apply_embed_skin",
        schema_version: SCHEMA_VERSION,
        controller_id: this.controllerId,
      });
      try {
        localStorage.setItem(this._skinStorageKey(), "1");
      } catch {
        /* ignore */
      }
      this._skinStatus =
        "Segment selection uses outline only (skin.css on device). Reload if needed.";
      this._reloadFrame();
    } catch (err) {
      this._skinStatus = formatHaError(err);
    } finally {
      this._skinBusy = false;
    }
  }

  private _firmwareUrl(): string {
    const raw = (this.host ?? "").trim();
    if (!raw) return "";
    const base = /^https?:\/\//i.test(raw) ? raw : `http://${raw}`;
    if (!this._frameKey) return base;
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}_reload=${this._frameKey}`;
  }

  private _reloadFrame(): void {
    this._frameKey += 1;
  }

  protected override render() {
    const url = this._firmwareUrl();
    const label = this.controllerTitle || "WLED controller";

    return html`
      <section class="firmware" aria-label="WLED firmware UI">
        <header class="head">
          <h2>Controller</h2>
          <p class="hint">
            Native WLED web UI for <strong>${label}</strong>. Selected segments use
            an outline only (no gray fill) after Studio applies
            <code>skin.css</code> once per controller. Some browsers block HTTP
            devices inside HTTPS Home Assistant — use
            <strong>Open in new tab</strong> if the frame stays blank.
          </p>
        </header>

        ${url
          ? html`
              <div class="toolbar">
                <a class="primary" href=${url} target="_blank" rel="noopener noreferrer">
                  <ha-icon icon="mdi:open-in-new"></ha-icon>
                  Open in new tab
                </a>
                <button
                  type="button"
                  class="ghost"
                  ?disabled=${this._skinBusy}
                  @click=${() => this._applyEmbedSkin(false)}
                >
                  <ha-icon icon="mdi:format-textbox"></ha-icon>
                  Outline segments
                </button>
                <button type="button" class="ghost" @click=${this._reloadFrame}>
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  Reload
                </button>
                <span class="url" title=${url}>${url}</span>
              </div>
              ${this._skinStatus
                ? html`<p class="skin-status">${this._skinStatus}</p>`
                : null}
              <div class="frame-wrap">
                <iframe
                  src=${url}
                  title=${`WLED firmware — ${label}`}
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                ></iframe>
              </div>
            `
          : html`
              <p class="empty">
                No host address for this controller. Reload the integration or pick
                another device in the header.
              </p>
            `}
      </section>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .firmware {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-height: 0;
      }
      .head h2 {
        margin: 0 0 6px;
        font-size: 1.15rem;
      }
      .hint {
        margin: 0;
        font-size: 0.88rem;
        opacity: 0.8;
        max-width: 42rem;
      }
      .hint code {
        font-size: 0.85em;
      }
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
      }
      .ghost {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.88rem;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
      }
      .ghost {
        border: 1px solid var(--divider-color);
        background: var(--secondary-background-color);
      }
      .ghost:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .skin-status {
        margin: 0;
        font-size: 0.82rem;
        opacity: 0.75;
      }
      .url {
        font-size: 0.78rem;
        opacity: 0.65;
        word-break: break-all;
        flex: 1;
        min-width: 8rem;
      }
      .frame-wrap {
        flex: 1;
        min-height: min(72vh, 720px);
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid var(--divider-color);
        background: #111;
      }
      iframe {
        display: block;
        width: 100%;
        height: min(72vh, 720px);
        border: none;
        background: #111;
      }
      .empty {
        opacity: 0.75;
        font-size: 0.9rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [VIEW_FIRMWARE_TAG]: WledViewFirmware;
  }
}
