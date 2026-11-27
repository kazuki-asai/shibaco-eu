<template>
  <div class="product-info">
    <span v-if="product.tag" class="product-tag">{{ product.tag }}</span>
    <h1 class="product-name">{{ product.name }}</h1>
    <p class="product-price">{{ $money(product.price) }}</p>
    <DutyNotice />

    <div v-if="product.colors && product.colors.length" class="option-group">
      <p class="option-label">Colour: <span class="option-selected">{{ selectedColor ? selectedColor.name : '' }}</span></p>
      <div class="radio-group" role="radiogroup" aria-label="Colour">
        <label v-for="color in product.colors" :key="color.id" class="color-radio">
          <input type="radio" :value="color.id" v-model="selectedColorId" :aria-label="color.name" />
          <span
            class="color-swatch"
            :style="{ background: color.hex_code }"
            :class="{ selected: selectedColorId === color.id, 'light-color': isLight(color.hex_code) }"
            :title="color.name"
          ></span>
        </label>
      </div>
    </div>

    <div v-if="product.print_colors && product.print_colors.length" class="option-group">
      <p class="option-label">
        Print colour: <span class="option-selected">{{ selectedPrintColor ? selectedPrintColor.name : '' }}</span>
        <span class="tooltip-wrapper">
          <span class="tooltip-icon" tabindex="0" aria-describedby="print-colour-tip">?</span>
          <span id="print-colour-tip" class="tooltip-text" role="tooltip">The ink colour used for the print. This is separate from the garment colour.</span>
        </span>
      </p>
      <div class="radio-group" role="radiogroup" aria-label="Print colour">
        <label v-for="color in product.print_colors" :key="color.id" class="color-radio">
          <input type="radio" :value="color.id" v-model="selectedPrintColorId" :aria-label="color.name" />
          <span
            class="color-swatch"
            :style="{ background: color.hex_code }"
            :class="{ selected: selectedPrintColorId === color.id, 'light-color': isLight(color.hex_code) }"
            :title="color.name"
          ></span>
        </label>
      </div>
    </div>

    <div v-if="product.sizes && product.sizes.length" class="option-group">
      <p class="option-label">Size</p>
      <div class="radio-group">
        <label v-for="size in product.sizes" :key="size.id" class="size-radio">
          <input type="radio" :value="size.id" v-model="selectedSizeId" hidden />
          <span class="size-chip" :class="{ selected: selectedSizeId === size.id }">{{ size.name }}</span>
        </label>
      </div>
    </div>

    <button class="add-to-cart-btn option-group" @click="addToCart">Add to cart</button>

    <button
      class="delivery-rules-link"
      type="button"
      @click="isDeliveryModalOpen = true"
    >
      Delivery timeframe
    </button>
    <hr />
    <p class="option-label"><b>Description</b></p>
    <p v-if="product.description" class="product-description option-group">{{ product.description }}</p>

    <hr />

    <div v-if="product.detail" class="option-group detail-section">
      <p class="option-label"><b>Details</b></p>
      <p class="product-description">{{ product.detail }}</p>
    </div>

    <DeliveryRulesModal v-model="isDeliveryModalOpen" />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import DeliveryRulesModal from './DeliveryRulesModal.vue'
import DutyNotice from '@/components/DutyNotice.vue'

export default {
  components: { DeliveryRulesModal, DutyNotice },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ['add-to-cart'],
  setup(props, { emit }) {
    const selectedColorId = ref(null)
    const selectedSizeId = ref(null)
    const selectedPrintColorId = ref(null)
    const isDeliveryModalOpen = ref(false)

    const selectedColor = computed(() =>
      props.product?.colors?.find(c => c.id === selectedColorId.value) ?? null
    )

    const selectedPrintColor = computed(() =>
      props.product?.print_colors?.find(c => c.id === selectedPrintColorId.value) ?? null
    )

    watch(() => props.product?.id, () => {
      selectedColorId.value = null
      selectedSizeId.value = null
      selectedPrintColorId.value = null
    })

    const isLight = (hex) => {
      if (!hex || !/^#[0-9a-fA-F]{6}$/.test(hex)) return false
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return (r * 299 + g * 587 + b * 114) / 1000 > 200
    }

    const addToCart = () => {
      if (props.product.colors?.length && !selectedColorId.value) {
        alert('Please select a colour')
        return
      }
      if (props.product.sizes?.length && !selectedSizeId.value) {
        alert('Please select a size')
        return
      }
      if (props.product.print_colors?.length && !selectedPrintColorId.value) {
        alert('Please select a print colour')
        return
      }
      emit('add-to-cart', {
        product: props.product,
        colorId: selectedColorId.value,
        sizeId: selectedSizeId.value,
        printColorId: selectedPrintColorId.value,
      })
    }

    return {
      selectedColorId,
      selectedSizeId,
      selectedColor,
      selectedPrintColorId,
      selectedPrintColor,
      isDeliveryModalOpen,
      isLight,
      addToCart,
    }
  },
}
</script>

<style scoped>
.product-tag {
  display: inline-block;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  padding: 3px 8px;
  margin-bottom: 16px;
}

.product-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px;
}

.product-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 24px;
}

.product-description {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.8;
  white-space: pre-wrap;
}

.option-group {
  margin-bottom: 20px;
}

.option-label {
  font-size: 0.85rem;
  color: #555;
  margin: 0 0 10px;
}

.delivery-rules-link {
  display: block;
  margin: 18px 0 14px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #555;
  background: transparent;
  color: #555;
  font-size: 1rem;
  cursor: pointer;
}

.delivery-rules-link:hover {
  color: #1a1a1a;
  border-bottom-color: #1a1a1a;
}

.option-selected {
  font-weight: 600;
  color: #1a1a1a;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-radio {
  position: relative;
}

.color-radio input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.color-swatch {
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
  transition: border-color 0.15s;
}

.color-swatch.selected {
  border-color: #1a1a1a;
  box-shadow: 0 0 0 2px #fff inset;
}

.color-swatch.light-color {
  border-color: #bbb;
}

.size-chip {
  display: block;
  padding: 6px 16px;
  border: 1px solid #ccc;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.size-chip.selected {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}

.add-to-cart-btn {
  display: block;
  width: 100%;
  padding: 14px;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.add-to-cart-btn:hover {
  background: #444;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
  margin-left: 6px;
  vertical-align: middle;
}

.tooltip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #999;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: default;
  line-height: 1;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  font-size: 0.75rem;
  line-height: 1.4;
  padding: 6px 10px;
  border-radius: 4px;
  width: max-content;
  max-width: 220px;
  white-space: normal;
  transition: opacity 0.2s;
  pointer-events: none;
  z-index: 10;
}

.tooltip-wrapper:hover .tooltip-text,
.tooltip-wrapper:focus-within .tooltip-text {
  visibility: visible;
  opacity: 1;
}

</style>
