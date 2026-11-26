<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="page-title">CHECKOUT</h1>

      <div v-if="cart.length === 0" class="empty-cart">
        <p>Your cart is empty</p>
        <router-link to="/">Browse products</router-link>
      </div>

      <div v-else class="checkout-layout">
        <CheckoutForm
          :form="form"
          :submitting="submitting"
          :errorMessage="errorMessage"
          :prefecture-options="prefectureOptions"
          :prefectures-loading="prefecturesLoading"
          :prefectures-load-error="prefecturesLoadError"
          :submit-blocked-message="submitBlockedMessage"
          @submit="submitOrder"
        />
        <OrderSummary
          :cart="cart"
          :subtotal="subtotal"
          :grand-total="grandTotal"
          :needs-separate-shipping="needsSeparateShipping"
          :shipping-amount="shippingFee"
          :shipping-loading="shippingLoading"
          :shipping-error="shippingFetchError"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { fetchOverseasShippings } from '@/api/overseasShipping'
import { useCart } from '@/composables/useCart'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'

export default {
  components: { CheckoutForm, OrderSummary },
  setup() {
    const { cart } = useCart()
    const submitting = ref(false)
    const errorMessage = ref(null)
    const shippingFee = ref(null)
    const shippingLoading = ref(false)
    const shippingFetchError = ref(null)
    const overseasShippings = ref([])
    const prefecturesLoading = ref(false)
    const prefecturesLoadError = ref(null)

    const prefectureOptions = computed(() =>
      overseasShippings.value
        .filter((item) => item.prefectureName)
        .map((item) => ({
          value: item.prefectureName,
          label: item.countryName,
        })),
    )

    onMounted(async () => {
      prefecturesLoading.value = true
      prefecturesLoadError.value = null
      try {
        overseasShippings.value = await fetchOverseasShippings()
        if (!overseasShippings.value.length) {
          prefecturesLoadError.value = 'Could not load the country list.'
        }
      } catch (e) {
        prefecturesLoadError.value =
          'Could not load the country list. Please refresh the page or try again later.'
        overseasShippings.value = []
        console.error(e)
      } finally {
        prefecturesLoading.value = false
      }
    })

    const form = ref({
      lastName: '',
      firstName: '',
      lastNameKana: '',
      firstNameKana: '',
      email: '',
      phone: '',
      zip: '',
      prefecture: '',
      address1: '',
      address2: '',
    })

    const subtotal = computed(() =>
      cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const needsSeparateShipping = computed(() =>
      cart.value.some(
        (item) => String(item.shipping_kind ?? '').trim() === 'separate',
      ),
    )

    const grandTotal = computed(() => {
      if (!needsSeparateShipping.value) return subtotal.value
      return subtotal.value + (shippingFee.value ?? 0)
    })

    const submitBlockedMessage = computed(() => {
      if (!needsSeparateShipping.value) return null
      const pref = form.value.prefecture
      if (pref === '' || pref == null) return null
      if (shippingLoading.value) {
        return 'Calculating shipping. Please wait a moment.'
      }
      if (shippingFetchError.value) return shippingFetchError.value
      if (shippingFee.value === null) {
        return 'Unable to confirm shipping. Please reselect your country / region.'
      }
      return null
    })

    watch(
      () => [needsSeparateShipping.value, form.value.prefecture, overseasShippings.value],
      ([needs, country]) => {
        shippingFetchError.value = null
        shippingLoading.value = false
        if (!needs) {
          shippingFee.value = null
          return
        }

        if (country === '' || country == null) {
          shippingFee.value = null
          return
        }

        const match = overseasShippings.value.find((item) => item.prefectureName === country)
        if (!match || match.shippingFee == null) {
          shippingFee.value = null
          shippingFetchError.value = 'Could not retrieve shipping cost.'
          return
        }

        shippingFee.value = match.shippingFee
      },
      { immediate: true },
    )

    const submitOrder = async () => {
      if (submitBlockedMessage.value) return

      submitting.value = true
      errorMessage.value = null
      try {
        const origin = window.location.origin
        const shop_code = import.meta.env.VITE_SHOP_CODE
        const customer = { ...form.value }
        const { data } = await axios.post('/api/checkouts', {
          shop_code,
          customer,
          items: cart.value,
          total: grandTotal.value,
          shipping_fee: needsSeparateShipping.value ? shippingFee.value : undefined,
          success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/checkout`,
        })

        const checkout_url = data.checkout_url || data.url
        if (checkout_url) {
          window.location.href = checkout_url
        } else {
          errorMessage.value = 'Failed to get the payment URL.'
        }
      } catch (e) {
        errorMessage.value = 'Something went wrong while placing your order. Please try again.'
        console.error(e)
      } finally {
        submitting.value = false
      }
    }

    return {
      cart,
      subtotal,
      grandTotal,
      needsSeparateShipping,
      shippingFee,
      shippingLoading,
      shippingFetchError,
      submitBlockedMessage,
      form,
      submitting,
      errorMessage,
      prefectureOptions,
      prefecturesLoading,
      prefecturesLoadError,
      submitOrder,
    }
  },
}
</script>

<style scoped>
.checkout-page {
  padding: 48px 24px 80px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  margin-bottom: 40px;
}

.empty-cart {
  text-align: center;
  padding: 80px 0;
  color: #666;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 48px;
  align-items: start;
}

@media (max-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}
</style>
