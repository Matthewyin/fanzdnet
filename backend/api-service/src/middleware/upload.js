/**
 * 文件上传中间件
 */

const multer = require('multer')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const logger = require('../utils/logger')

// 存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../../storage/uploads')
    
    // 确保目录存在
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }
    
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`
    cb(null, filename)
  }
})

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 允许的文件类型
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp'
  ]
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('不支持的文件类型，仅支持图片文件'), false)
  }
}

// 创建multer实例
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5 // 最多5个文件
  }
})

/**
 * 图片处理工具
 */
class ImageProcessor {
  /**
   * 生成缩略图
   */
  static async generateThumbnail(inputPath, outputPath, size = 300) {
    try {
      await sharp(inputPath)
        .resize(size, size, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 80 })
        .toFile(outputPath)
      
      logger.info(`缩略图生成成功: ${outputPath}`)
      return outputPath
    } catch (error) {
      logger.error(`缩略图生成失败: ${error.message}`)
      throw error
    }
  }
  
  /**
   * 压缩图片
   */
  static async compressImage(inputPath, outputPath, quality = 85) {
    try {
      const metadata = await sharp(inputPath).metadata()
      
      let pipeline = sharp(inputPath)
      
      // 如果图片太大，先调整尺寸
      if (metadata.width > 2048 || metadata.height > 2048) {
        pipeline = pipeline.resize(2048, 2048, {
          fit: 'inside',
          withoutEnlargement: true
        })
      }
      
      // 根据格式压缩
      if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
        pipeline = pipeline.jpeg({ quality })
      } else if (metadata.format === 'png') {
        pipeline = pipeline.png({ quality })
      } else if (metadata.format === 'webp') {
        pipeline = pipeline.webp({ quality })
      }
      
      await pipeline.toFile(outputPath)
      
      logger.info(`图片压缩成功: ${outputPath}`)
      return outputPath
    } catch (error) {
      logger.error(`图片压缩失败: ${error.message}`)
      throw error
    }
  }
  
  /**
   * 获取图片信息
   */
  static async getImageInfo(imagePath) {
    try {
      const metadata = await sharp(imagePath).metadata()
      const stats = fs.statSync(imagePath)
      
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: stats.size,
        channels: metadata.channels,
        hasAlpha: metadata.hasAlpha
      }
    } catch (error) {
      logger.error(`获取图片信息失败: ${error.message}`)
      throw error
    }
  }
}

/**
 * 文件管理工具
 */
class FileManager {
  /**
   * 删除文件
   */
  static async deleteFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        logger.info(`文件删除成功: ${filePath}`)
        return true
      }
      return false
    } catch (error) {
      logger.error(`文件删除失败: ${error.message}`)
      throw error
    }
  }
  
  /**
   * 获取文件大小
   */
  static getFileSize(filePath) {
    try {
      const stats = fs.statSync(filePath)
      return stats.size
    } catch (error) {
      logger.error(`获取文件大小失败: ${error.message}`)
      return 0
    }
  }
  
  /**
   * 检查文件是否存在
   */
  static fileExists(filePath) {
    return fs.existsSync(filePath)
  }
  
  /**
   * 创建目录
   */
  static ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }
}

/**
 * 上传后处理中间件
 */
const processUploadedFiles = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next()
    }
    
    const processedFiles = []
    
    for (const file of req.files) {
      const thumbnailDir = path.join(__dirname, '../../../storage/thumbnails')
      FileManager.ensureDir(thumbnailDir)
      
      const thumbnailPath = path.join(thumbnailDir, `thumb_${file.filename}`)
      
      // 生成缩略图
      await ImageProcessor.generateThumbnail(file.path, thumbnailPath)
      
      // 获取图片信息
      const imageInfo = await ImageProcessor.getImageInfo(file.path)
      
      processedFiles.push({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        thumbnailPath: thumbnailPath,
        size: file.size,
        mimetype: file.mimetype,
        imageInfo: imageInfo
      })
    }
    
    req.processedFiles = processedFiles
    next()
  } catch (error) {
    logger.error(`文件处理失败: ${error.message}`)
    next(error)
  }
}

module.exports = {
  upload,
  ImageProcessor,
  FileManager,
  processUploadedFiles
}
