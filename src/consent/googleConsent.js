import { GOOGLE_ADS_ID, GOOGLE_ANALYTICS_ID } from '@/config/store'

export const CONSENT_STORAGE_KEY = 'shibaco_cookie_consent'

const DENIED = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted',
}

const GRANTED = {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
}

export function readStoredConsent() {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (value === 'granted' || value === 'denied') return value
  } catch {
    /* private mode */
  }
  return null
}

export function storeConsent(choice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    /* private mode */
  }
}

function gtag() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtagStub() {
    window.dataLayer.push(arguments)
  }
  return window.gtag
}

/** Load gtag.js only after the visitor accepts analytics and ads. */
export function enableMeasurement() {
  const tag = gtag()
  tag('consent', 'update', GRANTED)

  if (!document.querySelector('script[data-shibaco-gtag]')) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_ANALYTICS_ID)}`
    script.dataset.shibacoGtag = '1'
    document.head.appendChild(script)
    tag('js', new Date())
    tag('config', GOOGLE_ADS_ID)
    tag('config', GOOGLE_ANALYTICS_ID, { send_page_view: false })
  }
}

export function disableMeasurement() {
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', DENIED)
}

export function trackPageView(to) {
  if (readStoredConsent() !== 'granted') return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: to.fullPath,
    page_location: window.location.href,
    page_title: document.title,
  })
}
