import ApiService from './index'

// 社区API服务
class CommunityAPI {
  // 获取帖子列表
  static getPosts(params = {}) {
    return ApiService.get('/api/community/posts', params)
  }
  
  // 获取帖子详情
  static getPostDetail(id) {
    return ApiService.get(`/api/community/posts/${id}`)
  }
  
  // 创建帖子
  static createPost(data) {
    return ApiService.post('/api/community/posts', data)
  }
  
  // 更新帖子
  static updatePost(id, data) {
    return ApiService.put(`/api/community/posts/${id}`, data)
  }
  
  // 删除帖子
  static deletePost(id) {
    return ApiService.delete(`/api/community/posts/${id}`)
  }
  
  // 点赞帖子
  static likePost(id) {
    return ApiService.post(`/api/community/posts/${id}/like`)
  }
  
  // 取消点赞
  static unlikePost(id) {
    return ApiService.delete(`/api/community/posts/${id}/like`)
  }
  
  // 收藏帖子
  static favoritePost(id) {
    return ApiService.post(`/api/community/posts/${id}/favorite`)
  }
  
  // 取消收藏
  static unfavoritePost(id) {
    return ApiService.delete(`/api/community/posts/${id}/favorite`)
  }
  
  // 举报帖子
  static reportPost(id, reason) {
    return ApiService.post(`/api/community/posts/${id}/report`, { reason })
  }
  
  // 置顶帖子（管理员功能）
  static pinPost(id) {
    return ApiService.post(`/api/community/posts/${id}/pin`)
  }
  
  // 取消置顶（管理员功能）
  static unpinPost(id) {
    return ApiService.delete(`/api/community/posts/${id}/pin`)
  }
  
  // 获取帖子评论
  static getPostComments(id, params = {}) {
    return ApiService.get(`/api/community/posts/${id}/comments`, params)
  }
  
  // 添加帖子评论
  static addPostComment(id, content, parentId = null) {
    return ApiService.post(`/api/community/posts/${id}/comments`, {
      content,
      parentId
    })
  }
  
  // 删除帖子评论
  static deletePostComment(postId, commentId) {
    return ApiService.delete(`/api/community/posts/${postId}/comments/${commentId}`)
  }
  
  // 点赞评论
  static likeComment(postId, commentId) {
    return ApiService.post(`/api/community/posts/${postId}/comments/${commentId}/like`)
  }
  
  // 取消点赞评论
  static unlikeComment(postId, commentId) {
    return ApiService.delete(`/api/community/posts/${postId}/comments/${commentId}/like`)
  }
  
  // 搜索帖子
  static searchPosts(keyword, params = {}) {
    return ApiService.get('/api/community/posts/search', {
      keyword,
      ...params
    })
  }
  
  // 获取热门帖子
  static getHotPosts(limit = 20) {
    return ApiService.get('/api/community/posts/hot', { limit })
  }
  
  // 获取最新帖子
  static getLatestPosts(limit = 20) {
    return ApiService.get('/api/community/posts/latest', { limit })
  }
  
  // 获取精华帖子
  static getFeaturedPosts(limit = 20) {
    return ApiService.get('/api/community/posts/featured', { limit })
  }
  
  // 获取用户的帖子
  static getUserPosts(userId, params = {}) {
    return ApiService.get(`/api/community/users/${userId}/posts`, params)
  }
  
  // 获取用户收藏的帖子
  static getUserFavorites(params = {}) {
    return ApiService.get('/api/community/favorites', params)
  }
  
  // 关注用户
  static followUser(userId) {
    return ApiService.post(`/api/community/users/${userId}/follow`)
  }
  
  // 取消关注用户
  static unfollowUser(userId) {
    return ApiService.delete(`/api/community/users/${userId}/follow`)
  }
  
  // 获取用户关注列表
  static getUserFollowing(userId, params = {}) {
    return ApiService.get(`/api/community/users/${userId}/following`, params)
  }
  
  // 获取用户粉丝列表
  static getUserFollowers(userId, params = {}) {
    return ApiService.get(`/api/community/users/${userId}/followers`, params)
  }
  
  // 获取聊天室消息
  static getChatMessages(params = {}) {
    return ApiService.get('/api/community/chat/messages', params)
  }
  
  // 发送聊天消息
  static sendChatMessage(content, type = 'text') {
    return ApiService.post('/api/community/chat/messages', {
      content,
      type
    })
  }
  
  // 删除聊天消息
  static deleteChatMessage(messageId) {
    return ApiService.delete(`/api/community/chat/messages/${messageId}`)
  }
  
  // 获取在线用户列表
  static getOnlineUsers() {
    return ApiService.get('/api/community/chat/online-users')
  }
  
  // 禁言用户（管理员功能）
  static muteUser(userId, duration) {
    return ApiService.post(`/api/community/users/${userId}/mute`, { duration })
  }
  
  // 解除禁言（管理员功能）
  static unmuteUser(userId) {
    return ApiService.delete(`/api/community/users/${userId}/mute`)
  }
  
  // 封禁用户（管理员功能）
  static banUser(userId, reason) {
    return ApiService.post(`/api/community/users/${userId}/ban`, { reason })
  }
  
  // 解封用户（管理员功能）
  static unbanUser(userId) {
    return ApiService.delete(`/api/community/users/${userId}/ban`)
  }
  
  // 获取社区统计信息
  static getCommunityStats() {
    return ApiService.get('/api/community/stats')
  }
  
  // 获取用户积分排行榜
  static getUserRanking(params = {}) {
    return ApiService.get('/api/community/ranking', params)
  }
  
  // 签到
  static checkIn() {
    return ApiService.post('/api/community/checkin')
  }
  
  // 获取签到记录
  static getCheckInHistory(params = {}) {
    return ApiService.get('/api/community/checkin/history', params)
  }
  
  // 获取帖子分类
  static getPostCategories() {
    return ApiService.get('/api/community/categories')
  }
  
  // 获取帖子标签
  static getPostTags() {
    return ApiService.get('/api/community/tags')
  }
}

export default CommunityAPI
