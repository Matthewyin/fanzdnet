<template>
  <div class="schedule-page dynamic-diagonal">
    <!-- 沉浸式背景 -->
    <PageBackground theme="timeline" />

    <!-- 对角线装饰元素 -->
    <div class="diagonal-decorations">
      <div class="diagonal-line line-1"></div>
      <div class="diagonal-line line-2"></div>
      <div class="diagonal-line line-3"></div>
    </div>

    <!-- 页面内容 -->
    <div class="immersive-content">
      <!-- 页面头部 - 左侧倾斜 -->
      <header class="page-header">
        <span class="page-tag">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tag-icon">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
          {{ t('pages.schedule.tag', '赛事信息') }}
        </span>
        <h1 class="page-title">{{ t('pages.schedule.title', '比赛日程') }}</h1>
        <p class="page-subtitle">{{ t('pages.schedule.subtitle', '樊振东的比赛安排与历史战绩') }}</p>
      </header>

      <!-- 主内容网格 -->
      <div class="content-grid">
        <!-- 左侧：视图切换和统计 -->
        <div class="left-panel">
          <!-- 视图切换 -->
          <div class="view-toggle">
            <h2 class="nav-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ t('schedule.view', '比赛视图') }}
            </h2>
            <button
              class="toggle-btn"
              :class="{ active: viewMode === 'upcoming' }"
              @click="viewMode = 'upcoming'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {{ t('schedule.upcoming', '即将比赛') }}
            </button>
            <button
              class="toggle-btn"
              :class="{ active: viewMode === 'history' }"
              @click="viewMode = 'history'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
              {{ t('schedule.history', '历史战绩') }}
            </button>
          </div>

          <!-- 统计信息 -->
          <div class="stats-card">
            <div class="stat-item">
              <span class="stat-number win">{{ historyMatches.filter(m => m.result === 'win').length }}</span>
              <span class="stat-label">{{ t('schedule.wins', '胜利') }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number total">{{ historyMatches.length }}</span>
              <span class="stat-label">{{ t('schedule.total', '总场次') }}</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">{{ Math.round((historyMatches.filter(m => m.result === 'win').length / historyMatches.length) * 100) }}%</span>
              <span class="stat-label">{{ t('schedule.winRate', '胜率') }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧：比赛列表 -->
        <div class="right-panel">
          <!-- 即将比赛 -->
          <section v-if="viewMode === 'upcoming'" class="matches-section">
            <div class="matches-grid">
              <article v-for="match in upcomingMatches" :key="match.id" class="match-card upcoming">
                <div class="match-header">
                  <span class="match-event">{{ match.event }}</span>
                  <span class="match-round">{{ match.round }}</span>
                </div>
                <div class="match-body">
                  <div class="match-player player-left">
                    <span class="player-flag">🇨🇳</span>
                    <span class="player-name">{{ match.player1 }}</span>
                  </div>
                  <div class="match-vs">
                    <span class="vs-text">VS</span>
                    <time class="match-time">{{ match.date }}</time>
                  </div>
                  <div class="match-player player-right">
                    <span class="player-flag">{{ match.player2Flag }}</span>
                    <span class="player-name">{{ match.player2 }}</span>
                  </div>
                </div>
                <div class="match-footer">
                  <span class="match-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {{ match.location }}
                  </span>
                </div>
              </article>
            </div>

            <div v-if="upcomingMatches.length === 0" class="empty-state">
              <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <p>{{ t('schedule.noUpcoming', '暂无即将进行的比赛') }}</p>
            </div>
          </section>

          <!-- 历史战绩 -->
          <section v-else class="matches-section">
            <div class="matches-grid">
              <article
                v-for="(match, index) in historyMatches"
                :key="match.id"
                class="match-card history"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="match-header">
                  <span class="match-event">{{ match.event }}</span>
                  <span class="match-result" :class="match.result">
                    <svg v-if="match.result === 'win'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                    </svg>
                    {{ match.result === 'win' ? ' 胜' : '败' }}
                  </span>
                </div>
                <div class="match-body">
                  <div class="match-player player-left">
                    <span class="player-flag">🇨🇳</span>
                    <span class="player-name">{{ match.player1 }}</span>
                    <span class="player-score" :class="{ winner: match.result === 'win' }">{{ match.score1 }}</span>
                  </div>
                  <div class="match-vs">
                    <span class="score-separator">:</span>
                  </div>
                  <div class="match-player player-right">
                    <span class="player-score" :class="{ winner: match.result === 'loss' }">{{ match.score2 }}</span>
                    <span class="player-name">{{ match.player2 }}</span>
                    <span class="player-flag">{{ match.player2Flag }}</span>
                  </div>
                </div>
                <div class="match-footer">
                  <span class="match-date">{{ match.date }}</span>
                  <span class="match-round">{{ match.round }}</span>
                </div>
              </article>
            </div>
          </section>

          <!-- 数据来源说明 -->
          <footer class="data-source">
            <p>{{ t('schedule.dataNote', '数据来源：ITTF 官方、WTT 官方') }}</p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

// SEO
const { setPageSEO } = useSEO();
setPageSEO('schedule', locale.value);

// 视图模式
const viewMode = ref<'upcoming' | 'history'>('history');

// 即将进行的比赛
const upcomingMatches = computed(() => [
  {
    id: 1,
    event: t('schedule.event.germanLeague', '德国甲级联赛'),
    round: t('schedule.round.regular', '第13轮'),
    date: '2026-02-28',
    player1: t('player.fanzhendong', '樊振东'),
    player2: t('player.opponent', '穆尔豪森'),
    location: t('schedule.location.germany', '德国')
  }
]);

    // 历史战绩（部分重要比赛 - 数据来源维基百科）
const historyMatches = computed(() => [
  {
    id: 1,
    event: t('schedule.event.houstonWC', '休斯顿世锦赛'),
    round: t('schedule.round.final', '决赛'),
    date: '2021-11-29',
    player1: t('player.fanzhendong', '樊振东'),
    player2: t('player.moregard', '莫雷加德'),
    player2Flag: '🇸🇪', 
    score1: 4,
    score2: 0,
    result: 'win' as const,
    location: '休斯顿'
  },
  {
    id: 2,
    event: t('schedule.event.parisOG', '巴黎奥运会'),
    round: t('schedule.round.final', '男单决赛'),
    date: '2024-08-04',
    player1: t('player.fanzhendong', '樊振东'),
    player2: t('player.moregard', '莫雷加德'),
    player2Flag: '🇸🇪',
    score1: 4,
    score2: 1,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 3,
    event: t('schedule.event.germanCup', '德国杯'),
    round: t('schedule.round.final', '决赛'),
    date: '2026-01-05',
    player1: t('player.fanzhendong', '樊振东'),
    player2: t('player.opponent', '富尔达马伯策尔'),
    player2Flag: '🇩🇪',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '德国新乌尔姆'
  },
  {
    id: 4,
    event: t('schedule.event.nationalGames', '全运会'),
    round: t('schedule.round.final', '男单决赛'),
    date: '2025-11-16',
    player1: t('player.fanzhendong', '樊振东'),
    score1: 4,
    score2: 1,
    player2: t('player.linshidong', '林诗栋'),
    player2Flag: '🇨🇳',
    result: 'win' as const,
    location: '澳门'
  }
]);
</script>

<style scoped>
/* 页面容器 */
.schedule-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 对角线装饰元素 */
.diagonal-decorations {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.diagonal-line {
  position: absolute;
  background: linear-gradient(135deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  transform-origin: center;
}

.line-1 {
  width: 200%;
  height: 2px;
  top: 20%;
  left: -50%;
  transform: rotate(45deg);
  animation: diagonalMove1 15s ease-in-out infinite;
}

.line-2 {
  width: 150%;
  height: 1px;
  top: 50%;
  left: -25%;
  transform: rotate(45deg);
  animation: diagonalMove2 20s ease-in-out infinite;
}

.line-3 {
  width: 180%;
  height: 1.5px;
  top: 80%;
  left: -40%;
  transform: rotate(45deg);
  animation: diagonalMove3 18s ease-in-out infinite;
}

@keyframes diagonalMove1 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(30px); }
}

@keyframes diagonalMove2 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(-40px); }
}

@keyframes diagonalMove3 {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(20px); }
}

/* 内容区域 */
.immersive-content {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-8) var(--space-4);
  padding-bottom: calc(var(--space-20) + 80px);
  position: relative;
  z-index: 1;
}

/* 页面头部 */
.page-header {
  text-align: left;
  margin-bottom: var(--space-12);
  padding-left: var(--space-6);
}

.page-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-accent-400);
  margin-bottom: var(--space-4);
}

.page-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  margin-bottom: var(--space-3);
}

.page-subtitle {
  font-size: var(--text-xl);
  color: rgba(255, 255, 255, 0.8);
}

/* 主内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 280px 1fr;
  }
}

/* 左侧面板 */
.left-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 视图切换 */
.view-toggle {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: var(--space-6);
}

.nav-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: #ffffff;
  margin-bottom: var(--space-5);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid rgba(255, 215, 0, 0.2);
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: rgba(255, 255, 255, 0.7);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  text-align: left;
}

.toggle-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.toggle-btn.active {
  color: var(--color-accent-400);
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
}

/* 统计卡片 */
.stats-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(135deg, rgba(26, 58, 138, 0.2), rgba(255, 215, 0, 0.1));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 215, 0, 0.2);
  padding: var(--space-6);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.stat-number.win {
  color: #4ade80;
}

.stat-number.total {
  color: var(--color-accent-400);
}

.stat-label {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 215, 0, 0.3);
}

/* 右侧面板 */
.right-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* 比赛列表 */
.matches-section {
  margin-bottom: var(--space-10);
}

.matches-grid {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 768px) {
  .matches-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 比赛卡片 */
.match-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
  position: relative;
  animation: cardFadeIn 0.6s ease-out backwards;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.match-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(135deg, transparent, rgba(255, 215, 0, 0.05), transparent);
  transform: rotate(45deg);
  transition: all var(--duration-slow) var(--ease-out);
  opacity: 0;
}

.match-card:hover::before {
  opacity: 1;
  animation: shine 1.5s ease-in-out;
}

@keyframes shine {
  0% { transform: rotate(45deg) translateY(100%); }
  100% { transform: rotate(45deg) translateY(-100%); }
}

.match-card:hover {
  transform: translateY(-6px) scale(1.02);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
  z-index: 2;
}

.match-card.history:hover {
  border-color: rgba(255, 215, 0, 0.5);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.match-event {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: #ffffff;
}

.match-round {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.6);
  padding: var(--space-1) var(--space-2);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
}

.match-result {
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.match-result.win {
  color: #4ade80;
  background: rgba(74, 222, 128, 0.15);
}

.match-result.loss {
  color: #f87171;
  background: rgba(248, 113, 113, 0.15);
}

.match-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6) var(--space-4);
}

.match-player {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
}

.player-left {
  justify-content: flex-start;
}

.player-right {
  justify-content: flex-end;
}

.player-flag {
  font-size: var(--text-xl);
}

.player-name {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: #ffffff;
}

.player-score {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: rgba(255, 255, 255, 0.5);
  margin: 0 var(--space-2);
}

.player-score.winner {
  color: var(--color-accent-400);
}

.match-vs {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--space-4);
}

.vs-text {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: rgba(255, 255, 255, 0.5);
}

.score-separator {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: rgba(255, 255, 255, 0.5);
}

.match-time {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
  margin-top: var(--space-1);
}

.match-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.match-location,
.match-date {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: var(--space-16);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-2xl);
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: var(--space-4);
  opacity: 0.5;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
}

/* 数据来源 */
.data-source {
  text-align: center;
  padding: var(--space-6);
  margin-top: var(--space-8);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.data-source p {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.5);
}

/* 响应式 */
@media (max-width: 1023px) {
  .diagonal-decorations {
    display: none;
  }

  .page-header {
    text-align: center;
    transform: none;
    padding-left: 0;
  }

  .page-tag,
  .page-title,
  .page-subtitle {
    transform: none;
  }

  .view-toggle,
  .stats-card,
  .empty-state {
    transform: none;
  }

  .nav-title,
  .toggle-btn,
  .stat-item {
    transform: none;
  }

  .toggle-btn:hover {
    transform: translateX(4px);
  }

  .stat-divider {
    transform: none;
  }

  .match-card {
    transform: none;
  }

  @keyframes cardFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .match-card:nth-child(even) {
    transform: none;
    animation-name: cardFadeIn;
  }

  .match-card:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .empty-state p {
    transform: none;
  }
}

@media (max-width: 640px) {
  .immersive-content {
    padding: var(--space-6) var(--space-4);
  }

  .page-title {
    font-size: var(--text-3xl);
  }

  .nav-title {
    font-size: var(--text-base);
  }

  .toggle-btn {
    padding: var(--space-2) var(--space-3);
  }

  .match-body {
    flex-direction: column;
    gap: var(--space-3);
  }

  .match-player {
    justify-content: center !important;
  }

  .player-name {
    font-size: var(--text-sm);
  }
}
</style>
