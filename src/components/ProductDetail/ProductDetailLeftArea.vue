<template>
  <div class="product-images">
    <template v-if="product.images.length > 1">
      <div class="carousel">
        <button class="carousel-btn prev" @click="prev" :disabled="currentIndex === 0">&#8249;</button>
        <img :src="product.images[currentIndex]" :alt="product.name" class="main-image" />
        <button class="carousel-btn next" @click="next" :disabled="currentIndex === product.images.length - 1">&#8250;</button>
      </div>
      <div class="thumbnails">
        <img
          v-for="(img, i) in product.images"
          :key="i"
          :src="img"
          :alt="`${product.name} ${i + 1}`"
          class="thumbnail"
          :class="{ active: i === currentIndex }"
          @click="currentIndex = i"
        />
      </div>
    </template>
    <img v-else :src="product.images[0]" :alt="product.name" class="main-image" />
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  watch: {
    product() {
      this.currentIndex = 0
    },
  },
  methods: {
    prev() {
      if (this.currentIndex > 0) this.currentIndex--
    },
    next() {
      if (this.currentIndex < this.product.images.length - 1) this.currentIndex++
    },
  },
}
</script>

<style scoped>
.main-image {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.carousel {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel .main-image {
  flex: 1;
}

.carousel-btn {
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  line-height: 1;
}

.carousel-btn:disabled {
  opacity: 0.2;
  cursor: default;
}

.carousel-btn.prev {
  left: 0;
}

.carousel-btn.next {
  right: 0;
}

.thumbnails {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  overflow-x: auto;
}

.thumbnail {
  width: 60px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  border: 2px solid transparent;
}

.thumbnail.active {
  opacity: 1;
  border-color: #333;
}
</style>
