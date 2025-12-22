export function track(event, payload = {}) {
  try {
    if (window && window.dataLayer) window.dataLayer.push({ event, ...payload })
    if (window && window.gtag) window.gtag('event', event, payload)
  } catch { }
  // Only log analytics events in development mode
  if (import.meta.env.DEV) {
    console.log('[analytics]', event, payload);
  }
}