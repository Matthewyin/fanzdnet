<template>
  <div class="slogan-result">
    <div class="result-header">
      <h4>生成的应援口号</h4>
      <div class="result-actions">
        <el-button size="small" @click="copyAll">
          <el-icon><DocumentCopy /></el-icon>
          复制全部
        </el-button>
        <el-button size="small" @click="regenerate">
          <el-icon><Refresh /></el-icon>
          重新生成
        </el-button>
      </div>
    </div>

    <div class="slogans-list">
      <div
        v-for="(slogan, index) in slogans"
        :key="index"
        class="slogan-item"
        @click="selectSlogan(index)"
        :class="{ selected: selectedIndex === index }"
      >
        <div class="slogan-content">
          <div class="slogan-type">{{ slogan.type }}</div>
          <div class="slogan-text">{{ slogan.text }}</div>
        </div>
        <div class="slogan-actions">
          <el-button size="mini" @click.stop="copySlogan(slogan.text)">
            <el-icon><DocumentCopy /></el-icon>
          </el-button>
          <el-button size="mini" @click.stop="likeSlogan(index)">
            <el-icon><Star /></el-icon>
            {{ slogan.likes || 0 }}
          </el-button>
        </div>
      </div>
    </div>

    <div class="result-info">
      <el-descriptions :column="2" size="small">
        <el-descriptions-item label="生成数量">
          {{ slogans.length }}条
        </el-descriptions-item>
        <el-descriptions-item label="风格">
          {{ parameters.style }}
        </el-descriptions-item>
        <el-descriptions-item label="长度">
          {{ getLengthText(parameters.length) }}
        </el-descriptions-item>
        <el-descriptions-item label="生成时间">
          {{ result.generationTime || '1.8' }}秒
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="usage-tips">
      <el-alert
        title="使用提示"
        type="info"
        :closable="false"
        show-icon
      >
        <template #default>
          <ul>
            <li>点击口号可以选中并预览效果</li>
            <li>可以复制单个口号或全部口号</li>
            <li>点击星星为喜欢的口号点赞</li>
          </ul>
        </template>
      </el-alert>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { DocumentCopy, Refresh, Star } from '@element-plus/icons-vue'

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

const emit = defineEmits(['regenerate', 'select'])

const selectedIndex = ref(0)

const slogans = computed(() => {
  if (props.result.slogans) {
    return props.result.slogans.map(slogan => ({
      ...slogan,
      likes: slogan.likes || Math.floor(Math.random() * 50)
    }))
  }
  
  // 默认示例数据
  return [
    { type: '简短有力', text: '樊振东必胜！', likes: 42 },
    { type: '朗朗上口', text: '东哥威武，球技超群！', likes: 38 },
    { type: '押韵节拍', text: '樊振东，真英雄，乒乓场上显神通！', likes: 35 },
    { type: '激励鼓舞', text: '永不放弃，勇往直前，樊振东加油！', likes: 41 },
    { type: '胜利祝愿', text: '愿你每球都精彩，每赛都夺冠！', likes: 33 }
  ]
})

const getLengthText = (length) => {
  const map = {
    short: '短句',
    medium: '中等',
    long: '长句'
  }
  return map[length] || '中等'
}

const selectSlogan = (index) => {
  selectedIndex.value = index
  emit('select', slogans.value[index])
}

const copySlogan = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('口号已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const copyAll = async () => {
  try {
    const allSlogans = slogans.value
      .map((slogan, index) => `${index + 1}. ${slogan.text}`)
      .join('\n')
    
    await navigator.clipboard.writeText(allSlogans)
    ElMessage.success('所有口号已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}

const likeSlogan = (index) => {
  slogans.value[index].likes = (slogans.value[index].likes || 0) + 1
  ElMessage.success('点赞成功！')
}

const regenerate = () => {
  emit('regenerate')
}
</script>

<style scoped>
.slogan-result {
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

.slogans-list {
  flex: 1;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.slogan-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.slogan-item:hover {
  background: #f0f9ff;
  transform: translateY(-1px);
}

.slogan-item.selected {
  background: #e6f7ff;
  border-color: #409eff;
}

.slogan-content {
  flex: 1;
}

.slogan-type {
  font-size: 12px;
  color: #666;
  margin-bottom: 0.25rem;
}

.slogan-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
}

.slogan-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.result-info {
  background: #fafafa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.usage-tips {
  margin-top: 1rem;
}

.usage-tips ul {
  margin: 0;
  padding-left: 1.2rem;
}

.usage-tips li {
  margin-bottom: 0.25rem;
  font-size: 12px;
  color: #666;
}

:deep(.el-descriptions__label) {
  font-weight: normal;
  color: #666;
}

:deep(.el-descriptions__content) {
  color: #333;
}
</style>
