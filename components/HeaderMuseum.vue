<template>
    <div class="min-h-screen w-screen z-20">
        <h1 class="sr-only">404 Museum</h1>

        <!-- Logo en haut - responsive -->
        <div class="absolute top-4 md:top-6 w-screen flex justify-center z-20">
            <img src='/props/logo-museum.png' class="w-16 sm:w-20 md:w-24 lg:w-32" />
        </div>

        <!-- Language Switcher Component -->
        <LanguageSwitcher />

        <!-- Contenu principal - responsive -->
        <div class="px-4 sm:px-8 md:pl-16 h-screen flex flex-col justify-center z-20 space-y-12 sm:space-y-16 md:space-y-24 lg:space-y-32">
            <div class=""></div>

            <!-- Section logo et texte - responsive -->
            <div class="flex flex-col items-start space-y-4 sm:space-y-6 z-20 w-full">
                <!-- Logo typographique 404MUSEUM -->
                <div class="w-full">
                    <img
                        src='/props/logo-typo.svg'
                        class="w-full h-auto object-contain"
                        :style="{
                            width: '100%',
                            maxWidth: (textWidth > 0 ? Math.max(textWidth, 320) + 'px' : '100%')
                        }"
                    />
                </div>

                <!-- Texte de baseline -->
                <div class="w-full flex justify-center sm:justify-start ">
                    <div
                        ref="textElement"
                        class="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-[90vw] sm:max-w-[80vw] md:max-w-none"
                        style="font-family: droidsansmono;"
                    >
                        {{ $t("baseline") }}
                    </div>
                </div>
            </div>

            <!-- Bouton - responsive -->
            <div class="w-full flex justify-center md:justify-start">
                <button class="z-20 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[397px] h-[50px] sm:h-[60px] md:h-[70px] lg:h-[87px] px-4 sm:px-6 md:px-8 lg:px-[57px] py-3 sm:py-4 md:py-5 lg:py-[26px] bg-[#b43325] rounded-[8px] md:rounded-[10px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-[#5e1b13] inline-flex justify-center items-center gap-2.5 transition-all duration-200 hover:bg-[#a02d1f] active:scale-95">
                    <div class="text-center text-[#fcf7f1] text-sm sm:text-base md:text-lg lg:text-xl xl:text-[25.98px] font-bold font-['DePixel'] leading-none">
                        {{ $t("visit") }}
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const textElement = ref(null)
const textWidth = ref(0)

let resizeObserver = null

onMounted(() => {
    nextTick(() => {
        updateTextWidth()

        if (textElement.value) {
            // Listen to size changes (responsive)
            resizeObserver = new ResizeObserver(() => {
                updateTextWidth()
            })

            resizeObserver.observe(textElement.value)
        }

        // Listen to window resize for additional responsiveness
        window.addEventListener('resize', debounce(updateTextWidth, 100))
    })
})

onBeforeUnmount(() => {
    if (resizeObserver && textElement.value) {
        resizeObserver.unobserve(textElement.value)
    }
    window.removeEventListener('resize', updateTextWidth)
})

const updateTextWidth = () => {
    if (textElement.value) {
        // Mesurer la largeur réelle du texte
        const textActualWidth = textElement.value.scrollWidth
        // S'assurer d'une largeur minimum pour le logo
        const minWidth = window.innerWidth < 640 ? 280 : 320
        textWidth.value = Math.max(textActualWidth, minWidth)
        if(window?.innerWidth < 768){
            textWidth.value = "100000000"
        }
    }
}

// Fonction debounce pour optimiser les performances
const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
</script>