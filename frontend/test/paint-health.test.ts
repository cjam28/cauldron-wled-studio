import { describe, expect, it } from "vitest";
import type { Connection } from "home-assistant-js-websocket";
import {
  defaultPaintHealth,
  paintFrame,
  paintStatus,
} from "../src/api/paint.js";
import { WledViewPaint } from "../src/panel/view-paint.js";

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

const buffer = new Uint8Array([200, 0, 0, 0, 200, 0, 0, 0]);

describe("paintFrame additive health (SP-4)", () => {
  it("returns healthy default when the result omits health fields", async () => {
    const conn = mockConn(async () => ({ ok: true }));
    const health = await paintFrame(conn, "c1", buffer, { rgbw: true });
    expect(health).toEqual(defaultPaintHealth());
    expect(health.connectionHealthy).toBe(true);
  });

  it("parses an unhealthy result into a banner-ready reason", async () => {
    let sent: Record<string, unknown> | undefined;
    const conn = mockConn(async (msg) => {
      sent = msg;
      return {
        ok: true,
        connection_healthy: false,
        connection_reason: "paint connection lost — reconnecting",
        consecutive_send_failures: 4,
      };
    });
    const health = await paintFrame(conn, "c1", buffer, { rgbw: true });
    expect(sent?.type).toBe("wled_studio/paint_frame");
    expect(health.connectionHealthy).toBe(false);
    expect(health.connectionReason).toContain("reconnecting");
    expect(health.consecutiveSendFailures).toBe(4);
  });

  it("recovers to healthy when a later frame reports connection_healthy true", async () => {
    const conn = mockConn(async () => ({
      ok: true,
      connection_healthy: true,
      connection_reason: null,
      consecutive_send_failures: 0,
    }));
    const health = await paintFrame(conn, "c1", buffer, { rgbw: true });
    expect(health.connectionHealthy).toBe(true);
    expect(health.connectionReason).toBeNull();
  });
});

describe("paintFrame additive segment-count (SP-5)", () => {
  it("defaults seg fields when the result omits them", async () => {
    const conn = mockConn(async () => ({ ok: true }));
    const health = await paintFrame(conn, "c1", buffer, { rgbw: true });
    expect(health.segWarn).toBe(false);
    expect(health.segCount).toBeNull();
    expect(health.maxSegments).toBeNull();
  });

  it("surfaces seg_count/max_segments/seg_warn when present", async () => {
    const conn = mockConn(async () => ({
      ok: true,
      connection_healthy: true,
      seg_count: 26,
      max_segments: 32,
      seg_warn: true,
    }));
    const health = await paintFrame(conn, "c1", buffer, { rgbw: true });
    expect(health.segCount).toBe(26);
    expect(health.maxSegments).toBe(32);
    expect(health.segWarn).toBe(true);
  });

  it("reports seg_warn false for a sparse buffer", async () => {
    const conn = mockConn(async () => ({
      ok: true,
      connection_healthy: true,
      seg_count: 3,
      max_segments: 32,
      seg_warn: false,
    }));
    const health = await paintFrame(conn, "c1", buffer, { rgbw: true });
    expect(health.segCount).toBe(3);
    expect(health.segWarn).toBe(false);
  });

  it("carries seg fields even when health fields are absent", async () => {
    const conn = mockConn(async () => ({
      ok: true,
      seg_count: 30,
      max_segments: 32,
      seg_warn: true,
    }));
    const health = await paintFrame(conn, "c1", buffer, { rgbw: true });
    expect(health.connectionHealthy).toBe(true); // healthy default
    expect(health.segWarn).toBe(true);
    expect(health.segCount).toBe(30);
  });
});

describe("paintStatus query (SP-4)", () => {
  it("reports active + health from the paint_status command", async () => {
    let sent: Record<string, unknown> | undefined;
    const conn = mockConn(async (msg) => {
      sent = msg;
      return {
        ok: true,
        active: true,
        connection_healthy: false,
        connection_reason: "WiFi sleep is enabled on the controller",
        consecutive_send_failures: 3,
      };
    });
    const status = await paintStatus(conn, "c1");
    expect(sent?.type).toBe("wled_studio/paint_status");
    expect(status.active).toBe(true);
    expect(status.connectionHealthy).toBe(false);
    expect(status.connectionReason).toContain("WiFi sleep");
  });

  it("treats an inactive session as healthy", async () => {
    const conn = mockConn(async () => ({ ok: true, active: false }));
    const status = await paintStatus(conn, "c1");
    expect(status.active).toBe(false);
    expect(status.connectionHealthy).toBe(true);
  });
});

/**
 * SP-4: while a paint session is active the view polls paint_status on an
 * interval (and on flush failure) so an IDLE mid-paint disconnect surfaces the
 * "connection lost — reconnecting" banner WITHOUT requiring new strokes. These
 * drive the view's private poll directly (the same casting pattern as the other
 * view tests) so we can assert banner state without standing up a real HA WS.
 */
interface PaintPollInternals {
  connection?: Connection;
  controllerId: string;
  _active: boolean;
  _connectionHealthy: boolean;
  _connectionReason: string;
  _segWarn: boolean;
  _segCount: number | null;
  _maxSegments: number | null;
  paintConnectionHealthy: boolean;
  _pollHealthNow(): Promise<void>;
}

function makePollView(conn: Connection): PaintPollInternals {
  const view = new WledViewPaint() as unknown as PaintPollInternals;
  view.connection = conn;
  view.controllerId = "c1";
  view._active = true;
  view._connectionHealthy = true;
  view._connectionReason = "";
  return view;
}

describe("view-paint SP-4 idle health poll", () => {
  it("an idle poll FAILURE drives the recovery banner unhealthy", async () => {
    // No strokes happening; the only signal is the failing paint_status probe.
    const conn = mockConn(async () => {
      throw new Error("disconnected");
    });
    const view = makePollView(conn);
    expect(view.paintConnectionHealthy).toBe(true);

    await view._pollHealthNow();

    expect(view.paintConnectionHealthy).toBe(false);
    expect(view._connectionReason).toContain("reconnecting");
  });

  it("an idle poll reporting the session is gone also drives the banner", async () => {
    const conn = mockConn(async () => ({ ok: true, active: false }));
    const view = makePollView(conn);

    await view._pollHealthNow();

    expect(view.paintConnectionHealthy).toBe(false);
    expect(view._connectionReason).toContain("reconnecting");
  });

  it("an unhealthy-but-active status surfaces the backend reason", async () => {
    const conn = mockConn(async () => ({
      ok: true,
      active: true,
      connection_healthy: false,
      connection_reason: "WiFi sleep is enabled on the controller",
      consecutive_send_failures: 3,
    }));
    const view = makePollView(conn);

    await view._pollHealthNow();

    expect(view.paintConnectionHealthy).toBe(false);
    expect(view._connectionReason).toContain("WiFi sleep");
  });

  it("a healthy active poll keeps the banner clear", async () => {
    const conn = mockConn(async () => ({
      ok: true,
      active: true,
      connection_healthy: true,
      connection_reason: null,
      consecutive_send_failures: 0,
    }));
    const view = makePollView(conn);

    await view._pollHealthNow();

    expect(view.paintConnectionHealthy).toBe(true);
    expect(view._connectionReason).toBe("");
  });

  it("does not poll once the session is no longer active", async () => {
    let calls = 0;
    const conn = mockConn(async () => {
      calls += 1;
      throw new Error("should not be called");
    });
    const view = makePollView(conn);
    view._active = false;

    await view._pollHealthNow();

    expect(calls).toBe(0);
    expect(view.paintConnectionHealthy).toBe(true);
  });
});
