/**
 * Vitest global setup (happy-dom).
 *
 * happy-dom does not implement `HTMLElement.attachInternals()` (the
 * ElementInternals / form-associated custom-element API). `@material/web`
 * form controls (md-slider, md-switch, …) call `attachInternals()` in their
 * constructor via the form-associated mixin, so simply *constructing* one in a
 * test throws `this.attachInternals is not a function`.
 *
 * We add a minimal, idempotent stub so those elements can be mounted in the
 * unit tests. It only fills the surface @material/web touches (ARIA reflection +
 * form state setters) and is installed ONLY when the real API is absent — in a
 * real browser the native implementation is used untouched.
 */
if (typeof HTMLElement !== "undefined" && !HTMLElement.prototype.attachInternals) {
  // A no-op-ish ElementInternals: enough for @material/web's mixins to read/write
  // without throwing. Stored per-element so repeated reads return the same object.
  const store = new WeakMap<HTMLElement, unknown>();
  (HTMLElement.prototype as unknown as {
    attachInternals(): unknown;
  }).attachInternals = function attachInternals(this: HTMLElement): unknown {
    const existing = store.get(this);
    if (existing) return existing;
    const internals = {
      // ARIA mixin properties @material/web sets/reads.
      role: null as string | null,
      ariaLabel: null as string | null,
      ariaValueNow: null as string | null,
      ariaValueText: null as string | null,
      ariaValueMin: null as string | null,
      ariaValueMax: null as string | null,
      ariaDisabled: null as string | null,
      ariaChecked: null as string | null,
      states: new Set<string>(),
      // Form-associated setters — accept and ignore in the test env.
      setFormValue(): void {},
      setValidity(): void {},
      checkValidity(): boolean {
        return true;
      },
      reportValidity(): boolean {
        return true;
      },
      get form(): null {
        return null;
      },
      get labels(): never[] {
        return [];
      },
      get validity(): { valid: boolean } {
        return { valid: true };
      },
      get validationMessage(): string {
        return "";
      },
      get willValidate(): boolean {
        return true;
      },
    };
    store.set(this, internals);
    return internals;
  };
}

/**
 * Node ≥22 ships an experimental global `localStorage` that is `undefined`
 * unless the process runs with `--localstorage-file`. That own-property shadows
 * the happy-dom Storage vitest would otherwise expose, so every test touching
 * localStorage crashes with "Cannot read properties of undefined". Install an
 * in-memory Storage ONLY when the global is missing/undefined — real browsers
 * and fixed Node versions keep their native implementation.
 */
const localStorageBroken = (() => {
  try {
    return typeof localStorage === "undefined" || localStorage == null;
  } catch {
    return true;
  }
})();
if (localStorageBroken) {
  const data = new Map<string, string>();
  const storage: Storage = {
    get length(): number {
      return data.size;
    },
    clear: (): void => data.clear(),
    getItem: (key: string): string | null =>
      data.has(key) ? (data.get(key) as string) : null,
    key: (index: number): string | null => [...data.keys()][index] ?? null,
    removeItem: (key: string): void => {
      data.delete(key);
    },
    setItem: (key: string, value: string): void => {
      data.set(key, String(value));
    },
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: storage,
    configurable: true,
    writable: true,
  });
}
