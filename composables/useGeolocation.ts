import type { SupportedLanguage } from '~/types/firestore'

interface GeolocationResult {
  language: SupportedLanguage
  country: string
  confidence: number
}

export const useGeolocation = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const result = ref<GeolocationResult | null>(null)

  // 国家到语言的映射
  const countryToLanguageMap: Record<string, SupportedLanguage> = {
    // 中文地区
    'CN': 'zh', // 中国
    'TW': 'zh', // 台湾
    'HK': 'zh', // 香港
    'MO': 'zh', // 澳门
    'SG': 'zh', // 新加坡（部分）
    
    // 英语地区
    'US': 'en', // 美国
    'GB': 'en', // 英国
    'CA': 'en', // 加拿大
    'AU': 'en', // 澳大利亚
    'NZ': 'en', // 新西兰
    'IE': 'en', // 爱尔兰
    'ZA': 'en', // 南非
    'IN': 'en', // 印度
    'PH': 'en', // 菲律宾
    'MY': 'en', // 马来西亚
    
    // 法语地区
    'FR': 'fr', // 法国
    'BE': 'fr', // 比利时（部分）
    'CH': 'fr', // 瑞士（部分）
    'LU': 'fr', // 卢森堡
    'MC': 'fr', // 摩纳哥
    'CA': 'fr', // 加拿大（魁北克）
    
    // 德语地区
    'DE': 'de', // 德国
    'AT': 'de', // 奥地利
    'LI': 'de', // 列支敦士登
    
    // 日语地区
    'JP': 'ja', // 日本
    
    // 韩语地区
    'KR': 'ko', // 韩国
    'KP': 'ko', // 朝鲜
    
    // 瑞典语地区
    'SE': 'sv', // 瑞典
    'FI': 'sv'  // 芬兰（部分）
  }

  // 通过浏览器语言检测
  const detectLanguageFromBrowser = (): GeolocationResult | null => {
    if (!process.client) return null

    try {
      const browserLanguage = navigator.language.toLowerCase()
      const languages = navigator.languages || [browserLanguage]

      // 语言代码映射
      const languageMap: Record<string, SupportedLanguage> = {
        'zh': 'zh',
        'zh-cn': 'zh',
        'zh-hans': 'zh',
        'zh-tw': 'zh',
        'zh-hk': 'zh',
        'en': 'en',
        'en-us': 'en',
        'en-gb': 'en',
        'en-ca': 'en',
        'en-au': 'en',
        'fr': 'fr',
        'fr-fr': 'fr',
        'fr-ca': 'fr',
        'fr-be': 'fr',
        'de': 'de',
        'de-de': 'de',
        'de-at': 'de',
        'de-ch': 'de',
        'ja': 'ja',
        'ja-jp': 'ja',
        'ko': 'ko',
        'ko-kr': 'ko',
        'sv': 'sv',
        'sv-se': 'sv'
      }

      // 检查完整匹配
      for (const lang of languages) {
        const normalizedLang = lang.toLowerCase()
        if (languageMap[normalizedLang]) {
          return {
            language: languageMap[normalizedLang],
            country: 'unknown',
            confidence: 0.8
          }
        }
      }

      // 检查语言前缀匹配
      for (const lang of languages) {
        const prefix = lang.toLowerCase().split('-')[0]
        if (languageMap[prefix]) {
          return {
            language: languageMap[prefix],
            country: 'unknown',
            confidence: 0.6
          }
        }
      }

      return null
    } catch (error) {
      console.error('浏览器语言检测失败:', error)
      return null
    }
  }

  // 通过 IP 地址检测地理位置
  const detectLocationFromIP = async (): Promise<GeolocationResult | null> => {
    try {
      // 使用免费的 IP 地理位置服务
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()

      if (data.country_code) {
        const language = countryToLanguageMap[data.country_code.toUpperCase()]
        if (language) {
          return {
            language,
            country: data.country_name || data.country_code,
            confidence: 0.7
          }
        }
      }

      return null
    } catch (error) {
      console.error('IP 地理位置检测失败:', error)
      return null
    }
  }

  // 通过浏览器地理位置 API 检测
  const detectLocationFromGPS = (): Promise<GeolocationResult | null> => {
    return new Promise((resolve) => {
      if (!process.client || !('geolocation' in navigator)) {
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            
            // 使用反向地理编码服务（这里使用免费服务）
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            )
            const data = await response.json()

            if (data.countryCode) {
              const language = countryToLanguageMap[data.countryCode.toUpperCase()]
              if (language) {
                resolve({
                  language,
                  country: data.countryName || data.countryCode,
                  confidence: 0.9
                })
                return
              }
            }

            resolve(null)
          } catch (error) {
            console.error('GPS 地理位置解析失败:', error)
            resolve(null)
          }
        },
        (error) => {
          console.log('GPS 地理位置获取失败:', error.message)
          resolve(null)
        },
        {
          timeout: 10000,
          enableHighAccuracy: false,
          maximumAge: 300000 // 5 分钟缓存
        }
      )
    })
  }

  // 综合检测语言
  const detectLanguage = async (): Promise<GeolocationResult | null> => {
    if (!process.client) return null

    isLoading.value = true
    error.value = null

    try {
      // 检查是否有用户保存的偏好
      const savedLanguage = localStorage.getItem('preferred-language') as SupportedLanguage
      if (savedLanguage && ['zh', 'en', 'fr', 'de', 'ja', 'ko', 'sv'].includes(savedLanguage)) {
        result.value = {
          language: savedLanguage,
          country: 'saved',
          confidence: 1.0
        }
        return result.value
      }

      // 1. 首先尝试浏览器语言检测（最快）
      const browserResult = detectLanguageFromBrowser()
      if (browserResult && browserResult.confidence >= 0.8) {
        result.value = browserResult
        return result.value
      }

      // 2. 尝试 GPS 地理位置检测（最准确但需要用户授权）
      const gpsResult = await detectLocationFromGPS()
      if (gpsResult && gpsResult.confidence >= 0.9) {
        result.value = gpsResult
        return result.value
      }

      // 3. 尝试 IP 地理位置检测（备选方案）
      const ipResult = await detectLocationFromIP()
      if (ipResult) {
        result.value = ipResult
        return result.value
      }

      // 4. 如果浏览器检测有结果，使用它
      if (browserResult) {
        result.value = browserResult
        return result.value
      }

      // 5. 默认返回中文
      result.value = {
        language: 'zh',
        country: 'default',
        confidence: 0.1
      }
      return result.value

    } catch (err) {
      error.value = err instanceof Error ? err.message : '语言检测失败'
      console.error('语言检测失败:', err)
      
      // 出错时返回默认语言
      result.value = {
        language: 'zh',
        country: 'error',
        confidence: 0.1
      }
      return result.value
    } finally {
      isLoading.value = false
    }
  }

  // 保存用户语言偏好
  const saveLanguagePreference = (language: SupportedLanguage) => {
    if (process.client) {
      localStorage.setItem('preferred-language', language)
    }
  }

  // 清除用户语言偏好
  const clearLanguagePreference = () => {
    if (process.client) {
      localStorage.removeItem('preferred-language')
    }
  }

  return {
    isLoading: readonly(isLoading),
    error: readonly(error),
    result: readonly(result),
    detectLanguage,
    saveLanguagePreference,
    clearLanguagePreference
  }
}
