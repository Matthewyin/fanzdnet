// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/image',
    // '@nuxt/content', // 暂时禁用，迁移到 Firestore
    // '@nuxtjs/i18n' // 暂时禁用，版本兼容性问题
  ],
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
  // content: {
  //   // https://content.nuxt.com/get-started/configuration
  //   highlight: {
  //     theme: 'github-dark'
  //   }
  // },
  i18n: {
    locales: [
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh-CN.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de-DE.json' },
      { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja-JP.json' },
      { code: 'ko', language: 'ko-KR', name: '한국어', file: 'ko-KR.json' },
      { code: 'sv', language: 'sv-SE', name: 'Svenska', file: 'sv-SE.json' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  },
  nitro: {
    preset: 'firebase'
  },
  runtimeConfig: {
    public: {
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || 'n8n-project-460516',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://fanzd.net'
    }
  },

  // SEO 和性能优化
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false
  },

  // 预渲染配置
  nitro: {
    preset: 'node-server',
    prerender: {
      routes: [
        '/',
        '/timeline',
        '/ai-gallery',
        '/about',
        '/updates',
        '/schedule',
        '/essays'
      ],
      failOnError: false
    },
    // Firebase App Hosting 配置
    firebase: {
      gen: 2,
      nodeVersion: '20'
    }
  },

  // 图片优化
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // CSS 优化
  // css: [
  //   '~/assets/css/main.css'
  // ],

  // 构建优化
  build: {
    transpile: ['@headlessui/vue']
  },

  // 压缩和缓存
  compression: {
    gzip: true,
    brotli: true
  }
})