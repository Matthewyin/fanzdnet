const express = require('express')
const { body, validationResult } = require('express-validator')
const { query } = require('../config/database')
const { asyncHandler, ValidationError, NotFoundError } = require('../middleware/errorHandler')
const logger = require('../utils/logger')

const router = express.Router()

// 获取用户信息
router.get('/profile', asyncHandler(async (req, res) => {
  const userId = req.userId

  const users = await query(
    `SELECT id, username, email, nickname, bio, avatar_url, user_level, 
            daily_quota, used_quota, created_at, last_login_at
     FROM fazd_users 
     WHERE id = ?`,
    [userId]
  )

  if (users.length === 0) {
    throw new NotFoundError('用户不存在')
  }

  const user = users[0]

  // 获取用户统计信息
  const [stats] = await Promise.all([
    query(
      `SELECT 
        COUNT(*) as total_generations,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_generations,
        COUNT(CASE WHEN is_public = 1 THEN 1 END) as public_generations
       FROM fazd_generation_records 
       WHERE user_id = ?`,
      [userId]
    )
  ])

  res.json({
    user: {
      ...user,
      stats: stats[0]
    }
  })
}))

// 更新用户信息
router.put('/profile', [
  body('nickname')
    .optional()
    .isLength({ max: 100 })
    .withMessage('昵称长度不能超过100个字符'),
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('个人简介长度不能超过500个字符')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidationError('用户信息验证失败', errors.array())
  }

  const userId = req.userId
  const { nickname, bio } = req.body

  const updateFields = []
  const updateValues = []

  if (nickname !== undefined) {
    updateFields.push('nickname = ?')
    updateValues.push(nickname)
  }

  if (bio !== undefined) {
    updateFields.push('bio = ?')
    updateValues.push(bio)
  }

  if (updateFields.length === 0) {
    return res.json({ message: '没有需要更新的信息' })
  }

  updateFields.push('updated_at = CURRENT_TIMESTAMP')
  updateValues.push(userId)

  await query(
    `UPDATE fazd_users SET ${updateFields.join(', ')} WHERE id = ?`,
    updateValues
  )

  logger.info(`用户信息更新 - ID: ${userId}`)

  res.json({ message: '用户信息更新成功' })
}))

// 获取用户作品列表
router.get('/works', asyncHandler(async (req, res) => {
  const userId = req.userId
  const page = parseInt(req.query.page) || 1
  const limit = Math.min(parseInt(req.query.limit) || 10, 50)
  const type = req.query.type
  const status = req.query.status

  let whereClause = 'WHERE user_id = ?'
  const queryParams = [userId]

  if (type) {
    whereClause += ' AND type = ?'
    queryParams.push(type)
  }

  if (status) {
    whereClause += ' AND status = ?'
    queryParams.push(status)
  }

  const offset = (page - 1) * limit

  // 获取作品列表
  const works = await query(
    `SELECT id, task_id, type, title, status, output_image_path, thumbnail_path,
            likes_count, downloads_count, is_public, created_at, completed_at
     FROM fazd_generation_records 
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  )

  // 获取总数
  const [{ total }] = await query(
    `SELECT COUNT(*) as total FROM fazd_generation_records ${whereClause}`,
    queryParams
  )

  res.json({
    works,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
}))

// 获取用户收藏列表
router.get('/favorites', asyncHandler(async (req, res) => {
  const userId = req.userId
  const page = parseInt(req.query.page) || 1
  const limit = Math.min(parseInt(req.query.limit) || 10, 50)
  const offset = (page - 1) * limit

  // 获取收藏列表
  const favorites = await query(
    `SELECT gr.id, gr.task_id, gr.type, gr.title, gr.output_image_path, 
            gr.thumbnail_path, gr.likes_count, gr.downloads_count, 
            gr.created_at, uf.created_at as favorited_at,
            u.username as author_username
     FROM fazd_user_favorites uf
     JOIN fazd_generation_records gr ON uf.generation_id = gr.id
     JOIN fazd_users u ON gr.user_id = u.id
     WHERE uf.user_id = ? AND gr.is_public = 1
     ORDER BY uf.created_at DESC
     LIMIT ? OFFSET ?`,
    [userId, limit, offset]
  )

  // 获取总数
  const [{ total }] = await query(
    `SELECT COUNT(*) as total 
     FROM fazd_user_favorites uf
     JOIN fazd_generation_records gr ON uf.generation_id = gr.id
     WHERE uf.user_id = ? AND gr.is_public = 1`,
    [userId]
  )

  res.json({
    favorites,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
}))

// 重置每日配额（仅用于测试，生产环境应该通过定时任务处理）
router.post('/reset-quota', asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      error: '生产环境不允许手动重置配额',
      code: 'FORBIDDEN'
    })
  }

  const userId = req.userId

  await query(
    'UPDATE fazd_users SET used_quota = 0 WHERE id = ?',
    [userId]
  )

  logger.info(`用户配额重置 - ID: ${userId}`)

  res.json({ message: '配额重置成功' })
}))

module.exports = router
