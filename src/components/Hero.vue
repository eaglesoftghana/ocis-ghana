<script setup>
import img from '~/assets/image/web-bg.webp';

const props = defineProps({
  name: {
    type: String,
    default: 'Eaglesoft GH'
  },
});
</script>

<template>
  <div class="hero__wrapper" :style="{ backgroundImage: `url(${img})` }">
    <div class="header-overlay h-100">
      <div class="layout d-flex justify-center items-center h-100">
        <div class="home__hero__content text-center">
          <h1 class="lg:text-2xl text-lg font-bold text-white mb-4">Eaglesoft Ghana - {{ props.name }} </h1>
          <p class="lg:text-lg text-white mb-6">
            Explore our vast software nicely crafted just for you.</p>
          <!-- <nuxt-link to="/services" role="button" class="button primary">Explore Services</nuxt-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hero__wrapper {
  position: relative;
  height: 40vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
}
@media screen and (max-width: 768px){
  .hero__wrapper {
    height: 35vh;
  }
}
</style>