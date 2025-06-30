<template>
  <div class="visual-element-selector">
    <div class="selector-header">
      <h4>视觉元素选择</h4>
      <div class="element-categories">
        <el-button
          v-for="category in categories"
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

    <div class="elements-grid">
      <div
        v-for="element in filteredElements"
        :key="element.id"
        :class="['element-card', { 
          selected: selectedElements.includes(element.id),
          disabled: !canSelectMore && !selectedElements.includes(element.id)
        }]"
        @click="toggleElement(element)"
      >
        <div class="element-preview" v-html="element.svg"></div>
        <div class="element-info">
          <h6>{{ element.name }}</h6>
          <p>{{ element.description }}</p>
        </div>
        <div class="element-actions">
          <el-button 
            size="mini" 
            :type="selectedElements.includes(element.id) ? 'danger' : 'primary'"
            @click.stop="toggleElement(element)"
          >
            {{ selectedElements.includes(element.id) ? '移除' : '添加' }}
          </el-button>
        </div>
      </div>
    </div>

    <div class="selected-elements" v-if="selectedElements.length > 0">
      <h5>已选择的元素 ({{ selectedElements.length }}/{{ maxElements }})</h5>
      <div class="selected-list">
        <el-tag
          v-for="elementId in selectedElements"
          :key="elementId"
          closable
          @close="removeElement(elementId)"
          style="margin: 2px;"
        >
          {{ getElementName(elementId) }}
        </el-tag>
      </div>
    </div>

    <div class="recommended-combinations" v-if="recommendations.length > 0">
      <h5>推荐组合</h5>
      <div class="combinations-list">
        <div
          v-for="combo in recommendations"
          :key="combo.name"
          class="combination-card"
          @click="applyRecommendation(combo)"
        >
          <h6>{{ combo.name }}</h6>
          <p>{{ combo.description }}</p>
          <div class="combo-elements">
            <el-tag
              v-for="elementId in combo.elements"
              :key="elementId"
              size="small"
              style="margin: 1px;"
            >
              {{ getElementName(elementId) }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>

    <div class="element-properties" v-if="selectedElements.length > 0">
      <h5>元素属性调整</h5>
      <div class="properties-panel">
        <div
          v-for="elementId in selectedElements"
          :key="elementId"
          class="element-property"
        >
          <h6>{{ getElementName(elementId) }}</h6>
          
          <div class="property-row">
            <label>位置 X:</label>
            <el-slider
              v-model="elementProperties[elementId].x"
              :min="0"
              :max="800"
              @change="updateElementProperty(elementId, 'x', $event)"
            />
          </div>
          
          <div class="property-row">
            <label>位置 Y:</label>
            <el-slider
              v-model="elementProperties[elementId].y"
              :min="0"
              :max="300"
              @change="updateElementProperty(elementId, 'y', $event)"
            />
          </div>
          
          <div class="property-row">
            <label>大小:</label>
            <el-slider
              v-model="elementProperties[elementId].scale"
              :min="0.5"
              :max="2"
              :step="0.1"
              @change="updateElementProperty(elementId, 'scale', $event)"
            />
          </div>
          
          <div class="property-row">
            <label>透明度:</label>
            <el-slider
              v-model="elementProperties[elementId].opacity"
              :min="0"
              :max="1"
              :step="0.1"
              @change="updateElementProperty(elementId, 'opacity', $event)"
            />
          </div>
          
          <div class="property-row">
            <label>旋转角度:</label>
            <el-slider
              v-model="elementProperties[elementId].rotation"
              :min="0"
              :max="360"
              @change="updateElementProperty(elementId, 'rotation', $event)"
            />
          </div>
          
          <div class="property-row">
            <label>层级:</label>
            <el-input-number
              v-model="elementProperties[elementId].zIndex"
              :min="0"
              :max="10"
              size="small"
              @change="updateElementProperty(elementId, 'zIndex', $event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  User, Trophy, Flag, Star, Lightning,
  Picture, Grid, Medal
} from '@element-plus/icons-vue'

import { 
  allVisualElements, 
  getElementsByCategory, 
  getRecommendedCombinations 
} from '@/data/visualElements'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  contentType: {
    type: String,
    default: 'banner'
  },
  maxElements: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

// 响应式数据
const selectedCategory = ref('all')
const selectedElements = ref([...props.modelValue])
const elementProperties = ref({})

// 元素分类
const categories = [
  { id: 'all', name: '全部', icon: 'Grid' },
  { id: 'character', name: '人物', icon: 'User' },
  { id: 'sports', name: '体育', icon: 'Trophy' },
  { id: 'trophy', name: '荣誉', icon: 'Medal' },
  { id: 'national', name: '中国', icon: 'Flag' },
  { id: 'shape', name: '装饰', icon: 'Star' },
  { id: 'effect', name: '特效', icon: 'Lightning' },
  { id: 'scene', name: '场景', icon: 'Picture' }
]

// 计算属性
const filteredElements = computed(() => {
  if (selectedCategory.value === 'all') {
    return Object.values(allVisualElements).flat()
  }
  return getElementsByCategory(selectedCategory.value)
})

const canSelectMore = computed(() => {
  return selectedElements.value.length < props.maxElements
})

const recommendations = computed(() => {
  return getRecommendedCombinations(props.contentType)
})

// 方法
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const toggleElement = (element) => {
  const elementId = element.id
  const index = selectedElements.value.indexOf(elementId)
  
  if (index > -1) {
    // 移除元素
    selectedElements.value.splice(index, 1)
    delete elementProperties.value[elementId]
  } else if (canSelectMore.value) {
    // 添加元素
    selectedElements.value.push(elementId)
    
    // 初始化元素属性
    elementProperties.value[elementId] = {
      x: element.defaultSize?.x || 100,
      y: element.defaultSize?.y || 100,
      scale: 1,
      opacity: 1,
      rotation: 0,
      zIndex: 1
    }
  }
  
  emitChange()
}

const removeElement = (elementId) => {
  const index = selectedElements.value.indexOf(elementId)
  if (index > -1) {
    selectedElements.value.splice(index, 1)
    delete elementProperties.value[elementId]
    emitChange()
  }
}

const getElementName = (elementId) => {
  const allElements = Object.values(allVisualElements).flat()
  const element = allElements.find(el => el.id === elementId)
  return element ? element.name : elementId
}

const applyRecommendation = (combo) => {
  // 清空当前选择
  selectedElements.value = []
  elementProperties.value = {}
  
  // 应用推荐组合
  combo.elements.forEach((elementId, index) => {
    if (selectedElements.value.length < props.maxElements) {
      selectedElements.value.push(elementId)
      
      // 设置默认位置（避免重叠）
      elementProperties.value[elementId] = {
        x: 100 + (index * 120),
        y: 100 + (index % 2) * 80,
        scale: 1,
        opacity: 1,
        rotation: 0,
        zIndex: index + 1
      }
    }
  })
  
  emitChange()
}

const updateElementProperty = (elementId, property, value) => {
  if (elementProperties.value[elementId]) {
    elementProperties.value[elementId][property] = value
    emitChange()
  }
}

const emitChange = () => {
  const result = selectedElements.value.map(elementId => ({
    id: elementId,
    properties: elementProperties.value[elementId] || {}
  }))
  
  emit('update:modelValue', result)
  emit('change', result)
}

// 监听props变化
watch(() => props.modelValue, (newValue) => {
  selectedElements.value = newValue.map(item => 
    typeof item === 'string' ? item : item.id
  )
  
  // 初始化属性
  newValue.forEach(item => {
    if (typeof item === 'object' && item.properties) {
      elementProperties.value[item.id] = { ...item.properties }
    }
  })
}, { immediate: true })
</script>

<style scoped>
.visual-element-selector {
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
}

.selector-header {
  margin-bottom: 1rem;
}

.selector-header h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.element-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.elements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.element-card {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fff;
}

.element-card:hover {
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.element-card.selected {
  border-color: #409eff;
  background: #f0f9ff;
}

.element-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.element-preview {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.element-preview :deep(svg) {
  max-width: 50px;
  max-height: 50px;
}

.element-info h6 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 12px;
}

.element-info p {
  margin: 0;
  color: #666;
  font-size: 10px;
  line-height: 1.3;
}

.element-actions {
  margin-top: 0.5rem;
  text-align: center;
}

.selected-elements {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.selected-elements h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.recommended-combinations {
  margin-bottom: 1.5rem;
}

.recommended-combinations h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.combinations-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.combination-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.combination-card:hover {
  border-color: #409eff;
  background: #f0f9ff;
}

.combination-card h6 {
  margin: 0 0 0.25rem 0;
  color: #333;
}

.combination-card p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 12px;
}

.element-properties {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.element-properties h5 {
  margin: 0 0 1rem 0;
  color: #333;
}

.element-property {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
}

.element-property h6 {
  margin: 0 0 0.75rem 0;
  color: #333;
  font-size: 14px;
}

.property-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.property-row label {
  width: 80px;
  font-size: 12px;
  color: #666;
}

.property-row .el-slider {
  flex: 1;
  margin-left: 1rem;
}

.property-row .el-input-number {
  margin-left: 1rem;
}
</style>
