<template>
  <div class="emoji-result">
    <div class="result-header">
      <h4>生成的表情包</h4>
      <div class="result-actions">
        <el-button size="small" @click="downloadEmoji">
          <el-icon><Download /></el-icon>
          下载
        </el-button>
        <el-button size="small" @click="regenerate">
          <el-icon><Refresh /></el-icon>
          重新生成
        </el-button>
      </div>
    </div>

    <div class="emoji-preview">
      <div class="emoji-canvas" :style="canvasStyle" ref="emojiRef">
        <div class="emoji-background" :style="backgroundStyle"></div>
        <div class="emoji-face">
          <div class="emoji-eyes">
            <div class="emoji-eye left"></div>
            <div class="emoji-eye right"></div>
          </div>
          <div class="emoji-mouth" :class="getMouthClass()"></div>
        </div>
        <div v-if="parameters.hasText" class="emoji-text" :style="textStyle">
          {{ parameters.text || '樊振东加油！' }}
        </div>
        <div v-if="hasEffects" class="emoji-effects">
          <div v-if="parameters.effects.includes('发光')" class="glow-effect"></div>
          <div v-if="parameters.effects.includes('阴影')" class="shadow-effect"></div>
        </div>
      </div>
    </div>

    <div class="emoji-variations">
      <h5>表情变化</h5>
      <div class="variation-grid">
        <div
          v-for="(variation, index) in variations"
          :key="index"
          class="variation-item"
          @click="selectVariation(variation)"
          :class="{ active: selectedVariation === variation.id }"
        >
          <div class="variation-preview">{{ variation.emoji }}</div>
          <div class="variation-name">{{ variation.name }}</div>
        </div>
      </div>
    </div>

    <div class="result-info">
      <el-descriptions :column="2" size="small">
        <el-descriptions-item label="尺寸">
          {{ parameters.size }}×{{ parameters.size }}px
        </el-descriptions-item>
        <el-descriptions-item label="格式">
          {{ parameters.format.toUpperCase() }}
        </el-descriptions-item>
        <el-descriptions-item label="风格">
          {{ parameters.style }}
        </el-descriptions-item>
        <el-descriptions-item label="生成时间">
          {{ result.generationTime || '3.1' }}秒
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const emit = defineEmits(['download', 'regenerate', 'select'])

const emojiRef = ref(null)
const selectedVariation = ref('happy')

const canvasStyle = computed(() => ({
  width: `${Math.min(props.parameters.size, 300)}px`,
  height: `${Math.min(props.parameters.size, 300)}px`,
  backgroundColor: props.parameters.hasBackground 
    ? props.parameters.backgroundColor 
    : 'transparent',
  position: 'relative',
  margin: '0 auto',
  borderRadius: '50%',
  overflow: 'hidden'
}))

const backgroundStyle = computed(() => {
  if (!props.parameters.hasBackground) return {}
  
  const { backgroundPattern, backgroundColor } = props.parameters
  
  switch (backgroundPattern) {
    case 'gradient':
      return {
        background: `linear-gradient(45deg, ${backgroundColor}, #ffffff)`
      }
    case 'stars':
      return {
        background: `${backgroundColor} url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 1l2.5 7.5h7.5l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z' fill='%23ffffff' opacity='0.3'/%3E%3C/svg%3E")`
      }
    case 'hearts':
      return {
        background: `${backgroundColor} url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 18c-1-1-8-6-8-12 0-3 2-5 5-5 2 0 3 1 3 3 0-2 1-3 3-3 3 0 5 2 5 5 0 6-7 11-8 12z' fill='%23ff69b4' opacity='0.3'/%3E%3C/svg%3E")`
      }
    default:
      return { backgroundColor }
  }
})

const textStyle = computed(() => ({
  color: props.parameters.textColor,
  fontSize: `${Math.max(12, props.parameters.size / 15)}px`,
  fontWeight: 'bold',
  textAlign: 'center',
  position: 'absolute',
  bottom: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80%'
}))

const hasEffects = computed(() => {
  return props.parameters.effects && props.parameters.effects.length > 0
})

const variations = [
  { id: 'happy', name: '开心', emoji: '😊' },
  { id: 'excited', name: '激动', emoji: '🤩' },
  { id: 'strong', name: '加油', emoji: '💪' },
  { id: 'victory', name: '胜利', emoji: '✌️' },
  { id: 'love', name: '爱心', emoji: '❤️' },
  { id: 'cool', name: '酷炫', emoji: '😎' },
  { id: 'laugh', name: '大笑', emoji: '😂' },
  { id: 'wink', name: '眨眼', emoji: '😉' }
]

const getMouthClass = () => {
  const expressions = props.parameters.expressions || ['开心']
  if (expressions.includes('开心')) return 'happy'
  if (expressions.includes('激动')) return 'excited'
  if (expressions.includes('加油')) return 'determined'
  return 'happy'
}

const selectVariation = (variation) => {
  selectedVariation.value = variation.id
  emit('select', variation)
}

const downloadEmoji = async () => {
  try {
    if (!emojiRef.value) return
    
    const canvas = await html2canvas(emojiRef.value, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    })
    
    const link = document.createElement('a')
    link.download = `樊振东表情包_${Date.now()}.${props.parameters.format}`
    link.href = canvas.toDataURL(`image/${props.parameters.format}`)
    link.click()
    
    emit('download', {
      type: 'emoji',
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
.emoji-result {
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

.emoji-preview {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.emoji-canvas {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
}

.emoji-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.emoji-face {
  position: relative;
  z-index: 2;
}

.emoji-eyes {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  justify-content: center;
}

.emoji-eye {
  width: 15px;
  height: 15px;
  background: #333;
  border-radius: 50%;
}

.emoji-mouth {
  width: 30px;
  height: 15px;
  border: 3px solid #333;
  border-top: none;
  border-radius: 0 0 30px 30px;
  margin: 0 auto;
}

.emoji-mouth.excited {
  width: 40px;
  height: 20px;
  background: #ff6b6b;
}

.emoji-mouth.determined {
  width: 25px;
  height: 8px;
  border-radius: 0;
  background: #333;
}

.emoji-text {
  z-index: 3;
}

.emoji-effects .glow-effect {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  box-shadow: 0 0 20px #ffd700;
  pointer-events: none;
}

.emoji-effects .shadow-effect {
  position: absolute;
  bottom: -20px;
  left: 10%;
  right: 10%;
  height: 20px;
  background: rgba(0,0,0,0.2);
  border-radius: 50%;
  filter: blur(10px);
}

.emoji-variations {
  margin-bottom: 1rem;
}

.emoji-variations h5 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.variation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 0.5rem;
}

.variation-item {
  text-align: center;
  padding: 0.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.variation-item:hover {
  border-color: #409eff;
  transform: translateY(-2px);
}

.variation-item.active {
  border-color: #409eff;
  background: #f0f9ff;
}

.variation-preview {
  font-size: 24px;
  margin-bottom: 0.25rem;
}

.variation-name {
  font-size: 12px;
  color: #666;
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
