<template>
  <div class="brand-story" data-no-rise>
    <section class="hero">
      <div class="hero-image">
        <img :src="brandImageUrl" alt="shibaco craftsmanship — Shiba Inu motif apparel" />
        <div class="hero-overlay">
          <span class="label">BRAND STORY</span>
          <h1>Life with a Shiba—<br />freer, more yourself.</h1>
        </div>
      </div>
    </section>

    <section class="intro">
      <div class="container">
        <div class="intro-inner">
          <span class="intro-label">ABOUT SHIBACO</span>
          <div class="intro-ornament" aria-hidden="true"></div>
          <p class="lead">
            <span class="lead-line">
              <span class="brand-name">shibaco</span><span class="lead-body"> is a brand that hand-makes </span><span class="gradient-text lead-highlight">Shiba Inu motif apparel</span>
            </span>
            <span class="lead-line">
              <span class="lead-body">with </span><span class="gradient-text lead-highlight">silk-screen printing</span><span class="lead-body">.</span>
            </span>
          </p>
          <div class="intro-ornament intro-ornament--bottom" aria-hidden="true"></div>
        </div>
      </div>
    </section>

    <section class="story-section" data-no-rise>
      <div class="container">
        <div class="story-block">
          <span class="chapter">01</span>
          <h2>It began with one Shiba</h2>
          <p>
            The brand started with a Shiba who came into our home.<br />
            Rolling on the floor, a sudden glance, that contented look after a walk.<br />
            Everyday moments filled with affection.<br /><br />
            “We want to make life with this dog even richer.”<br />
            That feeling was the first step for shibaco.
          </p>
        </div>

        <div class="divider"></div>

        <div class="story-block">
          <span class="chapter">02</span>
          <h2>Why silk screen</h2>
          <p>
            We chose silk-screen printing—ink pressed by hand, colour by colour.<br />
            It is slower than mass production.<br /><br />
            We chose it because subtle overlaps and texture give a warmth machines cannot copy.<br />
            We value craftsmanship that leaves a trace of the hand.
          </p>
        </div>

        <div class="divider"></div>

        <div class="story-block">
          <span class="chapter">03</span>
          <h2>Design that blends in</h2>
          <p>
            shibaco designs with quiet restraint.<br />
            Shiba illustrations are refined so they feel natural on city streets.<br /><br />
            Choose the colour and size that fit your everyday wear.<br />
            Your favourite shade, today’s mood, the outfit you have in mind—<br />
            find the piece that feels like yours.
          </p>
        </div>

        <div class="divider"></div>

        <div class="story-block">
          <span class="chapter">04</span>
          <h2>Materials that last</h2>
          <p>
            We choose fabrics that soften and settle in as you wear them.<br /><br />
            Soft, durable, and beautiful under print.<br />
            Pieces you will want to reach for every day.
          </p>
        </div>

        <div class="divider"></div>

        <div class="story-block">
          <span class="chapter">05</span>
          <h2>For people who love Shibas</h2>
          <p>
            Everyone who picks up a shibaco piece shares a love for Shiba Inus.<br />
            A smile on a walk. “Looks like my dog,” someone says.<br /><br />
            Through clothing, Shiba lovers connect.<br />
            Watching that small circle grow is our joy.
          </p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <span class="label">COLLECTION</span>
        <h3>Explore shibaco pieces</h3>
        <RouterLink to="/products" class="btn">View the collection</RouterLink>
      </div>
    </section>
  </div>
</template>


<script setup>
import { useHead } from '@unhead/vue'

useHead({
  title: 'Brand story | shibaco',
  meta: [
    {
      name: 'description',
      content:
        'The story of shibaco — Shiba Inu motif silk-screen apparel, crafted with care.',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://eu.shiba-co.com/brand-story' }],
})
</script>

<script>
export default {
  name: 'BrandStoryView',
  data() {
    return {
      brandImageUrl: new URL('../assets/images/IMG_6550.jpg', import.meta.url).href,
    }
  },
}
</script>

<style scoped>
.brand-story {
  color: #1a1a1a;
}

/* ヒーロー */
.hero {
  position: relative;
  width: 100%;
  height: 70vh;
  min-height: 400px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  position: relative;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px;
  text-align: center;
}

.hero-overlay h1 {
  color: #fff;
  font-size: clamp(1.5rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.6;
  margin: 0;
  letter-spacing: 0.04em;
}

/* イントロ */
.intro {
  padding: 88px 24px;
  background:
    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(176, 120, 64, 0.1) 0%, transparent 65%),
    radial-gradient(ellipse 70% 50% at 50% 100%, rgba(160, 101, 53, 0.07) 0%, transparent 60%),
    #eef0ed;
  text-align: center;
}

.intro .container {
  max-width: 820px;
}

.intro-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.intro-label {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  color: var(--color-accent);
  font-weight: 600;
}

.intro-ornament {
  width: 56px;
  height: 2px;
  background: linear-gradient(90deg, #5c2e10, #8a5020 55%, #a06535);
  border-radius: 1px;
  opacity: 0.85;
}

.intro-ornament--bottom {
  width: 32px;
  opacity: 0.5;
}

.lead {
  font-size: clamp(1.1rem, 2.8vw, 1.45rem);
  line-height: 2.1;
  margin: 0;
  letter-spacing: 0.04em;
}

.lead-line {
  display: block;
}

.lead-body {
  color: #5a5a5a;
  font-weight: 400;
}

.brand-name {
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-primary);
}

.lead-highlight {
  font-weight: 600;
}

/* ストーリーセクション */
.story-section {
  padding: 80px 24px;
  background: #fff;
}

.container {
  max-width: 760px;
  margin: 0 auto;
}

.story-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chapter {
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  color: var(--color-accent);
  font-weight: 700;
}

.story-block h2 {
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  color: #1a1a1a;
}

.story-block p {
  font-size: 0.95rem;
  color: #5a5a5a;
  line-height: 2;
  margin: 0;
}

.divider {
  height: 1px;
  background: #e8e8e8;
  margin: 56px 0;
}

/* CTAセクション */
.cta-section {
  padding: 80px 24px;
  background: #eef0ed;
  text-align: center;
}

.cta-section .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.label {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  font-weight: 600;
}

.cta-section h3 {
  font-size: clamp(1.2rem, 3vw, 1.7rem);
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

.btn {
  display: inline-block;
  padding: 14px 40px;
  border: 1.5px solid #1a1a1a;
  color: #1a1a1a;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  transition: background 0.2s, color 0.2s;
}

.btn:hover {
  background: #1a1a1a;
  color: #fff;
}

@media (max-width: 768px) {
  .hero {
    height: 55vh;
  }

  .intro {
    padding: 56px 16px;
  }

  .intro-inner {
    gap: 22px;
  }

  .lead {
    line-height: 2;
  }

  .story-section {
    padding: 56px 16px;
  }

  .divider {
    margin: 40px 0;
  }

  .cta-section {
    padding: 56px 16px;
  }

  .sp-hide {
    display: none;
  }
}
</style>
