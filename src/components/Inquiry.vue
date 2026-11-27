<template>
  <div class="inquiry-page">
    <div class="container">
      <p class="page-label">CONTACT</p>
      <h1 class="page-title">Contact</h1>
      <p class="page-lead">
        Send us a message using the form below. We will review it and get back to you by email.
      </p>

      <div v-if="submitted" class="success-panel" role="status">
        <p class="success-title">Message sent</p>
        <p class="success-text">
          Thank you for contacting us. We will reply by email shortly.
        </p>
        <button type="button" class="btn-secondary" @click="submitted = false">
          Send another message
        </button>
      </div>

      <form v-else class="inquiry-form" @submit.prevent="submit">
        <div class="form-group">
          <label for="inq-name">Full name <span class="required">*</span></label>
          <input
            id="inq-name"
            v-model="form.name"
            type="text"
            name="customer_name"
            required
            autocomplete="name"
            placeholder="Jane Smith"
          />
        </div>

        <div class="form-group">
          <label for="inq-email">Email <span class="required">*</span></label>
          <input
            id="inq-email"
            v-model="form.email"
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="example@email.com"
          />
        </div>

        <!--
        <div class="form-group">
          <label for="inq-phone">Phone</label>
          <input
            id="inq-phone"
            v-model="form.phone"
            type="tel"
            name="phone"
            autocomplete="tel"
            placeholder="+49 170 0000000 (optional)"
          />
        </div>
        -->

        <div class="form-group">
          <label for="inq-category">Enquiry type</label>
          <p v-if="categoriesError" class="categories-error">{{ categoriesError }}</p>
          <select
            id="inq-category"
            v-model="form.categoryId"
            name="inquiry_category_id"
            :disabled="categoriesLoading"
          >
            <option value="">Please select</option>
            <option v-for="c in inquiryCategories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="inq-message">Message <span class="required">*</span></label>
          <textarea
            id="inq-message"
            v-model="form.message"
            name="body"
            required
            rows="7"
            placeholder="How can we help?"
          />
        </div>

        <div class="form-group checkbox-wrap">
          <label class="checkbox-label">
            <input v-model="form.privacy" type="checkbox" name="privacy" />
            <span>
              I have read the
              <RouterLink to="/privacy-policy" class="inline-link">privacy policy</RouterLink>
              and agree to my message being used to reply to this enquiry.
              <span class="required">*</span>
            </span>
          </label>
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <button type="submit" class="btn-submit" :disabled="submitting || !canSubmit">
          {{ submitting ? 'Sending…' : 'Send message' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import axios from 'axios'
import { apiErrorMessage } from '@/utils/apiError'

useHead({
  title: 'Contact | shibaco',
  meta: [
    {
      name: 'description',
      content: 'Contact shibaco about products, orders, shipping, and more.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/contact' }],
})

const inquiryCategories = ref([])
const categoriesLoading = ref(true)
const categoriesError = ref(null)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  categoryId: '',
  title: '',
  message: '',
  privacy: false,
})

const submitting = ref(false)
const errorMessage = ref(null)
const submitted = ref(false)
const canSubmit = computed(
  () => !categoriesLoading.value && !categoriesError.value && inquiryCategories.value.length > 0,
)

onMounted(async () => {
  categoriesLoading.value = true
  categoriesError.value = null
  try {
    const { data } = await axios.get('/api/inquiry_categories')
    inquiryCategories.value = Array.isArray(data) ? data : []
    if (!inquiryCategories.value.length) {
      categoriesError.value =
        'This form is unavailable right now. Please try again later.'
    }
  } catch (err) {
    categoriesError.value = apiErrorMessage(
      err,
      'Could not load enquiry types. Please refresh the page and try again.',
    )
    inquiryCategories.value = []
  } finally {
    categoriesLoading.value = false
  }
})

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.categoryId = ''
  form.title = '' // あとで消す。多分不要
  form.message = ''
  form.privacy = false
}

const submit = async () => {
  errorMessage.value = null
  if (!form.privacy) {
    errorMessage.value = 'Please agree to the privacy policy before sending.'
    return
  }
  if (!form.categoryId) {
    errorMessage.value = 'Please select an enquiry type.'
    return
  }

  submitting.value = true
  try {
    await axios.post('/api/inquiries', {
      customer_name: form.name.trim(),
      email: form.email.trim(),
      inquiry_category_id: form.categoryId,
      title: form.title || '',
      body: form.message.trim(),
    })
    submitted.value = true
    resetForm()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    errorMessage.value = apiErrorMessage(e, 'Failed to send. Please try again in a moment.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
.inquiry-page {
  padding: 48px 24px 96px;
  background: #faf9f7;
  min-height: 60vh;
}

.container {
  max-width: 560px;
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

.btn-secondary {
  padding: 12px 28px;
  background: transparent;
  border: 1px solid #3b2a1e;
  color: #3b2a1e;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.btn-secondary:hover {
  background: #3b2a1e;
  color: #faf9f7;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.categories-error {
  font-size: 0.82rem;
  color: #c00;
  margin: 0 0 8px;
  line-height: 1.45;
}

.form-group input,
.form-group select,
.form-group textarea {
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

.form-group textarea {
  resize: vertical;
  min-height: 140px;
  line-height: 1.6;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3b2a1e;
}

.checkbox-wrap {
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.6;
  color: #444;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  margin-top: 3px;
  accent-color: #3b2a1e;
}

.inline-link {
  color: #3b2a1e;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.inline-link:hover {
  opacity: 0.85;
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
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.85;
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
