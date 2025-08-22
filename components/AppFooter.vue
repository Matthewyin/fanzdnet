<template>
  <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center space-y-4">
        <!-- 免责声明 -->
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {{ t('footer.disclaimer') }}
        </p>
        
        <!-- 联系信息 -->
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {{ t('footer.contact') }}
        </p>
        
        <!-- 版权信息 -->
        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 dark:text-gray-500">
            {{ t('footer.copyright') }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {{ t('footer.allRightsReserved') }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t } = useI18n()
</script>
