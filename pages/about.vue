
<template>
  <div class="page-container">
    <h1>{{ t('pages.about.title', '关于本站') }}</h1>
    <p>{{ t('about.description1', '本网站是由球迷为樊振东建立的非官方信息站，旨在分享和记录他的职业生涯点滴。') }}</p>
    <p>{{ t('about.description2', '所有内容均整理自公开网络渠道，如有任何疑问或建议，请随时联系我们。') }}</p>
  </div>
</template>

<script setup lang="ts">
// 使用 i18n
const { t, locale } = useI18n()

// SEO 优化
const { setPageSEO } = useSEO()
setPageSEO('about', locale.value)
</script>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 2rem;
}
</style>
