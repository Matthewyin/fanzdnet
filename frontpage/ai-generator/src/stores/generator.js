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
      
      const progressInterval = setInterval(() => {
        if (progress.value < 90) {
          progress.value += Math.floor(Math.random() * 5) + 1;
        }
      }, 500)

      const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      currentTask.value = taskId

      const response = await apiGenerateContent({
        task_id: taskId,
        type: params.type,
        prompt: params.prompt,
        parameters: params.parameters
      })

      const pollTaskStatus = async () => {
        const taskStatus = await getTaskStatus(taskId);
        if (taskStatus.status === 'completed') {
          clearInterval(progressInterval);
          progress.value = 100;
          const result = {
            id: taskId,
            type: params.type,
            prompt: params.prompt,
            parameters: params.parameters,
            result: taskStatus.result,
            timestamp: new Date().toISOString()
          }
          lastResult.value = result
          generationHistory.value.unshift(result)
          if (generationHistory.value.length > 50) {
            generationHistory.value = generationHistory.value.slice(0, 50)
          }
          return result;
        } else if (taskStatus.status === 'failed') {
          clearInterval(progressInterval);
          throw new Error(taskStatus.error || '生成失败');
        } else {
          setTimeout(pollTaskStatus, 2000);
        }
      }

      return await pollTaskStatus();

    } catch (error) {
      console.error('生成失败:', error)
      throw error
    } finally {
      isGenerating.value = false
      currentTask.value = null
      progress.value = 0
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
