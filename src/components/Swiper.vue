<script setup lang="ts">
import { ChevronLeftIcon, ChevronRight } from 'lucide-vue-next';
import { computed, nextTick, onMounted, onUnmounted, ref, useAttrs, watch } from 'vue';


const props = withDefaults(defineProps<{
  itemCount: number,
  autoplay?: boolean,
  interval?: number,
  showControls?: boolean,
  showIndicators?: boolean
}>(), {
  itemCount: 1,
  autoplay: false,
  interval: 5000,
  showControls: true,
  showIndicators: true
});

const attr = useAttrs();

const currentIndex = ref(0)
const containerWidth = ref(0)
const isDragging = ref(false)
const startPos = ref(0)
const currentTranslate = ref(0)
const prevTranslate = ref(0)
const autoplayTimer = ref<number | null>(null)
const animationID = ref<number | null>(null)
const isFocused = ref(false);


// Fixed: Use percentage-based translation
const trackStyle = computed(() => ({
  transform: `translateX(${currentTranslate.value}%)`,
  transition: isDragging.value ? 'none' : 'all 0.3s ease-in-out'
}));

// Initialize carousel dimensions
const initCarousel = () => {
  const container = document.querySelector('.carousel-container') as HTMLElement
  if (container) {
    containerWidth.value = container.offsetWidth
    // Fixed: Initialize with percentage values
    prevTranslate.value = -currentIndex.value * 100
    currentTranslate.value = prevTranslate.value
  }
}

// Navigation methods
const goTo = (index: number) => {
  if (props.itemCount === 0) return

  // Wrap around for infinite effect
  if (index < 0) index = props.itemCount - 1
  else if (index >= props.itemCount) index = 0

  currentIndex.value = index
  // Fixed: Use percentage-based position
  prevTranslate.value = -currentIndex.value * 100
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

  // Fixed: Calculate drag percentage instead of pixels
  const diff = currentPosition - startPos.value
  const dragPercentage = (diff / containerWidth.value) * 100
  currentTranslate.value = prevTranslate.value + dragPercentage
}

const endDrag = () => {
  if (!isDragging.value) return

  isDragging.value = false
  if (animationID.value) cancelAnimationFrame(animationID.value)

  // Fixed: Use percentage-based threshold
  const dragPercentage = currentTranslate.value - prevTranslate.value
  const threshold = 20 // 20% of slide width

  if (dragPercentage < -threshold) {
    next()
  } else if (dragPercentage > threshold) {
    prev()
  } else {
    currentTranslate.value = prevTranslate.value
  }
}

const animation = () => {
  animationID.value = requestAnimationFrame(animation)
}

// Autoplay control
const startAutoplay = () => {
  if (props.autoplay && props.itemCount > 1) {
    stopAutoplay()
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
  initCarousel()
  window.addEventListener('resize', initCarousel)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('resize', initCarousel)
  stopAutoplay()
  if (animationID.value) cancelAnimationFrame(animationID.value)
})

// Watch for changes
watch(() => props.autoplay, (newVal) => {
  newVal ? startAutoplay() : stopAutoplay()
})

watch(() => props.itemCount, () => {
  currentIndex.value = 0
  nextTick(initCarousel)
});
</script>

<template>
  <div class="carousel">
    <div class="carousel-container" @mouseover="stopAutoplay" @touchstart.passive="startDrag"
      @touchmove.passive="duringDrag" @touchend.passive="endDrag" @mousedown="startDrag" @mousemove="duringDrag"
      @mouseup="endDrag" @mouseleave="endDrag" @mouseout="startAutoplay">
      <div class="carousel-track" v-bind="attr" :style="trackStyle">
        <div v-for="index in itemCount" :key="index" class="carousel-item">
          <div class="carousel-item-content">
            <slot :index="index - 1" :isActive="currentIndex === index - 1"></slot>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showIndicators" class="carousel-indicators">
      <span v-for="i in itemCount" :key="i" :class="{ active: currentIndex === i - 1 }" @click="goTo(i - 1)"></span>
    </div>
    <div v-if="isFocused">
      <button v-if="showControls" type="button" title="Previous"
        class="button no-outline dark:bg-gray-800 dark:text-white prev" @click="prev">
        <ChevronLeftIcon />
      </button>
      <button v-if="showControls" type="button" title="Next"
        class="button no-outline dark:bg-gray-800 dark:text-white next" @click="next">
        <ChevronRight />
      </button>
    </div>
  </div>
</template>
<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 100vw;
}

.carousel-container {
  overflow: hidden;
  cursor: default;
  touch-action: pan-y;
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
  width: 100%;
  position: relative;
  flex-wrap: nowrap;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.carousel-item {
  width: 100%;
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-item-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 1rem; */
  user-select: none;
}

/* Ensure no extra space between items */
.carousel-track {
  margin: 0;
  padding: 0;
}

button.prev,
button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  width: clamp(30px, 5vw, 50px);
  height: clamp(30px, 5vw, 50px);
  font-size: clamp(16px, 2vw, 24px);
  cursor: pointer;
  touch-action: auto;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

button.prev:hover,
button.next:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-50%) scale(1.1);
}

button.prev {
  left: clamp(10px, 2vw, 20px);
}

button.next {
  right: clamp(10px, 2vw, 20px);
}

.carousel-indicators {
  position: absolute;
  bottom: clamp(10px, 3vh, 30px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: clamp(6px, 1vw, 12px);
  z-index: 10;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(4px);
}

.carousel-indicators span {
  display: inline-block;
  width: clamp(8px, 1.5vw, 12px);
  height: clamp(8px, 1.5vw, 12px);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.carousel-indicators span:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.carousel-indicators span.active {
  background: white;
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.2);
}

@media (max-width: 768px) {

  button.prev,
  button.next {
    opacity: 0.8;
  }

  .carousel-indicators {
    bottom: 5px;
  }
}
</style>