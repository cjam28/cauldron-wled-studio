import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { WLED_STUDIO_BUILD } from "../src/utils/build-stamp.js";

const here = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(
  here,
  "../../custom_components/wled_studio/manifest.json",
);

describe("build-stamp version invariant (VERSION-SYNC)", () => {
  it("WLED_STUDIO_BUILD equals manifest.json version", () => {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf-8")) as {
      version: string;
    };
    expect(WLED_STUDIO_BUILD).toBe(manifest.version);
  });

  it("is at least the 0.11.5 Phase-0 baseline", () => {
    const [major, minor, patch] = WLED_STUDIO_BUILD.split(".").map((n) =>
      Number.parseInt(n, 10),
    );
    const value = major * 10000 + minor * 100 + patch;
    expect(value).toBeGreaterThanOrEqual(1105); // 0.11.5
  });
});
