
<template>
  <footer class="site-footer">
    <div class="footer-content">
      <!-- 免责声明 -->
      <p class="disclaimer">{{ t('footer.disclaimer', '本网站为樊振东粉丝网站，仅用于信息分享。') }}</p>

      <!-- 联系信息 -->
      <p class="contact">{{ t('footer.contact', '如有疑问或建议，请联系我们。') }}</p>

      <!-- 版权信息 -->
      <div class="copyright-section">
        <p class="copyright">{{ t('footer.copyright', '© 2024 Fanzd.net - 樊振东非官方粉丝网站') }}</p>
        <p class="rights">{{ t('footer.allRightsReserved', '保留所有权利') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t } = useI18n()
</script>

<style scoped>
.site-footer {
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 0.9rem;
  border-top: 1px solid var(--border-color);
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  space-y: 1rem;
}

.disclaimer, .contact {
  margin: 0.75rem 0;
  line-height: 1.6;
}

.copyright-section {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.copyright, .rights {
  margin: 0.25rem 0;
  font-size: 0.8rem;
  opacity: 0.8;
}
</style>
