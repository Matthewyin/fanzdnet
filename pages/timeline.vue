<template>
  <div class="timeline-page">
    <h1 class="page-title">大事记</h1>
    <div class="timeline-wrapper">
      <div class="timeline-line"></div>
      <div v-for="(event, index) in timelineData" :key="index" class="timeline-item" :class="{ 'right': index % 2 !== 0 }">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
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
</template>

<script setup>
import { timelineData } from '@/data/timelineData.ts';

const onImageError = (event) => {
  // Hide broken images
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
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
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

.timeline-item:nth-child(even) {
  left: 50%;
}

.timeline-item:nth-child(odd) {
  left: 0;
}

.timeline-dot {
  position: absolute;
  top: 0;
  width: 24px;
  height: 24px;
  background-color: var(--bg-primary);
  border: 4px solid #ffd700;
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.timeline-item:nth-child(even) .timeline-dot {
  left: -12px;
}

.timeline-item:nth-child(odd) .timeline-dot {
  right: -12px;
}

.timeline-content {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  overflow: hidden; /* Ensures the image corners are rounded */
}

.timeline-image {
  width: 100%;
  height: 200px; /* Fixed height for all images */
  object-fit: cover; /* Crop images to fit */
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

@media (max-width: 768px) {
  .timeline-line {
    left: 12px;
  }
  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 40px;
    padding-right: 0;
  }
  .timeline-dot {
    left: 1px !important;
  }
}
</style>