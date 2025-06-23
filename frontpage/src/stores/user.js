import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 用户状态
  const user = ref(null)
  const token = ref('')
  const isLoggedIn = ref(false)
  const permissions = ref([])
  
  // 用户等级系统
  const userLevel = ref(1)
  const userPoints = ref(0)
  const dailyAIUsage = ref(0)
  const maxDailyAIUsage = ref(3)
  
  // Computed
  const isAdmin = computed(() => {
    return permissions.value.includes('admin')
  })
  
  const isModerator = computed(() => {
    return permissions.value.includes('moderator') || isAdmin.value
  })
  
  const canUseAIGenerator = computed(() => {
    return dailyAIUsage.value < maxDailyAIUsage.value
  })
  
  const userLevelName = computed(() => {
    const levels = {
      1: '新手樊星',
      2: '活跃樊星',
      3: '资深樊星',
      4: '超级樊星',
      5: '传奇樊星'
    }
    return levels[userLevel.value] || '新手樊星'
  })
  
  // Actions
  const setUser = (userData) => {
    user.value = userData
    isLoggedIn.value = true
    
    // 保存用户信息到localStorage
    localStorage.setItem('user-info', JSON.stringify(userData))
  }
  
  const setToken = (tokenValue) => {
    token.value = tokenValue
    localStorage.setItem('auth-token', tokenValue)
  }
  
  const setPermissions = (perms) => {
    permissions.value = perms
  }
  
  const updateUserLevel = (level, points) => {
    userLevel.value = level
    userPoints.value = points
  }
  
  const incrementAIUsage = () => {
    if (dailyAIUsage.value < maxDailyAIUsage.value) {
      dailyAIUsage.value++
      // 保存到localStorage
      const today = new Date().toDateString()
      localStorage.setItem('ai-usage-date', today)
      localStorage.setItem('ai-usage-count', dailyAIUsage.value.toString())
    }
  }
  
  const resetDailyAIUsage = () => {
    dailyAIUsage.value = 0
    localStorage.removeItem('ai-usage-date')
    localStorage.removeItem('ai-usage-count')
  }
  
  const logout = () => {
    user.value = null
    token.value = ''
    isLoggedIn.value = false
    permissions.value = []
    
    // 清除localStorage
    localStorage.removeItem('user-info')
    localStorage.removeItem('auth-token')
  }
  
  // 初始化用户状态
  const initUser = () => {
    // 从localStorage恢复用户信息
    const savedUser = localStorage.getItem('user-info')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        logout()
      }
    }
    
    const savedToken = localStorage.getItem('auth-token')
    if (savedToken) {
      token.value = savedToken
    }
    
    // 检查AI使用次数
    const savedDate = localStorage.getItem('ai-usage-date')
    const savedCount = localStorage.getItem('ai-usage-count')
    const today = new Date().toDateString()
    
    if (savedDate === today && savedCount) {
      dailyAIUsage.value = parseInt(savedCount, 10)
    } else {
      // 新的一天，重置使用次数
      resetDailyAIUsage()
    }
  }
  
  return {
    // State
    user,
    token,
    isLoggedIn,
    permissions,
    userLevel,
    userPoints,
    dailyAIUsage,
    maxDailyAIUsage,
    
    // Computed
    isAdmin,
    isModerator,
    canUseAIGenerator,
    userLevelName,
    
    // Actions
    setUser,
    setToken,
    setPermissions,
    updateUserLevel,
    incrementAIUsage,
    resetDailyAIUsage,
    logout,
    initUser
  }
})
