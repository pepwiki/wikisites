/**
 * Lazy-loaded toast wrapper to avoid SSR crash from solid-sonner.
 * solid-sonner calls window.matchMedia at module scope, breaking SSR.
 */

let _toast: typeof import("solid-sonner").toast | null = null;

async function getToast() {
  if (!_toast) {
    const mod = await import("solid-sonner");
    _toast = mod.toast;
  }
  return _toast;
}

export function toastSuccess(message: string) {
  getToast().then((t) => t.success(message));
}

export function toastError(message: string) {
  getToast().then((t) => t.error(message));
}

export function toastInfo(message: string) {
  getToast().then((t) => t(message));
}
