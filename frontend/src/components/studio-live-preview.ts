import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  listControllers,
  subscribeLive,
  type LiveFrameEvent,
} from "../api/live-stream.js";
import { fetchDeviceState, type WledSegment } from "../api/wled-state.js";
import type { WledStripPreview } from "./strip-preview.js";
import "./strip-preview.js";

export const STUDIO_LIVE_PREVIEW_TAG = "wled-studio-live-preview";

/**
 * Map an incoming live frame to a status label, honoring the LV-4 additive
 * proxy fields per the FRAME-STATUS CONTRACT:
 *
 *   - "stale" — the held frame is genuinely OLD (upstream produced nothing for
 *     >= LIVE_STALE_SEC). Only here does a consumer stop painting and show a
 *     reconnecting/stale badge.
 *   - "drop"  — fresh frame, but N intervening frames were coalesced/skipped for
 *     this (throttled/remote) subscriber. THE FRAME IS STILL THE FRESHEST DATA;
 *     consumers MUST keep painting it. `dropped > 0` is informational only — at
 *     most a subtle "throttled" hint, never an alarming "stale/dropped" badge
 *     and never a freeze. A remote viewer sees this on nearly every delivery.
 *   - "live"  — fresh frame, nothing skipped.
 *
 * Returns "stale" only for a genuinely stale frame; "throttled" is the subtle
 * (non-alarming) hint for coalesced delivery; otherwise "live".
 */
export function statusLabelForFrame(frame: LiveFrameEvent): string {
  if (frame.stale === true || frame.status === "stale") return "stale";
  if (frame.status === "drop" || (frame.dropped ?? 0) > 0) return "throttled";
  return "live";
}

/** Shared 1D strip live preview for Studio panel views (Scenes / Effects / Segments). */
@safeCustomElement(STUDIO_LIVE_PREVIEW_TAG)
export class WledStudioLivePreview extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @property({ type: Number }) heightPx = 56;
  @property({ type: Number }) selectedSegId = -1;
  @property({ type: Array }) highlightSegIds: number[] = [];

  @state() private _pixelCount = 210;
  @state() private _segments: WledSegment[] = [];
  @state() private _status = "connecting";

  private _unsubLive?: () => void;

  protected override willUpdate(
    changed: import("lit").PropertyValues
  ): void {
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      void this._bootstrap();
    }
  }

  protected override onPoweredConnect(): void {
    void this._bootstrap();
  }

  protected override onPoweredDisconnect(): void {
    this._unsubLive?.();
    this._unsubLive = undefined;
  }

  private async _bootstrap(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._status = "connecting";
    this._preview()?.setStatus(this._status);
    try {
      const controllers = await listControllers(this.connection);
      const pick = controllers.find(
        (c) => String(c.entry_id) === this.controllerId
      );
      this._pixelCount = Number(pick?.pixel_count) || 210;
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      this._segments = snap.segments ?? [];
    } catch {
      this._segments = [];
    }
    this._startLive();
  }

  private _startLive(): void {
    if (!this.connection || !this.controllerId) return;
    this._unsubLive?.();
    this._unsubLive = subscribeLive(
      this.connection,
      this.controllerId,
      (frame) => {
        this._status = statusLabelForFrame(frame);
        this._preview()?.setStatus(this._status);
        // FRAME-STATUS CONTRACT: a "drop"/"throttled" frame is still the
        // freshest data — PAINT IT (no freeze). Only a genuinely "stale" frame
        // is withheld so the strip keeps its last good pixels, matching
        // geometry-preview.setFrame's stale handling.
        if (this._status !== "stale") {
          this._preview()?.setFrame(frame);
        }
      },
      { remote: this.remote.state.isRemote }
    );
    this.addUnsub(() => this._unsubLive?.());
  }

  pulseApply(): void {
    this._preview()?.pulseApply();
  }

  /** Refresh segment boundaries after apply (scenes/effects). */
  async refreshSegments(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      this._segments = snap.segments ?? [];
    } catch {
      /* keep last */
    }
  }

  private _preview(): WledStripPreview | undefined {
    return this.renderRoot.querySelector("wled-strip-preview") ?? undefined;
  }

  /**
   * Alarming badge (reconnecting/stale) is reserved for a GENUINELY stale
   * stream only. "throttled" (coalesced/dropped frames) is normal for a remote
   * viewer and gets at most a subtle hint, never this badge — per the
   * FRAME-STATUS CONTRACT. "drop" never reaches here as its own status label.
   */
  private _isStale(): boolean {
    return this._status === "stale";
  }

  /** Subtle, non-alarming hint that frames are being coalesced for this viewer. */
  private _isThrottled(): boolean {
    return this._status === "throttled";
  }

  private _onSegmentSelect(ev: CustomEvent<{ segmentId: number }>): void {
    this.dispatchEvent(
      new CustomEvent("segment-select", {
        detail: ev.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  protected override render() {
    return html`
      <div class="rail-preview">
        <p class="label">Live strip</p>
        <wled-strip-preview
          .heightPx=${this.heightPx}
          .pixelCount=${this._pixelCount}
          .segments=${this._segments}
          .selectedSegId=${this.selectedSegId}
          .highlightSegIds=${this.highlightSegIds}
          @segment-select=${this._onSegmentSelect}
        ></wled-strip-preview>
        ${this._isStale()
          ? html`<span class="status status-badge" role="status"
              >reconnecting</span
            >`
          : this._isThrottled()
            ? html`<span class="status status-hint">throttled</span>`
            : this._status !== "live"
              ? html`<span class="status">${this._status}</span>`
              : null}
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .rail-preview {
        margin-bottom: 14px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color);
      }
      .label {
        margin: 0 0 6px;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
      }
      .status {
        display: block;
        margin-top: 4px;
        font-size: 0.75rem;
        opacity: 0.6;
      }
      /* Throttled hint — coalesced delivery is NORMAL for a remote viewer, so
         this is deliberately subtle (muted, lowercase, no chip): an informational
         note that frames are being skipped, NEVER an alarming "stale/dropped"
         badge and NEVER implying a freeze (the strip keeps painting). */
      .status-hint {
        display: inline-block;
        margin-top: 4px;
        font-size: 0.68rem;
        letter-spacing: 0.02em;
        opacity: 0.45;
      }
      /* LV-4 stale badge — reserved for a GENUINELY stale stream (upstream
         paused >= LIVE_STALE_SEC). Distinct from the muted connecting label and
         from the subtle throttled hint. Container-relative chip; M3 tokens with
         safe fallbacks; no viewport media queries (sizing follows the
         surrounding rail container). */
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        width: max-content;
        max-width: 100%;
        margin-top: 6px;
        padding: 2px 8px;
        border-radius: var(--wled-radius-sm, 6px);
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        opacity: 1;
        color: var(--md-sys-color-on-tertiary-container, var(--wled-text, #fff));
        background: var(
          --md-sys-color-tertiary-container,
          var(--wled-accent-soft, rgba(255, 193, 7, 0.18))
        );
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [STUDIO_LIVE_PREVIEW_TAG]: WledStudioLivePreview;
  }
}
