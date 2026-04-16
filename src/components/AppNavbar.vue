<script setup>
import { ShoppingCart, Menu, X, User, ShieldCheck, Truck, Award, Tag } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const isMobileMenuOpen = ref(false)


const showTopBar = ref(true)
let lastScrollY = 0

const navLinks = [
  { name: 'NEW & FEATURED', path: '/shop?tag=New' },
  { name: 'REELS', path: '/shop?tag=Reels' },
  { name: 'RODS', path: '/shop?tag=Rods' },
  { name: 'BEST SELLER', path: '/shop?tag=BestSeller' },
  { name: 'APPAREL', path: '/shop?tag=Apparel' },
  { name: 'SALE', path: '/shop?tag=Sale' },
  // { name: 'CLEARANCE', path: '/shop?tag=Clearance' },
  // { name: 'EXCLUSIVES', path: '/shop?tag=Exclusives' },
]

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > 1 && currentScrollY > lastScrollY) {
    // scrolling down
    showTopBar.value = false
  }else if(currentScrollY > 100){
    showTopBar.value = false
  }else {
    // scrolling up
    showTopBar.value = true
  }

  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-sm z-50 opacity-[97%]">
    <div 
      :class="[
        'overflow-hidden transition-all duration-300',
        showTopBar ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
      ]"
    >
      <div class="pb-[1px] bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-1 py-1 px-4 sm:px-6 lg:px-8">
          
          <div class="flex items-center p-1">
            <Truck class="w-4 h-4 text-coral-500 mr-3 shrink-0" />
            <span class="text-[12px] font-normal text-gray-400">Free Shipping over ₱2,000.00</span>
          </div>

          <div class="flex items-center p-1 sm:justify-center">
            <Tag class="w-4 h-4 text-coral-500 mr-3 shrink-0" />
            <span class="text-[12px] font-normal text-gray-400">Lowest Prices</span>
          </div>

          <div class="flex items-center p-1 sm:justify-end">
            <ShieldCheck class="w-4 h-4 text-coral-500 mr-3 shrink-0" />
            <span class="text-[12px] font-normal text-gray-400">1 Year Warranty</span>
          </div>

        </div>
      </div>
    </div>

    <div class="pb-[1px] bg-gradient-to-r from-slate-901 via-blue-900 to-indigo-800 opacity-90"></div>
    
    <div class="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-[72px]">
        <!-- Logo -->
        <div>
          <router-link to="/" class="flex-shrink-0 flex items-center">
            <!-- <span class="text-2xl font-bold text-gray-900 tracking-tight">Kenny's Tackle<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Shop</span></span> -->
            <div class="flex items-center gap-2 sm:gap-3">
             <div class="relative">
                <div class="w-15 h-15 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-900/30 border border-cyan-400/20 flex items-center justify-center shadow-lg overflow-hidden">
                  
                  
                  <div class="absolute bottom-0 w-full h-6 bg-cyan-400/20 blur-sm"></div>

                  <img src="/images/kennys-logo.png" class="w-11 h-11 md:w-12 md:h-12 object-contain relative z-10" />
                </div>
              </div>
              <!-- <span class="font-semibold text-gray-800 tracking-wide hidden sm:block">
                Kenny's Tackle<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Shop</span>
              </span>

              <span class="text-sm font-semibold leading-[19px] text-gray-800 tracking-wide block sm:hidden">
                Kenny's <br />Tackle<span class="pr-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Shop</span>
              </span> -->
              <nav class="hidden lg:flex space-x-3">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            class="font-medium relative group px-2 py-1 transition-colors"
            :class="$route.path === link.path ? 'text-coral-500' : 'text-white/80 hover:text-coral-500'"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 h-0.5 bg-coral-500 transition-all duration-300" :class="$route.path === link.path ? 'w-full' : 'w-0 group-hover:w-full'"></span>
          </router-link>
        </nav>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        

        <!-- Right Icons -->
        <div class="flex items-center space-x-6">
          <router-link to="/login" class="text-white/80 hover:text-coral-500 relative group transition-colors">
            <User class="w-6 h-6" />
          </router-link>

          <router-link to="/cart" class="text-white/80 hover:text-coral-500 relative group transition-colors">
            <ShoppingCart class="w-6 h-6" />
            <span 
              v-if="cartStore.totalItemsCount > 0"
              class="absolute -top-2 -right-2 bg-coral-500 text-white/80 text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center animate-bounce shadow-md"
            >
              {{ cartStore.totalItemsCount }}
            </span>
          </router-link>

          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="lg:hidden text-white/80 hover:text-coral-500 focus:outline-none transition-colors">
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-40 origin-top">
        <div class="px-4 py-4 space-y-2">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            @click="isMobileMenuOpen = false"
            class="block px-4 py-3 rounded-xl text-base font-medium transition-colors"
            :class="$route.path === link.path ? 'text-coral-500 bg-orange-50' : 'text-gray-700 hover:text-coral-500 hover:bg-orange-50'"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>
