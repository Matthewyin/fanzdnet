
<template>
  <main class="prose-container">
    <ContentDoc />
  </main>
</template>

<script setup>
import { ContentDoc } from '#components';
</script>

<style>
/* Using global styles for prose content from @nuxt/content */
.prose-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.prose-container h1, .prose-container h2, .prose-container h3 {
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.prose-container p {
  line-height: 1.7;
  color: var(--text-secondary);
}

.prose-container a {
  color: #ffd700;
}

.prose-container blockquote {
  border-left: 4px solid var(--border-color);
  padding-left: 1rem;
  margin-left: 0;
  font-style: italic;
}

.prose-container pre {
  background-color: var(--bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.prose-container code {
  font-family: 'Courier New', Courier, monospace;
}
</style>
