<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        批量翻译
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        批量翻译网站内容到多种语言
      </p>
    </div>

    <!-- 翻译配置 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        翻译配置
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            源语言
          </label>
          <select v-model="config.sourceLanguage" class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            目标语言
          </label>
          <div class="space-y-2">
            <label v-for="lang in targetLanguages" :key="lang.code" class="flex items-center">
              <input 
                v-model="config.targetLanguages" 
                :value="lang.code"
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <span class="ml-2 text-sm text-gray-900 dark:text-white">{{ lang.name }}</span>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            内容类型
          </label>
          <div class="space-y-2">
            <label v-for="type in contentTypes" :key="type.value" class="flex items-center">
              <input 
                v-model="config.contentTypes" 
                :value="type.value"
                type="checkbox" 
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              >
              <span class="ml-2 text-sm text-gray-900 dark:text-white">{{ type.label }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button 
            @click="startBatchTranslation"
            :disabled="!canStartTranslation || isTranslating"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <svg v-if="isTranslating" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isTranslating ? '翻译中...' : '开始批量翻译' }}
          </button>

          <button 
            v-if="isTranslating"
            @click="stopTranslation"
            class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 transition-colors"
          >
            停止翻译
          </button>
        </div>

        <div v-if="translationProgress.total > 0" class="flex items-center space-x-4">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ translationProgress.completed }} / {{ translationProgress.total }}
          </div>
          <div class="w-32 bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${(translationProgress.completed / translationProgress.total) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 翻译进度 -->
    <div v-if="translationTasks.length > 0" class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
          翻译进度
        </h2>
      </div>
      
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="task in translationTasks" :key="task.id" class="p-6">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div v-if="task.status === 'completed'" class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div v-else-if="task.status === 'error'" class="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <div v-else-if="task.status === 'processing'" class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <svg class="animate-spin w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <div v-else class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ task.title }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ getLanguageName(task.sourceLanguage) }} → {{ getLanguageName(task.targetLanguage) }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': task.status === 'completed',
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200': task.status === 'error',
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': task.status === 'processing',
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200': task.status === 'pending'
                    }">
                {{ getStatusText(task.status) }}
              </span>
              
              <button v-if="task.status === 'error'" @click="retryTask(task)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm">
                重试
              </button>
            </div>
          </div>
          
          <div v-if="task.error" class="mt-2 text-sm text-red-600 dark:text-red-400">
            错误：{{ task.error }}
          </div>
          
          <div v-if="task.preview" class="mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">预览：</span>
            {{ task.preview }}
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
const config = ref({
  sourceLanguage: 'zh',
  targetLanguages: [],
  contentTypes: []
})

const isTranslating = ref(false)
const translationTasks = ref([])
const translationProgress = ref({
  completed: 0,
  total: 0
})

// 目标语言选项
const targetLanguages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'sv', name: 'Svenska' }
]

// 内容类型选项
const contentTypes = [
  { value: 'hero', label: '轮播图内容' },
  { value: 'timeline', label: '时间线事件' },
  { value: 'ai-suggestions', label: 'AI 建议' },
  { value: 'ui-text', label: 'UI 界面文本' }
]

// 语言名称映射
const languageNames = {
  zh: '中文',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  sv: 'Svenska'
}

// 计算属性
const canStartTranslation = computed(() => {
  return config.value.targetLanguages.length > 0 && config.value.contentTypes.length > 0
})

// 获取语言名称
const getLanguageName = (code: string) => {
  return languageNames[code] || code
}

// 获取状态文本
const getStatusText = (status: string) => {
  const statusMap = {
    pending: '等待中',
    processing: '翻译中',
    completed: '已完成',
    error: '失败'
  }
  return statusMap[status] || status
}

// 开始批量翻译
const startBatchTranslation = async () => {
  if (!canStartTranslation.value) return

  isTranslating.value = true
  translationTasks.value = []
  translationProgress.value = { completed: 0, total: 0 }

  try {
    // 生成翻译任务
    const tasks = generateTranslationTasks()
    translationTasks.value = tasks
    translationProgress.value.total = tasks.length

    // 执行翻译任务
    for (const task of tasks) {
      if (!isTranslating.value) break // 检查是否被停止

      task.status = 'processing'
      
      try {
        await executeTranslationTask(task)
        task.status = 'completed'
        translationProgress.value.completed++
      } catch (error) {
        task.status = 'error'
        task.error = error.message
        translationProgress.value.completed++
      }
    }

  } catch (error) {
    console.error('批量翻译失败:', error)
    alert('批量翻译失败，请稍后重试')
  } finally {
    isTranslating.value = false
  }
}

// 生成翻译任务
const generateTranslationTasks = () => {
  const tasks = []
  let taskId = 1

  for (const contentType of config.value.contentTypes) {
    for (const targetLang of config.value.targetLanguages) {
      tasks.push({
        id: taskId++,
        title: `${getContentTypeName(contentType)} - ${getLanguageName(targetLang)}`,
        contentType,
        sourceLanguage: config.value.sourceLanguage,
        targetLanguage: targetLang,
        status: 'pending',
        error: null,
        preview: null
      })
    }
  }

  return tasks
}

// 获取内容类型名称
const getContentTypeName = (type: string) => {
  const typeMap = {
    hero: '轮播图内容',
    timeline: '时间线事件',
    'ai-suggestions': 'AI 建议',
    'ui-text': 'UI 界面文本'
  }
  return typeMap[type] || type
}

// 执行翻译任务
const executeTranslationTask = async (task: any) => {
  // 模拟翻译过程
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 这里应该调用实际的翻译 API
  task.preview = `${task.title} 翻译完成`
}

// 停止翻译
const stopTranslation = () => {
  isTranslating.value = false
}

// 重试任务
const retryTask = async (task: any) => {
  task.status = 'processing'
  task.error = null
  
  try {
    await executeTranslationTask(task)
    task.status = 'completed'
  } catch (error) {
    task.status = 'error'
    task.error = error.message
  }
}
</script>
