<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
  <TheFooter />
  <CookieConsent />
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import CookieConsent from './components/CookieConsent.vue'
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>
