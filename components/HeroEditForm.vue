<template>
  <div class="space-y-6">
    <!-- 基本信息 -->
    <div>
      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">基本信息</h4>
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            图片 URL
          </label>
          <input 
            v-model="formData.url" 
            type="url" 
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="https://example.com/image.jpg"
          >
        </div>
        
        <div class="flex items-center">
          <input 
            v-model="formData.isOpening" 
            type="checkbox" 
            id="isOpening"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          >
          <label for="isOpening" class="ml-2 block text-sm text-gray-900 dark:text-white">
            这是开场动画
          </label>
        </div>
      </div>
    </div>

    <!-- 多语言内容 -->
    <div>
      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">多语言内容</h4>
      
      <!-- 语言标签页 -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8">
          <button 
            v-for="lang in languages" 
            :key="lang.code"
            @click="activeLanguage = lang.code"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="activeLanguage === lang.code 
              ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
          >
            {{ lang.name }}
          </button>
        </nav>
      </div>

      <!-- 语言内容表单 -->
      <div class="mt-6 space-y-4">
        <!-- 开场文本（仅开场动画显示） -->
        <div v-if="formData.isOpening">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            开场文本（每行一句）
          </label>
          <textarea 
            v-model="openingTextString" 
            rows="7"
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="在竞技体育中，有些运动员参加比赛。&#10;而另一些，他们改变比赛。"
          ></textarea>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            每行输入一句开场文本
          </p>
        </div>

        <!-- 普通内容字段（非开场动画显示） -->
        <template v-else>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              标题
            </label>
            <input 
              v-model="currentLanguageData.title" 
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="输入标题"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              副标题
            </label>
            <input 
              v-model="currentLanguageData.subtitle" 
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="输入副标题"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              引言
            </label>
            <input 
              v-model="currentLanguageData.quote" 
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="输入引言"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              描述
            </label>
            <textarea 
              v-model="currentLanguageData.description" 
              rows="4"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="输入详细描述"
            ></textarea>
          </div>
        </template>

        <!-- AI 翻译按钮 -->
        <div class="flex items-center space-x-4">
          <button 
            @click="translateContent"
            :disabled="isTranslating"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            <svg v-if="isTranslating" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isTranslating ? '翻译中...' : 'AI 翻译' }}
          </button>
          
          <span class="text-sm text-gray-500 dark:text-gray-400">
            将中文内容翻译为当前语言
          </span>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
      <button 
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        取消
      </button>
      <button 
        @click="saveChanges"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        保存更改
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: any
  languages: Array<{ code: string; name: string }>
}

interface Emits {
  (e: 'save', item: any): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 响应式数据
const activeLanguage = ref('zh')
const isTranslating = ref(false)
const formData = ref({
  url: '',
  isOpening: false,
  multiLanguageData: {}
})

// 计算属性
const currentLanguageData = computed({
  get() {
    if (!formData.value.multiLanguageData[activeLanguage.value]) {
      formData.value.multiLanguageData[activeLanguage.value] = {
        title: '',
        subtitle: '',
        quote: '',
        description: '',
        openingText: []
      }
    }
    return formData.value.multiLanguageData[activeLanguage.value]
  },
  set(value) {
    formData.value.multiLanguageData[activeLanguage.value] = value
  }
})

const openingTextString = computed({
  get() {
    return currentLanguageData.value.openingText?.join('\n') || ''
  },
  set(value) {
    currentLanguageData.value.openingText = value.split('\n').filter(line => line.trim())
  }
})

// 初始化表单数据
const initializeFormData = () => {
  formData.value = {
    url: props.item.url || '',
    isOpening: props.item.isOpening || false,
    multiLanguageData: {}
  }

  // 初始化多语言数据
  props.languages.forEach(lang => {
    formData.value.multiLanguageData[lang.code] = {
      title: props.item.title || '',
      subtitle: props.item.subtitle || '',
      quote: props.item.quote || '',
      description: props.item.description || '',
      openingText: props.item.openingText || []
    }
  })
}

// AI 翻译功能
const translateContent = async () => {
  if (activeLanguage.value === 'zh') {
    alert('当前已是中文，无需翻译')
    return
  }

  isTranslating.value = true
  
  try {
    // 这里应该调用翻译 API
    // 暂时模拟翻译过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 模拟翻译结果
    alert('翻译功能正在开发中，请手动输入翻译内容')
  } catch (error) {
    console.error('翻译失败:', error)
    alert('翻译失败，请稍后重试')
  } finally {
    isTranslating.value = false
  }
}

// 保存更改
const saveChanges = () => {
  const updatedItem = {
    ...props.item,
    url: formData.value.url,
    isOpening: formData.value.isOpening,
    ...formData.value.multiLanguageData[activeLanguage.value]
  }
  
  emit('save', updatedItem)
}

// 监听 props 变化
watch(() => props.item, () => {
  if (props.item) {
    initializeFormData()
  }
}, { immediate: true })
</script>
