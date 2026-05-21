/** Parse SVG path data into a layout guide (EPS: export to SVG first). */

import simplify from "simplify-js";
import type { GuidePath } from "./draw-tools.js";

export const MAX_SVG_BYTES = 2_000_000;
export const MAX_GUIDE_POINTS = 400;
const MAX_PATH_ELEMENTS = 80;
const MAX_PATH_ITERATIONS = 50_000;

const CMD = /([MLHVCSQTAZmlhvcsqtaz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g;

function tokenizePath(d: string): Array<string | number> {
  const tokens: Array<string | number> = [];
  let m: RegExpExecArray | null;
  CMD.lastIndex = 0;
  while ((m = CMD.exec(d)) !== null) {
    if (m[1]) tokens.push(m[1]);
    else if (m[2]) tokens.push(parseFloat(m[2]));
  }
  return tokens;
}

/** Use the browser SVG engine (handles arcs, smooth curves, etc.). */
function pathDToPointsNative(
  d: string,
  maxPoints: number
): Array<[number, number]> | null {
  if (typeof document === "undefined") return null;
  try {
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", d);
    const len = pathEl.getTotalLength();
    if (!Number.isFinite(len) || len <= 0) return null;
    const steps = Math.max(2, Math.min(maxPoints, Math.ceil(len / 2)));
    const out: Array<[number, number]> = [];
    for (let i = 0; i <= steps; i++) {
      const pt = pathEl.getPointAtLength((len * i) / steps);
      if (Number.isFinite(pt.x) && Number.isFinite(pt.y)) {
        out.push([pt.x, pt.y]);
      }
    }
    return out.length >= 2 ? out : null;
  } catch {
    return null;
  }
}

function numericParamCount(cmd: string): number {
  switch (cmd.toUpperCase()) {
    case "A":
      return 7;
    case "C":
      return 6;
    case "S":
    case "Q":
      return 4;
    case "T":
    case "L":
    case "M":
      return 2;
    case "H":
      return 1;
    case "V":
      return 1;
    case "Z":
      return 0;
    default:
      return 2;
  }
}

/** Fallback parser when native sampling is unavailable (tests / edge cases). */
function pathDToPointsManual(d: string, maxPoints: number): Array<[number, number]> {
  const tokens = tokenizePath(d.trim());
  const points: Array<[number, number]> = [];
  let i = 0;
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;
  let cmd = "";
  let iterations = 0;

  const read = (): number => {
    const v = tokens[i++];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };

  const line = (x: number, y: number) => {
    cx = x;
    cy = y;
    points.push([cx, cy]);
  };

  const sampleQuad = (x1: number, y1: number, x2: number, y2: number, steps = 12) => {
    const x0 = cx;
    const y0 = cy;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const u = 1 - t;
      line(
        u * u * x0 + 2 * u * t * x1 + t * t * x2,
        u * u * y0 + 2 * u * t * y1 + t * t * y2
      );
    }
  };

  const sampleCubic = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    steps = 16
  ) => {
    const x0 = cx;
    const y0 = cy;
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const u = 1 - t;
      line(
        u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
        u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3
      );
    }
  };

  const skipParams = (c: string): void => {
    const n = numericParamCount(c);
    for (let k = 0; k < n && i < tokens.length && typeof tokens[i] === "number"; k++) {
      read();
    }
    if (c.toUpperCase() === "A" && points.length > 0) {
      line(cx, cy);
    }
  };

  while (i < tokens.length && iterations++ < MAX_PATH_ITERATIONS) {
    const t = tokens[i];
    if (typeof t === "string") {
      cmd = t;
      i++;
    }
    if (!cmd) {
      if (typeof tokens[i] === "number") i++;
      continue;
    }

    const rel = cmd === cmd.toLowerCase() && cmd !== "Z" && cmd !== "z";
    const c = cmd.toUpperCase();
    const startI = i;
    let handled = false;

    if (c === "M") {
      const x = read() + (rel ? cx : 0);
      const y = read() + (rel ? cy : 0);
      cx = x;
      cy = y;
      sx = x;
      sy = y;
      points.push([cx, cy]);
      while (i < tokens.length && typeof tokens[i] === "number") {
        line(read() + (rel ? cx : 0), read() + (rel ? cy : 0));
      }
      handled = true;
    } else if (c === "L") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        line(read() + (rel ? cx : 0), read() + (rel ? cy : 0));
      }
      handled = true;
    } else if (c === "H") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        line(read() + (rel ? cx : 0), cy);
      }
      handled = true;
    } else if (c === "V") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        line(cx, read() + (rel ? cy : 0));
      }
      handled = true;
    } else if (c === "Q") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        sampleQuad(
          read() + (rel ? cx : 0),
          read() + (rel ? cy : 0),
          read() + (rel ? cx : 0),
          read() + (rel ? cy : 0)
        );
      }
      handled = true;
    } else if (c === "C") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        sampleCubic(
          read() + (rel ? cx : 0),
          read() + (rel ? cy : 0),
          read() + (rel ? cx : 0),
          read() + (rel ? cy : 0),
          read() + (rel ? cx : 0),
          read() + (rel ? cy : 0)
        );
      }
      handled = true;
    } else if (c === "A") {
      read();
      read();
      read();
      read();
      read();
      line(read() + (rel ? cx : 0), read() + (rel ? cy : 0));
      handled = true;
    } else if (c === "S") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        sampleCubic(
          cx,
          cy,
          read() + (rel ? cx : 0),
          read() + (rel ? cy : 0),
          read() + (rel ? cx : 0),
          read() + (rel ? cy : 0)
        );
      }
      handled = true;
    } else if (c === "T") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        sampleQuad(cx, cy, read() + (rel ? cx : 0), read() + (rel ? cy : 0));
      }
      handled = true;
    } else if (c === "Z") {
      if (points.length > 0) line(sx, sy);
      cx = sx;
      cy = sy;
      handled = true;
    }

    if (!handled) {
      skipParams(c);
      if (i === startI && i < tokens.length) i++;
    }
  }

  return downsamplePoints(points, maxPoints);
}

function pathDToPoints(d: string, maxPoints: number): Array<[number, number]> {
  const native = pathDToPointsNative(d, maxPoints);
  if (native && native.length >= 2) return native;
  return pathDToPointsManual(d, maxPoints);
}

function downsamplePoints(
  points: Array<[number, number]>,
  maxPoints: number
): Array<[number, number]> {
  if (points.length <= maxPoints) return points;
  const step = points.length / maxPoints;
  const out: Array<[number, number]> = [];
  for (let j = 0; j < maxPoints; j++) {
    out.push(points[Math.floor(j * step)]!);
  }
  return out;
}

function simplifyGuidePoints(
  points: Array<[number, number]>,
  maxPoints: number
): Array<[number, number]> {
  if (points.length <= 4) return points;
  const simplified = simplify(
    points.map(([x, y]) => ({ x, y })),
    1.5,
    true
  ).map((p) => [p.x, p.y] as [number, number]);
  return downsamplePoints(simplified, maxPoints);
}

function normalizePoints(
  points: Array<[number, number]>,
  targetW = 200
): Array<[number, number]> {
  if (points.length === 0) return points;
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (const [x, y] of points) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const rw = maxX - minX || 1;
  const rh = maxY - minY || 1;
  const scale = targetW / Math.max(rw, rh);
  return points.map(([x, y]) => [(x - minX) * scale, (y - minY) * scale]);
}

function parsePolylinePoints(raw: string, maxPoints: number): Array<[number, number]> {
  const nums = raw
    .trim()
    .split(/[\s,]+/)
    .map(parseFloat)
    .filter((n) => Number.isFinite(n));
  const pts: Array<[number, number]> = [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    pts.push([nums[i]!, nums[i + 1]!]);
  }
  return downsamplePoints(pts, maxPoints);
}

export function parseSvgToGuide(svgText: string): GuidePath {
  if (svgText.length > MAX_SVG_BYTES) {
    throw new Error(`SVG too large (max ${MAX_SVG_BYTES / 1_000_000} MB)`);
  }

  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const err = doc.querySelector("parsererror");
  if (err) throw new Error("Invalid SVG file");

  const paths = Array.from(doc.querySelectorAll("path")).slice(0, MAX_PATH_ELEMENTS);
  let best: Array<[number, number]> = [];
  let closed = false;

  for (const el of paths) {
    const d = el.getAttribute("d");
    if (!d?.trim()) continue;
    const pts = pathDToPoints(d, MAX_GUIDE_POINTS);
    if (pts.length > best.length) {
      best = pts;
      closed = /z\s*$/i.test(d.trim());
    }
  }

  if (best.length < 2) {
    const polys = Array.from(doc.querySelectorAll("polygon, polyline")).slice(
      0,
      MAX_PATH_ELEMENTS
    );
    for (const el of polys) {
      const raw = el.getAttribute("points");
      if (!raw) continue;
      const pts = parsePolylinePoints(raw, MAX_GUIDE_POINTS);
      if (pts.length > best.length) {
        best = pts;
        closed = el.tagName.toLowerCase() === "polygon";
      }
    }
  }

  if (best.length < 2) {
    throw new Error("No paths found in SVG (use path, polyline, or polygon)");
  }

  best = simplifyGuidePoints(best, MAX_GUIDE_POINTS);

  return {
    points: normalizePoints(best),
    closed,
    kind: "svg",
  };
}
