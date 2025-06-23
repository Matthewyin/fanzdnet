import ApiService from './index'

// 用户API服务
class UserAPI {
  // 用户注册
  static register(userData) {
    return ApiService.post('/api/auth/register', userData)
  }
  
  // 用户登录
  static login(credentials) {
    return ApiService.post('/api/auth/login', credentials)
  }
  
  // 用户登出
  static logout() {
    return ApiService.post('/api/auth/logout')
  }
  
  // 刷新token
  static refreshToken() {
    return ApiService.post('/api/auth/refresh')
  }
  
  // 获取用户信息
  static getUserInfo() {
    return ApiService.get('/api/user/profile')
  }
  
  // 更新用户信息
  static updateUserInfo(userData) {
    return ApiService.put('/api/user/profile', userData)
  }
  
  // 上传头像
  static uploadAvatar(formData) {
    return ApiService.upload('/api/user/avatar', formData)
  }
  
  // 修改密码
  static changePassword(passwordData) {
    return ApiService.post('/api/user/change-password', passwordData)
  }
  
  // 忘记密码
  static forgotPassword(email) {
    return ApiService.post('/api/auth/forgot-password', { email })
  }
  
  // 重置密码
  static resetPassword(token, newPassword) {
    return ApiService.post('/api/auth/reset-password', { token, newPassword })
  }
  
  // 验证邮箱
  static verifyEmail(token) {
    return ApiService.post('/api/auth/verify-email', { token })
  }
  
  // 发送验证邮箱
  static sendVerificationEmail() {
    return ApiService.post('/api/auth/send-verification')
  }
  
  // 绑定手机号
  static bindPhone(phoneData) {
    return ApiService.post('/api/user/bind-phone', phoneData)
  }
  
  // 解绑手机号
  static unbindPhone() {
    return ApiService.delete('/api/user/bind-phone')
  }
  
  // 获取用户统计信息
  static getUserStats() {
    return ApiService.get('/api/user/stats')
  }
  
  // 获取用户等级信息
  static getUserLevel() {
    return ApiService.get('/api/user/level')
  }
  
  // 获取用户积分记录
  static getPointsHistory(params = {}) {
    return ApiService.get('/api/user/points/history', params)
  }
  
  // 签到
  static checkIn() {
    return ApiService.post('/api/user/checkin')
  }
  
  // 获取签到记录
  static getCheckInHistory(params = {}) {
    return ApiService.get('/api/user/checkin/history', params)
  }
  
  // 获取用户权限
  static getUserPermissions() {
    return ApiService.get('/api/user/permissions')
  }
  
  // 获取用户设置
  static getUserSettings() {
    return ApiService.get('/api/user/settings')
  }
  
  // 更新用户设置
  static updateUserSettings(settings) {
    return ApiService.put('/api/user/settings', settings)
  }
  
  // 获取用户通知
  static getUserNotifications(params = {}) {
    return ApiService.get('/api/user/notifications', params)
  }
  
  // 标记通知为已读
  static markNotificationAsRead(notificationId) {
    return ApiService.put(`/api/user/notifications/${notificationId}/read`)
  }
  
  // 批量标记通知为已读
  static markAllNotificationsAsRead() {
    return ApiService.put('/api/user/notifications/read-all')
  }
  
  // 删除通知
  static deleteNotification(notificationId) {
    return ApiService.delete(`/api/user/notifications/${notificationId}`)
  }
  
  // 获取用户收藏
  static getUserFavorites(type, params = {}) {
    return ApiService.get('/api/user/favorites', { type, ...params })
  }
  
  // 添加收藏
  static addFavorite(type, itemId) {
    return ApiService.post('/api/user/favorites', { type, itemId })
  }
  
  // 删除收藏
  static removeFavorite(type, itemId) {
    return ApiService.delete('/api/user/favorites', { data: { type, itemId } })
  }
  
  // 获取用户关注列表
  static getUserFollowing(params = {}) {
    return ApiService.get('/api/user/following', params)
  }
  
  // 获取用户粉丝列表
  static getUserFollowers(params = {}) {
    return ApiService.get('/api/user/followers', params)
  }
  
  // 关注用户
  static followUser(userId) {
    return ApiService.post(`/api/user/follow/${userId}`)
  }
  
  // 取消关注用户
  static unfollowUser(userId) {
    return ApiService.delete(`/api/user/follow/${userId}`)
  }
  
  // 获取用户活动记录
  static getUserActivity(params = {}) {
    return ApiService.get('/api/user/activity', params)
  }
  
  // 注销账户
  static deleteAccount(password) {
    return ApiService.delete('/api/user/account', { data: { password } })
  }
  
  // 获取账户安全日志
  static getSecurityLogs(params = {}) {
    return ApiService.get('/api/user/security-logs', params)
  }
  
  // 启用两步验证
  static enableTwoFactor() {
    return ApiService.post('/api/user/two-factor/enable')
  }
  
  // 禁用两步验证
  static disableTwoFactor(code) {
    return ApiService.post('/api/user/two-factor/disable', { code })
  }
  
  // 验证两步验证码
  static verifyTwoFactor(code) {
    return ApiService.post('/api/user/two-factor/verify', { code })
  }
  
  // 获取用户徽章
  static getUserBadges() {
    return ApiService.get('/api/user/badges')
  }
  
  // 获取用户成就
  static getUserAchievements() {
    return ApiService.get('/api/user/achievements')
  }
  
  // 反馈建议
  static submitFeedback(feedback) {
    return ApiService.post('/api/user/feedback', feedback)
  }
  
  // 举报用户
  static reportUser(userId, reason) {
    return ApiService.post(`/api/user/report/${userId}`, { reason })
  }
  
  // 拉黑用户
  static blockUser(userId) {
    return ApiService.post(`/api/user/block/${userId}`)
  }
  
  // 取消拉黑用户
  static unblockUser(userId) {
    return ApiService.delete(`/api/user/block/${userId}`)
  }
  
  // 获取拉黑列表
  static getBlockedUsers(params = {}) {
    return ApiService.get('/api/user/blocked', params)
  }
  
  // 导出用户数据
  static exportUserData() {
    return ApiService.download('/api/user/export', {}, 'user-data.json')
  }
}

export default UserAPI
