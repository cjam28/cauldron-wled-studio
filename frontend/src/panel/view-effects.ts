import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { showToast } from "../utils/toast.js";
import {
  applyState,
  buildSegmentPatchForIds,
  fetchDeviceState,
  fetchEffectMeta,
  fetchPalettePreviews,
  type DeviceStateSnapshot,
  type EffectMeta,
  type WledSegment,
} from "../api/wled-state.js";
import { sceneCapture } from "../api/scenes.js";
import { toggleEditId } from "../utils/segment-edit.js";
import {
  addEffectLibraryEntry,
  getEffectDefaultSliders,
  loadEffectLibrary,
  saveEffectDefaultSliders,
  sliderValuesFromSegment,
  type EffectLibraryEntry,
} from "../utils/effect-presets-storage.js";
import {
  buildMergeForEffectsState,
  isMergeForEffectsActive,
  isWledLayoutMerged,
  mergedEffectTargetIds,
  saveSegmentLayoutSnapshot,
  setMergeForEffectsActive,
} from "../utils/effect-merge.js";
import "../components/effect-chips.js";
import "../components/effect-merge-toggle.js";
import "../components/palette-chips.js";
import "../components/segment-bar.js";
import "../components/segment-advanced.js";
import "../components/wled-skeleton.js";

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
  @property({ type: Boolean, reflect: true }) compact = false;

  @state() private _snapshot?: DeviceStateSnapshot;
  @state() private _segments: WledSegment[] = [];
  @state() private _editIds: number[] = [];
  @state() private _focusSegId = 0;
  @state() private _filter = "";
  @state() private _status = "Loading effects…";
  @state() private _meta?: EffectMeta;
  @state() private _mergeActive = false;
  @state() private _library: EffectLibraryEntry[] = [];
  @state() private _saveCopyOpen = false;
  @state() private _saveCopyName = "";
  @state() private _saveSceneOpen = false;
  @state() private _saveSceneName = "";
  /** True when localStorage flag says merge is on but WLED still has multi-segment layout. */
  @state() private _needsMergeApply = false;

  protected override onPoweredConnect(): void {
    this._mergeActive = isMergeForEffectsActive(this.controllerId);
    this._library = loadEffectLibrary(this.controllerId);
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

  private async _refreshPalettePreviews(): Promise<void> {
    if (!this.connection || !this.controllerId || !this._snapshot) return;
    try {
      const previews = await fetchPalettePreviews(this.connection, this.controllerId);
      this._snapshot = { ...this._snapshot, palette_previews: previews };
    } catch {
      /* keep cached previews */
    }
  }

  private _onPaletteCatalogChanged(): void {
    void this._refreshPalettePreviews();
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
      const pixelCount = this._pixelCount();
      this._mergeActive = isMergeForEffectsActive(this.controllerId);
      const wledMerged = isWledLayoutMerged(this._segments, pixelCount);
      this._needsMergeApply =
        this._mergeActive && this._segments.length > 1 && !wledMerged;
      if (this._mergeActive && wledMerged) {
        this._editIds = mergedEffectTargetIds(this._segments, true);
        this._focusSegId = this._editIds[0] ?? 0;
      }
      await this._refreshMeta();
      this._status = "";
      this._emitTargetsChanged();
    } catch {
      this._status = "Could not load device state.";
    }
  }

  get highlightSegmentIds(): number[] {
    return this._targetIds();
  }

  private _emitTargetsChanged(): void {
    this.dispatchEvent(
      new CustomEvent("segment-targets-changed", {
        detail: {
          segmentId: this._focusSegId,
          editIds: [...this._editIds],
          mergeActive: this._mergeActive,
          highlightIds: this.highlightSegmentIds,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /** User confirmed merge — actually rewrite device segments. */
  async confirmMergeApply(): Promise<void> {
    await this._applyMergeOnDevice(this._pixelCount());
    this._needsMergeApply = false;
    await this._load();
  }

  private async _applyMergeOnDevice(pixelCount: number): Promise<void> {
    if (!this.connection || !this.controllerId || !this._snapshot) return;
    saveSegmentLayoutSnapshot(this.controllerId, this._segments, pixelCount);
    const mergeState = buildMergeForEffectsState(
      this._segments,
      pixelCount,
      this._editIds.length ? this._editIds : undefined
    );
    await applyState(this.connection, this.controllerId, mergeState, {
      fullResponse: true,
    });
    setMergeForEffectsActive(this.controllerId, true);
    this._snapshot = await fetchDeviceState(this.connection, this.controllerId);
    this._segments = [...(this._snapshot.segments ?? [])].sort((a, b) => a.id - b.id);
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
    if (this._mergeActive) {
      this._focusSegId = 0;
      void this._refreshMeta();
      this._emitTargetsChanged();
      return;
    }
    if (!this._editIds.includes(id)) {
      this._editIds = [...this._editIds, id].sort((a, b) => a - b);
    }
    this._focusSegId = id;
    void this._refreshMeta();
    this._emitTargetsChanged();
  }

  private _onSegToggle(ev: CustomEvent<{ id: number }>): void {
    if (this._mergeActive) return;
    let next = toggleEditId(this._editIds, ev.detail.id);
    if (!next.length) next = [ev.detail.id];
    this._editIds = next;
    this._focusSegId = ev.detail.id;
    void this._refreshMeta();
    this._emitTargetsChanged();
  }

  private _pixelCount(): number {
    const leds = this._snapshot?.info?.leds as { count?: number } | undefined;
    return Number(leds?.count) || 210;
  }

  private _targetIds(): number[] {
    if (this._mergeActive) {
      const ids = mergedEffectTargetIds(this._segments, true);
      return ids.length ? ids : [0];
    }
    return this._editIds.length ? this._editIds : [this._focusSegId];
  }

  private _onMergeChanged(): void {
    this._mergeActive = isMergeForEffectsActive(this.controllerId);
    void this._load();
    this._emitTargetsChanged();
  }

  private _effectName(effectId: number): string {
    return (
      Object.entries(this._snapshot?.effects_by_name ?? {}).find(
        ([, id]) => id === effectId
      )?.[0] ?? `Effect ${effectId}`
    );
  }

  private _sliderValuesFromSeg(): ReturnType<typeof sliderValuesFromSegment> {
    const seg = this._activeSeg();
    return seg ? sliderValuesFromSegment(seg as unknown as Record<string, unknown>) : {};
  }

  private _saveAsDefault(): void {
    const seg = this._activeSeg();
    if (!seg || !this.controllerId) return;
    saveEffectDefaultSliders(
      this.controllerId,
      seg.fx ?? 0,
      this._sliderValuesFromSeg()
    );
    showToast(this, `Saved default options for ${this._effectName(seg.fx ?? 0)}`);
  }

  private _openSaveCopy(): void {
    const seg = this._activeSeg();
    if (!seg) return;
    this._saveCopyName = `${this._effectName(seg.fx ?? 0)} copy`;
    this._saveCopyOpen = true;
  }

  private _confirmSaveCopy(): void {
    const seg = this._activeSeg();
    if (!seg || !this.controllerId || !this._saveCopyName.trim()) return;
    addEffectLibraryEntry(this.controllerId, {
      name: this._saveCopyName.trim(),
      effectId: seg.fx ?? 0,
      effectName: this._effectName(seg.fx ?? 0),
      pinned: true,
      ...this._sliderValuesFromSeg(),
    });
    this._library = loadEffectLibrary(this.controllerId);
    this._saveCopyOpen = false;
    showToast(this, `Saved "${this._saveCopyName.trim()}" to library`);
  }

  private _openSaveScene(): void {
    const seg = this._activeSeg();
    if (!seg) return;
    this._saveSceneName = `${this._effectName(seg.fx ?? 0)} scene`;
    this._saveSceneOpen = true;
  }

  private async _confirmSaveScene(): Promise<void> {
    if (!this.connection || !this.controllerId || !this._saveSceneName.trim()) return;
    try {
      await sceneCapture(this.connection, this.controllerId, this._saveSceneName.trim());
      this._saveSceneOpen = false;
      showToast(this, `Scene "${this._saveSceneName.trim()}" saved`);
    } catch (err) {
      showToast(this, err instanceof Error ? err.message : String(err));
    }
  }

  private async _applyLibraryEntry(entry: EffectLibraryEntry): Promise<void> {
    if (!this.connection || !this._snapshot) return;
    const targets = this._targetIds();
    const sliderPatch: Partial<WledSegment> = { fx: entry.effectId, on: true };
    for (const key of ["sx", "ix", "c1", "c2", "c3", "o1", "o2", "o3"] as const) {
      const v = entry[key];
      if (typeof v === "number") {
        (sliderPatch as Record<string, number>)[key] = v;
      }
    }
    const patch = buildSegmentPatchForIds(targets, sliderPatch, this._segments);
    await applyState(this.connection, this.controllerId, patch);
    await this._load();
    showToast(this, `Applied ${entry.name}`);
  }

  private _isLoading(): boolean {
    return this._status === "Loading effects…";
  }

  private _renderSkeleton() {
    return html`
      <div class="skeleton-load" aria-busy="true" aria-label="Loading effects">
        <wled-skeleton height="2rem" width="min(100%, 360px)"></wled-skeleton>
        <div class="sk-grid">
          ${Array.from({ length: 6 }, () => html`<wled-skeleton height="72px"></wled-skeleton>`)}
        </div>
      </div>
    `;
  }

  protected override render() {
    const snap = this._snapshot;
    const seg = this._activeSeg();
    const fx = seg?.fx ?? 0;
    const meta = this._meta;
    const sliders = meta?.sliders ?? {};
    const targetCount = this._targetIds().length;

    const compact = this.compact;

    return html`
      <div class="wrap ${compact ? "compact" : ""}">
        ${compact
          ? null
          : html`
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
            `}
        ${this._isLoading()
          ? this._renderSkeleton()
          : this._status
            ? html`<p class="status">${this._status}</p>`
            : null}

        ${this._needsMergeApply
          ? html`
              <div class="merge-prompt">
                <p>
                  Merge for effects is on, but WLED currently has
                  ${this._segments.length} segments. Apply merge so chase-style
                  effects span the whole strip?
                </p>
                <div class="merge-prompt-row">
                  <button
                    type="button"
                    class="primary"
                    @click=${() => void this.confirmMergeApply()}
                  >
                    Apply merge
                  </button>
                  <button
                    type="button"
                    class="ghost"
                    @click=${() => {
                      setMergeForEffectsActive(this.controllerId, false);
                      this._mergeActive = false;
                      this._needsMergeApply = false;
                      this._emitTargetsChanged();
                    }}
                  >
                    Keep ${this._segments.length} segments
                  </button>
                </div>
              </div>
            `
          : null}

        ${this.connection && this.controllerId && snap && seg
          ? html`
              <wled-effect-merge-toggle
                ?compact=${compact}
                class=${compact ? "compact-merge" : ""}
                .connection=${this.connection}
                .controllerId=${this.controllerId}
                .segments=${this._segments}
                .editIds=${this._editIds}
                .pixelCount=${this._pixelCount()}
                @merge-changed=${this._onMergeChanged}
              ></wled-effect-merge-toggle>
            `
          : null}
        ${this._segments.length && !this._mergeActive
          ? html`
              <wled-segment-bar
                .segments=${this._segments}
                .selectedIds=${this._editIds}
                .segmentEntities=${snap?.segment_entities ?? []}
                hint=${compact
                  ? "Tap segments to target effects"
                  : "Apply effects to highlighted segments"}
                @segment-toggle=${this._onSegToggle}
              ></wled-segment-bar>
            `
          : null}

        ${snap && seg
          ? html`
              <div class="effects-workspace ${compact ? "compact" : ""}">
                <div class="effects-toolbar">
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
                </div>
                <div class="effects-scroll">
                  <wled-effect-chips
                    scroll-pane
                    .hass=${this.hass}
                    .controllerId=${this.controllerId}
                    .fwVer=${snap.fw_ver ?? (snap.info?.ver as string) ?? ""}
                    .thumbBasenames=${snap.thumb_basenames ?? []}
                    .effectsByName=${snap.effects_by_name ?? {}}
                    .soundFlags=${snap.sound_flags ?? []}
                    .selectedFx=${fx}
                    .filter=${this._filter}
                    .tileGrid=${compact}
                    .selectedPalette=${seg.pal ?? 0}
                    .paletteAware=${meta?.palette_enabled !== false}
                    @effect-select=${(
                      e: CustomEvent<{ effectId: number; toggledOff?: boolean }>
                    ) => this._onFx(e.detail.effectId, e.detail.toggledOff)}
                  ></wled-effect-chips>
                </div>

                <div class="effects-tuning">
                  ${meta?.palette_enabled !== false &&
                  Object.keys(snap.palettes_by_name ?? {}).length
                    ? html`
                        <wled-palette-chips
                          ?compact=${compact}
                          ?collapsible=${compact}
                          .palettesByName=${snap.palettes_by_name ?? {}}
                          .palettePreviews=${snap.palette_previews ?? {}}
                          .selectedPal=${seg.pal ?? 0}
                          .deviceHost=${snap.host ?? ""}
                          @palette-select=${(
                            e: CustomEvent<{ paletteId: number }>
                          ) => void this._segPatch({ pal: e.detail.paletteId })}
                          @palette-catalog-changed=${() => this._onPaletteCatalogChanged()}
                        ></wled-palette-chips>
                      `
                    : null}

                  <wled-segment-advanced
                    .segment=${seg}
                    .meta=${meta}
                    ?compact=${compact}
                    @segment-patch=${(ev: CustomEvent<Partial<WledSegment>>) =>
                      void this._segPatch(ev.detail)}
                  ></wled-segment-advanced>

                  <div class="sliders ${compact ? "compact" : ""}">
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

                  ${Object.keys(sliders).length
                    ? html`
                        <div class="save-row">
                          <button type="button" class="ghost" @click=${() => this._saveAsDefault()}>
                            Save as default
                          </button>
                          <button type="button" class="ghost" @click=${() => this._openSaveCopy()}>
                            Save copy…
                          </button>
                          <button type="button" class="ghost" @click=${() => this._openSaveScene()}>
                            Save as scene
                          </button>
                        </div>
                      `
                    : null}

                  ${this._saveCopyOpen
                    ? html`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Preset name"
                            .value=${this._saveCopyName}
                            @input=${(e: Event) => {
                              this._saveCopyName = (e.target as HTMLInputElement).value;
                            }}
                          />
                          <button type="button" class="primary" @click=${() => this._confirmSaveCopy()}>
                            Save
                          </button>
                          <button
                            type="button"
                            class="ghost"
                            @click=${() => {
                              this._saveCopyOpen = false;
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      `
                    : null}

                  ${this._saveSceneOpen
                    ? html`
                        <div class="inline-form">
                          <input
                            type="text"
                            placeholder="Scene name"
                            .value=${this._saveSceneName}
                            @input=${(e: Event) => {
                              this._saveSceneName = (e.target as HTMLInputElement).value;
                            }}
                          />
                          <button type="button" class="primary" @click=${() => void this._confirmSaveScene()}>
                            Save scene
                          </button>
                          <button
                            type="button"
                            class="ghost"
                            @click=${() => {
                              this._saveSceneOpen = false;
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      `
                    : null}

                  ${this._library.length
                    ? html`
                        <div class="library-block">
                          <span class="library-label">Library</span>
                          <div class="library-row">
                            ${this._library.slice(0, compact ? 6 : 12).map(
                              (entry) => html`
                                <button
                                  type="button"
                                  class="library-chip"
                                  @click=${() => void this._applyLibraryEntry(entry)}
                                >
                                  ${entry.name}
                                </button>
                              `
                            )}
                          </div>
                        </div>
                      `
                    : null}

                  <p class="meta">
                    ${targetCount} segment${targetCount === 1 ? "" : "s"} · effect
                    #${fx}
                    ${meta?.palette_enabled !== false && seg.pal !== undefined
                      ? html` · palette #${seg.pal}`
                      : null}
                  </p>
                </div>
              </div>
            `
          : null}
      </div>
    `;
  }

  private async _onFx(effectId: number, toggledOff?: boolean): Promise<void> {
    if (!this.connection || !this._snapshot) return;
    const targets = this._targetIds();
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
      const defaults = getEffectDefaultSliders(this.controllerId, effectId);
      if (defaults && Object.keys(defaults).length) {
        const patchDefaults = buildSegmentPatchForIds(
          targets,
          defaults as Partial<WledSegment>,
          this._segments
        );
        await applyState(this.connection, this.controllerId, patchDefaults);
      }
      showToast(
        this,
        toggledOff ? `Solid on ${targets.length} segment(s)` : `Applied ${name}`
      );
      this.dispatchEvent(
        new CustomEvent("wled-preview-refresh", { bubbles: true, composed: true })
      );
    } catch (err) {
      showToast(this, `Apply failed: ${(err as Error).message || "error"}`);
    }
  }

  private _slider(key: keyof WledSegment, ev: Event): void {
    const value = Number((ev.target as HTMLInputElement).value);
    void this._segPatch({ [key]: value } as Partial<WledSegment>);
  }

  /** Apply an arbitrary segment patch to the current target ids and update local cache. */
  private async _segPatch(patch: Partial<WledSegment>): Promise<void> {
    if (!this.connection || !this._snapshot) return;
    const targets = this._targetIds();
    const wledPatch = buildSegmentPatchForIds(targets, patch, this._segments);
    try {
      await applyState(this.connection, this.controllerId, wledPatch);
    } catch (err) {
      showToast(this, `Apply failed: ${(err as Error).message || "error"}`);
      return;
    }
    const next = [...this._segments];
    for (const tid of targets) {
      const idx = next.findIndex((s) => s.id === tid);
      if (idx >= 0) next[idx] = { ...next[idx], ...patch };
    }
    this._segments = next;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .wrap {
        max-width: 100%;
      }
      :host {
        display: block;
      }
      :host([compact]) {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
      }
      .wrap.compact {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .effects-workspace {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 0;
      }
      .effects-workspace.compact {
        flex: 1 1 auto;
        min-height: 0;
        height: 100%;
      }
      .effects-toolbar {
        flex: 0 0 auto;
      }
      .effects-scroll {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .effects-scroll wled-effect-chips {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .effects-tuning {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-top: 1px solid var(--divider-color);
        padding-top: 8px;
        max-height: min(42vh, 280px);
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .effects-workspace.compact .effects-tuning {
        max-height: min(46vh, 300px);
      }
      .wrap.compact .search {
        max-width: 100%;
      }
      .compact-merge {
        display: block;
      }
      :host(.compact-merge) .merge-row,
      .compact-merge .merge-row {
        padding: 8px 10px;
        margin-bottom: 8px;
      }
      .merge-prompt {
        margin: 0 0 12px;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--warning-color, orange);
        background: color-mix(in srgb, var(--warning-color) 12%, transparent);
        font-size: 0.85rem;
      }
      .merge-prompt p {
        margin: 0 0 8px;
      }
      .merge-prompt-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .merge-prompt .primary,
      .merge-prompt .ghost {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .merge-prompt .primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
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
      .status {
        font-size: 0.9rem;
        opacity: 0.85;
      }
      .skeleton-load {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .sk-grid {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      }
      .sliders {
        display: grid;
        gap: 8px;
        max-width: 320px;
        margin-top: 12px;
      }
      .sliders.compact {
        max-width: 100%;
      }
      .save-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 10px;
      }
      .save-row .ghost,
      .inline-form .ghost,
      .inline-form .primary {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: transparent;
        color: inherit;
        cursor: pointer;
      }
      .inline-form .primary {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .inline-form {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 8px;
        align-items: center;
      }
      .inline-form input {
        flex: 1 1 140px;
        min-width: 120px;
        padding: 6px 8px;
        border-radius: 8px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
      }
      .library-block {
        margin-top: 10px;
      }
      .library-label {
        display: block;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.65;
        margin-bottom: 6px;
      }
      .library-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .library-chip {
        font-size: 0.78rem;
        padding: 6px 10px;
        border-radius: 999px;
        border: 1px solid var(--divider-color);
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: inherit;
        cursor: pointer;
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
