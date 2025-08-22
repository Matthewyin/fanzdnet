#!/usr/bin/env node

/**
 * 健康检查脚本 - 樊振东粉丝网站
 * 检查网站的各项功能是否正常工作
 */

const https = require('https')
const http = require('http')

const SITE_URL = 'https://fanzd.net'
const TIMEOUT = 10000 // 10 秒超时

// 颜色输出
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// HTTP 请求函数
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'))
    }, TIMEOUT)

    const req = protocol.get(url, options, (res) => {
      clearTimeout(timeout)
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        })
      })
    })

    req.on('error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })
}

// 检查页面可访问性
async function checkPageAccessibility() {
  log('\n📋 检查页面可访问性...', 'blue')
  
  const pages = [
    { path: '/', name: '首页' },
    { path: '/timeline', name: '时间线' },
    { path: '/ai-gallery', name: 'AI 灵感站' },
    { path: '/about', name: '关于页面' },
    { path: '/updates', name: '最新动态' },
    { path: '/schedule', name: '赛事信息' },
    { path: '/essays', name: '随笔' }
  ]

  const results = []
  
  for (const page of pages) {
    try {
      const response = await makeRequest(`${SITE_URL}${page.path}`)
      if (response.statusCode === 200) {
        log(`✅ ${page.name} (${page.path}) - 正常`, 'green')
        results.push({ ...page, status: 'success', statusCode: response.statusCode })
      } else {
        log(`⚠️ ${page.name} (${page.path}) - 状态码: ${response.statusCode}`, 'yellow')
        results.push({ ...page, status: 'warning', statusCode: response.statusCode })
      }
    } catch (error) {
      log(`❌ ${page.name} (${page.path}) - 错误: ${error.message}`, 'red')
      results.push({ ...page, status: 'error', error: error.message })
    }
  }
  
  return results
}

// 检查多语言支持
async function checkMultiLanguageSupport() {
  log('\n🌍 检查多语言支持...', 'blue')
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'sv', name: 'Svenska' }
  ]

  const results = []
  
  for (const lang of languages) {
    try {
      const response = await makeRequest(`${SITE_URL}/${lang.code}`)
      if (response.statusCode === 200) {
        log(`✅ ${lang.name} (/${lang.code}) - 正常`, 'green')
        results.push({ ...lang, status: 'success' })
      } else {
        log(`⚠️ ${lang.name} (/${lang.code}) - 状态码: ${response.statusCode}`, 'yellow')
        results.push({ ...lang, status: 'warning', statusCode: response.statusCode })
      }
    } catch (error) {
      log(`❌ ${lang.name} (/${lang.code}) - 错误: ${error.message}`, 'red')
      results.push({ ...lang, status: 'error', error: error.message })
    }
  }
  
  return results
}

// 检查 SEO 文件
async function checkSEOFiles() {
  log('\n🔍 检查 SEO 文件...', 'blue')
  
  const seoFiles = [
    { path: '/api/sitemap.xml', name: 'Sitemap' },
    { path: '/api/robots.txt', name: 'Robots.txt' }
  ]

  const results = []
  
  for (const file of seoFiles) {
    try {
      const response = await makeRequest(`${SITE_URL}${file.path}`)
      if (response.statusCode === 200) {
        log(`✅ ${file.name} (${file.path}) - 正常`, 'green')
        
        // 检查内容
        if (file.path.includes('sitemap.xml')) {
          if (response.data.includes('<urlset') && response.data.includes('<url>')) {
            log(`  📄 Sitemap 格式正确`, 'green')
          } else {
            log(`  ⚠️ Sitemap 格式可能有问题`, 'yellow')
          }
        }
        
        if (file.path.includes('robots.txt')) {
          if (response.data.includes('User-agent:') && response.data.includes('Sitemap:')) {
            log(`  📄 Robots.txt 格式正确`, 'green')
          } else {
            log(`  ⚠️ Robots.txt 格式可能有问题`, 'yellow')
          }
        }
        
        results.push({ ...file, status: 'success' })
      } else {
        log(`❌ ${file.name} (${file.path}) - 状态码: ${response.statusCode}`, 'red')
        results.push({ ...file, status: 'error', statusCode: response.statusCode })
      }
    } catch (error) {
      log(`❌ ${file.name} (${file.path}) - 错误: ${error.message}`, 'red')
      results.push({ ...file, status: 'error', error: error.message })
    }
  }
  
  return results
}

// 检查 API 端点
async function checkAPIEndpoints() {
  log('\n🔌 检查 API 端点...', 'blue')
  
  const apis = [
    { path: '/api/data/hero', name: '轮播图数据 API' },
    { path: '/api/data/timeline', name: '时间线数据 API' }
  ]

  const results = []
  
  for (const api of apis) {
    try {
      const response = await makeRequest(`${SITE_URL}${api.path}`)
      if (response.statusCode === 200) {
        try {
          const data = JSON.parse(response.data)
          if (Array.isArray(data) && data.length > 0) {
            log(`✅ ${api.name} (${api.path}) - 正常，返回 ${data.length} 条数据`, 'green')
          } else {
            log(`⚠️ ${api.name} (${api.path}) - 数据为空`, 'yellow')
          }
          results.push({ ...api, status: 'success', dataCount: data.length })
        } catch (parseError) {
          log(`⚠️ ${api.name} (${api.path}) - JSON 解析失败`, 'yellow')
          results.push({ ...api, status: 'warning', error: 'JSON parse error' })
        }
      } else {
        log(`❌ ${api.name} (${api.path}) - 状态码: ${response.statusCode}`, 'red')
        results.push({ ...api, status: 'error', statusCode: response.statusCode })
      }
    } catch (error) {
      log(`❌ ${api.name} (${api.path}) - 错误: ${error.message}`, 'red')
      results.push({ ...api, status: 'error', error: error.message })
    }
  }
  
  return results
}

// 检查响应头
async function checkSecurityHeaders() {
  log('\n🛡️ 检查安全响应头...', 'blue')
  
  try {
    const response = await makeRequest(SITE_URL)
    const headers = response.headers
    
    const securityHeaders = [
      { name: 'x-content-type-options', expected: 'nosniff' },
      { name: 'x-frame-options', expected: 'DENY' },
      { name: 'x-xss-protection', expected: '1; mode=block' },
      { name: 'content-security-policy', required: true },
      { name: 'referrer-policy', required: true }
    ]
    
    for (const header of securityHeaders) {
      const value = headers[header.name]
      if (value) {
        if (header.expected && value === header.expected) {
          log(`✅ ${header.name}: ${value}`, 'green')
        } else if (header.required) {
          log(`✅ ${header.name}: 已设置`, 'green')
        } else {
          log(`⚠️ ${header.name}: ${value} (期望: ${header.expected})`, 'yellow')
        }
      } else {
        log(`❌ ${header.name}: 未设置`, 'red')
      }
    }
    
    return { status: 'checked', headers: headers }
  } catch (error) {
    log(`❌ 检查安全头失败: ${error.message}`, 'red')
    return { status: 'error', error: error.message }
  }
}

// 生成报告
function generateReport(results) {
  log('\n📊 健康检查报告', 'bold')
  log('='.repeat(50), 'blue')
  
  let totalChecks = 0
  let successfulChecks = 0
  let warnings = 0
  let errors = 0
  
  for (const [category, items] of Object.entries(results)) {
    if (Array.isArray(items)) {
      totalChecks += items.length
      items.forEach(item => {
        if (item.status === 'success') successfulChecks++
        else if (item.status === 'warning') warnings++
        else if (item.status === 'error') errors++
      })
    } else if (items.status) {
      totalChecks++
      if (items.status === 'success' || items.status === 'checked') successfulChecks++
      else if (items.status === 'warning') warnings++
      else if (items.status === 'error') errors++
    }
  }
  
  log(`\n📈 总体统计:`, 'bold')
  log(`  总检查项: ${totalChecks}`)
  log(`  ✅ 成功: ${successfulChecks}`, 'green')
  log(`  ⚠️ 警告: ${warnings}`, 'yellow')
  log(`  ❌ 错误: ${errors}`, 'red')
  
  const successRate = ((successfulChecks / totalChecks) * 100).toFixed(1)
  log(`  📊 成功率: ${successRate}%`, successRate >= 90 ? 'green' : successRate >= 70 ? 'yellow' : 'red')
  
  if (successRate >= 90) {
    log(`\n🎉 网站健康状况良好！`, 'green')
  } else if (successRate >= 70) {
    log(`\n⚠️ 网站基本正常，但有一些需要关注的问题`, 'yellow')
  } else {
    log(`\n❌ 网站存在较多问题，需要立即处理`, 'red')
  }
}

// 主函数
async function main() {
  log('🏥 樊振东粉丝网站健康检查', 'bold')
  log('='.repeat(50), 'blue')
  log(`🌐 检查网站: ${SITE_URL}`)
  
  const results = {}
  
  try {
    results.pages = await checkPageAccessibility()
    results.languages = await checkMultiLanguageSupport()
    results.seo = await checkSEOFiles()
    results.apis = await checkAPIEndpoints()
    results.security = await checkSecurityHeaders()
    
    generateReport(results)
    
  } catch (error) {
    log(`\n❌ 健康检查过程中发生错误: ${error.message}`, 'red')
    process.exit(1)
  }
}

// 运行检查
if (require.main === module) {
  main().catch(error => {
    log(`❌ 未处理的错误: ${error.message}`, 'red')
    process.exit(1)
  })
}

module.exports = { main, checkPageAccessibility, checkMultiLanguageSupport, checkSEOFiles, checkAPIEndpoints, checkSecurityHeaders }
