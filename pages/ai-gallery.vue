<template>
  <div class="ai-gallery-container">
    <h2>{{ t('pages.aiGallery.title', 'AI 灵感站') }}</h2>
    <p>{{ t('pages.aiGallery.description', '在这里获取一些关于应援物设计的创意灵感吧！') }}</p>
    <div class="suggestion-card">
      <p v-if="loading">{{ t('aiGallery.loading', '正在获取灵感...') }}</p>
      <p v-else-if="error">{{ t('aiGallery.error', '获取失败，请重试。') }}</p>
      <p v-else class="suggestion-text">{{ suggestion }}</p>
    </div>
    <button @click="fetchSuggestion" :disabled="loading">
      {{ loading ? t('aiGallery.loading', '思考中...') : t('pages.aiGallery.button', '给我一条灵感！') }}
    </button>
    <div class="copy-notice">
      <p>{{ t('pages.aiGallery.instruction', '复制上面的描述，到你喜欢的 AI 绘画工具中尝试生成吧！') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 使用 i18n
const { t, locale } = useI18n()

// SEO 优化
const { setPageSEO } = useSEO()
setPageSEO('aiGallery', locale.value)

const suggestion = ref('')
const loading = ref(false)
const error = ref(null)

// 初始化默认文本
onMounted(() => {
  suggestion.value = t('pages.aiGallery.subtitle', '点击下方的按钮，开始你的创作之旅。')
})

const fetchSuggestion = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch(`/api/ai/suggestion?lang=${locale.value}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    if (data.success) {
      suggestion.value = data.suggestion
    } else {
      throw new Error(data.error)
    }
  } catch (e) {
    error.value = e.message
    suggestion.value = t('aiGallery.error', '抱歉，灵感暂时枯竭了，请稍后再试。')
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.ai-gallery-container {
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
  border-radius: 16px;
  background-color: var(--bg-secondary);
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.suggestion-card {
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  background-color: var(--bg-tertiary);
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.suggestion-text {
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--text-primary);
}

button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background-color: #ffd700;
  color: #0a1428;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
}

.copy-notice {
  margin-top: 2rem;
  font-size: 1rem;
  color: var(--text-tertiary);
}

/* Basic theme variables */
:root {
  --bg-secondary: #f0f4f8;
  --bg-tertiary: #ffffff;
  --text-primary: #111;
  --text-secondary: #555;
  --text-tertiary: #888;
}

.dark body {
  --bg-secondary: #1e293b;
  --bg-tertiary: #0f172a;
  --text-primary: #ebf4f1;
  --text-secondary: #94a3b8;
  --text-tertiary: #64748b;
}
</style>