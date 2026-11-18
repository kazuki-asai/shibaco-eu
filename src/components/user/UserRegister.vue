<template>
  <div class="register-page">
    <div class="container">
      <p class="page-label">REGISTER</p>
      <h1 class="page-title">Create account</h1>
      <p class="page-lead">
        Create an account to manage orders and stay updated on new arrivals.
      </p>

      <div v-if="registered" class="success-panel" role="status">
        <p class="success-title">Registration received</p>
        <p class="success-text">
          Thank you for registering. If a confirmation email arrives, please follow the instructions inside.
        </p>
        <RouterLink to="/" class="btn-secondary-link">Back to home</RouterLink>
      </div>

      <form v-else class="register-form" @submit.prevent="submit">
        <div class="form-row">
          <div class="form-group">
            <label for="reg-last-name">Last name <span class="required">*</span></label>
            <input
              id="reg-last-name"
              v-model="form.lastName"
              type="text"
              name="last_name"
              required
              autocomplete="family-name"
              placeholder="Smith"
            />
          </div>
          <div class="form-group">
            <label for="reg-first-name">First name <span class="required">*</span></label>
            <input
              id="reg-first-name"
              v-model="form.firstName"
              type="text"
              name="first_name"
              required
              autocomplete="given-name"
              placeholder="Jane"
            />
          </div>
        </div>

        <!-- Phonetic name fields omitted for EU; values mirrored from Latin names on submit -->

        <div class="form-group">
          <label for="reg-gender">Gender</label>
          <select id="reg-gender" v-model="form.gender" name="gender">
            <option v-for="opt in genderOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="reg-birth-date">Date of birth</label>
          <input
            id="reg-birth-date"
            v-model="form.birthDate"
            type="date"
            name="birth_date"
            autocomplete="bday"
            :min="birthDateMin"
            :max="birthDateMax"
          />
          <p class="field-hint">Optional. You may be able to update this later.</p>
        </div>

        <div class="form-group">
          <label for="reg-email">Email <span class="required">*</span></label>
          <input
            id="reg-email"
            v-model="form.email"
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="example@email.com"
          />
        </div>

        <div class="form-group">
          <label for="reg-password">Password <span class="required">*</span></label>
          <input
            id="reg-password"
            v-model="form.password"
            type="password"
            name="password"
            required
            autocomplete="new-password"
            minlength="8"
            placeholder="At least 8 characters"
          />
          <p class="field-hint">Use at least 8 characters with letters and numbers.</p>
        </div>

        <div class="form-group">
          <label for="reg-password-confirm">Confirm password <span class="required">*</span></label>
          <input
            id="reg-password-confirm"
            v-model="form.passwordConfirmation"
            type="password"
            name="password_confirmation"
            required
            autocomplete="new-password"
            minlength="8"
            placeholder="Enter password again"
          />
        </div>

        <div v-if="errorMessages.length" class="error-messages" role="alert">
          <ul class="error-list">
            <li v-for="(msg, i) in errorMessages" :key="i">{{ msg }}</li>
          </ul>
        </div>

        <button type="submit" class="btn-submit" :disabled="submitting || passwordMismatch">
          {{ submitting ? 'Creating…' : 'Create account' }}
        </button>

        <p class="login-note">
          Already have an account?
          <RouterLink to="/login" class="inline-link">Sign in</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import axios from 'axios'

const form = reactive({
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  gender: 'unspecified',
  birthDate: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const genderOptions = [
  { value: 'unspecified', label: 'Please select' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const birthDateMin = '1900-01-01'
const birthDateMax = new Date().toISOString().slice(0, 10)

const submitting = ref(false)
const errorMessages = ref([])
const registered = ref(false)

const passwordMismatch = computed(
  () =>
    form.passwordConfirmation !== '' &&
    form.password !== form.passwordConfirmation
)

const submit = async () => {
  errorMessages.value = []

  if (passwordMismatch.value) {
    errorMessages.value = ['Passwords do not match.']
    return
  }

  submitting.value = true
  try {
    await axios.post('/api/customers', {
      customer: {
        last_name: form.lastName.trim(),
        first_name: form.firstName.trim(),
        last_name_kana: form.lastNameKana || form.lastName.trim(),
        first_name_kana: form.firstNameKana || form.firstName.trim(),
        gender: form.gender,
        birthday: form.birthDate || null,
        email: form.email.trim(),
        password: form.password,
        password_confirmation: form.passwordConfirmation,
      }
    })
    registered.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    const data = e.response?.data
    const msgs = []

    if (Array.isArray(data?.errors)) {
      for (const item of data.errors) {
        if (typeof item === 'string') msgs.push(item)
        else if (Array.isArray(item)) {
          msgs.push(...item.filter((x) => typeof x === 'string'))
        }
      }
    } else if (data?.errors && typeof data.errors === 'object') {
      for (const v of Object.values(data.errors)) {
        if (typeof v === 'string') msgs.push(v)
        else if (Array.isArray(v)) msgs.push(...v.filter((x) => typeof x === 'string'))
      }
    }

    if (typeof data?.error === 'string') {
      msgs.push(data.error)
    }

    errorMessages.value = msgs.length
      ? msgs
      : ['Registration failed. Please check your details and try again.']
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
.register-page {
  padding: 48px 24px 96px;
  background: #faf9f7;
  min-height: 60vh;
}

.container {
  max-width: 520px;
  margin: 0 auto;
}

.page-label {
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  color: #8a7a6a;
  margin: 0 0 12px;
}

.page-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  color: #1a1a1a;
  margin: 0 0 16px;
}

.page-lead {
  font-size: 0.9rem;
  line-height: 1.75;
  color: #555;
  margin: 0 0 40px;
}

.success-panel {
  padding: 28px 24px;
  background: #fff;
  border: 1px solid #e5ded6;
  text-align: center;
}

.success-title {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin: 0 0 12px;
  color: #1a1a1a;
}

.success-text {
  font-size: 0.88rem;
  line-height: 1.7;
  color: #555;
  margin: 0 0 24px;
}

.btn-secondary-link {
  display: inline-block;
  padding: 12px 28px;
  border: 1px solid #3b2a1e;
  color: #3b2a1e;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.btn-secondary-link:hover {
  background: #3b2a1e;
  color: #faf9f7;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 20px;
}

.section-hint {
  margin: -8px 0 20px;
  font-size: 0.75rem;
  color: #777;
  line-height: 1.5;
}

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #e8e8e8;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fff;
}

.form-group input:focus {
  border-color: #3b2a1e;
}

.form-group select {
  width: 100%;
  padding: 11px 13px;
  border: 1px solid #e8e8e8;
  font-size: 0.9rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
  box-sizing: border-box;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.form-group select:focus {
  border-color: #3b2a1e;
}

.form-group input[type='date'] {
  cursor: pointer;
}

.field-hint {
  margin: 8px 0 0;
  font-size: 0.75rem;
  color: #777;
  line-height: 1.5;
}

.required {
  color: #c00;
}

.error-messages {
  margin-bottom: 16px;
}

.error-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #c00;
  font-size: 0.85rem;
  line-height: 1.6;
}

.error-list li + li {
  margin-top: 6px;
}

.btn-submit {
  display: block;
  width: 100%;
  padding: 16px;
  margin-top: 8px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.85;
}

.btn-submit:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.login-note {
  margin: 28px 0 0;
  text-align: center;
  font-size: 0.85rem;
  color: #555;
}

.inline-link {
  color: #3b2a1e;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.inline-link:hover {
  opacity: 0.85;
}
</style>
