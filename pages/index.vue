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
    <div class="relative z-30 bg-[#E5A658] h-[4vh] sm:h-[6vh] w-screen shadow-lg"></div>

    <!-- Main Content -->
    <div class="relative bg-[#FCF7F1] min-h-screen w-screen z-20">
      <!-- Info Cards Section -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 pt-8 sm:pt-16 lg:pt-24 px-4 w-full max-w-7xl mx-auto">
        <CardInfo
          image-url="/icon/camera-red.png"
          class="h-full flex flex-col cursor-pointer hover:scale-105 transition-transform"
          :title="$t('cards.immersive.title')"
          :description="$t('cards.immersive.description')"
          @click="() => window.open('https://404museum.io', '_blank')"
        />
        <CardInfo
          image-url="/icon/archive-red.png"
          class="h-full flex flex-col cursor-pointer hover:scale-105 transition-transform"
          :title="$t('cards.archives.title')"
          :description="$t('cards.archives.description')"
          @click="() => window.open('https://404museum.io', '_blank')"
        />
        <CardInfo
          image-url="/icon/museum-red.png"
          class="h-full flex flex-col cursor-pointer hover:scale-105 transition-transform"
          :title="$t('cards.culture.title')"
          :description="$t('cards.culture.description')"
          @click="() => window.open('https://404museum.io', '_blank')"
        />
      </div>

      <!-- Main Content Section -->
      <div class="flex justify-center px-4 sm:px-6 lg:px-8 mt-8 sm:mt-16 lg:mt-32">
        <!-- Left Spacer - Only on large screens -->
        <div class="hidden xl:block w-[15vw] 2xl:w-[30vw]"></div>

        <!-- Content Area -->
        <div class="w-full max-w-4xl xl:w-[70vw] 2xl:w-[60vw] flex flex-col justify-center items-center space-y-4 sm:space-y-6">
          <!-- Main Title -->
          <div class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl w-full text-center sm:text-start font-depixel leading-tight mb-16">
            {{ $t('main.title') }}
          </div>

          <!-- Description Text -->
          <div class="space-y-3 sm:space-y-4">
            <div class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full text-center sm:text-start font-droidsans leading-relaxed mb-10">
              {{ $t('main.description.part1') }}
              <span class="font-droidsansbold">{{ $t('main.description.museum') }}</span>
              {{ $t('main.description.part2') }}
              <span class="font-droidsansbold">{{ $t('main.description.infos') }}</span>
              {{ $t('main.description.part3') }}
              <span class="font-droidsansbold">{{ $t('main.description.internet') }}</span>.
            </div>

            <div class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-full text-center sm:text-start font-droidsans leading-relaxed">
              <span class="font-droidsansbold">{{ $t('main.cta.download') }}</span>
              {{ $t('main.cta.or') }}
              <span class="font-droidsansbold">{{ $t('main.cta.visit') }}</span>
              {{ $t('main.cta.end') }}
            </div>
          </div>

          <!-- Download Button -->
          <div class="flex w-full justify-center pt-4 sm:pt-24 pb-16 sm:pb-24">
            <a 
              href="https://404museum.io" 
              target="_blank" 
              rel="noopener noreferrer"
              class="relative rounded-[10px] sm:rounded-[15.02px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:shadow-[0px_6.007751941680908px_6.007751941680908px_0px_rgba(0,0,0,0.25)] transition-transform active:transform active:translate-y-1 hover:scale-105"
            >
              <div class="flex justify-center items-center bg-[#b43325] rounded-[10px] sm:rounded-[15.02px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] sm:shadow-[0px_3.9018709659576416px_3.9018709659576416px_0px_rgba(0,0,0,0.25)] border-[1px] sm:border-[1.50px] border-[#5e1b13] hover:bg-[#ab3326]">
                <div class="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 lg:pt-10 font-depixel">
                  {{ $t('main.button') }}
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Right Spacer - Only on large screens -->
        <div class="hidden xl:block w-[15vw] 2xl:w-[10vw]"></div>
      </div>

      <!-- Footer -->
      <div class="w-full flex justify-center items-center pt-8 sm:pt-12 lg:pt-16 pb-4">
        <a 
          href="https://404museum.io" 
          target="_blank" 
          rel="noopener noreferrer"
          class="font-depixel text-gray-600 text-sm sm:text-base hover:text-gray-800 transition-colors"
        >
          @404 Museum
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as THREE from 'three'

const loadingProgress = (progress) => {
  console.log('Loading progress:', progress)
}
</script>

<style scoped>
.font-depixel {
  font-family: 'depixel', sans-serif;
}

.font-droidsans {
  font-family: 'droidsans', sans-serif;
}

.font-droidsansbold {
  font-family: 'droidsansbold', sans-serif;
}

.canvas-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

@media (max-width: 320px) {
  .font-depixel {
    font-size: 1.25rem !important;
  }
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .canvas-container {
    height: 100vh;
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .canvas-container {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }
}
</style>