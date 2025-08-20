<template>
  <div class="carousel">
    <div class="carousel-container"
         @touchstart.passive="startDrag"
         @touchmove.passive="duringDrag"
         @touchend.passive="endDrag"
         @mousedown="startDrag"
         @mousemove="duringDrag"
         @mouseup="endDrag"
         @mouseleave="endDrag">
      
      <Transition :name="transitionName" mode="out-in">
        <div class="carousel-item" :key="currentIndex">
          <slot name="item" :item="currentItem" :index="currentIndex">
            <div class="default-item">
              {{ currentItem }}
            </div>
          </slot>
        </div>
      </Transition>
    </div>

    <button v-if="showControls" class="carousel-nav prev" @click="prev">‹</button>
    <button v-if="showControls" class="carousel-nav next" @click="next">›</button>

    <div v-if="showIndicators" class="carousel-indicators">
      <span v-for="i in items.length" 
            :key="i"
            :class="{ active: currentIndex === i - 1 }"
            @click="goTo(i - 1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  items: any[],
  autoplay?: boolean,
  interval?: number,
  showControls?: boolean,
  showIndicators?: boolean,
  transitionType?: 'slide' | 'fade'
}>(), {
  autoplay: false,
  interval: 5000,
  showControls: true,
  showIndicators: true,
  transitionType: 'slide'
})

const currentIndex = ref(0)
const autoplayTimer = ref<NodeJS.Timeout | null>(null)
const isDragging = ref(false)
const startPos = ref(0)
const dragDirection = ref<'left' | 'right' | null>(null)
const transitionName = computed(() => `carousel-${props.transitionType}`)

const currentItem = computed(() => {
  return props.items[currentIndex.value]
})

// Navigation methods
const goTo = (index: number) => {
  if (props.items.length === 0) return
  
  // Handle wrap-around
  if (index < 0) index = props.items.length - 1
  else if (index >= props.items.length) index = 0
  
  currentIndex.value = index
}

const next = () => {
  const newIndex = currentIndex.value + 1
  dragDirection.value = 'left'
  goTo(newIndex)
}

const prev = () => {
  const newIndex = currentIndex.value - 1
  dragDirection.value = 'right'
  goTo(newIndex)
}

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
  dragDirection.value = null
}

const duringDrag = (event: TouchEvent | MouseEvent) => {
  if (!isDragging.value) return
  const currentPosition = getPositionX(event)
  const diff = currentPosition - startPos.value
  
  // Update direction based on drag
  if (Math.abs(diff) > 10) {
    dragDirection.value = diff > 0 ? 'right' : 'left'
  }
}

const endDrag = () => {
  if (!isDragging.value) return
  
  isDragging.value = false
  
  if (dragDirection.value === 'left') {
    next()
  } else if (dragDirection.value === 'right') {
    prev()
  }
  
  dragDirection.value = null
}

// Autoplay control
const startAutoplay = () => {
  if (props.autoplay && props.items.length > 1) {
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
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

// Watch for changes
watch(() => props.autoplay, (newVal) => {
  newVal ? startAutoplay() : stopAutoplay()
})

watch(() => props.items, () => {
  currentIndex.value = 0
})
</script>

<style scoped>
.carousel,
.carousel * {
  box-sizing: border-box;
}

.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
  touch-action: pan-y;
}

.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Slide transition */
.carousel-slide-enter-active,
.carousel-slide-leave-active {
  transition: transform 0.6s ease, opacity 0.6s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-slide-enter-from {
  transform: translateX(100%);
}

.carousel-slide-leave-to {
  transform: translateX(-100%);
}

.carousel-slide-enter-from.reverse,
.carousel-slide-leave-to.reverse {
  transform: translateX(-100%);
}

.carousel-slide-enter-from.reverse {
  transform: translateX(-100%);
}

.carousel-slide-leave-to.reverse {
  transform: translateX(100%);
}

/* Fade transition */
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  z-index: 10;
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

.default-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #f0f0f0;
  font-size: 2rem;
  width: 100%;
}
</style>