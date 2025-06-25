<template>
  <div class="hero-section">
    <!-- 固定星空背景层 - 不参与轮播，580颗星星分3层 + 2个星座 -->
    <div class="starfield-background">
      <!-- 天蝎座主星层 - 8颗特殊蓝色恒星，3秒闪烁 -->
      <div class="star-layer-scorpius" :style="starfieldStyles.scorpius"></div>
      <!-- 天蝎座星座连线 - 按照参考图的弯曲身体形状 -->
      <div class="scorpius-constellation">
        <svg class="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <!-- 天蝎座连线路径 - 弯曲的身体和钳子 -->
          <!-- 左钳子 -->
          <path d="M 5 20 L 8 25" class="constellation-line" />
          <!-- 右钳子 -->
          <path d="M 5 30 L 8 25" class="constellation-line" />
          <!-- 主体弯曲身体：心宿二(8,25) → β星(12,30) → δ星(15,35) → π星(10,40) → ρ星(18,45) → σ星(13,50) → τ星(16,55) → υ星(20,60) -->
          <path d="M 8 25 L 12 30 L 15 35 L 10 40 L 18 45 L 13 50 L 16 55 L 20 60" class="constellation-line" />
        </svg>
      </div>
      <!-- 水瓶座主星层 - 8颗特殊蓝色恒星，3秒闪烁 -->
      <div class="star-layer-aquarius" :style="starfieldStyles.aquarius"></div>
      <!-- 水瓶座星座连线 - 按照参考图的复杂连线结构 -->
      <div class="aquarius-constellation">
        <svg class="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <!-- 水瓶座连线路径 - 复杂的人形和倒水结构 -->
          <!-- 上方长斜线：从右上角向左下延伸 -->
          <path d="M 43 30 L 37 20 L 30 30" class="constellation-line" />
          <!-- 中间横线连接 -->
          <path d="M 30 30 L 35 35" class="constellation-line" />
          <!-- 右侧连接到中心 -->
          <path d="M 35 35 L 40 25" class="constellation-line" />
          <!-- 左下方的三角形结构 -->
          <path d="M 30 30 L 25 40 L 33 45" class="constellation-line" />
          <path d="M 25 40 L 27 50" class="constellation-line" />
          <path d="M 33 45 L 27 50" class="constellation-line" />
          <!-- 水流波纹连接 -->
          <path d="M 33 45 L 30 42" class="constellation-line" />
          <path d="M 27 50 L 35 47" class="constellation-line" />
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

/* 固定星空背景层 - 不参与轮播，星云风格 */
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
  animation: nebulaGlow 15s ease-in-out infinite;
  z-index: 1;
}

/* 天蝎座主星层 - 8颗特殊蓝色恒星，3秒闪烁 */
.star-layer-scorpius {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.95;
  animation: constellationGlow 3s ease-in-out infinite;
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 水瓶座主星层 - 8颗特殊蓝色恒星，3秒闪烁 */
.star-layer-aquarius {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.95;
  animation: constellationGlow 3s ease-in-out infinite;
  will-change: opacity;
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

/* 第1层星空 - 最显眼的大星星，8秒闪烁 (50颗) */
.star-layer-1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 1.0;
  animation: starTwinkle 8s ease-in-out infinite;
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 第2层星空 - 中等星星，10秒反向闪烁 (200颗) */
.star-layer-2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.8;
  animation: starTwinkle 10s ease-in-out infinite reverse;
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 第3层星空 - 背景小星星，12秒闪烁 (300颗) */
.star-layer-3 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.6;
  animation: starTwinkle 12s ease-in-out infinite;
  will-change: opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 星云层 */
.nebula-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  opacity: 0.6;
  animation: nebulaFlow 20s ease-in-out infinite;
  will-change: opacity, transform;
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
}

.hero-text-container {
  flex: 1;
  max-width: 50%;
}

.hero-text-overlay {
  background: transparent;
  padding: 2.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #87ceeb;
  margin-bottom: 1.5rem;
}

.hero-quote {
  font-size: 1.2rem;
  color: #e0e7ff;
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
  align-items: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #b0b0b0;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
}

.carousel-info {
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  right: 4rem;
  text-align: center;
}

.carousel-description {
  font-size: 1rem;
  color: #d0d0d0;
  background: transparent;
  padding: 1rem 2rem;
  border-radius: 10px;
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
  background: #87ceeb;
  border-color: #87ceeb;
  box-shadow: 0 0 10px rgba(135, 206, 235, 0.5);
}

.indicator:hover {
  border-color: #87ceeb;
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
  background: rgba(135, 206, 235, 0.2);
  border-color: #87ceeb;
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
    opacity: 0.8; 
    transform: translateZ(0) scale(1.02);
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
  }
  
  .hero-text-overlay {
    padding: 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 1rem;
  }
  
  .opening-line {
    font-size: 1.8rem;
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
</style>




