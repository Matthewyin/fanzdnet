<template>
  <div class="language-switcher">
    <!-- 语言选择按钮 -->
    <button
      @click="toggleDropdown($event)"
      class="lang-btn"
      :class="{ 'lang-btn-active': showDropdown }"
      :title="$t('languageSwitcher.title')"
    >
      <span class="lang-flag">{{ currentLanguage.flag }}</span>
      <span class="lang-code">{{ currentLanguage.code.toUpperCase() }}</span>
      <svg class="lang-arrow" :class="{ 'lang-arrow-up': showDropdown }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <Transition name="dropdown">
      <div v-if="showDropdown" class="lang-dropdown" :style="dropdownStyle" @click.stop>
        <div class="lang-list">
          <button
            v-for="language in availableLanguages"
            :key="language.code"
            @click="switchLanguage(language.code)"
            class="lang-option"
            :class="{ 'lang-option-active': currentLanguage.code === language.code }"
          >
            <span class="lang-flag">{{ language.flag }}</span>
            <span class="lang-name">{{ language.name }}</span>
            <svg v-if="currentLanguage.code === language.code" class="lang-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- 点击外部关闭 -->
    <div v-if="showDropdown" class="lang-overlay" @click="showDropdown = false"></div>
  </div>
</template>

<script setup lang="ts">
import type { SupportedLanguage } from "~/types/firestore";

// 使用 Nuxt i18n
const { locale, locales, setLocale, t } = useI18n();

// 响应式数据
const showDropdown = ref(false);

// 语言标志映射
const languageFlags: Record<string, string> = {
  zh: "🇨🇳",
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  ja: "🇯🇵",
  ko: "🇰🇷",
  sv: "🇸🇪",
};

// 处理可用语言列表
const availableLanguages = computed(() => {
  return (locales.value as any[]).map((locale) => ({
    code: locale.code,
    name: locale.name,
    nativeName: locale.name,
     flag: languageFlags[locale.code] || "🇨🇳",
  }));
});

// 计算当前语言
const currentLanguage = computed(() => {
  return (
    availableLanguages.value.find((lang) => lang.code === locale.value) ||
    availableLanguages.value[0]
  );
});

// 下拉菜单位置
const dropdownStyle = ref({})

// 切换下拉菜单
const toggleDropdown = (event?: Event) => {
  showDropdown.value = !showDropdown.value;

  if (showDropdown.value && event) {
    // 计算下拉菜单位置
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()

    dropdownStyle.value = {
      position: 'fixed',
      top: `${rect.bottom + 8}px`,
      right: `${window.innerWidth - rect.right}px`,
      zIndex: 9999
    }
  }
};

// 打开翻译帮助
const openTranslateHelp = () => {
  // 关闭下拉菜单
  showDropdown.value = false;

  // 可以跳转到翻译帮助页面或打开外部链接
  // 这里可以根据需要实现具体逻辑
  console.log("打开翻译帮助");

  // 示例：跳转到管理后台的翻译工具
  if (process.client) {
    window.open("/admin/translate", "_blank");
  }
};

// 切换语言
const switchLanguage = async (languageCode: string) => {
  if (languageCode === locale.value) {
    showDropdown.value = false;
    return;
  }

  try {
    // 使用 Nuxt i18n 的 setLocale 方法
    await setLocale(languageCode as SupportedLanguage);

    // 关闭下拉菜单
    showDropdown.value = false;

    // 发出事件通知父组件
    emit("language-changed", languageCode);

    // 添加一些视觉反馈
    console.log(
      `✅ ${t("languageSwitcher.switchedTo")}: ${currentLanguage.value.name}`
    );
  } catch (error) {
    console.error(`❌ ${t("languageSwitcher.switchFailed")}:`, error);
  }
};

// 定义事件
const emit = defineEmits<{
  "language-changed": [language: string];
}>();

// 监听路由变化，关闭下拉菜单
const route = useRoute();
watch(
  () => route.path,
  () => {
    showDropdown.value = false;
  }
);

// 监听点击外部关闭下拉菜单
onMounted(() => {
  const handleClickOutside = (event: Event) => {
    const target = event.target as Element;
    if (!target.closest(".language-switcher")) {
      showDropdown.value = false;
    }
  };

  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});

// 暴露当前语言给父组件
defineExpose({
  currentLanguage: computed(() => locale.value),
});
</script>

<style scoped>
.language-switcher {
  position: relative;
  z-index: var(--z-dropdown);
}

/* 按钮样式 */
.lang-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px; /* 确保触摸目标至少 44px 高 */
  min-width: 44px; /* 确保触摸目标至少 44px 宽 */
  padding: var(--space-2) var(--space-3);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-in-out);
}

.lang-btn:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--border-secondary);
}

.lang-btn-active {
  background-color: var(--bg-tertiary);
  border-color: var(--color-accent-500);
}

.lang-flag {
  font-size: var(--text-lg);
  line-height: 1;
}

.lang-code {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.lang-arrow {
  color: var(--text-tertiary);
  transition: transform var(--duration-fast) var(--ease-in-out);
}

.lang-arrow-up {
  transform: rotate(180deg);
}

/* 下拉菜单 */
.lang-dropdown {
  position: fixed;
  min-width: clamp(160px, 40vw, 200px);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  z-index: calc(var(--z-dropdown) + 100);
}

.lang-list {
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  min-height: 44px; /* 确保触摸目标至少 44px 高 */
  padding: var(--space-3) var(--space-4);
  background: none;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  text-align: left;
  transition: all var(--duration-fast) var(--ease-in-out);
}

.lang-option:hover {
  background-color: var(--bg-secondary);
}

.lang-option-active {
  background-color: rgba(255, 215, 0, 0.1);
}

.lang-name {
  flex: 1;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
}

.lang-option-active .lang-name {
  color: var(--color-accent-600);
}

.dark .lang-option-active .lang-name {
  color: var(--color-accent-400);
}

.lang-check {
  color: var(--color-accent-500);
}

/* 遮罩层 */
.lang-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-dropdown);
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--duration-fast) var(--ease-out);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}
</style>
