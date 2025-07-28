
<template>
  <div class="page-container">
    <h1>随笔</h1>
    <div class="essays-layout">
      <!-- Article Titles as Tabs -->
      <div class="essays-nav">
        <a v-for="article in articles" 
           :key="article._path"
           :href="`#${article._path}`" 
           @click.prevent="activeArticle = article._path"
           :class="{ active: activeArticle === article._path }">
          {{ article.title }}
        </a>
      </div>

      <!-- Article Content -->
      <div class="essay-content">
        <ContentDoc :path="activeArticle" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activeArticle = ref('');
const { data: articles } = await useAsyncData('all-essays', () => 
  queryContent('/essays').only(['_path', 'title']).find()
);

// Set the first article as active by default
onMounted(() => {
  if (articles.value && articles.value.length > 0) {
    activeArticle.value = articles.value[0]._path;
  }
});
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.essays-layout {
  display: flex;
  gap: 2rem;
}

.essays-nav {
  width: 300px;
  flex-shrink: 0;
  border-right: 1px solid var(--border-color);
  padding-right: 2rem;
}

.essays-nav a {
  display: block;
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: background-color 0.2s, color 0.2s;
}

.essays-nav a:hover {
  background-color: var(--bg-secondary);
}

.essays-nav a.active {
  background-color: #ffd700;
  color: #111;
  font-weight: 600;
}

.essay-content {
  flex-grow: 1;
}

@media (max-width: 768px) {
  .essays-layout {
    flex-direction: column;
  }
  .essays-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding-right: 0;
    padding-bottom: 1rem;
    display: flex;
    overflow-x: auto;
    gap: 0.5rem;
  }
  .essays-nav a {
    white-space: nowrap;
  }
}
</style>
