<script setup>
import { useCartStore } from '../stores/cart'
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-vue-next'
import { computed } from 'vue'

const cartStore = useCartStore()

const isEmpty = computed(() => cartStore.items.length === 0)
</script>

<template>
  <div class="cart-page min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Shopping Cart</h1>

      <div v-if="isEmpty" class="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm flex flex-col items-center">
        <div class="w-24 h-24 bg-orange-50 text-coral-500 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag class="w-12 h-12" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p class="text-gray-500 mb-8 max-w-md">Looks like you haven't added any premium fishing gear to your cart yet.</p>
        <router-link to="/shop" class="bg-coral-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-coral-500/30 hover:bg-coral-600 transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center">
          Start Shopping <ArrowRight class="w-5 h-5 ml-2" />
        </router-link>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Main Cart items -->
        <div class="lg:w-2/3 space-y-4">
          <div v-for="item in cartStore.items" :key="item.id" class="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 relative group transition-all hover:shadow-md">
            <button @click="cartStore.removeItem(item.id)" class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 rounded-full group-hover:bg-red-50 group-hover:text-red-500">
              <Trash2 class="w-5 h-5" />
            </button>
            <div class="w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0 border border-gray-100">
              <img :src="item.image" :alt="item.name" class="h-full object-contain mix-blend-multiply">
            </div>
            <div class="flex-1 w-full text-center sm:text-left pt-2 sm:pt-0">
              <div class="text-xs font-bold text-coral-500 uppercase tracking-widest mb-1">{{ item.category }}</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2 truncate pr-8">{{ item.name }}</h3>
              <p class="text-2xl font-extrabold text-gray-900 mb-4">₱{{ item.price.toFixed(2) }}</p>
              
              <div class="flex items-center justify-center sm:justify-start">
                <div class="flex items-center border border-gray-200 rounded-lg p-1 bg-white inline-flex w-32 justify-between">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="p-2 text-gray-500 hover:text-black transition-colors bg-gray-50 rounded-md"><Minus class="w-4 h-4" /></button>
                  <span class="font-extrabold text-gray-900 px-2">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="p-2 text-gray-500 hover:text-black transition-colors bg-gray-50 rounded-md"><Plus class="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 lg:p-8 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div class="space-y-4 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal ({{ cartStore.totalItemsCount }} items)</span>
                <span class="font-bold text-gray-900">₱{{ cartStore.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span class="text-green-600 font-bold">Free</span>
              </div>
            </div>
            <div class="border-t border-gray-100 pt-4 mb-8">
              <div class="flex justify-between items-center">
                <span class="text-lg font-bold text-gray-900">Total</span>
                <span class="text-3xl font-extrabold text-coral-500">₱{{ cartStore.total.toFixed(2) }}</span>
              </div>
            </div>
            <router-link to="/checkout" class="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-coral-500/30 transition-all flex items-center justify-center hover:scale-[1.02] active:scale-95 text-lg">
              Proceed to Checkout
            </router-link>
            <div class="mt-4 text-center">
              <router-link to="/shop" class="text-gray-500 hover:text-coral-500 text-sm font-medium inline-flex items-center transition-colors">
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
