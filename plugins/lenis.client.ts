import { defineNuxtPlugin } from '#app'
import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
    const lenis = new Lenis({
        duration: 2.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    })

    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Expose it globally if needed
    nuxtApp.provide('lenis', lenis)
})
