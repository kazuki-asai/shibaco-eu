import axios from 'axios'

/**
 * GET /api/checkouts/:id
 * Verifies Stripe Checkout session payment status before clearing the cart.
 */
export async function verifyCheckoutSession(sessionId, signal) {
  const { data } = await axios.get(`/api/checkouts/${encodeURIComponent(sessionId)}`, {
    signal,
  })
  return data
}

export function isPaidCheckoutSession(data) {
  return data?.paid === true
}

export function parseCheckoutVerificationError(error) {
  const status = error.response?.status
  const body = error.response?.data

  if (status === 402 || body?.paid === false) {
    return 'Payment has not been completed.'
  }
  if (body?.error) return body.error

  return 'We could not verify your payment. Please try again in a moment.'
}
