// Données des honneurs de Fan Zhendong - Français
// Source: Wikipédia (janvier 2026)

import type { HonorItem, HonorStats } from './types';

export const honorsFrFR: HonorItem[] = [
  {
    id: 1,
    medal: '🥇',
    name: 'Champion olympique simple messieurs',
    event: '2024 Jeux olympiques de Paris',
    year: '2024',
    type: 'gold'
  },
  {
    id: 2,
    medal: '🥇',
    name: 'Champion olympique par équipes',
    event: '2024 Jeux olympiques de Paris',
    year: '2024',
    type: 'gold'
  },
  {
    id: 3,
    medal: '🥇',
    name: 'Champion du monde simple messieurs',
    event: '2023 Championnats du monde de Durban',
    year: '2023',
    type: 'gold'
  },
  {
    id: 4,
    medal: '🥇',
    name: 'Champion du monde simple messieurs',
    event: '2021 Championnats du monde de Houston',
    year: '2021',
    type: 'gold'
  },
  {
    id: 5,
    medal: '🥇',
    name: 'Coupe du monde simple (4 consécutives)',
    event: '2016-2020',
    year: '2016-2020',
    type: 'gold'
  },
  {
    id: 6,
    medal: '🥇',
    name: 'Champion des Jeux asiatiques',
    event: '2018 Jeux asiatiques de Jakarta',
    year: '2018',
    type: 'gold'
  }
];

export const statsFrFR: HonorStats = {
  worldTitles: {
    value: '20+',
    label: 'Titres mondiaux'
  },
  olympicGolds: {
    value: '3',
    label: 'Médailles d\'or olympiques'
  },
  worldCupTitles: {
    value: '4',
    label: 'Coupes du monde'
  },
  worldChampionships: {
    value: '2',
    label: 'Championnats du monde simple'
  }
};

