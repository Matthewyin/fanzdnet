// 판젠동 명예 데이터 - 한국어
// 출처: 위키피디아 (2026년 1월 기준)

import type { HonorItem, HonorStats } from './types';

export const honorsKoKR: HonorItem[] = [
  {
    id: 1,
    medal: '🥇',
    name: '올림픽 남자 단식 챔피언',
    event: '2024 파리 올림픽',
    year: '2024',
    type: 'gold'
  },
  {
    id: 2,
    medal: '🥇',
    name: '올림픽 남자 단체전 챔피언',
    event: '2024 파리 올림픽',
    year: '2024',
    type: 'gold'
  },
  {
    id: 3,
    medal: '🥇',
    name: '세계선수권 남자 단식 챔피언',
    event: '2023 더반 세계선수권',
    year: '2023',
    type: 'gold'
  },
  {
    id: 4,
    medal: '🥇',
    name: '세계선수권 남자 단식 챔피언',
    event: '2021 휴스턴 세계선수권',
    year: '2021',
    type: 'gold'
  },
  {
    id: 5,
    medal: '🥇',
    name: '월드컵 남자 단식 4연패',
    event: '2016-2020',
    year: '2016-2020',
    type: 'gold'
  },
  {
    id: 6,
    medal: '🥇',
    name: '아시안게임 남자 단식 챔피언',
    event: '2018 자카르타 아시안게임',
    year: '2018',
    type: 'gold'
  }
];

export const statsKoKR: HonorStats = {
  worldTitles: {
    value: '20+',
    label: '세계 타이틀'
  },
  olympicGolds: {
    value: '3',
    label: '올림픽 금메달'
  },
  worldCupTitles: {
    value: '4',
    label: '월드컵 챔피언'
  },
  worldChampionships: {
    value: '2',
    label: '세계선수권 단식'
  }
};

