<script setup>
import { MessageCircle, X, Send, User, Bot } from 'lucide-vue-next'
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const inputMessage = ref('')
const messages = ref([
  { id: 1, text: "Hello! Welcome to Kenny's Tackle Shop 🎣. How can I help you catch your next big fish today?", sender: 'bot' }
])
const messageContainer = ref(null)

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    scrollToBottom()
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  // Add user message
  messages.value.push({ id: Date.now(), text: inputMessage.value, sender: 'user' })
  const userText = inputMessage.value.toLowerCase()
  inputMessage.value = ''

  await scrollToBottom()

  // Simulate bot typing and response
  setTimeout(async () => {
    let botReply = "I'm sorry, I'm just a simple bot. But our team would love to help you! Please visit our Contact Us page or call us."
    
    if (userText.includes('shipping') || userText.includes('delivery')) {
      botReply = "We offer nationwide shipping across the Philippines! Cash on Delivery (COD) is also available for your convenience."
    } else if (userText.includes('return') || userText.includes('refund')) {
      botReply = "We have a strictly 7-day return policy for unused items in their original packaging with receipt."
    } else if (userText.includes('fish') || userText.includes('rod') || userText.includes('reel') || userText.includes('gear')) {
      botReply = "Looking for gear? Check out our Shop page! We have top brands for Jigging, Casting, and all setups you need."
    } else if (userText.includes('promo') || userText.includes('discount')) {
      botReply = "We currently have promo codes like 'CEBU10'! Apply them on the checkout page for some awesome discounts!"
    } else if (userText.includes('payment') || userText.includes('pay')) {
      botReply = "We accept Visa, MasterCard, BPI, BDO, PayPal, GCash, and Cash on Delivery."
    } else if (userText.includes('hi') || userText.includes('hello')) {
      botReply = "Hi there! Feel free to ask me anything about our products, shipping, or payment options."
    }
    
    messages.value.push({ id: Date.now(), text: botReply, sender: 'bot' })
    await scrollToBottom()
  }, 800)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
    <!-- Chat Window -->
    <transition
      enter-active-class="transition duration-300 ease-out origin-bottom-right"
      enter-from-class="transform scale-0 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in origin-bottom-right"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-50 opacity-0"
    >
      <div v-if="isOpen" class="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] w-[320px] sm:w-[360px] h-[480px] flex flex-col mb-4 overflow-hidden border border-gray-100">
        <!-- Header -->
        <div class="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 text-white p-4 flex justify-between items-center shadow-sm">
          <div class="flex items-center space-x-3">
            <div class="relative flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
              <Bot class="w-5 h-5 text-white" />
              <div class="absolute bottom-0 pt-0.5 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-blue-500 rounded-full"></div>
            </div>
            <div>
              <h3 class="font-bold text-sm tracking-wide">TackleBot</h3>
              <p class="text-[10px] text-blue-100 font-medium tracking-wider uppercase">Online support</p>
            </div>
          </div>
          <button @click="toggleChat" class="text-white/80 hover:text-white transition-colors hover:rotate-90 duration-200">
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Messages Area -->
        <div ref="messageContainer" class="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50 scroll-smooth">
          <div 
            v-for="msg in messages" 
            :key="msg.id" 
            class="flex items-end space-x-2"
            :class="msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''"
          >
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors text-white"
              :class="msg.sender === 'user' ? 'bg-coral-500' : 'bg-gradient-to-br from-blue-800 to-blue-700'"
            >
              <User v-if="msg.sender === 'user'" class="w-4 h-4" />
              <Bot v-else class="w-4 h-4" />
            </div>
            <div 
              class="max-w-[75%] px-4 py-2 text-[13px] leading-relaxed shadow-sm"
              :class="msg.sender === 'user' ? 'bg-coral-500 text-white rounded-2xl rounded-br-sm' : 'bg-white text-gray-700 rounded-2xl rounded-bl-sm border border-gray-100'"
            >
              {{ msg.text }}
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <form @submit.prevent="sendMessage" class="flex items-center space-x-2">
            <input 
              v-model="inputMessage" 
              type="text" 
              placeholder="Ask me anything..." 
              class="flex-grow bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-full px-4 py-2.5 text-sm outline-none transition-all placeholder:text-gray-400"
            >
            <button 
              type="submit" 
              :disabled="!inputMessage.trim()"
              class="bg-coral-500 text-white rounded-full p-2.5 h-10 w-10 flex items-center justify-center shrink-0 hover:bg-coral-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-coral-500/30"
            >
              <Send class="w-4 h-4 translate-x-px translate-y-px" />
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Floating Toggle Button -->
    <button 
      @click="toggleChat" 
      class="bg-coral-500 hover:bg-coral-600 text-white p-2 rounded-full shadow-xl shadow-coral-500/30 transition-transform transform hover:scale-110 active:scale-95 focus:outline-none flex items-center justify-center relative group"
    >
      <transition name="fade" mode="out-in">
        <MessageCircle v-if="!isOpen" class="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform" />
        <X v-else class="w-6 h-6" />
      </transition>
      
      <!-- Notification Badge -->
      <span v-if="!isOpen" class="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-ping"></span>
      <span v-if="!isOpen" class="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
    </button>
  </div>
</template>

<style scoped>
/* Custom scrollbar for chat area */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.8);
}
</style>
