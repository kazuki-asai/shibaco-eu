<template>
  <section class="section section-gray">
    <div class="container">
      <div class="section-header">
        <span class="section-label">CATEGORIES</span>
        <h2 class="section-title gradient-text">Shop by category</h2>
      </div>

      <div class="carousel-wrap">
        <button
          type="button"
          class="carousel-nav carousel-nav--prev"
          aria-label="Previous categories"
          :disabled="!canScrollPrev"
          @click="scroll(-1)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div
          ref="viewportRef"
          class="carousel-viewport"
          @scroll="updateScrollState"
        >
          <div class="carousel-track">
            <RouterLink
              v-for="cat in categories"
              :key="cat.id"
              :to="{ path: '/products', query: { category_id: cat.id } }"
              class="category-card"
            >
              <img :src="cat.image" :alt="cat.name" />
              <div class="category-label">
                <span class="cat-name">{{ cat.name }}</span>
              </div>
            </RouterLink>
          </div>
        </div>

        <button
          type="button"
          class="carousel-nav carousel-nav--next"
          aria-label="Next categories"
          :disabled="!canScrollNext"
          @click="scroll(1)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const categories = ref([])
    const viewportRef = ref(null)
    const canScrollPrev = ref(false)
    const canScrollNext = ref(false)
    let resizeObserver = null

    const updateScrollState = () => {
      const el = viewportRef.value
      if (!el) return
      canScrollPrev.value = el.scrollLeft > 2
      canScrollNext.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 2
    }

    const scroll = (direction) => {
      const el = viewportRef.value
      if (!el) return
      const card = el.querySelector('.category-card')
      const gap = 20
      const step = card ? card.offsetWidth + gap : el.clientWidth
      el.scrollBy({ left: direction * step, behavior: 'smooth' })
    }

    onMounted(async () => {
      const res = await axios.get('/api/product_categories', {
        params: { shop_code: import.meta.env.VITE_SHOP_CODE },
      })
      categories.value = res.data.map(cat => ({
        ...cat,
        image: (cat.image || '').replace(/^http:\/\/(localhost|host\.docker\.internal):\d+/, ''),
      }))

      await nextTick()
      updateScrollState()

      if (viewportRef.value && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(updateScrollState)
        resizeObserver.observe(viewportRef.value)
      }
    })

    onUnmounted(() => {
      resizeObserver?.disconnect()
    })

    watch(categories, async () => {
      await nextTick()
      updateScrollState()
    })

    return {
      categories,
      viewportRef,
      canScrollPrev,
      canScrollNext,
      scroll,
      updateScrollState,
    }
  },
}
</script>

<style scoped>
.section {
  padding: 72px 24px;
}

.section-gray {
  background: #f8f8f8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-label {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  font-weight: 600;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 8px 0 0;
}

.carousel-wrap {
  position: relative;
}

.carousel-viewport {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  container-type: inline-size;
}

.carousel-viewport::-webkit-scrollbar {
  display: none;
}

.carousel-track {
  display: flex;
  gap: 20px;
}

.category-card {
  position: relative;
  flex: 0 0 auto;
  width: calc((100cqi - 40px) / 3);
  scroll-snap-align: start;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  text-decoration: none;
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.category-card:hover img {
  transform: scale(1.04);
}

.category-label {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.3s;
}

.category-card:hover .category-label {
  background: rgba(0, 0, 0, 0.5);
}

.cat-name {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 700;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid #e8e8e8;
  border-radius: 50%;
  background: #fff;
  color: #4a4a4a;
  cursor: pointer;
  transform: translateY(-50%);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: color 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.carousel-nav:hover:not(:disabled) {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.carousel-nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.carousel-nav--prev {
  left: -12px;
}

.carousel-nav--next {
  right: -12px;
}

@media (max-width: 960px) {
  .category-card {
    width: calc((100cqi - 20px) / 2);
  }
}

@media (max-width: 640px) {
  .category-card {
    width: calc(100cqi * 0.78);
  }

  .carousel-nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 48px 16px;
  }
}
</style>
