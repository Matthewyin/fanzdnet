/**
 * PWA功能 Composable
 * 提供PWA安装、离线检测、推送通知等功能
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'

export function usePWA() {
  // 响应式状态
  const isOnline = ref(navigator.onLine)
  const isInstallable = ref(false)
  const isInstalled = ref(false)
  const swRegistration = ref(null)
  const deferredPrompt = ref(null)
  const updateAvailable = ref(false)
  const notificationPermission = ref(Notification.permission)

  // 计算属性
  const canInstall = computed(() => {
    return isInstallable.value && !isInstalled.value
  })

  const canNotify = computed(() => {
    return notificationPermission.value === 'granted'
  })

  const isStandalone = computed(() => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone ||
           document.referrer.includes('android-app://')
  })

  // 网络状态监听
  const handleOnline = () => {
    isOnline.value = true
    ElMessage.success('网络连接已恢复')
  }

  const handleOffline = () => {
    isOnline.value = false
    ElMessage.warning('网络连接已断开，正在使用离线模式')
  }

  // PWA安装相关
  const handleBeforeInstallPrompt = (event) => {
    console.log('PWA可以安装')
    event.preventDefault()
    deferredPrompt.value = event
    isInstallable.value = true
  }

  const handleAppInstalled = () => {
    console.log('PWA已安装')
    isInstalled.value = true
    isInstallable.value = false
    deferredPrompt.value = null
    
    ElNotification({
      title: '安装成功',
      message: '樊振东球迷网已成功安装到您的设备',
      type: 'success',
      duration: 5000
    })
  }

  // Service Worker相关
  const handleSWUpdate = (registration) => {
    console.log('Service Worker有更新')
    swRegistration.value = registration
    updateAvailable.value = true
    
    ElNotification({
      title: '应用更新',
      message: '发现新版本，点击更新以获得最佳体验',
      type: 'info',
      duration: 0,
      onClick: () => {
        updateApp()
      }
    })
  }

  // 方法
  const installApp = async () => {
    if (!deferredPrompt.value) {
      ElMessage.warning('当前环境不支持安装')
      return false
    }

    try {
      deferredPrompt.value.prompt()
      const { outcome } = await deferredPrompt.value.userChoice
      
      if (outcome === 'accepted') {
        console.log('用户接受安装')
        ElMessage.success('正在安装应用...')
        return true
      } else {
        console.log('用户拒绝安装')
        ElMessage.info('安装已取消')
        return false
      }
    } catch (error) {
      console.error('安装失败:', error)
      ElMessage.error('安装失败，请重试')
      return false
    } finally {
      deferredPrompt.value = null
      isInstallable.value = false
    }
  }

  const updateApp = () => {
    if (!swRegistration.value?.waiting) {
      ElMessage.warning('没有可用的更新')
      return
    }

    swRegistration.value.waiting.postMessage({ type: 'SKIP_WAITING' })
    
    // 监听控制权转移
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  }

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      ElMessage.error('当前浏览器不支持通知功能')
      return false
    }

    if (notificationPermission.value === 'granted') {
      return true
    }

    try {
      const permission = await Notification.requestPermission()
      notificationPermission.value = permission
      
      if (permission === 'granted') {
        ElMessage.success('通知权限已开启')
        return true
      } else {
        ElMessage.warning('通知权限被拒绝')
        return false
      }
    } catch (error) {
      console.error('请求通知权限失败:', error)
      ElMessage.error('请求通知权限失败')
      return false
    }
  }

  const showNotification = (title, options = {}) => {
    if (!canNotify.value) {
      console.warn('没有通知权限')
      return
    }

    const defaultOptions = {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [200, 100, 200],
      requireInteraction: false,
      ...options
    }

    if (swRegistration.value) {
      // 通过Service Worker显示通知
      swRegistration.value.showNotification(title, defaultOptions)
    } else {
      // 直接显示通知
      new Notification(title, defaultOptions)
    }
  }

  const subscribeToPush = async () => {
    if (!swRegistration.value) {
      ElMessage.error('Service Worker未注册')
      return null
    }

    if (!canNotify.value) {
      const granted = await requestNotificationPermission()
      if (!granted) return null
    }

    try {
      const subscription = await swRegistration.value.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.VITE_VAPID_PUBLIC_KEY || '')
      })

      console.log('推送订阅成功:', subscription)
      
      // 发送订阅信息到服务器
      await sendSubscriptionToServer(subscription)
      
      ElMessage.success('推送通知已开启')
      return subscription
    } catch (error) {
      console.error('推送订阅失败:', error)
      ElMessage.error('推送通知开启失败')
      return null
    }
  }

  const unsubscribeFromPush = async () => {
    if (!swRegistration.value) return

    try {
      const subscription = await swRegistration.value.pushManager.getSubscription()
      if (subscription) {
        await subscription.unsubscribe()
        await removeSubscriptionFromServer(subscription)
        ElMessage.success('推送通知已关闭')
      }
    } catch (error) {
      console.error('取消推送订阅失败:', error)
      ElMessage.error('推送通知关闭失败')
    }
  }

  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
      console.warn('当前浏览器不支持Service Worker')
      return null
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker注册成功:', registration)
      
      swRegistration.value = registration

      // 监听更新
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              handleSWUpdate(registration)
            }
          })
        }
      })

      return registration
    } catch (error) {
      console.error('Service Worker注册失败:', error)
      return null
    }
  }

  const addToHomeScreen = () => {
    if (canInstall.value) {
      return installApp()
    }

    // 显示手动添加指引
    ElNotification({
      title: '添加到主屏幕',
      message: '请使用浏览器菜单中的"添加到主屏幕"功能',
      type: 'info',
      duration: 5000
    })
  }

  const shareContent = async (data) => {
    if (navigator.share) {
      try {
        await navigator.share(data)
        return true
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('分享失败:', error)
        }
        return false
      }
    } else {
      // 降级到复制链接
      try {
        await navigator.clipboard.writeText(data.url || window.location.href)
        ElMessage.success('链接已复制到剪贴板')
        return true
      } catch (error) {
        console.error('复制失败:', error)
        ElMessage.error('分享失败')
        return false
      }
    }
  }

  // 工具函数
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const sendSubscriptionToServer = async (subscription) => {
    // 发送订阅信息到服务器
    try {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      })
    } catch (error) {
      console.error('发送订阅信息失败:', error)
    }
  }

  const removeSubscriptionFromServer = async (subscription) => {
    // 从服务器移除订阅信息
    try {
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      })
    } catch (error) {
      console.error('移除订阅信息失败:', error)
    }
  }

  // 生命周期
  onMounted(() => {
    // 注册事件监听器
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // 注册Service Worker
    registerServiceWorker()

    // 检查是否已安装
    if (isStandalone.value) {
      isInstalled.value = true
    }
  })

  onUnmounted(() => {
    // 移除事件监听器
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', handleAppInstalled)
  })

  return {
    // 状态
    isOnline,
    isInstallable,
    isInstalled,
    isStandalone,
    updateAvailable,
    notificationPermission,
    canInstall,
    canNotify,

    // 方法
    installApp,
    updateApp,
    addToHomeScreen,
    requestNotificationPermission,
    showNotification,
    subscribeToPush,
    unsubscribeFromPush,
    shareContent,
    registerServiceWorker
  }
}
