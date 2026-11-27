<template>
  <div class="shipping-page">
    <div class="page-header">
      <span class="label">SHIPPING</span>
      <h1>Shipping</h1>
    </div>

    <div class="container">
      <section class="section">
        <h2>How shipping is charged</h2>
        <p>
          The shop charges shipping. The rate is whatever this shop has set for your country.
          Checkout shows that rate when you choose a country.
          A country with no rate cannot be ordered. “Free” appears only when the rate really is zero.
        </p>
        <DutyNotice class="section-notice" />
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>Shipping rates</h2>
        <p class="section-lead">Rates below are the ones the shop has published. Countries that are not listed are not available yet.</p>
        <button class="accordion-trigger" @click="tableOpen = !tableOpen" :aria-expanded="tableOpen">
          <span>View rates by country</span>
          <svg class="accordion-icon" :class="{ open: tableOpen }" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="accordion-body" :class="{ open: tableOpen }">
          <div class="accordion-inner">
            <table class="info-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Shipping</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="shippingList.length > 0">
                  <tr v-for="item in shippingList" :key="item.countryCode">
                    <td>{{ item.countryName }}</td>
                    <td>
                      <strong v-if="item.status === 'quoted' && item.amount === 0">Free</strong>
                      <span v-else-if="item.status === 'quoted'">{{ $money(item.amount) }}</span>
                      <span v-else>Not available</span>
                    </td>
                  </tr>
                </template>
                <tr v-else-if="loadingShipping">
                  <td colspan="2" class="table-placeholder">Loading...</td>
                </tr>
                <tr v-else-if="loadError">
                  <td colspan="2" class="table-placeholder">{{ loadError }}</td>
                </tr>
                <tr v-else>
                  <td colspan="2" class="table-placeholder">No shipping rates have been published yet. Checkout stays closed until a country rate is set.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>Delivery timeframe</h2>
        <p>
          Every shibaco piece is <strong>made to order</strong>.<br />
          {{ deliveryCopy.summary }}
        </p>
        <div class="notice">
          <p><b>Made-to-order items take longer than ready-made stock.</b></p>
          <p>Weekends, public holidays, and peak seasons may extend processing times.</p>
          <p>High order volume can also add a few extra days.</p>
        </div>
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>Courier</h2>
        <p>
          Orders leave Japan with the carrier the seller chooses.
          The carrier name is not set on this page yet — the seller still has to name it (for example Japan Post EMS or another international service) before launch.
          Once your package is on its way, we email you a tracking number.
        </p>
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>Where we ship</h2>
        <p>
          This storefront ships to customers across Europe.<br />
          If your country is missing at checkout, please contact us and we will advise.
        </p>
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>Delivery attempts and refused parcels</h2>
        <p>
          If you miss a delivery, follow the courier’s instructions for redelivery or pickup.<br />
          Tracking details in your shipping email will include the right next steps for your carrier.
        </p>
        <div class="notice">
          <p>This store ships DAP. If you refuse the parcel, or it cannot be delivered and is returned, return shipping and any carrier or customs fees can be deducted from a refund.</p>
          <p>The seller still needs to confirm the exact deduction and whether an undeliverable parcel is returned or abandoned. Until that rule is written down, contact us before refusing a delivery.</p>
        </div>
      </section>

      <div class="cta">
        <p>Questions about shipping? We are happy to help.</p>
        <RouterLink to="/contact" class="btn">Contact</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { fetchOverseasShippings } from '@/api/overseasShipping'
import { deliveryCopy } from '@/config/store'
import { apiErrorMessage } from '@/utils/apiError'
import DutyNotice from '@/components/DutyNotice.vue'

useHead({
  title: 'Shipping | shibaco',
  meta: [
    {
      name: 'description',
      content: 'Shipping rates, delivery times, and international courier information for shibaco Europe.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/shipping' }],
})

const shippingList = ref([])
const loadingShipping = ref(true)
const loadError = ref(null)
const tableOpen = ref(true)

onMounted(async () => {
  try {
    shippingList.value = await fetchOverseasShippings()
  } catch (err) {
    loadError.value = apiErrorMessage(err, 'Unable to load shipping rates. Please refresh and try again.')
  } finally {
    loadingShipping.value = false
  }
})
</script>

<style scoped>

.shipping-page {
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

.section h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #e8e8e8;
  color: #1a1a1a;
}

.section p,
.section-lead {
  font-size: 0.92rem;
  color: #5a5a5a;
  line-height: 2;
  margin: 0;
}

.section-lead {
  margin-bottom: 16px;
}

.section-notice {
  margin-top: 16px;
}

.section code {
  font-size: 0.84em;
}

.accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  background: #e8ebe8;
  border: none;
  cursor: pointer;
  font-size: 0.88rem;
  color: #3a3a3a;
  letter-spacing: 0.02em;
  text-align: left;
}

.accordion-trigger:hover {
  background: #eeebe7;
}

.accordion-icon {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.accordion-icon.open {
  transform: rotate(180deg);
}

.accordion-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}

.accordion-body.open {
  grid-template-rows: 1fr;
}

.accordion-inner {
  overflow: hidden;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.info-table th,
.info-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
  color: #3a3a3a;
  line-height: 1.6;
}

.info-table thead th {
  background: #e8ebe8;
  font-weight: 600;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  color: #5a5a5a;
}

.info-table strong {
  color: var(--color-accent);
  font-weight: 700;
}

.table-placeholder {
  color: #8a8a8a;
  font-size: 0.88rem;
  text-align: center;
  padding: 20px 16px;
}

.notice {
  margin-top: 16px;
  padding: 16px 20px;
  background: #eef0ed;
  border-left: 3px solid #e0d8d0;
}

.notice p {
  font-size: 0.82rem;
  color: #8a8a8a;
  margin: 0;
  line-height: 1.9;
}

.notice p + p {
  margin-top: 4px;
}

.divider {
  height: 1px;
  background: #e8e8e8;
  margin: 48px 0;
}

.cta {
  margin-top: 56px;
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

  .divider {
    margin: 36px 0;
  }

  .cta {
    padding: 32px 20px;
  }

  .info-table th,
  .info-table td {
    padding: 12px;
    font-size: 0.88rem;
  }
}
</style>
