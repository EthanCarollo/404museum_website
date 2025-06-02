<template>
  <div class="h-[300vh]">

  </div>
   <Scene mapPath="/3d/mainmenu.glb"
          :camera-position-start="new THREE.Vector3(0, 1.5, -0.5)"
          :camera-position-end="new THREE.Vector3(0, 1.3, 0.3)"
          :camera-target="new THREE.Vector3(0, 1.3, 1)"
   />
</template>

<script setup lang="ts">
import * as THREE from "three";
</script>