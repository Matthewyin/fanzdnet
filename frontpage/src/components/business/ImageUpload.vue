<template>
  <div class="image-upload">
    <el-card class="upload-card">
      <template #header>
        <div class="upload-header">
          <h3>上传图片</h3>
          <span class="upload-tips">支持 JPG、PNG、GIF 格式，单张图片不超过 5MB</span>
        </div>
      </template>

      <div class="upload-content">
        <!-- 上传区域 -->
        <el-upload
          ref="uploadRef"
          :action="uploadAction"
          :headers="uploadHeaders"
          :data="uploadData"
          :multiple="true"
          :limit="maxFiles"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :on-progress="handleUploadProgress"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :auto-upload="false"
          list-type="picture-card"
          class="upload-area"
        >
          <div class="upload-trigger">
            <el-icon class="upload-icon"><Plus /></el-icon>
            <div class="upload-text">点击上传</div>
          </div>
        </el-upload>

        <!-- 上传表单 -->
        <el-form
          v-if="fileList.length > 0"
          :model="uploadForm"
          :rules="uploadRules"
          ref="uploadFormRef"
          label-width="80px"
          class="upload-form"
        >
          <el-form-item label="图片标题" prop="title">
            <el-input
              v-model="uploadForm.title"
              placeholder="请输入图片标题"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="图片描述" prop="description">
            <el-input
              v-model="uploadForm.description"
              type="textarea"
              placeholder="请输入图片描述"
              :rows="3"
              maxlength="200"
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="分类" prop="category">
            <el-select v-model="uploadForm.category" placeholder="请选择分类">
              <el-option
                v-for="category in categories"
                :key="category.value"
                :label="category.label"
                :value="category.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="标签">
            <div class="tags-input">
              <el-tag
                v-for="tag in uploadForm.tags"
                :key="tag"
                closable
                @close="removeTag(tag)"
                class="tag-item"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="showTagInput"
                ref="tagInputRef"
                v-model="newTag"
                size="small"
                @keyup.enter="addTag"
                @blur="addTag"
                placeholder="输入标签"
                class="tag-input"
              />
              <el-button
                v-else
                size="small"
                @click="showTagInput = true"
                class="add-tag-btn"
              >
                + 添加标签
              </el-button>
            </div>
          </el-form-item>

          <el-form-item label="可见性">
            <el-radio-group v-model="uploadForm.isPublic">
              <el-radio :value="true">公开</el-radio>
              <el-radio :value="false">私有</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <!-- 上传进度 -->
        <div v-if="uploading" class="upload-progress">
          <el-progress
            :percentage="uploadProgress"
            :status="uploadStatus"
            :stroke-width="8"
          />
          <div class="progress-text">
            {{ uploadProgressText }}
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="upload-actions" v-if="fileList.length > 0">
          <el-button @click="clearFiles">清空</el-button>
          <el-button 
            type="primary" 
            @click="submitUpload"
            :loading="uploading"
            :disabled="fileList.length === 0"
          >
            {{ uploading ? '上传中...' : '开始上传' }}
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  maxFiles: {
    type: Number,
    default: 9
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024 // 5MB
  }
})

const emit = defineEmits(['upload-success', 'upload-error'])

// 响应式数据
const uploadRef = ref()
const uploadFormRef = ref()
const tagInputRef = ref()
const fileList = ref([])
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref('')
const showTagInput = ref(false)
const newTag = ref('')

// 上传配置
const uploadAction = '/api/gallery/upload'
const uploadHeaders = computed(() => ({
  'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
}))
const uploadData = computed(() => uploadForm)

// 表单数据
const uploadForm = reactive({
  title: '',
  description: '',
  category: '',
  tags: [],
  isPublic: true
})

// 分类选项
const categories = ref([
  { value: 'match', label: '比赛' },
  { value: 'training', label: '训练' },
  { value: 'life', label: '生活' },
  { value: 'award', label: '颁奖' },
  { value: 'fan', label: '球迷' }
])

// 表单验证规则
const uploadRules = {
  title: [
    { required: true, message: '请输入图片标题', trigger: 'blur' },
    { min: 2, max: 50, message: '标题长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ]
}

// 计算属性
const uploadProgressText = computed(() => {
  if (uploadProgress.value === 100) {
    return '上传完成'
  } else if (uploading.value) {
    return `上传中... ${uploadProgress.value}%`
  }
  return ''
})

// 方法
const beforeUpload = (file) => {
  // 检查文件类型
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }

  // 检查文件大小
  const isLtMaxSize = file.size < props.maxSize
  if (!isLtMaxSize) {
    ElMessage.error(`图片大小不能超过 ${props.maxSize / 1024 / 1024}MB!`)
    return false
  }

  return true
}

const handleUploadSuccess = (response, file) => {
  ElMessage.success('上传成功!')
  emit('upload-success', response, file)
  
  // 重置表单
  resetForm()
}

const handleUploadError = (error, file) => {
  ElMessage.error('上传失败!')
  emit('upload-error', error, file)
  uploading.value = false
}

const handleUploadProgress = (event, file) => {
  uploadProgress.value = Math.round(event.percent)
}

const handleRemove = (file) => {
  const index = fileList.value.findIndex(item => item.uid === file.uid)
  if (index > -1) {
    fileList.value.splice(index, 1)
  }
}

const handleExceed = (files) => {
  ElMessage.warning(`最多只能上传 ${props.maxFiles} 张图片`)
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !uploadForm.tags.includes(tag)) {
    if (uploadForm.tags.length >= 5) {
      ElMessage.warning('最多只能添加5个标签')
      return
    }
    uploadForm.tags.push(tag)
  }
  newTag.value = ''
  showTagInput.value = false
}

const removeTag = (tag) => {
  const index = uploadForm.tags.indexOf(tag)
  if (index > -1) {
    uploadForm.tags.splice(index, 1)
  }
}

const clearFiles = () => {
  uploadRef.value.clearFiles()
  fileList.value = []
  resetForm()
}

const resetForm = () => {
  uploadForm.title = ''
  uploadForm.description = ''
  uploadForm.category = ''
  uploadForm.tags = []
  uploadForm.isPublic = true
  uploadFormRef.value?.clearValidate()
  uploading.value = false
  uploadProgress.value = 0
  uploadStatus.value = ''
}

const submitUpload = async () => {
  try {
    // 验证表单
    const valid = await uploadFormRef.value.validate()
    if (!valid) return

    if (fileList.value.length === 0) {
      ElMessage.warning('请先选择要上传的图片')
      return
    }

    uploading.value = true
    uploadProgress.value = 0
    uploadStatus.value = ''

    // 开始上传
    uploadRef.value.submit()
    
  } catch (error) {
    uploading.value = false
    ElMessage.error('上传失败')
  }
}

// 监听标签输入框显示
const watchTagInput = () => {
  if (showTagInput.value) {
    nextTick(() => {
      tagInputRef.value?.focus()
    })
  }
}
</script>

<style scoped>
.image-upload {
  margin-bottom: 20px;
}

.upload-card {
  border-radius: 8px;
}

.upload-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.upload-header h3 {
  margin: 0;
  color: #303133;
}

.upload-tips {
  font-size: 12px;
  color: #909399;
}

.upload-content {
  padding: 0;
}

.upload-area {
  margin-bottom: 20px;
}

.upload-area :deep(.el-upload--picture-card) {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}

.upload-area :deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}

.upload-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8c939d;
  transition: color 0.3s ease;
}

.upload-trigger:hover {
  color: #409eff;
}

.upload-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 14px;
}

.upload-form {
  margin-bottom: 20px;
}

.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.tag-item {
  margin: 0;
}

.tag-input {
  width: 100px;
}

.add-tag-btn {
  border-style: dashed;
}

.upload-progress {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.progress-text {
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  color: #606266;
}

.upload-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .upload-area :deep(.el-upload--picture-card) {
    width: 100px;
    height: 100px;
  }
  
  .upload-area :deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 100px;
    height: 100px;
  }
  
  .upload-icon {
    font-size: 24px;
  }
  
  .upload-text {
    font-size: 12px;
  }
  
  .upload-actions {
    flex-direction: column;
  }
}
</style>
