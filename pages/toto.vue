<template>
    <div class="relative">
        <!-- 3D Scene Background -->
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

        <!-- Header -->
        <div class="z-10">
            <HeaderMuseum />
        </div>

        <!-- Separator Bar -->
        <div class="relative z-30 bg-[#E5A658] h-[6vh] w-screen shadow-lg"></div>

        <!-- Main Content -->
        <div class="relative bg-[#FCF7F1] min-h-screen w-screen z-20">
            <!-- Info Cards Section -->
            <div class="flex justify-center space-x-8 pt-24">
                <CardInfo image-url="icon/camera-red.png" />
                <CardInfo image-url="icon/archive-red.png" />
                <CardInfo image-url="icon/museum-red.png" />
            </div>

            <!-- Main Content Section -->
            <div class="flex justify-center px-8 mt-32">
                <!-- Left Spacer -->
                <div class="w-[30vw]"></div>

                <!-- Content Area -->
                <div class="w-[60vw] flex flex-col justify-center items-center space-y-6">
                    <!-- Main Title -->
                    <div class="text-6xl w-full text-start font-depixel">
                        {{ $t('main.title') }}
                    </div>

                    <!-- Description Text -->
                    <div class="space-y-4">
                        <div class="text-2xl w-full text-start font-droidsans">
                            {{ $t('main.description.part1') }}
                            <span class="font-droidsansbold">{{ $t('main.description.museum') }}</span>
                            {{ $t('main.description.part2') }}
                            <span class="font-droidsansbold">{{ $t('main.description.infos') }}</span>
                            {{ $t('main.description.part3') }}
                            <span class="font-droidsansbold">{{ $t('main.description.internet') }}</span>.
                        </div>

                        <div class="text-2xl w-full text-start font-droidsans">
                            <span class="font-droidsansbold">{{ $t('main.cta.download') }}</span>
                            {{ $t('main.cta.or') }}
                            <span class="font-droidsansbold">{{ $t('main.cta.visit') }}</span>
                            {{ $t('main.cta.end') }}
                        </div>
                    </div>

                    <!-- Download Button -->
                    <div class="flex w-full justify-center">
                        <button class="relative rounded-[15.02px] shadow-[0px_6.007751941680908px_6.007751941680908px_0px_rgba(0,0,0,0.25)] mt-8 transition-transform hover:bg-[#ab3326]">
                            <div class="flex justify-center items-center bg-[#b43325] rounded-[15.02px] shadow-[0px_3.9018709659576416px_3.9018709659576416px_0px_rgba(0,0,0,0.25)] border-[1.50px] border-[#5e1b13]">
                                <div class="text-white text-3xl px-8 py-8 pt-10 font-depixel">
                                    {{ $t('main.button') }}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="w-full flex justify-center items-center pt-16 pb-4">
                <div class="font-depixel text-gray-600">
                    @404 Museum
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import * as THREE from "three";

// Props ou méthodes si nécessaire
const loadingProgress = (progress) => {
  // Gérer le progrès de chargement
  console.log('Loading progress:', progress);
};
</script>

<style scoped>
/* Définition des polices personnalisées */
.font-depixel {
  font-family: 'depixel', sans-serif;
}

.font-droidsans {
  font-family: 'droidsans', sans-serif;
}

.font-droidsansbold {
  font-family: 'droidsansbold', sans-serif;
}

/* Styles pour le canvas */
.canvas-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Animation pour le bouton */
button:active {
  transform: translateY(2px);
}
</style>
