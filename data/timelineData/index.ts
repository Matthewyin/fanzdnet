// 多语言时间线数据索引
import { timelineDataZh } from './zh-CN'
import { timelineDataEn } from './en-US'
import type { SupportedLanguage } from '~/types/firestore'

// 临时使用英文数据作为其他语言的占位符，后续可以完善翻译
export const timelineDataMap = {
  zh: timelineDataZh,
  en: timelineDataEn,
  fr: timelineDataEn, // 临时使用英文
  de: timelineDataEn, // 临时使用英文
  ja: timelineDataEn, // 临时使用英文
  ko: timelineDataEn, // 临时使用英文
  sv: timelineDataEn  // 临时使用英文
} as const

export function getTimelineData(language: SupportedLanguage = 'zh') {
  return timelineDataMap[language] || timelineDataMap.zh
}

// 导出默认中文数据以保持向后兼容
export const timelineData = timelineDataZh
export { timelineDataZh, timelineDataEn }
