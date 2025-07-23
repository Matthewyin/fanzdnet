<template>
  <div>
    <header class="main-header">
      <div class="header-content">
        <NuxtLink to="/" class="logo-link">
          <NuxtImg src="/logo.jpeg" alt="Fanzdnet Logo" class="logo-img" loading="lazy" />
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
          <NuxtLink to="/updates">最新动态</NuxtLink>
          <NuxtLink to="/schedule">赛事信息</NuxtLink>
          <NuxtLink to="/timeline">大事记</NuxtLink>
          <NuxtLink to="/ai-gallery">AI 灵感站</NuxtLink>
          <NuxtLink to="/about">关于</NuxtLink>
        </nav>

        <div class="header-right">
          <ThemeSwitcher />
          <!-- Mobile Menu Button -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="mobile-menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Panel -->
    <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <NuxtLink to="/updates" @click="closeMobileMenu">最新动态</NuxtLink>
      <NuxtLink to="/schedule" @click="closeMobileMenu">赛事信息</NuxtLink>
      <NuxtLink to="/timeline" @click="closeMobileMenu">大事记</NuxtLink>
      <NuxtLink to="/ai-gallery" @click="closeMobileMenu">AI 灵感站</NuxtLink>
      <NuxtLink to="/about" @click="closeMobileMenu">关于</NuxtLink>
    </nav>

    <main @click="closeMobileMenu">
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

nav {
  display: flex;
  align-items: center; /* Align items vertically */
  gap: 1.5rem; /* Adjust gap */
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
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}


.header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.mobile-menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-primary);
}

.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%; /* Start off-screen */
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: var(--bg-secondary);
  box-shadow: -4px 0 15px rgba(0,0,0,0.1);
  z-index: 999;
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

main {
  padding-top: 1rem; 
}

/* Desktop styles */
@media (min-width: 769px) {
  .desktop-nav {
    display: flex; /* Show on desktop */
    gap: 1.5rem;
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
  .mobile-menu-button {
    display: none; /* Hide on desktop */
  }
}
</style>