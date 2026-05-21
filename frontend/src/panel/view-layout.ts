import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { layoutList, layoutSave, layoutToSegments, type LayoutRecord } from "../api/layout.js";
import { kitchenIslandLayout } from "../data/kitchen-island-layout.js";

export const VIEW_LAYOUT_TAG = "wled-view-layout";

@safeCustomElement(VIEW_LAYOUT_TAG)
export class WledViewLayout extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _layouts: LayoutRecord[] = [];
  @state() private _status = "Loading layouts…";
  @state() private _busy = false;

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(): void {
    if (this.connection && this.controllerId) void this._load();
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      this._layouts = await layoutList(this.connection, this.controllerId);
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
    this._busy = true;
    try {
      await layoutSave(
        this.connection,
        this.controllerId,
        kitchenIslandLayout(this.controllerId)
      );
      await this._load();
    } finally {
      this._busy = false;
    }
  }

  private async _applySegments(layoutId: string): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._busy = true;
    try {
      await layoutToSegments(this.connection, this.controllerId, layoutId);
      this._status = "WLED segments updated from layout anchors";
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._busy = false;
    }
  }

  protected override render() {
    return html`
      <div class="layout-view">
        <p>${this._status}</p>
        <div class="actions">
          <button
            class="primary"
            ?disabled=${this._busy}
            @click=${() => this._seedKitchenIsland()}
          >
            Add kitchen-island template
          </button>
        </div>
        <ul>
          ${this._layouts.map(
            (l) => html`
              <li>
                <span>${l.name ?? l.id}</span>
                <span class="meta">${l.pixel_count} px</span>
                <button
                  class="small"
                  ?disabled=${this._busy}
                  @click=${() => this._applySegments(String(l.id))}
                >
                  Apply segments to WLED
                </button>
              </li>
            `
          )}
        </ul>
        <p class="hint">
          Maps anchors to Face/Forward/Back/Rear-style segments (0–85, 85–96, 96–186,
          186–210). Konva editor loads when the layout-designer component lands.
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
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .primary,
      .small {
        padding: 10px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
      }
      .small {
        padding: 4px 8px;
        font-size: 0.75rem;
        margin-left: 8px;
      }
      li {
        margin-bottom: 8px;
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
