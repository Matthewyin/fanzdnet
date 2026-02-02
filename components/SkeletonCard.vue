<template>
  <div class="skeleton-card" :style="cardStyle">
    <!-- 图片占位 -->
    <div v-if="showImage" class="skeleton-image" :style="imageStyle"></div>
    
    <!-- 内容区域 -->
    <div class="skeleton-content">
      <!-- 标签/日期行 -->
      <div v-if="showMeta" class="skeleton-meta">
        <div class="skeleton-line skeleton-tag"></div>
        <div class="skeleton-line skeleton-date"></div>
      </div>
      
      <!-- 标题 -->
      <div class="skeleton-line skeleton-title"></div>
      <div v-if="titleLines > 1" class="skeleton-line skeleton-title short"></div>
      
      <!-- 描述 -->
      <div v-for="i in descriptionLines" :key="i" class="skeleton-line skeleton-text" :class="{ short: i === descriptionLines }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showImage?: boolean;
  showMeta?: boolean;
  imageHeight?: string;
  titleLines?: number;
  descriptionLines?: number;
  borderRadius?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showImage: true,
  showMeta: true,
  imageHeight: '160px',
  titleLines: 1,
  descriptionLines: 2,
  borderRadius: 'var(--radius-xl)'
});

const cardStyle = computed(() => ({
  borderRadius: props.borderRadius
}));

const imageStyle = computed(() => ({
  height: props.imageHeight
}));
</script>

<style scoped>
.skeleton-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  overflow: hidden;
}

.skeleton-image {
  background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

.skeleton-content {
  padding: var(--space-5);
}

.skeleton-meta {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.skeleton-line {
  background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}

.skeleton-tag {
  width: 60px;
  height: 16px;
}

.skeleton-date {
  width: 80px;
  height: 16px;
}

.skeleton-title {
  height: 24px;
  margin-bottom: var(--space-2);
}

.skeleton-title.short {
  width: 70%;
}

.skeleton-text {
  height: 16px;
  margin-bottom: var(--space-2);
}

.skeleton-text.short {
  width: 60%;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>

