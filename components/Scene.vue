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

        <!-- Simplified UI elements -->
        <div class="ui-overlay" :class="{ active: scrollProgress > 0.1 }">
            <div class="scan-lines" :class="{ active: scrollProgress > 0.7 }" v-if="!isMobile"></div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, computed} from 'vue';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';


// Mobile detection
const isMobile = computed(() => {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
});

const emit = defineEmits(['loading-progress']);

const props = defineProps({
    mapPath: {type: String, default: '/3d/map.glb'},
    cameraTarget: {type: Object, default: () => new THREE.Vector3(0, 1.6, 0)},
    cameraPositionStart: {type: Object, default: () => new THREE.Vector3(0, 1.6, 10)},
    cameraPositionEnd: {type: Object, default: () => new THREE.Vector3(0, 1.6, 2)},
    cameraFovStart: {type: Number, default: 75},
    cameraFovMiddle: {type: Number, default: 60},
    cameraFovEnd: {type: Number, default: 45},
    // Reduced bloom settings for mobile
    bloomStrength: {type: Number, default: 0.8},
    bloomRadius: {type: Number, default: 0.4},
    bloomThreshold: {type: Number, default: 0.3},
    // Simplified pane props
    rectWidth: {type: Number, default: 4},
    rectHeight: {type: Number, default: 3},
    rectPosition: {type: Object, default: () => new THREE.Vector3(0, 1, -2)},
    rectColor: {type: Number, default: 0xffffff},
    rectIntensity: {type: Number, default: 2},
    rectPulseSpeed: {type: Number, default: 2},
    maxScale: {type: Number, default: 3},
    // Simplified lighting props
    lightColorStart: {type: Number, default: 0x001122}, // Initial dark blue
    lightColorEnd: {type: Number, default: 0x88aaff}, // Bright blue
    directionalLightStart: {type: Number, default: 0.2}, // Dim start
    directionalLightEnd: {type: Number, default: 0.8}, // Bright end
    screenLightIntensityStart: {type: Number, default: 3}, // Screen light start
    screenLightIntensityEnd: {type: Number, default: 18}, // Screen light end
    screenLightDistance: {type: Number, default: 12}, // Light reach distance
    screenLightColor: {type: Number, default: 0x88aaff}, // Blue screen light
    // Shader props
    targetObjectName: {type: String, default: 'Screen'}, // Nom de l'objet à rechercher
    enableShader: {type: Boolean, default: true} // Activer/désactiver le shader
});

const threeScene = ref(null);
const scrollProgress = ref(0);

let scene, camera, renderer, composer;
let shiningRect = null;
const clock = new THREE.Clock();
let animateId = null;

let dirLight, screenLight;
let shaderMaterial = null; // Référence au matériau shader
let targetObject = null; // Objet trouvé avec traverse

let targetScrollProgress = 0;
let currentScrollProgress = 0;

const textureLoader = new THREE.TextureLoader();


// Template de shader personnalisable
const createShaderTemplate = () => {
    const texture = textureLoader.load('props/museum-screen.png');

    // Optional: Configure texture properties
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0.0 },
            uScrollProgress: { value: 0.0 },
            uColor: { value: new THREE.Color(0x00ffff) },
            uIntensity: { value: 1.0 },
            uTexture: { value: texture}
        },
        transparent: true,
        side: THREE.DoubleSide
    });
};

// Fonction de recherche et application du shader
const findAndApplyShader = (rootObject) => {
    if (!props.enableShader) return;

    rootObject.traverse((child) => {
        // Recherche par nom d'objet
        if (child.name === "ComputerScreen") {
            console.log(`Objet trouvé: ${child.name}`);
            targetObject = child;

            // Sauvegarde du matériau original si nécessaire
            child.originalMaterial = child.material;

            // Création et application du shader
            shaderMaterial = createShaderTemplate();
            child.material = shaderMaterial;

            console.log('Shader appliqué avec succès');
        }
    });
};

function updateScrollProgress() {
    const maxScroll = window.innerHeight * 1.5;
    targetScrollProgress = Math.min(window.scrollY / maxScroll, 1);

    const ease = isMobile.value ? 0.12 : 0.08;
    currentScrollProgress += (targetScrollProgress - currentScrollProgress) * ease;
    scrollProgress.value = currentScrollProgress;
}

// Helper function to interpolate colors
function interpolateColor(color1, color2, factor) {
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    return c1.lerp(c2, factor).getHex();
}

// Simplified shining pane
function createShiningPane() {
    const geometry = new THREE.PlaneGeometry(props.rectWidth, props.rectHeight);

    const material = new THREE.MeshStandardMaterial({
        color: props.rectColor,
        emissive: new THREE.Color(props.rectColor),
        emissiveIntensity: props.rectIntensity,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
    });

    shiningRect = new THREE.Mesh(geometry, material);
    shiningRect.position.copy(props.rectPosition);
    scene.add(shiningRect);
}

// Simplified screen lighting
function createScreenLighting() {
    // Single screen light
    screenLight = new THREE.PointLight(props.screenLightColor, props.screenLightIntensityStart, props.screenLightDistance);
    screenLight.position.set(0, 1, -1.5);
    scene.add(screenLight);
}

function initThreeJS() {
    scene = new THREE.Scene();

    // Start with the initial background color
    scene.background = new THREE.Color(props.lightColorStart);

    // Simplified fog for mobile
    if (!isMobile.value) {
        scene.fog = new THREE.Fog(props.lightColorStart, 5, 50);
    }

    // Mobile-optimized camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.copy(props.cameraPositionStart);

    // Mobile-optimized renderer
    renderer = new THREE.WebGLRenderer({
        antialias: !isMobile.value, // Disable antialiasing on mobile
        powerPreference: isMobile.value ? "default" : "high-performance",
        stencil: false,
        depth: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile.value ? 1 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // Simplified shadows for mobile
    if (!isMobile.value) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
    }

    threeScene.value.appendChild(renderer.domElement);

    // Standard directional lighting
    dirLight = new THREE.DirectionalLight(0xffffff, props.directionalLightStart);
    dirLight.position.set(0, 10, -10);

    if (!isMobile.value) {
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.setScalar(1024); // Reduced shadow map size
    }

    scene.add(dirLight);

    // Create enhanced effects
    createShiningPane();
    createScreenLighting();

    // Load model with mobile optimizations
    const loader = new GLTFLoader();
    loader.load(
        props.mapPath,
        (gltf) => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    // Simplified material settings for mobile
                    if (!isMobile.value) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }

                    if (child.material) {
                        child.material.roughness = 0.95;
                        child.material.metalness = 0.05;

                        if (child.material.emissive) {
                            child.material.emissive.setHex(0x000000);
                        }
                    }
                }
            });

            // Appliquer le shader après le chargement du modèle
            findAndApplyShader(gltf.scene);

            scene.add(gltf.scene);
        },
        (xhr) => {
            if (xhr.lengthComputable) {
                const progress = xhr.loaded / xhr.total;
                emit('loading-progress', progress);
            }
        },
        (err) => console.error('GLB Load Error:', err)
    );

    // Simplified post-processing
    const renderPass = new RenderPass(scene, camera);

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);

    // Only add bloom on desktop or high-end mobile
    if (!isMobile.value || window.devicePixelRatio > 2) {
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            props.bloomStrength,
            props.bloomRadius,
            props.bloomThreshold
        );
        composer.addPass(bloomPass);
    }

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

    // === SIMPLIFIED LIGHTING BASED ON SCROLL ===

    // Update background color
    const currentBgColor = interpolateColor(props.lightColorStart, props.lightColorEnd, progress);
    scene.background.setHex(currentBgColor);
    if (scene.fog) {
        scene.fog.color.setHex(currentBgColor);
    }

    // Update directional lighting
    const dirIntensity = THREE.MathUtils.lerp(props.directionalLightStart, props.directionalLightEnd, progress);
    dirLight.intensity = dirIntensity;

    // Update screen lighting
    const screenIntensity = THREE.MathUtils.lerp(props.screenLightIntensityStart, props.screenLightIntensityEnd, progress);
    screenLight.intensity = screenIntensity;

    // Mise à jour des uniforms du shader
    if (shaderMaterial) {
        //. console.warn("Updated shader material time : " + shaderMaterial.uniforms.uTime.value)
        shaderMaterial.uniforms.uTime.value = elapsed;
        shaderMaterial.uniforms.uScrollProgress.value = progress;
        shaderMaterial.uniforms.uIntensity.value = 1.0 + progress * 2.0;
    }

    // Simplified shining pane animation
    if (shiningRect) {
        let scaleX = 0, scaleY = 0.05;

        if (progress <= 0.2) {
            scaleX = 0;
            scaleY = 0.05;
        } else if (progress <= 0.6) {
            const widthProgress = (progress - 0.2) / 0.4;
            scaleX = widthProgress * props.maxScale;
            scaleY = 0.05;
        } else {
            const heightProgress = (progress - 0.6) / 0.4;
            scaleX = props.maxScale;
            scaleY = 0.05 + (heightProgress * (props.maxScale - 0.05));
        }

        shiningRect.scale.set(scaleX, scaleY, 1);

        // Enhanced pulsing with more light emission
        const pulse = Math.sin(elapsed * props.rectPulseSpeed) * 0.1 + 0.9;
        const baseEmissive = props.rectIntensity * pulse;
        const scrollBoost = progress * 6; // Increased light boost

        if (shiningRect.material.emissiveIntensity !== undefined) {
            shiningRect.material.emissiveIntensity = baseEmissive + scrollBoost;
        }

        if (shiningRect.material.opacity !== undefined) {
            shiningRect.material.opacity = 0.7 + (progress * 0.3);
        }
    }

    // Simplified camera movement
    camera.position.lerpVectors(
        props.cameraPositionStart,
        props.cameraPositionEnd,
        progress
    );

    // Reduced breathing effect
    if (!isMobile.value) {
        camera.position.y += Math.sin(elapsed * 0.3) * 0.005;
    }

    // FOV animation
    let newFov;
    if (progress < 0.5) {
        const t = progress / 0.5;
        newFov = THREE.MathUtils.lerp(props.cameraFovStart, props.cameraFovMiddle, t);
    } else {
        const t = (progress - 0.5) / 0.5;
        newFov = THREE.MathUtils.lerp(props.cameraFovMiddle, props.cameraFovEnd, t);
    }

    if (Math.abs(camera.fov - newFov) > 0.1) {
        camera.fov = newFov;
        camera.updateProjectionMatrix();
    }

    camera.lookAt(props.cameraTarget);

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
    if (shaderMaterial) {
        shaderMaterial.dispose();
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

/* Simplified UI Overlay */
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

/* Simplified scan lines (desktop only) */
.scan-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        transparent 50%,
        rgba(0, 255, 255, 0.02) 50%
    );
    background-size: 100% 6px;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
}

.scan-lines.active {
    opacity: 1;
    animation: scan 0.2s linear infinite;
}

@keyframes scan {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 0 6px;
    }
}

/* Mobile optimizations */
@media (max-width: 768px) {
    .win2k-progress-bar {
        width: 250px;
        height: 18px;
    }

    .win2k-progress-text {
        font-size: 10px;
        padding: 1px 3px;
    }

    /* Disable scan lines on mobile */
    .scan-lines {
        display: none;
    }
}

@media (max-width: 480px) {
    .win2k-progress-bar {
        width: 200px;
        height: 16px;
    }

    .win2k-progress-text {
        font-size: 9px;
    }
}
</style>