<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { AlignRightIcon } from 'lucide-vue-next';

// Reactive variables
const links = ref(['home', 'about', 'features', 'pricing', 'contact']);
const activeSection = ref(null);

// const handleScroll = () => {
//   const scrollY = window.scrollY;

//   // Find the currently visible section
//   links.value.forEach(link => {
//     const element = document.getElementById(link);
//     if (element) {
//       const offsetTop = element.offsetTop;
//       const offSetHeight = element.offsetHeight;

//       // Check if the section is in the viewport, with an offset
//       if (scrollY >= offsetTop - 150 && scrollY < offsetTop ) {
//         activeSection.value = link;
//       }
//     }
//   });
// };
const handleScroll = () => {
  // Define an offset for when a section is considered "active"
  const offset = 150;

  // Find the currently visible section
  const visibleSection = links.value.find(link => {
    const element = document.getElementById(link);
    if (!element) return false;

    // Get the element's position relative to the viewport
    const rect = element.getBoundingClientRect();

    // Check if the top of the element is within the active zone
    // The active zone is from 0 to 'offset' pixels from the top of the viewport
    return rect.top <= offset && rect.bottom > offset;
  });

  // If a section is found, update the activeSection ref and the URL hash
  if (visibleSection) {
    activeSection.value = visibleSection;

    // Use history.replaceState to update the URL without adding a new history entry
    // This is important to avoid cluttering the browser's back/forward history
    if (window.location.hash !== `#${visibleSection}`) {
      history.replaceState(null, '', `#${visibleSection}`);
    }
  }
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 150, // Subtracting header height
      behavior: 'smooth'
    });
    // Update URL hash without causing a jump
    history.pushState(null, '', `#${id}`);
  }
  // toggleMenu();
};

onMounted(() => {
  // Use a template ref for the header element
  activeSection.value = 'home'
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('click', hideMenu);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('click', hideMenu);

});

const isMenuShown = ref(false);

const toggleMenu = () => {
  isMenuShown.value = !isMenuShown.value
}

function hideMenu(event) {
  if (!event.target.classList.contains('nav-toggler')) {
    isMenuShown.value = false
  }
}
</script>

<template>
  <div class="app-header fixed top-0 left-0 right-0 z-index-100 mb-2 shadow scrolling" style="margin-bottom: 75px;">
    <header class="layout py-2" style="max-width: 992px;">
      <nav class="flex  items-center justify-between">
        <h4 class="app__name__header text-success cursor-pointer" @click="$router.push('/')">
          OCIS GHANA
        </h4>
        <div class="md:d-none">
          <span class="relative nav-toggler" @click="toggleMenu">
            <AlignRightIcon class="user-select-none" style="pointer-events: none;" />
          </span>
        </div>
        <div class="d-none md:d-block">
          <ul class="list-unstyled flex" style="gap: 1.25rem;">
            <li v-for="link in links" :key="link">
              <a class="text-capitalize" :href="`/#${link}`" @click.prevent="scrollToSection(link)"
                :class="{ active: activeSection === link }">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
  <Transition name="slide-in" mode="out-in">
    <div v-if="isMenuShown" class="md:d-none menu fixed bg-body border border-gray-700 p-5 rounded-2"
      style="top: 50px;z-index: 120;right: 12px;">
      <ul class="list-unstyled flex flex-column" style="gap: 1.25rem;">
        <li v-for="link in links" :key="link">
          <a :href="`/#${link}`" @click.prevent="scrollToSection(link)" class="p-2 text-capitalize"
            :class="{ active: activeSection === link }">
            {{ link }}
          </a>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style>
.backdrop {
  background-color: rgba(0, 0, 0, 0.25);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  display: flex;
  justify-content: end;
}

a.active {
  color: var(--color-success) !important;
  font-weight: bold;
  border-bottom: 2px solid var(--color-success);
}

.app-header {
  transition: all .3s ease-in-out;
  color: var(--color-light);
}

.app-header.scrolling {
  transition: all .3s ease-in-out;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  background-color: rgba(255, 255, 255, 0.05);

}
</style>