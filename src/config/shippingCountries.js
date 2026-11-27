/**
 * Destinations this storefront offers in the checkout country list.
 *
 * A code in this list is not a promise that we can ship there. The quoted
 * price comes from ShopWorks `GET /api/overseas_shipping?country_code=`.
 * `amount: null` means the destination is not available.
 *
 * Edit this list when the seller wants to add or remove a destination.
 * EU member states, EEA (Iceland, Liechtenstein, Norway), the United Kingdom,
 * Switzerland, and the European microstates that commonly shop with them.
 */
export const SHIPPING_COUNTRY_CODES = Object.freeze([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE',
  'IS', 'LI', 'NO',
  'GB', 'CH', 'AD', 'MC', 'SM', 'VA',
])

export function countryName(code, locale = 'en') {
  const normalized = String(code || '').trim().toUpperCase()
  if (!normalized) return ''
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(normalized) || normalized
  } catch {
    return normalized
  }
}

export function shippingCountries(locale = 'en') {
  return SHIPPING_COUNTRY_CODES
    .map((code) => ({ code, name: countryName(code, locale) }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))
}

export function findShippingCountry(code, locale = 'en') {
  const normalized = String(code || '').trim().toUpperCase()
  return shippingCountries(locale).find((country) => country.code === normalized) || null
}
