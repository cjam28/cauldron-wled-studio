import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { listControllers } from "../api/live-stream.js";

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
      </div>
    `;
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
