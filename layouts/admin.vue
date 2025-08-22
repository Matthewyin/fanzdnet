<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 侧边栏 -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out" :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <NuxtLink :to="localePath('/')" class="flex items-center space-x-2">
          <span class="text-xl font-bold text-gray-900 dark:text-white">Fanzd.net</span>
        </NuxtLink>
        <button @click="sidebarOpen = false" class="md:hidden">
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <nav class="mt-6">
        <div class="px-6 mb-6">
          <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            内容管理
          </h3>
        </div>
        
        <div class="space-y-1 px-3">
          <NuxtLink to="/admin" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" :class="$route.path === '/admin' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
            </svg>
            仪表板
          </NuxtLink>
          
          <NuxtLink to="/admin/hero" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" :class="$route.path.startsWith('/admin/hero') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            轮播图管理
          </NuxtLink>
          
          <NuxtLink to="/admin/timeline" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" :class="$route.path.startsWith('/admin/timeline') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            时间线管理
          </NuxtLink>
          
          <NuxtLink to="/admin/ai-suggestions" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" :class="$route.path.startsWith('/admin/ai-suggestions') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            AI 建议管理
          </NuxtLink>
        </div>
        
        <div class="px-6 mt-8 mb-6">
          <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            翻译工具
          </h3>
        </div>
        
        <div class="space-y-1 px-3">
          <NuxtLink to="/admin/translate" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" :class="$route.path.startsWith('/admin/translate') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
            AI 翻译工具
          </NuxtLink>
          
          <NuxtLink to="/admin/batch-translate" class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors" :class="$route.path.startsWith('/admin/batch-translate') ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
            </svg>
            批量翻译
          </NuxtLink>
        </div>
      </nav>
    </div>

    <!-- 主内容区域 -->
    <div class="md:pl-64">
      <!-- 顶部导航栏 -->
      <div class="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between h-16 px-6">
          <button @click="sidebarOpen = true" class="md:hidden">
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <div class="flex items-center space-x-4">
            <!-- 语言切换 -->
            <LanguageSwitcher />

            <!-- 主题切换 -->
            <ThemeSwitcher />

            <!-- 返回前台 -->
            <NuxtLink :to="localePath('/')" class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              返回前台
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- 页面内容 -->
      <main>
        <slot />
      </main>
    </div>

    <!-- 移动端遮罩 -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"></div>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

// 使用 i18n
const localePath = useLocalePath()

// 侧边栏状态
const sidebarOpen = ref(false)

// 监听路由变化，关闭移动端侧边栏
const route = useRoute()
watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>
