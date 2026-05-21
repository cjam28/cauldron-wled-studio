/** Guide paths (smooth drawings) vs sparse layout vertices. */

import simplify from "simplify-js";

export type DrawTool =
  | "select"
  | "place"
  | "pen"
  | "line"
  | "rect"
  | "ellipse"
  | "polyline"
  | "photo";

export type GuideKind = "freehand" | "line" | "rect" | "ellipse" | "polyline" | "svg";

export interface GuidePath {
  points: Array<[number, number]>;
  closed: boolean;
  kind: GuideKind;
}

export interface LayoutVertex {
  x: number;
  y: number;
  anchorLed: number | null;
}

/** Smooth freehand centerline → guide (not layout vertices). */
export function penStrokeToGuide(
  strokeCanvas: Array<[number, number]>,
  toModel: (cx: number, cy: number) => [number, number],
  closed = false
): GuidePath {
  if (strokeCanvas.length < 2) {
    return { points: [], closed: false, kind: "freehand" };
  }
  const simplified = simplify(
    strokeCanvas.map(([x, y]) => ({ x, y })),
    4,
    true
  );
  const points = simplified.map((p) => toModel(p.x, p.y));
  return { points, closed, kind: "freehand" };
}

export function lineToGuide(
  a: [number, number],
  b: [number, number]
): GuidePath {
  return { points: [a, b], closed: false, kind: "line" };
}

export function rectToGuide(
  x0: number,
  y0: number,
  x1: number,
  y1: number
): GuidePath {
  const minX = Math.min(x0, x1);
  const maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1);
  const maxY = Math.max(y0, y1);
  return {
    points: [
      [minX, minY],
      [maxX, minY],
      [maxX, maxY],
      [minX, maxY],
    ],
    closed: true,
    kind: "rect",
  };
}

export function ellipseToGuide(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  segments = 48
): GuidePath {
  const points: Array<[number, number]> = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    points.push([cx + Math.cos(t) * rx, cy + Math.sin(t) * ry]);
  }
  return { points, closed: true, kind: "ellipse" };
}

export function polylineToGuide(points: Array<[number, number]>, closed: boolean): GuidePath {
  return { points: [...points], closed, kind: "polyline" };
}

function pathLengths(
  points: Array<[number, number]>,
  closed: boolean
): { segLens: number[]; total: number } {
  if (points.length < 2) return { segLens: [], total: 0 };
  const segLens: number[] = [];
  let total = 0;
  const n = points.length;
  const limit = closed ? n : n - 1;
  for (let i = 0; i < limit; i++) {
    const j = (i + 1) % n;
    const d = Math.hypot(points[j][0] - points[i][0], points[j][1] - points[i][1]);
    segLens.push(d);
    total += d;
  }
  return { segLens, total };
}

/** Nearest point on guide; returns model x,y and t ∈ [0,1] along path. */
export function snapToGuide(
  guide: GuidePath,
  mx: number,
  my: number
): { x: number; y: number; t: number; dist: number } {
  const pts = guide.points;
  if (pts.length === 0) return { x: mx, y: my, t: 0, dist: Infinity };
  if (pts.length === 1) {
    const d = Math.hypot(mx - pts[0][0], my - pts[0][1]);
    return { x: pts[0][0], y: pts[0][1], t: 0, dist: d };
  }

  const { segLens, total } = pathLengths(pts, guide.closed);
  if (total <= 0) return { x: mx, y: my, t: 0, dist: Infinity };

  let bestDist = Infinity;
  let bestX = mx;
  let bestY = my;
  let bestT = 0;
  let walked = 0;
  const n = pts.length;
  const limit = guide.closed ? n : n - 1;

  for (let i = 0; i < limit; i++) {
    const j = (i + 1) % n;
    const x1 = pts[i][0];
    const y1 = pts[i][1];
    const x2 = pts[j][0];
    const y2 = pts[j][1];
    const seg = segLens[i] ?? 0;
    let tSeg = 0;
    if (seg > 0) {
      tSeg = Math.max(
        0,
        Math.min(
          1,
          ((mx - x1) * (x2 - x1) + (my - y1) * (y2 - y1)) / (seg * seg)
        )
      );
    }
    const px = x1 + tSeg * (x2 - x1);
    const py = y1 + tSeg * (y2 - y1);
    const d = Math.hypot(mx - px, my - py);
    if (d < bestDist) {
      bestDist = d;
      bestX = px;
      bestY = py;
      bestT = (walked + tSeg * seg) / total;
    }
    walked += seg;
  }

  return { x: bestX, y: bestY, t: bestT, dist: bestDist };
}

/** Suggested LED index for a click at fraction t along the guide. */
export function ledIndexAlongGuide(t: number, pixelCount: number): number {
  const max = Math.max(0, pixelCount - 1);
  return Math.max(0, Math.min(max, Math.round(t * max)));
}

/**
 * Suggested anchor LED when placing a vertex on the guide.
 * First vertex is always 0; later vertices use position along the path (t × strip length).
 */
export function suggestPlacementAnchorLed(
  placedVertexCount: number,
  pathFraction: number,
  pixelCount: number
): number {
  if (placedVertexCount <= 0) return 0;
  return ledIndexAlongGuide(pathFraction, pixelCount);
}

/** Draw guide path (smooth purple dashed). */
export function strokeGuide(
  ctx: CanvasRenderingContext2D,
  toCanvas: (x: number, y: number) => [number, number],
  guide: GuidePath | null
): void {
  if (!guide || guide.points.length < 2) return;
  ctx.save();
  ctx.strokeStyle = "rgba(168,85,247,0.75)";
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  const [sx, sy] = toCanvas(guide.points[0][0], guide.points[0][1]);
  ctx.moveTo(sx, sy);
  for (let i = 1; i < guide.points.length; i++) {
    const [vx, vy] = toCanvas(guide.points[i][0], guide.points[i][1]);
    ctx.lineTo(vx, vy);
  }
  if (guide.closed) ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}
