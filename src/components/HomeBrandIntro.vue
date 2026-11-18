<template>
  <section class="home-intro">
    <div class="container">
      <div class="intro-block">
        <span class="intro-label">DESIGN</span>
        <h2 class="intro-heading gradient-text">Design that blends into daily life</h2>
        <p class="copy">
          shibaco designs with quiet restraint—never loud, always considered.<br />
          Even our Shiba motifs are refined so they feel at home on city streets.
        </p>
        <p class="copy copy--closing">
          Choose your colour and size,<br class="sp-hide" />
          and find <span class="gradient-text">the piece that feels like yours</span>.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-intro {
  padding: 80px 24px;
  background:
    radial-gradient(ellipse 90% 70% at 50% 0%, rgba(45, 90, 78, 0.1) 0%, transparent 65%),
    radial-gradient(ellipse 70% 50% at 50% 100%, rgba(184, 154, 106, 0.1) 0%, transparent 60%),
    #eef0ed;
}

.container {
  max-width: 820px;
  margin: 0 auto;
}

.intro-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 22px;
}

.intro-label {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  color: var(--color-accent);
  font-weight: 600;
}

.intro-heading {
  font-size: clamp(1.15rem, 2.8vw, 1.5rem);
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  letter-spacing: 0.04em;
}

.copy {
  font-size: clamp(0.9rem, 2vw, 0.98rem);
  color: #6a6a6a;
  line-height: 2;
  margin: 0;
  max-width: 640px;
}

.copy--closing {
  color: #5a5a5a;
}

@media (max-width: 768px) {
  .home-intro {
    padding: 56px 16px;
  }

  .copy {
    line-height: 1.95;
  }

  .sp-hide {
    display: none;
  }
}
</style>
