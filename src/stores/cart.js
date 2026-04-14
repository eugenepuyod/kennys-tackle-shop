/**
 * Cart Store (Pinia)
 * --------------------------------------------------
 *
 * Structure:
 * 1. State
 * 2. Bundle Configuration
 * 3. Getters (Computed)
 * 4. Bundle Helpers
 * 5. Cart Actions
 * 6. Promo Actions
 */

 import { defineStore } from 'pinia'
 import { ref, computed } from 'vue'
 
 export const useCartStore = defineStore('cart', () => {
 
   /* =========================
    * 1. STATE
    * ========================= */
   const items = ref([])
   const promoCode = ref('')
   const discountRate = ref(0) // 0 → 1
 
 
   /* =========================
    * 2. BUNDLE CONFIGURATION
    * ========================= */
   const bundleDefinitions = {
     'starter-kit': {
       name: 'Fishing Starter Kit',
       items: [101, 105, 108, 114, 110],
       discount: 0.15
     },
     'jigging-kit': {
      name: 'Pro Jigging Bundle',
      items: [102, 115], // match your product IDs
      discount: 0.20 // 20% discount
    }
   }
 
   const bundleRules = {
     'starter-kit': 5,
     'jigging-kit': 2,

   }
 
 
   /* =========================
    * 3. GETTERS (COMPUTED)
    * ========================= */
 
   // Subtotal
   const subtotal = computed(() =>
     items.value.reduce((total, item) => {
       return total + item.price * item.quantity
     }, 0)
   )
 
   // Group items by bundleId
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
 
   // Bundle discount
   const bundleDiscount = computed(() => {
    let totalDiscount = 0
  
    Object.entries(groupedBundles.value).forEach(([bundleId, bundle]) => {
      const requiredCount = bundleRules[bundleId] || 0
      const discountRate = bundleDefinitions[bundleId]?.discount || 0
  
      if (bundle.items.length < requiredCount) return
  
      const quantities = bundle.items.map(i => i.quantity)
      const bundleCount = Math.min(...quantities)
  
      if (bundleCount <= 0) return
  
      const bundleSetTotal = bundle.items.reduce((sum, item) => {
        return sum + item.price
      }, 0)
  
      totalDiscount += bundleSetTotal * bundleCount * discountRate
    })
  
    return totalDiscount
  })
 
   // Promo discount
   const discountAmount = computed(() =>
     subtotal.value * discountRate.value
   )
 
   // Final total
   const total = computed(() =>
     subtotal.value - bundleDiscount.value - discountAmount.value
   )
 
   // Total item count
   const totalItemsCount = computed(() =>
     items.value.reduce((acc, item) => acc + item.quantity, 0)
   )
 
   // Incomplete bundles (for UI hints)
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
 
 
   /* =========================
    * 4. BUNDLE HELPERS
    * ========================= */
 
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
 
   function isBundleComplete(bundleId) {
     const bundle = groupedBundles.value[bundleId]
     if (!bundle) return false
 
     const required = bundleRules[bundleId] || 0
 
     if (bundle.items.length < required) return false
 
     return bundle.items.every(i => i.quantity > 0)
   }
 
 
   /* =========================
    * 5. CART ACTIONS
    * ========================= */
 
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
 
     reevaluateBundles()
   }
 
   function removeItem(productId) {
     items.value = items.value.filter(i => i.id !== productId)
     reevaluateBundles()
   }
 
   function updateQuantity(productId, quantity) {
     const existing = items.value.find(i => i.id === productId)
 
     if (existing) {
       existing.quantity = Math.max(1, quantity)
     }
 
     reevaluateBundles()
   }
 
   function clearCart() {
     items.value = []
   }
 
   function resetCart() {
     items.value = []
     removePromo()
   }
 
 
   /* =========================
    * 6. PROMO ACTIONS
    * ========================= */
 
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
 
 
   /* =========================
    * EXPORT
    * ========================= */
   return {
     // state
     items,
     promoCode,
     discountRate,
 
     // getters
     subtotal,
     total,
     discountAmount,
     bundleDiscount,
     totalItemsCount,
     groupedBundles,
 
     // actions
     addItem,
     removeItem,
     updateQuantity,
     clearCart,
     resetCart,
 
     // promo
     applyPromo,
     removePromo
   }
 })