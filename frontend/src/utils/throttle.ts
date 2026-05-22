/** Throttle calls; optional trailing flush after quiet period. */

export function throttle<T extends (...args: never[]) => void>(
  fn: T,
  intervalMs: number,
  options?: { trailing?: boolean }
): T & { cancel: () => void } {
  let last = 0;
  let trailingTimer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const wrapped = ((...args: Parameters<T>) => {
    lastArgs = args;
    const now = Date.now();
    const elapsed = now - last;
    if (elapsed >= intervalMs) {
      last = now;
      if (trailingTimer) {
        clearTimeout(trailingTimer);
        trailingTimer = undefined;
      }
      fn(...args);
      return;
    }
    if (options?.trailing && !trailingTimer) {
      trailingTimer = setTimeout(() => {
        trailingTimer = undefined;
        last = Date.now();
        if (lastArgs) fn(...lastArgs);
      }, intervalMs - elapsed);
    }
  }) as T & { cancel: () => void };

  wrapped.cancel = () => {
    if (trailingTimer) clearTimeout(trailingTimer);
    trailingTimer = undefined;
    lastArgs = undefined;
  };

  return wrapped;
}
