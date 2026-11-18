<template>
  <div class="policy-page">
    <div class="page-header">
      <span class="label">LEGAL</span>
      <h1>Legal notice</h1>
    </div>

    <div class="container">
      <table class="info-table">
        <tbody>
          <tr v-for="row in items" :key="row.label">
            <th>{{ row.label }}</th>
            <td>
              <span v-html="row.value" />
              <RouterLink v-if="row.link" :to="row.link.to" class="table-link">{{ row.link.label }}</RouterLink>
            </td>
          </tr>
        </tbody>
      </table>

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

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/shop')
    shop.value = data?.shop ?? data
  } catch {
    // 取得失敗時は空のまま静的表示
  }
})

const items = computed(() => [
  { label: 'Business name', value: shop.value?.business_name ?? '—' },
  { label: 'Responsible person', value: shop.value?.manager_name ?? '—' },
  { label: 'Address', value: shop.value?.address ?? '—' },
  { label: 'Phone', value: shop.value?.phone_number ?? '—' },
  { label: 'Email', value: shop.value?.email ?? 'Please use the contact form' },
  { label: 'Prices', value: 'As shown on each product page (including applicable taxes where displayed)' },
  { label: 'Additional fees', value: 'See the shipping page for details', link: { to: '/shipping', label: 'View shipping information →' } },
  { label: 'Payment methods', value: 'Credit card (Visa, Mastercard, American Express, and others via Stripe)' },
  { label: 'Payment timing', value: 'Payment is charged when you place your order' },
  { label: 'Delivery timing', value: 'Ships within 5–10 business days after order confirmation (made to order)' },
  { label: 'Returns & exchanges', value: 'Made-to-order items cannot be returned for change-of-mind reasons.<br>For defects or incorrect items, contact us within 7 days of delivery.' },
  { label: 'Recommended browsers', value: 'Latest Chrome, Safari, Firefox, or Edge' },
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
