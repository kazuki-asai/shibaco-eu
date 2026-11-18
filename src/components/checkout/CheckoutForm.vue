<template>
  <form class="checkout-form" @submit.prevent="$emit('submit')">
    <section class="form-section">
      <h2>Customer information</h2>
      <div class="form-row">
        <div class="form-group">
          <label>First name <span class="required">*</span></label>
          <input v-model="form.firstName" type="text" required placeholder="Jane" autocomplete="given-name">
        </div>
        <div class="form-group">
          <label>Last name <span class="required">*</span></label>
          <input v-model="form.lastName" type="text" required placeholder="Smith" autocomplete="family-name">
        </div>
      </div>
      <div class="form-group">
        <label>Email <span class="required">*</span></label>
        <input v-model="form.email" type="email" required placeholder="you@email.com" autocomplete="email">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input v-model="form.phone" type="tel" placeholder="+49 170 0000000" autocomplete="tel">
      </div>
    </section>

    <section class="form-section">
      <h2>Shipping address</h2>
      <div class="form-group">
        <label>Postal / ZIP code <span class="required">*</span></label>
        <input v-model="form.zip" type="text" required placeholder="10115" maxlength="16" autocomplete="postal-code">
      </div>
      <div class="form-group">
        <label for="checkout-prefecture">Country / region <span class="required">*</span></label>
        <select
          id="checkout-prefecture"
          v-model="form.prefecture"
          required
        >
          <option disabled value="">
            {{ prefecturesLoading ? 'Loading…' : 'Select a country / region' }}
          </option>
          <option
            v-for="opt in prefectureOptions"
            :key="`${opt.label}-${opt.value}`"
            :value="opt.value"
          >
            {{ opt.label }}
          </option>
        </select>
        <p v-if="prefecturesLoadError" class="field-hint field-hint-error">{{ prefecturesLoadError }}</p>
      </div>
      <div class="form-group">
        <label>Address line 1 <span class="required">*</span></label>
        <input v-model="form.address1" type="text" required placeholder="Street and number" autocomplete="address-line1">
      </div>
      <div class="form-group">
        <label>Address line 2</label>
        <input v-model="form.address2" type="text" placeholder="Apartment, suite, etc." autocomplete="address-line2">
      </div>
    </section>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <p v-if="submitBlockedMessage" class="field-hint field-hint-error submit-blocked">{{ submitBlockedMessage }}</p>

    <button
      type="submit"
      class="btn-submit"
      :disabled="submitting || prefectureOptions.length === 0 || Boolean(submitBlockedMessage)"
    >
      {{ submitting ? 'Processing…' : 'Place order' }}
    </button>
  </form>
</template>

<script>
export default {
  props: {
    form: { type: Object, required: true },
    submitting: { type: Boolean, default: false },
    errorMessage: { type: String, default: null },
    prefectureOptions: { type: Array, default: () => [] },
    prefecturesLoading: { type: Boolean, default: false },
    prefecturesLoadError: { type: String, default: null },
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

.form-group input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #e8e8e8;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #1a1a1a;
}

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

.form-group select:focus {
  border-color: #1a1a1a;
}

.field-hint {
  margin: 6px 0 0;
  font-size: 0.78rem;
  color: #666;
}

.field-hint-error {
  color: #c00;
}

.submit-blocked {
  margin-bottom: 12px;
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
</style>
