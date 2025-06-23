<template>
  <el-card class="match-card" :class="getMatchStatusClass(match.status)">
    <div class="match-content">
      <!-- 比赛状态标识 -->
      <div class="match-status">
        <el-tag :type="getStatusType(match.status)" size="small">
          {{ getStatusText(match.status) }}
        </el-tag>
        <span class="match-round">{{ match.round }}</span>
      </div>

      <!-- 比赛信息 -->
      <div class="match-info">
        <!-- 赛事名称 -->
        <h3 class="tournament-name">{{ match.tournament }}</h3>
        
        <!-- 对阵信息 -->
        <div class="match-vs">
          <div class="player player-left">
            <div class="player-avatar">
              <el-avatar :src="'/images/fzd-avatar.jpg'" :size="40">
                樊振东
              </el-avatar>
            </div>
            <div class="player-info">
              <div class="player-name">樊振东</div>
              <div class="player-rank">世界排名 #1</div>
            </div>
          </div>
          
          <div class="vs-section">
            <div class="vs-text">VS</div>
            <div class="match-score" v-if="match.result">
              {{ match.result }}
            </div>
          </div>
          
          <div class="player player-right">
            <div class="player-info">
              <div class="player-name">{{ match.opponent }}</div>
              <div class="player-rank">{{ getOpponentRank(match.opponent) }}</div>
            </div>
            <div class="player-avatar">
              <el-avatar :src="getOpponentAvatar(match.opponent)" :size="40">
                {{ match.opponent.charAt(0) }}
              </el-avatar>
            </div>
          </div>
        </div>

        <!-- 比赛时间和地点 -->
        <div class="match-details">
          <div class="detail-item">
            <el-icon><Clock /></el-icon>
            <span>{{ formatMatchTime(match.startTime) }}</span>
          </div>
          <div class="detail-item">
            <el-icon><Location /></el-icon>
            <span>{{ match.venue }}</span>
          </div>
          <div class="detail-item" v-if="match.liveUrl">
            <el-icon><VideoCamera /></el-icon>
            <span>直播可观看</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="match-actions">
        <el-button 
          v-if="match.status === 'upcoming'"
          size="small" 
          @click="handleSetReminder"
          :type="match.hasReminder ? 'success' : 'primary'"
        >
          <el-icon><Bell /></el-icon>
          {{ match.hasReminder ? '已设提醒' : '设置提醒' }}
        </el-button>
        
        <el-button 
          v-if="match.liveUrl && match.status === 'ongoing'"
          size="small" 
          type="danger"
          @click="handleWatchLive"
        >
          <el-icon><VideoCamera /></el-icon>
          观看直播
        </el-button>
        
        <el-button 
          v-if="match.highlights && match.status === 'finished'"
          size="small" 
          @click="handleWatchHighlights"
        >
          <el-icon><Film /></el-icon>
          精彩回放
        </el-button>
        
        <el-button size="small" text @click="handleShare">
          <el-icon><Share /></el-icon>
          分享
        </el-button>
        
        <el-button size="small" text @click="handleViewDetail">
          <el-icon><View /></el-icon>
          详情
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Clock,
  Location,
  VideoCamera,
  Bell,
  Film,
  Share,
  View
} from '@element-plus/icons-vue'

const props = defineProps({
  match: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['set-reminder', 'watch-live', 'watch-highlights', 'share'])

const router = useRouter()

// 计算属性
const statusConfig = {
  upcoming: { type: 'info', text: '即将开始', class: 'upcoming' },
  ongoing: { type: 'danger', text: '进行中', class: 'ongoing' },
  finished: { type: 'success', text: '已结束', class: 'finished' }
}

// 方法
const getStatusType = (status) => {
  return statusConfig[status]?.type || 'info'
}

const getStatusText = (status) => {
  return statusConfig[status]?.text || '未知'
}

const getMatchStatusClass = (status) => {
  return statusConfig[status]?.class || ''
}

const getOpponentRank = (opponent) => {
  // 模拟对手排名数据
  const ranks = {
    '马龙': '世界排名 #2',
    '张本智和': '世界排名 #4',
    '雨果·卡尔德拉诺': '世界排名 #6',
    '林高远': '世界排名 #7'
  }
  return ranks[opponent] || '世界排名 #10'
}

const getOpponentAvatar = (opponent) => {
  // 模拟对手头像
  const avatars = {
    '马龙': '/images/malong-avatar.jpg',
    '张本智和': '/images/zhangben-avatar.jpg',
    '雨果·卡尔德拉诺': '/images/hugo-avatar.jpg',
    '林高远': '/images/lingaoyuan-avatar.jpg'
  }
  return avatars[opponent] || ''
}

const formatMatchTime = (time) => {
  const date = new Date(time)
  const now = new Date()
  const diff = date - now
  
  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    if (days > 0) {
      return `${days}天后 ${date.toLocaleString('zh-CN')}`
    } else if (hours > 0) {
      return `${hours}小时后 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return `即将开始 ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
    }
  } else {
    return date.toLocaleString('zh-CN')
  }
}

const handleSetReminder = () => {
  emit('set-reminder', props.match.id)
}

const handleWatchLive = () => {
  emit('watch-live', props.match)
}

const handleWatchHighlights = () => {
  emit('watch-highlights', props.match)
}

const handleShare = () => {
  emit('share', props.match)
}

const handleViewDetail = () => {
  router.push(`/schedule/${props.match.id}`)
}
</script>

<style scoped>
.match-card {
  margin-bottom: 16px;
  transition: all 0.3s ease;
  border-left: 4px solid #e4e7ed;
}

.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.match-card.upcoming {
  border-left-color: #409eff;
}

.match-card.ongoing {
  border-left-color: #f56c6c;
  background: linear-gradient(135deg, #fff 0%, #fff5f5 100%);
}

.match-card.finished {
  border-left-color: #67c23a;
}

.match-content {
  padding: 0;
}

.match-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.match-round {
  font-size: 14px;
  color: #909399;
  font-weight: 500;
}

.tournament-name {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 16px 0;
  text-align: center;
}

.match-vs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.player {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.player-right {
  flex-direction: row-reverse;
  text-align: right;
}

.player-info {
  flex: 1;
}

.player-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.player-rank {
  font-size: 12px;
  color: #909399;
}

.vs-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 0 20px;
}

.vs-text {
  font-size: 14px;
  font-weight: 600;
  color: #909399;
}

.match-score {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  padding: 4px 12px;
  background: white;
  border-radius: 4px;
  border: 2px solid #e4e7ed;
}

.match-details {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #606266;
}

.match-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.match-actions .el-button {
  flex: 1;
  min-width: 100px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .match-vs {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .player {
    justify-content: center;
  }
  
  .player-right {
    flex-direction: row;
    text-align: center;
  }
  
  .vs-section {
    margin: 0;
  }
  
  .match-details {
    flex-direction: column;
    gap: 8px;
  }
  
  .match-actions {
    flex-direction: column;
  }
  
  .match-actions .el-button {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .tournament-name {
    font-size: 16px;
  }
  
  .player-name {
    font-size: 14px;
  }
  
  .match-score {
    font-size: 18px;
  }
  
  .match-status {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}

/* 动画效果 */
.match-card.ongoing {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 2px 12px rgba(245, 108, 108, 0.2);
  }
  50% {
    box-shadow: 0 2px 12px rgba(245, 108, 108, 0.4);
  }
  100% {
    box-shadow: 0 2px 12px rgba(245, 108, 108, 0.2);
  }
}
</style>
