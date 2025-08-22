<!-- 
📝 新页面模板
复制此模板来创建支持多语言的新页面

使用方法：
1. 复制此文件到 pages/ 目录
2. 重命名为你的页面名称
3. 替换所有 "myPage" 为你的页面名称
4. 在 locales/zh-CN.json 中添加对应的翻译键
5. 使用管理后台翻译工具翻译到其他语言
-->

<template>
  <div class="page-container">
    <!-- 页面标题 -->
    <h1>{{ t('pages.myPage.title', '页面标题') }}</h1>
    
    <!-- 页面描述 -->
    <p>{{ t('pages.myPage.description', '页面描述文本') }}</p>
    
    <!-- 示例：带加载状态的内容 -->
    <div v-if="loading" class="loading">
      {{ t('common.loading', '加载中...') }}
    </div>
    
    <!-- 示例：错误状态 -->
    <div v-else-if="error" class="error">
      {{ t('common.error', '发生错误') }}: {{ error }}
      <button @click="retry">{{ t('common.retry', '重试') }}</button>
    </div>
    
    <!-- 示例：主要内容 -->
    <div v-else class="content">
      <h2>{{ t('pages.myPage.sectionTitle', '章节标题') }}</h2>
      <p>{{ t('pages.myPage.sectionContent', '章节内容') }}</p>
      
      <!-- 示例：按钮 -->
      <button @click="handleAction" class="action-button">
        {{ t('pages.myPage.actionButton', '操作按钮') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 必需的导入和设置
const { t, locale } = useI18n()
const { setPageSEO } = useSEO()

// 设置页面 SEO（推荐）
setPageSEO('myPage', locale.value)

// 页面状态
const loading = ref(false)
const error = ref<string | null>(null)

// 示例：数据获取函数
const fetchData = async () => {
  loading.value = true
  error.value = null
  
  try {
    // 在这里添加你的数据获取逻辑
    // const response = await fetch('/api/my-data')
    // const data = await response.json()
    
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('common.error', '发生错误')
  } finally {
    loading.value = false
  }
}

// 示例：重试函数
const retry = () => {
  fetchData()
}

// 示例：操作函数
const handleAction = () => {
  console.log('Action clicked')
  // 在这里添加你的操作逻辑
}

// 页面加载时获取数据
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

h2 {
  font-size: 2rem;
  margin: 2rem 0 1rem 0;
  color: var(--text-primary);
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #ef4444;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
}

.action-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #2563eb;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}
</style>

<!-- 
📋 对应的语言文件结构 (locales/zh-CN.json):

{
  "pages": {
    "myPage": {
      "title": "页面标题",
      "description": "页面描述文本",
      "sectionTitle": "章节标题", 
      "sectionContent": "章节内容",
      "actionButton": "操作按钮"
    }
  }
}

🔄 翻译步骤：
1. 在 locales/zh-CN.json 中添加上述翻译键
2. 访问 /admin/translate 翻译到其他语言
3. 或使用 /admin/batch-translate 批量翻译
-->
