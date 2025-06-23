<template>
  <el-dialog
    v-model="visible"
    title="免责声明"
    width="600px"
    :before-close="handleClose"
    class="disclaimer-dialog"
    center
  >
    <div class="disclaimer-content">
      <div class="disclaimer-icon">
        <i class="el-icon-warning"></i>
      </div>
      
      <div class="disclaimer-text">
        <h3>重要声明</h3>
        <div class="disclaimer-body">
          <p><strong>本网站为樊振东球迷非官方网站</strong></p>
          
          <ul class="disclaimer-list">
            <li>本站所有内容仅供球迷交流和学习使用</li>
            <li>网站内容不代表樊振东本人或其官方团队观点</li>
            <li>所有图片、视频等素材版权归原作者所有</li>
            <li>如有侵权请联系我们及时删除</li>
            <li>本站不承担任何法律责任</li>
          </ul>
          
          <div class="data-source">
            <h4>数据来源说明</h4>
            <p>比赛数据主要来源于：</p>
            <ul>
              <li>国际乒联官方网站 (ITTF.com)</li>
              <li>中国乒乓球协会官网</li>
              <li>各大体育媒体公开报道</li>
              <li>官方比赛直播和录像</li>
            </ul>
            
            <p class="backup-note">
              <strong>备用数据源：</strong>
              当主要数据源不可用时，我们会使用体育新闻网站、
              专业体育数据平台等可靠来源作为补充。
            </p>
          </div>
          
          <div class="contact-info">
            <h4>联系我们</h4>
            <p>如有任何问题或建议，请通过以下方式联系：</p>
            <ul>
              <li>邮箱：contact@fzdFan.com</li>
              <li>微博：@樊振东球迷网</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <template #footer>
      <div class="disclaimer-footer">
        <el-checkbox v-model="dontShowAgain" class="dont-show-checkbox">
          不再显示此声明
        </el-checkbox>
        <div class="footer-buttons">
          <el-button @click="handleClose">关闭</el-button>
          <el-button type="primary" @click="handleAccept">
            我已了解
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'accept', 'close'])

// 响应式数据
const visible = ref(props.modelValue)
const dontShowAgain = ref(false)

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
})

// 监听 visible 变化
watch(visible, (newVal) => {
  emit('update:modelValue', newVal)
})

// 处理关闭
const handleClose = () => {
  visible.value = false
  emit('close', { dontShowAgain: dontShowAgain.value })
}

// 处理接受
const handleAccept = () => {
  visible.value = false
  emit('accept', { dontShowAgain: dontShowAgain.value })
}
</script>

<style scoped>
.disclaimer-dialog :deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.disclaimer-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 24px 32px;
  margin: 0;
}

.disclaimer-dialog :deep(.el-dialog__title) {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.disclaimer-dialog :deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 20px;
}

.disclaimer-dialog :deep(.el-dialog__body) {
  padding: 0;
}

.disclaimer-dialog :deep(.el-dialog__footer) {
  padding: 0;
  border-top: 1px solid #e5e7eb;
}

.disclaimer-content {
  padding: 32px;
}

.disclaimer-icon {
  text-align: center;
  margin-bottom: 24px;
}

.disclaimer-icon i {
  font-size: 48px;
  color: #f59e0b;
}

.disclaimer-text h3 {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 24px;
}

.disclaimer-body {
  color: #374151;
  line-height: 1.6;
}

.disclaimer-body p {
  margin-bottom: 16px;
}

.disclaimer-body strong {
  color: #1e293b;
  font-weight: 600;
}

.disclaimer-list {
  margin: 16px 0;
  padding-left: 20px;
}

.disclaimer-list li {
  margin-bottom: 8px;
}

.data-source {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
}

.data-source h4 {
  color: #1e293b;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.data-source ul {
  margin: 12px 0;
  padding-left: 20px;
}

.data-source li {
  margin-bottom: 6px;
}

.backup-note {
  background: #fef3c7;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  font-size: 14px;
}

.contact-info {
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
  margin-top: 24px;
}

.contact-info h4 {
  color: #1e293b;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

.contact-info ul {
  margin: 12px 0;
  padding-left: 20px;
}

.contact-info li {
  margin-bottom: 6px;
}

.disclaimer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: #f8fafc;
}

.dont-show-checkbox {
  color: #64748b;
}

.footer-buttons {
  display: flex;
  gap: 12px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .disclaimer-dialog :deep(.el-dialog) {
    width: 90% !important;
    margin: 5vh auto !important;
  }

  .disclaimer-content {
    padding: 24px 20px;
  }

  .disclaimer-text h3 {
    font-size: 20px;
  }

  .disclaimer-footer {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .footer-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .disclaimer-dialog :deep(.el-dialog) {
    width: 95% !important;
    margin: 2vh auto !important;
  }

  .disclaimer-content {
    padding: 20px 16px;
  }

  .disclaimer-icon i {
    font-size: 40px;
  }

  .disclaimer-text h3 {
    font-size: 18px;
  }

  .data-source,
  .backup-note {
    padding: 16px 12px;
  }

  .disclaimer-footer {
    padding: 16px;
  }
}
</style>
