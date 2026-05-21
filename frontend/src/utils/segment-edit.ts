import type { WledSegment } from "../api/wled-state.js";

/** Toggle segment id in the edit set (copy-on-write). */
export function toggleEditId(editIds: number[], id: number): number[] {
  const set = new Set(editIds);
  if (set.has(id)) {
    set.delete(id);
  } else {
    set.add(id);
  }
  return [...set].sort((a, b) => a - b);
}

export function labelForSegment(
  seg: WledSegment,
  entities: Array<{ entity_id: string; segment_index: number; name?: string }>
): string {
  const eid = seg.id;
  const ent = entities.find(
    (e) =>
      e.segment_index === eid ||
      e.entity_id.endsWith(`_segment_${eid}`)
  );
  const wledName = typeof seg.n === "string" && seg.n.trim() ? seg.n.trim() : "";
  const name =
    wledName ||
    ent?.name?.replace(/^.*\s—\s/, "") ||
    `Seg ${eid + 1}`;
  const start = seg.start ?? "?";
  const stop = seg.stop ?? "?";
  return `${name} (${start}–${stop})`;
}
