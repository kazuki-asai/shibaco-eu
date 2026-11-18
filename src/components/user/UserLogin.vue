<template>
  <div class="login-page">
    <div class="container">
      <p class="page-label">LOGIN</p>
      <h1 class="page-title">Sign in</h1>
      <p class="page-lead">
        Sign in with your registered email and password.
      </p>

      <form class="login-form" @submit.prevent="submit">
        <div class="form-group">
          <label for="login-email">Email <span class="required">*</span></label>
          <input
            id="login-email"
            v-model="form.email"
            type="email"
            name="email"
            required
            autocomplete="email"
            placeholder="example@email.com"
          />
        </div>

        <div class="form-group">
          <label for="login-password">Password <span class="required">*</span></label>
          <input
            id="login-password"
            v-model="form.password"
            type="password"
            name="password"
            required
            autocomplete="current-password"
            placeholder="Password"
          />
        </div>

        <div v-if="errorMessages.length" class="error-messages" role="alert">
          <ul class="error-list">
            <li v-for="(msg, i) in errorMessages" :key="i">{{ msg }}</li>
          </ul>
        </div>

        <button type="submit" class="btn-submit" :disabled="submitting">
          {{ submitting ? 'Signing in…' : 'Sign in' }}
        </button>

        <p class="signup-note">
          Don't have an account?
          <RouterLink to="/signup" class="inline-link">Create an account</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { setUser } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const submitting = ref(false)
const errorMessages = ref([])

const submit = async () => {
  errorMessages.value = []
  submitting.value = true
  try {
    const { data } = await axios.post(
      '/api/customer_sessions',
      {
        customer: {
          email: form.email.trim(),
          password: form.password,
        },
      },
      { withCredentials: true }
    )
    if (data?.customer) {
      setUser(data.customer)
    }
    await router.push('/')
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
      : ['Sign-in failed. Please check your email and password.']
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped lang="scss">
.login-page {
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

.signup-note {
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
