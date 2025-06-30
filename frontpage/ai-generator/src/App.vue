<template>
  <div id="app">
    <el-container class="app-container">
      <!-- 顶部导航 -->
      <el-header class="app-header">
        <div class="header-content">
          <div class="logo">
            <h1>樊振东球迷网站AI应援物生成器</h1>
          </div>
          <div class="nav-actions">
            <el-button type="primary" @click="showAbout = true">
              关于项目
            </el-button>
          </div>
        </div>
      </el-header>

      <!-- 主要内容 -->
      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>

    <!-- 关于对话框 -->
    <el-dialog v-model="showAbout" title="关于项目" width="600px">
      <div class="about-content">
        <h3>樊振东球迷网站AI应援物生成器</h3>
        <p>这是一个专为樊振东球迷打造的AI应援物生成平台，支持：</p>
        <ul>
          <li>🎨 <strong>应援横幅生成</strong>：8种专业模板，丰富视觉元素</li>
          <li>📢 <strong>应援口号生成</strong>：AI智能创作，多种风格</li>
          <li>😊 <strong>表情包制作</strong>：动态生成，支持GIF格式</li>
        </ul>
        
        <h4>新增功能特性：</h4>
        <ul>
          <li>✨ 视觉元素库：樊振东主题图标、乒乓球元素、荣誉元素等</li>
          <li>🎯 实时预览：Canvas/SVG双引擎渲染</li>
          <li>🤖 AI增强：Gemini API深度集成</li>
          <li>🎨 多元素组合：支持位置、大小、透明度等属性调节</li>
        </ul>

        <div class="tech-stack">
          <h4>技术栈：</h4>
          <el-tag size="small" style="margin: 2px;">Vue 3</el-tag>
          <el-tag size="small" style="margin: 2px;">Element Plus</el-tag>
          <el-tag size="small" style="margin: 2px;">Canvas API</el-tag>
          <el-tag size="small" style="margin: 2px;">SVG</el-tag>
          <el-tag size="small" style="margin: 2px;">Gemini AI</el-tag>
          <el-tag size="small" style="margin: 2px;">Node.js</el-tag>
          <el-tag size="small" style="margin: 2px;">Python FastAPI</el-tag>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="showAbout = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showAbout = ref(false)
</script>

<style scoped>
.app-container {
  height: 100vh;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 2rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.app-main {
  padding: 0;
  background: #f5f7fa;
}

.about-content {
  line-height: 1.6;
}

.about-content h3 {
  color: #409eff;
  margin-bottom: 1rem;
}

.about-content h4 {
  color: #333;
  margin: 1.5rem 0 0.5rem 0;
}

.about-content ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.about-content li {
  margin: 0.5rem 0;
}

.tech-stack {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

/* 全局样式重置 */
:global(body) {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

:global(#app) {
  height: 100vh;
}
</style>
