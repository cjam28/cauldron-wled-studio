import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  layoutList,
  layoutSave,
  layoutGet,
  layoutToSegments,
  type LayoutRecord,
} from "../api/layout.js";
import { kitchenIslandLayout } from "../data/kitchen-island-layout.js";
import type { WledLayoutDesigner, LayoutFixture, LayoutChangeDetail } from "../components/layout-designer.js";
import "../components/layout-designer.js";
import "../components/geometry-preview.js";

export const VIEW_LAYOUT_TAG = "wled-view-layout";

@safeCustomElement(VIEW_LAYOUT_TAG)
export class WledViewLayout extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _layouts: LayoutRecord[] = [];
  @state() private _status = "Loading layouts…";
  @state() private _busy = false;
  @state() private _selectedId: string | null = null;
  @state() private _selectedLayout: LayoutRecord | null = null;
  @state() private _pendingFixture: LayoutFixture | null = null;

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
          ? "No layouts yet — seed one below."
          : `${this._layouts.length} layout(s) saved`;
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    }
  }

  private async _selectLayout(layoutId: string): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._busy = true;
    try {
      this._selectedId = layoutId;
      this._selectedLayout = await layoutGet(this.connection, this.controllerId, layoutId);
      this._pendingFixture = null;

      // Push fixture data into designer after render
      await this.updateComplete;
      const designer = this.renderRoot.querySelector<WledLayoutDesigner>("wled-layout-designer");
      if (designer && this._selectedLayout) {
        const fix = this._selectedLayout.fixtures[0] as unknown as LayoutFixture | undefined;
        if (fix) designer.setFixture(fix);
      }
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._busy = false;
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

  private _onLayoutChange(e: Event): void {
    const detail = (e as CustomEvent<LayoutChangeDetail>).detail;
    if (!this._selectedLayout) return;
    const existing = this._selectedLayout.fixtures[0] as unknown as
      | LayoutFixture
      | undefined;
    if (!existing) return;
    this._pendingFixture = {
      ...existing,
      points: detail.points,
      anchors: detail.anchors,
    };
  }

  private async _onLayoutSave(e: Event): Promise<void> {
    const fixture = (e as CustomEvent<LayoutFixture>).detail;
    if (!this.connection || !this.controllerId || !this._selectedLayout) return;
    this._busy = true;
    try {
      const updated: LayoutRecord = {
        ...this._selectedLayout,
        fixtures: [fixture as unknown as Record<string, unknown>],
      };
      this._selectedLayout = await layoutSave(this.connection, this.controllerId, updated);
      this._pendingFixture = null;
      this._status = "Layout saved";
      await this._load();
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._busy = false;
    }
  }

  protected override render() {
    const hasSelection = this._selectedId !== null && this._selectedLayout !== null;
    const firstFixture = this._selectedLayout?.fixtures?.[0] as unknown as LayoutFixture | undefined;

    return html`
      <div class="layout-view">
        <div class="top-bar">
          <p class="status">${this._status}</p>
          <div class="actions">
            <button
              class="primary"
              ?disabled=${this._busy}
              @click=${() => this._seedKitchenIsland()}
            >
              Add kitchen-island template
            </button>
          </div>
        </div>

        <div class="layout-list">
          ${this._layouts.map(
            (l) => html`
              <div class="layout-item ${this._selectedId === String(l.id) ? "active" : ""}">
                <button
                  class="layout-name"
                  @click=${() => this._selectLayout(String(l.id))}
                >
                  <span>${l.name ?? l.id}</span>
                  <span class="meta">${l.pixel_count} px</span>
                </button>
                <button
                  class="small"
                  ?disabled=${this._busy}
                  @click=${() => this._applySegments(String(l.id))}
                >
                  Apply to WLED
                </button>
              </div>
            `
          )}
        </div>

        ${hasSelection
          ? html`
              <div class="editor-row">
                <div class="editor-col">
                  <h3 class="col-label">Layout Designer</h3>
                  <wled-layout-designer
                    .fixtureId=${firstFixture?.id ?? "fixture"}
                    .fixtureName=${firstFixture?.name ?? "Fixture"}
                    @layout-change=${this._onLayoutChange}
                    @layout-save=${this._onLayoutSave}
                  ></wled-layout-designer>
                </div>
                <div class="editor-col">
                  <h3 class="col-label">Live Preview</h3>
                  <wled-geometry-preview
                    .connection=${this.connection}
                    .controllerId=${this.controllerId}
                    .layoutId=${this._selectedId ?? ""}
                    .fixtureId=${firstFixture?.id ?? ""}
                    .pixelCount=${this._selectedLayout?.pixel_count ?? 210}
                  ></wled-geometry-preview>
                </div>
              </div>
              ${this._pendingFixture
                ? html`<p class="hint unsaved">Unsaved changes — click Save layout in the designer.</p>`
                : null}
            `
          : html`
              <p class="hint">Select a layout above to open the editor.</p>
            `}
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .layout-view {
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .top-bar {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 8px;
      }
      .status {
        flex: 1;
        margin: 0;
        opacity: 0.8;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .primary {
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
        border: none;
        border-radius: 6px;
        background: var(--secondary-background-color, #333);
        color: var(--primary-text-color, #fff);
        cursor: pointer;
        margin-left: 8px;
      }
      .layout-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .layout-item {
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 4px 8px;
        background: var(--card-background-color, #1e1e2a);
      }
      .layout-item.active {
        background: color-mix(in srgb, var(--primary-color) 20%, transparent);
        border: 1px solid var(--primary-color);
      }
      .layout-name {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 8px;
        border: none;
        background: transparent;
        color: var(--primary-text-color, #fff);
        cursor: pointer;
        text-align: left;
        padding: 6px 4px;
      }
      .meta {
        opacity: 0.7;
        font-size: 0.8rem;
      }
      .editor-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        min-height: 340px;
      }
      @container (min-width: 700px) {
        .editor-row {
          grid-template-columns: 1fr 1fr;
        }
      }
      .editor-col {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-height: 300px;
      }
      .col-label {
        margin: 0;
        font-size: 0.85rem;
        font-weight: 600;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .hint {
        font-size: 0.85rem;
        opacity: 0.7;
      }
      .unsaved {
        color: var(--warning-color, #ff9800);
        opacity: 1;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [VIEW_LAYOUT_TAG]: WledViewLayout;
  }
}
