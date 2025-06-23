<template>
  <div class="ai-generator">
    <el-card class="generator-card">
      <template #header>
        <div class="generator-header">
          <h3>AI智能应援物生成器</h3>
          <span class="generator-subtitle">为樊振东创造独特的应援内容</span>
        </div>
      </template>

      <div class="generator-content">
        <!-- 生成类型选择 -->
        <div class="type-selector">
          <h4>选择生成类型</h4>
          <el-radio-group v-model="selectedType" @change="handleTypeChange">
            <el-radio-button
              v-for="type in generatorTypes"
              :key="type.value"
              :value="type.value"
              class="type-button"
            >
              <div class="type-content">
                <el-icon class="type-icon">
                  <component :is="type.icon" />
                </el-icon>
                <span class="type-label">{{ type.label }}</span>
              </div>
            </el-radio-button>
          </el-radio-group>
        </div>

        <!-- 参数配置 -->
        <div class="parameter-config">
          <h4>配置参数</h4>
          
          <!-- 通用参数 -->
          <el-form :model="generateParams" label-width="100px">
            <el-form-item label="主题风格">
              <el-select v-model="generateParams.theme" placeholder="选择主题风格">
                <el-option
                  v-for="theme in themes"
                  :key="theme.value"
                  :label="theme.label"
                  :value="theme.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="情感色彩">
              <el-select v-model="generateParams.emotion" placeholder="选择情感色彩">
                <el-option
                  v-for="emotion in emotions"
                  :key="emotion.value"
                  :label="emotion.label"
                  :value="emotion.value"
                />
              </el-select>
            </el-form-item>

            <!-- 口号特定参数 -->
            <template v-if="selectedType === 'slogan'">
              <el-form-item label="口号长度">
                <el-slider
                  v-model="generateParams.length"
                  :min="5"
                  :max="20"
                  :marks="{ 5: '简短', 10: '适中', 20: '详细' }"
                  show-stops
                />
              </el-form-item>
              
              <el-form-item label="包含元素">
                <el-checkbox-group v-model="generateParams.elements">
                  <el-checkbox value="name">包含姓名</el-checkbox>
                  <el-checkbox value="technique">技术特点</el-checkbox>
                  <el-checkbox value="achievement">成就荣誉</el-checkbox>
                  <el-checkbox value="spirit">精神品质</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </template>

            <!-- 横幅特定参数 -->
            <template v-if="selectedType === 'banner'">
              <el-form-item label="横幅尺寸">
                <el-select v-model="generateParams.size" placeholder="选择横幅尺寸">
                  <el-option label="小型 (1m x 0.5m)" value="small" />
                  <el-option label="中型 (2m x 1m)" value="medium" />
                  <el-option label="大型 (4m x 2m)" value="large" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="颜色方案">
                <el-select v-model="generateParams.colorScheme" placeholder="选择颜色方案">
                  <el-option label="经典红白" value="red-white" />
                  <el-option label="蓝色系" value="blue" />
                  <el-option label="金色系" value="gold" />
                  <el-option label="彩虹色" value="rainbow" />
                </el-select>
              </el-form-item>
            </template>

            <!-- 表情包特定参数 -->
            <template v-if="selectedType === 'meme'">
              <el-form-item label="表情风格">
                <el-select v-model="generateParams.style" placeholder="选择表情风格">
                  <el-option label="可爱萌系" value="cute" />
                  <el-option label="搞笑幽默" value="funny" />
                  <el-option label="霸气威武" value="cool" />
                  <el-option label="温馨感人" value="warm" />
                </el-select>
              </el-form-item>
              
              <el-form-item label="文字内容">
                <el-input
                  v-model="generateParams.text"
                  placeholder="输入表情包文字（可选）"
                  maxlength="20"
                  show-word-limit
                />
              </el-form-item>
            </template>

            <el-form-item label="创意提示">
              <el-input
                v-model="generateParams.prompt"
                type="textarea"
                :rows="3"
                placeholder="描述你想要的创意内容，AI会根据你的描述生成更符合期望的结果..."
                maxlength="200"
                show-word-limit
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 生成按钮 -->
        <div class="generate-actions">
          <el-button
            type="primary"
            size="large"
            @click="handleGenerate"
            :loading="aiStore.loading"
            :disabled="!selectedType"
            class="generate-btn"
          >
            <el-icon><MagicStick /></el-icon>
            {{ aiStore.loading ? '生成中...' : '开始生成' }}
          </el-button>
          
          <el-button
            size="large"
            @click="handleReset"
            :disabled="aiStore.loading"
          >
            <el-icon><Refresh /></el-icon>
            重置参数
          </el-button>
        </div>

        <!-- 生成结果 -->
        <div v-if="generatedResults.length > 0" class="results-section">
          <h4>生成结果</h4>
          
          <div class="results-grid">
            <div
              v-for="(result, index) in generatedResults"
              :key="index"
              class="result-item"
              @click="handleResultClick(result)"
            >
              <div class="result-content">
                <!-- 口号结果 -->
                <div v-if="selectedType === 'slogan'" class="slogan-result">
                  <div class="slogan-text">{{ result.content }}</div>
                  <div class="slogan-meta">
                    <el-tag size="small">{{ result.theme }}</el-tag>
                    <el-tag size="small" type="success">{{ result.emotion }}</el-tag>
                  </div>
                </div>

                <!-- 横幅结果 -->
                <div v-else-if="selectedType === 'banner'" class="banner-result">
                  <div class="banner-preview" :style="{ background: result.background }">
                    <div class="banner-text" :style="{ color: result.textColor }">
                      {{ result.content }}
                    </div>
                  </div>
                  <div class="banner-meta">
                    <span>{{ result.size }} | {{ result.colorScheme }}</span>
                  </div>
                </div>

                <!-- 表情包结果 -->
                <div v-else-if="selectedType === 'meme'" class="meme-result">
                  <div class="meme-preview">
                    <img :src="result.imageUrl" :alt="result.content" />
                    <div v-if="result.text" class="meme-text">{{ result.text }}</div>
                  </div>
                  <div class="meme-meta">
                    <el-tag size="small">{{ result.style }}</el-tag>
                  </div>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="result-actions">
                <el-button size="small" @click.stop="handleLike(result)">
                  <el-icon><Star /></el-icon>
                  {{ result.liked ? '已点赞' : '点赞' }}
                </el-button>
                
                <el-button size="small" @click.stop="handleDownload(result)">
                  <el-icon><Download /></el-icon>
                  下载
                </el-button>
                
                <el-button size="small" @click.stop="handleShare(result)">
                  <el-icon><Share /></el-icon>
                  分享
                </el-button>
              </div>
            </div>
          </div>

          <!-- 批量操作 -->
          <div class="batch-actions">
            <el-button @click="handleRegenerateAll">
              <el-icon><Refresh /></el-icon>
              重新生成全部
            </el-button>
            
            <el-button @click="handleDownloadAll">
              <el-icon><FolderOpened /></el-icon>
              批量下载
            </el-button>
          </div>
        </div>

        <!-- 使用统计 -->
        <div class="usage-stats">
          <el-alert
            :title="`今日已使用 ${aiStore.todayUsage}/${aiStore.dailyLimit} 次`"
            type="info"
            :closable="false"
            show-icon
          >
            <template #default>
              <div class="stats-content">
                <el-progress
                  :percentage="(aiStore.todayUsage / aiStore.dailyLimit) * 100"
                  :stroke-width="6"
                  :show-text="false"
                />
                <span class="stats-text">
                  {{ aiStore.dailyLimit - aiStore.todayUsage }} 次剩余
                </span>
              </div>
            </template>
          </el-alert>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAIGeneratorStore } from '@/stores'
import {
  MagicStick,
  Refresh,
  Star,
  Download,
  Share,
  FolderOpened,
  ChatDotRound,
  PictureRounded,
  Sunny
} from '@element-plus/icons-vue'

const aiStore = useAIGeneratorStore()

// 响应式数据
const selectedType = ref('')
const generatedResults = ref([])

// 生成器类型
const generatorTypes = ref([
  {
    value: 'slogan',
    label: '应援口号',
    icon: 'ChatDotRound',
    description: '生成朗朗上口的应援口号'
  },
  {
    value: 'banner',
    label: '应援横幅',
    icon: 'PictureRounded',
    description: '设计精美的应援横幅'
  },
  {
    value: 'meme',
    label: '表情包',
    icon: 'Sunny',
    description: '制作有趣的表情包'
  }
])

// 主题选项
const themes = ref([
  { value: 'victory', label: '胜利主题' },
  { value: 'support', label: '支持鼓励' },
  { value: 'technique', label: '技术赞美' },
  { value: 'spirit', label: '精神品质' },
  { value: 'achievement', label: '成就荣誉' }
])

// 情感色彩
const emotions = ref([
  { value: 'passionate', label: '热情激昂' },
  { value: 'warm', label: '温暖感人' },
  { value: 'humorous', label: '幽默风趣' },
  { value: 'inspiring', label: '鼓舞人心' },
  { value: 'proud', label: '自豪骄傲' }
])

// 生成参数
const generateParams = reactive({
  theme: '',
  emotion: '',
  prompt: '',
  // 口号参数
  length: 10,
  elements: [],
  // 横幅参数
  size: '',
  colorScheme: '',
  // 表情包参数
  style: '',
  text: ''
})

// 生命周期
onMounted(() => {
  // 初始化数据
})

// 方法
const handleTypeChange = (type) => {
  selectedType.value = type
  resetParams()
}

const resetParams = () => {
  Object.keys(generateParams).forEach(key => {
    if (Array.isArray(generateParams[key])) {
      generateParams[key] = []
    } else {
      generateParams[key] = ''
    }
  })
  generateParams.length = 10
}

const handleGenerate = async () => {
  try {
    if (!selectedType.value) {
      ElMessage.warning('请先选择生成类型')
      return
    }

    const results = await aiStore.generateContent({
      type: selectedType.value,
      params: { ...generateParams }
    })

    generatedResults.value = results
    ElMessage.success('生成成功！')
    
  } catch (error) {
    ElMessage.error(error.message || '生成失败')
  }
}

const handleReset = () => {
  selectedType.value = ''
  resetParams()
  generatedResults.value = []
}

const handleResultClick = (result) => {
  // 显示详细信息或编辑
  console.log('Result clicked:', result)
}

const handleLike = (result) => {
  result.liked = !result.liked
  ElMessage.success(result.liked ? '已点赞' : '取消点赞')
}

const handleDownload = (result) => {
  // 下载逻辑
  ElMessage.success('开始下载')
}

const handleShare = (result) => {
  // 分享逻辑
  if (navigator.share) {
    navigator.share({
      title: '樊振东应援物',
      text: result.content,
      url: window.location.href
    }).catch(console.error)
  } else {
    navigator.clipboard.writeText(result.content).then(() => {
      ElMessage.success('内容已复制到剪贴板')
    })
  }
}

const handleRegenerateAll = () => {
  handleGenerate()
}

const handleDownloadAll = () => {
  ElMessage.success('批量下载功能开发中')
}
</script>

<style scoped>
.ai-generator {
  max-width: 800px;
  margin: 0 auto;
}

.generator-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.generator-header {
  text-align: center;
}

.generator-header h3 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 20px;
}

.generator-subtitle {
  color: #909399;
  font-size: 14px;
}

.generator-content {
  padding: 0;
}

.type-selector {
  margin-bottom: 30px;
}

.type-selector h4 {
  margin: 0 0 16px 0;
  color: #303133;
}

.type-button {
  margin-right: 12px;
  margin-bottom: 12px;
}

.type-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
}

.type-icon {
  font-size: 24px;
}

.type-label {
  font-size: 12px;
}

.parameter-config {
  margin-bottom: 30px;
}

.parameter-config h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.generate-actions {
  text-align: center;
  margin-bottom: 30px;
}

.generate-btn {
  margin-right: 12px;
  padding: 12px 24px;
}

.results-section {
  margin-bottom: 30px;
}

.results-section h4 {
  margin: 0 0 20px 0;
  color: #303133;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.result-item {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 12px rgba(64, 158, 255, 0.2);
}

.slogan-result {
  text-align: center;
}

.slogan-text {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 12px;
  line-height: 1.4;
}

.slogan-meta {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.banner-result {
  text-align: center;
}

.banner-preview {
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 12px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-text {
  font-size: 16px;
  font-weight: 600;
}

.banner-meta {
  font-size: 12px;
  color: #909399;
}

.meme-result {
  text-align: center;
}

.meme-preview {
  position: relative;
  margin-bottom: 12px;
}

.meme-preview img {
  width: 100%;
  max-width: 200px;
  border-radius: 6px;
}

.meme-text {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.batch-actions {
  text-align: center;
}

.usage-stats {
  margin-top: 20px;
}

.stats-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stats-content .el-progress {
  flex: 1;
}

.stats-text {
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .type-button {
    margin-right: 8px;
    margin-bottom: 8px;
  }
  
  .type-content {
    padding: 8px 12px;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .generate-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .generate-btn {
    margin-right: 0;
  }
}
</style>
