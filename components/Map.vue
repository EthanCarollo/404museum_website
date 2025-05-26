<template>
    <TresGroup
        :position="props.position"
        :rotation="rotationRadians"
        @click="props.handleClick"
        ref="groupRef"
    >
        <!-- Your GLTF Model -->
        <primitive :object="gltf.scene" />
    </TresGroup>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { markRaw } from "vue";
import { useLoader } from "@tresjs/core";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// Props
const props = defineProps({
    position: { type: Array, default: () => [0, 0, 0] },
    rotation: { type: Array, default: () => [0, 0, 0] },
    handleClick: {
        type: Function,
        default: () => {
            console.log("hello world");
        },
    },
    objectUrl: { type: String, required: true },
});

// Load GLTF
const { scene, nodes, materials } = await useLoader(
    GLTFLoader,
    props.objectUrl,
    (loader) => {
        const dracoLoader = new DRACOLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        dracoLoader.setDecoderPath(
            "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
        );
        loader.setDRACOLoader(dracoLoader);
    }
);
const gltf = { scene, nodes, materials };

// Refs
const groupRef = ref(null);

// Rotation in radians
const rotationRadians = computed(() => {
    const [x, y, z] = props.rotation;
    return [
        THREE.MathUtils.degToRad(x),
        THREE.MathUtils.degToRad(y),
        THREE.MathUtils.degToRad(z),
    ];
});

// On mounted: add the raw scene to the group
onMounted(() => {
    const rawScene = markRaw(gltf.scene);
    groupRef.value.add(rawScene);
});
</script>