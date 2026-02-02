<template>
  <section class="features-section">
    <div class="kinetic-bg"></div>
    <div class="features-container">
      <div class="features-header">
        <h2 class="features-title">{{ t('home.exploreTitle', '探索更多') }}</h2>
        <p class="features-subtitle">{{ t('home.exploreSubtitle', '了解樊振东的精彩世界') }}</p>
      </div>
      
      <div class="features-list">
        <NuxtLink 
          v-for="(feature, index) in features" 
          :key="feature.path"
          :to="localePath(feature.path)"
          class="feature-row"
          :class="{ 'feature-row-reverse': index % 2 !== 0 }"
        >
          <div class="feature-visual" :style="{ background: feature.gradient }">
            <div class="visual-content">
              <component :is="feature.icon" class="feature-icon" />
              <div class="visual-decor"></div>
            </div>
          </div>
          <div class="feature-content">
            <span class="feature-index">0{{ index + 1 }}</span>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
            <div class="feature-link">
              <span>{{ t('common.readMore', '查看更多') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';

const { t } = useI18n();
const localePath = useLocalePath();

// SVG 图标组件
const IconNews = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2' }),
  h('path', { d: 'M18 14h-8' }),
  h('path', { d: 'M15 18h-5' }),
  h('path', { d: 'M10 6h8v4h-8V6Z' })
]);

const IconCalendar = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }),
  h('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
  h('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
  h('line', { x1: '3', y1: '10', x2: '21', y2: '10' }),
  h('path', { d: 'm9 16 2 2 4-4' })
]);

const IconTimeline = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('polyline', { points: '12 6 12 12 16 14' })
]);

const IconBook = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' }),
  h('path', { d: 'M8 7h6' }),
  h('path', { d: 'M8 11h8' })
]);

const features = computed(() => [
  {
    path: '/updates',
    icon: IconNews,
    title: t('nav.updates', '最新动态'),
    description: t('home.updatesDesc', '获取樊振东的最新新闻、比赛结果和训练动态'),
    gradient: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
  },
  {
    path: '/schedule',
    icon: IconCalendar,
    title: t('nav.schedule', '赛事信息'),
    description: t('home.scheduleDesc', '查看即将举行的比赛日程和历史战绩'),
    gradient: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)'
  },
  {
    path: '/timeline',
    icon: IconTimeline,
    title: t('nav.timeline', '大事记'),
    description: t('home.timelineDesc', '回顾樊振东职业生涯的重要时刻'),
    gradient: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)'
  },
  {
    path: '/essays',
    icon: IconBook,
    title: t('nav.essays', '随笔'),
    description: t('home.essaysDesc', '阅读关于樊振东的深度文章和球迷感悟'),
    gradient: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)'
  }
]);
</script>

<style scoped>
.features-section {
  padding: var(--space-24) 0;
  background-color: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.kinetic-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(45deg, transparent 48%, rgba(255, 215, 0, 0.03) 50%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(255, 215, 0, 0.03) 50%, transparent 52%);
  background-size: 60px 60px;
  pointer-events: none;
}

.features-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-4);
  position: relative;
  z-index: 2;
}

@media (min-width: 768px) {
  .features-container {
    padding: 0 var(--space-8);
  }
}

.features-header {
  text-align: center;
  margin-bottom: var(--space-20);
}

.features-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.features-subtitle {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
}

/* Feature Row - Split Layout */
.feature-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  text-decoration: none;
  group: feature-row;
  align-items: center;
}

@media (min-width: 1024px) {
  .feature-row {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-16);
  }
  
  .feature-row-reverse {
    direction: rtl; /* Flip order visually */
  }
  
  .feature-row-reverse .feature-content {
    direction: ltr; /* Reset text direction */
    text-align: right;
    align-items: flex-end;
  }

  .feature-row-reverse .feature-link {
    flex-direction: row-reverse;
  }
  
  .feature-row-reverse .feature-link svg {
    transform: rotate(180deg);
  }
}

/* Visual Side */
.feature-visual {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: skewX(-5deg); /* Kinetic skew */
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-row:hover .feature-visual {
  transform: skewX(-5deg) scale(1.02);
  border-color: var(--color-accent-500);
}

.visual-content {
  transform: skewX(5deg); /* Counter skew */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.feature-icon {
  width: 64px;
  height: 64px;
  color: var(--text-primary);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.feature-row:hover .feature-icon {
  color: var(--color-accent-500);
  transform: scale(1.1);
  opacity: 1;
}

.visual-decor {
  width: 40px;
  height: 4px;
  background: var(--color-accent-500);
  margin-top: var(--space-4);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-row:hover .visual-decor {
  transform: scaleX(1);
}

/* Content Side */
.feature-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-4);
}

.feature-index {
  font-family: var(--font-mono);
  font-size: var(--text-6xl);
  font-weight: var(--font-black);
  color: rgba(255, 255, 255, 0.05);
  line-height: 1;
  margin-bottom: -20px;
  transition: color 0.3s ease;
}

.feature-row:hover .feature-index {
  color: rgba(255, 215, 0, 0.1);
}

.feature-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.feature-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  max-width: 500px;
}

.feature-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-accent-500);
  font-weight: var(--font-medium);
  margin-top: var(--space-4);
  transition: gap 0.3s ease;
}

.feature-row:hover .feature-link {
  gap: var(--space-4);
}
</style>

