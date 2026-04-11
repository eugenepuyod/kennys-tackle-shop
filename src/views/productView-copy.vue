<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { ChevronLeft, ChevronRight, Star, ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck, Truck } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const swiperModules = [Navigation, Pagination]

const allProducts = [
  { id: 101, name: 'Shimano Stella SW', price: 999.00, category: 'Fishing Reels', tags: ['Saltwater', 'Premium'], image: '/images/shimano-fishing-stella-sw-xgc-spinning-reel.webp', images: ['/images/reel.png', '/images/reel.png', '/images/reel.png'], desc: 'The ultimate spinning reel for massive game.', inStock: true },
  { id: 102, name: 'Daiwa Saltiga', price: 1100.00, category: 'Fishing Reels', tags: ['Deep Sea', 'Durable'], image: '/images/daiwa-saltiga-g-2023-jigging-reel.webp', images: ['/images/reel.png', '/images/reel.png', '/images/reel.png'], desc: 'Unmatched durability and pulling strength.', inStock: true },
  { id: 103, name: 'Okuma Makaira', price: 650.00, category: 'Trolling Reels', tags: ['Trolling', 'Heavy'], image: '/images/okuma-makaira-trolling-reel.webp', images: ['/images/reel.png', '/images/reel.png', '/images/reel.png'], desc: 'World-class 2-speed offshore reel.', inStock: true },
  { id: 104, name: 'Penn Authority', price: 550.00, category: 'Fishing Reels', tags: ['Sealed', 'Tough'], image: '/images/penn-authority-spinning-reel.webp', images: ['/images/reel.png', '/images/reel.png', '/images/reel.png'], desc: 'IPX8 sealed body against extreme elements.', inStock: true },
]

const product = ref(null)
const quantity = ref(1)
const activeImage = ref('')
const zoomStyle = ref({ display: 'none', backgroundPosition: '0% 0%' })

const loadProduct = () => {
  const found = allProducts.find(p => p.id === parseInt(route.params.id))
  if (found) {
    product.value = found
  } else {
    product.value = { 
      id: parseInt(route.params.id), 
      name: 'Premium Fishing Gear Demo', 
      price: 299.00, 
      category: 'Fishing Gear', 
      tags: ['Demo', 'High Quality'], 
      image: '/images/reel.png', 
      images: ['/images/reel.png', '/images/reel.png', '/images/reel.png', '/images/reel.png'], 
      desc: 'This is a premium piece of equipment crafted for professionals. Featuring aerospace-grade materials, ergonomic grips, and a lifetime warranty against defects. Designed in Japan, battle-tested globally.', 
      inStock: true 
    }
  }
  activeImage.value = product.value.images[0]
  quantity.value = 1
  window.scrollTo(0, 0)
}

onMounted(() => {
  loadProduct()
})

watch(() => route.params.id, () => {
  if (route.name === 'product') {
    loadProduct()
  }
})

const handleZoom = (e) => {
  const { left, top, width, height } = e.target.getBoundingClientRect()
  const x = ((e.clientX - left) / width) * 100
  const y = ((e.clientY - top) / height) * 100
  zoomStyle.value = {
    display: 'block',
    backgroundImage: `url(${activeImage.value})`,
    backgroundPosition: `${x}% ${y}%`,
    backgroundSize: '200%'
  }
}

const hideZoom = () => {
  zoomStyle.value = { display: 'none' }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value, quantity.value)
    router.push('/cart')
  }
}

const recommended = computed(() => {
  return [
    { id: 201, name: 'Grappler Type J', price: 299.00, image: '/images/reel.png' },
    { id: 601, name: 'Starter Kit', price: 120.00, image: '/images/reel.png' },
    { id: 502, name: 'Flat-Fall Jig', price: 18.00, image: '/images/reel.png' },
    { id: 401, name: 'Ocea Jigger Line', price: 65.00, image: '/images/reel.png' },
    { id: 401, name: 'Ocea Jigger Line', price: 65.00, image: '/images/reel.png' }
  ]
})
</script>

<template>
  <div class="product-page bg-white min-h-screen">
    <div v-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="hover:text-coral-500 transition-colors">Home</router-link>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRight class="w-4 h-4 mx-1" />
              <router-link to="/shop" class="hover:text-coral-500 transition-colors">Shop</router-link>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <ChevronRight class="w-4 h-4 mx-1" />
              <span class="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-full">{{ product.name }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Image Gallery (Left) -->
        <div class="w-full lg:w-1/2 flex flex-col gap-4">
          <!-- Main Image with Zoom -->
          <div 
            class="relative w-full aspect-square bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden cursor-crosshair group"
            @mousemove="handleZoom"
            @mouseleave="hideZoom"
          >
            <img :src="activeImage" :alt="product.name" class="w-full h-full object-contain p-8 mix-blend-multiply transition-opacity duration-300 pointer-events-none" :class="zoomStyle.display === 'block' ? 'opacity-0' : 'opacity-100'">
            <!-- Zoom Overlay -->
            <div 
              class="absolute inset-0 pointer-events-none w-full h-full"
              :style="zoomStyle"
            ></div>
          </div>
          
          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-4">
            <button 
              v-for="(img, idx) in product.images" 
              :key="idx" 
              @click="activeImage = img"
              class="aspect-square rounded-xl border-2 flex items-center justify-center bg-gray-50 overflow-hidden transition-all duration-200 focus:outline-none"
              :class="activeImage === img ? 'border-coral-500 shadow-md ring-2 ring-coral-500/20' : 'border-transparent hover:border-coral-300'"
            >
              <img :src="img" :alt="`${product.name} ${idx + 1}`" class="w-full h-full object-contain mix-blend-multiply p-2">
            </button>
          </div>
        </div>

        <!-- Product Details (Right) -->
        <div class="w-full lg:w-1/2 flex flex-col pt-2">
          <div class="text-sm font-bold text-coral-500 uppercase tracking-widest mb-2 opacity-90">{{ product.category }}</div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{{ product.name }}</h1>
          
          <div class="flex items-center mb-6 gap-4">
            <div class="flex items-center">
              <Star v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400 fill-current" />
              <span class="ml-2 text-sm text-gray-600 font-medium">4.9 (128)</span>
            </div>
            <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span class="text-sm text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-md border border-green-100 flex items-center">
              <ShieldCheck class="w-4 h-4 mr-1" /> Authentic
            </span>
          </div>
          
          <div class="text-4xl font-extrabold text-gray-900 mb-8">${{ product.price.toFixed(2) }}</div>
          
          <p class="text-lg text-gray-600 leading-relaxed mb-8">{{ product.desc }}</p>
          
          <div class="mb-8">
            <div class="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-sm">Features / Tags</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in product.tags" :key="tag" class="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:border-coral-300 transition-colors cursor-default">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="mt-auto">
            <div v-if="product.inStock" class="flex flex-col sm:flex-row gap-4 mb-6">
              <div class="flex items-center justify-between border-2 border-gray-200 rounded-xl p-1 bg-white h-14 w-full sm:w-36 shrink-0 transition-colors hover:border-gray-300 focus-within:border-coral-500">
                <button @click="quantity > 1 && quantity--" class="p-3 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-50 active:scale-95"><Minus class="w-5 h-5" /></button>
                <span class="font-extrabold text-gray-900 text-lg w-8 text-center">{{ quantity }}</span>
                <button @click="quantity++" class="p-3 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-gray-50 active:scale-95"><Plus class="w-5 h-5" /></button>
              </div>
              <button @click="addToCart" class="flex-1 bg-coral-500 hover:bg-coral-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-coral-500/30 transition-all flex items-center justify-center hover:scale-[1.02] active:scale-95 h-14 text-lg">
                <ShoppingBag class="w-6 h-6 mr-3" /> Add to Cart
              </button>
            </div>
            <div v-else class="text-center p-5 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 mb-6">
              Currently Out of Stock
            </div>

            <!-- Value props -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Truck class="w-6 h-6 text-coral-500 mr-3 shrink-0" />
                <span class="text-sm font-medium text-gray-700">Free Shipping over $200</span>
              </div>
              <div class="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck class="w-6 h-6 text-coral-500 mr-3 shrink-0" />
                <span class="text-sm font-medium text-gray-700">1 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommendations -->
    <div v-if="product" class="border-t border-gray-100 bg-gray-50 mt-12 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 flex flex-col items-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4 tracking-tight">You May Also Like</h2>
          <div class="w-16 h-1.5 bg-gradient-to-r from-coral-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <swiper 
          :modules="swiperModules"
          :slidesPerView="1"
          :spaceBetween="24"
          :breakpoints="{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }"
          :navigation="true"
          class="pb-16 px-4 py-4 -mx-4 recommended-swiper paddingb"
        >
          <swiper-slide v-for="rec in recommended" :key="rec.id">
            <router-link :to="`/product/${rec.id}`" class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-[340px] block">
              <div class="h-48 bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden border-b border-gray-100">
                <img :src="rec.image" :alt="rec.name" class="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500">
              </div>
              <div class="p-6 flex flex-col flex-1 justify-between">
                <h3 class="font-bold text-gray-900 text-lg leading-snug">{{ rec.name }}</h3>
                <div class="flex items-center justify-between mt-4">
                  <p class="font-extrabold text-coral-500 text-xl">${{ rec.price.toFixed(2) }}</p>
                  <span class="w-8 h-8 rounded-full bg-orange-50 text-coral-500 flex items-center justify-center group-hover:bg-coral-500 group-hover:text-white transition-colors">
                    <ArrowRight class="w-4 h-4" />
                  </span>
                </div>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style>
.paddingb{
  padding-bottom: 40px;
}
.recommended-swiper .swiper-button-next,
.recommended-swiper .swiper-button-prev {
  color: #FF7F50 !important;
  background-color: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  border: 1px solid #f3f4f6;
  margin-top: -30px;
  padding: 10px;
}
.recommended-swiper .swiper-button-next:after,
.recommended-swiper .swiper-button-prev:after {
  font-size: 18px !important;
  font-weight: bold;
}
.recommended-swiper .swiper-button-next:hover,
.recommended-swiper .swiper-button-prev:hover {
  background-color: #f8fafc;
  transform: scale(1.05);
}
</style>
