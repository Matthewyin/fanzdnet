<template>
  <div class="essays-page dynamic-diagonal">
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
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          {{ t('pages.essays.tag', '随笔') }}
        </span>
        <h1 class="page-title">{{ t('pages.essays.title', '随笔专栏') }}</h1>
        <p class="page-subtitle">{{ t('pages.essays.subtitle', '关于樊振东的思考与感悟') }}</p>
      </header>

      <!-- 主内容网格 -->
      <div class="content-grid">
        <!-- 左侧：分类筛选 -->
        <div class="left-panel">
          <nav class="category-nav">
            <h2 class="nav-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              {{ t('essays.filter', '文章分类') }}
            </h2>
            <div class="category-list">
              <button class="category-item active" @click="activeCategory = 'all'">
                <span class="cat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </span>
                <span class="cat-name">{{ t('essays.all', '全部') }}</span>
                <span class="cat-count">{{ articles.length + 1 }}</span>
              </button>
              <button class="category-item" @click="activeCategory = 'story'">
                <span class="cat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </span>
                <span class="cat-name">{{ t('essays.category.story', '成长故事') }}</span>
                <span class="cat-count">1</span>
              </button>
              <button class="category-item" @click="activeCategory = 'technique'">
                <span class="cat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </span>
                <span class="cat-name">{{ t('essays.category.technique', '技术分析') }}</span>
                <span class="cat-count">1</span>
              </button>
              <button class="category-item" @click="activeCategory = 'match'">
                <span class="cat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                </span>
                <span class="cat-name">{{ t('essays.category.match', '比赛回顾') }}</span>
                <span class="cat-count">1</span>
              </button>
              <button class="category-item" @click="activeCategory = 'insight'">
                <span class="cat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 16v-4"></path>
                    <path d="M2 17l.62-2.54A6 6 0 0 1 7.44 10"></path>
                    <path d="M22 17l-.62-2.54A6 6 0 0 0 16.56 10"></path>
                    <circle cx="12" cy="9" r="2"></circle>
                    <path d="M8 9H2"></path>
                    <path d="M16 9h6"></path>
                  </svg>
                </span>
                <span class="cat-name">{{ t('essays.category.insight', '个人感悟') }}</span>
                <span class="cat-count">1</span>
              </button>
            </div>
          </nav>

          <!-- 统计卡片 -->
          <div class="stats-card">
            <div class="stat-item">
              <span class="stat-number">{{ articles.length + 1 }}</span>
              <span class="stat-label">{{ t('essays.total', '文章数') }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">4</span>
              <span class="stat-label">{{ t('essays.categories', '分类') }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧：文章列表 -->
        <div class="right-panel">
          <!-- 特色文章 -->
          <section v-if="activeCategory === 'all' || activeCategory === 'story'" class="featured-section">
            <NuxtLink :to="localePath(featuredArticle.path)" class="featured-card">
              <div class="featured-image">
                <div class="image-placeholder">
                  <svg v-if="featuredArticle.icon === 'trophy'" class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                </div>
                <span class="featured-badge">{{ t('essays.featured', '精选') }}</span>
              </div>
              <div class="featured-content">
                <div class="article-meta">
                  <span class="article-category">{{ featuredArticle.category }}</span>
                  <span class="article-date">{{ featuredArticle.date }}</span>
                </div>
                <h2 class="featured-title">{{ featuredArticle.title }}</h2>
                <p class="featured-excerpt">{{ featuredArticle.description }}</p>
                <span class="read-more">{{ t('essays.readMore', '阅读全文') }} →</span>
              </div>
            </NuxtLink>
          </section>

          <!-- 文章列表 -->
          <section class="articles-section">
            <div class="articles-grid">
              <NuxtLink
                v-for="(article, index) in filteredArticles"
                :key="article.path"
                :to="localePath(article.path)"
                class="article-card"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="card-image">
                  <div class="image-placeholder">
                    <svg v-if="article.icon === 'racket'" class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                    <svg v-else-if="article.icon === 'target'" class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    <svg v-else-if="article.icon === 'trophy'" class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                    <svg v-else class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 16v-4"></path>
                      <path d="M2 17l.62-2.54A6 6 0 0 1 7.44 10"></path>
                      <path d="M22 17l-.62-2.54A6 6 0 0 0 16.56 10"></path>
                      <circle cx="12" cy="9" r="2"></circle>
                      <path d="M8 9H2"></path>
                      <path d="M16 9h6"></path>
                    </svg>
                  </div>
                </div>
                <div class="card-content">
                  <div class="article-meta">
                    <span class="article-category">{{ article.category }}</span>
                    <span class="article-date">{{ article.date }}</span>
                  </div>
                  <h3 class="article-title">{{ article.title }}</h3>
                  <p class="article-excerpt">{{ article.description }}</p>
                </div>
              </NuxtLink>
            </div>

            <!-- 敬请期待 -->
            <div v-if="filteredArticles.length === 0" class="coming-section">
              <div class="coming-card">
                <svg class="coming-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                <h3 class="coming-title">{{ t('essays.comingSoon', '该分类暂无文章') }}</h3>
                <p class="coming-text">{{ t('essays.comingText', '更多精彩内容即将呈现，敬请期待。') }}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();

// SEO
const { setPageSEO } = useSEO();
setPageSEO('essays', locale.value);

// 分类筛选
const activeCategory = ref('all');

// 特色文章
const featuredArticle = computed(() => ({
  path: '/essays/sample-1',
  icon: 'trophy',
  category: t('essays.category.story', '成长故事'),
  date: '2024-08-10',
  title: t('essays.featured1Title', '从少年到传奇：樊振东的冠军之路'),
  description: t('essays.featured1Desc', '回顾樊振东从广州体校到巴黎奥运冠军的非凡历程，探索一位乒乓天才如何通过不懈努力登上世界之巅。')
}));

// 文章列表
const articles = computed(() => [
  {
    path: '/essays/sample-2',
    icon: 'racket',
    category: t('essays.category.technique', '技术分析'),
    date: '2024-07-20',
    title: t('essays.article1Title', '解析樊振东的技术风格'),
    description: t('essays.article1Desc', '深入分析樊振东独特的技术特点：强力正手、稳健反手以及出色的发球战术。')
  },
  {
    path: '/essays/sample-3',
    icon: 'target',
    category: t('essays.category.match', '比赛回顾'),
    date: '2024-06-15',
    title: t('essays.article2Title', '巴黎奥运会决赛复盘'),
    description: t('essays.article2Desc', '2024年巴黎奥运会男单决赛，樊振东4:1战胜对手，圆梦奥运单打金牌。')
  },
  {
    path: '/essays/sample-4',
    icon: 'thought',
    category: t('essays.category.insight', '个人感悟'),
    date: '2024-05-08',
    title: t('essays.article3Title', '小胖与球迷的双向奔赴'),
    description: t('essays.article3Desc', '探讨樊振东与球迷之间的特殊情感联结，以及他对球迷的真诚态度。')
  }
]);

// 筛选后的文章
const filteredArticles = computed(() => {
  if (activeCategory.value === 'all') {
    return articles.value;
  }
  const categoryMap: Record<string, string> = {
    'story': t('essays.category.story', '成长故事'),
    'technique': t('essays.category.technique', '技术分析'),
    'match': t('essays.category.match', '比赛回顾'),
    'insight': t('essays.category.insight', '个人感悟')
  };

  return articles.value.filter(article => article.category === categoryMap[activeCategory.value]);
});
</script>

<style scoped>
/* 页面容器 */
.essays-page {
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
  background: linear-gradient(135deg, transparent, rgba(251, 146, 60, 0.1), transparent);
  transform-origin: center;
}

.line-1 {
  width: 200%;
  height: 2px;
  top: 20%;
  left: -50%;
  transform: rotate(45deg);
  animation: diagonalMove1 15s ease-in-out infinite;
}

.line-2 {
  width: 150%;
  height: 1px;
  top: 50%;
  left: -25%;
  transform: rotate(45deg);
  animation: diagonalMove2 20s ease-in-out infinite;
}

.line-3 {
  width: 180%;
  height: 1.5px;
  top: 80%;
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
  background: rgba(251, 146, 60, 0.15);
  border: 1px solid rgba(251, 146, 60, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: #fdba74;
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
  border-bottom: 2px solid rgba(251, 146, 60, 0.3);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.category-item {
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

.category-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.category-item.active {
  color: #fdba74;
  background: rgba(251, 146, 60, 0.15);
  border-color: rgba(251, 146, 60, 0.4);
}

.cat-icon {
  flex-shrink: 0;
}

.cat-name {
  flex: 1;
}

.cat-count {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
  padding: var(--space-1) var(--space-2);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
}

/* 统计卡片 */
.stats-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.15), rgba(251, 146, 60, 0.05));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(251, 146, 60, 0.2);
  padding: var(--space-6);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: #fdba74;
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
  background: rgba(251, 146, 60, 0.3);
}

/* 右侧面板 */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 特色文章 */
.featured-section {
  margin-bottom: var(--space-6);
}

.featured-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-out);
}

@media (min-width: 768px) {
  .featured-card {
    grid-template-columns: 1fr 1fr;
  }
}

.featured-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(135deg, transparent, rgba(251, 146, 60, 0.05), transparent);
  transform: rotate(45deg);
  transition: all var(--duration-slow) var(--ease-out);
  opacity: 0;
}

.featured-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% { transform: rotate(45deg) translateY(100%); }
  100% { transform: rotate(45deg) translateY(-100%); }
}

.featured-card:hover {
  transform: translateY(-6px) scale(1.02);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(251, 146, 60, 0.2);
  border-color: rgba(251, 146, 60, 0.4);
}

.featured-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.3), rgba(251, 146, 60, 0.1));
}

@media (min-width: 768px) {
  .featured-image {
    height: auto;
    min-height: 280px;
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  opacity: 0.8;
  color: rgba(255, 255, 255, 0.6);
}

.featured-badge {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  color: #0a1428;
  background: var(--color-accent-400);
  border-radius: var(--radius-full);
}

.featured-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article-meta {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.article-category {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: #fdba74;
  text-transform: uppercase;
}

.article-date {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
}

.featured-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: #ffffff;
  margin-bottom: var(--space-3);
  line-height: 1.3;
}

.featured-excerpt {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}

.read-more {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: #fdba74;
}

/* 文章列表 */
.articles-grid {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.article-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-out);
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

.article-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(135deg, transparent, rgba(251, 146, 60, 0.05), transparent);
  transform: rotate(45deg);
  transition: all var(--duration-slow) var(--ease-out);
  opacity: 0;
}

.article-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

.article-card:hover {
  transform: translateY(-6px) scale(1.02);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(251, 146, 60, 0.2);
  border-color: rgba(251, 146, 60, 0.4);
}

.card-image {
  height: 140px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(251, 146, 60, 0.05));
}

.card-content {
  padding: var(--space-5);
}

.article-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-excerpt {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 敬请期待 */
.coming-section {
  text-align: center;
}

.coming-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  padding: var(--space-10);
}

.coming-icon {
  font-size: 48px;
  display: block;
  margin-bottom: var(--space-4);
  opacity: 0.6;
}

.coming-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-2);
}

.coming-text {
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
  .stats-card,
  .coming-card {
    transform: none;
  }

  .nav-title,
  .category-item,
  .stat-item {
    transform: none;
  }

  .category-item:hover {
    transform: translateX(4px);
  }

  .stat-divider {
    transform: none;
  }

  .featured-card,
  .article-card {
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

  .featured-card:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .article-card:nth-child(even) {
    transform: none;
    animation-name: cardFadeIn;
  }

  .article-card:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .coming-title,
  .coming-text {
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

  .featured-title {
    font-size: var(--text-xl);
  }
}
</style>
