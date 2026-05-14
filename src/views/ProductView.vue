<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'
import { ChevronLeft, ChevronRight, Star, StarHalf, ArrowRight, Minus, Plus, ShoppingBag, ShieldCheck, Truck } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const relatedProducts = ref([])

const swiperModules = [Navigation, Pagination]

const quantity = ref(1)
const activeImage = ref('')
const zoomStyle = ref({ display: 'none', backgroundPosition: '0% 0%' })

const loadProduct = (idParam) => {
  const id = parseInt(idParam)
  const found = products.find(p => p.id === id)
  if (found) {
    product.value = found
    activeImage.value = found.image
    // grab related max 3
    relatedProducts.value = products.filter(p => p.category === found.category && p.id !== id).slice(0, 3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    product.value = null
  }
}

// Image Gallery State
// const selectedImage = ref('')
const sliderRef = ref(null)

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -150, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: 150, behavior: 'smooth' })
  }
}

const galleryImages = computed(() => {
  if (product.value.moreImage && product.value.moreImage.length > 0) return product.value.moreImage;
  return [
    product.value.image,
  ]
})

onMounted(() => {
  loadProduct(route.params.id)
})

watch(() => route.params.id, (newId) => {
  loadProduct(newId)
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

// const addToCart = () => {
//   if (product.value) {
//     cartStore.addItem(product.value, quantity.value)
//     router.push('/cart')
//   }
// }


const addToCart = () => {
  if (!product.value) return

  const selectedVariant = product.value.sizes.find(
    s => s.size === product.value.selectedSize
  )

  const cartProduct = {
    ...product.value,

    id: selectedVariant.id,
    size: selectedVariant.size,
    price: selectedVariant.price
  }

  cartStore.addItem(cartProduct, quantity.value)

  router.push('/cart')
}

</script>

<template>
  <div class="product-page pt-12 lg:pt-20 bg-white min-h-screen">
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
          <div class="relative group/slider mt-2 px-6 md:mt-[-127px]">
              
              <button @click="scrollLeft" class="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center text-slate-600 hover:text-brand-600 hover:scale-110 transition-all z-20 opacity-0 group-hover/slider:opacity-100 focus:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>

              <div ref="sliderRef" class="flex flex-nowrap gap-4 overflow-x-auto pb-2 pt-2 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button 
                  v-for="(img, idx) in galleryImages" 
                  :key="idx" 
                  @click="activeImage = img"
                  :class="[
                    'w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center rounded-2xl overflow-hidden border-2 transition-all p-1 snap-start relative',
                    activeImage === img ? 'border-coral-500 opacity-100 shadow-md bg-white scale-100' : 'border-transparent opacity-70 hover:opacity-100 bg-slate-100 scale-95 hover:scale-100 hover:shadow-sm'
                  ]"
                >
                  <img :src="img" class="w-full h-full object-cover rounded-xl shadow-inner pointer-events-none">
                </button>
              </div>

              <button @click="scrollRight" class="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center text-slate-600 hover:text-brand-600 hover:scale-110 transition-all z-20 opacity-0 group-hover/slider:opacity-100 focus:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              
            </div>

        </div>

        <!-- Product Details (Right) -->
        <div class="w-full lg:w-1/2 flex flex-col pt-2">
          <div class="text-sm font-bold text-coral-500 uppercase tracking-widest mb-2 opacity-90">{{ product.category }}</div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{{ product.name }}</h1>
          <div class="flex items-center mb-6 gap-4">
            <div class="flex items-center">
              <!-- Full stars -->
              <Star
                v-for="i in Math.floor(product.rating)"
                :key="'full-' + i"
                class="w-5 h-5 text-yellow-400 fill-current"
              />

              <!-- Half star -->
              <StarHalf
                v-if="product.rating % 1 !== 0"
                class="w-5 h-5 text-yellow-400 fill-current"
              />

              <!-- Empty stars -->
              <Star
                v-for="i in 5 - Math.ceil(product.rating)"
                :key="'empty-' + i"
                class="w-5 h-5 text-gray-300"
              />

              <span class="ml-2 text-sm text-gray-600 font-medium">
                {{ product.rating }} ({{product.totalRating}})
              </span>
            </div>
            <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span class="text-sm text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-md border border-green-100 flex items-center">
              <ShieldCheck class="w-4 h-4 mr-1" /> Authentic
            </span>
          </div>
          
          <div class="text-4xl font-extrabold text-gray-900 mb-8">
            <!-- ₱{{ product.price.toFixed(2) }} -->
             ₱{{
              product.sizes
                ?.find(s => s.size === product.selectedSize)
                ?.price?.toFixed(2)
            }}
          </div>
          
          <p class="text-lg text-gray-600 leading-relaxed mb-8">{{ product.shortDesc }}</p>

          <!-- Size Dropdown -->
          <div
            v-if="product.sizes"
            class="mt-5 mb-5 relative"
          >
            <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
              Model
            </label>

            <select
              v-model="product.selectedSize"
              class="w-full appearance-none border-2 border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-900 font-semibold focus:outline-none 
              "
            >
              <option
                v-for="variant in product.sizes"
                :key="variant.size"
                :value="variant.size"
              >
                {{ variant.size }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-3 top-7 flex items-center text-gray-500"
            >
              ▼
            </div>
          </div>

          
          <div class="mb-8">
            <div class="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-sm">Features / Tags</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in product.tags" :key="tag" class="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:border-coral-300 transition-colors cursor-default">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="mts-auto">
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
                <span class="text-sm font-medium text-gray-700">Free Shipping over ₱200</span>
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
          <swiper-slide v-for="rec in relatedProducts" :key="rec.id">
            <router-link :to="`/product/${rec.id}`" class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-[340px] block">
              <div class="h-48 bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden border-b border-gray-100">
                <img :src="rec.image" :alt="rec.name" class="h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500">
              </div>
              <div class="p-6 flex flex-col flex-1 justify-between">
                <h3 class="font-bold text-gray-900 text-lg leading-snug">{{ rec.name }}</h3>
                <div class="flex items-center">
                  <!-- Full stars -->
                  <Star
                    v-for="i in Math.floor(rec.rating)"
                    :key="'full-' + i"
                    class="w-4 h-4 text-yellow-400 fill-current"
                  />

                  <!-- Half star -->
                  <StarHalf
                    v-if="rec.rating % 1 !== 0"
                    class="w-4 h-4 text-yellow-400 fill-current"
                  />

                  <!-- Empty stars -->
                  <Star
                    v-for="i in 5 - Math.ceil(rec.rating)"
                    :key="'empty-' + i"
                    class="w-4 h-4 text-gray-300"
                  />

                  <span class="ml-2 text-sm text-gray-600 font-medium">
                    {{ rec.rating }} ({{rec.totalRating}})
                  </span>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <p class="font-extrabold text-coral-500 text-xl">₱{{ rec.price.toFixed(2) }}</p>
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
