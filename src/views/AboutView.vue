<script setup>
</script>

<template>
  <div class="about-page pt-35 min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-gray-900 text-white py-24 text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
      <div class="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
      <div class="relative z-10">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">About Kenny's Tackle Shop</h1>
        <p class="text-lg md:text-xl font-light max-w-2xl mx-auto text-gray-300 px-4">
          Your premier destination for high-quality fishing gear, connecting generation of anglers in Dipolog.
        </p>
      </div>
    </div>

    <!-- Mission -->
    <div class="max-w-4xl mx-auto px-4 py-20 text-center">
      <div class="w-16 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
      <h2 class="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Our Mission</h2>
      <p class="text-2xl text-gray-600 leading-relaxed font-serif italic text-blue-900/80">
        "To provide anglers of all skill levels with the finest, most reliable fishing tackle, enabling memorable experiences and the thrill of the catch on every single trip."
      </p>
    </div>

    <!-- Story Split Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-32">
      <div class="flex flex-col lg:flex-row gap-16 items-center">
        <div class="w-full lg:w-1/2">
          <h3 class="text-3xl font-bold text-gray-900 mb-6 tracking-tight">Our Story</h3>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            Founded in 2018 in the heart of Dipolog, we started as a small, passionate group of local anglers who struggled to find premium saltwater gear locally. 
            We decided to turn our passion into a business, bringing world-class brands like Shimano, Daiwa, and Penn closer to home.
          </p>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            Today, Kenny's Tackle Shop is the leading provider of advanced jigging, casting, and trolling equipment in the region. 
            From outfitting tournament pros to helping beginners tie their first knot, our expert staff is here to ensure you are geared up for absolute success.
          </p>
          <div>
            <router-link to="/shop" class="inline-flex items-center justify-center bg-coral-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-coral-600 transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95 group">
              Browse Our Gear
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </router-link>
          </div>
        </div>
        <div class="w-full lg:w-1/2 relative">
          <div class="absolute inset-0 bg-blue-600 rounded-3xl transform translate-x-4 translate-y-4 opacity-10"></div>
          <img src="/images/hero.png" alt="Fishing Team" class="relative rounded-3xl shadow-2xl h-[400px] lg:h-[500px] w-full object-cover">
        </div>
      </div>
    </div>
  </div>
</template>
