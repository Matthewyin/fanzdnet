<template>
  <div class="enhanced-preview">
    <div class="preview-header">
      <h4>实时预览</h4>
      <div class="preview-controls">
        <el-button-group>
          <el-button 
            :type="previewMode === 'canvas' ? 'primary' : ''"
            size="small"
            @click="setPreviewMode('canvas')"
          >
            Canvas预览
          </el-button>
          <el-button 
            :type="previewMode === 'svg' ? 'primary' : ''"
            size="small"
            @click="setPreviewMode('svg')"
          >
            SVG预览
          </el-button>
        </el-button-group>
        
        <el-button 
          size="small" 
          @click="refreshPreview"
          :loading="isRendering"
        >
          刷新预览
        </el-button>
        
        <el-button 
          size="small" 
          type="primary"
          @click="exportPreview"
          :disabled="!hasContent"
        >
          导出图片
        </el-button>
      </div>
    </div>

    <div class="preview-container">
      <!-- Canvas预览模式 -->
      <div v-if="previewMode === 'canvas'" class="canvas-preview">
        <canvas
          ref="previewCanvas"
          :width="canvasWidth"
          :height="canvasHeight"
          :style="{ 
            width: displayWidth + 'px', 
            height: displayHeight + 'px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }"
        ></canvas>
      </div>

      <!-- SVG预览模式 -->
      <div v-else class="svg-preview">
        <svg
          :width="displayWidth"
          :height="displayHeight"
          :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`"
          style="border: 1px solid #ddd; border-radius: 4px;"
        >
          <!-- 背景 -->
          <defs>
            <linearGradient 
              v-if="backgroundGradient"
              id="backgroundGradient" 
              x1="0%" y1="0%" x2="100%" y2="100%"
            >
              <stop 
                v-for="(stop, index) in backgroundGradient.stops" 
                :key="index"
                :offset="stop.offset + '%'" 
                :stop-color="stop.color" 
              />
            </linearGradient>
          </defs>
          
          <rect 
            x="0" y="0" 
            :width="canvasWidth" 
            :height="canvasHeight" 
            :fill="backgroundGradient ? 'url(#backgroundGradient)' : backgroundColor"
          />
          
          <!-- 视觉元素 -->
          <g v-for="element in sortedElements" :key="element.id">
            <g 
              :transform="getElementTransform(element)"
              :opacity="element.properties.opacity || 1"
            >
              <g v-html="getElementSVG(element.id)"></g>
            </g>
          </g>
          
          <!-- 文字内容 -->
          <text
            v-if="textContent"
            :x="canvasWidth / 2"
            :y="canvasHeight / 2"
            :font-size="fontSize"
            :font-weight="fontWeight"
            :fill="textColor"
            text-anchor="middle"
            dominant-baseline="middle"
            :text-shadow="textShadow"
          >
            {{ textContent }}
          </text>
        </svg>
      </div>

      <!-- 加载状态 -->
      <div v-if="isRendering" class="loading-overlay">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>渲染中...</span>
      </div>
    </div>

    <!-- 预览信息 -->
    <div class="preview-info">
      <div class="info-item">
        <label>尺寸:</label>
        <span>{{ canvasWidth }} × {{ canvasHeight }}</span>
      </div>
      <div class="info-item">
        <label>元素数量:</label>
        <span>{{ visualElements.length }}</span>
      </div>
      <div class="info-item">
        <label>预览模式:</label>
        <span>{{ previewMode === 'canvas' ? 'Canvas' : 'SVG' }}</span>
      </div>
    </div>

    <!-- 元素列表 -->
    <div class="elements-list" v-if="visualElements.length > 0">
      <h5>当前元素</h5>
      <div class="element-items">
        <div
          v-for="element in sortedElements"
          :key="element.id"
          :class="['element-item', { active: selectedElementId === element.id }]"
          @click="selectElement(element.id)"
        >
          <div class="element-icon" v-html="getElementSVG(element.id, 20)"></div>
          <div class="element-details">
            <span class="element-name">{{ getElementName(element.id) }}</span>
            <span class="element-position">
              ({{ Math.round(element.properties.x || 0) }}, {{ Math.round(element.properties.y || 0) }})
            </span>
          </div>
          <div class="element-controls">
            <el-button size="mini" @click.stop="moveElementUp(element.id)">↑</el-button>
            <el-button size="mini" @click.stop="moveElementDown(element.id)">↓</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { CanvasRenderer } from '@/utils/canvasRenderer'
import { allVisualElements } from '@/data/visualElements'

const props = defineProps({
  visualElements: {
    type: Array,
    default: () => []
  },
  textContent: {
    type: String,
    default: ''
  },
  parameters: {
    type: Object,
    default: () => ({})
  },
  contentType: {
    type: String,
    default: 'banner'
  }
})

const emit = defineEmits(['elementSelect', 'elementUpdate'])

// 响应式数据
const previewMode = ref('canvas')
const isRendering = ref(false)
const selectedElementId = ref(null)
const previewCanvas = ref(null)
const canvasRenderer = ref(null)

// 计算属性
const canvasWidth = computed(() => props.parameters.width || 800)
const canvasHeight = computed(() => props.parameters.height || 300)
const displayWidth = computed(() => Math.min(canvasWidth.value, 600))
const displayHeight = computed(() => (displayWidth.value / canvasWidth.value) * canvasHeight.value)

const backgroundColor = computed(() => props.parameters.backgroundColor || '#ffffff')
const backgroundGradient = computed(() => {
  if (props.parameters.backgroundGradient) {
    return {
      stops: [
        { offset: 0, color: props.parameters.backgroundColor || '#ff0000' },
        { offset: 100, color: props.parameters.backgroundGradient || '#cc0000' }
      ]
    }
  }
  return null
})

const fontSize = computed(() => props.parameters.fontSize || 48)
const fontWeight = computed(() => props.parameters.fontWeight || 'bold')
const textColor = computed(() => props.parameters.textColor || '#ffffff')
const textShadow = computed(() => {
  if (props.parameters.textShadow) {
    return '2px 2px 4px rgba(0,0,0,0.8)'
  }
  return 'none'
})

const sortedElements = computed(() => {
  return [...props.visualElements].sort((a, b) => 
    (a.properties.zIndex || 0) - (b.properties.zIndex || 0)
  )
})

const hasContent = computed(() => {
  return props.textContent || props.visualElements.length > 0
})

// 方法
const setPreviewMode = (mode) => {
  previewMode.value = mode
  nextTick(() => {
    if (mode === 'canvas') {
      initCanvasRenderer()
    }
  })
}

const initCanvasRenderer = () => {
  if (previewCanvas.value) {
    canvasRenderer.value = new CanvasRenderer(previewCanvas.value)
    canvasRenderer.value.setSize(canvasWidth.value, canvasHeight.value)
    renderCanvas()
  }
}

const renderCanvas = async () => {
  if (!canvasRenderer.value) return
  
  isRendering.value = true
  
  try {
    // 清空画布
    canvasRenderer.value.clear()
    
    // 添加背景
    canvasRenderer.value.addElement({
      type: 'background',
      color: backgroundColor.value,
      gradient: backgroundGradient.value ? {
        type: 'linear',
        x1: 0, y1: 0, x2: canvasWidth.value, y2: canvasHeight.value,
        stops: backgroundGradient.value.stops
      } : null,
      zIndex: 0
    })
    
    // 添加视觉元素
    props.visualElements.forEach(element => {
      const elementData = getElementData(element.id)
      if (elementData) {
        canvasRenderer.value.addElement({
          type: 'icon',
          svgData: elementData.svg,
          x: element.properties.x || 0,
          y: element.properties.y || 0,
          width: (elementData.defaultSize?.width || 50) * (element.properties.scale || 1),
          height: (elementData.defaultSize?.height || 50) * (element.properties.scale || 1),
          rotation: element.properties.rotation || 0,
          opacity: element.properties.opacity || 1,
          zIndex: element.properties.zIndex || 1
        })
      }
    })
    
    // 添加文字
    if (props.textContent) {
      canvasRenderer.value.addElement({
        type: 'text',
        text: props.textContent,
        x: canvasWidth.value / 2,
        y: canvasHeight.value / 2,
        fontSize: fontSize.value,
        fontWeight: fontWeight.value,
        color: textColor.value,
        textAlign: 'center',
        textBaseline: 'middle',
        shadow: props.parameters.textShadow ? {
          color: 'rgba(0,0,0,0.8)',
          blur: 4,
          offsetX: 2,
          offsetY: 2
        } : null,
        zIndex: 10
      })
    }
    
    // 渲染
    canvasRenderer.value.render()
    
  } catch (error) {
    console.error('Canvas渲染失败:', error)
  } finally {
    isRendering.value = false
  }
}

const refreshPreview = () => {
  if (previewMode.value === 'canvas') {
    renderCanvas()
  }
  // SVG模式会自动更新
}

const exportPreview = () => {
  if (previewMode.value === 'canvas' && canvasRenderer.value) {
    const dataURL = canvasRenderer.value.toDataURL('image/png', 1.0)
    
    // 创建下载链接
    const link = document.createElement('a')
    link.download = `preview_${Date.now()}.png`
    link.href = dataURL
    link.click()
  } else {
    // SVG导出逻辑
    console.log('SVG导出功能待实现')
  }
}

const getElementTransform = (element) => {
  const props = element.properties
  const transforms = []
  
  if (props.x || props.y) {
    transforms.push(`translate(${props.x || 0}, ${props.y || 0})`)
  }
  
  if (props.scale && props.scale !== 1) {
    transforms.push(`scale(${props.scale})`)
  }
  
  if (props.rotation) {
    transforms.push(`rotate(${props.rotation})`)
  }
  
  return transforms.join(' ')
}

const getElementSVG = (elementId, size = null) => {
  const elementData = getElementData(elementId)
  if (!elementData) return ''
  
  let svg = elementData.svg
  
  // 如果指定了大小，调整SVG尺寸
  if (size) {
    svg = svg.replace(/viewBox="[^"]*"/, `viewBox="0 0 ${size} ${size}"`)
    svg = svg.replace(/<svg[^>]*>/, `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`)
  }
  
  return svg
}

const getElementData = (elementId) => {
  const allElements = Object.values(allVisualElements).flat()
  return allElements.find(el => el.id === elementId)
}

const getElementName = (elementId) => {
  const elementData = getElementData(elementId)
  return elementData ? elementData.name : elementId
}

const selectElement = (elementId) => {
  selectedElementId.value = elementId
  emit('elementSelect', elementId)
}

const moveElementUp = (elementId) => {
  const element = props.visualElements.find(el => el.id === elementId)
  if (element) {
    const newZIndex = (element.properties.zIndex || 0) + 1
    emit('elementUpdate', elementId, 'zIndex', newZIndex)
  }
}

const moveElementDown = (elementId) => {
  const element = props.visualElements.find(el => el.id === elementId)
  if (element && (element.properties.zIndex || 0) > 0) {
    const newZIndex = (element.properties.zIndex || 0) - 1
    emit('elementUpdate', elementId, 'zIndex', newZIndex)
  }
}

// 监听变化
watch(() => [props.visualElements, props.textContent, props.parameters], () => {
  nextTick(() => {
    if (previewMode.value === 'canvas') {
      renderCanvas()
    }
  })
}, { deep: true })

// 组件挂载
onMounted(() => {
  nextTick(() => {
    if (previewMode.value === 'canvas') {
      initCanvasRenderer()
    }
  })
})
</script>

<style scoped>
.enhanced-preview {
  width: 100%;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.preview-header h4 {
  margin: 0;
  color: #333;
}

.preview-controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.preview-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  min-height: 200px;
}

.canvas-preview,
.svg-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
}

.loading-overlay span {
  margin-top: 0.5rem;
  color: #666;
}

.preview-info {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-item label {
  font-weight: 500;
  color: #666;
  font-size: 12px;
}

.info-item span {
  color: #333;
  font-size: 12px;
}

.elements-list {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.elements-list h5 {
  margin: 0 0 0.75rem 0;
  color: #333;
}

.element-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.element-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.element-item:hover {
  border-color: #409eff;
  background: #f0f9ff;
}

.element-item.active {
  border-color: #409eff;
  background: #e6f7ff;
}

.element-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.element-icon :deep(svg) {
  max-width: 20px;
  max-height: 20px;
}

.element-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.element-name {
  font-size: 12px;
  font-weight: 500;
  color: #333;
}

.element-position {
  font-size: 10px;
  color: #666;
}

.element-controls {
  display: flex;
  gap: 0.25rem;
}
</style>
