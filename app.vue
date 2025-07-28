
<template>
  <div>
    <header class="main-header">
      <NuxtLink to="/" class="logo-link">
        <NuxtImg src="/logo.jpeg" alt="Fanzdnet Logo" class="logo-img" loading="lazy" />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <NuxtLink to="/updates">最新动态</NuxtLink>
        <NuxtLink to="/schedule">赛事信息</NuxtLink>
        <NuxtLink to="/timeline">大事记</NuxtLink>
        <NuxtLink to="/ai-gallery">AI 灵感站</NuxtLink>
        <NuxtLink to="/essays">随笔</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
      </nav>

      <div class="header-right">
        <ThemeSwitcher />
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="mobile-menu-button" aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Navigation Panel -->
    <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" @click="closeMobileMenu">{{ link.name }}</NuxtLink>
    </nav>

    <div v-if="isMobileMenuOpen" class="overlay" @click="closeMobileMenu"></div>

    <main>
      <NuxtPage />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import TheFooter from '@/components/TheFooter.vue';
import { NuxtImg } from '#components';

const isMobileMenuOpen = ref(false);
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const navLinks = [
  { name: '最新动态', path: '/updates' },
  { name: '赛事信息', path: '/schedule' },
  { name: '大事记', path: '/timeline' },
  { name: 'AI 灵感站', path: '/ai-gallery' },
  { name: '随笔', path: '/essays' },
  { name: '关于', path: '/about' },
];
</script>

<style>
/* ... (existing global styles remain the same) ... */
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --bg-primary: #ffffff;
  --text-primary: #111827;
  --bg-secondary: #f3f4f6;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}

.dark body {
  --bg-primary: #0a1428;
  --text-primary: #f3f4f6;
  --bg-secondary: #1e293b;
  --text-secondary: #9ca3af;
  --border-color: #374151;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
}

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-link {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.logo-img {
  height: 48px;
  width: auto;
}

.desktop-nav {
  display: none; /* Hidden on mobile by default */
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mobile-menu-button {
  display: flex; /* Visible on mobile */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-primary);
}

.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: var(--bg-secondary);
  box-shadow: -4px 0 15px rgba(0,0,0,0.1);
  z-index: 1001;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 6rem 2rem 2rem;
  gap: 1.5rem;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav a {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1000;
}

main {
  padding-top: 1rem;
}

/* Desktop styles */
@media (min-width: 992px) {
  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: 2rem;
  }
  .desktop-nav a {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s;
    padding: 0.5rem;
  }
  .desktop-nav a:hover, 
  .desktop-nav a.router-link-exact-active {
    color: var(--text-primary);
  }
  .mobile-menu-button, .mobile-nav, .overlay {
    display: none;
  }
  .main-header {
    justify-content: flex-start;
  }
  .header-right {
      margin-left: auto;
  }
}
</style>
