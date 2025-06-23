import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 应用状态
  const loading = ref(false)
  const theme = ref('light')
  const language = ref('zh-CN')
  const sidebarCollapsed = ref(false)
  
  // 设备信息
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)
  
  // 网络状态
  const isOnline = ref(true)
  
  // 免责声明确认状态
  const disclaimerAccepted = ref(false)
  
  // Actions
  const setLoading = (value) => {
    loading.value = value
  }
  
  const setTheme = (value) => {
    theme.value = value
    // 保存到localStorage
    localStorage.setItem('app-theme', value)
  }
  
  const setLanguage = (value) => {
    language.value = value
    localStorage.setItem('app-language', value)
  }
  
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
  
  const setDeviceType = (type) => {
    isMobile.value = type === 'mobile'
    isTablet.value = type === 'tablet'
    isDesktop.value = type === 'desktop'
  }
  
  const setOnlineStatus = (status) => {
    isOnline.value = status
  }
  
  const acceptDisclaimer = () => {
    disclaimerAccepted.value = true
    localStorage.setItem('disclaimer-accepted', 'true')
  }
  
  // 初始化应用状态
  const initApp = () => {
    // 从localStorage恢复设置
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme) {
      theme.value = savedTheme
    }
    
    const savedLanguage = localStorage.getItem('app-language')
    if (savedLanguage) {
      language.value = savedLanguage
    }
    
    const savedDisclaimer = localStorage.getItem('disclaimer-accepted')
    if (savedDisclaimer === 'true') {
      disclaimerAccepted.value = true
    }
    
    // 检测设备类型
    const checkDeviceType = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType('mobile')
      } else if (width < 1024) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }
    
    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    
    // 监听网络状态
    const updateOnlineStatus = () => {
      setOnlineStatus(navigator.onLine)
    }
    
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  }
  
  return {
    // State
    loading,
    theme,
    language,
    sidebarCollapsed,
    isMobile,
    isTablet,
    isDesktop,
    isOnline,
    disclaimerAccepted,
    
    // Actions
    setLoading,
    setTheme,
    setLanguage,
    toggleSidebar,
    setDeviceType,
    setOnlineStatus,
    acceptDisclaimer,
    initApp
  }
})
