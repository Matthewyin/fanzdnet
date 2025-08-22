#!/usr/bin/env node

/**
 * 启动脚本 - 确保服务器在正确的端口上运行
 * Firebase App Hosting 需要应用在端口 8080 上运行
 */

const { spawn } = require('child_process')
const path = require('path')

// 设置环境变量
process.env.PORT = process.env.PORT || '8080'
process.env.HOST = process.env.HOST || '0.0.0.0'
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

console.log('🚀 启动 Nuxt.js 服务器...')
console.log(`📡 端口: ${process.env.PORT}`)
console.log(`🌐 主机: ${process.env.HOST}`)
console.log(`🔧 环境: ${process.env.NODE_ENV}`)

// 启动服务器
const serverPath = path.join(__dirname, '../.output/server/index.mjs')

const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
})

server.on('error', (error) => {
  console.error('❌ 服务器启动失败:', error)
  process.exit(1)
})

server.on('exit', (code) => {
  console.log(`🔚 服务器退出，代码: ${code}`)
  process.exit(code)
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('📴 收到 SIGTERM，正在关闭服务器...')
  server.kill('SIGTERM')
})

process.on('SIGINT', () => {
  console.log('📴 收到 SIGINT，正在关闭服务器...')
  server.kill('SIGINT')
})
