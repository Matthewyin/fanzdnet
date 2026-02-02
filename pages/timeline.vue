<template>
  <div class="timeline-page immersive-page">
    <!-- 沉浸式背景 -->
    <PageBackground theme="timeline" />

    <!-- 页面内容 -->
    <div class="immersive-content">
      <!-- 页面头部 -->
      <header class="page-header">
        <div class="header-content">
          <span class="page-tag"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tag-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> {{ t('pages.timeline.tag', '大事记') }}</span>
          <h1 class="page-title">{{ t('pages.timeline.title', '冠军之路') }}</h1>
          <p class="page-subtitle">{{ t('pages.timeline.subtitle', '见证樊振东的每一个重要时刻') }}</p>
        </div>
        <!-- 年份快速导航 -->
        <nav class="year-nav">
          <button
            v-for="year in uniqueYears"
            :key="year"
            class="year-btn"
            :class="{ active: activeYear === year }"
            @click="scrollToYear(year)"
          >
            {{ year }}
          </button>
        </nav>
      </header>

    <!-- 时间线主体 -->
    <div class="timeline-wrapper">
      <div class="timeline-line"></div>
      <div
        v-for="(event, index) in currentTimelineData"
        :key="index"
        :id="`year-${event.year}`"
        class="timeline-item"
        :class="{ 'item-right': index % 2 !== 0 }"
        :style="{ '--delay': `${index * 0.1}s` }"
      >
        <div class="timeline-content">
          <div class="timeline-dot">
            <span class="dot-year">{{ event.year }}</span>
          </div>
          <div class="timeline-card">
            <div class="card-header">
              <span class="card-year">{{ event.year }}</span>
              <span class="card-badge"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg></span>
            </div>
            <h3 class="card-title">{{ event.title }}</h3>
            <p class="card-description">{{ event.description }}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { timelineData } from '~/data/timelineData';

const { t, locale } = useI18n();

// SEO 优化
const { setPageSEO } = useSEO();
setPageSEO('timeline', locale.value);

// 根据当前语言获取时间线数据
const currentTimelineData = computed(() => {
  // 目前 timelineData 只有一种语言（中文），未来可以扩展为多语言
  return timelineData;
});

// 获取唯一年份列表（用于快速导航）
const uniqueYears = computed(() => {
  return [...new Set(currentTimelineData.value.map(e => e.year))];
});

// 当前激活的年份
const activeYear = ref('');

// 滚动到指定年份
const scrollToYear = (year: string) => {
  activeYear.value = year;
  const element = document.getElementById(`year-${year}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
</script>

<style scoped>
.timeline-page {
  min-height: 100vh;
}

.immersive-content {
  max-width: var(--container-lg);
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
  padding-bottom: calc(var(--space-20) + 80px);
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.header-content {
  margin-bottom: var(--space-8);
}

.page-tag {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-accent-400);
  margin-bottom: var(--space-4);
}

.page-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: var(--space-3);
}

.page-subtitle {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
}

/* 年份快速导航 */
.year-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.year-btn {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.year-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.year-btn.active {
  color: var(--color-accent-400);
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
}

/* 时间线主体 */
.timeline-wrapper {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--color-accent-400), var(--color-primary-500));
  transform: translateX(-50%);
  border-radius: var(--radius-full);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 var(--space-10);
  margin-bottom: var(--space-10);
  animation: fadeInUp 0.6s ease-out both;
  animation-delay: var(--delay, 0s);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-item:nth-child(odd) {
  float: left;
  clear: both;
  text-align: right;
}

.timeline-item:nth-child(even) {
  float: right;
  clear: both;
  text-align: left;
}

/* 时间线圆点 */
.timeline-dot {
  position: absolute;
  top: var(--space-4);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 15, 26, 0.9);
  border: 3px solid var(--color-accent-400);
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

.dot-year {
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  color: var(--color-accent-400);
  display: none;
}

.timeline-item:nth-child(odd) .timeline-dot {
  right: -24px;
}

.timeline-item:nth-child(even) .timeline-dot {
  left: -24px;
}

/* 时间线卡片 */
.timeline-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all var(--duration-normal) var(--ease-out);
}

.timeline-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 215, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.card-year {
  font-size: var(--text-2xl);
  font-weight: var(--font-extrabold);
  color: var(--color-accent-400);
}

.card-badge {
  font-size: var(--text-lg);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-3);
}

.card-description {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin: 0;
}

/* 清除浮动 */
.timeline-wrapper::after {
  content: '';
  display: table;
  clear: both;
}

/* 响应式 */
@media (max-width: 768px) {
  .immersive-content {
    padding: var(--space-6) var(--space-4);
  }

  .page-title {
    font-size: var(--text-3xl);
  }

  .year-nav {
    gap: var(--space-1);
    padding: var(--space-3);
  }

  .year-btn {
    padding: var(--space-1) var(--space-2);
    font-size: var(--text-xs);
  }

  .timeline-line {
    left: 24px;
  }

  .timeline-item {
    width: 100%;
    float: none !important;
    clear: none !important;
    text-align: left !important;
    padding-left: var(--space-14);
    padding-right: 0;
    margin-bottom: var(--space-6);
  }

  .timeline-dot {
    left: 0 !important;
    right: auto !important;
    width: 40px;
    height: 40px;
  }

  .dot-year {
    display: block;
  }

  .card-header {
    flex-direction: row;
  }

  .card-year {
    font-size: var(--text-xl);
  }
}
</style>

