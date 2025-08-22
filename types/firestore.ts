// Firestore 数据模型定义

export interface MultiLanguageText {
  zh: string
  en: string
  es: string
  fr: string
  de: string
  ja: string
  ko: string
  sv: string
}

export interface HeroItem {
  id: string
  url: string
  isOpening?: boolean
  openingText?: MultiLanguageText[]
  title?: MultiLanguageText
  subtitle?: MultiLanguageText
  quote?: MultiLanguageText
  description?: MultiLanguageText
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface TimelineEvent {
  id: string
  year: string
  title: MultiLanguageText
  description: MultiLanguageText
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface AIsuggestion {
  id: string
  suggestions: MultiLanguageText[]
  category?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ContentPage {
  id: string
  slug: string
  title: MultiLanguageText
  content: MultiLanguageText
  excerpt?: MultiLanguageText
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Firestore 集合名称常量
export const COLLECTIONS = {
  HERO_ITEMS: 'hero_items',
  TIMELINE_EVENTS: 'timeline_events',
  AI_SUGGESTIONS: 'ai_suggestions',
  CONTENT_PAGES: 'content_pages'
} as const

// 支持的语言列表
export const SUPPORTED_LANGUAGES = ['zh', 'en', 'es', 'fr', 'de', 'ja', 'ko', 'sv'] as const
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]

// 语言配置
export const LANGUAGE_CONFIG = {
  zh: { name: '中文', nativeName: '中文', code: 'zh-CN' },
  en: { name: 'English', nativeName: 'English', code: 'en-US' },
  es: { name: 'Spanish', nativeName: 'Español', code: 'es-ES' },
  fr: { name: 'French', nativeName: 'Français', code: 'fr-FR' },
  de: { name: 'German', nativeName: 'Deutsch', code: 'de-DE' },
  ja: { name: 'Japanese', nativeName: '日本語', code: 'ja-JP' },
  ko: { name: 'Korean', nativeName: '한국어', code: 'ko-KR' },
  sv: { name: 'Swedish', nativeName: 'Svenska', code: 'sv-SE' }
} as const
