<template>
  <div class="skeleton-text-wrapper">
    <div 
      v-for="i in lines" 
      :key="i" 
      class="skeleton-text-line"
      :class="{ short: i === lines && !fullWidth }"
      :style="lineStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  lines?: number;
  height?: string;
  gap?: string;
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  lines: 3,
  height: '16px',
  gap: 'var(--space-2)',
  fullWidth: false
});

const lineStyle = computed(() => ({
  height: props.height,
  marginBottom: props.gap
}));
</script>

<style scoped>
.skeleton-text-wrapper {
  width: 100%;
}

.skeleton-text-line {
  width: 100%;
  background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}

.skeleton-text-line.short {
  width: 60%;
}

.skeleton-text-line:last-child {
  margin-bottom: 0;
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

