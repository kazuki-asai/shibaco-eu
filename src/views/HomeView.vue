<template>
  <HeroSlider />
  <HomeBrandIntro />
  <ProductSection />
  <VideoShowcase />
  <CategorySection />
  <PurchaseProcessSection />
  <ShippingCountriesStrip />
  <BrandMessage />
</template>

<script setup>
import { useHead } from '@unhead/vue'
import HeroSlider from '../components/HeroSlider.vue'

useHead({
  title: 'shibaco | Official Online Store – Shiba Inu Silk-Screen Apparel',
  meta: [
    {
      name: 'description',
      content:
        'shibaco designs with quiet restraint. Shiba Inu motifs are refined for everyday city life. Choose your colour and size, and find the piece that feels like yours.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/' }],
})
import HomeBrandIntro from '../components/HomeBrandIntro.vue'
import ProductSection from '../components/ProductSection.vue'
import VideoShowcase from '../components/VideoShowcase.vue'
import CategorySection from '../components/CategorySection.vue'
import PurchaseProcessSection from '../components/PurchaseProcessSection.vue'
import ShippingCountriesStrip from '../components/ShippingCountriesStrip.vue'
import BrandMessage from '../components/BrandMessage.vue'
</script>
