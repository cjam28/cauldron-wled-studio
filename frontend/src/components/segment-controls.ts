import { css, html, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  applyRgbwm,
  applyState,
  buildSegmentPatch,
  entityForWledSegment,
  fetchDeviceState,
  fetchEffectMeta,
  fetchPresets,
  parseColSlot,
  type DeviceStateSnapshot,
  type EffectMeta,
  type WledSegment,
} from "../api/wled-state.js";
import { createOptimisticApply } from "../api/state-writer.js";
import type { OptimisticApplyHandle } from "../api/state-writer.js";
import "./color-wheel-rgbw.js";
import "./effect-chips.js";
import "./preset-bar.js";
import type { PresetEntry } from "./preset-bar.js";

export const SEGMENT_CONTROLS_TAG = "wled-segment-controls";

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

@safeCustomElement(SEGMENT_CONTROLS_TAG)
export class WledSegmentControls extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property({ attribute: false }) override hass?: HomeAssistant;
  @property() controllerId = "";
  @property({ type: Boolean }) compact = false;
  @property({ type: Number }) selectedSegId = -1;

  @state() private _loading = true;
  @state() private _error = "";
  @state() private _segId = 0;
  @state() private _segments: WledSegment[] = [];
  @state() private _snapshot?: DeviceStateSnapshot;
  @state() private _meta?: EffectMeta;
  @state() private _effectFilter = "";
  @state() private _presets: PresetEntry[] = [];
  @state() private _colorSlot = 0;
  @state() private _toast = "";

  private _optimistic?: OptimisticApplyHandle;

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(changed: PropertyValues): void {
    if (changed.has("selectedSegId") && this.selectedSegId >= 0) {
      this._segId = this.selectedSegId;
      void this._refreshMeta();
    }
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      this._optimistic?.cancel();
      this._optimistic = createOptimisticApply(
        this.connection,
        this.controllerId,
        (seg, message) => this._reconcile(seg, message)
      );
      void this._load();
    }
  }

  protected override onPoweredDisconnect(): void {
    this._optimistic?.cancel();
    this._optimistic = undefined;
  }

  /** Called from parent when strip preview selects a segment. */
  selectSegment(id: number): void {
    this._selectSeg(id);
    this.dispatchEvent(
      new CustomEvent("segment-change", {
        detail: { segmentId: id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._loading = true;
    this._error = "";
    try {
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      this._snapshot = snap;
      this._segments = [...(snap.segments ?? [])].sort((a, b) => a.id - b.id);
      if (this._segments.length) {
        const ids = this._segments.map((s) => s.id);
        if (!ids.includes(this._segId)) {
          this._segId = this._segments[0].id;
        }
      }
      await this._refreshMeta();
      await this._loadPresets();
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    } finally {
      this._loading = false;
    }
  }

  private async _loadPresets(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    try {
      const presets = await fetchPresets(this.connection, this.controllerId);
      const list: PresetEntry[] = [];
      for (const [id, raw] of Object.entries(presets)) {
        if (!raw || typeof raw !== "object") continue;
        const p = raw as Record<string, unknown>;
        list.push({
          id,
          name: String(p.n ?? p.name ?? `Preset ${id}`),
          ql: p.ql ? String(p.ql) : undefined,
        });
      }
      list.sort((a, b) => Number(a.id) - Number(b.id));
      this._presets = list;
    } catch {
      this._presets = [];
    }
  }

  private _reconcile(seg: WledSegment, message?: string): void {
    const idx = this._segments.findIndex((s) => s.id === seg.id);
    if (idx >= 0) {
      const next = [...this._segments];
      next[idx] = { ...next[idx], ...seg, id: seg.id };
      this._segments = next;
    }
    if (message) {
      this._toast = message;
      this.requestUpdate();
      window.setTimeout(() => {
        this._toast = "";
        this.requestUpdate();
      }, 4000);
    } else {
      this.requestUpdate();
    }
  }

  private _activeSeg(): WledSegment | undefined {
    return this._segments.find((s) => s.id === this._segId) ?? this._segments[0];
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

  private async _syncHaSegment(
    seg: WledSegment,
    patch: Partial<WledSegment>
  ): Promise<void> {
    if (!this.hass) return;
    const entityId = entityForWledSegment(
      seg.id,
      this._snapshot?.segment_entities ?? []
    );
    if (!entityId) return;

    const data: Record<string, unknown> = { entity_id: entityId };

    if (patch.col?.length) {
      const slot = parseColSlot(patch.col[0] as number[]);
      if (slot[3] > 0) {
        data.rgbw_color = [slot[0], slot[1], slot[2], slot[3]];
      } else {
        data.rgb_color = [slot[0], slot[1], slot[2]];
      }
    }
    if (patch.bri !== undefined) {
      data.brightness = patch.bri;
    }
    if (patch.fx !== undefined && this._snapshot?.effects_by_name) {
      const name = Object.entries(this._snapshot.effects_by_name).find(
        ([, id]) => id === patch.fx
      )?.[0];
      if (name) data.effect = name;
    }
    if (patch.on === false) {
      await this.hass.callService("light", "turn_off", { entity_id: entityId });
      return;
    }
    if (Object.keys(data).length > 1) {
      await this.hass.callService("light", "turn_on", data);
    }
  }

  private _patchSeg(patch: Partial<WledSegment>): void {
    const seg = this._activeSeg();
    if (!seg || !this._optimistic) return;
    const merged: WledSegment = {
      ...seg,
      ...patch,
      id: seg.id,
      sel: true,
      on: patch.on !== undefined ? patch.on : seg.on !== false,
    };
    const idx = this._segments.findIndex((s) => s.id === seg.id);
    if (idx >= 0) {
      const next = [...this._segments];
      next[idx] = merged;
      this._segments = next;
    }
    void this._syncHaSegment(seg, patch);
    this._optimistic.push(
      buildSegmentPatch(seg.id, patch, this._segments),
      merged
    );
  }

  private _selectSeg(id: number): void {
    this._segId = id;
    this._colorSlot = 0;
    void this._refreshMeta();
    if (this.connection && this.controllerId) {
      void applyState(
        this.connection,
        this.controllerId,
        buildSegmentPatch(id, { sel: true }, this._segments)
      );
    }
    const idx = this._segments.findIndex((s) => s.id === id);
    if (idx >= 0) {
      const next = this._segments.map((s) => ({
        ...s,
        sel: s.id === id,
      }));
      this._segments = next;
    }
  }

  private async _onEffectSelect(ev: CustomEvent<{ effectId: number }>): Promise<void> {
    this._patchSeg({ fx: ev.detail.effectId });
    await this._refreshMeta();
  }

  private _cols(seg: WledSegment): [number, number, number, number][] {
    const raw = seg.col ?? [];
    const out: [number, number, number, number][] = [];
    for (let i = 0; i < 3; i++) {
      out.push(parseColSlot(raw[i] as number[] | undefined));
    }
    return out;
  }

  private _onColor(ev: CustomEvent<{ rgb: [number, number, number]; white: number }>): void {
    const seg = this._activeSeg();
    if (!seg) return;
    const { rgb, white } = ev.detail;
    const cols = this._cols(seg);
    cols[this._colorSlot] = [rgb[0], rgb[1], rgb[2], white];
    this._patchSeg({
      col: cols.map((c) => [c[0], c[1], c[2], c[3]]),
    });
  }

  private async _onAwm(ev: CustomEvent<{ awm: number }>): Promise<void> {
    const rgbwm = ev.detail.awm;
    if (!this.connection || !this.controllerId) return;
    try {
      const persisted = await applyRgbwm(
        this.connection,
        this.controllerId,
        rgbwm
      );
      if (this._snapshot) {
        this._snapshot = { ...this._snapshot, rgbwm: persisted };
      }
      this._patchSeg({ awm: rgbwm });
    } catch (err) {
      this._toast = err instanceof Error ? err.message : String(err);
      this.requestUpdate();
    }
  }

  private _slider(key: keyof WledSegment, ev: Event): void {
    const value = Number((ev.target as HTMLInputElement).value);
    this._patchSeg({ [key]: value } as Partial<WledSegment>);
  }

  private async _loadPreset(id: string): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    await applyState(this.connection, this.controllerId, { ps: Number(id) });
    await this._load();
  }

  protected override render() {
    if (this._loading) {
      return html`<p class="muted">Loading segments…</p>`;
    }
    if (this._error) {
      return html`<p class="err">${this._error}</p>`;
    }
    const seg = this._activeSeg();
    if (!seg) {
      return html`<p class="muted">No segments on this controller.</p>`;
    }
    const cols = this._cols(seg);
    const col = cols[this._colorSlot] ?? cols[0];
    const meta = this._meta;
    const sliders = meta?.sliders ?? {};
    const colorSlots = meta?.colors_enabled !== false ? 3 : 1;
    const slotLabels = ["Primary", "Secondary", "Tertiary"];
    const busRgbwm = this._snapshot?.rgbwm ?? 0;

    return html`
      <div class="controls ${this.compact ? "compact" : ""}">
        ${this._toast
          ? html`<p class="toast" role="status">${this._toast}</p>`
          : null}
        <div class="seg-bar" role="tablist" aria-label="Segments">
          ${this._segments.map(
            (s) => html`
              <button
                class="seg-tab ${s.id === this._segId ? "active" : ""}"
                role="tab"
                aria-selected=${s.id === this._segId}
                @click=${() => this.selectSegment(s.id)}
              >
                ${this._labelForSeg(s)}
              </button>
            `
          )}
        </div>

        ${!this.compact && this._presets.length
          ? html`
              <wled-preset-bar
                .presets=${this._presets}
                @preset-select=${(ev: CustomEvent<{ presetId: string }>) =>
                  this._loadPreset(ev.detail.presetId)}
              ></wled-preset-bar>
            `
          : null}

        ${colorSlots > 1
          ? html`
              <div class="color-slots" role="tablist" aria-label="Color slots">
                ${slotLabels.slice(0, colorSlots).map(
                  (label, i) => html`
                    <button
                      class="slot ${this._colorSlot === i ? "active" : ""}"
                      role="tab"
                      @click=${() => {
                        this._colorSlot = i;
                      }}
                    >
                      ${label}
                    </button>
                  `
                )}
              </div>
            `
          : null}

        <label class="bri-label">
          Segment brightness
          <ha-slider
            min="0"
            max="255"
            step="1"
            .value=${seg.bri ?? 255}
            @change=${(ev: Event) => this._slider("bri", ev)}
          ></ha-slider>
        </label>

        <wled-color-wheel-rgbw
          .rgb=${[col[0], col[1], col[2]] as [number, number, number]}
          .white=${col[3]}
          .awm=${busRgbwm}
          .showWhite=${(this._snapshot?.led_order ?? 0) > 0}
          @color-change=${this._onColor}
          @awm-change=${this._onAwm}
        ></wled-color-wheel-rgbw>

        ${!this.compact
          ? html`
              <input
                class="fx-search"
                type="search"
                placeholder="Search effects…"
                .value=${this._effectFilter}
                @input=${(ev: Event) => {
                  this._effectFilter = (ev.target as HTMLInputElement).value;
                }}
              />
            `
          : null}

        <wled-effect-chips
          .controllerId=${this.controllerId}
          .effectsByName=${this._snapshot?.effects_by_name ?? {}}
          .soundFlags=${this._snapshot?.sound_flags ?? []}
          .selectedFx=${seg.fx ?? 0}
          .filter=${this.compact ? "" : this._effectFilter}
          @effect-select=${this._onEffectSelect}
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
                  @change=${(ev: Event) => this._slider(key as keyof WledSegment, ev)}
                ></ha-slider>
              </label>
            `;
          })}
        </div>
      </div>
    `;
  }

  private _labelForSeg(seg: WledSegment): string {
    const entities = this._snapshot?.segment_entities ?? [];
    const ent =
      entities.find((e) => entityForWledSegment(seg.id, [e]) === e.entity_id) ??
      entities.find((e) => e.segment_index === seg.id);
    const name = ent?.name?.replace(/^.*\s—\s/, "") ?? `Seg ${seg.id + 1}`;
    const start = seg.start ?? "?";
    const stop = seg.stop ?? "?";
    return `${name} (${start}–${stop})`;
  }

  get segments(): WledSegment[] {
    return this._segments;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .controls {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .seg-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .seg-tab {
        border: 1px solid var(--divider-color, #555);
        border-radius: 8px;
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .seg-tab.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .ql-row {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .ql {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: var(--secondary-background-color, #333);
        cursor: pointer;
        font-size: 1rem;
      }
      .fx-search {
        width: 100%;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #555);
        background: transparent;
        color: inherit;
      }
      .sliders {
        display: grid;
        gap: 8px;
      }
      .sliders label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .muted {
        opacity: 0.7;
        font-size: 0.85rem;
      }
      .err {
        color: var(--error-color, #f44);
        font-size: 0.85rem;
      }
      .compact .sliders {
        display: none;
      }
      .color-slots {
        display: flex;
        gap: 6px;
      }
      .slot {
        flex: 1;
        padding: 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #555);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.75rem;
      }
      .slot.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .toast {
        font-size: 0.8rem;
        color: var(--warning-color, orange);
        margin: 0;
      }
      .bri-label {
        font-size: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [SEGMENT_CONTROLS_TAG]: WledSegmentControls;
  }
}
