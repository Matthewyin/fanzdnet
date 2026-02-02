<template>
  <button
    @click="toggleTheme"
    class="theme-btn"
    :aria-label="'Switch to ' + nextTheme + ' mode'"
    :title="themeLabel"
  >
    <Transition name="theme-icon" mode="out-in">
      <!-- Moon Icon for Dark Mode -->
      <svg v-if="$colorMode.preference === 'dark'" key="dark" class="theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <!-- Sun Icon for Light Mode -->
      <svg v-else-if="$colorMode.preference === 'light'" key="light" class="theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <!-- Desktop Icon for System Mode -->
      <svg v-else key="system" class="theme-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    </Transition>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const { t } = useI18n();
const colorMode = useColorMode();

const themes = ['system', 'light', 'dark'];

const nextTheme = computed(() => {
  const current = themes.indexOf(colorMode.preference);
  const next = (current + 1) % themes.length;
  return themes[next];
});

const themeLabel = computed(() => {
  const labels = {
    system: t('theme.system', '跟随系统'),
    light: t('theme.light', '浅色模式'),
    dark: t('theme.dark', '深色模式')
  };
  return labels[colorMode.preference] || labels.system;
});

const toggleTheme = () => {
  colorMode.preference = nextTheme.value;
};
</script>

<style scoped>
.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--duration-fast) var(--ease-in-out);
}

.theme-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.theme-btn:active {
  transform: scale(0.95);
}

.theme-icon {
  width: 20px;
  height: 20px;
}

/* 图标切换动画 */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all var(--duration-fast) var(--ease-in-out);
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>