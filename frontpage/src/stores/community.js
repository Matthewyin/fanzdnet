import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCommunityStore = defineStore('community', () => {
  // 社区状态
  const posts = ref([])
  const currentPost = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // 聊天状态
  const chatMessages = ref([])
  const onlineUsers = ref([])
  const isConnected = ref(false)
  
  // 分页信息
  const currentPage = ref(1)
  const pageSize = ref(20)
  const total = ref(0)
  
  // 筛选条件
  const filters = ref({
    category: '',
    sortBy: 'latest', // 'latest' | 'popular' | 'hot'
    timeRange: 'all' // 'all' | 'today' | 'week' | 'month'
  })
  
  // 帖子分类
  const categories = ref([
    { value: '', label: '全部' },
    { value: 'discussion', label: '讨论' },
    { value: 'news', label: '新闻' },
    { value: 'match', label: '比赛' },
    { value: 'support', label: '应援' },
    { value: 'question', label: '提问' }
  ])
  
  // Computed
  const hasMore = computed(() => {
    return posts.value.length < total.value
  })
  
  const filteredPosts = computed(() => {
    let filtered = posts.value
    
    if (filters.value.category) {
      filtered = filtered.filter(post => post.category === filters.value.category)
    }
    
    // 时间范围筛选
    if (filters.value.timeRange !== 'all') {
      const now = new Date()
      const timeLimit = new Date()
      
      switch (filters.value.timeRange) {
        case 'today':
          timeLimit.setHours(0, 0, 0, 0)
          break
        case 'week':
          timeLimit.setDate(now.getDate() - 7)
          break
        case 'month':
          timeLimit.setMonth(now.getMonth() - 1)
          break
      }
      
      filtered = filtered.filter(post => new Date(post.createTime) >= timeLimit)
    }
    
    // 排序
    switch (filters.value.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case 'hot':
        // 综合考虑点赞数、评论数和时间
        filtered.sort((a, b) => {
          const scoreA = a.likes + a.comments * 2 - (Date.now() - new Date(a.createTime)) / 3600000
          const scoreB = b.likes + b.comments * 2 - (Date.now() - new Date(b.createTime)) / 3600000
          return scoreB - scoreA
        })
        break
      default: // latest
        filtered.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    }
    
    return filtered
  })
  
  const recentMessages = computed(() => {
    return chatMessages.value.slice(-50) // 只显示最近50条消息
  })

  const totalPosts = computed(() => {
    return posts.value.length
  })
  
  // Actions
  const setLoading = (value) => {
    loading.value = value
  }
  
  const setError = (errorMessage) => {
    error.value = errorMessage
  }
  
  const setPosts = (list) => {
    posts.value = list
  }
  
  const appendPosts = (list) => {
    posts.value.push(...list)
  }
  
  const setCurrentPost = (post) => {
    currentPost.value = post
  }
  
  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
  }
  
  const clearFilters = () => {
    filters.value = {
      category: '',
      sortBy: 'latest',
      timeRange: 'all'
    }
    currentPage.value = 1
  }
  
  const setPage = (page) => {
    currentPage.value = page
  }
  
  const setTotal = (count) => {
    total.value = count
  }
  
  // 聊天相关
  const addChatMessage = (message) => {
    chatMessages.value.push(message)
    // 限制消息数量，避免内存溢出
    if (chatMessages.value.length > 1000) {
      chatMessages.value = chatMessages.value.slice(-500)
    }
  }
  
  const setOnlineUsers = (users) => {
    onlineUsers.value = users
  }
  
  const setConnected = (status) => {
    isConnected.value = status
  }
  
  // 获取帖子列表
  const fetchPosts = async (params = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      // const response = await communityAPI.getPosts({
      //   page: currentPage.value,
      //   pageSize: pageSize.value,
      //   ...filters.value,
      //   ...params
      // })
      
      // 模拟数据
      const mockPosts = [
        {
          id: 1,
          title: '樊振东今天的训练状态真好！',
          content: '看到樊振东在训练中的专注表情，真的很感动。他每一个动作都那么认真，每一次挥拍都充满力量。这就是为什么他能成为世界第一的原因！',
          author: '球迷小王',
          authorAvatar: '/images/user1.jpg',
          category: 'discussion',
          tags: ['训练', '状态', '专注'],
          createTime: '2024-01-15 14:30:00',
          views: 1560,
          comments: 89,
          likes: 234,
          isTop: true,
          isLiked: false,
          isFavorited: false,
          images: ['/images/fzd-training1.jpg', '/images/fzd-training2.jpg']
        },
        {
          id: 2,
          title: '世界杯夺冠后的感想',
          content: '樊振东再次证明了自己！这次世界杯的表现真的太精彩了，特别是决赛对阵马龙的那场比赛，每一分都打得惊心动魄。',
          author: '乒乓球迷',
          authorAvatar: '/images/user2.jpg',
          category: 'match',
          tags: ['世界杯', '冠军', '马龙'],
          createTime: '2024-01-14 20:15:00',
          views: 2340,
          comments: 156,
          likes: 567,
          isTop: false,
          isLiked: true,
          isFavorited: false,
          images: ['/images/fzd-worldcup.jpg']
        },
        {
          id: 3,
          title: '樊振东的技术分析',
          content: '作为一个多年的乒乓球爱好者，我想分析一下樊振东的技术特点。他的正手攻球力量大、速度快，反手技术也很全面...',
          author: '技术分析师',
          authorAvatar: '/images/user3.jpg',
          category: 'discussion',
          tags: ['技术', '分析', '正手', '反手'],
          createTime: '2024-01-13 16:45:00',
          views: 890,
          comments: 67,
          likes: 123,
          isTop: false,
          isLiked: false,
          isFavorited: true,
          images: []
        },
        {
          id: 4,
          title: '樊振东后援会活动通知',
          content: '各位球迷朋友们，我们计划在下个月组织一次线下观赛活动，地点在北京体育馆。有兴趣的朋友请在评论区报名！',
          author: '樊振东后援会',
          authorAvatar: '/images/user4.jpg',
          category: 'support',
          tags: ['后援会', '活动', '观赛'],
          createTime: '2024-01-12 10:20:00',
          views: 1230,
          comments: 45,
          likes: 89,
          isTop: false,
          isLiked: false,
          isFavorited: false,
          images: ['/images/fanclub-activity.jpg']
        },
        {
          id: 5,
          title: '新手求教：如何提高乒乓球水平？',
          content: '我是一个乒乓球新手，看了樊振东的比赛后很受启发，想请教一下各位前辈，如何才能提高自己的乒乓球水平？',
          author: '新手小白',
          authorAvatar: '/images/user5.jpg',
          category: 'question',
          tags: ['新手', '求教', '提高'],
          createTime: '2024-01-11 19:30:00',
          views: 567,
          comments: 34,
          likes: 56,
          isTop: false,
          isLiked: false,
          isFavorited: false,
          images: []
        }
      ]
      
      if (params.append) {
        appendPosts(mockPosts)
      } else {
        setPosts(mockPosts)
      }
      
      setTotal(mockPosts.length)
    } catch (err) {
      setError(err.message || '获取帖子失败')
    } finally {
      setLoading(false)
    }
  }
  
  // 发布帖子
  const createPost = async (postData) => {
    setLoading(true)
    setError(null)
    
    try {
      // const response = await communityAPI.createPost(postData)
      
      // 模拟创建帖子
      const newPost = {
        id: Date.now(),
        ...postData,
        author: '当前用户',
        authorAvatar: '',
        createTime: new Date().toISOString(),
        likes: 0,
        comments: 0,
        views: 0,
        isTop: false
      }
      
      posts.value.unshift(newPost)
      
      return newPost
    } catch (err) {
      setError(err.message || '发布失败')
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  // 点赞帖子
  const likePost = async (postId) => {
    try {
      // await communityAPI.likePost(postId)

      const post = posts.value.find(p => p.id === postId)
      if (post) {
        post.isLiked = !post.isLiked
        post.likes = post.isLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
      }
    } catch (err) {
      setError(err.message || '点赞失败')
      throw err
    }
  }

  // 收藏帖子
  const favoritePost = async (postId) => {
    try {
      // await communityAPI.favoritePost(postId)

      const post = posts.value.find(p => p.id === postId)
      if (post) {
        post.isFavorited = !post.isFavorited
      }
    } catch (err) {
      setError(err.message || '收藏失败')
      throw err
    }
  }

  // 举报帖子
  const reportPost = async (postId, reason) => {
    try {
      // await communityAPI.reportPost(postId, reason)

      // 模拟举报成功
      console.log(`举报帖子 ${postId}，原因：${reason}`)
    } catch (err) {
      setError(err.message || '举报失败')
      throw err
    }
  }
  
  // 发送聊天消息
  const sendChatMessage = async (content) => {
    try {
      const message = {
        id: Date.now(),
        content,
        author: '当前用户',
        authorAvatar: '',
        timestamp: new Date().toISOString(),
        type: 'text'
      }
      
      addChatMessage(message)
      
      // 这里应该通过WebSocket发送消息
      // websocket.send(JSON.stringify(message))
      
      return message
    } catch (err) {
      setError(err.message || '发送消息失败')
      throw err
    }
  }
  
  // 连接聊天室
  const connectChat = () => {
    // 这里应该建立WebSocket连接
    // const ws = new WebSocket('ws://localhost:8080/chat')
    // ws.onopen = () => setConnected(true)
    // ws.onclose = () => setConnected(false)
    // ws.onmessage = (event) => {
    //   const message = JSON.parse(event.data)
    //   addChatMessage(message)
    // }
    
    // 模拟连接
    setConnected(true)
  }
  
  // 断开聊天室连接
  const disconnectChat = () => {
    setConnected(false)
  }
  
  return {
    // State
    posts,
    currentPost,
    loading,
    error,
    chatMessages,
    onlineUsers,
    isConnected,
    currentPage,
    pageSize,
    total,
    filters,
    categories,
    
    // Computed
    hasMore,
    filteredPosts,
    recentMessages,
    totalPosts,
    
    // Actions
    setLoading,
    setError,
    setPosts,
    appendPosts,
    setCurrentPost,
    updateFilters,
    clearFilters,
    setPage,
    setTotal,
    addChatMessage,
    setOnlineUsers,
    setConnected,
    fetchPosts,
    createPost,
    likePost,
    favoritePost,
    reportPost,
    sendChatMessage,
    connectChat,
    disconnectChat
  }
})
