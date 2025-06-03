<template>
  <div class="relative">
    <!-- La scène 3D est positionnée en fixed pour être toujours visible -->
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
        class="fixed top-0 left-0 w-full h-screen z-10"
    />

    <!-- Zone de défilement pour l'animation 3D (150vh) -->
    <div class="h-[250vh] w-full">
      <!-- Cette zone reste vide pour permettre l'animation de la scène 3D -->
    </div>

    <Content />

  </div>
</template>

<script setup lang="ts">
import * as THREE from "three";

useSeoMeta({
  title: '404Museum - Site',
  ogTitle: '404Museum - Site',
  description: '404Museum est une solution immersive pour les musées, combinant 3D et interactivité.',
  ogDescription: 'Découvrez le site vitrine de 404Museum, une solution numérique pour musées modernes.',
});
</script>

<style scoped>
/* Assurez-vous que le corps de la page permet le défilement */
:global(body) {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>