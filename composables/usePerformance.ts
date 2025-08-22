interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

export const usePerformance = () => {
  const metrics = ref<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  })

  const isSupported = ref(false)

  // 检查浏览器支持
  const checkSupport = () => {
    if (!process.client) return false
    
    return !!(
      window.PerformanceObserver &&
      window.PerformanceObserver.supportedEntryTypes &&
      (
        window.PerformanceObserver.supportedEntryTypes.includes('paint') ||
        window.PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint') ||
        window.PerformanceObserver.supportedEntryTypes.includes('first-input') ||
        window.PerformanceObserver.supportedEntryTypes.includes('layout-shift')
      )
    )
  }

  // 测量 First Contentful Paint
  const measureFCP = () => {
    if (!process.client) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
        if (fcpEntry) {
          metrics.value.fcp = Math.round(fcpEntry.startTime)
          observer.disconnect()
        }
      })
      observer.observe({ entryTypes: ['paint'] })
    } catch (error) {
      console.warn('FCP measurement failed:', error)
    }
  }

  // 测量 Largest Contentful Paint
  const measureLCP = () => {
    if (!process.client) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          metrics.value.lcp = Math.round(lastEntry.startTime)
        }
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      
      // 在页面隐藏时停止观察
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          observer.disconnect()
        }
      }, { once: true })
    } catch (error) {
      console.warn('LCP measurement failed:', error)
    }
  }

  // 测量 First Input Delay
  const measureFID = () => {
    if (!process.client) return

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const firstInput = entries[0]
        if (firstInput) {
          metrics.value.fid = Math.round(firstInput.processingStart - firstInput.startTime)
          observer.disconnect()
        }
      })
      observer.observe({ entryTypes: ['first-input'] })
    } catch (error) {
      console.warn('FID measurement failed:', error)
    }
  }

  // 测量 Cumulative Layout Shift
  const measureCLS = () => {
    if (!process.client) return

    try {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        for (const entry of entries) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        }
        metrics.value.cls = Math.round(clsValue * 1000) / 1000
      })
      observer.observe({ entryTypes: ['layout-shift'] })
      
      // 在页面隐藏时停止观察
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          observer.disconnect()
        }
      }, { once: true })
    } catch (error) {
      console.warn('CLS measurement failed:', error)
    }
  }

  // 测量 Time to First Byte
  const measureTTFB = () => {
    if (!process.client) return

    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        metrics.value.ttfb = Math.round(navigation.responseStart - navigation.requestStart)
      }
    } catch (error) {
      console.warn('TTFB measurement failed:', error)
    }
  }

  // 获取网络信息
  const getNetworkInfo = () => {
    if (!process.client) return null

    try {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      if (connection) {
        return {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData
        }
      }
    } catch (error) {
      console.warn('Network info not available:', error)
    }
    
    return null
  }

  // 获取设备信息
  const getDeviceInfo = () => {
    if (!process.client) return null

    try {
      return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: (navigator as any).deviceMemory
      }
    } catch (error) {
      console.warn('Device info not available:', error)
    }
    
    return null
  }

  // 发送性能数据到分析服务
  const sendMetrics = async () => {
    if (!process.client) return

    try {
      const data = {
        metrics: metrics.value,
        network: getNetworkInfo(),
        device: getDeviceInfo(),
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      }

      // 这里可以发送到 Google Analytics、Firebase Analytics 或自定义分析服务
      console.log('Performance metrics:', data)
      
      // 示例：发送到自定义端点
      // await $fetch('/api/analytics/performance', {
      //   method: 'POST',
      //   body: data
      // })
      
    } catch (error) {
      console.warn('Failed to send metrics:', error)
    }
  }

  // 初始化性能监控
  const initPerformanceMonitoring = () => {
    if (!process.client) return

    isSupported.value = checkSupport()
    
    if (!isSupported.value) {
      console.warn('Performance monitoring not supported in this browser')
      return
    }

    // 测量各项指标
    measureTTFB()
    measureFCP()
    measureLCP()
    measureFID()
    measureCLS()

    // 页面加载完成后发送数据
    window.addEventListener('load', () => {
      setTimeout(() => {
        sendMetrics()
      }, 1000) // 延迟 1 秒确保所有指标都已收集
    })

    // 页面隐藏时也发送数据
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendMetrics()
      }
    })
  }

  // 获取性能评分
  const getPerformanceScore = () => {
    const scores = {
      fcp: getScoreForFCP(metrics.value.fcp),
      lcp: getScoreForLCP(metrics.value.lcp),
      fid: getScoreForFID(metrics.value.fid),
      cls: getScoreForCLS(metrics.value.cls)
    }

    const validScores = Object.values(scores).filter(score => score !== null)
    if (validScores.length === 0) return null

    return Math.round(validScores.reduce((sum, score) => sum + score!, 0) / validScores.length)
  }

  // FCP 评分
  const getScoreForFCP = (fcp: number | null): number | null => {
    if (fcp === null) return null
    if (fcp <= 1800) return 100
    if (fcp <= 3000) return 50
    return 0
  }

  // LCP 评分
  const getScoreForLCP = (lcp: number | null): number | null => {
    if (lcp === null) return null
    if (lcp <= 2500) return 100
    if (lcp <= 4000) return 50
    return 0
  }

  // FID 评分
  const getScoreForFID = (fid: number | null): number | null => {
    if (fid === null) return null
    if (fid <= 100) return 100
    if (fid <= 300) return 50
    return 0
  }

  // CLS 评分
  const getScoreForCLS = (cls: number | null): number | null => {
    if (cls === null) return null
    if (cls <= 0.1) return 100
    if (cls <= 0.25) return 50
    return 0
  }

  return {
    metrics: readonly(metrics),
    isSupported: readonly(isSupported),
    initPerformanceMonitoring,
    getPerformanceScore,
    getNetworkInfo,
    getDeviceInfo,
    sendMetrics
  }
}
