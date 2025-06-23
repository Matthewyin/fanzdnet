import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNewsStore = defineStore('news', () => {
  // 新闻状态
  const newsList = ref([])
  const currentNews = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // 分页信息
  const currentPage = ref(1)
  const pageSize = ref(20)
  const total = ref(0)
  
  // 筛选条件
  const filters = ref({
    category: '',
    keyword: '',
    dateRange: []
  })
  
  // 新闻分类
  const categories = ref([
    { value: '', label: '全部' },
    { value: 'match', label: '比赛' },
    { value: 'training', label: '训练' },
    { value: 'life', label: '生活' },
    { value: 'honor', label: '荣誉' },
    { value: 'interview', label: '采访' }
  ])
  
  // Computed
  const hasMore = computed(() => {
    return newsList.value.length < total.value
  })
  
  const filteredNews = computed(() => {
    let filtered = newsList.value
    
    if (filters.value.category) {
      filtered = filtered.filter(news => news.category === filters.value.category)
    }
    
    if (filters.value.keyword) {
      const keyword = filters.value.keyword.toLowerCase()
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(keyword) ||
        news.content.toLowerCase().includes(keyword)
      )
    }
    
    return filtered
  })
  
  // Actions
  const setLoading = (value) => {
    loading.value = value
  }
  
  const setError = (errorMessage) => {
    error.value = errorMessage
  }
  
  const setNewsList = (list) => {
    newsList.value = list
  }
  
  const addNews = (newsItem) => {
    newsList.value.unshift(newsItem)
  }
  
  const appendNews = (list) => {
    newsList.value.push(...list)
  }
  
  const setCurrentNews = (news) => {
    currentNews.value = news
  }
  
  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1 // 重置页码
  }
  
  const clearFilters = () => {
    filters.value = {
      category: '',
      keyword: '',
      dateRange: []
    }
    currentPage.value = 1
  }
  
  const setPage = (page) => {
    currentPage.value = page
  }
  
  const setTotal = (count) => {
    total.value = count
  }
  
  // 获取新闻列表
  const fetchNews = async (params = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      // 这里将调用API获取新闻数据
      // const response = await newsAPI.getNews({
      //   page: currentPage.value,
      //   pageSize: pageSize.value,
      //   ...filters.value,
      //   ...params
      // })
      
      // 模拟数据，实际开发时替换为真实API调用
      const mockNews = [
        {
          id: 1,
          title: '樊振东世界杯决赛4-1战胜马龙夺冠，成就超级金满贯',
          summary: '在刚刚结束的世界杯决赛中，樊振东以4-1的比分战胜队友马龙，成功夺得冠军，这也是他职业生涯的第三个世界杯冠军。',
          content: '樊振东在世界杯决赛中表现出色，展现了超强的技术实力和心理素质...',
          category: 'match',
          publishTime: '2024-01-15 20:30:00',
          source: '中国乒乓球协会',
          imageUrl: '/images/fzd-worldcup-champion.jpg',
          readCount: 15420,
          likeCount: 892,
          isLiked: false,
          isFavorited: false
        },
        {
          id: 2,
          title: '樊振东训练备战新赛季，技术动作更加完善',
          summary: '樊振东在国家队训练基地进行系统训练，教练组对其技术细节进行了针对性指导。',
          content: '据了解，樊振东正在为新赛季做准备...',
          category: 'training',
          publishTime: '2024-01-14 16:45:00',
          source: '体坛周报',
          imageUrl: '/images/fzd-training.jpg',
          readCount: 8760,
          likeCount: 456,
          isLiked: false,
          isFavorited: false
        },
        {
          id: 3,
          title: '樊振东接受专访：目标是帮助中国队卫冕奥运冠军',
          summary: '在最新的专访中，樊振东表示自己的目标是在巴黎奥运会上帮助中国队卫冕团体冠军。',
          content: '樊振东在接受记者采访时表示...',
          category: 'interview',
          publishTime: '2024-01-13 14:20:00',
          source: '新华社体育',
          imageUrl: '/images/fzd-interview.jpg',
          readCount: 12340,
          likeCount: 678,
          isLiked: true,
          isFavorited: false
        },
        {
          id: 4,
          title: '樊振东荣获年度最佳男运动员奖',
          summary: '在昨晚举行的体育颁奖典礼上，樊振东凭借出色的表现荣获年度最佳男运动员奖。',
          content: '樊振东在颁奖典礼上发表获奖感言...',
          category: 'honor',
          publishTime: '2024-01-12 22:15:00',
          source: '央视体育',
          imageUrl: '/images/fzd-award.jpg',
          readCount: 9870,
          likeCount: 534,
          isLiked: false,
          isFavorited: true
        },
        {
          id: 5,
          title: '樊振东与队友聚餐庆祝新年，展现团队凝聚力',
          summary: '樊振东与国家队队友们一起聚餐庆祝新年，现场气氛温馨，展现了团队的凝聚力。',
          content: '在新年来临之际，樊振东与队友们...',
          category: 'life',
          publishTime: '2024-01-11 19:30:00',
          source: '乒乓世界',
          imageUrl: '/images/fzd-newyear.jpg',
          readCount: 6540,
          likeCount: 321,
          isLiked: false,
          isFavorited: false
        }
      ]
      
      if (params.append) {
        appendNews(mockNews)
      } else {
        setNewsList(mockNews)
      }
      
      setTotal(mockNews.length)
    } catch (err) {
      setError(err.message || '获取新闻失败')
    } finally {
      setLoading(false)
    }
  }
  
  // 获取新闻详情
  const fetchNewsDetail = async (id) => {
    setLoading(true)
    setError(null)
    
    try {
      // const response = await newsAPI.getNewsDetail(id)
      // setCurrentNews(response.data)
      
      // 模拟数据
      const mockNewsDetail = {
        id,
        title: '樊振东获得世界杯冠军',
        content: '详细的新闻内容...',
        category: 'match',
        publishTime: '2024-01-15 10:30:00',
        source: '中国乒乓球协会',
        imageUrl: '',
        readCount: 1250
      }
      
      setCurrentNews(mockNewsDetail)
    } catch (err) {
      setError(err.message || '获取新闻详情失败')
    } finally {
      setLoading(false)
    }
  }
  
  // 搜索新闻
  const searchNews = async (keyword) => {
    updateFilters({ keyword })
    await fetchNews()
  }

  // 点赞新闻
  const likeNews = async (newsId) => {
    try {
      // const response = await newsAPI.likeNews(newsId)

      // 模拟点赞
      const news = newsList.value.find(item => item.id === newsId)
      if (news) {
        news.isLiked = !news.isLiked
        news.likeCount = news.isLiked ? (news.likeCount || 0) + 1 : Math.max(0, (news.likeCount || 0) - 1)
      }
    } catch (err) {
      setError(err.message || '点赞失败')
      throw err
    }
  }

  // 收藏新闻
  const favoriteNews = async (newsId) => {
    try {
      // const response = await newsAPI.favoriteNews(newsId)

      // 模拟收藏
      const news = newsList.value.find(item => item.id === newsId)
      if (news) {
        news.isFavorited = !news.isFavorited
      }
    } catch (err) {
      setError(err.message || '收藏失败')
      throw err
    }
  }

  return {
    // State
    newsList,
    currentNews,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    filters,
    categories,
    
    // Computed
    hasMore,
    filteredNews,
    
    // Actions
    setLoading,
    setError,
    setNewsList,
    addNews,
    appendNews,
    setCurrentNews,
    updateFilters,
    clearFilters,
    setPage,
    setTotal,
    fetchNews,
    fetchNewsDetail,
    searchNews,
    likeNews,
    favoriteNews
  }
})
