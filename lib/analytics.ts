// Minimal GA4 helper. Uses the existing gtag snippet in app/layout.tsx (G-1K39B4GLWB).
// Safe no-op if gtag hasn't loaded (ad blockers, SSR).
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', name, params);
  } catch {
    // never let analytics break the UI
  }
}
