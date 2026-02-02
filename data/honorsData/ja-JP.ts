// 樊振東の栄誉データ - 日本語
// 出典：Wikipedia（2026年1月時点）

import type { HonorItem, HonorStats } from './types';

export const honorsJaJP: HonorItem[] = [
  {
    id: 1,
    medal: '🥇',
    name: 'オリンピック男子シングルス優勝',
    event: '2024 パリオリンピック',
    year: '2024',
    type: 'gold'
  },
  {
    id: 2,
    medal: '🥇',
    name: 'オリンピック男子団体優勝',
    event: '2024 パリオリンピック',
    year: '2024',
    type: 'gold'
  },
  {
    id: 3,
    medal: '🥇',
    name: '世界選手権男子シングルス優勝',
    event: '2023 ダーバン世界選手権',
    year: '2023',
    type: 'gold'
  },
  {
    id: 4,
    medal: '🥇',
    name: '世界選手権男子シングルス優勝',
    event: '2021 ヒューストン世界選手権',
    year: '2021',
    type: 'gold'
  },
  {
    id: 5,
    medal: '🥇',
    name: 'ワールドカップ男子シングルス4連覇',
    event: '2016-2020',
    year: '2016-2020',
    type: 'gold'
  },
  {
    id: 6,
    medal: '🥇',
    name: 'アジア競技大会男子シングルス優勝',
    event: '2018 ジャカルタアジア競技大会',
    year: '2018',
    type: 'gold'
  }
];

export const statsJaJP: HonorStats = {
  worldTitles: {
    value: '20+',
    label: '世界タイトル'
  },
  olympicGolds: {
    value: '3',
    label: 'オリンピック金メダル'
  },
  worldCupTitles: {
    value: '4',
    label: 'ワールドカップ優勝'
  },
  worldChampionships: {
    value: '2',
    label: '世界選手権シングルス'
  }
};

