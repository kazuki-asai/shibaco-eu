import axios from 'axios'
import { normalizeShippingList, quoteFromPayload } from '@/utils/shippingQuote'

/**
 * GET /api/overseas_shippings
 * Configured destinations only. An empty array means no rates are published.
 */
export async function fetchOverseasShippings(signal) {
  const { data } = await axios.get('/api/overseas_shippings', { signal })
  return normalizeShippingList(data)
}

/**
 * GET /api/overseas_shipping?country_code=
 * Unconfigured countries return amount: null. That is not free shipping.
 */
export async function fetchOverseasShipping(countryCode, signal) {
  const code = String(countryCode || '').trim().toUpperCase()
  const { data } = await axios.get('/api/overseas_shipping', {
    signal,
    params: { country_code: code },
  })
  return quoteFromPayload({ ...data, country_code: data?.country_code || code })
}
