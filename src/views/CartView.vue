<template>
  <section class="section">
    <div class="container">
      <h1 class="page-title">Cart</h1>

      <div v-if="cart.length === 0" class="empty">
        Your cart is empty.
      </div>

      <template v-else>
        <ul class="cart-list">
          <li v-for="(item, index) in cart" :key="index" class="cart-item">
            <img v-if="item.image" :src="item.image" class="item-image" />
            <div class="item-info">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-meta">
                <span v-if="item.colorName">Colour: {{ item.colorName }}</span>
                <span v-if="item.sizeName">　Size: {{ item.sizeName }}</span>
              </p>
              <p class="item-price">{{ formatYen(item.price) }}</p>
            </div>
            <div class="item-qty">
              <button @click="decrement(index)">－</button>
              <span>{{ item.quantity }}</span>
              <button @click="increment(index)">＋</button>
            </div>
            <button class="remove-btn" @click="remove(index)">Remove</button>
          </li>
        </ul>

        <div class="summary">
          <p class="total">Total: {{ formatYen(total) }}</p>
          <p class="yen-note">Charged in Japanese yen.</p>
          <router-link to="/checkout" class="checkout-btn">Proceed to checkout</router-link>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useCart } from '@/composables/useCart'
import { formatYen } from '@/utils/money'

export default {
  setup() {
    const { cart, removeFromCart, updateQuantity } = useCart()

    const total = computed(() =>
      cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    const increment = (index) => updateQuantity(index, cart.value[index].quantity + 1)
    const decrement = (index) => {
      if (cart.value[index].quantity > 1) updateQuantity(index, cart.value[index].quantity - 1)
    }
    const remove = (index) => removeFromCart(index)

    return { cart, total, increment, decrement, remove, formatYen }
  },
}
</script>

<style scoped>
.section {
  padding: 72px 24px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 40px;
}

.empty {
  text-align: center;
  padding: 80px 0;
  color: #666;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 4px;
}

.item-meta {
  font-size: 0.8rem;
  color: #888;
  margin: 0 0 4px;
}

.item-price {
  font-size: 0.9rem;
  margin: 0;
}

.item-qty {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-qty button {
  background: none;
  border: 1px solid #ccc;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 0.9rem;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
}

.summary {
  margin-top: 32px;
  text-align: right;
}

.total {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.yen-note {
  margin: 0 0 16px;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #24312d;
}

.checkout-btn {
  display: inline-block;
  background: #1a1a1a;
  color: #fff;
  border: none;
  padding: 14px 40px;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
}

.checkout-btn:hover {
  background: #444;
}
</style>
