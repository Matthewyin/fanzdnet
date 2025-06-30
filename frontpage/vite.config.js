import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 使用现代 Sass API
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true, // 自动打开浏览器
    strictPort: false, // 端口被占用时自动尝试下一个可用端口
    cors: true, // 启用CORS
    proxy: {
      // API网关代理
      '/api': {
        target: 'http://localhost:27007',
        changeOrigin: true,
        secure: false
      },
      // 直接服务代理（开发环境备用）
      '/api/auth': {
        target: 'http://localhost:27001',
        changeOrigin: true,
        secure: false
      },
      '/api/ai': {
        target: 'http://localhost:27002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/ai/, '/api/v1')
      },

      '/api/news': {
        target: 'http://localhost:27005',
        changeOrigin: true,
        secure: false
      },
      '/api/schedule': {
        target: 'http://localhost:27006',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // 代码分割优化
    rollupOptions: {
      output: {
        // 手动分割代码块
        manualChunks: {
          // 将Vue相关库分离
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // 将Element Plus分离
          'element-plus': ['element-plus'],
          // 将工具库分离
          'utils': ['axios', 'dayjs'],
          // 将i18n分离
          'i18n': ['vue-i18n']
        },
        // 优化文件名
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
            return `media/[name]-[hash].${ext}`
          }
          if (/\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(assetInfo.name)) {
            return `images/[name]-[hash].${ext}`
          }
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            return `fonts/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        }
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true // 生产环境移除debugger
      }
    },
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 设置chunk大小警告限制
    chunkSizeWarningLimit: 1000
  },
  // 优化依赖
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'element-plus',
      'axios',
      'dayjs',
      'vue-i18n'
    ]
  }
})
