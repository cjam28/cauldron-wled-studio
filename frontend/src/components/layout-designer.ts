import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { Connection } from "home-assistant-js-websocket";
import { safeCustomElement } from "../utils/safe-custom-element.js";
import { BasePoweredElement, sharedBaseStyles } from "../base/base-powered-element.js";
import { getStroke } from "perfect-freehand";
import simplify from "simplify-js";
import {
  layoutGet,
  layoutResolvePositions,
  layoutSave,
  type LayoutRecord,
  type LedPosition,
} from "../api/layout.js";
import { uploadLayoutBackground } from "../api/layout-background.js";
import { fetchDeviceState } from "../api/wled-state.js";
import { importSegmentStarts } from "../utils/layout-tools.js";

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
  @state() private _closed = false;
  @state() private _tool: "select" | "pen" = "select";
  @state() private _backgroundUrl: string | null = null;
  @state() private _scalePxPerM: number | null = null;
  @state() private _calibActive = false;
  @state() private _calibMeters = "1";
  @state() private _bgOpacity = 0.45;

  private _calibPts: Array<[number, number]> = [];
  private _penStroke: Array<[number, number]> = [];
  private _bgImage: HTMLImageElement | null = null;

  private _canvas?: HTMLCanvasElement;
  private _canvasWrap?: HTMLElement;
  private _ctx?: CanvasRenderingContext2D;
  private _drag: { idx: number; ox: number; oy: number } | null = null;
  private _boundCanvas?: HTMLCanvasElement;
  private _viewOx = 0;
  private _viewOy = 0;
  private _viewScale = 1;
  private _resizeObs?: ResizeObserver;

  protected override onPoweredConnect(): void {
    void this._loadLayout();
  }

  protected override firstUpdated(): void {
    this._canvasWrap =
      this.renderRoot.querySelector(".canvas-wrap") ?? undefined;
    this._resizeObs = new ResizeObserver(() => this._onResize());
    if (this._canvasWrap) {
      this._resizeObs.observe(this._canvasWrap);
    }
    this._bindCanvas();
    this._onResize();
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    super.updated(changed);
    this._bindCanvas();
    if (changed.has("connection") || changed.has("layoutId") || changed.has("fixtureId")) {
      void this._loadLayout();
    }
  }

  /** Re-attach listeners when Lit recreates the canvas node. */
  private _bindCanvas(): void {
    const canvas = this.renderRoot.querySelector("canvas") ?? undefined;
    if (!canvas || canvas === this._boundCanvas) return;
    this._unbindCanvas();
    this._canvas = canvas;
    this._boundCanvas = canvas;
    this._ctx = canvas.getContext("2d", { alpha: true }) ?? undefined;
    canvas.addEventListener("pointerdown", this._onPointerDown);
    canvas.addEventListener("pointermove", this._onPointerMove);
    canvas.addEventListener("pointerup", this._onPointerUp);
    canvas.addEventListener("pointercancel", this._onPointerUp);
    canvas.addEventListener("dblclick", this._onDblClick);
    canvas.addEventListener("contextmenu", this._onContextMenu);
  }

  private _unbindCanvas(): void {
    const canvas = this._boundCanvas;
    if (!canvas) return;
    canvas.removeEventListener("pointerdown", this._onPointerDown);
    canvas.removeEventListener("pointermove", this._onPointerMove);
    canvas.removeEventListener("pointerup", this._onPointerUp);
    canvas.removeEventListener("pointercancel", this._onPointerUp);
    canvas.removeEventListener("dblclick", this._onDblClick);
    canvas.removeEventListener("contextmenu", this._onContextMenu);
    this._boundCanvas = undefined;
  }

  override disconnectedCallback(): void {
    this._resizeObs?.disconnect();
    this._unbindCanvas();
    super.disconnectedCallback();
  }

  private _onResize(): void {
    const canvas = this._canvas;
    const wrap = this._canvasWrap;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
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

  /** Map pointer coords to canvas backing-store pixels (CSS size often differs). */
  private _pointerCanvasXY(clientX: number, clientY: number): [number, number] {
    const canvas = this._canvas!;
    const rect = canvas.getBoundingClientRect();
    const sx = rect.width > 0 ? canvas.width / rect.width : 1;
    const sy = rect.height > 0 ? canvas.height / rect.height : 1;
    return [(clientX - rect.left) * sx, (clientY - rect.top) * sy];
  }

  private _isClosingDuplicate(i: number): boolean {
    if (i <= 0 || this._vertices.length < 3) return false;
    const last = this._vertices.length - 1;
    if (i !== last) return false;
    const a = this._vertices[0];
    const b = this._vertices[last];
    return Math.hypot(a.x - b.x, a.y - b.y) < 0.5;
  }

  private _hitVertex(cx: number, cy: number): number {
    let best = -1;
    let bestDist = HIT_R + 1;
    for (let i = 0; i < this._vertices.length; i++) {
      if (this._isClosingDuplicate(i)) continue;
      const [vx, vy] = this._vtxToCanvas(this._vertices[i]);
      const d = Math.hypot(cx - vx, cy - vy);
      if (d > HIT_R) continue;
      const anchored = this._vertices[i].anchorLed !== null;
      const bestAnchored = best >= 0 && this._vertices[best].anchorLed !== null;
      if (
        best < 0 ||
        d < bestDist - 0.5 ||
        (Math.abs(d - bestDist) <= 1 && anchored && !bestAnchored)
      ) {
        best = i;
        bestDist = d;
      }
    }
    return best;
  }

  private _canvasXY(ev: PointerEvent): [number, number] {
    return this._pointerCanvasXY(ev.clientX, ev.clientY);
  }

  private _onPointerDown = (ev: PointerEvent): void => {
    ev.preventDefault();
    const [cx, cy] = this._canvasXY(ev);
    const [mx, my] = this._canvasToModel(cx, cy);

    if (this._calibActive) {
      this._calibPts.push([mx, my]);
      if (this._calibPts.length >= 2) this._applyCalibration();
      this._paint();
      return;
    }

    if (this._tool === "pen") {
      this._penStroke = [[cx, cy]];
      this._canvas?.setPointerCapture(ev.pointerId);
      this._paint();
      return;
    }

    const idx = this._hitVertex(cx, cy);
    if (idx >= 0) {
      this._selectedVtx = idx;
      this._anchorInput = String(this._vertices[idx].anchorLed ?? "");
      this._drag = { idx, ox: cx, oy: cy };
      this._canvas?.setPointerCapture(ev.pointerId);
    } else {
      this._selectedVtx = -1;
    }
    this._paint();
  };

  private _onPointerMove = (ev: PointerEvent): void => {
    const [cx, cy] = this._canvasXY(ev);

    if (this._tool === "pen" && this._penStroke.length > 0) {
      const last = this._penStroke[this._penStroke.length - 1];
      if (Math.hypot(cx - last[0], cy - last[1]) > 2) {
        this._penStroke = [...this._penStroke, [cx, cy]];
        this._paint();
      }
      return;
    }

    if (!this._drag) return;
    const [mx, my] = this._canvasToModel(cx, cy);
    const verts = [...this._vertices];
    verts[this._drag.idx] = { ...verts[this._drag.idx], x: mx, y: my };
    this._vertices = verts;
    this._paint();
  };

  private _onPointerUp = (ev: PointerEvent): void => {
    if (this._tool === "pen" && this._penStroke.length > 0) {
      this._canvas?.releasePointerCapture(ev.pointerId);
      this._finishPenStroke();
      return;
    }
    if (this._drag) {
      this._canvas?.releasePointerCapture(ev.pointerId);
      this._drag = null;
      void this._refreshPositions();
    }
  };

  private _finishPenStroke(): void {
    const stroke = this._penStroke;
    this._penStroke = [];
    if (stroke.length < 2) return;
    const outline = getStroke(
      stroke.map(([x, y]) => [x, y, 0.5] as [number, number, number]),
      { size: 10, thinning: 0.6, smoothing: 0.5 }
    );
    const pts = simplify(
      outline.map(([x, y]) => ({ x, y })),
      2.5,
      true
    );
    if (pts.length < 2) return;
    this._vertices = pts.map((p) => {
      const [mx, my] = this._canvasToModel(p.x, p.y);
      return { x: mx, y: my, anchorLed: null };
    });
    this._selectedVtx = -1;
    void this._refreshPositions();
    this._paint();
  }

  private _applyCalibration(): void {
    if (this._calibPts.length < 2) return;
    const [a, b] = this._calibPts;
    const px = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const meters = parseFloat(this._calibMeters);
    if (px > 0 && meters > 0) {
      this._scalePxPerM = px / meters;
      this._status = `Scale: ${this._scalePxPerM.toFixed(1)} px/m`;
    }
    this._calibActive = false;
    this._calibPts = [];
  }

  private _onDblClick = (ev: MouseEvent): void => {
    const [cx, cy] = this._pointerCanvasXY(ev.clientX, ev.clientY);
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
    const [cx, cy] = this._pointerCanvasXY(ev.clientX, ev.clientY);
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

    if (this._bgImage?.complete && this._bgImage.naturalWidth > 0) {
      ctx.globalAlpha = this._bgOpacity;
      ctx.drawImage(this._bgImage, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }

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

    // Draw polyline (skip duplicate closing point for display)
    const drawVerts =
      verts.length >= 2 && this._isClosingDuplicate(verts.length - 1)
        ? verts.slice(0, -1)
        : verts;
    if (drawVerts.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = EDGE_COLOR;
      ctx.lineWidth = 2;
      const [sx, sy] = this._vtxToCanvas(drawVerts[0]);
      ctx.moveTo(sx, sy);
      for (let i = 1; i < drawVerts.length; i++) {
        const [vx, vy] = this._vtxToCanvas(drawVerts[i]);
        ctx.lineTo(vx, vy);
      }
      if (this._closed && drawVerts.length >= 3) ctx.closePath();
      ctx.stroke();
    }

    if (this._penStroke.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(168,85,247,0.8)";
      ctx.lineWidth = 2;
      const [px0, py0] = this._penStroke[0];
      ctx.moveTo(px0, py0);
      for (let i = 1; i < this._penStroke.length; i++) {
        ctx.lineTo(this._penStroke[i][0], this._penStroke[i][1]);
      }
      ctx.stroke();
    }

    for (const [mx, my] of this._calibPts) {
      const [cx, cy] = this._vtxToCanvas({ x: mx, y: my, anchorLed: null });
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#22d3ee";
      ctx.fill();
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
      let vertices = pts.map((p, i) => ({
        x: p[0],
        y: p[1],
        anchorLed: anchorMap.get(i) ?? null,
      }));
      if (vertices.length >= 2) {
        const first = vertices[0];
        const last = vertices[vertices.length - 1];
        if (Math.hypot(first.x - last.x, first.y - last.y) < 0.5) {
          vertices = vertices.slice(0, -1);
        }
      }
      this._vertices = vertices;
      this._closed = Boolean(fixture.closed);
      this._backgroundUrl = layout.background_url ?? null;
      this._scalePxPerM = layout.scale_px_per_m ?? null;
      this._loadBackgroundImage();

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
      background_url: this._backgroundUrl,
      scale_px_per_m: this._scalePxPerM,
      fixtures: [
        {
          id: this.fixtureId || "fixture-0",
          name: "Fixture",
          kind: "polyline",
          closed: this._closed,
          points: pts,
          anchors,
        },
      ],
    };
  }

  private _loadBackgroundImage(): void {
    const url = this._backgroundUrl;
    if (!url) {
      this._bgImage = null;
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      this._bgImage = img;
      this._paint();
    };
    img.onerror = () => {
      this._bgImage = null;
    };
    img.src = url;
  }

  private async _importFromWled(): Promise<void> {
    if (!this.connection || !this.controllerId) return;
    this._busy = true;
    this._status = "Reading WLED segments…";
    try {
      const snap = await fetchDeviceState(this.connection, this.controllerId);
      const starts = snap.segments
        .map((s) => s.start ?? 0)
        .filter((n, i, arr) => arr.indexOf(n) === i)
        .sort((a, b) => a - b);
      this._vertices = importSegmentStarts(this._vertices, starts, this._closed);
      this._status = `Imported ${starts.length} segment boundary(ies) from WLED`;
      void this._refreshPositions();
      this._paint();
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._busy = false;
    }
  }

  private async _onBackgroundFile(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file || !this.controllerId || !this.layoutId) return;
    this._busy = true;
    this._status = "Uploading floorplan…";
    try {
      const { background_url } = await uploadLayoutBackground(
        this.controllerId,
        this.layoutId,
        file
      );
      this._backgroundUrl = background_url;
      this._loadBackgroundImage();
      this._status = "Floorplan uploaded — Save layout to persist";
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._busy = false;
    }
  }

  private async _save(): Promise<void> {
    if (!this.connection || !this.controllerId || this._busy) return;
    this._busy = true;
    this._status = "Saving…";
    try {
      await layoutSave(this.connection, this.controllerId, this._buildLayout());
      this._status = "Saved";
      await this._refreshPositions();
      this.dispatchEvent(
        new CustomEvent("layout-saved", { bubbles: true, composed: true })
      );
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
          <div class="tool-row">
            <button
              class=${this._tool === "select" ? "tool active" : "tool"}
              @click=${() => {
                this._tool = "select";
              }}
            >
              Select
            </button>
            <button
              class=${this._tool === "pen" ? "tool active" : "tool"}
              @click=${() => {
                this._tool = "pen";
              }}
            >
              Pen
            </button>
          </div>

          <label class="check-row">
            <input
              type="checkbox"
              .checked=${this._closed}
              @change=${(e: Event) => {
                this._closed = (e.target as HTMLInputElement).checked;
                this._paint();
                void this._refreshPositions();
              }}
            />
            Close path (wrap last LED → first)
          </label>

          <div class="instructions">
            <strong>Select tool</strong>
            <ul>
              <li>Click vertex → select & set anchor LED</li>
              <li>Drag vertex → move corner</li>
              <li>Double-click empty → add vertex</li>
              <li>Right-click vertex → delete</li>
            </ul>
            <strong>Pen tool</strong>
            <ul>
              <li>Draw freehand → releases as vertices</li>
            </ul>
          </div>

          <div class="action-stack">
            <button class="secondary" ?disabled=${this._busy} @click=${() => this._importFromWled()}>
              Import segments from WLED
            </button>
            <label class="file-btn secondary">
              Upload floorplan
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                hidden
                @change=${this._onBackgroundFile}
              />
            </label>
            <label class="check-row">
              Floorplan opacity
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                .value=${String(this._bgOpacity)}
                @input=${(e: Event) => {
                  this._bgOpacity = parseFloat((e.target as HTMLInputElement).value);
                  this._paint();
                }}
              />
            </label>
            <button
              class="secondary"
              ?disabled=${this._busy}
              @click=${() => {
                this._calibActive = true;
                this._calibPts = [];
                this._status = "Click two points on the floorplan, then enter real distance (m)";
              }}
            >
              Calibrate scale
            </button>
            ${this._calibActive
              ? html`
                  <label>
                    Distance between points (m)
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      .value=${this._calibMeters}
                      @input=${(e: Event) => {
                        this._calibMeters = (e.target as HTMLInputElement).value;
                      }}
                    />
                  </label>
                `
              : null}
            ${this._scalePxPerM
              ? html`<p class="meta">Scale: ${this._scalePxPerM.toFixed(1)} layout px per meter</p>`
              : null}
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
        min-height: 320px;
        height: min(55vh, 480px);
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
      .tool-row {
        display: flex;
        gap: 6px;
      }
      .tool {
        flex: 1;
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .tool.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .check-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;
      }
      .check-row input[type="range"] {
        flex: 1;
      }
      .action-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .secondary,
      .file-btn {
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--card-background-color, #1f2937);
        color: inherit;
        cursor: pointer;
        font-size: 0.8rem;
        text-align: center;
      }
      .file-btn input {
        display: none;
      }
      .meta {
        margin: 0;
        font-size: 0.75rem;
        opacity: 0.7;
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
