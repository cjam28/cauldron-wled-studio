/** Parse WLED 16.x text JSON lv:true frames — never throws. */

export interface LvFrame {
  leds_hex: string[];
  n: number;
  channels: 3 | 4;
  scale: number;
  count: number;
}

const HEX = /^[0-9a-fA-F]+$/;

export function parseLvFrame(raw: unknown): LvFrame | null {
  if (!raw || typeof raw !== "object") return null;
  const msg = raw as Record<string, unknown>;

  if (Array.isArray(msg.leds_hex) && msg.leds_hex.length > 0) {
    const leds_hex = msg.leds_hex.map((h) => String(h).toLowerCase());
    const n = Number(msg.n) > 0 ? Number(msg.n) : leds_hex.length;
    const channels = (msg.channels === 4 ? 4 : 3) as 3 | 4;
    return {
      leds_hex,
      n,
      channels,
      scale: n / leds_hex.length,
      count: leds_hex.length,
    };
  }

  const leds = msg.leds;
  if (!Array.isArray(leds) || leds.length === 0) return null;

  const parsed: string[] = [];
  let channels: 3 | 4 = 3;
  for (const item of leds) {
    if (typeof item !== "string") continue;
    const s = item.trim().replace(/^#/, "");
    if (!s || s.length % 2 !== 0 || !HEX.test(s)) continue;
    if (s.length === 8) channels = 4;
    else if (s.length !== 6) continue;
    parsed.push(s.toLowerCase());
  }
  if (parsed.length === 0) return null;

  let n = parsed.length;
  if (msg.n !== undefined) {
    const ni = Number(msg.n);
    if (Number.isFinite(ni) && ni > 0) n = ni;
  }

  return {
    leds_hex: parsed,
    n,
    channels,
    scale: n / parsed.length,
    count: parsed.length,
  };
}

/** Expand downsampled preview to fixture length via nearest-neighbor. */
export function expandToFixture(frame: LvFrame, fixtureCount: number): Uint8ClampedArray {
  const out = new Uint8ClampedArray(fixtureCount * 4);
  for (let i = 0; i < fixtureCount; i++) {
    const srcIdx = Math.min(
      frame.count - 1,
      Math.max(0, Math.round(i / frame.scale))
    );
    const hex = frame.leds_hex[srcIdx] ?? "000000";
    const o = i * 4;
    if (hex.length === 8) {
      out[o] = parseInt(hex.slice(0, 2), 16);
      out[o + 1] = parseInt(hex.slice(2, 4), 16);
      out[o + 2] = parseInt(hex.slice(4, 6), 16);
      out[o + 3] = parseInt(hex.slice(6, 8), 16);
    } else {
      out[o] = parseInt(hex.slice(0, 2), 16);
      out[o + 1] = parseInt(hex.slice(2, 4), 16);
      out[o + 2] = parseInt(hex.slice(4, 6), 16);
      out[o + 3] = 255;
    }
  }
  return out;
}
