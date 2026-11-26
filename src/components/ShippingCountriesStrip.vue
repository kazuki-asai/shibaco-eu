<template>
  <section class="ship-strip">
    <div class="container">
      <h2>Check if we ship to you</h2>

      <p v-if="status === 'loading'" class="status">Loading countries…</p>
      <p v-else-if="status === 'error'" class="status">
        We couldn’t load the country list.
        <button type="button" class="text-btn" @click="load">Try again</button>
      </p>
      <p v-else-if="status === 'empty'" class="status">
        No countries are listed yet.
        <RouterLink to="/contact">Contact us</RouterLink>
      </p>

      <template v-else>
        <div class="field">
          <label for="ship-country">Country</label>
          <select id="ship-country" v-model="selectedName">
            <option value="">Select a country</option>
            <option v-for="item in shippings" :key="item.id" :value="item.id">
              {{ item.countryName }}
            </option>
          </select>
        </div>

        <p class="result" aria-live="polite">
          <template v-if="match">
            Yes. We ship to {{ match.countryName }}. {{ feeSentence }}
            We usually dispatch within 5–10 business days, then delivery takes about 7–14 days.
          </template>
          <template v-else>
            Choose a country to see the shipping fee. If yours is missing,
            <RouterLink to="/contact">contact us</RouterLink>.
          </template>
        </p>

        <RouterLink to="/shipping#where-we-ship" class="more">See every country and rate</RouterLink>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchOverseasShippings } from '@/api/overseasShipping'
import { formatYen } from '@/utils/money'

const status = ref('loading')
const shippings = ref([])
const selectedName = ref('')

const match = computed(() =>
  shippings.value.find((item) => item.id === selectedName.value) ?? null
)

const feeSentence = computed(() => {
  if (!match.value) return ''
  if (match.value.shippingFee === 0) return 'Shipping is free.'
  if (match.value.shippingFee == null) return 'The shipping fee for this country isn’t listed yet.'
  return `Shipping is ${formatYen(match.value.shippingFee)}, charged in Japanese yen.`
})

async function load() {
  status.value = 'loading'
  try {
    const list = await fetchOverseasShippings()
    shippings.value = list
    status.value = list.length ? 'ready' : 'empty'
  } catch {
    shippings.value = []
    status.value = 'error'
  }
}

onMounted(load)
</script>

<style scoped>
.ship-strip {
  padding: 8px 24px 72px;
  background: #fff;
}

.container {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

h2 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-primary);
}

.status,
.result {
  margin: 0;
  max-width: 52ch;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-primary);
}

.field {
  width: min(100%, 320px);
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.875rem;
  font-weight: 600;
}

select {
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid #c5cdc9;
  border-radius: 0;
  background: #fff;
  color: var(--color-primary);
  font: inherit;
  font-size: 1rem;
}

select:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.text-btn {
  padding: 0;
  border: none;
  background: none;
  color: var(--color-accent);
  font: inherit;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

.result a,
.more {
  color: var(--color-accent);
  font-weight: 600;
  border-bottom: 1px solid currentColor;
}

.more {
  font-size: 0.95rem;
}

.more:hover,
.result a:hover,
.text-btn:hover {
  color: var(--color-gradient-start);
}
</style>
