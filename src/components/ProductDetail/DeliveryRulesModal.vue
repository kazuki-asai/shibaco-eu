<template>
  <dialog
    ref="dialog"
    class="delivery-modal"
    aria-labelledby="delivery-modal-title"
    @cancel.prevent="close"
    @click="handleBackdropClick"
    @close="emit('update:modelValue', false)"
  >
    <div class="delivery-modal__content">
      <button
        class="delivery-modal__close"
        type="button"
        aria-label="Close"
        @click="close"
      >
        ×
      </button>
      <h2 id="delivery-modal-title">Delivery timeframe</h2>
      <p>
        Because each piece is made to order, delivery usually takes
        <strong>7–10 business days</strong>
        after your order is confirmed.
      </p>
      <button class="delivery-modal__button" type="button" @click="close">
        Close
      </button>
    </div>
  </dialog>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])
const dialog = ref(null)

const close = () => {
  dialog.value?.close()
}

const handleBackdropClick = (event) => {
  if (event.target === dialog.value) close()
}

const syncDialog = async (isOpen) => {
  await nextTick()
  if (!dialog.value) return

  if (isOpen && !dialog.value.open) {
    dialog.value.showModal()
  } else if (!isOpen && dialog.value.open) {
    dialog.value.close()
  }
}

watch(() => props.modelValue, syncDialog)
onMounted(() => syncDialog(props.modelValue))
</script>

<style scoped>
.delivery-modal {
  width: min(90vw, 480px);
  padding: 0;
  border: 0;
  border-radius: 2px;
  color: #1a1a1a;
  box-shadow: 0 20px 60px rgb(0 0 0 / 25%);
}

.delivery-modal::backdrop {
  background: rgb(0 0 0 / 50%);
}

.delivery-modal__content {
  position: relative;
  padding: 40px 36px 32px;
}

.delivery-modal__content h2 {
  margin: 0 0 20px;
  font-size: 1.15rem;
  line-height: 1.5;
}

.delivery-modal__content p {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.9;
}

.delivery-modal__close {
  position: absolute;
  top: 12px;
  right: 14px;
  padding: 4px 8px;
  border: 0;
  background: transparent;
  color: #555;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
}

.delivery-modal__button {
  display: block;
  width: 100%;
  margin-top: 28px;
  padding: 11px;
  border: 1px solid #1a1a1a;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
}

@media (max-width: 576px) {
  .delivery-modal__content {
    padding: 36px 24px 28px;
  }
}
</style>
