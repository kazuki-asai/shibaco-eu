/**
 * Storefront facts that must stay aligned with ShopWorks checkout.
 *
 * Stripe line items in ShopWorks are created with currency `jpy`
 * (`app/controllers/api/checkouts_controller.rb`). Do not display another
 * currency until that API charges it and product prices are stored in it.
 */

function envValue(key) {
  const env = import.meta.env
  if (!env) return undefined
  const value = env[key]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

export const CURRENCY = 'JPY'
export const CURRENCY_SYMBOL = '¥'

export const SITE_ORIGIN = 'https://eu.shiba-co.com'
export const SITE_NAME = 'shibaco'

export const GOOGLE_ANALYTICS_ID = envValue('VITE_GA_MEASUREMENT_ID') || 'G-8108T1M9BS'
export const GOOGLE_ADS_ID = envValue('VITE_GOOGLE_ADS_ID') || 'AW-18390381994'

/** One delivery timeframe, used on the product, shipping, FAQ, and legal pages. */
export const deliveryCopy = {
  production: '5–10 business days',
  transit: 'about 7–14 days',
  summary:
    'We usually ship within 5–10 business days after confirming your order. International delivery then typically takes about 7–14 days, depending on destination and customs.',
}

export const currencyNotice =
  'Prices are in Japanese yen (JPY). Checkout charges Japanese yen.'

export const dutyNotice =
  'Import VAT, customs duty, and the carrier’s handling fees are not included in the price or the shipping charge. You pay those charges to the carrier when the parcel arrives (DAP — Delivered at Place).'
