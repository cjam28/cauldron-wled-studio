import type { Connection } from "home-assistant-js-websocket";
import { debounce } from "../utils/debounce.js";
import {
  applyState,
  fetchDeviceState,
  normalizeCols,
  type WledSegment,
} from "./wled-state.js";

/** Hash fields that matter for user edits (excludes transient `sel`). */
export function segmentStateHash(seg: WledSegment): string {
  const pick = {
    id: seg.id,
    on: seg.on,
    bri: seg.bri,
    fx: seg.fx,
    sx: seg.sx,
    ix: seg.ix,
    c1: seg.c1,
    c2: seg.c2,
    c3: seg.c3,
    o1: seg.o1,
    o2: seg.o2,
    o3: seg.o3,
    pal: seg.pal,
    col: normalizeCols(seg.col),
    awm: seg.awm,
  };
  return JSON.stringify(pick);
}

function colorsOrFxDiffer(a: WledSegment, b: WledSegment): boolean {
  if (a.fx !== b.fx) return true;
  return JSON.stringify(normalizeCols(a.col)) !== JSON.stringify(normalizeCols(b.col));
}

export type ReconcileHandler = (seg: WledSegment, message?: string) => void;

export interface OptimisticApplyHandle {
  push: (patch: Record<string, unknown>, seg: WledSegment) => void;
  cancel: () => void;
}

/** Debounced apply with 500 ms reconcile (no false rollback on `sel` drift). */
export function createOptimisticApply(
  connection: Connection,
  controllerId: string,
  onReconcile: ReconcileHandler
): OptimisticApplyHandle {
  let lastExpected: WledSegment | null = null;
  let lastSegId = 0;
  let verifyTimer: ReturnType<typeof setTimeout> | undefined;

  const scheduleVerify = () => {
    if (verifyTimer) clearTimeout(verifyTimer);
    verifyTimer = setTimeout(() => {
      void (async () => {
        try {
          const snap = await fetchDeviceState(connection, controllerId);
          const server = (snap.segments ?? []).find((s) => s.id === lastSegId);
          if (!server || !lastExpected) return;
          const expectedHash = segmentStateHash(lastExpected);
          const serverHash = segmentStateHash(server);
          if (expectedHash === serverHash) return;
          if (colorsOrFxDiffer(lastExpected, server)) {
            onReconcile(
              server,
              "WLED applied a different color or effect than requested"
            );
          } else {
            onReconcile(server);
          }
        } catch {
          /* ignore probe errors */
        }
      })();
    }, 500);
  };

  const debounced = debounce(
    (patch: Record<string, unknown>, seg: WledSegment) => {
      lastExpected = seg;
      lastSegId = seg.id;
      void applyState(connection, controllerId, patch, { fullResponse: true })
        .then((state) => {
          const segs = state.seg as WledSegment[] | undefined;
          const updated = Array.isArray(segs)
            ? segs.find((s) => s.id === seg.id)
            : undefined;
          if (updated) {
            lastExpected = { ...seg, ...updated, id: seg.id };
          }
          scheduleVerify();
        })
        .catch(() => {
          onReconcile(seg, "Failed to apply state to WLED");
        });
    },
    50,
    100
  );

  return {
    push(patch, seg) {
      debounced(patch, seg);
    },
    cancel() {
      debounced.cancel();
      if (verifyTimer) clearTimeout(verifyTimer);
    },
  };
}
