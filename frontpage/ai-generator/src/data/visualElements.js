/**
 * 视觉元素库 - 樊振东主题元素
 */

// 樊振东相关图标
export const fanZhendongIcons = [
  {
    id: 'fzd-portrait',
    name: '樊振东头像',
    type: 'icon',
    category: 'character',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="20" fill="#FFE4B5" stroke="#8B4513" stroke-width="2"/>
      <circle cx="45" cy="30" r="2" fill="#000"/>
      <circle cx="55" cy="30" r="2" fill="#000"/>
      <path d="M45 40 Q50 45 55 40" stroke="#000" stroke-width="1.5" fill="none"/>
      <rect x="40" y="55" width="20" height="30" fill="#FF0000" rx="5"/>
      <text x="50" y="75" text-anchor="middle" font-size="8" fill="white">FZD</text>
    </svg>`,
    defaultSize: { width: 80, height: 80 },
    description: '樊振东卡通头像'
  },
  {
    id: 'fzd-silhouette',
    name: '樊振东剪影',
    type: 'icon',
    category: 'character',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 20 Q50 10 70 20 L75 40 Q70 60 50 65 Q30 60 25 40 Z" fill="#000"/>
      <rect x="45" y="65" width="10" height="25" fill="#000"/>
      <ellipse cx="40" cy="45" rx="15" ry="8" fill="#000"/>
    </svg>`,
    defaultSize: { width: 60, height: 80 },
    description: '樊振东打球剪影'
  }
]

// 乒乓球相关元素
export const tableTennisElements = [
  {
    id: 'ping-pong-ball',
    name: '乒乓球',
    type: 'icon',
    category: 'sports',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="white" stroke="#FF6600" stroke-width="3"/>
      <path d="M20 50 Q50 20 80 50 Q50 80 20 50" stroke="#FF6600" stroke-width="2" fill="none"/>
    </svg>`,
    defaultSize: { width: 50, height: 50 },
    description: '乒乓球图标'
  },
  {
    id: 'paddle',
    name: '乒乓球拍',
    type: 'icon',
    category: 'sports',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="35" rx="25" ry="30" fill="#8B4513"/>
      <ellipse cx="50" cy="35" rx="20" ry="25" fill="#FF0000"/>
      <rect x="47" y="65" width="6" height="25" fill="#654321"/>
      <rect x="45" y="88" width="10" height="8" fill="#8B4513"/>
    </svg>`,
    defaultSize: { width: 40, height: 80 },
    description: '乒乓球拍'
  },
  {
    id: 'table-tennis-table',
    name: '乒乓球台',
    type: 'icon',
    category: 'sports',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="40" width="80" height="30" fill="#0066CC"/>
      <line x1="50" y1="40" x2="50" y2="70" stroke="white" stroke-width="2"/>
      <rect x="10" y="35" width="80" height="5" fill="#003366"/>
      <rect x="15" y="70" width="4" height="20" fill="#666"/>
      <rect x="81" y="70" width="4" height="20" fill="#666"/>
    </svg>`,
    defaultSize: { width: 100, height: 60 },
    description: '乒乓球台'
  }
]

// 奖杯和荣誉元素
export const trophyElements = [
  {
    id: 'gold-trophy',
    name: '金色奖杯',
    type: 'icon',
    category: 'trophy',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="25" rx="15" ry="10" fill="#FFD700"/>
      <rect x="40" y="25" width="20" height="25" fill="#FFD700"/>
      <path d="M35 35 Q25 35 25 45 Q25 55 35 55" stroke="#FFD700" stroke-width="3" fill="none"/>
      <path d="M65 35 Q75 35 75 45 Q75 55 65 55" stroke="#FFD700" stroke-width="3" fill="none"/>
      <rect x="45" y="50" width="10" height="15" fill="#B8860B"/>
      <rect x="40" y="65" width="20" height="8" fill="#8B4513"/>
      <text x="50" y="40" text-anchor="middle" font-size="8" fill="#B8860B">1</text>
    </svg>`,
    defaultSize: { width: 60, height: 80 },
    description: '冠军奖杯'
  },
  {
    id: 'medal',
    name: '金牌',
    type: 'icon',
    category: 'trophy',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="60" r="25" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
      <circle cx="50" cy="60" r="18" fill="#FFA500"/>
      <text x="50" y="67" text-anchor="middle" font-size="12" fill="#B8860B" font-weight="bold">1</text>
      <rect x="35" y="15" width="8" height="30" fill="#FF0000"/>
      <rect x="57" y="15" width="8" height="30" fill="#FF0000"/>
    </svg>`,
    defaultSize: { width: 50, height: 70 },
    description: '金牌'
  }
]

// 中国元素
export const chineseElements = [
  {
    id: 'china-flag',
    name: '五星红旗',
    type: 'icon',
    category: 'national',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="50" fill="#FF0000"/>
      <polygon points="25,30 27,36 33,36 28,40 30,46 25,42 20,46 22,40 17,36 23,36" fill="#FFFF00"/>
      <polygon points="40,25 41,27 43,27 42,28 42,30 40,29 38,30 38,28 37,27 39,27" fill="#FFFF00"/>
      <polygon points="40,35 41,37 43,37 42,38 42,40 40,39 38,40 38,38 37,37 39,37" fill="#FFFF00"/>
      <polygon points="40,45 41,47 43,47 42,48 42,50 40,49 38,50 38,48 37,47 39,47" fill="#FFFF00"/>
      <polygon points="40,55 41,57 43,57 42,58 42,60 40,59 38,60 38,58 37,57 39,57" fill="#FFFF00"/>
    </svg>`,
    defaultSize: { width: 80, height: 50 },
    description: '中国国旗'
  },
  {
    id: 'chinese-knot',
    name: '中国结',
    type: 'icon',
    category: 'national',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 20 Q30 30 30 50 Q30 70 50 80 Q70 70 70 50 Q70 30 50 20 Z" fill="none" stroke="#FF0000" stroke-width="4"/>
      <path d="M35 35 Q50 25 65 35 Q55 50 65 65 Q50 75 35 65 Q45 50 35 35 Z" fill="none" stroke="#FF0000" stroke-width="3"/>
      <circle cx="50" cy="50" r="8" fill="#FFD700"/>
    </svg>`,
    defaultSize: { width: 60, height: 80 },
    description: '中国结装饰'
  }
]

// 装饰性元素
export const decorativeElements = [
  {
    id: 'star',
    name: '五角星',
    type: 'decoration',
    category: 'shape',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 61,35 85,35 67,53 73,78 50,65 27,78 33,53 15,35 39,35" fill="#FFD700" stroke="#FFA500" stroke-width="2"/>
    </svg>`,
    defaultSize: { width: 40, height: 40 },
    description: '五角星'
  },
  {
    id: 'crown',
    name: '皇冠',
    type: 'decoration',
    category: 'royal',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 60 L30 40 L40 50 L50 30 L60 50 L70 40 L80 60 L75 70 L25 70 Z" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
      <circle cx="30" cy="40" r="4" fill="#FF0000"/>
      <circle cx="50" cy="30" r="5" fill="#FF0000"/>
      <circle cx="70" cy="40" r="4" fill="#FF0000"/>
    </svg>`,
    defaultSize: { width: 60, height: 50 },
    description: '王者皇冠'
  },
  {
    id: 'lightning',
    name: '闪电',
    type: 'decoration',
    category: 'effect',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 10 L30 45 L50 45 L35 90 L70 35 L50 35 L65 10 Z" fill="#FFFF00" stroke="#FFA500" stroke-width="2"/>
    </svg>`,
    defaultSize: { width: 40, height: 80 },
    description: '闪电效果'
  },
  {
    id: 'ribbon',
    name: '丝带',
    type: 'decoration',
    category: 'ornament',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 40 Q50 20 90 40 Q50 60 10 40" fill="#FF0000"/>
      <path d="M10 50 Q50 30 90 50 Q50 70 10 50" fill="#CC0000"/>
      <text x="50" y="50" text-anchor="middle" font-size="12" fill="white" font-weight="bold">冠军</text>
    </svg>`,
    defaultSize: { width: 100, height: 40 },
    description: '冠军丝带'
  }
]

// 背景纹理和图案
export const backgroundPatterns = [
  {
    id: 'sports-pattern',
    name: '体育图案',
    type: 'pattern',
    category: 'background',
    pattern: `<pattern id="sportsPattern" patternUnits="userSpaceOnUse" width="50" height="50">
      <rect width="50" height="50" fill="#f0f0f0"/>
      <circle cx="25" cy="25" r="8" fill="none" stroke="#ddd" stroke-width="1"/>
      <rect x="20" y="20" width="10" height="10" fill="none" stroke="#ddd" stroke-width="1"/>
    </pattern>`,
    description: '体育主题背景图案'
  },
  {
    id: 'victory-pattern',
    name: '胜利图案',
    type: 'pattern',
    category: 'background',
    pattern: `<pattern id="victoryPattern" patternUnits="userSpaceOnUse" width="40" height="40">
      <rect width="40" height="40" fill="#fff8dc"/>
      <polygon points="20,5 23,15 33,15 26,22 28,32 20,27 12,32 14,22 7,15 17,15" fill="#ffd700" opacity="0.3"/>
    </pattern>`,
    description: '胜利主题背景图案'
  }
]

// 文字气泡样式
export const speechBubbles = [
  {
    id: 'round-bubble',
    name: '圆形气泡',
    type: 'bubble',
    category: 'speech',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="40" rx="40" ry="25" fill="white" stroke="#333" stroke-width="2"/>
      <polygon points="35,60 45,75 55,60" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`,
    textArea: { x: 20, y: 25, width: 60, height: 30 },
    description: '对话气泡'
  },
  {
    id: 'thought-bubble',
    name: '思考气泡',
    type: 'bubble',
    category: 'thought',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="35" rx="35" ry="20" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="30" cy="60" r="6" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="20" cy="75" r="4" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="15" cy="85" r="2" fill="white" stroke="#333" stroke-width="2"/>
    </svg>`,
    textArea: { x: 20, y: 20, width: 60, height: 30 },
    description: '思考气泡'
  },
  {
    id: 'shout-bubble',
    name: '呐喊气泡',
    type: 'bubble',
    category: 'exclamation',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 30 L80 30 L85 40 L80 50 L20 50 L15 40 Z" fill="white" stroke="#333" stroke-width="2"/>
      <polygon points="25,50 35,70 45,50" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M25 35 L30 25 L35 35" stroke="#333" stroke-width="2" fill="none"/>
      <path d="M45 35 L50 25 L55 35" stroke="#333" stroke-width="2" fill="none"/>
      <path d="M65 35 L70 25 L75 35" stroke="#333" stroke-width="2" fill="none"/>
    </svg>`,
    textArea: { x: 20, y: 30, width: 60, height: 20 },
    description: '呐喊气泡'
  }
]

// 场景背景
export const sceneBackgrounds = [
  {
    id: 'stadium',
    name: '比赛场馆',
    type: 'scene',
    category: 'venue',
    svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="100" fill="url(#stadiumGradient)"/>
      <defs>
        <linearGradient id="stadiumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB"/>
          <stop offset="100%" style="stop-color:#4682B4"/>
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="80" rx="80" ry="15" fill="#228B22"/>
      <rect x="50" y="65" width="100" height="15" fill="#0066CC"/>
      <line x1="100" y1="65" x2="100" y2="80" stroke="white" stroke-width="2"/>
      <rect x="20" y="20" width="160" height="40" fill="none" stroke="#666" stroke-width="2"/>
      <rect x="30" y="25" width="20" height="30" fill="#FFD700"/>
      <rect x="150" y="25" width="20" height="30" fill="#FFD700"/>
    </svg>`,
    description: '乒乓球比赛场馆'
  },
  {
    id: 'podium',
    name: '颁奖台',
    type: 'scene',
    category: 'ceremony',
    svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="100" fill="url(#podiumGradient)"/>
      <defs>
        <linearGradient id="podiumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD700"/>
          <stop offset="100%" style="stop-color:#FFA500"/>
        </linearGradient>
      </defs>
      <rect x="70" y="50" width="60" height="40" fill="#FFD700"/>
      <rect x="20" y="60" width="50" height="30" fill="#C0C0C0"/>
      <rect x="130" y="70" width="50" height="20" fill="#CD7F32"/>
      <text x="100" y="75" text-anchor="middle" font-size="16" fill="white" font-weight="bold">1</text>
      <text x="45" y="80" text-anchor="middle" font-size="14" fill="white" font-weight="bold">2</text>
      <text x="155" y="85" text-anchor="middle" font-size="12" fill="white" font-weight="bold">3</text>
    </svg>`,
    description: '冠军颁奖台'
  }
]

// 光效和粒子效果
export const effectElements = [
  {
    id: 'glow-effect',
    name: '光晕效果',
    type: 'effect',
    category: 'light',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glowGradient">
          <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.8"/>
          <stop offset="50%" style="stop-color:#FFA500;stop-opacity:0.4"/>
          <stop offset="100%" style="stop-color:#FF8C00;stop-opacity:0"/>
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#glowGradient)"/>
    </svg>`,
    description: '金色光晕效果'
  },
  {
    id: 'sparkle-effect',
    name: '闪烁效果',
    type: 'effect',
    category: 'particle',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFD700">
        <polygon points="20,20 22,25 27,25 23,28 25,33 20,30 15,33 17,28 13,25 18,25"/>
        <polygon points="70,15 71,18 74,18 72,20 73,23 70,21 67,23 68,20 66,18 69,18"/>
        <polygon points="80,60 82,65 87,65 83,68 85,73 80,70 75,73 77,68 73,65 78,65"/>
        <polygon points="30,70 31,73 34,73 32,75 33,78 30,76 27,78 28,75 26,73 29,73"/>
        <polygon points="60,80 61,83 64,83 62,85 63,88 60,86 57,88 58,85 56,83 59,83"/>
      </g>
    </svg>`,
    description: '星光闪烁效果'
  }
]

// 导出所有元素
export const allVisualElements = {
  fanZhendongIcons,
  tableTennisElements,
  trophyElements,
  chineseElements,
  decorativeElements,
  backgroundPatterns,
  speechBubbles,
  sceneBackgrounds,
  effectElements
}

// 根据类别获取元素
export const getElementsByCategory = (category) => {
  const elements = []
  Object.values(allVisualElements).forEach(elementGroup => {
    elements.push(...elementGroup.filter(el => el.category === category))
  })
  return elements
}

// 根据类型获取元素
export const getElementsByType = (type) => {
  const elements = []
  Object.values(allVisualElements).forEach(elementGroup => {
    elements.push(...elementGroup.filter(el => el.type === type))
  })
  return elements
}

// 获取推荐元素组合
export const getRecommendedCombinations = (contentType) => {
  const combinations = {
    banner: [
      {
        name: '冠军主题',
        elements: ['gold-trophy', 'china-flag', 'crown', 'glow-effect'],
        description: '适合庆祝夺冠的横幅'
      },
      {
        name: '比赛主题',
        elements: ['fzd-portrait', 'paddle', 'ping-pong-ball', 'lightning'],
        description: '适合比赛期间的应援横幅'
      }
    ],
    slogan: [
      {
        name: '激励风格',
        elements: ['round-bubble', 'star', 'lightning'],
        description: '激励性口号的视觉呈现'
      }
    ],
    emoji: [
      {
        name: '胜利表情',
        elements: ['fzd-portrait', 'medal', 'sparkle-effect'],
        description: '庆祝胜利的表情包'
      }
    ]
  }
  
  return combinations[contentType] || []
}
