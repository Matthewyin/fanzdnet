// 多语言 Hero 数据索引
import { heroDataZh } from './zh-CN'
import { heroDataEn } from './en-US'
import { heroDataEs } from './es-ES'
import { heroDataFr } from './fr-FR'
import { heroDataDe } from './de-DE'
import { heroDataJa } from './ja-JP'
import { heroDataKo } from './ko-KR'
import { heroDataSv } from './sv-SE'
import type { SupportedLanguage } from '~/types/firestore'

export const heroDataMap = {
  zh: heroDataZh,
  en: heroDataEn,
  es: heroDataEs,
  fr: heroDataFr,
  de: heroDataDe,
  ja: heroDataJa,
  ko: heroDataKo,
  sv: heroDataSv
} as const

export function getHeroData(language: SupportedLanguage = 'zh') {
  return heroDataMap[language] || heroDataMap.zh
}

// 导出默认中文数据以保持向后兼容
export const heroImages = heroDataZh
export { heroDataZh, heroDataEn, heroDataEs, heroDataFr, heroDataDe, heroDataJa, heroDataKo, heroDataSv }
