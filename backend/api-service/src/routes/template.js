const express = require('express')
const { query } = require('../config/database')
const { optionalAuthMiddleware } = require('../middleware/auth')
const { asyncHandler, NotFoundError } = require('../middleware/errorHandler')

const router = express.Router()

// 获取模板列表（公开接口）
router.get('/', optionalAuthMiddleware, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = Math.min(parseInt(req.query.limit) || 12, 50)
  const type = req.query.type
  const category = req.query.category
  const userId = req.userId

  let whereClause = 'WHERE is_active = 1'
  const queryParams = []

  if (type) {
    whereClause += ' AND type = ?'
    queryParams.push(type)
  }

  if (category) {
    whereClause += ' AND category = ?'
    queryParams.push(category)
  }

  // 非VIP用户只能看到免费模板
  if (!userId || req.user?.user_level === 'free') {
    whereClause += ' AND is_premium = 0'
  }

  const offset = (page - 1) * limit

  // 获取模板列表
  const templates = await query(
    `SELECT id, name, type, category, description, preview_path, thumbnail_path,
            tags, is_premium, usage_count, created_at
     FROM fazd_templates 
     ${whereClause}
     ORDER BY sort_order DESC, usage_count DESC, created_at DESC
     LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  )

  // 获取总数
  const [{ total }] = await query(
    `SELECT COUNT(*) as total FROM fazd_templates ${whereClause}`,
    queryParams
  )

  // 添加预览URL
  const templatesWithUrl = templates.map(template => ({
    ...template,
    preview_url: template.preview_path ? `/api/files/template/${template.id}/preview` : null,
    thumbnail_url: template.thumbnail_path ? `/api/files/template/${template.id}/thumbnail` : null,
    tags: template.tags ? template.tags.split(',') : []
  }))

  res.json({
    templates: templatesWithUrl,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
}))

// 获取模板详情
router.get('/:id', optionalAuthMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.userId

  const templates = await query(
    `SELECT id, name, type, category, description, template_path, preview_path,
            thumbnail_path, parameters, tags, is_premium, usage_count, created_at
     FROM fazd_templates 
     WHERE id = ? AND is_active = 1`,
    [id]
  )

  if (templates.length === 0) {
    throw new NotFoundError('模板不存在')
  }

  const template = templates[0]

  // 检查权限
  if (template.is_premium && (!userId || req.user?.user_level === 'free')) {
    return res.status(403).json({
      error: '此模板需要VIP权限',
      code: 'PREMIUM_REQUIRED'
    })
  }

  // 增加使用次数
  await query(
    'UPDATE fazd_templates SET usage_count = usage_count + 1 WHERE id = ?',
    [id]
  )

  res.json({
    ...template,
    preview_url: template.preview_path ? `/api/files/template/${id}/preview` : null,
    thumbnail_url: template.thumbnail_path ? `/api/files/template/${id}/thumbnail` : null,
    template_url: template.template_path ? `/api/files/template/${id}/template` : null,
    tags: template.tags ? template.tags.split(',') : [],
    parameters: template.parameters ? JSON.parse(template.parameters) : {}
  })
}))

// 获取模板分类列表
router.get('/categories/:type', asyncHandler(async (req, res) => {
  const { type } = req.params

  const categories = await query(
    `SELECT category, COUNT(*) as count
     FROM fazd_templates 
     WHERE type = ? AND is_active = 1 AND category IS NOT NULL
     GROUP BY category
     ORDER BY count DESC, category ASC`,
    [type]
  )

  res.json({ categories })
}))

// 搜索模板
router.get('/search/:keyword', optionalAuthMiddleware, asyncHandler(async (req, res) => {
  const { keyword } = req.params
  const page = parseInt(req.query.page) || 1
  const limit = Math.min(parseInt(req.query.limit) || 12, 50)
  const type = req.query.type
  const userId = req.userId

  let whereClause = 'WHERE is_active = 1 AND (name LIKE ? OR description LIKE ? OR tags LIKE ?)'
  const queryParams = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]

  if (type) {
    whereClause += ' AND type = ?'
    queryParams.push(type)
  }

  // 非VIP用户只能看到免费模板
  if (!userId || req.user?.user_level === 'free') {
    whereClause += ' AND is_premium = 0'
  }

  const offset = (page - 1) * limit

  // 搜索模板
  const templates = await query(
    `SELECT id, name, type, category, description, preview_path, thumbnail_path,
            tags, is_premium, usage_count, created_at
     FROM fazd_templates 
     ${whereClause}
     ORDER BY usage_count DESC, created_at DESC
     LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  )

  // 获取总数
  const [{ total }] = await query(
    `SELECT COUNT(*) as total FROM fazd_templates ${whereClause}`,
    queryParams
  )

  // 添加预览URL
  const templatesWithUrl = templates.map(template => ({
    ...template,
    preview_url: template.preview_path ? `/api/files/template/${template.id}/preview` : null,
    thumbnail_url: template.thumbnail_path ? `/api/files/template/${template.id}/thumbnail` : null,
    tags: template.tags ? template.tags.split(',') : []
  }))

  res.json({
    templates: templatesWithUrl,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    },
    keyword
  })
}))

// 获取热门模板
router.get('/popular/:type', optionalAuthMiddleware, asyncHandler(async (req, res) => {
  const { type } = req.params
  const limit = Math.min(parseInt(req.query.limit) || 6, 20)
  const userId = req.userId

  let whereClause = 'WHERE is_active = 1 AND type = ?'
  const queryParams = [type]

  // 非VIP用户只能看到免费模板
  if (!userId || req.user?.user_level === 'free') {
    whereClause += ' AND is_premium = 0'
  }

  const templates = await query(
    `SELECT id, name, type, category, description, preview_path, thumbnail_path,
            tags, is_premium, usage_count
     FROM fazd_templates 
     ${whereClause}
     ORDER BY usage_count DESC, created_at DESC
     LIMIT ?`,
    [...queryParams, limit]
  )

  // 添加预览URL
  const templatesWithUrl = templates.map(template => ({
    ...template,
    preview_url: template.preview_path ? `/api/files/template/${template.id}/preview` : null,
    thumbnail_url: template.thumbnail_path ? `/api/files/template/${template.id}/thumbnail` : null,
    tags: template.tags ? template.tags.split(',') : []
  }))

  res.json({ templates: templatesWithUrl })
}))

module.exports = router
