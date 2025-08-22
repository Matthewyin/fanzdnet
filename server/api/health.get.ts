/**
 * 健康检查端点
 * Firebase App Hosting 使用此端点检查应用状态
 */

export default defineEventHandler(async (event) => {
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || '8080',
    host: process.env.HOST || '0.0.0.0',
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: '1.0.0'
  }
})
