import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import {
  layoutGet,
  layoutResolvePositions,
  layoutSave,
  type LayoutRecord,
  type LedPosition,
} from "../api/layout.js";

/** Vertex used internally while editing. */
interface Vertex {
  x: number;
  y: number;
  anchorLed: number | null; // null = unanchored
}

const ANCHOR_COLOR = "#f59e0b";
const VERTEX_COLOR = "#6366f1";
const EDGE_COLOR = "rgba(99,102,241,0.6)";
const DOT_COLOR = "rgba(120,220,120,0.65)";
const VERTEX_R = 7;
const ANCHOR_R = 9;
const DOT_R = 3;
const HIT_R = 14;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

@safeCustomElement("wled-layout-designer")
export class WledLayoutDesigner extends BasePoweredElement {
  @property({ attribute: false }) connection?: Connection;
  @property() controllerId = "";
  @property() layoutId = "";
  @property() fixtureId = "";
  @property({ type: Number }) pixelCount = 210;

  @state() private _vertices: Vertex[] = [];
  @state() private _ledPositions: LedPosition[] = [];
  @state() private _selectedVtx = -1;
  @state() private _anchorInput = "";
  @state() private _status = "";
  @state() private _busy = false;

  private _canvas?: HTMLCanvasElement;
  private _ctx?: CanvasRenderingContext2D;
  private _drag: { idx: number; ox: number; oy: number } | null = null;
  private _viewOx = 0;
  private _viewOy = 0;
  private _viewScale = 1;
  private _resizeObs?: ResizeObserver;

  protected override onPoweredConnect(): void {
    void this._loadLayout();
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    super.updated(changed);
    if (changed.has("connection") || changed.has("layoutId") || changed.has("fixtureId")) {
      void this._loadLayout();
    }
  }

  protected override firstUpdated(): void {
    this._canvas = this.renderRoot.querySelector("canvas") ?? undefined;
    if (this._canvas) {
      this._ctx = this._canvas.getContext("2d", { alpha: true }) ?? undefined;
      this._canvas.addEventListener("pointerdown", this._onPointerDown);
      this._canvas.addEventListener("pointermove", this._onPointerMove);
      this._canvas.addEventListener("pointerup", this._onPointerUp);
      this._canvas.addEventListener("pointercancel", this._onPointerUp);
      this._canvas.addEventListener("dblclick", this._onDblClick);
      this._canvas.addEventListener("contextmenu", this._onContextMenu);
      this.addUnsub(() => {
        this._canvas?.removeEventListener("pointerdown", this._onPointerDown);
        this._canvas?.removeEventListener("pointermove", this._onPointerMove);
        this._canvas?.removeEventListener("pointerup", this._onPointerUp);
        this._canvas?.removeEventListener("pointercancel", this._onPointerUp);
        this._canvas?.removeEventListener("dblclick", this._onDblClick);
        this._canvas?.removeEventListener("contextmenu", this._onContextMenu);
      });
    }
    this._resizeObs = new ResizeObserver(() => this._onResize());
    this._resizeObs.observe(this);
    this._onResize();
  }

  private _onResize(): void {
    const canvas = this._canvas;
    if (!canvas) return;
    const rect = this.getBoundingClientRect();
    const w = Math.max(400, rect.width || 400);
    const h = Math.max(300, rect.height || 300);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    this._fitView();
    this._paint();
  }

  private _fitView(): void {
    if (this._vertices.length === 0) {
      this._viewOx = 40;
      this._viewOy = 40;
      this._viewScale = 1;
      return;
    }
    const canvas = this._canvas;
    if (!canvas) return;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const v of this._vertices) {
      if (v.x < minX) minX = v.x;
      if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.y > maxY) maxY = v.y;
    }
    const pad = 48;
    const rx = maxX - minX || 100;
    const ry = maxY - minY || 100;
    const scale = Math.min(
      (canvas.width - pad * 2) / rx,
      (canvas.height - pad * 2) / ry,
      4
    );
    this._viewScale = scale;
    this._viewOx = pad - minX * scale;
    this._viewOy = pad - minY * scale;
  }

  private _vtxToCanvas(v: Vertex): [number, number] {
    return [
      v.x * this._viewScale + this._viewOx,
      v.y * this._viewScale + this._viewOy,
    ];
  }

  private _canvasToModel(cx: number, cy: number): [number, number] {
    return [
      (cx - this._viewOx) / this._viewScale,
      (cy - this._viewOy) / this._viewScale,
    ];
  }

  private _hitVertex(cx: number, cy: number): number {
    for (let i = this._vertices.length - 1; i >= 0; i--) {
      const [vx, vy] = this._vtxToCanvas(this._vertices[i]);
      if (Math.hypot(cx - vx, cy - vy) <= HIT_R) return i;
    }
    return -1;
  }

  private _canvasXY(ev: PointerEvent): [number, number] {
    const canvas = this._canvas!;
    const rect = canvas.getBoundingClientRect();
    return [ev.clientX - rect.left, ev.clientY - rect.top];
  }

  private _onPointerDown = (ev: PointerEvent): void => {
    ev.preventDefault();
    const [cx, cy] = this._canvasXY(ev);
    const idx = this._hitVertex(cx, cy);
    if (idx >= 0) {
      this._selectedVtx = idx;
      this._anchorInput = String(this._vertices[idx].anchorLed ?? "");
      this._drag = { idx, ox: cx, oy: cy };
      this._canvas?.setPointerCapture(ev.pointerId);
    }
    this._paint();
  };

  private _onPointerMove = (ev: PointerEvent): void => {
    if (!this._drag) return;
    const [cx, cy] = this._canvasXY(ev);
    const [mx, my] = this._canvasToModel(cx, cy);
    const verts = [...this._vertices];
    verts[this._drag.idx] = { ...verts[this._drag.idx], x: mx, y: my };
    this._vertices = verts;
    this._paint();
  };

  private _onPointerUp = (ev: PointerEvent): void => {
    if (this._drag) {
      this._canvas?.releasePointerCapture(ev.pointerId);
      this._drag = null;
      void this._refreshPositions();
    }
  };

  private _onDblClick = (ev: MouseEvent): void => {
    // Double-click on empty canvas → add vertex
    const canvas = this._canvas!;
    const rect = canvas.getBoundingClientRect();
    const cx = ev.clientX - rect.left;
    const cy = ev.clientY - rect.top;
    const hit = this._hitVertex(cx, cy);
    if (hit >= 0) return;
    const [mx, my] = this._canvasToModel(cx, cy);
    this._vertices = [...this._vertices, { x: mx, y: my, anchorLed: null }];
    this._selectedVtx = this._vertices.length - 1;
    this._anchorInput = "";
    this._paint();
    void this._refreshPositions();
  };

  private _onContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault();
    const canvas = this._canvas!;
    const rect = canvas.getBoundingClientRect();
    const cx = ev.clientX - rect.left;
    const cy = ev.clientY - rect.top;
    const hit = this._hitVertex(cx, cy);
    if (hit < 0) return;
    this._vertices = this._vertices.filter((_, i) => i !== hit);
    if (this._selectedVtx === hit) this._selectedVtx = -1;
    else if (this._selectedVtx > hit) this._selectedVtx--;
    this._paint();
    void this._refreshPositions();
  };

  private _paint(): void {
    const ctx = this._ctx;
    const canvas = this._canvas;
    if (!ctx || !canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, w, h);

    const verts = this._vertices;
    if (verts.length === 0) {
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Double-click to add vertices", w / 2, h / 2);
      return;
    }

    // Draw LED position dots
    ctx.fillStyle = DOT_COLOR;
    for (const { x, y } of this._ledPositions) {
      const cx = x * this._viewScale + this._viewOx;
      const cy = y * this._viewScale + this._viewOy;
      ctx.beginPath();
      ctx.arc(cx, cy, DOT_R, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw polyline
    if (verts.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = EDGE_COLOR;
      ctx.lineWidth = 2;
      const [sx, sy] = this._vtxToCanvas(verts[0]);
      ctx.moveTo(sx, sy);
      for (let i = 1; i < verts.length; i++) {
        const [vx, vy] = this._vtxToCanvas(verts[i]);
        ctx.lineTo(vx, vy);
      }
      ctx.stroke();
    }

    // Draw vertices
    for (let i = 0; i < verts.length; i++) {
      const v = verts[i];
      const [cx, cy] = this._vtxToCanvas(v);
      const isAnchor = v.anchorLed !== null;
      const isSelected = i === this._selectedVtx;
      const r = isAnchor ? ANCHOR_R : VERTEX_R;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = isSelected
        ? "white"
        : isAnchor
          ? ANCHOR_COLOR
          : VERTEX_COLOR;
      ctx.fill();

      if (isSelected) {
        ctx.strokeStyle = VERTEX_COLOR;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (isAnchor && v.anchorLed !== null) {
        ctx.fillStyle = "#111";
        ctx.font = `bold ${Math.max(9, r - 1)}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(v.anchorLed), cx, cy);
      }

      // Vertex index label
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "10px sans-serif";
      ctx.textBaseline = "bottom";
      ctx.textAlign = "left";
      ctx.fillText(`v${i}`, cx + r + 2, cy - 2);
    }
  }

  private async _loadLayout(): Promise<void> {
    if (!this.connection || !this.controllerId || !this.layoutId) return;
    try {
      const layout = await layoutGet(this.connection, this.controllerId, this.layoutId);
      if (!layout) return;

      const fixture = this._findFixture(layout);
      if (!fixture) {
        this._vertices = [];
        return;
      }

      const pts = (fixture.points as Array<[number, number]>) ?? [];
      const anchors: Array<{ led: number; vertex_index: number }> =
        (fixture.anchors as Array<{ led: number; vertex_index: number }>) ?? [];

      const anchorMap = new Map(anchors.map((a) => [a.vertex_index, a.led]));
      this._vertices = pts.map((p, i) => ({
        x: p[0],
        y: p[1],
        anchorLed: anchorMap.get(i) ?? null,
      }));

      this._fitView();
      await this._refreshPositions();
      this._paint();
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    }
  }

  private _findFixture(layout: LayoutRecord): Record<string, unknown> | null {
    const fixtures = layout.fixtures ?? [];
    if (this.fixtureId) {
      return (
        (fixtures.find(
          (f) => (f as Record<string, unknown>).id === this.fixtureId
        ) as Record<string, unknown> | undefined) ?? null
      );
    }
    return (fixtures[0] as Record<string, unknown> | undefined) ?? null;
  }

  private async _refreshPositions(): Promise<void> {
    if (!this.connection || !this.controllerId || !this.fixtureId) return;
    try {
      this._ledPositions = await layoutResolvePositions(
        this.connection,
        this.controllerId,
        this.fixtureId,
        this.layoutId || undefined
      );
      this._paint();
    } catch {
      this._ledPositions = [];
    }
  }

  private _buildLayout(): LayoutRecord {
    const pts = this._vertices.map((v) => [v.x, v.y] as [number, number]);
    const anchors = this._vertices
      .map((v, i) => (v.anchorLed !== null ? { led: v.anchorLed, vertex_index: i } : null))
      .filter((a): a is { led: number; vertex_index: number } => a !== null);

    return {
      id: this.layoutId || "layout-0",
      controller_id: this.controllerId,
      name: "Layout",
      pixel_count: this.pixelCount,
      fixtures: [
        {
          id: this.fixtureId || "fixture-0",
          name: "Fixture",
          kind: "polyline",
          closed: false,
          points: pts,
          anchors,
        },
      ],
    };
  }

  private async _save(): Promise<void> {
    if (!this.connection || !this.controllerId || this._busy) return;
    this._busy = true;
    this._status = "Saving…";
    try {
      await layoutSave(this.connection, this.controllerId, this._buildLayout());
      this._status = "Saved";
      await this._refreshPositions();
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._busy = false;
    }
  }

  private _setAnchorLed(): void {
    const idx = this._selectedVtx;
    if (idx < 0) return;
    const val = this._anchorInput.trim();
    const led = val === "" ? null : parseInt(val, 10);
    if (led !== null && (isNaN(led) || led < 0 || led >= this.pixelCount)) return;
    const verts = [...this._vertices];
    verts[idx] = { ...verts[idx], anchorLed: led };
    this._vertices = verts;
    this._paint();
  }

  private _mirrorSliderMax(): number {
    return Math.max(0, this.pixelCount - 1);
  }

  private _onMirrorSlider(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const mirrorAt = parseInt(input.value, 10);
    if (isNaN(mirrorAt) || this._vertices.length === 0) return;
    // Mirror anchors: remap existing anchors so ledIndex 0..mirrorAt maps symmetrically
    const verts = [...this._vertices];
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i].anchorLed;
      if (a === null) continue;
      const t = a / this._mirrorSliderMax();
      const newLed = Math.round(lerp(0, mirrorAt, t));
      verts[i] = { ...verts[i], anchorLed: newLed };
    }
    this._vertices = verts;
    this._paint();
  }

  protected override render() {
    const sel = this._vertices[this._selectedVtx];
    return html`
      <div class="designer">
        <div class="canvas-wrap">
          <canvas></canvas>
        </div>
        <div class="sidebar">
          <div class="instructions">
            <strong>Controls</strong>
            <ul>
              <li>Double-click canvas → add vertex</li>
              <li>Drag vertex → move</li>
              <li>Right-click vertex → delete</li>
              <li>Click vertex → select & set anchor LED</li>
            </ul>
          </div>

          ${sel !== undefined
            ? html`
                <div class="anchor-panel">
                  <label>
                    LED index for v${this._selectedVtx}
                    <input
                      type="number"
                      min="0"
                      max=${this.pixelCount - 1}
                      .value=${this._anchorInput}
                      @input=${(e: Event) => {
                        this._anchorInput = (e.target as HTMLInputElement).value;
                      }}
                      @change=${() => this._setAnchorLed()}
                      placeholder="unanchored"
                    />
                  </label>
                  <button
                    class="small"
                    @click=${() => this._setAnchorLed()}
                  >Set anchor</button>
                </div>
              `
            : null}

          <div class="mirror-panel">
            <label>
              Mirror anchor at LED
              <input
                type="range"
                min="0"
                max=${this._mirrorSliderMax()}
                value=${this.pixelCount - 1}
                @change=${this._onMirrorSlider}
              />
            </label>
          </div>

          ${this._status
            ? html`<p class="status">${this._status}</p>`
            : null}

          <div class="actions">
            <button
              class="primary"
              ?disabled=${this._busy || this._vertices.length < 2}
              @click=${() => this._save()}
            >
              Save layout
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = [
    ...sharedBaseStyles,
    css`
      .designer {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        height: 100%;
      }
      @container wled-studio (min-width: 600px) {
        .designer {
          grid-template-columns: 1fr 220px;
        }
      }
      .canvas-wrap {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        background: #111827;
        min-height: 300px;
      }
      canvas {
        display: block;
        width: 100%;
        height: 100%;
        cursor: crosshair;
        touch-action: none;
      }
      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 4px 0;
      }
      .instructions {
        font-size: 0.78rem;
        opacity: 0.75;
        line-height: 1.5;
      }
      .instructions ul {
        margin: 4px 0 0;
        padding-left: 1.1rem;
      }
      .anchor-panel {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 10px;
        border-radius: 8px;
        background: var(--card-background-color, #1f2937);
      }
      .anchor-panel label {
        font-size: 0.82rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .anchor-panel input {
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--primary-background-color, #111827);
        color: var(--primary-text-color, #f9fafb);
        font-size: 0.9rem;
        width: 100%;
        box-sizing: border-box;
      }
      .mirror-panel {
        font-size: 0.82rem;
      }
      .mirror-panel label {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .mirror-panel input[type="range"] {
        width: 100%;
      }
      .status {
        font-size: 0.8rem;
        opacity: 0.8;
        margin: 0;
      }
      .actions {
        margin-top: auto;
        padding-top: 8px;
      }
      .primary,
      .small {
        padding: 8px 14px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.85rem;
        width: 100%;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.78rem;
        width: auto;
      }
      .primary:disabled {
        opacity: 0.45;
        cursor: default;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "wled-layout-designer": WledLayoutDesigner;
  }
}
