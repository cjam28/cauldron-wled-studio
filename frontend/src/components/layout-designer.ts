import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import Konva from "konva";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { kitchenIslandLayout } from "../data/kitchen-island-layout.js";

export interface FixtureAnchor {
  led: number;
  vertex_index: number;
}

export interface FixturePoint {
  x: number;
  y: number;
}

export interface LayoutFixture {
  id: string;
  name: string;
  kind: "polyline" | "polygon";
  closed: boolean;
  points: [number, number][];
  anchors: FixtureAnchor[];
}

export interface LayoutChangeDetail {
  points: [number, number][];
  anchors: FixtureAnchor[];
}

export const LAYOUT_DESIGNER_TAG = "wled-layout-designer";

@safeCustomElement(LAYOUT_DESIGNER_TAG)
export class WledLayoutDesigner extends BasePoweredElement {
  @property() fixtureId = "kitchen-island";
  @property() fixtureName = "Kitchen island";

  @state() private _points: [number, number][] = [];
  @state() private _anchors: FixtureAnchor[] = [];
  @state() private _closed = true;
  @state() private _editingAnchorVertex = -1;
  @state() private _anchorInputValue = "";

  private _stage?: Konva.Stage;
  private _layer?: Konva.Layer;
  private _container?: HTMLDivElement;

  /** Load fixture data from outside */
  setFixture(fixture: LayoutFixture): void {
    this._points = fixture.points.map(([x, y]) => [x, y] as [number, number]);
    this._anchors = [...fixture.anchors];
    this._closed = fixture.closed;
    this._redraw();
  }

  getFixture(): LayoutFixture {
    return {
      id: this.fixtureId,
      name: this.fixtureName,
      kind: this._closed ? "polygon" : "polyline",
      closed: this._closed,
      points: [...this._points],
      anchors: [...this._anchors],
    };
  }

  protected override firstUpdated(): void {
    this._container = this.renderRoot.querySelector<HTMLDivElement>(".konva-host") ?? undefined;
    if (!this._container) return;
    this._initStage();
    if (this._points.length === 0) {
      this._loadDefault();
    }
  }

  protected override updated(): void {
    if (this._stage) {
      this._fitStage();
    }
  }

  private _initStage(): void {
    if (!this._container) return;
    const w = this._container.clientWidth || 480;
    const h = this._container.clientHeight || 300;
    this._stage = new Konva.Stage({ container: this._container, width: w, height: h });
    this._layer = new Konva.Layer();
    this._stage.add(this._layer);
    this._redraw();
  }

  private _fitStage(): void {
    const c = this._container;
    if (!c || !this._stage) return;
    const w = c.clientWidth;
    const h = c.clientHeight;
    if (w > 0 && h > 0) {
      this._stage.width(w);
      this._stage.height(h);
    }
  }

  private _loadDefault(): void {
    const def = kitchenIslandLayout("default");
    const fix = def.fixtures[0] as unknown as LayoutFixture | undefined;
    if (!fix) return;
    this._points = fix.points.map(([x, y]) => [x, y] as [number, number]);
    this._anchors = [...fix.anchors];
    this._closed = fix.closed;
    this._redraw();
  }

  private _redraw(): void {
    const layer = this._layer;
    const stage = this._stage;
    if (!layer || !stage) return;
    layer.destroyChildren();

    if (this._points.length < 2) return;

    const sw = stage.width();
    const sh = stage.height();
    const pad = 32;

    const xs = this._points.map(([x]) => x);
    const ys = this._points.map(([, y]) => y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const scaleX = (sw - pad * 2) / rangeX;
    const scaleY = (sh - pad * 2) / rangeY;
    const scale = Math.min(scaleX, scaleY);

    const toScreen = (pt: [number, number]): [number, number] => [
      pad + (pt[0] - minX) * scale,
      pad + (pt[1] - minY) * scale,
    ];

    // Draw polyline
    const flat: number[] = [];
    for (const pt of this._points) {
      const [sx, sy] = toScreen(pt);
      flat.push(sx, sy);
    }
    if (this._closed && flat.length >= 4) {
      flat.push(flat[0]!, flat[1]!);
    }

    const line = new Konva.Line({
      points: flat,
      stroke: "var(--primary-color, #448aff)",
      strokeWidth: 2,
      lineCap: "round",
      lineJoin: "round",
    });
    layer.add(line);

    // Draw draggable vertices
    for (let i = 0; i < this._points.length; i++) {
      const [sx, sy] = toScreen(this._points[i]!);
      const anchor = this._anchors.find((a) => a.vertex_index === i);
      const isAnchor = !!anchor;

      const circle = new Konva.Circle({
        x: sx,
        y: sy,
        radius: isAnchor ? 8 : 6,
        fill: isAnchor ? "var(--warning-color, #ff9800)" : "var(--primary-color, #448aff)",
        stroke: "#fff",
        strokeWidth: 2,
        draggable: true,
      });

      const idx = i;
      circle.on("dragend", (evt) => {
        const node = evt.target;
        const nx = pad + (node.x() - pad);
        const ny = pad + (node.y() - pad);
        const newModel: [number, number] = [
          minX + (nx - pad) / scale,
          minY + (ny - pad) / scale,
        ];
        this._points = this._points.map((p, pi) => (pi === idx ? newModel : p));
        this._emitChange();
        this._redraw();
      });

      circle.on("click tap", () => {
        this._editingAnchorVertex = idx;
        const existing = this._anchors.find((a) => a.vertex_index === idx);
        this._anchorInputValue = existing ? String(existing.led) : "";
        this.requestUpdate();
      });

      // LED label
      if (isAnchor && anchor) {
        const label = new Konva.Text({
          x: sx + 10,
          y: sy - 8,
          text: `L${anchor.led}`,
          fontSize: 11,
          fill: "#fff",
          shadowColor: "#000",
          shadowBlur: 3,
        });
        layer.add(label);
      }

      // Vertex index label
      const vtxLabel = new Konva.Text({
        x: sx - 4,
        y: sy - 18,
        text: String(idx),
        fontSize: 10,
        fill: "rgba(255,255,255,0.6)",
      });
      layer.add(vtxLabel);

      layer.add(circle);
    }

    layer.batchDraw();
  }

  private _emitChange(): void {
    this.dispatchEvent(
      new CustomEvent<LayoutChangeDetail>("layout-change", {
        detail: {
          points: [...this._points],
          anchors: [...this._anchors],
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _saveAnchor(): void {
    const ledNum = parseInt(this._anchorInputValue, 10);
    if (!Number.isFinite(ledNum) || ledNum < 0) {
      this._editingAnchorVertex = -1;
      return;
    }
    const vi = this._editingAnchorVertex;
    const existing = this._anchors.findIndex((a) => a.vertex_index === vi);
    if (existing >= 0) {
      this._anchors = this._anchors.map((a, ai) =>
        ai === existing ? { ...a, led: ledNum } : a
      );
    } else {
      this._anchors = [...this._anchors, { led: ledNum, vertex_index: vi }];
    }
    this._editingAnchorVertex = -1;
    this._anchorInputValue = "";
    this._emitChange();
    this._redraw();
  }

  private _removeAnchor(vi: number): void {
    this._anchors = this._anchors.filter((a) => a.vertex_index !== vi);
    this._editingAnchorVertex = -1;
    this._emitChange();
    this._redraw();
  }

  private _addVertex(): void {
    if (this._points.length === 0) {
      this._points = [[0, 0]];
    } else {
      const last = this._points[this._points.length - 1]!;
      this._points = [...this._points, [last[0] + 20, last[1]]];
    }
    this._redraw();
    this._emitChange();
  }

  protected override render() {
    const editingVi = this._editingAnchorVertex;
    return html`
      <div class="designer">
        <div class="toolbar">
          <button class="tb-btn" @click=${() => this._emitSave()}>
            <ha-icon icon="mdi:content-save-outline"></ha-icon>
            Save layout
          </button>
          <button class="tb-btn" @click=${() => this._addVertex()}>
            <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
            Add vertex
          </button>
          <label class="tb-toggle">
            <input
              type="checkbox"
              .checked=${this._closed}
              @change=${(e: Event) => {
                this._closed = (e.target as HTMLInputElement).checked;
                this._redraw();
                this._emitChange();
              }}
            />
            Closed path
          </label>
        </div>

        <div class="konva-host" aria-label="Layout designer canvas"></div>

        ${editingVi >= 0
          ? html`
              <div class="anchor-popup">
                <span>Vertex ${editingVi} → LED anchor</span>
                <input
                  type="number"
                  min="0"
                  .value=${this._anchorInputValue}
                  @input=${(e: Event) => {
                    this._anchorInputValue = (e.target as HTMLInputElement).value;
                  }}
                  @keydown=${(e: KeyboardEvent) => {
                    if (e.key === "Enter") this._saveAnchor();
                    if (e.key === "Escape") this._editingAnchorVertex = -1;
                  }}
                  placeholder="LED index"
                  autofocus
                />
                <button class="tb-btn" @click=${() => this._saveAnchor()}>Set</button>
                <button
                  class="tb-btn danger"
                  @click=${() => this._removeAnchor(editingVi)}
                >
                  Remove
                </button>
                <button
                  class="tb-btn"
                  @click=${() => {
                    this._editingAnchorVertex = -1;
                  }}
                >
                  Cancel
                </button>
              </div>
            `
          : null}

        <div class="anchor-list">
          ${this._anchors.map(
            (a) => html`
              <span class="anchor-chip">
                V${a.vertex_index}→L${a.led}
              </span>
            `
          )}
        </div>
      </div>
    `;
  }

  private _emitSave(): void {
    this.dispatchEvent(
      new CustomEvent("layout-save", {
        detail: this.getFixture(),
        bubbles: true,
        composed: true,
      })
    );
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .designer {
        display: flex;
        flex-direction: column;
        gap: 8px;
        height: 100%;
      }
      .toolbar {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        align-items: center;
      }
      .tb-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        background: var(--secondary-background-color, #2a2a2a);
        color: var(--primary-text-color, #fff);
        cursor: pointer;
        font-size: 0.85rem;
      }
      .tb-btn.danger {
        background: var(--error-color, #cf6679);
      }
      .tb-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.85rem;
        cursor: pointer;
      }
      .konva-host {
        flex: 1;
        min-height: 220px;
        border-radius: 8px;
        overflow: hidden;
        background: #1a1a2e;
        container-type: size;
      }
      .anchor-popup {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        padding: 8px 12px;
        background: var(--card-background-color, #1e1e2a);
        border: 1px solid var(--divider-color, #444);
        border-radius: 8px;
        font-size: 0.85rem;
      }
      .anchor-popup input {
        width: 80px;
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #555);
        background: var(--primary-background-color, #111);
        color: var(--primary-text-color, #fff);
      }
      .anchor-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        min-height: 24px;
      }
      .anchor-chip {
        padding: 2px 8px;
        border-radius: 999px;
        background: var(--warning-color, #ff9800);
        color: #000;
        font-size: 0.75rem;
        font-weight: 600;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    [LAYOUT_DESIGNER_TAG]: WledLayoutDesigner;
  }
}
