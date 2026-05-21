import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { SCHEMA_VERSION } from "../api/types.js";

export const VIEW_LAYOUT_TAG = "wled-view-layout";

@safeCustomElement(VIEW_LAYOUT_TAG)
export class WledViewLayout extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _layouts: Array<Record<string, unknown>> = [];
  @state() private _status = "Loading layouts…";

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(): void {
    if (this.connection && this.controllerId) void this._load();
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      const res = (await this.connection.sendMessagePromise({
        type: "wled_studio/layout_list",
        schema_version: SCHEMA_VERSION,
        controller_id: this.controllerId,
      })) as { layouts?: Array<Record<string, unknown>> };
      this._layouts = res.layouts ?? [];
      this._status =
        this._layouts.length === 0
          ? "No layouts yet — Konva designer ships in the next Phase 3 increment."
          : `${this._layouts.length} layout(s) saved`;
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    }
  }

  private async _seedKitchenIsland(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    const layout = {
      id: "kitchen-island",
      controller_id: this.controllerId,
      name: "Kitchen island",
      pixel_count: 210,
      fixtures: [
        {
          id: "kitchen-island",
          name: "Kitchen island",
          kind: "polyline",
          closed: true,
          points: [
            [0, 0],
            [100, 0],
            [110, 10],
            [200, 10],
            [0, 0],
          ],
          anchors: [
            { led: 0, vertex_index: 0 },
            { led: 85, vertex_index: 1 },
            { led: 96, vertex_index: 2 },
            { led: 186, vertex_index: 3 },
            { led: 209, vertex_index: 4 },
          ],
        },
      ],
    };
    await this.connection.sendMessagePromise({
      type: "wled_studio/layout_save",
      schema_version: SCHEMA_VERSION,
      controller_id: this.controllerId,
      layout,
    });
    await this._load();
  }

  protected override render() {
    return html`
      <div class="layout-view">
        <p>${this._status}</p>
        <button class="primary" @click=${() => this._seedKitchenIsland()}>
          Add kitchen-island template
        </button>
        <ul>
          ${this._layouts.map(
            (l) => html`
              <li>${l.name ?? l.id} <span class="meta">${l.pixel_count} px</span></li>
            `
          )}
        </ul>
        <p class="hint">
          Phase 3 continues: Konva editor, background upload, geometry preview on live
          frames.
        </p>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .layout-view {
        padding: 8px 0;
      }
      .primary {
        padding: 10px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        margin-bottom: 12px;
      }
      ul {
        margin: 0;
        padding-left: 1.2rem;
      }
      .meta {
        opacity: 0.7;
        font-size: 0.8rem;
      }
      .hint {
        font-size: 0.85rem;
        opacity: 0.75;
        margin-top: 16px;
      }
    `,
  ];
}
