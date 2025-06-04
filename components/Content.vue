<template>
  <div class="h-[180vh]"></div>
  <div
      class="fixed top-0 left-0 w-full h-full z-[-1] transition-colors duration-700 "
      :class="isBlackBgActive ? 'bg-black' : 'bg-transparent'"
  ></div>
  <div class="h-[130vh]"></div>

  <div class="relative bg-black text-white">

    <!-- Section Titre -->
    <section class="relative z-10 py-20 text-center">
      <div class="container mx-auto px-6">
        <h1 class="text-6xl md:text-8xl font-black mb-6">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient">
            404MUSEUM
          </span>
        </h1>
        <p class="text-2xl md:text-3xl text-gray-300 font-light">
          Le musée d'Internet
        </p>
      </div>
    </section>

    <!-- Section Atouts -->
    <section class="relative z-10 py-16">
      <div class="container mx-auto px-6 max-w-5xl">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Atout 1 -->
          <div class="group">
            <div class="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Expérience Immersive</h3>
              <p class="text-gray-400">
                Navigation 3D interactive dans l'histoire d'Internet
              </p>
            </div>
          </div>

          <!-- Atout 2 -->
          <div class="group">
            <div class="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Archives Vivantes</h3>
              <p class="text-gray-400">
                Collections interactives de sites et communautés mythiques
              </p>
            </div>
          </div>

          <!-- Atout 3 -->
          <div class="group">
            <div class="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold mb-3">Culture Préservée</h3>
              <p class="text-gray-400">
                Mèmes, tendances et phénomènes culturels d'Internet
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section CTA -->
    <section class="relative z-10 py-20">
      <div class="container mx-auto px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-8">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Commencez l'exploration
            </span>
          </h2>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#download"
               class="group relative px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 inline-flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span>Télécharger l'app</span>
            </a>

            <a href="#website"
               class="group relative px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 inline-flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
              <span>Visiter le site</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer minimaliste -->
    <footer class="relative z-10 py-8 border-t border-gray-800">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-500">© 2024 404Museum. Préservant la culture d'Internet.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isBlackBgActive = ref(false)

const handleScroll = () => {
  isBlackBgActive.value = window.scrollY > window.innerHeight * 1.8 // 180vh
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
/* Animation du gradient */
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}
</style>