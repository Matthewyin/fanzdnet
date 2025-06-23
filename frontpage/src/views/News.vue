<template>
  <div class="news-page">
    <div class="page-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">樊振东动态</h1>
          <p class="page-subtitle">获取樊振东最新新闻和动态资讯</p>

          <!-- 统计信息 -->
          <div class="stats-info">
            <div class="stat-item">
              <span class="stat-number">{{ newsStore.total }}</span>
              <span class="stat-label">条新闻</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ todayCount }}</span>
              <span class="stat-label">今日更新</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ onlineUsers }}</span>
              <span class="stat-label">在线用户</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选器 -->
      <NewsFilter
        @search="handleSearch"
        @filter-change="handleFilterChange"
        :show-quick-filters="true"
        :show-search-history="true"
      />

      <!-- 新闻列表 -->
      <div class="news-content">
        <div class="content-header">
          <div class="result-info">
            <span v-if="newsStore.filters.keyword">
              搜索"{{ newsStore.filters.keyword }}"，找到 {{ newsStore.total }} 条结果
            </span>
            <span v-else>
              共 {{ newsStore.total }} 条新闻
            </span>
          </div>

          <div class="view-options">
            <el-button-group>
              <el-button
                :type="viewMode === 'card' ? 'primary' : ''"
                @click="viewMode = 'card'"
                size="small"
              >
                <el-icon><Grid /></el-icon>
                卡片
              </el-button>
              <el-button
                :type="viewMode === 'list' ? 'primary' : ''"
                @click="viewMode = 'list'"
                size="small"
              >
                <el-icon><List /></el-icon>
                列表
              </el-button>
            </el-button-group>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="newsStore.loading && newsList.length === 0" class="loading-container">
          <el-skeleton :rows="5" animated />
        </div>

        <!-- 空状态 -->
        <div v-else-if="!newsStore.loading && newsList.length === 0" class="empty-container">
          <el-empty description="暂无新闻数据">
            <el-button type="primary" @click="handleRefresh">刷新试试</el-button>
          </el-empty>
        </div>

        <!-- 新闻列表 -->
        <div v-else class="news-list" :class="{ 'list-view': viewMode === 'list' }">
          <NewsCard
            v-for="news in newsList"
            :key="news.id"
            :news="news"
            @like="handleLike"
            @share="handleShare"
            @favorite="handleFavorite"
          />
        </div>

        <!-- 加载更多 -->
        <div v-if="newsStore.hasMore" class="load-more">
          <el-button
            @click="handleLoadMore"
            :loading="newsStore.loading"
            size="large"
            style="width: 200px;"
          >
            {{ newsStore.loading ? '加载中...' : '加载更多' }}
          </el-button>
        </div>

        <!-- 分页 -->
        <div v-if="newsStore.total > 20" class="pagination-container">
          <el-pagination
            v-model:current-page="newsStore.currentPage"
            v-model:page-size="newsStore.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="newsStore.total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useNewsStore } from '@/stores'
import NewsCard from '@/components/business/NewsCard.vue'
import NewsFilter from '@/components/business/NewsFilter.vue'
import { Grid, List } from '@element-plus/icons-vue'

const newsStore = useNewsStore()

// 响应式数据
const viewMode = ref('card')
const todayCount = ref(12)
const onlineUsers = ref(156)
const refreshTimer = ref(null)

// 计算属性
const newsList = computed(() => newsStore.filteredNews)

// 生命周期
onMounted(() => {
  initPage()
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})

// 方法
const initPage = async () => {
  try {
    await newsStore.fetchNews()
    updateStats()
  } catch (error) {
    ElMessage.error('获取新闻数据失败')
  }
}

const updateStats = () => {
  // 模拟统计数据更新
  todayCount.value = Math.floor(Math.random() * 20) + 5
  onlineUsers.value = Math.floor(Math.random() * 200) + 100
}

const startAutoRefresh = () => {
  // 每5分钟自动刷新一次
  refreshTimer.value = setInterval(() => {
    if (!document.hidden) {
      newsStore.fetchNews({ silent: true })
      updateStats()
    }
  }, 5 * 60 * 1000)
}

const stopAutoRefresh = () => {
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value)
    refreshTimer.value = null
  }
}

const handleSearch = (params) => {
  newsStore.updateFilters(params)
  newsStore.fetchNews()
}

const handleFilterChange = (params) => {
  newsStore.updateFilters(params)
  newsStore.fetchNews()
}

const handleRefresh = () => {
  newsStore.fetchNews()
  updateStats()
}

const handleLoadMore = () => {
  newsStore.setPage(newsStore.currentPage + 1)
  newsStore.fetchNews({ append: true })
}

const handleSizeChange = (size) => {
  newsStore.pageSize = size
  newsStore.setPage(1)
  newsStore.fetchNews()
}

const handleCurrentChange = (page) => {
  newsStore.setPage(page)
  newsStore.fetchNews()
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleLike = async (newsId) => {
  try {
    // 调用点赞API
    await newsStore.likeNews(newsId)
    ElMessage.success('点赞成功')
  } catch (error) {
    ElMessage.error('点赞失败')
  }
}

const handleShare = (news) => {
  // 分享功能
  if (navigator.share) {
    navigator.share({
      title: news.title,
      text: news.summary,
      url: window.location.origin + `/news/${news.id}`
    }).catch(console.error)
  } else {
    // 复制链接到剪贴板
    const url = window.location.origin + `/news/${news.id}`
    navigator.clipboard.writeText(url).then(() => {
      ElMessage.success('链接已复制到剪贴板')
    }).catch(() => {
      ElMessage.error('分享失败')
    })
  }
}

const handleFavorite = async (newsId) => {
  try {
    await newsStore.favoriteNews(newsId)
    ElMessage.success('收藏成功')
  } catch (error) {
    ElMessage.error('收藏失败')
  }
}
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.stats-info {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.news-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.result-info {
  font-size: 14px;
  color: #606266;
}

.view-options {
  display: flex;
  align-items: center;
}

.loading-container {
  padding: 20px 0;
}

.empty-container {
  padding: 60px 20px;
  text-align: center;
}

.news-list {
  margin-bottom: 30px;
}

.news-list.list-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.load-more {
  text-align: center;
  margin: 30px 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }

  .page-header {
    padding: 30px 16px;
    margin-bottom: 20px;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .stats-info {
    gap: 20px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .news-content {
    padding: 16px;
  }

  .content-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .result-info {
    text-align: center;
  }

  .view-options {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .stats-info {
    flex-direction: column;
    gap: 16px;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .stat-number,
  .stat-label {
    display: inline;
    margin: 0;
  }

  .pagination-container :deep(.el-pagination) {
    justify-content: center;
  }

  .pagination-container :deep(.el-pagination .el-pager) {
    flex-wrap: wrap;
  }
}

/* 动画效果 */
.news-list {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 滚动条样式 */
.news-page {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 transparent;
}

.news-page::-webkit-scrollbar {
  width: 6px;
}

.news-page::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 3px;
}

.news-page::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

.news-page::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
