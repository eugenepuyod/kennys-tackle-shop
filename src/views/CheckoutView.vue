<script setup>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Tag, ShieldCheck, CheckCircle2 } from 'lucide-vue-next'

const cartStore = useCartStore()
const router = useRouter()

const promoInput = ref('')
const promoMessage = ref('')
const promoType = ref('') // 'success' or 'error'

const applyPromo = () => {
  if (!promoInput.value.trim()) return
  
  if (cartStore.applyPromo(promoInput.value)) {
    promoMessage.value = `Promo code '${promoInput.value}' applied successfully!`
    promoType.value = 'success'
  } else {
    promoMessage.value = 'Invalid promo code.'
    promoType.value = 'error'
  }
}

// const paymentMethods = [
//   'Visa Card', 'MasterCard', 'BPI', 'BDO', 'PayPal', 'GCash', 'Cash on Delivery'
// ]

const paymentMethods = [
  { id: 'Visa Card', icon: '/images/visa.png' },
  { id: 'MasterCard', icon: '/images/mastercard.png' },
  { id: 'BDO', icon: '/images/bdo.png' },
  { id: 'BPI', icon: '/images/bpi.png' },
  { id: 'PayPal', icon: '/images/paypal.png' },
  { id: 'GCash', icon: '/images/gcash.png' },
  { id: 'Cash on Delivery', icon: '/images/cod.png' },
  
]
const selectedPayment = ref('Visa Card')

const user = ref({
  fullName: '',
  address: '',
  city: '',
  phone: ''
})

const isProcessing = ref(false)
const orderComplete = ref(false)

const placeOrder = () => {
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    orderComplete.value = true
    cartStore.clearCart()
  }, 2000)
}
</script>

<template>
  <div class="checkout-page min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      
      <div v-if="orderComplete" class="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-lg max-w-2xl mx-auto flex flex-col items-center transform transition-all">
        <div class="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle2 class="w-16 h-16" />
        </div>
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Order Successful!</h1>
        <p class="text-xl text-gray-500 mb-8 leading-relaxed">Thank you for shopping with Cebu Tackle Shop. Your premium gear is getting ready to ship.</p>
        <p class="text-sm text-gray-400 mb-8 bg-gray-50 py-3 px-6 rounded-lg inline-block border border-gray-100">Order Reference: #{{ Math.floor(Math.random() * 1000000) }}</p>
        <div class="w-full">
          <router-link to="/" class="inline-flex bg-coral-500 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-coral-500/30 hover:bg-coral-600 transition-all hover:scale-[1.02] active:scale-95 text-lg">
            Back to Home
          </router-link>
        </div>
      </div>

      <div v-else-if="cartStore.items.length === 0 && !orderComplete" class="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <router-link to="/shop" class="text-coral-500 hover:underline font-medium text-lg">Continue Shopping</router-link>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- Left Column: Shipping & Payment -->
        <div class="w-full lg:w-2/3 space-y-8">
          
          <div class="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-10">
            <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span class="w-8 h-8 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center mr-3 font-extrabold shadow-md shadow-coral-500/20">1</span>
              Shipping Details
            </h2>
            <form class="space-y-6">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input v-model="user.fullName" type="text" class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all text-gray-900" placeholder="John Doe">
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input v-model="user.phone" type="tel" class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all text-gray-900" placeholder="+63 9xx xxx xxxx">
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">City</label>
                  <input v-model="user.city" type="text" class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all text-gray-900" placeholder="Cebu City">
                </div>
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Complete Address</label>
                <textarea v-model="user.address" rows="3" class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all resize-none text-gray-900" placeholder="Street, Barangay, Building, Door No."></textarea>
              </div>
            </form>
          </div>

          <div class="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 sm:p-10">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                <span class="w-8 h-8 rounded-full bg-coral-500 text-white text-sm flex items-center justify-center mr-3 font-extrabold shadow-md shadow-coral-500/20">2</span>
                Payment Method
              </h2>
              <div class="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 hidden sm:flex">
                <ShieldCheck class="w-4 h-4 mr-1" /> Secure Checkout
              </div>
            </div>
            
            

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  v-for="method in paymentMethods" 
                  :key="method.id"
                  @click="selectedPayment = method.id"
                  :class="[
                    'border-2 rounded-xl p-2 cursor-pointer text-center transition-all',
                    selectedPayment === method.id 
                      ? 'border-coral-500 bg-coral-50 shadow-md ring-1 ring-coral-500' 
                      : 'border-slate-200 hover:border-coral-300 hover:bg-slate-50'
                  ]"
                >
                  <!-- <div class="text-2xl mb-2">{{ method.icon }}</div>
                  <div class="font-semibold text-sm">{{ method.id }}</div> -->
                <img 
                  :src="method.icon" 
                  :alt="method.id"
                  class="w-20 h-20 object-contain mx-auto"
                />
                </div>
              </div>
            
            <!-- Dynamic Payment Forms -->
            <transition name="fade" mode="out-in">
              <div :key="selectedPayment" class="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <!-- Credit Cards (Visa, MasterCard) -->
                <div v-if="['Visa Card', 'MasterCard'].includes(selectedPayment)">
                  <h3 class="text-sm font-bold text-gray-900 mb-4">Credit Card Details</h3>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-xs font-bold text-gray-700 mb-1.5">Card Number</label>
                      <input type="text" placeholder="XXXX XXXX XXXX XXXX" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all font-mono">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all font-mono">
                      </div>
                      <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1.5">CVC</label>
                        <input type="text" placeholder="123" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all font-mono">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- GCash -->
                <div v-else-if="selectedPayment === 'GCash'">
                  <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center">
                    <span class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 text-xs font-bold">G</span>
                    GCash Mobile Number
                  </h3>
                  <input type="tel" placeholder="09XX XXX XXXX" class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none transition-all font-mono">
                  <p class="text-xs text-gray-500 mt-2">You will receive an OTP confirmation via SMS shortly after placing the order.</p>
                </div>

                <!-- PayPal -->
                <div v-else-if="selectedPayment === 'PayPal'">
                  <div class="text-center py-4">
                    <div class="w-12 h-12 bg-blue-100 text-blue-800 font-extrabold text-2xl rounded-full flex items-center justify-center mx-auto mb-3 italic">P</div>
                    <p class="text-sm text-gray-700 font-medium mb-1">Proceed to PayPal Login</p>
                    <p class="text-xs text-gray-500">You will be securely redirected to PayPal to authorize the payment after clicking Pay.</p>
                  </div>
                </div>

                <!-- Bank Transfers (BPI, BDO) -->
                <div v-else-if="['BPI', 'BDO'].includes(selectedPayment)">
                  <h3 class="text-sm font-bold text-gray-900 mb-4">{{ selectedPayment }} Online Banking</h3>
                  <div class="text-center py-4 bg-white rounded-xl border border-gray-200">
                    <p class="text-sm text-gray-700 font-medium mb-1">Secure Login Portal</p>
                    <p class="text-xs text-gray-500">You will securely login to your {{ selectedPayment }} account upon confirming the order.</p>
                  </div>
                </div>

                <!-- Cash on Delivery -->
                <div v-else-if="selectedPayment === 'Cash on Delivery'">
                  <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      <span class="text-sm font-bold">₱</span>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-gray-900 mb-1">Pay with Cash</h3>
                      <p class="text-xs text-gray-600 leading-relaxed">Have your exact amount ready. The courier will collect the payment when delivering your premium gear directly to your door.</p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Right Column: Order Summary -->
        <div class="w-full lg:w-1/3">
          <div class="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 sticky top-24">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <!-- Items -->
            <div class="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between gap-4">
                <div class="flex items-start pt-4">
                  <div class="relative w-16 h-16 bg-gray-50 rounded-lg shrink-0 border border-gray-100 mr-3">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain mix-blend-multiply p-1">
                    <span class="absolute -top-2 -right-2 bg-gray-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">{{ item.quantity }}</span>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-900 leading-tight mb-1">{{ item.name }}</h4>
                    <p class="text-xs text-coral-500 font-bold uppercase">{{ item.category }}</p>
                  </div>
                </div>
                <div class="font-extrabold text-gray-900 text-sm whitespace-nowrap">
                  ₱{{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Promo Code -->
            <div class="mb-6 border-y border-gray-100 py-6">
              <div class="flex items-center gap-2 mb-3">
                <Tag class="w-4 h-4 text-gray-400" />
                <span class="text-sm font-bold text-gray-900">Promo Code</span>
              </div>
              <div id="flexwrapcoupon" class="eugenerp flex flex-col sm:flex-row gap-2">
                <input v-model="promoInput" type="text" class="flex-1 min-w-0 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-coral-500 outline-none font-mono uppercase text-gray-900 tracking-wider" placeholder="Ex: CEBU10">
                <button @click="applyPromo" class="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-brand-600 transition-colors shadow-sm text-sm">Apply</button>
              </div>
              <p v-if="promoMessage" class="text-xs font-bold mt-3" :class="promoType === 'success' ? 'text-green-600' : 'text-red-500'">
                {{ promoMessage }}
              </p>
            </div>

            <!-- Totals -->
            <div class="space-y-4 mb-8">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span class="font-bold text-gray-900">₱{{ cartStore.subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span class="text-green-600 font-bold">Free</span>
              </div>
              <div v-if="cartStore.discountAmount > 0" class="flex justify-between text-green-600 bg-green-50 -mx-4 px-4 py-3 rounded-lg border border-green-100">
                <span class="font-bold">Discount ({{ cartStore.discountRate * 100 }}%)</span>
                <span class="font-bold">-₱{{ cartStore.discountAmount.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center border-t border-gray-100 pt-5">
                <span class="text-lg font-bold text-gray-900">Total</span>
                <span class="text-3xl font-extrabold text-coral-500">₱{{ cartStore.total.toFixed(2) }}</span>
              </div>
            </div>

            <button 
              @click="placeOrder" 
              :disabled="isProcessing || cartStore.items.length === 0"
              class="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-coral-500/30 transition-all hover:scale-[1.02] active:scale-95 text-lg flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none relative overflow-hidden group"
            >
              <div class="absolute inset-0 bg-white/20 w-full transform -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-12"></div>
              <svg v-if="isProcessing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isProcessing ? 'Processing Order...' : `Pay via ${selectedPayment}` }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
</style>
