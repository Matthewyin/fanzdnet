import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, register, getUserProfile, logout as apiLogout } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))
  const isLoading = ref(false)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const userLevel = computed(() => user.value?.user_level || 'free')
  const dailyQuota = computed(() => user.value?.daily_quota || 0)
  const usedQuota = computed(() => user.value?.used_quota || 0)
  const remainingQuota = computed(() => dailyQuota.value - usedQuota.value)

  // 方法
  const setUser = (userData) => {
    user.value = userData
  }

  const setToken = (tokenValue) => {
    token.value = tokenValue
    if (tokenValue) {
      localStorage.setItem('token', tokenValue)
    } else {
      localStorage.removeItem('token')
    }
  }

  const loginUser = async (credentials) => {
    try {
      isLoading.value = true
      const response = await login(credentials)
      
      if (response.success) {
        // 处理新的token结构
        const accessToken = response.tokens?.access_token || response.token
        setToken(accessToken)
        setUser(response.user)
        return { success: true, user: response.user }
      } else {
        throw new Error(response.error || '登录失败')
      }
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const registerUser = async (userData) => {
    try {
      isLoading.value = true
      const response = await register(userData)
      
      if (response.success) {
        return { success: true, message: '注册成功' }
      } else {
        throw new Error(response.error || '注册失败')
      }
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const fetchUserProfile = async () => {
    if (!token.value) return

    try {
      const response = await getUserProfile()
      if (response.success) {
        setUser(response.user)
      }
    } catch (error) {
      console.error('获取用户信息失败:', error)
      // 如果token无效，清除登录状态
      if (error.response?.status === 401) {
        logout()
      }
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await apiLogout()
      }
    } catch (error) {
      console.error('登出失败:', error)
    } finally {
      setToken(null)
      setUser(null)
      localStorage.removeItem('user')
    }
  }

  const updateQuota = (used) => {
    if (user.value) {
      user.value.used_quota = used
    }
  }

  // 初始化时从localStorage恢复用户信息
  const initializeUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser && token.value) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('解析用户信息失败:', error)
        localStorage.removeItem('user')
      }
    }
  }

  // 保存用户信息到localStorage
  const saveUserToStorage = () => {
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  return {
    // 状态
    user,
    token,
    isLoading,
    
    // 计算属性
    isLoggedIn,
    userLevel,
    dailyQuota,
    usedQuota,
    remainingQuota,
    
    // 方法
    loginUser,
    registerUser,
    fetchUserProfile,
    logout,
    updateQuota,
    initializeUser,
    saveUserToStorage,
    setUser,
    setToken
  }
})
