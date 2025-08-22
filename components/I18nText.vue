/**
 * 响应式翻译文本组件
 * 当语言切换时自动更新文本
 */
<template>
  <span>{{ translatedText }}</span>
</template>

<script setup lang="ts">
interface Props {
  keyPath: string
  fallback?: string
}

const props = defineProps<Props>()
const { t, locale } = useI18n()

// 响应式翻译文本
const translatedText = ref('')

// 更新翻译文本
const updateText = async () => {
  translatedText.value = await t(props.keyPath, props.fallback)
}

// 监听语言变化
watch(locale, updateText, { immediate: true })

// 监听 keyPath 变化
watch(() => props.keyPath, updateText)
</script>
