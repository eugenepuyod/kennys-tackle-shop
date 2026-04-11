<script setup>
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, ShieldCheck } from 'lucide-vue-next'
</script>

<template>
  <footer class="relative text-white pt-16 pb-8 border-t-[8px] border-coral-500 bg-gray-900 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <img src="/images/deep_ocean_footer.png" alt="Ocean Background" class="w-full h-full object-cover opacity-80" />
      <!-- <img src="/images/deep_ocean_footer.png" alt="Ocean Background" class="w-full h-full object-cover opacity-80" /> -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#1e3a8a]/80 to-[#1e3a8a]/60"></div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Newsletter Section -->
      <div class="bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 mb-16 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="md:w-1/2">
          <h3 class="text-3xl font-extrabold text-white mb-3 tracking-tight">Join the Inner Circle</h3>
          <p class="text-gray-300 text-lg font-light">Subscribe to get exclusive deals, new arrivals, and pro fishing tips delivered straight to your inbox.</p>
        </div>
        <div class="md:w-1/2 w-full">
          <form @submit.prevent class="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Your email address..." class="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-coral-500 outline-none transition-all text-white placeholder-gray-400">
            <button class="bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-coral-500/30 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
          <p class="text-xs text-gray-400 mt-3 flex items-center">
            We promise not to spam you. Cancel anytime.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand Info -->
        <div>
          <h3 class="text-2xl font-bold text-white mb-6 tracking-tight">Cebu Tackle<span class="text-coral-500">Shop</span></h3>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            Your premier destination for high-quality fishing gear, setups, and accessories in Cebu. We gear you up for your best catch.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-coral-500 hover:text-white transition-all transform hover:-translate-y-1">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-coral-500 hover:text-white transition-all transform hover:-translate-y-1">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-coral-500 hover:text-white transition-all transform hover:-translate-y-1">
              <Instagram class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold text-gray-100 mb-6">Quick Links</h4>
          <ul class="space-y-3">
            <li v-for="link in ['Home', 'Shop', 'About', 'Contact', 'Cart', 'Checkout']" :key="link">
              <router-link :to="link === 'Home' ? '/' : `/${link.toLowerCase()}`" class="text-blue-100 hover:text-coral-400 transition-colors text-sm flex items-center group">
                <span class="w-1 h-1 bg-coral-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ link }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Popular Products -->
        <div>
          <h4 class="text-lg font-semibold text-gray-100 mb-6">Popular Categories</h4>
          <ul class="space-y-3">
            <li v-for="category in ['Fishing Reels', 'Fishing Rods', 'Jigging Setup', 'Lures & Jigs', 'Fishing Lines']" :key="category">
              <router-link to="/shop" class="text-blue-100 hover:text-coral-400 transition-colors text-sm flex items-center group">
                <span class="w-1 h-1 bg-coral-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {{ category }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info & Secure Checkout -->
        <div>
          <h4 class="text-lg font-semibold text-gray-100 mb-6">Contact Us</h4>
          <ul class="space-y-4 mb-8">
            <li class="flex items-start text-blue-100 text-sm group">
              <MapPin class="w-5 h-5 text-coral-500 mr-3 shrink-0 group-hover:text-coral-400 transition-colors" />
              <span>123 Ocean Drive, Cebu City,<br/>Philippines 6000</span>
            </li>
            <li class="flex items-center text-blue-100 text-sm group">
              <Phone class="w-5 h-5 text-coral-500 mr-3 shrink-0 group-hover:text-coral-400 transition-colors" />
              <span>+63 32 123 4567</span>
            </li>
            <li class="flex items-center text-blue-100 text-sm group">
              <Mail class="w-5 h-5 text-coral-500 mr-3 shrink-0 group-hover:text-coral-400 transition-colors" />
              <a href="mailto:support@cebutackleshop.com" class="hover:text-white transition-colors">support@cebutackleshop.com</a>
            </li>
          </ul>
          
          <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
            <div class="flex items-center text-green-400 mb-3">
              <ShieldCheck class="w-5 h-5 mr-2" />
              <span class="text-sm font-medium">100% Secure Checkout</span>
            </div>
            <div class="flex gap-2.5">
              <div class="w-11 h-7 bg-[white] rounded flex items-center justify-center text-[10px] font-bold border border-slate-700 text-slate-300"><img src="/images/visa.png" width="50" height="50" /></div>
              <div class="w-11 h-7 bg-[white] rounded flex items-center justify-center text-[10px] font-bold border border-slate-700 text-slate-300"><img src="/images/mastercard.png" width="50" height="50" /></div>
              <div class="w-11 h-7 bg-[white] rounded flex items-center justify-center text-[10px] font-bold border border-slate-700 text-slate-300"><img src="/images/bdo.png" width="50" height="50" /></div>
              <div class="w-11 h-7 bg-[white] rounded flex items-center justify-center text-[10px] font-bold border border-slate-700 text-slate-300"><img src="/images/bpi.png" width="50" height="50" /></div>
              <div class="w-11 h-7 bg-[white] rounded flex items-center justify-center text-[9px] font-bold border border-slate-700 text-slate-300"><img src="/images/paypal.png" width="50" height="50" /></div>
              <div class="w-11 h-7 bg-[white] rounded flex items-center justify-center text-[9px] font-bold border border-slate-700 text-slate-300"><img src="/images/gcash.png" width="50" height="50" /></div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-blue-200 text-sm mb-4 md:mb-0">
          &copy; {{ new Date().getFullYear() }} Cebu Tackle Shop. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm text-blue-200">
          <a href="#" class="hover:text-coral-400 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-coral-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
