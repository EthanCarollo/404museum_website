<template>
  <div class="relative">
    <!-- Scène 3D épinglée pendant la première partie -->
    <div class="fixed top-0 h-screen-safe">
      <Scene
          mapPath="/3d/mainmenu.glb"
          :camera-position-start="new THREE.Vector3(0, 1.4, -0.5)"
          :camera-position-end="new THREE.Vector3(0, 1.3, 0.3)"
          :camera-target="new THREE.Vector3(0, 1.3, 1)"
          :cameraFovStart="80"
          :cameraFovMiddle="120"
          :cameraFovEnd="70"
          :rect-position="new THREE.Vector3(0.002, 1.32, 0.5)"
          :rect-color="0xffffff"
          :rect-intensity="1"
          :rect-pulse-speed="1.5"
          :bloom-strength="1"
          :bloom-threshold="0.5"
          :rect-width="0.23"
          :rect-height="0.18"
          :max-scale="2"
          @loading-progress="loadingProgress"
          class="w-full h-full canvas-container"
      />
    </div>

    <!-- Indicateur de scroll -->
    <ScrollHint />

    <!-- Marge de défilement avant l'apparition -->

    <!-- Content dans le flux, animé -->
    <section
        class="transition-all duration-700"
        :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <Content />
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import ScrollHint from '~/components/ScrollHint.vue';

useSeoMeta({
  title: '404Museum - Site',
  ogTitle: '404Museum - Site',
  description: '404Museum est une solution immersive pour les musées, combinant 3D et interactivité.',
  ogDescription: 'Découvrez le site vitrine de 404Museum, une solution numérique pour musées modernes.',
})

const showContent = ref(false);

// Fonction pour calculer la vraie hauteur de viewport
const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const handleScroll = () => {
  showContent.value = window.scrollY > window.innerHeight * 1.5;
};

const handleResize = () => {
  updateViewportHeight();
};

const loadingProgress = (progress) => {
  console.warn(progress)
}

onMounted(() => {
  // Initialiser la hauteur du viewport
  updateViewportHeight();

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', handleResize, { passive: true });

  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('orientationchange', handleResize);
});
</script>

<style scoped>
/* Hauteur personnalisée qui utilise la vraie hauteur du viewport */
.h-screen-safe {
  height: 100vh; /* Fallback */
  height: calc(var(--vh, 1vh) * 100);
}

/* S'assurer que le canvas prend toute la place */
.canvas-container {
  position: relative;
  overflow: hidden;
}

.canvas-container :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block;
  touch-action: none; /* Empêche les gestes tactiles par défaut */
}

/* Fix pour iOS Safari */
@supports (-webkit-touch-callout: none) {
  .h-screen-safe {
    height: -webkit-fill-available;
    min-height: 100vh;
  }
}

/* Fix pour les anciens navigateurs mobiles */
@media screen and (max-height: 500px) {
  .h-screen-safe {
    min-height: 100vh;
    height: 100vh;
  }
}
</style>