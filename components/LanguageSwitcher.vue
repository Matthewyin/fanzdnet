<template>
  <div class="relative language-switcher">
    <!-- 语言选择按钮 -->
    <button
      @click="toggleDropdown"
      class="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/70 transition-all duration-300 shadow-lg hover:shadow-xl"
      :class="{ 'bg-white/20 dark:bg-gray-700/70 shadow-xl': showDropdown }"
    >
      <!-- 当前语言标志 -->
      <div class="relative">
        <span class="text-xl filter drop-shadow-sm">{{ currentLanguage.flag }}</span>
        <div class="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <!-- 语言名称 -->
      <span class="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {{ currentLanguage.name }}
      </span>

      <!-- 下拉箭头 -->
      <svg
        class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-all duration-300"
        :class="{ 'rotate-180': showDropdown }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showDropdown"
        class="absolute right-0 mt-3 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 z-50 border border-white/20 dark:border-gray-700/50"
        @click.stop
      >
        <div class="p-2">
          <!-- 语言选项 -->
          <button
            v-for="language in availableLanguages"
            :key="language.code"
            @click="switchLanguage(language.code)"
            class="group flex items-center w-full px-4 py-3 text-sm rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30"
            :class="{
              'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 shadow-md': currentLanguage.code === language.code
            }"
          >
            <!-- 国旗 -->
            <div class="relative mr-4">
              <span class="text-xl filter drop-shadow-sm">{{ language.flag }}</span>
              <div
                v-if="currentLanguage.code === language.code"
                class="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur animate-pulse"
              ></div>
            </div>

            <!-- 语言信息 -->
            <div class="flex-1 text-left">
              <div
                class="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                :class="{ 'text-blue-700 dark:text-blue-300': currentLanguage.code === language.code }"
              >
                {{ language.name }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {{ language.nativeName }}
              </div>
            </div>

            <!-- 选中状态指示器 -->
            <div class="ml-3">
              <Transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform scale-0 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-0 opacity-0"
              >
                <div
                  v-if="currentLanguage.code === language.code"
                  class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </Transition>
            </div>
          </button>
        </div>

        <!-- 底部装饰 -->
        <div class="px-4 py-2 border-t border-gray-200/50 dark:border-gray-700/50">
          <div class="text-xs text-gray-400 dark:text-gray-500 text-center">
            选择语言
          </div>
        </div>
      </div>
    </Transition>

    <!-- 点击外部关闭下拉菜单 -->
    <div
      v-if="showDropdown"
      @click="showDropdown = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
// 响应式数据
const showDropdown = ref(false)
const currentLocale = ref('zh')

// 可用语言配置
const availableLanguages = [
  { code: 'zh', name: '中文', nativeName: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'sv', name: 'Svenska', nativeName: 'Svenska', flag: '🇸🇪' }
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
const switchLanguage = async (languageCode: string) => {
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

    // 关闭下拉菜单
    showDropdown.value = false

    // 发出事件通知父组件
    emit('language-changed', languageCode)

    // 添加一些视觉反馈
    console.log(`✅ 语言已切换到: ${currentLanguage.value.name}`)

    // TODO: 实现真正的语言切换逻辑
    // 这里可以触发页面重新加载或更新内容

  } catch (error) {
    console.error('❌ 语言切换失败:', error)
  }
}

// 定义事件
const emit = defineEmits<{
  'language-changed': [language: string]
}>()

// 监听路由变化，关闭下拉菜单
const route = useRoute()
watch(() => route.path, () => {
  showDropdown.value = false
})

// 监听点击外部关闭下拉菜单
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element
    if (!target.closest('.language-switcher')) {
      showDropdown.value = false
    }
  }

  document.addEventListener('click', handleClickOutside)

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

// 初始化语言
onMounted(() => {
  if (process.client) {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
      currentLocale.value = savedLanguage
    }
  }
})

// 暴露当前语言给父组件
defineExpose({
  currentLanguage: computed(() => currentLocale.value)
})
</script>
