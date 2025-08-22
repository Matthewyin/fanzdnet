import type { SupportedLanguage } from '~/types/firestore'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://fanzd.net'
  const supportedLanguages: SupportedLanguage[] = ['zh', 'en', 'fr', 'de', 'ja', 'ko', 'sv']
  
  // 静态页面
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily' },
    { path: '/timeline', priority: 0.9, changefreq: 'weekly' },
    { path: '/ai-gallery', priority: 0.8, changefreq: 'weekly' },
    { path: '/about', priority: 0.7, changefreq: 'monthly' },
    { path: '/updates', priority: 0.8, changefreq: 'daily' },
    { path: '/schedule', priority: 0.8, changefreq: 'weekly' },
    { path: '/essays', priority: 0.6, changefreq: 'weekly' }
  ]

  // 生成 URL 条目
  const generateUrlEntry = (path: string, language: SupportedLanguage, priority: number, changefreq: string) => {
    const langPrefix = language === 'zh' ? '' : `/${language}`
    const url = `${baseUrl}${langPrefix}${path}`
    const lastmod = new Date().toISOString().split('T')[0]
    
    // 生成 hreflang 链接
    const alternateLinks = supportedLanguages.map(lang => {
      const altLangPrefix = lang === 'zh' ? '' : `/${lang}`
      const altUrl = `${baseUrl}${altLangPrefix}${path}`
      const hreflang = getHreflangCode(lang)
      return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${altUrl}"/>`
    }).join('\n')
    
    // 添加 x-default
    const defaultLink = `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${path}"/>`
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks}
${defaultLink}
  </url>`
  }

  // 获取 hreflang 代码
  const getHreflangCode = (language: SupportedLanguage): string => {
    const hreflangMap = {
      zh: 'zh-CN',
      en: 'en-US',
      fr: 'fr-FR',
      de: 'de-DE',
      ja: 'ja-JP',
      ko: 'ko-KR',
      sv: 'sv-SE'
    }
    return hreflangMap[language] || 'zh-CN'
  }

  // 生成所有 URL 条目
  const urlEntries = []
  
  for (const page of staticPages) {
    for (const language of supportedLanguages) {
      urlEntries.push(generateUrlEntry(page.path, language, page.priority, page.changefreq))
    }
  }

  // 生成 sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>`

  // 设置响应头
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=3600') // 缓存 1 小时

  return sitemap
})
