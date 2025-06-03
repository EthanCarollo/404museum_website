<template>
  <div class="relative">
    <!-- Scène 3D épinglée pendant la première partie -->
    <div class="sticky top-0 h-screen">
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
          class="w-full h-full"
      />
    </div>

    <!-- Marge de défilement avant l’apparition -->
    <div class="h-[150vh]"></div>

    <!-- Content dans le flux, animé -->
    <section
        class="transition-all duration-700"
        :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
    >
      <Content />
    </section>

    <!-- Optionnel : encore du contenu dessous -->
    <div class="h-[150vh]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
useSeoMeta({
  title: '404Museum - Site',
  ogTitle: '404Museum - Site',
  description: '404Museum est une solution immersive pour les musées, combinant 3D et interactivité.',
  ogDescription: 'Découvrez le site vitrine de 404Museum, une solution numérique pour musées modernes.',
})

const showContent = ref(false);
const handleScroll = () => {
  showContent.value = window.scrollY > window.innerHeight * 1.5;
};
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
