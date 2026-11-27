<template>
  <div class="policy-page">
    <div class="page-header">
      <span class="label">PRIVACY POLICY</span>
      <h1>Privacy policy</h1>
    </div>

    <div class="container">
      <p class="intro">
        This policy explains how the European shibaco store handles personal data. It is a working template. Fields marked “Seller to complete” must be filled in before launch. It is not a substitute for advice from a lawyer.
      </p>
      <p class="owner-gap">
        Seller to complete before launch: a customer email address, and the company register and VAT or invoice numbers if you have them. The controller’s name, address, and phone are loaded from the shop record when that record is available.
      </p>

      <section class="section" v-for="section in sections" :key="section.title">
        <h2>{{ section.title }}</h2>
        <div v-html="section.body" />
      </section>

      <p class="updated">Last updated: 27 November 2026</p>

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
    title: '1. Who is responsible',
    body: `
      <p>The controller is the seller named on the <a href="/legal">legal notice</a>. That page shows the name, representative, address, and phone number stored for this shop. The shop record does not include a privacy email.</p>
      <p><strong>Seller to complete:</strong> a dedicated privacy contact email. Until it is published, use the contact form and write “Privacy” in the message.</p>
      <p>This store is operated from Japan and sells to people in Europe.</p>
    `,
  },
  {
    title: '2. Personal data we collect',
    body: `
      <p>Depending on what you do on the site, we process:</p>
      <ul>
        <li>Name, email, phone, and shipping address, when you check out or contact us</li>
        <li>Order contents, the country used to quote shipping, and your confirmation at checkout that import charges are paid on delivery</li>
        <li>Payment status. Card numbers are handled by Stripe. We do not store full card numbers.</li>
        <li>Messages you send through the contact form</li>
        <li>A cart saved in your browser’s local storage</li>
        <li>Cookie and advertising identifiers, only if you accept analytics and ads</li>
      </ul>
    `,
  },
  {
    title: '3. Why we use it, and the legal basis',
    body: `
      <ul>
        <li><strong>Contract</strong> (GDPR Art. 6(1)(b)): taking your order, charging the yen amount, shipping, and sending order emails.</li>
        <li><strong>Legal obligation</strong> (Art. 6(1)(c)): tax and accounting records the seller is required to keep. The retention period is for the seller to confirm. Japanese export documents are often kept for 7 years; do not treat that as legal advice.</li>
        <li><strong>Legitimate interests</strong> (Art. 6(1)(f)): securing the site, preventing fraud, and answering questions. You can object where the law allows.</li>
        <li><strong>Consent</strong> (Art. 6(1)(a)): Google Analytics and Google Ads. We do not load those tags until you accept. You can reject them, or change your mind, with the cookie settings link in the footer.</li>
      </ul>
      <p>We do not send a marketing newsletter. There is no newsletter signup on this site.</p>
    `,
  },
  {
    title: '4. Who receives it',
    body: `
      <p>We do not sell personal data. Recipients are limited to:</p>
      <ul>
        <li><strong>Stripe</strong> — card payment and the checkout page</li>
        <li><strong>The carrier</strong> — name, address, and contact details needed for delivery. <strong>Seller to complete:</strong> the carrier’s name.</li>
        <li><strong>Google</strong> — Analytics (measurement ID G-8108T1M9BS) and Ads (AW-18390381994), only after you accept</li>
        <li><strong>Render</strong> — hosts this website</li>
        <li><strong>The shop platform</strong> — stores orders and enquiries</li>
        <li>Authorities, when the law requires it</li>
      </ul>
    `,
  },
  {
    title: '5. Transfers outside the EU',
    body: `
      <p>The seller and the shop system are in Japan. Japan has a European Commission adequacy decision for private-sector transfers, which can cover a transfer to a business in Japan. Stripe, Google, and Render may process data in other countries under their own safeguards (such as standard contractual clauses). Ask us if you want more detail on a specific transfer.</p>
    `,
  },
  {
    title: '6. How long we keep it',
    body: `
      <p>Order and accounting records are kept for as long as tax law requires. <strong>Seller to complete:</strong> the exact periods. Enquiries are kept long enough to resolve them and for a short time afterwards. The cookie choice is stored in local storage until you change it. Analytics cookies, if you accept them, follow Google’s expiry.</p>
    `,
  },
  {
    title: '7. Your rights',
    body: `
      <p>If GDPR applies, you can ask to access, correct, erase, or restrict your data, and you can ask for portability or object to processing based on legitimate interests. Where we rely on consent, you can withdraw it at any time. Withdrawal does not affect processing that already happened.</p>
      <p>You can complain to a supervisory authority, in particular in the EU or EEA country where you live or work. Contact us first if you want us to fix something.</p>
    `,
  },
  {
    title: '8. Cookies and similar storage',
    body: `
      <p>Before you choose, Google Analytics and Google Ads are not loaded. The page sets Google Consent Mode defaults to denied. Accepting loads gtag.js and allows analytics and ad storage. Rejecting leaves those tags unloaded.</p>
      <ul>
        <li><strong>Cart</strong> — local storage key <code>shibaco_cart</code>. Not a cookie. Needed to remember the cart on this device.</li>
        <li><strong>Cookie choice</strong> — local storage key <code>shibaco_cookie_consent</code>. Remembers accept or reject.</li>
        <li><strong>Google Analytics</strong> — only after accept. Used to understand how the site is used.</li>
        <li><strong>Google Ads</strong> — only after accept. Used to measure advertising.</li>
      </ul>
      <p>Use “Cookie settings” in the footer to choose again. If you accepted and later reject, we stop further measurement. Cookies already set by Google may remain until they expire or you clear them in the browser.</p>
    `,
  },
  {
    title: '9. Security',
    body: `
      <p>Checkout is served over HTTPS and payment details are collected by Stripe. No method of transmission is completely secure.</p>
    `,
  },
  {
    title: '10. Changes',
    body: `
      <p>If this policy changes in a way that matters, we will update the date on this page.</p>
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
  margin: 0 0 16px;
}

.owner-gap {
  margin: 0 0 40px;
  padding: 14px 16px;
  background: #f7f1e4;
  border-left: 3px solid #b89a6a;
  color: #3a3a3a;
  font-size: 0.86rem;
  line-height: 1.6;
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

.section :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
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
