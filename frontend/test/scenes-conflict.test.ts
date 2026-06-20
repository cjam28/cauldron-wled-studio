import { describe, expect, it } from "vitest";
import type { Connection } from "home-assistant-js-websocket";
import {
  SceneConflictError,
  sceneCapture,
  sceneSave,
  type SceneRecord,
} from "../src/api/scenes.js";

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
