import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import CheckoutSuccessView from '../views/CheckoutSuccessView.vue'
import Inquiry from '../components/Inquiry.vue'
// 会員機能（初回リリースでは非公開。復活時にコメントを外す）
// import UserRegister from '../components/user/UserRegister.vue'
// import UserLogin from '../components/user/UserLogin.vue'
// import AccountView from '../views/AccountView.vue'
import BrandStoryView from '../views/BrandStoryView.vue'
import ShippingView from '../views/ShippingView.vue'
import FaqView from '../views/FaqView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalView from '../views/LegalView.vue'
import ReturnsView from '../views/ReturnsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/brand-story', component: BrandStoryView },
  { path: '/shipping', component: ShippingView },
  { path: '/returns', component: ReturnsView },
  { path: '/faq', component: FaqView },
  { path: '/privacy-policy', component: PrivacyPolicyView },
  { path: '/legal', component: LegalView },
  // { path: '/signup', component: UserRegister },
  // { path: '/login', component: UserLogin },
  // { path: '/account', component: AccountView },
  { path: '/contact', component: Inquiry },
  { path: '/products', component: ProductsView },
  { path: '/products/:id', component: ProductDetail },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView },
  { path: '/checkout/success', component: CheckoutSuccessView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  nextTick(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_location: window.location.href,
      page_title: document.title,
    })
  })
})

export default router
