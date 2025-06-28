<template>
  <el-footer class="app-footer">
    <div class="footer-container">
      <!-- 主要内容区域 -->
      <div class="footer-main">
        <div class="footer-section">
          <h3 class="footer-title">关于我们</h3>
          <ul class="footer-links">
            <li><a href="/about">网站介绍</a></li>
            <li><a href="/disclaimer">免责声明</a></li>
            <li><a href="/privacy">隐私政策</a></li>
            <li><a href="/terms">使用条款</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">功能导航</h3>
          <ul class="footer-links">
            <li><router-link to="/schedule">赛程安排</router-link></li>
            <li><router-link to="/gallery">精彩瞬间</router-link></li>
            <li><router-link to="/timeline">大事记</router-link></li>
            <li><router-link to="/interview">采访</router-link></li>
            <li><router-link to="/ai-generator">AI应援物生成器</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">帮助支持</h3>
          <ul class="footer-links">
            <li><a href="/contact">联系我们</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">关注我们</h3>
          <div class="social-links">
            <el-button circle size="small" class="social-btn">
              <el-icon><ChatDotRound /></el-icon>
            </el-button>
            <el-button circle size="small" class="social-btn">
              <el-icon><Share /></el-icon>
            </el-button>
            <el-button circle size="small" class="social-btn">
              <el-icon><Message /></el-icon>
            </el-button>
          </div>
        </div>
      </div>

      <!-- 重要声明区域 -->
      <div class="footer-disclaimer">
        <div class="disclaimer-box">
          <el-icon class="disclaimer-icon" color="#e6a23c"><Warning /></el-icon>
          <div class="disclaimer-content">
            <h4 class="disclaimer-title">重要声明</h4>
            <p class="disclaimer-text">
              本网站为是由樊振东球迷自发创建的<strong>非赢利性、非官方网站</strong>，
              与樊振东本人、及其所在的俱乐部、中国乒乓球协会、国际乒联(ITTF)或任何其他官方机构<strong>无任何关联</strong>。
              网站内容仅供球迷交流使用，不代表任何官方立场。
              如有侵权或不当内容，请及时联系我们处理。
            </p>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>
            © {{ currentYear }} 暴力熊猫的天际樊星 - 樊振东球迷非官方网站
            <span class="separator">|</span>
            <a href="/disclaimer">免责声明</a>
            <span class="separator">|</span>
            <a href="/privacy">隐私政策</a>
          </p>
          <p class="tech-info">
            基于 Vue 3 + Element Plus 构建
            <span class="separator">|</span>
            <span class="online-status" :class="{ online: isOnline, offline: !isOnline }">
              <el-icon><Connection /></el-icon>
              {{ isOnline ? '在线' : '离线' }}
            </span>
          </p>
        </div>

        <div class="footer-stats" v-if="stats">
          <span class="stat-item">
            <el-icon><User /></el-icon>
            在线用户: {{ stats.onlineUsers }}
          </span>
          <span class="stat-item">
            <el-icon><View /></el-icon>
            今日访问: {{ stats.todayVisits }}
          </span>
          <span class="stat-item">
            <el-icon><Document /></el-icon>
            总新闻: {{ stats.totalNews }}
          </span>
        </div>
      </div>
    </div>

    <!-- 回到顶部按钮 -->
    <el-backtop :right="40" :bottom="40">
      <div class="backtop-btn">
        <el-icon><Top /></el-icon>
      </div>
    </el-backtop>
  </el-footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import {
  Warning,
  ChatDotRound,
  Share,
  Message,
  Connection,
  User,
  View,
  Document,
  Top
} from '@element-plus/icons-vue'

const appStore = useAppStore()

// 响应式数据
const stats = ref({
  onlineUsers: 128,
  todayVisits: 1024,
  totalNews: 256
})

// 计算属性
const currentYear = computed(() => new Date().getFullYear())
const isOnline = computed(() => appStore.isOnline)

// 生命周期
onMounted(() => {
  // 获取网站统计信息
  fetchSiteStats()
})

// 方法
const fetchSiteStats = async () => {
  try {
    // 这里应该调用API获取统计信息
    // const response = await siteAPI.getStats()
    // stats.value = response.data
    
    // 模拟数据
    stats.value = {
      onlineUsers: Math.floor(Math.random() * 200) + 50,
      todayVisits: Math.floor(Math.random() * 2000) + 500,
      totalNews: Math.floor(Math.random() * 500) + 200
    }
  } catch (error) {
    console.error('获取统计信息失败:', error)
  }
}
</script>

<style scoped>
.app-footer {
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 40px 0 20px;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  min-width: 0;
}

.footer-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #606266;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #409EFF;
}

.social-links {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.social-btn {
  background: #f0f0f0;
  border: none;
  color: #606266;
}

.social-btn:hover {
  background: #409EFF;
  color: white;
}

.contact-info {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
  margin: 0;
}

.footer-disclaimer {
  margin-bottom: 30px;
  padding: 20px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
}

.disclaimer-box {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.disclaimer-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.disclaimer-content {
  flex: 1;
}

.disclaimer-title {
  font-size: 16px;
  font-weight: 600;
  color: #856404;
  margin: 0 0 8px 0;
}

.disclaimer-text {
  font-size: 14px;
  color: #856404;
  line-height: 1.6;
  margin: 0;
}

.disclaimer-text strong {
  font-weight: 600;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-copyright {
  flex: 1;
  min-width: 300px;
}

.footer-copyright p {
  margin: 0;
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
}

.footer-copyright a {
  color: #909399;
  text-decoration: none;
}

.footer-copyright a:hover {
  color: #409EFF;
}

.separator {
  margin: 0 8px;
}

.tech-info {
  margin-top: 4px !important;
}

.online-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.online-status.online {
  color: #67C23A;
}

.online-status.offline {
  color: #F56C6C;
}

.footer-stats {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
}

.backtop-btn {
  width: 40px;
  height: 40px;
  background: #409EFF;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 响应式样式 */
@media (max-width: 768px) {
  .app-footer {
    padding: 30px 0 15px;
  }
  
  .footer-container {
    padding: 0 16px;
  }
  
  .footer-main {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 30px;
  }
  
  .footer-disclaimer {
    padding: 16px;
  }
  
  .disclaimer-box {
    flex-direction: column;
    gap: 8px;
  }
  
  .disclaimer-title {
    font-size: 14px;
  }
  
  .disclaimer-text {
    font-size: 13px;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .footer-copyright {
    min-width: auto;
  }
  
  .footer-stats {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .social-links {
    justify-content: flex-start;
  }
  
  .footer-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
