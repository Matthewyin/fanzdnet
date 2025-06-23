<template>
  <div class="language-switcher">
    <el-dropdown @command="handleLanguageChange" trigger="click">
      <el-button class="language-button">
        <span class="current-flag">{{ currentLocaleConfig?.flag }}</span>
        <span class="current-name">{{ currentLocaleConfig?.name }}</span>
        <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
      </el-button>
      
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="locale in supportedLocales"
            :key="locale.code"
            :command="locale.code"
            :class="{ 'is-active': locale.code === currentLocale }"
          >
            <div class="locale-item">
              <span class="locale-flag">{{ locale.flag }}</span>
              <span class="locale-name">{{ locale.name }}</span>
              <el-icon v-if="locale.code === currentLocale" class="check-icon">
                <Check />
              </el-icon>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { ArrowDown, Check } from '@element-plus/icons-vue'
import { supportedLocales, setLocale, getCurrentLocale, getLocaleConfig } from '@/i18n'

const { locale } = useI18n()

// 计算属性
const currentLocale = computed(() => getCurrentLocale())

const currentLocaleConfig = computed(() => {
  return getLocaleConfig(currentLocale.value)
})

// 方法
const handleLanguageChange = (localeCode) => {
  if (localeCode === currentLocale.value) {
    return
  }

  try {
    setLocale(localeCode)
    
    const localeConfig = getLocaleConfig(localeCode)
    ElMessage.success(`语言已切换到 ${localeConfig?.name}`)
    
    // 可选：重新加载页面以确保所有组件都使用新语言
    // window.location.reload()
  } catch (error) {
    console.error('切换语言失败:', error)
    ElMessage.error('切换语言失败')
  }
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-button:hover {
  border-color: #409eff;
  background: #f0f9ff;
}

.current-flag {
  font-size: 16px;
  line-height: 1;
}

.current-name {
  font-size: 14px;
  color: #303133;
  white-space: nowrap;
}

.dropdown-icon {
  font-size: 12px;
  color: #909399;
  transition: transform 0.3s ease;
}

.language-button:hover .dropdown-icon {
  color: #409eff;
}

.locale-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 120px;
}

.locale-flag {
  font-size: 16px;
  line-height: 1;
}

.locale-name {
  flex: 1;
  font-size: 14px;
  color: #303133;
}

.check-icon {
  font-size: 14px;
  color: #67c23a;
}

.is-active {
  background: #f0f9ff;
  color: #409eff;
}

.is-active .locale-name {
  color: #409eff;
  font-weight: 600;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .current-name {
    display: none;
  }
  
  .language-button {
    padding: 6px 8px;
  }
  
  .locale-item {
    min-width: 100px;
  }
}
</style>
