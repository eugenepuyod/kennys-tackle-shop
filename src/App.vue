<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'
import FloatingChatbot from './components/FloatingChatbot.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col font-sans text-gray-900 selection:bg-blue-600 selection:text-white bg-white">
    <AppNavbar />
    
    <main class="flex-grow pt-[70px] md:pt-[44px]">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <AppFooter />
    <FloatingChatbot />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
