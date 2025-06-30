<template>
  <div class="banner-result">
    <div class="result-header">
      <h4>生成的横幅</h4>
      <div class="result-actions">
        <el-button size="small" @click="downloadImage">
          <el-icon><Download /></el-icon>
          下载
        </el-button>
        <el-button size="small" @click="regenerate">
          <el-icon><Refresh /></el-icon>
          重新生成
        </el-button>
      </div>
    </div>

    <div class="banner-preview">
      <div
        class="banner-canvas"
        :style="bannerStyle"
        ref="bannerRef"
      >
        <div class="banner-text" :style="textStyle">
          {{ result.content || '樊振东加油！' }}
        </div>
      </div>
    </div>

    <div class="result-info">
      <el-descriptions :column="2" size="small">
        <el-descriptions-item label="尺寸">
          {{ parameters.width }}×{{ parameters.height }}px
        </el-descriptions-item>
        <el-descriptions-item label="文件大小">
          {{ formatFileSize(estimatedSize) }}
        </el-descriptions-item>
        <el-descriptions-item label="生成时间">
          {{ result.generationTime || '2.3' }}秒
        </el-descriptions-item>
        <el-descriptions-item label="格式">
          PNG
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Download, Refresh } from '@element-plus/icons-vue'
import html2canvas from 'html2canvas'

const props = defineProps({
  result: {
    type: Object,
    required: true
  },
  parameters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['download', 'regenerate'])

const bannerRef = ref(null)

const bannerStyle = computed(() => ({
  width: `${props.parameters.width}px`,
  height: `${props.parameters.height}px`,
  backgroundColor: props.parameters.backgroundColor,
  border: props.parameters.hasBorder 
    ? `${props.parameters.borderWidth}px solid ${props.parameters.borderColor}`
    : 'none',
  boxShadow: props.parameters.hasShadow 
    ? '0 4px 8px rgba(0,0,0,0.3)'
    : 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  margin: '0 auto',
  maxWidth: '100%',
  transform: 'scale(0.8)',
  transformOrigin: 'center'
}))

const textStyle = computed(() => ({
  color: props.parameters.textColor,
  fontSize: `${props.parameters.fontSize * 0.8}px`,
  fontWeight: props.parameters.fontWeight,
  textAlign: props.parameters.textAlign,
  textShadow: props.parameters.hasShadow 
    ? '2px 2px 4px rgba(0,0,0,0.5)'
    : 'none',
  padding: '20px',
  wordBreak: 'break-word',
  lineHeight: '1.2'
}))

const estimatedSize = computed(() => {
  const { width, height } = props.parameters
  return Math.round(width * height * 3 / 1024) // 估算KB
})

const formatFileSize = (kb) => {
  if (kb < 1024) {
    return `${kb}KB`
  }
  return `${(kb / 1024).toFixed(1)}MB`
}

const downloadImage = async () => {
  try {
    if (!bannerRef.value) return
    
    const canvas = await html2canvas(bannerRef.value, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    })
    
    const link = document.createElement('a')
    link.download = `樊振东应援横幅_${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
    
    emit('download', {
      type: 'banner',
      data: canvas.toDataURL(),
      filename: link.download
    })
  } catch (error) {
    console.error('下载失败:', error)
  }
}

const regenerate = () => {
  emit('regenerate')
}
</script>

<style scoped>
.banner-result {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.result-header h4 {
  margin: 0;
  color: #333;
}

.result-actions {
  display: flex;
  gap: 0.5rem;
}

.banner-preview {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: auto;
}

.banner-canvas {
  border-radius: 4px;
  box-sizing: border-box;
}

.banner-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-info {
  background: #fafafa;
  padding: 1rem;
  border-radius: 8px;
}

:deep(.el-descriptions__label) {
  font-weight: normal;
  color: #666;
}

:deep(.el-descriptions__content) {
  color: #333;
}
</style>
