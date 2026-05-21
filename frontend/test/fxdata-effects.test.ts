import { describe, expect, it } from "vitest";

/** Mirror Python effect_meta row parsing for unit tests. */
function parseRow(row: string) {
  const parts = row.split(";");
  const slidersRaw = parts[0] ?? "";
  const keys = ["sx", "ix", "c1", "c2", "c3", "o1", "o2", "o3"];
  const tokens = slidersRaw.split(",").map((t) => t.trim());
  const sliders: Record<string, boolean> = {};
  keys.forEach((k, i) => {
    sliders[k] = tokens[i] === "!" || Boolean(tokens[i]);
  });
  return { sliders, flag: (parts[3] ?? "").trim().slice(0, 1) || null };
}

describe("fxdata row parsing", () => {
  it("parses Aurora example sliders", () => {
    const meta = parseRow("!,!;;!;1;sx=24,pal=50");
    expect(meta.sliders.sx).toBe(true);
    expect(meta.sliders.ix).toBe(true);
    expect(meta.sliders.c1).toBe(false);
    expect(meta.flag).toBe("1");
  });

  it("hides empty slider tokens", () => {
    const meta = parseRow(",,,,,,,,;;!;");
    expect(meta.sliders.sx).toBe(false);
    expect(meta.sliders.c1).toBe(false);
  });
});
