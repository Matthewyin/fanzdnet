<template>
  <div class="realtime-panel">
    <el-card class="panel-card">
      <template #header>
        <div class="panel-header">
          <div class="header-left">
            <h3>实时数据</h3>
            <el-tag 
              :type="isConnected ? 'success' : 'danger'" 
              size="small"
              class="status-tag"
            >
              <el-icon><Connection /></el-icon>
              {{ isConnected ? '已连接' : '未连接' }}
            </el-tag>
          </div>
          
          <div class="header-right">
            <el-button 
              size="small" 
              @click="handleRefresh"
              :loading="refreshing"
            >
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
            
            <el-button 
              size="small" 
              @click="showSettings = true"
            >
              <el-icon><Setting /></el-icon>
              设置
            </el-button>
          </div>
        </div>
      </template>

      <div class="panel-content">
        <!-- 统计信息 -->
        <div class="stats-section">
          <div class="stat-item">
            <div class="stat-number">{{ stats.newsUpdates }}</div>
            <div class="stat-label">新闻更新</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.matchUpdates }}</div>
            <div class="stat-label">比赛更新</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ stats.communityMessages }}</div>
            <div class="stat-label">社区消息</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ unreadNotifications }}</div>
            <div class="stat-label">未读通知</div>
          </div>
        </div>

        <!-- 数据类型切换 -->
        <div class="data-tabs">
          <el-tabs v-model="activeTab" @tab-change="handleTabChange">
            <el-tab-pane label="新闻" name="news">
              <template #label>
                <span class="tab-label">
                  <el-icon><Document /></el-icon>
                  新闻
                  <el-badge 
                    v-if="newNewsCount > 0" 
                    :value="newNewsCount" 
                    class="tab-badge"
                  />
                </span>
              </template>
            </el-tab-pane>
            
            <el-tab-pane label="比赛" name="matches">
              <template #label>
                <span class="tab-label">
                  <el-icon><Trophy /></el-icon>
                  比赛
                  <el-badge 
                    v-if="newMatchCount > 0" 
                    :value="newMatchCount" 
                    class="tab-badge"
                  />
                </span>
              </template>
            </el-tab-pane>
            
            <el-tab-pane label="社区" name="community">
              <template #label>
                <span class="tab-label">
                  <el-icon><ChatDotRound /></el-icon>
                  社区
                  <el-badge 
                    v-if="newCommunityCount > 0" 
                    :value="newCommunityCount" 
                    class="tab-badge"
                  />
                </span>
              </template>
            </el-tab-pane>
            
            <el-tab-pane label="通知" name="notifications">
              <template #label>
                <span class="tab-label">
                  <el-icon><Bell /></el-icon>
                  通知
                  <el-badge 
                    v-if="unreadNotifications > 0" 
                    :value="unreadNotifications" 
                    class="tab-badge"
                  />
                </span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>

        <!-- 数据列表 -->
        <div class="data-content">
          <!-- 新闻列表 -->
          <div v-if="activeTab === 'news'" class="news-list">
            <div v-if="realtimeNews.length === 0" class="empty-state">
              <el-empty description="暂无实时新闻" />
            </div>
            <div v-else class="data-list">
              <div
                v-for="news in realtimeNews.slice(0, 10)"
                :key="news.id"
                class="data-item"
                :class="{ 'is-new': news.isNew }"
                @click="handleNewsClick(news)"
              >
                <div class="item-content">
                  <div class="item-title">{{ news.title }}</div>
                  <div class="item-meta">
                    <span class="item-time">{{ formatTime(news.receivedAt) }}</span>
                    <el-tag v-if="news.isNew" type="success" size="small">新</el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 比赛列表 -->
          <div v-if="activeTab === 'matches'" class="matches-list">
            <div v-if="realtimeMatches.length === 0" class="empty-state">
              <el-empty description="暂无比赛更新" />
            </div>
            <div v-else class="data-list">
              <div
                v-for="match in realtimeMatches.slice(0, 10)"
                :key="match.id"
                class="data-item"
                :class="{ 'is-new': match.isNew, 'is-updated': match.isUpdated }"
                @click="handleMatchClick(match)"
              >
                <div class="item-content">
                  <div class="item-title">{{ match.tournament }}</div>
                  <div class="item-subtitle">{{ match.status }} - {{ match.score }}</div>
                  <div class="item-meta">
                    <span class="item-time">{{ formatTime(match.updatedAt || match.receivedAt) }}</span>
                    <el-tag 
                      v-if="match.isNew" 
                      type="success" 
                      size="small"
                    >
                      新
                    </el-tag>
                    <el-tag 
                      v-else-if="match.isUpdated" 
                      type="warning" 
                      size="small"
                    >
                      更新
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 社区消息列表 -->
          <div v-if="activeTab === 'community'" class="community-list">
            <div v-if="realtimeCommunity.length === 0" class="empty-state">
              <el-empty description="暂无社区消息" />
            </div>
            <div v-else class="data-list">
              <div
                v-for="message in realtimeCommunity.slice(0, 10)"
                :key="message.id"
                class="data-item"
                :class="{ 'is-new': message.isNew }"
                @click="handleCommunityClick(message)"
              >
                <div class="item-content">
                  <div class="item-title">{{ message.author }}</div>
                  <div class="item-subtitle">{{ message.content }}</div>
                  <div class="item-meta">
                    <span class="item-time">{{ formatTime(message.receivedAt) }}</span>
                    <el-tag v-if="message.isNew" type="success" size="small">新</el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 通知列表 -->
          <div v-if="activeTab === 'notifications'" class="notifications-list">
            <div class="notifications-header">
              <el-button 
                size="small" 
                @click="markAllAsRead"
                :disabled="unreadNotifications === 0"
              >
                全部已读
              </el-button>
            </div>
            
            <div v-if="notifications.length === 0" class="empty-state">
              <el-empty description="暂无通知" />
            </div>
            <div v-else class="data-list">
              <div
                v-for="notification in notifications.slice(0, 10)"
                :key="notification.id"
                class="data-item notification-item"
                :class="{ 'is-unread': !notification.read }"
                @click="handleNotificationClick(notification)"
              >
                <div class="item-content">
                  <div class="item-title">{{ notification.title }}</div>
                  <div class="item-subtitle">{{ notification.message }}</div>
                  <div class="item-meta">
                    <span class="item-time">{{ formatTime(notification.receivedAt) }}</span>
                    <el-tag 
                      v-if="!notification.read" 
                      type="danger" 
                      size="small"
                    >
                      未读
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最后更新时间 -->
        <div v-if="lastUpdateTime" class="last-update">
          最后更新：{{ formatTime(lastUpdateTime) }}
        </div>
      </div>
    </el-card>

    <!-- 设置对话框 -->
    <el-dialog
      v-model="showSettings"
      title="实时数据设置"
      width="400px"
    >
      <el-form label-width="100px">
        <el-form-item label="自动刷新">
          <el-switch v-model="autoRefresh" />
        </el-form-item>
        
        <el-form-item label="通知提醒">
          <el-switch v-model="showNotifications" />
        </el-form-item>
        
        <el-form-item label="声音提醒">
          <el-switch v-model="soundNotifications" />
        </el-form-item>
        
        <el-form-item label="刷新间隔">
          <el-select v-model="refreshInterval">
            <el-option label="5秒" :value="5000" />
            <el-option label="10秒" :value="10000" />
            <el-option label="30秒" :value="30000" />
            <el-option label="1分钟" :value="60000" />
          </el-select>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="showSettings = false">取消</el-button>
        <el-button type="primary" @click="saveSettings">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useRealTimeData } from '@/composables/useRealTimeData'
import {
  Connection,
  Refresh,
  Setting,
  Document,
  Trophy,
  ChatDotRound,
  Bell
} from '@element-plus/icons-vue'

const router = useRouter()

// 使用实时数据
const {
  isConnected,
  lastUpdateTime,
  realtimeNews,
  realtimeMatches,
  realtimeCommunity,
  notifications,
  stats,
  unreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearOldData
} = useRealTimeData()

// 响应式数据
const activeTab = ref('news')
const refreshing = ref(false)
const showSettings = ref(false)
const autoRefresh = ref(true)
const showNotifications = ref(true)
const soundNotifications = ref(false)
const refreshInterval = ref(10000)

// 计算属性
const newNewsCount = computed(() => {
  return realtimeNews.value.filter(item => item.isNew).length
})

const newMatchCount = computed(() => {
  return realtimeMatches.value.filter(item => item.isNew || item.isUpdated).length
})

const newCommunityCount = computed(() => {
  return realtimeCommunity.value.filter(item => item.isNew).length
})

// 方法
const handleTabChange = (tab) => {
  activeTab.value = tab
}

const handleRefresh = async () => {
  refreshing.value = true
  
  try {
    // 模拟刷新延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    clearOldData()
    ElMessage.success('数据已刷新')
  } catch (error) {
    ElMessage.error('刷新失败')
  } finally {
    refreshing.value = false
  }
}

const handleNewsClick = (news) => {
  router.push(`/news/${news.id}`)
}

const handleMatchClick = (match) => {
  router.push(`/schedule/${match.id}`)
}

const handleCommunityClick = (message) => {
  router.push(`/community/post/${message.postId}`)
}

const handleNotificationClick = (notification) => {
  markNotificationAsRead(notification.id)
  
  // 根据通知类型跳转
  if (notification.link) {
    router.push(notification.link)
  }
}

const markAllAsRead = () => {
  markAllNotificationsAsRead()
  ElMessage.success('所有通知已标记为已读')
}

const saveSettings = () => {
  // 保存设置到本地存储
  const settings = {
    autoRefresh: autoRefresh.value,
    showNotifications: showNotifications.value,
    soundNotifications: soundNotifications.value,
    refreshInterval: refreshInterval.value
  }
  
  localStorage.setItem('realtime-settings', JSON.stringify(settings))
  showSettings.value = false
  ElMessage.success('设置已保存')
}

const loadSettings = () => {
  const saved = localStorage.getItem('realtime-settings')
  if (saved) {
    try {
      const settings = JSON.parse(saved)
      autoRefresh.value = settings.autoRefresh ?? true
      showNotifications.value = settings.showNotifications ?? true
      soundNotifications.value = settings.soundNotifications ?? false
      refreshInterval.value = settings.refreshInterval ?? 10000
    } catch (error) {
      console.error('加载设置失败:', error)
    }
  }
}

const formatTime = (time) => {
  if (!time) return ''
  
  const date = new Date(time)
  const now = new Date()
  const diff = now - date
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (minutes < 1) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}

// 生命周期
onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.realtime-panel {
  height: 100%;
}

.panel-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-card :deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-left h3 {
  margin: 0;
  color: #303133;
}

.status-tag {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header-right {
  display: flex;
  gap: 8px;
}

.panel-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.stat-number {
  font-size: 20px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.data-tabs {
  margin-bottom: 20px;
}

.tab-label {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-badge {
  margin-left: 4px;
}

.data-content {
  flex: 1;
  overflow-y: auto;
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
}

.data-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-item {
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.data-item:hover {
  border-color: #409eff;
  background: #f0f9ff;
}

.data-item.is-new {
  border-color: #67c23a;
  background: #f0f9eb;
}

.data-item.is-updated {
  border-color: #e6a23c;
  background: #fdf6ec;
}

.data-item.is-unread {
  border-color: #f56c6c;
  background: #fef0f0;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  line-height: 1.4;
}

.item-subtitle {
  font-size: 12px;
  color: #606266;
  line-height: 1.4;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: #909399;
}

.notifications-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.last-update {
  text-align: center;
  font-size: 12px;
  color: #909399;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .panel-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .header-right {
    justify-content: center;
  }
}
</style>
