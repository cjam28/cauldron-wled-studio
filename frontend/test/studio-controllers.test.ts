import { describe, expect, it } from "vitest";
import type { ReactiveControllerHost } from "lit";
import type { Connection } from "home-assistant-js-websocket";
import { StudioSelectionController } from "../src/core/studio-selection.js";
import { StudioNavController } from "../src/core/studio-nav.js";
import { StudioSessionController } from "../src/core/studio-session.js";

interface CountingHost extends ReactiveControllerHost {
  updates: number;
}

function mockHost(): CountingHost {
  const host = {
    updates: 0,
    addController() {},
    removeController() {},
    requestUpdate() {
      host.updates++;
    },
    updateComplete: Promise.resolve(true),
  } as unknown as CountingHost;
  return host;
}

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

describe("StudioSelectionController", () => {
  it("starts empty", () => {
    const c = new StudioSelectionController(mockHost());
    expect(c.selectedSegId).toBe(-1);
    expect(c.highlightSegIds).toEqual([]);
    expect(c.segments).toEqual([]);
  });

  it("selectSegment updates once and dedupes repeats", () => {
    const host = mockHost();
    const c = new StudioSelectionController(host);
    c.selectSegment(3);
    expect(c.selectedSegId).toBe(3);
    expect(host.updates).toBe(1);
    c.selectSegment(3);
    expect(host.updates).toBe(1); // no-op on same id
  });

  it("applyTargetsChanged prioritizes highlightIds > editIds > [segmentId]", () => {
    const c = new StudioSelectionController(mockHost());
    c.applyTargetsChanged({ segmentId: 2, highlightIds: [4, 5], editIds: [9] });
    expect(c.selectedSegId).toBe(2);
    expect(c.highlightSegIds).toEqual([4, 5]);

    c.applyTargetsChanged({ segmentId: 1, editIds: [7, 8] });
    expect(c.highlightSegIds).toEqual([7, 8]);

    c.applyTargetsChanged({ segmentId: 6 });
    expect(c.highlightSegIds).toEqual([6]);
  });

  it("applyTargetsChanged copies arrays (no aliasing)", () => {
    const c = new StudioSelectionController(mockHost());
    const src = [1, 2];
    c.applyTargetsChanged({ segmentId: 1, highlightIds: src });
    src.push(3);
    expect(c.highlightSegIds).toEqual([1, 2]);
  });
});

describe("StudioNavController", () => {
  it("normalizes the initial view", () => {
    const c = new StudioNavController<string>(mockHost(), {
      initial: "segments",
      normalize: (v) => (v === "segments" ? "color" : v),
    });
    expect(c.view).toBe("color");
  });

  it("select normalizes forbidden targets and dedupes", () => {
    const host = mockHost();
    const c = new StudioNavController<string>(host, {
      initial: "color",
      normalize: (v) => (v === "segments" ? "color" : v),
    });
    c.select("effects");
    expect(c.view).toBe("effects");
    expect(host.updates).toBe(1);

    c.select("segments"); // normalized back to color (a change from effects)
    expect(c.view).toBe("color");

    const before = host.updates;
    c.select("color"); // no-op
    expect(host.updates).toBe(before);
  });

  it("revalidate redirects when the current view becomes hidden", () => {
    let hidden = false;
    const c = new StudioNavController<string>(mockHost(), {
      initial: "effects",
      normalize: (v) => (hidden && v === "effects" ? "color" : v),
    });
    expect(c.view).toBe("effects");
    hidden = true;
    c.revalidate();
    expect(c.view).toBe("color");
  });
});

describe("StudioSessionController", () => {
  const ctrls = [
    { entry_id: "a", title: "A", master_entity_id: "light.a" },
    { entry_id: "b", title: "B", master_entity_id: "light.b" },
  ];

  it("loadControllers picks the first when nothing is selected", async () => {
    const c = new StudioSessionController(mockHost());
    await c.loadControllers(mockConn(async () => ({ controllers: ctrls })));
    expect(c.controllerId).toBe("a");
    expect(c.masterEntity).toBe("light.a");
  });

  it("loadControllers keeps the current selection if still present", async () => {
    const c = new StudioSessionController(mockHost());
    c.setControllerId("b");
    await c.loadControllers(mockConn(async () => ({ controllers: ctrls })));
    expect(c.controllerId).toBe("b");
    expect(c.masterEntityFor("a")).toBe("light.a");
  });

  it("setControllerId ignores empty and duplicate values", () => {
    const host = mockHost();
    const c = new StudioSessionController(host);
    c.setControllerId("a");
    const after = host.updates;
    c.setControllerId("");
    c.setControllerId("a");
    expect(host.updates).toBe(after);
    expect(c.controllerId).toBe("a");
  });

  it("loadControllers swallows discovery errors", async () => {
    const c = new StudioSessionController(mockHost());
    await expect(
      c.loadControllers(
        mockConn(async () => {
          throw new Error("boom");
        })
      )
    ).resolves.toBeUndefined();
    expect(c.controllerId).toBe("");
  });
});
