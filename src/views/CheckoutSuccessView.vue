<template>
  <section class="section">
    <div class="container">
      <template v-if="loading">
        <h1 class="title">Confirming your payment</h1>
        <p class="message">Please wait a moment.</p>
      </template>

      <template v-else-if="errorMessage">
        <h1 class="title">Payment verification failed</h1>
        <p class="message">{{ errorMessage }}</p>
        <router-link to="/checkout" class="back-btn">Back to checkout</router-link>
      </template>

      <template v-else>
        <h1 class="title">Thank you for your order</h1>
        <p class="message">Your payment is complete.</p>
        <router-link to="/" class="back-btn">Back to home</router-link>
      </template>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  isPaidCheckoutSession,
  parseCheckoutVerificationError,
  verifyCheckoutSession,
} from '@/api/checkout'
import { useCart } from '@/composables/useCart'

export default {
  setup() {
    const route = useRoute()
    const { clearCart } = useCart()
    const loading = ref(true)
    const errorMessage = ref(null)

    onMounted(async () => {
      const sessionId = route.query.session_id
      if (!sessionId) {
        loading.value = false
        errorMessage.value =
          'Payment session not found. If you have already paid, please contact us.'
        return
      }

      try {
        const data = await verifyCheckoutSession(sessionId)
        if (!isPaidCheckoutSession(data)) {
          errorMessage.value = 'Payment has not been completed.'
          return
        }
        clearCart()
      } catch (e) {
        console.error(e)
        errorMessage.value = parseCheckoutVerificationError(e)
      } finally {
        loading.value = false
      }
    })

    return { loading, errorMessage }
  },
}
</script>

<style scoped>
.section {
  padding: 120px 24px;
  text-align: center;
}
.title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 16px;
}
.message {
  color: #555;
  margin-bottom: 40px;
}
.back-btn {
  display: inline-block;
  background: #1a1a1a;
  color: #fff;
  padding: 12px 36px;
  text-decoration: none;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
}
</style>
