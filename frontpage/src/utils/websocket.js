/**
 * WebSocket 实时数据同步服务
 */

class WebSocketService {
  constructor() {
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 3000
    this.heartbeatInterval = 30000
    this.heartbeatTimer = null
    this.listeners = new Map()
    this.isConnecting = false
    this.isManualClose = false
  }

  /**
   * 连接WebSocket
   */
  connect(url = `ws://localhost:27001/ws`) {
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return Promise.resolve()
    }

    this.isConnecting = true
    this.isManualClose = false

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(url)

        this.ws.onopen = (event) => {
          console.log('WebSocket连接已建立')
          this.isConnecting = false
          this.reconnectAttempts = 0
          this.startHeartbeat()
          this.emit('connected', event)
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.handleMessage(data)
          } catch (error) {
            console.error('解析WebSocket消息失败:', error)
          }
        }

        this.ws.onclose = (event) => {
          console.log('WebSocket连接已关闭', event.code, event.reason)
          this.isConnecting = false
          this.stopHeartbeat()
          this.emit('disconnected', event)

          // 如果不是手动关闭，尝试重连
          if (!this.isManualClose && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect()
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket连接错误:', error)
          this.isConnecting = false
          this.emit('error', error)
          reject(error)
        }

      } catch (error) {
        this.isConnecting = false
        reject(error)
      }
    })
  }

  /**
   * 断开连接
   */
  disconnect() {
    this.isManualClose = true
    this.stopHeartbeat()
    
    if (this.ws) {
      this.ws.close(1000, '手动断开连接')
      this.ws = null
    }
  }

  /**
   * 发送消息
   */
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
      return true
    } else {
      console.warn('WebSocket未连接，无法发送消息')
      return false
    }
  }

  /**
   * 处理接收到的消息
   */
  handleMessage(data) {
    const { type, payload } = data

    switch (type) {
      case 'heartbeat':
        // 心跳响应
        break
      case 'news_update':
        this.emit('newsUpdate', payload)
        break
      case 'match_update':
        this.emit('matchUpdate', payload)
        break
      case 'community_message':
        this.emit('communityMessage', payload)
        break
      case 'user_notification':
        this.emit('userNotification', payload)
        break
      case 'system_announcement':
        this.emit('systemAnnouncement', payload)
        break
      default:
        this.emit('message', data)
    }
  }

  /**
   * 开始心跳
   */
  startHeartbeat() {
    this.stopHeartbeat()
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'heartbeat', timestamp: Date.now() })
    }, this.heartbeatInterval)
  }

  /**
   * 停止心跳
   */
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  /**
   * 安排重连
   */
  scheduleReconnect() {
    this.reconnectAttempts++
    const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1)
    
    console.log(`${delay}ms后尝试第${this.reconnectAttempts}次重连...`)
    
    setTimeout(() => {
      if (!this.isManualClose) {
        this.connect()
      }
    }, delay)
  }

  /**
   * 添加事件监听器
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
  }

  /**
   * 移除事件监听器
   */
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  /**
   * 触发事件
   */
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error(`事件监听器执行错误 (${event}):`, error)
        }
      })
    }
  }

  /**
   * 获取连接状态
   */
  get isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN
  }

  /**
   * 获取连接状态文本
   */
  get connectionState() {
    if (!this.ws) return 'CLOSED'
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING'
      case WebSocket.OPEN:
        return 'OPEN'
      case WebSocket.CLOSING:
        return 'CLOSING'
      case WebSocket.CLOSED:
        return 'CLOSED'
      default:
        return 'UNKNOWN'
    }
  }

  /**
   * 订阅特定类型的数据更新
   */
  subscribe(dataType, callback) {
    const eventMap = {
      'news': 'newsUpdate',
      'match': 'matchUpdate',
      'community': 'communityMessage',
      'notification': 'userNotification',
      'announcement': 'systemAnnouncement'
    }

    const event = eventMap[dataType]
    if (event) {
      this.on(event, callback)
      
      // 发送订阅请求
      this.send({
        type: 'subscribe',
        dataType: dataType
      })
    }
  }

  /**
   * 取消订阅
   */
  unsubscribe(dataType, callback) {
    const eventMap = {
      'news': 'newsUpdate',
      'match': 'matchUpdate',
      'community': 'communityMessage',
      'notification': 'userNotification',
      'announcement': 'systemAnnouncement'
    }

    const event = eventMap[dataType]
    if (event) {
      this.off(event, callback)
      
      // 发送取消订阅请求
      this.send({
        type: 'unsubscribe',
        dataType: dataType
      })
    }
  }
}

// 创建全局实例
const wsService = new WebSocketService()

// 自动连接（在生产环境中）
if (process.env.NODE_ENV === 'production') {
  wsService.connect()
} else {
  // 开发环境模拟连接
  setTimeout(() => {
    wsService.emit('connected', {})
    console.log('模拟WebSocket连接已建立')
    
    // 模拟数据推送
    setInterval(() => {
      // 模拟新闻更新
      if (Math.random() > 0.8) {
        wsService.emit('newsUpdate', {
          id: Date.now(),
          title: '樊振东训练最新动态',
          content: '樊振东今日在国家队训练基地进行技术训练...',
          timestamp: new Date().toISOString()
        })
      }
      
      // 模拟比赛更新
      if (Math.random() > 0.9) {
        wsService.emit('matchUpdate', {
          id: Date.now(),
          tournament: '世界乒乓球锦标赛',
          status: 'ongoing',
          score: '2-1',
          timestamp: new Date().toISOString()
        })
      }
    }, 10000)
  }, 1000)
}

export default wsService
