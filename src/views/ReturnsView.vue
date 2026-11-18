<template>
  <div class="returns-page">
    <div class="page-header">
      <span class="label">RETURNS & EXCHANGES</span>
      <h1>Returns & exchanges</h1>
    </div>

    <div class="container">
      <section class="section">
        <h2>Our policy</h2>
        <p>
          Every shibaco piece is <strong>made to order</strong>.<br />
          We cannot accept returns or exchanges for change-of-mind reasons.<br />
          Please check size, colour, and design carefully before you order.
        </p>
        <div class="notice">
          <p><b>Because items are made to order, we cannot accept returns for reasons such as “not what I expected” or “wrong size”.</b></p>
          <p>Orders cannot be cancelled after they are confirmed.</p>
        </div>
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>When we can help</h2>
        <p>We will arrange a return or exchange only in these cases:</p>
        <ul class="reasons-list">
          <li>Print defects or manufacturing faults</li>
          <li>You received the wrong item</li>
          <li>Damage in transit that makes the item unusable</li>
        </ul>
        <div class="notice">
          <p>Please contact us <strong>within 7 days of delivery</strong>.</p>
          <p>We cannot process claims after that window.</p>
        </div>
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>How it works</h2>
        <ol class="steps-list">
          <li>
            <span class="step-num">01</span>
            <div>
              <p class="step-title">Contact us</p>
              <p class="step-desc">Within 7 days of delivery, use the contact form and include your order number, a description of the issue, and photos.</p>
            </div>
          </li>
          <li>
            <span class="step-num">02</span>
            <div>
              <p class="step-title">Review & guidance</p>
              <p class="step-desc">We review your message and reply within 3 business days with next steps for return or exchange.</p>
            </div>
          </li>
          <li>
            <span class="step-num">03</span>
            <div>
              <p class="step-title">Return & reship</p>
              <p class="step-desc">If the issue is our responsibility, shibaco covers return shipping. Replacement items typically ship within 5–10 business days after we receive the return.</p>
            </div>
          </li>
        </ol>
      </section>

      <div class="divider"></div>

      <section class="section">
        <h2>Notes</h2>
        <ul class="notes-list">
          <li>Items that have been worn or washed are not eligible.</li>
          <li>If a replacement is unavailable, we will offer a refund.</li>
          <li>Refunds are issued to the original payment method; timing depends on your card issuer.</li>
        </ul>
      </section>

      <div class="cta">
        <p>Questions about returns? Contact us anytime.</p>
        <RouterLink to="/contact" class="btn">Contact</RouterLink>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Returns & exchanges | shibaco',
  meta: [
    {
      name: 'description',
      content: 'shibaco returns and exchanges policy for made-to-order apparel.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/returns' }],
})
</script>

<style scoped>
.returns-page {
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

.section p {
  font-size: 0.92rem;
  color: #5a5a5a;
  line-height: 2;
  margin: 0;
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

.notice strong {
  color: #5a5a5a;
}

.reasons-list {
  margin: 16px 0 0;
  padding-left: 1.4em;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reasons-list li {
  font-size: 0.92rem;
  color: #5a5a5a;
  line-height: 1.8;
}

.steps-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.steps-list li {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.step-num {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 6px;
  line-height: 1.6;
}

.step-desc {
  font-size: 0.88rem;
  color: #5a5a5a;
  margin: 0;
  line-height: 1.9;
}

.notes-list {
  margin: 0;
  padding-left: 1.4em;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notes-list li {
  font-size: 0.88rem;
  color: #5a5a5a;
  line-height: 1.8;
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

  .steps-list li {
    gap: 14px;
  }
}
</style>
