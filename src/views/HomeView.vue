<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Star, StarHalf, Quote, ChevronRight, ChevronLeft, Heart, ShoppingBag, Users, Award } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { useCartStore } from '../stores/cart'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const cartStore = useCartStore()
const swiperModules = [Autoplay, EffectFade, Navigation, Pagination]

const wishlist = ref(new Set())
const toggleWishlist = (id) => {
  if (wishlist.value.has(id)) {
    const newSet = new Set(wishlist.value)
    newSet.delete(id)
    wishlist.value = newSet
  } else {
    wishlist.value = new Set(wishlist.value).add(id)
  }
}

const categories = [
  { id: 1, name: 'Fishing Reels', image: '/images/category-reels.jpg' },
  { id: 2, name: 'Fishing Rods', image: '/images/cat-rods.png' },
  { id: 3, name: 'Lures', image: '/images/cat-lures-jigs.png' },
  { id: 4, name: 'Full Setups', image: '/images/cat-fishing-setup.png' }
]

const features = [
  { id: 101, name: 'Shimano Stella SW', rating: 3.5, totalRating: 200, stock: 3, brand: 'Shimano', price: 1115.99, category: 'Fishing Reels', tags: ['Saltwater', 'Premium'], image: '/images/shimano-fishing-stella-sw-xgc-spinning-reel.webp', shortDesc: 'The ultimate spinning reel for big game fishing.', inStock: true, moreImage: ['/images/shimano-fishing-stella-sw-xgc-spinning-reel.webp', '/images/shimano-stella-2.webp','/images/shimano-stella-3.webp','/images/shimano-stella-4.webp','/images/shimano-stella-5.webp','/images/shimano-stella-6.webp',] },
  { id: 102, name: 'Daiwa Saltiga', rating: 3.5, totalRating: 47, stock: 22, brand: 'Daiwa', price: 1100.00, category: 'Fishing Reels', tags: ['Saltwater', 'Heavy Duty'], image: '/images/daiwa-saltiga-g-2023-jigging-reel.webp', shortDesc: 'Unmatched durability and drag power.', inStock: true, moreImage: ['/images/daiwa-saltiga-g-2023-jigging-reel.webp', '/images/daiwa-saltiga-2.webp','/images/daiwa-saltiga-3.webp','/images/daiwa-saltiga-4.webp','/images/daiwa-saltiga-5.webp','/images/daiwa-saltiga-6.webp',] },
  { id: 103, name: 'Okuma Makaira', rating: 4.5, totalRating: 30, stock: 10, brand: 'Okuma', price: 1100.00, category: 'Trolling Reels', tags: ['Trolling', 'Heavy'], image: '/images/okuma-makaira-trolling-reel.webp', shortDesc: 'World-class 2-speed offshore reel.', inStock: true, moreImage: ['/images/okuma-makaira-trolling-reel.webp', '/images/okuma-makaira-trolling-reel-2.webp','/images/okuma-makaira-trolling-reel-3.webp','/images/okuma-makaira-trolling-reel-4.webp','/images/okuma-makaira-trolling-reel-5.webp','/images/okuma-makaira-trolling-reel-6.webp',] },
  { id: 104, name: 'Penn Authority', rating: 5, totalRating: 128, stock: 10, brand: 'Penn', price: 550.00, category: 'Fishing Reels', tags: ['Saltwater', 'Durable'], image: '/images/penn-authority-spinning-reel.webp', shortDesc: 'IPX8 sealed body against extreme elements..', inStock: true },
]

const reviews = [
  { id: 1, text: "The jigging setup I bought was phenomenal. Caught my first GT!", author: "Mark T.", role: "Professional Angler", profile: "/images/profile-mark.jpg" },
  { id: 2, text: "Excellent customer service and top quality reels. Highly recommend Cebu Tackle Shop.", author: "Sarah L.", role: "Hobbyist", profile: "/images/profile-sarah.jpg" },
  { id: 3, text: "Delivery was extremely fast and the gear was securely packed.", author: "James M.", role: "Customer", profile: "/images/profile-james.jpg" },
  { id: 4, text: "The Shimano Stella SW handled the biggest catches flawlessly. Highly satisfied!", author: "David P.", role: "Tournament Angler", profile: "/images/profile-david.jpg" },
 
]

const partners = [
  { name: 'Shimano', logo: '/images/shimano-logo.png' },
  { name: 'Daiwa', logo: '/images/daiwa-logo.png' },
  { name: 'Penn', logo: '/images/penn-logo.png' },
  { name: 'Okuma', logo: '/images/okuma-logo.png' },
  { name: 'Mustad', logo: '/images/mustad-logo.png' },
  { name: 'Rapala', logo: '/images/rapala-logo.png' },
  { name: 'Yo-Zuri', logo: '/images/yo-zuri-logo.png' }
]

const heroSlides = [
  {
    id: 1,
    image: '/images/calm-lake.jpg',
    animationClass: 'hero-bg-zoom',
    titleMain: 'Precision Tackle for',
    titleHighlight: 'Serious Anglers',
    subtitle: 'High-performance rods, reels, and gear crafted to deliver power, control, and reliability in every condition.',
    buttonText: 'Explore Reels',
    buttonLink: 'Fishing Reels'
  },
  {
    id: 2,
    image: '/images/fish-on-tuna.jpg',
    animationClass: 'hero-bg-pan-right',
    titleMain: 'Catch Bigger.',
    titleHighlight: 'Fish Smarter.',
    subtitle: "Top-tier fishing tackle, rods, and reels built to outperform—whether you're offshore or casting at sunrise.",
    buttonText: 'Explore Rods',
    buttonLink: 'Fishing Rods'
  },
  {
    id: 3,
    image: '/images/closeupgear.jpg',
    animationClass: 'hero-bg-pan-up',
    titleMain: 'Ready for Your ',
    titleHighlight: 'Next Big Catch?',
    subtitle: 'Upgrade your gear with high-quality rods, reels, and tackle.',
    buttonText: 'Fishing Gear',
    buttonLink: 'Fishing Gear'
  }
]

// Counter logic
const counters = ref({ clients: 0, reviews: 0, brands: 0 })
const counterSection = ref(null)
let observer = null
let scrollObserver = null

const startCounting = (entries) => {
  if (entries[0].isIntersecting) {
    const targets = { clients: 1000, reviews: 500, brands: 50 }
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      counters.value.clients = Math.floor((targets.clients / steps) * currentStep)
      counters.value.reviews = Math.floor((targets.reviews / steps) * currentStep)
      counters.value.brands = Math.floor((targets.brands / steps) * currentStep)
      
      if (currentStep >= steps) {
        clearInterval(interval)
        counters.value = targets
      }
    }, stepTime)
    observer.disconnect()
  }
}

onMounted(() => {
  // Counters Observer
  observer = new IntersectionObserver(startCounting, { threshold: 0.5 })
  if (counterSection.value) observer.observe(counterSection.value)

  // Scroll Reveal Animations Observer
  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // Unobserve to only animate once
        scrollObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })

  // Find all elements with 'reveal' class and observe them
  document.querySelectorAll('.reveal').forEach((el) => {
    scrollObserver.observe(el)
  })
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (scrollObserver) scrollObserver.disconnect()
})
</script>

<template>
  <div class="home-page overflow-hidden">
    <!-- Hero Banner -->
    <section class="h-[680px] sm:h-[680px] md:h-[600px] relative mt-[-72px] overflow-hidden">
      <swiper 
        :modules="swiperModules"
        :effect="'fade'"
        :fadeEffect="{ crossFade: true }"
        :speed="1500"
        :autoplay="{ delay: 6000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :loop="true"
        class="h-full w-full"
      >
        <swiper-slide v-for="slide in heroSlides" :key="slide.id" class="relative h-full w-full overflow-hidden">
          <!-- Unique animation on the image itself -->
          <img :src="slide.image" :alt="slide.titleHighlight" class="absolute inset-0 w-full h-full object-cover select-none" :class="slide.animationClass">
          <div class="absolute inset-0 bg-gray-900/40 bg-gradient-to-t from-gray-900/80"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center px-4 max-w-4xl mx-auto transform mt-8">
              <h1 class="text-5xl sm:text-6xl md:text-6xl  font-extrabold text-white mb-6 tracking-tight leading-tight slide-title">
                {{ slide.titleMain }} <br/><span class="text-coral-400">{{ slide.titleHighlight }}</span>
              </h1>
              <p class="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light slide-subtitle">
                {{ slide.subtitle }}
              </p>
              <div class="slide-button mt-4 flex justify-center gap-4 flex-wrap">
                <router-link to="/shop" class="inline-flex items-center justify-center px-10 py-3 text-md sm:text-lg font-extrabold text-white bg-coral-500 rounded-full hover:bg-coral-600 transition-all shadow-[0_0_40px_rgba(255,127,80,0.4)] hover:shadow-[0_0_60px_rgba(255,127,80,0.6)] hover:scale-105 active:scale-95 group border-2 border-white/20">
                  Shop Now
                </router-link>
                <router-link 
                  :to="'/shop?category=' + slide.buttonLink"
                  class="inline-flex items-center justify-center px-10 py-4 text-md sm:text-lg font-extrabold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:scale-105 active:scale-95 border-1 border-white/20">
                  {{ slide.buttonText }}
                  <ArrowRight class="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </router-link>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <!-- Promo Catalog -->
    <section class="py-12 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white reveal reveal-fade-up">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
        <h2 class="text-2xl font-bold">Hot Deal! Get 10% Off Your First Order</h2>
        <div class="flex items-center gap-4 bg-white/10 rounded-full p-2 pr-6 border border-white/20 shadow-lg">
          <span class="bg-coral-500 text-white font-mono font-bold px-4 py-2 rounded-full cursor-all-scroll select-all shadow-inner">CEBU10</span>
          <span class="text-sm font-medium">Use code at checkout</span>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="pt-10 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 reveal reveal-fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Shop by Category</h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-coral-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(cat, idx) in categories" 
            :key="cat.id" 
            class="reveal reveal-slide-left"
            :style="{ transitionDelay: `${idx * 150}ms` }"
          >
            <router-link 
              :to="'/shop?category=' + encodeURIComponent(cat.name)"
              class="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 block"
            >
              <img :src="cat.image" :alt="cat.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div class="absolute bottom-0 left-0 p-8 w-full">
                <h3 class="text-2xl font-bold text-white mb-4">{{ cat.name }}</h3>
                <span class="inline-flex items-center bg-coral-500 text-white font-bold px-6 py-2 rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  Shop {{ cat.name }} <ArrowRight class="ml-2 w-4 h-4" />
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-10 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12 reveal reveal-fade-up">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Featured Gear</h2>
            <div class="w-24 h-1.5 bg-gradient-to-r from-coral-500 to-blue-500 rounded-full"></div>
          </div>
          <router-link to="/shop" class="hidden sm:flex text-coral-500 hover:text-coral-600 font-medium items-center group">
            View All Products <ArrowRight class="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(product, idx) in features" 
            :key="product.id"
            class="reveal reveal-fade-up"
            :style="{ transitionDelay: `${idx * 150}ms` }"
          >
            <router-link 
              :to="`/product/${product.id}`"
              class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col min-h-[500px]"
            >
              <div class="relative h-[250px] w-full overflow-hidden bg-white flex items-center justify-center p-6 border-b border-gray-50 shrink-0">
                <img :src="product.image" :alt="product.name" class="h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-4 left-4 bg-coral-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  Best Seller
                </div>
                <button @click.prevent="toggleWishlist(product.id)" class="absolute top-4 right-4 text-gray-400 hover:text-coral-500 bg-white rounded-full p-2.5 shadow-sm z-10 transition-colors">
                  <Heart class="w-5 h-5" :class="{'fill-coral-500 text-coral-500': wishlist.has(product.id)}" />
                </button>
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
                  <!-- <Star v-for="i in 5" :key="i" class="w-3 h-3 text-yellow-400 fill-current" />
                  <span class="text-[10px] text-gray-400 ml-1.5">(12)</span> -->
                    <!-- Full stars -->
                    <Star
                      v-for="i in Math.floor(product.rating)"
                      :key="'full-' + i"
                      class="w-3 h-3 text-yellow-400 fill-current"
                    />

                    <!-- Half star -->
                    <StarHalf
                      v-if="product.rating % 1 !== 0"
                      class="w-3 h-3 text-yellow-400 fill-current"
                    />

                    <!-- Empty stars -->
                    <Star
                      v-for="i in 5 - Math.ceil(product.rating)"
                      :key="'empty-' + i"
                      class="w-3 h-3 text-gray-300"
                    />

                    <span class="text-[10px] text-gray-400 ml-1.5">
                      {{ product.rating }} ({{product.totalRating}})
                    </span>
                </div>
                
                <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-auto">{{ product.shortDesc }}</p>
                
                <div class="flex flex-wrap gap-1.5 pt-0 mt-2">
                  <span v-for="tag in product.tags" :key="tag" class="text-[9px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md uppercase tracking-wider">{{ tag }}</span>
                </div>

                <div class="w-full py-5 md:hidden
                ">
                  <button @click.prevent="cartStore.addItem(product, 1)" class="w-full bg-coral-500 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center transition-colors shadow-lg text-sm">
                    <ShoppingBag class="w-4 h-4 mr-2" /> Add to Cart
                  </button>
                </div>
                
                <div class="absolute bottom-0 left-0 w-full p-4 transform translate-y-full opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-sm z-20 hidden md:block">
                  <button @click.prevent="cartStore.addItem(product, 1)" class="w-full bg-coral-500 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center transition-colors shadow-lg text-sm">
                    <ShoppingBag class="w-4 h-4 mr-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="mt-10 text-center sm:hidden reveal reveal-fade-up">
          <router-link to="/shop" class="inline-flex text-coral-500 hover:text-coral-600 font-medium items-center group">
            View All Products <ArrowRight class="ml-1 w-5 h-5" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Animated Counters -->
    <section ref="counterSection" class="mb-10 py-20 bg-gray-900 relative reveal reveal-fade-up">
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center divide-y sm:divide-y-0 sm:divide-x divide-gray-800">
          <div class="pt-8 sm:pt-0 flex flex-col items-center">
            <Users class="w-12 h-12 text-coral-500 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
            <div class="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tighter">
              {{ counters.clients }}{{ counters.clients === 1000 ? '+' : '' }}
            </div>
            <div class="text-coral-400 font-medium tracking-widest uppercase text-sm">Happy Clients</div>
          </div>
          <div class="pt-8 sm:pt-0 flex flex-col items-center">
            <Star class="w-12 h-12 text-coral-500 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
            <div class="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tighter">
              {{ counters.reviews }}{{ counters.reviews === 500 ? '+' : '' }}
            </div>
            <div class="text-coral-400 font-medium tracking-widest uppercase text-sm">5-Star Reviews</div>
          </div>
          <div class="pt-8 sm:pt-0 flex flex-col items-center">
            <Award class="w-12 h-12 text-coral-500 mb-4 opacity-80 group-hover:scale-110 transition-transform" />
            <div class="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tighter">
              {{ counters.brands }}{{ counters.brands === 50 ? '+' : '' }}
            </div>
            <div class="text-coral-400 font-medium tracking-widest uppercase text-sm">Premium Brands</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Customer Reviews -->
    <section class="py-5 bg-gray-50 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-5 reveal reveal-fade-up">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">What Anglers Say</h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-coral-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-0 md:px-24 lg:px-20 reveal reveal-fade-up" style="transition-delay: 200ms;">
          <swiper 
            :modules="swiperModules"
            :slidesPerView="1"
            :breakpoints="{ 768: { slidesPerView: 2, spaceBetween: 24 }, 1024: { slidesPerView: 3, spaceBetween: 32 } }"
            :navigation="{ prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' }"
            :pagination="{ clickable: true }"
            :autoplay="{ delay: 6000, disableOnInteraction: false }"
            :loop="true"
            class="pb-16"
          >
            <swiper-slide v-for="review in reviews" :key="review.id" class="pb-15 px-6 md:px-8 text-center pt-8 pb-4">
              <div class="flex flex-col items-center justify-center mb-6">
                <img :src="review.profile" :alt="review.author" class="w-40 h-40 rounded-full object-cover shadow-lg mb-4 border-4 border-white" />
                <div class="flex gap-1 mb-3">
                  <Star v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400 fill-current" />
                </div>
              </div>
              <Quote class="w-8 h-8 text-coral-200 mx-auto mb-4 opacity-50" />
              <p class="text-lg sm:text-xl text-gray-700 italic font-light leading-relaxed mb-6">
                "{{ review.text }}"
              </p>
              <h4 class="text-lg font-bold text-gray-900">{{ review.author }}</h4>
              <p class="text-coral-500 text-sm font-medium">{{ review.role }}</p>
            </swiper-slide>
          </swiper>
          <button class="swiper-button-prev-custom absolute top-1/2 left-0 -translate-y-1/2 -mt-8 bg-white border border-gray-100 shadow-xl w-16 h-16 rounded-full flex items-center justify-center text-gray-400 hover:text-coral-500 hover:shadow-2xl transition-all z-10 focus:outline-none ring-offset-2 hover:ring-2 hover:ring-coral-500/20">
            <ChevronLeft class="w-8 h-8" />
          </button>
          <button class="swiper-button-next-custom absolute top-1/2 right-0 -translate-y-1/2 -mt-8 bg-white border border-gray-100 shadow-xl w-16 h-16 rounded-full flex items-center justify-center text-gray-400 hover:text-coral-500 hover:shadow-2xl transition-all z-10 focus:outline-none ring-offset-2 hover:ring-2 hover:ring-coral-500/20">
            <ChevronRight class="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>

    <!-- Partners Carousel -->
    <section class="py-5 bg-white border-t border-gray-100 reveal reveal-fade-up overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">Trusted Brands We Carry</h3>
        
        <div class="mt-8 relative group">
          <swiper 
            :modules="swiperModules"
            :slidesPerView="2"
            :spaceBetween="30"
            :breakpoints="{ 640: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 5 } }"
            :autoplay="{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }"
            :speed="2000"
            :loop="true"
            :freeMode="true"
            :allowTouchMove="false"
            class="brands-swiper pb-4"
          >
            <swiper-slide v-for="(partner, i) in partners" :key="i" class="flex items-center justify-center py-4">
              <div class="w-40 mx-auto mix-blend-multiply flex items-center justify-center filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                <img :src="partner.logo" :alt="partner.name" class="w-full h-auto object-contain px-4">
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Swiper Active Slide Text Animations */
.slide-title, .slide-subtitle, .slide-button {
  opacity: 0; 
}

.swiper-slide-active .slide-title {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.swiper-slide-active .slide-subtitle {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 300ms;
}
.swiper-slide-active .slide-button {
  animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 600ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Background Image Animations */
.hero-bg-zoom, .hero-bg-pan-right, .hero-bg-pan-up {
  opacity: 1;
}

.swiper-slide-active .hero-bg-zoom {
  animation: subtleZoom 12s ease-out forwards;
}
.swiper-slide-active .hero-bg-pan-right {
  animation: panRight 12s ease-out forwards;
}
.swiper-slide-active .hero-bg-pan-up {
  animation: panUp 12s ease-out forwards;
}

@keyframes subtleZoom {
  from { transform: scale(1); }
  to { transform: scale(1.15); }
}
@keyframes panRight {
  from { transform: scale(1.1) translateX(-5%); }
  to { transform: scale(1.1) translateX(0%); }
}
@keyframes panUp {
  from { transform: scale(1.1) translateY(5%); }
  to { transform: scale(1.1) translateY(0%); }
}

/* Scroll Reveal Classes */
.reveal {
  opacity: 0;
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal.reveal-fade-up {
  transform: translateY(50px);
}

.reveal.reveal-slide-left {
  transform: translateX(-50px);
}

.reveal.is-visible {
  opacity: 1;
  transform: translate(0);
}

/* Swiper Brands Marquee */
.brands-swiper .swiper-wrapper {
  transition-timing-function: linear !important;
}

:deep(.swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal){
  margin-bottom: 20px;
}

/* Swiper Pagination Bullets (Hero Banner) */
:deep(.swiper-pagination-bullet) {
  width: 16px !important;
  height: 16px !important;
  background-color: white !important;
  opacity: 0.5 !important;
  box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  margin: 0px 8px !important;
}
:deep(.swiper-pagination-bullet-active) {
  opacity: 1 !important;
  background-color: #FF7F50 !important; /* coral-500 */
}
</style>
