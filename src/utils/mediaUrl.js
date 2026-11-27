/** Drop a local Rails/Vite host so image paths stay usable after prerender. */
export function normalizeMediaUrl(url) {
  if (!url) return url
  return String(url).replace(
    /^https?:\/\/(?:localhost|host\.docker\.internal|127\.0\.0\.1)(?::\d+)?/i,
    '',
  )
}

export function normalizeProduct(product) {
  return {
    ...product,
    images: (product.images || []).map((img) => normalizeMediaUrl(img)),
  }
}
