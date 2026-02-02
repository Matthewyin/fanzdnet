<template>
  <div class="error-boundary">
    <slot v-if="!hasError" />

    <!-- 错误状态 UI -->
    <div v-else class="error-fallback" role="alert" aria-live="assertive">
      <div class="error-container">
        <!-- 错误图标 -->
        <div class="error-icon-wrapper">
          <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>

        <!-- 错误信息 -->
        <h2 class="error-title">{{ t('errorBoundary.title', '出错了') }}</h2>
        <p class="error-message">{{ errorMessage || t('errorBoundary.defaultMessage', '页面加载时出现错误，请稍后重试。') }}</p>

        <!-- 错误详情（开发环境） -->
        <details v-if="isDev && errorDetails" class="error-details">
          <summary>{{ t('errorBoundary.showDetails', '查看错误详情') }}</summary>
          <pre class="error-stack">{{ errorDetails }}</pre>
        </details>

        <!-- 操作按钮 -->
        <div class="error-actions">
          <button @click="retry" class="error-btn error-btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/>
              <path d="M3 3v9h9"/>
            </svg>
            {{ t('errorBoundary.retry', '重试') }}
          </button>
          <button @click="goHome" class="error-btn error-btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            {{ t('errorBoundary.home', '返回首页') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  fallbackMessage?: string;
  onError?: (error: Error, instance: any, info: string) => void;
}>();

const emit = defineEmits<{
  error: [error: Error, instance: any, info: string];
}>();

const router = useRouter();
const { t } = useI18n();

const hasError = ref(false);
const errorMessage = ref('');
const errorDetails = ref('');

const isDev = computed(() => import.meta.dev);

// 捕获子组件错误
onErrorCaptured((error: Error, instance, info) => {
  // 标记错误状态
  hasError.value = true;
  errorMessage.value = error.message || props.fallbackMessage || '';
  errorDetails.value = error.stack || '';

  // 调用自定义错误处理
  if (props.onError) {
    props.onError(error, instance, info);
  }

  // 触发错误事件
  emit('error', error, instance, info);

  // 在开发环境打印错误
  if (isDev.value) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', info);
  }

  // 阻止错误继续传播
  return false;
});

// 重试功能
const retry = () => {
  hasError.value = false;
  errorMessage.value = '';
  errorDetails.value = '';
};

// 返回首页
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.error-boundary {
  width: 100%;
  height: 100%;
}

.error-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: var(--space-8);
  background-color: var(--bg-primary);
}

.error-container {
  max-width: 480px;
  width: 100%;
  text-align: center;
}

.error-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  margin-bottom: var(--space-6);
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
  border-radius: 50%;
}

.error-icon {
  color: var(--color-error, #ef4444);
}

.error-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.error-message {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.error-details {
  margin-bottom: var(--space-6);
  text-align: left;
}

.error-details summary {
  cursor: pointer;
  padding: var(--space-3);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  transition: all var(--duration-fast) var(--ease-in-out);
}

.error-details summary:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--border-secondary);
}

.error-stack {
  margin-top: var(--space-4);
  padding: var(--space-4);
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

.error-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}

.error-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-in-out);
}

.error-btn-primary {
  background-color: var(--color-primary-500);
  color: #ffffff;
  border: none;
}

.error-btn-primary:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.error-btn-primary:active {
  transform: translateY(0);
}

.error-btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.error-btn-secondary:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--border-secondary);
}

.error-btn:active {
  transform: scale(0.98);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .error-fallback {
    min-height: 300px;
    padding: var(--space-6);
  }

  .error-icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .error-title {
    font-size: var(--text-xl);
  }

  .error-actions {
    flex-direction: column;
  }

  .error-btn {
    width: 100%;
    justify-content: center;
  }
}

/* 深色模式优化 */
.dark .error-icon-wrapper {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.08));
}
</style>
