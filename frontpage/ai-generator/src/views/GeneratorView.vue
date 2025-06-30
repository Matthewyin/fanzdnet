<template>
  <div class="generator-container">
    <!-- 头部导航 -->
    <header class="generator-header">
      <div class="header-content">
        <h1 class="title">
          <el-icon><Star /></el-icon>
          樊振东AI应援物生成器
        </h1>
        <div class="header-actions">
          <el-button @click="goToEnhanced" type="success">
            <el-icon><Magic /></el-icon>
            增强版生成器
          </el-button>
          <div class="user-info" v-if="userStore.isLoggedIn">
            <span>欢迎，{{ userStore.user.nickname }}</span>
            <el-button @click="logout" type="text">退出</el-button>
          </div>
          <div v-else>
            <el-button @click="showLogin = true" type="primary">登录</el-button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="generator-main">
      <div class="main-content">
        <!-- 左侧：生成器选择和参数配置 -->
        <aside class="generator-sidebar">
          <div class="generator-types">
            <h3>选择生成类型</h3>
            <div class="type-cards">
              <div 
                v-for="type in generatorTypes" 
                :key="type.id"
                :class="['type-card', { active: selectedType === type.id }]"
                @click="selectType(type.id)"
              >
                <el-icon class="type-icon">
                  <component :is="type.icon" />
                </el-icon>
                <h4>{{ type.name }}</h4>
                <p>{{ type.description }}</p>
              </div>
            </div>
          </div>

          <!-- 参数配置面板 -->
          <div class="parameter-panel" v-if="selectedType">
            <h3>参数配置</h3>
            <component 
              :is="getParameterComponent(selectedType)"
              v-model="parameters"
              @update="onParametersUpdate"
            />
          </div>
        </aside>

        <!-- 右侧：预览和生成区域 -->
        <section class="generator-workspace">
          <!-- 输入区域 -->
          <div class="input-section">
            <h3>输入您的创意</h3>
            <el-input
              v-model="prompt"
              type="textarea"
              :rows="4"
              placeholder="请描述您想要的应援物内容，例如：为樊振东加油的横幅，要有激励性的文字..."
              maxlength="500"
              show-word-limit
            />
            
            <div class="action-buttons">
              <el-button 
                type="primary" 
                size="large"
                :loading="generating"
                :disabled="!prompt.trim() || !selectedType"
                @click="generateContent"
              >
                <el-icon><Magic /></el-icon>
                {{ generating ? '生成中...' : '开始生成' }}
              </el-button>
              
              <el-button 
                v-if="lastResult"
                @click="downloadResult"
                type="success"
              >
                <el-icon><Download /></el-icon>
                下载结果
              </el-button>
            </div>
          </div>

          <!-- 预览区域 -->
          <div class="preview-section">
            <h3>预览效果</h3>
            <div class="preview-canvas">
              <div v-if="generating" class="loading-state">
                <el-icon class="loading-icon"><Loading /></el-icon>
                <p>AI正在为您生成精彩内容...</p>
                <el-progress :percentage="progress" />
              </div>
              
              <div v-else-if="lastResult" class="result-display">
                <component 
                  :is="getResultComponent(selectedType)"
                  :result="lastResult"
                  :parameters="parameters"
                />
              </div>
              
              <div v-else class="empty-state">
                <el-icon><Picture /></el-icon>
                <p>选择生成类型并输入创意，开始创作您的应援物</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- 登录对话框 -->
    <LoginDialog v-model="showLogin" @success="onLoginSuccess" />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { 
  Star, Magic, Download, Loading, Picture,
  Flag, ChatDotRound, Sunny
} from '@element-plus/icons-vue'

import { useUserStore } from '@/stores/user'
import { useGeneratorStore } from '@/stores/generator'
import LoginDialog from '@/components/LoginDialog.vue'

// 参数配置组件
import BannerParameters from '@/components/generator/BannerParameters.vue'
import SloganParameters from '@/components/generator/SloganParameters.vue'
import EmojiParameters from '@/components/generator/EmojiParameters.vue'

// 结果显示组件
import BannerResult from '@/components/generator/BannerResult.vue'
import SloganResult from '@/components/generator/SloganResult.vue'
import EmojiResult from '@/components/generator/EmojiResult.vue'

const userStore = useUserStore()
const generatorStore = useGeneratorStore()

// 响应式数据
const showLogin = ref(false)
const selectedType = ref('')
const prompt = ref('')
const parameters = reactive({})
const generating = ref(false)
const progress = ref(0)
const lastResult = ref(null)

// 生成器类型配置
const generatorTypes = [
  {
    id: 'banner',
    name: '应援横幅',
    description: '生成精美的应援横幅图片',
    icon: Flag
  },
  {
    id: 'slogan',
    name: '应援口号',
    description: '创作朗朗上口的应援口号',
    icon: ChatDotRound
  },
  {
    id: 'emoji',
    name: '表情包',
    description: '制作有趣的应援表情包',
    icon: Sunny
  }
]

// 计算属性
const canGenerate = computed(() => {
  return prompt.value.trim() && selectedType.value && !generating.value
})

// 方法
const selectType = (type) => {
  selectedType.value = type
  // 重置参数
  Object.keys(parameters).forEach(key => delete parameters[key])
  // 设置默认参数
  setDefaultParameters(type)
}

const setDefaultParameters = (type) => {
  switch (type) {
    case 'banner':
      Object.assign(parameters, {
        width: 800,
        height: 300,
        backgroundColor: '#ff0000',
        textColor: '#ffffff',
        fontSize: 48,
        fontWeight: 'bold'
      })
      break
    case 'slogan':
      Object.assign(parameters, {
        style: '激励',
        length: 'medium',
        rhyme: true
      })
      break
    case 'emoji':
      Object.assign(parameters, {
        style: '可爱',
        size: 300,
        format: 'png'
      })
      break
  }
}

const onParametersUpdate = (newParams) => {
  Object.assign(parameters, newParams)
}

const generateContent = async () => {
  if (!canGenerate.value) return

  try {
    generating.value = true
    progress.value = 0
    
    // 模拟进度更新
    const progressInterval = setInterval(() => {
      if (progress.value < 90) {
        progress.value += Math.random() * 20
      }
    }, 500)

    const result = await generatorStore.generateContent({
      type: selectedType.value,
      prompt: prompt.value,
      parameters: { ...parameters }
    })

    clearInterval(progressInterval)
    progress.value = 100

    lastResult.value = result
    ElMessage.success('生成成功！')

  } catch (error) {
    console.error('生成失败:', error)
    ElMessage.error(error.message || '生成失败，请重试')
  } finally {
    generating.value = false
    setTimeout(() => {
      progress.value = 0
    }, 1000)
  }
}

const downloadResult = () => {
  if (!lastResult.value) return
  
  // 实现下载逻辑
  generatorStore.downloadResult(lastResult.value)
  ElMessage.success('下载开始')
}

const getParameterComponent = (type) => {
  const components = {
    banner: BannerParameters,
    slogan: SloganParameters,
    emoji: EmojiParameters
  }
  return components[type]
}

const getResultComponent = (type) => {
  const components = {
    banner: BannerResult,
    slogan: SloganResult,
    emoji: EmojiResult
  }
  return components[type]
}

const logout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await userStore.logout()
    ElMessage.success('已退出登录')
  } catch (error) {
    // 用户取消
  }
}

const onLoginSuccess = () => {
  showLogin.value = false
  ElMessage.success('登录成功')
}

const goToEnhanced = () => {
  // 导航到增强版生成器
  window.location.href = '/enhanced'
}

// 生命周期
onMounted(() => {
  // 默认选择第一个类型
  if (generatorTypes.length > 0) {
    selectType(generatorTypes[0].id)
  }
})
</script>

<style scoped>
.generator-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.generator-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.generator-main {
  padding: 2rem 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
}

.generator-sidebar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
}

.type-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.type-card {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.type-card:hover {
  border-color: #409eff;
  transform: translateY(-2px);
}

.type-card.active {
  border-color: #409eff;
  background: #f0f9ff;
}

.type-icon {
  font-size: 2rem;
  color: #409eff;
  margin-bottom: 0.5rem;
}

.parameter-panel {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
}

.generator-workspace {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
}

.input-section {
  margin-bottom: 2rem;
}

.action-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.preview-canvas {
  min-height: 400px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
}

.loading-state,
.empty-state {
  text-align: center;
  color: #666;
}

.loading-icon {
  font-size: 3rem;
  color: #409eff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.result-display {
  width: 100%;
  height: 100%;
}

h3 {
  color: #333;
  margin-bottom: 1rem;
}
</style>
