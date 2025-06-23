import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAIGeneratorStore = defineStore('aiGenerator', () => {
  // AI生成器状态
  const generatedItems = ref([])
  const currentItem = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // 生成参数
  const generationParams = ref({
    itemType: 'banner', // 应援物类型
    style: 'optimistic', // 设计风格
    colors: ['#409EFF', '#FFFFFF'], // 主色调
    text: '樊振东加油！', // 文字内容
    elements: ['trophy', 'star'], // 设计元素
    size: 'medium' // 尺寸
  })
  
  // 应援物类型
  const itemTypes = ref([
    { value: 'banner', label: '手幅', icon: 'flag', description: '横幅式应援手幅' },
    { value: 'fan', label: '扇子', icon: 'fan', description: '便携式应援扇子' },
    { value: 'comb', label: '梳子', icon: 'comb', description: '实用性应援梳子' },
    { value: 'hairpin', label: '发卡', icon: 'hairpin', description: '时尚应援发卡' },
    { value: 'sticker', label: '贴画', icon: 'sticker', description: '装饰性贴画' },
    { value: 'badge', label: '徽章', icon: 'badge', description: '收藏级徽章' },
    { value: 'luggage-tag', label: '行李牌', icon: 'luggage', description: '旅行行李牌' },
    { value: 'keychain', label: '钥匙扣', icon: 'key', description: '便携钥匙扣' }
  ])
  
  // 设计风格
  const styles = ref([
    { value: 'optimistic', label: '乐观向上', description: '积极正面的设计风格' },
    { value: 'sporty', label: '运动风', description: '体现体育精神的设计' },
    { value: 'elegant', label: '优雅风', description: '简约优雅的设计风格' },
    { value: 'champion', label: '冠军风', description: '突出冠军成就的设计' },
    { value: 'cute', label: '可爱风', description: '萌系可爱的设计风格' }
  ])
  
  // 设计元素
  const elements = ref([
    { value: 'trophy', label: '奖杯', category: 'achievement' },
    { value: 'star', label: '星星', category: 'decoration' },
    { value: 'crown', label: '皇冠', category: 'achievement' },
    { value: 'medal', label: '奖牌', category: 'achievement' },
    { value: 'heart', label: '爱心', category: 'emotion' },
    { value: 'lightning', label: '闪电', category: 'power' },
    { value: 'fire', label: '火焰', category: 'power' },
    { value: 'panda', label: '熊猫', category: 'mascot' },
    { value: 'ping-pong', label: '乒乓球', category: 'sport' },
    { value: 'paddle', label: '球拍', category: 'sport' }
  ])
  
  // 模板库
  const templates = ref([])
  const popularTemplates = ref([])
  
  // Computed
  const canGenerate = computed(() => {
    // 检查是否可以生成（基于用户等级和每日限制）
    return !loading.value && generationParams.value.itemType && generationParams.value.text
  })
  
  const todayGenerated = computed(() => {
    const today = new Date().toDateString()
    return generatedItems.value.filter(item => 
      new Date(item.createTime).toDateString() === today
    ).length
  })
  
  const selectedItemType = computed(() => {
    return itemTypes.value.find(type => type.value === generationParams.value.itemType)
  })
  
  const selectedStyle = computed(() => {
    return styles.value.find(style => style.value === generationParams.value.style)
  })

  // 每日使用限制
  const dailyLimit = computed(() => 10)

  // 今日使用次数
  const todayUsage = computed(() => {
    const today = new Date().toDateString()
    return generatedItems.value.filter(item => {
      const itemDate = new Date(item.createTime).toDateString()
      return itemDate === today
    }).length
  })
  
  // Actions
  const setLoading = (value) => {
    loading.value = value
  }
  
  const setError = (errorMessage) => {
    error.value = errorMessage
  }
  
  const setCurrentItem = (item) => {
    currentItem.value = item
  }
  
  const updateGenerationParams = (params) => {
    generationParams.value = { ...generationParams.value, ...params }
  }
  
  const resetGenerationParams = () => {
    generationParams.value = {
      itemType: 'banner',
      style: 'optimistic',
      colors: ['#409EFF', '#FFFFFF'],
      text: '樊振东加油！',
      elements: ['trophy', 'star'],
      size: 'medium'
    }
  }
  
  const addGeneratedItem = (item) => {
    generatedItems.value.unshift(item)
    // 限制本地存储的数量
    if (generatedItems.value.length > 100) {
      generatedItems.value = generatedItems.value.slice(0, 50)
    }
  }
  
  const setTemplates = (templateList) => {
    templates.value = templateList
  }
  
  const setPopularTemplates = (templateList) => {
    popularTemplates.value = templateList
  }
  
  // 生成应援物
  const generateItem = async () => {
    setLoading(true)
    setError(null)

    try {
      // 检查每日限制
      // 注意：这里需要在组件中调用时传入userStore，避免循环依赖
      // const userStore = useUserStore()
      // if (!userStore.canUseAIGenerator) {
      //   throw new Error('今日生成次数已用完，请明天再试')
      // }
      
      // 调用AI生成API
      // const response = await aiAPI.generateItem(generationParams.value)
      
      // 模拟AI生成过程
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const newItem = {
        id: Date.now(),
        type: generationParams.value.itemType,
        style: generationParams.value.style,
        imageUrl: `/generated/${Date.now()}.png`, // 模拟生成的图片URL
        thumbnailUrl: `/generated/${Date.now()}_thumb.png`,
        params: { ...generationParams.value },
        createTime: new Date().toISOString(),
        downloads: 0,
        likes: 0,
        isPublic: false
      }
      
      addGeneratedItem(newItem)
      setCurrentItem(newItem)
      
      // 增加用户AI使用次数
      // userStore.incrementAIUsage()
      
      return newItem
    } catch (err) {
      setError(err.message || 'AI生成失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 新的生成内容方法（支持多种类型）
  const generateContent = async (options) => {
    setLoading(true)
    setError(null)

    try {
      // 检查每日限制
      if (todayGenerated.value >= 10) {
        throw new Error('今日生成次数已用完，请明天再试')
      }

      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 根据类型生成不同内容
      const results = await generateByType(options.type, options.params)

      // 添加到历史记录
      results.forEach(result => {
        addGeneratedItem(result)
      })

      setLoading(false)
      return results

    } catch (err) {
      setError(err.message || '生成失败')
      setLoading(false)
      throw err
    }
  }

  // 根据类型生成内容
  const generateByType = async (type, params) => {
    const baseId = Date.now()

    switch (type) {
      case 'slogan':
        return generateSlogans(params, baseId)
      case 'banner':
        return generateBanners(params, baseId)
      case 'meme':
        return generateMemes(params, baseId)
      default:
        throw new Error('不支持的生成类型')
    }
  }

  // 生成口号
  const generateSlogans = (params, baseId) => {
    const slogans = [
      '樊振东，永远的世界第一！',
      '小胖加油，我们永远支持你！',
      '技术精湛，精神可嘉，樊振东最棒！',
      '乒乓王者，樊振东称霸天下！',
      '东哥威武，横扫千军！'
    ]

    return slogans.slice(0, 3).map((content, index) => ({
      id: baseId + index,
      type: 'slogan',
      content,
      theme: params.theme || 'victory',
      emotion: params.emotion || 'passionate',
      length: content.length,
      elements: params.elements || [],
      createTime: new Date().toISOString(),
      liked: false
    }))
  }

  // 生成横幅
  const generateBanners = (params, baseId) => {
    const banners = [
      {
        content: '樊振东 世界第一',
        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
        textColor: '#ffffff'
      },
      {
        content: '小胖加油 永远支持',
        background: 'linear-gradient(45deg, #48cae4, #023e8a)',
        textColor: '#ffffff'
      },
      {
        content: '乒乓王者 樊振东',
        background: 'linear-gradient(45deg, #f72585, #b5179e)',
        textColor: '#ffffff'
      }
    ]

    return banners.slice(0, 2).map((banner, index) => ({
      id: baseId + index,
      type: 'banner',
      content: banner.content,
      background: banner.background,
      textColor: banner.textColor,
      size: params.size || 'medium',
      colorScheme: params.colorScheme || 'blue',
      createTime: new Date().toISOString(),
      liked: false
    }))
  }

  // 生成表情包
  const generateMemes = (params, baseId) => {
    const memes = [
      {
        content: '樊振东必胜',
        imageUrl: '/images/meme-fzd-1.jpg',
        text: params.text || '必胜！'
      },
      {
        content: '小胖加油',
        imageUrl: '/images/meme-fzd-2.jpg',
        text: params.text || '加油！'
      }
    ]

    return memes.slice(0, 2).map((meme, index) => ({
      id: baseId + index,
      type: 'meme',
      content: meme.content,
      imageUrl: meme.imageUrl,
      text: meme.text,
      style: params.style || 'cute',
      createTime: new Date().toISOString(),
      liked: false
    }))
  }

  // 使用模板
  const useTemplate = (template) => {
    updateGenerationParams(template.params)
  }
  
  // 保存为模板
  const saveAsTemplate = async (item, templateName) => {
    try {
      // await aiAPI.saveTemplate({
      //   name: templateName,
      //   params: item.params,
      //   thumbnailUrl: item.thumbnailUrl
      // })
      
      const newTemplate = {
        id: Date.now(),
        name: templateName,
        params: item.params,
        thumbnailUrl: item.thumbnailUrl,
        createTime: new Date().toISOString(),
        author: '当前用户',
        uses: 0,
        likes: 0
      }
      
      templates.value.unshift(newTemplate)
      
      return newTemplate
    } catch (err) {
      setError(err.message || '保存模板失败')
      throw err
    }
  }
  
  // 下载生成的应援物
  const downloadItem = async (item) => {
    try {
      // 创建下载链接
      const link = document.createElement('a')
      link.href = item.imageUrl
      link.download = `fzd-support-${item.type}-${item.id}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 增加下载次数
      item.downloads++
      
      // 记录下载统计
      // await aiAPI.recordDownload(item.id)
    } catch (err) {
      setError(err.message || '下载失败')
    }
  }
  
  // 分享生成的应援物
  const shareItem = async (item) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `我用AI生成的樊振东应援${selectedItemType.value?.label}`,
          text: '快来看看我设计的樊振东应援物品！',
          url: window.location.href
        })
      } else {
        // 复制链接到剪贴板
        await navigator.clipboard.writeText(window.location.href)
        // 这里可以显示一个提示消息
      }
    } catch (err) {
      setError(err.message || '分享失败')
    }
  }
  
  // 获取模板列表
  const fetchTemplates = async () => {
    try {
      // const response = await aiAPI.getTemplates()
      // setTemplates(response.data.templates)
      // setPopularTemplates(response.data.popular)
      
      // 模拟数据
      const mockTemplates = [
        {
          id: 1,
          name: '经典冠军风',
          params: {
            itemType: 'banner',
            style: 'champion',
            colors: ['#FFD700', '#FFFFFF'],
            text: '樊振东 超级金满贯',
            elements: ['trophy', 'crown'],
            size: 'large'
          },
          thumbnailUrl: '/templates/champion-banner.png',
          author: '设计师小王',
          uses: 156,
          likes: 89
        }
      ]
      
      setTemplates(mockTemplates)
      setPopularTemplates(mockTemplates.slice(0, 5))
    } catch (err) {
      setError(err.message || '获取模板失败')
    }
  }
  
  // 初始化
  const initGenerator = () => {
    // 从localStorage恢复生成历史
    const savedItems = localStorage.getItem('ai-generated-items')
    if (savedItems) {
      try {
        const items = JSON.parse(savedItems)
        generatedItems.value = items
      } catch (error) {
        console.error('Failed to parse generated items:', error)
      }
    }
    
    // 获取模板列表
    fetchTemplates()
  }
  
  // 保存生成历史到localStorage
  const saveToLocal = () => {
    localStorage.setItem('ai-generated-items', JSON.stringify(generatedItems.value))
  }
  
  return {
    // State
    generatedItems,
    currentItem,
    loading,
    error,
    generationParams,
    itemTypes,
    styles,
    elements,
    templates,
    popularTemplates,
    
    // Computed
    canGenerate,
    todayGenerated,
    selectedItemType,
    selectedStyle,
    dailyLimit,
    todayUsage,
    
    // Actions
    setLoading,
    setError,
    setCurrentItem,
    updateGenerationParams,
    resetGenerationParams,
    addGeneratedItem,
    setTemplates,
    setPopularTemplates,
    generateItem,
    generateContent,
    useTemplate,
    saveAsTemplate,
    downloadItem,
    shareItem,
    fetchTemplates,
    initGenerator,
    saveToLocal
  }
})
