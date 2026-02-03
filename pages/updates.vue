<template>
  <div class="updates-page dynamic-diagonal">
    <!-- 沉浸式背景 -->
    <PageBackground theme="timeline" />

    <!-- 对角线装饰元素 -->
    <div class="diagonal-decorations">
      <div class="diagonal-line line-1"></div>
      <div class="diagonal-line line-2"></div>
      <div class="diagonal-line line-3"></div>
    </div>

    <!-- 页面内容 -->
    <div class="immersive-content">
      <!-- 页面头部 - 左侧倾斜 -->
      <header class="page-header">
        <span class="page-tag">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tag-icon">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
            <path d="M18 14h-8"></path>
            <path d="M15 18h-5"></path>
            <path d="M10 6h8v4h-8V6Z"></path>
          </svg>
          {{ t('pages.updates.tag', '最新动态') }}
        </span>
        <h1 class="page-title">{{ t('pages.updates.title', '新闻资讯') }}</h1>
        <p class="page-subtitle">{{ t('pages.updates.subtitle', '关注樊振东的最新比赛、训练和生活动态') }}</p>
      </header>

      <!-- 主内容网格 -->
      <div class="content-grid">
        <!-- 左侧：分类筛选 -->
        <div class="left-panel">
          <nav class="category-nav">
            <h2 class="nav-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" x2="21" y1="6" y2="6"></line>
                <line x1="8" x2="21" y1="12" y2="12"></line>
                <line x1="8" x2="21" y1="18" y2="18"></line>
                <line x1="3" x2="3.01" y1="6" y2="6"></line>
                <line x1="3" x2="3.01" y1="12" y2="12"></line>
                <line x1="3" x2="3.01" y1="18" y2="18"></line>
              </svg>
              {{ t('updates.filter', '筛选类别') }}
            </h2>
            <button
              v-for="cat in categories"
              :key="cat.id"
              class="category-btn"
              :class="{ active: activeCategory === cat.id }"
              @click="activeCategory = cat.id"
            >
              <span class="cat-icon">
                <!-- All/List -->
                <svg v-if="cat.icon === 'list'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="8" x2="21" y1="6" y2="6"></line>
                  <line x1="8" x2="21" y1="12" y2="12"></line>
                  <line x1="8" x2="21" y1="18" y2="18"></line>
                  <line x1="3" x2="3.01" y1="6" y2="6"></line>
                  <line x1="3" x2="3.01" y1="12" y2="12"></line>
                  <line x1="3" x2="3.01" y1="18" y2="18"></line>
                </svg>
                <!-- Match/Trophy -->
                <svg v-else-if="cat.icon === 'trophy'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <!-- Training/Dumbbell -->
                <svg v-else-if="cat.icon === 'dumbbell'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6.5 6.5 11 11"></path>
                  <path d="m21 21-1-1"></path>
                  <path d="m3 3 1 1"></path>
                  <path d="m18 22 4-4"></path>
                  <path d="m2 6 4 4"></path>
                  <path d="m3 10h7"></path>
                  <path d="m9 21c0-4.42 3.58-8 8-8"></path>
                  <path d="M12.5 7a2.5 2.5 0 1 0-4.9 0"></path>
                  <path d="M15.5 13.5a2.5 2.5 0 1 0-4.9 0"></path>
                  <path d="M15 17a4 4 0 0 1-8 0"></path>
                </svg>
                <!-- Media/Film -->
                <svg v-else-if="cat.icon === 'film'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                <!-- Life/Sparkles -->
                <svg v-else-if="cat.icon === 'sparkles'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  <path d="M5 3v4"></path>
                  <path d="M19 17v4"></path>
                  <path d="M3 5h4"></path>
                  <path d="M17 19h4"></path>
                </svg>
              </span>
              <span class="cat-name">{{ cat.name }}</span>
            </button>
          </nav>

          <!-- 统计信息 -->
          <div class="stats-card">
            <div class="stat-item">
              <span class="stat-number">{{ filteredUpdates.length }}</span>
              <span class="stat-label">{{ t('updates.total', '总计') }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">{{ categories.length - 1 }}</span>
              <span class="stat-label">{{ t('updates.categories', '类别') }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧：动态卡片网格 -->
        <div class="right-panel">
          <div class="updates-grid">
            <article
              v-for="(item, index) in filteredUpdates"
              :key="item.id"
              class="update-card"
              :class="`card-${item.category}`"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="card-image">
                <div class="image-placeholder">
                  <!-- SVG Icon -->
                  <svg v-if="item.category === 'match'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="placeholder-icon">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                  <svg v-else-if="item.category === 'training'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="placeholder-icon">
                    <path d="m6.5 6.5 11 11"></path>
                    <path d="m21 21-1-1"></path>
                    <path d="m3 3 1 1"></path>
                    <path d="m18 22 4-4"></path>
                    <path d="m2 6 4 4"></path>
                    <path d="m3 10h7"></path>
                    <path d="m9 21c0-4.42 3.58-8 8-8"></path>
                    <path d="M12.5 7a2.5 2.5 0 1 0-4.9 0"></path>
                    <path d="M15.5 13.5a2.5 2.5 0 1 0-4.9 0"></path>
                    <path d="M15 17a4 4 0 0 1-8 0"></path>
                  </svg>
                  <svg v-else-if="item.category === 'media'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="placeholder-icon">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <line x1="2" x2="22" y1="10" y2="10"></line>
                  </svg>
                  <svg v-else-if="item.category === 'life'" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="placeholder-icon">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                    <path d="M5 3v4"></path>
                    <path d="M19 17v4"></path>
                    <path d="M3 5h4"></path>
                    <path d="M17 19h4"></path>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="placeholder-icon">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                  </svg>
                </div>
                <span class="card-category">{{ getCategoryName(item.category) }}</span>
              </div>
              <div class="card-content">
                <time class="card-date">{{ item.date }}</time>
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="card-excerpt">{{ item.excerpt }}</p>
                <div class="card-footer">
                  <span class="card-source">{{ item.source }}</span>
                  <span class="read-more">{{ t('common.readMore', '阅读更多') }} →</span>
                </div>
              </div>
            </article>
          </div>

          <!-- 加载更多 -->
          <div class="load-more-section">
            <p class="coming-soon">{{ t('pages.updates.comingSoon', '更多精彩内容，敬请期待...') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

// SEO
const { setPageSEO } = useSEO();
setPageSEO('updates', locale.value);

// 分类数据
const categories = computed(() => [
  { id: 'all', name: t('updates.all', '全部'), icon: 'list' },
  { id: 'match', name: t('updates.match', '比赛'), icon: 'trophy' },
  { id: 'media', name: t('updates.media', '媒体'), icon: 'film' }
]);

const activeCategory = ref('all');

// 示例动态数据（后续可从 API 或 Firestore 获取）
const updatesData = computed(() => [
  }
  {
    id: 5,
    category: 'match',
    date: '2024-08-04',
    title: t('updates.item4.title', '巴黎奥运会男单夺冠，完成大满贯'),
    excerpt: t('updates.item4.excerpt', '在巴黎奥运会乒乓球男单决赛中，樊振东以4:1战胜对手夺得金牌，集齐奥运会、世锦赛、世界杯三大赛单打冠军，完成大满贯伟业。'),
    source: t('updates.item4.source', 'Olympics.com')
  },
  }
  {
    id: 4,
    category: 'match',
    date: '2024-08-04',
    title: t('updates.item4.title', '巴黎奥运会男单夺冠，完成大满贯'),
    excerpt: t('updates.item4.excerpt', '在巴黎奥运会乒乓球男单决赛中，樊振东4:1战胜对手夺得金牌，集齐奥运会、世锦赛、世界杯三大赛单打冠军，完成大满贯伟业。'),
    source: t('updates.item4.source', 'Olympics.com')
  }
]);

// 筛选后的动态
const filteredUpdates = computed(() => {
  if (activeCategory.value === 'all') {
    return updatesData.value;
  }
  return updatesData.value.filter(item => item.category === activeCategory.value);
});

// 辅助函数
const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    match: t('updates.match', '比赛'),
    media: t('updates.media', '媒体')
  };
  return names[category] || category;
};
</script>

<style scoped>
/* 页面容器 */
.updates-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 对角线装饰元素 */
.diagonal-decorations {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.diagonal-line {
  position: absolute;
  background: linear-gradient(135deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  transform-origin: center;
}

.line-1 {
  width: 200%;
  height: 2px;
  top: 25%;
  left: -50%;
  transform: rotate(45deg);
  animation: diagonalMove1 15s ease-in-out infinite;
}

.line-2 {
  width: 150%;
  height: 1px;
  top: 55%;
  left: -25%;
  transform: rotate(45deg);
  animation: diagonalMove2 20s ease-in-out infinite;
}

.line-3 {
  width: 180%;
  height: 1.5px;
  top: 85%;
  left: -40%;
  transform: rotate(45deg);
  animation: diagonalMove3 18s ease-in-out infinite;
}

@keyframes diagonalMove1 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(30px); }
}

@keyframes diagonalMove2 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(-40px); }
}

@keyframes diagonalMove3 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(20px); }
}

/* 内容区域 */
.immersive-content {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
  padding-bottom: calc(var(--space-20) + 80px);
  position: relative;
  z-index: 1;
}

/* 页面头部 */
.page-header {
  text-align: left;
  margin-bottom: var(--space-12);
  padding-left: var(--space-6);
}

.page-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
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
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.8);
}

/* 主内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 280px 1fr;
  }
}

/* 左侧面板 */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 分类导航 */
.category-nav {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--space-6);
}

.nav-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid rgba(255, 215, 0, 0.2);
}

.category-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
}

.category-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.category-btn.active {
  color: var(--color-accent-400);
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
}

.cat-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.cat-name {
  flex: 1;
}

/* 统计卡片 */
.stats-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, rgba(26, 58, 138, 0.2), rgba(255, 215, 0, 0.1));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 215, 0, 0.2);
  padding: var(--space-6);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-accent-400);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 215, 0, 0.3);
}

/* 右侧面板 */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 动态卡片网格 */
.updates-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .updates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .updates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 动态卡片 */
.update-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  animation: cardFadeIn 0.6s ease-out backwards;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.update-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(135deg, transparent, rgba(255, 215, 0, 0.05), transparent);
  transform: rotate(45deg);
  transition: all var(--duration-slow) var(--ease-out);
  opacity: 0;
}

.update-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% { transform: rotate(45deg) translateY(100%); }
  100% { transform: rotate(45deg) translateY(-100%); }
}

.update-card:hover {
  transform: translateY(-6px) scale(1.02);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
  z-index: 2;
}

.card-image {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  opacity: 0.3;
  color: rgba(255, 255, 255, 0.6);
}

.card-category {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: white;
  background: rgba(0, 0, 0, 0.6);
  border-radius: var(--radius-full);
  backdrop-filter: blur(4px);
}

.card-content {
  padding: var(--space-5);
}

.card-date {
  font-size: var(--text-xs);
  color: rgba(255, 215, 0, 0.7);
  display: block;
  margin-bottom: var(--space-2);
  font-weight: var(--font-medium);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-3);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: var(--space-4);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.card-source {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
}

.read-more {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-accent-400);
  cursor: pointer;
  transition: color var(--duration-fast);
}

.read-more:hover {
  color: var(--color-accent-300);
}

/* 加载更多 */
.load-more-section {
  text-align: center;
  padding: var(--space-8);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.coming-soon {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.5);
}

/* 响应式 */
@media (max-width: 1023px) {
  .diagonal-decorations {
    display: none;
  }

  .page-header {
    text-align: center;
    transform: none;
    padding-left: 0;
  }

  .page-tag,
  .page-title,
  .page-subtitle {
    transform: none;
  }

  .category-nav,
  .stats-card {
    transform: none;
  }

  .nav-title,
  .category-btn,
  .stat-item {
    transform: none;
  }

  .category-btn:hover {
    transform: translateX(4px);
  }

  .stat-divider {
    transform: none;
  }

  .update-card {
    transform: none;
  }

  @keyframes cardFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .update-card:nth-child(even) {
    transform: none;
    animation-name: cardFadeIn;
  }

  .update-card:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .load-more-section {
    transform: none;
  }

  .coming-soon {
    transform: none;
  }
}

@media (max-width: 640px) {
  .immersive-content {
    padding: var(--space-6) var(--space-4);
  }

  .page-title {
    font-size: var(--text-3xl);
  }

  .nav-title {
    font-size: var(--text-base);
  }

  .category-btn {
    padding: var(--space-2) var(--space-3);
  }

  .cat-name {
    font-size: var(--text-xs);
  }
}
</style>
