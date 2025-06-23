<template>
  <div class="schedule-page">
    <div class="page-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">赛程安排</h1>
          <p class="page-subtitle">樊振东比赛赛程和安排</p>

          <!-- 快速统计 -->
          <div class="quick-stats">
            <div class="stat-card">
              <div class="stat-number">{{ upcomingCount }}</div>
              <div class="stat-label">即将开始</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ ongoingCount }}</div>
              <div class="stat-label">进行中</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ finishedCount }}</div>
              <div class="stat-label">已结束</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 视图切换和操作栏 -->
      <div class="toolbar">
        <div class="view-switcher">
          <el-radio-group v-model="viewMode" @change="handleViewChange">
            <el-radio-button value="list">
              <el-icon><List /></el-icon>
              列表视图
            </el-radio-button>
            <el-radio-button value="calendar">
              <el-icon><Calendar /></el-icon>
              日历视图
            </el-radio-button>
          </el-radio-group>
        </div>

        <div class="toolbar-actions">
          <!-- 筛选器 -->
          <el-select
            v-model="selectedStatus"
            placeholder="筛选状态"
            clearable
            @change="handleFilterChange"
            style="width: 120px;"
          >
            <el-option label="全部" value="" />
            <el-option label="即将开始" value="upcoming" />
            <el-option label="进行中" value="ongoing" />
            <el-option label="已结束" value="finished" />
          </el-select>

          <!-- 电子屏模式 -->
          <el-button
            @click="toggleElectronicMode"
            :type="isElectronicMode ? 'danger' : 'primary'"
            :icon="isElectronicMode ? 'CloseBold' : 'FullScreen'"
          >
            {{ isElectronicMode ? '退出电子屏' : '电子屏模式' }}
          </el-button>

          <!-- 刷新 -->
          <el-button @click="handleRefresh" :icon="Refresh">
            刷新
          </el-button>
        </div>
      </div>

      <!-- 电子屏模式 -->
      <div v-if="isElectronicMode" class="electronic-screen">
        <div class="screen-header">
          <h1>樊振东赛程安排</h1>
          <div class="current-time">{{ currentTime }}</div>
        </div>

        <div class="screen-content">
          <div class="upcoming-matches">
            <h2>即将开始的比赛</h2>
            <div class="match-list">
              <div
                v-for="match in upcomingMatches.slice(0, 3)"
                :key="match.id"
                class="screen-match"
              >
                <div class="match-tournament">{{ match.tournament }}</div>
                <div class="match-vs">樊振东 VS {{ match.opponent }}</div>
                <div class="match-time">{{ formatScreenTime(match.startTime) }}</div>
                <div class="match-venue">{{ match.venue }}</div>
              </div>
            </div>
          </div>

          <div class="ongoing-matches" v-if="ongoingMatches.length > 0">
            <h2>正在进行的比赛</h2>
            <div class="match-list">
              <div
                v-for="match in ongoingMatches"
                :key="match.id"
                class="screen-match ongoing"
              >
                <div class="match-tournament">{{ match.tournament }}</div>
                <div class="match-vs">樊振东 VS {{ match.opponent }}</div>
                <div class="match-score" v-if="match.result">{{ match.result }}</div>
                <div class="live-indicator">🔴 直播中</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 正常视图模式 -->
      <div v-else class="normal-view">
        <!-- 日历视图 -->
        <ScheduleCalendar
          v-if="viewMode === 'calendar'"
          :matches="filteredMatches"
          @match-click="handleMatchClick"
          @set-reminder="handleSetReminder"
          @watch-live="handleWatchLive"
        />

        <!-- 列表视图 -->
        <div v-else class="schedule-list">
          <!-- 加载状态 -->
          <div v-if="scheduleStore.loading" class="loading-container">
            <el-skeleton :rows="3" animated />
          </div>

          <!-- 空状态 -->
          <div v-else-if="filteredMatches.length === 0" class="empty-container">
            <el-empty description="暂无比赛安排">
              <el-button type="primary" @click="handleRefresh">刷新试试</el-button>
            </el-empty>
          </div>

          <!-- 比赛列表 -->
          <div v-else class="matches-container">
            <MatchCard
              v-for="match in filteredMatches"
              :key="match.id"
              :match="match"
              @set-reminder="handleSetReminder"
              @watch-live="handleWatchLive"
              @watch-highlights="handleWatchHighlights"
              @share="handleShare"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useScheduleStore } from '@/stores'
import MatchCard from '@/components/business/MatchCard.vue'
import ScheduleCalendar from '@/components/business/ScheduleCalendar.vue'
import {
  List,
  Calendar,
  Refresh,
  FullScreen,
  CloseBold
} from '@element-plus/icons-vue'

const scheduleStore = useScheduleStore()

// 响应式数据
const viewMode = ref('list')
const selectedStatus = ref('')
const isElectronicMode = ref(false)
const currentTime = ref('')
const timeTimer = ref(null)

// 计算属性
const filteredMatches = computed(() => {
  let matches = scheduleStore.scheduleList

  if (selectedStatus.value) {
    matches = matches.filter(match => match.status === selectedStatus.value)
  }

  return matches.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
})

const upcomingMatches = computed(() => scheduleStore.upcomingMatches)
const ongoingMatches = computed(() => scheduleStore.ongoingMatches)
const finishedMatches = computed(() => scheduleStore.finishedMatches)

const upcomingCount = computed(() => upcomingMatches.value.length)
const ongoingCount = computed(() => ongoingMatches.value.length)
const finishedCount = computed(() => finishedMatches.value.length)

// 生命周期
onMounted(() => {
  initPage()
  startTimeUpdate()
})

onUnmounted(() => {
  stopTimeUpdate()
})

// 方法
const initPage = async () => {
  try {
    await scheduleStore.fetchSchedule()
  } catch (error) {
    ElMessage.error('获取赛程数据失败')
  }
}

const startTimeUpdate = () => {
  updateCurrentTime()
  timeTimer.value = setInterval(updateCurrentTime, 1000)
}

const stopTimeUpdate = () => {
  if (timeTimer.value) {
    clearInterval(timeTimer.value)
    timeTimer.value = null
  }
}

const updateCurrentTime = () => {
  currentTime.value = new Date().toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const handleViewChange = (mode) => {
  viewMode.value = mode
}

const handleFilterChange = () => {
  // 筛选逻辑已在计算属性中处理
}

const toggleElectronicMode = () => {
  isElectronicMode.value = !isElectronicMode.value
  scheduleStore.toggleElectronicMode()
}

const handleRefresh = () => {
  scheduleStore.fetchSchedule()
}

const handleMatchClick = (match) => {
  // 处理比赛点击
  console.log('Match clicked:', match)
}

const handleSetReminder = async (matchId) => {
  try {
    await scheduleStore.setMatchReminder(matchId, new Date())
    ElMessage.success('提醒设置成功')
  } catch (error) {
    ElMessage.error('设置提醒失败')
  }
}

const handleWatchLive = (match) => {
  if (match.liveUrl) {
    window.open(match.liveUrl, '_blank')
  } else {
    ElMessage.info('暂无直播链接')
  }
}

const handleWatchHighlights = (match) => {
  if (match.highlights) {
    window.open(match.highlights, '_blank')
  } else {
    ElMessage.info('暂无精彩回放')
  }
}

const handleShare = (match) => {
  const shareText = `樊振东 VS ${match.opponent} - ${match.tournament}`
  const shareUrl = window.location.origin + `/schedule/${match.id}`

  if (navigator.share) {
    navigator.share({
      title: shareText,
      url: shareUrl
    }).catch(console.error)
  } else {
    navigator.clipboard.writeText(shareUrl).then(() => {
      ElMessage.success('链接已复制到剪贴板')
    }).catch(() => {
      ElMessage.error('分享失败')
    })
  }
}

const formatScreenTime = (time) => {
  const date = new Date(time)
  const now = new Date()
  const diff = date - now

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      return `${days}天${hours}小时后`
    } else if (hours > 0) {
      return `${hours}小时${minutes}分钟后`
    } else {
      return `${minutes}分钟后`
    }
  } else {
    return date.toLocaleString('zh-CN')
  }
}
</script>

<style scoped>
.schedule-page {
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

.quick-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.stat-card {
  text-align: center;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.toolbar-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.electronic-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  color: #fff;
  z-index: 9999;
  padding: 40px;
  overflow-y: auto;
}

.screen-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #333;
  padding-bottom: 20px;
}

.screen-header h1 {
  font-size: 3rem;
  margin: 0 0 16px 0;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
}

.current-time {
  font-size: 1.5rem;
  color: #ffff00;
  font-family: 'Courier New', monospace;
}

.screen-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.upcoming-matches h2,
.ongoing-matches h2 {
  font-size: 2rem;
  color: #00ff00;
  margin-bottom: 20px;
  text-align: center;
}

.screen-match {
  background: #111;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  text-align: center;
}

.screen-match.ongoing {
  border-color: #ff0000;
  background: #220000;
}

.match-tournament {
  font-size: 1.2rem;
  color: #ffff00;
  margin-bottom: 8px;
  font-weight: 600;
}

.match-vs {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 700;
}

.match-time {
  font-size: 1.1rem;
  color: #00ff00;
  margin-bottom: 8px;
}

.match-venue {
  font-size: 1rem;
  color: #ccc;
}

.match-score {
  font-size: 2rem;
  color: #ff0000;
  font-weight: 700;
  margin: 12px 0;
}

.live-indicator {
  font-size: 1.1rem;
  color: #ff0000;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.normal-view {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.loading-container {
  padding: 40px 20px;
}

.empty-container {
  padding: 60px 20px;
  text-align: center;
}

.matches-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

  .quick-stats {
    flex-direction: column;
    gap: 16px;
  }

  .toolbar {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .electronic-screen {
    padding: 20px;
  }

  .screen-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>

<style scoped>
.schedule-page {
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

.quick-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.stat-card {
  text-align: center;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.toolbar-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.electronic-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  color: #fff;
  z-index: 9999;
  padding: 40px;
  overflow-y: auto;
}

.screen-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #333;
  padding-bottom: 20px;
}

.screen-header h1 {
  font-size: 3rem;
  margin: 0 0 16px 0;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff00;
}

.current-time {
  font-size: 1.5rem;
  color: #ffff00;
  font-family: 'Courier New', monospace;
}

.screen-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.upcoming-matches h2,
.ongoing-matches h2 {
  font-size: 2rem;
  color: #00ff00;
  margin-bottom: 20px;
  text-align: center;
}

.screen-match {
  background: #111;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  text-align: center;
}

.screen-match.ongoing {
  border-color: #ff0000;
  background: #220000;
}

.match-tournament {
  font-size: 1.2rem;
  color: #ffff00;
  margin-bottom: 8px;
  font-weight: 600;
}

.match-vs {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 12px;
  font-weight: 700;
}

.match-time {
  font-size: 1.1rem;
  color: #00ff00;
  margin-bottom: 8px;
}

.match-venue {
  font-size: 1rem;
  color: #ccc;
}

.match-score {
  font-size: 2rem;
  color: #ff0000;
  font-weight: 700;
  margin: 12px 0;
}

.live-indicator {
  font-size: 1.1rem;
  color: #ff0000;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.normal-view {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.loading-container {
  padding: 40px 20px;
}

.empty-container {
  padding: 60px 20px;
  text-align: center;
}

.matches-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

  .quick-stats {
    flex-direction: column;
    gap: 16px;
  }

  .stat-card {
    padding: 12px 20px;
  }

  .toolbar {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .view-switcher {
    display: flex;
    justify-content: center;
  }

  .toolbar-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .electronic-screen {
    padding: 20px;
  }

  .screen-header h1 {
    font-size: 2rem;
  }

  .current-time {
    font-size: 1.2rem;
  }

  .screen-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .upcoming-matches h2,
  .ongoing-matches h2 {
    font-size: 1.5rem;
  }

  .match-vs {
    font-size: 1.2rem;
  }

  .normal-view {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .toolbar-actions {
    flex-direction: column;
    width: 100%;
  }

  .toolbar-actions > * {
    width: 100%;
  }

  .screen-match {
    padding: 16px;
  }

  .match-tournament {
    font-size: 1rem;
  }

  .match-vs {
    font-size: 1.1rem;
  }

  .match-time {
    font-size: 1rem;
  }
}

/* 动画效果 */
.matches-container {
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

/* 电子屏进入动画 */
.electronic-screen {
  animation: screenFadeIn 0.5s ease-out;
}

@keyframes screenFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
