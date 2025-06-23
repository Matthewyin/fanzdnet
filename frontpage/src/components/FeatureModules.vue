<template>
  <div class="feature-modules">
    <div class="container">
      <div class="modules-grid">
        <div 
          v-for="module in modules" 
          :key="module.id"
          class="module-card"
          @click="handleModuleClick(module)"
        >
          <div class="module-icon">
            <img :src="module.icon" :alt="module.title" />
          </div>
          <h3 class="module-title">{{ module.title }}</h3>
          <p class="module-description">{{ module.description }}</p>
          <div class="module-arrow">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { featureModules as moduleData } from '@/data/heroData.js'

// 定义事件
const emit = defineEmits(['module-click'])

// 功能模块数据
const modules = ref(moduleData)

// 处理模块点击
const handleModuleClick = (module) => {
  emit('module-click', module)
}
</script>

<style scoped>
.feature-modules {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.modules-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 固定2列布局 */
  grid-template-rows: 1fr 1fr; /* 固定2行布局 */
  gap: 0; /* 移除gap，使用边框作为分隔 */
  margin-top: 40px;
  border: 4px solid #94a3b8; /* 更粗更明显的外边框 */
  border-radius: 20px;
  overflow: hidden;
  background: white;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(148, 163, 184, 0.1); /* 添加轻微的边框阴影 */
}

.module-card {
  background: white;
  border-radius: 0; /* 移除圆角，因为在网格容器中 */
  padding: 40px 30px;
  text-align: center;
  box-shadow: none; /* 移除单独的阴影，使用整体阴影 */
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: none; /* 移除默认边框 */

  /* 添加更明显的十字形分隔线 */
  border-right: 4px solid #94a3b8; /* 更粗更明显的右边框 */
  border-bottom: 4px solid #94a3b8; /* 更粗更明显的下边框 */

  /* 添加分隔线的立体阴影效果 */
  box-shadow:
    inset -2px 0 4px rgba(148, 163, 184, 0.1), /* 右边框内阴影 */
    inset 0 -2px 4px rgba(148, 163, 184, 0.1); /* 下边框内阴影 */
}

/* 移除最右列的右边框 */
.module-card:nth-child(2n) {
  border-right: none;
}

/* 移除最下行的下边框 */
.module-card:nth-child(n+3) {
  border-bottom: none;
}

.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  z-index: 2;
}

.module-card:hover::before {
  transform: scaleX(1);
}

.module-card:hover {
  background: #f8fafc; /* 轻微的背景色变化 */
  transform: scale(1.02); /* 轻微放大而不是上移 */
  z-index: 1;

  /* 悬停时增强分隔线的阴影效果 */
  box-shadow:
    inset -3px 0 6px rgba(148, 163, 184, 0.15), /* 增强右边框内阴影 */
    inset 0 -3px 6px rgba(148, 163, 184, 0.15), /* 增强下边框内阴影 */
    0 4px 12px rgba(59, 130, 246, 0.1); /* 添加轻微的外阴影 */
}

/* 悬停时的阴影效果 - 添加到整个网格容器 */
.modules-grid:hover {
  box-shadow:
    0 12px 40px rgba(59, 130, 246, 0.15),
    0 0 0 1px rgba(148, 163, 184, 0.2); /* 增强边框阴影 */
}

.module-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.module-card:hover .module-icon {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  transform: scale(1.1);
}

.module-icon img {
  width: 32px;
  height: 32px;
  transition: all 0.3s ease;
}

.module-card:hover .module-icon img {
  filter: brightness(0) invert(1);
}

.module-title {
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.module-card:hover .module-title {
  color: #3b82f6;
}

.module-description {
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 24px;
}

.module-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(10px);
}

.module-card:hover .module-arrow {
  opacity: 1;
  transform: translateX(0);
  background: #3b82f6;
  color: white;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .feature-modules {
    padding: 60px 0;
  }

  .modules-grid {
    /* 保持2×2布局，但调整间距 */
    margin-top: 30px;
    border-radius: 16px;
  }

  .module-card {
    padding: 30px 20px;
  }

  .module-title {
    font-size: 20px;
  }

  .module-description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .modules-grid {
    /* 在小屏幕上改为单列布局 */
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    border-radius: 12px;
  }

  .module-card {
    padding: 24px 16px;
    /* 重置边框 - 小屏幕单列布局 */
    border-right: none !important;
    border-bottom: 4px solid #94a3b8; /* 移动端也使用更明显的分隔线 */

    /* 移动端分隔线阴影效果 */
    box-shadow: inset 0 -2px 4px rgba(148, 163, 184, 0.1);
  }

  /* 移除最后一个卡片的下边框 */
  .module-card:last-child {
    border-bottom: none !important;
    box-shadow: none; /* 最后一个卡片移除阴影 */
  }

  .module-icon {
    width: 56px;
    height: 56px;
    margin-bottom: 20px;
  }

  .module-icon img {
    width: 28px;
    height: 28px;
  }

  .module-title {
    font-size: 18px;
  }

  .module-description {
    font-size: 13px;
  }
}

/* 中等屏幕优化 */
@media (max-width: 1024px) and (min-width: 769px) {
  .module-card {
    padding: 35px 25px;
  }

  .module-title {
    font-size: 22px;
  }

  .module-description {
    font-size: 15px;
  }
}
</style>
