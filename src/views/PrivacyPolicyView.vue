<template>
  <div class="policy-page">
    <div class="page-header">
      <span class="label">PRIVACY POLICY</span>
      <h1>Privacy policy</h1>
    </div>

    <div class="container">
      <p class="intro">
        shibaco (“we”, “us”) takes the protection of your personal data seriously. This policy explains how we handle information for the European storefront.
      </p>

      <section class="section" v-for="section in sections" :key="section.title">
        <h2>{{ section.title }}</h2>
        <div v-html="section.body" />
      </section>

      <p class="updated">Last updated: 24 May 2026</p>

      <div class="cta">
        <p>Questions about privacy? Contact us here.</p>
        <RouterLink to="/contact" class="btn">Contact</RouterLink>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Privacy policy | shibaco',
  meta: [
    {
      name: 'description',
      content: 'How shibaco collects and uses personal data for the European online store.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/privacy-policy' }],
})


const sections = [
  {
    title: '1. Personal data we collect',
    body: `
      <p>We may collect the following information:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Address and phone number (for shipping)</li>
        <li>Purchase history</li>
        <li>Payment details (processed by our payment provider; we do not store full card numbers)</li>
      </ul>
    `,
  },
  {
    title: '2. How we use your data',
    body: `
      <p>We use personal data only for these purposes:</p>
      <ul>
        <li>Processing orders, shipping, and billing</li>
        <li>Responding to enquiries</li>
        <li>Sending product or campaign updates when you have opted in</li>
        <li>Preventing fraud and misuse</li>
      </ul>
    `,
  },
  {
    title: '3. Sharing with third parties',
    body: `
      <p>We do not sell your personal data. We share it only when necessary:</p>
      <ul>
        <li>With your consent</li>
        <li>With courier partners to deliver your order</li>
        <li>With payment providers to process transactions</li>
        <li>When required by law</li>
      </ul>
    `,
  },
  {
    title: '4. Data security',
    body: `
      <p>We take appropriate technical and organisational measures to protect personal data against unauthorised access, loss, alteration, or disclosure.</p>
    `,
  },
  {
    title: '5. Your rights',
    body: `
      <p>You may request access to, correction of, or deletion of your personal data. Contact us via the contact form to exercise these rights under applicable EU/EEA data protection law (including GDPR).</p>
    `,
  },
  {
    title: '6. Cookies',
    body: `
      <p>We may use cookies to improve site experience. You can disable cookies in your browser settings; some features may then be limited.</p>
    `,
  },
  {
    title: '7. Changes to this policy',
    body: `
      <p>We may update this policy when laws or our services change. Material updates will be noted on this page.</p>
    `,
  },
  {
    title: '8. Contact',
    body: `
      <p>For privacy questions, please use the contact form on this site.</p>
    `,
  },
]
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

.intro {
  font-size: 0.92rem;
  color: #5a5a5a;
  line-height: 2;
  margin: 0 0 48px;
}

.section {
  margin-bottom: 40px;
}

.section h2 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 12px;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #e8e8e8;
  color: #1a1a1a;
}

.section :deep(p) {
  font-size: 0.88rem;
  color: #5a5a5a;
  line-height: 2;
  margin: 0 0 8px;
}

.section :deep(ul) {
  margin: 8px 0 0;
  padding-left: 1.4em;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section :deep(li) {
  font-size: 0.88rem;
  color: #5a5a5a;
  line-height: 1.8;
}

.updated {
  font-size: 0.82rem;
  color: #9a9a9a;
  margin: 0 0 56px;
  text-align: right;
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

  .cta {
    padding: 32px 20px;
  }
}
</style>
