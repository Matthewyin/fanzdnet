// Fan Zhendong Ehrendaten - Deutsch
// Quelle: Wikipedia (Stand Januar 2026)

import type { HonorItem, HonorStats } from './types';

export const honorsDeDE: HonorItem[] = [
  {
    id: 1,
    medal: '🥇',
    name: 'Olympiasieger Herren Einzel',
    event: '2024 Paris Olympische Spiele',
    year: '2024',
    type: 'gold'
  },
  {
    id: 2,
    medal: '🥇',
    name: 'Olympiasieger Herren Mannschaft',
    event: '2024 Paris Olympische Spiele',
    year: '2024',
    type: 'gold'
  },
  {
    id: 3,
    medal: '🥇',
    name: 'Weltmeister Herren Einzel',
    event: '2023 Durban Weltmeisterschaft',
    year: '2023',
    type: 'gold'
  },
  {
    id: 4,
    medal: '🥇',
    name: 'Weltmeister Herren Einzel',
    event: '2021 Houston Weltmeisterschaft',
    year: '2021',
    type: 'gold'
  },
  {
    id: 5,
    medal: '🥇',
    name: 'Weltcup Herren Einzel (4 Siege)',
    event: '2016-2020',
    year: '2016-2020',
    type: 'gold'
  },
  {
    id: 6,
    medal: '🥇',
    name: 'Asienspiele Herren Einzel',
    event: '2018 Jakarta Asienspiele',
    year: '2018',
    type: 'gold'
  }
];

export const statsDeDE: HonorStats = {
  worldTitles: {
    value: '20+',
    label: 'Welttitel'
  },
  olympicGolds: {
    value: '3',
    label: 'Olympische Goldmedaillen'
  },
  worldCupTitles: {
    value: '4',
    label: 'Weltcup-Titel'
  },
  worldChampionships: {
    value: '2',
    label: 'WM-Einzel-Titel'
  }
};

