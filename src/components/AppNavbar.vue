<script setup>
import { ShoppingCart, Menu, X, User } from 'lucide-vue-next'
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]
</script>

<template>
  <header class="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-[72px]">
        <!-- Logo -->
        <router-link to="/" class="flex-shrink-0 flex items-center">
          <span class="text-2xl font-bold text-gray-900 tracking-tight">Kenny's Tackle<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Shop</span></span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name" 
            :to="link.path"
            class="font-medium relative group px-2 py-1 transition-colors"
            :class="$route.path === link.path ? 'text-coral-500' : 'text-gray-600 hover:text-coral-500'"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 h-0.5 bg-coral-500 transition-all duration-300" :class="$route.path === link.path ? 'w-full' : 'w-0 group-hover:w-full'"></span>
          </router-link>
        </nav>

        <!-- Right Icons -->
        <div class="flex items-center space-x-6">
          <router-link to="/login" class="text-gray-600 hover:text-coral-500 relative group transition-colors">
            <User class="w-6 h-6" />
          </router-link>

          <router-link to="/cart" class="text-gray-600 hover:text-coral-500 relative group transition-colors">
            <ShoppingCart class="w-6 h-6" />
            <span 
              v-if="cartStore.totalItemsCount > 0"
              class="absolute -top-2 -right-2 bg-coral-500 text-white text-[10px] font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center animate-bounce shadow-md"
            >
              {{ cartStore.totalItemsCount }}
            </span>
          </router-link>

          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden text-gray-600 hover:text-coral-500 focus:outline-none transition-colors">
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
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl z-40 origin-top">
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
