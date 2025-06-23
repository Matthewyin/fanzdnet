import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGalleryStore = defineStore('gallery', () => {
  // 图库状态
  const imageList = ref([])
  const currentImage = ref(null)
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
    dateRange: [],
    sortBy: 'latest' // 'latest' | 'popular' | 'oldest'
  })
  
  // 图片分类
  const categories = ref([
    { value: '', label: '全部' },
    { value: 'match', label: '比赛' },
    { value: 'training', label: '训练' },
    { value: 'life', label: '生活' },
    { value: 'award', label: '颁奖' },
    { value: 'fan', label: '球迷' }
  ])
  
  // 上传状态
  const uploading = ref(false)
  const uploadProgress = ref(0)
  
  // Computed
  const hasMore = computed(() => {
    return imageList.value.length < total.value
  })
  
  const filteredImages = computed(() => {
    let filtered = imageList.value
    
    if (filters.value.category) {
      filtered = filtered.filter(img => img.category === filters.value.category)
    }
    
    if (filters.value.keyword) {
      const keyword = filters.value.keyword.toLowerCase()
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(keyword) ||
        img.description.toLowerCase().includes(keyword) ||
        img.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    }
    
    // 排序
    switch (filters.value.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadTime) - new Date(b.uploadTime))
        break
      default: // latest
        filtered.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime))
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
  
  const setImageList = (list) => {
    imageList.value = list
  }
  
  const appendImages = (list) => {
    imageList.value.push(...list)
  }
  
  const setCurrentImage = (image) => {
    currentImage.value = image
  }
  
  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
  }
  
  const clearFilters = () => {
    filters.value = {
      category: '',
      keyword: '',
      dateRange: [],
      sortBy: 'latest'
    }
    currentPage.value = 1
  }
  
  const setPage = (page) => {
    currentPage.value = page
  }
  
  const setTotal = (count) => {
    total.value = count
  }
  
  const setUploading = (value) => {
    uploading.value = value
  }
  
  const setUploadProgress = (progress) => {
    uploadProgress.value = progress
  }
  
  // 获取图片列表
  const fetchImages = async (params = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      // const response = await galleryAPI.getImages({
      //   page: currentPage.value,
      //   pageSize: pageSize.value,
      //   ...filters.value,
      //   ...params
      // })
      
      // 模拟数据
      const mockImages = [
        {
          id: 1,
          title: '樊振东世界杯夺冠瞬间',
          description: '樊振东在世界杯决赛中举起奖杯的激动瞬间，这是他职业生涯的重要里程碑',
          url: '/images/fzd-champion.jpg',
          thumbnailUrl: '/images/fzd-champion-thumb.jpg',
          category: 'match',
          tags: ['世界杯', '冠军', '决赛', '奖杯'],
          uploadTime: '2024-01-15 20:30:00',
          uploader: '球迷小王',
          uploaderAvatar: '/images/user1.jpg',
          likes: 892,
          views: 15420,
          status: 'approved',
          isLiked: false,
          isFavorited: false
        },
        {
          id: 2,
          title: '训练中的专注神情',
          description: '樊振东在国家队训练基地进行技术训练时的专注表情',
          url: '/images/fzd-training.jpg',
          thumbnailUrl: '/images/fzd-training-thumb.jpg',
          category: 'training',
          tags: ['训练', '专注', '技术'],
          uploadTime: '2024-01-14 16:45:00',
          uploader: '体育摄影师',
          uploaderAvatar: '/images/user2.jpg',
          likes: 456,
          views: 8760,
          status: 'approved',
          isLiked: true,
          isFavorited: false
        },
        {
          id: 3,
          title: '与队友的温馨合影',
          description: '樊振东与国家队队友们在训练间隙的轻松合影',
          url: '/images/fzd-teammates.jpg',
          thumbnailUrl: '/images/fzd-teammates-thumb.jpg',
          category: 'life',
          tags: ['队友', '合影', '轻松'],
          uploadTime: '2024-01-13 14:20:00',
          uploader: '乒乓球迷',
          uploaderAvatar: '/images/user3.jpg',
          likes: 678,
          views: 12340,
          status: 'approved',
          isLiked: false,
          isFavorited: true
        },
        {
          id: 4,
          title: '颁奖典礼精彩瞬间',
          description: '樊振东在年度体育颁奖典礼上接受最佳男运动员奖的瞬间',
          url: '/images/fzd-award-ceremony.jpg',
          thumbnailUrl: '/images/fzd-award-ceremony-thumb.jpg',
          category: 'award',
          tags: ['颁奖', '荣誉', '最佳运动员'],
          uploadTime: '2024-01-12 22:15:00',
          uploader: '央视体育',
          uploaderAvatar: '/images/user4.jpg',
          likes: 534,
          views: 9870,
          status: 'approved',
          isLiked: false,
          isFavorited: false
        },
        {
          id: 5,
          title: '球迷见面会现场',
          description: '樊振东参加球迷见面会，与粉丝们亲切互动的温馨场面',
          url: '/images/fzd-fan-meeting.jpg',
          thumbnailUrl: '/images/fzd-fan-meeting-thumb.jpg',
          category: 'fan',
          tags: ['球迷', '见面会', '互动'],
          uploadTime: '2024-01-11 19:30:00',
          uploader: '樊振东后援会',
          uploaderAvatar: '/images/user5.jpg',
          likes: 321,
          views: 6540,
          status: 'approved',
          isLiked: false,
          isFavorited: false
        },
        {
          id: 6,
          title: '比赛中的精彩扣杀',
          description: '樊振东在比赛中展现出的强力扣杀技术，展现了他的技术实力',
          url: '/images/fzd-smash.jpg',
          thumbnailUrl: '/images/fzd-smash-thumb.jpg',
          category: 'match',
          tags: ['扣杀', '技术', '比赛'],
          uploadTime: '2024-01-10 15:45:00',
          uploader: '体育记者',
          uploaderAvatar: '/images/user6.jpg',
          likes: 789,
          views: 11230,
          status: 'approved',
          isLiked: true,
          isFavorited: true
        }
      ]
      
      if (params.append) {
        appendImages(mockImages)
      } else {
        setImageList(mockImages)
      }
      
      setTotal(mockImages.length)
    } catch (err) {
      setError(err.message || '获取图片失败')
    } finally {
      setLoading(false)
    }
  }
  
  // 上传图片
  const uploadImage = async (file, metadata) => {
    setUploading(true)
    setUploadProgress(0)
    setError(null)
    
    try {
      // 模拟上传进度
      const progressInterval = setInterval(() => {
        uploadProgress.value += 10
        if (uploadProgress.value >= 100) {
          clearInterval(progressInterval)
        }
      }, 200)
      
      // const formData = new FormData()
      // formData.append('file', file)
      // formData.append('metadata', JSON.stringify(metadata))
      
      // const response = await galleryAPI.uploadImage(formData, {
      //   onUploadProgress: (progressEvent) => {
      //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //     setUploadProgress(progress)
      //   }
      // })
      
      // 模拟上传成功
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newImage = {
        id: Date.now(),
        title: metadata.title,
        description: metadata.description,
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
        category: metadata.category,
        tags: metadata.tags || [],
        uploadTime: new Date().toISOString(),
        uploader: '当前用户',
        likes: 0,
        views: 0,
        status: 'pending'
      }
      
      imageList.value.unshift(newImage)
      
      return newImage
    } catch (err) {
      setError(err.message || '上传失败')
      throw err
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }
  
  // 点赞图片
  const likeImage = async (imageId) => {
    try {
      // await galleryAPI.likeImage(imageId)
      
      const image = imageList.value.find(img => img.id === imageId)
      if (image) {
        image.likes++
      }
    } catch (err) {
      setError(err.message || '点赞失败')
    }
  }
  
  // 举报图片
  const reportImage = async (imageId, reason) => {
    try {
      // await galleryAPI.reportImage(imageId, reason)
      console.log('举报图片:', imageId, reason)
    } catch (err) {
      setError(err.message || '举报失败')
    }
  }
  
  return {
    // State
    imageList,
    currentImage,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    filters,
    categories,
    uploading,
    uploadProgress,
    
    // Computed
    hasMore,
    filteredImages,
    
    // Actions
    setLoading,
    setError,
    setImageList,
    appendImages,
    setCurrentImage,
    updateFilters,
    clearFilters,
    setPage,
    setTotal,
    setUploading,
    setUploadProgress,
    fetchImages,
    uploadImage,
    likeImage,
    reportImage
  }
})
