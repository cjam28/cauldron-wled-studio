import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { NABU_CASA_HOST_SUFFIX, RemoteModeController } from "../src/controllers/remote-mode.js";
import { LitElement } from "lit";

class Host extends LitElement {
  remote = new RemoteModeController(this);
}
customElements.define("test-host", Host);

describe("RemoteModeController", () => {
  beforeEach(() => {
    vi.stubGlobal("location", {
      hostname: "home.local",
      origin: "https://home.local:8123",
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("detects Nabu Casa hostname", () => {
    vi.stubGlobal("location", {
      hostname: `abc${NABU_CASA_HOST_SUFFIX}`,
      origin: `https://abc${NABU_CASA_HOST_SUFFIX}`,
    });
    const el = document.createElement("test-host") as Host;
    document.body.appendChild(el);
    expect(el.remote.state.isRemote).toBe(true);
    expect(el.remote.state.previewFps).toBe(10);
    el.remove();
  });

  it("uses 20 fps locally", () => {
    const el = document.createElement("test-host") as Host;
    document.body.appendChild(el);
    expect(el.remote.state.isRemote).toBe(false);
    expect(el.remote.state.previewFps).toBe(20);
    el.remove();
  });
});
