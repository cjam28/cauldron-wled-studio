/**
 * Konva rendering surface for the layout designer (Lit hosts toolbar/state).
 */

import Konva from "konva";
import type { DrawTool, GuidePath } from "../utils/draw-tools.js";
import { polylineToGuide } from "../utils/draw-tools.js";
import {
  drawBackgroundLayer,
  type BackgroundLayer,
} from "../utils/background-layer.js";
import type { LedPosition } from "../api/layout.js";

export interface LayoutVertex {
  x: number;
  y: number;
  anchorLed: number | null;
}

export interface DesignerStageSnapshot {
  vertices: LayoutVertex[];
  selectedVtx: number;
  guide: GuidePath | null;
  guidePreview: GuidePath | null;
  ledPositions: LedPosition[];
  closed: boolean;
  polylinePts: Array<[number, number]>;
  /** Model-space points while drawing freehand */
  penStroke: Array<[number, number]>;
  calibPts: Array<[number, number]>;
  bgImage: HTMLImageElement | null;
  bgLayer: BackgroundLayer | null;
  tool: DrawTool;
}

const ANCHOR_COLOR = "#f59e0b";
const VERTEX_COLOR = "#6366f1";
const EDGE_COLOR = "rgba(99,102,241,0.6)";
const DOT_COLOR = "rgba(120,220,120,0.65)";
const VERTEX_R = 7;
const ANCHOR_R = 9;
const DOT_R = 3;

function guideToLinePoints(guide: GuidePath): number[] {
  const pts: number[] = [];
  for (const [x, y] of guide.points) {
    pts.push(x, y);
  }
  return pts;
}

function isClosingDuplicate(vertices: LayoutVertex[], i: number): boolean {
  if (i <= 0 || vertices.length < 3) return false;
  const last = vertices.length - 1;
  if (i !== last) return false;
  const a = vertices[0];
  const b = vertices[last];
  return Math.hypot(a.x - b.x, a.y - b.y) < 0.5;
}

export class LayoutDesignerKonvaStage {
  readonly stage: Konva.Stage;
  private readonly _layer: Konva.Layer;
  private readonly _bgCanvas: HTMLCanvasElement;
  private readonly _bgImage: Konva.Image;
  private readonly _world: Konva.Group;
  private readonly _leds: Konva.Group;
  private readonly _guide: Konva.Group;
  private readonly _edges: Konva.Group;
  private readonly _vertices: Konva.Group;
  private readonly _overlay: Konva.Group;
  private readonly _hint: Konva.Text;

  viewOx = 40;
  viewOy = 40;
  viewScale = 1;

  constructor(container: HTMLElement, width: number, height: number) {
    this.stage = new Konva.Stage({
      container: container as HTMLDivElement,
      width,
      height,
    });
    this._layer = new Konva.Layer();
    this._bgCanvas = document.createElement("canvas");
    this._bgImage = new Konva.Image({
      image: this._bgCanvas,
      listening: false,
    });
    this._world = new Konva.Group();
    this._leds = new Konva.Group({ listening: false });
    this._guide = new Konva.Group({ listening: false });
    this._edges = new Konva.Group({ listening: false });
    this._vertices = new Konva.Group();
    this._overlay = new Konva.Group({ listening: false });
    this._hint = new Konva.Text({
      text: "Draw a shape, then use Place vertices",
      fontSize: 14,
      fill: "rgba(255,255,255,0.25)",
      align: "center",
      verticalAlign: "middle",
      width: width,
      height: height,
      listening: false,
    });

    this._world.add(this._leds);
    this._world.add(this._guide);
    this._world.add(this._edges);
    this._world.add(this._vertices);
    this._world.add(this._overlay);
    this._layer.add(this._bgImage);
    this._layer.add(this._world);
    this._layer.add(this._hint);
    this.stage.add(this._layer);
    this._applyWorldTransform();
  }

  resize(width: number, height: number): void {
    this.stage.width(width);
    this.stage.height(height);
    this._hint.width(width);
    this._hint.height(height);
    this._hint.position({ x: 0, y: height / 2 - 10 });
  }

  destroy(): void {
    this.stage.destroy();
  }

  /** Pointer position in layout model coordinates. */
  getModelPointer(): [number, number] | null {
    const pos = this._world.getRelativePointerPosition();
    if (!pos) return null;
    return [pos.x, pos.y];
  }

  get viewScaleSafe(): number {
    return Math.max(this.viewScale, 0.01);
  }

  private _applyWorldTransform(): void {
    this._world.position({ x: this.viewOx, y: this.viewOy });
    this._world.scale({ x: this.viewScale, y: this.viewScale });
  }

  fitView(vertices: LayoutVertex[], guidePoints: Array<[number, number]>): void {
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
    for (const v of vertices) addPt(v.x, v.y);
    for (const p of guidePoints) addPt(p[0], p[1]);
    const w = this.stage.width();
    const h = this.stage.height();
    if (!Number.isFinite(minX)) {
      this.viewOx = 40;
      this.viewOy = 40;
      this.viewScale = 1;
      this._applyWorldTransform();
      return;
    }
    const pad = 48;
    const rx = maxX - minX || 100;
    const ry = maxY - minY || 100;
    this.viewScale = Math.min((w - pad * 2) / rx, (h - pad * 2) / ry, 4);
    this.viewOx = pad - minX * this.viewScale;
    this.viewOy = pad - minY * this.viewScale;
    this._applyWorldTransform();
  }

  /** Zoom world view toward stage pointer (not photo layer scale). */
  zoomAtPointer(deltaY: number, factor = 1.08): void {
    const pointer = this.stage.getPointerPosition();
    if (!pointer) return;
    const oldScale = this.viewScale;
    const newScale = Math.max(
      0.15,
      Math.min(8, deltaY < 0 ? oldScale * factor : oldScale / factor)
    );
    const mousePointTo = {
      x: (pointer.x - this.viewOx) / oldScale,
      y: (pointer.y - this.viewOy) / oldScale,
    };
    this.viewScale = newScale;
    this.viewOx = pointer.x - mousePointTo.x * newScale;
    this.viewOy = pointer.y - mousePointTo.y * newScale;
    this._applyWorldTransform();
  }

  redraw(snap: DesignerStageSnapshot): void {
    const w = this.stage.width();
    const h = this.stage.height();
    this._layer.getStage()?.container().style.setProperty("background", "#111827");

    this._drawBackground(w, h, snap.bgImage, snap.bgLayer);

    this._leds.destroyChildren();
    this._guide.destroyChildren();
    this._edges.destroyChildren();
    this._vertices.destroyChildren();
    this._overlay.destroyChildren();

    const strokeW = 2 / this.viewScaleSafe;
    const dash = [8 / this.viewScaleSafe, 6 / this.viewScaleSafe];
    const addGuideLine = (guide: GuidePath | null, opacity = 0.75) => {
      if (!guide || guide.points.length < 2) return;
      this._guide.add(
        new Konva.Line({
          points: guideToLinePoints(guide),
          stroke: `rgba(168,85,247,${opacity})`,
          strokeWidth: 3 / this.viewScaleSafe,
          lineCap: "round",
          lineJoin: "round",
          dash,
          closed: guide.closed,
          listening: false,
        })
      );
    };

    addGuideLine(snap.guide);
    addGuideLine(snap.guidePreview, 0.55);
    if (snap.polylinePts.length >= 2) {
      addGuideLine(polylineToGuide(snap.polylinePts, false), 0.75);
    }
    if (snap.penStroke.length >= 2) {
      const flat: number[] = [];
      for (const [x, y] of snap.penStroke) flat.push(x, y);
      this._overlay.add(
        new Konva.Line({
          points: flat,
          stroke: "rgba(168,85,247,0.5)",
          strokeWidth: strokeW,
          lineCap: "round",
          lineJoin: "round",
          listening: false,
        })
      );
    }

    const verts = snap.vertices;
    const showHint = verts.length === 0 && !snap.guide;
    this._hint.visible(showHint);

    const hasPhoto = Boolean(snap.bgImage?.naturalWidth);
    for (const { x, y } of snap.ledPositions) {
      this._leds.add(
        new Konva.Circle({
          x,
          y,
          radius: (hasPhoto ? DOT_R + 1 : DOT_R) / this.viewScaleSafe,
          fill: DOT_COLOR,
          shadowBlur: hasPhoto ? 10 / this.viewScaleSafe : 0,
          shadowColor: "rgba(120,255,160,0.85)",
          listening: false,
        })
      );
    }

    if (verts.length >= 2) {
      const drawVerts =
        verts.length >= 2 && isClosingDuplicate(verts, verts.length - 1)
          ? verts.slice(0, -1)
          : verts;
      if (drawVerts.length >= 2) {
        const edgePts: number[] = [];
        for (const v of drawVerts) edgePts.push(v.x, v.y);
        this._edges.add(
          new Konva.Line({
            points: edgePts,
            stroke: EDGE_COLOR,
            strokeWidth: strokeW,
            closed: snap.closed && drawVerts.length >= 3,
            listening: false,
          })
        );
      }
    }

    for (const [mx, my] of snap.calibPts) {
      this._overlay.add(
        new Konva.Circle({
          x: mx,
          y: my,
          radius: 6 / this.viewScaleSafe,
          fill: "#22d3ee",
          listening: false,
        })
      );
    }

    for (let i = 0; i < verts.length; i++) {
      if (isClosingDuplicate(verts, i)) continue;
      const v = verts[i];
      const isAnchor = v.anchorLed !== null;
      const isSelected = i === snap.selectedVtx;
      const r = (isAnchor ? ANCHOR_R : VERTEX_R) / this.viewScaleSafe;
      const circle = new Konva.Circle({
        x: v.x,
        y: v.y,
        radius: r,
        fill: isSelected ? "white" : isAnchor ? ANCHOR_COLOR : VERTEX_COLOR,
        stroke: isSelected ? VERTEX_COLOR : undefined,
        strokeWidth: isSelected ? 2 / this.viewScaleSafe : 0,
        listening: snap.tool === "select" || snap.tool === "place",
        name: `vertex-${i}`,
      });
      this._vertices.add(circle);

      if (isAnchor && v.anchorLed !== null) {
        this._vertices.add(
          new Konva.Text({
            x: v.x,
            y: v.y,
            text: String(v.anchorLed),
            fontSize: Math.max(9, r - 1) / this.viewScaleSafe,
            fontStyle: "bold",
            fontFamily: "monospace",
            fill: "#111",
            align: "center",
            verticalAlign: "middle",
            offsetX: 0,
            offsetY: (Math.max(9, r - 1) / this.viewScaleSafe) * 0.35,
            listening: false,
          })
        );
      }

      this._vertices.add(
        new Konva.Text({
          x: v.x + r + 2 / this.viewScaleSafe,
          y: v.y - r - 2 / this.viewScaleSafe,
          text: `v${i}`,
          fontSize: 10 / this.viewScaleSafe,
          fill: "rgba(255,255,255,0.5)",
          listening: false,
        })
      );
    }

    this._layer.batchDraw();
  }

  private _drawBackground(
    w: number,
    h: number,
    img: HTMLImageElement | null,
    layer: BackgroundLayer | null
  ): void {
    const ctx = this._bgCanvas.getContext("2d");
    if (!ctx || !img?.complete || !img.naturalWidth || !layer) {
      this._bgImage.visible(false);
      return;
    }
    if (this._bgCanvas.width !== w || this._bgCanvas.height !== h) {
      this._bgCanvas.width = w;
      this._bgCanvas.height = h;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, w, h);
    drawBackgroundLayer(ctx, w, h, img, layer);
    this._bgImage.image(this._bgCanvas);
    this._bgImage.width(w);
    this._bgImage.height(h);
    this._bgImage.visible(true);
  }
}
