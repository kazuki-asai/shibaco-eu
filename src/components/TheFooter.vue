<template>
  <footer class="footer">
    <!-- ニュースレター -->
     <!--
    <div class="newsletter">
      <div class="container">
        <p class="newsletter-sub">NEWSLETTER</p>
        <h3>Stay in the loop</h3>
        <p class="newsletter-desc">New arrivals and offers, straight to your inbox.</p>
        <form class="newsletter-form" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
    -->

    <!-- フッター本体 -->
    <div class="footer-main">
      <div class="container footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <p class="footer-logo">shibaco</p>
          <p class="footer-tagline">
            Life with a Shiba—<br />freer, more yourself.
          </p>
          <!--
          <div class="socials">
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" aria-label="X (Twitter)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
              </svg>
            </a>
          </div>
          -->
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
import applePay from '../assets/images/payments/apple-pay.svg'
import googlePay from '../assets/images/payments/google-pay.svg'
import mastercard from '../assets/images/payments/mastercard.svg'
import visa from '../assets/images/payments/visa.svg'

export default {
  setup() {
    const email = ref('')
    const categories = ref([])
    const paymentMethods = [
      { name: 'Apple Pay', src: applePay },
      { name: 'Google Pay', src: googlePay },
      { name: 'Mastercard', src: mastercard },
      { name: 'Visa', src: visa },
    ]

    const subscribe = () => {
      if (email.value) {
        alert(`Thanks — ${email.value} is subscribed.`)
        email.value = ''
      }
    }

    onMounted(async () => {
      const res = await axios.get('/api/product_categories', {
        params: { shop_code: import.meta.env.VITE_SHOP_CODE },
      })
      categories.value = res.data
    })

    return { email, subscribe, categories, paymentMethods }
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

/* ニュースレター */
.newsletter {
  background: #2d5a4e;
  padding: 56px 24px;
  text-align: center;
}

.newsletter-sub {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.8);
  margin: 0 0 8px;
}

.newsletter h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}

.newsletter-desc {
  font-size: 0.88rem;
  color: rgba(255,255,255,0.85);
  margin: 0 0 24px;
}

.newsletter-form {
  display: flex;
  justify-content: center;
  gap: 0;
  max-width: 480px;
  margin: 0 auto;
}

.newsletter-form input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  font-size: 0.9rem;
  outline: none;
  background: #fff;
  color: #1a1a1a;
}

.newsletter-form button {
  padding: 12px 24px;
  background: #1a2421;
  color: #fff;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: background 0.2s;
}

.newsletter-form button:hover {
  background: #243530;
}

/* フッター本体 */
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

.socials {
  display: flex;
  gap: 16px;
}

.socials a {
  color: #a8b5af;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.socials a:hover {
  color: var(--color-accent);
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
  color: #b7c4be;
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
  .newsletter-form {
    flex-direction: column;
  }
  .newsletter-form button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
