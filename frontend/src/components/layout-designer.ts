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
import { uploadLayoutBackground } from "../api/layout-background.js";
import { fetchDeviceState } from "../api/wled-state.js";
import { importSegmentStarts } from "../utils/layout-tools.js";
import {
  backgroundFromLayout,
  drawBackgroundLayer,
  type BackgroundLayer,
} from "../utils/background-layer.js";
import "./layout-photo-editor.js";
import type { WledLayoutPhotoEditor } from "./layout-photo-editor.js";
import {
  type DrawTool,
  type GuidePath,
  ellipseToGuide,
  ledIndexAlongGuide,
  lineToGuide,
  penStrokeToGuide,
  polylineToGuide,
  rectToGuide,
  snapToGuide,
  strokeGuide,
} from "../utils/draw-tools.js";
import { parseSvgToGuide } from "../utils/svg-import.js";
import { formatHaError } from "../utils/ha-error.js";
import { loadHaImage } from "../utils/ha-image.js";

/** Sparse corners / segment pins (user-placed). */
interface Vertex {
  x: number;
  y: number;
  anchorLed: number | null;
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
  @state() private _tool: DrawTool = "select";
  @state() private _guide: GuidePath | null = null;
  @state() private _backgroundUrl: string | null = null;
  @state() private _bgLayer: BackgroundLayer | null = null;
  @state() private _scalePxPerM: number | null = null;
  @state() private _calibActive = false;
  @state() private _calibMeters = "1";

  private _calibPts: Array<[number, number]> = [];
  private _penStroke: Array<[number, number]> = [];
  private _shapeStart: [number, number] | null = null;
  private _lineStart: [number, number] | null = null;
  private _polylinePts: Array<[number, number]> = [];
  private _bgImage: HTMLImageElement | null = null;
  private _photoPan: {
    px: number;
    py: number;
    ox: number;
    oy: number;
  } | null = null;

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
    canvas.addEventListener("wheel", this._onWheel, { passive: false });
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
    canvas.removeEventListener("wheel", this._onWheel);
    this._boundCanvas = undefined;
  }

  private _onWheel = (ev: WheelEvent): void => {
    if (this._tool !== "photo" || !this._bgLayer) return;
    ev.preventDefault();
    const delta = ev.deltaY > 0 ? -0.04 : 0.04;
    const scale = Math.max(0.25, Math.min(4, (this._bgLayer.scale ?? 1) + delta));
    this._bgLayer = { ...this._bgLayer, scale };
    this._paint();
  };

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
    const canvas = this._canvas;
    if (!canvas) return;
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    const addPt = (x: number, y: number) => {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    };
    for (const v of this._vertices) addPt(v.x, v.y);
    for (const p of this._guide?.points ?? []) addPt(p[0], p[1]);
    if (!Number.isFinite(minX)) {
      this._viewOx = 40;
      this._viewOy = 40;
      this._viewScale = 1;
      return;
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

  /** New shape guide → drop old guide, corners, and LED overlay for a fresh layout. */
  private _beginNewGuideDrawing(): void {
    this._guide = null;
    this._vertices = [];
    this._ledPositions = [];
    this._selectedVtx = -1;
    this._anchorInput = "";
  }

  private _placeVertexOnGuide(mx: number, my: number): void {
    if (!this._guide || this._guide.points.length < 2) {
      this._status = "Draw a shape first (pen, line, rect, …), then place vertices.";
      return;
    }
    const snap = snapToGuide(this._guide, mx, my);
    const thresh = 24 / Math.max(this._viewScale, 0.01);
    if (snap.dist > thresh) {
      this._status = "Click closer to the purple guide line.";
      return;
    }
    for (const v of this._vertices) {
      if (Math.hypot(v.x - snap.x, v.y - snap.y) < thresh * 0.5) {
        this._status = "Vertex already placed near here.";
        return;
      }
    }
    const led = ledIndexAlongGuide(snap.t, this.pixelCount);
    this._vertices = [
      ...this._vertices,
      { x: snap.x, y: snap.y, anchorLed: led },
    ];
    this._selectedVtx = this._vertices.length - 1;
    this._anchorInput = String(led);
    this._status = `Placed v${this._selectedVtx} @ LED ${led} — add more or set anchors manually`;
    void this._refreshPositions();
    this._paint();
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

    if (this._tool === "photo" && this._bgLayer) {
      this._photoPan = {
        px: cx,
        py: cy,
        ox: this._bgLayer.offsetX ?? 0,
        oy: this._bgLayer.offsetY ?? 0,
      };
      this._canvas?.setPointerCapture(ev.pointerId);
      return;
    }

    if (this._tool === "place") {
      const hit = this._hitVertex(cx, cy);
      if (hit >= 0) {
        this._selectedVtx = hit;
        this._anchorInput = String(this._vertices[hit].anchorLed ?? "");
      } else {
        this._placeVertexOnGuide(mx, my);
      }
      this._paint();
      return;
    }

    if (this._tool === "pen") {
      this._beginNewGuideDrawing();
      this._penStroke = [[cx, cy]];
      this._canvas?.setPointerCapture(ev.pointerId);
      this._paint();
      return;
    }

    if (this._tool === "line") {
      if (!this._lineStart) {
        this._beginNewGuideDrawing();
        this._lineStart = [mx, my];
        this._status = "Line: click end point";
      } else {
        this._guide = lineToGuide(this._lineStart, [mx, my]);
        this._lineStart = null;
        this._status = "Line guide ready — switch to Place vertices";
      }
      this._paint();
      return;
    }

    if (this._tool === "rect" || this._tool === "ellipse") {
      this._beginNewGuideDrawing();
      this._shapeStart = [mx, my];
      this._canvas?.setPointerCapture(ev.pointerId);
      return;
    }

    if (this._tool === "polyline") {
      if (this._polylinePts.length === 0) {
        this._beginNewGuideDrawing();
      }
      this._polylinePts = [...this._polylinePts, [mx, my]];
      this._status = `Polyline: ${this._polylinePts.length} pts — double-click to finish`;
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

    if (this._photoPan && this._bgLayer) {
      const canvas = this._canvas!;
      const dx = (cx - this._photoPan.px) / canvas.width;
      const dy = (cy - this._photoPan.py) / canvas.height;
      this._bgLayer = {
        ...this._bgLayer,
        offsetX: this._photoPan.ox + dx,
        offsetY: this._photoPan.oy + dy,
      };
      this._paint();
      return;
    }

    if (this._tool === "pen" && this._penStroke.length > 0) {
      const last = this._penStroke[this._penStroke.length - 1];
      if (Math.hypot(cx - last[0], cy - last[1]) > 2) {
        this._penStroke = [...this._penStroke, [cx, cy]];
        this._paint();
      }
      return;
    }

    if (this._shapeStart && (this._tool === "rect" || this._tool === "ellipse")) {
      const [mx, my] = this._canvasToModel(cx, cy);
      const [x0, y0] = this._shapeStart;
      if (this._tool === "rect") {
        const preview = rectToGuide(x0, y0, mx, my);
        this._paint(preview);
      } else {
        const rx = Math.abs(mx - x0) / 2;
        const ry = Math.abs(my - y0) / 2;
        const preview = ellipseToGuide((x0 + mx) / 2, (y0 + my) / 2, rx, ry);
        this._paint(preview);
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
    if (this._photoPan) {
      this._canvas?.releasePointerCapture(ev.pointerId);
      this._photoPan = null;
      return;
    }
    if (this._tool === "pen" && this._penStroke.length > 0) {
      this._canvas?.releasePointerCapture(ev.pointerId);
      this._finishPenGuide();
      return;
    }
    if (this._shapeStart && (this._tool === "rect" || this._tool === "ellipse")) {
      const [cx, cy] = this._canvasXY(ev);
      const [mx, my] = this._canvasToModel(cx, cy);
      const [x0, y0] = this._shapeStart;
      this._guide =
        this._tool === "rect"
          ? rectToGuide(x0, y0, mx, my)
          : ellipseToGuide(
              (x0 + mx) / 2,
              (y0 + my) / 2,
              Math.abs(mx - x0) / 2,
              Math.abs(my - y0) / 2
            );
      this._shapeStart = null;
      this._status = "Shape guide ready — switch to Place vertices";
      this._canvas?.releasePointerCapture(ev.pointerId);
      this._paint();
      return;
    }
    if (this._drag) {
      this._canvas?.releasePointerCapture(ev.pointerId);
      this._drag = null;
      void this._refreshPositions();
    }
  };

  private _finishPenGuide(): void {
    const stroke = this._penStroke;
    this._penStroke = [];
    this._guide = penStrokeToGuide(
      stroke,
      (cx, cy) => this._canvasToModel(cx, cy),
      this._closed
    );
    this._status =
      this._guide.points.length >= 2
        ? "Smooth guide drawn — switch to Place vertices and click along the line"
        : "Stroke too short";
    this._paint();
  }

  private _finishPolyline(): void {
    if (this._polylinePts.length < 2) {
      this._status = "Need at least 2 points";
      return;
    }
    this._guide = polylineToGuide(this._polylinePts, this._closed);
    this._polylinePts = [];
    this._status = "Polyline guide ready — Place vertices along the path";
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
    if (this._tool === "polyline") {
      ev.preventDefault();
      this._finishPolyline();
      return;
    }
    if (this._tool !== "select") return;
    const [cx, cy] = this._pointerCanvasXY(ev.clientX, ev.clientY);
    if (this._hitVertex(cx, cy) >= 0) return;
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

  private _paint(guidePreview: GuidePath | null = null): void {
    const ctx = this._ctx;
    const canvas = this._canvas;
    if (!ctx || !canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, w, h);

    if (this._bgImage?.complete && this._bgImage.naturalWidth > 0 && this._bgLayer) {
      drawBackgroundLayer(ctx, w, h, this._bgImage, this._bgLayer);
    }

    const toCanvas = (x: number, y: number) => this._vtxToCanvas({ x, y, anchorLed: null });
    strokeGuide(ctx, toCanvas, this._guide);
    if (guidePreview) strokeGuide(ctx, toCanvas, guidePreview);

    if (this._polylinePts.length >= 2) {
      strokeGuide(
        ctx,
        toCanvas,
        polylineToGuide(this._polylinePts, false)
      );
    }

    if (this._penStroke.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(168,85,247,0.5)";
      ctx.lineWidth = 2;
      ctx.moveTo(this._penStroke[0][0], this._penStroke[0][1]);
      for (let i = 1; i < this._penStroke.length; i++) {
        ctx.lineTo(this._penStroke[i][0], this._penStroke[i][1]);
      }
      ctx.stroke();
    }

    const verts = this._vertices;
    if (verts.length === 0 && !this._guide) {
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Draw a shape, then use Place vertices", w / 2, h / 2);
      return;
    }

    const hasPhoto = Boolean(this._bgImage);
    for (const { x, y } of this._ledPositions) {
      const cx = x * this._viewScale + this._viewOx;
      const cy = y * this._viewScale + this._viewOy;
      if (hasPhoto) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(120,255,160,0.85)";
      }
      ctx.beginPath();
      ctx.arc(cx, cy, hasPhoto ? DOT_R + 1 : DOT_R, 0, Math.PI * 2);
      ctx.fillStyle = DOT_COLOR;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (verts.length >= 2) {
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
      const gp = fixture.guide_points as Array<[number, number]> | undefined;
      const gk = fixture.guide_kind as GuidePath["kind"] | undefined;
      if (Array.isArray(gp) && gp.length >= 2) {
        this._guide = {
          points: gp.map((p) => [Number(p[0]), Number(p[1])] as [number, number]),
          closed: Boolean(fixture.closed),
          kind: gk ?? "polyline",
        };
      }
      this._closed = Boolean(fixture.closed);
      this._bgLayer = backgroundFromLayout(layout);
      this._backgroundUrl = this._bgLayer?.url ?? layout.background_url ?? null;
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
      background: this._bgLayer,
      scale_px_per_m: this._scalePxPerM,
      fixtures: [
        {
          id: this.fixtureId || "fixture-0",
          name: "Fixture",
          kind: "polyline",
          closed: this._closed,
          points: pts,
          anchors,
          guide_points: this._guide?.points ?? [],
          guide_kind: this._guide?.kind ?? null,
        },
      ],
    };
  }

  private async _onSvgFile(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      this._beginNewGuideDrawing();
      this._guide = parseSvgToGuide(text);
      this._status = "SVG guide loaded — Place vertices along the path";
      this._fitView();
      this._paint();
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    }
  }

  private _clearGuide(): void {
    this._guide = null;
    this._polylinePts = [];
    this._lineStart = null;
    this._beginNewGuideDrawing();
    this._paint();
  }

  private _loadBackgroundImage(bustCache = false): void {
    const url = this._backgroundUrl;
    if (!url) {
      this._bgImage = null;
      return;
    }
    void loadHaImage(url, bustCache)
      .then((img) => {
        this._bgImage = img;
        this._paint();
      })
      .catch((err) => {
        this._bgImage = null;
        this._status = formatHaError(err);
        this._paint();
      });
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
    if (!file) return;
    const editor = this.renderRoot.querySelector<WledLayoutPhotoEditor>(
      "wled-layout-photo-editor"
    );
    if (!editor) return;
    try {
      await editor.openWithFile(file);
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    }
  }

  private async _onPhotoApply(
    ev: CustomEvent<{ file: File; layer: BackgroundLayer }>
  ): Promise<void> {
    const { file, layer } = ev.detail;
    if (!this.connection || !this.controllerId || !this.layoutId) {
      this._status = "Cannot upload photo — not connected to Home Assistant";
      return;
    }
    this._busy = true;
    this._status = "Uploading photo…";
    try {
      const { background_url } = await uploadLayoutBackground(
        this.connection,
        this.controllerId,
        this.layoutId,
        file
      );
      this._backgroundUrl = background_url;
      this._bgLayer = {
        ...layer,
        url: background_url,
        cropX: 0,
        cropY: 0,
        cropW: 1,
        cropH: 1,
      };
      this._loadBackgroundImage(true);
      this._status = "Photo ready — align with Photo tool, then Save layout";
    } catch (err) {
      this._status = formatHaError(err);
    } finally {
      this._busy = false;
    }
  }

  private _updateBgLayer(patch: Partial<BackgroundLayer>): void {
    if (!this._bgLayer) return;
    this._bgLayer = { ...this._bgLayer, ...patch };
    this._paint();
  }

  private _clearPhoto(): void {
    this._bgLayer = null;
    this._backgroundUrl = null;
    this._bgImage = null;
    this._paint();
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
          <div class="tool-group">
            <span class="tool-label">Edit</span>
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
                class=${this._tool === "place" ? "tool active" : "tool"}
                @click=${() => {
                  this._tool = "place";
                }}
              >
                Place ●
              </button>
              <button
                class=${this._tool === "photo" ? "tool active" : "tool"}
                ?disabled=${!this._bgLayer}
                @click=${() => {
                  this._tool = "photo";
                }}
              >
                Photo
              </button>
            </div>
          </div>
          <div class="tool-group">
            <span class="tool-label">Draw shape (guide)</span>
            <div class="tool-row wrap">
              <button
                class=${this._tool === "pen" ? "tool active" : "tool"}
                @click=${() => {
                  this._tool = "pen";
                }}
              >
                Freehand
              </button>
              <button
                class=${this._tool === "line" ? "tool active" : "tool"}
                @click=${() => {
                  this._tool = "line";
                  this._lineStart = null;
                }}
              >
                Line
              </button>
              <button
                class=${this._tool === "rect" ? "tool active" : "tool"}
                @click=${() => {
                  this._tool = "rect";
                }}
              >
                Rectangle
              </button>
              <button
                class=${this._tool === "ellipse" ? "tool active" : "tool"}
                @click=${() => {
                  this._tool = "ellipse";
                }}
              >
                Oval
              </button>
              <button
                class=${this._tool === "polyline" ? "tool active" : "tool"}
                @click=${() => {
                  this._tool = "polyline";
                  this._polylinePts = [];
                }}
              >
                Polyline
              </button>
            </div>
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
            <strong>Workflow</strong>
            <ol>
              <li>Draw a <em>purple guide</em> (shape tools)</li>
              <li><strong>Place ●</strong> — click the guide to drop corners (suggests LED #)</li>
              <li>Set anchor LEDs → Save → Apply segments</li>
            </ol>
            <strong>Place ●</strong>
            <ul>
              <li>Clicks snap to the guide; LED index from position along strip</li>
            </ul>
            <strong>Shapes</strong>
            <ul>
              <li>Line: two clicks</li>
              <li>Rect / Oval: drag</li>
              <li>Polyline: clicks, double-click to finish</li>
              <li>Freehand: smooth stroke (not hundreds of vertices)</li>
            </ul>
          </div>

          <div class="action-stack">
            <button class="secondary" ?disabled=${this._busy} @click=${() => this._importFromWled()}>
              Import segments from WLED
            </button>
            <label class="file-btn secondary">
              Add room photo…
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,.heic"
                capture="environment"
                hidden
                @change=${this._onBackgroundFile}
              />
            </label>
            <label class="file-btn secondary">
              Import SVG guide
              <input
                type="file"
                accept="image/svg+xml,.svg"
                hidden
                @change=${this._onSvgFile}
              />
            </label>
            <button class="secondary" @click=${() => this._clearGuide()}>
              Clear shape guide
            </button>
            ${this._tool === "polyline" && this._polylinePts.length >= 2
              ? html`
                  <button class="secondary" @click=${() => this._finishPolyline()}>
                    Finish polyline
                  </button>
                `
              : null}
            ${this._bgLayer
              ? html`
                  <div class="photo-tune">
                    <label
                      >Opacity
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        .value=${String(this._bgLayer.opacity ?? 0.55)}
                        @input=${(e: Event) =>
                          this._updateBgLayer({
                            opacity: parseFloat((e.target as HTMLInputElement).value),
                          })}
                      />
                    </label>
                    <label
                      >Brightness
                      <input
                        type="range"
                        min="0.4"
                        max="1.8"
                        step="0.05"
                        .value=${String(this._bgLayer.brightness ?? 1)}
                        @input=${(e: Event) =>
                          this._updateBgLayer({
                            brightness: parseFloat((e.target as HTMLInputElement).value),
                          })}
                      />
                    </label>
                    <label
                      >Saturation
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.05"
                        .value=${String(this._bgLayer.saturation ?? 1)}
                        @input=${(e: Event) =>
                          this._updateBgLayer({
                            saturation: parseFloat((e.target as HTMLInputElement).value),
                          })}
                      />
                    </label>
                    <label
                      >Rotation (°)
                      <input
                        type="range"
                        min="-180"
                        max="180"
                        step="1"
                        .value=${String(this._bgLayer.rotation ?? 0)}
                        @input=${(e: Event) =>
                          this._updateBgLayer({
                            rotation: parseFloat((e.target as HTMLInputElement).value),
                          })}
                      />
                    </label>
                    <label
                      >Zoom
                      <input
                        type="range"
                        min="0.25"
                        max="4"
                        step="0.05"
                        .value=${String(this._bgLayer.scale ?? 1)}
                        @input=${(e: Event) =>
                          this._updateBgLayer({
                            scale: parseFloat((e.target as HTMLInputElement).value),
                          })}
                      />
                    </label>
                    <button class="secondary" @click=${() => this._clearPhoto()}>
                      Remove photo
                    </button>
                  </div>
                `
              : null}
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
      <wled-layout-photo-editor
        @photo-apply=${(e: CustomEvent<{ file: File; layer: BackgroundLayer }>) => {
          void this._onPhotoApply(e).catch((err) => {
            this._status = formatHaError(err);
            this._busy = false;
          });
        }}
        @photo-error=${(e: CustomEvent<{ message: string }>) => {
          this._status = e.detail.message;
        }}
      ></wled-layout-photo-editor>
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
      .tool-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .tool-label {
        font-size: 0.72rem;
        opacity: 0.65;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .tool-row {
        display: flex;
        gap: 6px;
      }
      .tool-row.wrap {
        flex-wrap: wrap;
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
      .photo-tune {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.2);
      }
      .photo-tune label {
        font-size: 0.78rem;
        display: flex;
        flex-direction: column;
        gap: 4px;
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
