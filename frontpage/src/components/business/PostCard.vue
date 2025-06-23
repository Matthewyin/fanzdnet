<template>
  <el-card class="post-card" shadow="hover">
    <div class="post-content">
      <!-- 帖子头部 -->
      <div class="post-header">
        <div class="author-info">
          <el-avatar :src="post.authorAvatar" :size="40">
            {{ post.author?.charAt(0) }}
          </el-avatar>
          <div class="author-details">
            <div class="author-name">{{ post.author }}</div>
            <div class="post-time">{{ formatTime(post.createTime) }}</div>
          </div>
        </div>
        
        <div class="post-actions">
          <!-- 置顶标识 -->
          <el-tag v-if="post.isTop" type="danger" size="small">
            <el-icon><Top /></el-icon>
            置顶
          </el-tag>
          
          <!-- 分类标签 -->
          <el-tag :type="getCategoryType(post.category)" size="small">
            {{ getCategoryLabel(post.category) }}
          </el-tag>
          
          <!-- 更多操作 -->
          <el-dropdown @command="handleCommand" trigger="click">
            <el-button text size="small">
              <el-icon><MoreFilled /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="share">
                  <el-icon><Share /></el-icon>
                  分享
                </el-dropdown-item>
                <el-dropdown-item command="favorite">
                  <el-icon><Collection /></el-icon>
                  {{ post.isFavorited ? '取消收藏' : '收藏' }}
                </el-dropdown-item>
                <el-dropdown-item command="report" divided>
                  <el-icon><Warning /></el-icon>
                  举报
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 帖子标题 -->
      <h3 class="post-title" @click="handleTitleClick">
        {{ post.title }}
      </h3>

      <!-- 帖子内容 -->
      <div class="post-body">
        <p class="post-text">{{ post.content }}</p>
        
        <!-- 图片展示 -->
        <div v-if="post.images && post.images.length" class="post-images">
          <el-image
            v-for="(image, index) in post.images.slice(0, 9)"
            :key="index"
            :src="image"
            :preview-src-list="post.images"
            :initial-index="index"
            fit="cover"
            class="post-image"
            preview-teleported
          />
          <div v-if="post.images.length > 9" class="more-images">
            +{{ post.images.length - 9 }}
          </div>
        </div>
      </div>

      <!-- 标签 -->
      <div v-if="post.tags && post.tags.length" class="post-tags">
        <el-tag
          v-for="tag in post.tags"
          :key="tag"
          size="small"
          class="tag-item"
          @click="handleTagClick(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>

      <!-- 帖子底部 -->
      <div class="post-footer">
        <div class="post-stats">
          <span class="stat-item">
            <el-icon><View /></el-icon>
            {{ formatNumber(post.views) }}
          </span>
          <span class="stat-item">
            <el-icon><ChatDotRound /></el-icon>
            {{ formatNumber(post.comments) }}
          </span>
          <span class="stat-item">
            <el-icon><Star /></el-icon>
            {{ formatNumber(post.likes) }}
          </span>
        </div>

        <div class="post-interactions">
          <el-button 
            text 
            size="small"
            @click="handleLike"
            :class="{ 'is-liked': post.isLiked }"
          >
            <el-icon><Star /></el-icon>
            {{ post.isLiked ? '已点赞' : '点赞' }}
          </el-button>
          
          <el-button text size="small" @click="handleComment">
            <el-icon><ChatDotRound /></el-icon>
            评论
          </el-button>
          
          <el-button text size="small" @click="handleShare">
            <el-icon><Share /></el-icon>
            分享
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
  Top,
  MoreFilled,
  Share,
  Collection,
  Warning,
  View,
  ChatDotRound,
  Star
} from '@element-plus/icons-vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'comment', 'share', 'favorite', 'report', 'tag-click'])

const router = useRouter()

// 分类配置
const categories = {
  discussion: { label: '讨论', type: '' },
  news: { label: '新闻', type: 'success' },
  match: { label: '比赛', type: 'warning' },
  support: { label: '应援', type: 'danger' },
  question: { label: '提问', type: 'info' }
}

// 方法
const getCategoryLabel = (category) => {
  return categories[category]?.label || '其他'
}

const getCategoryType = (category) => {
  return categories[category]?.type || ''
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

const formatNumber = (num) => {
  if (num < 1000) return num.toString()
  if (num < 10000) return (num / 1000).toFixed(1) + 'k'
  return (num / 10000).toFixed(1) + 'w'
}

const handleTitleClick = () => {
  router.push(`/community/post/${props.post.id}`)
}

const handleLike = () => {
  emit('like', props.post.id)
}

const handleComment = () => {
  emit('comment', props.post.id)
}

const handleShare = () => {
  emit('share', props.post)
}

const handleCommand = (command) => {
  switch (command) {
    case 'share':
      handleShare()
      break
    case 'favorite':
      emit('favorite', props.post.id)
      break
    case 'report':
      emit('report', props.post.id)
      break
  }
}

const handleTagClick = (tag) => {
  emit('tag-click', tag)
}
</script>

<style scoped>
.post-card {
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.post-content {
  padding: 0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.post-time {
  font-size: 12px;
  color: #909399;
}

.post-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.post-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
  line-height: 1.4;
  cursor: pointer;
  transition: color 0.3s ease;
}

.post-title:hover {
  color: #409eff;
}

.post-body {
  margin-bottom: 16px;
}

.post-text {
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.post-image {
  width: 100%;
  height: 80px;
  border-radius: 4px;
  cursor: pointer;
}

.more-images {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  color: #909399;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-item:hover {
  transform: scale(1.05);
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.post-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.post-interactions {
  display: flex;
  gap: 8px;
}

.post-interactions .el-button {
  padding: 4px 8px;
  font-size: 12px;
}

.post-interactions .el-button.is-liked {
  color: #f56c6c;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .post-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .post-actions {
    justify-content: flex-end;
  }
  
  .post-title {
    font-size: 15px;
  }
  
  .post-text {
    font-size: 13px;
  }
  
  .post-images {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .post-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .post-stats {
    justify-content: center;
  }
  
  .post-interactions {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .author-info {
    gap: 8px;
  }
  
  .post-title {
    font-size: 14px;
  }
  
  .post-text {
    font-size: 12px;
    -webkit-line-clamp: 2;
  }
  
  .post-images {
    grid-template-columns: 1fr;
  }
  
  .post-image {
    height: 120px;
  }
  
  .post-stats {
    gap: 12px;
  }
  
  .post-interactions {
    flex-wrap: wrap;
    gap: 6px;
  }
}
</style>
