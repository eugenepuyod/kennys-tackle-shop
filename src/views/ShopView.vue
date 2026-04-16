<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Grid, List, Search, SlidersHorizontal, Star, StarHalf, ArrowRight, X, Heart, ShoppingBag, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useCartStore } from '../stores/cart'
import { products } from  '../data/products'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()



// State
const viewMode = ref('grid') // 'grid' or 'list'
const selectedCategory = ref(route.query.category || 'All')
const maxPrice = ref(2000)
const selectedTags = ref([])
const searchQuery = ref(route.query.search || '')
const currentPage = ref(1)
const itemsPerPage = 6
const isSidebarOpen = ref(false)

// Quick View State
const quickViewProduct = ref(null)
const quickViewQty = ref(1)

// Options
// const categories = ['All', 'Reels', 'Rods', 'Combo Setup', 'Jigging', 'Jigs', 'Lines', 'Mono', 'Lures', 'Hooks', 'Accessories']
const categories = ['All', ...new Set(products.map(p => p.category))]
const allTags = [...new Set(products.flatMap(p => p.tags))]

// Filter logic
const filteredProducts = computed(() => {
  return products.filter(p => {
    const brand = p.name.split(' ')[0].toUpperCase()

    const matchCategory = selectedCategory.value === 'All' || p.category === selectedCategory.value
    const matchPrice = p.price <= maxPrice.value
    const matchTags = selectedTags.value.length === 0 || selectedTags.value.some(t => p.tags.includes(t))
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || p.shortDesc.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchBrand = selectedBrand.value === 'All' || brand === selectedBrand.value

    return matchCategory && matchPrice && matchTags && matchSearch && matchBrand
  })
})

// Filter brands
const selectedBrand = ref('All')
const allBrands = [...new Set(products.map(p => p.name.split(' ')[0].toUpperCase()))]

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  // window.scrollTo({ top: 0, behavior: 'smooth' })
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

watch(
  () => route.query,
  (query) => {
    selectedCategory.value = query.category || 'All'
    searchQuery.value = query.search || ''

    // 👇 handle multiple tags
    if (query.tag) {
      selectedTags.value = query.tag.split(',') // convert string → array
    } else {
      selectedTags.value = []
    }
  },
  { immediate: true }
)

// Reset pagination when filters change
watch([selectedCategory, maxPrice, selectedTags, searchQuery, selectedBrand], () => {
  currentPage.value = 1
})

const toggleTag = (tag) => {
  const idx = selectedTags.value.indexOf(tag)
  if (idx > -1) {
    selectedTags.value.splice(idx, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const openQuickView = (product) => {
  quickViewProduct.value = product
  quickViewQty.value = 1
}

const closeQuickView = () => {
  quickViewProduct.value = null
}

const addToCart = () => {
  cartStore.addItem(quickViewProduct.value, quickViewQty.value)
  closeQuickView()
}
</script>

<template>
  <div class="shop-page bg-gray-50 min-h-screen pb-20 relative pt-30">
    <!-- Header -->
    <div class="block lg:hidden bg-white border-b border-gray-200 pb-0 py-8 px-4 sm:pb-8 sm:px-6 lg:px-8 ">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Shop Gear</h1>
          <p class="text-gray-500 mt-2">Showing {{ paginatedProducts.length }} of {{ filteredProducts.length }} products</p>
        </div>
        
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden flex items-center bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-200">
            <SlidersHorizontal class="w-5 h-5 mr-2" /> Filters
          </button>

          
          
          <div class="hidden md:flex bg-gray-100 rounded-lg p-1">
            <button 
              @click="viewMode = 'grid'" 
              :class="['p-2 rounded-md transition-colors', viewMode === 'grid' ? 'bg-white shadow-sm text-coral-500' : 'text-gray-500 hover:text-gray-900']"
            >
              <Grid class="w-6 h-6" />
            </button>
            <button 
              @click="viewMode = 'list'"
              :class="['p-2 rounded-md transition-colors', viewMode === 'list' ? 'bg-white shadow-sm text-coral-500' : 'text-gray-500 hover:text-gray-900']"
            >
              <List class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div class="block md:hidden mb-8 pl-1">
          <h3 class="font-bold text-gray-900 mb-4 tracking-wide uppercase text-sm">Search</h3>
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Search gear..." class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-coral-500 outline-none transition-all text-sm group">
            <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-8 items-start">
      <!-- Sidebar / Filters -->
      <aside 
        class="w-full md:w-64 shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:block transition-all"
        :class="isSidebarOpen ? 'block' : 'hidden'"
      >
        <div class="hidden md:block mb-8 pl-1">
          <h3 class="font-bold text-gray-900 mb-4 tracking-wide uppercase text-sm">Search</h3>
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Search gear..." class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-coral-500 outline-none transition-all text-sm group">
            <Search class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div class="mb-8 pl-1">
          <h3 class="font-bold text-gray-900 mb-4 tracking-wide uppercase text-sm">Categories</h3>
          <ul class="space-y-2.5">
            <li v-for="cat in categories" :key="cat">
              <label class="flex items-center cursor-pointer group">
                <input type="radio" :value="cat" v-model="selectedCategory" class="w-4 h-4 text-coral-500 focus:ring-blue-500 border-gray-300 rounded-full" />
                <span class="ml-3 text-sm" :class="selectedCategory === cat ? 'text-coral-500 font-semibold' : 'text-gray-600 group-hover:text-gray-900'">{{ cat }}</span>
              </label>
            </li>
          </ul>
        </div>

        <div class="mb-8 pl-1">
          <h3 class="font-bold text-gray-900 mb-4 tracking-wide uppercase text-sm">Brand</h3>
          <ul class="space-y-2.5">
            <li>
              <label class="flex items-center cursor-pointer group">
                <input type="radio" value="All" v-model="selectedBrand" class="w-4 h-4 text-coral-500 border-gray-300 rounded-full" />
                <span 
                  class="ml-3 text-sm"
                  :class="selectedBrand === 'All' 
                    ? 'text-coral-500 font-semibold' 
                    : 'text-gray-600 group-hover:text-gray-900'">
                  All
                </span>
              </label>
            </li>

            <li v-for="brand in allBrands" :key="brand">
              <label class="flex items-center cursor-pointer group">
                <input type="radio" :value="brand" v-model="selectedBrand" class="w-4 h-4 text-coral-500 border-gray-300 rounded-full" />
                <span class="ml-3 text-sm"
                  :class="selectedBrand === brand ? 'text-coral-500 font-semibold' : 'text-gray-600 group-hover:text-gray-900'">
                  {{ brand }}
                </span>
              </label>
            </li>
          </ul>
        </div>

        <div class="mb-8 pl-1">
          <h3 class="font-bold text-gray-900 mb-4 tracking-wide uppercase text-sm">Max Price</h3>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-500">₱0</span>
            <span class="text-sm font-bold text-coral-500">₱{{ maxPrice }}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="2000" 
            step="50"
            v-model.number="maxPrice" 
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-coral-500"
          >
        </div>

        <div class="pl-1">
          <h3 class="font-bold text-gray-900 mb-4 tracking-wide uppercase text-sm">Tags</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="tag in allTags" 
              :key="tag"
              @click="toggleTag(tag)"
              :class="['px-3 py-1.5 text-xs font-semibold rounded-full transition-colors border', selectedTags.includes(tag) ? 'bg-coral-500 text-white border-coral-500' : 'bg-white text-gray-600 border-gray-200 hover:border-coral-300']"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 w-full min-w-0">

      <!-- Header showing on large screen -->
      <div class="hidden lg:block bg-white border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8 mb-5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Shop Gear</h1>
          <p class="text-gray-500 mt-2">Showing {{ paginatedProducts.length }} of {{ filteredProducts.length }} products</p>
        </div>

        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden flex items-center bg-gray-100 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-200">
            <SlidersHorizontal class="w-5 h-5 mr-2" /> Filters
          </button>
          
          <div class="hidden md:flex bg-gray-100 rounded-lg p-1">
            <button 
              @click="viewMode = 'grid'" 
              :class="['p-2 rounded-md transition-colors', viewMode === 'grid' ? 'bg-white shadow-sm text-coral-500' : 'text-gray-500 hover:text-gray-900']"
            >
              <Grid class="w-6 h-6" />
            </button>
            <button 
              @click="viewMode = 'list'" 
              :class="['p-2 rounded-md transition-colors', viewMode === 'list' ? 'bg-white shadow-sm text-coral-500' : 'text-gray-500 hover:text-gray-900']"
            >
              <List class="w-6 h-6" />
            </button>
          </div>
        </div>
        </div>
      </div>

        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-[500px]"
            @click="openQuickView(product)"
          >
            <div class="h-[300px] sm:h-[250px] lg:h-[250px] w-full bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden shrink-0 border-b border-gray-50">
              <img :src="product.image" :alt="product.name" class="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500">
              <div class="absolute top-4 left-4 bg-coral-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                Best Seller
              </div>
              <div v-if="!product.inStock" class="absolute bottom-3 left-3 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">Out of Stock</div>
            </div>
            <div class="p-6 flex flex-col flex-1 relative bg-white">
              <div class="flex justify-between items-start gap-4 mb-2">
                <div class="flex-1">
                  <div class="text-[10px] font-bold text-coral-500 uppercase tracking-widest mb-1">{{ product.category }}</div>
                  <h3 class="text-lg font-bold text-gray-900 leading-tight line-clamp-2 pr-2">{{ product.name }}</h3>
                </div>
                <span class="text-lg font-extrabold text-gray-900 shrink-0">₱{{ product.price.toFixed(2) }}</span>
              </div>
              
              <div class="flex items-center mb-3">
                <!-- <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span class="text-[10px] text-gray-400 ml-1.5">(12)</span> -->
                <!-- Full stars -->
                <Star
                  v-for="i in Math.floor(product.rating)"
                  :key="'full-' + i"
                  class="w-4 h-4 text-yellow-400 fill-current"
                />

                <!-- Half star -->
                <StarHalf
                  v-if="product.rating % 1 !== 0"
                  class="w-4 h-4 text-yellow-400 fill-current"
                />

                <!-- Empty stars -->
                <Star
                  v-for="i in 5 - Math.ceil(product.rating)"
                  :key="'empty-' + i"
                  class="w-4 h-4 text-gray-300"
                />

                <span class="text-[10px] text-gray-400 ml-1.5">
                  {{ product.rating }} ({{product.totalRating}})
                </span>
              </div>
              
              <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-auto">{{ product.shortDesc }}</p>
              
              <div class="flex flex-wrap gap-1.5 pt-4 mt-2">
                <span v-for="tag in product.tags" :key="tag" class="text-[9px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md uppercase tracking-wider">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="bg-white rounded-2xl border border-gray-100 h-40 flex overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            @click="openQuickView(product)"
          >
            <div class="w-40 bg-gray-50 flex items-center justify-center p-4 border-r border-gray-100 relative">
              <img :src="product.image" :alt="product.name" class="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500">
            </div>
            <div class="p-6 flex-1 flex flex-col justify-center relative">
              <div class="text-xs font-bold text-coral-500 uppercase tracking-widest mb-1 opacity-80">{{ product.category }}</div>
              <h3 class="font-bold text-gray-900 text-xl mb-1">{{ product.name }}</h3>
              <p class="text-gray-500 text-sm hidden sm:block">{{ product.shortDesc }}</p>
              <div class="absolute right-6 top-1/2 -translate-y-1/2 text-right">
                <div class="text-2xl font-extrabold text-gray-900 mb-2">₱{{ product.price.toFixed(2) }}</div>
                <div v-if="!product.inStock" class="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-md inline-block">Out of Stock</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm mt-0">
          <Search class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p class="text-gray-500">Try adjusting your filters or search criteria.</p>
          <button @click="selectedCategory = 'All'; maxPrice = 2000; selectedTags = []; searchQuery = ''" class="mt-6 text-coral-500 font-semibold hover:underline">Clear all filters</button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
          <div class="flex space-x-2">
            <button 
              @click="currentPage > 1 && currentPage--"
              :disabled="currentPage === 1"
              class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="currentPage = page"
              :class="['w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all', currentPage === page ? 'bg-coral-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100 border border-gray-200']"
            >
              {{ page }}
            </button>
            <button 
              @click="currentPage < totalPages && currentPage++"
              :disabled="currentPage === totalPages"
              class="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick View Sidebar Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="quickViewProduct" class="fixed inset-0 bg-gray-900/60 backdrop-blur-[2px] z-[60]" @click="closeQuickView"></div>
    </transition>

    <!-- Quick View Sidebar -->
    <transition
      enter-active-class="transition-transform duration-500 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="quickViewProduct" class="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-[70] flex flex-col overflow-y-auto border-l border-gray-100">
        <div class="relative h-80 bg-gray-50 flex items-center justify-center p-8 shrink-0">
          <button @click="closeQuickView" class="absolute top-6 right-6 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 hover:scale-110 transition-all z-10">
            <X class="w-5 h-5 text-gray-700" />
          </button>
          <img 
          :src="quickViewProduct.image" 
          :alt="quickViewProduct.name" 
          class="h-full object-contain mix-blend-multiply" 
          >
        </div>
        
        <!-- <div class="p-8 flex flex-col flex-1">
          <div class="text-sm font-bold text-coral-500 uppercase tracking-widest mb-3 opacity-90">{{ quickViewProduct.category }}</div>
          <h2 class="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">{{ quickViewProduct.name }}</h2>
          <div class="text-4xl font-extrabold text-gray-900 mb-8">₱{{ quickViewProduct.price.toFixed(2) }}</div>
          
          <p class="text-gray-600 mb-8 leading-relaxed text-lg">{{ quickViewProduct.shortDesc }}</p>
          
          <div class="mb-10">
            <div class="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-sm">Features / Tags</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in quickViewProduct.tags" :key="tag" class="px-3.5 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-md">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="mt-auto">
            <div v-if="quickViewProduct.inStock" class="flex flex-col gap-5">
              <div class="flex items-center gap-4">
                <span class="font-semibold text-gray-900 w-24 tracking-wide uppercase text-sm">Quantity</span>
                <div class="flex items-center justify-between border-2 border-gray-200 rounded-lg p-1 bg-white flex-1 max-w-[140px]">
                  <button @click="quickViewQty > 1 && quickViewQty--" class="p-2 text-gray-500 hover:text-black transition-colors bg-gray-50 rounded-md"><Minus class="w-4 h-4" /></button>
                  <span class="font-extrabold text-gray-900 px-2 text-lg">{{ quickViewQty }}</span>
                  <button @click="quickViewQty++" class="p-2 text-gray-500 hover:text-black transition-colors bg-gray-50 rounded-md"><Plus class="w-4 h-4" /></button>
                </div>
              </div>
              <button @click="addToCart" class="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-coral-500/30 transition-all flex items-center justify-center hover:scale-[1.02] active:scale-95 text-lg">
                <ShoppingBag class="w-6 h-6 mr-3" /> Add to Cart
              </button>
            </div>
            <div v-else class="text-center p-5 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100">
              Currently Out of Stock
            </div>
            
            <div class="mt-8 text-center border-t border-gray-100 pt-6">
              <router-link :to="`/product/${quickViewProduct.id}`" class="text-coral-500 font-bold hover:underline inline-flex items-center group">
                View Full Product Details <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </router-link>
            </div>
          </div>
        </div> -->

        <div class="p-6 pt-0 flex flex-col flex-1 relative bg-white">
          <div class="flex justify-between items-start gap-4 mb-2">
            <div class="flex-1">
                <div class="text-[10px] font-bold text-coral-500 uppercase tracking-widest mb-1">{{ quickViewProduct.category }}</div>
                <h3 class="text-lg font-bold text-gray-900 leading-tight line-clamp-2 pr-2">{{ quickViewProduct.name }}</h3>
            </div>
            <span class="text-2xl font-extrabold text-gray-900 shrink-0">₱{{ quickViewProduct.price.toFixed(2) }}</span>
          </div>
          
          <div class="flex items-center mb-3">
            <!-- <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span class="text-[10px] text-gray-400 ml-1.5">(12)</span> -->
            <!-- Full stars -->
            <Star
              v-for="i in Math.floor(quickViewProduct.rating)"
              :key="'full-' + i"
              class="w-4 h-4 text-yellow-400 fill-current"
            />

            <!-- Half star -->
            <StarHalf
              v-if="quickViewProduct.rating % 1 !== 0"
              class="w-4 h-4 text-yellow-400 fill-current"
            />

            <!-- Empty stars -->
            <Star
              v-for="i in 5 - Math.ceil(quickViewProduct.rating)"
              :key="'empty-' + i"
              class="w-4 h-4 text-gray-300"
            />

            <span class="text-[10px] text-gray-400 ml-1.5">
              {{ quickViewProduct.rating }} ({{quickViewProduct.totalRating}})
            </span>
          </div>
          
          <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-auto">{{ quickViewProduct.shortDesc }}</p>
          
          <div class="flex flex-wrap gap-1.5 pt-4 mt-2">
            <span v-for="tag in quickViewProduct.tags" :key="tag" class="text-[9px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md uppercase tracking-wider">{{ tag }}</span>
          </div>

          <div class="mt-auto">
            <div v-if="quickViewProduct.inStock" class="flex flex-col gap-5">
              <div class="flex items-center gap-4">
                <span class="font-semibold text-gray-900 w-24 tracking-wide uppercase text-sm">Quantity</span>
                <div class="flex items-center justify-between border-2 border-gray-200 rounded-lg p-1 bg-white flex-1 max-w-[140px]">
                  <button @click="quickViewQty > 1 && quickViewQty--" class="p-2 text-gray-500 hover:text-black transition-colors bg-gray-50 rounded-md"><Minus class="w-4 h-4" /></button>
                  <span class="font-extrabold text-gray-900 px-2 text-lg">{{ quickViewQty }}</span>
                  <button @click="quickViewQty++" class="p-2 text-gray-500 hover:text-black transition-colors bg-gray-50 rounded-md"><Plus class="w-4 h-4" /></button>
                </div>
              </div>
              <button @click="addToCart" class="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-coral-500/30 transition-all flex items-center justify-center hover:scale-[1.02] active:scale-95 text-lg">
                <ShoppingBag class="w-6 h-6 mr-3" /> Add to Cart
              </button>
            </div>
            <div v-else class="text-center p-5 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100">
              Currently Out of Stock
            </div>
            
            <div class="text-center border-t border-gray-100 pt-6">
              <router-link :to="`/product/${quickViewProduct.id}`" class="text-coral-500 font-bold hover:underline inline-flex items-center group">
                View Full Product Details <ArrowRight class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </router-link>
            </div>
          </div>

        </div>


      </div>
    </transition>
  </div>
</template>
