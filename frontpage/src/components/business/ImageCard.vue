<template>
  <div class="image-card" @click="handleImageClick">
    <div class="image-container">
      <!-- 图片 -->
      <el-image
        :src="image.thumbnailUrl || image.url"
        :alt="image.title"
        fit="cover"
        lazy
        class="card-image"
        :preview-src-list="[image.url]"
        :initial-index="0"
        preview-teleported
      >
        <template #error>
          <div class="image-error">
            <el-icon><Picture /></el-icon>
            <span>加载失败</span>
          </div>
        </template>
        <template #placeholder>
          <div class="image-placeholder">
            <el-icon><Loading /></el-icon>
          </div>
        </template>
      </el-image>

      <!-- 悬浮操作层 -->
      <div class="image-overlay">
        <div class="overlay-actions">
          <el-button 
            circle 
            size="small" 
            @click.stop="handleLike"
            :type="image.isLiked ? 'danger' : ''"
            :class="{ 'is-liked': image.isLiked }"
          >
            <el-icon><Star /></el-icon>
          </el-button>
          
          <el-button circle size="small" @click.stop="handleDownload">
            <el-icon><Download /></el-icon>
          </el-button>
          
          <el-button circle size="small" @click.stop="handleShare">
            <el-icon><Share /></el-icon>
          </el-button>
          
          <el-dropdown @command="handleMoreAction" @click.stop>
            <el-button circle size="small">
              <el-icon><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="favorite">
                  <el-icon><Collection /></el-icon>
                  {{ image.isFavorited ? '取消收藏' : '收藏' }}
                </el-dropdown-item>
                <el-dropdown-item command="report" divided>
                  <el-icon><Warning /></el-icon>
                  举报
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 图片信息 -->
        <div class="image-info">
          <div class="image-stats">
            <span class="stat-item">
              <el-icon><View /></el-icon>
              {{ formatNumber(image.views) }}
            </span>
            <span class="stat-item">
              <el-icon><Star /></el-icon>
              {{ formatNumber(image.likes) }}
            </span>
          </div>
        </div>
      </div>

      <!-- 分类标签 -->
      <div class="category-tag" v-if="image.category">
        <el-tag :type="getCategoryType(image.category)" size="small">
          {{ getCategoryLabel(image.category) }}
        </el-tag>
      </div>

      <!-- 状态标识 -->
      <div class="status-badge" v-if="image.status !== 'approved'">
        <el-tag :type="getStatusType(image.status)" size="small">
          {{ getStatusText(image.status) }}
        </el-tag>
      </div>
    </div>

    <!-- 图片详情 -->
    <div class="image-details">
      <h3 class="image-title" :title="image.title">
        {{ image.title }}
      </h3>
      
      <p class="image-description" v-if="image.description">
        {{ image.description }}
      </p>

      <!-- 标签 -->
      <div class="image-tags" v-if="image.tags && image.tags.length">
        <el-tag
          v-for="tag in image.tags.slice(0, 3)"
          :key="tag"
          size="small"
          class="tag-item"
          @click.stop="handleTagClick(tag)"
        >
          {{ tag }}
        </el-tag>
        <span v-if="image.tags.length > 3" class="more-tags">
          +{{ image.tags.length - 3 }}
        </span>
      </div>

      <!-- 上传信息 -->
      <div class="upload-info">
        <div class="uploader">
          <el-avatar :src="image.uploaderAvatar" :size="20">
            {{ image.uploader?.charAt(0) }}
          </el-avatar>
          <span class="uploader-name">{{ image.uploader }}</span>
        </div>
        <span class="upload-time">{{ formatTime(image.uploadTime) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Picture,
  Loading,
  Star,
  Download,
  Share,
  MoreFilled,
  Collection,
  Warning,
  View
} from '@element-plus/icons-vue'

const props = defineProps({
  image: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'download', 'share', 'favorite', 'report', 'tag-click', 'image-click'])

// 分类配置
const categories = {
  match: { label: '比赛', type: 'success' },
  training: { label: '训练', type: 'info' },
  life: { label: '生活', type: 'warning' },
  award: { label: '颁奖', type: 'danger' },
  fan: { label: '球迷', type: '' }
}

// 状态配置
const statusConfig = {
  pending: { type: 'warning', text: '待审核' },
  approved: { type: 'success', text: '已通过' },
  rejected: { type: 'danger', text: '已拒绝' }
}

// 方法
const getCategoryLabel = (category) => {
  return categories[category]?.label || '其他'
}

const getCategoryType = (category) => {
  return categories[category]?.type || ''
}

const getStatusType = (status) => {
  return statusConfig[status]?.type || 'info'
}

const getStatusText = (status) => {
  return statusConfig[status]?.text || '未知'
}

const formatNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 10000) return (num / 1000).toFixed(1) + 'k'
  return (num / 10000).toFixed(1) + 'w'
}

const formatTime = (time) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now - date
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}

const handleImageClick = () => {
  emit('image-click', props.image)
}

const handleLike = () => {
  emit('like', props.image.id)
}

const handleDownload = () => {
  emit('download', props.image)
}

const handleShare = () => {
  emit('share', props.image)
}

const handleMoreAction = (command) => {
  switch (command) {
    case 'favorite':
      emit('favorite', props.image.id)
      break
    case 'report':
      emit('report', props.image.id)
      break
  }
}

const handleTagClick = (tag) => {
  emit('tag-click', tag)
}
</script>

<style scoped>
.image-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  break-inside: avoid;
  margin-bottom: 16px;
}

.image-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-card:hover .card-image {
  transform: scale(1.05);
}

.image-error,
.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: #f5f7fa;
  color: #c0c4cc;
}

.image-error span {
  margin-top: 8px;
  font-size: 12px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.overlay-actions {
  display: flex;
  gap: 8px;
  align-self: flex-end;
}

.overlay-actions .el-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  backdrop-filter: blur(4px);
}

.overlay-actions .el-button.is-liked {
  background: #f56c6c;
  color: white;
}

.image-info {
  align-self: flex-end;
  width: 100%;
}

.image-stats {
  display: flex;
  gap: 12px;
  color: white;
  font-size: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

.category-tag {
  position: absolute;
  top: 8px;
  left: 8px;
}

.status-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}

.image-details {
  padding: 12px;
}

.image-title {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-description {
  font-size: 12px;
  color: #606266;
  line-height: 1.4;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-item:hover {
  transform: scale(1.05);
}

.more-tags {
  font-size: 12px;
  color: #909399;
}

.upload-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #909399;
}

.uploader {
  display: flex;
  align-items: center;
  gap: 6px;
}

.uploader-name {
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.upload-time {
  flex-shrink: 0;
}

/* 响应式样式 */
@media (max-width: 480px) {
  .image-details {
    padding: 8px;
  }
  
  .image-title {
    font-size: 13px;
  }
  
  .image-description {
    font-size: 11px;
  }
  
  .overlay-actions {
    gap: 6px;
  }
  
  .overlay-actions .el-button {
    padding: 6px;
  }
  
  .image-stats {
    gap: 8px;
  }
  
  .stat-item {
    padding: 2px 6px;
  }
}
</style>
