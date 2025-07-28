// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-28',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/image'],
  colorMode: {
    classSuffix: ''
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  nitro: {
    compatibilityDate: '2025-07-28'
  }
})