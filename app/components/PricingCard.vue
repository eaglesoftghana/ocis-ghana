<script setup>

const props = defineProps({
  tiers: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(tier =>
        typeof tier.name === 'string' &&
        typeof tier.price === 'string' &&
        typeof tier.period === 'string' &&
        typeof tier.description === 'string' &&
        Array.isArray(tier.features) &&
        typeof tier.isPopular === 'boolean' &&
        typeof tier.isEnterprise === 'boolean' &&
        typeof tier.buttonText === 'string' &&
        typeof tier.buttonTextTitle === 'string' &&
        typeof tier.buttonLink === 'string'
      );
    },
  },
});
</script>

<!-- components/PricingCard.vue -->
<!-- Chosen Palette: Serene Harmony (Background: #f8f9fa, Text: #4a4a4a, Accents: #4f46e5, #16a34a, #2563eb, #9333ea) -->
<template>
  <div class="py-3">
    <p class="text-xl pt-4">
      Find the perfect plan for your church's needs. No hidden fees, just clear value.
    </p>
    <p class="my-6 text-center p-5 text-gray-200 bg-info rounded-2 text-xl border border-gray-900">
      All plans include two months free! (Pay for 10 months, get 12)
    </p>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div v-for="tier in tiers" :key="tier.name" :class="[
        'pricing-card relative rounded-xl shadow-lg transform transition duration-300 ease-in-out border border-gray-700',
        tier.isPopular && 'popular-card', tier.isEnterprise && 'enterprise-card'
      ]">

        <div v-if="tier.isPopular"
          class="popular-tag absolute top-0 right-0 text-xs font-semibold px-3 py-2 rounded-2 bg-primary">
          Most Popular
        </div>
        <div v-if="tier.isEnterprise"
          class="golden-tag absolute top-0 right-0 text-xs font-semibold px-3 py-1 rounded-2 text-white bg-warning">
          Golden
        </div>

        <div class="p-8">
          <h3 class="text-2xl font-semibold">{{ tier.name }}</h3>
          <p class="mt-4">{{ tier.description }}</p>
          <p class="mt-6 text-center">
            <span class="text-3xl font-bold">{{ tier.price }}</span>
            <span v-if="tier.period" class="ml-1 text-2xl font-medium">{{ tier.period }}</span>
          </p>
          <a :href="tier.buttonLink" :title="tier.buttonTextTitle" :class="[
            'button mt-8 block py-3  transition duration-200 ease-in-out',
            tier.isPopular ? 'success' : 'primary', tier.isEnterprise ? '' : ''
          ]">
            {{ tier.buttonText }}
          </a>
        </div>

        <div class="pt-6 pb-8 px-8 rounded-b-xl">
          <h4 class="sr-only">Features</h4>
          <ul role="list" class="space-y-4">
            <li v-for="feature in tier.features" :key="feature" class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Checkmark icon using Unicode -->
                <span class="text-green-500">&#10003;</span>
              </div>
              <p class="ml-3 text-base">{{ feature }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.enterprise-card {
  background-image: linear-gradient(to bottom right, var(--color-primary), var(--color-dark));
}

/* Base styles derived from Tailwind defaults */
.py-12 {
  padding-top: 3rem;
  /* 48px */
  padding-bottom: 3rem;
  /* 48px */
}


.px-4 {
  padding-left: 1rem;
  /* 16px */
  padding-right: 1rem;
  /* 16px */
}

.sm\:px-6 {
  /* For screens >= 640px */
  padding-left: 1.5rem;
  /* 24px */
  padding-right: 1.5rem;
  /* 24px */
}

.lg\:px-8 {
  /* For screens >= 1024px */
  padding-left: 2rem;
  /* 32px */
  padding-right: 2rem;
  /* 32px */
}


.mb-12 {
  margin-bottom: 3rem;
  /* 48px */
}



.sm\:text-5xl {
  /* For screens >= 640px */
  font-size: 3rem;
  /* 48px */
  line-height: 1;
}

.mt-4 {
  margin-top: 1rem;
  /* 16px */
}

.text-xl {
  font-size: 1.25rem;
  /* 20px */
  line-height: 1.75rem;
  /* 28px */
}

.gap-8 {
  gap: 2rem;
  /* 32px */
}

.sm\:grid-cols-2 {
  /* For screens >= 640px */
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.lg\:grid-cols-4 {
  /* For screens >= 1024px */
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.relative {
  position: relative;
}


.rounded-xl {
  border-radius: 0.75rem;
  /* 12px */
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:-translate-y-1:hover {
  --tw-translate-y: -0.25rem;
  /* -4px */
}

.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.border-2 {
  border-width: 2px;
}

.border-indigo-600 {
  border-color: #4f46e5;
}

.border {
  border-width: 1px;
}

.golden-tag,
.popular-tag {
  top: 0;
  right: 0;
  margin-top: -1rem;
  /* -16px */
  margin-right: -1rem;
  /* -16px */
  font-size: 0.75rem;
  /* 12px */
  font-weight: 600;
  padding-left: 0.75rem;
  /* 12px */
  padding-right: 0.75rem;
  /* 12px */
  padding-top: 0.25rem;
  /* 4px */
  padding-bottom: 0.25rem;
  /* 4px */
  border-radius: 9999px;
  /* full */
  text-transform: uppercase;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.p-8 {
  padding: 2rem;
  /* 32px */
}



.mt-6 {
  margin-top: 1.5rem;
  /* 24px */
}

.text-5xl {
  font-size: 3rem;
  /* 48px */
  line-height: 1;
}

.ml-1 {
  margin-left: 0.25rem;
  /* 4px */
}

.block {
  display: block;
}

.w-full {
  width: 100%;
}

.py-3 {
  padding-top: 0.75rem;
  /* 12px */
  padding-bottom: 0.75rem;
  /* 12px */
}

.px-6 {
  padding-left: 1.5rem;
  /* 24px */
  padding-right: 1.5rem;
  /* 24px */
}

.rounded-md {
  border-radius: 0.375rem;
  /* 6px */
}

.font-medium {
  font-weight: 500;
}

.popular-button {
  background-color: #4f46e5;
  color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.popular-button:hover {
  background-color: #4338ca;
  /* indigo-700 */
}

.standard-button {
  background-color: #e0e7ff;
  /* indigo-100 */
  color: #4f46e5;
  /* indigo-700 */
}

.standard-button:hover {
  background-color: #c7d2fe;
  /* indigo-200 */
}

.pt-6 {
  padding-top: 1.5rem;
  /* 24px */
}

.pb-8 {
  padding-bottom: 2rem;
  /* 32px */
}

.px-8 {
  padding-left: 2rem;
  /* 32px */
  padding-right: 2rem;
  /* 32px */
}

.rounded-b-xl {
  border-bottom-left-radius: 0.75rem;
  /* 12px */
  border-bottom-right-radius: 0.75rem;
  /* 12px */
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.space-y-4>*:not([hidden])~*:not([hidden]) {
  margin-top: 1rem;
  /* 16px */
}

.flex {
  display: flex;
}

.items-start {
  align-items: flex-start;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.text-green-500 {
  color: #22c55e;
}

.ml-3 {
  margin-left: 0.75rem;
  /* 12px */
}

.text-base {
  font-size: 1rem;
  /* 16px */
  line-height: 1.5rem;
  /* 24px */
}

/* Custom CSS for additional styling beyond Tailwind defaults */
.pricing-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.05);
}

.pricing-card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 20px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

/* Specific styling for the 'Most Popular' card to make it stand out more */
.popular-card {
  background-image: linear-gradient(to bottom right, var(--color-info), var(--color-dark));
}

.popular-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15), 0 30px 40px rgba(0, 0, 0, 0.15);
}
</style>
