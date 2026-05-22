import { css, html } from "lit";
import { property } from "lit/decorators.js";
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
                class="btn ${this.selectedIds.includes(s.id) ? "on" : ""}"
                aria-pressed=${this.selectedIds.includes(s.id)}
                @click=${() => this._toggle(s.id)}
              >
                ${labelForSegment(s, this.segmentEntities)}
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
