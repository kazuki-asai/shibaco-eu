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
          :error-message="errorMessage"
          :country-options="countryOptions"
          :submit-blocked-message="submitBlockedMessage"
          @submit="submitOrder"
        />
        <OrderSummary
          :cart="cart"
          :subtotal="subtotal"
          :grand-total="grandTotal"
          :shipping-status="shippingStatus"
          :shipping-amount="shippingAmount"
          :shipping-error="shippingError"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import { shippingCountries } from '@/config/shippingCountries'
import { OVERSEAS_CHECKOUT_ENABLED } from '@/config/store'
import { useCart } from '@/composables/useCart'
import { useCountryShipping } from '@/composables/useCountryShipping'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import { apiErrorMessage } from '@/utils/apiError'
import { buildCheckoutCustomer } from '@/utils/checkoutCustomer'

export default {
  components: { CheckoutForm, OrderSummary },
  setup() {
    const { cart } = useCart()
    const submitting = ref(false)
    const errorMessage = ref(null)
    const countryOptions = shippingCountries()
    const { status: shippingStatus, amount: shippingAmount, error: shippingError, load: loadShipping } =
      useCountryShipping()

    const form = ref({
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      zip: '',
      city: '',
      countryCode: '',
      address1: '',
      address2: '',
      dutiesAccepted: false,
    })

    const subtotal = computed(() =>
      cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
    )

    const selectedCountry = computed(() =>
      countryOptions.find((country) => country.code === form.value.countryCode) || null,
    )

    const grandTotal = computed(() => {
      if (shippingStatus.value !== 'quoted' || shippingAmount.value == null) return null
      return subtotal.value + shippingAmount.value
    })

    const submitBlockedMessage = computed(() => {
      if (!OVERSEAS_CHECKOUT_ENABLED) return 'We are not taking online orders yet.'
      if (!form.value.countryCode) return 'Select a country to calculate shipping.'
      if (shippingStatus.value === 'loading') return 'Calculating shipping. Please wait a moment.'
      if (shippingStatus.value === 'unavailable') {
        return shippingError.value || 'We cannot ship to this country yet.'
      }
      if (shippingStatus.value === 'error') return shippingError.value
      if (shippingStatus.value !== 'quoted' || shippingAmount.value == null) {
        return 'Shipping is not confirmed yet.'
      }
      if (!form.value.dutiesAccepted) {
        return 'Please confirm that import VAT, duty, and carrier fees are paid on delivery.'
      }
      return null
    })

    watch(
      () => form.value.countryCode,
      (code) => {
        errorMessage.value = null
        loadShipping(code)
      },
    )

    const submitOrder = async () => {
      if (!OVERSEAS_CHECKOUT_ENABLED) return
      if (submitBlockedMessage.value || !selectedCountry.value) return
      if (shippingAmount.value == null) return

      submitting.value = true
      errorMessage.value = null
      try {
        const origin = window.location.origin
        const customer = buildCheckoutCustomer(form.value, selectedCountry.value)
        const { data } = await axios.post('/api/checkouts', {
          shop_code: import.meta.env.VITE_SHOP_CODE,
          customer,
          country_code: selectedCountry.value.code,
          items: cart.value,
          total: grandTotal.value,
          shipping_fee: shippingAmount.value,
          duties_accepted: true,
          success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/checkout`,
        })

        const checkoutUrl = data.checkout_url || data.url
        if (checkoutUrl) {
          window.location.href = checkoutUrl
        } else {
          errorMessage.value = 'Failed to get the payment URL.'
        }
      } catch (err) {
        errorMessage.value = apiErrorMessage(
          err,
          'Something went wrong while placing your order. Please try again.',
        )
        console.error(err)
      } finally {
        submitting.value = false
      }
    }

    return {
      cart,
      subtotal,
      grandTotal,
      shippingStatus,
      shippingAmount,
      shippingError,
      submitBlockedMessage,
      form,
      submitting,
      errorMessage,
      countryOptions,
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
