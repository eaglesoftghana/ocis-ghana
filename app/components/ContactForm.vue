<template>
  <div class="form-container">
    <h5 class="form-title">Get in Touch</h5>
    <p class="">
      We're here to help you. Fill out the form below and we'll get back to you as soon as possible.
    </p>

    <form @submit.prevent="submitForm" class="contact-form shadow-lg p-4">
      <div class="text-input-control">
        <label for="name">Name</label>
        <input type="text" placeholder="Please enter your full name" id="name" v-model="formData.name" required
          class="text-input">
      </div>

      <div class="text-input-control">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Please enter your email address" v-model="formData.email" required
          class="text-input">
      </div>

      <div class="text-input-control">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" placeholder="Please enter your phone number" v-model="formData.phone"
          class="text-input">
      </div>

      <div class="text-input-control">
        <label for="church">Church Name</label>
        <input maxlength="120" minlength="5" type="text" id="church" placeholder="Please enter the name of your church"
          v-model="formData.church" class="text-input">
      </div>

      <div class="text-input-control full-width">
        <label for="message">Message</label>
        <textarea placeholder="Please enter your message here ..." ref="message" id="message" v-model="formData.message"
          minlength="25" maxlength="600" rows="5" required class="text-input"></textarea>
      </div>

      <div class="">
        <button type="submit" class="button md primary">Send Message</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  phone: '',
  church: '',
  message: ''
});

const { $notify } = useNuxtApp();

const submitForm = () => {
  // Logic to handle form submission (e.g., API call)
  console.log('Form submitted:', formData.value);
  // alert('Thank you for your message! We will get back to you soon.');

  $notify.show('success', 'Success', 'Your feedback has been sent')
  // Clear the form
  formData.value = {
    name: '',
    email: '',
    phone: '',
    church: '',
    message: ''
  };
};
</script>

<style scoped>
/* Form Layout */
.contact-form {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 640px) {
  .contact-form {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    box-shadow: none !important;
  }
}


.full-width {
  grid-column: span 1 / span 1;
}

@media (min-width: 640px) {
  .full-width {
    grid-column: span 2 / span 2;
  }
}

/* Submit Button */
.submit-button-container {
  grid-column: span 1 / span 1;
}

@media (min-width: 640px) {
  .submit-button-container {
    grid-column: span 2 / span 2;
    text-align: center;
  }
}
</style>
