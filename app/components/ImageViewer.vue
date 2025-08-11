<template>
  <div>
    <img :src="thumbnailSrc" :alt="altText" @click="showModal = true" class="thumbnail-image" />

    <div v-if="showModal" class="image-modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <img :src="fullSizeSrc" :alt="altText" class="full-size-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  thumbnailSrc: {
    type: String,
    required: true,
  },
  fullSizeSrc: {
    type: String,
    required: true,
  },
  altText: {
    type: String,
    default: 'Image',
  },
});

const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
};

// Function to handle key presses
const handleKeydown = (event) => {
  // Check if the Esc key was pressed and the modal is visible
  if (event.key === 'Escape' && showModal.value) {
    closeModal();
  }
};

// Add the event listener when the component is mounted
onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

// Remove the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
/* (Same CSS as before) */
.thumbnail-image {
  cursor: zoom-in;
  /* max-width: 200px; */
  height: auto;
}

.image-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
}

.modal-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.full-size-image {
  max-width: 100%;
  max-height: 100vh;
  display: block;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 35px;
  color: white;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
</style>