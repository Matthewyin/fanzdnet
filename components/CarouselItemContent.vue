<template>
  <div v-if="item.isOpening" class="opening-content">
    <div class="opening-text-container">
      <div v-for="(line, lineIndex) in item.openingText" :key="lineIndex"
           class="opening-line"
           :style="{ animationDelay: (lineIndex * 0.6) + 's' }">
        {{ line }}
      </div>
    </div>
  </div>
  <div v-else class="hero-content" :class="{ 'hero-content-active': isActive }">
    <!-- Background Image Layer -->
    <div class="hero-image-layer">
      <NuxtImg
        :src="item.url"
        :alt="item.title"
        class="hero-image"
        width="1920"
        height="1080"
        :style="{ objectPosition: item.imgPosition || 'center 20%' }"
        @error="onImageError"
        loading="lazy"
      />
      <div class="hero-image-overlay"></div>
    </div>

    <!-- Text Content Layer (Skewed) -->
    <div class="hero-text-layer">
      <div class="hero-text-container">
        <div class="hero-text-content">
          <span class="hero-tag">{{ item.tag || 'CHAMPION' }}</span>
          <h1 class="hero-title">{{ item.title }}</h1>
          <h2 class="hero-subtitle">{{ item.subtitle }}</h2>
          <p class="hero-quote">{{ item.quote }}</p>
          <p class="hero-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  isActive: {
    type: Boolean,
    default: false
  }
});

const onImageError = (event) => {
  if (event && event.target) {
    event.target.style.display = 'none';
  }
}
</script>

<style scoped>
/* Opening Content */
.opening-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.opening-text-container {
  max-width: clamp(600px, 90vw, 900px);
  padding: 0 var(--space-8);
}

.opening-line {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: var(--font-bold);
  color: var(--text-inverse, #ffffff);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  margin: var(--space-4) 0;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  animation: openingFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes openingFadeIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Hero Content */
.hero-content {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
}

/* Image Layer - Bottom, No Skew */
.hero-image-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 8s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-content-active .hero-image {
  transform: scale(1.05);
}

.hero-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.3) 70%,
    transparent 100%
  );
  width: 100%;
  height: 100%;
}

/* Text Layer - Top, Skewed */
.hero-text-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  transform: skewX(-6deg) scale(1.1);
  transform-origin: center top;
  overflow: hidden;
  pointer-events: none;
}

/* Text Container */
.hero-text-container {
  position: relative;
  width: 100%;
  max-width: min(700px, 90vw);
  height: 100%;
  display: flex;
  align-items: center;
  padding: var(--space-12) var(--space-8);
  padding-left: 8%;
  transform: skewX(6deg) scale(1.0);
  transform-origin: center;
}

.hero-text-content {
  opacity: 0;
  transform: translateX(-30px);
  animation: textSlideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

@keyframes textSlideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-tag {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: 0.1em;
  color: var(--color-accent-400);
  margin-bottom: var(--space-6);
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-extrabold);
  color: var(--text-inverse, #ffffff);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.hero-subtitle {
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: var(--font-semibold);
  color: var(--color-accent-400);
  margin-bottom: var(--space-6);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hero-quote {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
  padding-left: var(--space-4);
  border-left: 3px solid var(--color-accent-500);
}

.hero-description {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.75);
  line-height: var(--leading-relaxed);
  max-width: min(600px, 85vw);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .hero-image-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.5) 40%,
      rgba(0, 0, 0, 0.95) 100%
    );
  }

  .hero-text-layer {
    transform: none; /* Remove skew on mobile */
  }

  .hero-text-container {
    max-width: 100%;
    align-items: flex-end;
    padding: var(--space-6);
    padding-bottom: var(--space-24);
    padding-left: var(--space-6);
    padding-right: var(--space-6);
    transform: none; /* Remove counter-skew on mobile */
  }

  .hero-text-content {
    text-align: left;
    width: 100%;
  }

  .hero-tag {
    margin-bottom: var(--space-3);
    font-size: var(--text-xs);
  }

  .hero-title {
    margin-bottom: var(--space-2);
    font-size: var(--text-2xl);
    line-height: 1.2;
  }

  .hero-subtitle {
    margin-bottom: var(--space-4);
    font-size: var(--text-lg);
    color: var(--color-accent-400);
  }

  .hero-quote {
    border-left: 2px solid var(--color-accent-500);
    padding-left: var(--space-3);
    margin-bottom: var(--space-4);
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.95);
    background: rgba(0, 0, 0, 0.3);
    padding: var(--space-3);
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    backdrop-filter: blur(4px);
  }

  .hero-description {
    display: none;
  }

  .opening-line {
    font-size: clamp(1.25rem, 5vw, 1.75rem);
  }
}

/* Large screens */
@media (min-width: 1280px) {
  .hero-text-container {
    padding-left: 12%; /* Reduced padding for better left alignment */
  }
}
</style>
