<template>
  <header class="header">
    <div class="header-inner">
      <!-- ハンバーガー（モバイル） -->
      <button class="menu-btn" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- ロゴ -->
      <RouterLink to="/" class="logo">shibaco</RouterLink>

      <!-- ナビ（デスクトップ） -->
      <nav class="nav-desktop">
        <RouterLink
          v-for="cat in categories"
          :key="cat.id"
          :to="{ path: '/products', query: { category_id: cat.id } }"
        >{{ cat.name }}</RouterLink>
      </nav>

      <div class="header-actions">
        <RouterLink to="/cart" class="icon-btn cart-btn" aria-label="Cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </RouterLink>
      </div>
    </div>

    <!-- モバイルメニュー -->
    <nav class="nav-mobile" :class="{ open: menuOpen }">
      <RouterLink
        v-for="cat in categories"
        :key="cat.id"
        :to="{ path: '/products', query: { category_id: cat.id } }"
        @click="menuOpen = false"
      >{{ cat.name }}</RouterLink>
    </nav>
  </header>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useCart } from '@/composables/useCart'

export default {
  setup() {
    const menuOpen = ref(false)
    const { cart } = useCart()
    const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
    const categories = ref([])

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

    return {
      menuOpen,
      cartCount,
      categories,
    }
  },
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(243, 244, 242, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e8e8e8;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 600;
  color: #16181a;
  text-decoration: none;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.nav-desktop {
  display: flex;
  gap: 28px;
  flex: 1;
}

.nav-desktop a {
  font-size: 0.85rem;
  color: #4a4a4a;
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: color 0.2s;
}

.nav-desktop a:hover {
  color: var(--color-accent);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #4a4a4a;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: var(--color-accent);
}

.account-wrap {
  position: relative;
}

.account-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 200px;
  max-width: min(280px, calc(100vw - 32px));
  padding: 8px 0;
  background: #fff;
  border: 1px solid #e8e8e8;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  z-index: 200;
}

.account-dropdown-profile {
  padding: 12px 18px 10px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 4px;
}

.account-dropdown-name {
  margin: 0 0 4px;
  font-size: 0.88rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.03em;
  line-height: 1.35;
}

.account-dropdown-email {
  margin: 0;
  font-size: 0.72rem;
  color: #777;
  word-break: break-all;
  line-height: 1.4;
}

.account-dropdown-item {
  display: block;
  padding: 10px 18px;
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  color: #4a4a4a;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.account-dropdown-item:hover {
  background: #f7f7f7;
  color: var(--color-accent);
}

.account-dropdown-logout {
  display: block;
  width: 100%;
  border: none;
  background: none;
  font: inherit;
  text-align: left;
  cursor: pointer;
  border-top: 1px solid #f0f0f0;
  margin-top: 4px;
  padding-top: 12px;
}

.nav-mobile-divider {
  display: block;
  height: 1px;
  margin: 8px 24px 0;
  background: #e8e8e8;
}

.cart-btn {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.6rem;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  pointer-events: none;
}

.menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menu-btn span {
  display: block;
  width: 22px;
  height: 2px;
  background: #1a1a1a;
  transition: 0.3s;
}

.nav-mobile {
  display: none;
  flex-direction: column;
  background: #fff;
  border-top: 1px solid #e8e8e8;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.nav-mobile.open {
  max-height: 520px;
}

.nav-mobile a {
  padding: 14px 24px;
  font-size: 0.9rem;
  color: #4a4a4a;
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
}

.nav-mobile-user {
  padding: 14px 24px 10px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-mobile-user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a1a;
}

.nav-mobile-user-email {
  font-size: 0.78rem;
  color: #777;
  word-break: break-all;
}

.nav-mobile-logout {
  display: block;
  width: 100%;
  padding: 14px 24px;
  margin: 0;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;
  font-size: 0.9rem;
  color: #4a4a4a;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, color 0.15s;
}

.nav-mobile-logout:hover {
  background: #f7f7f7;
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  .menu-btn {
    display: flex;
  }
  .nav-mobile {
    display: flex;
  }
}
</style>
