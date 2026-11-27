<template>
  <div class="faq-page">
    <div class="page-header">
      <span class="label">FAQ</span>
      <h1>FAQ</h1>
    </div>

    <div class="container">
      <div v-for="category in faqs" :key="category.category" class="category">
        <h2>{{ category.category }}</h2>
        <div class="faq-list">
          <div v-for="(item, index) in category.items" :key="index" class="faq-item">
            <p class="faq-q">{{ item.q }}</p>
            <p class="faq-a" v-html="item.a" />
            <RouterLink v-if="item.link" :to="item.link.to" class="faq-link">{{ item.link.label }}</RouterLink>
          </div>
        </div>
      </div>

      <div class="cta">
        <p>Still need help? Contact us anytime.</p>
        <RouterLink to="/contact" class="btn">Contact</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { currencyNotice, deliveryCopy, dutyNotice } from '@/config/store'

useHead({
  title: 'FAQ | shibaco',
  meta: [
    {
      name: 'description',
      content: 'Answers about shibaco products, orders, shipping, and returns.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/faq' }],
})

const faqs = [
  {
    category: 'Products',
    items: [
      {
        q: 'What materials do you use?',
        a: 'Our T-shirts use 100% cotton bodies. Full material details are listed on each product page.',
      },
      {
        q: 'How do the sizes fit?',
        a: 'Each product page includes a size chart. Many styles have a relaxed silhouette, so some customers choose one size down from their usual size.',
      },
      {
        q: 'Will the print peel off?',
        a: 'Silk-screen prints last when cared for properly. We recommend washing garments inside out.',
      },
      {
        q: 'Will you add more colours or designs?',
        a: 'We release new pieces regularly. Check this site for updates.',
      },
    ],
  },
  {
    category: 'Orders & payment',
    items: [
      {
        q: 'Can I cancel after ordering?',
        a: 'If you buy as a consumer in the EU or EEA, you can withdraw within 14 days of receiving the goods. See the returns page for how. Please still check size and colour before you order.',
        link: { to: '/returns', label: 'View returns →' },
      },
      {
        q: 'Which payment methods do you accept?',
        a: 'You pay on Stripe Checkout. The amount we send is Japanese yen. Stripe may also offer a converted currency, Link, or Apple Pay when those are enabled on the Stripe account. This website does not show wallet logos.',
      },
      {
        q: 'Which currency do you charge?',
        a: `${currencyNotice} ${dutyNotice}`,
      },
      {
        q: 'Can I get an invoice or receipt?',
        a: 'Your order confirmation email serves as your purchase record. Formal invoices can be requested via the contact form when needed.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        q: 'How long does delivery take?',
        a: deliveryCopy.summary,
      },
      {
        q: 'How much is shipping?',
        a: 'Please see our shipping page for details.',
        link: { to: '/shipping', label: 'View shipping information →' },
      },
      {
        q: 'Do you ship to Europe?',
        a: 'Yes. This storefront is for European customers. We ship internationally to destinations across Europe.',
      },
      {
        q: 'Can I track my order?',
        a: 'Once your order ships, we email you a tracking number so you can follow delivery with the courier.',
      },
    ],
  },
  {
    category: 'Returns & exchanges',
    items: [
      {
        q: 'Can I return an item?',
        a: 'EU and EEA consumers can withdraw within 14 days of delivery. We also put right items that are faulty, incorrect, or damaged. The returns page has the steps.',
        link: { to: '/returns', label: 'View returns →' },
      },
      {
        q: 'What if my order arrives damaged or incorrect?',
        a: 'Contact us with photos and your order number. You do not have to wait, and statutory rights are not limited to 14 days.',
      },
    ],
  },
]
</script>

<style scoped>
.faq-page {
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

.category {
  margin-bottom: 48px;
}

.category h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 1.5px solid #e8e8e8;
  color: #1a1a1a;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.faq-item {
  padding-bottom: 24px;
  border-bottom: 1px solid #e8e8e8;
}

.faq-q {
  font-size: 0.92rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
  line-height: 1.6;
}

.faq-q::before {
  content: 'Q. ';
  color: var(--color-accent);
}

.faq-a {
  font-size: 0.88rem;
  color: #5a5a5a;
  line-height: 1.9;
  margin: 0;
  padding-left: 1.4em;
}

.faq-link {
  display: inline-block;
  margin-top: 8px;
  margin-left: 1.4em;
  font-size: 0.85rem;
  color: var(--color-accent);
  text-decoration: none;
}

.faq-link:hover {
  text-decoration: underline;
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

  .category {
    margin-bottom: 36px;
  }

  .cta {
    padding: 32px 20px;
  }
}
</style>
