<template>
  <div class="ai-generator">
    <div class="container">
      <div class="ai-header">
        <h2 class="ai-title">AI应援物生成器</h2>
        <p class="ai-subtitle">为樊振东生成专属应援物品，展现你的支持</p>
      </div>

      <div class="ai-content">
        <div class="ai-form">
          <div class="form-group">
            <label class="form-label">选择应援物类型</label>
            <el-select 
              v-model="selectedType" 
              placeholder="请选择应援物类型"
              class="type-select"
            >
              <el-option
                v-for="type in supportTypes"
                :key="type.value"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </div>

          <div class="form-group">
            <label class="form-label">应援文字</label>
            <el-input
              v-model="supportText"
              type="textarea"
              :rows="3"
              placeholder="输入你想对樊振东说的话..."
              maxlength="100"
              show-word-limit
              class="text-input"
            />
          </div>

          <div class="form-group">
            <label class="form-label">选择风格</label>
            <div class="style-options">
              <div 
                v-for="style in styles"
                :key="style.value"
                class="style-option"
                :class="{ active: selectedStyle === style.value }"
                @click="selectedStyle = style.value"
              >
                <div class="style-preview" :style="{ background: style.color }"></div>
                <span class="style-name">{{ style.label }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <el-button 
              type="primary" 
              size="large"
              :loading="generating"
              @click="generateSupport"
              class="generate-btn"
            >
              <i class="el-icon-magic-stick"></i>
              {{ generating ? '生成中...' : '生成应援物' }}
            </el-button>
          </div>
        </div>

        <div class="ai-preview">
          <div class="preview-container">
            <div v-if="!generatedItem" class="preview-placeholder">
              <i class="el-icon-picture"></i>
              <p>选择类型和风格后，点击生成按钮预览应援物</p>
            </div>
            <div v-else class="preview-result">
              <img :src="generatedItem.image" :alt="generatedItem.name" />
              <div class="result-info">
                <h4>{{ generatedItem.name }}</h4>
                <p>{{ generatedItem.description }}</p>
                <div class="result-actions">
                  <el-button size="small" @click="downloadItem">下载</el-button>
                  <el-button size="small" @click="shareItem">分享</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 响应式数据
const selectedType = ref('')
const supportText = ref('')
const selectedStyle = ref('classic')
const generating = ref(false)
const generatedItem = ref(null)

// 应援物类型
const supportTypes = ref([
  { value: 'banner', label: '横幅标语' },
  { value: 'poster', label: '应援海报' },
  { value: 'sticker', label: '贴纸' },
  { value: 'card', label: '应援卡片' }
])

// 风格选项
const styles = ref([
  { value: 'classic', label: '经典', color: 'linear-gradient(45deg, #1e40af, #3b82f6)' },
  { value: 'modern', label: '现代', color: 'linear-gradient(45deg, #7c3aed, #a855f7)' },
  { value: 'energetic', label: '活力', color: 'linear-gradient(45deg, #dc2626, #f59e0b)' },
  { value: 'elegant', label: '优雅', color: 'linear-gradient(45deg, #059669, #10b981)' }
])

// 生成应援物
const generateSupport = async () => {
  if (!selectedType.value) {
    ElMessage.warning('请选择应援物类型')
    return
  }
  
  if (!supportText.value.trim()) {
    ElMessage.warning('请输入应援文字')
    return
  }

  generating.value = true
  
  try {
    // 模拟AI生成过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    generatedItem.value = {
      name: `${supportTypes.value.find(t => t.value === selectedType.value)?.label} - ${styles.value.find(s => s.value === selectedStyle.value)?.label}风格`,
      description: `包含文字："${supportText.value}"`,
      image: '/images/ai-generated-sample.jpg' // 这里应该是实际生成的图片
    }
    
    ElMessage.success('应援物生成成功！')
  } catch (error) {
    ElMessage.error('生成失败，请重试')
  } finally {
    generating.value = false
  }
}

// 下载应援物
const downloadItem = () => {
  ElMessage.success('下载功能开发中...')
}

// 分享应援物
const shareItem = () => {
  ElMessage.success('分享功能开发中...')
}
</script>

<style scoped>
.ai-generator {
  padding: 80px 0;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.ai-header {
  text-align: center;
  margin-bottom: 60px;
}

.ai-title {
  font-size: 36px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
}

.ai-subtitle {
  font-size: 18px;
  color: #64748b;
  line-height: 1.6;
}

.ai-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.ai-form {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 32px;
}

.form-label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.type-select,
.text-input {
  width: 100%;
}

.style-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.style-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.style-option:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.style-option.active {
  border-color: #3b82f6;
  background: #dbeafe;
}

.style-preview {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.style-name {
  font-weight: 500;
  color: #374151;
}

.form-actions {
  text-align: center;
}

.generate-btn {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
}

.ai-preview {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.preview-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-placeholder {
  text-align: center;
  color: #9ca3af;
}

.preview-placeholder i {
  font-size: 64px;
  margin-bottom: 16px;
  display: block;
}

.preview-result img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 20px;
}

.result-info h4 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.result-info p {
  color: #64748b;
  margin-bottom: 20px;
}

.result-actions {
  display: flex;
  gap: 12px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .ai-generator {
    padding: 60px 0;
  }

  .ai-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .ai-form,
  .ai-preview {
    padding: 30px 20px;
  }

  .ai-title {
    font-size: 28px;
  }

  .style-options {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .ai-header {
    margin-bottom: 40px;
  }

  .ai-title {
    font-size: 24px;
  }

  .ai-subtitle {
    font-size: 16px;
  }

  .ai-form,
  .ai-preview {
    padding: 20px 16px;
  }

  .form-group {
    margin-bottom: 24px;
  }
}
</style>
