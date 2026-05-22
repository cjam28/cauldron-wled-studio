import type { HomeAssistant } from "custom-card-helpers";

/** HA uses 1 ft = 0.3048 m (same as WLED / typical HVAC). */
export const METERS_PER_FOOT = 0.3048;
export const FEET_PER_METER = 1 / METERS_PER_FOOT;

/** True when HA `unit_system.length` is metric (km/m), not US (mi/ft). */
export function isHaLengthMetric(hass?: HomeAssistant): boolean {
  const length = hass?.config?.unit_system?.length;
  return length !== "mi";
}

export function haLengthUnitLabel(hass?: HomeAssistant): "m" | "ft" {
  return isHaLengthMetric(hass) ? "m" : "ft";
}

export function defaultCalibDistanceInput(hass?: HomeAssistant): string {
  return isHaLengthMetric(hass) ? "1" : "3.28";
}

export function displayLengthToMeters(value: number, metric: boolean): number {
  return metric ? value : value * METERS_PER_FOOT;
}

export function metersToDisplayLength(meters: number, metric: boolean): number {
  return metric ? meters : meters * FEET_PER_METER;
}

export function formatScalePxPerM(scalePxPerM: number, metric: boolean): string {
  if (metric) {
    return `${scalePxPerM.toFixed(1)} px/m`;
  }
  const pxPerFt = scalePxPerM * METERS_PER_FOOT;
  return `${pxPerFt.toFixed(1)} px/ft`;
}

export function calibDistancePrompt(hass?: HomeAssistant): string {
  const unit = haLengthUnitLabel(hass);
  return `Click two points on the floorplan, then enter real distance (${unit})`;
}
