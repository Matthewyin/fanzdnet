<template>
  <div class="schedule-calendar">
    <el-card class="calendar-card">
      <template #header>
        <div class="calendar-header">
          <div class="header-left">
            <h3>赛程日历</h3>
            <span class="calendar-subtitle">{{ currentMonthText }}</span>
          </div>
          <div class="header-right">
            <el-button-group>
              <el-button @click="goToPrevMonth" :icon="ArrowLeft" size="small">
                上月
              </el-button>
              <el-button @click="goToToday" size="small">
                今天
              </el-button>
              <el-button @click="goToNextMonth" :icon="ArrowRight" size="small">
                下月
              </el-button>
            </el-button-group>
          </div>
        </div>
      </template>

      <div class="calendar-content">
        <!-- 日历视图 -->
        <el-calendar v-model="currentDate" class="custom-calendar">
          <template #date-cell="{ data }">
            <div class="calendar-cell" :class="getCellClass(data)">
              <div class="cell-date">{{ data.day.split('-').pop() }}</div>
              <div class="cell-matches" v-if="getMatchesForDate(data.day).length > 0">
                <div 
                  v-for="match in getMatchesForDate(data.day).slice(0, 2)"
                  :key="match.id"
                  class="match-item"
                  :class="getMatchStatusClass(match.status)"
                  @click="handleMatchClick(match)"
                >
                  <div class="match-time">{{ formatTime(match.startTime) }}</div>
                  <div class="match-title">{{ match.opponent }}</div>
                </div>
                <div 
                  v-if="getMatchesForDate(data.day).length > 2"
                  class="more-matches"
                  @click="handleShowMore(data.day)"
                >
                  +{{ getMatchesForDate(data.day).length - 2 }}场比赛
                </div>
              </div>
            </div>
          </template>
        </el-calendar>

        <!-- 图例 -->
        <div class="calendar-legend">
          <div class="legend-title">图例：</div>
          <div class="legend-items">
            <div class="legend-item">
              <div class="legend-color upcoming"></div>
              <span>即将开始</span>
            </div>
            <div class="legend-item">
              <div class="legend-color ongoing"></div>
              <span>进行中</span>
            </div>
            <div class="legend-item">
              <div class="legend-color finished"></div>
              <span>已结束</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 比赛详情弹窗 -->
    <el-dialog
      v-model="showMatchDialog"
      title="比赛详情"
      width="500px"
      :close-on-click-modal="false"
    >
      <div v-if="selectedMatch" class="match-detail">
        <div class="detail-header">
          <h3>{{ selectedMatch.tournament }}</h3>
          <el-tag :type="getStatusType(selectedMatch.status)">
            {{ getStatusText(selectedMatch.status) }}
          </el-tag>
        </div>
        
        <div class="detail-content">
          <div class="detail-row">
            <label>对手：</label>
            <span>{{ selectedMatch.opponent }}</span>
          </div>
          <div class="detail-row">
            <label>轮次：</label>
            <span>{{ selectedMatch.round }}</span>
          </div>
          <div class="detail-row">
            <label>时间：</label>
            <span>{{ formatFullTime(selectedMatch.startTime) }}</span>
          </div>
          <div class="detail-row">
            <label>地点：</label>
            <span>{{ selectedMatch.venue }}</span>
          </div>
          <div class="detail-row" v-if="selectedMatch.result">
            <label>比分：</label>
            <span class="match-result">{{ selectedMatch.result }}</span>
          </div>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showMatchDialog = false">关闭</el-button>
          <el-button 
            v-if="selectedMatch?.status === 'upcoming'"
            type="primary" 
            @click="handleSetReminder"
          >
            设置提醒
          </el-button>
          <el-button 
            v-if="selectedMatch?.liveUrl && selectedMatch?.status === 'ongoing'"
            type="danger" 
            @click="handleWatchLive"
          >
            观看直播
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 更多比赛弹窗 -->
    <el-dialog
      v-model="showMoreDialog"
      title="当日比赛"
      width="600px"
    >
      <div class="more-matches-content">
        <div 
          v-for="match in selectedDateMatches"
          :key="match.id"
          class="match-summary"
          @click="handleMatchClick(match)"
        >
          <div class="summary-time">{{ formatTime(match.startTime) }}</div>
          <div class="summary-info">
            <div class="summary-title">{{ match.tournament }}</div>
            <div class="summary-opponent">vs {{ match.opponent }}</div>
          </div>
          <div class="summary-status">
            <el-tag :type="getStatusType(match.status)" size="small">
              {{ getStatusText(match.status) }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const props = defineProps({
  matches: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['match-click', 'set-reminder', 'watch-live'])

// 响应式数据
const currentDate = ref(new Date())
const showMatchDialog = ref(false)
const showMoreDialog = ref(false)
const selectedMatch = ref(null)
const selectedDateMatches = ref([])

// 计算属性
const currentMonthText = computed(() => {
  return currentDate.value.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long' 
  })
})

// 状态配置
const statusConfig = {
  upcoming: { type: 'info', text: '即将开始' },
  ongoing: { type: 'danger', text: '进行中' },
  finished: { type: 'success', text: '已结束' }
}

// 方法
const getMatchesForDate = (dateStr) => {
  return props.matches.filter(match => {
    const matchDate = new Date(match.startTime).toDateString()
    const targetDate = new Date(dateStr).toDateString()
    return matchDate === targetDate
  })
}

const getCellClass = (data) => {
  const today = new Date().toDateString()
  const cellDate = new Date(data.day).toDateString()
  const matches = getMatchesForDate(data.day)
  
  const classes = []
  
  if (cellDate === today) {
    classes.push('is-today')
  }
  
  if (matches.length > 0) {
    classes.push('has-matches')
  }
  
  return classes
}

const getMatchStatusClass = (status) => {
  return status
}

const getStatusType = (status) => {
  return statusConfig[status]?.type || 'info'
}

const getStatusText = (status) => {
  return statusConfig[status]?.text || '未知'
}

const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const formatFullTime = (time) => {
  return new Date(time).toLocaleString('zh-CN')
}

const goToPrevMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

const goToNextMonth = () => {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

const goToToday = () => {
  currentDate.value = new Date()
}

const handleMatchClick = (match) => {
  selectedMatch.value = match
  showMatchDialog.value = true
  showMoreDialog.value = false
  emit('match-click', match)
}

const handleShowMore = (date) => {
  selectedDateMatches.value = getMatchesForDate(date)
  showMoreDialog.value = true
}

const handleSetReminder = () => {
  emit('set-reminder', selectedMatch.value.id)
  showMatchDialog.value = false
}

const handleWatchLive = () => {
  emit('watch-live', selectedMatch.value)
  showMatchDialog.value = false
}
</script>

<style scoped>
.schedule-calendar {
  margin-bottom: 20px;
}

.calendar-card {
  border-radius: 8px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left h3 {
  margin: 0 0 4px 0;
  color: #303133;
}

.calendar-subtitle {
  font-size: 14px;
  color: #909399;
}

.calendar-content {
  padding: 0;
}

.custom-calendar {
  border: none;
}

.custom-calendar :deep(.el-calendar__header) {
  display: none;
}

.custom-calendar :deep(.el-calendar__body) {
  padding: 0;
}

.custom-calendar :deep(.el-calendar-table) {
  border: 1px solid #ebeef5;
}

.custom-calendar :deep(.el-calendar-table th) {
  background: #f8f9fa;
  color: #606266;
  font-weight: 600;
  text-align: center;
  padding: 12px 0;
}

.custom-calendar :deep(.el-calendar-table td) {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  vertical-align: top;
  height: 120px;
  padding: 0;
}

.calendar-cell {
  height: 100%;
  padding: 8px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calendar-cell:hover {
  background-color: #f0f9ff;
}

.calendar-cell.is-today {
  background-color: #ecf5ff;
}

.calendar-cell.has-matches {
  background-color: #f0f9ff;
}

.cell-date {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.cell-matches {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.match-item {
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.match-item:hover {
  transform: scale(1.05);
}

.match-item.upcoming {
  background: #e1f3ff;
  color: #409eff;
}

.match-item.ongoing {
  background: #fef0f0;
  color: #f56c6c;
}

.match-item.finished {
  background: #f0f9eb;
  color: #67c23a;
}

.match-time {
  font-weight: 600;
}

.match-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.more-matches {
  font-size: 10px;
  color: #909399;
  cursor: pointer;
  text-align: center;
  padding: 2px;
  border-radius: 3px;
  background: #f5f7fa;
}

.more-matches:hover {
  background: #e4e7ed;
}

.calendar-legend {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.legend-title {
  font-size: 14px;
  color: #606266;
  font-weight: 600;
}

.legend-items {
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #606266;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.upcoming {
  background: #409eff;
}

.legend-color.ongoing {
  background: #f56c6c;
}

.legend-color.finished {
  background: #67c23a;
}

.match-detail {
  padding: 0;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.detail-header h3 {
  margin: 0;
  color: #303133;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  align-items: center;
}

.detail-row label {
  width: 60px;
  font-weight: 600;
  color: #606266;
}

.match-result {
  font-size: 18px;
  font-weight: 700;
  color: #303133;
}

.more-matches-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.match-summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.match-summary:hover {
  background: #f0f9ff;
  border-color: #409eff;
}

.summary-time {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  min-width: 60px;
}

.summary-info {
  flex: 1;
}

.summary-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 2px;
}

.summary-opponent {
  font-size: 12px;
  color: #909399;
}

.summary-status {
  flex-shrink: 0;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .calendar-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .header-right {
    display: flex;
    justify-content: center;
  }
  
  .custom-calendar :deep(.el-calendar-table td) {
    height: 80px;
  }
  
  .calendar-cell {
    padding: 4px;
  }
  
  .cell-date {
    font-size: 12px;
  }
  
  .match-item {
    font-size: 9px;
  }
  
  .calendar-legend {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .legend-items {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
