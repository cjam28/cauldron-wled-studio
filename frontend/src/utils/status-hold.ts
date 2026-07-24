/**
 * Sticky visibility for the flapping "throttled" hint.
 *
 * A remote viewer receives drop-marked frames interleaved with clean ones at
 * frame rate, so rendering the hint directly from the last frame's status
 * makes it strobe — and when the hint occupies flow layout, the content below
 * shifts up and down with it. The hold keeps the hint active for `holdMs`
 * past the LAST throttled frame: it appears once and stays steady while
 * coalescing continues, then quietly goes away.
 */
export class StatusHold {
  private timer?: ReturnType<typeof setTimeout>;
  private _active = false;

  constructor(
    private readonly onChange: (active: boolean) => void,
    private readonly holdMs = 4000
  ) {}

  get active(): boolean {
    return this._active;
  }

  /** Call on every frame that carries the transient condition. */
  ping(): void {
    if (!this._active) {
      this._active = true;
      this.onChange(true);
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this._active = false;
      this.onChange(false);
    }, this.holdMs);
  }

  /** Cancel any pending deactivation (component teardown). */
  clear(): void {
    clearTimeout(this.timer);
    this.timer = undefined;
    this._active = false;
  }
}
