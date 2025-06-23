<template>
  <div class="hero-section star-density-medium">
    <div class="hero-carousel">
      <el-carousel
        :interval="3000"
        autoplay
        :arrow="'hover'"
        indicator-position="outside"
        height="100%"
        class="main-carousel"
      >
        <el-carousel-item v-for="(image, index) in heroImages" :key="index">
          <div class="carousel-item" :class="{ 'opening-slide': image.isOpening }">
            <!-- 开场轮播图使用拼接图片背景 -->
            <div v-if="image.isOpening" class="opening-background" :style="{ backgroundImage: `url(${image.url})` }"></div>
            <img v-else :src="image.url" :alt="image.title" class="carousel-image" />

            <div class="carousel-overlay" :class="{ 'opening-overlay': image.isOpening }">
              <!-- 开场轮播图的特殊内容 -->
              <div v-if="image.isOpening" class="opening-content">
                <div class="opening-text-container">
                  <div v-for="(line, lineIndex) in image.openingText" :key="lineIndex" 
                       class="opening-line"
                       :style="{ 
                         '--line-index': lineIndex,
                         animationDelay: (lineIndex * 0.5) + 's' 
                       }">
                    {{ line }}
                  </div>
                </div>
              </div>

              <!-- 传奇历程轮播图的内容 -->
              <template v-else>
                <!-- 主要文字内容叠加在图片上 - 透明容器 -->
                <div class="hero-text-container">
                  <div class="hero-text-overlay">
                    <h1 class="hero-title">{{ image.title }}</h1>
                    <h2 class="hero-subtitle">{{ image.subtitle }}</h2>
                    <p class="hero-quote">{{ image.quote }}</p>
                    <div class="hero-stats">
                      <div class="stat-item">
                        <span class="stat-label">赛事</span>
                        <span class="stat-value">{{ image.event }}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">对手</span>
                        <span class="stat-value">{{ image.opponent }}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">比分</span>
                        <span class="stat-value">{{ image.score }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 轮播图片描述信息 - 移除重复标题 -->
                <div class="carousel-info">
                  <p class="carousel-description">{{ image.description }}</p>
                </div>
              </template>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { heroImages as heroImagesData } from '@/data/heroData.js'

// 主轮播图片数据 - 开场 + 7幕传奇历程
const heroImages = ref(heroImagesData)

// 图片预加载功能
const preloadImages = () => {
  heroImages.value.forEach(image => {
    if (image.url) {
      const img = new Image()
      img.src = image.url
      // 添加加载完成和错误处理
      img.onload = () => {
        console.log(`图片加载成功: ${image.url}`)
      }
      img.onerror = () => {
        console.warn(`图片加载失败: ${image.url}`)
      }
    }
  })
}

// 组件挂载时预加载图片
onMounted(() => {
  preloadImages()
})
</script>

<style scoped>
/* 主要内容区域 - 全屏轮播图片与叠加文字 */
.hero-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0;
  position: relative;
  overflow: hidden;
}

/* 轮播区域样式 */
.hero-carousel {
  width: 100%;
  height: 70vh;
  min-height: 500px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(33, 150, 243, 0.15);
}

.main-carousel {
  width: 100%;
  height: 100%;
}

/* CSS变量定义 - 繁星密集度配置 */
:root {
  --star-density: medium; /* sparse, medium, dense */
  --star-count-large: 8;
  --star-count-medium: 12;
  --star-count-small: 15;
}

.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 统一深夜星空背景 - 所有轮播图使用相同效果 */
  background:
    /* 左侧文字区域保持纯黑 */
    linear-gradient(90deg, #000000 0%, #000000 45%, transparent 45%, transparent 100%),
    /* 深夜星空渐变背景 */
    radial-gradient(ellipse at 25% 20%, rgba(10, 15, 28, 0.8) 0%, transparent 60%),
    radial-gradient(ellipse at 75% 80%, rgba(15, 23, 42, 0.6) 0%, transparent 60%),
    radial-gradient(ellipse at 50% 50%, rgba(30, 27, 75, 0.4) 0%, transparent 70%),
    linear-gradient(135deg, #0a0f1c 0%, #0f172a 20%, #1e1b4b 40%, #0f172a 60%, #0a0f1c 80%, #000000 100%);
}

/* 统一繁星效果 - 第一层（大星星和中等星星）*/
.carousel-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    /* 大星星 (2px) - 中等密集度 */
    radial-gradient(2px 2px at 8% 15%, #ffffff, transparent),
    radial-gradient(2px 2px at 18% 35%, #e0e7ff, transparent),
    radial-gradient(2px 2px at 28% 65%, #ddd6fe, transparent),
    radial-gradient(2px 2px at 38% 25%, #ffffff, transparent),
    radial-gradient(2px 2px at 48% 75%, #e0e7ff, transparent),
    radial-gradient(2px 2px at 58% 45%, #ddd6fe, transparent),
    radial-gradient(2px 2px at 68% 85%, #ffffff, transparent),
    radial-gradient(2px 2px at 78% 55%, #e0e7ff, transparent),
    /* 中等星星 (1px) */
    radial-gradient(1px 1px at 12% 50%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 22% 20%, #ffffff, transparent),
    radial-gradient(1px 1px at 32% 80%, #e0e7ff, transparent),
    radial-gradient(1px 1px at 42% 40%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 52% 10%, #ffffff, transparent),
    radial-gradient(1px 1px at 62% 70%, #e0e7ff, transparent),
    radial-gradient(1px 1px at 72% 30%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 82% 90%, #ffffff, transparent),
    radial-gradient(1px 1px at 92% 60%, #e0e7ff, transparent),
    /* 额外中等星星 */
    radial-gradient(1px 1px at 15% 75%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 35% 95%, #ffffff, transparent),
    radial-gradient(1px 1px at 55% 25%, #e0e7ff, transparent);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.9;
  animation: starTwinkle 8s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

/* 统一繁星效果 - 第二层（小星星和远景效果）*/
.carousel-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    /* 小星星 (0.5px) - 中等密集度 */
    radial-gradient(0.5px 0.5px at 10% 30%, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(0.5px 0.5px at 20% 60%, rgba(224, 231, 255, 0.6), transparent),
    radial-gradient(0.5px 0.5px at 30% 10%, rgba(221, 214, 254, 0.8), transparent),
    radial-gradient(0.5px 0.5px at 40% 80%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(0.5px 0.5px at 50% 35%, rgba(224, 231, 255, 0.7), transparent),
    radial-gradient(0.5px 0.5px at 60% 90%, rgba(221, 214, 254, 0.6), transparent),
    radial-gradient(0.5px 0.5px at 70% 15%, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(0.5px 0.5px at 80% 65%, rgba(224, 231, 255, 0.5), transparent),
    radial-gradient(0.5px 0.5px at 90% 40%, rgba(221, 214, 254, 0.7), transparent),
    /* 微小星点 */
    radial-gradient(0.3px 0.3px at 14% 45%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(0.3px 0.3px at 24% 75%, rgba(224, 231, 255, 0.3), transparent),
    radial-gradient(0.3px 0.3px at 34% 25%, rgba(221, 214, 254, 0.5), transparent),
    radial-gradient(0.3px 0.3px at 44% 95%, rgba(255, 255, 255, 0.4), transparent),
    radial-gradient(0.3px 0.3px at 54% 5%, rgba(224, 231, 255, 0.6), transparent),
    radial-gradient(0.3px 0.3px at 64% 55%, rgba(221, 214, 254, 0.3), transparent),
    /* 深夜星云效果 */
    radial-gradient(ellipse 25px 12px at 25% 50%, rgba(10, 15, 28, 0.15), transparent),
    radial-gradient(ellipse 20px 10px at 75% 30%, rgba(30, 27, 75, 0.12), transparent),
    radial-gradient(ellipse 30px 15px at 50% 80%, rgba(15, 23, 42, 0.1), transparent);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.7;
  animation: starTwinkle 12s ease-in-out infinite reverse;
  pointer-events: none;
  z-index: 0;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持图片完整显示 */
  object-position: right; /* 图片定位到右侧 */
  transition: transform 0.3s ease;

  /* 图片加载优化 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* 图片加载时的占位背景 */
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);

  /* 确保图片清晰度 */
  backface-visibility: hidden;
  transform: translateZ(0);
}

.carousel-item:hover .carousel-image {
  transform: scale(1.05);
}

/* 开场轮播图样式 - 使用统一深夜星空背景 */
.opening-background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  /* 背景图片设置 - 定位到右侧 */
  background-size: contain; /* 保持图片完整显示 */
  background-position: right; /* 背景图片定位到右侧 */
  background-repeat: no-repeat;

  /* 移除特殊背景效果，开场轮播图现在也使用统一的深夜星空背景 */
  /* 背景效果由 .carousel-item 统一提供 */
}

/* 移除旧的背景动画，统一使用星空效果 */

/* 深夜繁星闪烁动画 - 缓慢宁静 */
@keyframes starTwinkle {
  0%, 100% {
    opacity: 0.9;
    transform: scale(1);
  }
  20% {
    opacity: 0.7;
    transform: scale(0.96);
  }
  40% {
    opacity: 1;
    transform: scale(1.04);
  }
  60% {
    opacity: 0.8;
    transform: scale(0.98);
  }
  80% {
    opacity: 0.95;
    transform: scale(1.02);
  }
}

/* 繁星密集度配置 */
/* 稀疏密集度 - 减少星星数量 */
.star-density-sparse .carousel-item::before {
  background-image:
    /* 只保留大星星 */
    radial-gradient(2px 2px at 15% 25%, #ffffff, transparent),
    radial-gradient(2px 2px at 35% 65%, #e0e7ff, transparent),
    radial-gradient(2px 2px at 55% 35%, #ddd6fe, transparent),
    radial-gradient(2px 2px at 75% 75%, #ffffff, transparent),
    /* 少量中等星星 */
    radial-gradient(1px 1px at 25% 50%, #e0e7ff, transparent),
    radial-gradient(1px 1px at 45% 20%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 65% 80%, #ffffff, transparent),
    radial-gradient(1px 1px at 85% 40%, #e0e7ff, transparent);
}

.star-density-sparse .carousel-item::after {
  background-image:
    /* 减少小星星 */
    radial-gradient(0.5px 0.5px at 20% 30%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(0.5px 0.5px at 40% 70%, rgba(224, 231, 255, 0.5), transparent),
    radial-gradient(0.5px 0.5px at 60% 40%, rgba(221, 214, 254, 0.7), transparent),
    radial-gradient(0.5px 0.5px at 80% 80%, rgba(255, 255, 255, 0.4), transparent);
}

/* 密集密集度 - 增加星星数量 */
.star-density-dense .carousel-item::before {
  background-image:
    /* 原有星星 + 额外星星 */
    radial-gradient(2px 2px at 8% 15%, #ffffff, transparent),
    radial-gradient(2px 2px at 18% 35%, #e0e7ff, transparent),
    radial-gradient(2px 2px at 28% 65%, #ddd6fe, transparent),
    radial-gradient(2px 2px at 38% 25%, #ffffff, transparent),
    radial-gradient(2px 2px at 48% 75%, #e0e7ff, transparent),
    radial-gradient(2px 2px at 58% 45%, #ddd6fe, transparent),
    radial-gradient(2px 2px at 68% 85%, #ffffff, transparent),
    radial-gradient(2px 2px at 78% 55%, #e0e7ff, transparent),
    /* 额外大星星 */
    radial-gradient(2px 2px at 88% 25%, #ddd6fe, transparent),
    radial-gradient(2px 2px at 95% 75%, #ffffff, transparent),
    /* 更多中等星星 */
    radial-gradient(1px 1px at 12% 50%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 22% 20%, #ffffff, transparent),
    radial-gradient(1px 1px at 32% 80%, #e0e7ff, transparent),
    radial-gradient(1px 1px at 42% 40%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 52% 10%, #ffffff, transparent),
    radial-gradient(1px 1px at 62% 70%, #e0e7ff, transparent),
    radial-gradient(1px 1px at 72% 30%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 82% 90%, #ffffff, transparent),
    radial-gradient(1px 1px at 92% 60%, #e0e7ff, transparent),
    /* 额外中等星星 */
    radial-gradient(1px 1px at 15% 75%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 35% 95%, #ffffff, transparent),
    radial-gradient(1px 1px at 55% 25%, #e0e7ff, transparent),
    radial-gradient(1px 1px at 75% 5%, #ddd6fe, transparent),
    radial-gradient(1px 1px at 95% 45%, #ffffff, transparent);
}

.opening-overlay {
  background: transparent !important; /* 开场轮播图不需要渐变遮罩 */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 80px;
}

.opening-content {
  width: 100%;
  max-width: 800px;
  text-align: center;
  position: relative;
  z-index: 10; /* 确保开场文字在所有背景效果之上 */
}

.opening-text-container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* 性能优化：启用GPU加速和优化渲染 */
  transform: translateZ(0);
  will-change: auto;
  contain: layout style paint;
}

.opening-line {
  /* 现代优雅字体组合 */
  font-family:
    'SF Pro Display', 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Noto Sans SC', sans-serif;
  font-size: 32px;
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 2px;
  color: #ffffff;

  /* 优化后的双层阴影，减少渲染负担 */
  text-shadow:
    2px 2px 8px rgba(0, 0, 0, 0.9),
    0 0 16px rgba(0, 0, 0, 0.6);

  /* 初始状态 */
  opacity: 0;
  transform: translateY(30px);

  /* 优化动画：0.5秒完成，使用GPU加速的transform和opacity */
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: calc(var(--line-index, 0) * 0.5s); /* 每行间隔0.5秒 */

  /* 启用GPU加速 */
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 纯黑色背景：左侧完全黑色，右侧透明，提供最大对比度 */
  background: linear-gradient(90deg, rgba(0, 0, 0, 1.0) 0%, rgba(0, 0, 0, 1.0) 45%, rgba(0, 0, 0, 0.5) 55%, transparent 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 60px 80px;
}

/* 人物位置相关的背景渐变优化 */
.person-left .carousel-overlay {
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%);
}

.person-right .carousel-overlay {
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.6) 100%);
}

/* 重要：确保轮播项正确隐藏/显示 */
.main-carousel :deep(.el-carousel__item) {
  width: 100% !important;
  height: 100% !important;
}

.main-carousel :deep(.el-carousel__item:not(.is-active)) {
  display: none !important;
}

.main-carousel :deep(.el-carousel__item.is-active) {
  display: block !important;
}

/* 主要文字内容容器 - 定位在左侧黑色区域 */
.hero-text-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 顶端对齐 */
  align-items: flex-start;
  padding-top: 40px; /* 添加顶部间距 */
  max-width: 60%; /* 限制宽度，确保在左侧区域 */
  z-index: 2;
}

/* 主要文字内容叠加样式 - 完全透明无边界 */
.hero-text-overlay {
  background: transparent !important; /* 强制透明背景 */
  padding: 0 !important; /* 强制移除所有内边距 */
  margin: 0; /* 移除外边距 */
  border: none !important; /* 强制移除边框 */
  border-radius: 0 !important; /* 强制移除圆角 */
  backdrop-filter: none !important; /* 强制移除模糊效果 */
  box-shadow: none !important; /* 强制移除阴影 */
  outline: none !important; /* 移除轮廓 */
  max-width: 700px;
  width: 100%;
  transition: all 0.3s ease;
}

/* 文字内容位置控制 */
.hero-text-overlay.text-left {
  align-self: flex-start;
  margin-right: auto;
}

.hero-text-overlay.text-right {
  align-self: flex-end;
  margin-left: auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.2;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 6px rgba(0, 0, 0, 0.8);
}

.hero-subtitle {
  font-size: 32px;
  font-weight: 600;
  color: #ffd700;
  margin-bottom: 20px;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9), 1px 1px 5px rgba(0, 0, 0, 0.8);
}

.hero-quote {
  font-size: 20px;
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 32px;
  /* 增强多层文字阴影确保可读性 */
  text-shadow:
    4px 4px 16px rgba(0, 0, 0, 0.95),
    2px 2px 8px rgba(0, 0, 0, 0.9),
    1px 1px 4px rgba(0, 0, 0, 0.8),
    0 0 8px rgba(0, 0, 0, 0.7);
  background: transparent !important; /* 强制透明背景 */
  padding: 0 !important; /* 强制移除内边距 */
  margin-left: 0 !important; /* 移除左边距 */
  margin-right: 0 !important; /* 移除右边距 */
  border: none !important; /* 强制移除边框 */
  border-radius: 0 !important; /* 强制移除圆角 */
  backdrop-filter: none !important; /* 强制移除模糊效果 */
  box-shadow: none !important; /* 强制移除阴影 */
  outline: none !important; /* 移除轮廓 */
  font-style: italic;
}

.hero-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: left;
  background: transparent !important; /* 强制透明背景 */
  padding: 0 !important; /* 强制移除所有内边距 */
  margin: 0; /* 移除外边距 */
  border: none !important; /* 强制移除边框 */
  border-radius: 0 !important; /* 强制移除圆角 */
  backdrop-filter: none !important; /* 强制移除模糊效果 */
  box-shadow: none !important; /* 强制移除阴影 */
  outline: none !important; /* 移除轮廓 */
  min-width: 180px;
  flex: 1;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #ffd700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  font-weight: 600;
  /* 增强多层文字阴影确保可读性 */
  text-shadow:
    4px 4px 14px rgba(0, 0, 0, 0.95),
    2px 2px 8px rgba(0, 0, 0, 0.9),
    1px 1px 4px rgba(0, 0, 0, 0.8),
    0 0 6px rgba(0, 0, 0, 0.7);
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  /* 增强多层文字阴影确保可读性 */
  text-shadow:
    4px 4px 16px rgba(0, 0, 0, 0.95),
    2px 2px 10px rgba(0, 0, 0, 0.9),
    1px 1px 5px rgba(0, 0, 0, 0.8),
    0 0 8px rgba(0, 0, 0, 0.7);
  line-height: 1.3;
}

/* 轮播图片信息样式 - 定位在左侧黑色区域 */
.carousel-info {
  z-index: 2;
  transition: all 0.3s ease;
  background: transparent !important; /* 强制透明背景 */
  padding: 0 !important; /* 强制移除所有内边距 */
  margin: 0; /* 移除外边距 */
  border: none !important; /* 强制移除边框 */
  border-radius: 0 !important; /* 强制移除圆角 */
  backdrop-filter: none !important; /* 强制移除模糊效果 */
  box-shadow: none !important; /* 强制移除阴影 */
  outline: none !important; /* 移除轮廓 */
  max-width: 60%; /* 限制宽度，确保在左侧区域 */
  align-self: flex-start; /* 左对齐 */
}

.carousel-info.info-left {
  text-align: left;
  align-self: flex-start;
}

.carousel-info.info-right {
  text-align: right;
  align-self: flex-end;
}

/* 移除重复的标题样式，因为已经在上方显示 */
.carousel-title {
  display: none; /* 隐藏重复的标题 */
}

.carousel-description {
  font-size: 18px; /* 增大字体大小 */
  line-height: 1.8; /* 增加行高提升可读性 */
  margin: 0;
  /* 增强多层文字阴影确保各种背景下的可读性 */
  text-shadow:
    4px 4px 16px rgba(0, 0, 0, 0.95),
    2px 2px 10px rgba(0, 0, 0, 0.9),
    1px 1px 6px rgba(0, 0, 0, 0.8),
    0 0 12px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(0, 0, 0, 0.5);
  color: #ffffff; /* 改为白色提升对比度 */
  font-weight: 400;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .hero-carousel {
    height: 60vh;
    min-height: 400px;
  }

  .carousel-overlay {
    padding: 30px 20px;
    /* 移动端纯黑色背景渐变 */
    background: linear-gradient(180deg, rgba(0, 0, 0, 1.0) 0%, rgba(0, 0, 0, 1.0) 55%, rgba(0, 0, 0, 0.3) 75%, transparent 100%);
  }

  /* 移动端统一深夜星空背景 */
  .carousel-item {
    background:
      /* 移动端文字区域保持纯黑 */
      linear-gradient(180deg, #000000 0%, #000000 55%, transparent 55%, transparent 100%),
      /* 移动端深夜星空渐变 */
      radial-gradient(ellipse at 30% 20%, rgba(10, 15, 28, 0.6) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(15, 23, 42, 0.4) 0%, transparent 50%),
      linear-gradient(180deg, #0a0f1c 0%, #0f172a 25%, #1e1b4b 50%, #0f172a 75%, #0a0f1c 100%);
  }

  /* 移动端自动降低星星密集度 */
  .carousel-item::before {
    /* 移动端使用稀疏密集度 */
    background-image:
      radial-gradient(1.5px 1.5px at 15% 25%, #ffffff, transparent),
      radial-gradient(1.5px 1.5px at 35% 65%, #e0e7ff, transparent),
      radial-gradient(1.5px 1.5px at 55% 35%, #ddd6fe, transparent),
      radial-gradient(1.5px 1.5px at 75% 75%, #ffffff, transparent),
      radial-gradient(1px 1px at 25% 50%, #e0e7ff, transparent),
      radial-gradient(1px 1px at 45% 20%, #ddd6fe, transparent),
      radial-gradient(1px 1px at 65% 80%, #ffffff, transparent),
      radial-gradient(1px 1px at 85% 40%, #e0e7ff, transparent);
    opacity: 0.7;
    animation-duration: 10s;
  }

  .carousel-item::after {
    /* 移动端减少小星星 */
    background-image:
      radial-gradient(0.5px 0.5px at 20% 30%, rgba(255, 255, 255, 0.5), transparent),
      radial-gradient(0.5px 0.5px at 40% 70%, rgba(224, 231, 255, 0.4), transparent),
      radial-gradient(0.5px 0.5px at 60% 40%, rgba(221, 214, 254, 0.6), transparent),
      radial-gradient(0.5px 0.5px at 80% 80%, rgba(255, 255, 255, 0.3), transparent),
      /* 保留星云效果 */
      radial-gradient(ellipse 20px 10px at 30% 60%, rgba(10, 15, 28, 0.1), transparent),
      radial-gradient(ellipse 15px 8px at 70% 30%, rgba(15, 23, 42, 0.08), transparent);
    opacity: 0.5;
    animation-duration: 14s;
  }

  .carousel-image {
    /* 移动端图片定位调整 */
    object-position: center bottom;
  }

  /* 移动端开场轮播图样式 */
  .opening-overlay {
    padding: 40px 20px;
  }

  .opening-line {
    font-size: 24px; /* 移动端适当调整字号 */
    font-family:
      'SF Pro Display', 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Noto Sans SC', sans-serif; /* 移动端保持现代字体 */
    font-weight: 300; /* 保持轻盈字重 */
    letter-spacing: 1.5px; /* 移动端适当减少字间距 */
    line-height: 1.5; /* 移动端调整行高 */

    /* 移动端优化：简化阴影效果 */
    text-shadow:
      2px 2px 6px rgba(0, 0, 0, 0.9),
      0 0 12px rgba(0, 0, 0, 0.6);
  }

  .opening-text-container {
    gap: 20px;
  }

  .hero-text-overlay {
    max-width: 100%;
    padding: 0 !important; /* 移动端强制移除内边距 */
    margin: 0 !important; /* 移动端强制移除外边距 */
    background: transparent !important; /* 移动端强制透明背景 */
    border: none !important; /* 移动端强制移除边框 */
    box-shadow: none !important; /* 移动端强制移除阴影 */
  }

  .hero-text-container {
    max-width: 100%; /* 移动端使用全宽 */
  }

  .carousel-info {
    max-width: 100%; /* 移动端使用全宽 */
  }

  .hero-title {
    font-size: 42px;
  }

  .hero-subtitle {
    font-size: 22px;
  }

  .hero-stats {
    justify-content: center;
    gap: 16px;
  }

  .stat-item {
    padding: 0 !important; /* 移动端强制移除内边距 */
    margin: 0 !important; /* 移动端强制移除外边距 */
    background: transparent !important; /* 移动端强制透明背景 */
    border: none !important; /* 移动端强制移除边框 */
    box-shadow: none !important; /* 移动端强制移除阴影 */
  }

  .carousel-info {
    text-align: center;
    background: transparent !important; /* 移动端强制透明背景 */
    padding: 0 !important; /* 移动端强制移除内边距 */
    margin: 0 !important; /* 移动端强制移除外边距 */
    border: none !important; /* 移动端强制移除边框 */
    box-shadow: none !important; /* 移动端强制移除阴影 */
  }
}

@media (max-width: 480px) {
  .hero-carousel {
    height: 50vh;
    min-height: 350px;
  }

  .carousel-overlay {
    padding: 20px 16px;
  }

  /* 小屏移动端开场轮播图样式 */
  .opening-overlay {
    padding: 30px 16px;
  }

  .opening-line {
    font-size: 20px; /* 小屏移动端字号 */
    font-family:
      'SF Pro Display', 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB',
      'Microsoft YaHei', 'Noto Sans SC', sans-serif; /* 小屏移动端保持现代字体 */
    font-weight: 300; /* 保持轻盈字重 */
    letter-spacing: 1px; /* 小屏移动端减少字间距 */
    line-height: 1.4; /* 小屏移动端调整行高 */

    /* 小屏移动端优化：最简化阴影效果 */
    text-shadow:
      1px 1px 4px rgba(0, 0, 0, 0.9),
      0 0 8px rgba(0, 0, 0, 0.6);
  }

  .opening-text-container {
    gap: 16px;
  }

  .hero-text-overlay {
    padding: 0 !important; /* 最小屏强制移除内边距 */
    margin: 0 !important; /* 最小屏强制移除外边距 */
    max-width: 100%;
    background: transparent !important; /* 最小屏强制透明背景 */
    border: none !important; /* 最小屏强制移除边框 */
    box-shadow: none !important; /* 最小屏强制移除阴影 */
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 20px;
  }

  .hero-quote {
    font-size: 16px;
    padding: 0 !important; /* 最小屏强制移除内边距 */
    margin-left: 0 !important; /* 最小屏强制移除左边距 */
    margin-right: 0 !important; /* 最小屏强制移除右边距 */
    margin-bottom: 24px;
    background: transparent !important; /* 最小屏强制透明背景 */
    border: none !important; /* 最小屏强制移除边框 */
    box-shadow: none !important; /* 最小屏强制移除阴影 */
    /* 增强移动端文字阴影 */
    text-shadow:
      3px 3px 12px rgba(0, 0, 0, 0.95),
      2px 2px 8px rgba(0, 0, 0, 0.9),
      1px 1px 4px rgba(0, 0, 0, 0.8),
      0 0 6px rgba(0, 0, 0, 0.7);
  }

  .hero-stats {
    gap: 12px;
  }

  .stat-item {
    padding: 0 !important; /* 最小屏强制移除内边距 */
    margin: 0 !important; /* 最小屏强制移除外边距 */
    min-width: auto;
    flex: 1 1 100%;
    background: transparent !important; /* 最小屏强制透明背景 */
    border: none !important; /* 最小屏强制移除边框 */
    box-shadow: none !important; /* 最小屏强制移除阴影 */
  }

  .stat-label {
    font-size: 12px;
  }

  .stat-value {
    font-size: 14px;
  }

  .carousel-info {
    padding: 0 !important; /* 小屏移动端强制移除内边距 */
    margin: 0 !important; /* 小屏移动端强制移除外边距 */
    background: transparent !important; /* 小屏移动端强制透明背景 */
    border: none !important; /* 小屏移动端强制移除边框 */
    box-shadow: none !important; /* 小屏移动端强制移除阴影 */
  }

  .carousel-description {
    font-size: 16px;
    line-height: 1.6;
    /* 小屏移动端增强文字阴影 */
    text-shadow:
      3px 3px 12px rgba(0, 0, 0, 0.95),
      2px 2px 8px rgba(0, 0, 0, 0.9),
      1px 1px 4px rgba(0, 0, 0, 0.8),
      0 0 8px rgba(0, 0, 0, 0.7);
  }
}
</style>
