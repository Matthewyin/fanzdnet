<template>
  <div class="home-page">
    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- Champion Showcase - 冠军墙 + 表格 -->
    <section class="champion-showcase-section">
      <div class="container-wide">
        <div class="section-header">
          <h2 class="section-title">{{ $t('home.champion.title', '超级全满贯') }}</h2>
          <p class="section-subtitle">{{ $t('home.champion.subtitle', '点击左侧蜂巢筛选冠军，乒坛史上第3位超级全满贯得主') }}</p>
        </div>
        <ChampionShowcase />
      </div>
    </section>

    <!-- Features Section -->
    <HomeFeatures />

    <!-- Honor Hall -->
    <HonorHall />
  </div>
</template>

<script setup lang="ts">
import HeroCarousel from '@/components/HeroCarousel.vue';
import ChampionShowcase from '@/components/ChampionShowcase.vue';
import HomeFeatures from '@/components/HomeFeatures.vue';
import HonorHall from '@/components/HonorHall.vue';

const { locale } = useI18n();

// SEO 优化
const { setPageSEO, generateStructuredData } = useSEO();
const { initPerformanceMonitoring } = usePerformance();

// 设置页面 SEO
setPageSEO('home', locale.value);

// 添加结构化数据
const structuredData = generateStructuredData('home', locale.value);
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData)
    }
  ]
});

// 初始化性能监控
onMounted(() => {
  initPerformanceMonitoring();
});
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* 冠军展示区 */
.champion-showcase-section {
  padding: 4rem 1rem;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%);
  position: relative;
  overflow: hidden;
}

.champion-showcase-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(255, 140, 0, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.container-wide {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 20px rgba(255, 215, 0, 0.3);
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 1024px) {
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 640px) {
  .champion-showcase-section {
    padding: 2rem 0.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-subtitle {
    font-size: 0.875rem;
  }
}
</style>