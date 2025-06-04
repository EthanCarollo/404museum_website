<template>
  <div ref="threeScene" class="three-scene">
    <!-- Windows 2000 style progress bar - appears at 90% -->
    <div class="win2k-progress-container" v-show="scrollProgress >= 0.9">
      <div class="win2k-progress-bar">
        <div class="win2k-progress-fill" :style="{ width: ((scrollProgress - 0.9) / 0.1) * 100 + '%' }">
          <div class="win2k-progress-blocks"></div>
        </div>
      </div>
      <div class="win2k-progress-text">System Loading... {{ Math.round(((scrollProgress - 0.9) / 0.1) * 100) }}%</div>
    </div>

    <!-- Dynamic UI elements -->
    <div class="ui-overlay" :class="{ active: scrollProgress > 0.1 }">
      <div class="scan-lines" :class="{ active: scrollProgress > 0.5 }"></div>
    </div>

    <!-- Particle effect overlay -->
    <div class="particles" ref="particleContainer"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass';
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass';

// Props with enhanced defaults
const props = defineProps({
  mapPath: {type: String, default: '/3d/map.glb'},
  cameraTarget: {type: Object, default: () => new THREE.Vector3(0, 1.6, 0)},
  cameraPositionStart: {type: Object, default: () => new THREE.Vector3(0, 1.6, 10)},
  cameraPositionEnd: {type: Object, default: () => new THREE.Vector3(0, 1.6, 2)},
  cameraFovStart: {type: Number, default: 75},
  cameraFovMiddle: {type: Number, default: 60},
  cameraFovEnd: {type: Number, default: 45}, // Back to original zoom
  // Enhanced bloom settings (original values)
  bloomStrength: {type: Number, default: 1.2},
  bloomRadius: {type: Number, default: 0.8},
  bloomThreshold: {type: Number, default: 0.1},
  // Enhanced pane props
  rectWidth: {type: Number, default: 4},
  rectHeight: {type: Number, default: 3},
  rectPosition: {type: Object, default: () => new THREE.Vector3(0, 1, -2)},
  rectColor: {type: Number, default: 0xffffff}, // Back to white
  rectIntensity: {type: Number, default: 3},
  rectPulseSpeed: {type: Number, default: 3}, // Faster pulse
  maxScale: {type: Number, default: 4}
});

const threeScene = ref(null);
const particleContainer = ref(null);
const scrollProgress = ref(0);

let scene, camera, renderer, composer;
let shiningRect = null;
let particleSystem = null;
let lightBeams = [];
let energyRings = [];
let glitchObjects = [];
const clock = new THREE.Clock();
let animateId = null;

// Éclairage principal et coloré
let ambientLight, dirLight;
let coloredLights = [];
let flickerLights = []; // Nouvelles lumières qui clignotent

// Enhanced scroll handling with easing
let targetScrollProgress = 0;
let currentScrollProgress = 0;

function updateScrollProgress() {
  const maxScroll = window.innerHeight * 1.5; // Back to original scroll distance
  targetScrollProgress = Math.min(window.scrollY / maxScroll, 1);

  // Smooth easing
  const ease = 0.08;
  currentScrollProgress += (targetScrollProgress - currentScrollProgress) * ease;
  scrollProgress.value = currentScrollProgress;
}

// Create particle system
function createParticleSystem() {
  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    colors[i3] = Math.random();
    colors[i3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i3 + 2] = 1;

    sizes[i] = Math.random() * 3 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: {value: 0},
      scrollProgress: {value: 0}
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      uniform float scrollProgress;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + scrollProgress * 2.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;

      void main() {
        float r = distance(gl_PointCoord, vec2(0.5, 0.5));
        if (r > 0.5) discard;
        gl_FragColor = vec4(vColor, 1.0 - r);
      }
    `,
    transparent: true,
    vertexColors: true
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
}

// Enhanced shining pane - stable, no dancing
function createShiningPane() {
  const geometry = new THREE.PlaneGeometry(props.rectWidth, props.rectHeight);

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
  shiningRect.rotation.set(0, 0, 0); // No rotation
  scene.add(shiningRect);
}

// Créer un éclairage avec effet bloom progressif
function createScreenLighting() {
  // Lumière qui va s'intensifier et créer l'effet bloom
  const screenLight = new THREE.PointLight(0x88aaff, 0, 8);
  screenLight.position.set(0, 1, -1.5); // Juste devant l'écran
  flickerLights.push({
    light: screenLight,
    baseIntensity: 4,
    maxIntensity: 8,
    isScreenLight: true
  });
  scene.add(screenLight);
}

function initThreeJS() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000511);
  scene.fog = new THREE.Fog(0x000511, 1, 100);

  // Enhanced camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.copy(props.cameraPositionStart);

  // Enhanced renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  threeScene.value.appendChild(renderer.domElement);

  // Lumière ambiante très faible et constante
  ambientLight = new THREE.AmbientLight(0x404040, 0.08); // Un peu plus pour voir le modèle
  scene.add(ambientLight);

  // Lumière directionnelle faible et constante pour le modèle
  dirLight = new THREE.DirectionalLight(0xffffff, 0.12);
  dirLight.position.set(0, 20, -15);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.setScalar(2048);
  scene.add(dirLight);

  // Create all effects
  createShiningPane();
  createParticleSystem();
  createScreenLighting();

  // Load model with enhanced materials
  const loader = new GLTFLoader();
  loader.load(
      props.mapPath,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Matériaux mats pour éviter les reflets excessifs
            if (child.material) {
              child.material.roughness = 0.9; // Plus mat
              child.material.metalness = 0.1; // Moins métallique

              // Réduire la réactivité à l'éclairage
              if (child.material.emissive) {
                child.material.emissive.setHex(0x000000);
              }
            }
          }
        });
        scene.add(gltf.scene);
      },
      undefined,
      (err) => console.error('GLB Load Error:', err)
  );

  // Enhanced post-processing
  const renderPass = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      props.bloomStrength,
      props.bloomRadius,
      props.bloomThreshold
  );

  const filmPass = new FilmPass(0.2, 0.025, 648, false);

  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  composer.addPass(filmPass);

  // Event listeners
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', updateScrollProgress, {passive: true});

  // Start animation
  animate();
}

function animate() {
  animateId = requestAnimationFrame(animate);
  updateScrollProgress();

  const elapsed = clock.getElapsedTime();
  const progress = currentScrollProgress;

  // === ÉCLAIRAGE PROGRESSIF POUR L'EFFET BLOOM ===

  // Lumière qui s'intensifie progressivement pour créer l'effet bloom
  flickerLights.forEach((flicker) => {
    if (flicker.isScreenLight) {
      // La lumière s'intensifie avec le scroll pour créer l'effet bloom
      const lightIntensity = progress * flicker.maxIntensity + 1;
      flicker.light.intensity = lightIntensity;
    }
  });

  // Ajuster le bloom threshold en fonction du scroll
  if (composer && composer.passes[2]) { // Bloom pass
    const bloomPass = composer.passes[2];
    // Threshold diminue quand la lumière augmente pour plus d'effet bloom
    bloomPass.threshold = 0.3 - (progress * 0.2); // De 0.3 à 0.1
    bloomPass.strength = props.bloomStrength + (progress * 1); // Augmente la force
  }

  // Update shader uniforms only for particle system
  if (particleSystem?.material?.uniforms) {
    particleSystem.material.uniforms.time.value = elapsed;
    particleSystem.material.uniforms.scrollProgress.value = progress;
  }

  // Animate shining pane (stable CRT effect - screen activation)
  if (shiningRect) {
    let scaleX = 0, scaleY = 0.05;

    if (progress <= 0.2) {
      // Screen off
      scaleX = 0;
      scaleY = 0.05;
    } else if (progress <= 0.6) {
      // Screen width expanding (CRT startup)
      const widthProgress = (progress - 0.2) / 0.4;
      scaleX = widthProgress * props.maxScale;
      scaleY = 0.05;
    } else {
      // Screen height expanding (full activation)
      const heightProgress = (progress - 0.6) / 0.4;
      scaleX = props.maxScale;
      scaleY = 0.05 + (heightProgress * (props.maxScale - 0.05));
    }

    shiningRect.scale.set(scaleX, scaleY, 1);

    // Simple pulsing intensity (like a real screen)
    const pulse = Math.sin(elapsed * props.rectPulseSpeed) * 0.1 + 0.9;

    // Intensité émissive de l'écran qui augmente drastiquement avec le scroll
    const baseEmissive = props.rectIntensity * pulse;
    const scrollBoost = progress * 4; // L'écran devient beaucoup plus brillant
    if (shiningRect.material.emissiveIntensity !== undefined) {
      shiningRect.material.emissiveIntensity = baseEmissive + scrollBoost;
    }

    // Screen brightness increases as we get closer
    if (shiningRect.material.opacity !== undefined) {
      shiningRect.material.opacity = 0.6 + (progress * 0.4);
    }
  }

  // Animate particle system
  if (particleSystem) {
    particleSystem.rotation.y = elapsed * 0.1;
    particleSystem.rotation.x = Math.sin(elapsed * 0.5) * 0.1;

    // Make particles more active on scroll
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(elapsed + i * 0.01) * 0.01 * (1 + progress * 2);
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
  }

  // Animate energy rings
  energyRings.forEach((ring, i) => {
    if (progress > 0.3 + i * 0.1) {
      ring.material.opacity = Math.min((progress - 0.3 - i * 0.1) * 3, 0.8);
      ring.scale.setScalar(1 + progress * 2 + Math.sin(elapsed * 2 + i) * 0.1);
      ring.rotation.z = elapsed * (0.5 + i * 0.2);
    }
  });

  // Animate light beams
  lightBeams.forEach((beam, i) => {
    if (progress > 0.5) {
      beam.material.opacity = Math.min((progress - 0.5) * 2, 0.6);
      beam.rotation.z += 0.01;
      beam.position.y += Math.sin(elapsed * 2 + i) * 0.02;
    }
  });

  // Camera movement (original behavior restored)
  camera.position.lerpVectors(
      props.cameraPositionStart,
      props.cameraPositionEnd,
      progress
  );

  // Subtle breathing effect only
  camera.position.y += Math.sin(elapsed * 0.5) * 0.01;

  // FOV animation (original)
  let newFov;
  if (progress < 0.5) {
    const t = progress / 0.5;
    newFov = THREE.MathUtils.lerp(props.cameraFovStart, props.cameraFovMiddle, t);
  } else {
    const t = (progress - 0.5) / 0.5;
    newFov = THREE.MathUtils.lerp(props.cameraFovMiddle, props.cameraFovEnd, t);
  }

  if (camera.fov !== newFov) {
    camera.fov = newFov;
    camera.updateProjectionMatrix();
  }

  // Simple look-at (original)
  camera.lookAt(props.cameraTarget);

  // Control post-processing effects based on scroll
  if (composer.passes[3]) { // Glitch pass
    composer.passes[3].enabled = progress > 0.9;
  }

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

/* Windows 2000 style progress bar */
.win2k-progress-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  font-family: 'MS Sans Serif', sans-serif;
}

.win2k-progress-bar {
  width: 300px;
  height: 20px;
  background: #c0c0c0;
  border: 2px inset #c0c0c0;
  border-color: #808080 #ffffff #ffffff #808080;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
}

.win2k-progress-fill {
  height: 100%;
  background: #0000ff;
  position: relative;
  transition: width 0.3s ease;
}

.win2k-progress-blocks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
      to right,
      transparent 0px,
      transparent 8px,
      #ffffff 8px,
      #ffffff 9px
  );
  opacity: 0.3;
}

.win2k-progress-text {
  color: #000000;
  font-size: 11px;
  text-align: center;
  background: #c0c0c0;
  padding: 2px 4px;
  border: 1px outset #c0c0c0;
  border-color: #ffffff #808080 #808080 #ffffff;
}

/* UI Overlay */
.ui-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.ui-overlay.active {
  opacity: 1;
}

/* Scan lines */
.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      transparent 50%,
      rgba(0, 255, 255, 0.03) 50%
  );
  background-size: 100% 4px;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.scan-lines.active {
  opacity: 1;
  animation: scan 0.1s linear infinite;
}

@keyframes scan {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 4px;
  }
}

/* Particles overlay */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 998;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .win2k-progress-bar {
    width: 250px;
  }

  .win2k-progress-text {
    font-size: 10px;
  }
}
</style>