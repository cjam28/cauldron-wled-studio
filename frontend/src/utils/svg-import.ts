/** Parse SVG path data into a layout guide (EPS: export to SVG first). */

import type { GuidePath } from "./draw-tools.js";

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

/** Sample cubic/quadratic curves into polyline points. */
function pathDToPoints(d: string, maxPoints = 400): Array<[number, number]> {
  const tokens = tokenizePath(d.trim());
  const points: Array<[number, number]> = [];
  let i = 0;
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;
  let cmd = "";

  const read = (): number => {
    const v = tokens[i++];
    return typeof v === "number" ? v : 0;
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
      const x = u * u * x0 + 2 * u * t * x1 + t * t * x2;
      const y = u * u * y0 + 2 * u * t * y1 + t * t * y2;
      line(x, y);
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
      const x =
        u * u * u * x0 +
        3 * u * u * t * x1 +
        3 * u * t * t * x2 +
        t * t * t * x3;
      const y =
        u * u * u * y0 +
        3 * u * u * t * y1 +
        3 * u * t * t * y2 +
        t * t * t * y3;
      line(x, y);
    }
  };

  while (i < tokens.length) {
    const t = tokens[i];
    if (typeof t === "string") {
      cmd = t;
      i++;
    }
    const rel = cmd === cmd.toLowerCase() && cmd !== "Z" && cmd !== "z";
    const c = cmd.toUpperCase();

    if (c === "M") {
      const x = read() + (rel ? cx : 0);
      const y = read() + (rel ? cy : 0);
      cx = x;
      cy = y;
      sx = x;
      sy = y;
      points.push([cx, cy]);
      while (i < tokens.length && typeof tokens[i] === "number") {
        const lx = read() + (rel ? cx : 0);
        const ly = read() + (rel ? cy : 0);
        line(lx, ly);
      }
    } else if (c === "L") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        const x = read() + (rel ? cx : 0);
        const y = read() + (rel ? cy : 0);
        line(x, y);
      }
    } else if (c === "H") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        const x = read() + (rel ? cx : 0);
        line(x, cy);
      }
    } else if (c === "V") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        const y = read() + (rel ? cy : 0);
        line(cx, y);
      }
    } else if (c === "Q") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        const x1 = read() + (rel ? cx : 0);
        const y1 = read() + (rel ? cy : 0);
        const x2 = read() + (rel ? cx : 0);
        const y2 = read() + (rel ? cy : 0);
        sampleQuad(x1, y1, x2, y2);
      }
    } else if (c === "C") {
      while (i < tokens.length && typeof tokens[i] === "number") {
        const x1 = read() + (rel ? cx : 0);
        const y1 = read() + (rel ? cy : 0);
        const x2 = read() + (rel ? cx : 0);
        const y2 = read() + (rel ? cy : 0);
        const x3 = read() + (rel ? cx : 0);
        const y3 = read() + (rel ? cy : 0);
        sampleCubic(x1, y1, x2, y2, x3, y3);
      }
    } else if (c === "Z") {
      if (points.length > 0) line(sx, sy);
      cx = sx;
      cy = sy;
    }
  }

  if (points.length > maxPoints) {
    const step = points.length / maxPoints;
    const out: Array<[number, number]> = [];
    for (let j = 0; j < maxPoints; j++) {
      out.push(points[Math.floor(j * step)]);
    }
    return out;
  }
  return points;
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
  return points.map(([x, y]) => [
    (x - minX) * scale,
    (y - minY) * scale,
  ]);
}

export function parseSvgToGuide(svgText: string): GuidePath {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const err = doc.querySelector("parsererror");
  if (err) throw new Error("Invalid SVG file");

  const paths = doc.querySelectorAll("path");
  let all: Array<[number, number]> = [];
  let closed = false;

  paths.forEach((el) => {
    const d = el.getAttribute("d");
    if (!d) return;
    const pts = pathDToPoints(d);
    if (pts.length) {
      all = all.concat(pts);
      const c = (d.trim().slice(-1) || "").toUpperCase();
      if (c === "Z") closed = true;
    }
  });

  if (all.length === 0) {
    const polys = doc.querySelectorAll("polygon, polyline");
    polys.forEach((el) => {
      const raw = el.getAttribute("points");
      if (!raw) return;
      const nums = raw.trim().split(/[\s,]+/).map(parseFloat);
      for (let i = 0; i + 1 < nums.length; i += 2) {
        all.push([nums[i], nums[i + 1]]);
      }
      if (el.tagName.toLowerCase() === "polygon") closed = true;
    });
  }

  if (all.length < 2) {
    throw new Error("No paths found in SVG (use path, polyline, or polygon)");
  }

  return {
    points: normalizePoints(all),
    closed,
    kind: "svg",
  };
}
