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
import { fetchPrefectureShipping } from '@/api/prefectureShipping'
import { useCart } from '@/composables/useCart'
import { usePrefectures } from '@/composables/usePrefectures'
import { normalizePrefectureId } from '@/utils/prefectureId'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'

function resolvePrefectureLabel(selected, options) {
  if (selected === '' || selected == null) return ''
  const opt = options.find(
    (o) => o.value === selected || String(o.value) === String(selected),
  )
  return opt?.label ?? String(selected)
}

export default {
  components: { CheckoutForm, OrderSummary },
  setup() {
    const { cart } = useCart()
    const submitting = ref(false)
    const errorMessage = ref(null)
    const shippingFee = ref(null)
    const shippingLoading = ref(false)
    const shippingFetchError = ref(null)
    let shippingRequestSeq = 0
    const {
      prefectureOptions,
      prefecturesLoading,
      prefecturesLoadError,
      loadPrefectures,
    } = usePrefectures()

    onMounted(() => {
      loadPrefectures()
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
      () => [needsSeparateShipping.value, form.value.prefecture],
      async ([needs, pref]) => {
        shippingFetchError.value = null
        if (!needs) {
          shippingFee.value = null
          shippingLoading.value = false
          return
        }

        const id = normalizePrefectureId(pref)
        if (id == null) {
          shippingLoading.value = false
          shippingFee.value = null
          if (pref !== '' && pref != null) {
            shippingFetchError.value =
              'A region ID is required to calculate shipping. Please check that the region list loaded correctly.'
          }
          return
        }

        const seq = ++shippingRequestSeq
        shippingLoading.value = true
        shippingFee.value = null

        try {
          const fee = await fetchPrefectureShipping(id)
          if (seq !== shippingRequestSeq) return
          if (fee === null) {
            shippingFetchError.value = 'Could not retrieve shipping cost.'
          } else {
            shippingFee.value = fee
          }
        } catch (e) {
          if (seq !== shippingRequestSeq) return
          shippingFetchError.value = 'Failed to retrieve shipping cost.'
          console.error(e)
        } finally {
          if (seq === shippingRequestSeq) shippingLoading.value = false
        }
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
        const customer = {
          ...form.value,
          prefecture: resolvePrefectureLabel(
            form.value.prefecture,
            prefectureOptions.value,
          ),
        }
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
