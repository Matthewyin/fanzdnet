
<template>
  <div v-if="item.isOpening" class="opening-content">
    <div class="opening-text-container">
      <div v-for="(line, lineIndex) in item.openingText" :key="lineIndex" 
           class="opening-line"
           :style="{ animationDelay: (lineIndex * 0.5) + 's' }">
        {{ line }}
      </div>
    </div>
  </div>
  <div v-else class="hero-content">
    <div class="hero-text-container">
      <div class="hero-text-overlay">
        <h1 class="hero-title">{{ item.title }}</h1>
        <h2 class="hero-subtitle">{{ item.subtitle }}</h2>
        <p class="hero-quote">{{ item.quote }}</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-label">赛事</span>
            <span class="stat-value">{{ item.event }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">对手</span>
            <span class="stat-value">{{ item.opponent }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">比分</span>
            <span class="stat-value">{{ item.score }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.url" class="hero-image-container">
      <img :src="item.url" :alt="item.title" class="hero-image" @error="onImageError" />
    </div>
    <div class="carousel-info">
      <p class="carousel-description">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({ item: Object });

  const onImageError = (event) => {
    // Hide broken images
    event.target.style.display = 'none';
  }
</script>

<style scoped>
/* All styles are identical to the main carousel component for content display */
.opening-content, .hero-content { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.opening-content { text-align: center; }
.opening-text-container { max-width: 800px; padding: 0 2rem; }
.opening-line { font-size: 2.5rem; font-weight: 700; color: #ffffff; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); margin: 1rem 0; opacity: 0; transform: translateY(30px); animation: fadeInUp 1s ease-out forwards; }
.hero-content { justify-content: space-between; padding: 0 4rem; position: relative; }
.hero-text-container { flex: 1; max-width: 50%; z-index: 3; position: relative; }
.hero-text-overlay { padding: 2.5rem; }
.hero-title { font-size: 3rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); }
.hero-subtitle { font-size: 2rem; font-weight: 600; color: #ffd700; margin-bottom: 1.5rem; }
.hero-quote { font-size: 1.5rem; color: #e0e7ff; margin-bottom: 2rem; font-style: italic; line-height: 1.6; }
.hero-stats { display: flex; gap: 2rem; margin-bottom: 1rem; }
.stat-item { display: flex; flex-direction: column; align-items: flex-start; }
.stat-label { font-size: 1.2rem; color: #ffd700; margin-bottom: 0.5rem; font-weight: 600; }
.stat-value { font-size: 1.2rem; font-weight: 600; color: #ffffff; }
.hero-image-container { position: absolute; right: 0; top: 0; width: 50%; height: 100%; z-index: 1; overflow: hidden; }
.hero-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.carousel-info { position: absolute; bottom: 2rem; left: 4rem; right: 4rem; text-align: left; z-index: 3; }
.carousel-description { font-size: 1.2rem; color: #d0d0d0; padding: 1.5rem 2rem; border-radius: 12px; max-width: 75%; margin: 0; }
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@media (max-width: 768px) {
  .hero-content { flex-direction: column; padding: 2rem; text-align: center; }
  .hero-text-container { max-width: 100%; }
  .hero-image-container { position: relative; width: 100%; height: 300px; margin-top: 2rem; }
  .hero-title { font-size: 2rem; }
  .hero-subtitle { font-size: 1.2rem; }
  .hero-stats { justify-content: center; gap: 1rem; }
  .carousel-description { max-width: 100%; }
  .opening-line { font-size: 1.8rem; }
}
</style>
