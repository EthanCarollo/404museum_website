// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      // update Nuxt defaults
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icons/favico.webp' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ["./assets/css/main.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt',
    'nuxt-lucide-icons'
  ]
})