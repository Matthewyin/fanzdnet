<template>
  <Transition name="fade-scale">
    <button 
      v-show="isVisible" 
      class="back-to-top" 
      :title="t('backToTop', '返回顶部')"
      @click="scrollToTop"
    >
      <span class="arrow">↑</span>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n();

const isVisible = ref(false);
const scrollThreshold = 300; // 滚动超过 300px 显示按钮

const handleScroll = () => {
  if (typeof window === 'undefined') return;
  isVisible.value = window.scrollY > scrollThreshold;
};

const scrollToTop = () => {
  if (typeof window === 'undefined') return;
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // 初始检查
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 100px; /* 避免与移动端底部导航重叠 */
  right: var(--space-4);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  z-index: 40;
  transition: all var(--duration-fast) var(--ease-out);
}

.back-to-top:hover {
  background: var(--color-accent-500);
  border-color: var(--color-accent-500);
  transform: translateY(-2px);
}

.back-to-top:hover .arrow {
  color: #0a1428;
}

.arrow {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  transition: color var(--duration-fast);
}

/* 桌面端调整位置 */
@media (min-width: 768px) {
  .back-to-top {
    bottom: var(--space-8);
    right: var(--space-8);
  }
}

/* 过渡动画 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>

