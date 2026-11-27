<template>
  <div class="policy-page">
    <div class="page-header">
      <span class="label">LEGAL</span>
      <h1>Legal notice</h1>
    </div>

    <div class="container">
      <p v-if="shopError" class="owner-gap">{{ shopError }}</p>
      <p class="owner-gap">
        Rows marked “Seller to complete” are not in the shop record. Do not open the store to customers until those details are filled in. This page does not invent an address, email, or registration number.
      </p>

      <table class="info-table">
        <tbody>
          <tr v-for="row in items" :key="row.label">
            <th>{{ row.label }}</th>
            <td>
              <span>{{ row.value }}</span>
              <RouterLink v-if="row.link" :to="row.link.to" class="table-link">{{ row.link.label }}</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

      <section class="section">
        <h2>Prices and currency</h2>
        <p>{{ currencyNotice }} {{ dutyNotice }}</p>
      </section>

      <section class="section">
        <h2>Delivery</h2>
        <p>{{ deliveryCopy.summary }} Payment is taken when you place the order. Shipping rates and refused-parcel terms are on the <RouterLink to="/shipping">shipping page</RouterLink>.</p>
      </section>

      <section class="section">
        <h2>Withdrawal</h2>
        <p>
          Consumers in the EU and EEA have a 14-day right of withdrawal. How to use it, and what happens with faulty goods, is on the
          <RouterLink to="/returns">returns page</RouterLink>.
        </p>
      </section>

      <div class="cta">
        <p>Questions? We are happy to help.</p>
        <RouterLink to="/contact" class="btn">Contact</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import axios from 'axios'
import { currencyNotice, deliveryCopy, dutyNotice } from '@/config/store'
import { apiErrorMessage } from '@/utils/apiError'

const SELLER_GAP = 'Seller to complete before launch'

useHead({
  title: 'Legal notice | shibaco',
  meta: [
    {
      name: 'description',
      content: 'Business information, payment methods, and return policy for the shibaco European store.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/legal' }],
})

const shop = ref(null)
const shopError = ref(null)

function shown(value) {
  const text = value == null ? '' : String(value).trim()
  return text || SELLER_GAP
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/shop')
    shop.value = data?.shop ?? data
  } catch (err) {
    shopError.value = apiErrorMessage(err, 'Seller details could not be loaded. Please refresh and try again.')
  }
})

const items = computed(() => [
  { label: 'Store', value: shown(shop.value?.name) },
  { label: 'Seller (legal name)', value: shown(shop.value?.business_name) },
  { label: 'Represented by', value: shown(shop.value?.manager_name) },
  { label: 'Address', value: shown(shop.value?.address) },
  { label: 'Phone', value: shown(shop.value?.phone_number) },
  { label: 'Email', value: shown(shop.value?.email) },
  { label: 'Company register', value: SELLER_GAP },
  { label: 'VAT or invoice registration', value: SELLER_GAP },
  { label: 'Prices', value: 'Shown on each product in Japanese yen (JPY), the currency Stripe charges' },
  { label: 'Shipping and import charges', value: 'Shipping is the country rate from the shop. Import VAT, customs duty, and carrier fees are paid by you on delivery (DAP).', link: { to: '/shipping', label: 'View shipping information →' } },
  { label: 'Payment methods', value: 'Payment is taken on Stripe Checkout in Japanese yen. Stripe may also show wallet buttons (such as Apple Pay or Link) and a converted currency if those are turned on in the Stripe account. This website shows Visa and Mastercard marks only.' },
  { label: 'Payment timing', value: 'Payment is charged when you place your order' },
  { label: 'Delivery timing', value: deliveryCopy.summary },
  { label: 'Withdrawal and returns', value: 'EU and EEA consumers can withdraw within 14 days of receiving the goods. Faulty goods are handled separately.', link: { to: '/returns', label: 'View returns →' } },
])
</script>

<style scoped>
.policy-page {
  padding-bottom: 80px;
  color: #1a1a1a;
}

.page-header {
  padding: 64px 24px 48px;
  text-align: center;
  background: #eef0ed;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.label {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  font-weight: 600;
}

.page-header h1 {
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

.container {
  max-width: 760px;
  margin: 0 auto;
  padding: 64px 24px 0;
}

.owner-gap {
  margin: 0 0 20px;
  padding: 14px 16px;
  background: #f7f1e4;
  border-left: 3px solid #b89a6a;
  color: #3a3a3a;
  font-size: 0.86rem;
  line-height: 1.6;
}

.section {
  margin-bottom: 32px;
}

.section h2 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 10px;
}

.section p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.8;
  color: #3a3a3a;
}

.section a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  margin-bottom: 56px;
}

.info-table th,
.info-table td {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
  line-height: 1.8;
  vertical-align: top;
  color: #3a3a3a;
}

.info-table th {
  width: 36%;
  background: #e8ebe8;
  font-weight: 600;
  font-size: 0.82rem;
  color: #5a5a5a;
  white-space: nowrap;
}

.table-link {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.85rem;
  color: var(--color-accent);
  text-decoration: none;
}

.table-link:hover {
  text-decoration: underline;
}

.info-table :deep(br) {
  display: block;
  content: '';
  margin-top: 4px;
}

.cta {
  padding: 40px;
  background: #eef0ed;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cta p {
  font-size: 0.9rem;
  color: #5a5a5a;
  margin: 0;
}

.btn {
  display: inline-block;
  padding: 12px 36px;
  border: 1.5px solid #1a1a1a;
  color: #1a1a1a;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  transition: background 0.2s, color 0.2s;
}

.btn:hover {
  background: #1a1a1a;
  color: #fff;
}

@media (max-width: 768px) {
  .page-header {
    padding: 48px 16px 36px;
  }

  .container {
    padding: 48px 16px 0;
  }

  .info-table th,
  .info-table td {
    display: block;
    width: 100%;
    padding: 12px 16px;
  }

  .info-table th {
    border-bottom: none;
    padding-bottom: 4px;
    white-space: normal;
  }

  .cta {
    padding: 32px 20px;
  }
}
</style>
