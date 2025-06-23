<template>
  <transition name="slide-up">
    <div v-if="showUpdatePrompt" class="pwa-update-prompt">
      <div class="update-content">
        <div class="update-info">
          <el-icon class="update-icon" color="#409EFF"><Refresh /></el-icon>
          <div class="update-text">
            <h4>发现新版本</h4>
            <p>网站已更新，点击刷新获取最新功能</p>
          </div>
        </div>
        <div class="update-actions">
          <el-button size="small" @click="dismissUpdate">稍后</el-button>
          <el-button type="primary" size="small" @click="updateApp">刷新</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

const showUpdatePrompt = ref(false)

onMounted(() => {
  // 检查是否支持 Service Worker
  if ('serviceWorker' in navigator) {
    // 监听 Service Worker 更新
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // 新的 Service Worker 已激活
      showUpdatePrompt.value = true
    })
    
    // 检查是否有等待中的 Service Worker
    navigator.serviceWorker.ready.then(registration => {
      if (registration.waiting) {
        showUpdatePrompt.value = true
      }
      
      // 监听新的 Service Worker 安装
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdatePrompt.value = true
            }
          })
        }
      })
    })
  }
})

const updateApp = () => {
  showUpdatePrompt.value = false
  
  // 如果有等待中的 Service Worker，激活它
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
    })
  }
  
  // 刷新页面
  window.location.reload()
}

const dismissUpdate = () => {
  showUpdatePrompt.value = false
  
  // 30分钟后再次提示
  setTimeout(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        if (registration.waiting) {
          showUpdatePrompt.value = true
        }
      })
    }
  }, 30 * 60 * 1000)
}
</script>

<style scoped>
.pwa-update-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  z-index: 2000;
  max-width: 400px;
  width: calc(100% - 40px);
}

.update-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.update-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.update-icon {
  flex-shrink: 0;
}

.update-text h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #303133;
}

.update-text p {
  margin: 0;
  font-size: 12px;
  color: #606266;
  line-height: 1.4;
}

.update-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

/* 动画效果 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateX(-50%) translateY(100px);
  opacity: 0;
}

/* 响应式样式 */
@media (max-width: 480px) {
  .pwa-update-prompt {
    bottom: 16px;
    width: calc(100% - 32px);
  }
  
  .update-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .update-actions {
    align-self: flex-end;
  }
}
</style>
