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
  cameraFovStart: { type: Number, default: 75 },
  cameraFovMiddle: { type: Number, default: 60 },
  cameraFovEnd: { type: Number, default: 45 },
  // Bloom settings
  bloomStrength: { type: Number, default: 1.2 },
  bloomRadius: { type: Number, default: 0.8 },
  bloomThreshold: { type: Number, default: 0.1 },
  // Shining pane props (updated)
  rectWidth: { type: Number, default: 4 }, // Larger default for pane
  rectHeight: { type: Number, default: 3 }, // Larger default for pane
  rectPosition: { type: Object, default: () => new THREE.Vector3(0, 1, -2) }, // More centered
  rectColor: { type: Number, default: 0xffffff }, // White like in the image
  rectIntensity: { type: Number, default: 1.5 },
  rectPulseSpeed: { type: Number, default: 1 }, // Slower pulse
  rectRotationSpeed: { type: Number, default: 0 }, // No rotation
  maxScale: { type: Number, default: 3 } // Maximum scale on full scroll
});

const threeScene = ref(null);
let scene, camera, renderer, composer;
let shiningRect = null;
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

// Create shining pane (instead of rectangle)
function createShiningPane() {
  const geometry = new THREE.PlaneGeometry(props.rectWidth, props.rectHeight);

  // Use MeshStandardMaterial for emissive properties
  const material = new THREE.MeshStandardMaterial({
    color: props.rectColor,
    emissive: new THREE.Color(props.rectColor),
    emissiveIntensity: props.rectIntensity,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });

  shiningRect = new THREE.Mesh(geometry, material);
  shiningRect.position.copy(props.rectPosition);

  // Fixed orientation - no initial rotation
  // Keep the pane facing the camera or at a specific angle
  shiningRect.rotation.set(0, 0, 0);

  scene.add(shiningRect);
}

function initThreeJS() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(props.cameraPositionStart);

  // Renderer
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8; // Increased for better bloom visibility
  threeScene.value.appendChild(renderer.domElement);

  // Soft lighting
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
  hemiLight.position.set(0, 20, -5);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
  dirLight.position.set(5, 10, -27.5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 50;
  scene.add(dirLight);

  // Create shining pane
  createShiningPane();

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

  // Enhanced Post-processing with bloom
  const renderPass = new RenderPass(scene, camera);

  // Enhanced bloom pass with props
  const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      props.bloomStrength,
      props.bloomRadius,
      props.bloomThreshold
  );

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

  const elapsed = clock.getElapsedTime();

  // Animate shining pane with CRT startup effect
  if (shiningRect && shiningRect.material) {
    // CRT Monitor startup effect with delay: nothing until 20%, then width, then height
    let scaleX = 0;
    let scaleY = 0.05; // Minimum height to start with a thin vertical line

    if (scrollProgress <= 0.2) {
      // First 20% of scroll: no change, stay as thin vertical line
      scaleX = 0;
      scaleY = 0.05;
    } else if (scrollProgress <= 0.6) {
      // From 20% to 60% of scroll: expand width only
      const widthProgress = (scrollProgress - 0.2) / 0.4; // 0 to 1 over 40% range
      scaleX = widthProgress * props.maxScale;
      scaleY = 0.05; // Keep minimum height
    } else {
      // From 60% to 100% of scroll: expand height while maintaining width
      const heightProgress = (scrollProgress - 0.6) / 0.4; // 0 to 1 over 40% range
      scaleX = props.maxScale; // Keep max width
      scaleY = 0.05 + (heightProgress * (props.maxScale - 0.05)); // Start from 0.05
    }

    shiningRect.scale.set(scaleX, scaleY, 1);

    // Pulsing effect (keep subtle)
    const pulse = Math.sin(elapsed * props.rectPulseSpeed) * 0.1 + 0.9;

    // Check if material has these properties before setting them
    if (shiningRect.material.emissiveIntensity !== undefined) {
      shiningRect.material.emissiveIntensity = props.rectIntensity * pulse;
    }

    if (shiningRect.material.opacity !== undefined) {
      // More dramatic opacity change for CRT effect
      shiningRect.material.opacity = 0.6 + (scrollProgress * 0.4);
    }
  }

  // Camera FOV animation
  let newFov;
  if (scrollProgress < 0.5) {
    const t = scrollProgress / 0.5;
    newFov = THREE.MathUtils.lerp(props.cameraFovStart, props.cameraFovMiddle, t);
  } else {
    const t = (scrollProgress - 0.5) / 0.5;
    newFov = THREE.MathUtils.lerp(props.cameraFovMiddle, props.cameraFovEnd, t);
  }

  if (camera.fov !== newFov) {
    camera.fov = newFov;
    camera.updateProjectionMatrix();
  }

  // Camera movement
  camera.position.lerpVectors(
      props.cameraPositionStart,
      props.cameraPositionEnd,
      scrollProgress
  );

  // Breathing effect
  camera.position.y += Math.sin(elapsed * 0.5) * 0.01;

  lerpLookAt(camera, props.cameraTarget, 0.1);

  // Render with bloom
  composer.render();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

  // Update bloom pass size
  if (composer.passes[1] instanceof UnrealBloomPass) {
    composer.passes[1].setSize(window.innerWidth, window.innerHeight);
  }
}

onMounted(() => {
  initThreeJS();
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animateId);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', updateScrollProgress);

  // Clean up
  if (renderer) {
    renderer.dispose();
  }
  if (composer) {
    composer.dispose();
  }
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