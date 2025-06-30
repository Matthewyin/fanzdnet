import { createRouter, createWebHistory } from 'vue-router'
import GeneratorView from '@/views/GeneratorView.vue'

const routes = [
  {
    path: '/',
    name: 'Generator',
    component: GeneratorView
  },
  {
    path: '/enhanced',
    name: 'EnhancedGenerator',
    component: () => import('@/views/EnhancedGeneratorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
