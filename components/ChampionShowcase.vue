<template>
  <div class="champion-showcase">
    <div class="showcase-container">
      <!-- 左侧：蜂巢金字塔 -->
      <div class="left-panel">
        <div class="champion-header">
          <div class="player-info">
            <h2 class="player-name">樊振东</h2>
            <span class="player-year">1997</span>
          </div>
          <p class="champion-subtitle">超级全满贯得主</p>
        </div>

        <!-- 蜂巢金字塔 -->
        <div class="honeycomb-pyramid">
          <!-- 第1层 -->
          <div class="pyramid-row row-1">
            <div 
              class="hexagon hex-gold hex-highlight"
              :class="{ active: selectedCategory === 'youth' }"
              @click="selectCategory('youth')"
              data-title="青年赛事大满贯"
            >
              <span class="hex-text">青年赛事</span>
              <span class="hex-sub">大满贯</span>
            </div>
          </div>

          <!-- 第2层 -->
          <div class="pyramid-row row-2">
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'asian-games' }"
              @click="selectCategory('asian-games')"
              data-title="亚运会"
            >
              <span class="hex-text">亚运会</span>
            </div>
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'national-games' }"
              @click="selectCategory('national-games')"
              data-title="全运会"
            >
              <span class="hex-text">全运会</span>
            </div>
          </div>

          <!-- 第3层 -->
          <div class="pyramid-row row-3">
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'asian-cup' }"
              @click="selectCategory('asian-cup')"
              data-title="亚洲杯"
            >
              <span class="hex-text">亚洲杯</span>
            </div>
            <div 
              class="hexagon hex-gold hex-center"
              :class="{ active: selectedCategory === 'olympics' }"
              @click="selectCategory('olympics')"
              data-title="奥运会"
            >
              <span class="hex-text">奥运会</span>
            </div>
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'national-championship' }"
              @click="selectCategory('national-championship')"
              data-title="全锦赛"
            >
              <span class="hex-text">全锦赛</span>
            </div>
          </div>

          <!-- 第4层 -->
          <div class="pyramid-row row-4">
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'asian-championship' }"
              @click="selectCategory('asian-championship')"
              data-title="亚锦赛"
            >
              <span class="hex-text">亚锦赛</span>
            </div>
            <div 
              class="hexagon hex-gold hex-core"
              :class="{ active: selectedCategory === 'world-championship' }"
              @click="selectCategory('world-championship')"
              data-title="世锦赛"
            >
              <span class="hex-text">世锦赛</span>
            </div>
            <div 
              class="hexagon hex-gold hex-core"
              :class="{ active: selectedCategory === 'world-cup' }"
              @click="selectCategory('world-cup')"
              data-title="世界杯"
            >
              <span class="hex-text">世界杯</span>
            </div>
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'ittf-finals' }"
              @click="selectCategory('ittf-finals')"
              data-title="ITTF总决赛"
            >
              <span class="hex-text">ITTF</span>
              <span class="hex-sub">总决赛</span>
            </div>
          </div>

          <!-- 第5层 -->
          <div class="pyramid-row row-5">
            <div 
              class="hexagon hex-dark"
              :class="{ active: selectedCategory === '地表最强' }"
              @click="selectCategory('地表最强')"
              data-title="地表最强三连冠"
            >
              <span class="hex-text">地表最强</span>
              <span class="hex-sub">三连冠</span>
            </div>
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'wtt-finals' }"
              @click="selectCategory('wtt-finals')"
              data-title="WTT总决赛"
            >
              <span class="hex-text">WTT</span>
              <span class="hex-sub">总决赛</span>
            </div>
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'wtt-slam' }"
              @click="selectCategory('wtt-slam')"
              data-title="WTT大满贯"
            >
              <span class="hex-text">WTT</span>
              <span class="hex-sub">大满贯</span>
            </div>
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'wtt-champions' }"
              @click="selectCategory('wtt-champions')"
              data-title="WTT冠军赛"
            >
              <span class="hex-text">WTT</span>
              <span class="hex-sub">冠军赛</span>
            </div>
            <div 
              class="hexagon hex-gold"
              :class="{ active: selectedCategory === 'german-cup' }"
              @click="selectCategory('german-cup')"
              data-title="德国杯"
            >
              <span class="hex-text">德国杯</span>
              <span class="hex-sub">🏆</span>
            </div>
            <div 
              class="hexagon hex-dark"
              :class="{ active: selectedCategory === 'military-games' }"
              @click="selectCategory('military-games')"
              data-title="军运会四冠"
            >
              <span class="hex-text">军运会</span>
              <span class="hex-sub">四冠</span>
            </div>
          </div>
        </div>

        <!-- 统计信息 -->
        <div class="champion-stats">
          <div class="stat-item">
            <span class="stat-number">{{ filteredChampions.length }}</span>
            <span class="stat-label">{{ currentCategoryName }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">{{ totalChampions }}</span>
            <span class="stat-label">总冠军数</span>
          </div>
        </div>

        <!-- 重置按钮 -->
        <button v-if="selectedCategory !== 'all'" class="reset-btn" @click="selectCategory('all')">
          显示全部
        </button>
      </div>

      <!-- 右侧：冠军表格 -->
      <div class="right-panel">
        <div class="table-header">
          <h3 class="table-title">{{ currentCategoryName }}冠军列表</h3>
          <div class="table-filters">
            <button 
              class="filter-btn" 
              :class="{ active: typeFilter === 'all' }"
              @click="typeFilter = 'all'"
            >
              全部
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: typeFilter === 'singles' }"
              @click="typeFilter = 'singles'"
            >
              单打
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: typeFilter === 'team' }"
              @click="typeFilter = 'team'"
            >
              团体
            </button>
            <button 
              class="filter-btn" 
              :class="{ active: typeFilter === 'doubles' }"
              @click="typeFilter = 'doubles'"
            >
              双打
            </button>
          </div>
        </div>

        <div class="champion-table-container">
          <table class="champion-table">
            <thead>
              <tr>
                <th>年份</th>
                <th>赛事</th>
                <th>项目</th>
                <th>地点</th>
                <th>决赛对手/搭档</th>
                <th>比分</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(champion, index) in displayedChampions" :key="index">
                <td class="year-cell">{{ champion.year }}</td>
                <td class="event-cell">{{ champion.event }}</td>
                <td class="type-cell">
                  <span class="type-tag" :class="champion.type">{{ getTypeLabel(champion.type) }}</span>
                </td>
                <td class="location-cell">{{ champion.location }}</td>
                <td class="opponent-cell">
                  {{ champion.opponent || '-' }}
                  <span v-if="champion.partner" class="partner-info">(搭档: {{ champion.partner }})</span>
                </td>
                <td class="score-cell">{{ champion.score || '-' }}</td>
              </tr>
            </tbody>
          </table>
          
          <div v-if="displayedChampions.length === 0" class="empty-state">
            <p>暂无{{ currentCategoryName }}冠军记录</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { allChampionsData, totalChampions } from '@/data/championData';

interface Champion {
  year: number;
  event: string;
  category: string;
  type: 'singles' | 'team' | 'doubles' | 'mixed';
  location: string;
  opponent?: string;
  score?: string;
}

// 选中分类
const selectedCategory = ref<string>('all');
const typeFilter = ref<string>('all');

// 分类名称映射
const categoryNames: Record<string, string> = {
  'all': '全部',
  'youth': '青年赛事',
  'asian-games': '亚运会',
  'national-games': '全运会',
  'asian-cup': '亚洲杯',
  'olympics': '奥运会',
  'national-championship': '全锦赛',
  'asian-championship': '亚锦赛',
  'world-championship': '世锦赛',
  'world-cup': '世界杯',
  'ittf-finals': 'ITTF总决赛',
  '地表最强': '地表最强12人',
  'wtt-finals': 'WTT总决赛',
  'wtt-slam': 'WTT大满贯',
  'wtt-champions': 'WTT冠军赛',
  'german-cup': '德国杯',
  'military-games': '军运会'
};

// 当前选中分类名称
const currentCategoryName = computed(() => categoryNames[selectedCategory.value] || '全部');

// 完整冠军数据
const allChampions = ref<Champion[]>(allChampionsData);

// 筛选后的冠军
const filteredChampions = computed(() => {
  let result = allChampions.value;
  
  // 分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(c => c.category === selectedCategory.value);
  }
  
  // 类型筛选
  if (typeFilter.value !== 'all') {
    result = result.filter(c => c.type === typeFilter.value);
  }
  
  return result.sort((a, b) => b.year - a.year);
});

// 显示的冠军
const displayedChampions = computed(() => filteredChampions.value);

// 选择分类
const selectCategory = (category: string) => {
  selectedCategory.value = category;
};

// 获取类型标签
const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'singles': '单打',
    'team': '团体',
    'doubles': '双打',
    'mixed': '混双'
  };
  return labels[type] || type;
};
</script>

<style scoped>
.champion-showcase {
  padding: 2rem;
  background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%);
  min-height: 100vh;
}

.showcase-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
}

/* 左侧面板 */
.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1);
}

/* 头部信息 */
.champion-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.player-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.player-name {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  margin: 0;
}

.player-year {
  font-size: 1.5rem;
  color: #ffd700;
  font-weight: 600;
}

.champion-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

/* 蜂巢金字塔 */
.honeycomb-pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -0.5rem;
  margin-bottom: 1.5rem;
}

.pyramid-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: -0.8rem;
}

.pyramid-row.row-5 {
  gap: 0.3rem;
}

.pyramid-row.row-5 .hexagon {
  width: 75px;
  height: 85px;
}

.pyramid-row.row-5 .hex-text {
  font-size: 0.75rem;
}

.pyramid-row.row-5 .hex-sub {
  font-size: 0.6rem;
}

/* 六边形基础样式 */
.hexagon {
  width: 80px;
  height: 90px;
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
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
}

.hexagon.active {
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  filter: brightness(1.2);
}

/* 金色六边形 */
.hex-gold {
  background: linear-gradient(135deg, #ffd700 0%, #ffb700 50%, #ff8c00 100%);
}

.hex-gold:hover, .hex-gold.active {
  background: linear-gradient(135deg, #ffec8b 0%, #ffd700 50%, #ffb700 100%);
}

/* 深色六边形 */
.hex-dark {
  background: linear-gradient(135deg, #b8860b 0%, #8b6914 50%, #6b4e0a 100%);
}

.hex-dark:hover, .hex-dark.active {
  background: linear-gradient(135deg, #daa520 0%, #b8860b 50%, #8b6914 100%);
}

/* 中心重点六边形 */
.hex-center {
  background: linear-gradient(135deg, #ffec8b 0%, #ffd700 50%, #ff8c00 100%);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.hex-center .hex-text {
  font-size: 0.95rem;
  font-weight: 800;
}

/* 核心六边形 */
.hex-core {
  background: linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #ff6b35 100%);
  box-shadow: 0 0 25px rgba(255, 140, 0, 0.5);
}

.hex-core .hex-text {
  font-size: 0.9rem;
  font-weight: 800;
}

/* 高亮六边形 */
.hex-highlight {
  background: linear-gradient(135deg, #daa520 0%, #ffd700 50%, #ffb700 100%);
}

/* 文字样式 */
.hex-text {
  font-size: 0.8rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
  white-space: nowrap;
}

.hex-sub {
  font-size: 0.65rem;
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
  margin-bottom: 1rem;
  padding: 1rem 2rem;
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
  font-size: 2rem;
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

/* 重置按钮 */
.reset-btn {
  padding: 0.5rem 1.5rem;
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.4);
  border-radius: 20px;
  color: #ffd700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: rgba(255, 215, 0, 0.25);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

/* 右侧面板 */
.right-panel {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.1);
  padding: 1.5rem;
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.table-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.table-filters {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.filter-btn.active {
  background: rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.5);
  color: #ffd700;
}

/* 表格容器 */
.champion-table-container {
  max-height: 600px;
  overflow-y: auto;
}

.champion-table-container::-webkit-scrollbar {
  width: 6px;
}

.champion-table-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.champion-table-container::-webkit-scrollbar-thumb {
  background: rgba(255, 215, 0, 0.3);
  border-radius: 3px;
}

/* 冠军表格 */
.champion-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.champion-table th {
  text-align: left;
  padding: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  background: #1a1f3a;
  z-index: 5;
}

.champion-table td {
  padding: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.champion-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

.year-cell {
  font-weight: 600;
  color: #ffd700;
}

.event-cell {
  font-weight: 500;
}

.type-cell {
  text-align: center;
}

.type-tag {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
}

.type-tag.singles {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
}

.type-tag.team {
  background: rgba(74, 222, 128, 0.2);
  color: #4ade80;
}

.type-tag.doubles {
  background: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

.opponent-cell {
  color: rgba(255, 255, 255, 0.7);
}

.partner-info {
  display: block;
  font-size: 0.8rem;
  color: #ffd700;
  margin-top: 0.2rem;
}

.score-cell {
  font-family: monospace;
  color: rgba(255, 255, 255, 0.7);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

/* 响应式 */
@media (max-width: 1024px) {
  .showcase-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .left-panel {
    padding: 1.5rem;
  }
  
  .hexagon {
    width: 70px;
    height: 80px;
  }
  
  .hex-text {
    font-size: 0.7rem;
  }
  
  .pyramid-row {
    gap: 0.3rem;
  }
}

@media (max-width: 640px) {
  .champion-showcase {
    padding: 1rem;
  }
  
  .hexagon {
    width: 55px;
    height: 65px;
  }
  
  .hex-text {
    font-size: 0.6rem;
  }
  
  .hex-sub {
    font-size: 0.5rem;
  }
  
  .player-name {
    font-size: 1.75rem;
  }
  
  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .champion-table {
    font-size: 0.8rem;
  }
  
  .champion-table th,
  .champion-table td {
    padding: 0.5rem;
  }
}
</style>
