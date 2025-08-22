<template>
  <div class="relative language-switcher">
    <!-- 语言选择按钮 -->
    <button
      @click="toggleDropdown($event)"
      class="flex items-center gap-2 px-6 py-2 min-w-24 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :class="{
        'bg-gray-50 dark:bg-gray-700 shadow-md': showDropdown,
      }"
      :title="$t('languageSwitcher.title')"
    >
      <!-- 国旗和语言代码在同一行 -->
      <span class="text-lg">{{ currentLanguage.flag }}</span>
      <span class="text-sm font-medium">{{
        currentLanguage.code.toUpperCase()
      }}</span>
    </button>

    <!-- 下拉菜单 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-1"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-1"
    >
      <div
        v-if="showDropdown"
        class="min-w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-2xl border border-gray-200/30 dark:border-gray-700/30 overflow-hidden"
        :style="dropdownStyle"
        @click.stop
      >
        <!-- 语言选项列表 - 强制垂直布局 -->
        <div class="py-1" style="display: flex !important; flex-direction: column !important;">
          <button
            v-for="language in availableLanguages"
            :key="language.code"
            @click="switchLanguage(language.code)"
            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 focus:outline-none"
            :class="{
              'bg-blue-50 dark:bg-blue-900/30 font-semibold text-blue-600 dark:text-blue-300':
                currentLanguage.code === language.code,
              'text-gray-800 dark:text-gray-200':
                currentLanguage.code !== language.code,
            }"
            style="display: flex !important; flex-direction: row !important; width: 100% !important; margin: 0 !important; float: none !important;"
          >
            <span class="text-lg">{{ language.flag }}</span>
            <span class="flex-1">{{ language.name }}</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- 点击外部关闭下拉菜单 -->
    <div
      v-if="showDropdown"
      @click="showDropdown = false"
      class="fixed inset-0 z-40"
    ></div>
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
    flag: languageFlags[locale.code] || "🌐",
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
  z-index: 50;
}

/* 国旗表情符号优化显示 */
.language-switcher span {
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji",
    sans-serif;
}

/* 按钮悬停效果 */
.language-switcher > button:hover {
  transform: translateY(-1px);
}

.language-switcher > button:active {
  transform: translateY(0);
}

/* 强制垂直布局 */
.language-switcher .py-1 {
  display: flex !important;
  flex-direction: column !important;
}

.language-switcher .py-1 button {
  display: flex !important;
  flex-direction: row !important;
  width: 100% !important;
  margin: 0 !important;
  float: none !important;
  clear: both !important;
}

/* 毛玻璃效果增强 */
.language-switcher [class*="backdrop-blur"] {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* 确保下拉菜单不影响布局 */
.language-switcher > div[style*="position: fixed"] {
  position: fixed !important;
  z-index: 9999 !important;
  pointer-events: auto;
}

/* 语言选项悬停效果 */
.language-switcher .py-1 button:hover {
  background-color: rgba(59, 130, 246, 0.1) !important;
  backdrop-filter: blur(8px);
}
</style>
