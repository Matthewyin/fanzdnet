/**
 * 客户端 i18n 初始化插件
 */

export default defineNuxtPlugin(async () => {
  const { init } = useI18n()
  
  // 初始化 i18n
  await init()
})
