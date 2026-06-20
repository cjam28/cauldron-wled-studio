import type { ReactiveController, ReactiveControllerHost } from "lit";

export interface StudioNavOptions<V extends string> {
  /** The initial view (normalized through {@link StudioNavOptions.normalize}). */
  initial: V;
  /**
   * Map a requested view to a valid one. Used to keep a hidden/forbidden view
   * from ever becoming active — e.g. the panel maps "segments" -> "color", and
   * the card maps any non-visible tab -> the first visible one. Runs at
   * construction, on every {@link StudioNavController.select}, and on
   * {@link StudioNavController.revalidate}. Defaults to identity.
   */
  normalize?: (view: V) => V;
}

/**
 * Owns the active view for a studio surface. The redirect invariant (never land
 * on a hidden view) is enforced at the source via `normalize`, so it holds
 * regardless of update timing — unlike a willUpdate guard, which only fires when
 * the view is a tracked reactive property.
 */
export class StudioNavController<V extends string> implements ReactiveController {
  private _view: V;
  private readonly _normalize: (view: V) => V;

  constructor(
    private readonly host: ReactiveControllerHost,
    opts: StudioNavOptions<V>
  ) {
    host.addController(this);
    this._normalize = opts.normalize ?? ((v) => v);
    this._view = this._normalize(opts.initial);
  }

  hostConnected(): void {
    /* no-op */
  }

  get view(): V {
    return this._view;
  }

  /** Switch to a view, normalizing away hidden/forbidden targets. */
  select(view: V): void {
    const next = this._normalize(view);
    if (next === this._view) return;
    this._view = next;
    this.host.requestUpdate();
  }

  /**
   * Re-validate the current view against `normalize` (e.g. after the set of
   * visible views changed) and redirect if it is now hidden.
   */
  revalidate(): void {
    const next = this._normalize(this._view);
    if (next === this._view) return;
    this._view = next;
    this.host.requestUpdate();
  }
}
