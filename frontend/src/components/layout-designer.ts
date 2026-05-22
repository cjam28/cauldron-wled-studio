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
import { backgroundFromLayout, type BackgroundLayer } from "../utils/background-layer.js";
import "./layout-photo-editor.js";
import type { WledLayoutPhotoEditor } from "./layout-photo-editor.js";
import {
  type DrawTool,
  type GuidePath,
  ellipseToGuide,
  suggestPlacementAnchorLed,
  lineToGuide,
  penStrokeToGuide,
  polylineToGuide,
  rectToGuide,
  snapToGuide,
} from "../utils/draw-tools.js";
import { MAX_SVG_BYTES, parseSvgToGuide } from "../utils/svg-import.js";
import { formatHaError } from "../utils/ha-error.js";
import { loadHaImage } from "../utils/ha-image.js";
import { LayoutDesignerKonvaStage } from "./layout-designer-konva.js";
import {
  cloneLayoutSnapshot,
  photoScaleToSlider,
  sliderToPhotoScale,
  sliderToViewScale,
  viewScaleToSlider,
  type LayoutDesignerSnapshot,
} from "../utils/layout-history.js";
import {
  calibDistancePrompt,
  defaultCalibDistanceInput,
  displayLengthToMeters,
  formatScalePxPerM,
  haLengthUnitLabel,
  isHaLengthMetric,
} from "../utils/ha-length-units.js";
import {
  resolveFixtureName,
  resolveLayoutName,
} from "../utils/layout-display.js";

/** Sparse corners / segment pins (user-placed). */
interface Vertex {
  x: number;
  y: number;
  anchorLed: number | null;
}

const HIT_R = 14;
const MAX_UNDO = 50;

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
  @state() private _layoutName = "Layout";
  @state() private _fixtureName = "Fixture";
  @state() private _calibActive = false;
  @state() private _calibDistance = "1";
  @state() private _canUndo = false;
  @state() private _canRedo = false;
  @state() private _zoomSlider = 50;
  /** Last “scale anchors to LED” slider position (UI only). */
  @state() private _anchorScaleEnd = -1;

  private _calibPts: Array<[number, number]> = [];
  private _undoStack: LayoutDesignerSnapshot[] = [];
  private _redoStack: LayoutDesignerSnapshot[] = [];
  private _suspendHistory = false;
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

  private _stageMount?: HTMLElement;
  private _konva?: LayoutDesignerKonvaStage;
  private _drag: { idx: number } | null = null;
  private _resizeObs?: ResizeObserver;

  protected override onPoweredConnect(): void {
    void this._loadLayout();
  }

  protected override firstUpdated(): void {
    this._stageMount =
      this.renderRoot.querySelector(".stage-mount") ?? undefined;
    if (this._stageMount) {
      const rect = this._stageMount.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      this._konva = new LayoutDesignerKonvaStage(this._stageMount, w, h);
      const el = this._konva.stage.container();
      el.addEventListener("pointerdown", this._onPointerDown);
      el.addEventListener("pointermove", this._onPointerMove);
      el.addEventListener("pointerup", this._onPointerUp);
      el.addEventListener("pointercancel", this._onPointerUp);
      el.addEventListener("dblclick", this._onDblClick);
      el.addEventListener("contextmenu", this._onContextMenu);
      el.addEventListener("wheel", this._onWheel, { passive: false });
      this._resizeObs = new ResizeObserver(() => this._onResize());
      this._resizeObs.observe(this._stageMount);
      this._onResize();
      this._syncZoomSliderFromView();
    }
  }

  protected override updated(changed: import("lit").PropertyValues): void {
    super.updated(changed);
    if (changed.has("connection") || changed.has("layoutId") || changed.has("fixtureId")) {
      void this._loadLayout();
    }
  }

  /** Block page scroll over the stage; zoom uses the rail slider. */
  private _onWheel = (ev: WheelEvent): void => {
    ev.preventDefault();
  };

  override disconnectedCallback(): void {
    this._resizeObs?.disconnect();
    const el = this._konva?.stage.container();
    if (el) {
      el.removeEventListener("pointerdown", this._onPointerDown);
      el.removeEventListener("pointermove", this._onPointerMove);
      el.removeEventListener("pointerup", this._onPointerUp);
      el.removeEventListener("pointercancel", this._onPointerUp);
      el.removeEventListener("dblclick", this._onDblClick);
      el.removeEventListener("contextmenu", this._onContextMenu);
      el.removeEventListener("wheel", this._onWheel);
    }
    this._konva?.destroy();
    this._konva = undefined;
    super.disconnectedCallback();
  }

  private _onResize(): void {
    const mount = this._stageMount;
    const stage = this._konva;
    if (!mount || !stage) return;
    const rect = mount.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    stage.resize(w, h);
    this._syncStage();
  }

  private _fitView(): void {
    this._konva?.fitView(this._vertices, this._guide?.points ?? []);
    this._syncZoomSliderFromView();
  }

  private _captureSnapshot(): LayoutDesignerSnapshot {
    return {
      vertices: this._vertices.map((v) => ({ ...v })),
      guide: this._guide
        ? {
            points: this._guide.points.map((p) => [p[0], p[1]] as [number, number]),
            closed: this._guide.closed,
            kind: this._guide.kind,
          }
        : null,
      closed: this._closed,
      bgLayer: this._bgLayer ? { ...this._bgLayer } : null,
      backgroundUrl: this._backgroundUrl,
      scalePxPerM: this._scalePxPerM,
      selectedVtx: this._selectedVtx,
      anchorInput: this._anchorInput,
    };
  }

  private _recordUndo(): void {
    if (this._suspendHistory) return;
    this._undoStack.push(this._captureSnapshot());
    if (this._undoStack.length > MAX_UNDO) this._undoStack.shift();
    this._redoStack = [];
    this._canUndo = this._undoStack.length > 0;
    this._canRedo = false;
  }

  private _applySnapshot(snap: LayoutDesignerSnapshot): void {
    const s = cloneLayoutSnapshot(snap);
    this._vertices = s.vertices;
    this._guide = s.guide;
    this._closed = s.closed;
    this._bgLayer = s.bgLayer;
    this._backgroundUrl = s.backgroundUrl;
    this._scalePxPerM = s.scalePxPerM;
    this._selectedVtx = s.selectedVtx;
    this._anchorInput = s.anchorInput;
    this._penStroke = [];
    this._shapeStart = null;
    this._lineStart = null;
    this._polylinePts = [];
    if (this._backgroundUrl) this._loadBackgroundImage();
    else this._bgImage = null;
    void this._refreshPositions();
    this._syncZoomSliderFromView();
    this._syncStage();
  }

  private _undo(): void {
    if (!this._undoStack.length) return;
    this._redoStack.push(this._captureSnapshot());
    const prev = this._undoStack.pop()!;
    this._suspendHistory = true;
    this._applySnapshot(prev);
    this._suspendHistory = false;
    this._canUndo = this._undoStack.length > 0;
    this._canRedo = this._redoStack.length > 0;
    this._status = "Undo";
  }

  private _redo(): void {
    if (!this._redoStack.length) return;
    this._undoStack.push(this._captureSnapshot());
    const next = this._redoStack.pop()!;
    this._suspendHistory = true;
    this._applySnapshot(next);
    this._suspendHistory = false;
    this._canUndo = this._undoStack.length > 0;
    this._canRedo = this._redoStack.length > 0;
    this._status = "Redo";
  }

  private _syncZoomSliderFromView(): void {
    if (this._tool === "photo" && this._bgLayer) {
      this._zoomSlider = photoScaleToSlider(this._bgLayer.scale ?? 1);
      return;
    }
    if (this._konva) {
      this._zoomSlider = viewScaleToSlider(this._konva.viewScale);
    }
  }

  private _onZoomSlider(ev: Event): void {
    const slider = parseInt((ev.target as HTMLInputElement).value, 10);
    if (isNaN(slider)) return;
    this._zoomSlider = slider;
    if (this._tool === "photo" && this._bgLayer) {
      this._bgLayer = { ...this._bgLayer, scale: sliderToPhotoScale(slider) };
    } else if (this._konva) {
      this._konva.setViewScale(sliderToViewScale(slider));
    }
    this._syncStage();
  }

  private _nudgeZoom(factor: number): void {
    if (this._tool === "photo" && this._bgLayer) {
      const next = Math.max(0.25, Math.min(4, (this._bgLayer.scale ?? 1) * factor));
      this._bgLayer = { ...this._bgLayer, scale: next };
      this._zoomSlider = photoScaleToSlider(next);
    } else if (this._konva) {
      const next = Math.max(0.15, Math.min(8, this._konva.viewScale * factor));
      this._konva.setViewScale(next);
      this._zoomSlider = viewScaleToSlider(next);
    }
    this._syncStage();
  }

  private _onKeyDown = (ev: KeyboardEvent): void => {
    const mod = ev.metaKey || ev.ctrlKey;
    if (!mod) return;
    if (ev.key === "z" && !ev.shiftKey) {
      ev.preventDefault();
      this._undo();
    } else if (ev.key === "z" && ev.shiftKey) {
      ev.preventDefault();
      this._redo();
    } else if (ev.key === "y") {
      ev.preventDefault();
      this._redo();
    }
  };

  private _pointerModel(ev?: PointerEvent | MouseEvent | WheelEvent): [number, number] | null {
    return this._konva?.getModelPointer(ev) ?? null;
  }

  private _stageContainer(): HTMLElement | undefined {
    return this._konva?.stage.container();
  }

  private _isClosingDuplicate(i: number): boolean {
    if (i <= 0 || this._vertices.length < 3) return false;
    const last = this._vertices.length - 1;
    if (i !== last) return false;
    const a = this._vertices[0];
    const b = this._vertices[last];
    return Math.hypot(a.x - b.x, a.y - b.y) < 0.5;
  }

  private _hitVertex(mx: number, my: number): number {
    const scale = this._konva?.viewScaleSafe ?? 1;
    const hitR = HIT_R / scale;
    let best = -1;
    let bestDist = hitR + 1;
    for (let i = 0; i < this._vertices.length; i++) {
      if (this._isClosingDuplicate(i)) continue;
      const v = this._vertices[i];
      const d = Math.hypot(mx - v.x, my - v.y);
      if (d > hitR) continue;
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
    const thresh = 24 / (this._konva?.viewScaleSafe ?? 1);
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
    const led = suggestPlacementAnchorLed(
      this._vertices.length,
      snap.t,
      this.pixelCount
    );
    this._recordUndo();
    this._vertices = [
      ...this._vertices,
      { x: snap.x, y: snap.y, anchorLed: led },
    ];
    this._selectedVtx = this._vertices.length - 1;
    this._anchorInput = String(led);
    this._status =
      this._selectedVtx === 0
        ? `Placed v0 @ LED 0 (start) — next clicks use position along guide`
        : `Placed v${this._selectedVtx} @ LED ${led} (${Math.round(snap.t * 100)}% along guide)`;
    void this._refreshPositions();
    this._syncStage();
  }

  private _onPointerDown = (ev: PointerEvent): void => {
    ev.preventDefault();
    const pos = this._pointerModel(ev);
    if (!pos) return;
    const [mx, my] = pos;

    if (this._calibActive) {
      this._calibPts.push([mx, my]);
      if (this._calibPts.length >= 2) this._applyCalibration();
      this._syncStage();
      return;
    }

    if (this._tool === "photo" && this._bgLayer) {
      const st = this._konva?.stage;
      const pointer = st?.getPointerPosition();
      this._photoPan = {
        px: pointer?.x ?? 0,
        py: pointer?.y ?? 0,
        ox: this._bgLayer.offsetX ?? 0,
        oy: this._bgLayer.offsetY ?? 0,
      };
      this._stageContainer()?.setPointerCapture(ev.pointerId);
      return;
    }

    if (this._tool === "place") {
      const hit = this._hitVertex(mx, my);
      if (hit >= 0) {
        this._selectedVtx = hit;
        this._anchorInput = String(this._vertices[hit].anchorLed ?? "");
      } else {
        this._placeVertexOnGuide(mx, my);
      }
      this._syncStage();
      return;
    }

    if (this._tool === "pen") {
      this._recordUndo();
      this._beginNewGuideDrawing();
      this._penStroke = [[mx, my]];
      this._stageContainer()?.setPointerCapture(ev.pointerId);
      this._syncStage();
      return;
    }

    if (this._tool === "line") {
      if (!this._lineStart) {
        this._recordUndo();
        this._beginNewGuideDrawing();
        this._lineStart = [mx, my];
        this._status = "Line: click end point";
      } else {
        this._guide = lineToGuide(this._lineStart, [mx, my]);
        this._lineStart = null;
        this._status = "Line guide ready — switch to Place vertices";
      }
      this._syncStage();
      return;
    }

    if (this._tool === "rect" || this._tool === "ellipse") {
      this._recordUndo();
      this._beginNewGuideDrawing();
      this._shapeStart = [mx, my];
      this._status =
        this._tool === "rect"
          ? "Rectangle: drag to size, release to finish"
          : "Ellipse: drag to size, release to finish";
      this._stageContainer()?.setPointerCapture(ev.pointerId);
      this._syncStage();
      return;
    }

    if (this._tool === "polyline") {
      if (this._polylinePts.length === 0) {
        this._recordUndo();
        this._beginNewGuideDrawing();
      }
      this._polylinePts = [...this._polylinePts, [mx, my]];
      this._status = `Polyline: ${this._polylinePts.length} pts — double-click to finish`;
      this._syncStage();
      return;
    }

    const idx = this._hitVertex(mx, my);
    if (idx >= 0) {
      this._recordUndo();
      this._selectedVtx = idx;
      this._anchorInput = String(this._vertices[idx].anchorLed ?? "");
      this._drag = { idx };
      this._stageContainer()?.setPointerCapture(ev.pointerId);
    } else {
      this._selectedVtx = -1;
    }
    this._syncStage();
  };

  private _onPointerMove = (ev: PointerEvent): void => {
    const pos = this._pointerModel(ev);
    if (!pos) return;
    const [mx, my] = pos;

    if (this._photoPan && this._bgLayer && this._konva) {
      this._konva.updatePointerFromEvent(ev);
      const pointer = this._konva.stage.getPointerPosition();
      if (!pointer) return;
      const w = this._konva.stage.width();
      const h = this._konva.stage.height();
      const dx = (pointer.x - this._photoPan.px) / w;
      const dy = (pointer.y - this._photoPan.py) / h;
      this._bgLayer = {
        ...this._bgLayer,
        offsetX: this._photoPan.ox + dx,
        offsetY: this._photoPan.oy + dy,
      };
      this._syncStage();
      return;
    }

    if (this._tool === "pen" && this._penStroke.length > 0) {
      const last = this._penStroke[this._penStroke.length - 1];
      const minDist = 2 / (this._konva?.viewScaleSafe ?? 1);
      if (Math.hypot(mx - last[0], my - last[1]) > minDist) {
        this._penStroke = [...this._penStroke, [mx, my]];
        this._syncStage();
      }
      return;
    }

    if (this._shapeStart && (this._tool === "rect" || this._tool === "ellipse")) {
      const [x0, y0] = this._shapeStart;
      const preview =
        this._tool === "rect"
          ? rectToGuide(x0, y0, mx, my)
          : ellipseToGuide(
              (x0 + mx) / 2,
              (y0 + my) / 2,
              Math.abs(mx - x0) / 2,
              Math.abs(my - y0) / 2
            );
      this._syncStage(preview);
      return;
    }

    if (!this._drag) return;
    const verts = [...this._vertices];
    verts[this._drag.idx] = { ...verts[this._drag.idx], x: mx, y: my };
    this._vertices = verts;
    this._syncStage();
  };

  private _onPointerUp = (ev: PointerEvent): void => {
    if (this._photoPan) {
      this._stageContainer()?.releasePointerCapture(ev.pointerId);
      this._photoPan = null;
      return;
    }
    if (this._tool === "pen" && this._penStroke.length > 0) {
      this._stageContainer()?.releasePointerCapture(ev.pointerId);
      this._finishPenGuide();
      return;
    }
    if (this._shapeStart && (this._tool === "rect" || this._tool === "ellipse")) {
      const pos = this._pointerModel(ev);
      if (!pos) return;
      const [mx, my] = pos;
      const [x0, y0] = this._shapeStart;
      const minDrag = 4 / (this._konva?.viewScaleSafe ?? 1);
      if (Math.hypot(mx - x0, my - y0) < minDrag) {
        this._stageContainer()?.releasePointerCapture(ev.pointerId);
        this._status =
          this._tool === "rect"
            ? "Rectangle: drag to size (release was too short)"
            : "Ellipse: drag to size (release was too short)";
        this._syncStage();
        return;
      }
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
      this._stageContainer()?.releasePointerCapture(ev.pointerId);
      this._syncStage();
      return;
    }
    if (this._drag) {
      this._stageContainer()?.releasePointerCapture(ev.pointerId);
      this._drag = null;
      void this._refreshPositions();
    }
  };

  private _finishPenGuide(): void {
    const stroke = this._penStroke;
    this._penStroke = [];
    if (stroke.length >= 2) {
      this._guide = penStrokeToGuide(stroke, (x, y) => [x, y], this._closed);
    }
    this._status =
      this._guide && this._guide.points.length >= 2
        ? "Smooth guide drawn — switch to Place vertices and click along the line"
        : "Stroke too short";
    this._syncStage();
  }

  private _finishPolyline(): void {
    if (this._polylinePts.length < 2) {
      this._status = "Need at least 2 points";
      return;
    }
    this._recordUndo();
    this._guide = polylineToGuide(this._polylinePts, this._closed);
    this._polylinePts = [];
    this._status = "Polyline guide ready — Place vertices along the path";
    this._syncStage();
  }

  private _lengthMetric(): boolean {
    return isHaLengthMetric(this.hass);
  }

  private _applyCalibration(): void {
    if (this._calibPts.length < 2) return;
    const [a, b] = this._calibPts;
    const px = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const display = parseFloat(this._calibDistance);
    const meters = displayLengthToMeters(display, this._lengthMetric());
    if (px > 0 && meters > 0) {
      this._scalePxPerM = px / meters;
      this._status = `Scale: ${formatScalePxPerM(this._scalePxPerM, this._lengthMetric())}`;
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
    const pos = this._pointerModel(ev);
    if (!pos) return;
    const [mx, my] = pos;
    if (this._hitVertex(mx, my) >= 0) return;
    this._recordUndo();
    this._vertices = [...this._vertices, { x: mx, y: my, anchorLed: null }];
    this._selectedVtx = this._vertices.length - 1;
    this._anchorInput = "";
    this._syncStage();
    void this._refreshPositions();
  };

  private _onContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault();
    const pos = this._pointerModel(ev);
    if (!pos) return;
    const hit = this._hitVertex(pos[0], pos[1]);
    if (hit < 0) return;
    this._recordUndo();
    this._vertices = this._vertices.filter((_, i) => i !== hit);
    if (this._selectedVtx === hit) this._selectedVtx = -1;
    else if (this._selectedVtx > hit) this._selectedVtx--;
    this._syncStage();
    void this._refreshPositions();
  };

  private _syncStage(guidePreview: GuidePath | null = null): void {
    const el = this._konva?.stage.container();
    if (el) {
      el.style.cursor =
        this._tool === "photo" && this._bgLayer ? "grab" : "crosshair";
    }
    this._konva?.redraw({
      vertices: this._vertices,
      selectedVtx: this._selectedVtx,
      guide: this._guide,
      guidePreview,
      ledPositions: this._ledPositions,
      closed: this._closed,
      polylinePts: this._polylinePts,
      penStroke: this._penStroke,
      calibPts: this._calibPts,
      bgImage: this._bgImage,
      bgLayer: this._bgLayer,
      tool: this._tool,
    });
  }

  private async _loadLayout(): Promise<void> {
    if (!this.connection || !this.controllerId || !this.layoutId) return;
    this._suspendHistory = true;
    this._undoStack = [];
    this._redoStack = [];
    this._canUndo = false;
    this._canRedo = false;
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
      this._layoutName = resolveLayoutName(layout.name, this.layoutId);
      this._fixtureName = resolveFixtureName(
        String(fixture.name ?? ""),
        this.fixtureId || String(fixture.id ?? "fixture-0")
      );
      this._loadBackgroundImage();

      this._fitView();
      await this._refreshPositions();
      this._syncStage();
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._suspendHistory = false;
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
      this._syncStage();
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
      name: this._layoutName,
      pixel_count: this.pixelCount,
      background_url: this._backgroundUrl,
      background: this._bgLayer,
      scale_px_per_m: this._scalePxPerM,
      fixtures: [
        {
          id: this.fixtureId || "fixture-0",
          name: this._fixtureName,
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
    if (file.size > MAX_SVG_BYTES) {
      this._status = `SVG too large (max ${MAX_SVG_BYTES / 1_000_000} MB)`;
      return;
    }
    this._busy = true;
    this._status = "Importing SVG…";
    try {
      const text = await file.text();
      await new Promise<void>((r) => setTimeout(r, 0));
      this._recordUndo();
      this._beginNewGuideDrawing();
      this._guide = parseSvgToGuide(text);
      this._status = `SVG guide loaded (${this._guide.points.length} pts) — Place vertices along the path`;
      this._fitView();
      this._syncStage();
    } catch (err) {
      this._status = err instanceof Error ? err.message : String(err);
    } finally {
      this._busy = false;
    }
  }

  private _clearGuide(): void {
    this._recordUndo();
    this._guide = null;
    this._polylinePts = [];
    this._lineStart = null;
    this._beginNewGuideDrawing();
    this._syncStage();
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
        this._syncStage();
      })
      .catch((err) => {
        this._bgImage = null;
        this._status = formatHaError(err);
        this._syncStage();
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
      this._recordUndo();
      this._vertices = importSegmentStarts(this._vertices, starts, this._closed);
      this._status = `Imported ${starts.length} segment boundary(ies) from WLED`;
      void this._refreshPositions();
      this._syncStage();
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
      this._recordUndo();
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
    this._syncStage();
  }

  private _clearPhoto(): void {
    this._recordUndo();
    this._bgLayer = null;
    this._backgroundUrl = null;
    this._bgImage = null;
    this._syncStage();
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
    this._recordUndo();
    const val = this._anchorInput.trim();
    const led = val === "" ? null : parseInt(val, 10);
    if (led !== null && (isNaN(led) || led < 0 || led >= this.pixelCount)) return;
    const verts = [...this._vertices];
    verts[idx] = { ...verts[idx], anchorLed: led };
    this._vertices = verts;
    this._syncStage();
  }

  private _anchorScaleMax(): number {
    return Math.max(0, this.pixelCount - 1);
  }

  private _anchorScaleSliderValue(): number {
    const max = this._anchorScaleMax();
    if (this._anchorScaleEnd < 0) return max;
    return Math.min(max, this._anchorScaleEnd);
  }

  private _onAnchorScaleSlider(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const endLed = parseInt(input.value, 10);
    if (isNaN(endLed) || this._vertices.length === 0) return;
    this._recordUndo();
    const max = this._anchorScaleMax();
    const verts = [...this._vertices];
    for (let i = 0; i < verts.length; i++) {
      const a = verts[i].anchorLed;
      if (a === null) continue;
      const t = max > 0 ? a / max : 0;
      const newLed = Math.round(lerp(0, endLed, t));
      verts[i] = { ...verts[i], anchorLed: newLed };
    }
    this._vertices = verts;
    this._anchorScaleEnd = endLed;
    this._status = `Anchors rescaled to LEDs 0–${endLed} (spacing preserved)`;
    void this._refreshPositions();
    this._syncStage();
  }

  private _zoomLabel(): string {
    if (this._tool === "photo" && this._bgLayer) {
      return `${Math.round((this._bgLayer.scale ?? 1) * 100)}%`;
    }
    return `${Math.round((this._konva?.viewScale ?? 1) * 100)}%`;
  }

  protected override render() {
    const sel = this._vertices[this._selectedVtx];
    const zoomCaption =
      this._tool === "photo" && this._bgLayer ? "Photo" : "View";
    return html`
      <div class="designer-root" tabindex="0" @keydown=${this._onKeyDown}>
        <header class="edit-toolbar">
          <div class="toolbar-cluster">
            <span class="cluster-label">Edit</span>
            <div class="tool-row">
              <button
                class=${this._tool === "select" ? "tool active" : "tool"}
                @click=${() => {
                  this._tool = "select";
                  this._syncZoomSliderFromView();
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
                  this._syncZoomSliderFromView();
                }}
              >
                Photo
              </button>
            </div>
          </div>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster">
            <span class="cluster-label">Draw</span>
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
                Rect
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

          <label class="check-row compact">
            <input
              type="checkbox"
              .checked=${this._closed}
              @change=${(e: Event) => {
                this._recordUndo();
                this._closed = (e.target as HTMLInputElement).checked;
                this._syncStage();
                void this._refreshPositions();
              }}
            />
            Close path
          </label>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster stage-actions">
            <button
              type="button"
              class="secondary small"
              ?disabled=${!this._canUndo}
              title="Undo (Ctrl+Z)"
              @click=${() => this._undo()}
            >
              Undo
            </button>
            <button
              type="button"
              class="secondary small"
              ?disabled=${!this._canRedo}
              title="Redo (Ctrl+Shift+Z)"
              @click=${() => this._redo()}
            >
              Redo
            </button>
            <button
              type="button"
              class="secondary small"
              @click=${() => {
                this._fitView();
                this._syncStage();
              }}
            >
              Fit view
            </button>
          </div>

          <div class="toolbar-divider" aria-hidden="true"></div>

          <div class="toolbar-cluster file-actions">
            <button class="secondary small" ?disabled=${this._busy} @click=${() => this._importFromWled()}>
              Import WLED
            </button>
            <label class="file-btn secondary small">
              Photo…
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,.heic"
                capture="environment"
                hidden
                @change=${this._onBackgroundFile}
              />
            </label>
            <label class="file-btn secondary small">
              SVG…
              <input
                type="file"
                accept="image/svg+xml,.svg"
                hidden
                @change=${this._onSvgFile}
              />
            </label>
            <button class="secondary small" @click=${() => this._clearGuide()}>
              Clear guide
            </button>
            ${this._tool === "polyline" && this._polylinePts.length >= 2
              ? html`
                  <button class="secondary small" @click=${() => this._finishPolyline()}>
                    Finish poly
                  </button>
                `
              : null}
            <button
              class="secondary small"
              ?disabled=${this._busy}
              @click=${() => {
                this._calibActive = true;
                this._calibPts = [];
                this._calibDistance = defaultCalibDistanceInput(this.hass);
                this._status = calibDistancePrompt(this.hass);
              }}
            >
              Calibrate
            </button>
          </div>

          ${sel !== undefined
            ? html`
                <div class="toolbar-cluster anchor-inline">
                  <label>
                    v${this._selectedVtx} LED
                    <input
                      type="number"
                      min="0"
                      max=${this.pixelCount - 1}
                      .value=${this._anchorInput}
                      @input=${(e: Event) => {
                        this._anchorInput = (e.target as HTMLInputElement).value;
                      }}
                      @change=${() => this._setAnchorLed()}
                    />
                  </label>
                  <button class="secondary small" @click=${() => this._setAnchorLed()}>
                    Set
                  </button>
                </div>
              `
            : null}

          <div class="toolbar-cluster scale-inline">
            <label title="Rescale all pinned anchors to LEDs 0…N (spacing preserved)">
              Scale anchors →
              <input
                type="range"
                min="0"
                max=${this._anchorScaleMax()}
                .value=${String(this._anchorScaleSliderValue())}
                @change=${this._onAnchorScaleSlider}
              />
              <span class="scale-val">${this._anchorScaleSliderValue()}</span>
            </label>
          </div>

          <div class="toolbar-spacer"></div>

          <details class="help-details">
            <summary>Help</summary>
            <p>Draw a purple guide → <strong>Place ●</strong>: first corner LED 0, then LED from click position along the path → Save.</p>
          </details>

          <button
            class="primary save-btn"
            ?disabled=${this._busy || this._vertices.length < 2}
            @click=${() => this._save()}
          >
            Save layout
          </button>
        </header>

        ${this._calibActive
          ? html`
              <div class="context-bar">
                <label>
                  Distance (${haLengthUnitLabel(this.hass)})
                  <input
                    type="number"
                    min=${this._lengthMetric() ? "0.01" : "0.1"}
                    step=${this._lengthMetric() ? "0.01" : "0.1"}
                    .value=${this._calibDistance}
                    @input=${(e: Event) => {
                      this._calibDistance = (e.target as HTMLInputElement).value;
                    }}
                  />
                </label>
              </div>
            `
          : null}
        ${this._bgLayer && this._tool === "photo"
          ? html`
              <div class="context-bar photo-tune">
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
                  >Rotation
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
                <button class="secondary small" @click=${() => this._clearPhoto()}>
                  Remove photo
                </button>
              </div>
            `
          : null}

        ${this._status
          ? html`<p class="status-bar">${this._status}</p>`
          : null}
        ${this._scalePxPerM
          ? html`<p class="status-bar meta">
              Scale: ${formatScalePxPerM(this._scalePxPerM, this._lengthMetric())}
            </p>`
          : null}

        <div class="split-body">
        <div class="workspace">
          <aside class="zoom-rail" aria-label="Zoom">
            <button
              type="button"
              class="zoom-btn"
              title="Zoom in"
              @click=${() => this._nudgeZoom(1.2)}
            >
              +
            </button>
            <input
              type="range"
              class="zoom-slider"
              min="0"
              max="100"
              .value=${String(this._zoomSlider)}
              @input=${this._onZoomSlider}
              aria-label="${zoomCaption} zoom"
            />
            <button
              type="button"
              class="zoom-btn"
              title="Zoom out"
              @click=${() => this._nudgeZoom(1 / 1.2)}
            >
              −
            </button>
            <span class="zoom-pct">${this._zoomLabel()}</span>
            <span class="zoom-cap">${zoomCaption}</span>
          </aside>
          <div class="canvas-wrap">
            <div class="stage-mount"></div>
          </div>
        </div>

        <div class="preview-pane">
          <slot name="preview"></slot>
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
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
      }
      .designer-root {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto 1fr;
        gap: 10px;
        height: 100%;
        min-height: 0;
        outline: none;
      }
      .split-body {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        min-height: 0;
        height: 100%;
        overflow: hidden;
      }
      .edit-toolbar {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px 10px;
        padding: 10px 12px;
        border-radius: 10px;
        background: var(--card-background-color, #1f2937);
        border: 1px solid var(--divider-color, #374151);
      }
      .toolbar-cluster {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .cluster-label {
        font-size: 0.68rem;
        opacity: 0.55;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        flex-shrink: 0;
      }
      .toolbar-divider {
        width: 1px;
        align-self: stretch;
        min-height: 28px;
        background: var(--divider-color, #374151);
        flex-shrink: 0;
      }
      .toolbar-spacer {
        flex: 1;
        min-width: 8px;
      }
      .context-bar {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px 14px;
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid var(--divider-color, #374151);
      }
      .context-bar label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.78rem;
      }
      .context-bar input[type="range"] {
        width: 88px;
      }
      .photo-tune {
        gap: 12px;
      }
      .status-bar {
        grid-column: 1 / -1;
        margin: 0;
        font-size: 0.78rem;
        opacity: 0.85;
        padding: 0 4px;
      }
      .status-bar.meta {
        opacity: 0.65;
        margin-top: -6px;
      }
      .workspace {
        display: flex;
        flex-direction: row;
        min-height: 0;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid var(--divider-color, #374151);
      }
      .preview-pane {
        display: flex;
        flex-direction: column;
        min-height: 0;
        height: 100%;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--card-background-color, #111827);
        padding: 8px;
        box-sizing: border-box;
      }
      .preview-pane ::slotted(*) {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .zoom-rail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 40px;
        flex-shrink: 0;
        padding: 8px 4px;
        background: rgba(0, 0, 0, 0.45);
        border-radius: 8px 0 0 8px;
      }
      .zoom-btn {
        width: 28px;
        height: 28px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: rgba(255, 255, 255, 0.06);
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        padding: 0;
      }
      .zoom-btn:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .zoom-slider {
        writing-mode: vertical-lr;
        direction: rtl;
        height: min(28vh, 200px);
        width: 28px;
        margin: 4px 0;
        accent-color: var(--primary-color, #6366f1);
      }
      .zoom-pct {
        font-size: 0.65rem;
        font-variant-numeric: tabular-nums;
        opacity: 0.85;
      }
      .zoom-cap {
        font-size: 0.6rem;
        opacity: 0.5;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .canvas-wrap {
        position: relative;
        flex: 1;
        overflow: hidden;
        background: #111827;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .stage-mount {
        flex: 1;
        width: 100%;
        min-height: 200px;
        cursor: crosshair;
        touch-action: none;
      }
      .stage-mount > div {
        width: 100% !important;
        height: 100% !important;
      }
      .tool-row {
        display: flex;
        gap: 4px;
        flex-wrap: wrap;
      }
      .tool {
        padding: 5px 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }
      .tool.active {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: transparent;
      }
      .check-row.compact {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        white-space: nowrap;
        margin: 0;
      }
      .secondary,
      .file-btn {
        padding: 5px 10px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: rgba(255, 255, 255, 0.04);
        color: inherit;
        cursor: pointer;
        font-size: 0.78rem;
        white-space: nowrap;
      }
      .file-btn input {
        display: none;
      }
      .anchor-inline {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .anchor-inline label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        margin: 0;
      }
      .anchor-inline input[type="number"] {
        width: 4.5rem;
        padding: 4px 6px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, #374151);
        background: var(--primary-background-color, #111827);
        color: inherit;
        font-size: 0.85rem;
      }
      .scale-inline label {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.75rem;
        margin: 0;
        white-space: nowrap;
      }
      .scale-inline input[type="range"] {
        width: 100px;
      }
      .scale-val {
        font-variant-numeric: tabular-nums;
        min-width: 2ch;
      }
      .help-details {
        font-size: 0.75rem;
        opacity: 0.85;
      }
      .help-details summary {
        cursor: pointer;
        list-style: none;
      }
      .help-details p {
        margin: 6px 0 0;
        max-width: 280px;
        line-height: 1.4;
      }
      .save-btn {
        flex-shrink: 0;
      }
      .primary,
      .small {
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        cursor: pointer;
        font-size: 0.82rem;
      }
      .small {
        padding: 5px 10px;
        font-size: 0.76rem;
      }
      .primary:disabled {
        opacity: 0.45;
        cursor: default;
      }
      @container wled-studio (max-width: 720px) {
        .split-body {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr minmax(200px, 36vh);
        }
        .workspace {
          min-height: min(42vh, 360px);
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "wled-layout-designer": WledLayoutDesigner;
  }
}
