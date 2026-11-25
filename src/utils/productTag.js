/**
 * API の tag は { key, name }。key が none（表示名「なし」）のときは出さない。
 * それ以外は表示名だけ返す。
 */
export function displayProductTag(tag) {
  if (tag == null || tag === '') return null

  if (typeof tag === 'string') {
    const label = tag.trim()
    if (!label || label === 'なし' || label.toLowerCase() === 'none') return null
    return label
  }

  if (typeof tag !== 'object') return null

  const key = tag.key ?? tag.value
  if (key === 'none' || key === 0) return null

  const name = String(tag.name ?? '').trim()
  if (!name || name === 'なし') return null
  return name
}
