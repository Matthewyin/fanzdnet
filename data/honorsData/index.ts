// 荣誉数据索引文件
// 提供多语言荣誉数据的统一导出

import { honorsZhCN, statsZhCN } from './zh-CN';
import { honorsEnUS, statsEnUS } from './en-US';
import { honorsJaJP, statsJaJP } from './ja-JP';
import { honorsKoKR, statsKoKR } from './ko-KR';
import { honorsDeDE, statsDeDE } from './de-DE';
import { honorsFrFR, statsFrFR } from './fr-FR';
import { honorsEsES, statsEsES } from './es-ES';
import { honorsSvSE, statsSvSE } from './sv-SE';
import type { HonorItem, HonorStats, HonorsData } from './types';

export type { HonorItem, HonorStats, HonorsData };

// 按语言代码组织的荣誉数据
export const honorsDataByLocale: Record<string, HonorsData> = {
  'zh-CN': { honors: honorsZhCN, stats: statsZhCN },
  'en-US': { honors: honorsEnUS, stats: statsEnUS },
  'ja-JP': { honors: honorsJaJP, stats: statsJaJP },
  'ko-KR': { honors: honorsKoKR, stats: statsKoKR },
  'de-DE': { honors: honorsDeDE, stats: statsDeDE },
  'fr-FR': { honors: honorsFrFR, stats: statsFrFR },
  'es-ES': { honors: honorsEsES, stats: statsEsES },
  'sv-SE': { honors: honorsSvSE, stats: statsSvSE }
};

// 获取指定语言的荣誉数据，回退到中文
export function getHonorsData(locale: string): HonorsData {
  return honorsDataByLocale[locale] || honorsDataByLocale['zh-CN'];
}

// 默认导出中文数据
export default honorsDataByLocale['zh-CN'];

