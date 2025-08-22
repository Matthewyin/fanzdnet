<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      :class="{ 'bg-gray-100 dark:bg-gray-700': showDropdown }"
    >
      <span class="text-lg">{{ currentLanguage.flag }}</span>
      <span class="hidden sm:inline">{{ currentLanguage.name }}</span>
      <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': showDropdown }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
      @click.stop
    >
      <div class="py-1">
        <button
          v-for="language in availableLanguages"
          :key="language.code"
          @click="switchLanguage(language.code)"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          :class="{ 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200': currentLanguage.code === language.code }"
        >
          <span class="text-lg mr-3">{{ language.flag }}</span>
          <div class="flex-1 text-left">
            <div class="font-medium">{{ language.name }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ language.nativeName }}</div>
          </div>
          <svg
            v-if="currentLanguage.code === language.code"
            class="w-4 h-4 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 点击外部关闭下拉菜单 -->
    <div
      v-if="showDropdown"
      @click="showDropdown = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { SupportedLanguage } from '~/types/firestore'

// 响应式数据
const showDropdown = ref(false)
const currentLocale = ref<SupportedLanguage>('zh')

// 可用语言配置
const availableLanguages = [
  {
    code: 'zh' as SupportedLanguage,
    name: '中文',
    nativeName: '中文',
    flag: '🇨🇳'
  },
  {
    code: 'en' as SupportedLanguage,
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'fr' as SupportedLanguage,
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'de' as SupportedLanguage,
    name: 'Deutsch',
    nativeName: 'Deutsch',
    flag: '🇩🇪'
  },
  {
    code: 'ja' as SupportedLanguage,
    name: '日本語',
    nativeName: '日本語',
    flag: '🇯🇵'
  },
  {
    code: 'ko' as SupportedLanguage,
    name: '한국어',
    nativeName: '한국어',
    flag: '🇰🇷'
  },
  {
    code: 'sv' as SupportedLanguage,
    name: 'Svenska',
    nativeName: 'Svenska',
    flag: '🇸🇪'
  }
]

// 计算当前语言
const currentLanguage = computed(() => {
  return availableLanguages.find(lang => lang.code === currentLocale.value) || availableLanguages[0]
})

// 切换下拉菜单
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 切换语言
const switchLanguage = async (languageCode: SupportedLanguage) => {
  if (languageCode === currentLocale.value) {
    showDropdown.value = false
    return
  }

  try {
    // 更新当前语言
    currentLocale.value = languageCode
    
    // 保存到 localStorage
    if (process.client) {
      localStorage.setItem('preferred-language', languageCode)
    }
    
    // 这里可以触发页面内容的语言切换
    // 由于我们暂时没有启用 i18n，先模拟语言切换
    console.log(`切换到语言: ${languageCode}`)
    
    // 关闭下拉菜单
    showDropdown.value = false
    
    // 可以发出事件通知父组件
    emit('language-changed', languageCode)
    
  } catch (error) {
    console.error('语言切换失败:', error)
  }
}

// 地理位置检测和语言推荐
const detectLocationAndRecommendLanguage = async () => {
  if (!process.client) return

  try {
    // 检查是否已有用户偏好
    const savedLanguage = localStorage.getItem('preferred-language') as SupportedLanguage
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      currentLocale.value = savedLanguage
      return
    }

    // 尝试通过浏览器语言检测
    const browserLanguage = navigator.language.toLowerCase()
    
    // 语言映射
    const languageMap: Record<string, SupportedLanguage> = {
      'zh': 'zh',
      'zh-cn': 'zh',
      'zh-hans': 'zh',
      'en': 'en',
      'en-us': 'en',
      'en-gb': 'en',
      'fr': 'fr',
      'fr-fr': 'fr',
      'de': 'de',
      'de-de': 'de',
      'ja': 'ja',
      'ja-jp': 'ja',
      'ko': 'ko',
      'ko-kr': 'ko',
      'sv': 'sv',
      'sv-se': 'sv'
    }

    // 检查完整匹配
    if (languageMap[browserLanguage]) {
      currentLocale.value = languageMap[browserLanguage]
      return
    }

    // 检查语言前缀匹配
    const languagePrefix = browserLanguage.split('-')[0]
    if (languageMap[languagePrefix]) {
      currentLocale.value = languageMap[languagePrefix]
      return
    }

    // 尝试地理位置检测（可选）
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 这里可以根据地理位置推荐语言
          // 由于需要地理位置服务，暂时跳过
          console.log('地理位置检测成功，但暂未实现语言推荐')
        },
        (error) => {
          console.log('地理位置检测失败:', error.message)
        },
        { timeout: 5000 }
      )
    }

  } catch (error) {
    console.error('语言检测失败:', error)
  }
}

// 定义事件
const emit = defineEmits<{
  'language-changed': [language: SupportedLanguage]
}>()

// 组件挂载时检测语言
onMounted(() => {
  detectLocationAndRecommendLanguage()
})

// 监听路由变化，关闭下拉菜单
const route = useRoute()
watch(() => route.path, () => {
  showDropdown.value = false
})

// 暴露当前语言给父组件
defineExpose({
  currentLanguage: currentLocale
})
</script>
