

<template>
  <div class="starfield-background">
    <div class="star-layer-scorpius" :style="starfieldStyles.scorpius"></div>
    <div class="scorpius-constellation">
      <svg class="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points="10,40 10.2,44.5 10.3,48 10.1,53" class="constellation-line" />
        <polyline points="10.2,44.5 8.8,46.5 8.1,49 7.8,52.5" class="constellation-line" />
        <polyline points="7.8,52.5 7.4,58 7.6,64 7.7,70" class="constellation-line" />
        <polyline points="7.7,70 6.5,72 5.2,72.5 3.6,72" class="constellation-line" />
        <polyline points="3.6,72 4.4,68.5 5.2,63.5 3.6,60.5" class="constellation-line" />
      </svg>
    </div>
    <div class="star-layer-aquarius" :style="starfieldStyles.aquarius"></div>
    <div class="aquarius-constellation">
      <svg class="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline points="28,5 23,10 18.5,14.5" class="constellation-line" />
        <polyline points="18.5,14.5 22.3,22.5 26,20" class="constellation-line" />
        <polyline points="18.5,14.5 18,21.5 16.5,21 15.7,24" class="constellation-line" />
        <polyline points="15.7,24 19.6,35.9 20.6,29.2 23.4,29.6 23.8,31.7 25.7,35.7" class="constellation-line" />
      </svg>
    </div>
    <div class="star-layer-1" :style="starfieldStyles.layer1"></div>
    <div class="star-layer-2" :style="starfieldStyles.layer2"></div>
    <div class="star-layer-3" :style="starfieldStyles.layer3"></div>
    <div class="nebula-layer" :style="starfieldStyles.nebula"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Star Generation Logic from starfield.js ---
function generateRandomStars(count, sizeRange, opacityRange, colors) {
  const stars = []
  const usedPositions = new Set()
  for (let i = 0; i < count; i++) {
    let x, y, positionKey
    let attempts = 0
    do {
      x = Math.round(Math.random() * 1000) / 10
      y = Math.round(Math.random() * 1000) / 10
      positionKey = `${Math.floor(x * 2)}-${Math.floor(y * 2)}`
      attempts++
      if (attempts > 100) break
    } while (usedPositions.has(positionKey))
    usedPositions.add(positionKey)
    const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0])
    const opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0])
    const color = colors[Math.floor(Math.random() * colors.length)]
    stars.push({
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      size: Math.round(size * 10) / 10,
      opacity: Math.round(opacity * 100) / 100,
      color: color
    })
  }
  return stars
}

const starColors = [
  'rgba(255, 255, 255, {opacity})',
  'rgba(224, 231, 255, {opacity})',
  'rgba(221, 214, 254, {opacity})',
]

const scorpiusStars = [
  { x: 10, y: 40, size: 7.0, opacity: 1.0, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 10.2, y: 44.5, size: 6.5, opacity: 0.95, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 10.3, y: 48, size: 6.0, opacity: 0.9, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 10.1, y: 53, size: 6.0, opacity: 0.9, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 8.8, y: 46.5, size: 6.5, opacity: 0.85, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 8.1, y: 49, size: 6.0, opacity: 0.85, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 7.8, y: 52.5, size: 6.5, opacity: 0.8, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 7.4, y: 58, size: 6.0, opacity: 0.8, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 7.6, y: 64, size: 6.5, opacity: 0.75, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 7.7, y: 70, size: 6.0, opacity: 0.75, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 6.5, y: 72, size: 6.0, opacity: 0.7, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 5.2, y: 72.5, size: 6.0, opacity: 0.7, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 3.6, y: 72, size: 6.5, opacity: 0.7, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 4.4, y: 68.5, size: 6.0, opacity: 0.65, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 5.2, y: 63.5, size: 6.0, opacity: 0.65, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 3.6, y: 60.5, size: 6.0, opacity: 0.65, color: 'rgba(135, 206, 235, {opacity})' },
]

const aquariusStars = [
  { x: 28, y: 5, size: 7.0, opacity: 1.0, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 23, y: 10, size: 6.5, opacity: 0.95, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 18.5, y: 14.5, size: 6.5, opacity: 0.9, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 18, y: 21.5, size: 6.0, opacity: 0.9, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 16.5, y: 21, size: 6.0, opacity: 0.85, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 15.7, y: 24, size: 6.0, opacity: 0.85, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 22.3, y: 22.5, size: 6.5, opacity: 0.8, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 26, y: 20, size: 6.0, opacity: 0.8, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 19.6, y: 35.9, size: 6.5, opacity: 0.75, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 20.6, y: 29.2, size: 6.0, opacity: 0.75, color: 'rgba(135, 206, 235, {opacity})' },
  { x: 23.4, y: 29.6, size: 6.0, opacity: 0.7, color: 'rgba(176, 224, 230, {opacity})' },
  { x: 23.8, y: 31.7, size: 6.0, opacity: 0.7, color: 'rgba(173, 216, 230, {opacity})' },
  { x: 25.7, y: 35.7, size: 6.5, opacity: 0.7, color: 'rgba(135, 206, 235, {opacity})' },
]

function generateStarCSS(stars) {
  return stars.map(star => {
    const color = star.color.replace('{opacity}', star.opacity)
    return `radial-gradient(${star.size}px ${star.size}px at ${star.x}% ${star.y}%, ${color}, transparent)`
  }).join(',\n    ')
}

const nebulae = [
  { x: 20, y: 8, width: 15, height: 12, color: 'rgba(135, 206, 235, 0.06)' },
  { x: 17, y: 18, width: 12, height: 10, color: 'rgba(176, 224, 230, 0.04)' },
  { x: 23, y: 25, width: 10, height: 8, color: 'rgba(173, 216, 230, 0.05)' },
  { x: 6, y: 50, width: 8, height: 12, color: 'rgba(135, 206, 235, 0.04)' },
  { x: 4, y: 65, width: 6, height: 15, color: 'rgba(176, 224, 230, 0.03)' },
  { x: 8, y: 72, width: 5, height: 8, color: 'rgba(173, 216, 230, 0.04)' },
  { x: 60, y: 20, width: 50, height: 25, color: 'rgba(10, 15, 28, 0.12)' },
  { x: 80, y: 60, width: 45, height: 22, color: 'rgba(15, 23, 42, 0.10)' },
  { x: 15, y: 80, width: 40, height: 20, color: 'rgba(30, 27, 75, 0.08)' },
  { x: 90, y: 30, width: 35, height: 18, color: 'rgba(25, 25, 112, 0.06)' },
  { x: 50, y: 85, width: 30, height: 15, color: 'rgba(72, 61, 139, 0.07)' },
  { x: 40, y: 15, width: 25, height: 12, color: 'rgba(106, 90, 205, 0.05)' },
]

function generateNebulaCSS(nebulae) {
  return nebulae.map(nebula => 
    `radial-gradient(ellipse ${nebula.width}px ${nebula.height}px at ${nebula.x}% ${nebula.y}%, ${nebula.color}, transparent)`
  ).join(',\n    ')
}

const starfieldData = ref({})

onMounted(() => {
  const layer1Stars = generateRandomStars(20, [3.0, 4.0], [0.8, 1.0], starColors)
  const layer2Stars = generateRandomStars(200, [2.0, 3.0], [0.6, 0.8], starColors)
  const layer3Stars = generateRandomStars(300, [1.0, 2.0], [0.4, 0.6], starColors)
  
  starfieldData.value = {
    scorpius: generateStarCSS(scorpiusStars),
    aquarius: generateStarCSS(aquariusStars),
    layer1: generateStarCSS(layer1Stars),
    layer2: generateStarCSS(layer2Stars),
    layer3: generateStarCSS(layer3Stars),
    nebula: generateNebulaCSS(nebulae)
  }
})

const starfieldStyles = computed(() => ({
  scorpius: { backgroundImage: starfieldData.value.scorpius },
  aquarius: { backgroundImage: starfieldData.value.aquarius },
  layer1: { backgroundImage: starfieldData.value.layer1 },
  layer2: { backgroundImage: starfieldData.value.layer2 },
  layer3: { backgroundImage: starfieldData.value.layer3 },
  nebula: { backgroundImage: starfieldData.value.nebula }
}))

</script>

<style scoped>
.starfield-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 800px 400px at 20% 30%, rgba(0, 150, 255, 0.5) 0%, transparent 50%),
    radial-gradient(ellipse 600px 300px at 80% 70%, rgba(30, 200, 255, 0.4) 0%, transparent 50%),
    radial-gradient(ellipse 400px 600px at 60% 20%, rgba(100, 180, 255, 0.35) 0%, transparent 50%),
    radial-gradient(ellipse 500px 350px at 40% 80%, rgba(65, 150, 255, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse 300px 200px at 10% 60%, rgba(0, 220, 255, 0.45) 0%, transparent 50%),
    radial-gradient(ellipse 700px 500px at 90% 40%, rgba(70, 170, 255, 0.35) 0%, transparent 50%),
    linear-gradient(135deg, #0a1428 0%, #1e4c8a 50%, #2a60c8 100%);
  animation: nebulaGlow 25s ease-in-out infinite;
  z-index: 1;
}
.star-layer-scorpius, .star-layer-aquarius, .star-layer-1, .star-layer-2, .star-layer-3, .nebula-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transform: translateZ(0);
  backface-visibility: hidden;
}
.star-layer-scorpius, .star-layer-aquarius { 
  opacity: 0.95;
  animation: constellationGlow 6s ease-in-out infinite;
}
.scorpius-constellation, .aquarius-constellation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
}
.constellation-lines {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.constellation-line {
  fill: none;
  stroke: rgba(135, 206, 235, 0.4);
  stroke-width: 0.15;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 2px rgba(135, 206, 235, 0.3));
  animation: constellationLineGlow 6s ease-in-out infinite;
}
.star-layer-1 { 
  opacity: 1.0;
  animation: starTwinkle 12s ease-in-out infinite;
}
.star-layer-2 { 
  opacity: 0.8;
  animation: starTwinkle 16s ease-in-out infinite reverse;
}
.star-layer-3 { 
  opacity: 0.6;
  animation: starTwinkle 20s ease-in-out infinite;
}
.nebula-layer {
  opacity: 0.6;
  animation: nebulaFlow 30s ease-in-out infinite;
}
@keyframes starTwinkle {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
@keyframes constellationGlow {
  0%, 100% { 
    opacity: 0.9; 
    filter: brightness(1);
  }
  50% { 
    opacity: 1; 
    filter: brightness(1.2) drop-shadow(0 0 3px #87ceeb);
  }
}
@keyframes nebulaFlow {
  0%, 100% {
    opacity: 0.6;
    transform: translateZ(0) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translateZ(0) scale(1.01);
  }
}
@keyframes nebulaGlow {
  0%, 100% { 
    filter: brightness(1) contrast(1);
  }
  25% { 
    filter: brightness(1.1) contrast(1.05);
  }
  50% { 
    filter: brightness(1.2) contrast(1.1);
  }
  75% { 
    filter: brightness(1.1) contrast(1.05);
  }
}
@keyframes constellationLineGlow {
  0%, 100% { 
    opacity: 0.4; 
    stroke: rgba(135, 206, 235, 0.4);
    filter: drop-shadow(0 0 2px rgba(135, 206, 235, 0.3));
  }
  50% { 
    opacity: 0.7; 
    stroke: rgba(135, 206, 235, 0.6);
    filter: drop-shadow(0 0 4px rgba(135, 206, 235, 0.5));
  }
}
@media (prefers-reduced-motion: reduce) {
  .star-layer-1, .star-layer-2, .star-layer-3, .star-layer-scorpius, .star-layer-aquarius, .nebula-layer, .starfield-background {
    animation: none;
  }
}
</style>

