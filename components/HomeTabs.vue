<template>
  <div class="tabs-container">
    <div class="tabs-nav">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="{ active: activeTab === tab.id }">
        {{ tab.title }}
      </button>
    </div>
    <div class="tabs-content">
      <div v-for="tab in tabs" :key="tab.id">
        <div v-if="activeTab === tab.id">
          <h3>{{ tab.title }}</h3>
          <p>{{ tab.description }}</p>
          <NuxtLink :to="tab.route" class="read-more">查看更多 &rarr;</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('updates');

const tabs = [
  {
    id: 'updates',
    title: '最新动态',
    description: '关于樊振东的最新新闻、文章和动态。我们会密切关注各大体育媒体和社交平台，为您带来最及时的资讯。'
,    route: '/updates'
  },
  {
    id: 'schedule',
    title: '赛事信息',
    description: '详细的赛事日历、比赛结果和对阵信息。无论是国际大赛还是国内联赛，您都可以在这里找到。',
    route: '/schedule'
  },
  {
    id: 'timeline',
    title: '大事记',
    description: '以时间线的形式，记录樊振东职业生涯中的重要里程碑和高光时刻，回顾他从天才少年到乒坛传奇的每一步。',
    route: '/timeline'
  },
];
</script>

<style scoped>
.tabs-container {
  max-width: 960px;
  margin: 4rem auto;
  padding: 0 2rem;
}
.tabs-nav {
  display: flex;
  justify-content: center;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 2rem;
}
.tabs-nav button {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  color: var(--text-secondary);
  position: relative;
  transition: color 0.3s;
}
.tabs-nav button.active {
  color: var(--text-primary);
}
.tabs-nav button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #ffd700;
}
.tabs-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.tabs-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
}
.read-more {
  display: inline-block;
  margin-top: 1rem;
  color: #ffd700;
  text-decoration: none;
  font-weight: 500;
}
</style>