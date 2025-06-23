<template>
  <div class="global-dialogs">
    <!-- 登录对话框 -->
    <el-dialog
      v-model="loginVisible"
      title="用户登录"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名或邮箱"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            <el-link type="primary" @click="showForgotPassword">忘记密码？</el-link>
          </div>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="loginVisible = false">取消</el-button>
          <el-button type="primary" @click="handleLogin" :loading="loginLoading">
            登录
          </el-button>
        </div>
        <div class="register-link">
          还没有账号？
          <el-link type="primary" @click="showRegisterDialog">立即注册</el-link>
        </div>
      </template>
    </el-dialog>

    <!-- 注册对话框 -->
    <el-dialog
      v-model="registerVisible"
      title="用户注册"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="请输入邮箱"
            :prefix-icon="Message"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请确认密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item prop="agreement">
          <el-checkbox v-model="registerForm.agreement">
            我已阅读并同意
            <el-link type="primary" @click="showTerms">《用户协议》</el-link>
            和
            <el-link type="primary" @click="showPrivacy">《隐私政策》</el-link>
          </el-checkbox>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="registerVisible = false">取消</el-button>
          <el-button type="primary" @click="handleRegister" :loading="registerLoading">
            注册
          </el-button>
        </div>
        <div class="login-link">
          已有账号？
          <el-link type="primary" @click="showLoginDialog">立即登录</el-link>
        </div>
      </template>
    </el-dialog>

    <!-- 免责声明对话框 -->
    <el-dialog
      v-model="disclaimerVisible"
      title="重要声明"
      width="600px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="disclaimer-content">
        <el-alert
          title="请仔细阅读以下声明"
          type="warning"
          :closable="false"
          show-icon
        />
        
        <div class="disclaimer-text">
          <h3>网站性质声明</h3>
          <p>
            "暴力熊猫的天际樊星"是由樊振东球迷自发创建的<strong>非官方网站</strong>，
            与樊振东本人、其所属俱乐部（包括但不限于山东鲁能乒乓球俱乐部）、
            中国乒乓球协会、国际乒联(ITTF)或任何其他官方机构<strong>无任何关联</strong>。
          </p>
          
          <h3>内容声明</h3>
          <p>
            网站内容仅供球迷交流使用，不代表任何官方立场。
            我们致力于提供准确的信息，但不保证所有内容的完全准确性。
            如发现错误信息，请及时联系我们更正。
          </p>
          
          <h3>版权声明</h3>
          <p>
            网站使用的图片、视频等素材均来源于公开渠道或已获得授权。
            如有侵权，请联系我们及时处理。用户上传的内容由用户自行负责。
          </p>
        </div>
        
        <el-checkbox v-model="disclaimerAccepted" class="disclaimer-checkbox">
          我已仔细阅读并理解上述声明，同意继续使用本网站
        </el-checkbox>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleDisclaimerReject">不同意</el-button>
          <el-button 
            type="primary" 
            @click="handleDisclaimerAccept"
            :disabled="!disclaimerAccepted"
          >
            同意并继续
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useAppStore, useUserStore } from '@/stores'
import { User, Lock, Message } from '@element-plus/icons-vue'

const appStore = useAppStore()
const userStore = useUserStore()

// 对话框显示状态
const loginVisible = ref(false)
const registerVisible = ref(false)
const disclaimerVisible = ref(false)

// 加载状态
const loginLoading = ref(false)
const registerLoading = ref(false)

// 免责声明
const disclaimerAccepted = ref(false)

// 表单引用
const loginFormRef = ref()
const registerFormRef = ref()

// 登录表单
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

// 注册表单
const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名或邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  agreement: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请阅读并同意用户协议和隐私政策'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

// 方法
const showLoginDialog = () => {
  registerVisible.value = false
  loginVisible.value = true
  resetLoginForm()
}

const showRegisterDialog = () => {
  loginVisible.value = false
  registerVisible.value = true
  resetRegisterForm()
}

const showDisclaimerDialog = () => {
  disclaimerVisible.value = true
  disclaimerAccepted.value = false
}

const resetLoginForm = () => {
  loginForm.username = ''
  loginForm.password = ''
  loginForm.remember = false
  loginFormRef.value?.clearValidate()
}

const resetRegisterForm = () => {
  registerForm.username = ''
  registerForm.email = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  registerForm.agreement = false
  registerFormRef.value?.clearValidate()
}

const handleLogin = async () => {
  try {
    const valid = await loginFormRef.value.validate()
    if (!valid) return
    
    loginLoading.value = true
    
    // 调用登录API
    // await userStore.login(loginForm)
    
    // 模拟登录
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('登录成功')
    loginVisible.value = false
    resetLoginForm()
    
  } catch (error) {
    ElMessage.error(error.message || '登录失败')
  } finally {
    loginLoading.value = false
  }
}

const handleRegister = async () => {
  try {
    const valid = await registerFormRef.value.validate()
    if (!valid) return
    
    registerLoading.value = true
    
    // 调用注册API
    // await userStore.register(registerForm)
    
    // 模拟注册
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('注册成功，请查收验证邮件')
    registerVisible.value = false
    resetRegisterForm()
    
  } catch (error) {
    ElMessage.error(error.message || '注册失败')
  } finally {
    registerLoading.value = false
  }
}

const handleDisclaimerAccept = () => {
  appStore.acceptDisclaimer()
  disclaimerVisible.value = false
  ElMessage.success('感谢您的理解和支持')
}

const handleDisclaimerReject = () => {
  // 用户拒绝声明，可以跳转到其他页面或关闭网站
  window.location.href = 'https://www.baidu.com'
}

const showForgotPassword = () => {
  ElMessage.info('忘记密码功能开发中')
}

const showTerms = () => {
  ElMessage.info('用户协议页面开发中')
}

const showPrivacy = () => {
  ElMessage.info('隐私政策页面开发中')
}

// 暴露方法给父组件调用
defineExpose({
  showLoginDialog,
  showRegisterDialog,
  showDisclaimerDialog
})
</script>

<style scoped>
.disclaimer-content {
  max-height: 400px;
  overflow-y: auto;
}

.disclaimer-text {
  margin: 20px 0;
  line-height: 1.6;
}

.disclaimer-text h3 {
  color: #303133;
  margin: 16px 0 8px 0;
  font-size: 16px;
}

.disclaimer-text p {
  color: #606266;
  margin: 8px 0;
  font-size: 14px;
}

.disclaimer-text strong {
  color: #e6a23c;
  font-weight: 600;
}

.disclaimer-checkbox {
  margin-top: 16px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.register-link,
.login-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #606266;
}
</style>
