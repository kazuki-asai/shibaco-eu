const KNOWN_MESSAGES = [
  [
    /shipping_fee/,
    'The shop could not confirm this shipping cost, so the order was not sent to payment.',
  ],
  [/都道府県|配送できません/, 'We cannot ship to this address.'],
  [/country_code/, 'Please select a country.'],
]

function rawMessage(error) {
  const data = error?.response?.data
  if (!data || typeof data !== 'object') return ''
  if (typeof data.error === 'string' && data.error.trim()) return data.error.trim()
  if (Array.isArray(data.errors) && data.errors.length) {
    return data.errors.map((item) => String(item).trim()).filter(Boolean).join(' ')
  }
  return ''
}

/** English message for a failed ShopWorks request. Japanese API text is not shown raw. */
export function apiErrorMessage(error, fallback) {
  const raw = rawMessage(error)
  if (!raw) return fallback
  for (const [pattern, message] of KNOWN_MESSAGES) {
    if (pattern.test(raw)) return message
  }
  // ー is Script=Common, so it is listed beside the three Japanese scripts.
  if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]/u.test(raw)) return fallback
  return raw
}
