<template>
  <el-header class="app-header">
    <!-- 主导航栏 -->
    <div class="main-header">
      <div class="header-container">
        <!-- Logo和网站名称 -->
        <div class="header-brand">
          <router-link to="/" class="brand-link">
            <div class="brand-logo">
              <img src="/images/logo.svg" alt="FANZD.NET Logo" class="logo-svg" />
            </div>

          </router-link>
        </div>

        <!-- 导航菜单 -->
        <nav class="header-nav" v-if="!isMobile">
          <el-menu
            :default-active="activeMenu"
            mode="horizontal"
            :ellipsis="false"
            class="nav-menu"
            router
          >
            <el-menu-item index="/">
              <img src="/images/icons/home.svg" alt="首页" class="menu-icon" />
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/news">
              <img src="/images/icons/news.svg" alt="樊振东动态" class="menu-icon" />
              <span>樊振东动态</span>
            </el-menu-item>
            <el-menu-item index="/schedule">
              <img src="/images/icons/schedule.svg" alt="赛程安排" class="menu-icon" />
              <span>赛程安排</span>
            </el-menu-item>
            <el-menu-item index="/gallery">
              <img src="/images/icons/gallery.svg" alt="精彩瞬间" class="menu-icon" />
              <span>精彩瞬间</span>
            </el-menu-item>
            <el-menu-item index="/timeline">
              <img src="/images/icons/timeline.svg" alt="大事记" class="menu-icon" />
              <span>大事记</span>
            </el-menu-item>
            <el-menu-item index="/interview">
              <img src="/images/icons/interview.svg" alt="采访" class="menu-icon" />
              <span>采访</span>
            </el-menu-item>
            <el-menu-item index="/ai-generator">
              <img src="/images/icons/ai-generator.svg" alt="AI应援物生成器" class="menu-icon" />
              <span>AI应援物生成器</span>
            </el-menu-item>
          </el-menu>
        </nav>

        <!-- 用户操作区 -->
        <div class="header-actions">
          <!-- 语言切换 -->
          <LanguageSwitcher v-if="!isMobile" />

          <!-- 通知 -->
          <el-badge :value="unreadCount" :hidden="unreadCount === 0" class="notification-badge">
            <el-button circle size="small" @click="showNotifications">
              <img src="/images/icons/bell.svg" alt="通知" class="action-icon" />
            </el-button>
          </el-badge>



          <!-- 移动端菜单按钮 -->
          <el-button
            v-if="isMobile"
            circle
            size="small"
            @click="toggleMobileMenu"
            class="mobile-menu-btn"
          >
            <img src="/images/icons/menu.svg" alt="菜单" class="action-icon" />
          </el-button>
        </div>
      </div>
    </div>

    <!-- 移动端抽屉菜单 -->
    <el-drawer
      v-model="mobileMenuVisible"
      title="菜单"
      direction="rtl"
      size="280px"
    >
      <el-menu
        :default-active="activeMenu"
        class="mobile-menu"
        router
        @select="closeMobileMenu"
      >
        <el-menu-item index="/">
          <img src="/images/icons/home.svg" alt="首页" class="menu-icon" />
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/news">
          <img src="/images/icons/news.svg" alt="樊振东动态" class="menu-icon" />
          <span>樊振东动态</span>
        </el-menu-item>
        <el-menu-item index="/schedule">
          <img src="/images/icons/schedule.svg" alt="赛程安排" class="menu-icon" />
          <span>赛程安排</span>
        </el-menu-item>
        <el-menu-item index="/gallery">
          <img src="/images/icons/gallery.svg" alt="精彩瞬间" class="menu-icon" />
          <span>精彩瞬间</span>
        </el-menu-item>
        <el-menu-item index="/timeline">
          <img src="/images/icons/timeline.svg" alt="大事记" class="menu-icon" />
          <span>大事记</span>
        </el-menu-item>
        <el-menu-item index="/interview">
          <img src="/images/icons/interview.svg" alt="采访" class="menu-icon" />
          <span>采访</span>
        </el-menu-item>
        <el-menu-item index="/ai-generator">
          <img src="/images/icons/ai-generator.svg" alt="AI应援物生成器" class="menu-icon" />
          <span>AI应援物生成器</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </el-header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'


const route = useRoute()
const appStore = useAppStore()

// 响应式数据
const mobileMenuVisible = ref(false)
const unreadCount = ref(0)



// 计算属性
const activeMenu = computed(() => route.path)
const isMobile = computed(() => appStore.isMobile)

// 方法
const showNotifications = () => {
  // 显示通知面板
  console.log('显示通知')
}



const toggleMobileMenu = () => {
  mobileMenuVisible.value = !mobileMenuVisible.value
}

const closeMobileMenu = () => {
  mobileMenuVisible.value = false
}

// 生命周期
onMounted(() => {
  // 组件初始化
})
</script>

<style scoped>
.app-header {
  padding: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}





.main-header {
  padding: 0 16px;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 64px;
}

.header-brand {
  margin-right: 40px;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}

.brand-logo {
  flex-shrink: 0;
}

.logo-svg {
  width: 120px;
  height: 80px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.logo-svg:hover {
  transform: scale(1.05);
}

/* 保留原有的ping-pong-logo样式以防回退 */
.ping-pong-logo {
  font-size: 32px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

/* 移除可能的蓝色边框和焦点样式 */
.brand-link,
.brand-link:focus,
.brand-link:active,
.brand-text,
.brand-title {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

/* 移除所有可能的蓝色边框 */
* {
  outline: none !important;
}

*:focus {
  outline: none !important;
  box-shadow: none !important;
}

.brand-title {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 0;
  line-height: 1.2;
}



.header-nav {
  flex: 1;
}

.nav-menu {
  border-bottom: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-badge {
  display: flex;
}



.mobile-menu-btn {
  margin-left: 8px;
}

.mobile-menu {
  border-right: none;
}



/* 图标样式 */
.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  transition: all 0.3s ease;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.close-icon {
  width: 14px;
  height: 14px;
}

/* 悬停效果 */
.el-menu-item:hover .menu-icon {
  transform: scale(1.1);
}

.el-button:hover .action-icon {
  transform: scale(1.1);
}

/* 响应式样式 */
@media (max-width: 768px) {
  .main-header {
    padding: 0 16px;
  }

  .brand-title {
    font-size: 16px;
  }

  .logo-svg {
    width: 100px;
    height: 66px;
  }

  .menu-icon {
    width: 18px;
    height: 18px;
    margin-right: 6px;
  }

  .action-icon {
    width: 14px;
    height: 14px;
  }

  .close-icon {
    width: 12px;
    height: 12px;
  }
}
</style>
