import { css, html, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { showToast } from "../utils/toast.js";
import {
  applyRgbwm,
  applyState,
  buildSegmentPatchForIds,
  buildSegmentSelPatch,
  entityForWledSegment,
  fetchDeviceState,
  fetchEffectMeta,
  fetchPresets,
  parseColSlot,
  type DeviceStateSnapshot,
  type EffectMeta,
  type WledSegment,
} from "../api/wled-state.js";
import { labelForSegment, toggleEditId } from "../utils/segment-edit.js";
import { formatHaError } from "../utils/ha-error.js";
import { solidEffectId } from "../utils/effect-categories.js";
import {
  isMergeForEffectsActive,
  setMergeForEffectsActive,
} from "../utils/effect-merge.js";
import { mergedEffectTargetIds } from "../utils/effect-merge.js";
import { createOptimisticApply } from "../api/state-writer.js";
import type { OptimisticApplyHandle } from "../api/state-writer.js";
import "./color-wheel-rgbw.js";
import "./effect-chips.js";
import "./effect-merge-toggle.js";
import "./preset-bar.js";
import "./wled-skeleton.js";
import type { PresetEntry } from "./preset-bar.js";
import { readBrightness255, readEntityColor } from "../utils/ha-brightness.js";

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
  /** Apply color/effects to every segment (Govee “Whole” mode). */
  @property({ type: Boolean }) wholeMode = false;
  /** Hide per-segment brightness slider (card Color tab uses global brightness). */
  @property({ type: Boolean, attribute: "hide-segment-brightness" })
  hideSegmentBrightness = false;
  @property({ type: Number }) selectedSegId = -1;
  /** Master HA light entity — when its brightness changes, segment sliders follow. */
  @property() masterEntity = "";

  @state() private _loading = true;
  @state() private _error = "";
  @state() private _segId = 0;
  @state() private _editIds: number[] = [];
  @state() private _segments: WledSegment[] = [];
  @state() private _snapshot?: DeviceStateSnapshot;
  @state() private _meta?: EffectMeta;
  @state() private _effectFilter = "";
  @state() private _presets: PresetEntry[] = [];
  @state() private _colorSlot = 0;
  @state() private _mergeActive = false;

  private _optimistic?: OptimisticApplyHandle;
  private _lastMasterBri255: number | null = null;
  private _lastHaColorKey = "";
  private _dragSegId: number | null = null;

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has("hass") && this.hass) {
      if (this.masterEntity) {
        this._syncFromMasterEntity();
      }
      this._syncColorFromHaEntity();
    }
    if (changed.has("masterEntity") && this.masterEntity && this.hass) {
      this._syncFromMasterEntity();
    }
    if (
      (changed.has("_segId") || changed.has("_colorSlot")) &&
      this.hass
    ) {
      this._syncColorFromHaEntity();
    }
  }

  /** Keep every segment brightness slider aligned with global/master brightness. */
  applyGlobalBrightness(bri255: number): void {
    const bri = Math.max(0, Math.min(255, Math.round(bri255)));
    this._lastMasterBri255 = bri;
    if (!this._segments.length) return;
    this._segments = this._segments.map((s) => ({ ...s, bri }));
    this.requestUpdate();
  }

  private _syncFromMasterEntity(): void {
    if (!this.hass || !this.masterEntity) return;
    const st = this.hass.states[this.masterEntity];
    const bri = readBrightness255(st);
    if (this._lastMasterBri255 === bri) return;
    this.applyGlobalBrightness(bri);
  }

  /** Push HA entity rgb into the active segment color (feeds color wheel). */
  private _syncColorFromHaEntity(): void {
    if (!this.hass) return;
    const entityId = this._colorEntityId();
    if (!entityId) return;
    const parsed = readEntityColor(this.hass.states[entityId]);
    if (!parsed) return;
    const key = `${entityId}:${parsed[0]},${parsed[1]},${parsed[2]},${parsed[3]}`;
    if (key === this._lastHaColorKey) return;

    const seg = this._activeSeg();
    if (!seg) return;
    const cols = this._cols(seg);
    const cur = cols[this._colorSlot] ?? cols[0];
    if (
      cur[0] === parsed[0] &&
      cur[1] === parsed[1] &&
      cur[2] === parsed[2] &&
      cur[3] === parsed[3]
    ) {
      this._lastHaColorKey = key;
      return;
    }

    this._lastHaColorKey = key;
    cols[this._colorSlot] = parsed;
    const idx = this._segments.findIndex((s) => s.id === seg.id);
    if (idx < 0) return;
    const next = [...this._segments];
    next[idx] = {
      ...next[idx],
      col: cols.map((c) => [c[0], c[1], c[2], c[3]]),
    };
    this._segments = next;
    this.requestUpdate();
  }

  private _colorEntityId(): string {
    if (this.wholeMode && this.masterEntity) return this.masterEntity;
    const seg = this._activeSeg();
    if (!seg) return "";
    return (
      entityForWledSegment(seg.id, this._snapshot?.segment_entities ?? []) ?? ""
    );
  }

  protected override onPoweredConnect(): void {
    this._mergeActive = isMergeForEffectsActive(this.controllerId);
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

  /** Called from parent when strip preview selects a segment (focus + ensure editing). */
  selectSegment(id: number): void {
    if (this._mergeActive) {
      this._segId = 0;
      void this._refreshMeta();
      return;
    }
    if (!this._editIds.includes(id)) {
      this._editIds = [...this._editIds, id].sort((a, b) => a - b);
    }
    this._segId = id;
    this._colorSlot = 0;
    void this._refreshMeta();
    void this._syncSelToDevice();
    this.dispatchEvent(
      new CustomEvent("segment-change", {
        detail: { segmentId: id, editIds: [...this._editIds] },
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
        const validEdit = this._editIds.filter((id) => ids.includes(id));
        this._editIds = validEdit.length ? validEdit : [this._segId];
      }
      await this._refreshMeta();
      await this._loadPresets();
      this._mergeActive = isMergeForEffectsActive(this.controllerId);
      const pixelCount = this._pixelCount();
      const seg0 = this._segments.find((s) => s.id === 0);
      const span0 = (seg0?.stop ?? 0) - (seg0?.start ?? 0);
      if (
        this._mergeActive &&
        this._segments.length > 1 &&
        pixelCount > 0 &&
        span0 < pixelCount * 0.9
      ) {
        setMergeForEffectsActive(this.controllerId, false);
        this._mergeActive = false;
        showToast(
          this,
          "Merge for effects was turned off — WLED is using a multi-segment layout."
        );
      }
      if (this._mergeActive) {
        this._editIds = mergedEffectTargetIds(this._segments, true);
        this._segId = this._editIds[0] ?? 0;
      }
      if (this.wholeMode && this._segments.length) {
        this._editIds = this._segments.map((s) => s.id);
        this._segId = this._segments[0].id;
      }
    } catch (err) {
      this._error = formatHaError(err);
    } finally {
      this._loading = false;
      if (this._lastMasterBri255 !== null) {
        this.applyGlobalBrightness(this._lastMasterBri255);
      }
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
      showToast(this, message);
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

  private _pixelCount(): number {
    const leds = this._snapshot?.info?.leds as { count?: number } | undefined;
    return Number(leds?.count) || 210;
  }

  private _targetIds(): number[] {
    if (this.wholeMode && this._segments.length) {
      return this._segments.map((s) => s.id);
    }
    if (this._mergeActive) {
      const ids = mergedEffectTargetIds(this._segments, true);
      return ids.length ? ids : [0];
    }
    return this._editIds.length ? this._editIds : [this._segId];
  }

  private _onMergeChanged(): void {
    this._mergeActive = isMergeForEffectsActive(this.controllerId);
    void this._load();
    this.dispatchEvent(
      new CustomEvent("wled-preview-refresh", { bubbles: true, composed: true })
    );
  }

  private _patchSeg(patch: Partial<WledSegment>): void {
    const targets = this._targetIds();
    if (!targets.length || !this._optimistic) return;
    const next = [...this._segments];
    for (const tid of targets) {
      const idx = next.findIndex((s) => s.id === tid);
      if (idx < 0) continue;
      const seg = next[idx];
      next[idx] = {
        ...seg,
        ...patch,
        id: tid,
        sel: true,
        on: patch.on !== undefined ? patch.on : seg.on !== false,
      };
      void this._syncHaSegment(seg, patch);
    }
    this._segments = next;
    const focus = this._activeSeg();
    this._optimistic.push(
      buildSegmentPatchForIds(targets, patch, this._segments),
      focus ?? ({ id: targets[0] } as WledSegment)
    );
  }

  private async _syncSelToDevice(): Promise<void> {
    if (!this.connection || !this.controllerId || !this._segments.length) return;
    const ids = this._targetIds();
    await applyState(
      this.connection,
      this.controllerId,
      buildSegmentSelPatch(ids, this._segments)
    );
    this._segments = this._segments.map((s) => ({
      ...s,
      sel: ids.includes(s.id),
    }));
  }

  private _toggleSegEdit(id: number): void {
    if (this._mergeActive) return;
    let next = toggleEditId(this._editIds, id);
    if (!next.length) {
      next = [id];
    }
    this._editIds = next;
    this._segId = id;
    this._colorSlot = 0;
    void this._refreshMeta();
    void this._syncSelToDevice();
    this.dispatchEvent(
      new CustomEvent("segment-change", {
        detail: { segmentId: id, editIds: [...this._editIds] },
        bubbles: true,
        composed: true,
      })
    );
  }

  /** Visual-only reorder stub — WLED segment order API not wired yet. */
  private _reorderSegmentsVisual(fromId: number, toId: number): void {
    const fromIdx = this._segments.findIndex((s) => s.id === fromId);
    const toIdx = this._segments.findIndex((s) => s.id === toId);
    if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return;
    const next = [...this._segments];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    this._segments = next;
  }

  private _onSegDragStart(id: number, ev: DragEvent): void {
    this._dragSegId = id;
    ev.dataTransfer?.setData("text/plain", String(id));
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = "move";
    }
  }

  private _onSegDragOver(id: number, ev: DragEvent): void {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = "move";
    }
    void id;
  }

  private _onSegDrop(targetId: number, ev: DragEvent): void {
    ev.preventDefault();
    const fromId = this._dragSegId;
    this._dragSegId = null;
    if (fromId === null || fromId === targetId) return;
    this._reorderSegmentsVisual(fromId, targetId);
  }

  private _onSegDragEnd(): void {
    this._dragSegId = null;
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
    this._lastHaColorKey = `${this._colorEntityId()}:${rgb[0]},${rgb[1]},${rgb[2]},${white}`;
    const cols = this._cols(seg);
    cols[this._colorSlot] = [rgb[0], rgb[1], rgb[2], white];
    const solidId = solidEffectId(this._snapshot?.effects_by_name ?? {});
    this._patchSeg({
      col: cols.map((c) => [c[0], c[1], c[2], c[3]]),
      fx: solidId,
    });
    void this._refreshMeta();
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
      this.requestUpdate();
    } catch (err) {
      showToast(this, err instanceof Error ? err.message : String(err));
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

  private _renderSkeleton() {
    return html`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading segments">
        <wled-skeleton height="2rem" width="100%"></wled-skeleton>
        <wled-skeleton height="220px" width="min(100%, 280px)"></wled-skeleton>
        <wled-skeleton height="1rem" width="70%"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({ length: 4 }, () => html`<wled-skeleton height="56px"></wled-skeleton>`)}
        </div>
      </div>
    `;
  }

  protected override render() {
    if (this._loading) {
      return this._renderSkeleton();
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
        ${this.wholeMode
          ? html`<p class="seg-hint whole">Whole strip — color and effects apply to all segments.</p>`
          : null}
        ${!this.wholeMode && this.connection && this.controllerId
          ? html`
              <wled-effect-merge-toggle
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `
          : null}
        ${this.wholeMode
          ? null
          : this._mergeActive
            ? html`<p class="seg-hint">Merge active — effects apply to the combined segment.</p>`
            : html`<p class="seg-hint">Tap segments to toggle editing — changes apply to all highlighted segments.</p>`}
        ${this.wholeMode || this._mergeActive
          ? null
          : html`
        <div class="seg-bar" role="group" aria-label="Segments">
          ${this._segments.map(
            (s) => html`
              <button
                class="seg-tab ${this._editIds.includes(s.id) ? "editing" : ""} ${s.id === this._segId ? "focus" : ""} ${this._dragSegId === s.id ? "dragging" : ""}"
                aria-pressed=${this._editIds.includes(s.id)}
                @click=${() => this._toggleSegEdit(s.id)}
                @dragover=${(ev: DragEvent) => this._onSegDragOver(s.id, ev)}
                @drop=${(ev: DragEvent) => this._onSegDrop(s.id, ev)}
              >
                <span
                  class="seg-drag-handle"
                  draggable="true"
                  aria-hidden="true"
                  title="Drag to reorder (preview only)"
                  @dragstart=${(ev: DragEvent) => this._onSegDragStart(s.id, ev)}
                  @dragend=${() => this._onSegDragEnd()}
                  @click=${(ev: Event) => ev.stopPropagation()}
                  @mousedown=${(ev: Event) => ev.stopPropagation()}
                >
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </span>
                <span class="seg-label">${labelForSegment(s, this._snapshot?.segment_entities ?? [])}</span>
              </button>
            `
          )}
        </div>
            `}

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

        ${this.hideSegmentBrightness
          ? null
          : html`
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
            `}

        <wled-color-wheel-rgbw
          .controllerId=${this.controllerId}
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

        ${!(this.wholeMode && this.compact && this.hideSegmentBrightness)
          ? html`
              <wled-effect-chips
                .hass=${this.hass}
                .controllerId=${this.controllerId}
                .fwVer=${this._snapshot?.fw_ver ?? (this._snapshot?.info?.ver as string) ?? ""}
                .thumbBasenames=${this._snapshot?.thumb_basenames ?? []}
                .effectsByName=${this._snapshot?.effects_by_name ?? {}}
                .soundFlags=${this._snapshot?.sound_flags ?? []}
                .selectedFx=${seg.fx ?? 0}
                .filter=${this.compact ? "" : this._effectFilter}
                @effect-select=${this._onEffectSelect}
              ></wled-effect-chips>
            `
          : null}

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
        display: inline-flex;
        align-items: center;
        gap: 2px;
        border: 1px solid var(--divider-color, #555);
        border-radius: 8px;
        padding: 6px 10px;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .seg-drag-handle {
        display: inline-flex;
        align-items: center;
        cursor: grab;
        opacity: 0.55;
        touch-action: none;
        line-height: 0;
        padding: 0 2px 0 0;
      }
      .seg-drag-handle:active {
        cursor: grabbing;
      }
      .seg-drag-handle ha-icon {
        --mdc-icon-size: 16px;
      }
      .seg-tab.dragging {
        opacity: 0.65;
      }
      .seg-label {
        white-space: nowrap;
      }
      .seg-hint {
        margin: 0;
        font-size: 0.75rem;
        opacity: 0.72;
      }
      .seg-tab.editing,
      .seg-tab.focus {
        background: transparent;
        border-color: var(--primary-color);
        outline: 2px solid var(--primary-color);
        outline-offset: 1px;
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
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sk-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
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
