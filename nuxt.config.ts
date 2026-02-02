// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-22',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/i18n',
    // '@nuxt/content', // 暂时禁用，迁移到 Firestore
  ],
  colorMode: {
    classSuffix: ''
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      // 主题初始化脚本 - 在 CSS 加载前立即设置正确的主题类，防止页面刷新时闪白
      script: [
        {
          innerHTML: `
            (function() {
              try {
                // 立即读取存储的主题偏好
                const stored = localStorage.getItem('nuxt-color-mode');
                const preference = stored || 'system';
                let colorMode = preference;

                // 如果是 system 模式，检测系统偏好
                if (preference === 'system') {
                  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  colorMode = isDark ? 'dark' : 'light';
                }

                // 立即添加类到 html 元素
                if (colorMode === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                // 如果 localStorage 不可用（如隐私模式），忽略错误
                console.warn('Failed to initialize color mode:', e);
              }
            })();
          `,
          type: 'text/javascript',
          tagPosition: 'head'
        }
      ]
    },
    // 页面过渡动画 - 使用 default 模式避免闪屏
    pageTransition: { name: 'page', mode: 'default' },
    layoutTransition: { name: 'layout', mode: 'default' }
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
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es-ES.json' },
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
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://fanzd.net'
    }
  },

  // SEO 和性能优化
  experimental: {
    payloadExtraction: false,
    viewTransition: true, // 开启 View Transitions API
    componentIslands: true // 组件岛屿优化
  },

  // Vite 构建优化
  vite: {
    build: {
      // CSS 代码分割
      cssCodeSplit: true,
      // 生产环境移除 console
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // 优化 chunk 大小
      chunkSizeWarningLimit: 1000
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
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
    },
    // 图片预设
    presets: {
      card: {
        modifiers: {
          width: 400,
          height: 300,
          fit: 'cover'
        }
      },
      hero: {
        modifiers: {
          width: 1920,
          height: 1080,
          fit: 'cover'
        }
      },
      thumbnail: {
        modifiers: {
          width: 200,
          height: 200,
          fit: 'cover'
        }
      }
    }
  },

  // 全局 CSS - 设计系统
  css: [
    '~/assets/css/design-system.css',
    '~/assets/css/utilities.css',
    '~/assets/css/components.css',
    '~/assets/css/transitions.css'
  ],

  // 构建优化
  build: {
    transpile: ['@headlessui/vue']
  }
})