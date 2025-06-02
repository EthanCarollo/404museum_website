<template>
  <div ref="threeScene" class="three-scene" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

// Props
const props = defineProps({
  mapPath: { type: String, default: '/3d/map.glb' },
  cameraTarget: { type: Object, default: () => new THREE.Vector3(0, 1.6, 0) },
  cameraPositionStart: { type: Object, default: () => new THREE.Vector3(0, 1.6, 10) },
  cameraPositionEnd: { type: Object, default: () => new THREE.Vector3(0, 1.6, 2) },
});

const threeScene = ref(null);
let scene, camera, renderer, composer;
const clock = new THREE.Clock();
let animateId = null;
let scrollProgress = 0;

// Scroll to camera interpolation
function updateScrollProgress() {
  const maxScroll = window.innerHeight * 1.5;
  scrollProgress = Math.min(window.scrollY / maxScroll, 1);
}

// Smooth camera lookAt
function lerpLookAt(current, target, alpha = 0.1) {
  const dir = new THREE.Vector3().subVectors(target, current.position).normalize();
  const currentDir = camera.getWorldDirection(new THREE.Vector3());
  currentDir.lerp(dir, alpha).normalize();
  const newTarget = new THREE.Vector3().copy(current.position).add(currentDir);
  camera.lookAt(newTarget);
}

function initThreeJS() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111); // dark background for cinematic feel

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(props.cameraPositionStart);

  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  threeScene.value.appendChild(renderer.domElement);

  // Soft lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  hemiLight.position.set(0, 20, -5);
  scene.add(hemiLight);

  // Load model
  const loader = new GLTFLoader();
  loader.load(
      props.mapPath,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(gltf.scene);
      },
      undefined,
      (err) => console.error('GLB Load Error:', err)
  );

  // Post-processing
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.6, 0.4, 0.1);

  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', updateScrollProgress);

  animate();
}

function animate() {
  animateId = requestAnimationFrame(animate);
  updateScrollProgress();

  // Camera movement
  camera.position.lerpVectors(
      props.cameraPositionStart,
      props.cameraPositionEnd,
      scrollProgress
  );

  // Optional breathing effect
  const elapsed = clock.getElapsedTime();
  camera.position.y += Math.sin(elapsed * 0.5) * 0.01;

  lerpLookAt(camera, props.cameraTarget, 0.1);

  // Use composer instead of renderer directly
  composer.render();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
}

onMounted(() => {
  initThreeJS();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animateId);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', updateScrollProgress);
});
</script>

<style scoped>
.three-scene {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}
</style>
