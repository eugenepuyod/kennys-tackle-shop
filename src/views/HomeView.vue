<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick  } from 'vue'
import { ArrowRight, Star, StarHalf, Quote, ChevronRight, ChevronLeft, Heart, ShoppingBag, Users, Award } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { useCartStore } from '../stores/cart'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Tilt section
import VanillaTilt from "vanilla-tilt";
const tiltCards = ref([]);

const tiltBanner = ref([]);

const bundles = computed(() => {
  const discount = 0.15

  const bundleList = [
    {
      id: "starter-kit",
      title: "Complete Fishing Setup",
      subtitle: "Reel + Rod + Braided Line + Mono Line + Jigs",
      items: [
        { id: 101, name: 'Shimano Stella SW', price: 1115.99, image: '/images/shimano-fishing-stella-sw-xgc-spinning-reel.webp' },
        { id: 105, name: 'Shimano Grappler Rod', price: 800, image: '/images/shimano-grappler-j.webp' },
        { id: 108, name: 'Ocea PE Line', price: 300, image: '/images/shimano-pe4.webp' },
        { id: 114, name: 'Fluoro Leader', price: 200, image: '/images/shimano-mono.webp' },
        { id: 110, name: 'Flat Fall Jig', price: 250, image: '/images/shimano-flat-fall-jig.webp' }
      ]
    },
    {
      id: "jigging-kit",
      title: "Pro Jigging Bundle",
      subtitle: "Heavy-duty offshore jigging setup",
      items: [
        { id: 102, name: 'Daiwa Saltiga', price: 1100, image: '/images/daiwa-saltiga-g-2023-jigging-reel.webp' },
        { id: 115, name: 'Shimano SALTY ADVANCE SHORE JIGGING', price: 179.00, image: '/images/shimano-salty-advance-jigging-rod.webp' },
      ]
    }
  ]

  return bundleList.map(bundle => {
    const original = bundle.items.reduce((sum, i) => sum + i.price, 0)
    return {
      ...bundle,
      original,
      price: Math.round(original * (1 - discount))
    }
  })
})


const tagColors = {
  Sale: 'bg-red-500',
  New: 'bg-green-500',
  BestSeller: 'bg-coral-500',
  New: 'bg-green-500'
}

const addBundleToCart = () => {
  bundle.value.items.forEach(item => {
    cartStore.addItem({
      ...item,
      isBundleItem: true,
      bundleId: 'starter-kit'
    }, 1)
  })
}


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
  { id: 1, name: 'Reels', image: '/images/cat-creels.png' },
  { id: 2, name: 'Rods', image: '/images/cat-crods.png' },
  { id: 3, name: 'Jigs', image: '/images/cat-cjigs.png' },
  { id: 4, name: 'Braided lines', image: '/images/cat-cbraid-lines.png' },
  { id: 5, name: 'Lures', image: '/images/lures.png' },
]

const features = [
  { id: 101, name: 'Shimano Stella SW', rating: 3.5, totalRating: 200, stock: 3, brand: 'Shimano', price: 1115.99, category: 'Fishing Reels', tags: ['Saltwater', 'Premium'], image: '/images/shimano-fishing-stella-sw-xgc-spinning-reel.webp', shortDesc: 'The ultimate spinning reel for big game fishing.', inStock: true, moreImage: ['/images/shimano-fishing-stella-sw-xgc-spinning-reel.webp', '/images/shimano-stella-2.webp','/images/shimano-stella-3.webp','/images/shimano-stella-4.webp','/images/shimano-stella-5.webp','/images/shimano-stella-6.webp',], tagName: "Sale" },
  { id: 102, name: 'Daiwa Saltiga', rating: 3.5, totalRating: 47, stock: 22, brand: 'Daiwa', price: 1100.00, category: 'Fishing Reels', tags: ['Saltwater', 'Heavy Duty'], image: '/images/daiwa-saltiga-g-2023-jigging-reel.webp', shortDesc: 'Unmatched durability and drag power.', inStock: true, moreImage: ['/images/daiwa-saltiga-g-2023-jigging-reel.webp', '/images/daiwa-saltiga-2.webp','/images/daiwa-saltiga-3.webp','/images/daiwa-saltiga-4.webp','/images/daiwa-saltiga-5.webp','/images/daiwa-saltiga-6.webp',], tagName: "New" },
  { id: 103, name: 'Okuma Makaira', rating: 4.5, totalRating: 30, stock: 10, brand: 'Okuma', price: 1100.00, category: 'Trolling Reels', tags: ['Trolling', 'Heavy'], image: '/images/okuma-makaira-trolling-reel.webp', shortDesc: 'World-class 2-speed offshore reel.', inStock: true, moreImage: ['/images/okuma-makaira-trolling-reel.webp', '/images/okuma-makaira-trolling-reel-2.webp','/images/okuma-makaira-trolling-reel-3.webp','/images/okuma-makaira-trolling-reel-4.webp','/images/okuma-makaira-trolling-reel-5.webp','/images/okuma-makaira-trolling-reel-6.webp',], tagName: "BestSeller" },
  { id: 104, name: 'Penn Authority', rating: 5, totalRating: 128, stock: 10, brand: 'Penn', price: 550.00, category: 'Fishing Reels', tags: ['Saltwater', 'Durable'], image: '/images/penn-authority-spinning-reel.webp', shortDesc: 'IPX8 sealed body against extreme elements..', inStock: true, tagName: "New" },
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
    image: '/images/me.jpg',
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

onMounted(async () => {
  await nextTick()
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

  // Tilt section
  tiltCards.value.forEach(el => {
    VanillaTilt.init(el, {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.03
    });
  });

  // Promo banner
  tiltBanner.value.forEach(el => {
    VanillaTilt.init(el, {
      max: 6,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
      scale: 1.02
    })
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (scrollObserver) scrollObserver.disconnect()
})
</script>

<template>
  <div class="home-page overflow-hidden">
    <!-- Hero Banner -->
    <section class="h-[770px] sm:h-[680px] md:h-[650px] relative overflow-hidden">
      <swiper 
        :modules="swiperModules"
        :effect="'fade'"
        :fadeEffect="{ crossFade: true }"
        :speed="1500"
        :autoplay="{ delay: 6000, disableOnInteraction: false }"
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
    <section class="py-12 bg-blue-500 text-white reveal reveal-fade-up">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
        <h2 class="text-2xl font-bold">Hot Deal! Get 10% Off Your First Order</h2>
        <div class="flex items-center gap-4 bg-white/10 rounded-full p-2 pr-6 border border-white/20 shadow-lg">
          <span class="bg-coral-500 text-white font-mono font-bold px-4 py-2 rounded-full cursor-all-scroll select-all shadow-inner">KENNY10</span>
          <span class="text-sm font-medium">Use code at checkout</span>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-14 reveal reveal-fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Top Categories
        </h2>
        <p class="text-gray-500 mt-3">
          Premium gear for every angler
        </p>
        <div class="w-24 h-1.5 bg-gradient-to-r from-coral-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- Grid -->
      <swiper
        :modules="swiperModules"
        :slidesPerView="1"
        :spaceBetween="20"
        :breakpoints="{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
          1280: { slidesPerView: 4, spaceBetween: 30 }
        }"
        :autoplay="false"
        :loop="true"
        :navigation="true"
        class="pb-10"
      >
        <!-- For loop -->
        <swiper-slide
          v-for="(cat, idx) in categories"
          :key="cat.id"
          class="p-2 lg:p-0 lg:pt-[20px]"
        >
          <div
            ref="tiltCards"
            class="tilt-card"
          >

            <router-link 
              :to="'/shop?tag=' + encodeURIComponent(cat.name)"
              class="group relative h-80 rounded-2xl overflow-hidden block 
                    shadow-md hover:shadow-2xl transition-all duration-500 
                    transform hover:-translate-y-2 active:scale-95"
            >

              <!-- Image -->
              <img 
                :src="cat.image" 
                :alt="cat.name"
                class="absolute inset-0 w-full h-full object-cover 
                      transition-transform duration-700 ease-out 
                      group-hover:scale-110 group-hover:rotate-1"
              >

              <!-- Gradient Overlay -->
              <div class="absolute inset-0 
                          bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              </div>

              <!-- Glass Blur -->
              <div class="absolute inset-0 backdrop-blur-[2px] opacity-0 
                          group-hover:opacity-100 transition duration-500">
              </div>

              <!-- Glow Border -->
              <div class="absolute inset-0 rounded-2xl border border-white/10 
                          group-hover:border-white/30 transition duration-300">
              </div>

              <!-- Shine Sweep -->
              <div class="absolute inset-0 overflow-hidden">
                <div class="absolute -left-1/2 top-0 w-1/2 h-full 
                            bg-white/10 skew-x-12 
                            group-hover:left-full transition-all duration-700">
                </div>
              </div>

              <!-- Content -->
              <div class="absolute bottom-0 left-0 p-6 w-full">

                <h3 class="text-2xl font-semibold text-white mb-2 
                          transform translate-y-2 group-hover:translate-y-0 
                          transition duration-500">
                  {{ cat.name }}
                </h3>

                <span class="inline-flex items-center gap-2 
                            text-sm font-medium text-white/90
                            opacity-0 translate-y-4 
                            group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-500 delay-100">
                  Explore Collection
                  <ArrowRight class="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </span>

              </div>

            </router-link>
          </div>
        </swiper-slide>
        <!-- for loop -->

      </swiper> 
      <!-- grid -->


    </div>
  </section>

    <!-- Featured Products -->
    <section class="py-10 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-12 reveal reveal-fade-up">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Featured Gear
            </h2>
            <p class="text-gray-500 mt-3">
              Handpicked high-performance fishing equipment trusted by serious anglers.
            </p>
            <div class="w-24 h-1.5 bg-gradient-to-r from-coral-500 to-blue-500 mt-4 rounded-full"></div>
          </div>
          
          <router-link to="/shop" class="hidden sm:flex text-coral-500 hover:text-coral-600 font-medium items-center group">
            View All Products <ArrowRight class="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(product, idx) in features" 
            :key="product.id"
            class="reveal reveal reveal-slide-left"
            :style="{ transitionDelay: `${idx * 150}ms` }"
          >
            <router-link 
              :to="`/product/${product.id}`"
              class="group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col min-h-[500px] hover:-translate-y-2"
            >
              <div class="relative h-[300px] md:h-[250px] w-full overflow-hidden bg-white flex items-center justify-center p-6 border-b border-gray-50 shrink-0">
                <img :src="product.image" :alt="product.name" class="h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110">
                <div 
                class="absolute top-4 left-4 bg-coral-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm"
                :class="tagColors[product.tagName]"
                >
                  {{ product.tagName }}
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


    <section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- HEADER -->
      <div class="text-center mb-10 sm:mb-14 reveal reveal-fade-up px-4">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Ultimate Fishing Bundle
        </h2>

        <p class="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
          Get the full setup and save more when you buy everything together in one exclusive deal.
        </p>

        <div class="w-20 sm:w-24 h-1 bg-gradient-to-r from-coral-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- TILT CONTAINER (IMPORTANT FIX) -->
      <swiper
        :modules="swiperModules"
        :slidesPerView="1"
        :autoplay="false"
        :loop="true"
        :navigation="true"
        class="pb-10"
      >
        <swiper-slide 
          v-for="bundle in bundles" 
          :key="bundle.id"
          class="p-2"
        >
          <div ref="tiltBanner"
            class="relative w-full mx-auto max-w-4xl lg:max-w-5xl
                  rounded-2xl sm:rounded-3xl overflow-hidden
                  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                  text-white shadow-xl
                  will-change-transform transform-gpu">

            <!-- Glow -->
            <div class="absolute inset-0 bg-gradient-to-r 
                        from-coral-500/20 via-transparent to-blue-500/20"></div>

            <!-- CONTENT -->
            <div class="relative flex flex-col lg:flex-row 
                        items-start lg:items-center 
                        justify-between gap-6 sm:gap-8 lg:gap-10 
                        p-5 sm:p-8 md:p-10">

              <!-- LEFT -->
              <div class="w-full lg:max-w-xl">

                <span class="inline-block mb-3 sm:mb-4 
                            bg-gradient-to-r from-orange-500 to-orange-600 
                            text-[11px] sm:text-xs px-3 sm:px-4 py-1 rounded-full font-semibold">
                  🎣 Bundle Deal
                </span>

                <h3 class="text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
                  <!-- Complete Fishing Setup -->
                  {{ bundle.title }}
                </h3>

                <p class="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base">
                  <!-- Reel + Rod + Braided Line + Mono Line + Jigs — everything you need in one kit. -->
                  {{ bundle.subtitle }}
                </p>

                <!-- PRICE -->
                <div class="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 sm:mt-6">

                  <span class="text-gray-400 line-through text-sm sm:text-lg">
                    ₱{{ bundle.original }}
                  </span>

                  <span class="text-2xl sm:text-3xl font-bold text-white">
                    ₱{{ bundle.price }}
                  </span>

                  <span class="text-green-400 text-sm sm:text-base font-semibold">
                    Save ₱{{ (bundle.original - bundle.price).toLocaleString('en-PH', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }}
                  </span>

                </div>

                <!-- CTA -->
                <button
                  @click="bundle.items.forEach(item => cartStore.addItem(item, 1))"
                  class="mt-5 sm:mt-6 w-full sm:w-auto 
                        px-6 sm:px-8 py-3 rounded-xl 
                        bg-gradient-to-r from-coral-500 to-orange-500 
                        hover:from-orange-600 hover:to-coral-600
                        text-white font-semibold shadow-lg 
                        active:scale-95 transition-all duration-300">
                  🛒 Add Bundle to Cart
                </button>

              </div>

              <!-- RIGHT (PRODUCTS - NO OVERFLOW) -->
              <div class="w-full lg:w-auto flex justify-center lg:justify-end shrink-0">

                <div class="grid grid-cols-3 sm:grid-cols-5 lg:flex gap-3 sm:gap-4">

                  <div v-for="(item, i) in bundle.items" :key="i"
                      class="relative group flex flex-col items-center">

                    <!-- ICON -->
                    <div class="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 
                                bg-white rounded-lg sm:rounded-xl shadow-md 
                                flex items-center justify-center p-2
                                transition-transform duration-300 
                                active:scale-95 group-hover:scale-105">

                      <img :src="item.image" class="max-h-full object-contain" />

                    </div>

                    <!-- LABEL (desktop only) -->
                    <span class="hidden lg:block absolute bottom-full mb-2 left-1/2 
                                -translate-x-1/2 whitespace-nowrap text-xs 
                                text-white bg-black/80 px-2 py-1 rounded 
                                opacity-0 group-hover:opacity-100 transition">
                      {{ item.name }}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            <!-- SHINE -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="absolute -left-1/2 top-0 w-1/2 h-full 
                          bg-white/10 skew-x-12 animate-shine"></div>
            </div>

          </div>
          <!-- tilt banner subcontainer -->
        </swiper-slide>
      </swiper>
      <!-- tilt container -->
      </div>
    </section>



    <!-- FULL IMAGE SECTION (LEFT-BOTTOM CONTENT) -->
    <section class="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden reveal reveal-fade-up">

      <!-- Background Image -->
      <img 
        src="/images/all-products.jpg" 
        alt="Fishing Banner"
        class="absolute inset-0 w-full h-full object-cover object-[center_17%]"
      >

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Content (LEFT-BOTTOM) -->
      <div class="absolute bottom-0 left-0 w-full px-4 py-4 md:py-8 sm:px-6 lg:px-8 z-10 reveal reveal-fade-up">
        
        <div class="max-w-7xl mx-auto">

          <p class="text-gray-200 text-sm sm:text-base md:text-lg mb-3">
            Premium gear built to handle the ocean’s toughest battles.
          </p>

          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
            CAST HARDER. FIGHT STRONGER
          </h2>

          <router-link 
            to="/shop"
            class="inline-flex items-center px-6 sm:px-8 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-full transition shadow-lg"
          >
            Shop All
          </router-link>

        </div>

      </div>

    </section>


    <!-- Partners Carousel -->
    <section class="py-15 lg:py-20 bg-white border-t border-gray-100 reveal reveal-fade-up overflow-hidden">
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
            <swiper-slide 
              v-for="(partner, i) in partners" 
              :key="i" 
              class="flex items-center justify-center py-4"
            >
              <div class="w-40 mx-auto mix-blend-multiply flex items-center justify-center filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                <img :src="partner.logo" :alt="partner.name" class="w-full h-auto object-contain px-4">
              </div>
            </swiper-slide>
          </swiper>
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
            :autoplay="{ delay: 6000, disableOnInteraction: false }"
            :loop="true"
            class="pb-16"
          >
            <swiper-slide 
              v-for="review in reviews" 
              :key="review.id" 
              class="pb-15 px-6 md:px-8 text-center pt-8 pb-4"
            >
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

.reveal.reveal-slide-right {
  transform: translateX(500px);
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

.tilt-card {
  transform-style: preserve-3d;
}

@keyframes shine {
  0% { left: -50%; }
  100% { left: 120%; }
}

.animate-shine {
  animation: shine 3s infinite;
}
</style>
