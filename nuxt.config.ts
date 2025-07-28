// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-28',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/image', '@nuxt/content'],
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
  content: {
    // https://content.nuxt.com/get-started/configuration
    highlight: {
      theme: 'github-dark'
    }
  },
  nitro: {
    compatibilityDate: '2025-07-28'
  }
})