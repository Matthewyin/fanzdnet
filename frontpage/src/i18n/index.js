/**
 * Vue I18n 国际化配置
 */

import { createI18n } from 'vue-i18n'

// 导入语言包
import zhCN from './locales/zh-CN.json'
import enUS from './locales/en-US.json'
import jaJP from './locales/ja-JP.json'

// 支持的语言列表
export const supportedLocales = [
  {
    code: 'zh-CN',
    name: '简体中文',
    flag: '🇨🇳',
    dir: 'ltr'
  },
  {
    code: 'en-US',
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  {
    code: 'ja-JP',
    name: '日本語',
    flag: '🇯🇵',
    dir: 'ltr'
  }
]

// 获取默认语言
function getDefaultLocale() {
  // 1. 从localStorage获取用户设置
  const savedLocale = localStorage.getItem('user-locale')
  if (savedLocale && supportedLocales.find(l => l.code === savedLocale)) {
    return savedLocale
  }

  // 2. 从浏览器语言获取
  const browserLocale = navigator.language || navigator.languages[0]
  
  // 精确匹配
  if (supportedLocales.find(l => l.code === browserLocale)) {
    return browserLocale
  }
  
  // 语言代码匹配（如 en-GB -> en-US）
  const languageCode = browserLocale.split('-')[0]
  const matchedLocale = supportedLocales.find(l => l.code.startsWith(languageCode))
  if (matchedLocale) {
    return matchedLocale.code
  }

  // 3. 默认返回中文
  return 'zh-CN'
}

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  globalInjection: true,
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
    'ja-JP': jaJP
  },
  datetimeFormats: {
    'zh-CN': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'en-US': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'ja-JP': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    }
  },
  numberFormats: {
    'zh-CN': {
      currency: {
        style: 'currency',
        currency: 'CNY'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    },
    'en-US': {
      currency: {
        style: 'currency',
        currency: 'USD'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    },
    'ja-JP': {
      currency: {
        style: 'currency',
        currency: 'JPY'
      },
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    }
  }
})

// 设置语言
export function setLocale(locale) {
  if (!supportedLocales.find(l => l.code === locale)) {
    console.warn(`不支持的语言: ${locale}`)
    return
  }

  i18n.global.locale.value = locale
  localStorage.setItem('user-locale', locale)
  
  // 设置HTML lang属性
  document.documentElement.lang = locale
  
  // 设置文档方向
  const localeConfig = supportedLocales.find(l => l.code === locale)
  if (localeConfig) {
    document.documentElement.dir = localeConfig.dir
  }
}

// 获取当前语言
export function getCurrentLocale() {
  return i18n.global.locale.value
}

// 获取语言配置
export function getLocaleConfig(locale) {
  return supportedLocales.find(l => l.code === locale)
}

// 检查是否支持某种语言
export function isLocaleSupported(locale) {
  return supportedLocales.some(l => l.code === locale)
}

// 获取浏览器首选语言
export function getBrowserLocale() {
  const browserLocale = navigator.language || navigator.languages[0]
  return browserLocale
}

// 异步加载语言包（用于懒加载）
export async function loadLocaleMessages(locale) {
  if (i18n.global.availableLocales.includes(locale)) {
    return
  }

  try {
    const messages = await import(`./locales/${locale}.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
  } catch (error) {
    console.error(`加载语言包失败: ${locale}`, error)
  }
}

export default i18n
