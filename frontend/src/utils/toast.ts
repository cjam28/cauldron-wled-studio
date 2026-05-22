/** Bubble a toast request to the nearest `wled-toast-host` (composed + bubbling). */
export const WLED_TOAST_EVENT = "wled-toast";

export interface WledToastDetail {
  message: string;
}

export function showToast(source: HTMLElement, message: string): void {
  const text = message.trim();
  if (!text) return;
  source.dispatchEvent(
    new CustomEvent<WledToastDetail>(WLED_TOAST_EVENT, {
      detail: { message: text },
      bubbles: true,
      composed: true,
    })
  );
}
