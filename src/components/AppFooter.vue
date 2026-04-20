<script setup>
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, ShieldCheck, Truck, Award, RotateCcw, BadgePercent, Tag, } from 'lucide-vue-next'

import { onMounted } from 'vue'

const services = [
  {id: 1, icon : Truck, title: 'Free Shipping', description: 'Free ground shipping on orders over P3,000.00. Restrictions Apply.', links: ''},
  {id: 2, icon : Award, title: 'Unbeatable Service', description: "We're here to help you! Call, email or live chat.", links: ''},
  {id: 3, icon : RotateCcw, title: 'Free Returns', description: "Order with confidence. If you don't like it, return it for free!", links: ''},
  {id: 4, icon : Tag, title: 'Lowest Prices', description: 'Give us the opportunity to match or beat any posted price.', links: ''},
]



onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <section class="w-full bg-gray-100">
    <div class="max-w-7xl mx-auto px-7 pb-20 pt-10 ">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        <div 
          v-for="(service, idx) in services" 
          :key="service.id"
          class="col-span-1 flex items-first p-1 reveal reveal-slide-left"
          :style="{ transitionDelay: `${idx * 150}ms` }"
          >
          <component 
            :is="service.icon" 
            class="w-8 h-8 text-coral-500 mr-3 shrink-0" 
          />
          <div 
            :class="[
              'px-1',
              idx !== services.length - 1 ? 'border-r border-gray-200' : ''
            ]"
          >
            <h3 class="text-gray-900 text-lg font-medium">{{ service.title}}</h3>
            <p class="text-sm text-gray-500 font-light py-3">{{ service.description }}</p>
            <router-link 
              :to="service.links"
              class="inline-block bg-coral-500 hover:bg-coral-600 text-white font-bold py-2 px-5 rounded-xl shadow-lg shadow-coral-500/30 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
            >
              Learn More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="relative z-10">
  <footer class="relative text-white pt-16 pb-8 border-t-[8px] border-coral-500 bg-gray-900 overflow-hidden">
    

    <div ref="bg" class="absolute inset-0 z-0 will-change-transform">
      <img src="/images/deep_ocean_footer.png"
          class="w-full h-full object-cover opacity-80" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#1e3a8a]/60 to-[#1e3a8a]/40"></div>
    </div>

    <div class="footer-bubbles pointer-events-none">
      <span v-for="n in 15" :key="n"></span>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Newsletter Section -->
      <div class="bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 sm:p-12 mb-16 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 reveal reveal-slide-left">
        <div class="md:w-1/2">
          <h3 class="text-3xl font-extrabold text-white mb-3 tracking-tight">Join the Inner Circle</h3>
          <p class="text-gray-300 text-lg font-light">Subscribe to get exclusive deals, new arrivals, and pro fishing tips delivered straight to your inbox.</p>
        </div>
        <div class="md:w-1/2 w-full">
          <form @submit.prevent class="flex flex-col sm:flex-row flex-wrap gap-3 w-full">
            <input
              type="email"
              placeholder="Your email address..."
              class="flex-1 min-w-0 w-full sm:w-auto px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-coral-500 outline-none transition-all text-white placeholder-gray-400"
            >

            <button
              class="w-full sm:w-auto shrink-0 bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-coral-500/30 transition-all hover:scale-[1.02] active:scale-95"
            >
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
        <div class="reveal reveal-slide-left">
          <!-- <h3 class="text-2xl font-bold text-white mb-6 tracking-tight">Kenny's Tackle<span class="text-coral-500">Shop</span></h3> -->

          <div class="flex items-center gap-3 mb-6">
            <div class="relative">
              <div class="w-22 h-22 md:w-17 md:h-17 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-900/30 border border-cyan-400/20 flex items-center justify-center shadow-lg overflow-hidden">
                
                
                <div class="absolute bottom-0 w-full h-6"></div>

                <img src="/images/kennys-logo.png" class="w-18 h-18 md:w-13 md:h-13 object-contain relative z-10" />
              </div>
            </div>

            <div>
              <h3 class="text-xl font-semibold text-white">
                Kenny’s Tackle<span class="text-coral-500">Shop</span>
              </h3>
              <p class="text-xs text-gray-400">Gear up for the deep sea</p>
            </div>
          </div>

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
        <div class="reveal reveal-slide-left">
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
        <div class="reveal reveal-slide-left">
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
        <div class="reveal reveal-slide-left">
          <h4 class="text-lg font-semibold text-gray-100 mb-6">Contact Us</h4>
          <ul class="space-y-4 mb-8">
            <li class="flex items-start text-blue-100 text-sm group">
              <MapPin class="w-5 h-5 text-coral-500 mr-3 shrink-0 group-hover:text-coral-400 transition-colors" />
              <span>General Luna street corner Arellano<br/>street, Dipolog City, Philippines, 7100</span>
            </li>
            <li class="flex items-center text-blue-100 text-sm group">
              <Phone class="w-5 h-5 text-coral-500 mr-3 shrink-0 group-hover:text-coral-400 transition-colors" />
              <span>+63 32 123 4567</span>
            </li>
            <li class="flex items-center text-blue-100 text-sm group">
              <Mail class="w-5 h-5 text-coral-500 mr-3 shrink-0 group-hover:text-coral-400 transition-colors" />
              <a href="mailto:support@kennystackleshop.com" class="hover:text-white transition-colors">support@kennystackleshop.com</a>
            </li>
          </ul>
          
          <div class="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
            <div class="flex items-center text-green-400 mb-3">
              <ShieldCheck class="w-5 h-5 mr-2" />
              <span class="text-sm font-medium">100% Secure Checkout</span>
            </div>
            <div class="flex gap-2.5">
              <div class="w-11 h-7 bg-white rounded flex items-center justify-center border border-slate-700">
                <img 
                  src="/images/visa.png" 
                  alt="Visa payment method" 
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <div class="w-11 h-7 bg-white rounded flex items-center justify-center border border-slate-700">
                <img 
                  src="/images/mastercard.png" 
                  alt="Master Card payment method" 
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <div class="w-11 h-7 bg-white rounded flex items-center justify-center border border-slate-700">
                <img 
                  src="/images/bdo.png" 
                  alt="BDO payment method" 
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <div class="w-11 h-7 bg-white rounded flex items-center justify-center border border-slate-700">
                <img 
                  src="/images/bpi.png" 
                  alt="BPI payment method" 
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <div class="w-11 h-7 bg-white rounded flex items-center justify-center border border-slate-700">
                <img 
                  src="/images/paypal.png" 
                  alt="Paypal payment method" 
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <div class="w-11 h-7 bg-white rounded flex items-center justify-center border border-slate-700">
                <img 
                  src="/images/gcash.png" 
                  alt="GCash payment method" 
                  class="max-w-full max-h-full object-contain"
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center reveal reveal-slide-left">
        <p class="text-blue-200 text-sm mb-4 md:mb-0">
          &copy; {{ new Date().getFullYear() }} Kenny's Tackle Shop. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm text-blue-200">
          <a href="#" class="hover:text-coral-400 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-coral-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
  </div>
</template>

<style scoped>
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


/* bubles animation */
.footer-bubbles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 5;
}

.footer-bubbles span {
  position: absolute;
  bottom: -120px;

  width: 20px;
  height: 20px;
  border-radius: 50%;

  /* Main bubble body (transparent glass look) */
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.25) 25%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0.02) 70%,
    transparent 100%
  );

  /* subtle outer edge */
  border: 1px solid rgba(255, 255, 255, 0.15);

  /* glow + softness */
  box-shadow:
    inset -2px -4px 6px rgba(255,255,255,0.15),
    inset 2px 2px 4px rgba(255,255,255,0.25),
    0 0 6px rgba(255,255,255,0.1);

  backdrop-filter: blur(1px);

  animation: bubbleFloat 12s linear infinite;
}

.footer-bubbles span::after {
  content: "";
  position: absolute;
  top: 15%;
  left: 20%;

  width: 35%;
  height: 35%;
  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(255,255,255,0.9) 0%,
    rgba(255,255,255,0.4) 40%,
    transparent 70%
  );

  filter: blur(1px);
}

/* Random positions & sizes */
.footer-bubbles span:nth-child(1) { left: 5%; width: 10px; height: 10px; animation-duration: 10s; }
.footer-bubbles span:nth-child(2) { left: 15%; width: 18px; height: 18px; animation-duration: 14s; }
.footer-bubbles span:nth-child(3) { left: 25%; width: 12px; height: 12px; animation-duration: 11s; }
.footer-bubbles span:nth-child(4) { left: 35%; width: 25px; height: 25px; animation-duration: 16s; }
.footer-bubbles span:nth-child(5) { left: 50%; width: 14px; height: 14px; animation-duration: 9s; }
.footer-bubbles span:nth-child(6) { left: 65%; width: 20px; height: 20px; animation-duration: 13s; }
.footer-bubbles span:nth-child(7) { left: 75%; width: 16px; height: 16px; animation-duration: 12s; }
.footer-bubbles span:nth-child(8) { left: 85%; width: 22px; height: 22px; animation-duration: 15s; }
.footer-bubbles span:nth-child(9) { left: 95%; width: 12px; height: 12px; animation-duration: 10s; }

/* Add delay randomness */
.footer-bubbles span:nth-child(odd) {
  animation-delay: -5s;
}
.footer-bubbles span:nth-child(even) {
  animation-delay: -2s;
}

/* Animation */
@keyframes bubbleFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0.6;
  }
  50% {
    transform: translateY(-50vh) scale(1.2);
  }
  100% {
    transform: translateY(-100vh) scale(0.8);
    opacity: 0;
  }
}

</style>
