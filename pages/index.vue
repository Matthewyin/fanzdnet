<template>
  <div>
    <HeroCarousel />
    <HomeTabs />
  </div>
</template>

<script setup lang="ts">
import HeroCarousel from '@/components/HeroCarousel.vue';
import HomeTabs from '@/components/HomeTabs.vue';

// SEO 优化
const { setPageSEO, generateStructuredData } = useSEO()
const { initPerformanceMonitoring } = usePerformance()

// 设置页面 SEO
setPageSEO('home', 'zh')

// 添加结构化数据
const structuredData = generateStructuredData('home', 'zh')
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData)
    }
  ]
})

// 初始化性能监控
onMounted(() => {
  initPerformanceMonitoring()
})
</script>