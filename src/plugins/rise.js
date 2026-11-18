// rise.js
// 画面に入ったタイミングで要素を「下からせり上がる」ように出現させる。
//
// やっていること:
//   1. ページ内のセクション・カード・見出しなど主要ブロックに `.rise` を自動付与
//   2. IntersectionObserver で viewport に入った要素に `.rise-in` を付与して再生
//   3. MutationObserver で動的に追加された要素（ルート遷移 / API 取得結果など）も自動追従
//   4. `v-rise` ディレクティブで任意の要素を明示的に登録可能
//   5. `data-no-rise` 属性で個別オプトアウト可能
//   6. prefers-reduced-motion: reduce のユーザーには適用しない

// せり上がりを自動付与するセレクタ
const AUTO_SELECTORS = [
  'main > *',
  'section',
  '.section',
  '.form-section',
  '.story-section',
  '.story-block',
  '.cta-section',
  '.page-header',
  '.section-header',
  '.notice',
  '.cta',
  '.product-card',
  '.category-card',
  '.process-card',
].join(',')

const SAFE_WINDOW = typeof window !== 'undefined'
const PREFERS_REDUCED_MOTION =
  SAFE_WINDOW &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let intersectionObserver = null
let mutationObserver = null
const observedElements = new WeakSet()

function ensureIntersectionObserver() {
  if (intersectionObserver) return intersectionObserver
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('rise-in')
          intersectionObserver.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  )
  return intersectionObserver
}

function shouldSkip(el) {
  if (!(el instanceof Element)) return true
  if (observedElements.has(el)) return true
  if (el.hasAttribute('data-no-rise')) return true
  if (el.closest('[data-no-rise-children]')) return true
  return false
}

function track(el) {
  if (shouldSkip(el)) return
  observedElements.add(el)
  el.classList.add('rise')
  ensureIntersectionObserver().observe(el)
}

function scan(root) {
  if (PREFERS_REDUCED_MOTION) return
  if (!root) return
  if (root instanceof Element && root.matches(AUTO_SELECTORS)) {
    track(root)
  }
  if (typeof root.querySelectorAll === 'function') {
    root.querySelectorAll(AUTO_SELECTORS).forEach(track)
  }
}

function startMutationObserver(target) {
  if (mutationObserver || PREFERS_REDUCED_MOTION) return
  mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) scan(node)
      })
    }
  })
  mutationObserver.observe(target, { childList: true, subtree: true })
}

export default {
  install(app) {
    app.directive('rise', {
      mounted(el) {
        track(el)
      },
    })

    if (!SAFE_WINDOW || PREFERS_REDUCED_MOTION) return

    const init = () => {
      const target = document.body
      scan(target)
      startMutationObserver(target)
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once: true })
    } else {
      init()
    }
  },
}
