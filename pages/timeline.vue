
<template>
  <div class="timeline-page">
    <h1 class="page-title">大事记</h1>
    <div class="timeline-wrapper">
      <div class="timeline-line"></div>
      <div v-for="(event, index) in timelineData" :key="index" class="timeline-item" :class="{ 'right': index % 2 !== 0 }">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-year">{{ event.year }}</div>
          <h3 class="timeline-title">{{ event.title }}</h3>
          <p class="timeline-description">{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { timelineData } from '@/data/timelineData.ts';
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
  margin-bottom: 4rem; /* More space for title */
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
  padding: 0 40px; /* Horizontal padding */
  margin-bottom: 50px; /* Vertical space between items */
}

/* Even items are on the right side */
.timeline-item:nth-child(even) {
  left: 50%;
}

/* Odd items are on the left side */
.timeline-item:nth-child(odd) {
  left: 0;
  text-align: right;
}

/* The dot on the timeline */
.timeline-dot {
  position: absolute;
  top: 20px;
  width: 20px;
  height: 20px;
  background-color: var(--bg-primary);
  border: 4px solid #ffd700; /* Use accent color for the dot */
  border-radius: 50%;
  z-index: 1;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.timeline-item:nth-child(even) .timeline-dot {
  left: -10px;
}

.timeline-item:nth-child(odd) .timeline-dot {
  right: -10px;
}

.timeline-content {
  background-color: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px; /* Slightly more rounded corners */
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  position: relative;
  border-top: 4px solid #ffd700;
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
  color: #ffd700; /* Use accent color for title */
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.timeline-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }
  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 50px;
    padding-right: 1rem;
    text-align: left !important;
  }
  .timeline-dot {
    left: 10px !important;
  }
}
</style>
