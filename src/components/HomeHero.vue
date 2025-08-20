<script setup>
import img from '~/assets/image/web-bg.webp';

</script>

<template>
  <div class="home__hero__wrapper" :style="{ backgroundImage: `url(${img})` }">
    <div class="header-overlay h-100">
      <div class="layout d-flex justify-center items-center h-100">
        <Swiper :item-count="3" :show-controls="false" show-indicators="true" autoplay :interval="5000">
          <template v-slot="{ index, isActive }">
            <div class="home__hero__content text-center" v-show="index === 0">
              <h1 class="font-bold mb-4 text-success">Eaglesoft Ghana</h1>
              <p class="text-lg text-white mb-6">Your one-stop solution for all your software needs.</p>
              <nuxt-link to="/services" role="button" class="button success">Explore Services</nuxt-link>
            </div>
            <div class="home__hero__content text-center" v-show="index === 1">
              <h1 class="font-bold mb-4 text-success">Innovative Solutions</h1>
              <p class="text-lg text-white mb-6">Crafting software that empowers your business.</p>
              <nuxt-link to="/products" role="button" class="button success">Learn More</nuxt-link>
            </div>
            <div class="home__hero__content text-center" v-show="index === 2">
              <h1 class="font-bold mb-4 text-success">Join Us Today</h1>
              <p class="text-lg text-white mb-6">Experience the future of software development with us.</p>
              <nuxt-link to="/contact" role="button" class="button success">Contact Us</nuxt-link>
            </div>
          </template>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style>
.home__hero__wrapper {
  position: relative;
  height: 60vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
}

@media screen and (max-width: 768px) {
  .home__hero__wrapper {
    height: 60vh;
  }

  .header-overlay {
    -webkit-backdrop-filter: blur(2.5px) !important;
    backdrop-filter: blur(2.5px) !important;
  }
}

@media screen and (max-width: 426px) {
  .header-overlay {
    -webkit-backdrop-filter: blur(1.5px) !important;
    backdrop-filter: blur(1.5px) !important;
  }
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
}
</style>