<template>
  <div class="page-background" :class="[`theme-${theme}`, { 'has-parallax': parallax }]">
    <!-- 背景图片层 -->
    <div class="bg-image"></div>
    <!-- 遮罩层 -->
    <div class="bg-overlay"></div>
    <!-- 装饰效果层 -->
    <div v-if="showGlow" class="bg-glow"></div>
    <!-- 噪点纹理层 -->
    <div class="bg-noise"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  theme?: 'timeline' | 'updates' | 'schedule' | 'ai-gallery' | 'essays' | 'about';
  parallax?: boolean;
  showGlow?: boolean;
}

withDefaults(defineProps<Props>(), {
  theme: 'timeline',
  parallax: true,
  showGlow: true
});
</script>

<style scoped>
.page-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
}

/* 背景图片 */
.bg-image {
  position: absolute;
  inset: 0;
  background-image: url('/images/backgrounds/OlympicsCamp.avif');
  background-size: cover;
  background-position: 70% center;
  background-repeat: no-repeat;
  transform: scale(1.05);
  transition: transform 0.3s ease-out;
}

.has-parallax .bg-image {
  transform: scale(1.1);
}

/* 遮罩层 - 基础样式 */
.bg-overlay {
  position: absolute;
  inset: 0;
  transition: background var(--duration-normal) var(--ease-in-out);
}

/* 装饰光效 */
.bg-glow {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  pointer-events: none;
}

/* 噪点纹理 */
.bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* ========== 主题变体 ========== */

/* 大事记 - 深蓝渐变 + 金色光晕 */
.theme-timeline .bg-overlay {
  background: linear-gradient(
    180deg,
    rgba(10, 15, 26, 0.85) 0%,
    rgba(26, 58, 138, 0.75) 30%,
    rgba(10, 15, 26, 0.9) 100%
  );
}

.theme-timeline .bg-glow {
  background: radial-gradient(ellipse at 50% 0%, rgba(255, 215, 0, 0.15) 0%, transparent 60%);
}

/* 最新动态 - 深色半透明 */
.theme-updates .bg-overlay {
  background: linear-gradient(
    180deg,
    rgba(10, 15, 26, 0.9) 0%,
    rgba(31, 41, 55, 0.85) 50%,
    rgba(10, 15, 26, 0.95) 100%
  );
}

.theme-updates .bg-glow {
  background: radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
}

/* 赛事信息 - 高对比度暗色 */
.theme-schedule .bg-overlay {
  background: linear-gradient(
    180deg,
    rgba(10, 15, 26, 0.92) 0%,
    rgba(20, 30, 50, 0.88) 50%,
    rgba(10, 15, 26, 0.95) 100%
  );
}

.theme-schedule .bg-glow {
  background: radial-gradient(ellipse at 70% 30%, rgba(239, 68, 68, 0.1) 0%, transparent 50%);
}

/* AI灵感站 - 紫色/霓虹渐变 */
.theme-ai-gallery .bg-overlay {
  background: linear-gradient(
    135deg,
    rgba(88, 28, 135, 0.85) 0%,
    rgba(15, 23, 42, 0.9) 50%,
    rgba(30, 58, 138, 0.85) 100%
  );
}

.theme-ai-gallery .bg-glow {
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%);
}

/* 随笔 - 暖色调遮罩 */
.theme-essays .bg-overlay {
  background: linear-gradient(
    180deg,
    rgba(30, 20, 15, 0.88) 0%,
    rgba(45, 35, 25, 0.82) 50%,
    rgba(20, 15, 10, 0.92) 100%
  );
}

.theme-essays .bg-glow {
  background: radial-gradient(ellipse at 50% 30%, rgba(251, 191, 36, 0.12) 0%, transparent 60%);
}

/* 关于 - 柔和渐变 */
.theme-about .bg-overlay {
  background: linear-gradient(
    180deg,
    rgba(15, 20, 30, 0.88) 0%,
    rgba(30, 40, 60, 0.8) 50%,
    rgba(15, 20, 30, 0.92) 100%
  );
}

.theme-about .bg-glow {
  background: radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
}
</style>

