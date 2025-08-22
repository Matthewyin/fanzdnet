export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const pathname = url.pathname

  // 静态资源缓存策略
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)$/)) {
    // 静态资源缓存 1 年
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    setHeader(event, 'Expires', new Date(Date.now() + 31536000 * 1000).toUTCString())
    return
  }

  // API 路由缓存策略
  if (pathname.startsWith('/api/')) {
    if (pathname === '/api/sitemap.xml') {
      // Sitemap 缓存 1 小时
      setHeader(event, 'Cache-Control', 'public, max-age=3600')
    } else if (pathname === '/api/robots.txt') {
      // Robots.txt 缓存 24 小时
      setHeader(event, 'Cache-Control', 'public, max-age=86400')
    } else if (pathname.startsWith('/api/ai/')) {
      // AI 相关 API 不缓存
      setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
    } else if (pathname.startsWith('/api/data/')) {
      // 数据 API 缓存 5 分钟
      setHeader(event, 'Cache-Control', 'public, max-age=300')
    } else {
      // 其他 API 缓存 1 分钟
      setHeader(event, 'Cache-Control', 'public, max-age=60')
    }
    return
  }

  // 页面缓存策略
  if (pathname === '/' || pathname.match(/^\/(en|fr|de|ja|ko|sv)?\/?$/)) {
    // 首页缓存 10 分钟
    setHeader(event, 'Cache-Control', 'public, max-age=600, s-maxage=3600')
  } else if (pathname.includes('/timeline')) {
    // 时间线页面缓存 1 小时
    setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=7200')
  } else if (pathname.includes('/ai-gallery')) {
    // AI 画廊页面缓存 30 分钟
    setHeader(event, 'Cache-Control', 'public, max-age=1800, s-maxage=3600')
  } else if (pathname.includes('/admin')) {
    // 管理页面不缓存
    setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
    setHeader(event, 'Pragma', 'no-cache')
    setHeader(event, 'Expires', '0')
  } else {
    // 其他页面缓存 30 分钟
    setHeader(event, 'Cache-Control', 'public, max-age=1800, s-maxage=3600')
  }

  // 添加 ETag 支持
  const etag = generateETag(pathname)
  setHeader(event, 'ETag', etag)

  // 检查 If-None-Match 头
  const ifNoneMatch = getHeader(event, 'if-none-match')
  if (ifNoneMatch === etag) {
    setResponseStatus(event, 304)
    return ''
  }

  // 添加安全头
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'X-XSS-Protection', '1; mode=block')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // CSP 头（内容安全策略）
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.bigdatacloud.net https://ipapi.co https://www.google-analytics.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ')
  
  setHeader(event, 'Content-Security-Policy', csp)
})

// 生成简单的 ETag
function generateETag(pathname: string): string {
  const hash = pathname + Date.now().toString(36)
  return `"${Buffer.from(hash).toString('base64').slice(0, 16)}"`
}

// 压缩响应（如果支持）
function shouldCompress(event: any): boolean {
  const acceptEncoding = getHeader(event, 'accept-encoding') || ''
  const contentType = getHeader(event, 'content-type') || ''
  
  // 检查是否支持压缩
  const supportsGzip = acceptEncoding.includes('gzip')
  const supportsBrotli = acceptEncoding.includes('br')
  
  // 检查内容类型是否适合压缩
  const compressibleTypes = [
    'text/',
    'application/javascript',
    'application/json',
    'application/xml',
    'image/svg+xml'
  ]
  
  const isCompressible = compressibleTypes.some(type => contentType.includes(type))
  
  return (supportsGzip || supportsBrotli) && isCompressible
}
