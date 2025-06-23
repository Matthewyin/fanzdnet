<template>
  <div class="news-filter">
    <el-card class="filter-card">
      <div class="filter-content">
        <!-- 搜索框 -->
        <div class="search-section">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索新闻标题或内容..."
            :prefix-icon="Search"
            size="large"
            clearable
            @keyup.enter="handleSearch"
            @clear="handleSearch"
            class="search-input"
          >
            <template #append>
              <el-button @click="handleSearch" :icon="Search">搜索</el-button>
            </template>
          </el-input>
        </div>

        <!-- 筛选条件 -->
        <div class="filter-section">
          <div class="filter-row">
            <!-- 分类筛选 -->
            <div class="filter-item">
              <label class="filter-label">分类：</label>
              <el-select
                v-model="selectedCategory"
                placeholder="选择分类"
                clearable
                @change="handleFilterChange"
                class="filter-select"
              >
                <el-option
                  v-for="category in categories"
                  :key="category.value"
                  :label="category.label"
                  :value="category.value"
                />
              </el-select>
            </div>

            <!-- 时间范围 -->
            <div class="filter-item">
              <label class="filter-label">时间：</label>
              <el-select
                v-model="selectedTimeRange"
                placeholder="选择时间范围"
                clearable
                @change="handleFilterChange"
                class="filter-select"
              >
                <el-option label="今天" value="today" />
                <el-option label="本周" value="week" />
                <el-option label="本月" value="month" />
                <el-option label="最近三个月" value="quarter" />
              </el-select>
            </div>

            <!-- 排序方式 */
            <div class="filter-item">
              <label class="filter-label">排序：</label>
              <el-select
                v-model="selectedSort"
                @change="handleFilterChange"
                class="filter-select"
              >
                <el-option label="最新发布" value="latest" />
                <el-option label="最多阅读" value="popular" />
                <el-option label="最多点赞" value="liked" />
              </el-select>
            </div>

            <!-- 重置按钮 -->
            <div class="filter-item">
              <el-button @click="handleReset" :icon="Refresh">
                重置
              </el-button>
            </div>
          </div>
        </div>

        <!-- 快速筛选标签 -->
        <div class="quick-filter-section" v-if="showQuickFilters">
          <div class="quick-filter-title">快速筛选：</div>
          <div class="quick-filter-tags">
            <el-tag
              v-for="tag in quickFilters"
              :key="tag.value"
              :type="tag.value === selectedCategory ? 'primary' : ''"
              :effect="tag.value === selectedCategory ? 'dark' : 'plain'"
              @click="handleQuickFilter(tag.value)"
              class="quick-tag"
            >
              {{ tag.label }}
            </el-tag>
          </div>
        </div>

        <!-- 搜索历史 -->
        <div class="search-history-section" v-if="showSearchHistory && searchHistory.length">
          <div class="history-title">
            <span>搜索历史</span>
            <el-button text size="small" @click="clearSearchHistory">
              <el-icon><Delete /></el-icon>
              清空
            </el-button>
          </div>
          <div class="history-tags">
            <el-tag
              v-for="(keyword, index) in searchHistory"
              :key="index"
              @click="handleHistoryClick(keyword)"
              @close="removeSearchHistory(index)"
              closable
              class="history-tag"
            >
              {{ keyword }}
            </el-tag>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, Refresh, Delete } from '@element-plus/icons-vue'

const props = defineProps({
  showQuickFilters: {
    type: Boolean,
    default: true
  },
  showSearchHistory: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['search', 'filter-change'])

// 响应式数据
const searchKeyword = ref('')
const selectedCategory = ref('')
const selectedTimeRange = ref('')
const selectedSort = ref('latest')
const searchHistory = ref([])

// 分类选项
const categories = ref([
  { value: '', label: '全部分类' },
  { value: 'match', label: '比赛' },
  { value: 'training', label: '训练' },
  { value: 'life', label: '生活' },
  { value: 'honor', label: '荣誉' },
  { value: 'interview', label: '采访' }
])

// 快速筛选标签
const quickFilters = computed(() => {
  return categories.value.slice(1) // 排除"全部分类"
})

// 方法
const handleSearch = () => {
  const keyword = searchKeyword.value.trim()
  if (keyword) {
    addToSearchHistory(keyword)
  }
  
  emit('search', {
    keyword,
    category: selectedCategory.value,
    timeRange: selectedTimeRange.value,
    sort: selectedSort.value
  })
}

const handleFilterChange = () => {
  emit('filter-change', {
    keyword: searchKeyword.value.trim(),
    category: selectedCategory.value,
    timeRange: selectedTimeRange.value,
    sort: selectedSort.value
  })
}

const handleReset = () => {
  searchKeyword.value = ''
  selectedCategory.value = ''
  selectedTimeRange.value = ''
  selectedSort.value = 'latest'
  handleFilterChange()
}

const handleQuickFilter = (category) => {
  selectedCategory.value = selectedCategory.value === category ? '' : category
  handleFilterChange()
}

const handleHistoryClick = (keyword) => {
  searchKeyword.value = keyword
  handleSearch()
}

const addToSearchHistory = (keyword) => {
  // 移除重复项
  const index = searchHistory.value.indexOf(keyword)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  
  // 添加到开头
  searchHistory.value.unshift(keyword)
  
  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }
  
  // 保存到本地存储
  localStorage.setItem('news-search-history', JSON.stringify(searchHistory.value))
}

const removeSearchHistory = (index) => {
  searchHistory.value.splice(index, 1)
  localStorage.setItem('news-search-history', JSON.stringify(searchHistory.value))
}

const clearSearchHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('news-search-history')
}

// 生命周期
onMounted(() => {
  // 从本地存储恢复搜索历史
  const saved = localStorage.getItem('news-search-history')
  if (saved) {
    try {
      searchHistory.value = JSON.parse(saved)
    } catch (error) {
      console.error('Failed to parse search history:', error)
    }
  }
})
</script>

<style scoped>
.news-filter {
  margin-bottom: 20px;
}

.filter-card {
  border-radius: 8px;
}

.filter-content {
  padding: 0;
}

.search-section {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
}

.filter-section {
  margin-bottom: 16px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
}

.filter-select {
  width: 140px;
}

.quick-filter-section {
  margin-bottom: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.quick-filter-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 8px;
}

.quick-filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.quick-tag {
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-tag:hover {
  transform: translateY(-1px);
}

.search-history-section {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.history-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}

.history-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.history-tag {
  cursor: pointer;
  transition: all 0.3s ease;
}

.history-tag:hover {
  background-color: #f0f0f0;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .filter-item {
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
  }
  
  .filter-select {
    width: 100%;
  }
  
  .quick-filter-tags,
  .history-tags {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .filter-content {
    padding: 0;
  }
  
  .search-section {
    margin-bottom: 12px;
  }
  
  .filter-section {
    margin-bottom: 12px;
  }
  
  .quick-filter-section,
  .search-history-section {
    margin-bottom: 12px;
    padding-top: 12px;
  }
}
</style>
