<template>
  <div class="optimized-image-container" :class="containerClass">
    <!-- 加载占位符 -->
    <div
      v-if="isLoading"
      class="image-placeholder"
      :style="{ aspectRatio: aspectRatio }"
    >
      <div class="placeholder-content">
        <svg class="animate-spin h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <!-- 错误占位符 -->
    <div
      v-else-if="hasError"
      class="image-error"
      :style="{ aspectRatio: aspectRatio }"
    >
      <div class="error-content">
        <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-sm text-gray-500 mt-2">图片加载失败</span>
      </div>
    </div>

    <!-- 实际图片 -->
    <NuxtImg
      v-else
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="sizes"
      :quality="quality"
      :format="format"
      :loading="loading"
      :class="imageClass"
      :style="imageStyle"
      @load="handleLoad"
      @error="handleError"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  quality?: number
  format?: string
  loading?: 'lazy' | 'eager'
  aspectRatio?: string
  containerClass?: string
  imageClass?: string
  imageStyle?: Record<string, any>
  placeholder?: boolean
  fallbackSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  quality: 80,
  format: 'webp',
  loading: 'lazy',
  aspectRatio: 'auto',
  placeholder: true,
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
})

// 响应式状态
const isLoading = ref(props.placeholder)
const hasError = ref(false)

// 处理图片加载完成
const handleLoad = () => {
  isLoading.value = false
  hasError.value = false
}

// 处理图片加载错误
const handleError = () => {
  isLoading.value = false
  hasError.value = true
  
  // 如果有备用图片，尝试加载
  if (props.fallbackSrc && props.src !== props.fallbackSrc) {
    // 这里可以实现备用图片逻辑
    console.warn(`Image failed to load: ${props.src}`)
  }
}

// 监听 src 变化
watch(() => props.src, () => {
  if (props.placeholder) {
    isLoading.value = true
    hasError.value = false
  }
})

// 组件挂载时的处理
onMounted(() => {
  // 如果图片已经在缓存中，立即显示
  if (process.client && props.src) {
    const img = new Image()
    img.onload = () => {
      isLoading.value = false
    }
    img.onerror = () => {
      hasError.value = true
      isLoading.value = false
    }
    img.src = props.src
  }
})
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  overflow: hidden;
}

.image-placeholder,
.image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  min-height: 200px;
}

.dark .image-placeholder,
.dark .image-error {
  background-color: #374151;
}

.placeholder-content,
.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
}

.optimized-image-container img {
  width: 100%;
  height: auto;
  transition: opacity 0.3s ease-in-out;
}

/* 响应式图片样式 */
@media (max-width: 640px) {
  .image-placeholder,
  .image-error {
    min-height: 150px;
  }
}

/* 懒加载动画 */
.optimized-image-container img[loading="lazy"] {
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .image-placeholder,
  .image-error {
    border: 2px solid currentColor;
  }
}

/* 减少动画偏好支持 */
@media (prefers-reduced-motion: reduce) {
  .optimized-image-container img,
  .placeholder-content svg {
    animation: none;
    transition: none;
  }
}
</style>
