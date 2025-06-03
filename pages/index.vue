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
          :rect-position="new THREE.Vector3(0.002, 1.32, 0.5)"
          :rect-color="0xffffff"
          :rect-intensity="1"
          :rect-pulse-speed="1.5"
          :bloom-strength="1"
          :bloom-threshold="0.5"
          :rect-width="0.23"
          :rect-height="0.18"
          :max-scale="2"
   />
</template>

<script setup lang="ts">
import * as THREE from "three";
</script>
