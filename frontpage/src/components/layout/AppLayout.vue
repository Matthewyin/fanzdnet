<template>
  <div class="app-layout">
    <!-- 全局加载遮罩 -->
    <div
      v-if="appStore.loading"
      v-loading="true"
      element-loading-text="加载中..."
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="loading-overlay"
    ></div>

    <!-- 离线提示 -->
    <transition name="slide-down">
      <div v-if="!appStore.isOnline" class="offline-banner">
        <el-icon class="offline-icon"><Connection /></el-icon>
        <span>网络连接已断开，部分功能可能无法正常使用</span>
      </div>
    </transition>

    <!-- 页面布局容器 -->
    <el-container class="layout-container">
      <!-- 页面头部 -->
      <AppHeader />
      
      <!-- 主要内容区域 -->
      <el-main class="main-content">
        <!-- 路由视图 -->
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="keepAliveComponents">
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
      
      <!-- 页面底部 -->
      <AppFooter />
    </el-container>

    <!-- 全局对话框和弹窗 -->
    <GlobalDialogs />
    
    <!-- PWA 更新提示 -->
    <PWAUpdatePrompt />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore, useUserStore } from '@/stores'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import GlobalDialogs from '../common/GlobalDialogs.vue'
import PWAUpdatePrompt from '../common/PWAUpdatePrompt.vue'
import { Connection } from '@element-plus/icons-vue'


const appStore = useAppStore()
const userStore = useUserStore()

// 需要缓存的组件
const keepAliveComponents = ref(['Home', 'Gallery'])





// 生命周期
onMounted(() => {
  // 初始化应用
  initApp()

  // 监听网络状态变化
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // 监听页面可见性变化
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)

  // 初始检测设备类型
  handleResize()
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  window.removeEventListener('resize', handleResize)
})

// 方法
const initApp = async () => {
  try {
    // 设置加载状态
    appStore.setLoading(true)

    // 初始化应用状态
    appStore.initApp()

    // 初始化用户状态
    userStore.initUser()

    // 检查是否需要显示免责声明
    checkDisclaimerAcceptance()

    // 预加载关键资源
    preloadResources()

    // 初始化完成，关闭加载状态
    appStore.setLoading(false)

  } catch (error) {
    console.error('应用初始化失败:', error)
    // 即使出错也要关闭加载状态
    appStore.setLoading(false)
  }
}

const checkDisclaimerAcceptance = () => {
  const accepted = localStorage.getItem('disclaimer-accepted')
  if (accepted !== 'true') {
    // 显示免责声明对话框
    showDisclaimerDialog()
  }
}

const showDisclaimerDialog = () => {
  // 这里可以显示免责声明对话框
  // 暂时自动接受，实际应用中应该显示对话框让用户确认
  appStore.acceptDisclaimer()
}

const preloadResources = () => {
  // 预加载关键图片和资源
  const criticalImages = [
    '/images/logo.png',
    '/images/fzd-avatar.jpg'
  ]
  
  criticalImages.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

const handleOnline = () => {
  appStore.setOnlineStatus(true)
  // 网络恢复时可以重新获取数据
  console.log('网络已连接')
}

const handleOffline = () => {
  appStore.setOnlineStatus(false)
  console.log('网络已断开')
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    // 页面隐藏时的处理
    console.log('页面隐藏')
  } else {
    // 页面显示时的处理
    console.log('页面显示')
    // 可以在这里刷新数据
  }
}

const handleResize = () => {
  const width = window.innerWidth
  
  if (width < 768) {
    appStore.setDeviceType('mobile')
  } else if (width < 1024) {
    appStore.setDeviceType('tablet')
  } else {
    appStore.setDeviceType('desktop')
  }
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.offline-banner {
  background: #f56c6c;
  color: white;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
}

.offline-icon {
  flex-shrink: 0;
}

.layout-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 0 !important; /* 强制覆盖 Element Plus 默认的 20px padding */
  background: #f8f9fa;
  min-height: calc(100vh - 64px - 200px); /* 减去头部和底部的高度 */
  overflow-x: hidden;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-content {
    min-height: calc(100vh - 64px - 150px);
  }
  
  .offline-banner {
    padding: 6px 16px;
    font-size: 13px;
  }
}

/* 滚动条样式 */
:deep(.el-scrollbar__wrap) {
  scrollbar-width: thin;
  scrollbar-color: #c1c1c1 transparent;
}

:deep(.el-scrollbar__wrap::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(.el-scrollbar__wrap::-webkit-scrollbar-thumb) {
  background-color: #c1c1c1;
  border-radius: 3px;
}

:deep(.el-scrollbar__wrap::-webkit-scrollbar-thumb:hover) {
  background-color: #a8a8a8;
}

:deep(.el-scrollbar__wrap::-webkit-scrollbar-track) {
  background-color: transparent;
}

/* 全局样式调整 */
:deep(.el-card) {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

:deep(.el-button) {
  border-radius: 4px;
}

:deep(.el-input__wrapper) {
  border-radius: 4px;
}

/* 打印样式 */
@media print {
  .app-layout {
    background: white !important;
  }
  
  .offline-banner,
  .loading-overlay {
    display: none !important;
  }
}
</style>
