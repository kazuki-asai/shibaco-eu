import axios from 'axios'

function parseAmount(value) {
  if (value == null || value === '') return null
  const n = Number(value)
  if (!Number.isFinite(n) || n < 0) return null
  return Math.round(n)
}

/**
 * GET /api/overseas_shippings
 * Returns { countryName, shippingFee } for each destination.
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
      const countryName = String(item?.country_name ?? item?.name ?? '').trim()
      if (!countryName) return null
      return {
        countryName,
        shippingFee: parseAmount(item?.amount ?? item?.shipping_fee ?? item?.fee),
      }
    })
    .filter(Boolean)
}
