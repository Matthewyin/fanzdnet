<template>
  <div class="template-selector">
    <div class="selector-header">
      <h4>选择模板</h4>
      <div class="category-tabs">
        <el-button
          v-for="category in templateCategories"
          :key="category.id"
          :type="selectedCategory === category.id ? 'primary' : ''"
          size="small"
          @click="selectCategory(category.id)"
        >
          <el-icon><component :is="category.icon" /></el-icon>
          {{ category.name }}
        </el-button>
      </div>
    </div>

    <div class="templates-grid">
      <div
        v-for="template in filteredTemplates"
        :key="template.id"
        :class="['template-card', { active: selectedTemplate?.id === template.id }]"
        @click="selectTemplate(template)"
      >
        <div class="template-preview">
          <div 
            class="preview-canvas"
            :style="getPreviewStyle(template)"
          >
            <div class="preview-text">樊振东加油</div>
          </div>
        </div>
        
        <div class="template-info">
          <h5>{{ template.name }}</h5>
          <p>{{ template.description }}</p>
        </div>
        
        <div class="template-actions">
          <el-button 
            size="mini" 
            @click.stop="previewTemplate(template)"
          >
            预览
          </el-button>
          <el-button 
            size="mini" 
            type="primary"
            @click.stop="selectTemplate(template)"
          >
            选择
          </el-button>
        </div>
      </div>
    </div>

    <!-- 模板预览对话框 -->
    <el-dialog
      v-model="showPreview"
      title="模板预览"
      width="80%"
      center
    >
      <div v-if="previewingTemplate" class="template-preview-dialog">
        <div 
          class="large-preview"
          :style="getLargePreviewStyle(previewingTemplate)"
        >
          <div class="large-preview-text">{{ previewText }}</div>
        </div>
        
        <div class="preview-controls">
          <el-input
            v-model="previewText"
            placeholder="输入预览文字"
            style="margin-bottom: 1rem;"
          />
          
          <div class="template-details">
            <h4>{{ previewingTemplate.name }}</h4>
            <p>{{ previewingTemplate.description }}</p>
            
            <el-descriptions :column="2" size="small">
              <el-descriptions-item label="尺寸">
                {{ previewingTemplate.config.width }}×{{ previewingTemplate.config.height }}
              </el-descriptions-item>
              <el-descriptions-item label="字体大小">
                {{ previewingTemplate.config.fontSize }}px
              </el-descriptions-item>
              <el-descriptions-item label="文字颜色">
                <div 
                  class="color-preview"
                  :style="{ backgroundColor: previewingTemplate.config.textColor }"
                ></div>
                {{ previewingTemplate.config.textColor }}
              </el-descriptions-item>
              <el-descriptions-item label="背景">
                <div 
                  class="color-preview"
                  :style="{ background: previewingTemplate.config.backgroundGradient || previewingTemplate.config.backgroundColor }"
                ></div>
                {{ previewingTemplate.config.backgroundColor }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="showPreview = false">取消</el-button>
        <el-button 
          type="primary" 
          @click="confirmSelectTemplate"
        >
          使用此模板
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Grid, Star, TrendCharts, Lightning, Medal, Trophy,
  Minus, Sunny, Clock
} from '@element-plus/icons-vue'

import { 
  bannerTemplates, 
  templateCategories, 
  getTemplatesByCategory 
} from '@/data/bannerTemplates'

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

// 响应式数据
const selectedCategory = ref('all')
const selectedTemplate = ref(props.modelValue)
const showPreview = ref(false)
const previewingTemplate = ref(null)
const previewText = ref('樊振东加油！')

// 计算属性
const filteredTemplates = computed(() => {
  return getTemplatesByCategory(selectedCategory.value)
})

// 方法
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const selectTemplate = (template) => {
  selectedTemplate.value = template
  emit('update:modelValue', template)
  emit('select', template)
}

const previewTemplate = (template) => {
  previewingTemplate.value = template
  showPreview.value = true
}

const confirmSelectTemplate = () => {
  if (previewingTemplate.value) {
    selectTemplate(previewingTemplate.value)
  }
  showPreview.value = false
}

const getPreviewStyle = (template) => {
  const config = template.config
  return {
    width: '200px',
    height: '75px',
    background: config.backgroundGradient || config.backgroundColor,
    color: config.textColor,
    fontSize: '14px',
    fontWeight: config.fontWeight,
    textAlign: config.textAlign,
    textShadow: config.textShadow,
    border: config.border?.enabled 
      ? `${config.border.width}px ${config.border.style} ${config.border.color}`
      : 'none',
    boxShadow: config.effects?.shadow 
      ? '0 2px 4px rgba(0,0,0,0.3)'
      : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px'
  }
}

const getLargePreviewStyle = (template) => {
  const config = template.config
  return {
    width: `${Math.min(config.width, 600)}px`,
    height: `${Math.min(config.height, 225)}px`,
    background: config.backgroundGradient || config.backgroundColor,
    color: config.textColor,
    fontSize: `${Math.min(config.fontSize, 36)}px`,
    fontWeight: config.fontWeight,
    textAlign: config.textAlign,
    textShadow: config.textShadow,
    border: config.border?.enabled 
      ? `${config.border.width}px ${config.border.style} ${config.border.color}`
      : 'none',
    boxShadow: config.effects?.shadow 
      ? '0 4px 8px rgba(0,0,0,0.3)'
      : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    margin: '0 auto',
    position: 'relative'
  }
}
</script>

<style scoped>
.template-selector {
  width: 100%;
}

.selector-header {
  margin-bottom: 1rem;
}

.selector-header h4 {
  margin: 0 0 1rem 0;
  color: #333;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.template-card {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
}

.template-card:hover {
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.template-card.active {
  border-color: #409eff;
  background: #f0f9ff;
}

.template-preview {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
}

.preview-canvas {
  position: relative;
}

.preview-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.template-info {
  margin-bottom: 0.5rem;
}

.template-info h5 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 14px;
}

.template-info p {
  margin: 0;
  color: #666;
  font-size: 12px;
  line-height: 1.4;
}

.template-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.template-preview-dialog {
  text-align: center;
}

.large-preview {
  margin-bottom: 2rem;
}

.large-preview-text {
  word-break: break-word;
  line-height: 1.2;
}

.preview-controls {
  max-width: 400px;
  margin: 0 auto;
}

.template-details {
  text-align: left;
  margin-top: 1rem;
}

.template-details h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.template-details p {
  margin: 0 0 1rem 0;
  color: #666;
}

.color-preview {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 1px solid #ddd;
  vertical-align: middle;
  margin-right: 0.5rem;
}

:deep(.el-descriptions__label) {
  font-weight: normal;
  color: #666;
}

:deep(.el-descriptions__content) {
  color: #333;
}
</style>
