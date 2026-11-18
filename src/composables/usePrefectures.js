import { ref } from 'vue'
import axios from 'axios'

const prefectureOptions = ref([])
const loading = ref(false)
const loadError = ref(null)
let inflight = null

function normalizeToOptions(payload) {
  const raw = Array.isArray(payload)
    ? payload
    : (payload?.prefectures ?? payload?.data ?? [])

  return raw
    .map((item) => {
      if (item == null) return null
      if (typeof item === 'string') {
        const label = item.trim()
        return label ? { value: label, label } : null
      }
      const label = String(item.name ?? item.label ?? item.prefecture_name ?? '').trim()
      if (!label) return null
      const rawId = item.id ?? item.prefecture_id
      if (rawId != null && rawId !== '') {
        const id = Number(rawId)
        if (Number.isInteger(id) && id > 0) {
          return { value: id, label }
        }
      }
      return { value: label, label }
    })
    .filter(Boolean)
}

/**
 * Loads Japanese prefectures from GET /api/prefectures.
 * Parsed once per session unless the prior response was empty (e.g. error).
 */
export async function loadPrefectureOptions(force = false) {
  if (!force && prefectureOptions.value.length > 0) return
  if (inflight) return inflight

  loading.value = true
  loadError.value = null

  inflight = (async () => {
    try {
      const { data } = await axios.get('/api/prefectures')
      prefectureOptions.value = normalizeToOptions(data)
      if (!prefectureOptions.value.length) {
        loadError.value = 'Could not load the country/region list.'
      }
    } catch (e) {
      loadError.value = 'Could not load the country/region list. Please refresh the page or try again later.'
      prefectureOptions.value = []
      console.error(e)
    } finally {
      loading.value = false
      inflight = null
    }
  })()

  return inflight
}

export function usePrefectures() {
  return {
    prefectureOptions,
    prefecturesLoading: loading,
    prefecturesLoadError: loadError,
    loadPrefectures: loadPrefectureOptions,
  }
}
