
<template>
  <div class="page-container">
    <h1>随笔</h1>
    <ul class="article-list">
      <li v-for="article in articles" :key="article._path" class="article-item">
        <NuxtLink :to="article._path" class="article-link">
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-description">{{ article.description }}</p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: articles } = await useAsyncData('all-essays', () => 
  queryContent('/essays').only(['_path', 'title', 'description']).sort({ date: -1 }).find()
);
</script>

<style scoped>
.page-container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.article-list {
  list-style: none;
  padding: 0;
}

.article-item {
  margin-bottom: 1.5rem;
}

.article-link {
  display: block;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.article-link:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

.article-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.article-description {
  margin: 0;
  color: var(--text-secondary);
}
</style>
