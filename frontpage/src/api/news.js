import ApiService from './index'

// 新闻API服务
class NewsAPI {
  // 获取新闻列表
  static getNews(params = {}) {
    return ApiService.get('/api/news', params)
  }
  
  // 获取新闻详情
  static getNewsDetail(id) {
    return ApiService.get(`/api/news/${id}`)
  }
  
  // 搜索新闻
  static searchNews(keyword, params = {}) {
    return ApiService.get('/api/news/search', {
      keyword,
      ...params
    })
  }
  
  // 获取新闻分类
  static getNewsCategories() {
    return ApiService.get('/api/news/categories')
  }
  
  // 获取热门新闻
  static getHotNews(limit = 10) {
    return ApiService.get('/api/news/hot', { limit })
  }
  
  // 获取最新新闻
  static getLatestNews(limit = 10) {
    return ApiService.get('/api/news/latest', { limit })
  }
  
  // 增加新闻阅读量
  static incrementReadCount(id) {
    return ApiService.post(`/api/news/${id}/read`)
  }
  
  // 点赞新闻
  static likeNews(id) {
    return ApiService.post(`/api/news/${id}/like`)
  }
  
  // 取消点赞
  static unlikeNews(id) {
    return ApiService.delete(`/api/news/${id}/like`)
  }
  
  // 收藏新闻
  static favoriteNews(id) {
    return ApiService.post(`/api/news/${id}/favorite`)
  }
  
  // 取消收藏
  static unfavoriteNews(id) {
    return ApiService.delete(`/api/news/${id}/favorite`)
  }
  
  // 举报新闻
  static reportNews(id, reason) {
    return ApiService.post(`/api/news/${id}/report`, { reason })
  }
  
  // 获取相关新闻
  static getRelatedNews(id, limit = 5) {
    return ApiService.get(`/api/news/${id}/related`, { limit })
  }
  
  // 获取新闻评论
  static getNewsComments(id, params = {}) {
    return ApiService.get(`/api/news/${id}/comments`, params)
  }
  
  // 添加新闻评论
  static addNewsComment(id, content) {
    return ApiService.post(`/api/news/${id}/comments`, { content })
  }
  
  // 删除新闻评论
  static deleteNewsComment(newsId, commentId) {
    return ApiService.delete(`/api/news/${newsId}/comments/${commentId}`)
  }
}

export default NewsAPI
