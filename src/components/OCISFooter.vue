<script setup>
import { MailIcon, PhoneCallIcon } from 'lucide-vue-next'

</script>

<template>
  <footer class="bg-primary text-gray-300 py-4 sticky top-100">
    <div class="layout" style="max-width: 992px;">
      <div class="text-center md:text-left">
        <ul class="list-unstyled">
          <li class="flex items-center" style="gap: 1rem;">
            <MailIcon :size="20" />
            <a href="mailto:info@ocisghana.com" class="text-light">
              info@ocisghana.com
            </a>
          </li>
          <li class="flex items-center mt-2" style="gap: 1rem;">
            <PhoneCallIcon :size="20" />
            <a href="tel:+233504411952" class="text-light">
              050 441 1952
            </a>
          </li>
          <li class="flex items-center mt-2" style="gap: 1rem;">
            <PhoneCallIcon :size="20" />
            <a href="tel:+233543093942" class="text-light">
              054 309 3942
            </a>
          </li>
        </ul>
      </div>
      <div class="my-3 flex flex-wrap justify-center lg:justify-between items-center text-white" style="gap: 0.25rem">
        <small class="">
          Copyright &copy; {{ new Date().getFullYear() }} OCIS GHANA. All rights reserved.
        </small>
        <div class="flex items-center">
          <small class="pr-2">
            Powered by:
          </small>

          <a target="_blank" referrerpolicy="origin" href="//eaglesoftghana.github.io" class="text-sm d-block"
            style="color: #029b47;">
            Eaglesoft Ghana
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.whatsapp-icon {
  width: 50px;
  /* You can change the size */
  height: 50px;
  fill: green;
  /* You can change the color */
}

.input-wrapper input.text-input {
  padding-left: 2.8rem !important;
}

a.hover\:text-link:hover {
  color: var(--color-info-alt);
}

.social-links a {
  margin-right: var(--spacing-3);
  margin-left: var(--spacing-0);
  border-radius: 15%;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  text-decoration: none;
  background-color: var(--color-light) !important;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
}

.social-links a:nth-child(1) {
  background-color: inherit;
  color: rgb(0, 66, 207);
}

.social-links a:nth-child(2) {
  background-color: inherit;
  color: rgb(0, 194, 97);

}

.social-links a:nth-child(3) {
  background-color: inherit;
  color: black;

}

.social-links a:nth-child(4) {
  background-color: inherit;
  color: rgb(255, 23, 23);
}
</style>