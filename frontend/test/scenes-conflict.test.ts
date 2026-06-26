import { describe, expect, it } from "vitest";
import type { Connection } from "home-assistant-js-websocket";
import {
  SceneConflictError,
  sceneCapture,
  sceneSave,
  type SceneRecord,
} from "../src/api/scenes.js";
import { WledViewScenes, VIEW_SCENES_TAG } from "../src/panel/view-scenes.js";
import { defineCustomElement } from "../src/utils/safe-custom-element.js";

defineCustomElement(VIEW_SCENES_TAG, WledViewScenes);

/** Minimal connected Connection stub; waitForConnection() short-circuits. */
function mockConn(
  handler: (msg: Record<string, unknown>) => Promise<unknown>
): Connection {
  return {
    connected: true,
    sendMessagePromise: handler,
    addEventListener() {},
    removeEventListener() {},
  } as unknown as Connection;
}

const scene: SceneRecord = {
  id: "sunset",
  controller_id: "c1",
  name: "Sunset",
  wled_state: {},
};

describe("scene conflict handling", () => {
  it("SC-1: sceneSave forwards if_match_etag on overwrite", async () => {
    let sent: Record<string, unknown> | undefined;
    const conn = mockConn(async (msg) => {
      sent = msg;
      return { scene };
    });
    await sceneSave(conn, "c1", scene, { ifMatchEtag: "etag-123" });
    expect(sent?.type).toBe("wled_studio/scene_save");
    expect(sent?.if_match_etag).toBe("etag-123");
  });

  it("SC-2: sceneCapture translates a conflict code to SceneConflictError", async () => {
    const remote: SceneRecord = { ...scene, etag: "remote-etag" };
    const conn = mockConn(async () => {
      throw { code: "conflict", message: "edited", data: { scene: remote, etag: "e9" } };
    });
    const err = await sceneCapture(conn, "c1", "Sunset").catch((e) => e);
    expect(err).toBeInstanceOf(SceneConflictError);
    expect((err as SceneConflictError).remote.id).toBe("sunset");
    expect((err as SceneConflictError).etag).toBe("e9");
  });

  it("SC-2: sceneCapture rethrows non-conflict errors unchanged", async () => {
    const conn = mockConn(async () => {
      throw new Error("boom");
    });
    await expect(sceneCapture(conn, "c1", "Sunset")).rejects.toThrow("boom");
  });
});

/**
 * SC-1 at the view level: confirm the overwrite handler forwards the
 * user-acknowledged remote etag through sceneSave and clears the conflict
 * banner on success, and re-surfaces a fresh remote on a subsequent conflict
 * while preserving the locally-edited scene (name/state).
 */
describe("view-scenes overwrite-conflict resolution", () => {
  const local: SceneRecord = {
    id: "sunset",
    controller_id: "c1",
    name: "Sunset (local edit)",
    wled_state: { on: true, bri: 200 },
  };
  const remote: SceneRecord = {
    id: "sunset",
    controller_id: "c1",
    name: "Sunset (remote)",
    wled_state: { on: false },
    etag: "remote-etag-1",
  };

  /**
   * Connection stub that answers scene_list / get_state for _load(), and lets
   * the test control whether scene_save succeeds or raises a fresh conflict.
   */
  function viewConn(opts: {
    onSave: (msg: Record<string, unknown>) => unknown;
  }): Connection {
    return {
      connected: true,
      sendMessagePromise: async (msg: Record<string, unknown>) => {
        switch (msg.type) {
          case "wled_studio/scene_list":
            return { scenes: [local] };
          case "wled_studio/get_state":
            return { segments: [] };
          case "wled_studio/scene_save":
            return opts.onSave(msg);
          default:
            return {};
        }
      },
      addEventListener() {},
      removeEventListener() {},
    } as unknown as Connection;
  }

  function makeView(conn: Connection): WledViewScenes {
    const el = document.createElement(VIEW_SCENES_TAG) as WledViewScenes;
    // Drive state directly; avoid the powered-connect lifecycle.
    (el as unknown as { connection: Connection }).connection = conn;
    (el as unknown as { controllerId: string }).controllerId = "c1";
    (el as unknown as { _scenes: SceneRecord[] })._scenes = [{ ...local }];
    (el as unknown as { _conflict: SceneRecord })._conflict = { ...remote };
    return el;
  }

  it("SC-1: overwrite forwards the remote etag and clears the conflict on success", async () => {
    let savedMsg: Record<string, unknown> | undefined;
    const conn = viewConn({
      onSave: (msg) => {
        savedMsg = msg;
        return { scene: { ...local, etag: "new-etag" } };
      },
    });
    const el = makeView(conn);

    await (el as unknown as { _overwriteConflict(): Promise<void> })._overwriteConflict();

    // The save must carry the acknowledged remote etag (optimistic concurrency
    // satisfied, not bypassed) and the locally-edited scene.
    expect(savedMsg?.type).toBe("wled_studio/scene_save");
    expect(savedMsg?.if_match_etag).toBe("remote-etag-1");
    expect((savedMsg?.scene as SceneRecord).name).toBe("Sunset (local edit)");
    // Banner cleared on success.
    expect((el as unknown as { _conflict?: SceneRecord })._conflict).toBeUndefined();
  });

  it("SC-1: a fresh conflict re-surfaces err.remote and preserves the local edit", async () => {
    const fresh: SceneRecord = {
      ...remote,
      name: "Sunset (remote v2)",
      etag: "remote-etag-2",
    };
    const conn = viewConn({
      onSave: () => {
        throw {
          code: "conflict",
          message: "edited",
          data: { scene: fresh, etag: "remote-etag-2" },
        };
      },
    });
    const el = makeView(conn);

    await (el as unknown as { _overwriteConflict(): Promise<void> })._overwriteConflict();

    // Conflict banner re-points at the newer remote — not cleared, no loop.
    const conflict = (el as unknown as { _conflict?: SceneRecord })._conflict;
    expect(conflict?.name).toBe("Sunset (remote v2)");
    expect(conflict?.etag).toBe("remote-etag-2");
    // The locally-captured edit survives for a subsequent overwrite attempt.
    const scenes = (el as unknown as { _scenes: SceneRecord[] })._scenes;
    expect(scenes.find((s) => s.id === "sunset")?.name).toBe(
      "Sunset (local edit)"
    );
  });
});
