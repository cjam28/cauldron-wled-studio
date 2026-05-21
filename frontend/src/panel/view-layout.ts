import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { layoutList, layoutSave, layoutToSegments, type LayoutRecord } from "../api/layout.js";
import { kitchenIslandLayout } from "../data/kitchen-island-layout.js";
import type { LiveFrameEvent } from "../api/live-stream.js";
import { subscribeLive } from "../api/live-stream.js";
import type { WledGeometryPreview } from "../components/geometry-preview.js";

// Register sub-components eagerly (they are already registered by the imports
// below, but we import them for their side-effects in the panel bundle).
import "../components/layout-designer.js";
import "../components/geometry-preview.js";

export const VIEW_LAYOUT_TAG = "wled-view-layout";

type ViewMode = "list" | "designer";

@safeCustomElement(VIEW_LAYOUT_TAG)
export class WledViewLayout extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _layouts: LayoutRecord[] = [];
  @state() private _status = "Loading layouts…";
  @state() private _busy = false;
  @state() private _viewMode: ViewMode = "list";
  @state() private _activeLayoutId = "";
  @state() private _activeFixtureId = "";
  @state() private _activePixelCount = 210;

  private _liveUnsub?: () => void;

  protected override onPoweredConnect(): void {
    void this._load();
    this._attachLive();
  }

  protected override onPoweredDisconnect(): void {
    this._liveUnsub?.();
    this._liveUnsub = undefined;
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    super.updated(changed);
    if (changed.has("connection") || changed.has("controllerId")) {
      void this._load();
      this._attachLive();
    }
  }

  private _attachLive(): void {
    this._liveUnsub?.();
    if (!this.connection || !this.controllerId) return;
    this._liveUnsub = subscribeLive(this.connection, this.controllerId, (frame) => {
      this._forwardFrame(frame);
    });
  }

  private _forwardFrame(frame: LiveFrameEvent): void {
    const preview = this.renderRoot.querySelector<WledGeometryPreview>(
      "wled-geometry-preview"
    );
    preview?.setFrame(frame);
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      this._layouts = await layoutList(this.connection, this.controllerId);
      this._status =
        this._layouts.length === 0
          ? "No layouts yet — use the button below to seed the kitchen-island template."
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

  private _openDesigner(layout: LayoutRecord): void {
    this._activeLayoutId = String(layout.id);
    const firstFixture = layout.fixtures[0] as
      | Record<string, unknown>
      | undefined;
    this._activeFixtureId = firstFixture
      ? String(firstFixture.id ?? "fixture-0")
      : "fixture-0";
    this._activePixelCount = layout.pixel_count ?? 210;
    this._viewMode = "designer";
  }

  private _onDesignerSave = async (): Promise<void> => {
    await this._load();
    const preview = this.renderRoot.querySelector<WledGeometryPreview>(
      "wled-geometry-preview"
    );
    await preview?.refresh();
    if (this._activeLayoutId) {
      await this._applySegments(this._activeLayoutId);
    }
  };

  protected override render() {
    if (this._viewMode === "designer") {
      return this._renderDesigner();
    }
    return this._renderList();
  }

  private _renderList() {
    return html`
      <div class="layout-view">
        <p class="status-line">${this._status}</p>

        <div class="actions">
          <button
            class="primary"
            ?disabled=${this._busy}
            @click=${() => this._seedKitchenIsland()}
          >
            Add kitchen-island template
          </button>
        </div>

        ${this._layouts.length > 0
          ? html`
              <ul class="layout-list">
                ${this._layouts.map(
                  (l) => html`
                    <li class="layout-item">
                      <div class="layout-info">
                        <span class="layout-name">${l.name ?? l.id}</span>
                        <span class="meta">${l.pixel_count} px</span>
                      </div>
                      <div class="layout-btns">
                        <button
                          class="small"
                          ?disabled=${this._busy}
                          @click=${() => this._openDesigner(l)}
                        >
                          Edit
                        </button>
                        <button
                          class="small"
                          ?disabled=${this._busy}
                          @click=${() => this._applySegments(String(l.id))}
                        >
                          Apply segments
                        </button>
                      </div>
                    </li>
                  `
                )}
              </ul>
            `
          : null}
      </div>
    `;
  }

  private _renderDesigner() {
    return html`
      <div class="designer-view">
        <div class="designer-header">
          <button
            class="back"
            @click=${() => {
              this._viewMode = "list";
            }}
          >
            ← Back to layouts
          </button>
          <span class="layout-id-label">${this._activeLayoutId}</span>
          <button
            class="small"
            ?disabled=${this._busy}
            @click=${() => this._applySegments(this._activeLayoutId)}
          >
            Apply segments to WLED
          </button>
        </div>

        <wled-layout-designer
          class="designer-main"
          .connection=${this.connection}
          controllerId=${this.controllerId}
          layoutId=${this._activeLayoutId}
          fixtureId=${this._activeFixtureId}
          pixelCount=${this._activePixelCount}
          @layout-saved=${this._onDesignerSave}
        >
          <div slot="preview" class="preview-slot">
            <div class="preview-label">Live geometry preview</div>
            <wled-geometry-preview
              .connection=${this.connection}
              controllerId=${this.controllerId}
              layoutId=${this._activeLayoutId}
              fixtureId=${this._activeFixtureId}
              pixelCount=${this._activePixelCount}
            ></wled-geometry-preview>
          </div>
        </wled-layout-designer>

        ${this._status
          ? html`<p class="status-line">${this._status}</p>`
          : null}
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      /* ── list view ─────────────────────────────────────── */
      .layout-view {
        padding: 8px 0;
      }
      .status-line {
        margin: 0 0 10px;
        font-size: 0.85rem;
        opacity: 0.8;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }
      .layout-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .layout-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 8px;
        background: var(--card-background-color, #1f2937);
      }
      .layout-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .layout-name {
        font-weight: 500;
      }
      .meta {
        font-size: 0.78rem;
        opacity: 0.65;
      }
      .layout-btns {
        display: flex;
        gap: 6px;
      }

      /* ── designer view ──────────────────────────────────── */
      .designer-view {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: calc(100dvh - 8rem);
        overflow: hidden;
      }
      .designer-header {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .layout-id-label {
        flex: 1;
        font-size: 0.85rem;
        opacity: 0.7;
        font-family: monospace;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .designer-main {
        flex: 1;
        min-height: min(78vh, calc(100dvh - 9rem));
        max-height: min(78vh, calc(100dvh - 9rem));
        overflow: hidden;
      }
      .preview-slot {
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 100%;
        min-height: 0;
      }
      .preview-label {
        font-size: 0.8rem;
        opacity: 0.65;
        flex-shrink: 0;
      }
      .preview-slot wled-geometry-preview {
        flex: 1;
        min-height: 0;
      }

      /* ── shared buttons ─────────────────────────────────── */
      .primary,
      .small,
      .back {
        padding: 8px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.85rem;
        white-space: nowrap;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.78rem;
      }
      .back {
        background: transparent;
        border: 1px solid var(--divider-color, #374151);
        color: var(--primary-text-color);
      }
      .primary:disabled,
      .small:disabled {
        opacity: 0.45;
        cursor: default;
      }
    `,
  ];
}
