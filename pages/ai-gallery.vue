<template>
  <div class="ai-gallery-page dynamic-diagonal">
    <!-- 沉浸式背景 -->
    <PageBackground theme="timeline" />

    <!-- 对角线装饰元素 -->
    <div class="diagonal-decorations">
      <div class="diagonal-line line-1"></div>
      <div class="diagonal-line line-2"></div>
      <div class="diagonal-line line-3"></div>
    </div>

    <!-- 页面内容 -->
    <div class="immersive-content">
      <!-- 页面头部 - 左侧倾斜 -->
      <header class="page-header">
        <span class="page-tag">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tag-icon">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
            <path d="M5 3v4"></path>
            <path d="M19 17v4"></path>
            <path d="M3 5h4"></path>
            <path d="M17 19h4"></path>
          </svg>
          {{ t('pages.aiGallery.tag', 'AI 创作') }}
        </span>
        <h1 class="page-title">{{ t('pages.aiGallery.title', 'AI 灵感站') }}</h1>
        <p class="page-subtitle">{{ t('pages.aiGallery.description', '在这里获取一些关于应援物设计的创意灵感吧！') }}</p>
      </header>

      <!-- 主内容网格 -->
      <div class="content-grid">
        <!-- 左侧：说明和工具 -->
        <div class="left-panel">
          <!-- 使用说明 -->
          <div class="instructions-card">
            <h2 class="nav-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" x2="12.01" y1="17" y2="17"></line>
              </svg>
              {{ t('aiGallery.howToUse', '如何使用') }}
            </h2>
            <ol class="instructions-list">
              <li>{{ t('aiGallery.step1', '点击"给我一条灵感！"获取创意描述') }}</li>
              <li>{{ t('aiGallery.step2', '点击"复制"将描述复制到剪贴板') }}</li>
              <li>{{ t('aiGallery.step3', '粘贴到你喜欢的 AI 绘画工具') }}</li>
              <li>{{ t('aiGallery.step4', '生成属于你的樊振东主题艺术作品！') }}</li>
            </ol>
          </div>

          <!-- 推荐工具 -->
          <div class="tools-card">
            <h3 class="section-title">{{ t('aiGallery.recommendedTools', '推荐工具') }}</h3>
            <div class="tools-grid">
              <a v-for="tool in recommendedTools" :key="tool.name" :href="tool.url" target="_blank" rel="noopener" class="tool-card">
                <span class="tool-icon">
                  <!-- Palette/Midjourney -->
                  <svg v-if="tool.icon === 'palette'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                  </svg>
                  <!-- Image/DALL·E -->
                  <svg v-else-if="tool.icon === 'image'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                  <!-- Sparkles/Stable Diffusion -->
                  <svg v-else-if="tool.icon === 'sparkles'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                    <path d="M5 3v4"></path>
                    <path d="M19 17v4"></path>
                    <path d="M3 5h4"></path>
                    <path d="M17 19h4"></path>
                  </svg>
                  <!-- Wand/Leonardo.ai -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"></path>
                    <path d="m14 7 3 3"></path>
                    <path d="M5 6v4"></path>
                    <path d="M19 14v4"></path>
                    <path d="M10 2v2"></path>
                    <path d="M7 8H5"></path>
                    <path d="M21 16h-2"></path>
                    <path d="m11 7-2-2"></path>
                  </svg>
                </span>
                <span class="tool-name">{{ tool.name }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 右侧：灵感卡片 -->
        <div class="right-panel">
          <div class="inspiration-card">
            <div class="card-header">
              <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                <path d="M5 3v4"></path>
                <path d="M19 17v4"></path>
                <path d="M3 5h4"></path>
                <path d="M17 19h4"></path>
              </svg>
              <span class="card-label">{{ t('aiGallery.inspiration', '创意灵感') }}</span>
            </div>
            <div class="card-body">
              <div v-if="loading" class="loading-state">
                <div class="loading-spinner"></div>
                <p>{{ t('aiGallery.loading', '正在获取灵感...') }}</p>
              </div>
              <div v-else-if="error" class="error-state" role="alert" aria-live="polite">
                <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" x2="12" y1="9" y2="13"></line>
                  <line x1="12" x2="12.01" y1="17" y2="17"></line>
                </svg>
                <p>{{ t('aiGallery.error', '获取失败，请重试。') }}</p>
              </div>
              <p v-else class="suggestion-text">{{ suggestion }}</p>
            </div>
            <div class="card-actions">
              <button
                class="action-btn copy-btn"
                @click="copySuggestion"
                :disabled="!suggestion || loading"
                :aria-label="copied ? t('aiGallery.copied', '已复制！') : t('aiGallery.copy', '复制')"
                :aria-disabled="!suggestion || loading"
              >
                <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
                {{ copied ? t('aiGallery.copied', '已复制！') : t('aiGallery.copy', '复制') }}
              </button>
              <button
                class="action-btn generate-btn"
                @click="fetchSuggestion"
                :disabled="loading"
                :aria-label="loading ? t('aiGallery.loading', '生成中...') : t('aiGallery.generate', '生成灵感')"
                :aria-disabled="loading"
              >
                <svg v-if="loading" class="btn-icon loading-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" x2="12" y1="2" y2="6"></line>
                  <line x1="12" x2="12" y1="18" y2="22"></line>
                  <line x1="4.93" x2="7.76" y1="4.93" y2="7.76"></line>
                  <line x1="16.24" x2="19.07" y1="16.24" y2="19.07"></line>
                  <line x1="2" x2="6" y1="12" y2="12"></line>
                  <line x1="18" x2="22" y1="12" y2="12"></line>
                  <line x1="4.93" x2="7.76" y1="19.07" y2="16.24"></line>
                  <line x1="16.24" x2="19.07" y1="7.76" y2="4.93"></line>
                </svg>
                <svg v-else class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  <path d="M5 3v4"></path>
                  <path d="M19 17v4"></path>
                  <path d="M3 5h4"></path>
                  <path d="M17 19h4"></path>
                </svg>
                {{ loading ? t('aiGallery.thinking', '思考中...') : t('pages.aiGallery.button', '给我一条灵感！') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const { t, locale } = useI18n();

// SEO
const { setPageSEO } = useSEO();
setPageSEO('aiGallery', locale.value);

const suggestion = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const copied = ref(false);

// 推荐工具
const recommendedTools = [
  { name: 'Midjourney', icon: 'palette', url: 'https://midjourney.com' },
  { name: 'DALL·E', icon: 'image', url: 'https://openai.com/dall-e-3' },
  { name: 'Stable Diffusion', icon: 'sparkles', url: 'https://stability.ai' },
  { name: 'Leonardo.ai', icon: 'wand', url: 'https://leonardo.ai' }
];

// 初始化默认文本
onMounted(() => {
  suggestion.value = t('pages.aiGallery.subtitle', '点击下方的按钮，开始你的创作之旅。');
});

const fetchSuggestion = async () => {
  loading.value = true;
  error.value = null;
  copied.value = false;
  try {
    const response = await fetch(`/api/ai/suggestion?lang=${locale.value}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.success) {
      suggestion.value = data.suggestion;
    } else {
      throw new Error(data.error);
    }
  } catch (e: any) {
    error.value = e.message;
    suggestion.value = t('aiGallery.error', '抱歉，灵感暂时枯竭了，请稍后再试。');
  } finally {
    loading.value = false;
  }
};

const copySuggestion = async () => {
  if (!suggestion.value) return;
  try {
    await navigator.clipboard.writeText(suggestion.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch (e) {
    console.error('Failed to copy:', e);
  }
};
</script>

<style scoped>
/* 页面容器 */
.ai-gallery-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 对角线装饰元素 */
.diagonal-decorations {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.diagonal-line {
  position: absolute;
  background: linear-gradient(135deg, transparent, rgba(168, 85, 247, 0.1), transparent);
  transform-origin: center;
}

.line-1 {
  width: 200%;
  height: 2px;
  top: 25%;
  left: -50%;
  transform: rotate(45deg);
  animation: diagonalMove1 15s ease-in-out infinite;
}

.line-2 {
  width: 150%;
  height: 1px;
  top: 55%;
  left: -25%;
  transform: rotate(45deg);
  animation: diagonalMove2 20s ease-in-out infinite;
}

.line-3 {
  width: 180%;
  height: 1.5px;
  top: 85%;
  left: -40%;
  transform: rotate(45deg);
  animation: diagonalMove3 18s ease-in-out infinite;
}

@keyframes diagonalMove1 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(30px); }
}

@keyframes diagonalMove2 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(-40px); }
}

@keyframes diagonalMove3 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(20px); }
}

/* 内容区域 */
.immersive-content {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
  padding-bottom: calc(var(--space-20) + 80px);
  position: relative;
  z-index: 1;
}

/* 页面头部 */
.page-header {
  text-align: left;
  margin-bottom: var(--space-12);
  transform: skewX(-5deg);
  padding-left: var(--space-6);
}

.page-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(168, 85, 247, 0.2);
  border: 1px solid rgba(168, 85, 247, 0.4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: #c084fc;
  margin-bottom: var(--space-4);
  transform: skewX(5deg);
}

.page-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(168, 85, 247, 0.5);
  margin-bottom: var(--space-3);
  transform: skewX(5deg);
}

.page-subtitle {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.8);
  transform: skewX(5deg);
}

/* 主内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr 1.2fr;
  }
}

/* 左侧面板 */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 说明卡片 */
.instructions-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--space-6);
  transform: skewX(-5deg);
}

.nav-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid rgba(168, 85, 247, 0.3);
  transform: skewX(5deg);
}

.instructions-list {
  list-style: decimal;
  padding-left: var(--space-5);
  transform: skewX(5deg);
}

.instructions-list li {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin-bottom: var(--space-3);
}

/* 工具卡片 */
.tools-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--space-6);
  transform: skewX(-5deg);
}

.section-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-4);
  transform: skewX(5deg);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.tool-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--duration-fast) var(--ease-out);
  transform: skewX(5deg);
}

.tool-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(168, 85, 247, 0.4);
  transform: skewX(5deg) translateY(-4px);
}

.tool-icon {
  font-size: 24px;
  color: #c084fc;
}

.tool-name {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: #ffffff;
}

/* 右侧面板 */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 灵感卡片 */
.inspiration-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(168, 85, 247, 0.3);
  overflow: hidden;
  position: relative;
  transform: rotate(-1deg);
  transition: all var(--duration-normal) var(--ease-out);
}

.inspiration-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(135deg, transparent, rgba(168, 85, 247, 0.05), transparent);
  transform: rotate(45deg);
  transition: all var(--duration-slow) var(--ease-out);
  opacity: 0;
}

.inspiration-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% { transform: rotate(45deg) translateY(100%); }
  100% { transform: rotate(45deg) translateY(-100%); }
}

.inspiration-card:hover {
  transform: rotate(0deg) translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.5);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  background: rgba(168, 85, 247, 0.15);
  border-bottom: 1px solid rgba(168, 85, 247, 0.2);
}

.card-icon {
  font-size: var(--text-xl);
  color: #c084fc;
}

.card-label {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: #c084fc;
}

.card-body {
  padding: var(--space-8) var(--space-6);
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.suggestion-text {
  font-size: var(--text-xl);
  font-style: italic;
  line-height: 1.7;
  color: #ffffff;
  text-align: center;
}

.loading-state,
.error-state {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(168, 85, 247, 0.3);
  border-top-color: #c084fc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-4);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 32px;
  display: block;
  margin-bottom: var(--space-2);
}

.card-actions {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  background: rgba(168, 85, 247, 0.1);
  border-top: 1px solid rgba(168, 85, 247, 0.2);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.copy-btn {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.copy-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(168, 85, 247, 0.5);
}

.generate-btn {
  color: #ffffff;
  background: linear-gradient(135deg, #a855f7, #6366f1);
}

.generate-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #c084fc, #818cf8);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: var(--text-lg);
}

/* 响应式 */
@media (max-width: 1023px) {
  .diagonal-decorations {
    display: none;
  }

  .page-header {
    text-align: center;
    transform: none;
    padding-left: 0;
  }

  .page-tag,
  .page-title,
  .page-subtitle {
    transform: none;
  }

  .instructions-card,
  .tools-card {
    transform: none;
  }

  .nav-title,
  .section-title,
  .instructions-list,
  .tool-card {
    transform: none;
  }

  .tool-card:hover {
    transform: translateY(-4px);
  }

  .inspiration-card {
    transform: none;
  }

  .inspiration-card:hover {
    transform: translateY(-6px) scale(1.02);
  }
}

@media (max-width: 640px) {
  .immersive-content {
    padding: var(--space-6) var(--space-4);
  }

  .page-title {
    font-size: var(--text-3xl);
  }

  .suggestion-text {
    font-size: var(--text-lg);
  }

  .card-actions {
    flex-direction: column;
  }
}
</style>
