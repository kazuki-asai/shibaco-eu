import { ref } from 'vue'
import { fetchOverseasShipping } from '@/api/overseasShipping'
import { apiErrorMessage } from '@/utils/apiError'

export function useCountryShipping() {
  const status = ref('idle')
  const amount = ref(null)
  const error = ref(null)
  let requestId = 0

  async function load(countryCode) {
    const token = ++requestId
    const code = String(countryCode || '').trim()
    if (!code) {
      status.value = 'idle'
      amount.value = null
      error.value = null
      return
    }

    status.value = 'loading'
    amount.value = null
    error.value = null

    try {
      const quote = await fetchOverseasShipping(code)
      if (token !== requestId) return
      if (quote.status === 'quoted') {
        status.value = 'quoted'
        amount.value = quote.amount
        return
      }
      status.value = 'unavailable'
      amount.value = null
      error.value = quote.message
    } catch (err) {
      if (token !== requestId) return
      status.value = 'error'
      amount.value = null
      error.value = apiErrorMessage(err, 'Could not retrieve shipping cost.')
    }
  }

  return { status, amount, error, load }
}
