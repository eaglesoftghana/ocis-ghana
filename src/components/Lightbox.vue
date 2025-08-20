<script setup>
import { defineProps, defineEmits, ref, watch, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  src: { type: String, required: true },
  alt: { type: String, default: '' },
});

const emit = defineEmits(['close']);

const lightboxImage = ref(null);
const zoomLevel = ref(1);
const zoomStep = 0.5;
const maxZoom = 4;
const isDragging = ref(false);
const startPosition = ref({ x: 0, y: 0 });
const imagePosition = ref({ x: 0, y: 0 });

// Initialize with a default value to prevent SSR errors
const screenWidth = ref(0);
const isMobile = computed(() => screenWidth.value < 768);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const resetState = () => {
  zoomLevel.value = 1;
  imagePosition.value = { x: 0, y: 0 };
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close');
  }
};

const zoomIn = () => {
  if (isMobile.value && zoomLevel.value < maxZoom) {
    zoomLevel.value += zoomStep;
  }
};

const zoomOut = () => {
  if (isMobile.value && zoomLevel.value > 1) {
    zoomLevel.value -= zoomStep;
  }
  if (zoomLevel.value <= 1) {
    resetState();
  }
};

const startDrag = (event) => {
  if (zoomLevel.value <= 1 || !isMobile.value) return;
  isDragging.value = true;
  startPosition.value = {
    x: event.clientX || event.touches[0].clientX,
    y: event.clientY || event.touches[0].clientY,
  };
  event.preventDefault();
};

const drag = (event) => {
  if (!isDragging.value) return;
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const dx = clientX - startPosition.value.x;
  const dy = clientY - startPosition.value.y;
  imagePosition.value = {
    x: imagePosition.value.x + dx,
    y: imagePosition.value.y + dy,
  };
  startPosition.value = { x: clientX, y: clientY };
};

const stopDrag = () => {
  isDragging.value = false;
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    resetState();
    window.addEventListener('keydown', handleKeydown);
  } else {
    window.removeEventListener('keydown', handleKeydown);
  }
});

watch(isMobile, (newVal) => {
  if (!newVal) {
    resetState();
  }
});

// Use onMounted to ensure window is available
onMounted(() => {
  // Set the initial screen width
  screenWidth.value = window.innerWidth;

  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchmove', drag);
  window.addEventListener('touchend', stopDrag);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('mousemove', drag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', drag);
  window.removeEventListener('touchend', stopDrag);
});
</script>
<template>
  <div v-if="isOpen" class="lightbox" @click.self="$emit('close')">
    <div v-if="isMobile" class="controls">
      <button @click="zoomOut" :disabled="zoomLevel <= 1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-zoom-out">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>
      <button @click="zoomIn" :disabled="zoomLevel >= maxZoom">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-zoom-in">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </button>
    </div>

    <span class="close-btn" @click="$emit('close')">&times;</span>
    <div class="image-wrapper" @mousedown="isMobile && startDrag($event)" @touchstart="isMobile && startDrag($event)">
      <img ref="lightboxImage" :src="src" :alt="alt" class="lightbox-image"
        :style="{ transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)` }" />
    </div>
  </div>
</template>

<style scoped>
/* All CSS from the previous version remains the same */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
}

.image-wrapper {
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: transform 0.2s ease;
  cursor: grab;
}

.lightbox-image:active {
  cursor: grabbing;
}

.controls {
  position: absolute;
  bottom: 20px;
  display: flex;
  gap: 10px;
}

.controls button {
  background-color: var(--color-primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.controls button:hover {
  background-color: var(--color-primary-light);
}

.controls button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #ccc;
}
</style>