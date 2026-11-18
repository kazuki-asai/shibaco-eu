/**
 * Positive integer prefecture id for /api/prefecture_shipping.
 */
export function normalizePrefectureId(selected) {
  if (selected === '' || selected == null) return null
  if (typeof selected === 'number' && Number.isInteger(selected) && selected > 0) {
    return selected
  }
  if (typeof selected === 'string') {
    const n = Number.parseInt(selected, 10)
    if (Number.isInteger(n) && n > 0 && String(n) === selected.trim()) return n
  }
  return null
}
