import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const promoCode = ref('')
  const discountRate = ref(0) // 0 to 1

  // const subtotal = computed(() => items.value.reduce((total, item) => total + (item.price * item.quantity), 0))
  const subtotal = computed(() =>
    items.value.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  )
  // Bundle item discount
  const bundleDiscount = computed(() => {
    let totalDiscount = 0
  
    Object.entries(groupedBundles.value).forEach(([bundleId, bundle]) => {
      const requiredCount = bundleRules[bundleId] || 0
  
      // ✅ FIX 1: Must have ALL unique items
      const uniqueItemsCount = bundle.items.length
  
      if (uniqueItemsCount < requiredCount) return
  
      // ✅ FIX 2: Calculate how many FULL bundles exist
      const quantities = bundle.items.map(i => i.quantity)
      const bundleCount = Math.min(...quantities)
  
      if (bundleCount <= 0) return
  
      // ✅ FIX 3: Compute only valid bundle sets
      const bundleSetTotal = bundle.items.reduce((sum, item) => {
        return sum + item.price
      }, 0)
  
      totalDiscount += bundleSetTotal * bundleCount * 0.15
    })
  
    return totalDiscount
  })

  const bundleDefinitions = {
    'starter-kit': {
      name: 'Fishing Starter Kit',
      items: [101, 105, 108, 114, 110],
      discount: 0.15
    }
  }


  const bundleRules = {
    'starter-kit': 5 //bundle.items.length // 5
  }

  

  // GROUP ITEMS BY BUNDLE
  const groupedBundles = computed(() => {
    const groups = {}

    items.value.forEach(item => {
      if (!item.bundleId) return

      if (!groups[item.bundleId]) {
        groups[item.bundleId] = {
          items: [],
          name: item.bundleName || 'Bundle'
        }
      }

      groups[item.bundleId].items.push(item)
    })

    return groups
  })

  const incompleteBundles = computed(() => {
    const result = []
  
    Object.entries(groupedBundles.value).forEach(([id, bundle]) => {
      const required = bundleRules[id] || 0
      const count = bundle.items.reduce((s, i) => s + i.quantity, 0)
  
      if (count < required) {
        result.push({
          id,
          missing: required - count
        })
      }
    })
  
    return result
  })

  const discountAmount = computed(() => subtotal.value * discountRate.value)
  // const total = computed(() => subtotal.value - discountAmount.value)
  const total = computed(() =>
    subtotal.value - bundleDiscount.value - discountAmount.value
  )
  const totalItemsCount = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))

  // function addItem(product, quantity = 1) {
  //   const existing = items.value.find(i => i.id === product.id)
  //   if (existing) {
  //     existing.quantity += quantity
  //   } else {
  //     items.value.push({ ...product, quantity })
  //   }
  // }

  function addItem(product, quantity = 1) {
    const existing = items.value.find(i => i.id === product.id)
  
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        ...product,
        quantity
      })
    }
  
    reevaluateBundles() // ✅ KEY
  }

  function isBundleComplete(bundleId) {
    const bundle = groupedBundles.value[bundleId]
    if (!bundle) return false
  
    const required = bundleRules[bundleId] || 0
  
    // Must have ALL unique items
    if (bundle.items.length < required) return false
  
    // Each item must have at least qty 1
    return bundle.items.every(i => i.quantity > 0)
  }

  function removeBundleTag(bundleId) {
    items.value = items.value.map(item => {
      if (item.bundleId === bundleId) {
        return {
          ...item,
          bundleId: null,
          bundleName: null,
          isBundleItem: false
        }
      }
      return item
    })
  }

  function reevaluateBundles() {
    Object.keys(bundleDefinitions).forEach(bundleId => {
      const bundle = detectBundle(bundleId)
  
      if (bundle) {
        applyBundleTags(bundleId)
      } else {
        removeBundleTag(bundleId)
      }
    })
  }

  function restoreBundleTag(bundleId) {
    items.value = items.value.map(item => {
      // Only restore items that belong to this bundle (based on ID list)
      // const bundleProductIds = [101, 201, 202, 203, 204]
  
      if (bundleProductIds.includes(item.id)) {
        return {
          ...item,
          bundleId: bundleId,
          bundleName: 'Fishing Starter Kit',
          isBundleItem: true
        }
      }
  
      return item
    })
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  
    reevaluateBundles() // ✅ KEY
  }

  function detectBundle(bundleId) {
    const def = bundleDefinitions[bundleId]
  
    const matchedItems = items.value.filter(i =>
      def.items.includes(i.id)
    )
  
    if (matchedItems.length < def.items.length) return null
  
    const quantities = matchedItems.map(i => i.quantity)
    const bundleCount = Math.min(...quantities)
  
    if (bundleCount <= 0) return null
  
    return {
      items: matchedItems,
      count: bundleCount
    }
  }

  function applyBundleTags(bundleId) {
    const def = bundleDefinitions[bundleId]
    const bundle = detectBundle(bundleId)
  
    if (!bundle) return
  
    items.value = items.value.map(item => {
      if (def.items.includes(item.id)) {
        return {
          ...item,
          bundleId,
          bundleName: def.name,
          isBundleItem: true
        }
      }
      return item
    })
  }


  function updateQuantity(productId, quantity) {
    const existing = items.value.find(i => i.id === productId)
  
    if (existing) {
      existing.quantity = Math.max(1, quantity)
    }
  
    reevaluateBundles() // ✅ KEY
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
    // removePromo()
  }
  function resetCart() {
    items.value = []
    removePromo()
  }

  // return { 
  //   items, subtotal, discountAmount, total, totalItemsCount, promoCode, discountRate,
  //   addItem, removeItem, updateQuantity, applyPromo, removePromo, clearCart 
  // }
  return {
    items,
    subtotal,
    total,
    discountAmount,
    bundleDiscount,
    totalItemsCount,
    promoCode,
    discountRate,
    groupedBundles,
    addItem,
    removeItem,
    updateQuantity,
    applyPromo,
    removePromo,
    clearCart
  }
})
