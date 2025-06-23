<template>
  <el-card class="news-card" shadow="hover" @click="handleClick">
    <div class="news-content">
      <!-- 新闻图片 -->
      <div class="news-image" v-if="news.imageUrl">
        <el-image
          :src="news.imageUrl"
          :alt="news.title"
          fit="cover"
          lazy
          class="image"
        >
          <template #error>
            <div class="image-error">
              <el-icon><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        
        <!-- 分类标签 -->
        <div class="category-tag">
          <el-tag :type="getCategoryType(news.category)" size="small">
            {{ getCategoryLabel(news.category) }}
          </el-tag>
        </div>
      </div>

      <!-- 新闻信息 -->
      <div class="news-info">
        <!-- 标题 -->
        <h3 class="news-title" :title="news.title">
          {{ news.title }}
        </h3>

        <!-- 摘要 -->
        <p class="news-summary" v-if="news.summary">
          {{ news.summary }}
        </p>

        <!-- 元信息 -->
        <div class="news-meta">
          <div class="meta-left">
            <span class="news-source">
              <el-icon><Document /></el-icon>
              {{ news.source }}
            </span>
            <span class="news-time">
              <el-icon><Clock /></el-icon>
              {{ formatTime(news.publishTime) }}
            </span>
          </div>
          
          <div class="meta-right">
            <span class="news-stats">
              <el-icon><View /></el-icon>
              {{ formatNumber(news.readCount) }}
            </span>
            <span class="news-stats" v-if="news.likeCount">
              <el-icon><Star /></el-icon>
              {{ formatNumber(news.likeCount) }}
            </span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="news-actions" @click.stop>
          <el-button 
            size="small" 
            text 
            @click="handleLike"
            :class="{ 'is-liked': news.isLiked }"
          >
            <el-icon><Star /></el-icon>
            {{ news.isLiked ? '已点赞' : '点赞' }}
          </el-button>
          
          <el-button size="small" text @click="handleShare">
            <el-icon><Share /></el-icon>
            分享
          </el-button>
          
          <el-button size="small" text @click="handleFavorite">
            <el-icon><Collection /></el-icon>
            {{ news.isFavorited ? '已收藏' : '收藏' }}
          </el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  Picture,
  Document,
  Clock,
  View,
  Star,
  Share,
  Collection
} from '@element-plus/icons-vue'

const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'share', 'favorite'])

const router = useRouter()

// 计算属性
const categories = {
  match: { label: '比赛', type: 'success' },
  training: { label: '训练', type: 'info' },
  life: { label: '生活', type: 'warning' },
  honor: { label: '荣誉', type: 'danger' },
  interview: { label: '采访', type: '' }
}

// 方法
const getCategoryLabel = (category) => {
  return categories[category]?.label || '其他'
}

const getCategoryType = (category) => {
  return categories[category]?.type || ''
}

const formatTime = (time) => {
  const now = new Date()
  const publishTime = new Date(time)
  const diff = now - publishTime
  
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
    return publishTime.toLocaleDateString('zh-CN')
  }
}

const formatNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 10000) return (num / 1000).toFixed(1) + 'k'
  return (num / 10000).toFixed(1) + 'w'
}

const handleClick = () => {
  router.push(`/news/${props.news.id}`)
}

const handleLike = () => {
  emit('like', props.news.id)
}

const handleShare = () => {
  emit('share', props.news)
}

const handleFavorite = () => {
  emit('favorite', props.news.id)
}
</script>

<style scoped>
.news-card {
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.news-content {
  display: flex;
  gap: 16px;
}

.news-image {
  position: relative;
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
}

.image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  color: #c0c4cc;
  font-size: 24px;
}

.category-tag {
  position: absolute;
  top: 8px;
  left: 8px;
}

.news-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.news-title {
  font-size: 16px;
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

.news-summary {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 12px;
  color: #909399;
}

.meta-left,
.meta-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.news-source,
.news-time,
.news-stats {
  display: flex;
  align-items: center;
  gap: 4px;
}

.news-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.news-actions .el-button {
  padding: 4px 8px;
  font-size: 12px;
}

.news-actions .el-button.is-liked {
  color: #f56c6c;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .news-content {
    flex-direction: column;
    gap: 12px;
  }
  
  .news-image {
    width: 100%;
    height: 160px;
  }
  
  .news-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .meta-left,
  .meta-right {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .news-title {
    font-size: 14px;
  }
  
  .news-summary {
    font-size: 13px;
  }
  
  .news-actions {
    flex-wrap: wrap;
  }
}
</style>
