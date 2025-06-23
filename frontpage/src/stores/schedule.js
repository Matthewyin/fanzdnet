import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  // 赛程状态
  const scheduleList = ref([])
  const currentMatch = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // 显示模式
  const viewMode = ref('calendar') // 'calendar' | 'list' | 'electronic'
  const isElectronicMode = ref(false)
  
  // 筛选条件
  const filters = ref({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    tournament: '',
    status: '' // 'upcoming' | 'ongoing' | 'finished'
  })
  
  // 比赛状态
  const matchStatuses = ref([
    { value: '', label: '全部' },
    { value: 'upcoming', label: '即将开始' },
    { value: 'ongoing', label: '进行中' },
    { value: 'finished', label: '已结束' }
  ])
  
  // Computed
  const upcomingMatches = computed(() => {
    const now = new Date()
    return scheduleList.value.filter(match => new Date(match.startTime) > now)
  })
  
  const ongoingMatches = computed(() => {
    const now = new Date()
    return scheduleList.value.filter(match => {
      const start = new Date(match.startTime)
      const end = new Date(match.endTime)
      return start <= now && now <= end
    })
  })
  
  const finishedMatches = computed(() => {
    const now = new Date()
    return scheduleList.value.filter(match => new Date(match.endTime) < now)
  })
  
  const todayMatches = computed(() => {
    const today = new Date().toDateString()
    return scheduleList.value.filter(match => 
      new Date(match.startTime).toDateString() === today
    )
  })
  
  // Actions
  const setLoading = (value) => {
    loading.value = value
  }
  
  const setError = (errorMessage) => {
    error.value = errorMessage
  }
  
  const setScheduleList = (list) => {
    scheduleList.value = list
  }
  
  const setCurrentMatch = (match) => {
    currentMatch.value = match
  }
  
  const setViewMode = (mode) => {
    viewMode.value = mode
  }
  
  const toggleElectronicMode = () => {
    isElectronicMode.value = !isElectronicMode.value
    if (isElectronicMode.value) {
      // 进入全屏模式
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      }
    } else {
      // 退出全屏模式
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }
  
  const updateFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }
  
  const clearFilters = () => {
    filters.value = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      tournament: '',
      status: ''
    }
  }
  
  // 获取赛程数据
  const fetchSchedule = async (params = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      // 这里将调用API获取赛程数据
      // const response = await scheduleAPI.getSchedule({
      //   ...filters.value,
      //   ...params
      // })
      
      // 模拟数据
      const mockSchedule = [
        {
          id: 1,
          tournament: '世界乒乓球锦标赛',
          opponent: '马龙',
          startTime: '2024-02-15 19:00:00',
          endTime: '2024-02-15 21:00:00',
          venue: '北京体育馆',
          round: '决赛',
          status: 'upcoming',
          result: null,
          liveUrl: 'https://live.example.com/match1',
          hasReminder: false
        },
        {
          id: 2,
          tournament: 'WTT大满贯',
          opponent: '张本智和',
          startTime: '2024-01-20 15:30:00',
          endTime: '2024-01-20 17:30:00',
          venue: '新加坡体育城',
          round: '半决赛',
          status: 'finished',
          result: '4-1',
          highlights: 'https://highlights.example.com/match2',
          hasReminder: false
        },
        {
          id: 3,
          tournament: '亚洲杯',
          opponent: '雨果·卡尔德拉诺',
          startTime: '2024-01-25 20:30:00',
          endTime: '2024-01-25 22:30:00',
          venue: '东京体育馆',
          round: '四分之一决赛',
          status: 'upcoming',
          result: null,
          liveUrl: 'https://live.example.com/match3',
          hasReminder: true
        },
        {
          id: 4,
          tournament: '中国公开赛',
          opponent: '林高远',
          startTime: '2024-01-18 16:00:00',
          endTime: '2024-01-18 18:00:00',
          venue: '深圳体育中心',
          round: '八分之一决赛',
          status: 'finished',
          result: '4-2',
          highlights: 'https://highlights.example.com/match4',
          hasReminder: false
        },
        {
          id: 5,
          tournament: '世界杯',
          opponent: '奥恰洛夫',
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2小时后
          endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          venue: '德国杜塞尔多夫',
          round: '半决赛',
          status: 'ongoing',
          result: '2-1',
          liveUrl: 'https://live.example.com/match5',
          hasReminder: false
        }
      ]
      
      setScheduleList(mockSchedule)
    } catch (err) {
      setError(err.message || '获取赛程失败')
    } finally {
      setLoading(false)
    }
  }
  
  // 获取比赛详情
  const fetchMatchDetail = async (id) => {
    setLoading(true)
    setError(null)
    
    try {
      // const response = await scheduleAPI.getMatchDetail(id)
      // setCurrentMatch(response.data)
      
      // 模拟数据
      const mockMatch = {
        id,
        tournament: '世界乒乓球锦标赛',
        opponent: '马龙',
        startTime: '2024-02-15 19:00:00',
        endTime: '2024-02-15 21:00:00',
        venue: '北京体育馆',
        round: '决赛',
        status: 'upcoming',
        result: null,
        liveUrl: '',
        highlights: []
      }
      
      setCurrentMatch(mockMatch)
    } catch (err) {
      setError(err.message || '获取比赛详情失败')
    } finally {
      setLoading(false)
    }
  }
  
  // 设置比赛提醒
  const setMatchReminder = (matchId, reminderTime) => {
    // 实现比赛提醒功能
    const reminders = JSON.parse(localStorage.getItem('match-reminders') || '{}')
    reminders[matchId] = reminderTime
    localStorage.setItem('match-reminders', JSON.stringify(reminders))
  }
  
  // 获取比赛提醒
  const getMatchReminder = (matchId) => {
    const reminders = JSON.parse(localStorage.getItem('match-reminders') || '{}')
    return reminders[matchId]
  }
  
  return {
    // State
    scheduleList,
    currentMatch,
    loading,
    error,
    viewMode,
    isElectronicMode,
    filters,
    matchStatuses,
    
    // Computed
    upcomingMatches,
    ongoingMatches,
    finishedMatches,
    todayMatches,
    
    // Actions
    setLoading,
    setError,
    setScheduleList,
    setCurrentMatch,
    setViewMode,
    toggleElectronicMode,
    updateFilters,
    clearFilters,
    fetchSchedule,
    fetchMatchDetail,
    setMatchReminder,
    getMatchReminder
  }
})
