<template>
  <nav class="mobile-bottom-nav">
    <NuxtLink 
      v-for="item in navItems" 
      :key="item.path"
      :to="localePath(item.path)"
      class="nav-item"
      :class="{ 'nav-item-active': isActive(item.path) }"
    >
      <div class="nav-icon-wrapper">
        <!-- Home -->
        <svg v-if="item.icon === 'home'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <!-- News/Updates -->
        <svg v-else-if="item.icon === 'news'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
          <path d="M18 14h-8"></path>
          <path d="M15 18h-5"></path>
          <path d="M10 6h8v4h-8V6Z"></path>
        </svg>
        <!-- Calendar/Schedule -->
        <svg v-else-if="item.icon === 'calendar'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <!-- Timeline -->
        <svg v-else-if="item.icon === 'timeline'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <!-- Sparkles/AI -->
        <svg v-else-if="item.icon === 'sparkles'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
          <path d="M5 3v4"></path>
          <path d="M19 17v4"></path>
          <path d="M3 5h4"></path>
          <path d="M17 19h4"></path>
        </svg>
        <!-- User/About -->
        <svg v-else-if="item.icon === 'user'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <span class="nav-label">{{ item.label }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const navItems = computed(() => [
  { path: '/', icon: 'home', label: t('nav.home', '首页') },
  { path: '/updates', icon: 'news', label: t('nav.updates', '动态') },
  { path: '/schedule', icon: 'calendar', label: t('nav.schedule', '赛事') },
  { path: '/timeline', icon: 'timeline', label: t('nav.timeline', '大事记') },
  { path: '/ai-gallery', icon: 'sparkles', label: t('nav.aiGallery', 'AI') },
]);

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/zh' || route.path === '/en';
  }
  return route.path.includes(path);
};
</script>

<style scoped>
.mobile-bottom-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
  padding: var(--space-2) var(--space-1);
  padding-bottom: calc(var(--space-2) + env(safe-area-inset-bottom, 0px));
  z-index: var(--z-fixed);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
}

.dark .mobile-bottom-nav {
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-1);
  text-decoration: none;
  color: var(--text-tertiary);
  transition: all var(--duration-fast) var(--ease-in-out);
  border-radius: var(--radius-lg);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  position: relative;
  overflow: hidden;
}

/* 触摸反馈涟漪效果 */
.nav-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 215, 0, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.nav-item:active::before {
  width: 100px;
  height: 100px;
}

.nav-item:active {
  transform: scale(0.92);
  background: rgba(255, 215, 0, 0.05);
}

.nav-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.nav-icon-wrapper svg {
  width: 22px;
  height: 22px;
  transition: all var(--duration-fast) var(--ease-in-out);
}

.nav-label {
  font-size: 10px;
  font-weight: var(--font-medium);
  line-height: 1;
  transition: color var(--duration-fast) var(--ease-in-out);
}

.nav-item-active {
  color: var(--color-accent-500);
}

.nav-item-active .nav-icon-wrapper svg {
  transform: scale(1.1);
}

.nav-item-active .nav-label {
  font-weight: var(--font-semibold);
}

/* 隐藏桌面端 */
@media (min-width: 1024px) {
  .mobile-bottom-nav {
    display: none;
  }
}
</style>

