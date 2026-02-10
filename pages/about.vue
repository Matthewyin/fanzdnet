<template>
  <div class="about-page dynamic-diagonal">
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
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          {{ t('pages.about.tag', '关于') }}
        </span>
        <h1 class="page-title">{{ t('pages.about.title', '关于本站') }}</h1>
        <p class="page-subtitle">{{ t('about.slogan', '用热爱记录传奇') }}</p>
      </header>

      <!-- 主内容区 - 左右不对称布局 -->
      <div class="content-grid">
        <!-- 左侧：标题和简介 -->
        <div class="left-panel">
          <section class="intro-section">
            <div class="intro-card">
              <svg class="card-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
              <h2 class="card-title">{{ t('about.siteTitle', '这是什么网站？') }}</h2>
              <p class="card-text">{{ t('about.description1', '本网站是由球迷为樊振东建立的信息站，旨在分享和记录他的职业生涯点滴。') }}</p>
              <p class="card-text">{{ t('about.description2', '所有内容均整理自公开网络渠道，如有任何疑问或建议，请随时联系我们。') }}</p>
            </div>
          </section>

          <!-- 网站特色 -->
          <section class="features-section">
            <h2 class="section-title">{{ t('about.featuresTitle', '网站特色') }}</h2>
            <div class="features-list">
              <div v-for="feature in features" :key="feature.id" class="feature-item">
                <span class="feature-icon">
                  <!-- Globe icon -->
                  <svg v-if="feature.icon === '🌍'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                  <!-- Moon/Sun icon -->
                  <svg v-else-if="feature.icon === '🌓'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                  <!-- Device icon -->
                  <svg v-else-if="feature.icon === '📱'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <path d="M2 10h20"></path>
                  </svg>
                  <!-- Zap icon -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </span>
                <div class="feature-content">
                  <h3 class="feature-title">{{ feature.title }}</h3>
                  <p class="feature-desc">{{ feature.desc }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- 右侧：卡片网格 -->
        <div class="right-panel">
          <!-- 数据来源卡片 -->
          <div class="tilted-card sources-card">
            <h3 class="card-heading">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              {{ t('about.sourcesTitle', '数据来源') }}
            </h3>
            <ul class="sources-list">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" x2="22" y1="12" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                {{ t('about.source1', '维基百科 - 樊振东词条') }}
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                {{ t('about.source2', '国际乒联（ITTF）官方网站') }}
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m5.6 5.6 12.8 12.8"></path>
                  <path d="m18.4 5.6-12.8 12.8"></path>
                </svg>
                {{ t('about.source3', '世界乒乓球职业大联盟（WTT）') }}
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                {{ t('about.source4', '央视体育、新华网等官方媒体') }}
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="10" r="8"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                {{ t('about.source5', '奥林匹克官方网站 Olympics.com') }}
              </li>
            </ul>
            <p class="disclaimer">{{ t('about.disclaimer', '本站所有信息仅供粉丝交流学习使用，如有侵权请联系删除。') }}</p>
          </div>

          <!-- 技术栈卡片 -->
          <div class="tilted-card tech-card">
            <h3 class="card-heading">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              {{ t('about.techTitle', '技术栈') }}
            </h3>
            <div class="tech-grid">
              <div v-for="tech in techStack" :key="tech.name" class="tech-badge">
                <span class="tech-icon">
                  <!-- Globe/Nuxt -->
                  <svg v-if="tech.icon === 'globe'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                  <!-- Zap/Vue -->
                  <svg v-else-if="tech.icon === 'zap'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  <!-- File Code/TypeScript -->
                  <svg v-else-if="tech.icon === 'file-code'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <path d="m10 13-2 2 2 2"></path>
                    <path d="m14 17 2-2-2-2"></path>
                  </svg>
                  <!-- Flame/Firebase -->
                  <svg v-else-if="tech.icon === 'flame'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                  <!-- Languages/i18n -->
                  <svg v-else-if="tech.icon === 'languages'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 8l6 6"></path>
                    <path d="M4 14l6-6 2-3"></path>
                    <path d="M2 5h12"></path>
                    <path d="M7 2h1"></path>
                    <path d="M22 22l-5-10-5 10"></path>
                    <path d="M14 18h6"></path>
                  </svg>
                  <!-- Palette/CSS Variables -->
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
                    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                  </svg>
                </span>
                <span class="tech-name">{{ tech.name }}</span>
              </div>
            </div>
          </div>

          <!-- 联系方式卡片 -->
          <div class="tilted-card contact-card">
            <h3 class="card-heading">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              {{ t('about.contactTitle', '联系我们') }}
            </h3>
            <p class="contact-text">{{ t('about.contactDesc', '如果您有任何建议、反馈或发现错误信息，欢迎联系我们：') }}</p>
            <a href="https://github.com/Matthewyin/fanzdnet" target="_blank" rel="noopener" class="contact-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="btn-icon">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
              GitHub
            </a>
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
setPageSEO('about', locale.value);

// 网站特色
const features = computed(() => [
  {
    id: 1,
    icon: '🌍',
    title: t('about.feature1Title', '多语言支持'),
    desc: t('about.feature1Desc', '支持中、英、日、韩、德、法、西、瑞典等 8 种语言')
  },
  {
    id: 2,
    icon: '🌓',
    title: t('about.feature2Title', '暗色模式'),
    desc: t('about.feature2Desc', '支持亮色、暗色主题切换，保护您的眼睛')
  },
  {
    id: 3,
    icon: '📱',
    title: t('about.feature3Title', '响应式设计'),
    desc: t('about.feature3Desc', '完美适配手机、平板、电脑等各种设备')
  },
  {
    id: 4,
    icon: '⚡',
    title: t('about.feature4Title', '高性能'),
    desc: t('about.feature4Desc', '采用现代化技术栈，服务端渲染，极速加载')
  }
]);

// 技术栈
const techStack = [
  { name: 'Nuxt.js 3', icon: 'globe' },
  { name: 'Vue 3', icon: 'zap' },
  { name: 'TypeScript', icon: 'file-code' },
  { name: 'Firebase', icon: 'flame' },
  { name: 'i18n', icon: 'languages' },
  { name: 'CSS Variables', icon: 'palette' }
];
</script>

<style scoped>
/* 页面容器 */
.about-page {
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
  transform: skewX(-5deg);
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
  transform: skewX(5deg);
}

.page-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: var(--space-3);
  transform: skewX(5deg);
}

.page-subtitle {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.8);
  transform: skewX(5deg);
}

/* 主内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 1.2fr 1fr;
  }
}

/* 左侧面板 */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

/* 简介卡片 */
.intro-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--space-8);
  transform: skewX(-5deg);
}

.intro-card > * {
  transform: skewX(5deg);
}

.card-icon {
  font-size: 48px;
  margin-bottom: var(--space-4);
  display: block;
  color: var(--color-accent-400);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-4);
}

.card-text {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: var(--space-3);
}

/* 特色部分 */
.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: #ffffff;
  margin-bottom: var(--space-6);
  transform: skewX(-5deg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.section-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 32px;
  background: linear-gradient(to bottom, var(--color-accent-400), transparent);
  transform: skewX(5deg);
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.feature-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  background: rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--duration-normal) var(--ease-out);
  transform: skewX(-5deg);
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
  transform: skewX(-5deg) translateX(8px);
}

.feature-item > * {
  transform: skewX(5deg);
}

.feature-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 215, 0, 0.1);
  border-radius: var(--radius-lg);
  color: var(--color-accent-400);
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-2);
}

.feature-desc {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* 右侧面板 */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 倾斜卡片 */
.tilted-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--space-6);
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.tilted-card::before {
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

.tilted-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% { transform: rotate(45deg) translateY(100%); }
  100% { transform: rotate(45deg) translateY(-100%); }
}

.tilted-card:hover {
  transform: rotate(2deg) translateY(-4px);
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1);
}

.card-heading {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid rgba(255, 215, 0, 0.2);
  transform: skewX(-5deg);
}

.card-heading > * {
  transform: skewX(5deg);
}

/* 数据来源列表 */
.sources-list {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-4);
}

.sources-list li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.9);
  padding: var(--space-3) var(--space-4);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-2);
  transition: all var(--duration-fast) var(--ease-out);
}

.sources-list li:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.disclaimer {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* 技术栈网格 */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
  font-size: var(--text-xs);
  color: #ffffff;
  transition: all var(--duration-fast) var(--ease-out);
}

.tech-badge:hover {
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
  transform: scale(1.05);
}

/* 联系方式 */
.contact-text {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: var(--space-4);
}

.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: #ffffff;
  background: linear-gradient(135deg, rgba(26, 58, 138, 0.3), rgba(255, 215, 0, 0.2));
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: var(--radius-xl);
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-out);
  transform: skewX(-5deg);
}

.contact-btn > * {
  transform: skewX(5deg);
}

.contact-btn:hover {
  background: linear-gradient(135deg, rgba(26, 58, 138, 0.5), rgba(255, 215, 0, 0.35));
  border-color: var(--color-accent-400);
  transform: skewX(-5deg) scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.2);
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

  .intro-card {
    transform: none;
  }

  .intro-card > * {
    transform: none;
  }

  .section-title {
    transform: none;
  }

  .feature-item {
    transform: none;
  }

  .feature-item:hover {
    transform: translateX(8px);
  }

  .feature-item > * {
    transform: none;
  }

  .card-heading {
    transform: none;
  }

  .contact-btn {
    transform: none;
  }

  .contact-btn > * {
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

  .section-title {
    font-size: var(--text-xl);
  }
}
</style>
