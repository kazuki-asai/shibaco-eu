import axios from 'axios'

/**
 * Normalizes API JSON for prefecture-based shipping (yen, integer).
 */
export function parseShippingFeeFromResponse(data) {
  if (data == null || typeof data !== 'object') return null
  const nested = data.prefecture_shipping ?? data.data
  const candidates = [
    data.shipping_fee,
    data.amount,
    data.fee,
    data.price,
    data.shipping_amount,
    nested?.shipping_fee,
    nested?.amount,
    nested?.fee,
    nested?.price,
  ]
  for (const c of candidates) {
    if (c == null || c === '') continue
    const n = Number(c)
    if (Number.isFinite(n) && n >= 0) return Math.round(n)
  }
  return null
}

/**
 * GET /api/prefecture_shipping?prefecture_id=…
 * Shop is resolved via axios default header X-Shop-Code (see main.js).
 */
export async function fetchPrefectureShipping(prefectureId, signal) {
  const { data } = await axios.get('/api/prefecture_shipping', {
    params: { prefecture_id: prefectureId },
    signal,
  })
  return parseShippingFeeFromResponse(data)
}

/**
 * GET /api/prefecture_shippings
 * Returns an array of { prefectureId, prefectureName, shippingFee }.
 */
export async function fetchAllPrefectureShippings(signal) {
  const { data } = await axios.get('/api/prefecture_shippings', { signal })
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.prefecture_shippings)
      ? data.prefecture_shippings
      : Array.isArray(data?.data)
        ? data.data
        : []
  return list.map((item) => ({
    prefectureId: item.prefecture_id ?? item.id ?? null,
    prefectureName: item.prefecture_name ?? item.name ?? '',
    shippingFee: parseShippingFeeFromResponse(item),
  }))
}
