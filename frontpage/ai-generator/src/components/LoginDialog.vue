<template>
  <el-dialog
    v-model="visible"
    :title="isLogin ? '用户登录' : '用户注册'"
    width="400px"
    center
    @close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      size="default"
    >
      <!-- 注册时显示昵称 -->
      <el-form-item v-if="!isLogin" label="昵称" prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="请输入昵称"
          maxlength="20"
        />
      </el-form-item>

      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          maxlength="20"
        />
      </el-form-item>

      <!-- 邮箱（注册时显示） -->
      <el-form-item v-if="!isLogin" label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱"
          type="email"
        />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form-item>

      <!-- 确认密码（注册时显示） -->
      <el-form-item v-if="!isLogin" label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          placeholder="请再次输入密码"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <div class="switch-mode">
          <el-button type="text" @click="switchMode">
            {{ isLogin ? '没有账户？立即注册' : '已有账户？立即登录' }}
          </el-button>
        </div>
        <div class="action-buttons">
          <el-button @click="handleClose">取消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >
            {{ isLogin ? '登录' : '注册' }}
          </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { login, register } from '@/api/user'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

// 响应式数据
const visible = ref(props.modelValue)
const isLogin = ref(true)
const loading = ref(false)
const formRef = ref()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  nickname: ''
})

// 表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '昵称长度为2-20个字符', trigger: 'blur' }
  ]
})

// 监听props变化
watch(() => props.modelValue, (newValue) => {
  visible.value = newValue
})

// 监听visible变化
watch(visible, (newValue) => {
  emit('update:modelValue', newValue)
})

// 方法
const handleClose = () => {
  visible.value = false
  resetForm()
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  Object.assign(form, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  })
}

const switchMode = () => {
  isLogin.value = !isLogin.value
  resetForm()
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    if (isLogin.value) {
      // 登录
      const response = await login({
        login: form.username,
        password: form.password
      })

      if (response.success) {
        // 保存token
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        ElMessage.success('登录成功')
        emit('success', response.user)
        handleClose()
      } else {
        ElMessage.error(response.error || '登录失败')
      }
    } else {
      // 注册
      const response = await register({
        username: form.username,
        email: form.email,
        password: form.password,
        nickname: form.nickname
      })

      if (response.success) {
        ElMessage.success('注册成功，请登录')
        isLogin.value = true
        form.password = ''
        form.confirmPassword = ''
      } else {
        ElMessage.error(response.error || '注册失败')
      }
    }
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error(error.message || '操作失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.switch-mode {
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

:deep(.el-dialog__header) {
  text-align: center;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}
</style>
