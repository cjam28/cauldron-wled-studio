import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  getRecentScenes,
  maxItemsForRowWidth,
  type RecentSceneEntry,
} from "../utils/recent-store.js";
import type { SceneRecord } from "../api/scenes.js";

export const RECENT_SCENES_TAG = "wled-recent-scenes-row";

@safeCustomElement(RECENT_SCENES_TAG)
export class WledRecentScenesRow extends BasePoweredElement {
  @property() controllerId = "";
  @property({ type: Array }) scenes: SceneRecord[] = [];
  @property({ type: Boolean }) disabled = false;

  @state() private _recents: RecentSceneEntry[] = [];
  @state() private _visibleCount = 6;

  private _ro?: ResizeObserver;
  private _rowEl?: HTMLElement;

  protected override onPoweredConnect(): void {
    this._reload();
    this._ro = new ResizeObserver(() => this._measure());
    this.addUnsub(() => this._ro?.disconnect());
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    if (changed.has("controllerId")) this._reload();
    const row = this.renderRoot.querySelector(".recent-row") as HTMLElement | null;
    if (row && row !== this._rowEl) {
      this._rowEl = row;
      this._ro?.observe(row);
      this._measure();
    }
  }

  reload(): void {
    this._reload();
  }

  private _reload(): void {
    this._recents = getRecentScenes(this.controllerId);
  }

  private _measure(): void {
    const row = this._rowEl;
    if (!row) return;
    const next = maxItemsForRowWidth(row.clientWidth, 88, 8, 8);
    if (next !== this._visibleCount) this._visibleCount = next;
  }

  protected override render() {
    const visible = this._recents
      .filter((r) => this.scenes.some((s) => s.id === r.id))
      .slice(0, this._visibleCount);
    if (!visible.length) return null;

    return html`
      <div class="block">
        <span class="label">Recent scenes</span>
        <div class="recent-row" role="group" aria-label="Recent scenes">
          ${visible.map(
            (r) => html`
              <button
                type="button"
                class="chip"
                ?disabled=${this.disabled}
                @click=${() =>
                  this.dispatchEvent(
                    new CustomEvent("scene-select", {
                      detail: { sceneId: r.id },
                      bubbles: true,
                      composed: true,
                    })
                  )}
              >
                ${r.name}
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .block {
        margin-bottom: 14px;
      }
      .label {
        display: block;
        margin-bottom: 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
      }
      .recent-row {
        display: flex;
        flex-wrap: nowrap;
        gap: 8px;
        overflow: hidden;
      }
      .chip {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 8px 10px;
        background: var(--card-background-color);
        color: inherit;
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .chip:hover:not(:disabled) {
        background: var(--secondary-background-color);
      }
      .chip:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [RECENT_SCENES_TAG]: WledRecentScenesRow;
  }
}
