export function track(event, payload = {}) {
  try {
    if (window && window.dataLayer) window.dataLayer.push({ event, ...payload })
    if (window && window.gtag) window.gtag('event', event, payload)
  } catch {}
  console.log('[analytics]', event, payload)
}