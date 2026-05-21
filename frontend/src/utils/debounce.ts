/** Leading + trailing debounce with optional maxWait (ms). */

export function debounce<T extends (...args: never[]) => void>(
  fn: T,
  waitMs: number,
  maxWaitMs = 100
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let maxTimer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;

  const flush = () => {
    if (timer) clearTimeout(timer);
    if (maxTimer) clearTimeout(maxTimer);
    timer = maxTimer = undefined;
    if (lastArgs) {
      const args = lastArgs;
      lastArgs = undefined;
      fn(...args);
    }
  };

  const wrapped = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, waitMs);
    if (!maxTimer) {
      maxTimer = setTimeout(flush, maxWaitMs);
    }
  }) as T & { cancel: () => void };

  wrapped.cancel = () => {
    if (timer) clearTimeout(timer);
    if (maxTimer) clearTimeout(maxTimer);
    timer = maxTimer = undefined;
    lastArgs = undefined;
  };

  return wrapped;
}
