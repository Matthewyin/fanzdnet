import ApiService from './index'

// AI生成器API服务
class AIGeneratorAPI {
  // 生成应援物
  static generateItem(params) {
    return ApiService.post('/api/ai-generator/generate', params)
  }
  
  // 获取生成历史
  static getGenerationHistory(params = {}) {
    return ApiService.get('/api/ai-generator/history', params)
  }
  
  // 获取生成详情
  static getGenerationDetail(id) {
    return ApiService.get(`/api/ai-generator/history/${id}`)
  }
  
  // 删除生成记录
  static deleteGeneration(id) {
    return ApiService.delete(`/api/ai-generator/history/${id}`)
  }
  
  // 重新生成
  static regenerateItem(id) {
    return ApiService.post(`/api/ai-generator/regenerate/${id}`)
  }
  
  // 获取模板列表
  static getTemplates(params = {}) {
    return ApiService.get('/api/ai-generator/templates', params)
  }
  
  // 获取模板详情
  static getTemplateDetail(id) {
    return ApiService.get(`/api/ai-generator/templates/${id}`)
  }
  
  // 保存为模板
  static saveAsTemplate(data) {
    return ApiService.post('/api/ai-generator/templates', data)
  }
  
  // 删除模板
  static deleteTemplate(id) {
    return ApiService.delete(`/api/ai-generator/templates/${id}`)
  }
  
  // 使用模板
  static useTemplate(id) {
    return ApiService.post(`/api/ai-generator/templates/${id}/use`)
  }
  
  // 点赞模板
  static likeTemplate(id) {
    return ApiService.post(`/api/ai-generator/templates/${id}/like`)
  }
  
  // 取消点赞模板
  static unlikeTemplate(id) {
    return ApiService.delete(`/api/ai-generator/templates/${id}/like`)
  }
  
  // 获取热门模板
  static getPopularTemplates(limit = 20) {
    return ApiService.get('/api/ai-generator/templates/popular', { limit })
  }
  
  // 获取最新模板
  static getLatestTemplates(limit = 20) {
    return ApiService.get('/api/ai-generator/templates/latest', { limit })
  }
  
  // 搜索模板
  static searchTemplates(keyword, params = {}) {
    return ApiService.get('/api/ai-generator/templates/search', {
      keyword,
      ...params
    })
  }
  
  // 获取用户的模板
  static getUserTemplates(params = {}) {
    return ApiService.get('/api/ai-generator/templates/mine', params)
  }
  
  // 分享生成结果
  static shareGeneration(id, platform) {
    return ApiService.post(`/api/ai-generator/history/${id}/share`, { platform })
  }
  
  // 下载生成结果
  static downloadGeneration(id, format = 'png') {
    return ApiService.download(`/api/ai-generator/history/${id}/download`, 
      { format }, 
      `fzd-support-${id}.${format}`
    )
  }
  
  // 批量下载
  static batchDownload(ids) {
    return ApiService.download('/api/ai-generator/batch-download', 
      { ids }, 
      'fzd-support-items.zip'
    )
  }
  
  // 获取应援物类型
  static getItemTypes() {
    return ApiService.get('/api/ai-generator/item-types')
  }
  
  // 获取设计风格
  static getDesignStyles() {
    return ApiService.get('/api/ai-generator/design-styles')
  }
  
  // 获取设计元素
  static getDesignElements() {
    return ApiService.get('/api/ai-generator/design-elements')
  }
  
  // 获取颜色方案
  static getColorSchemes() {
    return ApiService.get('/api/ai-generator/color-schemes')
  }
  
  // 获取用户每日使用情况
  static getDailyUsage() {
    return ApiService.get('/api/ai-generator/daily-usage')
  }
  
  // 获取用户使用统计
  static getUserStats() {
    return ApiService.get('/api/ai-generator/user-stats')
  }
  
  // 反馈生成结果
  static feedbackGeneration(id, rating, comment = '') {
    return ApiService.post(`/api/ai-generator/history/${id}/feedback`, {
      rating,
      comment
    })
  }
  
  // 举报生成内容
  static reportGeneration(id, reason) {
    return ApiService.post(`/api/ai-generator/history/${id}/report`, { reason })
  }
  
  // 获取生成进度
  static getGenerationProgress(taskId) {
    return ApiService.get(`/api/ai-generator/progress/${taskId}`)
  }
  
  // 取消生成任务
  static cancelGeneration(taskId) {
    return ApiService.delete(`/api/ai-generator/tasks/${taskId}`)
  }
  
  // 预览生成效果
  static previewGeneration(params) {
    return ApiService.post('/api/ai-generator/preview', params)
  }
  
  // 获取推荐参数
  static getRecommendedParams(itemType) {
    return ApiService.get('/api/ai-generator/recommendations', { itemType })
  }
  
  // 获取生成队列状态
  static getQueueStatus() {
    return ApiService.get('/api/ai-generator/queue-status')
  }
  
  // 设置生成偏好
  static setGenerationPreferences(preferences) {
    return ApiService.post('/api/ai-generator/preferences', preferences)
  }
  
  // 获取生成偏好
  static getGenerationPreferences() {
    return ApiService.get('/api/ai-generator/preferences')
  }
  
  // 获取AI模型信息
  static getModelInfo() {
    return ApiService.get('/api/ai-generator/model-info')
  }
  
  // 获取生成示例
  static getGenerationExamples(itemType) {
    return ApiService.get('/api/ai-generator/examples', { itemType })
  }
  
  // 上传参考图片
  static uploadReferenceImage(formData) {
    return ApiService.upload('/api/ai-generator/reference-upload', formData)
  }
  
  // 基于图片生成
  static generateFromImage(imageId, params) {
    return ApiService.post('/api/ai-generator/generate-from-image', {
      imageId,
      ...params
    })
  }
  
  // 获取生成提示词
  static getGenerationPrompts(itemType) {
    return ApiService.get('/api/ai-generator/prompts', { itemType })
  }
  
  // 自定义提示词生成
  static generateWithPrompt(prompt, params) {
    return ApiService.post('/api/ai-generator/generate-with-prompt', {
      prompt,
      ...params
    })
  }
}

export default AIGeneratorAPI
