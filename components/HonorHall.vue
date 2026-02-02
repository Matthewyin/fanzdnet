<template>
  <section class="honor-section">
    <div class="kinetic-lines-bg">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="honor-container">
      <div class="honor-header">
        <span class="honor-tag"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tag-icon"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg> {{ t('home.honorTag', '荣誉殿堂') }}</span>
        <h2 class="honor-title">{{ t('home.honorTitle', '辉煌成就') }}</h2>
        <p class="honor-subtitle">{{ t('home.honorSubtitle', '见证樊振东的冠军之路') }}</p>
      </div>

      <!-- Masonry Grid with Staggered Effect -->
      <div class="honor-grid">
        <div v-for="(honor, index) in honorsData.honors" :key="honor.id" 
             class="honor-card" 
             :class="[`honor-card-${honor.type}`, { 'honor-card-staggered': index % 2 !== 0 }]">
          <div class="honor-medal-wrapper">
            <div class="honor-medal">
              <span class="medal-icon">{{ honor.medal }}</span>
            </div>
            <div class="medal-glow"></div>
          </div>
          <div class="honor-info">
            <h3 class="honor-name">{{ honor.name }}</h3>
            <p class="honor-event">{{ honor.event }}</p>
            <div class="honor-meta">
              <span class="honor-year">{{ honor.year }}</span>
              <div class="honor-line"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="honor-stats">
        <div class="stat-item" v-for="(stat, key) in honorsData.stats" :key="key">
          <span class="stat-number">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getHonorsData } from '~/data/honorsData';

const { t, locale } = useI18n();

// 根据当前语言获取荣誉数据
const honorsData = computed(() => getHonorsData(locale.value));
</script>

<style scoped>
.honor-section {
  padding: var(--space-24) 0;
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
  position: relative;
  overflow: hidden;
}

.kinetic-lines-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.kinetic-lines-bg .line {
  position: absolute;
  background: rgba(255, 215, 0, 0.03);
  width: 1px;
  height: 150%;
  transform: rotate(15deg);
  top: -25%;
}

.kinetic-lines-bg .line:nth-child(1) { left: 20%; }
.kinetic-lines-bg .line:nth-child(2) { left: 50%; }
.kinetic-lines-bg .line:nth-child(3) { left: 80%; }

.honor-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-4);
  position: relative;
  z-index: 2;
}

@media (min-width: 768px) {
  .honor-container {
    padding: 0 var(--space-8);
  }
}

.honor-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.honor-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-accent-500);
  margin-bottom: var(--space-6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.honor-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  letter-spacing: -0.02em;
}

.honor-subtitle {
  font-size: var(--text-xl);
  color: var(--text-secondary);
}

.honor-grid {
  display: grid;
  gap: var(--space-6);
  margin-bottom: var(--space-20);
}

@media (min-width: 640px) {
  .honor-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .honor-grid { 
    grid-template-columns: repeat(3, 1fr); 
    gap: var(--space-8);
  }
}

.honor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-6);
  padding: var(--space-8);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-2xl);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .honor-card-staggered {
    transform: translateY(var(--space-12));
  }
}

.honor-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

@media (min-width: 1024px) {
  .honor-card-staggered:hover {
    transform: translateY(calc(var(--space-12) - 8px));
  }
}

.honor-medal-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.honor-medal {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%);
  border-radius: 50%;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.medal-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140%;
  height: 140%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.honor-card:hover .medal-glow {
  opacity: 1;
}

.medal-icon {
  font-size: 32px;
}

.honor-info { flex: 1; display: flex; flex-direction: column; width: 100%; }

.honor-name {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.honor-event {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  flex-grow: 1;
}

.honor-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
}

.honor-year {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  color: var(--color-accent-500);
}

.honor-line {
  flex-grow: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.5), transparent);
  max-width: 60px;
}

/* Stats Section */
.honor-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  padding: var(--space-10);
  background: rgba(10, 15, 26, 0.6);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

/* Diagonal accents for stats */
.honor-stats::before, .honor-stats::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-accent-500);
  transition: all 0.3s ease;
}

.honor-stats::before {
  top: -1px;
  left: -1px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: var(--radius-2xl);
}

.honor-stats::after {
  bottom: -1px;
  right: -1px;
  border-left: none;
  border-top: none;
  border-bottom-right-radius: var(--radius-2xl);
}

.honor-stats:hover::before, .honor-stats:hover::after {
  width: 40px;
  height: 40px;
}

@media (min-width: 768px) {
  .honor-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-item {
  text-align: center;
  padding: var(--space-4);
  position: relative;
}

.stat-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 20%;
  height: 60%;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.stat-number {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-5xl);
  font-weight: var(--font-black);
  background: linear-gradient(135deg, #FFD700 0%, #FFF 50%, #B8860B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>

