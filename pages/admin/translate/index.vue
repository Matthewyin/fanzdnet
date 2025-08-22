<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        AI 翻译工具
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        使用 AI 技术快速翻译内容到多种语言
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 输入区域 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          原文输入
        </h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              源语言
            </label>
            <select v-model="sourceLanguage" class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="zh">中文</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="sv">Svenska</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              原文内容
            </label>
            <textarea 
              v-model="sourceText" 
              rows="12"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="请输入要翻译的内容..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              翻译类型
            </label>
            <select v-model="translationType" class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="general">通用翻译</option>
              <option value="literary">文学翻译</option>
              <option value="sports">体育专业</option>
              <option value="formal">正式文档</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 输出区域 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
            翻译结果
          </h2>
          <div class="flex items-center space-x-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              目标语言：
            </label>
            <select v-model="targetLanguage" class="block px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
              <option value="sv">Svenska</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>

        <div class="space-y-4">
          <div class="relative">
            <textarea 
              v-model="translatedText" 
              rows="12"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="翻译结果将显示在这里..."
              :readonly="isTranslating"
            ></textarea>
            
            <!-- 翻译中的加载状态 -->
            <div v-if="isTranslating" class="absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75 flex items-center justify-center rounded-md">
              <div class="flex items-center space-x-2">
                <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm text-gray-600 dark:text-gray-400">AI 翻译中...</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button 
                @click="translateText"
                :disabled="!sourceText.trim() || isTranslating"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                </svg>
                开始翻译
              </button>

              <button 
                @click="clearAll"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                清空
              </button>
            </div>

            <button 
              v-if="translatedText"
              @click="copyToClipboard"
              class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              复制结果
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 翻译历史 -->
    <div class="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          翻译历史
        </h2>
      </div>
      <div class="p-6">
        <div v-if="translationHistory.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
            暂无翻译历史
          </p>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="(item, index) in translationHistory" :key="index" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ getLanguageName(item.sourceLanguage) }} → {{ getLanguageName(item.targetLanguage) }}
                </span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ item.timestamp }}
                </span>
              </div>
              <button @click="useTranslation(item)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm">
                使用此翻译
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">原文：</p>
                <p class="text-gray-900 dark:text-white line-clamp-3">{{ item.sourceText }}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400 mb-1">译文：</p>
                <p class="text-gray-900 dark:text-white line-clamp-3">{{ item.translatedText }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
definePageMeta({
  layout: 'admin'
})

// 响应式数据
const sourceLanguage = ref('zh')
const targetLanguage = ref('en')
const sourceText = ref('')
const translatedText = ref('')
const translationType = ref('general')
const isTranslating = ref(false)
const translationHistory = ref([])

// 语言映射
const languageNames = {
  zh: '中文',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  sv: 'Svenska'
}

// 获取语言名称
const getLanguageName = (code: string) => {
  return languageNames[code] || code
}

// 翻译文本
const translateText = async () => {
  if (!sourceText.value.trim()) return

  isTranslating.value = true
  
  try {
    // 模拟 AI 翻译 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 这里应该调用真实的翻译 API
    // const response = await $fetch('/api/translate', {
    //   method: 'POST',
    //   body: {
    //     text: sourceText.value,
    //     from: sourceLanguage.value,
    //     to: targetLanguage.value,
    //     type: translationType.value
    //   }
    // })
    
    // 模拟翻译结果
    translatedText.value = `[${getLanguageName(targetLanguage.value)} 翻译] ${sourceText.value}`
    
    // 添加到历史记录
    translationHistory.value.unshift({
      sourceLanguage: sourceLanguage.value,
      targetLanguage: targetLanguage.value,
      sourceText: sourceText.value,
      translatedText: translatedText.value,
      timestamp: new Date().toLocaleString()
    })
    
    // 限制历史记录数量
    if (translationHistory.value.length > 10) {
      translationHistory.value = translationHistory.value.slice(0, 10)
    }
    
  } catch (error) {
    console.error('翻译失败:', error)
    alert('翻译失败，请稍后重试')
  } finally {
    isTranslating.value = false
  }
}

// 清空所有内容
const clearAll = () => {
  sourceText.value = ''
  translatedText.value = ''
}

// 复制到剪贴板
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(translatedText.value)
    alert('已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    alert('复制失败')
  }
}

// 使用历史翻译
const useTranslation = (item: any) => {
  sourceLanguage.value = item.sourceLanguage
  targetLanguage.value = item.targetLanguage
  sourceText.value = item.sourceText
  translatedText.value = item.translatedText
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
