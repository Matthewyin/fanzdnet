
<template>
  <div class="timeline-page">
    <h1 class="page-title">大事记</h1>
    <div class="timeline-wrapper">
      <div class="timeline-line"></div>
      <div v-for="(event, index) in timelineData" :key="index" class="timeline-item" :class="{ 'item-right': index % 2 !== 0 }">
        <div class="timeline-content">
          <div class="timeline-dot"></div>
          <div class="timeline-body">
            <img :src="event.imageUrl" :alt="event.title" class="timeline-image" @error="onImageError" />
            <div class="text-content">
              <div class="timeline-year">{{ event.year }}</div>
              <h3 class="timeline-title">{{ event.title }}</h3>
              <p class="timeline-description">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { timelineData } from '@/data/timelineData.ts';

const onImageError = (event) => {
  event.target.style.display = 'none';
}
</script>

<style scoped>
.timeline-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: var(--text-primary);
}

.timeline-wrapper {
  position: relative;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 20px;
  bottom: 20px;
  width: 4px;
  background-color: var(--border-color);
  transform: translateX(-2px);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 40px;
  margin-bottom: 50px;
}

.timeline-item:nth-child(odd) {
  float: left;
  clear: both;
  text-align: right;
}

.timeline-item:nth-child(even) {
  float: right;
  clear: both;
  text-align: left;
}

.timeline-dot {
  content: '';
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  background-color: var(--bg-primary);
  border: 4px solid #ffd700;
  border-radius: 50%;
  z-index: 1;
}

.timeline-item:nth-child(odd) .timeline-dot {
  right: -10px;
}

.timeline-item:nth-child(even) .timeline-dot {
  left: -10px;
}

.timeline-body {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.timeline-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.text-content {
  padding: 1.5rem;
}

.timeline-year {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffd700;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.timeline-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Clear floats */
.timeline-wrapper::after {
  content: '';
  display: table;
  clear: both;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }
  .timeline-item {
    width: 100%;
    float: none !important;
    clear: none !important;
    text-align: left !important;
    padding-left: 50px;
    padding-right: 0;
    margin-bottom: 30px;
  }
  .timeline-dot {
    left: 10px !important;
  }
}
</style>
