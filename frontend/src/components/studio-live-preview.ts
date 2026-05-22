import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { listControllers, subscribeLive } from "../api/live-stream.js";
import { fetchDeviceState, type WledSegment } from "../api/wled-state.js";
import type { WledStripPreview } from "./strip-preview.js";
import "./strip-preview.js";

export const STUDIO_LIVE_PREVIEW_TAG = "wled-studio-live-preview";

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
        this._status = "live";
        this._preview()?.setStatus(this._status);
        this._preview()?.setFrame(frame);
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
        ${this._status !== "live"
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [STUDIO_LIVE_PREVIEW_TAG]: WledStudioLivePreview;
  }
}
