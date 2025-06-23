<template>
  <div class="gallery-page">
    <div class="page-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">精彩瞬间</h1>
          <p class="page-subtitle">樊振东比赛精彩图片和瞬间</p>

          <!-- 统计信息 -->
          <div class="stats-info">
            <div class="stat-item">
              <span class="stat-number">{{ galleryStore.total }}</span>
              <span class="stat-label">张图片</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ todayUploads }}</span>
              <span class="stat-label">今日上传</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalViews }}</span>
              <span class="stat-label">总浏览量</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="toolbar-left">
          <!-- 筛选器 -->
          <el-select
            v-model="selectedCategory"
            placeholder="选择分类"
            clearable
            @change="handleFilterChange"
            style="width: 120px;"
          >
            <el-option
              v-for="category in categories"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            />
          </el-select>

          <el-select
            v-model="selectedSort"
            @change="handleFilterChange"
            style="width: 120px;"
          >
            <el-option label="最新上传" value="latest" />
            <el-option label="最多点赞" value="popular" />
            <el-option label="最多浏览" value="views" />
          </el-select>

          <!-- 搜索 -->
          <el-input
            v-model="searchKeyword"
            placeholder="搜索图片..."
            :prefix-icon="Search"
            @keyup.enter="handleSearch"
            @clear="handleSearch"
            clearable
            style="width: 200px;"
          />
        </div>

        <div class="toolbar-right">
          <el-button @click="showUploadDialog = true" type="primary" :icon="Plus">
            上传图片
          </el-button>
          <el-button @click="handleRefresh" :icon="Refresh">
            刷新
          </el-button>
        </div>
      </div>

      <!-- 图片网格 -->
      <div class="gallery-content">
        <!-- 加载状态 -->
        <div v-if="galleryStore.loading && imageList.length === 0" class="loading-container">
          <el-skeleton :rows="3" animated />
        </div>

        <!-- 空状态 -->
        <div v-else-if="!galleryStore.loading && imageList.length === 0" class="empty-container">
          <el-empty description="暂无图片">
            <el-button type="primary" @click="showUploadDialog = true">
              上传第一张图片
            </el-button>
          </el-empty>
        </div>

        <!-- 瀑布流布局 -->
        <div v-else class="masonry-grid" ref="masonryRef">
          <ImageCard
            v-for="image in imageList"
            :key="image.id"
            :image="image"
            @like="handleLike"
            @download="handleDownload"
            @share="handleShare"
            @favorite="handleFavorite"
            @report="handleReport"
            @tag-click="handleTagClick"
            @image-click="handleImageClick"
          />
        </div>

        <!-- 加载更多 -->
        <div v-if="galleryStore.hasMore" class="load-more">
          <el-button
            @click="handleLoadMore"
            :loading="galleryStore.loading"
            size="large"
            style="width: 200px;"
          >
            {{ galleryStore.loading ? '加载中...' : '加载更多' }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 上传对话框 -->
    <el-dialog
      v-model="showUploadDialog"
      title="上传图片"
      width="600px"
      :close-on-click-modal="false"
    >
      <ImageUpload
        @upload-success="handleUploadSuccess"
        @upload-error="handleUploadError"
      />
    </el-dialog>

    <!-- 图片详情对话框 -->
    <el-dialog
      v-model="showImageDialog"
      :title="selectedImage?.title"
      width="80%"
      :close-on-click-modal="true"
    >
      <div v-if="selectedImage" class="image-detail">
        <div class="detail-image">
          <el-image
            :src="selectedImage.url"
            :alt="selectedImage.title"
            fit="contain"
            style="width: 100%; max-height: 60vh;"
          />
        </div>

        <div class="detail-info">
          <h3>{{ selectedImage.title }}</h3>
          <p v-if="selectedImage.description">{{ selectedImage.description }}</p>

          <div class="detail-meta">
            <div class="meta-item">
              <span class="meta-label">分类：</span>
              <el-tag :type="getCategoryType(selectedImage.category)">
                {{ getCategoryLabel(selectedImage.category) }}
              </el-tag>
            </div>

            <div class="meta-item" v-if="selectedImage.tags?.length">
              <span class="meta-label">标签：</span>
              <el-tag
                v-for="tag in selectedImage.tags"
                :key="tag"
                size="small"
                class="tag-item"
              >
                {{ tag }}
              </el-tag>
            </div>

            <div class="meta-item">
              <span class="meta-label">上传者：</span>
              <span>{{ selectedImage.uploader }}</span>
            </div>

            <div class="meta-item">
              <span class="meta-label">上传时间：</span>
              <span>{{ formatFullTime(selectedImage.uploadTime) }}</span>
            </div>

            <div class="meta-item">
              <span class="meta-label">统计：</span>
              <span>{{ selectedImage.views }} 次浏览，{{ selectedImage.likes }} 次点赞</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useGalleryStore } from '@/stores'
import ImageCard from '@/components/business/ImageCard.vue'
import ImageUpload from '@/components/business/ImageUpload.vue'
import { Search, Plus, Refresh } from '@element-plus/icons-vue'

const galleryStore = useGalleryStore()

// 响应式数据
const selectedCategory = ref('')
const selectedSort = ref('latest')
const searchKeyword = ref('')
const showUploadDialog = ref(false)
const showImageDialog = ref(false)
const selectedImage = ref(null)
const masonryRef = ref()
const todayUploads = ref(23)
const totalViews = ref(156789)

// 分类选项
const categories = ref([
  { value: '', label: '全部分类' },
  { value: 'match', label: '比赛' },
  { value: 'training', label: '训练' },
  { value: 'life', label: '生活' },
  { value: 'award', label: '颁奖' },
  { value: 'fan', label: '球迷' }
])

// 计算属性
const imageList = computed(() => galleryStore.filteredImages)

// 生命周期
onMounted(() => {
  initPage()
  initMasonry()
})

onUnmounted(() => {
  // 清理资源
})

// 方法
const initPage = async () => {
  try {
    await galleryStore.fetchImages()
  } catch (error) {
    ElMessage.error('获取图片数据失败')
  }
}

const initMasonry = () => {
  // 初始化瀑布流布局
  nextTick(() => {
    if (masonryRef.value) {
      // 这里可以集成第三方瀑布流库，如 Masonry.js
      // 或者使用 CSS Grid 实现
    }
  })
}

const handleFilterChange = () => {
  galleryStore.updateFilters({
    category: selectedCategory.value,
    sortBy: selectedSort.value
  })
  galleryStore.fetchImages()
}

const handleSearch = () => {
  galleryStore.updateFilters({
    keyword: searchKeyword.value.trim()
  })
  galleryStore.fetchImages()
}

const handleRefresh = () => {
  galleryStore.fetchImages()
  updateStats()
}

const handleLoadMore = () => {
  galleryStore.setPage(galleryStore.currentPage + 1)
  galleryStore.fetchImages({ append: true })
}

const updateStats = () => {
  todayUploads.value = Math.floor(Math.random() * 50) + 10
  totalViews.value = Math.floor(Math.random() * 100000) + 100000
}

const handleLike = async (imageId) => {
  try {
    await galleryStore.likeImage(imageId)
    ElMessage.success('点赞成功')
  } catch (error) {
    ElMessage.error('点赞失败')
  }
}

const handleDownload = (image) => {
  // 创建下载链接
  const link = document.createElement('a')
  link.href = image.url
  link.download = `${image.title}.jpg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  ElMessage.success('开始下载')
}

const handleShare = (image) => {
  const shareUrl = window.location.origin + `/gallery/${image.id}`

  if (navigator.share) {
    navigator.share({
      title: image.title,
      text: image.description,
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

const handleFavorite = async (imageId) => {
  try {
    await galleryStore.favoriteImage(imageId)
    ElMessage.success('收藏成功')
  } catch (error) {
    ElMessage.error('收藏失败')
  }
}

const handleReport = async (imageId) => {
  try {
    const { value: reason } = await ElMessageBox.prompt(
      '请说明举报原因',
      '举报图片',
      {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入举报原因...'
      }
    )

    if (reason) {
      await galleryStore.reportImage(imageId, reason)
      ElMessage.success('举报已提交，我们会尽快处理')
    }
  } catch (error) {
    // 用户取消或其他错误
  }
}

const handleTagClick = (tag) => {
  searchKeyword.value = tag
  handleSearch()
}

const handleImageClick = (image) => {
  selectedImage.value = image
  showImageDialog.value = true

  // 增加浏览量
  galleryStore.incrementViewCount(image.id)
}

const handleUploadSuccess = (response, file) => {
  showUploadDialog.value = false
  ElMessage.success('上传成功')

  // 刷新图片列表
  galleryStore.fetchImages()
  updateStats()
}

const handleUploadError = (error, file) => {
  ElMessage.error('上传失败，请重试')
}

// 工具方法
const getCategoryLabel = (category) => {
  const cat = categories.value.find(c => c.value === category)
  return cat?.label || '其他'
}

const getCategoryType = (category) => {
  const types = {
    match: 'success',
    training: 'info',
    life: 'warning',
    award: 'danger',
    fan: ''
  }
  return types[category] || ''
}

const formatFullTime = (time) => {
  return new Date(time).toLocaleString('zh-CN')
}
</script>

<style scoped>
.gallery-page {
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
  gap: 30px;
}

.stat-item {
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

.toolbar-left,
.toolbar-right {
  display: flex;
  gap: 12px;
  align-items: center;
}

.gallery-content {
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

.masonry-grid {
  columns: 4;
  column-gap: 16px;
  column-fill: balance;
}

.load-more {
  text-align: center;
  margin: 30px 0;
}

.image-detail {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-image {
  text-align: center;
}

.detail-info h3 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 18px;
}

.detail-info p {
  margin: 0 0 16px 0;
  color: #606266;
  line-height: 1.6;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-label {
  font-weight: 600;
  color: #303133;
  min-width: 80px;
}

.tag-item {
  margin-right: 4px;
}

/* 响应式瀑布流 */
@media (max-width: 1200px) {
  .masonry-grid {
    columns: 3;
  }
}

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

  .stats-info {
    flex-direction: column;
    gap: 16px;
  }

  .toolbar {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .toolbar-left,
  .toolbar-right {
    justify-content: center;
    flex-wrap: wrap;
  }

  .gallery-content {
    padding: 16px;
  }

  .masonry-grid {
    columns: 2;
    column-gap: 12px;
  }

  .image-detail {
    gap: 16px;
  }

  .detail-meta {
    gap: 8px;
  }

  .meta-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .meta-label {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .toolbar-left,
  .toolbar-right {
    flex-direction: column;
    width: 100%;
  }

  .toolbar-left > *,
  .toolbar-right > * {
    width: 100%;
  }

  .masonry-grid {
    columns: 1;
  }
}

/* 动画效果 */
.masonry-grid {
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
</style>
