<template>
  <div class="account-page">
    <div class="container">
      <template v-if="user">
        <p class="page-label">PROFILE</p>
        <h1 class="page-title">Profile</h1>
        <div class="profile-card">
          <p class="profile-name">{{ user.name }}</p>
          <p class="profile-email">{{ user.email }}</p>
          <button type="button" class="btn-logout" @click="onLogout">Sign out</button>
        </div>
      </template>
      <template v-else>
        <p class="page-label">PROFILE</p>
        <h1 class="page-title">Profile</h1>
        <p class="lead">Please sign in.</p>
        <RouterLink to="/login" class="btn-link">Sign in</RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

const onLogout = async () => {
  await logout()
  await router.push('/')
}
</script>

<style scoped lang="scss">
.account-page {
  padding: 48px 24px 96px;
  background: #faf9f7;
  min-height: 50vh;
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
  margin: 0 0 24px;
}

.lead {
  font-size: 0.9rem;
  color: #555;
  margin: 0 0 20px;
  line-height: 1.7;
}

.profile-card {
  padding: 28px 24px;
  background: #fff;
  border: 1px solid #e5ded6;
}

.profile-name {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 8px;
  color: #1a1a1a;
}

.profile-email {
  font-size: 0.88rem;
  color: #555;
  margin: 0 0 24px;
  word-break: break-all;
}

.btn-logout {
  display: inline-block;
  padding: 12px 24px;
  background: #fff;
  border: 1px solid #3b2a1e;
  color: #3b2a1e;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s, color 0.2s;
}

.btn-logout:hover {
  background: #3b2a1e;
  color: #faf9f7;
}

.btn-link {
  display: inline-block;
  padding: 12px 28px;
  border: 1px solid #3b2a1e;
  color: #3b2a1e;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.btn-link:hover {
  background: #3b2a1e;
  color: #faf9f7;
}
</style>
