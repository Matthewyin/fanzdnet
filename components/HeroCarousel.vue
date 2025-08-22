<template>
  <div class="hero-section" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <StarfieldBackground />
    <div class="hero-carousel">
      <div class="carousel-container">
        <div 
          class="carousel-wrapper" 
          :style="{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none'
          }"
        >
          <!-- Clone of the last item for seamless loop -->
          <div class="carousel-item" v-if="heroItems.length > 0">
            <CarouselItemContent :item="heroItems[heroItems.length - 1]" />
          </div>

          <!-- Original items -->
          <div v-for="(item, index) in heroItems" :key="index" class="carousel-item">
            <CarouselItemContent :item="item" />
          </div>

          <!-- Clone of the first item for seamless loop -->
          <div class="carousel-item" v-if="heroItems.length > 0">
            <CarouselItemContent :item="heroItems[0]" />
          </div>
        </div>
      </div>

      <div class="carousel-indicators">
        <button 
          v-for="(_, index) in heroItems" 
          :key="index"
          :class="['indicator', { active: activeIndicatorIndex === index }]"
          @click="goToSlide(index)"
        ></button>
      </div>

      <button class="carousel-btn prev" @click="prevSlide">‹</button>
      <button class="carousel-btn next" @click="nextSlide">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import { getHeroData } from '@/data/heroData/index.ts';
import StarfieldBackground from './StarfieldBackground.vue';
import CarouselItemContent from './CarouselItemContent.vue';

// 使用 i18n
const { locale } = useI18n()

// 根据当前语言获取 hero 数据
const heroItems = computed(() => getHeroData(locale.value))
// Start at index 1 (the first real slide) because index 0 is a clone of the last slide.
const currentIndex = ref(1);
const isTransitioning = ref(true);
let autoplayTimer = null;

const activeIndicatorIndex = computed(() => {
  if (currentIndex.value > heroItems.value.length) {
    return 0;
  }
  if (currentIndex.value === 0) {
    return heroItems.value.length - 1;
  }
  return currentIndex.value - 1;
});

const runTransition = (direction) => {
  if (!isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value += direction;

  if (currentIndex.value > heroItems.value.length + 1) {
    // Transitioned from the last real slide to the first clone
    setTimeout(() => {
      isTransitioning.value = false;
      currentIndex.value = 1;
    }, 700);
  } else if (currentIndex.value < 0) {
    // Transitioned from the first real slide to the last clone
    setTimeout(() => {
      isTransitioning.value = false;
      currentIndex.value = heroItems.value.length;
    }, 700);
  } else {
    // Regular transition
    setTimeout(() => {
      isTransitioning.value = true;
    }, 700);
  }
};

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
};

const startAutoplay = () => {
  stopAutoplay();
  autoplayTimer = setInterval(nextSlide, 8000);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
/* Keeping all original styles for the carousel structure */
.hero-section { width: 100vw; margin-left: calc(-50vw + 50%); position: relative; overflow: hidden; height: 70vh; min-height: 500px; }
.hero-carousel { position: relative; width: 100%; height: 100%; z-index: 2; }
.carousel-container { width: 100%; height: 100%; overflow: hidden; }
.carousel-wrapper { display: flex; width: 100%; height: 100%; will-change: transform; }
.carousel-item { flex: 0 0 100%; width: 100%; height: 100%; position: relative; }
.carousel-indicators { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.5rem; z-index: 3; }
.indicator { width: 12px; height: 12px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.5); background: transparent; cursor: pointer; transition: all 0.3s ease; }
.indicator.active { background: #ffd700; border-color: #ffd700; box-shadow: 0 0 10px rgba(255, 215, 0, 0.6); }
.indicator:hover { border-color: #ffd700; transform: scale(1.2); }
.carousel-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.3); background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(10px); color: #ffffff; font-size: 1.5rem; cursor: pointer; transition: all 0.3s ease; z-index: 3; display: flex; align-items: center; justify-content: center; }
.carousel-btn:hover { background: rgba(255, 215, 0, 0.2); border-color: #ffd700; transform: translateY(-50%) scale(1.1); }
.carousel-btn.prev { left: 2rem; }
.carousel-btn.next { right: 2rem; }
@media (max-width: 768px) {
  .carousel-btn { width: 40px; height: 40px; font-size: 1.2rem; }
  .carousel-btn.prev { left: 1rem; }
  .carousel-btn.next { right: 1rem; }
}
</style>