<template>
  <div
    class="hero-section"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <StarfieldBackground />
    
    <!-- Kinetic Lines Background -->
    <div class="kinetic-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <div class="hero-carousel" role="region" aria-label="英雄轮播图">
      <!-- Single Carousel Layer -->
      <div class="carousel-container">
        <div
          class="carousel-wrapper"
          role="group"
          aria-live="polite"
          aria-atomic="false"
          :style="{
            transform: `translateX(calc(-${currentIndex * 100}% + ${touchDeltaX}px))`,
            transition: isTouching ? 'none' : (isTransitioning ? 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none')
          }"
        >
          <!-- Clone Last -->
          <div class="carousel-item" v-if="heroItems.length > 0" key="clone-last">
            <CarouselItemContent :item="heroItems[heroItems.length - 1]" />
          </div>
          <!-- Originals -->
          <div v-for="(item, index) in heroItems" :key="index" class="carousel-item">
            <CarouselItemContent :item="item" :isActive="activeIndicatorIndex === index" />
          </div>
          <!-- Clone First -->
          <div class="carousel-item" v-if="heroItems.length > 0" key="clone-first">
            <CarouselItemContent :item="heroItems[0]" />
          </div>
        </div>
      </div>

      <!-- Progress Bar Indicators -->
      <div class="carousel-progress" role="tablist" aria-label="轮播图导航">
        <button
          v-for="(_, index) in heroItems"
          :key="index"
          class="progress-item"
          :class="{ 'progress-item-active': activeIndicatorIndex === index, 'progress-item-past': index < activeIndicatorIndex }"
          @click="goToSlide(index)"
          role="tab"
          :aria-selected="activeIndicatorIndex === index"
          :aria-label="`第 ${index + 1} 张幻灯片`"
          :tabindex="activeIndicatorIndex === index ? 0 : -1"
        >
          <div class="progress-bar">
            <div
              class="progress-fill"
              :class="{ 'progress-animating': activeIndicatorIndex === index && !isPaused }"
              :style="{ animationDuration: `${autoplayInterval}ms` }"
            ></div>
          </div>
          <span class="progress-label">{{ String(index + 1).padStart(2, '0') }}</span>
        </button>
      </div>

      <!-- Navigation Buttons -->
      <button class="carousel-nav carousel-nav-prev" @click="prevSlide" aria-label="Previous slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="carousel-nav carousel-nav-next" @click="nextSlide" aria-label="Next slide">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <!-- Slide Counter (Mobile) -->
      <div class="carousel-counter">
        <span class="counter-current">{{ String(activeIndicatorIndex + 1).padStart(2, '0') }}</span>
        <span class="counter-separator">/</span>
        <span class="counter-total">{{ String(heroItems.length).padStart(2, '0') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { getHeroData } from '@/data/heroData/index';
import StarfieldBackground from './StarfieldBackground.vue';
import CarouselItemContent from './CarouselItemContent.vue';

// 使用 i18n
const { locale } = useI18n();

// 配置
const autoplayInterval = 8000;

// 根据当前语言获取 hero 数据
const heroItems = computed(() => getHeroData(locale.value));

// 状态
const currentIndex = ref(1);
const isTransitioning = ref(true);
const isPaused = ref(false);
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

// 触摸滑动支持
const touchStartX = ref(0);
const touchDeltaX = ref(0);
const isTouching = ref(false);
const swipeThreshold = 50; // 最小滑动距离

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX;
  isTouching.value = true;
  touchDeltaX.value = 0;
  pauseAutoplay();
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isTouching.value) return;
  const currentX = e.touches[0].clientX;
  touchDeltaX.value = currentX - touchStartX.value;
};

const handleTouchEnd = () => {
  if (!isTouching.value) return;
  isTouching.value = false;

  if (touchDeltaX.value > swipeThreshold) {
    // 向右滑动 -> 上一张
    prevSlide();
  } else if (touchDeltaX.value < -swipeThreshold) {
    // 向左滑动 -> 下一张
    nextSlide();
  }

  touchDeltaX.value = 0;
  resumeAutoplay();
};

const activeIndicatorIndex = computed(() => {
  if (currentIndex.value > heroItems.value.length) {
    return 0;
  }
  if (currentIndex.value === 0) {
    return heroItems.value.length - 1;
  }
  return currentIndex.value - 1;
});

const nextSlide = () => {
  if (currentIndex.value >= heroItems.value.length + 1) {
    isTransitioning.value = false;
    currentIndex.value = 1;
    nextTick(() => {
      setTimeout(() => {
        isTransitioning.value = true;
        currentIndex.value++;
      }, 50);
    });
  } else {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value <= 0) {
    isTransitioning.value = false;
    currentIndex.value = heroItems.value.length;
    nextTick(() => {
      setTimeout(() => {
        isTransitioning.value = true;
        currentIndex.value--;
      }, 50);
    });
  } else {
    currentIndex.value--;
  }
};

const goToSlide = (index) => {
  isTransitioning.value = true;
  currentIndex.value = index + 1;
  // 重新开始自动播放
  startAutoplay();
};

const startAutoplay = () => {
  stopAutoplay();
  isPaused.value = false;
  autoplayTimer = setInterval(nextSlide, autoplayInterval);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const pauseAutoplay = () => {
  isPaused.value = true;
  stopAutoplay();
};

const resumeAutoplay = () => {
  isPaused.value = false;
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
/* Hero Section */
.hero-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  overflow: hidden;
  height: 100vh;
  min-height: 700px;
  max-height: 1000px;
  background-color: #0a1428;
  margin-top: -76px;
  padding-top: 76px;
}

/* Kinetic Lines */
.kinetic-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  height: 1px;
  width: 150%;
  transform: rotate(-15deg);
  will-change: transform;
  animation: lineFlow 8s infinite linear;
}

.line-1 { top: 20%; left: -20%; animation-delay: 0s; }
.line-2 { top: 50%; left: -20%; animation-delay: 3s; }
.line-3 { top: 80%; left: -20%; animation-delay: 5s; }

@keyframes lineFlow {
  0% { transform: rotate(-15deg) translateX(-100%); }
  100% { transform: rotate(-15deg) translateX(100%); }
}

/* Carousel Container */
.hero-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
}

.carousel-container {
  width: 100%;
  height: 100%;
}

.carousel-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.carousel-item {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Progress Bar Indicators */
.carousel-progress {
  position: absolute;
  bottom: var(--space-12);
  right: var(--space-12); /* Align right for dynamic feel */
  left: auto;
  transform: none; /* Reset transform */
  display: flex;
  gap: var(--space-4);
  z-index: 3;
}

.progress-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align right */
  gap: var(--space-2);
  cursor: pointer;
}

.progress-bar {
  width: 40px; /* Shorter, punchier bars */
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0; /* Sharp edges */
  transform: skewX(-20deg); /* Skewed bars */
  overflow: hidden;
  transition: width 0.3s ease;
}

.progress-item-active .progress-bar {
  width: 60px; /* Active bar gets longer */
}

.progress-fill {
  width: 0;
  height: 100%;
  background: var(--color-accent-500);
}

.progress-item-past .progress-fill {
  width: 100%;
}

.progress-animating .progress-fill {
  width: 100%;
  animation: progressFill linear forwards;
}

@keyframes progressFill {
  from { width: 0; }
  to { width: 100%; }
}

.progress-label {
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  color: rgba(255, 255, 255, 0.8); /* 提高对比度至 80%，符合 WCAG 标准 */
  font-family: var(--font-mono);
  transition: all 0.3s ease;
  transform: skewX(-10deg);
}

.progress-item-active .progress-label {
  color: var(--color-accent-500);
  font-size: var(--text-sm);
}

/* Navigation Buttons */
.carousel-nav {
  position: absolute;
  bottom: var(--space-12);
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 15, 26, 0.6);
  backdrop-filter: blur(8px);
  color: #ffffff;
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-out);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: skewX(-10deg); /* Skewed buttons */
}

.carousel-nav-prev {
  right: calc(var(--space-12) + 200px); /* Positioned relative to progress */
  left: auto;
}

.carousel-nav-next {
  right: calc(var(--space-12) + 140px);
}

.carousel-nav:hover {
  background: var(--color-accent-500);
  border-color: var(--color-accent-500);
  color: var(--bg-primary);
  transform: skewX(-10deg) translateY(-2px);
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
}

.carousel-nav svg {
  transform: skewX(10deg); /* Unskew icon */
}

/* Slide Counter (Mobile) */
.carousel-counter {
  display: none;
  position: absolute;
  bottom: var(--space-6);
  left: var(--space-6);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.8);
  z-index: 3;
}

.counter-current {
  font-weight: var(--font-bold);
  color: var(--color-accent-500);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hero-section {
    height: 85vh;
    min-height: 500px;
  }

  .carousel-progress, .carousel-nav {
    display: none;
  }

  .carousel-counter {
    display: block;
  }
}
</style>