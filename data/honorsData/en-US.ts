// Fan Zhendong Honors Data - English
// Source: Wikipedia (as of January 2026)
// https://en.wikipedia.org/wiki/Fan_Zhendong

import type { HonorItem, HonorStats } from './types';

export const honorsEnUS: HonorItem[] = [
  {
    id: 1,
    medal: '🥇',
    name: 'Olympic Men\'s Singles Champion',
    event: '2024 Paris Olympics',
    year: '2024',
    type: 'gold'
  },
  {
    id: 2,
    medal: '🥇',
    name: 'Olympic Men\'s Team Champion',
    event: '2024 Paris Olympics',
    year: '2024',
    type: 'gold'
  },
  {
    id: 3,
    medal: '🥇',
    name: 'World Championship Men\'s Singles',
    event: '2023 Durban World Championships',
    year: '2023',
    type: 'gold'
  },
  {
    id: 4,
    medal: '🥇',
    name: 'World Championship Men\'s Singles',
    event: '2021 Houston World Championships',
    year: '2021',
    type: 'gold'
  },
  {
    id: 5,
    medal: '🥇',
    name: 'World Cup Men\'s Singles (4 consecutive)',
    event: '2016-2020 (Saarbrücken/Paris/Chengdu/Weihai)',
    year: '2016-2020',
    type: 'gold'
  },
  {
    id: 6,
    medal: '🥇',
    name: 'Asian Games Men\'s Singles Champion',
    event: '2018 Jakarta Asian Games',
    year: '2018',
    type: 'gold'
  }
];

export const statsEnUS: HonorStats = {
  worldTitles: {
    value: '20+',
    label: 'World Titles'
  },
  olympicGolds: {
    value: '3',
    label: 'Olympic Golds'
  },
  worldCupTitles: {
    value: '4',
    label: 'World Cup Singles Titles'
  },
  worldChampionships: {
    value: '2',
    label: 'World Championship Singles'
  }
};

