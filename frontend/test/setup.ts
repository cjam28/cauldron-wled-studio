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
