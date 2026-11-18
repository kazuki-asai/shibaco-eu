<template>
  <section class="video-showcase" aria-label="Lifestyle videos">
    <div class="slides">
      <div
        v-for="(clip, i) in clips"
        :key="clip.id"
        class="slide"
        :class="{ active: i === current }"
      >
        <video
          :ref="(el) => setVideoRef(el, i)"
          :src="clip.src"
          muted
          playsinline
          loop
          preload="metadata"
          :aria-hidden="i !== current"
        />
        <div class="slide-overlay">
          <div class="slide-copy">
            <span v-if="clip.label" class="slide-label">{{ clip.label }}</span>
            <h2 class="slide-title">{{ clip.title }}</h2>
            <p v-if="clip.subtitle" class="slide-subtitle">{{ clip.subtitle }}</p>
            <RouterLink :to="clip.link" class="slide-cta">
              <span>{{ clip.cta }}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="counter">
      <span class="counter-current">{{ String(current + 1).padStart(2, '0') }}</span>
      <span class="counter-sep"></span>
      <span class="counter-total">{{ String(clips.length).padStart(2, '0') }}</span>
    </div>

    <div class="arrows">
      <button class="arrow" type="button" @click="prev" aria-label="Previous video">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button class="arrow" type="button" @click="next" aria-label="Next video">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>

    <div class="dots">
      <button
        v-for="(_, i) in clips"
        :key="i"
        type="button"
        class="dot"
        :class="{ active: i === current }"
        :aria-label="`Video ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<script>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  setup() {
    const clips = [
      {
        id: 1,
        src: new URL('../assets/mp4/lifestyle-01.mp4', import.meta.url).href,
        label: 'LIFESTYLE',
        title: 'Everyday with shibaco',
        subtitle: 'For the everyday moments that make up a city walk.',
        cta: 'Shop now',
        link: '/products',
      },
      {
        id: 2,
        src: new URL('../assets/mp4/lifestyle-02.mp4', import.meta.url).href,
        label: 'CARRY',
        title: 'Carry it through the city',
        subtitle: 'Understated design that settles into daily life.',
        cta: 'Shop now',
        link: '/products',
      },
      {
        id: 3,
        src: new URL('../assets/mp4/lifestyle-03.mp4', import.meta.url).href,
        label: 'MOMENT',
        title: 'Quiet moments, soft details',
        subtitle: 'Soft forms that let every detail stand out.',
        cta: 'Shop now',
        link: '/products',
      },
    ]

    const current = ref(0)
    const videoRefs = ref([])
    let timer = null
    const INTERVAL_MS = 6000

    const setVideoRef = (el, i) => {
      if (el) videoRefs.value[i] = el
    }

    const playActive = async () => {
      await nextTick()
      videoRefs.value.forEach((video, i) => {
        if (!video) return
        if (i === current.value) {
          video.currentTime = 0
          const playPromise = video.play()
          if (playPromise?.catch) playPromise.catch(() => {})
        } else {
          video.pause()
        }
      })
    }

    const advance = () => {
      current.value = (current.value + 1) % clips.length
    }

    const restartTimer = () => {
      clearInterval(timer)
      timer = setInterval(advance, INTERVAL_MS)
    }

    const next = () => {
      advance()
      restartTimer()
    }

    const prev = () => {
      current.value = (current.value - 1 + clips.length) % clips.length
      restartTimer()
    }

    const goTo = (i) => {
      current.value = i
      restartTimer()
    }

    watch(current, () => {
      playActive()
    })

    onMounted(() => {
      playActive()
      restartTimer()
    })

    onUnmounted(() => {
      clearInterval(timer)
    })

    return { clips, current, setVideoRef, next, prev, goTo }
  },
}
</script>

<style scoped lang="scss">
.video-showcase {
  position: relative;
  width: 100%;
  height: 620px;
  background: #0a0a0a;
  overflow: hidden;
}

.slides {
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
}

.slide video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 70%;
  display: block;
  transform: scale(1.04);
  transition: transform 7s ease;
}

.slide.active video {
  transform: scale(1);
}

.slide-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 0 7vw 12vh;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.68) 0%,
    rgba(0, 0, 0, 0.22) 42%,
    rgba(0, 0, 0, 0.08) 100%
  );
}

.slide-copy {
  max-width: 520px;
}

.slide-label {
  display: inline-block;
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 14px;
  font-weight: 500;
}

.slide-title {
  margin: 0 0 14px;
  font-size: clamp(1.35rem, 3.2vw, 2.15rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.25;
  color: #fff;
}

.slide-subtitle {
  margin: 0 0 28px;
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  font-weight: 300;
  letter-spacing: 0.06em;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.78);
}

.slide-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 0 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  font-weight: 400;
  transition: color 0.2s, border-color 0.2s, gap 0.2s;
}

.slide-cta:hover {
  color: #fff;
  border-color: #fff;
  gap: 16px;
}

.counter {
  position: absolute;
  right: 7vw;
  bottom: 12vh;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  font-weight: 300;
}

.counter-current {
  color: #fff;
  font-weight: 400;
}

.counter-sep {
  display: block;
  width: 24px;
  height: 1px;
  background: rgba(255, 255, 255, 0.35);
}

.arrows {
  position: absolute;
  right: 7vw;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 10;
}

.arrow {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.7);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.arrow:hover {
  border-color: rgba(255, 255, 255, 0.85);
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.dots {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: background 0.25s, transform 0.25s;
}

.dot.active {
  background: #fff;
  transform: scale(1.15);
}

@media (max-width: 768px) {
  .video-showcase {
    height: 480px;
  }

  .slide-overlay {
    padding: 0 6vw 10vh;
  }

  .slide-title {
    font-size: clamp(1.15rem, 5.5vw, 1.55rem);
  }

  .slide-subtitle {
    margin-bottom: 22px;
  }

  .arrows {
    display: none;
  }

  .counter {
    right: 6vw;
    bottom: 10vh;
  }

  .dots {
    bottom: 18px;
  }
}
</style>
