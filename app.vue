<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <!-- Header -->
      <header class="site-header" :class="{ 'header-scrolled': isScrolled }">
        <div class="header-container">
          <!-- Logo -->
          <NuxtLink :to="localePath('/')" class="logo-link" aria-label="返回首页">
            <NuxtImg src="/logo.jpeg" alt="Fanzdnet Logo" class="logo-img" width="176" height="176" loading="lazy" />
            <span class="logo-text">Fanzd.net</span>
          </NuxtLink>

            <!-- Desktop Navigation -->
          <nav class="desktop-nav" aria-label="主导航">
            <ul class="desktop-nav-list">
              <li v-for="link in navLinks" :key="link.path" class="desktop-nav-item">
                <NuxtLink
                  :to="localePath(link.path)"
                  class="nav-link"
                  :class="{ 'nav-link-active': isActiveRoute(link.path) }"
                  :aria-current="isActiveRoute(link.path) ? 'page' : undefined"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            <LanguageSwitcher @language-changed="handleLanguageChange" />
            <ThemeSwitcher />
            <button
              @click="toggleMobileMenu"
              class="mobile-menu-btn"
              :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
              :aria-expanded="isMobileMenuOpen"
            >
              <span class="hamburger" :class="{ 'hamburger-active': isMobileMenuOpen }">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Navigation Overlay -->
      <Transition name="fade">
        <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>
      </Transition>

      <!-- Mobile Navigation Panel -->
      <Transition name="slide-right">
        <nav v-if="isMobileMenuOpen" class="mobile-nav">
          <div class="mobile-nav-header">
            <span class="mobile-nav-title">{{ t('common.menu', '菜单') }}</span>
            <button @click="closeMobileMenu" class="mobile-close-btn" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="mobile-nav-links">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="localePath(link.path)"
              @click="closeMobileMenu"
              class="mobile-nav-link"
              :class="{ 'mobile-nav-link-active': isActiveRoute(link.path) }"
            >
              <span class="nav-icon">
                <!-- Home -->
                <svg v-if="link.icon === 'home'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-3 9 9m-9-3v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-8"></path><path d="m9 12 7 7-7-7 7 7 7 7-7 7 7-7z"></path></svg>
                <!-- News/Updates -->
                <svg v-else-if="link.icon === 'news'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
                <!-- Calendar/Schedule -->
                <svg v-else-if="link.icon === 'calendar'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <!-- Timeline -->
                <svg v-else-if="link.icon === 'timeline'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <!-- Sparkles/AI -->
                <svg v-else-if="link.icon === 'sparkles'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                <!-- Book/Essays -->
                <svg v-else-if="link.icon === 'book'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                <!-- Info/About -->
                <svg v-else-if="link.icon === 'info'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              </span>
              {{ link.name }}
            </NuxtLink>
          </div>
        </nav>
      </Transition>

      <!-- Main Content -->
      <main class="main-content">
        <NuxtPage />
      </main>

      <!-- Footer -->
      <TheFooter />

      <!-- Mobile Bottom Navigation -->
      <MobileNav />

      <!-- Back to Top Button -->
      <BackToTop />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import TheFooter from '@/components/TheFooter.vue';
import MobileNav from '@/components/MobileNav.vue';
import BackToTop from '@/components/BackToTop.vue';
import { NuxtImg } from '#components';
import type { SupportedLanguage } from '~/types/firestore';

// 状态
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

// i18n
const { locale, t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

// 滚动检测
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// 移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

// 语言切换
const handleLanguageChange = (language: SupportedLanguage) => {
  console.log('语言已切换到:', language);
};

// 导航配置
const navLinksConfig = [
  { key: 'nav.home', path: '/', fallback: '首页', icon: 'home' },
  { key: 'nav.updates', path: '/updates', fallback: '最新动态', icon: 'news' },
  { key: 'nav.schedule', path: '/schedule', fallback: '赛事信息', icon: 'calendar' },
  { key: 'nav.timeline', path: '/timeline', fallback: '大事记', icon: 'timeline' },
  { key: 'nav.aiGallery', path: '/ai-gallery', fallback: 'AI 灵感站', icon: 'sparkles' },
  { key: 'nav.essays', path: '/essays', fallback: '随笔', icon: 'book' },
  { key: 'nav.about', path: '/about', fallback: '关于', icon: 'info' },
];

const navLinks = computed(() => {
  return navLinksConfig.map(link => ({
    name: t(link.key, link.fallback),
    path: link.path,
    icon: link.icon
  }));
});

// 检查当前路由
const isActiveRoute = (path: string) => {
  const currentPath = route.path;
  if (path === '/') {
    return currentPath === '/' || currentPath === `/${locale.value}`;
  }
  return currentPath.includes(path);
};
</script>

<style>
/* ========== App Wrapper ========== */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* 透明背景，让页面自己的背景显示出来 */
  background-color: transparent;
  /* 确保在页面过渡时位于正确层级 */
  position: relative;
  z-index: 1;
}

/* ========== Site Header ========== */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  /* 透明背景，使用伪元素防止页面切换时露出背景 */
  background-color: transparent;
  border-bottom: 1px solid transparent;
  transition: box-shadow var(--duration-normal) var(--ease-in-out),
              border-color var(--duration-normal) var(--ease-in-out);
}

/* 使用伪元素创建一个遮罩层，防止页面过渡时露出 html 背景 */
.site-header::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  /* 15% 透明度，视觉上保持透明感，但足以防止闪屏 */
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color var(--duration-normal) var(--ease-in-out);
}

.dark .site-header::before {
  background-color: rgba(10, 15, 26, 0.15);
}

.site-header.header-scrolled {
  box-shadow: var(--shadow-sm);
  border-bottom-color: var(--border-primary);
}

.header-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-3) var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: 1024px) {
  .header-container {
    padding: var(--space-3) var(--space-8);
  }
}

/* Logo */
.logo-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  transition: transform var(--duration-fast) var(--ease-out);
}

.logo-link:hover {
  transform: scale(1.02);
}

.logo-img {
  height: 44px;
  width: auto;
  border-radius: var(--radius-lg);
}

.logo-text {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: #ffffff; /* White for better contrast on transparent backgrounds */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* Add text shadow for better readability */
  display: none;
}

@media (min-width: 768px) {
  .logo-text {
    display: block;
  }
}

/* Adjust logo text for scrolled state with light background */
.site-header.header-scrolled .logo-text {
  color: var(--text-primary);
  text-shadow: none;
}

/* Dark mode adjustments */
.dark .site-header.header-scrolled .logo-text {
  color: var(--text-primary);
  text-shadow: none;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
  align-items: center;
  gap: var(--space-1);
}

.desktop-nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

.desktop-nav-item {
  margin: 0;
  padding: 0;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-link {
  position: relative;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: #ffffff; /* White for better contrast on transparent/colored backgrounds */
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* Add text shadow for better readability */
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-in-out);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--color-accent-500);
  transform: translateX(-50%);
  transition: width var(--duration-normal) var(--ease-out);
}

.nav-link:hover {
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5); /* Enhance shadow on hover */
}

.nav-link:hover::after {
  width: 60%;
}

.nav-link-active {
  color: #ffffff;
  font-weight: var(--font-bold);
}

.nav-link-active::after {
  width: 60%;
}

/* Adjust nav links for scrolled state with light background */
.site-header.header-scrolled .nav-link {
  color: var(--text-primary);
  text-shadow: none;
}

.site-header.header-scrolled .nav-link:hover {
  color: var(--text-primary);
  text-shadow: none;
}

/* Dark mode adjustments */
.dark .site-header.header-scrolled .nav-link {
  color: var(--text-primary);
  text-shadow: none;
}

.dark .site-header.header-scrolled .nav-link:hover {
  color: var(--text-primary);
  text-shadow: none;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-lg);
  transition: background-color var(--duration-fast) var(--ease-in-out);
}

.mobile-menu-btn:hover {
  background-color: var(--bg-secondary);
}

@media (min-width: 1024px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* Hamburger Icon */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 22px;
  height: 22px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: #ffffff; /* White for better contrast on transparent backgrounds */
  border-radius: var(--radius-full);
  transition: all var(--duration-normal) var(--ease-in-out);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); /* Add shadow for better visibility */
}

/* Adjust hamburger for scrolled state with light background */
.site-header.header-scrolled .hamburger span {
  background-color: var(--text-primary);
  box-shadow: none;
}

/* Dark mode adjustments */
.dark .site-header.header-scrolled .hamburger span {
  background-color: var(--text-primary);
  box-shadow: none;
}

.hamburger-active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger-active span:nth-child(2) {
  opacity: 0;
}

.hamburger-active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background-color: var(--bg-overlay);
  z-index: calc(var(--z-fixed) + 1);
}

/* Mobile Navigation */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background-color: var(--bg-primary);
  z-index: calc(var(--z-fixed) + 2);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-2xl);
}

.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.mobile-nav-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.mobile-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-in-out);
}

.mobile-close-btn:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.mobile-nav-links {
  flex: 1;
  padding: var(--space-4);
  overflow-y: auto;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-xl);
  transition: all var(--duration-fast) var(--ease-in-out);
}

.mobile-nav-link:hover {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.mobile-nav-link-active {
  background-color: rgba(255, 215, 0, 0.1);
  color: var(--color-accent-500);
}

.nav-icon {
  width: 20px;
  height: 20px;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-top: 68px; /* Header height */
  padding-bottom: 80px; /* Mobile nav height */
  /* 透明背景，让页面的 PageBackground 组件显示出来 */
  background-color: transparent;
}

@media (min-width: 1024px) {
  .main-content {
    padding-bottom: 0;
  }
}

/* ========== Transitions ========== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-normal) var(--ease-in-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform var(--duration-normal) var(--ease-in-out);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
