<template>
  <div class="hero-section">
    <!-- 固定星空背景层 - 不参与轮播，580颗星星分3层 + 2个星座 -->
    <div class="starfield-background">
      <!-- 天蝎座主星层 - 8颗特殊蓝色恒星，3秒闪烁 -->
      <div class="star-layer-scorpius" :style="starfieldStyles.scorpius"></div>
      <!-- 天蝎座星座连线 - 左半边左下角，垂直压缩 -->
      <div class="scorpius-constellation">
        <svg class="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <!-- 天蝎座连线路径 - 根据横坐标+2后的点位重新绘制 -->
          <!-- 主干连线：星1->星2->星3->星4 (10,40 -> 10.2,44.5 -> 10.3,48 -> 10.1,53) -->
          <polyline points="10,40 10.2,44.5 10.3,48 10.1,53" class="constellation-line" />
          <!-- 左侧分支：星2->星5->星6->星7 (10.2,44.5 -> 8.8,46.5 -> 8.1,49 -> 7.8,52.5) -->
          <polyline points="10.2,44.5 8.8,46.5 8.1,49 7.8,52.5" class="constellation-line" />
          <!-- 下方连线：星7->星8->星9->星10 (7.8,52.5 -> 7.4,58 -> 7.6,64 -> 7.7,70) -->
          <polyline points="7.8,52.5 7.4,58 7.6,64 7.7,70" class="constellation-line" />
          <!-- 尾部复杂连线1：星10->星11->星12->星13 (7.7,70 -> 6.5,72 -> 5.2,72.5 -> 3.6,72) -->
          <polyline points="7.7,70 6.5,72 5.2,72.5 3.6,72" class="constellation-line" />
          <!-- 尾部复杂连线2：星13->星14->星15->星16 (3.6,72 -> 4.4,68.5 -> 5.2,63.5 -> 3.6,60.5) -->
          <polyline points="3.6,72 4.4,68.5 5.2,63.5 3.6,60.5" class="constellation-line" />
        </svg>
      </div>
      <!-- 水瓶座主星层 - 8颗特殊蓝色恒星，3秒闪烁 -->
      <div class="star-layer-aquarius" :style="starfieldStyles.aquarius"></div>
      <!-- 水瓶座星座连线 - 左半边右上角的精确连线结构 -->
      <div class="aquarius-constellation">
        <svg class="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <!-- 水瓶座连线路径 - 移动到左半边右上角 -->
          <!-- 主要上方连线：28,5 -> 23,10 -> 18.5,14.5 -->
          <polyline points="28,5 23,10 18.5,14.5" class="constellation-line" />
          <!-- 右侧分支：18.5,14.5 -> 22.3,22.5 -> 26,20 -->
          <polyline points="18.5,14.5 22.3,22.5 26,20" class="constellation-line" />
          <!-- 左侧下降分支：18.5,14.5 -> 18,21.5 -> 16.5,21 -> 15.7,24 -->
          <polyline points="18.5,14.5 18,21.5 16.5,21 15.7,24" class="constellation-line" />
          <!-- 下方复杂连线：15.7,24 -> 19.6,35.9 -> 20.6,29.2 -> 23.4,29.6 -> 23.8,31.7 -> 25.7,35.7 -->
          <polyline points="15.7,24 19.6,35.9 20.6,29.2 23.4,29.6 23.8,31.7 25.7,35.7" class="constellation-line" />
        </svg>
      </div>
      <div class="star-layer-1" :style="starfieldStyles.layer1"></div>
      <div class="star-layer-2" :style="starfieldStyles.layer2"></div>
      <div class="star-layer-3" :style="starfieldStyles.layer3"></div>
      <div class="nebula-layer" :style="starfieldStyles.nebula"></div>
    </div>
    
    <!-- 轮播内容层 - 只有文字内容轮播 -->
    <div class="hero-carousel">
      <div class="carousel-container">
        <div 
          class="carousel-wrapper" 
          :style="{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
          }"
        >
          <!-- 最后一张的克隆，用于无缝循环 -->
          <div 
            class="carousel-item"
            v-if="heroItems.length > 0"
          >
            <div v-if="heroItems[heroItems.length - 1].isOpening" class="opening-content">
              <div class="opening-text-container">
                <div v-for="(line, lineIndex) in heroItems[heroItems.length - 1].openingText" :key="lineIndex" 
                     class="opening-line"
                     :style="{ 
                       '--line-index': lineIndex,
                       animationDelay: (lineIndex * 0.5) + 's' 
                     }">
                  {{ line }}
                </div>
              </div>
            </div>
            <div v-else class="hero-content">
              <div class="hero-text-container">
                <div class="hero-text-overlay">
                  <h1 class="hero-title">{{ heroItems[heroItems.length - 1].title }}</h1>
                  <h2 class="hero-subtitle">{{ heroItems[heroItems.length - 1].subtitle }}</h2>
                  <p class="hero-quote">{{ heroItems[heroItems.length - 1].quote }}</p>
                  <div class="hero-stats">
                    <div class="stat-item">
                      <span class="stat-label">赛事</span>
                      <span class="stat-value">{{ heroItems[heroItems.length - 1].event }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">对手</span>
                      <span class="stat-value">{{ heroItems[heroItems.length - 1].opponent }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">比分</span>
                      <span class="stat-value">{{ heroItems[heroItems.length - 1].score }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 右侧图片容器 -->
              <div v-if="heroItems[heroItems.length - 1].url" class="hero-image-container">
                <img 
                  :src="heroItems[heroItems.length - 1].url" 
                  :alt="heroItems[heroItems.length - 1].title"
                  class="hero-image"
                  @load="onImageLoad"
                  @error="onImageError"
                />
              </div>
              <div class="carousel-info">
                <p class="carousel-description">{{ heroItems[heroItems.length - 1].description }}</p>
              </div>
            </div>
          </div>

          <!-- 原始轮播项 -->
          <div 
            v-for="(item, index) in heroItems" 
            :key="'original-' + index"
            class="carousel-item"
          >
            <!-- 开场轮播的特殊处理 -->
            <div v-if="item.isOpening" class="opening-content">
                <div class="opening-text-container">
                <div v-for="(line, lineIndex) in item.openingText" :key="lineIndex" 
                       class="opening-line"
                       :style="{ 
                         '--line-index': lineIndex,
                         animationDelay: (lineIndex * 0.5) + 's' 
                       }">
                    {{ line }}
                  </div>
                </div>
              </div>

            <!-- 传奇历程轮播的内容 -->
            <div v-else class="hero-content">
                <div class="hero-text-container">
                  <div class="hero-text-overlay">
                  <h1 class="hero-title">{{ item.title }}</h1>
                  <h2 class="hero-subtitle">{{ item.subtitle }}</h2>
                  <p class="hero-quote">{{ item.quote }}</p>
                    <div class="hero-stats">
                      <div class="stat-item">
                        <span class="stat-label">赛事</span>
                      <span class="stat-value">{{ item.event }}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">对手</span>
                      <span class="stat-value">{{ item.opponent }}</span>
                      </div>
                      <div class="stat-item">
                        <span class="stat-label">比分</span>
                      <span class="stat-value">{{ item.score }}</span>
                    </div>
                  </div>
                </div>
              </div>
                <!-- 右侧图片容器 -->
                <div v-if="item.url" class="hero-image-container">
                  <img 
                    :src="item.url" 
                    :alt="item.title"
                    class="hero-image"
                    @load="onImageLoad"
                    @error="onImageError"
                  />
                </div>
                <div class="carousel-info">
                <p class="carousel-description">{{ item.description }}</p>
              </div>
            </div>
          </div>

          <!-- 第一张的克隆，用于无缝循环 -->
          <div 
            class="carousel-item"
            v-if="heroItems.length > 0"
          >
            <div v-if="heroItems[0].isOpening" class="opening-content">
              <div class="opening-text-container">
                <div v-for="(line, lineIndex) in heroItems[0].openingText" :key="lineIndex" 
                     class="opening-line"
                     :style="{ 
                       '--line-index': lineIndex,
                       animationDelay: (lineIndex * 0.5) + 's' 
                     }">
                  {{ line }}
                </div>
              </div>
            </div>
            <div v-else class="hero-content">
              <div class="hero-text-container">
                <div class="hero-text-overlay">
                  <h1 class="hero-title">{{ heroItems[0].title }}</h1>
                  <h2 class="hero-subtitle">{{ heroItems[0].subtitle }}</h2>
                  <p class="hero-quote">{{ heroItems[0].quote }}</p>
                  <div class="hero-stats">
                    <div class="stat-item">
                      <span class="stat-label">赛事</span>
                      <span class="stat-value">{{ heroItems[0].event }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">对手</span>
                      <span class="stat-value">{{ heroItems[0].opponent }}</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">比分</span>
                      <span class="stat-value">{{ heroItems[0].score }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 右侧图片容器 -->
              <div v-if="heroItems[0].url" class="hero-image-container">
                <img 
                  :src="heroItems[0].url" 
                  :alt="heroItems[0].title"
                  class="hero-image"
                  @load="onImageLoad"
                  @error="onImageError"
                />
              </div>
              <div class="carousel-info">
                <p class="carousel-description">{{ heroItems[0].description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 轮播指示器 -->
      <div class="carousel-indicators">
        <button 
          v-for="(item, index) in heroItems" 
          :key="index"
          :class="['indicator', { active: currentIndex === index + 1 }]"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- 轮播控制按钮 -->
      <button class="carousel-btn prev" @click="prevSlide">‹</button>
      <button class="carousel-btn next" @click="nextSlide">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { heroImages as heroImagesData } from '@/data/heroData.js'
import { 
  generateFullStarfield, 
  generateNebulaCSS, 
  nebulae,
  scorpiusStars,
  aquariusStars
} from '@/data/starfield.js'

// 轮播数据
const heroItems = ref(heroImagesData)
const currentIndex = ref(1) // 从1开始，因为0是最后一张的克隆

// 生成星空样式
const starfieldData = generateFullStarfield()
const starfieldStyles = computed(() => ({
  scorpius: {
    backgroundImage: starfieldData.scorpius
  },
  aquarius: {
    backgroundImage: starfieldData.aquarius
  },
  layer1: {
    backgroundImage: starfieldData.layer1
  },
  layer2: {
    backgroundImage: starfieldData.layer2
  },
  layer3: {
    backgroundImage: starfieldData.layer3
  },
  nebula: {
    backgroundImage: generateNebulaCSS(nebulae)
  }
}))

// 轮播控制函数 - 无限循环滚动
const isTransitioning = ref(false)

const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value++
  
  // 当到达第一张的克隆时（最后位置），无缝跳回第一张原始位置
  if (currentIndex.value > heroItems.value.length) {
    setTimeout(() => {
      currentIndex.value = 1 // 跳回第一张原始位置
      isTransitioning.value = false
    }, 500)
  } else {
    setTimeout(() => {
      isTransitioning.value = false
    }, 500)
  }
}

const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  
  // 当到达最后一张的克隆时（第0位置），无缝跳到最后一张原始位置
  if (currentIndex.value <= 0) {
    currentIndex.value = heroItems.value.length // 跳到最后一张原始位置
  } else {
    currentIndex.value--
  }
  
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

const goToSlide = (index) => {
  if (isTransitioning.value) return
  currentIndex.value = index + 1 // +1因为第0位是克隆
}

// 自动轮播
let autoplayTimer = null
const startAutoplay = () => {
  autoplayTimer = setInterval(nextSlide, 4000) // 4秒切换
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// 组件生命周期
onMounted(() => {
  startAutoplay()
  console.log(`星空系统已加载：总计 ${starfieldData.total} 颗星星`)
})

// 鼠标悬停暂停自动轮播
const handleMouseEnter = () => {
  stopAutoplay()
}

const handleMouseLeave = () => {
  startAutoplay()
}

// 图片加载处理方法
const onImageLoad = (event) => {
  console.log('图片加载成功:', event.target.src)
}

const onImageError = (event) => {
  console.log('图片加载失败:', event.target.src)
  // 可以设置默认图片或隐藏图片容器
  event.target.style.display = 'none'
}
</script>

<style scoped>
/* 主要内容区域 - 全屏轮播 */
.hero-section {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 0;
  position: relative;
  overflow: hidden;
  height: 70vh;
  min-height: 500px;
}

/* 固定星空背景层 - 不参与轮播，星云风格，优化性能 */
.starfield-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 800px 400px at 20% 30%, rgba(0, 150, 255, 0.5) 0%, transparent 50%),
    radial-gradient(ellipse 600px 300px at 80% 70%, rgba(30, 200, 255, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse 400px 600px at 60% 20%, rgba(100, 180, 255, 0.35) 0%, transparent 50%),
    radial-gradient(ellipse 500px 350px at 40% 80%, rgba(65, 150, 255, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse 300px 200px at 10% 60%, rgba(0, 220, 255, 0.45) 0%, transparent 50%),
    radial-gradient(ellipse 700px 500px at 90% 40%, rgba(70, 170, 255, 0.35) 0%, transparent 50%),
    linear-gradient(135deg, #0a1428 0%, #1e4c8a 50%, #2a60c8 100%);
  animation: nebulaGlow 25s ease-in-out infinite; /* 延长动画周期，减少频率 */
  z-index: 1;
}

/* 天蝎座主星层 - 8颗特殊蓝色恒星，优化性能 */
.star-layer-scorpius {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.95;
  animation: constellationGlow 6s ease-in-out infinite; /* 延长动画周期 */
  will-change: auto; /* 移除will-change */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 水瓶座主星层 - 8颗特殊蓝色恒星，优化性能 */
.star-layer-aquarius {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.95;
  animation: constellationGlow 6s ease-in-out infinite; /* 延长动画周期 */
  will-change: auto; /* 移除will-change */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 天蝎座星座连线 */
.scorpius-constellation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}

/* 水瓶座星座连线 */
.aquarius-constellation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}

.constellation-lines {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.constellation-line {
  fill: none;
  stroke: rgba(135, 206, 235, 0.4);
  stroke-width: 0.15;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 2px rgba(135, 206, 235, 0.3));
  animation: constellationLineGlow 6s ease-in-out infinite;
}

/* 第1层星空 - 最显眼的大星星，优化性能 (50颗) */
.star-layer-1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 1.0;
  animation: starTwinkle 12s ease-in-out infinite; /* 延长动画周期，减少频率 */
  will-change: auto; /* 移除will-change，减少GPU负担 */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 第2层星空 - 中等星星，优化性能 (200颗) */
.star-layer-2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.8;
  animation: starTwinkle 16s ease-in-out infinite reverse; /* 延长动画周期 */
  will-change: auto; /* 移除will-change */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 第3层星空 - 背景小星星，优化性能 (300颗) */
.star-layer-3 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.6;
  animation: starTwinkle 20s ease-in-out infinite; /* 延长动画周期 */
  will-change: auto; /* 移除will-change */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 星云层 - 优化性能 */
.nebula-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.6;
  animation: nebulaFlow 30s ease-in-out infinite; /* 延长动画周期 */
  will-change: auto; /* 移除will-change */
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 轮播容器 */
.hero-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.carousel-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.carousel-item {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* 开场内容样式 */
.opening-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.opening-text-container {
  max-width: 800px;
  padding: 0 2rem;
}

.opening-line {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  background: transparent; /* 设置为完全透明 */
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  margin: 1rem 0;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out forwards;
}

/* 传奇历程内容样式 */
.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 4rem;
  position: relative;
}

.hero-text-container {
  flex: 1;
  max-width: 50%;
  z-index: 3;
  position: relative;
}

.hero-text-overlay {
  background: transparent; /* 保持完全透明 */
  backdrop-filter: none; /* 移除模糊效果，保持完全透明 */
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: none; /* 移除阴影，保持完全透明 */
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  background: transparent; /* 设置为完全透明 */
  margin-bottom: 1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

  .hero-subtitle {
    font-size: 2rem;
    font-weight: 600;
    color: #ffd700;
    background: transparent; /* 设置为完全透明 */
    margin-bottom: 1.5rem;
  }

.hero-quote {
  font-size: 1.5rem;
  color: #e0e7ff;
  background: transparent; /* 设置为完全透明 */
  margin-bottom: 2rem;
  font-style: italic;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

  .stat-label {
    font-size: 1.2rem;
    color: #ffd700;
    background: transparent; /* 设置为完全透明 */
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  background: transparent; /* 设置为完全透明 */
}

/* 图片容器样式 */
.hero-image-container {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.carousel-info {
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  right: 4rem;
  text-align: left;
  z-index: 3;
}

.carousel-description {
  font-size: 1.2rem;
  color: #d0d0d0;
  background: transparent; /* 保持完全透明 */
  backdrop-filter: none; /* 移除模糊效果，保持完全透明 */
  padding: 1.5rem 2rem;
  border-radius: 12px;
  max-width: 75%;
  margin: 0;
  border: none; /* 移除边框，保持完全透明 */
  box-shadow: none; /* 移除阴影，保持完全透明 */
}

/* 轮播指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

  .indicator.active {
    background: #ffd700;
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
  }

  .indicator:hover {
    border-color: #ffd700;
    transform: scale(1.2);
  }

/* 轮播控制按钮 */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .carousel-btn:hover {
    background: rgba(255, 215, 0, 0.2);
    border-color: #ffd700;
    transform: translateY(-50%) scale(1.1);
  }

.carousel-btn.prev {
  left: 2rem;
}

.carousel-btn.next {
  right: 2rem;
}

/* 星空动画效果 */
@keyframes starTwinkle {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

@keyframes constellationGlow {
  0%, 100% { 
    opacity: 0.9; 
    filter: brightness(1);
  }
  50% { 
    opacity: 1; 
    filter: brightness(1.2) drop-shadow(0 0 3px #87ceeb);
  }
}

@keyframes nebulaFlow {
  0%, 100% {
    opacity: 0.6;
    transform: translateZ(0) scale(1);
  }
  50% {
    opacity: 0.7; /* 减少变化幅度 */
    transform: translateZ(0) scale(1.01); /* 减少缩放幅度 */
  }
}

@keyframes nebulaGlow {
  0%, 100% { 
    filter: brightness(1) contrast(1);
  }
  25% { 
    filter: brightness(1.1) contrast(1.05);
  }
  50% { 
    filter: brightness(1.2) contrast(1.1);
  }
  75% { 
    filter: brightness(1.1) contrast(1.05);
  }
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes constellationLineGlow {
  0%, 100% { 
    opacity: 0.4; 
    stroke: rgba(135, 206, 235, 0.4);
    filter: drop-shadow(0 0 2px rgba(135, 206, 235, 0.3));
  }
  50% { 
    opacity: 0.7; 
    stroke: rgba(135, 206, 235, 0.6);
    filter: drop-shadow(0 0 4px rgba(135, 206, 235, 0.5));
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    padding: 2rem;
    text-align: center;
  }
  
  .hero-text-container {
    max-width: 100%;
    z-index: 3;
  }

  .hero-text-overlay {
    padding: 2rem;
    background: transparent; /* 移动端也保持完全透明 */
    backdrop-filter: none; /* 移动端移除模糊效果 */
    box-shadow: none; /* 移动端移除阴影 */
  }

  .hero-image-container {
    position: relative;
    width: 100%;
    height: 300px;
    margin-top: 2rem;
  }

  .hero-title {
    font-size: 2rem;
    background: transparent; /* 移动端标题也保持完全透明 */
  }

  .hero-subtitle {
    font-size: 1.2rem;
    background: transparent; /* 移动端副标题也保持完全透明 */
  }

  .hero-stats {
    justify-content: center;
    gap: 1rem;
  }

  .carousel-description {
    max-width: 100%;
    background: transparent; /* 移动端描述也保持完全透明 */
    backdrop-filter: none; /* 移动端移除模糊效果 */
    box-shadow: none; /* 移动端移除阴影 */
    border: none; /* 移动端移除边框 */
  }

  .opening-line {
    font-size: 1.8rem;
    background: transparent; /* 移动端开场文字也保持完全透明 */
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .carousel-btn.prev {
    left: 1rem;
  }
  
  .carousel-btn.next {
    right: 1rem;
  }
}

/* 性能优化 - 减少动画在低性能设备上的影响 */
@media (prefers-reduced-motion: reduce) {
  .star-layer-1,
  .star-layer-2,
  .star-layer-3,
  .star-layer-scorpius,
  .star-layer-aquarius,
  .nebula-layer,
  .starfield-background {
    animation: none; /* 为有动画偏好设置的用户禁用动画 */
  }
}

/* 在低性能设备上简化动画 */
@media (max-width: 768px) and (max-resolution: 150dpi) {
  .star-layer-2,
  .star-layer-3,
  .nebula-layer {
    animation-duration: 40s; /* 进一步延长动画周期 */
  }
}
</style>




