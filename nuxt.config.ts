// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      // update Nuxt defaults
      htmlAttrs: {
        "lang": "fr-FR",
        
      },
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' }
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'lang/',
    strategy: 'prefix_except_default',
  },
  css: ["./assets/css/main.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt',
    'nuxt-lucide-icons',
    '@nuxt/image',
    '@nuxtjs/i18n'
  ],
  plugins: ['~/plugins/lenis.client.ts']
})