<template>
  <section class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-label">ALL ITEMS</span>
        <h1 class="section-title">All products</h1>
      </div>

      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="loadError" class="loading">{{ loadError }}</div>
      <div v-else-if="products.length === 0" class="loading">No products to show.</div>

      <div v-else class="product-grid">
        <article v-for="product in products" :key="product.id" class="product-card">
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
    </div>
  </section>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import axios from 'axios'
import { displayProductTag } from '@/utils/productTag'
import { apiErrorMessage } from '@/utils/apiError'
import { normalizeProduct } from '@/utils/mediaUrl'

const SHOP_CODE = import.meta.env.VITE_SHOP_CODE

export default {
  setup() {
    useHead({
      title: 'All products | shibaco',
      meta: [
        {
          name: 'description',
          content: 'Browse shibaco — Shiba Inu motif silk-screen apparel for everyday wear.',
        },
      ],
      link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/products' }],
    })

    const route = useRoute()
    const products = ref([])
    const loading = ref(true)
    const loadError = ref(null)

    watch(() => route.query.category_id, fetchProducts, { immediate: true })

    async function fetchProducts() {
      loading.value = true
      loadError.value = null
      const categoryId = route.query.category_id
      const url = categoryId ? '/api/products/search_products' : '/api/products'
      const params = { shop_code: SHOP_CODE }
      if (categoryId) params.product_category_id = categoryId

      try {
        const res = await axios.get(url, { params })
        const items = res.data.products ?? res.data
        products.value = (Array.isArray(items) ? items : []).map((product) => {
          const normalized = normalizeProduct(product)
          return { ...normalized, tag: displayProductTag(normalized.tag) }
        })
      } catch (err) {
        products.value = []
        loadError.value = apiErrorMessage(err, 'Products could not be loaded. Please refresh and try again.')
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    return { products, loading, loadError }
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
  color: #1a1a1a;
  margin: 8px 0 0;
}

.loading {
  text-align: center;
  padding: 48px;
  color: #999;
  font-size: 0.9rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
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
