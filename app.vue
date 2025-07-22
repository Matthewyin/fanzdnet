
<template>
  <div>
    <header class="main-header">
      <NuxtLink to="/" class="logo-link">
        <img src="/logo.jpeg" alt="Fanzdnet Logo" class="logo-img">
      </NuxtLink>
      <nav>
        <NuxtLink to="/updates">最新动态</NuxtLink>
        <NuxtLink to="/schedule">赛事信息</NuxtLink>
        <NuxtLink to="/timeline">大事记</NuxtLink>
        <NuxtLink to="/ai-gallery">AI 灵感站</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
      </nav>
      <ThemeSwitcher />
    </header>
    <main>
      <NuxtPage />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>


<style>
/* Global styles */
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
  z-index: 100;
}

.logo-link {
  display: flex;
  align-items: center;
  flex-shrink: 0; /* Prevent logo from shrinking */
}

.logo-img {
  height: 48px; /* Increased logo size */
  width: auto;
}

nav {
  flex-grow: 1;
  display: flex;
  justify-content: center; /* Center nav links within the available space */
  gap: 2rem; /* Increased space between nav links */
}

nav a {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
  padding: 0.5rem;
}

nav a:hover, 
nav a.router-link-exact-active {
  color: var(--text-primary);
}

main {
  padding-top: 1rem; 
}
</style>

