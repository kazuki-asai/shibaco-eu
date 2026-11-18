<template>
  <section class="section">
    <div class="container">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="product" class="product-detail">
        <ProductDetailLeftArea :product="product" />
        <ProductDetailRightArea :product="product" @add-to-cart="addToCart" />
      </div>
      <div v-else class="not-found">Product not found.</div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import axios from 'axios'
import ProductDetailLeftArea from '@/components/ProductDetail/ProductDetailLeftArea.vue'
import ProductDetailRightArea from '@/components/ProductDetail/ProductDetailRightArea.vue'
import { useCart } from '@/composables/useCart'

const SITE_ORIGIN = 'https://eu.shiba-co.com'

function toAbsoluteUrl(url) {
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url
  return `${SITE_ORIGIN}${url.startsWith('/') ? url : `/${url}`}`
}

function buildProductJsonLd(product, productId) {
  const images = (product.images || []).map(toAbsoluteUrl).filter(Boolean)
  const image = images.length === 1 ? images[0] : images.length > 1 ? images : undefined
  const price = Number(String(product.price).replace(/,/g, ''))

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    ...(image && { image }),
    ...(product.description && { description: product.description }),
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
      url: `${SITE_ORIGIN}/products/${productId}`,
    },
  }
}

export default {
  components: { ProductDetailLeftArea, ProductDetailRightArea },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const product = ref(null)
    const loading = ref(true)
    const { addToCart: _addToCart } = useCart()

    useHead({
      title: computed(() =>
        product.value ? `${product.value.name} | shibaco` : 'Product | shibaco'
      ),
      meta: [
        {
          name: 'description',
          content: computed(() =>
            product.value?.description ||
            (product.value
              ? `${product.value.name} — official shibaco online store.`
              : 'shibaco product details.')
          ),
        },
      ],
      link: computed(() => [
        {
          rel: 'canonical',
          href: `${SITE_ORIGIN}/products/${route.params.id}`,
        },
      ]),
      script: computed(() => {
        if (!product.value) return []
        return [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify(
              buildProductJsonLd(product.value, route.params.id)
            ),
          },
        ]
      }),
    })

    const addToCart = (payload) => {
      _addToCart(payload)
      router.push('/cart')
    }

    onMounted(async () => {
      const res = await axios.get(`/api/products/${route.params.id}`, {
        params: { shop_code: import.meta.env.VITE_SHOP_CODE },
      })
      const p = res.data
      product.value = {
        ...p,
        images: (p.images || []).map(img =>
          img.replace(/^http:\/\/(localhost|host\.docker\.internal):3001/, '')
        ),
      }
      loading.value = false
    })

    return { product, loading, addToCart }
  },
}
</script>

<style scoped>
.section {
  padding: 72px 24px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.loading,
.not-found {
  text-align: center;
  padding: 80px 0;
  color: #666;
}

@media (max-width: 640px) {
  .product-detail {
    grid-template-columns: 1fr;
  }
}
</style>
