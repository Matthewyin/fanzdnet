/**
 * 实时数据同步 Composable
 */

import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import wsService from '@/utils/websocket'

export function useRealTimeData() {
  // 连接状态
  const isConnected = ref(false)
  const connectionState = ref('CLOSED')
  const lastUpdateTime = ref(null)

  // 实时数据
  const realtimeNews = ref([])
  const realtimeMatches = ref([])
  const realtimeCommunity = ref([])
  const notifications = ref([])
  const announcements = ref([])

  // 统计信息
  const stats = ref({
    newsUpdates: 0,
    matchUpdates: 0,
    communityMessages: 0,
    totalNotifications: 0
  })

  // 计算属性
  const hasNewData = computed(() => {
    return realtimeNews.value.length > 0 || 
           realtimeMatches.value.length > 0 || 
           realtimeCommunity.value.length > 0
  })

  const unreadNotifications = computed(() => {
    return notifications.value.filter(n => !n.read).length
  })

  // 连接状态处理
  const handleConnected = () => {
    isConnected.value = true
    connectionState.value = 'OPEN'
    lastUpdateTime.value = new Date()
    
    ElMessage.success('实时数据连接已建立')
  }

  const handleDisconnected = () => {
    isConnected.value = false
    connectionState.value = 'CLOSED'
    
    ElMessage.warning('实时数据连接已断开')
  }

  const handleError = (error) => {
    console.error('实时数据连接错误:', error)
    ElMessage.error('实时数据连接失败')
  }

  // 数据更新处理
  const handleNewsUpdate = (data) => {
    realtimeNews.value.unshift({
      ...data,
      receivedAt: new Date().toISOString(),
      isNew: true
    })
    
    // 限制数量
    if (realtimeNews.value.length > 50) {
      realtimeNews.value = realtimeNews.value.slice(0, 50)
    }
    
    stats.value.newsUpdates++
    lastUpdateTime.value = new Date()
    
    // 显示通知
    ElNotification({
      title: '新闻更新',
      message: data.title,
      type: 'info',
      duration: 3000
    })
  }

  const handleMatchUpdate = (data) => {
    // 查找现有比赛记录
    const existingIndex = realtimeMatches.value.findIndex(m => m.id === data.id)
    
    if (existingIndex > -1) {
      // 更新现有记录
      realtimeMatches.value[existingIndex] = {
        ...realtimeMatches.value[existingIndex],
        ...data,
        updatedAt: new Date().toISOString(),
        isUpdated: true
      }
    } else {
      // 添加新记录
      realtimeMatches.value.unshift({
        ...data,
        receivedAt: new Date().toISOString(),
        isNew: true
      })
    }
    
    // 限制数量
    if (realtimeMatches.value.length > 20) {
      realtimeMatches.value = realtimeMatches.value.slice(0, 20)
    }
    
    stats.value.matchUpdates++
    lastUpdateTime.value = new Date()
    
    // 显示通知
    ElNotification({
      title: '比赛更新',
      message: `${data.tournament} - ${data.status}`,
      type: 'warning',
      duration: 5000
    })
  }

  const handleCommunityMessage = (data) => {
    realtimeCommunity.value.unshift({
      ...data,
      receivedAt: new Date().toISOString(),
      isNew: true
    })
    
    // 限制数量
    if (realtimeCommunity.value.length > 100) {
      realtimeCommunity.value = realtimeCommunity.value.slice(0, 100)
    }
    
    stats.value.communityMessages++
    lastUpdateTime.value = new Date()
  }

  const handleUserNotification = (data) => {
    notifications.value.unshift({
      ...data,
      id: data.id || Date.now(),
      receivedAt: new Date().toISOString(),
      read: false,
      isNew: true
    })
    
    // 限制数量
    if (notifications.value.length > 50) {
      notifications.value = notifications.value.slice(0, 50)
    }
    
    stats.value.totalNotifications++
    lastUpdateTime.value = new Date()
    
    // 显示通知
    ElNotification({
      title: '新通知',
      message: data.message,
      type: data.type || 'info',
      duration: 4000
    })
  }

  const handleSystemAnnouncement = (data) => {
    announcements.value.unshift({
      ...data,
      id: data.id || Date.now(),
      receivedAt: new Date().toISOString(),
      isNew: true
    })
    
    // 限制数量
    if (announcements.value.length > 10) {
      announcements.value = announcements.value.slice(0, 10)
    }
    
    lastUpdateTime.value = new Date()
    
    // 显示重要通知
    ElNotification({
      title: '系统公告',
      message: data.message,
      type: 'success',
      duration: 6000
    })
  }

  // 方法
  const connect = async () => {
    try {
      await wsService.connect()
    } catch (error) {
      console.error('连接失败:', error)
    }
  }

  const disconnect = () => {
    wsService.disconnect()
  }

  const subscribe = (dataType) => {
    const callbacks = {
      'news': handleNewsUpdate,
      'match': handleMatchUpdate,
      'community': handleCommunityMessage,
      'notification': handleUserNotification,
      'announcement': handleSystemAnnouncement
    }
    
    const callback = callbacks[dataType]
    if (callback) {
      wsService.subscribe(dataType, callback)
    }
  }

  const unsubscribe = (dataType) => {
    const callbacks = {
      'news': handleNewsUpdate,
      'match': handleMatchUpdate,
      'community': handleCommunityMessage,
      'notification': handleUserNotification,
      'announcement': handleSystemAnnouncement
    }
    
    const callback = callbacks[dataType]
    if (callback) {
      wsService.unsubscribe(dataType, callback)
    }
  }

  const markNotificationAsRead = (notificationId) => {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      notification.isNew = false
    }
  }

  const markAllNotificationsAsRead = () => {
    notifications.value.forEach(notification => {
      notification.read = true
      notification.isNew = false
    })
  }

  const clearOldData = () => {
    // 清除标记为新的状态
    realtimeNews.value.forEach(item => { item.isNew = false })
    realtimeMatches.value.forEach(item => { 
      item.isNew = false
      item.isUpdated = false
    })
    realtimeCommunity.value.forEach(item => { item.isNew = false })
    notifications.value.forEach(item => { item.isNew = false })
    announcements.value.forEach(item => { item.isNew = false })
  }

  const resetStats = () => {
    stats.value = {
      newsUpdates: 0,
      matchUpdates: 0,
      communityMessages: 0,
      totalNotifications: 0
    }
  }

  // 生命周期
  onMounted(() => {
    // 注册事件监听器
    wsService.on('connected', handleConnected)
    wsService.on('disconnected', handleDisconnected)
    wsService.on('error', handleError)
    
    // 自动连接
    connect()
    
    // 订阅所有数据类型
    setTimeout(() => {
      subscribe('news')
      subscribe('match')
      subscribe('community')
      subscribe('notification')
      subscribe('announcement')
    }, 1000)
  })

  onUnmounted(() => {
    // 移除事件监听器
    wsService.off('connected', handleConnected)
    wsService.off('disconnected', handleDisconnected)
    wsService.off('error', handleError)
    
    // 取消订阅
    unsubscribe('news')
    unsubscribe('match')
    unsubscribe('community')
    unsubscribe('notification')
    unsubscribe('announcement')
  })

  return {
    // 状态
    isConnected,
    connectionState,
    lastUpdateTime,
    
    // 数据
    realtimeNews,
    realtimeMatches,
    realtimeCommunity,
    notifications,
    announcements,
    
    // 统计
    stats,
    hasNewData,
    unreadNotifications,
    
    // 方法
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearOldData,
    resetStats
  }
}
