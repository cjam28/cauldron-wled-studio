import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { applyState, fetchDeviceState, type WledSegment } from "../api/wled-state.js";
import {
  buildMergeForEffectsState,
  buildRestoreSegmentsState,
  clearSegmentLayoutSnapshot,
  getSegmentLayoutSnapshot,
  isMergeForEffectsActive,
  isStudioMergedLayout,
  saveSegmentLayoutSnapshot,
  setMergeForEffectsActive,
} from "../utils/effect-merge.js";

export const EFFECT_MERGE_TOGGLE_TAG = "wled-effect-merge-toggle";

@safeCustomElement(EFFECT_MERGE_TOGGLE_TAG)
export class WledEffectMergeToggle extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @property({ type: Array }) segments: WledSegment[] = [];
  @property({ type: Array }) editIds: number[] = [];
  @property({ type: Number }) pixelCount = 210;
  @property({ type: Boolean, reflect: true }) compact = false;

  @state() private _merged = false;
  @state() private _busy = false;
  @state() private _error = "";

  protected override onPoweredConnect(): void {
    this._merged = isMergeForEffectsActive(this.controllerId);
  }

  protected override willUpdate(
    changed: import("lit").PropertyValues
  ): void {
    if (changed.has("controllerId")) {
      this._merged = isMergeForEffectsActive(this.controllerId);
    }
    // Ground the checkbox in device truth: a Studio-stamped merged span means
    // merge is on even if this browser holds no flag (merged elsewhere).
    if (
      (changed.has("segments") || changed.has("pixelCount")) &&
      !this._busy &&
      isStudioMergedLayout(this.segments, this.pixelCount)
    ) {
      this._merged = true;
    }
  }

  protected override render() {
    const snap = getSegmentLayoutSnapshot(this.controllerId);
    const span =
      snap && this._merged
        ? `${snap.segments.length} segment layout saved`
        : null;

    return html`
      <label class="merge-row ${this._merged ? "on" : ""}">
        <input
          type="checkbox"
          .checked=${this._merged}
          ?disabled=${this._busy || !this.connection}
          @change=${this._onToggle}
        />
        <span class="merge-label">
          <strong>Merge for effects</strong>
          ${this.compact
            ? null
            : html`
                <span class="sub">
                  Combine highlighted segments into one span so chase-style effects
                  run across LED indices. Uncheck to restore the layout saved when
                  you merged.
                </span>
              `}
          ${span && !this.compact ? html`<span class="saved">${span}</span>` : null}
        </span>
      </label>
      ${this._error ? html`<p class="err">${this._error}</p>` : null}
      ${this._busy ? html`<p class="busy">Updating segments…</p>` : null}
    `;
  }

  private async _onToggle(ev: Event): Promise<void> {
    // Capture the input now — ev.target is not reliable after the awaits below.
    const input = ev.target as HTMLInputElement;
    const checked = input.checked;
    if (!this.connection || !this.controllerId) return;
    this._busy = true;
    this._error = "";
    try {
      if (checked) {
        const snap = await fetchDeviceState(this.connection, this.controllerId);
        const segs = snap.segments ?? this.segments;
        const leds = snap.info?.leds as { count?: number } | undefined;
        const px = Number(leds?.count) || this.pixelCount;
        saveSegmentLayoutSnapshot(this.controllerId, segs, px);
        const mergeState = buildMergeForEffectsState(
          segs,
          px,
          this.editIds.length ? this.editIds : undefined
        );
        await applyState(this.connection, this.controllerId, mergeState, {
          fullResponse: true,
        });
        setMergeForEffectsActive(this.controllerId, true);
        this._merged = true;
      } else {
        const saved = getSegmentLayoutSnapshot(this.controllerId);
        if (saved) {
          await applyState(
            this.connection,
            this.controllerId,
            buildRestoreSegmentsState(saved),
            { fullResponse: true }
          );
        } else {
          // No snapshot in this browser. If the device layout is not a Studio
          // merge, the flag is stale (fresh browser / cleared storage) and
          // clearing it IS the un-merge — the segments were never touched.
          // Only fail when the device really holds a merged span we cannot
          // reconstruct.
          const snap = await fetchDeviceState(this.connection, this.controllerId);
          const segs = snap.segments ?? this.segments;
          const leds = snap.info?.leds as { count?: number } | undefined;
          const px = Number(leds?.count) || this.pixelCount;
          if (isStudioMergedLayout(segs, px)) {
            throw new Error(
              "No saved segment layout to restore in this browser — the merge was applied elsewhere. Re-merge here first, or rebuild segments in the Layout tab."
            );
          }
        }
        setMergeForEffectsActive(this.controllerId, false);
        clearSegmentLayoutSnapshot(this.controllerId);
        this._merged = false;
      }
      this.dispatchEvent(
        new CustomEvent("merge-changed", {
          detail: { merged: this._merged },
          bubbles: true,
          composed: true,
        })
      );
      this.dispatchEvent(
        new CustomEvent("wled-preview-refresh", { bubbles: true, composed: true })
      );
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
      input.checked = this._merged;
    } finally {
      this._busy = false;
    }
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .merge-row {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 10px 12px;
        margin-bottom: 12px;
        border-radius: 10px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        cursor: pointer;
      }
      .merge-row.on {
        border-color: var(--primary-color);
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      }
      :host([compact]) .merge-row {
        padding: 6px 10px;
        margin-bottom: 8px;
        align-items: center;
      }
      :host([compact]) .merge-row .merge-label {
        font-size: 0.8rem;
      }
      .merge-row input {
        margin-top: 4px;
        flex-shrink: 0;
      }
      .merge-label {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.85rem;
      }
      .sub {
        opacity: 0.75;
        font-size: 0.78rem;
        line-height: 1.35;
        font-weight: normal;
      }
      .saved {
        font-size: 0.72rem;
        opacity: 0.6;
      }
      .err {
        color: var(--error-color, #f44);
        font-size: 0.8rem;
        margin: 4px 0 0;
      }
      .busy {
        font-size: 0.8rem;
        opacity: 0.7;
        margin: 4px 0 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [EFFECT_MERGE_TOGGLE_TAG]: WledEffectMergeToggle;
  }
}
