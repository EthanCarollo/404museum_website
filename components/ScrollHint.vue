<template>
  <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
  >
    <div
        v-if="showHint"
        class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
    >
      <div class="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200">
        <div class="flex items-center gap-3 text-gray-700">
          <span class="text-sm font-medium">Faites défiler pour découvrir</span>
          <div class="animate-bounce">
            <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showHint = ref(false);
let inactivityTimer: NodeJS.Timeout | null = null;
let lastScrollTime = Date.now();

const INACTIVITY_DELAY = 3000; // 3 secondes d'inactivité
const SCROLL_THRESHOLD = 0.5; // 50% de la page

const checkScrollPosition = () => {
  const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  return scrollPercentage < SCROLL_THRESHOLD;
};

const startInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }

  inactivityTimer = setTimeout(() => {
    if (checkScrollPosition()) {
      showHint.value = true;
      setTimeout(() => {
        showHint.value = false;
      }, 2500);
    }
  }, INACTIVITY_DELAY);
};

const handleScroll = () => {
  lastScrollTime = Date.now();
  showHint.value = false;

  // Redémarrer le timer d'inactivité
  startInactivityTimer();
};

const handleMouseMove = () => {
  // Considérer le mouvement de souris comme une activité
  lastScrollTime = Date.now();
  startInactivityTimer();
};

onMounted(() => {
  // Démarrer le timer initial
  startInactivityTimer();

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
});

onUnmounted(() => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }

  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>