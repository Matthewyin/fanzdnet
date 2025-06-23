import ApiService from './index'

// 图库API服务
class GalleryAPI {
  // 获取图片列表
  static getImages(params = {}) {
    return ApiService.get('/api/gallery', params)
  }
  
  // 获取图片详情
  static getImageDetail(id) {
    return ApiService.get(`/api/gallery/${id}`)
  }
  
  // 上传图片
  static uploadImage(formData, config = {}) {
    return ApiService.upload('/api/gallery/upload', formData, config)
  }
  
  // 批量上传图片
  static batchUploadImages(formData, config = {}) {
    return ApiService.upload('/api/gallery/batch-upload', formData, config)
  }
  
  // 删除图片
  static deleteImage(id) {
    return ApiService.delete(`/api/gallery/${id}`)
  }
  
  // 更新图片信息
  static updateImage(id, data) {
    return ApiService.put(`/api/gallery/${id}`, data)
  }
  
  // 获取图片分类
  static getImageCategories() {
    return ApiService.get('/api/gallery/categories')
  }
  
  // 搜索图片
  static searchImages(keyword, params = {}) {
    return ApiService.get('/api/gallery/search', {
      keyword,
      ...params
    })
  }
  
  // 按标签搜索图片
  static searchImagesByTag(tag, params = {}) {
    return ApiService.get('/api/gallery/search/tag', {
      tag,
      ...params
    })
  }
  
  // 获取热门图片
  static getPopularImages(limit = 20) {
    return ApiService.get('/api/gallery/popular', { limit })
  }
  
  // 获取最新图片
  static getLatestImages(limit = 20) {
    return ApiService.get('/api/gallery/latest', { limit })
  }
  
  // 点赞图片
  static likeImage(id) {
    return ApiService.post(`/api/gallery/${id}/like`)
  }
  
  // 取消点赞
  static unlikeImage(id) {
    return ApiService.delete(`/api/gallery/${id}/like`)
  }
  
  // 收藏图片
  static favoriteImage(id) {
    return ApiService.post(`/api/gallery/${id}/favorite`)
  }
  
  // 取消收藏
  static unfavoriteImage(id) {
    return ApiService.delete(`/api/gallery/${id}/favorite`)
  }
  
  // 举报图片
  static reportImage(id, reason) {
    return ApiService.post(`/api/gallery/${id}/report`, { reason })
  }
  
  // 增加图片浏览量
  static incrementViewCount(id) {
    return ApiService.post(`/api/gallery/${id}/view`)
  }
  
  // 获取用户上传的图片
  static getUserImages(userId, params = {}) {
    return ApiService.get(`/api/gallery/user/${userId}`, params)
  }
  
  // 获取用户收藏的图片
  static getUserFavorites(params = {}) {
    return ApiService.get('/api/gallery/favorites', params)
  }
  
  // 获取图片评论
  static getImageComments(id, params = {}) {
    return ApiService.get(`/api/gallery/${id}/comments`, params)
  }
  
  // 添加图片评论
  static addImageComment(id, content) {
    return ApiService.post(`/api/gallery/${id}/comments`, { content })
  }
  
  // 删除图片评论
  static deleteImageComment(imageId, commentId) {
    return ApiService.delete(`/api/gallery/${imageId}/comments/${commentId}`)
  }
  
  // 获取相关图片
  static getRelatedImages(id, limit = 10) {
    return ApiService.get(`/api/gallery/${id}/related`, { limit })
  }
  
  // 设置图片为公开/私有
  static setImageVisibility(id, isPublic) {
    return ApiService.patch(`/api/gallery/${id}/visibility`, { isPublic })
  }
  
  // 获取图片标签
  static getImageTags() {
    return ApiService.get('/api/gallery/tags')
  }
  
  // 添加图片标签
  static addImageTag(id, tag) {
    return ApiService.post(`/api/gallery/${id}/tags`, { tag })
  }
  
  // 删除图片标签
  static removeImageTag(id, tag) {
    return ApiService.delete(`/api/gallery/${id}/tags/${tag}`)
  }
  
  // 获取图片EXIF信息
  static getImageExif(id) {
    return ApiService.get(`/api/gallery/${id}/exif`)
  }
  
  // 下载图片
  static downloadImage(id, size = 'original') {
    return ApiService.download(`/api/gallery/${id}/download`, { size }, `image-${id}.jpg`)
  }
  
  // 批量下载图片
  static batchDownloadImages(ids) {
    return ApiService.download('/api/gallery/batch-download', { ids }, 'images.zip')
  }
  
  // 获取图片统计信息
  static getImageStats(id) {
    return ApiService.get(`/api/gallery/${id}/stats`)
  }
  
  // 审核图片（管理员功能）
  static approveImage(id) {
    return ApiService.post(`/api/gallery/${id}/approve`)
  }
  
  // 拒绝图片（管理员功能）
  static rejectImage(id, reason) {
    return ApiService.post(`/api/gallery/${id}/reject`, { reason })
  }
  
  // 获取待审核图片（管理员功能）
  static getPendingImages(params = {}) {
    return ApiService.get('/api/gallery/pending', params)
  }
}

export default GalleryAPI
