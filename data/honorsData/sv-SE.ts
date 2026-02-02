// Fan Zhendong Hedersdata - Svenska
// Källa: Wikipedia (januari 2026)

import type { HonorItem, HonorStats } from './types';

export const honorsSvSE: HonorItem[] = [
  {
    id: 1,
    medal: '🥇',
    name: 'Olympisk mästare herrsingel',
    event: '2024 Paris olympiska spel',
    year: '2024',
    type: 'gold'
  },
  {
    id: 2,
    medal: '🥇',
    name: 'Olympisk mästare herrlag',
    event: '2024 Paris olympiska spel',
    year: '2024',
    type: 'gold'
  },
  {
    id: 3,
    medal: '🥇',
    name: 'Världsmästare herrsingel',
    event: '2023 Durban VM',
    year: '2023',
    type: 'gold'
  },
  {
    id: 4,
    medal: '🥇',
    name: 'Världsmästare herrsingel',
    event: '2021 Houston VM',
    year: '2021',
    type: 'gold'
  },
  {
    id: 5,
    medal: '🥇',
    name: 'Världscupen herrsingel (4 i rad)',
    event: '2016-2020',
    year: '2016-2020',
    type: 'gold'
  },
  {
    id: 6,
    medal: '🥇',
    name: 'Asiatiska spelen herrsingel',
    event: '2018 Jakarta Asiatiska spelen',
    year: '2018',
    type: 'gold'
  }
];

export const statsSvSE: HonorStats = {
  worldTitles: {
    value: '20+',
    label: 'Världstitlar'
  },
  olympicGolds: {
    value: '3',
    label: 'Olympiska guld'
  },
  worldCupTitles: {
    value: '4',
    label: 'Världscuptitlar'
  },
  worldChampionships: {
    value: '2',
    label: 'VM-singeltitlar'
  }
};

