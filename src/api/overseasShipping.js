import axios from 'axios'

const regionNames = typeof Intl.DisplayNames === 'function'
  ? new Intl.DisplayNames(['en'], { type: 'region' })
  : null

function parseAmount(value) {
  if (value == null || value === '') return null
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  return Math.round(n)
}

function englishCountryName(code, fallback) {
  const iso = String(code ?? '').trim().toUpperCase()
  if (!regionNames || !/^[A-Z]{2}$/.test(iso)) return fallback
  try {
    const name = regionNames.of(iso)
    return name && name !== iso ? name : fallback
  } catch {
    return fallback
  }
}

/**
 * GET /api/overseas_shippings
 * countryName is the English label for the UI.
 * prefectureName is the API country name, and the value checkout submits.
 */
export async function fetchOverseasShippings(signal) {
  const { data } = await axios.get('/api/overseas_shippings', { signal })
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.overseas_shippings)
      ? data.overseas_shippings
      : Array.isArray(data?.data)
        ? data.data
        : []

  return list
    .map((item) => {
      const code = String(item?.country_code ?? '').trim().toUpperCase()
      const prefectureName = String(item?.country_name ?? item?.name ?? '').trim()
      const countryName = englishCountryName(code, prefectureName)
      if (!countryName && !prefectureName) return null
      return {
        id: code || prefectureName || countryName,
        countryName: countryName || prefectureName,
        prefectureName,
        shippingFee: parseAmount(item?.amount ?? item?.shipping_fee ?? item?.fee),
      }
    })
    .filter(Boolean)
}
