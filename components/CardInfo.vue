<template>
    <div class="max-w-sm">
        <div class="relative bg-orange-50 rounded-2xl p-8 h-full flex flex-col items-start">
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none border-[12px] border-[#9C713C] rounded-[2.4vh]"></div>
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none border-[10px] border-[#E5A658] rounded-[2.4vh]"></div>
            <div class="absolute top-0 left-0 w-full h-full pointer-events-none border-[2px] border-[#9C713C] rounded-[2.4vh]"></div>
            <!-- Image/Icon Section -->
            <div class="flex justify-center mb-6">
                <NuxtImg
                    :src="imageUrl"
                    :alt="imageAlt"
                    class="w-20 h-20 shadow-lg rounded-xl"
                />
            </div>

            <!-- Title Section -->
            <h2 class="text-xl font-bold text-gray-900 text-center mb-4 leading-tight"
                style="font-family: depixel;">
                {{ titre }}
            </h2>

            <!-- Description Section -->
            <p class="text-gray-600 text-center text-base leading-relaxed text-start"
               style="font-family: droidsans;">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script setup>
// Props définies avec des valeurs par défaut
const props = defineProps({
    imageUrl: {
        type: String,
        default: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wseFFgu0reeEFIQg96OuulMnQavaYp.png'
    },
    imageAlt: {
        type: String,
        default: 'Icône culturelle'
    },
    titre: {
        type: String,
        default: 'Culture préservée'
    },
    description: {
        type: String,
        default: 'Mèmes, tendances et phénomènes culturels d\'internet'
    }
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>