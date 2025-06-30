import axios from 'axios'

// 创建axios实例
const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
userApi.interceptors.request.use(
  (config) => {
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
userApi.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('User API Error:', error)
    return Promise.reject(error)
  }
)

/**
 * 用户注册
 */
export const register = async (userData) => {
  return await userApi.post('/auth/register', userData)
}

/**
 * 用户登录
 */
export const login = async (credentials) => {
  return await userApi.post('/auth/login', credentials)
}

/**
 * 获取用户信息
 */
export const getUserProfile = async () => {
  return await userApi.get('/auth/profile')
}

/**
 * 用户登出
 */
export const logout = async () => {
  return await userApi.post('/auth/logout')
}

/**
 * 获取用户配额
 */
export const getUserQuota = async () => {
  return await userApi.get('/users/quota')
}

/**
 * 更新用户信息
 */
export const updateProfile = async (userData) => {
  return await userApi.put('/users/profile', userData)
}

/**
 * 修改密码
 */
export const changePassword = async (passwordData) => {
  return await userApi.put('/users/password', passwordData)
}

/**
 * 获取用户统计
 */
export const getUserStats = async () => {
  return await userApi.get('/users/stats')
}

export default userApi
