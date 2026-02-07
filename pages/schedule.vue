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
            <!-- 分类筛选 -->
            <div class="category-filter">
              <button
                v-for="cat in categories"
                :key="cat.key"
                class="filter-btn"
                :class="{ active: selectedCategory === cat.key }"
                @click="selectedCategory = cat.key"
              >
                <span class="filter-icon">{{ cat.icon }}</span>
                {{ cat.label }}
                <span class="filter-count">({{ cat.count }})</span>
              </button>
            </div>
            <div class="matches-grid">
              <article
                v-for="(match, index) in filteredHistoryMatches"
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

// 分类筛选
const selectedCategory = ref<string>('all');

// 分类配置
const categories = computed(() => [
  { key: 'all', label: '全部', icon: '🏓', count: historyMatches.value.length },
  { key: 'olympic', label: '奥运会', icon: '🥇', count: olympicMatches.length },
  { key: 'national', label: '全运会', icon: '🏆', count: nationalGamesMatches.length },
  { key: 'bundesliga', label: '德甲', icon: '🇩🇪', count: bundesligaMatches.length },
  { key: 'germancup', label: '德国杯', icon: '⚽', count: germanCupMatches.length }
]);

// 按日期从新到旧排序的辅助函数
const sortByDateDesc = (matches: any[]) => {
  return [...matches].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 筛选后的历史战绩（每个分类都从新到旧排序）
const filteredHistoryMatches = computed(() => {
  switch (selectedCategory.value) {
    case 'olympic':
      return sortByDateDesc(olympicMatches);
    case 'national':
      return sortByDateDesc(nationalGamesMatches);
    case 'bundesliga':
      return sortByDateDesc(bundesligaMatches);
    case 'germancup':
      return sortByDateDesc(germanCupMatches);
    default:
      return historyMatches.value;
  }
});

// 即将进行的比赛（2026年2月）
const upcomingMatches = computed(() => [
  {
    id: 1,
    event: '德甲联赛',
    round: '第16轮',
    date: '2026-02-11',
    player1: '樊振东',
    player2: '格瑞扎',
    player2Flag: '🇩🇪',
    location: '德国·萨尔布吕肯（主场）'
  },
  {
    id: 2,
    event: '欧冠联赛',
    round: '1/4决赛次回合',
    date: '2026-02-14',
    player1: '樊振东',
    player2: '亨尼邦（法）',
    player2Flag: '🇫🇷',
    location: '德国·特里尔（主场）'
  },
  {
    id: 3,
    event: '德甲联赛',
    round: '第17轮',
    date: '2026-02-16',
    player1: '樊振东',
    player2: '杜塞尔多夫',
    player2Flag: '🇩🇪',
    location: '德国·杜塞尔多夫（客场）'
  }
]);

// 历史战绩 - 按赛事分类
// 1. 巴黎奥运会 (2024年) - 男单+男团
const olympicMatches = [
  // 男团比赛
  {
    id: 'oly-team-1',
    event: '巴黎奥运会',
    round: '男团1/8决赛',
    date: '2024-08-06',
    player1: '樊振东',
    player2: '阿昌塔',
    player2Flag: '🇮🇳',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-team-2',
    event: '巴黎奥运会',
    round: '男团1/4决赛',
    date: '2024-08-07',
    player1: '樊振东',
    player2: '林钟勋',
    player2Flag: '🇰🇷',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-team-3',
    event: '巴黎奥运会',
    round: '男团半决赛',
    date: '2024-08-08',
    player1: '樊振东',
    player2: 'F·勒布伦',
    player2Flag: '🇫🇷',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-team-4',
    event: '巴黎奥运会',
    round: '男团决赛 🥇',
    date: '2024-08-09',
    player1: '樊振东',
    player2: '莫雷高德',
    player2Flag: '🇸🇪',
    score1: 3,
    score2: 2,
    result: 'win' as const,
    location: '巴黎'
  },
  // 男单比赛
  {
    id: 'oly-1',
    event: '巴黎奥运会',
    round: '男单1/32决赛',
    date: '2024-07-28',
    player1: '樊振东',
    player2: '扎穆登科',
    player2Flag: '🇺🇦',
    score1: 4,
    score2: 0,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-2',
    event: '巴黎奥运会',
    round: '男单1/16决赛',
    date: '2024-07-29',
    player1: '樊振东',
    player2: '黄镇廷',
    player2Flag: '🇭🇰',
    score1: 4,
    score2: 1,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-3',
    event: '巴黎奥运会',
    round: '男单1/8决赛',
    date: '2024-07-31',
    player1: '樊振东',
    player2: '卡纳克·贾哈',
    player2Flag: '🇺🇸',
    score1: 4,
    score2: 0,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-4',
    event: '巴黎奥运会',
    round: '男单1/4决赛',
    date: '2024-08-01',
    player1: '樊振东',
    player2: '张本智和',
    player2Flag: '🇯🇵',
    score1: 4,
    score2: 3,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-5',
    event: '巴黎奥运会',
    round: '男单半决赛',
    date: '2024-08-02',
    player1: '樊振东',
    player2: 'F·勒布伦',
    player2Flag: '🇫🇷',
    score1: 4,
    score2: 0,
    result: 'win' as const,
    location: '巴黎'
  },
  {
    id: 'oly-6',
    event: '巴黎奥运会',
    round: '男单决赛 🥇',
    date: '2024-08-04',
    player1: '樊振东',
    player2: '莫雷高德',
    player2Flag: '🇸🇪',
    score1: 4,
    score2: 1,
    result: 'win' as const,
    location: '巴黎'
  }
];

// 2. 全运会 (2025年) - 男单+男团
const nationalGamesMatches = [
  // 男团比赛
  {
    id: 'ng-team-1',
    event: '全运会',
    round: '男团小组赛',
    date: '2025-11-14',
    player1: '樊振东',
    player2: '孙闻',
    player2Flag: '🇨🇳',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-team-2',
    event: '全运会',
    round: '男团小组赛',
    date: '2025-11-17',
    player1: '樊振东',
    player2: '于何一',
    player2Flag: '🇨🇳',
    score1: 3,
    score2: 2,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-team-3',
    event: '全运会',
    round: '男团1/4决赛',
    date: '2025-11-18',
    player1: '樊振东',
    player2: '梁靖崑',
    player2Flag: '🇨🇳',
    score1: 3,
    score2: 2,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-team-4',
    event: '全运会',
    round: '男团半决赛',
    date: '2025-11-18',
    player1: '樊振东',
    player2: '徐瑛彬',
    player2Flag: '🇨🇳',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-team-5',
    event: '全运会',
    round: '男团决赛 🥈',
    date: '2025-11-20',
    player1: '樊振东',
    player2: '王楚钦',
    player2Flag: '🇨🇳',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '澳门'
  },
  // 男单比赛
  {
    id: 'ng-1',
    event: '全运会',
    round: '男单1/16决赛',
    date: '2025-11-09',
    player1: '樊振东',
    player2: '周雨',
    player2Flag: '🇨🇳',
    score1: 4,
    score2: 0,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-2',
    event: '全运会',
    round: '男单1/8决赛',
    date: '2025-11-11',
    player1: '樊振东',
    player2: '薛飞',
    player2Flag: '🇨🇳',
    score1: 4,
    score2: 1,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-3',
    event: '全运会',
    round: '男单1/4决赛',
    date: '2025-11-13',
    player1: '樊振东',
    player2: '孙正',
    player2Flag: '🇨🇳',
    score1: 4,
    score2: 0,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-4',
    event: '全运会',
    round: '男单半决赛',
    date: '2025-11-15',
    player1: '樊振东',
    player2: '王楚钦',
    player2Flag: '🇨🇳',
    score1: 4,
    score2: 2,
    result: 'win' as const,
    location: '澳门'
  },
  {
    id: 'ng-5',
    event: '全运会',
    round: '男单决赛 🥇',
    date: '2025-11-16',
    player1: '樊振东',
    player2: '林诗栋',
    player2Flag: '🇨🇳',
    score1: 4,
    score2: 1,
    result: 'win' as const,
    location: '澳门'
  }
];

// 3. 德甲联赛 (2025-2026) - 每场比赛按出场次数记录
const bundesligaMatches = [
  // 第12轮（2场）
  {
    id: 'bl-12-1',
    event: '德甲联赛',
    round: '第12轮',
    date: '2026-01-12',
    player1: '樊振东',
    player2: 'Alberto Mino',
    player2Flag: '🇪🇨',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '多特蒙德（客场）'
  },
  {
    id: 'bl-12-2',
    event: '德甲联赛',
    round: '第12轮',
    date: '2026-01-12',
    player1: '樊振东',
    player2: 'Kristian Karlsson',
    player2Flag: '🇸🇪',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '多特蒙德（客场）'
  },
  // 第11轮（2场）
  {
    id: 'bl-11-1',
    event: '德甲联赛',
    round: '第11轮',
    date: '2025-12-21',
    player1: '樊振东',
    player2: 'Borgar Haug',
    player2Flag: '🇳🇴',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '萨尔布吕肯（主场）'
  },
  {
    id: 'bl-11-2',
    event: '德甲联赛',
    round: '第11轮',
    date: '2025-12-21',
    player1: '樊振东',
    player2: 'Kanak Jha',
    player2Flag: '🇺🇸',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '萨尔布吕肯（主场）'
  },
  // 第10轮（1场）
  {
    id: 'bl-10-1',
    event: '德甲联赛',
    round: '第10轮',
    date: '2025-12-14',
    player1: '樊振东',
    player2: 'Iulian Chirita',
    player2Flag: '🇷🇴',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '萨尔布吕肯（主场）'
  },
  // 第5轮（2场）
  {
    id: 'bl-5-1',
    event: '德甲联赛',
    round: '第5轮',
    date: '2025-10-05',
    player1: '樊振东',
    player2: 'Marcelo Aguirre',
    player2Flag: '🇵🇾',
    score1: 1,
    score2: 3,
    result: 'loss' as const,
    location: '云达不来梅（客场）'
  },
  {
    id: 'bl-5-2',
    event: '德甲联赛',
    round: '第5轮',
    date: '2025-10-05',
    player1: '樊振东',
    player2: 'Mattias Falck',
    player2Flag: '🇸🇪',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '云达不来梅（客场）'
  },
  // 第3轮（1场）
  {
    id: 'bl-3-1',
    event: '德甲联赛',
    round: '第3轮',
    date: '2025-09-14',
    player1: '樊振东',
    player2: 'Cedric Nuytinck',
    player2Flag: '🇧🇪',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '萨尔布吕肯（主场）'
  },
  // 第2轮（2场）
  {
    id: 'bl-2-1',
    event: '德甲联赛',
    round: '第2轮',
    date: '2025-09-06',
    player1: '樊振东',
    player2: 'Filip Zeljko',
    player2Flag: '🇭🇷',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '巴特柯尼希斯霍芬（客场）'
  },
  {
    id: 'bl-2-2',
    event: '德甲联赛',
    round: '第2轮',
    date: '2025-09-06',
    player1: '樊振东',
    player2: 'Andre Bertelsmeier',
    player2Flag: '🇩🇪',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '巴特柯尼希斯霍芬（客场）'
  },
  // 第1轮（2场）
  {
    id: 'bl-1-1',
    event: '德甲联赛',
    round: '第1轮',
    date: '2025-08-31',
    player1: '樊振东',
    player2: 'Romain Ruiz',
    player2Flag: '🇫🇷',
    score1: 2,
    score2: 3,
    result: 'loss' as const,
    location: '贝格诺伊斯塔特（客场）'
  },
  {
    id: 'bl-1-2',
    event: '德甲联赛',
    round: '第1轮',
    date: '2025-08-31',
    player1: '樊振东',
    player2: 'Benedikt Duda',
    player2Flag: '🇩🇪',
    score1: 1,
    score2: 3,
    result: 'loss' as const,
    location: '贝格诺伊斯塔特（客场）'
  }
];

// 4. 德国杯 (2025-2026)
const germanCupMatches = [
  {
    id: 'gc-1',
    event: '德国杯',
    round: '1/8决赛',
    date: '2025-09-19',
    player1: '樊振东',
    player2: '斯佐迪',
    player2Flag: '🇭🇺',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '德国'
  },
  {
    id: 'gc-2',
    event: '德国杯',
    round: '半决赛',
    date: '2026-01-04',
    player1: '樊振东',
    player2: '阿比奥顿',
    player2Flag: '🇵🇹',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '新乌尔姆'
  },
  {
    id: 'gc-3',
    event: '德国杯',
    round: '半决赛',
    date: '2026-01-04',
    player1: '樊振东',
    player2: '户上隼辅',
    player2Flag: '🇯🇵',
    score1: 3,
    score2: 1,
    result: 'win' as const,
    location: '新乌尔姆'
  },
  {
    id: 'gc-4',
    event: '德国杯',
    round: '决赛 🏆',
    date: '2026-01-04',
    player1: '樊振东',
    player2: '奥恰洛夫',
    player2Flag: '🇩🇪',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '新乌尔姆'
  },
  {
    id: 'gc-5',
    event: '德国杯',
    round: '决赛 🏆',
    date: '2026-01-04',
    player1: '樊振东',
    player2: '菲鲁斯',
    player2Flag: '🇩🇪',
    score1: 3,
    score2: 0,
    result: 'win' as const,
    location: '新乌尔姆'
  }
];

// 合并所有历史战绩（按日期从新到旧排序）
const historyMatches = computed(() => {
  const allMatches = [
    ...olympicMatches,
    ...nationalGamesMatches,
    ...bundesligaMatches,
    ...germanCupMatches
  ];
  return allMatches.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});
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

/* 分类筛选 */
.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding: var(--space-4);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.filter-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.filter-btn.active {
  color: var(--color-accent-400);
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
}

.filter-icon {
  font-size: var(--text-base);
}

.filter-count {
  font-size: var(--text-xs);
  opacity: 0.7;
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
