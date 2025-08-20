<template>
  <div class="form-container">
    <h4 class="mt-5 text-center text-base lg:text-left">
      Get in Touch
    </h4>
    <p class="">
      We're here to help you. Fill out the form below and we'll get back to you as soon as possible.
    </p>

    <form @submit.prevent="submitForm" class="contact-form py-4">
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
        <button :disabled="isSubmiting" type="submit" class="button md primary">
          <span class="flex items-center" v-if="isSubmiting">
            sending
            <LoaderIcon class="spin text-white ml-2" :size="20" />
          </span>
          <span v-else> Send message </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { LoaderIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { Notify } from './utils/Notify';

const isSubmiting = ref(false);

const formData = ref({
  name: '',
  email: '',
  phone: '',
  church: '',
  message: ''
});

const  $notify  = new Notify();

const submitForm = async () => {
  isSubmiting.value = true;

  const data = {
    service_id: 'default_service',
    template_id: 'template_g19rjxj',
    user_id: 'nkAo3zineVWvhMwP0',
    template_params: {
      'name': formData.value.name.toUpperCase(),
      'phone': formData.value.phone,
      'email': formData.value.email,
      'church': formData.value.church.toUpperCase(),
      'message': formData.value.message
    }
  };
  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  } catch (err) {
    console.error('🟥 Mail Error: ', err)
    throw new Error('🟥 Mail Error: ', err);
  } finally {
    $notify.show('success', 'Success', 'Your message has been sent', 10000)
    isSubmiting.value = false
  }

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

textarea {
  font-size: inherit;
  /* font-family: inherit; */
}
</style>
