<template>
  <section class="hero" data-no-rise>
    <div class="slides">
      <div
        v-for="(slide, i) in slides"
        :key="slide.id"
        class="slide"
        :class="{ active: i === current }"
      >
        <img
          :src="slide.image"
          :alt="slide.title.replace(/\n/g, '')"
          :style="slide.objectPosition ? { objectPosition: slide.objectPosition } : undefined"
        />
        <div class="slide-content">
          <div v-if="slide.badge" class="slide-top">
            <span class="badge">{{ slide.badge }}</span>
          </div>
          <h1 class="title">{{ slide.title }}</h1>
          <RouterLink :to="slide.link" class="btn">
            <span>Shop now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- スライドカウンター -->
    <div class="counter">
      <span class="counter-current">{{ String(current + 1).padStart(2, '0') }}</span>
      <span class="counter-sep"></span>
      <span class="counter-total">{{ String(slides.length).padStart(2, '0') }}</span>
    </div>

    <!-- 前後ボタン -->
    <div class="arrows">
      <button class="arrow" @click="prev" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button class="arrow" @click="next" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>

    <div class="hero-dock">
      <div class="progress-bars">
        <button
          v-for="(_, i) in slides"
          :key="i"
          class="progress-bar"
          :class="{ active: i === current }"
          @click="goTo(i)"
          :aria-label="`Slide ${i + 1}`"
        />
      </div>

      <div class="shop-strip">
        <p class="hero-note">Made to order. We print after you order and usually ship within 5–10 business days.</p>
        <div class="shop-strip-links">
          <RouterLink to="/products" class="shop-strip-item shop-strip-item--cta">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span>All products</span>
          </RouterLink>
          <template v-for="cat in categories" :key="cat.id">
            <span class="shop-strip-sep" aria-hidden="true"></span>
            <RouterLink
              :to="{ path: '/products', query: { category_id: cat.id } }"
              class="shop-strip-item"
            >{{ cat.name }}</RouterLink>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const slides = [
      {
        id: 1,
        image: new URL('../assets/images/top.png', import.meta.url).href,
        objectPosition: 'center 42%',
        badge: 'NEW ARRIVAL',
        title: 'Made with love for Shiba Inus—\ncrafted by shibaco',
        link: '/products',
      },
      {
        id: 2,
        image: new URL('../assets/images/suki.png', import.meta.url).href,
        title: 'Shiba motifs made for everyday wear—\na piece you’ll reach for often',
        link: '/products',
      },
      {
        id: 3,
        image: new URL('../assets/images/suri.png', import.meta.url).href,
        title: 'Hand-finished silk-screen prints,\none piece at a time',
        link: '/products',
      },
    ]

    const categories = ref([])
    const current = ref(0)
    let timer = null

    const next = () => {
      current.value = (current.value + 1) % slides.length
    }

    const prev = () => {
      current.value = (current.value - 1 + slides.length) % slides.length
    }

    const goTo = (i) => {
      current.value = i
    }

    onMounted(async () => {
      timer = setInterval(next, 5000)
      const res = await axios.get('/api/product_categories', {
        params: { shop_code: import.meta.env.VITE_SHOP_CODE },
      })
      categories.value = res.data
    })

    onUnmounted(() => {
      clearInterval(timer)
    })

    return { slides, categories, current, next, prev, goTo }
  },
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;
  height: min(88vh, 820px);
  min-height: 420px;
  background: #0a0a0a;
}

.slides {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  transform: scale(1.03);
  transition: transform 6s ease;
}

.slide.active img {
  transform: scale(1);
}

.brand-tagline {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 8vh 7vw 0;
  pointer-events: none;
}

.brand-tagline p {
  margin: 0;
  max-width: 36em;
  font-size: clamp(0.85rem, 1.8vw, 1.05rem);
  line-height: 2;
  letter-spacing: 0.04em;
  font-weight: 300;
}

.tagline-line {
  display: block;
}

.brand-name {
  font-weight: 600;
  letter-spacing: 0.14em;
  color: #fff;
}

.tagline-body {
  color: rgba(255, 255, 255, 0.72);
}

.tagline-highlight {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

.slide-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8vh 7vw 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.62) 0%,
    rgba(0, 0, 0, 0.22) 38%,
    transparent 68%
  );
}


.title {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 3.2vw, 2.15rem);
  color: #fff;
  font-weight: 400;
  line-height: 1.35;
  margin: 0 0 36px;
  letter-spacing: 0.01em;
  white-space: pre-line;
  max-width: 14em;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 0 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  font-weight: 400;
  transition: color 0.2s, border-color 0.2s, gap 0.2s;
}

.btn:hover {
  color: #fff;
  border-color: #fff;
  gap: 16px;
}

.slide-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.badge {
  display: inline-block;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  color: #fff;
  background: rgba(45, 90, 78, 0.9);
  padding: 3px 10px;
  font-weight: 500;
}

.hero-dock {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
}

/* ショップ導線 */
.shop-strip {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 2px;
  padding: 10px 7vw 8px;
  background: rgba(26, 36, 33, 0.88);
}

.hero-note {
  margin: 0;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.45;
  color: #f4f7f6;
}

.shop-strip-links {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  min-height: 44px;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.shop-strip-links::-webkit-scrollbar {
  display: none;
}

.shop-strip::-webkit-scrollbar {
  display: none;
}

.shop-strip-item {
  flex: 0 0 auto;
  font-size: 0.8125rem;
  letter-spacing: 0.12em;
  color: #f4f7f6;
  text-decoration: none;
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
  white-space: nowrap;
}

.shop-strip-item:first-child {
  padding-left: 0;
}

.shop-strip-item:hover {
  color: #fff;
}

.shop-strip-item--cta {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.shop-strip-sep {
  flex: 0 0 auto;
  display: block;
  width: 1px;
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
}

/* カウンター */
.counter {
  position: absolute;
  right: 7vw;
  bottom: calc(10vh + 16px);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  font-weight: 300;
}

.counter-current {
  color: #fff;
  font-weight: 400;
}

.counter-sep {
  display: block;
  width: 24px;
  height: 1px;
  background: rgba(255, 255, 255, 0.35);
}

/* 矢印 */
.arrows {
  position: absolute;
  right: 7vw;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
}

.arrow {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.7);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.arrow:hover {
  border-color: rgba(255, 255, 255, 0.8);
  color: #fff;
}

/* プログレスバー */
.progress-bars {
  display: flex;
  margin-bottom: 4px;
}

.progress-bar {
  flex: 1;
  height: 2px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: background 0.3s;
}

.progress-bar::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  transform: scaleX(0);
  transform-origin: left;
  transition: none;
}

.progress-bar.active::after {
  transform: scaleX(1);
  transition: transform 5s linear;
}

@media (max-width: 768px) {
  .hero {
    height: 52vh;
    min-height: 280px;
    max-height: none;
  }

  .brand-tagline {
    padding: 6vh 6vw 0;
  }

  .brand-tagline p {
    line-height: 1.85;
  }

  .slide-content {
    padding: 6vh 6vw 0;
  }

  .title {
    font-size: clamp(0.85rem, 3.2vw, 1rem);
    margin-bottom: 24px;
  }

  .arrows {
    display: none;
  }

  .counter {
    right: 6vw;
    bottom: calc(12vh + 16px + 48px);
  }

  .shop-strip {
    padding: 0 6vw;
  }

  .shop-strip-item {
    padding: 0 12px;
  }
}
</style>
