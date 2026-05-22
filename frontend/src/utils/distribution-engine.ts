/**
 * Arc-length LED placement — TypeScript mirror of geometry.py resolve_led_positions
 * and fixture_to_wled_segments. Used for client-side validation and unit tests;
 * the authoritative server implementation lives in custom_components/wled_studio/geometry.py.
 */

export interface Anchor {
  led: number;
  vertex_index: number;
}

export interface Fixture {
  id: string;
  name: string;
  kind: string;
  points: Array<[number, number]>;
  anchors: Anchor[];
  closed: boolean;
}

export interface LedPosition {
  x: number;
  y: number;
  led: number;
}

export interface WledSegmentDef {
  id: number;
  start: number;
  stop: number;
  n: string;
  on: boolean;
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
    const dx = points[j][0] - points[i][0];
    const dy = points[j][1] - points[i][1];
    const d = Math.hypot(dx, dy);
    segLens.push(d);
    total += d;
  }
  return { segLens, total };
}

export function resolveLedPositions(
  fixture: Fixture,
  pixelCount: number
): LedPosition[] {
  const { points, anchors, closed } = fixture;
  if (points.length < 2 || anchors.length === 0) return [];

  const { segLens, total: totalLen } = pathLengths(points, closed);
  if (totalLen <= 0) return [];

  const n = points.length;
  const limit = closed ? n : n - 1;

  // Cumulative distance to each vertex
  const vertDist: Map<number, number> = new Map([[0, 0]]);
  let acc = 0;
  for (let i = 0; i < limit; i++) {
    acc += i < segLens.length ? segLens[i] : 0;
    const idx = closed ? (i + 1) % n : i + 1;
    vertDist.set(idx, acc);
  }

  function pointAtDistance(d: number): [number, number] {
    const dist = closed
      ? ((d % totalLen) + totalLen) % totalLen
      : Math.min(Math.max(d, 0), totalLen);
    let walked = 0;
    for (let i = 0; i < limit; i++) {
      const seg = i < segLens.length ? segLens[i] : 0;
      if (walked + seg >= dist && seg > 0) {
        const t = (dist - walked) / seg;
        const j = closed ? (i + 1) % n : i + 1;
        const x = points[i][0] + t * (points[j][0] - points[i][0]);
        const y = points[i][1] + t * (points[j][1] - points[i][1]);
        return [x, y];
      }
      walked += seg;
    }
    return points[points.length - 1];
  }

  const ledPositions: Map<number, [number, number]> = new Map();
  const ordered = [...anchors].sort((a, b) => a.led - b.led);

  for (let idx = 0; idx < ordered.length; idx++) {
    const anchor = ordered[idx];
    const vx = Math.min(anchor.vertex_index, points.length - 1);
    ledPositions.set(anchor.led, points[vx]);

    const isLast = idx + 1 >= ordered.length;
    if (isLast && !closed) continue;

    const nxt = isLast ? ordered[0]! : ordered[idx + 1]!;
    const span = isLast ? pixelCount - anchor.led : nxt.led - anchor.led;
    if (span <= 1) continue;

    const d0 = vertDist.get(vx) ?? 0;
    const v1 = Math.min(nxt.vertex_index, points.length - 1);
    const d1 = vertDist.get(v1) ?? 0;

    let arc = closed ? ((d1 - d0) % totalLen + totalLen) % totalLen : d1 - d0;
    if (!closed && arc < 0) arc += totalLen;

    for (let k = 1; k < span; k++) {
      const led = anchor.led + k;
      if (led >= pixelCount) break;
      if (!isLast && led >= nxt.led) break;
      const dist = d0 + arc * (k / span);
      ledPositions.set(led, pointAtDistance(dist));
    }
  }

  const result: LedPosition[] = [];
  for (const [led, xy] of [...ledPositions.entries()].sort((a, b) => a[0] - b[0])) {
    result.push({ x: xy[0], y: xy[1], led });
  }
  return result;
}

export function fixtureToWledSegments(
  fixture: Fixture,
  pixelCount: number,
  namePrefix = "Side"
): WledSegmentDef[] {
  if (fixture.anchors.length === 0) return [];
  const ordered = [...fixture.anchors].sort((a, b) => a.led - b.led);
  const out: WledSegmentDef[] = [];
  for (let i = 0; i < ordered.length; i++) {
    const start = Math.max(0, Math.min(ordered[i].led, pixelCount - 1));
    const stop =
      i + 1 < ordered.length
        ? Math.max(start + 1, Math.min(ordered[i + 1].led, pixelCount))
        : pixelCount;
    out.push({ id: i, start, stop, n: `${namePrefix} ${i + 1}`, on: true });
  }
  return out;
}

export function kitchenIslandFixture(): Fixture {
  return {
    id: "kitchen-island",
    name: "Kitchen island",
    kind: "polyline",
    closed: true,
    points: [
      [0, 0],
      [100, 0],
      [110, 10],
      [200, 10],
      [0, 0],
    ],
    anchors: [
      { led: 0, vertex_index: 0 },
      { led: 85, vertex_index: 1 },
      { led: 96, vertex_index: 2 },
      { led: 186, vertex_index: 3 },
    ],
  };
}
