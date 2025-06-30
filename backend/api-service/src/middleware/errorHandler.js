const logger = require('../utils/logger')

// 全局错误处理中间件
const errorHandler = (err, req, res, next) => {
  // 记录错误日志
  logger.error('API错误:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.userId || 'anonymous'
  })

  // 默认错误响应
  let statusCode = 500
  let errorResponse = {
    error: '服务器内部错误',
    code: 'INTERNAL_SERVER_ERROR',
    timestamp: new Date().toISOString()
  }

  // 根据错误类型设置不同的响应
  if (err.name === 'ValidationError') {
    statusCode = 400
    errorResponse = {
      error: '请求参数验证失败',
      code: 'VALIDATION_ERROR',
      details: err.details || err.message,
      timestamp: new Date().toISOString()
    }
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401
    errorResponse = {
      error: '未授权访问',
      code: 'UNAUTHORIZED',
      timestamp: new Date().toISOString()
    }
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403
    errorResponse = {
      error: '禁止访问',
      code: 'FORBIDDEN',
      timestamp: new Date().toISOString()
    }
  } else if (err.name === 'NotFoundError') {
    statusCode = 404
    errorResponse = {
      error: '资源不存在',
      code: 'NOT_FOUND',
      timestamp: new Date().toISOString()
    }
  } else if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409
    errorResponse = {
      error: '数据已存在',
      code: 'DUPLICATE_ENTRY',
      timestamp: new Date().toISOString()
    }
  } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    statusCode = 400
    errorResponse = {
      error: '关联数据不存在',
      code: 'FOREIGN_KEY_ERROR',
      timestamp: new Date().toISOString()
    }
  } else if (err.code === 'ECONNREFUSED') {
    statusCode = 503
    errorResponse = {
      error: '服务暂时不可用',
      code: 'SERVICE_UNAVAILABLE',
      timestamp: new Date().toISOString()
    }
  } else if (err.code === 'ETIMEDOUT') {
    statusCode = 408
    errorResponse = {
      error: '请求超时',
      code: 'REQUEST_TIMEOUT',
      timestamp: new Date().toISOString()
    }
  }

  // 在开发环境中包含错误堆栈
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack
    errorResponse.details = err.message
  }

  res.status(statusCode).json(errorResponse)
}

// 异步错误包装器
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// 自定义错误类
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
    this.details = details
  }
}

class UnauthorizedError extends AppError {
  constructor(message = '未授权访问') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

class ForbiddenError extends AppError {
  constructor(message = '禁止访问') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}

class NotFoundError extends AppError {
  constructor(message = '资源不存在') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

class ConflictError extends AppError {
  constructor(message = '数据冲突') {
    super(message, 409, 'CONFLICT')
    this.name = 'ConflictError'
  }
}

module.exports = {
  errorHandler,
  asyncHandler,
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError
}
