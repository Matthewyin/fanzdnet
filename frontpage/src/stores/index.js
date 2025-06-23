import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

// 导出所有store
export { useAppStore } from './app'
export { useUserStore } from './user'
export { useNewsStore } from './news'
export { useScheduleStore } from './schedule'
export { useGalleryStore } from './gallery'
export { useCommunityStore } from './community'
export { useAIGeneratorStore } from './aiGenerator'
