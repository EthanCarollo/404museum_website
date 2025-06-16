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
    <div class="relative z-30 bg-[#E5A658] h-[6vh] w-screen shadow-lg">

    </div>
    <div class="relative bg-[#FCF7F1] min-h-screen w-screen z-20">
        <div class="flex justify-center space-x-8 pt-24">
            <CardInfo image-url="icon/camera-red.png" />
            <CardInfo image-url="icon/archive-red.png" />
            <CardInfo image-url="icon/museum-red.png" />
        </div>
        <div class="flex justify-center px-8 mt-32">
            <div class="w-[30vw]">

            </div>
            <div class="w-[60vw] flex flex-col justify-center items-center space-y-6">
                <div class="text-6xl w-full text-start" style="font-family: depixel;">
                    Tester l’expérience
                </div>
                <div>
                    <div class="text-2xl w-full text-start mt-4" style="font-family: droidsans;">
                        Le <p class="" style="font-family: droidsansbold;">404 Museum</p> est une plateforme en ligne immersive qui vous permet d’explorer une <p style="font-family: droidsansbold;">multitude d’informations</p> sur la <p style="font-family: droidsansbold;">culture d’Internet</p>.
                    </div>
                    <div class="text-2xl mt-4 w-full text-start" style="font-family: droidsans;">
                        <p style="font-family: droidsansbold;">Téléchargez l’application</p> ou <p style="font-family: droidsansbold;">visitez le site directement en ligne</p> pour vivre une expérience unique.
                    </div>
                </div>
                <div class="flex w-full justify-center">
                    <button class="relative rounded-[15.02px] shadow-[0px_6.007751941680908px_6.007751941680908px_0px_rgba(0,0,0,0.25)] mt-8">
                        <div class="flex justify-center items-center
                            bg-[#b43325] rounded-[15.02px] shadow-[0px_3.9018709659576416px_3.9018709659576416px_0px_rgba(0,0,0,0.25)] border-[1.50px] border-[#5e1b13]">
                            <div class="text-white text-3xl px-8 py-8 pt-10" style="font-family: depixel">
                                Télécharger l’application
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div class="w-full flex justify-center items-center pt-16 pb-4">
            <div class="" style="font-family: depixel">@404 Museum</div>
        </div>
    </div>
</template>

<script setup>

import * as THREE from "three";
</script>
