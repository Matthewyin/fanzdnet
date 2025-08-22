export default defineEventHandler(async (event) => {
  const baseUrl = 'https://fanzd.net'
  
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/
Disallow: /api/

# Allow specific API endpoints that are public
Allow: /api/ai/suggestion
Allow: /api/sitemap.xml
Allow: /api/robots.txt

# Sitemap
Sitemap: ${baseUrl}/api/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Specific rules for different bots
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

# Block AI training bots (optional)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /`

  // 设置响应头
  setHeader(event, 'Content-Type', 'text/plain')
  setHeader(event, 'Cache-Control', 'public, max-age=86400') // 缓存 24 小时

  return robotsTxt
})
