const winston = require('winston')
const path = require('path')

// 创建logs目录
const fs = require('fs')
const logsDir = path.join(__dirname, '../../logs')
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true })
}

// 自定义日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    if (stack) {
      return `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
    }
    return `${timestamp} [${level.toUpperCase()}]: ${message}`
  })
)

// 创建logger实例
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // 控制台输出
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    }),
    
    // 文件输出 - 所有日志
    new winston.transports.File({
      filename: path.join(logsDir, 'app.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // 文件输出 - 错误日志
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  ]
})

// 在生产环境中不输出到控制台
if (process.env.NODE_ENV === 'production') {
  logger.remove(logger.transports[0])
}

// 添加请求日志方法
logger.logRequest = (req, res, responseTime) => {
  const { method, url, ip, headers } = req
  const { statusCode } = res
  const userAgent = headers['user-agent'] || 'Unknown'
  
  logger.info(`${method} ${url} - ${statusCode} - ${responseTime}ms - ${ip} - ${userAgent}`)
}

// 添加AI生成日志方法
logger.logAIGeneration = (taskId, type, status, userId, duration = null) => {
  const message = `AI生成 [${taskId}] - 类型: ${type} - 状态: ${status} - 用户: ${userId}`
  if (duration) {
    logger.info(`${message} - 耗时: ${duration}ms`)
  } else {
    logger.info(message)
  }
}

// 添加数据库操作日志方法
logger.logDatabase = (operation, table, userId = null, details = null) => {
  let message = `数据库操作 - ${operation} - 表: ${table}`
  if (userId) message += ` - 用户: ${userId}`
  if (details) message += ` - 详情: ${JSON.stringify(details)}`
  logger.info(message)
}

module.exports = logger
