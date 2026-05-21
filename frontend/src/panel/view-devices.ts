import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { listControllers } from "../api/live-stream.js";
import { registerLovelaceResource } from "../api/lovelace.js";

export const VIEW_DEVICES_TAG = "wled-view-devices";

interface ControllerInfo {
  entry_id: string;
  title?: string;
  host?: string;
  pixel_count?: number;
  fw_ver?: string;
  master_entity_id?: string;
}

@safeCustomElement(VIEW_DEVICES_TAG)
export class WledViewDevices extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;

  @state() private _controllers: ControllerInfo[] = [];
  @state() private _status = "Loading…";
  @state() private _cardUrl = "";
  @state() private _cardToast = "";

  protected override onPoweredConnect(): void {
    void this._load();
  }

  private async _load(): Promise<void> {
    if (!this.connection) return;
    try {
      const raw = await listControllers(this.connection);
      this._controllers = raw.map((c) => ({
        entry_id: String(c.entry_id ?? ""),
        title: c.title as string | undefined,
        host: c.host as string | undefined,
        pixel_count: c.pixel_count as number | undefined,
        fw_ver: c.fw_ver as string | undefined,
        master_entity_id: c.master_entity_id as string | undefined,
      }));
      this._status =
        this._controllers.length === 0
          ? "No WLED Studio controllers. Add the integration under Settings → Devices & services."
          : "";
    } catch {
      this._status = "Could not list controllers.";
    }
  }

  protected override render() {
    return html`
      <div class="wrap">
        <h2>Devices</h2>
        <p class="hint">
          WLED Studio attaches to your stock WLED integration. Select a controller in the sidebar
          views (Layout, Scenes, Segments).
        </p>
        ${this._status ? html`<p>${this._status}</p>` : null}
        <ul class="list">
          ${this._controllers.map(
            (c) => html`
              <li class="card">
                <strong>${c.title ?? c.entry_id}</strong>
                <span>${c.host ?? "—"}</span>
                <span>${c.pixel_count ?? "?"} LEDs</span>
                ${c.fw_ver ? html`<span class="dim">WLED ${c.fw_ver}</span>` : null}
                ${c.master_entity_id
                  ? html`<code class="entity">${c.master_entity_id}</code>`
                  : null}
              </li>
            `
          )}
        </ul>

        <section class="card-section">
          <h3>Lovelace card</h3>
          <p class="hint">
            The dashboard card is registered automatically on startup. If it is missing from
            <strong>Settings → Dashboards → Resources</strong>, register it here or open
            <strong>Settings → Devices & services → WLED Studio → Configure</strong>.
          </p>
          ${this._cardUrl
            ? html`<code class="resource-url">${this._cardUrl}</code>`
            : null}
          <button
            type="button"
            class="primary"
            ?disabled=${!this.connection}
            @click=${() => this._registerCard()}
          >
            Register card resource
          </button>
          ${this._cardToast
            ? html`<p class="toast" role="status">${this._cardToast}</p>`
            : null}
        </section>
      </div>
    `;
  }

  private async _registerCard(): Promise<void> {
    if (!this.connection) return;
    this._cardToast = "";
    try {
      const { url } = await registerLovelaceResource(this.connection);
      this._cardUrl = url;
      this._cardToast = url
        ? "Card resource registered. Hard-refresh dashboards (Ctrl+F5)."
        : "Registration sent — check HA logs if the card still does not appear.";
    } catch (err) {
      this._cardToast = err instanceof Error ? err.message : String(err);
    }
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .wrap {
        max-width: 640px;
      }
      h2 {
        margin: 0 0 8px;
      }
      .hint {
        opacity: 0.75;
        font-size: 0.9rem;
      }
      .list {
        list-style: none;
        padding: 0;
        margin: 16px 0 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .card-section {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color);
      }
      .card-section h3 {
        margin: 0 0 8px;
        font-size: 1rem;
      }
      .resource-url {
        display: block;
        margin: 8px 0;
        font-size: 0.75rem;
        word-break: break-all;
      }
      .primary {
        padding: 8px 14px;
        border-radius: 8px;
        border: none;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .toast {
        font-size: 0.85rem;
        color: var(--primary-color);
        margin-top: 8px;
      }
      .card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 14px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
      }
      .dim {
        opacity: 0.65;
        font-size: 0.85rem;
      }
      .entity {
        font-size: 0.8rem;
        opacity: 0.8;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [VIEW_DEVICES_TAG]: WledViewDevices;
  }
}
