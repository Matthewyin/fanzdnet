/**
 * 横幅模板数据
 */

export const bannerTemplates = [
  {
    id: 'classic-red',
    name: '经典红色',
    category: 'classic',
    description: '传统红色背景，金色文字，庄重大气',
    preview: '/templates/classic-red.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#DC143C',
      backgroundGradient: 'linear-gradient(135deg, #DC143C 0%, #B22222 100%)',
      textColor: '#FFD700',
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      border: {
        enabled: true,
        width: 4,
        color: '#FFD700',
        style: 'solid'
      },
      effects: {
        shadow: true,
        glow: false
      }
    },
    elements: [
      {
        type: 'background',
        style: 'gradient'
      },
      {
        type: 'text',
        position: 'center',
        style: 'main'
      },
      {
        type: 'border',
        style: 'golden'
      }
    ]
  },
  {
    id: 'modern-blue',
    name: '现代蓝色',
    category: 'modern',
    description: '现代蓝色渐变，白色文字，简约时尚',
    preview: '/templates/modern-blue.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#1E90FF',
      backgroundGradient: 'linear-gradient(45deg, #1E90FF 0%, #00BFFF 100%)',
      textColor: '#FFFFFF',
      fontSize: 44,
      fontWeight: '600',
      textAlign: 'center',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
      border: {
        enabled: false
      },
      effects: {
        shadow: true,
        glow: true,
        glowColor: '#00BFFF'
      }
    },
    elements: [
      {
        type: 'background',
        style: 'gradient'
      },
      {
        type: 'text',
        position: 'center',
        style: 'modern'
      },
      {
        type: 'glow',
        color: '#00BFFF'
      }
    ]
  },
  {
    id: 'energetic-orange',
    name: '活力橙色',
    category: 'energetic',
    description: '充满活力的橙色，黑色文字，动感十足',
    preview: '/templates/energetic-orange.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#FF6347',
      backgroundGradient: 'linear-gradient(135deg, #FF6347 0%, #FF4500 50%, #FF8C00 100%)',
      textColor: '#000000',
      fontSize: 50,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '2px 2px 0px #FFFFFF',
      border: {
        enabled: true,
        width: 3,
        color: '#000000',
        style: 'solid'
      },
      effects: {
        shadow: false,
        glow: false
      }
    },
    elements: [
      {
        type: 'background',
        style: 'gradient'
      },
      {
        type: 'text',
        position: 'center',
        style: 'bold'
      },
      {
        type: 'border',
        style: 'black'
      }
    ]
  },
  {
    id: 'elegant-purple',
    name: '优雅紫色',
    category: 'elegant',
    description: '优雅紫色渐变，银色文字，高贵典雅',
    preview: '/templates/elegant-purple.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#8A2BE2',
      backgroundGradient: 'linear-gradient(45deg, #8A2BE2 0%, #9370DB  50%, #BA55D3 100%)',
      textColor: '#C0C0C0',
      fontSize: 46,
      fontWeight: '500',
      textAlign: 'center',
      textShadow: '1px 1px 3px rgba(0,0,0,0.7)',
      border: {
        enabled: true,
        width: 2,
        color: '#C0C0C0',
        style: 'solid'
      },
      effects: {
        shadow: true,
        glow: true,
        glowColor: '#BA55D3'
      }
    },
    elements: [
      {
        type: 'background',
        style: 'gradient'
      },
      {
        type: 'text',
        position: 'center',
        style: 'elegant'
      },
      {
        type: 'border',
        style: 'silver'
      },
      {
        type: 'glow',
        color: '#BA55D3'
      }
    ]
  },
  {
    id: 'champion-gold',
    name: '冠军金色',
    category: 'champion',
    description: '冠军金色背景，深红文字，王者风范',
    preview: '/templates/champion-gold.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#FFD700',
      backgroundGradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
      textColor: '#8B0000',
      fontSize: 52,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
      border: {
        enabled: true,
        width: 5,
        color: '#8B0000',
        style: 'solid'
      },
      effects: {
        shadow: true,
        glow: true,
        glowColor: '#FFD700'
      }
    },
    elements: [
      {
        type: 'background',
        style: 'gradient'
      },
      {
        type: 'text',
        position: 'center',
        style: 'champion'
      },
      {
        type: 'border',
        style: 'red'
      },
      {
        type: 'glow',
        color: '#FFD700'
      }
    ]
  },
  {
    id: 'minimalist-white',
    name: '简约白色',
    category: 'minimalist',
    description: '简约白色背景，黑色文字，清新简洁',
    preview: '/templates/minimalist-white.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#FFFFFF',
      backgroundGradient: 'linear-gradient(45deg, #FFFFFF 0%, #F8F8FF 100%)',
      textColor: '#000000',
      fontSize: 48,
      fontWeight: '400',
      textAlign: 'center',
      textShadow: 'none',
      border: {
        enabled: true,
        width: 2,
        color: '#CCCCCC',
        style: 'solid'
      },
      effects: {
        shadow: false,
        glow: false
      }
    },
    elements: [
      {
        type: 'background',
        style: 'solid'
      },
      {
        type: 'text',
        position: 'center',
        style: 'clean'
      },
      {
        type: 'border',
        style: 'light'
      }
    ]
  },
  {
    id: 'neon-green',
    name: '霓虹绿色',
    category: 'neon',
    description: '霓虹绿色背景，白色文字，科技感十足',
    preview: '/templates/neon-green.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#00FF00',
      backgroundGradient: 'linear-gradient(45deg, #00FF00 0%, #32CD32 50%, #00FF7F 100%)',
      textColor: '#FFFFFF',
      fontSize: 46,
      fontWeight: 'bold',
      textAlign: 'center',
      textShadow: '0px 0px 10px #00FF00',
      border: {
        enabled: false
      },
      effects: {
        shadow: false,
        glow: true,
        glowColor: '#00FF00'
      }
    },
    elements: [
      {
        type: 'background',
        style: 'gradient'
      },
      {
        type: 'text',
        position: 'center',
        style: 'neon'
      },
      {
        type: 'glow',
        color: '#00FF00'
      }
    ]
  },
  {
    id: 'vintage-brown',
    name: '复古棕色',
    category: 'vintage',
    description: '复古棕色背景，米色文字，怀旧风格',
    preview: '/templates/vintage-brown.png',
    config: {
      width: 800,
      height: 300,
      backgroundColor: '#8B4513',
      backgroundGradient: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)',
      textColor: '#F5DEB3',
      fontSize: 44,
      fontWeight: '600',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      border: {
        enabled: true,
        width: 3,
        color: '#F5DEB3',
        style: 'solid'
      },
      effects: {
        shadow: true,
        glow: false
      }
    },
    elements: [
      {
        type: 'background',
        style: 'gradient'
      },
      {
        type: 'text',
        position: 'center',
        style: 'vintage'
      },
      {
        type: 'border',
        style: 'cream'
      }
    ]
  }
]

// 模板分类
export const templateCategories = [
  {
    id: 'all',
    name: '全部',
    icon: 'Grid'
  },
  {
    id: 'classic',
    name: '经典',
    icon: 'Star'
  },
  {
    id: 'modern',
    name: '现代',
    icon: 'TrendCharts'
  },
  {
    id: 'energetic',
    name: '活力',
    icon: 'Lightning'
  },
  {
    id: 'elegant',
    name: '优雅',
    icon: 'Medal'
  },
  {
    id: 'champion',
    name: '冠军',
    icon: 'Trophy'
  },
  {
    id: 'minimalist',
    name: '简约',
    icon: 'Minus'
  },
  {
    id: 'neon',
    name: '霓虹',
    icon: 'Sunny'
  },
  {
    id: 'vintage',
    name: '复古',
    icon: 'Clock'
  }
]

// 获取模板
export const getTemplateById = (id) => {
  return bannerTemplates.find(template => template.id === id)
}

// 按分类获取模板
export const getTemplatesByCategory = (category) => {
  if (category === 'all') {
    return bannerTemplates
  }
  return bannerTemplates.filter(template => template.category === category)
}

// 获取推荐模板
export const getRecommendedTemplates = () => {
  return bannerTemplates.filter(template => 
    ['classic-red', 'champion-gold', 'modern-blue', 'energetic-orange'].includes(template.id)
  )
}
