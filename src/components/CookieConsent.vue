<template>
  <div v-if="open" class="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title">
    <div class="cookie-banner__inner">
      <div class="cookie-banner__copy">
        <p id="cookie-banner-title" class="cookie-banner__title">Cookies</p>
        <p class="cookie-banner__text">
          We use cookies only if you allow them. Google Analytics and Google Ads stay off until you accept.
          Necessary storage (such as your cart) does not use these cookies.
          <RouterLink to="/privacy-policy">Privacy policy</RouterLink>
        </p>
      </div>
      <div class="cookie-banner__actions">
        <button type="button" class="cookie-btn cookie-btn--ghost" @click="onReject">Reject</button>
        <button type="button" class="cookie-btn cookie-btn--solid" @click="onAccept">Accept</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  disableMeasurement,
  enableMeasurement,
  readStoredConsent,
  storeConsent,
  trackPageView,
} from '@/consent/googleConsent'

const route = useRoute()
const open = ref(false)

function onAccept() {
  storeConsent('granted')
  enableMeasurement()
  open.value = false
  trackPageView(route)
}

function onReject() {
  storeConsent('denied')
  disableMeasurement()
  open.value = false
}

function onOpenSettings() {
  open.value = true
}

onMounted(() => {
  window.addEventListener('shibaco:cookie-settings', onOpenSettings)
  // Prerender runs in Puppeteer (navigator.webdriver). Leave the banner out of
  // that HTML so a saved choice is not covered until this script runs.
  if (navigator.webdriver) return
  open.value = readStoredConsent() == null
})

onUnmounted(() => {
  window.removeEventListener('shibaco:cookie-settings', onOpenSettings)
})
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  right: 16px;
  bottom: 16px;
  left: 16px;
  z-index: 300;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.cookie-banner__inner {
  pointer-events: auto;
  width: min(880px, 100%);
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background: #1a2421;
  color: #f3f4f2;
  box-shadow: 0 12px 40px rgba(26, 36, 33, 0.28);
}

.cookie-banner__title {
  margin: 0 0 6px;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  font-weight: 600;
  color: #d7c4a3;
}

.cookie-banner__text {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.55;
  color: #e4ebe7;
}

.cookie-banner__text a {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 6px;
}

.cookie-banner__actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.cookie-btn {
  min-width: 112px;
  padding: 12px 16px;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  cursor: pointer;
}

.cookie-btn--ghost {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.cookie-btn--solid {
  background: #f3f4f2;
  color: #1a2421;
  border: 1px solid #f3f4f2;
}

@media (max-width: 720px) {
  .cookie-banner__inner {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .cookie-banner__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
