#!/usr/bin/env node

/**
 * Firebase App Hosting 启动文件
 * 直接使用 Nitro 生成的服务器，但设置正确的端口
 */

// 设置环境变量
process.env.PORT = process.env.PORT || '8080'
process.env.HOST = process.env.HOST || '0.0.0.0'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

console.log('🚀 启动 Firebase App Hosting 服务器...')
console.log(`📡 端口: ${process.env.PORT}`)
console.log(`🌐 主机: ${process.env.HOST}`)
console.log(`🔧 环境: ${process.env.NODE_ENV}`)

// 直接运行 Nitro 服务器
import('./.output/server/index.mjs')
  .then(() => {
    console.log('✅ 服务器已启动')
    console.log(`🎯 Firebase App Hosting 就绪`)
  })
  .catch((error) => {
    console.error('❌ 服务器启动失败:', error)
    process.exit(1)
  })
