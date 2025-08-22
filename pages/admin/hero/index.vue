<template>
  <div class="p-6">
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            轮播图管理
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            管理首页轮播图内容和多语言翻译
          </p>
        </div>
        <button @click="showAddModal = true" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          添加轮播图
        </button>
      </div>
    </div>

    <!-- 语言选择器 -->
    <div class="mb-6">
      <div class="flex items-center space-x-4">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          显示语言：
        </label>
        <select v-model="selectedLanguage" @change="loadHeroData" class="block w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
          <option value="zh">中文</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ja">日本語</option>
          <option value="ko">한국어</option>
          <option value="sv">Svenska</option>
        </select>
      </div>
    </div>

    <!-- 轮播图列表 -->
    <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white">
          轮播图列表
        </h2>
      </div>
      
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="(item, index) in heroItems" :key="index" class="p-6">
          <div class="flex items-start space-x-4">
            <!-- 图片预览 -->
            <div class="flex-shrink-0">
              <img :src="item.url" :alt="item.title || '轮播图'" class="w-24 h-16 object-cover rounded-lg">
            </div>
            
            <!-- 内容信息 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {{ item.title || '开场动画' }}
                </h3>
                <div class="flex items-center space-x-2">
                  <span v-if="item.isOpening" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    开场动画
                  </span>
                  <button @click="editItem(item, index)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button @click="deleteItem(index)" class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <p v-if="item.subtitle" class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {{ item.subtitle }}
              </p>
              
              <p v-if="item.quote" class="text-sm text-gray-500 dark:text-gray-500 italic mb-2">
                "{{ item.quote }}"
              </p>
              
              <p v-if="item.description" class="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {{ item.description }}
              </p>
              
              <!-- 开场文本 -->
              <div v-if="item.isOpening && item.openingText" class="mt-3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">开场文本：</h4>
                <div class="space-y-1">
                  <p v-for="(line, lineIndex) in item.openingText" :key="lineIndex" class="text-sm text-gray-600 dark:text-gray-400">
                    {{ line }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑模态框 -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeEditModal"></div>
        
        <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                编辑轮播图
              </h3>
              <button @click="closeEditModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <HeroEditForm 
              v-if="editingItem" 
              :item="editingItem" 
              :languages="languages"
              @save="saveItem"
              @cancel="closeEditModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getHeroData } from '~/data/heroData/index'
import type { SupportedLanguage } from '~/types/firestore'

// 页面元数据
definePageMeta({
  layout: 'admin'
})

// 响应式数据
const selectedLanguage = ref<SupportedLanguage>('zh')
const heroItems = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingItem = ref(null)
const editingIndex = ref(-1)

// 支持的语言
const languages = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'sv', name: 'Svenska' }
]

// 加载轮播图数据
const loadHeroData = () => {
  heroItems.value = getHeroData(selectedLanguage.value)
}

// 编辑项目
const editItem = (item: any, index: number) => {
  editingItem.value = { ...item }
  editingIndex.value = index
  showEditModal.value = true
}

// 删除项目
const deleteItem = (index: number) => {
  if (confirm('确定要删除这个轮播图吗？')) {
    heroItems.value.splice(index, 1)
    // 这里应该调用 API 保存更改
  }
}

// 保存项目
const saveItem = (updatedItem: any) => {
  if (editingIndex.value >= 0) {
    heroItems.value[editingIndex.value] = updatedItem
    // 这里应该调用 API 保存更改
  }
  closeEditModal()
}

// 关闭编辑模态框
const closeEditModal = () => {
  showEditModal.value = false
  editingItem.value = null
  editingIndex.value = -1
}

// 页面加载时获取数据
onMounted(() => {
  loadHeroData()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
