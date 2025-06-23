<template>
  <div class="ai-generator-page">
    <div class="page-container">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">AI智能应援物生成器</h1>
          <p class="page-subtitle">用AI为樊振东创造独特的应援内容</p>

          <!-- 功能介绍 -->
          <div class="feature-intro">
            <div class="feature-item">
              <el-icon class="feature-icon"><ChatDotRound /></el-icon>
              <span>智能口号</span>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><PictureRounded /></el-icon>
              <span>应援横幅</span>
            </div>
            <div class="feature-item">
              <el-icon class="feature-icon"><Sunny /></el-icon>
              <span>趣味表情包</span>
            </div>
          </div>
        </div>
      </div>

      <!-- AI生成器组件 -->
      <AIGenerator />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAIGeneratorStore } from '@/stores'
import AIGenerator from '@/components/business/AIGenerator.vue'
import {
  ChatDotRound,
  PictureRounded,
  Sunny
} from '@element-plus/icons-vue'

const aiStore = useAIGeneratorStore()

// 生命周期
onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
.ai-generator-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.feature-intro {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 4px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }

  .page-header {
    padding: 30px 16px;
    margin-bottom: 20px;
  }

  .page-title {
    font-size: 2rem;
  }

  .feature-intro {
    flex-direction: column;
    gap: 20px;
  }

  .feature-item {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }

  .feature-icon {
    font-size: 1.5rem;
  }
}
</style>
