<template>
  <div class="h-[300vh]">

  </div>
   <Scene mapPath="/3d/mainmenu.glb"
          :camera-position-start="new THREE.Vector3(0, 1.4, -0.5)"
          :camera-position-end="new THREE.Vector3(0, 1.3, 0.3)"
          :camera-target="new THREE.Vector3(0, 1.3, 1)"
          :cameraFovStart="80"
          :cameraFovMiddle="120"
          :cameraFovEnd="70"
   />
</template>

<script setup lang="ts">
import * as THREE from "three";
const { $lenis } = useNuxtApp()

</script>
