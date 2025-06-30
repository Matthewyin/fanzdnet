const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs').promises
const { v4: uuidv4 } = require('uuid')
const { query } = require('../config/database')
const { asyncHandler, ValidationError } = require('../middleware/errorHandler')
const logger = require('../utils/logger')

const router = express.Router()

// 确保上传目录存在
const ensureDir = async (dir) => {
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

// 配置multer存储
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ValidationError('不支持的文件类型，仅支持 JPEG、PNG、GIF、WebP 格式'))
    }
  }
})

// 文件上传
router.post('/upload', upload.single('file'), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ValidationError('请选择要上传的文件')
  }

  const userId = req.userId
  const file = req.file
  const fileId = uuidv4()
  const fileExt = path.extname(file.originalname) || '.jpg'
  const fileName = `${fileId}${fileExt}`
  
  // 创建上传目录
  const uploadDir = path.join(__dirname, '../../../storage/uploads')
  const dateDir = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
  const fullUploadDir = path.join(uploadDir, dateDir)
  await ensureDir(fullUploadDir)

  const filePath = path.join(fullUploadDir, fileName)
  const relativePath = path.join('uploads', dateDir, fileName)

  try {
    // 处理图片（压缩和优化）
    let processedBuffer = file.buffer
    
    if (file.mimetype.startsWith('image/')) {
      const image = sharp(file.buffer)
      const metadata = await image.metadata()
      
      // 如果图片过大，进行压缩
      if (metadata.width > 2048 || metadata.height > 2048) {
        processedBuffer = await image
          .resize(2048, 2048, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: 85 })
          .toBuffer()
      } else if (file.size > 1024 * 1024) { // 1MB
        // 文件大于1MB时进行质量压缩
        processedBuffer = await image
          .jpeg({ quality: 85 })
          .toBuffer()
      }
    }

    // 保存文件
    await fs.writeFile(filePath, processedBuffer)

    // 生成缩略图
    let thumbnailPath = null
    if (file.mimetype.startsWith('image/')) {
      const thumbnailFileName = `thumb_${fileName}`
      const thumbnailFullPath = path.join(fullUploadDir, thumbnailFileName)
      thumbnailPath = path.join('uploads', dateDir, thumbnailFileName)

      await sharp(processedBuffer)
        .resize(300, 300, { 
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 80 })
        .toFile(thumbnailFullPath)
    }

    // 计算文件哈希
    const crypto = require('crypto')
    const fileHash = crypto.createHash('sha256').update(processedBuffer).digest('hex')

    // 保存文件记录到数据库
    const [result] = await query(
      `INSERT INTO fazd_file_records 
       (user_id, file_path, original_name, file_name, file_size, mime_type, 
        file_type, file_hash, storage_type) 
       VALUES (?, ?, ?, ?, ?, ?, 'upload', ?, 'local')`,
      [userId, relativePath, file.originalname, fileName, processedBuffer.length, 
       file.mimetype, fileHash]
    )

    logger.info(`文件上传成功 - 用户ID: ${userId} - 文件: ${fileName} - 大小: ${processedBuffer.length}`)

    res.json({
      message: '文件上传成功',
      file: {
        id: result.insertId,
        file_name: fileName,
        original_name: file.originalname,
        file_path: relativePath,
        thumbnail_path: thumbnailPath,
        file_size: processedBuffer.length,
        mime_type: file.mimetype,
        url: `/api/files/serve/${result.insertId}`
      }
    })
  } catch (error) {
    // 清理可能已创建的文件
    try {
      await fs.unlink(filePath)
    } catch {}
    
    logger.error('文件上传失败:', error)
    throw error
  }
}))

// 文件服务
router.get('/serve/:fileId', asyncHandler(async (req, res) => {
  const { fileId } = req.params
  const thumbnail = req.query.thumbnail === 'true'

  // 查询文件信息
  const files = await query(
    'SELECT file_path, original_name, mime_type, file_size FROM fazd_file_records WHERE id = ? AND is_deleted = 0',
    [fileId]
  )

  if (files.length === 0) {
    return res.status(404).json({
      error: '文件不存在',
      code: 'FILE_NOT_FOUND'
    })
  }

  const file = files[0]
  let filePath = path.join(__dirname, '../../../storage', file.file_path)

  // 如果请求缩略图
  if (thumbnail && file.mime_type.startsWith('image/')) {
    const dir = path.dirname(filePath)
    const ext = path.extname(filePath)
    const name = path.basename(filePath, ext)
    const thumbnailPath = path.join(dir, `thumb_${name}${ext}`)
    
    try {
      await fs.access(thumbnailPath)
      filePath = thumbnailPath
    } catch {
      // 缩略图不存在，使用原图
    }
  }

  try {
    // 检查文件是否存在
    await fs.access(filePath)

    // 更新访问次数
    await query(
      'UPDATE fazd_file_records SET access_count = access_count + 1 WHERE id = ?',
      [fileId]
    )

    // 设置响应头
    res.setHeader('Content-Type', file.mime_type)
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.original_name)}"`)
    res.setHeader('Cache-Control', 'public, max-age=31536000') // 缓存1年

    // 发送文件
    res.sendFile(path.resolve(filePath))
  } catch (error) {
    logger.error(`文件服务错误 - 文件ID: ${fileId}`, error)
    res.status(404).json({
      error: '文件不存在或已损坏',
      code: 'FILE_NOT_ACCESSIBLE'
    })
  }
}))

// 获取用户文件列表
router.get('/list', asyncHandler(async (req, res) => {
  const userId = req.userId
  const page = parseInt(req.query.page) || 1
  const limit = Math.min(parseInt(req.query.limit) || 10, 50)
  const fileType = req.query.file_type

  let whereClause = 'WHERE user_id = ? AND is_deleted = 0'
  const queryParams = [userId]

  if (fileType) {
    whereClause += ' AND file_type = ?'
    queryParams.push(fileType)
  }

  const offset = (page - 1) * limit

  // 获取文件列表
  const files = await query(
    `SELECT id, original_name, file_name, file_size, mime_type, file_type,
            access_count, created_at
     FROM fazd_file_records 
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [...queryParams, limit, offset]
  )

  // 获取总数
  const [{ total }] = await query(
    `SELECT COUNT(*) as total FROM fazd_file_records ${whereClause}`,
    queryParams
  )

  // 添加文件URL
  const filesWithUrl = files.map(file => ({
    ...file,
    url: `/api/files/serve/${file.id}`,
    thumbnail_url: file.mime_type.startsWith('image/') ? `/api/files/serve/${file.id}?thumbnail=true` : null
  }))

  res.json({
    files: filesWithUrl,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  })
}))

// 删除文件
router.delete('/:fileId', asyncHandler(async (req, res) => {
  const { fileId } = req.params
  const userId = req.userId

  // 检查文件是否存在且属于当前用户
  const files = await query(
    'SELECT file_path FROM fazd_file_records WHERE id = ? AND user_id = ? AND is_deleted = 0',
    [fileId, userId]
  )

  if (files.length === 0) {
    return res.status(404).json({
      error: '文件不存在或无权限删除',
      code: 'FILE_NOT_FOUND'
    })
  }

  // 标记为已删除（软删除）
  await query(
    'UPDATE fazd_file_records SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
    [fileId]
  )

  logger.info(`文件删除 - 文件ID: ${fileId} - 用户ID: ${userId}`)

  res.json({ message: '文件删除成功' })
}))

module.exports = router
