import { describe, expect, it } from "vitest";
import { safeCustomElement } from "../src/utils/safe-custom-element.js";

describe("safeCustomElement", () => {
  it("returns existing constructor on double registration", () => {
    const tag = "test-safe-custom-element-a";

    @safeCustomElement(tag)
    class First extends HTMLElement {}

    @safeCustomElement(tag)
    class Second extends HTMLElement {}

    const registered = customElements.get(tag);
    expect(registered).toBe(First);
    expect(Second).toBe(First);

    const el = document.createElement(tag);
    expect(el).toBeInstanceOf(First);
    expect(() => document.createElement(tag)).not.toThrow();
  });
});
