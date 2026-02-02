<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- 主要内容区 -->
      <div class="footer-main">
        <!-- 品牌区 -->
        <div class="footer-brand">
          <NuxtLink :to="localePath('/')" class="footer-logo">
            <NuxtImg src="/logo.jpeg" alt="Fanzdnet Logo" class="footer-logo-img" width="176" height="176" loading="lazy" />
            <span class="footer-logo-text">Fanzd.net</span>
          </NuxtLink>
          <p class="footer-tagline">{{ t('footer.tagline', '樊振东非官方粉丝网站') }}</p>
          <p class="footer-description">{{ t('footer.disclaimer', '本站所有数据均来源于互联网公开信息，仅供球迷交流学习使用。') }}</p>
        </div>

        <!-- 快速链接 -->
        <div class="footer-links">
          <h4 class="footer-title">{{ t('footer.quickLinks', '快速链接') }}</h4>
          <nav class="footer-nav">
            <NuxtLink :to="localePath('/updates')">{{ t('nav.updates', '最新动态') }}</NuxtLink>
            <NuxtLink :to="localePath('/schedule')">{{ t('nav.schedule', '赛事信息') }}</NuxtLink>
            <NuxtLink :to="localePath('/timeline')">{{ t('nav.timeline', '大事记') }}</NuxtLink>
            <NuxtLink :to="localePath('/ai-gallery')">{{ t('nav.aiGallery', 'AI 灵感站') }}</NuxtLink>
            <NuxtLink :to="localePath('/essays')">{{ t('nav.essays', '随笔') }}</NuxtLink>
            <NuxtLink :to="localePath('/about')">{{ t('nav.about', '关于') }}</NuxtLink>
          </nav>
        </div>

        <!-- 联系方式 -->
        <div class="footer-contact">
          <h4 class="footer-title">{{ t('footer.contactUs', '联系我们') }}</h4>
          <p class="contact-text">{{ t('footer.contact', '如有侵权或信息有误，请联系我们进行删除或更正。') }}</p>
          <div class="social-links">
            <a href="https://github.com/Matthewyin/fanzdnet" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="footer-bottom">
        <p class="copyright">{{ t('footer.copyright', '© 2024 Fanzd.net - 樊振东非官方粉丝网站') }}</p>
        <p class="rights">{{ t('footer.allRightsReserved', '保留所有权利') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { NuxtImg } from '#components';

const { t } = useI18n();
const localePath = useLocalePath();
</script>

<style scoped>
.site-footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-primary);
  margin-top: auto;
}

.footer-container {
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: var(--space-12) var(--space-4);
}

@media (min-width: 768px) {
  .footer-container {
    padding: var(--space-16) var(--space-8);
  }
}

.footer-main {
  display: grid;
  gap: var(--space-10);
  margin-bottom: var(--space-10);
}

@media (min-width: 768px) {
  .footer-main {
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--space-12);
  }
}

/* 品牌区 */
.footer-brand {
  max-width: min(320px, 100%);
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  margin-bottom: var(--space-4);
}

.footer-logo-img {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
}

.footer-logo-text {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
}

.footer-tagline {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-accent-500);
  margin-bottom: var(--space-3);
}

.footer-description {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
}

/* 快速链接 */
.footer-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-nav a {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-in-out);
}

.footer-nav a:hover {
  color: var(--color-accent-500);
}

/* 联系方式 */
.contact-text {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.social-links {
  display: flex;
  gap: var(--space-3);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--text-secondary);
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-in-out);
}

.social-link:hover {
  color: var(--text-primary);
  background-color: var(--color-accent-500);
  transform: translateY(-2px);
}

/* 底部版权 */
.footer-bottom {
  padding-top: var(--space-8);
  border-top: 1px solid var(--border-primary);
  text-align: center;
}

.copyright {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin-bottom: var(--space-1);
}

.rights {
  font-size: var(--text-xs);
  color: var(--text-muted);
}
</style>
