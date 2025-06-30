const express = require('express')
const { body, validationResult } = require('express-validator')
const { v4: uuidv4 } = require('uuid')
const { query } = require('../config/database')
const { checkQuota } = require('../middleware/auth')
const { asyncHandler, ValidationError, NotFoundError } = require('../middleware/errorHandler')
const logger = require('../utils/logger')

const router = express.Router()

// AI生成请求
router.post('/generate', checkQuota, [
  body('type')
    .isIn(['banner', 'slogan', 'emoji'])
    .withMessage('生成类型必须是 banner、slogan 或 emoji'),
  body('prompt')
    .isLength({ min: 1, max: 10 })
    .withMessage('提示词长度必须在1-10···个字符之间'),
  body('parameters')
    .optional()
    .isObject()
    .withMessage('参数必须是对象格式'),
  body('title')
    .optional()
    .isLength({ max: 6 })
    .withMessage('标题长度不能超过6个字符')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidationError('生成请求验证失败', errors.array())
  }

  const userId = req.userId
  const { type, prompt, parameters = {}, title } = req.body
  const taskId = uuidv4()

  // 创建生成记录
  await query(
    `INSERT INTO fazd_generation_records 
     (user_id, task_id, type, title, prompt, parameters, status, progress) 
     VALUES (?, ?, ?, ?, ?, ?, 'pending', 0)`,
    [userId, taskId, type, title, prompt, JSON.stringify(parameters)]
  )

  // 更新用户已使用配额
  await query(
    'UPDATE fazd_users SET used_quota = used_quota + 1 WHERE id = ?',
    [userId]
  )

  // TODO: 这里应该调用AI服务进行实际生成
  // 目前先返回任务ID，实际生成逻辑将在AI服务中实现
  
  logger.logAIGeneration(taskId, type, 'pending', userId)

  // 通过Socket.IO通知前端
  const io = req.app.get('io')
  io.to(`user-${userId}`).emit('generation-started', {
    taskId,
    type,
    status: 'pending'
  })

  res.status(202).json({
    message: 'AI生成任务已创建',
    task_id: taskId,
    status: 'pending',
    estimated_time: 30 // 预估30秒完成
  })
}))

// 查询生成任务状态
router.get('/task/:taskId', asyncHandler(async (req, res) => {
  const { taskId } = req.params
  const userId = req.userId

  const tasks = await query(
    `SELECT id, task_id, type, title, status, progress, output_image_path, 
            thumbnail_path, error_message, generation_time, created_at, completed_at
     FROM fazd_generation_records 
     WHERE task_id = ? AND user_id = ?`,
    [taskId, userId]
  )

  if (tasks.length === 0) {
    throw new NotFoundError('生成任务不存在')
  }

  const task = tasks[0]

  res.json({
    task_id: task.task_id,
    type: task.type,
    title: task.title,
    status: task.status,
    progress: task.progress,
    output_image_path: task.output_image_path,
    thumbnail_path: task.thumbnail_path,
    error_message: task.error_message,
    generation_time: task.generation_time,
    created_at: task.created_at,
    completed_at: task.completed_at
  })
}))

// 获取生成历史
router.get('/history', asyncHandler(async (req, res) => {
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

  // 获取历史记录
  const history = await query(
    `SELECT id, task_id, type, title, status, progress, output_image_path,
            thumbnail_path, likes_count, downloads_count, is_public,
            generation_time, created_at, completed_at
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
    history,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
}))

// 设置作品公开状态
router.put('/work/:id/visibility', [
  body('is_public')
    .isBoolean()
    .withMessage('公开状态必须是布尔值')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ValidationError('参数验证失败', errors.array())
  }

  const { id } = req.params
  const { is_public } = req.body
  const userId = req.userId

  // 检查作品是否存在且属于当前用户
  const works = await query(
    'SELECT id FROM fazd_generation_records WHERE id = ? AND user_id = ? AND status = "completed"',
    [id, userId]
  )

  if (works.length === 0) {
    throw new NotFoundError('作品不存在或无权限修改')
  }

  await query(
    'UPDATE fazd_generation_records SET is_public = ? WHERE id = ?',
    [is_public, id]
  )

  logger.info(`作品可见性更新 - 作品ID: ${id} - 用户ID: ${userId} - 公开: ${is_public}`)

  res.json({ message: '作品可见性设置成功' })
}))

// 删除生成记录
router.delete('/work/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.userId

  // 检查作品是否存在且属于当前用户
  const works = await query(
    'SELECT id, output_image_path, thumbnail_path FROM fazd_generation_records WHERE id = ? AND user_id = ?',
    [id, userId]
  )

  if (works.length === 0) {
    throw new NotFoundError('作品不存在或无权限删除')
  }

  // 删除数据库记录
  await query('DELETE FROM fazd_generation_records WHERE id = ?', [id])

  // TODO: 删除相关文件
  // const work = works[0]
  // if (work.output_image_path) {
  //   // 删除生成的图片文件
  // }
  // if (work.thumbnail_path) {
  //   // 删除缩略图文件
  // }

  logger.info(`作品删除 - 作品ID: ${id} - 用户ID: ${userId}`)

  res.json({ message: '作品删除成功' })
}))

// 获取用户配额信息
router.get('/quota', asyncHandler(async (req, res) => {
  const userId = req.userId

  const users = await query(
    'SELECT user_level, daily_quota, used_quota FROM fazd_users WHERE id = ?',
    [userId]
  )

  if (users.length === 0) {
    throw new NotFoundError('用户不存在')
  }

  const user = users[0]

  res.json({
    user_level: user.user_level,
    daily_quota: user.daily_quota,
    used_quota: user.used_quota,
    remaining_quota: user.daily_quota - user.used_quota
  })
}))

module.exports = router
