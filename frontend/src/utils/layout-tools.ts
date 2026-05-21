/** Path math and WLED segment import helpers for the layout designer. */

export interface LayoutVertex {
  x: number;
  y: number;
  anchorLed: number | null;
}

function pathLengths(
  verts: LayoutVertex[],
  closed: boolean
): { segLens: number[]; total: number } {
  if (verts.length < 2) return { segLens: [], total: 0 };
  const segLens: number[] = [];
  let total = 0;
  const n = verts.length;
  const limit = closed ? n : n - 1;
  for (let i = 0; i < limit; i++) {
    const j = (i + 1) % n;
    const d = Math.hypot(verts[j].x - verts[i].x, verts[j].y - verts[i].y);
    segLens.push(d);
    total += d;
  }
  return { segLens, total };
}

export function pointAtPathFraction(
  verts: LayoutVertex[],
  closed: boolean,
  t: number
): [number, number] {
  const { segLens, total } = pathLengths(verts, closed);
  if (total <= 0 || verts.length === 0) return [0, 0];
  let d = (t % 1) * total;
  if (d < 0) d += total;
  const n = verts.length;
  const limit = closed ? n : n - 1;
  let walked = 0;
  for (let i = 0; i < limit; i++) {
    const seg = segLens[i] ?? 0;
    if (seg > 0 && walked + seg >= d) {
      const u = (d - walked) / seg;
      const j = (i + 1) % n;
      return [
        verts[i].x + u * (verts[j].x - verts[i].x),
        verts[i].y + u * (verts[j].y - verts[i].y),
      ];
    }
    walked += seg;
  }
  return [verts[verts.length - 1].x, verts[verts.length - 1].y];
}

/** Resample polyline to N vertices along arc length. */
export function resampleVertices(
  verts: LayoutVertex[],
  count: number,
  closed: boolean
): LayoutVertex[] {
  if (count < 2) return verts;
  const out: LayoutVertex[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const [x, y] = pointAtPathFraction(verts, closed, t);
    out.push({ x, y, anchorLed: null });
  }
  return out;
}

export function defaultRectVertices(): LayoutVertex[] {
  return [
    { x: 0, y: 0, anchorLed: null },
    { x: 100, y: 0, anchorLed: null },
    { x: 100, y: 80, anchorLed: null },
    { x: 0, y: 80, anchorLed: null },
  ];
}

/** Map WLED segment start LEDs onto vertices (adds/resamples if needed). */
export function importSegmentStarts(
  vertices: LayoutVertex[],
  starts: number[],
  closed: boolean
): LayoutVertex[] {
  const sorted = [...new Set(starts.filter((s) => s >= 0))].sort((a, b) => a - b);
  if (sorted.length === 0) return vertices;

  let verts =
    vertices.length >= 2 ? vertices.map((v) => ({ ...v, anchorLed: null })) : defaultRectVertices();

  if (verts.length !== sorted.length) {
    verts = resampleVertices(verts, sorted.length, closed);
  }

  for (let i = 0; i < sorted.length; i++) {
    verts[i] = { ...verts[i], anchorLed: sorted[i] };
  }
  return verts;
}
