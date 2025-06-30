<template>
  <div class="site-logo">
    <div class="logo-container" @click="goHome">
      <img
        src="/images/fanzd-logo-compact.svg"
        alt="FANZD.NET - 樊振东球迷网站"
        class="logo-image"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}
</script>

<style scoped>
.site-logo {
  padding: 25px 0;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.site-logo::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
  pointer-events: none;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo-container:hover {
  transform: translateY(-2px);
}

.logo-image {
  width: 300px;
  height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25));
  transition: all 0.3s ease;
}

.logo-container:hover .logo-image {
  transform: scale(1.02);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .site-logo {
    padding: 15px 0;
  }

  .logo-image {
    width: 250px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .site-logo {
    padding: 10px 0;
  }

  .logo-image {
    width: 200px;
    height: 80px;
  }
}

/* 动画效果 */
@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
}

.logo-image {
  animation: logoFloat 3s ease-in-out infinite;
}

/* 鼠标悬停时停止动画 */
.logo-container:hover .logo-image {
  animation: none;
}
</style>
