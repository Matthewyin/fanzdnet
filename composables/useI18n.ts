/**
 * 简单的 useI18n mock，替代 @nuxtjs/i18n
 * 提供基本的语言切换功能
 */

import type { SupportedLanguage } from '~/types/firestore'

// 全局状态
const currentLocale = ref<SupportedLanguage>('zh')

// 可用语言配置
const availableLocales = [
  { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh-CN.json' },
  { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
  { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr-FR.json' },
  { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de-DE.json' },
  { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja-JP.json' },
  { code: 'ko', language: 'ko-KR', name: '한국어', file: 'ko-KR.json' },
  { code: 'sv', language: 'sv-SE', name: 'Svenska', file: 'sv-SE.json' }
]

export const useI18n = () => {
  // 设置语言
  const setLocale = async (locale: SupportedLanguage) => {
    currentLocale.value = locale
    
    // 保存到 localStorage
    if (process.client) {
      localStorage.setItem('preferred-language', locale)
    }
    
    console.log(`Language switched to: ${locale}`)
  }

  // 初始化语言
  const initLocale = () => {
    if (process.client) {
      const saved = localStorage.getItem('preferred-language') as SupportedLanguage
      if (saved && availableLocales.some(l => l.code === saved)) {
        currentLocale.value = saved
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
        currentLocale.value = detectedLang
      }
    }
  }

  return {
    locale: computed(() => currentLocale.value),
    locales: computed(() => availableLocales),
    setLocale,
    initLocale
  }
}

// 客户端初始化
if (process.client) {
  const { initLocale } = useI18n()
  initLocale()
}
