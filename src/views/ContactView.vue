<script setup>
import { ref } from 'vue'
import { MapPin, Phone, Mail, Clock } from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  alert('Thanks for your message! This is a demo so no actual email is sent.')
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<template>
  <div class="contact-page min-h-screen bg-gray-50 pb-24">
    <!-- Header -->
    <div class="bg-gray-900 text-white py-24 text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
      <div class="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
      <div class="relative z-10">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">Contact Us</h1>
        <p class="text-lg md:text-xl font-light max-w-2xl mx-auto text-gray-300 px-4">
          Have a question? We're here to help. Reach out to our team of fishing experts.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[40px] relative z-20">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Contact Form -->
        <div class="w-full lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Send us a message</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input v-model="form.name" type="text" required class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900">
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input v-model="form.email" type="email" required class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900">
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <input v-model="form.subject" type="text" required class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900">
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea v-model="form.message" rows="6" required class="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900"></textarea>
            </div>
            <button type="submit" class="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-transform active:scale-95 text-lg">
              Send Message
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="w-full lg:w-1/3 flex flex-col gap-6">
          <div class="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_-12px_rgba(37,99,235,0.3)] h-full relative overflow-hidden">
            <div class="absolute flex justify-center items-center w-64 h-64 bg-blue-500 rounded-full blur-[80px] -top-20 -right-20 opacity-50"></div>
            
            <h3 class="text-2xl font-bold mb-10 tracking-tight relative z-10">Contact Information</h3>
            <div class="space-y-8 relative z-10">
              <div class="flex items-start">
                <div class="p-3 bg-blue-500/30 rounded-xl mr-4 shrink-0 backdrop-blur-sm">
                  <MapPin class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-blue-100 mb-1">Our Store</h4>
                  <p class="text-white font-medium leading-relaxed">123 Ocean Drive, Coastal Mall<br/>Cebu City, Philippines 6000</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="p-3 bg-blue-500/30 rounded-xl mr-4 shrink-0 backdrop-blur-sm">
                  <Phone class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-blue-100 mb-1">Phone</h4>
                  <p class="text-white font-medium leading-relaxed">+63 32 123 4567<br/>+63 917 123 4567</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="p-3 bg-blue-500/30 rounded-xl mr-4 shrink-0 backdrop-blur-sm">
                  <Mail class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-blue-100 mb-1">Email</h4>
                  <p class="text-white font-medium leading-relaxed max-w-full break-all">support@cebutackleshop.com</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="p-3 bg-blue-500/30 rounded-xl mr-4 shrink-0 backdrop-blur-sm">
                  <Clock class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-blue-100 mb-1">Store Hours</h4>
                  <p class="text-white font-medium leading-relaxed">Mon-Fri: 9am - 8pm<br/>Sat-Sun: 8am - 6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Google Map -->
      <div class="mt-12 bg-white rounded-3xl p-3 shadow-xl border border-gray-100 h-[450px] overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.5701348460893!2d123.97450567354606!3d10.376214266451257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9bd4cf481250b%3A0x871b5901b0beac61!2sAnami%20Homes%20North!5e0!3m2!1sen!2sph!4v1775173242885!5m2!1sen!2sph" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </div>
</template>
