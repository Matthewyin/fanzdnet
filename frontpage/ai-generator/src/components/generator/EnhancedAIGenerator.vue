<template>
  <div class="enhanced-ai-generator">
    <div class="generator-layout">
      <!-- 左侧参数面板 -->
      <div class="parameters-panel">
        <div class="panel-header">
          <h3>AI应援物生成器</h3>
          <div class="type-selector">
            <el-radio-group v-model="currentType" @change="onTypeChange">
              <el-radio-button label="banner">应援横幅</el-radio-button>
              <el-radio-button label="slogan">应援口号</el-radio-button>
              <el-radio-button label="emoji">表情包</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- 内容输入 -->
        <div class="content-input">
          <h4>输入您的创意</h4>
          <el-input
            v-model="inputText"
            type="textarea"
            :rows="3"
            :placeholder="getPlaceholder()"
            maxlength="200"
            show-word-limit
          />
        </div>

        <!-- 参数配置 -->
        <div class="parameters-config">
          <!-- 横幅参数 -->
          <BannerParameters
            v-if="currentType === 'banner'"
            v-model="bannerParams"
            @update="onParametersUpdate"
          />

          <!-- 口号参数 -->
          <SloganParameters
            v-else-if="currentType === 'slogan'"
            v-model="sloganParams"
            @update="onParametersUpdate"
          />

          <!-- 表情包参数 -->
          <EmojiParameters
            v-else-if="currentType === 'emoji'"
            v-model="emojiParams"
            @update="onParametersUpdate"
          />
        </div>

        <!-- 生成按钮 -->
        <div class="generate-actions">
          <el-button
            type="primary"
            size="large"
            :loading="isGenerating"
            :disabled="!canGenerate"
            @click="startGeneration"
            block
          >
            <el-icon><Magic /></el-icon>
            {{ isGenerating ? '生成中...' : '开始生成' }}
          </el-button>

          <div class="quota-info" v-if="userQuota">
            <span>今日剩余次数: {{ userQuota.remaining }}/{{ userQuota.total }}</span>
          </div>
        </div>
      </div>

      <!-- 右侧预览和结果区域 -->
      <div class="preview-panel">
        <!-- 实时预览 -->
        <div class="preview-section" v-if="!generationResult">
          <EnhancedPreview
            :visual-elements="currentParameters.visualElements || []"
            :text-content="inputText"
            :parameters="currentParameters"
            :content-type="currentType"
            @element-select="onElementSelect"
            @element-update="onElementUpdate"
          />
        </div>

        <!-- 生成结果 -->
        <div class="result-section" v-else>
          <div class="result-header">
            <h4>生成结果</h4>
            <div class="result-actions">
              <el-button size="small" @click="regenerate">重新生成</el-button>
              <el-button size="small" @click="clearResult">清除结果</el-button>
            </div>
          </div>

          <!-- 横幅结果 -->
          <div v-if="currentType === 'banner'" class="banner-result">
            <div class="result-image" v-if="generationResult.image_path">
              <img :src="getImageUrl(generationResult.image_path)" alt="生成的横幅" />
            </div>
            
            <div class="result-content">
              <h5>{{ generationResult.content }}</h5>
              <div v-if="generationResult.design_data" class="design-info">
                <el-descriptions :column="2" size="small">
                  <el-descriptions-item label="主标题">
                    {{ generationResult.design_data.mainTitle }}
                  </el-descriptions-item>
                  <el-descriptions-item label="副标题">
                    {{ generationResult.design_data.subTitle || '无' }}
                  </el-descriptions-item>
                  <el-descriptions-item label="视觉元素">
                    {{ generationResult.design_data.visualElements?.length || 0 }}个
                  </el-descriptions-item>
                  <el-descriptions-item label="布局风格">
                    {{ generationResult.design_data.layout?.style || '默认' }}
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
          </div>

          <!-- 口号结果 -->
          <div v-else-if="currentType === 'slogan'" class="slogan-result">
            <div class="slogans-list">
              <div
                v-for="(slogan, index) in generationResult.slogans"
                :key="index"
                class="slogan-item"
                :class="{ selected: selectedSloganIndex === index }"
                @click="selectSlogan(index)"
              >
                <div class="slogan-content">
                  <div class="slogan-text">{{ slogan.text }}</div>
                  <div class="slogan-meta">
                    <el-tag size="small">{{ slogan.type }}</el-tag>
                    <span class="slogan-description">{{ slogan.description }}</span>
                  </div>
                </div>
                
                <div class="slogan-visual" v-if="slogan.visualStyle">
                  <div 
                    class="visual-preview"
                    :style="{
                      backgroundColor: slogan.visualStyle.backgroundColor,
                      color: slogan.visualStyle.textColor,
                      fontSize: slogan.visualStyle.fontSize === 'large' ? '18px' : '14px',
                      fontWeight: slogan.visualStyle.fontWeight
                    }"
                  >
                    {{ slogan.text }}
                  </div>
                </div>
                
                <div class="slogan-actions">
                  <el-button size="mini" @click.stop="copySlogan(slogan.text)">
                    复制
                  </el-button>
                  <el-button size="mini" @click.stop="likeSlogan(index)">
                    <el-icon><Star /></el-icon>
                    {{ slogan.likes || 0 }}
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 表情包结果 -->
          <div v-else-if="currentType === 'emoji'" class="emoji-result">
            <div class="result-image" v-if="generationResult.image_path">
              <img :src="getImageUrl(generationResult.image_path)" alt="生成的表情包" />
            </div>
            
            <div class="result-content">
              <h5>{{ generationResult.content }}</h5>
              <div class="emoji-meta">
                <el-tag size="small">{{ generationResult.style || '默认风格' }}</el-tag>
                <el-tag size="small" type="info">{{ generationResult.format || 'PNG' }}</el-tag>
              </div>
            </div>
          </div>

          <!-- 下载按钮 -->
          <div class="download-section">
            <el-button
              type="success"
              :disabled="!generationResult.image_path"
              @click="downloadResult"
            >
              <el-icon><Download /></el-icon>
              下载结果
            </el-button>
          </div>
        </div>

        <!-- 生成进度 -->
        <div class="progress-section" v-if="isGenerating">
          <div class="progress-content">
            <el-progress
              :percentage="generationProgress"
              :status="generationStatus"
              :stroke-width="8"
            />
            <div class="progress-text">
              {{ getProgressText() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Magic, Star, Download } from '@element-plus/icons-vue'

import BannerParameters from './BannerParameters.vue'
import SloganParameters from './SloganParameters.vue'
import EmojiParameters from './EmojiParameters.vue'
import EnhancedPreview from './EnhancedPreview.vue'

import { generateContent, getTaskStatus } from '@/api/ai'
import { getUserQuota } from '@/api/user'

// 响应式数据
const currentType = ref('banner')
const inputText = ref('')
const isGenerating = ref(false)
const generationProgress = ref(0)
const generationStatus = ref('')
const generationResult = ref(null)
const selectedSloganIndex = ref(0)
const userQuota = ref(null)

// 参数对象
const bannerParams = ref({})
const sloganParams = ref({})
const emojiParams = ref({})

// 计算属性
const currentParameters = computed(() => {
  switch (currentType.value) {
    case 'banner':
      return bannerParams.value
    case 'slogan':
      return sloganParams.value
    case 'emoji':
      return emojiParams.value
    default:
      return {}
  }
})

const canGenerate = computed(() => {
  return inputText.value.trim().length > 0 && !isGenerating.value
})

// 方法
const getPlaceholder = () => {
  const placeholders = {
    banner: '描述您想要的横幅内容，例如：为樊振东加油的横幅，要有气势...',
    slogan: '描述您想要的口号风格，例如：激励性的口号，要朗朗上口...',
    emoji: '描述您想要的表情包，例如：樊振东胜利的表情包，要可爱风格...'
  }
  return placeholders[currentType.value] || ''
}

const onTypeChange = () => {
  // 清除之前的结果
  generationResult.value = null
  inputText.value = ''
}

const onParametersUpdate = (params) => {
  // 参数更新会自动反映到计算属性中
}

const onElementSelect = (elementId) => {
  console.log('选中元素:', elementId)
}

const onElementUpdate = (elementId, property, value) => {
  console.log('更新元素:', elementId, property, value)
  // 这里可以更新元素属性
}

const startGeneration = async () => {
  if (!canGenerate.value) return

  isGenerating.value = true
  generationProgress.value = 0
  generationStatus.value = ''
  generationResult.value = null

  try {
    // 创建生成任务
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const response = await generateContent({
      task_id: taskId,
      type: currentType.value,
      prompt: inputText.value,
      parameters: currentParameters.value
    })

    if (response.success) {
      // 轮询任务状态
      await pollTaskStatus(response.task_id)
    } else {
      throw new Error(response.error || '生成失败')
    }

  } catch (error) {
    console.error('生成失败:', error)
    ElMessage.error(error.message || '生成失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

const pollTaskStatus = async (taskId) => {
  const maxAttempts = 60 // 最多等待60次，每次2秒
  let attempts = 0

  const poll = async () => {
    try {
      const response = await getTaskStatus(taskId)
      
      if (response.success) {
        const task = response.data
        generationProgress.value = task.progress || 0
        
        if (task.status === 'completed') {
          generationResult.value = task.result
          generationProgress.value = 100
          generationStatus.value = 'success'
          ElMessage.success('生成完成！')
          
          // 更新用户配额
          await loadUserQuota()
          return
        } else if (task.status === 'failed') {
          throw new Error(task.error || '生成失败')
        } else if (task.status === 'processing') {
          generationStatus.value = 'active'
        }
      }

      attempts++
      if (attempts < maxAttempts) {
        setTimeout(poll, 2000) // 2秒后重试
      } else {
        throw new Error('生成超时，请重试')
      }

    } catch (error) {
      generationStatus.value = 'exception'
      throw error
    }
  }

  await poll()
}

const getProgressText = () => {
  if (generationProgress.value < 30) {
    return '正在分析您的需求...'
  } else if (generationProgress.value < 70) {
    return 'AI正在创作中...'
  } else if (generationProgress.value < 100) {
    return '正在生成最终结果...'
  } else {
    return '生成完成！'
  }
}

const regenerate = () => {
  startGeneration()
}

const clearResult = () => {
  generationResult.value = null
}

const selectSlogan = (index) => {
  selectedSloganIndex.value = index
}

const copySlogan = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const likeSlogan = (index) => {
  if (generationResult.value?.slogans?.[index]) {
    const slogan = generationResult.value.slogans[index]
    slogan.likes = (slogan.likes || 0) + 1
    ElMessage.success('点赞成功')
  }
}

const getImageUrl = (imagePath) => {
  return `${import.meta.env.VITE_API_BASE_URL}/files/view/${imagePath.split('/').pop()}`
}

const downloadResult = () => {
  if (generationResult.value?.image_path) {
    const link = document.createElement('a')
    link.href = getImageUrl(generationResult.value.image_path)
    link.download = `fanzdnet_${currentType.value}_${Date.now()}.png`
    link.click()
  }
}

const loadUserQuota = async () => {
  try {
    const response = await getUserQuota()
    if (response.success) {
      userQuota.value = response.data
    }
  } catch (error) {
    console.error('获取用户配额失败:', error)
  }
}

// 组件挂载
onMounted(() => {
  loadUserQuota()
})
</script>

<style scoped>
.enhanced-ai-generator {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.generator-layout {
  display: flex;
  flex: 1;
  gap: 2rem;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.parameters-panel {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel-header h3 {
  margin: 0 0 1rem 0;
  color: #333;
}

.type-selector {
  margin-bottom: 1rem;
}

.content-input h4 {
  margin: 0 0 0.75rem 0;
  color: #333;
  font-size: 16px;
}

.parameters-config {
  flex: 1;
  overflow-y: auto;
}

.generate-actions {
  margin-top: auto;
}

.quota-info {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 12px;
  color: #666;
}

.preview-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-header h4 {
  margin: 0;
  color: #333;
}

.banner-result,
.emoji-result {
  text-align: center;
  margin-bottom: 1.5rem;
}

.result-image {
  margin-bottom: 1rem;
}

.result-image img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.result-content h5 {
  margin: 0 0 1rem 0;
  color: #333;
}

.slogan-result {
  margin-bottom: 1.5rem;
}

.slogans-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.slogan-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slogan-item:hover {
  border-color: #409eff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.slogan-item.selected {
  border-color: #409eff;
  background: #f0f9ff;
}

.slogan-content {
  margin-bottom: 0.75rem;
}

.slogan-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

.slogan-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.slogan-description {
  font-size: 12px;
  color: #666;
}

.slogan-visual {
  margin-bottom: 0.75rem;
}

.visual-preview {
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
  font-weight: bold;
}

.slogan-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.download-section {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.progress-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.progress-content {
  width: 300px;
  text-align: center;
}

.progress-text {
  margin-top: 1rem;
  color: #666;
  font-size: 14px;
}

.emoji-meta {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

@media (max-width: 1200px) {
  .generator-layout {
    flex-direction: column;
  }
  
  .parameters-panel {
    width: 100%;
  }
}
</style>
