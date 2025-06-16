<template>
    <div class="relative">
        <div class="fixed top-0 h-[100lvh] overflow-y-hidden z-0">
            <Scene
                mapPath="/3d/scenev2.glb"
                :camera-position-start="new THREE.Vector3(0.4, 1.4, -0.9)"
                :camera-position-end="new THREE.Vector3(0, 1.3, 0.3)"
                :camera-target="new THREE.Vector3(0.3, 1.1, 1)"
                :camera-target-end="new THREE.Vector3(0, 1.3, 1)"
                :cameraFovStart="40"
                :cameraFovMiddle="80"
                :cameraFovEnd="70"
                :rect-position="new THREE.Vector3(0.002, 1.32, 0.5)"
                :rect-color="0xffffff"
                :rect-intensity="1"
                :rect-pulse-speed="1.5"
                :bloom-strength="1"
                :bloom-threshold="0.8"
                :rect-width="0.23"
                :rect-height="0.18"
                :max-scale="2"
                @loading-progress="loadingProgress"
                class="w-full h-full canvas-container"
            />
        </div>
    </div>
    <div class="z-10">
        <HeaderMuseum />
    </div>
    <div class="h-[2000vh]"></div>
</template>

<script setup>

import * as THREE from "three";
</script>
