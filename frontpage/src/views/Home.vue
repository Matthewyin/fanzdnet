<template>
  <div class="home">
    <!-- 免责声明弹窗 -->
    <DisclaimerModal 
      v-model="disclaimerVisible" 
      @accept="handleDisclaimerAccept"
      @close="handleDisclaimerClose"
    />

    <el-container>
      <el-main>
        <!-- 主轮播区域 -->
        <HeroCarousel />

        <!-- 功能模块区域 -->
        <FeatureModules @module-click="handleModuleClick" />

        <!-- AI应援物生成区域 -->
        <AIGenerator />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroCarousel from '@/components/HeroCarousel.vue'
import FeatureModules from '@/components/FeatureModules.vue'
import AIGenerator from '@/components/AIGenerator.vue'
import DisclaimerModal from '@/components/DisclaimerModal.vue'

const router = useRouter()

// 免责声明弹窗控制
const disclaimerVisible = ref(false)

// 处理免责声明接受
const handleDisclaimerAccept = ({ dontShowAgain }) => {
  disclaimerVisible.value = false
  if (dontShowAgain) {
    localStorage.setItem('disclaimer-dismissed', 'true')
  }
}

// 处理免责声明关闭
const handleDisclaimerClose = ({ dontShowAgain }) => {
  disclaimerVisible.value = false
  if (dontShowAgain) {
    localStorage.setItem('disclaimer-dismissed', 'true')
  }
}

// 处理功能模块点击
const handleModuleClick = (module) => {
  const routeMap = {
    'schedule': '/schedule',
    'moments': '/gallery',
    'timeline': '/timeline',
    'interview': '/interview'
  }
  
  const route = routeMap[module.id]
  if (route) {
    router.push(route)
  }
}

// 页面加载时检查是否需要显示免责声明
onMounted(() => {
  const dismissed = localStorage.getItem('disclaimer-dismissed')
  if (dismissed !== 'true') {
    // 延迟1秒显示弹窗，让页面先加载完成
    setTimeout(() => {
      disclaimerVisible.value = true
    }, 1000)
  }
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #f8f9ff 50%, #ffffff 100%);
  overflow-x: hidden;
}

.el-main {
  padding: 0;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .home {
    background: linear-gradient(135deg, #e3f2fd 0%, #f8f9ff 100%);
  }
}

@media (max-width: 480px) {
  .home {
    background: linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%);
  }
}
</style>
