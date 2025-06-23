<template>
    <div class="absolute top-4 right-4 z-30">
        <button
            @click="toggleLanguage"
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 hover:bg-white/20 transition-all duration-200 group flex items-center gap-2"
            :title="currentLocale === 'fr' ? 'Switch to English' : 'Passer en français'"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-white group-hover:scale-110 transition-transform duration-200"
            >
                <path d="m5 8 6 6"/>
                <path d="m4 14 6-6 2-3"/>
                <path d="M2 5h12"/>
                <path d="M7 2h1"/>
                <path d="m22 22-5-10-5 10"/>
                <path d="M14 18h6"/>
            </svg>

            <span class="text-white text-sm font-medium uppercase tracking-wide">
                {{ currentLocale }}
            </span>

            <div class="w-1 h-1 bg-white/50 rounded-full"></div>

            <span class="text-white/70 text-xs uppercase tracking-wide">
                {{ nextLocale }}
            </span>

            <span class="sr-only">
                {{ currentLocale === 'fr' ? 'Switch to English' : 'Passer en français' }}
            </span>
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

// i18n setup
const { locale, setLocale } = useI18n()

const currentLocale = computed(() => locale.value)
const nextLocale = computed(() => currentLocale.value === 'fr' ? 'en' : 'fr')

const toggleLanguage = () => {
    const newLocale = currentLocale.value === 'fr' ? 'en' : 'fr'
    setLocale(newLocale)
}
</script>