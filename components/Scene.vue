<template>
    <div ref="threeScene" class="three-scene" @click="lockPointer" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// Props
const props = defineProps({
    flyEnabled: { type: Boolean, default: true },
    mapPath: { type: String, default: '/3d/map.glb' },
    cameraTarget: { type: Object, default: () => new THREE.Vector3(0, 1.6, 0) }
});

// Refs & State
const threeScene = ref(null);
let scene, camera, renderer, controls;
let move = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
};
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const clock = new THREE.Clock();

let animateId = null;

function lockPointer() {
    if (props.flyEnabled && controls) controls.lock();
}

// Fly controls
function setupFlyControls() {
    controls = new PointerLockControls(camera, renderer.domElement);
    scene.add(controls.getObject());

    const onKeyDown = (e) => {
        switch (e.code) {
            case 'KeyW': case 'ArrowUp': move.forward = true; break;
            case 'KeyS': case 'ArrowDown': move.backward = true; break;
            case 'KeyA': case 'ArrowLeft': move.left = true; break;
            case 'KeyD': case 'ArrowRight': move.right = true; break;
            case 'Space': move.up = true; break;
            case 'ShiftLeft': move.down = true; break;
        }
    };

    const onKeyUp = (e) => {
        switch (e.code) {
            case 'KeyW': case 'ArrowUp': move.forward = false; break;
            case 'KeyS': case 'ArrowDown': move.backward = false; break;
            case 'KeyA': case 'ArrowLeft': move.left = false; break;
            case 'KeyD': case 'ArrowRight': move.right = false; break;
            case 'Space': move.up = false; break;
            case 'ShiftLeft': move.down = false; break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    onBeforeUnmount(() => {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
    });
}

// Lerp toward target
function lerpLookAt(current, target, alpha = 0.05) {
    const dir = new THREE.Vector3().subVectors(target, current.position).normalize();
    const currentDir = camera.getWorldDirection(new THREE.Vector3());
    currentDir.lerp(dir, alpha).normalize();
    const newTarget = new THREE.Vector3().copy(current.position).add(currentDir);
    camera.lookAt(newTarget);
}

// Init Three
function initThreeJS() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeScene.value.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444));

    // Load map
    const loader = new GLTFLoader();
    loader.load(
        props.mapPath,
        (gltf) => scene.add(gltf.scene),
        undefined,
        (err) => console.error('GLB Load Error:', err)
    );

    if (props.flyEnabled) setupFlyControls();

    window.addEventListener('resize', onResize);
    animate();
}

// Animate
function animate() {
    animateId = requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;

    if (props.flyEnabled && controls) {
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;

        direction.z = Number(move.forward) - Number(move.backward);
        direction.x = Number(move.right) - Number(move.left);
        direction.y = Number(move.down) - Number(move.up);
        direction.normalize();

        if (move.forward || move.backward) velocity.z -= direction.z * 400.0 * delta;
        if (move.left || move.right) velocity.x -= direction.x * 400.0 * delta;
        if (move.up || move.down) velocity.y -= direction.y * 400.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);
        controls.getObject().position.y += velocity.y * delta;
    } else {
        // Oscillation (breathing)
        camera.position.y = 1.6 + Math.sin(elapsed * 0.5) * 0.05;
        // Smooth look at
        lerpLookAt(camera, props.cameraTarget, 0.05);
    }

    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

onMounted(() => {
    initThreeJS();
});

onBeforeUnmount(() => {
    cancelAnimationFrame(animateId);
    window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
.three-scene {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    cursor: crosshair;
}
</style>
