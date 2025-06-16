<template>
    <div class="min-h-screen w-screen z-20">
        <h1 class="sr-only">404 Museum</h1>

        <div class="absolute top-0 w-screen flex justify-center z-20">
            <NuxtImg :src="'props/logo-museum.png'" class="w-32" />
        </div>

        <div class="pl-16 h-screen flex flex-col justify-center z-20 space-y-32">
            <div class=""></div>
            <div class="inline-flex flex-col items-start space-y-4 z-20">
                <NuxtImg :src="'props/logo-typo.svg'" :style="{ width: textWidth + 'px' }" />

                <div
                    ref="textElement"
                    class="text-white whitespace-nowrap text-2xl"
                    style="font-family: droidsansmono;"
                >
                    L'internet comme vous ne l'avez jamais visité
                </div>
            </div>
            <button class="z-20 w-[397px] h-[87px] px-[57px] py-[26px] bg-[#b43325] rounded-[10px] shadow-[0px_2.597890853881836px_2.597890853881836px_0px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-[#5e1b13] inline-flex justify-center items-center gap-2.5">
                <div class="text-center justify-start text-[#fcf7f1] text-[25.98px] font-bold font-['DePixel'] mt-1">Visiter le site </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const textElement = ref(null)
const textWidth = ref(0)

let resizeObserver = null

onMounted(() => {
    if (textElement.value) {
        // Initial width
        textWidth.value = textElement.value.offsetWidth

        // Listen to size changes (responsive)
        resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                textWidth.value = entry.contentRect.width
            }
        })

        resizeObserver.observe(textElement.value)
    }
})

onBeforeUnmount(() => {
    if (resizeObserver && textElement.value) {
        resizeObserver.unobserve(textElement.value)
    }
})
</script>
