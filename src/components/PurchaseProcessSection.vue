<template>
  <section class="section process-section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">HOW TO ORDER</span>
        <h2 class="section-title">How to order</h2>
      </div>

      <div class="carousel-wrap">
        <button
          type="button"
          class="carousel-nav carousel-nav--prev"
          aria-label="Previous steps"
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
            <article
              v-for="step in steps"
              :key="step.id"
              class="process-card"
            >
              <span class="step-number">{{ step.number }}</span>
              <div class="step-icon" aria-hidden="true">
                <component :is="step.icon" />
              </div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
            </article>
          </div>
        </div>

        <button
          type="button"
          class="carousel-nav carousel-nav--next"
          aria-label="Next steps"
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
import { ref, onMounted, onUnmounted, nextTick, h } from 'vue'

const IconProduct = {
  render() {
    return h('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
      h('path', { d: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z' }),
      h('line', { x1: 3, y1: 6, x2: 21, y2: 6 }),
      h('path', { d: 'M16 10a4 4 0 0 1-8 0' }),
    ])
  },
}

const IconBaseColor = {
  render() {
    return h('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
      h('circle', { cx: 12, cy: 12, r: 9 }),
      h('circle', { cx: 12, cy: 12, r: 4, fill: 'currentColor', stroke: 'none' }),
    ])
  },
}

const IconSize = {
  render() {
    return h('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
      h('path', { d: 'M4 20V10l8-6 8 6v10' }),
      h('path', { d: 'M9 20v-6h6v6' }),
    ])
  },
}

const IconCart = {
  render() {
    return h('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6 }, [
      h('circle', { cx: 9, cy: 21, r: 1 }),
      h('circle', { cx: 20, cy: 21, r: 1 }),
      h('path', { d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' }),
    ])
  },
}

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Choose a product',
    desc: 'Pick an item you love and open the product page.',
    icon: IconProduct,
  },
  {
    id: 2,
    number: '02',
    title: 'Pick a colour',
    desc: 'Select the garment colour for your tee, hoodie, and more.',
    icon: IconBaseColor,
  },
  {
    id: 3,
    number: '03',
    title: 'Choose a size',
    desc: 'Pick the size that fits you best.',
    icon: IconSize,
  },
  {
    id: 4,
    number: '04',
    title: 'Checkout',
    desc: 'Add to cart, enter your shipping details, and place your order.',
    icon: IconCart,
  },
]

export default {
  setup() {
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
      const card = el.querySelector('.process-card')
      const gap = 20
      const step = card ? card.offsetWidth + gap : el.clientWidth
      el.scrollBy({ left: direction * step, behavior: 'smooth' })
    }

    onMounted(async () => {
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

    return {
      steps,
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

.process-section {
  background: #fff;
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

.process-card {
  flex: 0 0 auto;
  width: calc((100cqi - 60px) / 4);
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 32px 20px 28px;
  background: #fafaf8;
  border: 1px solid #eee;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.process-card:hover {
  border-color: #e8d0b8;
  box-shadow: 0 8px 24px rgba(160, 101, 53, 0.1);
}

.step-number {
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  font-weight: 700;
  color: var(--color-accent);
}

.step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(92, 46, 16, 0.06), rgba(160, 101, 53, 0.12));
  color: #a06535;
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.4;
  letter-spacing: 0.03em;
}

.step-desc {
  font-size: 0.82rem;
  color: #6a6a6a;
  line-height: 1.75;
  margin: 0;
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
  transition: color 0.2s, border-color 0.2s;
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
  .process-card {
    width: calc((100cqi - 20px) / 2);
  }
}

@media (max-width: 640px) {
  .process-card {
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
