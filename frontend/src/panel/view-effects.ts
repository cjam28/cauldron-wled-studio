import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  applyState,
  buildSegmentPatch,
  fetchDeviceState,
  type DeviceStateSnapshot,
} from "../api/wled-state.js";
import "../components/effect-chips.js";

export const VIEW_EFFECTS_TAG = "wled-view-effects";

@safeCustomElement(VIEW_EFFECTS_TAG)
export class WledViewEffects extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _snapshot?: DeviceStateSnapshot;
  @state() private _segId = 0;
  @state() private _filter = "";
  @state() private _status = "Loading effects…";
  @state() private _toast = "";

  protected override onPoweredConnect(): void {
    void this._load();
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._status = "Loading effects…";
    try {
      this._snapshot = await fetchDeviceState(this.connection, this.controllerId);
      const segs = this._snapshot.segments ?? [];
      const selected = segs.find((s) => s.sel) ?? segs[0];
      this._segId = selected?.id ?? 0;
      this._status = "";
    } catch {
      this._status = "Could not load device state.";
    }
  }

  protected override render() {
    const snap = this._snapshot;
    const seg = (snap?.segments ?? []).find((s) => s.id === this._segId);
    const fx = seg?.fx ?? 0;

    return html`
      <div class="wrap">
        <h2>Effects</h2>
        <p class="hint">Tap an effect to apply to segment ${this._segId}.</p>
        ${this._status ? html`<p>${this._status}</p>` : null}
        ${this._toast ? html`<p class="toast">${this._toast}</p>` : null}
        ${snap
          ? html`
              <input
                class="search"
                type="search"
                placeholder="Search effects…"
                aria-label="Filter effects"
                .value=${this._filter}
                @input=${(e: Event) => {
                  this._filter = (e.target as HTMLInputElement).value;
                }}
              />
              <wled-effect-chips
                .controllerId=${this.controllerId}
                .effectsByName=${snap.effects_by_name ?? {}}
                .soundFlags=${snap.sound_flags ?? []}
                .selectedFx=${fx}
                .filter=${this._filter}
                @effect-select=${(e: CustomEvent<{ effectId: number }>) =>
                  this._onFx(e.detail.effectId)}
              ></wled-effect-chips>
            `
          : null}
      </div>
    `;
  }

  private async _onFx(effectId: number): Promise<void> {
    if (!this.connection || !this._snapshot) return;
    const segs = this._snapshot.segments ?? [];
    const patch = buildSegmentPatch(
      this._segId,
      { fx: effectId, on: true },
      segs
    );
    try {
      await applyState(this.connection, this.controllerId, patch);
      this._toast = "Effect applied";
      const seg = segs.find((s) => s.id === this._segId);
      if (seg) seg.fx = effectId;
      this.requestUpdate();
    } catch {
      this._toast = "Apply failed";
    }
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .wrap {
        max-width: 100%;
      }
      h2 {
        margin: 0 0 8px;
      }
      .hint {
        opacity: 0.75;
        font-size: 0.9rem;
      }
      .search {
        width: 100%;
        max-width: 320px;
        margin: 12px 0;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .toast {
        color: var(--primary-color);
        font-size: 0.9rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [VIEW_EFFECTS_TAG]: WledViewEffects;
  }
}
