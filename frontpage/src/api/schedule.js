import ApiService from './index'

// 赛程API服务
class ScheduleAPI {
  // 获取赛程列表
  static getSchedule(params = {}) {
    return ApiService.get('/api/schedule', params)
  }
  
  // 获取比赛详情
  static getMatchDetail(id) {
    return ApiService.get(`/api/schedule/${id}`)
  }
  
  // 获取即将开始的比赛
  static getUpcomingMatches(limit = 10) {
    return ApiService.get('/api/schedule/upcoming', { limit })
  }
  
  // 获取正在进行的比赛
  static getOngoingMatches() {
    return ApiService.get('/api/schedule/ongoing')
  }
  
  // 获取已结束的比赛
  static getFinishedMatches(params = {}) {
    return ApiService.get('/api/schedule/finished', params)
  }
  
  // 获取今日比赛
  static getTodayMatches() {
    return ApiService.get('/api/schedule/today')
  }
  
  // 获取本周比赛
  static getWeekMatches() {
    return ApiService.get('/api/schedule/week')
  }
  
  // 获取本月比赛
  static getMonthMatches(year, month) {
    return ApiService.get('/api/schedule/month', { year, month })
  }
  
  // 获取比赛统计
  static getMatchStats(params = {}) {
    return ApiService.get('/api/schedule/stats', params)
  }
  
  // 设置比赛提醒
  static setMatchReminder(matchId, reminderTime) {
    return ApiService.post(`/api/schedule/${matchId}/reminder`, {
      reminderTime
    })
  }
  
  // 取消比赛提醒
  static cancelMatchReminder(matchId) {
    return ApiService.delete(`/api/schedule/${matchId}/reminder`)
  }
  
  // 获取用户的比赛提醒
  static getUserReminders() {
    return ApiService.get('/api/schedule/reminders')
  }
  
  // 关注比赛
  static followMatch(matchId) {
    return ApiService.post(`/api/schedule/${matchId}/follow`)
  }
  
  // 取消关注比赛
  static unfollowMatch(matchId) {
    return ApiService.delete(`/api/schedule/${matchId}/follow`)
  }
  
  // 获取比赛直播链接
  static getMatchLiveUrl(matchId) {
    return ApiService.get(`/api/schedule/${matchId}/live`)
  }
  
  // 获取比赛精彩回放
  static getMatchHighlights(matchId) {
    return ApiService.get(`/api/schedule/${matchId}/highlights`)
  }
  
  // 获取比赛实时比分
  static getMatchScore(matchId) {
    return ApiService.get(`/api/schedule/${matchId}/score`)
  }
  
  // 订阅比赛更新
  static subscribeMatchUpdates(matchId) {
    return ApiService.post(`/api/schedule/${matchId}/subscribe`)
  }
  
  // 取消订阅比赛更新
  static unsubscribeMatchUpdates(matchId) {
    return ApiService.delete(`/api/schedule/${matchId}/subscribe`)
  }
  
  // 导出个人赛程日历
  static exportCalendar(format = 'ics') {
    return ApiService.download('/api/schedule/export', { format }, `fzd-schedule.${format}`)
  }
  
  // 获取赛事列表
  static getTournaments() {
    return ApiService.get('/api/schedule/tournaments')
  }
  
  // 获取对手信息
  static getOpponents() {
    return ApiService.get('/api/schedule/opponents')
  }
}

export default ScheduleAPI
