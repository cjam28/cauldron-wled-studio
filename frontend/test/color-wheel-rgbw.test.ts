import { describe, expect, it } from "vitest";
import { WledColorWheelRgbw } from "../src/components/color-wheel-rgbw.js";

async function waitForPickerMount(el: WledColorWheelRgbw): Promise<HTMLDivElement> {
  await el.updateComplete;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await new Promise((r) => setTimeout(r, 50));
  const host = el.shadowRoot?.querySelector(".wheel-host");
  if (!host) throw new Error("wheel-host missing");
  return host as HTMLDivElement;
}

describe("wled-color-wheel-rgbw", () => {
  it("mounts iro wheel after layout and survives a re-render", async () => {
    const el = new WledColorWheelRgbw();
    el.rgb = [200, 100, 50];
    document.body.appendChild(el);
    const host = await waitForPickerMount(el);

    expect(host.querySelector(".IroColorPicker, .IroWheel")).toBeTruthy();

    el.requestUpdate();
    await el.updateComplete;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    expect(host.querySelector(".IroColorPicker, .IroWheel")).toBeTruthy();
    el.remove();
  });

  it("external rgb prop change syncs picker", async () => {
    const el = new WledColorWheelRgbw();
    el.rgb = [200, 100, 50];
    document.body.appendChild(el);
    await waitForPickerMount(el);

    el.rgb = [10, 20, 30];
    await el.updateComplete;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const picker = el["_picker" as keyof WledColorWheelRgbw] as
      | { color: { rgb: { r: number; g: number; b: number } } }
      | undefined;
    expect(picker?.color.rgb.r).toBe(10);
    expect(picker?.color.rgb.g).toBe(20);
    expect(picker?.color.rgb.b).toBe(30);
    el.remove();
  });

  it("keeps at most one iro wheel in host after multiple updates", async () => {
    const el = new WledColorWheelRgbw();
    el.rgb = [200, 100, 50];
    document.body.appendChild(el);
    const host = await waitForPickerMount(el);

    for (let i = 0; i < 5; i++) {
      el.rgb = [i * 40, 100, 50];
      el.requestUpdate();
      await el.updateComplete;
      await new Promise((r) => requestAnimationFrame(r));
    }

    expect(host.querySelectorAll(".IroWheel").length).toBeLessThanOrEqual(1);
    expect(host.querySelectorAll(".IroColorPicker").length).toBeLessThanOrEqual(1);
    el.remove();
  });
});
