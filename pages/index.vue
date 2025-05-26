<template>
   <Scene :flyEnabled="true" mapPath="/3d/map.glb" :camera-target="new THREE.Vector3(0, 1.6, 0)"/>
</template>

<script setup lang="ts">
import * as THREE from "three";
</script>