import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './style.scss'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import risePlugin from './plugins/rise'
import { enableMeasurement, readStoredConsent } from './consent/googleConsent'
import { formatMoney } from './utils/money'

if (readStoredConsent() === 'granted') {
  enableMeasurement()
}

const apiBase = import.meta.env.VITE_API_BASE_URL
// 各リクエストは `/api/...` フルパス。`baseURL` も `/api` だと二重になるので付けない。
if (apiBase && apiBase !== '/api') {
  axios.defaults.baseURL = apiBase
}

if (import.meta.env.VITE_SHOP_CODE) {
  axios.defaults.headers.common['X-Shop-Code'] = import.meta.env.VITE_SHOP_CODE
}

const head = createHead()

const app = createApp(App)
app.config.globalProperties.$money = formatMoney
app.use(router).use(head).use(risePlugin)

router.isReady().then(() => {
  app.mount('#app')
  requestAnimationFrame(() => {
    document.dispatchEvent(new Event('prerender-ready'))
  })
})
