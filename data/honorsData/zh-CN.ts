// 樊振东荣誉数据 - 中文
// 数据来源：维基百科（截至 2026 年 1 月）
// https://zh.wikipedia.org/wiki/樊振东

import type { HonorItem, HonorStats } from './types';

export const honorsZhCN: HonorItem[] = [
  {
    id: 1,
    medal: '🥇',
    name: '奥运会男单冠军',
    event: '2024 巴黎奥运会',
    year: '2024',
    type: 'gold'
  },
  {
    id: 2,
    medal: '🥇',
    name: '奥运会男团冠军',
    event: '2024 巴黎奥运会',
    year: '2024',
    type: 'gold'
  },
  {
    id: 3,
    medal: '🥇',
    name: '世锦赛男单冠军',
    event: '2023 德班世锦赛',
    year: '2023',
    type: 'gold'
  },
  {
    id: 4,
    medal: '🥇',
    name: '世锦赛男单冠军',
    event: '2021 休斯顿世锦赛',
    year: '2021',
    type: 'gold'
  },
  {
    id: 5,
    medal: '🥇',
    name: '世界杯男单四连冠',
    event: '2016-2020（萨尔布吕肯/巴黎/成都/威海）',
    year: '2016-2020',
    type: 'gold'
  },
  {
    id: 6,
    medal: '🥇',
    name: '亚运会男单冠军',
    event: '2018 雅加达亚运会',
    year: '2018',
    type: 'gold'
  }
];

// 统计数据 - 基于维基百科三大赛成绩
// 奥运会：3金1银、世锦赛：9金2银2铜、世界杯：8金1银
// 三大赛共计：20金4银2铜
export const statsZhCN: HonorStats = {
  worldTitles: {
    value: '20+',
    label: '世界冠军'
  },
  olympicGolds: {
    value: '3',
    label: '奥运金牌'
  },
  worldCupTitles: {
    value: '4',
    label: '世界杯男单冠军'
  },
  worldChampionships: {
    value: '2',
    label: '世锦赛男单冠军'
  }
};

