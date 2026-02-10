<template>
  <div class="champion-wall">
    <!-- 标题 -->
    <div class="champion-header">
      <div class="player-info">
        <h2 class="player-name">樊振东</h2>
        <span class="player-year">1997</span>
      </div>
      <p class="champion-subtitle">唯一超级金满贯得主</p>
    </div>

    <!-- 蜂巢金字塔 -->
    <div class="honeycomb-pyramid">
      <!-- 第1层 - 顶层 -->
      <div class="pyramid-row row-1">
        <div class="hexagon hex-gold hex-highlight" data-title="青年赛事大满贯">
          <span class="hex-text">青年赛事</span>
          <span class="hex-sub">大满贯</span>
        </div>
      </div>

      <!-- 第2层 -->
      <div class="pyramid-row row-2">
        <div class="hexagon hex-gold" data-title="亚运会">
          <span class="hex-text">亚运会</span>
        </div>
        <div class="hexagon hex-gold" data-title="全运会">
          <span class="hex-text">全运会</span>
        </div>
      </div>

      <!-- 第3层 - 中心：奥运会 -->
      <div class="pyramid-row row-3">
        <div class="hexagon hex-gold" data-title="亚洲杯">
          <span class="hex-text">亚洲杯</span>
        </div>
        <div class="hexagon hex-gold hex-center" data-title="奥运会">
          <span class="hex-text">奥运会</span>
        </div>
        <div class="hexagon hex-gold" data-title="全锦赛">
          <span class="hex-text">全锦赛</span>
        </div>
      </div>

      <!-- 第4层 - 中心：世锦赛、世界杯 -->
      <div class="pyramid-row row-4">
        <div class="hexagon hex-gold" data-title="亚锦赛">
          <span class="hex-text">亚锦赛</span>
        </div>
        <div class="hexagon hex-gold hex-core" data-title="世锦赛">
          <span class="hex-text">世锦赛</span>
        </div>
        <div class="hexagon hex-gold hex-core" data-title="世界杯">
          <span class="hex-text">世界杯</span>
        </div>
        <div class="hexagon hex-gold" data-title="ITTF总决赛">
          <span class="hex-text">ITTF</span>
          <span class="hex-sub">总决赛</span>
        </div>
      </div>

      <!-- 第5层 - 底层 -->
      <div class="pyramid-row row-5">
        <div class="hexagon hex-dark" data-title="地表最强三连冠">
          <span class="hex-text">地表最强</span>
          <span class="hex-sub">三连冠</span>
        </div>
        <div class="hexagon hex-gold" data-title="WTT总决赛">
          <span class="hex-text">WTT</span>
          <span class="hex-sub">总决赛</span>
        </div>
        <div class="hexagon hex-gold" data-title="WTT大满贯">
          <span class="hex-text">WTT</span>
          <span class="hex-sub">大满贯</span>
        </div>
        <div class="hexagon hex-gold" data-title="WTT冠军赛">
          <span class="hex-text">WTT</span>
          <span class="hex-sub">冠军赛</span>
        </div>
        <div class="hexagon hex-dark" data-title="军运会四冠">
          <span class="hex-text">军运会</span>
          <span class="hex-sub">四冠</span>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="champion-stats">
      <div class="stat-item">
        <span class="stat-number">{{ totalChampions }}</span>
        <span class="stat-label">世界冠军</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-number">{{ superGrandSlam ? '✓' : '' }}</span>
        <span class="stat-label">唯一超级金满贯</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalChampions?: number;
  superGrandSlam?: boolean;
}

withDefaults(defineProps<Props>(), {
  totalChampions: 0,
  superGrandSlam: true
});
</script>

<style scoped>
.champion-wall {
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  max-width: 600px;
  margin: 0 auto;
}

/* 头部信息 */
.champion-header {
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.player-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.player-name {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
  line-height: 1;
}

.player-year {
  font-size: 1.25rem;
  color: #ffd700;
  font-weight: 600;
}

.champion-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

/* 蜂巢金字塔 */
.honeycomb-pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -0.5rem;
}

.pyramid-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -1rem;
}

/* 六边形基础样式 */
.hexagon {
  width: 90px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
}

.hexagon:hover {
  transform: scale(1.1);
  z-index: 10;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
}

/* 金色六边形 */
.hex-gold {
  background: linear-gradient(135deg, #ffd700 0%, #ffb700 50%, #ff8c00 100%);
}

.hex-gold:hover {
  background: linear-gradient(135deg, #ffec8b 0%, #ffd700 50%, #ffb700 100%);
}

/* 深色六边形 */
.hex-dark {
  background: linear-gradient(135deg, #b8860b 0%, #8b6914 50%, #6b4e0a 100%);
}

.hex-dark:hover {
  background: linear-gradient(135deg, #daa520 0%, #b8860b 50%, #8b6914 100%);
}

/* 中心重点六边形 - 奥运会 */
.hex-center {
  background: linear-gradient(135deg, #ffec8b 0%, #ffd700 50%, #ff8c00 100%);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.hex-center .hex-text {
  font-size: 1rem;
  font-weight: 800;
  color: #1a1a2e;
}

/* 核心六边形 - 世锦赛、世界杯 */
.hex-core {
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #ff6b35 100%);
  box-shadow: 0 0 25px rgba(255, 140, 0, 0.5);
}

.hex-core .hex-text {
  font-size: 0.95rem;
  font-weight: 800;
  color: #1a1a2e;
}

/* 高亮六边形 - 顶层 */
.hex-highlight {
  background: linear-gradient(135deg, #daa520 0%, #ffd700 50%, #ffb700 100%);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}

/* 文字样式 */
.hex-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
  white-space: nowrap;
}

.hex-sub {
  font-size: 0.7rem;
  font-weight: 600;
  color: #333;
  margin-top: 0.1rem;
}

/* 统计信息 */
.champion-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 215, 0, 0.2);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: bold;
  color: #ffd700;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 215, 0, 0.3);
}

/* 响应式 */
@media (max-width: 640px) {
  .champion-wall {
    padding: 1rem;
  }
  
  .hexagon {
    width: 70px;
    height: 78px;
  }
  
  .hex-text {
    font-size: 0.7rem;
  }
  
  .hex-sub {
    font-size: 0.6rem;
  }
  
  .player-name {
    font-size: 1.5rem;
  }
  
  .pyramid-row {
    gap: 0.3rem;
  }
}
</style>
