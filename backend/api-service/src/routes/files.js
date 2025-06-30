/**
 * 文件管理路由
 */

const express = require('express')
const path = require('path')
const fs = require('fs')
const { upload, processUploadedFiles, FileManager, ImageProcessor } = require('../middleware/upload')
const { authMiddleware } = require('../middleware/auth')
const logger = require('../utils/logger')
const db = require('../config/database')

const router = express.Router()

/**
 * 上传文件
 */
router.post('/upload', 
  authMiddleware,
  upload.array('files', 5),
  processUploadedFiles,
  async (req, res) => {
    try {
      if (!req.processedFiles || req.processedFiles.length === 0) {
        return res.status(400).json({
          error: '没有上传文件',
          code: 'NO_FILES_UPLOADED'
        })
      }
      
      const uploadedFiles = []
      
      // 保存文件信息到数据库
      for (const file of req.processedFiles) {
        const insertQuery = `
          INSERT INTO fazd_file_records
          (user_id, original_name, file_name, file_path, file_size,
           mime_type, file_type, dimensions, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `

        const dimensions = `${file.imageInfo.width}x${file.imageInfo.height}`

        const result = await db.execute(insertQuery, [
          req.user.id,
          file.originalName,
          file.filename,
          file.path,
          file.size,
          file.mimetype,
          'upload',
          dimensions
        ])
        
        uploadedFiles.push({
          id: result.insertId,
          originalName: file.originalName,
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          width: file.imageInfo.width,
          height: file.imageInfo.height,
          url: `/api/files/view/${file.filename}`,
          thumbnailUrl: `/api/files/thumbnail/${file.filename}`
        })
      }
      
      logger.info(`用户 ${req.user.id} 上传了 ${uploadedFiles.length} 个文件`)
      
      res.json({
        message: '文件上传成功',
        files: uploadedFiles
      })
      
    } catch (error) {
      logger.error(`文件上传失败: ${error.message}`)
      
      // 清理已上传的文件
      if (req.processedFiles) {
        for (const file of req.processedFiles) {
          FileManager.deleteFile(file.path)
          FileManager.deleteFile(file.thumbnailPath)
        }
      }
      
      res.status(500).json({
        error: '文件上传失败',
        code: 'UPLOAD_FAILED',
        detail: error.message
      })
    }
  }
)

/**
 * 获取用户文件列表
 */
router.get('/list', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query
    const offset = (page - 1) * limit
    
    let whereClause = 'WHERE user_id = ? AND file_type = ? AND is_deleted = FALSE'
    const params = [req.user.id, 'upload']

    if (type) {
      whereClause += ' AND mime_type LIKE ?'
      params.push(`${type}/%`)
    }

    const query = `
      SELECT id, original_name, file_name, file_size, mime_type,
             dimensions, created_at
      FROM fazd_file_records
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `
    
    params.push(parseInt(limit), parseInt(offset))
    
    const files = await db.query(query, params)
    
    // 添加URL
    const filesWithUrls = files.map(file => ({
      ...file,
      filename: file.file_name,
      url: `/api/files/view/${file.file_name}`,
      thumbnailUrl: `/api/files/thumbnail/${file.file_name}`,
      sizeFormatted: formatFileSize(file.file_size),
      uploadTime: file.created_at
    }))

    // 获取总数
    const countQuery = `
      SELECT COUNT(*) as total
      FROM fazd_file_records
      ${whereClause}
    `
    const countResult = await db.query(countQuery, params.slice(0, -2))
    const total = countResult[0].total
    
    res.json({
      files: filesWithUrls,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    logger.error(`获取文件列表失败: ${error.message}`)
    res.status(500).json({
      error: '获取文件列表失败',
      code: 'LIST_FILES_FAILED'
    })
  }
})

/**
 * 查看文件
 */
router.get('/view/:filename', async (req, res) => {
  try {
    const { filename } = req.params
    const filePath = path.join(__dirname, '../../../storage/uploads', filename)
    
    if (!FileManager.fileExists(filePath)) {
      return res.status(404).json({
        error: '文件不存在',
        code: 'FILE_NOT_FOUND'
      })
    }
    
    // 获取文件信息
    const query = 'SELECT * FROM fazd_file_records WHERE file_name = ? AND is_deleted = FALSE'
    const files = await db.query(query, [filename])
    
    if (files.length === 0) {
      return res.status(404).json({
        error: '文件记录不存在',
        code: 'FILE_RECORD_NOT_FOUND'
      })
    }
    
    const file = files[0]
    
    // 设置响应头
    res.setHeader('Content-Type', file.mime_type)
    res.setHeader('Content-Length', file.file_size)
    res.setHeader('Cache-Control', 'public, max-age=31536000') // 缓存1年
    
    // 发送文件
    res.sendFile(filePath)
    
  } catch (error) {
    logger.error(`查看文件失败: ${error.message}`)
    res.status(500).json({
      error: '查看文件失败',
      code: 'VIEW_FILE_FAILED'
    })
  }
})

/**
 * 查看缩略图
 */
router.get('/thumbnail/:filename', async (req, res) => {
  try {
    const { filename } = req.params
    const thumbnailPath = path.join(__dirname, '../../../storage/thumbnails', `thumb_${filename}`)
    
    if (!FileManager.fileExists(thumbnailPath)) {
      return res.status(404).json({
        error: '缩略图不存在',
        code: 'THUMBNAIL_NOT_FOUND'
      })
    }
    
    // 设置响应头
    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=31536000') // 缓存1年
    
    // 发送缩略图
    res.sendFile(thumbnailPath)
    
  } catch (error) {
    logger.error(`查看缩略图失败: ${error.message}`)
    res.status(500).json({
      error: '查看缩略图失败',
      code: 'VIEW_THUMBNAIL_FAILED'
    })
  }
})

/**
 * 删除文件
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    
    // 获取文件信息
    const query = 'SELECT * FROM fazd_file_records WHERE id = ? AND user_id = ? AND is_deleted = FALSE'
    const files = await db.query(query, [id, req.user.id])

    if (files.length === 0) {
      return res.status(404).json({
        error: '文件不存在或无权限删除',
        code: 'FILE_NOT_FOUND_OR_NO_PERMISSION'
      })
    }

    const file = files[0]

    // 删除物理文件
    FileManager.deleteFile(file.file_path)

    // 生成缩略图路径并删除
    const thumbnailPath = path.join(__dirname, '../../../storage/thumbnails', `thumb_${file.file_name}`)
    FileManager.deleteFile(thumbnailPath)

    // 标记为已删除（软删除）
    const deleteQuery = 'UPDATE fazd_file_records SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?'
    await db.execute(deleteQuery, [id])
    
    logger.info(`用户 ${req.user.id} 删除了文件: ${file.filename}`)
    
    res.json({
      message: '文件删除成功'
    })
    
  } catch (error) {
    logger.error(`删除文件失败: ${error.message}`)
    res.status(500).json({
      error: '删除文件失败',
      code: 'DELETE_FILE_FAILED'
    })
  }
})

/**
 * 格式化文件大小
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

module.exports = router
