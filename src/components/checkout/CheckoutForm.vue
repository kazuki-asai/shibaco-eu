<template>
  <form class="checkout-form" @submit.prevent="$emit('submit')">
    <section class="form-section">
      <h2>Customer information</h2>
      <div class="form-row">
        <div class="form-group">
          <label for="checkout-first-name">First name <span class="required">*</span></label>
          <input id="checkout-first-name" v-model="form.firstName" type="text" required placeholder="Jane" autocomplete="given-name">
        </div>
        <div class="form-group">
          <label for="checkout-last-name">Last name <span class="required">*</span></label>
          <input id="checkout-last-name" v-model="form.lastName" type="text" required placeholder="Smith" autocomplete="family-name">
        </div>
      </div>
      <div class="form-group">
        <label for="checkout-email">Email <span class="required">*</span></label>
        <input id="checkout-email" v-model="form.email" type="email" required placeholder="you@email.com" autocomplete="email">
      </div>
      <div class="form-group">
        <label for="checkout-phone">Phone</label>
        <input id="checkout-phone" v-model="form.phone" type="tel" placeholder="+49 170 0000000" autocomplete="tel">
      </div>
    </section>

    <section class="form-section">
      <h2>Shipping address</h2>
      <div class="form-group">
        <label for="checkout-country">Country <span class="required">*</span></label>
        <select id="checkout-country" v-model="form.countryCode" required autocomplete="country">
          <option disabled value="">Select a country</option>
          <option v-for="opt in countryOptions" :key="opt.code" :value="opt.code">
            {{ opt.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="checkout-address1">Address line 1 <span class="required">*</span></label>
        <input id="checkout-address1" v-model="form.address1" type="text" required placeholder="Street and number" autocomplete="address-line1">
      </div>
      <div class="form-group">
        <label for="checkout-address2">Address line 2</label>
        <input id="checkout-address2" v-model="form.address2" type="text" placeholder="Apartment, company, c/o" autocomplete="address-line2">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="checkout-zip">Postal code <span class="required">*</span></label>
          <input id="checkout-zip" v-model="form.zip" type="text" required placeholder="10115" maxlength="16" autocomplete="postal-code">
        </div>
        <div class="form-group">
          <label for="checkout-city">City <span class="required">*</span></label>
          <input id="checkout-city" v-model="form.city" type="text" required placeholder="Berlin" autocomplete="address-level2">
        </div>
      </div>
    </section>

    <section class="form-section">
      <h2>Import charges</h2>
      <DutyNotice />
      <p class="field-hint">
        From 2026, low-value parcels can also attract an EU customs duty and a Union handling fee, plus any fee the carrier charges for advancing those amounts. The exact amount is set by customs and the carrier, not by this shop.
        Refusing the parcel can mean you still owe return shipping and those fees.
        <RouterLink to="/shipping">Shipping</RouterLink>
        ·
        <RouterLink to="/returns">Returns</RouterLink>
      </p>
      <label class="checkbox-label">
        <input v-model="form.dutiesAccepted" type="checkbox" name="duties" />
        <span>I understand that import VAT, customs duty, and carrier fees are paid by me on delivery, and are not part of today’s charge. <span class="required">*</span></span>
      </label>
    </section>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <p v-if="submitBlockedMessage" class="field-hint field-hint-error submit-blocked">{{ submitBlockedMessage }}</p>

    <button
      type="submit"
      class="btn-submit"
      :disabled="submitting || Boolean(submitBlockedMessage)"
    >
      {{ submitting ? 'Processing…' : 'Place order' }}
    </button>
  </form>
</template>

<script>
import DutyNotice from '@/components/DutyNotice.vue'

export default {
  components: { DutyNotice },
  props: {
    form: { type: Object, required: true },
    submitting: { type: Boolean, default: false },
    errorMessage: { type: String, default: null },
    countryOptions: { type: Array, default: () => [] },
    submitBlockedMessage: { type: String, default: null },
  },
  emits: ['submit'],
}
</script>

<style scoped>
.form-section {
  margin-bottom: 40px;
}

.form-section h2 {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #e8e8e8;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background-color: #fff;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #1a1a1a;
}

.field-hint {
  margin: 10px 0 0;
  font-size: 0.78rem;
  line-height: 1.6;
  color: #666;
}

.field-hint a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.field-hint-error {
  color: #c00;
}

.submit-blocked {
  margin-bottom: 12px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 14px;
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.55;
  color: #333;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  margin-top: 3px;
  accent-color: #1a2421;
}

.required {
  color: #c00;
}

.error-message {
  color: #c00;
  font-size: 0.85rem;
  margin-bottom: 16px;
}

.btn-submit {
  display: block;
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.8;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
