# 🌍 多语言翻译指南

本指南将帮助你独立处理网站的多语言翻译，无需每次都寻求技术支持。

## 📋 目录
1. [快速开始](#快速开始)
2. [翻译新页面](#翻译新页面)
3. [添加新语言](#添加新语言)
4. [翻译键命名规范](#翻译键命名规范)
5. [常见问题](#常见问题)

## 🚀 快速开始

### 当前支持的语言
- 🇨🇳 中文 (zh) - 默认语言
- 🇺🇸 英语 (en)
- 🇪🇸 西班牙语 (es)
- 🇫🇷 法语 (fr)
- 🇩🇪 德语 (de)
- 🇯🇵 日语 (ja)
- 🇰🇷 韩语 (ko)
- 🇸🇪 瑞典语 (sv)

### 文件结构
```
locales/
├── zh-CN.json    # 中文翻译（主文件）
├── en-US.json    # 英语翻译
├── es-ES.json    # 西班牙语翻译
├── fr-FR.json    # 法语翻译
├── de-DE.json    # 德语翻译
├── ja-JP.json    # 日语翻译
├── ko-KR.json    # 韩语翻译
└── sv-SE.json    # 瑞典语翻译
```

## 📝 翻译新页面

### 步骤 1: 创建页面组件

创建新页面时，**不要**硬编码文本，而是使用翻译键：

```vue
<!-- ❌ 错误做法 -->
<template>
  <div>
    <h1>我的新页面</h1>
    <p>这是页面描述</p>
  </div>
</template>

<!-- ✅ 正确做法 -->
<template>
  <div>
    <h1>{{ t('pages.myNewPage.title', '我的新页面') }}</h1>
    <p>{{ t('pages.myNewPage.description', '这是页面描述') }}</p>
  </div>
</template>

<script setup lang="ts">
// 必须添加这些
const { t, locale } = useI18n()
const { setPageSEO } = useSEO()

// 设置页面 SEO（可选但推荐）
setPageSEO('myNewPage', locale.value)
</script>
```

### 步骤 2: 添加翻译键到语言文件

在 `locales/zh-CN.json` 中添加翻译：

```json
{
  "pages": {
    "myNewPage": {
      "title": "我的新页面",
      "description": "这是页面描述"
    }
  }
}
```

### 步骤 3: 翻译到其他语言

使用管理后台的翻译工具：
1. 访问 `/admin/translate`
2. 输入中文文本
3. 选择目标语言
4. 点击翻译
5. 复制结果到对应的语言文件

## 🔧 翻译键命名规范

### 页面级翻译
```json
{
  "pages": {
    "pageName": {
      "title": "页面标题",
      "description": "页面描述",
      "subtitle": "副标题"
    }
  }
}
```

### 组件级翻译
```json
{
  "componentName": {
    "title": "组件标题",
    "button": "按钮文本",
    "loading": "加载中...",
    "error": "错误信息"
  }
}
```

### 通用翻译
```json
{
  "common": {
    "loading": "加载中...",
    "error": "发生错误",
    "retry": "重试",
    "close": "关闭",
    "save": "保存",
    "cancel": "取消"
  }
}
```

## 🆕 添加新语言

### 步骤 1: 更新配置文件

在 `nuxt.config.ts` 中添加新语言：

```typescript
i18n: {
  locales: [
    // 现有语言...
    { code: 'pt', language: 'pt-PT', name: 'Português', file: 'pt-PT.json' }
  ]
}
```

### 步骤 2: 创建语言文件

复制 `locales/zh-CN.json` 为 `locales/pt-PT.json`，然后翻译所有内容。

### 步骤 3: 更新类型定义

在 `types/firestore.ts` 中添加新语言：

```typescript
export interface MultiLanguageText {
  // 现有语言...
  pt: string
}

export const SUPPORTED_LANGUAGES = ['zh', 'en', 'es', 'fr', 'de', 'ja', 'ko', 'sv', 'pt'] as const
```

### 步骤 4: 添加语言标志

在 `components/LanguageSwitcher.vue` 中添加：

```typescript
const languageFlags: Record<string, string> = {
  // 现有标志...
  pt: "🇵🇹"
}
```

## 🛠️ 实用工具

### 管理后台翻译工具
- 单个翻译：`/admin/translate`
- 批量翻译：`/admin/batch-translate`

### 翻译验证
运行健康检查来验证所有语言页面：
```bash
npm run health-check
```

## ❓ 常见问题

### Q: 如何处理动态内容？
A: 对于来自 API 的动态内容，在 API 中根据语言参数返回对应语言的内容。

### Q: 如何处理复数形式？
A: 使用 Vue I18n 的复数规则：
```json
{
  "items": "没有项目 | 1 个项目 | {count} 个项目"
}
```

### Q: 如何处理日期和数字格式？
A: 使用 `useLocalization` composable 中的格式化函数。

### Q: 翻译键太长怎么办？
A: 使用嵌套结构和简短的键名，避免重复。

## 📚 最佳实践

1. **始终提供后备文本**：`t('key', '默认文本')`
2. **使用语义化的键名**：`pages.about.title` 而不是 `aboutTitle`
3. **保持翻译键结构一致**：所有语言文件应有相同的键结构
4. **定期验证翻译**：使用管理后台检查缺失的翻译
5. **SEO优化**：为每个页面设置正确的 SEO 信息

## 🔄 工作流程总结

1. **创建页面** → 使用翻译键而非硬编码文本
2. **添加中文翻译** → 在 `zh-CN.json` 中添加键值对
3. **翻译其他语言** → 使用管理后台工具或手动翻译
4. **测试验证** → 检查所有语言版本的页面
5. **SEO优化** → 确保每个语言版本都有正确的元数据

遵循这个指南，你就可以独立处理网站的多语言翻译了！🎉
