import axios from 'axios'

// 创建axios实例
const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_API_BASE_URL || '/ai-api',
  timeout: 300000, // 5分钟超时，因为AI生成可能需要较长时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
aiApi.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
aiApi.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('AI API Error:', error)
    return Promise.reject(error)
  }
)

/**
 * 生成内容
 * @param {Object} data - 生成参数
 * @param {string} data.task_id - 任务ID
 * @param {string} data.type - 生成类型 (banner/slogan/emoji)
 * @param {string} data.prompt - 用户输入的提示
 * @param {Object} data.parameters - 生成参数
 */
export const generateContent = async (data) => {
  return await aiApi.post('/generate', data)
}

/**
 * 获取任务状态
 * @param {string} taskId - 任务ID
 */
export const getTaskStatus = async (taskId) => {
  return await aiApi.get(`/task/${taskId}`)
}

/**
 * 健康检查
 */
export const healthCheck = async () => {
  return await aiApi.get('/health')
}

/**
 * 获取模型状态
 */
export const getModelStatus = async () => {
  return await aiApi.get('/models/status')
}

/**
 * 获取队列状态
 */
export const getQueueStatus = async () => {
  return await aiApi.get('/queue/status')
}

/**
 * 测试生成
 */
export const testGenerate = async () => {
  return await aiApi.post('/test/generate')
}

export default aiApi
