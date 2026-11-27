<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">ALL ARRIVALS</span>
        <h2 class="section-title gradient-text">Featured pieces</h2>
      </div>

      <div class="product-grid">
        <article v-for="product in newArrivals" :key="product.id" class="product-card">
          <RouterLink :to="`/products/${product.id}`" class="product-img-wrap">
            <img :src="product.images[0]" :alt="product.name" />
            <span v-if="product.tag" class="product-tag">{{ product.tag }}</span>
          </RouterLink>
          <div class="product-info">
            <p class="product-name">{{ product.name }}</p>
            <p class="product-price">{{ $money(product.price) }}</p>
          </div>
        </article>
      </div>

      <div class="center">
        <RouterLink to="/products" class="btn-outline">View all products</RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { displayProductTag } from '@/utils/productTag'
import { normalizeProduct } from '@/utils/mediaUrl'

export default {
  setup() {
    const newArrivals = ref([])

    fetchProducts()

    async function fetchProducts() {
      try {
        const res = await axios.get('/api/products', {
          params: { shop_code: import.meta.env.VITE_SHOP_CODE },
        })
        const items = res.data.products ?? res.data
        newArrivals.value = (Array.isArray(items) ? items : []).map((product) => {
          const normalized = normalizeProduct(product)
          return { ...normalized, tag: displayProductTag(normalized.tag) }
        })
      } catch (err) {
        newArrivals.value = []
        console.error(err)
      }
    }

    return {
      newArrivals,
    }
  },
}
</script>


<style scoped>
.section {
  padding: 72px 24px;
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

/* 商品グリッド */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.product-card {
  display: flex;
  flex-direction: column;
}

.product-img-wrap {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f0f0f0;
}

.product-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-img-wrap:hover img {
  transform: scale(1.04);
}

.product-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  padding: 3px 8px;
}

.product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  opacity: 0;
  transition: opacity 0.3s;
}

.product-img-wrap:hover .product-overlay {
  opacity: 1;
}

.product-info {
  padding: 12px 0 0;
}

.product-name {
  font-size: 0.85rem;
  color: #333;
  margin: 0 0 6px;
  line-height: 1.4;
}

.product-price {
  font-size: 0.9rem;
  color: #1a1a1a;
  font-weight: 600;
  margin: 0;
}

.center {
  text-align: center;
}

.btn-outline {
  display: inline-block;
  padding: 12px 40px;
  border: 1.5px solid #1a1a1a;
  color: #1a1a1a;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  transition: background 0.2s, color 0.2s;
}

.btn-outline:hover {
  background: #1a1a1a;
  color: #fff;
}

@media (max-width: 960px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .section {
    padding: 48px 16px;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>
