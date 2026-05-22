import { describe, expect, it } from "vitest";
import {
  defaultCalibDistanceInput,
  displayLengthToMeters,
  formatScalePxPerM,
  haLengthUnitLabel,
  isHaLengthMetric,
  metersToDisplayLength,
} from "../src/utils/ha-length-units.js";

const metricHass = { config: { unit_system: { length: "km" } } } as const;
const imperialHass = { config: { unit_system: { length: "mi" } } } as const;

describe("ha-length-units", () => {
  it("detects metric vs imperial from HA unit_system.length", () => {
    expect(isHaLengthMetric(metricHass as never)).toBe(true);
    expect(isHaLengthMetric(imperialHass as never)).toBe(false);
    expect(haLengthUnitLabel(metricHass as never)).toBe("m");
    expect(haLengthUnitLabel(imperialHass as never)).toBe("ft");
  });

  it("converts calibration input to meters for storage", () => {
    expect(displayLengthToMeters(1, true)).toBe(1);
    expect(displayLengthToMeters(3.28, false)).toBeCloseTo(1, 2);
  });

  it("formats scale for display units", () => {
    expect(formatScalePxPerM(100, true)).toBe("100.0 px/m");
    expect(formatScalePxPerM(100, false)).toBe("30.5 px/ft");
  });

  it("defaults calibration distance to 1 m or ~1 m in feet", () => {
    expect(defaultCalibDistanceInput(metricHass as never)).toBe("1");
    expect(defaultCalibDistanceInput(imperialHass as never)).toBe("3.28");
    expect(metersToDisplayLength(1, false)).toBeCloseTo(3.28, 2);
  });
});
