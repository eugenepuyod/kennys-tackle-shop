import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const promoCode = ref('')
  const discountRate = ref(0) // 0 to 1

  const subtotal = computed(() => items.value.reduce((total, item) => total + (item.price * item.quantity), 0))
  const discountAmount = computed(() => subtotal.value * discountRate.value)
  const total = computed(() => subtotal.value - discountAmount.value)
  const totalItemsCount = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))

  function addItem(product, quantity = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...product, quantity })
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function updateQuantity(productId, quantity) {
    const existing = items.value.find(i => i.id === productId)
    if (existing) {
      existing.quantity = Math.max(1, quantity)
    }
  }

  function applyPromo(code) {
    const validCodes = {
      'KENNY10': 0.10,
      'FISH20': 0.20
    }
    const codeUpper = code.toUpperCase()
    if (validCodes[codeUpper]) {
      discountRate.value = validCodes[codeUpper]
      promoCode.value = codeUpper
      return true
    }
    return false
  }

  function removePromo() {
    discountRate.value = 0
    promoCode.value = ''
  }

  function clearCart() {
    items.value = []
    removePromo()
  }

  return { 
    items, subtotal, discountAmount, total, totalItemsCount, promoCode, discountRate,
    addItem, removeItem, updateQuantity, applyPromo, removePromo, clearCart 
  }
})
