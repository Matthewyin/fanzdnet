# Fanzdnet - Agent Guidelines

> This file provides essential guidance for AI agents working in this Nuxt.js/Vue 3 codebase.

## Build & Development Commands

```bash
# Development
npm run dev              # Start dev server on http://localhost:3000

# Build & Preview
npm run build            # Production build
npm run preview          # Preview production build locally
npm run generate         # Static site generation

# Deployment
npm run deploy           # Full deploy (build + firebase deploy)
npm run deploy:build     # Build only
npm run deploy:only      # Deploy only (skip build)

# Utilities
npm run check-translations   # Verify all 8 language files have matching keys
npm run health-check         # Run deployment health check
```

**Note**: No lint, format, or test commands are configured in this project.

---

## Code Style Guidelines

### File Organization
```
components/       # Vue components (PascalCase)
  HeroCarousel.vue
  ThemeSwitcher.vue

pages/           # Route pages (PascalCase)
  index.vue
  timeline.vue

composables/     # Composables (camelCase with 'use' prefix)
  useFirestore.ts
  useSEO.ts

types/           # TypeScript types
  firestore.ts

data/            # Static data (camelCase)
  heroData/index.ts

server/api/      # API routes (camelCase)
  translate.post.ts
  health.get.ts
```

### Vue Components
```vue
<template>
  <div class="component-name">
    <!-- Content -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ChildComponent from '@/components/ChildComponent.vue';
import type { SomeType } from '~/types/somefile';

// State
const loading = ref(false);
const items = ref<ItemType[]>([]);

// i18n (auto-imported)
const { t, locale } = useI18n();

// Lifecycle
onMounted(() => {
  // Initialize
});
</script>

<style scoped>
/* Component styles using CSS variables */
.component-name {
  color: var(--text-primary);
}
</style>
```

### Import Conventions
- **Components**: Use `@/components/ComponentName.vue` for cross-directory imports
- **Child components**: Use `./ChildComponent.vue` for same-directory imports
- **Types**: Use `~/types/filename` for type imports
- **Nuxt composables**: Auto-imported (don't import `useI18n`, `useRoute`, etc.)
- **Vue APIs**: Explicitly import from `'vue'`

### TypeScript
- Use strict typing with explicit return types on functions
- Prefer `interface` over `type` for object shapes
- Use `const COLLECTIONS = { ... } as const` for constants
- Generic functions: `async <T>(param: string): Promise<T[]>`

### Error Handling
**Client-side (composables)**:
```typescript
try {
  const result = await fetchData();
  return result;
} catch (error) {
  console.error('Error fetching data:', error);
  return []; // Graceful fallback
}
```

**Server-side (API routes)**:
```typescript
try {
  const body = await readBody(event);
  // Process...
  return { success: true, data };
} catch (error) {
  console.error('API error:', error);
  throw createError({
    statusCode: 500,
    statusMessage: 'Operation failed'
  });
}
```

### Naming Conventions
- **Components**: PascalCase (`HeroCarousel.vue`)
- **Composables**: camelCase starting with 'use' (`useFirestore.ts`)
- **Types/Interfaces**: PascalCase (`HeroItem`, `TimelineEvent`)
- **Constants**: UPPER_SNAKE_CASE or PascalCase with 'as const'
- **Variables**: camelCase, use `const` everywhere
- **CSS classes**: kebab-case matching component name

### Internationalization (i18n)
- All user-facing text MUST support 8 languages
- Translation keys: dot notation (`nav.updates`, `pages.about.title`)
- Usage: `t('key', 'fallback')` with Chinese fallback
- Files: `locales/{zh,en,es,fr,de,ja,ko,sv}.json`

### CSS & Styling
- Use CSS variables from design system: `var(--text-primary)`, `var(--space-4)`
- Component-scoped styles: `<style scoped>`
- CSS class naming: match component name in kebab-case
- Responsive breakpoints: `768px`, `1024px`

### Database (Firestore)
- Use `useFirestore()` composable for all DB operations
- Collections: `hero_items`, `timeline_events`, `ai_suggestions`, `content_pages`
- Data model: All text fields use `MultiLanguageText` type for 8-language support

---

## Quick Reference

| Task | Approach |
|------|----------|
| Add new page | Copy `docs/PAGE_TEMPLATE.vue` → `pages/`, add nav link in `app.vue` |
| Add translation | Add to `locales/zh-CN.json`, use admin translate tools for others |
| Add component | Create `.vue` in `components/`, use PascalCase |
| Add composable | Create `.ts` in `composables/`, prefix with `use` |
| Add API route | Create in `server/api/`, use `.get.ts` or `.post.ts` suffix |
| Handle errors | Client: return fallback; Server: `throw createError()` |

## Tech Stack
- Nuxt 3 + Vue 3 + TypeScript (strict)
- @nuxtjs/i18n (8 languages)
- @nuxtjs/color-mode (themes)
- @nuxt/image (image optimization)
- Firebase/Firestore (database)
- CSS variables (no Tailwind)
