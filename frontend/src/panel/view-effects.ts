import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  applyState,
  buildSegmentPatchForIds,
  fetchDeviceState,
  fetchEffectMeta,
  type DeviceStateSnapshot,
  type EffectMeta,
  type WledSegment,
} from "../api/wled-state.js";
import { toggleEditId } from "../utils/segment-edit.js";
import "../components/effect-chips.js";
import "../components/segment-bar.js";

export const VIEW_EFFECTS_TAG = "wled-view-effects";

const SLIDER_LABELS: Record<string, string> = {
  sx: "Speed",
  ix: "Intensity",
  c1: "Custom 1",
  c2: "Custom 2",
  c3: "Custom 3",
  o1: "Option 1",
  o2: "Option 2",
  o3: "Option 3",
};

@safeCustomElement(VIEW_EFFECTS_TAG)
export class WledViewEffects extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";

  @state() private _snapshot?: DeviceStateSnapshot;
  @state() private _segments: WledSegment[] = [];
  @state() private _editIds: number[] = [];
  @state() private _focusSegId = 0;
  @state() private _filter = "";
  @state() private _status = "Loading effects…";
  @state() private _toast = "";
  @state() private _meta?: EffectMeta;

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(
    changed: import("lit").PropertyValues
  ): void {
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      void this._load();
    }
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._status = "Loading effects…";
    try {
      this._snapshot = await fetchDeviceState(this.connection, this.controllerId);
      this._segments = [...(this._snapshot.segments ?? [])].sort((a, b) => a.id - b.id);
      if (this._segments.length) {
        const ids = this._segments.map((s) => s.id);
        const valid = this._editIds.filter((id) => ids.includes(id));
        this._editIds = valid.length ? valid : ids;
        if (!ids.includes(this._focusSegId)) {
          this._focusSegId = this._segments[0].id;
        }
      }
      await this._refreshMeta();
      this._status = "";
    } catch {
      this._status = "Could not load device state.";
    }
  }

  private _activeSeg(): WledSegment | undefined {
    return (
      this._segments.find((s) => s.id === this._focusSegId) ?? this._segments[0]
    );
  }

  private async _refreshMeta(): Promise<void> {
    const seg = this._activeSeg();
    if (!this.connection || !this.controllerId || !seg) return;
    this._meta = await fetchEffectMeta(
      this.connection,
      this.controllerId,
      seg.fx ?? 0
    );
  }

  /** Strip preview tap — focus segment and include in edit set. */
  selectSegmentFromPreview(id: number): void {
    if (!this._editIds.includes(id)) {
      this._editIds = [...this._editIds, id].sort((a, b) => a - b);
    }
    this._focusSegId = id;
    void this._refreshMeta();
  }

  private _onSegToggle(ev: CustomEvent<{ id: number }>): void {
    let next = toggleEditId(this._editIds, ev.detail.id);
    if (!next.length) next = [ev.detail.id];
    this._editIds = next;
    this._focusSegId = ev.detail.id;
    void this._refreshMeta();
  }

  protected override render() {
    const snap = this._snapshot;
    const seg = this._activeSeg();
    const fx = seg?.fx ?? 0;
    const meta = this._meta;
    const sliders = meta?.sliders ?? {};
    const targetCount = this._editIds.length;

    return html`
      <div class="wrap">
        <h2>Effects</h2>
        <p class="hint">
          Tap segments to choose targets. Tap the active effect again to return to Solid.
        </p>
        <details class="seg-note">
          <summary>Why do chase effects restart on each segment?</summary>
          <p>
            WLED runs effects <strong>per segment</strong>: each segment’s effect uses LED
            indices <code>start…stop</code> only inside that segment. The same effect on
            neighbors does not continue across segment boundaries. For one motion across the
            whole strip, use a <strong>single segment</strong> spanning all LEDs (Layout →
            Apply segments) or external tools (LedFX / xLights). WLED+ uses the same model;
            grouping is planned in firmware, not shipped yet.
          </p>
        </details>
        ${this._status ? html`<p>${this._status}</p>` : null}
        ${this._toast ? html`<p class="toast" role="status">${this._toast}</p>` : null}

        ${this._segments.length
          ? html`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._editIds}
                .segmentEntities=${snap?.segment_entities ?? []}
                hint="Apply effects to highlighted segments"
                @segment-toggle=${this._onSegToggle}
              ></wled-segment-bar>
            `
          : null}

        ${snap && seg
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
                @effect-select=${(
                  e: CustomEvent<{ effectId: number; toggledOff?: boolean }>
                ) => this._onFx(e.detail.effectId, e.detail.toggledOff)}
              ></wled-effect-chips>

              <div class="sliders">
                ${Object.entries(SLIDER_LABELS).map(([key, label]) => {
                  if (!sliders[key]) return null;
                  const val = seg[key as keyof WledSegment] as number | undefined;
                  return html`
                    <label>
                      ${label}
                      <ha-slider
                        min="0"
                        max="255"
                        step="1"
                        .value=${val ?? 128}
                        @change=${(ev: Event) =>
                          this._slider(key as keyof WledSegment, ev)}
                      ></ha-slider>
                    </label>
                  `;
                })}
              </div>
              <p class="meta">
                ${targetCount} segment${targetCount === 1 ? "" : "s"} · effect
                #${fx}
              </p>
            `
          : null}
      </div>
    `;
  }

  private async _onFx(effectId: number, toggledOff?: boolean): Promise<void> {
    if (!this.connection || !this._snapshot) return;
    const targets = this._editIds.length
      ? this._editIds
      : [this._focusSegId];
    const patch = buildSegmentPatchForIds(
      targets,
      { fx: effectId, on: true },
      this._segments
    );
    try {
      await applyState(this.connection, this.controllerId, patch);
      for (const tid of targets) {
        const idx = this._segments.findIndex((s) => s.id === tid);
        if (idx >= 0) {
          const next = [...this._segments];
          next[idx] = { ...next[idx], fx: effectId, on: true };
          this._segments = next;
        }
      }
      this._focusSegId = targets[0];
      await this._refreshMeta();
      const name =
        Object.entries(this._snapshot.effects_by_name).find(
          ([, id]) => id === effectId
        )?.[0] ?? (toggledOff ? "Solid" : `#${effectId}`);
      this._toast = toggledOff ? `Solid on ${targets.length} segment(s)` : `Applied ${name}`;
      this.dispatchEvent(
        new CustomEvent("wled-preview-refresh", { bubbles: true, composed: true })
      );
    } catch (err) {
      this._toast = `Apply failed: ${(err as Error).message || "error"}`;
    }
  }

  private _slider(key: keyof WledSegment, ev: Event): void {
    if (!this.connection || !this._snapshot) return;
    const value = Number((ev.target as HTMLInputElement).value);
    const targets = this._editIds.length
      ? this._editIds
      : [this._focusSegId];
    const patch = buildSegmentPatchForIds(
      targets,
      { [key]: value } as Partial<WledSegment>,
      this._segments
    );
    void applyState(this.connection, this.controllerId, patch).then(() => {
      const next = [...this._segments];
      for (const tid of targets) {
        const idx = next.findIndex((s) => s.id === tid);
        if (idx >= 0) next[idx] = { ...next[idx], [key]: value };
      }
      this._segments = next;
    });
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
        margin: 0 0 8px;
      }
      .seg-note {
        margin: 0 0 12px;
        font-size: 0.82rem;
        opacity: 0.85;
      }
      .seg-note p {
        margin: 8px 0 0;
        line-height: 1.4;
        opacity: 0.9;
      }
      .search {
        width: 100%;
        max-width: 360px;
        margin: 0 0 10px;
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
      .sliders {
        display: grid;
        gap: 8px;
        max-width: 320px;
        margin-top: 12px;
      }
      .sliders label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .meta {
        font-size: 0.75rem;
        opacity: 0.6;
        margin: 8px 0 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [VIEW_EFFECTS_TAG]: WledViewEffects;
  }
}
