export function formatYen(value) {
  if (value == null) return '—'
  const raw = String(value).replace(/,/g, '').trim()
  if (raw === '') return '—'
  const n = Number(raw)
  if (!Number.isFinite(n)) return '—'
  return `¥${Math.round(n).toLocaleString('en-US')}`
}
