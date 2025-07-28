
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
    <div class="hero-image-container">
      <NuxtImg :src="item.url" :alt="item.title" class="hero-image" @error="onImageError" loading="lazy" />
    </div>
    <div class="hero-text-container">
      <div class="hero-text-overlay">
        <h1 class="hero-title">{{ item.title }}</h1>
        <h2 class="hero-subtitle">{{ item.subtitle }}</h2>
        <p class="hero-quote">{{ item.quote }}</p>
      </div>
    </div>

    <!-- 描述信息独立放置在底部 -->
    <div class="carousel-info">
      <p class="carousel-description">{{ item.description }}</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({ item: Object });

  const onImageError = (event) => {
    event.target.style.display = 'none';
  }
</script>

<style scoped>
/* Desktop-first styles */
.opening-content, .hero-content { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
.opening-content { text-align: center; }
.opening-text-container { max-width: 800px; padding: 0 2rem; }
.opening-line { font-size: 2.5rem; font-weight: 700; color: #ffffff; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); margin: 1rem 0; opacity: 0; transform: translateY(30px); animation: fadeInUp 1s ease-out forwards; }

.hero-content { justify-content: space-between; padding: 0 4rem; position: relative; }
.hero-text-container { flex: 1; max-width: 50%; z-index: 3; position: relative; display: flex; flex-direction: column; justify-content: center; }
.hero-text-overlay { padding: 2.5rem; }

.hero-title { font-size: 3rem; font-weight: 800; color: #ffffff; margin-bottom: 1rem; text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5); }
.hero-subtitle { font-size: 2rem; font-weight: 600; color: #ffd700; margin-bottom: 1.5rem; }
.hero-quote { font-size: 1.5rem; color: #e0e7ff; margin-bottom: 2rem; font-style: italic; line-height: 1.6; }



.hero-image-container { position: absolute; right: 0; top: 0; width: 50%; height: 100%; z-index: 1; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.hero-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }

/* 描述信息独立定位 */
.carousel-info {
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  right: 4rem;
  text-align: left;
  z-index: 3;
}
.carousel-description {
  font-size: 1.2rem;
  color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  max-width: 75%;
  margin: 0;
  line-height: 1.6;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(0, 0, 0, 0.6);
}

@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

/* Mobile Styles */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    padding: 1rem;
    text-align: center;
    justify-content: flex-start;
    overflow-y: auto;
  }

  .hero-image-container {
    position: relative;
    order: 1;
    width: 100%;
    height: 220px;
    margin-bottom: 1rem;
  }

  .hero-image {
    object-fit: contain;
  }

  .hero-text-container {
    order: 2;
    width: 100%;
    max-width: 100%;
    padding: 0 1rem;
    justify-content: flex-start;
  }

  .hero-text-overlay {
    padding: 1rem 0;
  }

  .hero-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .hero-quote {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }



  /* 移动端描述信息 */
  .carousel-info {
    position: relative;
    bottom: auto;
    left: auto;
    right: auto;
    padding: 0 1rem;
    margin-top: 1rem;
    text-align: center;
    order: 3;
  }

  .carousel-description {
    font-size: 0.9rem;
    padding: 1rem;
    max-width: 100%;
    color: #ffffff;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 16px rgba(0, 0, 0, 0.7);
  }

  .opening-line {
    font-size: 1.5rem;
  }
}
</style>
