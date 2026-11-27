<template>
  <div class="order-summary">
    <h2>Order summary</h2>
    <div class="summary-items">
      <div v-for="(item, index) in cart" :key="index" class="summary-item">
        <div class="summary-item-image">
          <img v-if="item.image" :src="item.image" :alt="item.name" @error="onImageError">
          <div v-else class="no-image"></div>
          <span class="quantity-badge">{{ item.quantity }}</span>
        </div>
        <div class="summary-item-info">
          <p class="summary-item-name">{{ item.name }}</p>
          <p class="summary-item-meta">
            <span v-if="item.colorName">{{ item.colorName }}</span>
            <span v-if="item.printColorName"> / Print: {{ item.printColorName }}</span>
            <span v-if="item.sizeName"> / {{ item.sizeName }}</span>
          </p>
        </div>
        <p class="summary-item-price">{{ $money(item.price * item.quantity) }}</p>
      </div>
    </div>
    <div class="summary-totals">
      <div class="summary-row">
        <span>Subtotal</span>
        <span>{{ $money(subtotal) }}</span>
      </div>
      <div class="summary-row shipping-row">
        <span>Shipping</span>
        <span class="shipping-cell">
          <template v-if="shippingStatus === 'loading'">Calculating…</template>
          <template v-else-if="shippingStatus === 'quoted' && shippingAmount === 0">Free</template>
          <template v-else-if="shippingStatus === 'quoted'">{{ $money(shippingAmount) }}</template>
          <template v-else-if="shippingStatus === 'unavailable'">Not available</template>
          <template v-else-if="shippingStatus === 'error'"><span class="shipping-error">{{ shippingError }}</span></template>
          <template v-else>Select a country</template>
        </span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span>{{ grandTotal == null ? '—' : $money(grandTotal) }}</span>
      </div>
      <p class="shipping-note">{{ currencyNotice }} Shipping is added only when the shop has a rate for your country.</p>
    </div>
  </div>
</template>

<script>
import { currencyNotice } from '@/config/store'

export default {
  props: {
    cart: { type: Array, required: true },
    subtotal: { type: Number, required: true },
    grandTotal: { type: Number, default: null },
    shippingStatus: { type: String, default: 'idle' },
    shippingAmount: { type: Number, default: null },
    shippingError: { type: String, default: null },
  },
  setup() {
    return { currencyNotice }
  },
  methods: {
    onImageError(e) {
      e.target.style.display = 'none'
    },
  },
}
</script>

<style scoped>
.order-summary {
  border: 1px solid #e8e8e8;
  padding: 24px;
  position: sticky;
  top: 80px;
}

.order-summary h2 {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.summary-items {
  margin-bottom: 24px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.summary-item-image {
  position: relative;
  width: 56px;
  height: 72px;
  flex-shrink: 0;
  background: #f5f5f5;
  overflow: hidden;
}

.summary-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  background: #e8e8e8;
}

.quantity-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #666;
  color: #fff;
  font-size: 0.65rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-item-info {
  flex: 1;
}

.summary-item-name {
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 4px;
}

.summary-item-meta {
  font-size: 0.75rem;
  color: #888;
  margin: 0;
}

.summary-item-price {
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  margin: 0;
}

.summary-totals {
  border-top: 1px solid #e8e8e8;
  padding-top: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  padding: 8px 0;
}

.summary-row.total {
  font-weight: 700;
  font-size: 1rem;
  border-top: 1px solid #e8e8e8;
  margin-top: 4px;
  padding-top: 12px;
}

.shipping-cell {
  text-align: right;
  max-width: 65%;
}

.shipping-error {
  color: #c00;
  font-size: 0.78rem;
  font-weight: 400;
}

.shipping-note {
  margin: 8px 0 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #777;
}
</style>
