import type { Connection } from "home-assistant-js-websocket";
import { debounce } from "../utils/debounce.js";
import { applyState, fetchDeviceState, type WledSegment } from "./wled-state.js";

/** Stable hash of segment fields we optimistically control. */
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
    col: seg.col,
    awm: seg.awm,
    sel: seg.sel,
  };
  return JSON.stringify(pick);
}

export type RollbackHandler = (seg: WledSegment, reason: string) => void;

export interface OptimisticApplyHandle {
  push: (patch: Record<string, unknown>, seg: WledSegment) => void;
  cancel: () => void;
}

/** Debounced apply with 500 ms server reconciliation + rollback callback. */
export function createOptimisticApply(
  connection: Connection,
  controllerId: string,
  onRollback: RollbackHandler
): OptimisticApplyHandle {
  let lastHash = "";
  let lastSegId = 0;
  let verifyTimer: ReturnType<typeof setTimeout> | undefined;

  const scheduleVerify = () => {
    if (verifyTimer) clearTimeout(verifyTimer);
    verifyTimer = setTimeout(() => {
      void (async () => {
        try {
          const snap = await fetchDeviceState(connection, controllerId);
          const server = (snap.segments ?? []).find((s) => s.id === lastSegId);
          if (!server || !lastHash) return;
          if (segmentStateHash(server) !== lastHash) {
            onRollback(server, "Device state differed from your edit");
          }
        } catch {
          /* ignore probe errors */
        }
      })();
    }, 500);
  };

  const debounced = debounce(
    (patch: Record<string, unknown>, seg: WledSegment) => {
      lastHash = segmentStateHash(seg);
      lastSegId = seg.id;
      void applyState(connection, controllerId, patch)
        .then(() => scheduleVerify())
        .catch(() => {
          onRollback(seg, "Failed to apply state to WLED");
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
