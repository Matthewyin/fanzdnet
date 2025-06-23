<script setup>
import AppLayout from './components/layout/AppLayout.vue'
</script>

<template>
  <AppLayout />
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 超强力边框移除 - 覆盖所有可能的样式 */
html, body, #app, * {
  border: 0 !important;
  outline: 0 !important;
  box-shadow: none !important;
}

/* 移除所有可能的蓝色样式 */
*[style*="border: 1px solid"],
*[style*="border: 2px solid"],
*[style*="border-color"],
*[style*="outline"],
*[style*="box-shadow"] {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* 全局移除所有可能的蓝色边框和焦点样式 */
*,
*::before,
*::after {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

*:focus,
*:active,
*:hover,
*:focus-visible,
*:focus-within {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
  border-color: transparent !important;
}

/* 特别针对链接和按钮 */
a,
button,
.el-button,
.brand-link,
.brand-text,
.brand-title,
h1,
h2,
h3,
p,
div {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

a:focus,
a:active,
button:focus,
button:active,
.el-button:focus,
.el-button:active {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* 强制移除所有可能的蓝色样式 */
[style*="border"],
[style*="outline"],
[style*="box-shadow"] {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* 移除浏览器默认的焦点环 */
:focus {
  outline: 0 !important;
  outline-offset: 0 !important;
}

/* 移除 webkit 浏览器的默认样式 */
*:focus {
  -webkit-tap-highlight-color: transparent !important;
  -webkit-focus-ring-color: transparent !important;
}

/* 防止垂直文字显示 */
.brand-title,
.hero-title {
  writing-mode: horizontal-tb !important;
  text-orientation: mixed !important;
}

/* 强制移除 Element Plus 容器的默认限制 */
.el-main {
  padding: 0 !important;
}

.el-container {
  max-width: none !important;
  width: 100% !important;
}

/* 确保全屏布局不受任何容器限制 */
html, body {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
}
</style>
