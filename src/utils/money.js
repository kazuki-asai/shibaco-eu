import { CURRENCY, CURRENCY_SYMBOL } from '../config/store.js'

/** Format a ShopWorks yen amount. JPY is a zero-decimal currency. */
export function formatMoney(amount) {
  if (amount == null || amount === '') return '—'
  const n = Number(amount)
  if (!Number.isFinite(n)) return '—'
  return `${CURRENCY_SYMBOL}${Math.round(n).toLocaleString('en-GB')} ${CURRENCY}`
}
