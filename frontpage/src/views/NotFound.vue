<template>
  <div class="not-found">
    <el-container>
      <el-main>
        <div class="error-content">
          <el-result
            icon="warning"
            title="404"
            sub-title="抱歉，您访问的页面不存在"
          >
            <template #extra>
              <el-button type="primary" @click="goHome">返回首页</el-button>
            </template>
          </el-result>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  text-align: center;
}
</style>
