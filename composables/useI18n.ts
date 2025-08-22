/**
 * 简单的国际化 composable
 * 临时替代 @nuxtjs/i18n，直到其支持 Nuxt 4
 */

import { ref, computed } from 'vue'
import type { SupportedLanguage } from '~/types/firestore'

// 全局状态
const currentLocale = ref<SupportedLanguage>('zh')

// 翻译数据
const translations = {
  zh: () => import('~/locales/zh-CN.json'),
  en: () => import('~/locales/en-US.json'),
  fr: () => import('~/locales/fr-FR.json'),
  de: () => import('~/locales/de-DE.json'),
  ja: () => import('~/locales/ja-JP.json'),
  ko: () => import('~/locales/ko-KR.json'),
  sv: () => import('~/locales/sv-SE.json')
}

// 缓存翻译数据
const translationCache = new Map<SupportedLanguage, any>()

export const useI18n = () => {
  // 获取翻译数据
  const getTranslations = async (locale: SupportedLanguage) => {
    if (translationCache.has(locale)) {
      return translationCache.get(locale)
    }
    
    try {
      const module = await translations[locale]()
      const data = module.default || module
      translationCache.set(locale, data)
      return data
    } catch (error) {
      console.warn(`Failed to load translations for ${locale}:`, error)
      // 回退到中文
      if (locale !== 'zh') {
        return getTranslations('zh')
      }
      return {}
    }
  }

  // 翻译函数
  const t = async (key: string, fallback?: string): Promise<string> => {
    const translations = await getTranslations(currentLocale.value)
    
    // 支持嵌套键，如 'nav.home'
    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // 如果找不到翻译，返回 fallback 或 key
        return fallback || key
      }
    }
    
    return typeof value === 'string' ? value : (fallback || key)
  }

  // 设置语言
  const setLocale = async (locale: SupportedLanguage) => {
    currentLocale.value = locale
    
    // 保存到 localStorage
    if (process.client) {
      localStorage.setItem('preferred-language', locale)
    }
    
    // 预加载翻译数据
    await getTranslations(locale)
  }

  // 初始化
  const init = async () => {
    if (process.client) {
      const saved = localStorage.getItem('preferred-language') as SupportedLanguage
      if (saved && translations[saved]) {
        await setLocale(saved)
      } else {
        // 检测浏览器语言
        const browserLang = navigator.language.toLowerCase()
        const langMap: Record<string, SupportedLanguage> = {
          'zh': 'zh', 'zh-cn': 'zh', 'zh-hans': 'zh',
          'en': 'en', 'en-us': 'en', 'en-gb': 'en',
          'fr': 'fr', 'fr-fr': 'fr',
          'de': 'de', 'de-de': 'de',
          'ja': 'ja', 'ja-jp': 'ja',
          'ko': 'ko', 'ko-kr': 'ko',
          'sv': 'sv', 'sv-se': 'sv'
        }
        
        const detectedLang = langMap[browserLang] || langMap[browserLang.split('-')[0]] || 'zh'
        await setLocale(detectedLang)
      }
    }
  }

  return {
    locale: computed(() => currentLocale.value),
    t,
    setLocale,
    init
  }
}
