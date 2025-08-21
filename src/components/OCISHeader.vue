<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { AlignRightIcon, CircleDollarSignIcon, CircleQuestionMarkIcon, DollarSignIcon, HomeIcon, PackageOpen, PhoneCall, PhoneIcon, UserCircleIcon, UserIcon } from 'lucide-vue-next';

// Reactive variables
const links = ref(['home', 'about', 'features', 'pricing', 'contact', 'login']);
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
  const offset = 100;

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

const scrollToSection = (id, href = null) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 100, // Subtracting header height
      behavior: 'smooth'
    });
    // Update URL hash without causing a jump
    history.pushState(null, '', `#${id}`);
  } else if (href) {
    window.open(href, '_blank')
  }
  // toggleMenu();
};

onMounted(() => {
  // Use a template ref for the header element
  // activeSection.value = 'home'
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
  <div class="app-header shadow-md fixed top-0 left-0 right-0 z-index-120 mb-2 shadow scrolling"
    style="max-height: 70px;">
    <header class="layout py-2" style="max-width: 992px;">
      <nav class="flex items-center justify-between">
        <h6 class="text-2x font-semibold text-success user-select-none cursor-pointer" @click="scrollToSection('home')">
          OCIS GHANA
        </h6>
        <div class="md:d-none">
          <button type="button" class="button sm relative nav-toggler" @click="toggleMenu">
            <AlignRightIcon class="user-select-none" style="pointer-events: none;" />
          </button>
        </div>
        <div class="d-none md:d-block">
          <ul class="list-unstyled flex" style="gap: 1rem;">
            <li class="flex items-center" v-for="link in links" :key="link">
              <a :target="link === 'login' && '_blank'" :role="link === 'login' && 'button'"
                :title="link === 'login' && 'Login'" class="text-capitalize"
                :href="link === 'login' ? null : `/#${link}`"
                @click.prevent="scrollToSection(link, link === 'login' && '//app.ocisghana.com/login')"
                :class="{ active: activeSection === link, 'button outline sm success': link === 'login' }">
                {{ link }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
  <Transition name="slide-in" mode="out-in">
    <div v-if="isMenuShown"
      class="md:d-none menu fixed bg-gray-200 shadow-lg border border-gray-300 dark:border-gray-700 px-5 py-2 rounded-2"
      style="top: 50px;z-index: 120;right: 12px;">
      <ul class="list-unstyled flex flex-column">
        <li :class="{ active: activeSection === link }" v-for="link in links" :key="link">
          <a :target="link === 'login' ? '_blank' : '_self'"
            :href="link === 'login' ? '//app.ocisghana.com/login' : `#${link}`"
            class="p-2 text-capitalize flex items-center" style="gap: 1rem;"
            :class="{ active: activeSection === link, 'button success': link === 'login' }">
            <span class="flex items-center icon">
              <HomeIcon :size="20" v-if="link === 'home'" />
              <UserCircleIcon :size="22" v-if="link === 'login'" />
              <CircleQuestionMarkIcon :size="20" v-if="link === 'about'" />
              <PackageOpen :size="20" v-if="link === 'features'" />
              <CircleDollarSignIcon :size="22" v-if="link === 'pricing'" />
              <PhoneCall :size="20" v-if="link === 'contact'" />
            </span>
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

a.active,
li.active {
  color: var(--color-success) !important;
  font-weight: bold;
}

.app-header {
  transition: all .3s ease-in-out;
  color: var(--color-light);
}

.app-header.scrolling {
  transition: all .3s ease-in-out;
  /* backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); */
  background-color: var(--color-gray-200);
  /* background-color: rgba(255, 255, 255, 0.05); */

}
</style>

<style scoped>
li>span.icon {
  position: relative;
  width: 25px !important;
  /* background-color: aliceblue; */
}
</style>