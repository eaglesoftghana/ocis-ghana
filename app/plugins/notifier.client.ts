import { Notify } from "~/components/utils/Notify";

export default defineNuxtPlugin(() => {
  // Create a single instance of your Notify class
  const notifier = new Notify();

  // Provide the instance to the Nuxt app
  return {
    provide: {
      notify: notifier
    }
  };
});