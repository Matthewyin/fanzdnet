const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const { query, transaction } = require('../config/database')
const { asyncHandler, ValidationError, UnauthorizedError, ConflictError } = require('../middleware/errorHandler')
const logger = require('../utils/logger')

const router = express.Router()

// 生成JWT token
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
  
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  )
  
  return { accessToken, refreshToken }
}

// 用户注册
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 50 })
    .withMessage('用户名长度必须在3-50个字符之间')
    .matches(/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/)
    .withMessage('用户名只能包含字母、数字、下划线和中文'),
  body('email')
    .isEmail()
    .withMessage('请输入有效的邮箱地址')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6, max: 128 })
    .withMessage('密码长度必须在6-128个字符之间')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('密码必须包含至少一个小写字母、一个大写字母和一个数字'),
  body('nickname')
    .optional()
    .isLength({ max: 100 })
    .withMessage('昵称长度不能超过100个字符')
], asyncHandler(async (req, res) => {
  // 验证请求参数
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidationError('注册信息验证失败', errors.array())
  }

  const { username, email, password, nickname } = req.body

  await transaction(async (connection) => {
    // 检查用户名是否已存在
    const [existingUsers] = await connection.execute(
      'SELECT id FROM fazd_users WHERE username = ? OR email = ?',
      [username, email]
    )

    if (existingUsers.length > 0) {
      throw new ConflictError('用户名或邮箱已存在')
    }

    // 加密密码
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 创建用户
    const [result] = await connection.execute(
      `INSERT INTO fazd_users (username, email, password_hash, nickname, user_level, daily_quota, used_quota) 
       VALUES (?, ?, ?, ?, 'free', 3, 0)`,
      [username, email, passwordHash, nickname || username]
    )

    const userId = result.insertId

    // 生成token
    const { accessToken, refreshToken } = generateTokens(userId)

    logger.info(`新用户注册成功 - ID: ${userId} - 用户名: ${username} - 邮箱: ${email}`)

    res.status(201).json({
      message: '注册成功',
      user: {
        id: userId,
        username,
        email,
        nickname: nickname || username,
        user_level: 'free',
        daily_quota: 3,
        used_quota: 0
      },
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    })
  })
}))

// 用户登录
router.post('/login', [
  body('login')
    .notEmpty()
    .withMessage('请输入用户名或邮箱'),
  body('password')
    .notEmpty()
    .withMessage('请输入密码')
], asyncHandler(async (req, res) => {
  // 验证请求参数
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidationError('登录信息验证失败', errors.array())
  }

  const { login, password } = req.body

  // 查询用户（支持用户名或邮箱登录）
  const users = await query(
    `SELECT id, username, email, password_hash, nickname, user_level, status, daily_quota, used_quota 
     FROM fazd_users 
     WHERE (username = ? OR email = ?) AND status = 'active'`,
    [login, login]
  )

  if (users.length === 0) {
    throw new UnauthorizedError('用户名/邮箱或密码错误')
  }

  const user = users[0]

  // 验证密码
  const isPasswordValid = await bcrypt.compare(password, user.password_hash)
  if (!isPasswordValid) {
    throw new UnauthorizedError('用户名/邮箱或密码错误')
  }

  // 更新最后登录时间
  await query(
    'UPDATE fazd_users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?',
    [user.id]
  )

  // 生成token
  const { accessToken, refreshToken } = generateTokens(user.id)

  logger.info(`用户登录成功 - ID: ${user.id} - 用户名: ${user.username}`)

  res.json({
    message: '登录成功',
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      user_level: user.user_level,
      daily_quota: user.daily_quota,
      used_quota: user.used_quota
    },
    tokens: {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  })
}))

// 刷新token
router.post('/refresh', [
  body('refresh_token')
    .notEmpty()
    .withMessage('请提供刷新令牌')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidationError('刷新令牌验证失败', errors.array())
  }

  const { refresh_token } = req.body

  try {
    // 验证刷新token
    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET)
    
    if (decoded.type !== 'refresh') {
      throw new UnauthorizedError('无效的刷新令牌')
    }

    // 检查用户是否仍然有效
    const users = await query(
      'SELECT id, username FROM fazd_users WHERE id = ? AND status = "active"',
      [decoded.userId]
    )

    if (users.length === 0) {
      throw new UnauthorizedError('用户不存在或已被禁用')
    }

    // 生成新的token
    const { accessToken, refreshToken } = generateTokens(decoded.userId)

    res.json({
      message: '令牌刷新成功',
      tokens: {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('无效或已过期的刷新令牌')
    }
    throw error
  }
}))

// 验证token有效性
router.get('/verify', asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('未提供认证令牌')
  }

  const token = authHeader.substring(7)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    const users = await query(
      'SELECT id, username, email, nickname, user_level, daily_quota, used_quota FROM fazd_users WHERE id = ? AND status = "active"',
      [decoded.userId]
    )

    if (users.length === 0) {
      throw new UnauthorizedError('用户不存在或已被禁用')
    }

    res.json({
      valid: true,
      user: users[0]
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('无效或已过期的认证令牌')
    }
    throw error
  }
}))

module.exports = router
