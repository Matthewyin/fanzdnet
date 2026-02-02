<template>
  <div class="home-page">
    <!-- Hero Carousel -->
    <HeroCarousel />

    <!-- Features Section -->
    <HomeFeatures />

    <!-- Honor Hall -->
    <HonorHall />
  </div>
</template>

<script setup lang="ts">
import HeroCarousel from '@/components/HeroCarousel.vue';
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
</style>