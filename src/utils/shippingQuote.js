import { countryName } from '../config/shippingCountries.js'

/**
 * ShopWorks overseas shipping:
 * - GET /api/overseas_shippings → [{ country_code, country_name, amount }]
 * - GET /api/overseas_shipping?country_code= → { country_code, country_name, amount }
 *
 * `amount: null` means the shop has not set a rate (not free).
 * There is no `unavailable` flag on this resource today; if one is added, honour it.
 * Amount 0 is the only case that may be shown as free.
 */
export function parseAmount(value) {
  if (value == null || value === '') return null
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  return Math.round(n)
}

export function quoteFromPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return {
      status: 'error',
      amount: null,
      countryCode: '',
      message: 'Could not retrieve shipping cost.',
    }
  }

  const countryCode = String(payload.country_code ?? payload.countryCode ?? '')
    .trim()
    .toUpperCase()
  const flaggedUnavailable = payload.unavailable === true || payload.available === false
  const amount = parseAmount(payload.amount ?? payload.shipping_fee ?? payload.fee)

  if (flaggedUnavailable || amount == null) {
    return {
      status: 'unavailable',
      amount: null,
      countryCode,
      message: 'We cannot ship to this country yet.',
    }
  }

  return {
    status: 'quoted',
    amount,
    countryCode,
    message: null,
  }
}

export function normalizeShippingList(data) {
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.overseas_shippings)
      ? data.overseas_shippings
      : Array.isArray(data?.data)
        ? data.data
        : []

  return list
    .map((item) => {
      const quote = quoteFromPayload(item)
      if (!quote.countryCode) return null
      return {
        ...quote,
        countryName: countryName(quote.countryCode),
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.countryName.localeCompare(b.countryName, 'en'))
}
