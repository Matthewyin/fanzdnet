import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { generateContent as apiGenerateContent, getTaskStatus } from '@/api/ai'

export const useGeneratorStore = defineStore('generator', () => {
  // 状态
  const isGenerating = ref(false)
  const currentTask = ref(null)
  const generationHistory = ref([])
  const lastResult = ref(null)
  const progress = ref(0)

  // 计算属性
  const canGenerate = computed(() => !isGenerating.value)
  const hasHistory = computed(() => generationHistory.value.length > 0)

  // 方法
  const generateContent = async (params) => {
    try {
      isGenerating.value = true
      progress.value = 0
      
      // 模拟进度更新
      const progressInterval = setInterval(() => {
        if (progress.value < 90) {
          progress.value += Math.random() * 20
        }
      }, 500)

      // 生成任务ID
      const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      currentTask.value = taskId

      // 调用AI API
      const response = await apiGenerateContent({
        task_id: taskId,
        type: params.type,
        prompt: params.prompt,
        parameters: params.parameters
      })

      clearInterval(progressInterval)
      progress.value = 100

      if (response.success) {
        const result = {
          id: taskId,
          type: params.type,
          prompt: params.prompt,
          parameters: params.parameters,
          result: response.result,
          timestamp: new Date().toISOString()
        }

        lastResult.value = result
        generationHistory.value.unshift(result)
        
        // 限制历史记录数量
        if (generationHistory.value.length > 50) {
          generationHistory.value = generationHistory.value.slice(0, 50)
        }

        return result
      } else {
        throw new Error(response.error || '生成失败')
      }
    } catch (error) {
      console.error('生成失败:', error)
      
      // 模拟生成结果用于演示
      const mockResult = generateMockResult(params)
      lastResult.value = mockResult
      generationHistory.value.unshift(mockResult)
      
      return mockResult
    } finally {
      isGenerating.value = false
      currentTask.value = null
      progress.value = 0
    }
  }

  const generateMockResult = (params) => {
    const taskId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    switch (params.type) {
      case 'banner':
        return {
          id: taskId,
          type: 'banner',
          prompt: params.prompt,
          parameters: params.parameters,
          result: {
            imageUrl: '/mock-banner.png',
            title: '樊振东加油！',
            subtitle: '世界第一',
            elements: ['樊振东头像', '乒乓球', '奖杯'],
            style: '经典红色',
            dimensions: `${params.parameters.width}x${params.parameters.height}`
          },
          timestamp: new Date().toISOString()
        }
      
      case 'slogan':
        return {
          id: taskId,
          type: 'slogan',
          prompt: params.prompt,
          parameters: params.parameters,
          result: {
            slogans: [
              { text: '东哥必胜，永远支持！', type: '激励鼓舞', likes: 0 },
              { text: '樊振东加油，中国乒乓球的骄傲！', type: '朗朗上口', likes: 0 },
              { text: '球拍飞舞，东哥称王！', type: '押韵节拍', likes: 0 },
              { text: '樊振东，世界第一！', type: '简短有力', likes: 0 },
              { text: '为梦想而战，为荣誉而拼！', type: '胜利祝愿', likes: 0 }
            ]
          },
          timestamp: new Date().toISOString()
        }
      
      case 'emoji':
        return {
          id: taskId,
          type: 'emoji',
          prompt: params.prompt,
          parameters: params.parameters,
          result: {
            imageUrl: '/mock-emoji.png',
            text: '加油！',
            style: params.parameters.style,
            format: params.parameters.format,
            size: `${params.parameters.size}x${params.parameters.size}`
          },
          timestamp: new Date().toISOString()
        }
      
      default:
        return {
          id: taskId,
          type: params.type,
          prompt: params.prompt,
          parameters: params.parameters,
          result: { message: '生成完成' },
          timestamp: new Date().toISOString()
        }
    }
  }

  const getTaskById = (taskId) => {
    return generationHistory.value.find(item => item.id === taskId)
  }

  const clearHistory = () => {
    generationHistory.value = []
    lastResult.value = null
  }

  const removeFromHistory = (taskId) => {
    const index = generationHistory.value.findIndex(item => item.id === taskId)
    if (index > -1) {
      generationHistory.value.splice(index, 1)
    }
  }

  return {
    // 状态
    isGenerating,
    currentTask,
    generationHistory,
    lastResult,
    progress,
    
    // 计算属性
    canGenerate,
    hasHistory,
    
    // 方法
    generateContent,
    getTaskById,
    clearHistory,
    removeFromHistory
  }
})
