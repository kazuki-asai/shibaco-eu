import { ref } from 'vue'

const STORAGE_KEY = 'shibaco_cart'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const cart = ref(load())

const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.value))
}

export const useCart = () => {
  const addToCart = ({ product, colorId, sizeId, printColorId }) => {
    const hasColors = product.colors?.length > 0
    const hasSizes = product.sizes?.length > 0
    const hasPrintColors = product.print_colors?.length > 0

    if (hasColors && !colorId) {
      throw new Error('Please select a colour')
    }
    if (hasPrintColors && !printColorId) {
      throw new Error('Please select a print colour')
    }
    if (hasSizes && !sizeId) {
      throw new Error('Please select a size')
    }

    const normalizedPrintColorId = printColorId ?? null
    const existing = cart.value.find(
      (item) =>
        item.productId === product.id &&
        item.colorId === (colorId ?? null) &&
        item.sizeId === (sizeId ?? null) &&
        (item.printColorId ?? null) === normalizedPrintColorId,
    )
    if (existing) {
      existing.quantity += 1
    } else {
      const colorName = product.colors?.find((c) => c.id === colorId)?.name ?? null
      const sizeName = product.sizes?.find((s) => s.id === sizeId)?.name ?? null
      const printColorName =
        product.print_colors?.find((c) => c.id === printColorId)?.name ?? null
      const rawKind = product.shipping_kind ?? product.shippingKind
      const shipping_kind =
        rawKind != null && rawKind !== '' ? String(rawKind).trim() : ''
      cart.value.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] ?? null,
        colorId: colorId ?? null,
        colorName,
        printColorId: normalizedPrintColorId,
        printColorName,
        sizeId: sizeId ?? null,
        sizeName,
        quantity: 1,
        shipping_kind,
      })
    }
    save()
  }

  const removeFromCart = (index) => {
    cart.value.splice(index, 1)
    save()
  }

  const updateQuantity = (index, quantity) => {
    cart.value[index].quantity = quantity
    save()
  }

  const clearCart = () => {
    cart.value = []
    save()
  }

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart }
}
