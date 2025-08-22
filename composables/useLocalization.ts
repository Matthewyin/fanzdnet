import type { SupportedLanguage } from '~/types/firestore'

export const useLocalization = () => {
  const currentLanguage = ref<SupportedLanguage>('zh')

  // 语言配置
  const localeConfig = {
    zh: {
      code: 'zh-CN',
      name: '中文',
      dateFormat: 'YYYY年MM月DD日',
      timeFormat: 'HH:mm',
      currency: 'CNY',
      currencySymbol: '¥',
      numberFormat: {
        decimal: '.',
        thousands: ','
      }
    },
    en: {
      code: 'en-US',
      name: 'English',
      dateFormat: 'MMMM DD, YYYY',
      timeFormat: 'h:mm A',
      currency: 'USD',
      currencySymbol: '$',
      numberFormat: {
        decimal: '.',
        thousands: ','
      }
    },
    fr: {
      code: 'fr-FR',
      name: 'Français',
      dateFormat: 'DD MMMM YYYY',
      timeFormat: 'HH:mm',
      currency: 'EUR',
      currencySymbol: '€',
      numberFormat: {
        decimal: ',',
        thousands: ' '
      }
    },
    de: {
      code: 'de-DE',
      name: 'Deutsch',
      dateFormat: 'DD. MMMM YYYY',
      timeFormat: 'HH:mm',
      currency: 'EUR',
      currencySymbol: '€',
      numberFormat: {
        decimal: ',',
        thousands: '.'
      }
    },
    ja: {
      code: 'ja-JP',
      name: '日本語',
      dateFormat: 'YYYY年MM月DD日',
      timeFormat: 'HH:mm',
      currency: 'JPY',
      currencySymbol: '¥',
      numberFormat: {
        decimal: '.',
        thousands: ','
      }
    },
    ko: {
      code: 'ko-KR',
      name: '한국어',
      dateFormat: 'YYYY년 MM월 DD일',
      timeFormat: 'HH:mm',
      currency: 'KRW',
      currencySymbol: '₩',
      numberFormat: {
        decimal: '.',
        thousands: ','
      }
    },
    sv: {
      code: 'sv-SE',
      name: 'Svenska',
      dateFormat: 'DD MMMM YYYY',
      timeFormat: 'HH:mm',
      currency: 'SEK',
      currencySymbol: 'kr',
      numberFormat: {
        decimal: ',',
        thousands: ' '
      }
    }
  }

  // 获取当前语言配置
  const getCurrentLocaleConfig = () => {
    return localeConfig[currentLanguage.value] || localeConfig.zh
  }

  // 格式化日期
  const formatDate = (date: Date | string, format?: string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const config = getCurrentLocaleConfig()
    const targetFormat = format || config.dateFormat

    if (!process.client) {
      // 服务端渲染时的简单格式化
      return dateObj.toLocaleDateString(config.code)
    }

    try {
      // 使用 Intl.DateTimeFormat 进行本地化格式化
      const formatter = new Intl.DateTimeFormat(config.code, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return formatter.format(dateObj)
    } catch (error) {
      console.error('日期格式化失败:', error)
      return dateObj.toLocaleDateString()
    }
  }

  // 格式化时间
  const formatTime = (date: Date | string, format?: string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const config = getCurrentLocaleConfig()

    if (!process.client) {
      return dateObj.toLocaleTimeString(config.code)
    }

    try {
      const formatter = new Intl.DateTimeFormat(config.code, {
        hour: '2-digit',
        minute: '2-digit'
      })
      return formatter.format(dateObj)
    } catch (error) {
      console.error('时间格式化失败:', error)
      return dateObj.toLocaleTimeString()
    }
  }

  // 格式化数字
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
    const config = getCurrentLocaleConfig()

    if (!process.client) {
      return number.toLocaleString()
    }

    try {
      const formatter = new Intl.NumberFormat(config.code, options)
      return formatter.format(number)
    } catch (error) {
      console.error('数字格式化失败:', error)
      return number.toString()
    }
  }

  // 格式化货币
  const formatCurrency = (amount: number, currency?: string): string => {
    const config = getCurrentLocaleConfig()
    const targetCurrency = currency || config.currency

    if (!process.client) {
      return `${config.currencySymbol}${amount}`
    }

    try {
      const formatter = new Intl.NumberFormat(config.code, {
        style: 'currency',
        currency: targetCurrency
      })
      return formatter.format(amount)
    } catch (error) {
      console.error('货币格式化失败:', error)
      return `${config.currencySymbol}${amount}`
    }
  }

  // 格式化相对时间
  const formatRelativeTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
    const config = getCurrentLocaleConfig()

    if (!process.client) {
      return dateObj.toLocaleDateString(config.code)
    }

    try {
      const rtf = new Intl.RelativeTimeFormat(config.code, { numeric: 'auto' })

      if (diffInSeconds < 60) {
        return rtf.format(-diffInSeconds, 'second')
      } else if (diffInSeconds < 3600) {
        return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
      } else if (diffInSeconds < 86400) {
        return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
      } else if (diffInSeconds < 2592000) {
        return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
      } else if (diffInSeconds < 31536000) {
        return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
      } else {
        return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
      }
    } catch (error) {
      console.error('相对时间格式化失败:', error)
      return formatDate(dateObj)
    }
  }

  // 获取本地化的文本方向
  const getTextDirection = (): 'ltr' | 'rtl' => {
    // 目前支持的语言都是从左到右
    return 'ltr'
  }

  // 获取本地化的字体栈
  const getFontFamily = (): string => {
    const fontMap = {
      zh: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif',
      ja: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "Meiryo", sans-serif',
      ko: '"Apple SD Gothic Neo", "Malgun Gothic", "Nanum Gothic", sans-serif',
      en: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fr: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      de: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      sv: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }

    return fontMap[currentLanguage.value] || fontMap.en
  }

  // 设置当前语言
  const setLanguage = (language: SupportedLanguage) => {
    currentLanguage.value = language
    
    // 更新 HTML lang 属性
    if (process.client) {
      document.documentElement.lang = localeConfig[language].code
      document.documentElement.dir = getTextDirection()
    }
  }

  // 获取语言显示名称
  const getLanguageName = (language: SupportedLanguage, inCurrentLanguage = false): string => {
    if (inCurrentLanguage) {
      return localeConfig[currentLanguage.value].name
    }
    return localeConfig[language].name
  }

  return {
    currentLanguage: readonly(currentLanguage),
    getCurrentLocaleConfig,
    formatDate,
    formatTime,
    formatNumber,
    formatCurrency,
    formatRelativeTime,
    getTextDirection,
    getFontFamily,
    setLanguage,
    getLanguageName
  }
}
