<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

// Define props for the component
interface TypewriterEffectProps {
  text: string; // Array of strings to be typed
  typingSpeed?: number; // Speed of typing (ms per character)
  deletingSpeed?: number; // Speed of deleting (ms per character)
  pauseBeforeDeleting?: number; // Pause before starting to delete (ms)
  pauseBeforeTyping?: number; // Pause before starting to type the next sentence (ms)
}

const props = withDefaults(defineProps<TypewriterEffectProps>(), {
  typingSpeed: 100, // Default typing speed
  deletingSpeed: 50, // Default deleting speed
  pauseBeforeDeleting: 1500, // Default pause before deleting
  pauseBeforeTyping: 500, // Default pause before typing
});

// Reactive state variables
const displayedText = ref(''); // The text currently displayed
const textIndex = ref(0); // Index of the current text in the 'texts' array
const charIndex = ref(0); // Index of the current character being typed/deleted
const isDeleting = ref(false); // Flag to indicate if the component is in deleting mode
let timeoutId: number | null = null; // Variable to store the timeout ID for cleanup

// Function to handle the typing/deleting logic
const handleTyping = (): void => {
  const currentText = props.text;

  if (!isDeleting.value) {
    // Typing mode
    if (charIndex.value < currentText.length) {
      // Add next character
      displayedText.value += currentText.charAt(charIndex.value);
      charIndex.value++;
      timeoutId = window.setTimeout(handleTyping, props.typingSpeed);
    } else {
      // Finished typing the current sentence, pause then start deleting
      timeoutId = window.setTimeout(() => {
        isDeleting.value = true;
      }, props.pauseBeforeDeleting);
    }
  } else {
    // Deleting mode
    if (charIndex.value > 0) {
      // Remove last character
      displayedText.value = currentText.substring(0, charIndex.value - 1);
      charIndex.value--;
      timeoutId = window.setTimeout(handleTyping, props.deletingSpeed);
    } else {
      // Finished deleting, move to the next sentence
      isDeleting.value = false;
      textIndex.value = (textIndex.value + 1) % props.text.length; // Loop back to the start
      charIndex.value = 0; // Reset character index for the new sentence
      displayedText.value = ''; // Clear displayed text before next typing cycle
      timeoutId = window.setTimeout(handleTyping, props.pauseBeforeTyping);
    }
  }
};

// Start typing effect when the component is mounted
onMounted(() => {
  handleTyping();
});

// Cleanup timeout when the component is unmounted
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});

// Watch for changes in `texts` prop to restart the effect if needed
watch(
  () => props.text,
  () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    displayedText.value = '';
    textIndex.value = 0;
    charIndex.value = 0;
    isDeleting.value = false;
    handleTyping();
  }
);
</script>

<template>
  <h5 class="text-center font-semibold text-xl  pb-3 text-success" style="line-height: 1;">
    <span class="inline-block px-2 py-1 rounded-md">
      {{ displayedText }}
    </span>
    <!-- Blinking cursor -->
    <span class="font-light text-blue-600 animate-blink">|</span>
  </h5>

  <!-- Global styles and font loading -->
</template>
<!-- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" /> -->
<!-- <script src="https://cdn.tailwindcss.com"></script> -->
<style>
/* Custom blinking animation for the cursor */
@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s infinite step-end;
}

</style>
