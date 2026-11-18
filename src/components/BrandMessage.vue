<template>
  <section class="brand">
    <div class="brand-inner">
      <div class="brand-visual">
        <div class="brand-image-wrap">
          <img
            :src="brandImageUrl"
            alt="shibaco brand"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span class="visual-tag" aria-hidden="true">SILK SCREEN</span>
      </div>

      <div class="brand-content">
        <span class="label">ABOUT SHIBACO</span>
        <div class="ornament" aria-hidden="true"></div>
        <h2 class="heading">
          Life with a Shiba—<br />
          <span class="heading-accent">freer, more yourself.</span>
        </h2>
        <p class="copy">
          shibaco hand-makes Shiba-motif apparel with silk-screen printing.<br />
          Each print is pressed with care, on fabrics chosen for everyday comfort.<br />
          <span class="copy-emphasis">One piece that feels like yours, for every day with your Shiba.</span>
        </p>
        <RouterLink to="/brand-story" class="btn">
          <span>Read our brand story</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BrandMessage',
  data() {
    return {
      brandImageUrl: new URL('../assets/images/IMG_6550.jpg', import.meta.url).href,
    }
  },
}
</script>

<style scoped lang="scss">
.brand {
  padding: 80px 24px;
  background: #fff;
}

.brand-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 64px;
}

.brand-visual {
  position: relative;
  width: 100%;
  min-width: 0;

  // Offset decorative frame behind the image
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: -10px;
    bottom: -10px;
    border: 1px solid rgba(45, 90, 78, 0.28);
    z-index: 0;
    pointer-events: none;
  }
}

.brand-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #f0f0f0;
  z-index: 1;
  box-shadow: 0 12px 40px rgba(26, 61, 54, 0.12);

  // Top-left corner bracket
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 16px;
    width: 44px;
    height: 44px;
    border-top: 1.5px solid rgba(255, 255, 255, 0.75);
    border-left: 1.5px solid rgba(255, 255, 255, 0.75);
    z-index: 2;
    pointer-events: none;
  }

  // Bottom-right corner bracket
  &::after {
    content: '';
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
    border-bottom: 1.5px solid rgba(255, 255, 255, 0.75);
    border-right: 1.5px solid rgba(255, 255, 255, 0.75);
    z-index: 2;
    pointer-events: none;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.04);
    filter: brightness(0.96) saturate(1.05);
    transition: transform 8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s ease;
  }

  &:hover img {
    transform: scale(1);
    filter: brightness(1.01) saturate(1.08);
  }
}

.visual-tag {
  position: absolute;
  right: -8px;
  bottom: 24px;
  z-index: 3;
  font-size: 0.65rem;
  letter-spacing: 0.38em;
  color: rgba(26, 61, 54, 0.4);
  font-weight: 400;
  writing-mode: vertical-rl;
}

.brand-content {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 0;
}

.label {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  color: var(--color-accent);
  font-weight: 600;
}

.ornament {
  width: 48px;
  height: 2px;
  margin-top: -8px;
  background: linear-gradient(90deg, #1a3d36, #2d5a4e 55%, #b89a6a);
  border-radius: 1px;
  opacity: 0.85;
}

.heading {
  font-size: clamp(1.3rem, 3vw, 1.85rem);
  font-weight: 300;
  color: #1a1a1a;
  line-height: 1.65;
  margin: 0;
  letter-spacing: 0.04em;
}

.heading-accent {
  font-weight: 700;
  background: linear-gradient(120deg, #1a3d36 0%, #2d5a4e 50%, #b89a6a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.copy {
  font-size: 0.9rem;
  color: #6a6a6a;
  line-height: 1.95;
  margin: 0;
  letter-spacing: 0.02em;
  font-weight: 400;
}

.copy-emphasis {
  display: inline-block;
  margin-top: 4px;
  color: #4a4a4a;
  font-weight: 500;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  margin-top: 8px;
  padding: 0 0 6px;
  border-bottom: 1px solid rgba(26, 26, 26, 0.35);
  color: #1a1a1a;
  text-decoration: none;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  font-weight: 400;
  transition: color 0.2s, border-color 0.2s, gap 0.2s;
}

.btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  gap: 16px;
}

@media (max-width: 768px) {
  .brand {
    padding: 48px 16px;
  }

  .brand-inner {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .brand-visual {
    &::before {
      display: none;
    }
  }

  .visual-tag {
    writing-mode: horizontal-tb;
    right: 12px;
    bottom: 12px;
    letter-spacing: 0.28em;
  }

  .brand-content {
    gap: 18px;
  }
}
</style>
