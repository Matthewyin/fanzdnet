const jwt = require('jsonwebtoken')
const { query } = require('../config/database')
const logger = require('../utils/logger')

// JWT认证中间件
const authMiddleware = async (req, res, next) => {
  try {
    // 从请求头获取token
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: '未提供认证令牌',
        code: 'NO_TOKEN'
      })
    }

    const token = authHeader.substring(7) // 移除 'Bearer ' 前缀

    // 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // 查询用户信息
    const users = await query(
      'SELECT id, username, email, user_level, status, daily_quota, used_quota FROM fazd_users WHERE id = ? AND status = "active"',
      [decoded.userId]
    )

    if (users.length === 0) {
      return res.status(401).json({
        error: '用户不存在或已被禁用',
        code: 'USER_NOT_FOUND'
      })
    }

    const user = users[0]
    
    // 将用户信息添加到请求对象
    req.user = user
    req.userId = user.id
    
    // 记录用户访问日志
    logger.info(`用户访问 - ID: ${user.id} - 用户名: ${user.username} - 路径: ${req.path}`)
    
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: '无效的认证令牌',
        code: 'INVALID_TOKEN'
      })
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: '认证令牌已过期',
        code: 'TOKEN_EXPIRED'
      })
    }
    
    logger.error('认证中间件错误:', error)
    res.status(500).json({
      error: '认证服务异常',
      code: 'AUTH_ERROR'
    })
  }
}

// 可选认证中间件（用于公开接口，但需要识别用户身份）
const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null
      req.userId = null
      return next()
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const users = await query(
      'SELECT id, username, email, user_level, status FROM fazd_users WHERE id = ? AND status = "active"',
      [decoded.userId]
    )

    if (users.length > 0) {
      req.user = users[0]
      req.userId = users[0].id
    } else {
      req.user = null
      req.userId = null
    }
    
    next()
  } catch (error) {
    // 可选认证失败时不返回错误，继续执行
    req.user = null
    req.userId = null
    next()
  }
}

// 权限检查中间件
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: '需要登录',
        code: 'LOGIN_REQUIRED'
      })
    }

    const userRole = req.user.user_level
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        error: '权限不足',
        code: 'INSUFFICIENT_PERMISSIONS',
        required: roles,
        current: userRole
      })
    }

    next()
  }
}

// 配额检查中间件
const checkQuota = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        error: '需要登录',
        code: 'LOGIN_REQUIRED'
      })
    }

    const { daily_quota, used_quota } = req.user
    
    if (used_quota >= daily_quota) {
      return res.status(429).json({
        error: '今日配额已用完',
        code: 'QUOTA_EXCEEDED',
        daily_quota,
        used_quota
      })
    }

    next()
  } catch (error) {
    logger.error('配额检查错误:', error)
    res.status(500).json({
      error: '配额检查失败',
      code: 'QUOTA_CHECK_ERROR'
    })
  }
}

module.exports = {
  authMiddleware,
  optionalAuthMiddleware,
  requireRole,
  checkQuota
}
