import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
const Home = () => import('../views/Home.vue')
const Schedule = () => import('../views/Schedule.vue')
const Gallery = () => import('../views/Gallery.vue')
const Timeline = () => import('../views/Timeline.vue')
const Interview = () => import('../views/Interview.vue')
const AIGenerator = () => import('../views/AIGenerator.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页 - 樊振东球迷网',
      description: '樊振东球迷非官方网站首页'
    }
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: Schedule,
    meta: {
      title: '赛程安排 - 樊振东球迷网',
      description: '樊振东比赛赛程和安排'
    }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
    meta: {
      title: '比赛图库 - 樊振东球迷网',
      description: '樊振东比赛精彩图片和瞬间'
    }
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline,
    meta: {
      title: '大事记 - 樊振东球迷网',
      description: '樊振东职业生涯重要时刻记录'
    }
  },
  {
    path: '/interview',
    name: 'Interview',
    component: Interview,
    meta: {
      title: '采访 - 樊振东球迷网',
      description: '樊振东专访和访谈内容'
    }
  },
  {
    path: '/ai-generator',
    name: 'AIGenerator',
    component: AIGenerator,
    meta: {
      title: 'AI应援物生成器 - 樊振东球迷网',
      description: '智能生成樊振东应援物品设计'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面未找到 - 樊振东球迷网'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
