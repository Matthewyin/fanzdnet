const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { createServer } = require('http')
const { Server } = require('socket.io')
require('dotenv').config()

const config = require('./config/database')
const logger = require('./utils/logger')
const { errorHandler } = require('./middleware/errorHandler')
const { authMiddleware } = require('./middleware/auth')

// 导入路由
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const aiRoutes = require('./routes/ai')
const fileRoutes = require('./routes/files')
const templateRoutes = require('./routes/template')

const app = express()
const server = createServer(app)

// Socket.IO配置
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true
  }
})

// 中间件配置
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}))

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}))

app.use(compression())
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 速率限制
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15分钟
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 限制每个IP 100个请求
  message: {
    error: '请求过于频繁，请稍后再试',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false
})
app.use('/api/', limiter)

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  })
})

// API路由
app.use('/api/auth', authRoutes)
app.use('/api/users', authMiddleware, userRoutes)
app.use('/api/ai', authMiddleware, aiRoutes)
app.use('/api/files', authMiddleware, fileRoutes)
app.use('/api/templates', templateRoutes)

// 静态文件服务
const path = require('path')
const uploadDir = path.join(__dirname, '../../storage/uploads')
const generatedDir = path.join(__dirname, '../../storage/generated')
app.use('/uploads', express.static(uploadDir))
app.use('/generated', express.static(generatedDir))

// Socket.IO连接处理
io.on('connection', (socket) => {
  logger.info(`用户连接: ${socket.id}`)
  
  // 加入用户房间
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`)
    logger.info(`用户 ${userId} 加入房间`)
  })
  
  // 处理AI生成进度更新
  socket.on('ai-generation-progress', (data) => {
    socket.to(`user-${data.userId}`).emit('generation-progress', data)
  })
  
  socket.on('disconnect', () => {
    logger.info(`用户断开连接: ${socket.id}`)
  })
})

// 将io实例添加到app中，供其他模块使用
app.set('io', io)

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({
    error: '接口不存在',
    code: 'NOT_FOUND',
    path: req.originalUrl
  })
})

// 错误处理中间件
app.use(errorHandler)

// 启动服务器
const PORT = process.env.PORT || 27001
const HOST = process.env.HOST || 'localhost'

server.listen(PORT, HOST, () => {
  logger.info(`🚀 API服务启动成功`)
  logger.info(`📍 服务地址: http://${HOST}:${PORT}`)
  logger.info(`🌍 环境: ${process.env.NODE_ENV}`)
  logger.info(`📊 数据库: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`)
})

// 优雅关闭
process.on('SIGTERM', () => {
  logger.info('收到SIGTERM信号，开始优雅关闭...')
  server.close(() => {
    logger.info('HTTP服务器已关闭')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('收到SIGINT信号，开始优雅关闭...')
  server.close(() => {
    logger.info('HTTP服务器已关闭')
    process.exit(0)
  })
})

module.exports = app
