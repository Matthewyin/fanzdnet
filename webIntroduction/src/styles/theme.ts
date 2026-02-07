// 网站主题配置 - 与 fanzd.net 保持一致

export const colors = {
  // 主色调
  primary: {
    dark: '#0a0e27',
    medium: '#1a1f3a',
    light: '#1a3a8a',
  },
  // 金色强调
  gold: {
    DEFAULT: '#ffd700',
    light: '#ffec8b',
    dark: '#ffb700',
    accent: '#ff8c00',
  },
  // AI板块紫色
  purple: {
    DEFAULT: '#a855f7',
    light: '#c084fc',
    dark: '#7c3aed',
  },
  // 文字颜色
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    muted: 'rgba(255, 255, 255, 0.6)',
  },
  // 背景遮罩
  overlay: {
    light: 'rgba(10, 15, 26, 0.7)',
    medium: 'rgba(10, 15, 26, 0.85)',
    heavy: 'rgba(10, 15, 26, 0.95)',
  },
};

export const fonts = {
  // 标题字体
  heading: {
    family: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif',
    weight: {
      bold: 700,
      extrabold: 800,
    },
  },
  // 正文字体
  body: {
    family: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif',
    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
  },
};

export const animations = {
  // 弹簧动画配置
  spring: {
    damping: 12,
    stiffness: 100,
    mass: 0.8,
  },
  // 缓动函数
  easing: {
    easeOut: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // 持续时间 (帧)
  duration: {
    fast: 15,      // 0.5s
    normal: 30,    // 1s
    slow: 60,      // 2s
  },
};

// 场景时间配置 (帧数 @ 30fps)
export const sceneTiming = {
  scene1: { start: 0, duration: 300 },      // 0-10s
  scene2: { start: 300, duration: 150 },    // 10-15s
  scene3_home: { start: 450, duration: 210 },     // 15-22s
  scene3_updates: { start: 660, duration: 210 },  // 22-29s
  scene3_schedule: { start: 870, duration: 270 }, // 29-38s
  scene3_timeline: { start: 1140, duration: 210 }, // 38-45s
  scene4_ai: { start: 1350, duration: 150 },      // 45-50s
  scene5_data: { start: 1500, duration: 150 },    // 50-55s
  scene6_cta: { start: 1650, duration: 150 },     // 55-60s
};
