#!/usr/bin/env node

/**
 * 翻译完整性检查脚本
 * 
 * 使用方法：
 * node scripts/check-translations.js
 * 
 * 功能：
 * 1. 检查所有语言文件的键是否一致
 * 2. 找出缺失的翻译
 * 3. 生成翻译报告
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 支持的语言
const LANGUAGES = [
  { code: 'zh', file: 'zh-CN.json', name: '中文' },
  { code: 'en', file: 'en-US.json', name: 'English' },
  { code: 'es', file: 'es-ES.json', name: 'Español' },
  { code: 'fr', file: 'fr-FR.json', name: 'Français' },
  { code: 'de', file: 'de-DE.json', name: 'Deutsch' },
  { code: 'ja', file: 'ja-JP.json', name: '日本語' },
  { code: 'ko', file: 'ko-KR.json', name: '한국어' },
  { code: 'sv', file: 'sv-SE.json', name: 'Svenska' }
]

// 颜色输出
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
}

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// 获取所有翻译键
function getAllKeys(obj, prefix = '') {
  const keys = []
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    
    if (typeof value === 'object' && value !== null) {
      keys.push(...getAllKeys(value, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  
  return keys
}

// 加载语言文件
function loadLanguageFile(filename) {
  const filePath = path.join(__dirname, '..', 'locales', filename)
  
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    log(`❌ 无法加载 ${filename}: ${error.message}`, 'red')
    return null
  }
}

// 检查翻译完整性
function checkTranslations() {
  log('🔍 检查翻译完整性...', 'blue')
  log('='.repeat(50), 'blue')
  
  // 加载所有语言文件
  const translations = {}
  const allKeys = {}
  
  for (const lang of LANGUAGES) {
    const data = loadLanguageFile(lang.file)
    if (data) {
      translations[lang.code] = data
      allKeys[lang.code] = getAllKeys(data)
      log(`✅ 加载 ${lang.name} (${allKeys[lang.code].length} 个键)`, 'green')
    }
  }
  
  // 以中文为基准检查其他语言
  const baseKeys = allKeys.zh || []
  const missingTranslations = {}
  const extraTranslations = {}
  
  for (const lang of LANGUAGES) {
    if (lang.code === 'zh') continue
    
    const langKeys = allKeys[lang.code] || []
    
    // 找出缺失的键
    const missing = baseKeys.filter(key => !langKeys.includes(key))
    if (missing.length > 0) {
      missingTranslations[lang.code] = missing
    }
    
    // 找出多余的键
    const extra = langKeys.filter(key => !baseKeys.includes(key))
    if (extra.length > 0) {
      extraTranslations[lang.code] = extra
    }
  }
  
  // 生成报告
  log('\n📊 翻译完整性报告', 'cyan')
  log('='.repeat(50), 'cyan')
  
  let hasIssues = false
  
  // 缺失翻译报告
  if (Object.keys(missingTranslations).length > 0) {
    hasIssues = true
    log('\n❌ 缺失的翻译:', 'red')
    
    for (const [langCode, missing] of Object.entries(missingTranslations)) {
      const langName = LANGUAGES.find(l => l.code === langCode)?.name || langCode
      log(`\n  ${langName} (${missing.length} 个缺失):`, 'yellow')
      
      missing.slice(0, 10).forEach(key => {
        log(`    - ${key}`, 'white')
      })
      
      if (missing.length > 10) {
        log(`    ... 还有 ${missing.length - 10} 个`, 'yellow')
      }
    }
  }
  
  // 多余翻译报告
  if (Object.keys(extraTranslations).length > 0) {
    log('\n⚠️  多余的翻译:', 'yellow')
    
    for (const [langCode, extra] of Object.entries(extraTranslations)) {
      const langName = LANGUAGES.find(l => l.code === langCode)?.name || langCode
      log(`\n  ${langName} (${extra.length} 个多余):`, 'yellow')
      
      extra.slice(0, 5).forEach(key => {
        log(`    - ${key}`, 'white')
      })
      
      if (extra.length > 5) {
        log(`    ... 还有 ${extra.length - 5} 个`, 'yellow')
      }
    }
  }
  
  // 总结
  log('\n📈 统计信息:', 'magenta')
  log(`  基准语言 (中文): ${baseKeys.length} 个翻译键`, 'white')
  
  for (const lang of LANGUAGES) {
    if (lang.code === 'zh') continue
    
    const langKeys = allKeys[lang.code] || []
    const completeness = ((langKeys.length / baseKeys.length) * 100).toFixed(1)
    const missing = missingTranslations[lang.code]?.length || 0
    
    if (missing === 0) {
      log(`  ${lang.name}: ${langKeys.length}/${baseKeys.length} (${completeness}%) ✅`, 'green')
    } else {
      log(`  ${lang.name}: ${langKeys.length}/${baseKeys.length} (${completeness}%) ❌ 缺失 ${missing}`, 'red')
    }
  }
  
  if (!hasIssues) {
    log('\n🎉 所有翻译都是完整的！', 'green')
  } else {
    log('\n💡 建议:', 'cyan')
    log('  1. 使用 /admin/translate 翻译缺失的内容', 'white')
    log('  2. 使用 /admin/batch-translate 批量翻译', 'white')
    log('  3. 检查并删除多余的翻译键', 'white')
  }
  
  return !hasIssues
}

// 主函数
function main() {
  log('🌍 多语言翻译检查工具', 'cyan')
  log('='.repeat(50), 'cyan')
  
  const isComplete = checkTranslations()
  
  process.exit(isComplete ? 0 : 1)
}

// 运行检查
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

export { checkTranslations }
