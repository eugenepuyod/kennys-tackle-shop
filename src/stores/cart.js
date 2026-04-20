import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const bundleCatalogs = [
  { id: 'catalog11', title: 'Jigging Pro Setup 9', items: [101, 302, 1039, 1021, 502, 503, 501, 1002, 501], discountRate: 0.70, label: 'Jigging Pro Setup 9' },
  { id: 'catalog10', title: 'Jigging Pro Setup 8', items: [101, 302, 1039, 1021, 502, 503, 501, 1002], discountRate: 0.65, label: 'Jigging Pro Setup 8' },
  { id: 'catalog9', title: 'Jigging Pro Setup 7', items: [101, 302, 1039, 1021, 502, 503, 501], discountRate: 0.60, label: 'Jigging Pro Setup 7' },
  { id: 'catalog8', title: 'Jigging Pro Setup 6', items: [101, 302, 1039, 1021, 502, 503], discountRate: 0.55, label: 'Jigging Pro Setup 6' },
  { id: 'catalog7', title: 'Jigging Pro Setup 5', items: [101, 302, 1039, 1021, 502, 502, 502], discountRate: 0.50, label: 'Jigging Pro Setup 5' },
  { id: 'catalog6', title: 'Jigging Pro Setup 4', items: [101, 302, 1039, 1021, 502, 502], discountRate: 0.45, label: 'Jigging Pro Setup 4' },
  { id: 'catalog5', title: 'Jigging Pro Setup 3', items: [101, 302, 1039, 1021, 502], discountRate: 0.40, label: 'Jigging Pro Setup 3' },
  { id: 'catalog4', title: 'Jigging Pro Setup 2', items: [101, 302, 1039, 1021], discountRate: 0.35, label: 'Jigging Pro Setup 2' },
  { id: 'catalog3', title: 'Pro Jigging Setup 1', items: [101, 302, 1039], discountRate: 0.30, label: 'Pro Jigging Setup 1' },
  { id: 'catalog1', title: 'Fishing Starter Kit', items: [101, 102, 104, 201, 202], discountRate: 0.10, label: 'Fishing Starter Kit' },
  { id: 'catalog2', title: 'Pro Jigging Bundle', items: [101, 302], discountRate: 0.20, label: 'Pro Jigging Bundle' },
  { id: 'timed1', title: 'Rapala Surf Bundle', items: [1008, 1000, 1045, 1061], discountRate: 0.05, label: 'Rapala Surf Bundle', expiresAt: Date.now() + 86400000 },
  { id: 'timed2', title: 'Daiwa Surf Bundle', items: [1044, 1063, 1082, 1051], discountRate: 0.06, label: 'Daiwa Surf Bundle', expiresAt: Date.now() + 1800000 },
  { id: 'timed3', title: 'Abu Garcia Inshore Bundle', items: [1067, 1040, 1082, 1042], discountRate: 0.10, label: 'Abu Garcia Inshore Bundle', expiresAt: Date.now()  + 1200000 },
  { id: 'timed4', title: 'Ugly Stik Bundle', items: [1069, 1003, 1082, 1089], discountRate: 0.05, label: 'Ugly Stik Bundle', expiresAt: Date.now()  + 80000 }, // 1776530680195 date:4/19 time:12am
  { id: 'timed5', title: 'Ugly Stik Small Bundle', items: [1069, 1006], discountRate: 0.02, label: 'New Ugly Stik Bundle', expiresAt: Date.now()  + 86400000 },
]

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const productRegistry = ref({})
  const productCounts = ref({})
  const promoCode = ref('')
  const discountRate = ref(0) // 0 to 1

  watch(productCounts, () => {
    let tempCounts = { ...productCounts.value }
    let newItems = []
    let instanceCounter = 0
    
    // 1. Detect and form bundles automatically
    for (const catalog of bundleCatalogs) {
      if (catalog.expiresAt && Date.now() >= catalog.expiresAt) continue;
      
      const requiredCounts = {}
      catalog.items.forEach(id => {
         requiredCounts[id] = (requiredCounts[id] || 0) + 1
      })
      
      while (true) {
        let hasAll = Object.entries(requiredCounts).every(([reqId, reqFreq]) => (tempCounts[reqId] || 0) >= reqFreq)
        if (!hasAll) break;
        
        instanceCounter++
        catalog.items.forEach(reqId => {
          tempCounts[reqId]--
          newItems.push({
            ...productRegistry.value[reqId],
            quantity: 1,
            cartItemId: `bundle-${catalog.id}-${instanceCounter}-${reqId}-${tempCounts[reqId]}`,
            tag: 'Bundled Item',
            bundleLabel: catalog.title,
            bundleId: catalog.id
          })
        })
      }
    }
    
    // 2. Leftovers become individual items
    for (const [pidStr, count] of Object.entries(tempCounts)) {
      const pid = Number(pidStr)
      if (count > 0) {
        newItems.push({
          ...productRegistry.value[pid],
          quantity: count,
          cartItemId: `individual-${pid}`,
          tag: 'Individual',
          bundleLabel: null,
          bundleId: null
        })
      }
    }
    
    items.value = newItems
  }, { deep: true })

  const activeBundleDiscounts = computed(() => {
    const discounts = []
    const instanceMap = {}
    
    items.value.forEach(it => {
      if (it.tag === 'Bundled Item') {
        const parts = it.cartItemId.split('-')
        const catId = parts[1]
        const instId = parts[2]
        const key = `${catId}-${instId}`
        if (!instanceMap[key]) instanceMap[key] = { catalogId: catId, totalValue: 0 }
        instanceMap[key].totalValue += (it.price * it.quantity)
      }
    })
    
    Object.values(instanceMap).forEach(inst => {
      const catalog = bundleCatalogs.find(c => c.id === inst.catalogId)
      if (catalog) {
        discounts.push({
          label: `${catalog.label}: ${catalog.items.length} items`,
          amount: inst.totalValue * catalog.discountRate
        })
      }
    })
    return discounts
  })

  const subtotal = computed(() => items.value.reduce((total, item) => total + (item.price * item.quantity), 0))
  const displayDiscountAmount = computed(() => {
    let promoDiscount = subtotal.value * discountRate.value
    let bundleDiscount = activeBundleDiscounts.value.reduce((sum, d) => sum + d.amount, 0)
    return promoDiscount + bundleDiscount
  })
  const total = computed(() => subtotal.value - displayDiscountAmount.value)
  const totalItemsCount = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))

  function addBundle(catalogId, products) {
    products.forEach(p => {
      if (!productRegistry.value[p.id]) productRegistry.value[p.id] = { ...p }
      productCounts.value[p.id] = (productCounts.value[p.id] || 0) + 1
    })
  }

  function addItem(product, quantity = 1) {
    if (!productRegistry.value[product.id]) productRegistry.value[product.id] = { ...product }
    productCounts.value[product.id] = (productCounts.value[product.id] || 0) + quantity
  }

  function removeItem(cartItemId) {
    const item = items.value.find(i => i.cartItemId === cartItemId)
    if (!item) return
    productCounts.value[item.id] = Math.max(0, (productCounts.value[item.id] || 0) - item.quantity)
  }

  function updateQuantity(cartItemId, quantity) {
    const item = items.value.find(i => i.cartItemId === cartItemId)
    if (!item) return
    if (quantity <= 0) {
      removeItem(cartItemId)
      return
    }
    
    if (item.tag === 'Individual') {
      const diff = quantity - item.quantity
      productCounts.value[item.id] = Math.max(0, (productCounts.value[item.id] || 0) + diff)
    } else if (item.tag === 'Bundled Item') {
      const diff = quantity - item.quantity
      if (diff > 0) {
        // Adding quantity to a bundled item dynamically routes those extras into Individual overflow
        productCounts.value[item.id] = (productCounts.value[item.id] || 0) + diff
      }
    }
  }

  function applyPromo(code) {
    const validCodes = {
      'KENNYS10': 0.10,
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
    productCounts.value = {}
    productRegistry.value = {}
    removePromo()
  }

  return { 
    items, subtotal, discountAmount: displayDiscountAmount, total, totalItemsCount, promoCode, discountRate, activeBundleDiscounts,
    addItem, addBundle, removeItem, updateQuantity, applyPromo, removePromo, clearCart 
  }
})
