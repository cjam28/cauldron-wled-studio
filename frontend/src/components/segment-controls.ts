import { css, html, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  applyState,
  createDebouncedApply,
  fetchDeviceState,
  fetchEffectMeta,
  fetchPresets,
  parseColSlot,
  type DeviceStateSnapshot,
  type EffectMeta,
  type WledSegment,
} from "../api/wled-state.js";
import "./color-wheel-rgbw.js";
import "./effect-chips.js";

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
  @property() controllerId = "";
  @property({ type: Boolean }) compact = false;

  @state() private _loading = true;
  @state() private _error = "";
  @state() private _segId = 0;
  @state() private _segments: WledSegment[] = [];
  @state() private _snapshot?: DeviceStateSnapshot;
  @state() private _meta?: EffectMeta;
  @state() private _effectFilter = "";
  @state() private _qlPresets: Array<{ id: string; name: string; ql?: string }> =
    [];

  private _debouncedApply?: ReturnType<typeof createDebouncedApply>;

  protected override onPoweredConnect(): void {
    void this._load();
  }

  protected override willUpdate(changed: PropertyValues): void {
    if (
      (changed.has("connection") || changed.has("controllerId")) &&
      this.connection &&
      this.controllerId
    ) {
      this._debouncedApply = createDebouncedApply(
        this.connection,
        this.controllerId
      );
      void this._load();
    }
  }

  protected override onPoweredDisconnect(): void {
    this._debouncedApply = undefined;
  }

  private async _load(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._loading = true;
    this._error = "";
    try {
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      this._snapshot = snap;
      this._segments = snap.segments ?? [];
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
      const ql: Array<{ id: string; name: string; ql?: string }> = [];
      for (const [id, raw] of Object.entries(presets)) {
        if (!raw || typeof raw !== "object") continue;
        const p = raw as Record<string, unknown>;
        const name = String(p.n ?? p.name ?? `Preset ${id}`);
        const quick = p.ql ? String(p.ql) : undefined;
        if (quick) ql.push({ id, name, ql: quick });
      }
      this._qlPresets = ql.slice(0, 12);
    } catch {
      this._qlPresets = [];
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

  private _patchSeg(patch: Partial<WledSegment>): void {
    const seg = this._activeSeg();
    if (!seg || !this._debouncedApply) return;
    const merged = { ...seg, ...patch, id: seg.id };
    const idx = this._segments.findIndex((s) => s.id === seg.id);
    if (idx >= 0) {
      const next = [...this._segments];
      next[idx] = merged;
      this._segments = next;
    }
    this._debouncedApply({ seg: [merged] });
  }

  private _selectSeg(id: number): void {
    this._segId = id;
    void this._refreshMeta();
  }

  private async _onEffectSelect(ev: CustomEvent<{ effectId: number }>): Promise<void> {
    this._patchSeg({ fx: ev.detail.effectId });
    await this._refreshMeta();
  }

  private _onColor(ev: CustomEvent<{ rgb: [number, number, number]; white: number }>): void {
    const { rgb, white } = ev.detail;
    this._patchSeg({ col: [[rgb[0], rgb[1], rgb[2], white]] });
  }

  private _onAwm(ev: CustomEvent<{ awm: number }>): void {
    this._patchSeg({ awm: ev.detail.awm });
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
    const col = parseColSlot(seg.col?.[0]);
    const meta = this._meta;
    const sliders = meta?.sliders ?? {};

    return html`
      <div class="controls ${this.compact ? "compact" : ""}">
        <div class="seg-bar" role="tablist" aria-label="Segments">
          ${this._segments.map(
            (s) => html`
              <button
                class="seg-tab ${s.id === this._segId ? "active" : ""}"
                role="tab"
                aria-selected=${s.id === this._segId}
                @click=${() => this._selectSeg(s.id)}
              >
                ${this._labelForSeg(s)}
              </button>
            `
          )}
        </div>

        ${this._qlPresets.length
          ? html`
              <div class="ql-row" aria-label="Quick load presets">
                ${this._qlPresets.map(
                  (p) => html`
                    <button
                      class="ql"
                      title=${p.name}
                      @click=${() => this._loadPreset(p.id)}
                    >
                      ${p.ql}
                    </button>
                  `
                )}
              </div>
            `
          : null}

        <wled-color-wheel-rgbw
          .rgb=${[col[0], col[1], col[2]] as [number, number, number]}
          .white=${col[3]}
          .awm=${seg.awm ?? 0}
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
    const ent = this._snapshot?.segment_entities?.find(
      (e) => e.segment_index === seg.id
    );
    if (ent?.name) return ent.name.replace(/^.*\s—\s/, "");
    return `Seg ${seg.id + 1}`;
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
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [SEGMENT_CONTROLS_TAG]: WledSegmentControls;
  }
}
