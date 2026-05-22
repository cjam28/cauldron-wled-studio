import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import type { WledSegment } from "../api/wled-state.js";
import { labelForSegment } from "../utils/segment-edit.js";

export const SEGMENT_BAR_TAG = "wled-segment-bar";

@safeCustomElement(SEGMENT_BAR_TAG)
export class WledSegmentBar extends BasePoweredElement {
  @property({ type: Array }) segments: WledSegment[] = [];
  @property({ type: Array }) selectedIds: number[] = [];
  @property({ type: Array }) segmentEntities: Array<{
    entity_id: string;
    segment_index: number;
    name?: string;
  }> = [];
  @property() hint = "Tap segments to toggle";

  @state() private _dragSegId: number | null = null;

  protected override render() {
    if (!this.segments.length) return null;
    return html`
      <div class="block">
        <p class="hint">${this.hint}</p>
        <div class="bar" role="group" aria-label="Segments">
          ${this.segments.map(
            (s) => html`
              <button
                type="button"
                class="btn ${this.selectedIds.includes(s.id) ? "on" : ""} ${this._dragSegId === s.id ? "dragging" : ""}"
                aria-pressed=${this.selectedIds.includes(s.id)}
                @click=${() => this._toggle(s.id)}
                @dragover=${(ev: DragEvent) => {
                  ev.preventDefault();
                }}
                @drop=${(ev: DragEvent) => this._onDrop(s.id, ev)}
              >
                <span
                  class="drag-handle"
                  draggable="true"
                  aria-hidden="true"
                  title="Drag to reorder (preview only)"
                  @dragstart=${(ev: DragEvent) => this._onDragStart(s.id, ev)}
                  @dragend=${() => {
                    this._dragSegId = null;
                  }}
                  @click=${(ev: Event) => ev.stopPropagation()}
                  @mousedown=${(ev: Event) => ev.stopPropagation()}
                >
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <span class="btn-label">${labelForSegment(s, this.segmentEntities)}</span>
              </button>
            `
          )}
        </div>
      </div>
    `;
  }

  private _toggle(id: number): void {
    this.dispatchEvent(
      new CustomEvent("segment-toggle", {
        detail: { id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onDragStart(id: number, ev: DragEvent): void {
    this._dragSegId = id;
    ev.dataTransfer?.setData("text/plain", String(id));
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
    }
  }

  /** Visual-only reorder stub — emits segment-reorder for parent if needed. */
  private _onDrop(targetId: number, ev: DragEvent): void {
    ev.preventDefault();
    const fromId = this._dragSegId;
    this._dragSegId = null;
    if (fromId === null || fromId === targetId) return;
    this.dispatchEvent(
      new CustomEvent("segment-reorder", {
        detail: { fromId, toId: targetId },
        bubbles: true,
        composed: true,
      })
    );
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .hint {
        margin: 0 0 8px;
        font-size: 0.8rem;
        opacity: 0.75;
      }
      .bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 12px;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
        min-height: var(--wled-tap);
        transition:
          border-color var(--wled-transition-fast),
          background var(--wled-transition-fast),
          outline-color var(--wled-transition-fast);
      }
      .drag-handle {
        display: inline-flex;
        align-items: center;
        cursor: grab;
        opacity: 0.55;
        touch-action: none;
        line-height: 0;
        padding: 0 2px 0 0;
      }
      .drag-handle:active {
        cursor: grabbing;
      }
      .drag-handle ha-icon {
        --mdc-icon-size: 16px;
      }
      .btn.dragging {
        opacity: 0.65;
      }
      .btn-label {
        white-space: nowrap;
      }
      .btn.on {
        border-color: var(--wled-accent);
        background: var(--wled-accent-soft);
        outline: 2px solid var(--wled-accent);
        outline-offset: 1px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [SEGMENT_BAR_TAG]: WledSegmentBar;
  }
}
