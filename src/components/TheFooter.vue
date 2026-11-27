<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="container footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <p class="footer-logo">shibaco</p>
          <p class="footer-tagline">
            Life with a Shiba—<br />freer, more yourself.
          </p>
          <ul class="payment-methods" aria-label="Payment methods">
            <li v-for="method in paymentMethods" :key="method.name">
              <img :src="method.src" :alt="method.name" />
            </li>
          </ul>
        </div>

        <!-- ナビ -->
        <div class="footer-nav">
          <h4>Shop</h4>
          <ul>
            <li v-for="cat in categories" :key="cat.id">
              <RouterLink :to="{ path: '/products', query: { category_id: cat.id } }">{{ cat.name }}</RouterLink>
            </li>
          </ul>
        </div>

        <div class="footer-nav">
          <h4>Brand</h4>
          <ul>
            <li><RouterLink to="/brand-story">Brand story</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="footer-nav">
          <h4>Support</h4>
          <ul>
            <li><RouterLink to="/faq">FAQ</RouterLink></li>
            <li><RouterLink to="/shipping">Shipping</RouterLink></li>
            <li><RouterLink to="/returns">Returns & exchanges</RouterLink></li>
            <li><RouterLink to="/privacy-policy">Privacy policy</RouterLink></li>
            <li><RouterLink to="/legal">Legal notice</RouterLink></li>
            <li><button type="button" class="text-button" @click="openCookieSettings">Cookie settings</button></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2026 shibaco. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import mastercard from '../assets/images/payments/mastercard.svg'
import visa from '../assets/images/payments/visa.svg'

export default {
  setup() {
    const categories = ref([])
    const paymentMethods = [
      { name: 'Mastercard', src: mastercard },
      { name: 'Visa', src: visa },
    ]

    const openCookieSettings = () => {
      window.dispatchEvent(new Event('shibaco:cookie-settings'))
    }

    onMounted(async () => {
      try {
        const res = await axios.get('/api/product_categories', {
          params: { shop_code: import.meta.env.VITE_SHOP_CODE },
        })
        categories.value = Array.isArray(res.data) ? res.data : []
      } catch (err) {
        categories.value = []
        console.error(err)
      }
    })

    return { categories, paymentMethods, openCookieSettings }
  },
}
</script>

<style scoped>
.footer {
  background: #1a2421;
  color: #a8b5af;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer-main {
  padding: 56px 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;
  color: #eef2f0;
  letter-spacing: 0.02em;
  margin: 0 0 12px;
}

.footer-tagline {
  font-size: 0.82rem;
  line-height: 1.8;
  margin: 0 0 24px;
}

.text-button {
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  text-align: left;
}

.text-button:hover {
  color: #fff;
}

.footer-nav h4 {
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  color: #eef2f0;
  font-weight: 600;
  margin: 0 0 16px;
}

.footer-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-nav a {
  font-size: 0.85rem;
  color: #a8b5af;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: #eef2f0;
}

/* ボトム */
.footer-bottom {
  border-top: 1px solid #2a3834;
  padding: 20px 24px;
  text-align: center;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.payment-methods li {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 8px;
  background: #fff;
  border-radius: 4px;
}

.payment-methods img {
  display: block;
  height: 16px;
  width: auto;
}

.footer-bottom p {
  font-size: 0.78rem;
  color: #7a8a84;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
