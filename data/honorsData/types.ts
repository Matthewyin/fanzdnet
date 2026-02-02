// 荣誉数据类型定义

export interface HonorItem {
  id: number;
  medal: string;
  name: string;
  event: string;
  year: string;
  type: 'gold' | 'silver' | 'bronze';
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HonorStats {
  worldTitles: StatItem;
  olympicGolds: StatItem;
  worldCupTitles: StatItem;
  worldChampionships: StatItem;
}

export interface HonorsData {
  honors: HonorItem[];
  stats: HonorStats;
}

