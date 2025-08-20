<template>
  <div class="carousel">
    <div class="carousel-container" @touchstart.passive="startDrag" @touchmove.passive="duringDrag"
      @touchend.passive="endDrag" @mousedown="startDrag" @mousemove="duringDrag" @mouseup="endDrag"
      @mouseleave="endDrag">
      <div class="carousel-track" :style="trackStyle">
        <slot />
      </div>
    </div>

    <button v-if="showControls" class="carousel-nav prev" @click="prev">‹</button>
    <button v-if="showControls" class="carousel-nav next" @click="next">›</button>

    <div v-if="showIndicators" class="carousel-indicators">
      <span v-for="i in slideCount" :key="i" :class="{ active: currentIndex === i - 1 }" @click="goTo(i - 1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  autoplay?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
}>(), {
  autoplay: false,
  interval: 5000,
  showControls: true,
  showIndicators: true
})

const currentIndex = ref(0)
const slideCount = ref(0)
const containerWidth = ref(0)
const isDragging = ref(false)
const startPos = ref(0)
const currentTranslate = ref(0)
const prevTranslate = ref(0)
const autoplayTimer = ref<NodeJS.Timeout | null>(null)
const animationID = ref<number | null>(null)

const trackStyle = computed(() => ({
  transform: `translateX(${currentTranslate.value}px)`,
  transition: isDragging.value ? 'none' : 'transform 0.4s ease-out'
}))

// Get slide count from slot
const updateSlideCount = () => {
  nextTick(() => {
    const slotElements = document.querySelector('.carousel-track')?.children
    slideCount.value = slotElements?.length || 0
  })
}

// Initialize carousel dimensions
const initCarousel = () => {
  const container = document.querySelector('.carousel-container') as HTMLElement
  if (container) {
    containerWidth.value = container.offsetWidth
    prevTranslate.value = -currentIndex.value * containerWidth.value
    currentTranslate.value = prevTranslate.value
  }
}

// Navigation methods
const goTo = (index: number) => {
  if (index < 0) index = slideCount.value - 1
  else if (index >= slideCount.value) index = 0

  currentIndex.value = index
  prevTranslate.value = -currentIndex.value * containerWidth.value
  currentTranslate.value = prevTranslate.value
}

const next = () => goTo(currentIndex.value + 1)
const prev = () => goTo(currentIndex.value - 1)

// Dragging functionality
const getPositionX = (event: TouchEvent | MouseEvent) => {
  return event.type.includes('touch')
    ? (event as TouchEvent).touches[0].clientX
    : (event as MouseEvent).clientX
}

const startDrag = (event: TouchEvent | MouseEvent) => {
  if (event.type === 'mousedown' && (event as MouseEvent).button !== 0) return

  isDragging.value = true
  startPos.value = getPositionX(event)
  animationID.value = requestAnimationFrame(animation)
}

const duringDrag = (event: TouchEvent | MouseEvent) => {
  if (!isDragging.value) return
  const currentPosition = getPositionX(event)
  const diff = currentPosition - startPos.value
  currentTranslate.value = prevTranslate.value + diff
}

const endDrag = () => {
  if (!isDragging.value) return

  isDragging.value = false
  if (animationID.value) cancelAnimationFrame(animationID.value)

  const diff = prevTranslate.value - currentTranslate.value
  const threshold = containerWidth.value * 0.2

  if (diff > threshold) {
    next()
  } else if (diff < -threshold) {
    prev()
  } else {
    currentTranslate.value = prevTranslate.value
  }
}

const animation = () => {
  // Placeholder for smooth dragging effects
  animationID.value = requestAnimationFrame(animation)
}

// Autoplay control
const startAutoplay = () => {
  if (props.autoplay) {
    autoplayTimer.value = setInterval(() => {
      next()
    }, props.interval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

// Lifecycle hooks
onMounted(() => {
  updateSlideCount()
  initCarousel()
  window.addEventListener('resize', initCarousel)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('resize', initCarousel)
  stopAutoplay()
  if (animationID.value) cancelAnimationFrame(animationID.value)
})

// Watch for prop changes
watch(() => props.autoplay, (newVal) => {
  newVal ? startAutoplay() : stopAutoplay()
})
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel-container {
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
}

.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.carousel-track>* {
  flex-shrink: 0;
  width: 100%;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.carousel-nav:hover {
  background: rgba(0, 0, 0, 0.8);
}

.carousel-nav.prev {
  left: 15px;
}

.carousel-nav.next {
  right: 15px;
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.carousel-indicators span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s;
}

.carousel-indicators span.active {
  background: white;
}
</style>