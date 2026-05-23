/** Approximate CSS gradients for WLED palette names (preview only). */

const NAMED: Record<string, string> = {
  default: "linear-gradient(90deg, #000 0%, #444 50%, #fff 100%)",
  "random cycle": "linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
  lava: "linear-gradient(90deg, #000 0%, #800 25%, #f40 55%, #fc0 100%)",
  ocean: "linear-gradient(90deg, #001028 0%, #004080 40%, #0088cc 70%, #aaf 100%)",
  forest: "linear-gradient(90deg, #020 0%, #060 30%, #080 55%, #0a0 80%, #5f5 100%)",
  rainbow: "linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
  "rainbow bands":
    "repeating-linear-gradient(90deg, #f00 0 8%, #ff0 8% 16%, #0f0 16% 24%, #0ff 24% 32%, #00f 32% 40%, #f0f 40% 48%)",
  sunset: "linear-gradient(90deg, #102 0%, #804 35%, #f60 65%, #fc0 100%)",
  rivendell: "linear-gradient(90deg, #234 0%, #356 45%, #8ab 100%)",
  breeze: "linear-gradient(90deg, #246 0%, #48a 50%, #bdf 100%)",
  "red & blue": "linear-gradient(90deg, #900 0%, #900 45%, #009 55%, #009 100%)",
  yellowout: "linear-gradient(90deg, #000 0%, #880 40%, #ff0 100%)",
  analogous: "linear-gradient(90deg, #f80, #ff0, #8f0, #0f8)",
  splash: "linear-gradient(90deg, #08f, #0fa, #8f0, #fa0, #f08)",
  pastel: "linear-gradient(90deg, #f9a, #fd9, #9f9, #9cf, #c9f)",
  "sunset 2": "linear-gradient(90deg, #201 0%, #906 40%, #f84 75%, #fe8 100%)",
  beech: "linear-gradient(90deg, #210 0%, #630 35%, #a80 70%, #da8 100%)",
  mint: "linear-gradient(90deg, #042 0%, #086 50%, #6fc 100%)",
  "april night": "linear-gradient(90deg, #012 0%, #248 45%, #48c 75%, #acf 100%)",
  orangery: "linear-gradient(90deg, #310 0%, #f70 55%, #fc8 100%)",
  c9: "linear-gradient(90deg, #f00 0%, #f00 20%, #0f0 20%, #0f0 40%, #08f 40%, #08f 60%, #ff0 60%, #ff0 80%, #f0f 80%, #f0f 100%)",
  sakura: "linear-gradient(90deg, #304 0%, #c68 50%, #fbd 100%)",
  aurora: "linear-gradient(90deg, #020 0%, #0a6 35%, #28f 65%, #8af 100%)",
  atlantica: "linear-gradient(90deg, #024 0%, #068 40%, #0ac 70%, #4ef 100%)",
  "c9 2": "linear-gradient(90deg, #f44, #4f4, #44f, #ff4, #f4f)",
  "c9 new": "linear-gradient(90deg, #e33, #3e3, #33e, #ee3, #e3e)",
  magenta: "linear-gradient(90deg, #400 0%, #808 50%, #f0f 100%)",
  magred: "linear-gradient(90deg, #808 0%, #c04 50%, #f00 100%)",
  yelmag: "linear-gradient(90deg, #ff0 0%, #f80 50%, #f0f 100%)",
  yelblu: "linear-gradient(90deg, #ff0 0%, #0af 100%)",
  "orange & teal": "linear-gradient(90deg, #f70 0%, #f70 48%, #088 52%, #088 100%)",
  tiamat: "linear-gradient(90deg, #208 0%, #408 30%, #80c 60%, #c4f 100%)",
  "fire & ice": "linear-gradient(90deg, #f40 0%, #fc0 35%, #08f 65%, #acf 100%)",
  "cyberpunk": "linear-gradient(90deg, #f0f 0%, #0ff 50%, #ff0 100%)",
  "cyberpunk 2": "linear-gradient(90deg, #80f 0%, #0fa 45%, #f08 100%)",
  "color gradient": "linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f)",
  "color bands":
    "repeating-linear-gradient(90deg, #f00 0 12%, #ff0 12% 24%, #0f0 24% 36%, #0ff 36% 48%, #00f 48% 60%, #f0f 60% 72%)",
  party: "linear-gradient(90deg, #f00, #0f0, #00f, #ff0, #f0f, #0ff)",
  cloud: "linear-gradient(90deg, #456 0%, #789 50%, #cde 100%)",
  lava2: "linear-gradient(90deg, #100 0%, #a00 40%, #f60 75%, #ff0 100%)",
  ocean2: "linear-gradient(90deg, #012 0%, #036 40%, #09c 75%, #6df 100%)",
  pinkpurple: "linear-gradient(90deg, #608 0%, #a0a 50%, #f8f 100%)",
  esrever: "linear-gradient(90deg, #fff 0%, #888 50%, #000 100%)",
  "empty slot": "linear-gradient(90deg, #333 0%, #555 50%, #333 100%)",
};

function hashHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return h % 360;
}

/** CSS background for a palette preview bar. */
export function paletteGradientCss(name: string): string {
  const key = name.toLowerCase().trim();
  const hit = NAMED[key];
  if (hit) return hit;

  const h = hashHue(key);
  return `linear-gradient(90deg, hsl(${h} 75% 35%), hsl(${(h + 72) % 360} 80% 48%), hsl(${(h + 144) % 360} 75% 58%))`;
}

/** Prefer device /json/palx gradient; fall back to name heuristics. */
export function resolvePaletteGradientCss(
  name: string,
  paletteId: number,
  previews?: Record<string, string>
): string {
  const fromDevice = previews?.[String(paletteId)];
  if (fromDevice) return fromDevice;
  return paletteGradientCss(name);
}
