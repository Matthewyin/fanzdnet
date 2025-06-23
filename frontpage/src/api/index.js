import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// API基础配置
const API_BASE_URL = 'http://fzd-backend.ns-iuao844w.svc.cluster.local:8080'

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加请求时间戳
    config.metadata = { startTime: new Date() }
    
    // 显示加载状态
    if (config.showLoading !== false) {
      // 这里可以显示全局loading
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 计算请求耗时
    const endTime = new Date()
    const duration = endTime - response.config.metadata.startTime
    console.log(`API请求耗时: ${duration}ms`)
    
    // 隐藏加载状态
    if (response.config.showLoading !== false) {
      // 这里可以隐藏全局loading
    }
    
    // 统一处理响应数据
    const { data } = response
    
    // 检查业务状态码
    if (data.code !== undefined && data.code !== 200) {
      ElMessage.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
    
    return data
  },
  (error) => {
    // 隐藏加载状态
    if (error.config?.showLoading !== false) {
      // 这里可以隐藏全局loading
    }
    
    // 统一错误处理
    let message = '网络错误，请稍后重试'
    
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          message = data.message || '请求参数错误'
          break
        case 401:
          message = '登录已过期，请重新登录'
          // 清除token并跳转到登录页
          localStorage.removeItem('auth-token')
          localStorage.removeItem('user-info')
          // router.push('/login')
          break
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务暂不可用'
          break
        default:
          message = data.message || `请求失败 (${status})`
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请稍后重试'
    } else if (error.message === 'Network Error') {
      message = '网络连接失败，请检查网络'
    }
    
    // 显示错误消息
    ElMessage.error(message)
    
    return Promise.reject(error)
  }
)

// API方法封装
class ApiService {
  // GET请求
  static get(url, params = {}, config = {}) {
    return apiClient.get(url, { params, ...config })
  }
  
  // POST请求
  static post(url, data = {}, config = {}) {
    return apiClient.post(url, data, config)
  }
  
  // PUT请求
  static put(url, data = {}, config = {}) {
    return apiClient.put(url, data, config)
  }
  
  // DELETE请求
  static delete(url, config = {}) {
    return apiClient.delete(url, config)
  }
  
  // PATCH请求
  static patch(url, data = {}, config = {}) {
    return apiClient.patch(url, data, config)
  }
  
  // 文件上传
  static upload(url, formData, config = {}) {
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    })
  }
  
  // 下载文件
  static download(url, params = {}, filename = '') {
    return apiClient.get(url, {
      params,
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data])
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    })
  }
}

// 网络状态检测
class NetworkService {
  static isOnline() {
    return navigator.onLine
  }
  
  static onNetworkChange(callback) {
    window.addEventListener('online', () => callback(true))
    window.addEventListener('offline', () => callback(false))
  }
  
  static removeNetworkListener(callback) {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

// 缓存服务
class CacheService {
  static set(key, data, expireTime = 3600000) { // 默认1小时过期
    const cacheData = {
      data,
      timestamp: Date.now(),
      expireTime
    }
    localStorage.setItem(`cache_${key}`, JSON.stringify(cacheData))
  }
  
  static get(key) {
    try {
      const cacheStr = localStorage.getItem(`cache_${key}`)
      if (!cacheStr) return null
      
      const cacheData = JSON.parse(cacheStr)
      const now = Date.now()
      
      if (now - cacheData.timestamp > cacheData.expireTime) {
        localStorage.removeItem(`cache_${key}`)
        return null
      }
      
      return cacheData.data
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }
  
  static remove(key) {
    localStorage.removeItem(`cache_${key}`)
  }
  
  static clear() {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key)
      }
    })
  }
}

// 重试机制
class RetryService {
  static async retry(fn, maxRetries = 3, delay = 1000) {
    let lastError
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)))
        }
      }
    }
    
    throw lastError
  }
}

export {
  apiClient,
  ApiService,
  NetworkService,
  CacheService,
  RetryService
}

export default ApiService
