import type { LayoutRecord } from "../api/layout.js";

const GENERIC_NAMES = new Set(["layout", "default", "fixture"]);

/** Human-readable title from a slug id (e.g. kitchen-island → Kitchen Island). */
export function titleFromLayoutId(id: string): string {
  const slug = id.trim();
  if (!slug) return "Layout";
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function layoutDisplayName(layout: LayoutRecord): string {
  const name = (layout.name ?? "").trim();
  if (name && !GENERIC_NAMES.has(name.toLowerCase())) {
    return name;
  }
  return titleFromLayoutId(String(layout.id ?? ""));
}

export function resolveLayoutName(
  savedName: string | undefined,
  layoutId: string
): string {
  const trimmed = (savedName ?? "").trim();
  if (trimmed && !GENERIC_NAMES.has(trimmed.toLowerCase())) {
    return trimmed;
  }
  return titleFromLayoutId(layoutId);
}

export function resolveFixtureName(
  savedName: string | undefined,
  fixtureId: string
): string {
  const trimmed = (savedName ?? "").trim();
  if (trimmed && !GENERIC_NAMES.has(trimmed.toLowerCase())) {
    return trimmed;
  }
  return titleFromLayoutId(fixtureId);
}
