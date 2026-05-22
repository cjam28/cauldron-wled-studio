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
import {
  sceneHasThumb,
  scenePreviewGradientStyle,
} from "../utils/scene-gradient.js";

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
    const next = maxItemsForRowWidth(row.clientWidth, 104, 8, 8);
    if (next !== this._visibleCount) this._visibleCount = next;
  }

  private _sceneFor(id: string): SceneRecord | undefined {
    return this.scenes.find((s) => s.id === id);
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
          ${visible.map((r) => {
            const scene = this._sceneFor(r.id);
            const name = scene?.name ?? r.name;
            const gradientStyle = scene
              ? scenePreviewGradientStyle(scene)
              : "linear-gradient(135deg, var(--wled-surface-elevated), var(--wled-surface))";
            const thumbUrl =
              scene && sceneHasThumb(scene)
                ? scene.scene_thumb_url!.trim()
                : "";
            return html`
              <button
                type="button"
                class="chip"
                aria-label=${`Apply scene ${name}`}
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
                <span class="chip-visual">
                  <span
                    class="chip-gradient"
                    style="background:${gradientStyle}"
                    aria-hidden="true"
                  ></span>
                  ${thumbUrl
                    ? html`<img
                        class="chip-thumb"
                        src=${thumbUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        @error=${(e: Event) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = "none";
                        }}
                      />`
                    : null}
                  <span class="chip-scrim">
                    <span class="chip-name">${name}</span>
                  </span>
                </span>
              </button>
            `;
          })}
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
        color: var(--wled-text-muted);
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
        min-height: 120px;
        border: 1px solid var(--wled-border);
        border-radius: var(--wled-radius-sm);
        padding: 0;
        background: var(--wled-surface);
        color: inherit;
        cursor: pointer;
        overflow: hidden;
        transition:
          border-color var(--wled-transition-fast),
          transform var(--wled-transition-fast);
      }
      .chip-visual {
        position: relative;
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        min-height: 72px;
        background: var(--wled-surface-elevated);
      }
      .chip-gradient,
      .chip-thumb {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .chip-thumb {
        object-fit: cover;
        z-index: 1;
      }
      .chip-scrim {
        position: absolute;
        inset: auto 0 0;
        z-index: 2;
        padding: 16px 8px 6px;
        background: linear-gradient(
          180deg,
          transparent 0%,
          color-mix(in srgb, rgb(0 0 0) 72%, transparent) 100%
        );
        pointer-events: none;
      }
      .chip-name {
        display: block;
        font-size: 0.78rem;
        font-weight: 600;
        line-height: 1.2;
        color: var(--wled-text);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
      }
      .chip:hover:not(:disabled) {
        border-color: color-mix(in srgb, var(--wled-accent) 35%, var(--wled-border));
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
