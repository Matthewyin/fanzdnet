import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// 导入路由
import router from './router'

// 导入状态管理
import pinia from './stores'

// 导入国际化
import i18n from './i18n'

// 导入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入全局样式
import './styles/global.scss'
import './styles/element-plus.scss'

// 创建应用实例
const app = createApp(App)

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(i18n)

// 挂载应用
app.mount('#app')
