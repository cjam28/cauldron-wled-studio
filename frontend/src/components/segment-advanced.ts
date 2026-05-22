import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import type { EffectMeta, WledSegment } from "../api/wled-state.js";

export const SEGMENT_ADVANCED_TAG = "wled-segment-advanced";

const M12_LABELS = ["For each", "Bar", "Arc", "Corner"];
const BM_LABELS = ["Replace", "Add", "Subtract", "Multiply", "Lighten", "Darken"];
const SI_LABELS = ["Off", "GEQ pulse", "WaveSin", "Sweep"];

/**
 * Advanced per-segment options matrix:
 * grouping/spacing/offset, freeze, reverse, mirror, 1D-in-2D mode, blend mode,
 * effect option checkboxes (o1/o2/o3), and sound simulation (si).
 *
 * Patches are dispatched as a `segment-patch` CustomEvent with a `Partial<WledSegment>`
 * detail; the parent applies it via `buildSegmentPatchForIds`.
 */
@safeCustomElement(SEGMENT_ADVANCED_TAG)
export class WledSegmentAdvanced extends BasePoweredElement {
  @property({ attribute: false }) segment?: WledSegment;
  @property({ attribute: false }) meta?: EffectMeta;
  @property({ type: Boolean }) compact = false;

  private _emit(patch: Partial<WledSegment>): void {
    this.dispatchEvent(
      new CustomEvent("segment-patch", {
        detail: patch,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _num(key: keyof WledSegment, label: string, min: number, max: number) {
    const seg = this.segment;
    if (!seg) return null;
    const val = (seg[key] as number | undefined) ?? min;
    return html`
      <label class="cell">
        <span class="cell-label">${label}<span class="cell-val">${val}</span></span>
        <ha-slider
          min=${min}
          max=${max}
          step="1"
          .value=${val}
          @change=${(ev: Event) => {
            const v = Number((ev.target as HTMLInputElement).value);
            this._emit({ [key]: v } as Partial<WledSegment>);
          }}
        ></ha-slider>
      </label>
    `;
  }

  private _bool(key: keyof WledSegment, label: string) {
    const seg = this.segment;
    if (!seg) return null;
    const checked = Boolean(seg[key]);
    return html`
      <label class="check">
        <input
          type="checkbox"
          .checked=${checked}
          @change=${(ev: Event) =>
            this._emit({
              [key]: (ev.target as HTMLInputElement).checked,
            } as Partial<WledSegment>)}
        />
        <span>${label}</span>
      </label>
    `;
  }

  private _select(
    key: keyof WledSegment,
    label: string,
    options: readonly string[]
  ) {
    const seg = this.segment;
    if (!seg) return null;
    const val = (seg[key] as number | undefined) ?? 0;
    return html`
      <label class="cell">
        <span class="cell-label">${label}</span>
        <select
          .value=${String(val)}
          @change=${(ev: Event) => {
            const v = Number((ev.target as HTMLSelectElement).value);
            this._emit({ [key]: v } as Partial<WledSegment>);
          }}
        >
          ${options.map(
            (opt, i) => html`<option value=${i} ?selected=${i === val}>${opt}</option>`
          )}
        </select>
      </label>
    `;
  }

  protected override render() {
    const seg = this.segment;
    if (!seg) return null;
    const meta = this.meta;
    const optionDefs: Array<{ key: "o1" | "o2" | "o3"; label: string }> = [];
    for (const key of ["o1", "o2", "o3"] as const) {
      if (meta?.sliders?.[key]) {
        const lbl =
          typeof meta.defaults?.[key] === "string" && meta.defaults[key].trim()
            ? meta.defaults[key]
            : key.toUpperCase();
        optionDefs.push({ key, label: lbl });
      }
    }
    return html`
      <details class="adv" ?open=${!this.compact}>
        <summary>Advanced segment options</summary>
        <div class="grid">
          ${this._num("grp", "Grouping", 1, 255)}
          ${this._num("spc", "Spacing", 0, 255)}
          ${this._num("of", "Offset", 0, 255)}
        </div>
        <div class="flags">
          ${this._bool("rev", "Reverse")}
          ${this._bool("mi", "Mirror")}
          ${this._bool("frz", "Freeze effect")}
          ${this._bool("sel", "Selected")}
        </div>
        ${optionDefs.length
          ? html`
              <div class="flags">
                ${optionDefs.map((o) => this._bool(o.key, o.label))}
              </div>
            `
          : null}
        <div class="grid">
          ${this._select("si", "Sound simulation", SI_LABELS)}
          ${this._select("m12", "1D-in-2D mode", M12_LABELS)}
          ${this._select("bm", "Blend mode", BM_LABELS)}
        </div>
      </details>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .adv {
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 8px 12px;
        background: color-mix(in srgb, var(--secondary-background-color) 40%, transparent);
      }
      summary {
        cursor: pointer;
        font-size: 0.82rem;
        font-weight: 600;
        padding: 4px 0;
        outline: none;
      }
      summary:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 8px 14px;
        margin-top: 8px;
      }
      .flags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        margin-top: 10px;
      }
      .cell {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 0.78rem;
      }
      .cell-label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      .cell-val {
        font-variant-numeric: tabular-nums;
        opacity: 0.75;
      }
      .check {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
      }
      select {
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: inherit;
        font-size: 0.8rem;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [SEGMENT_ADVANCED_TAG]: WledSegmentAdvanced;
  }
}
