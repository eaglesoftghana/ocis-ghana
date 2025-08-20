<script setup>

const props = defineProps({
  tiers: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.map(tier =>
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
    <h6 class="pt-4 text-base">
      Find the perfect plan for your church's needs. No hidden fees, just clear value.
    </h6>
    <p class="my-6 text-center p-5 rounded-2 border border-gray-300" style=" 
    background: linear-gradient(to bottom right, #eff6ff, #e0e7ff)">
      All paid plans include two months free! (Pay for 10 months, get 12)
    </p>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div v-for="tier in tiers" :key="tier.name" :class="[
        'pricing-card relative rounded-xl shadow-lg transform transition duration-300 ease-in-out border border-gray-400 dark:border-gray-700',
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
            <h6 v-if="tier.period" class="ml-1 text-xl font-semibold">{{ tier.period }}</h6>
          </p>
          <a :href="tier.buttonLink" :title="tier.buttonTextTitle" :class="[
            'button mt-8 block py-3  transition duration-200 ease-in-out',
            tier.isPopular ? 'success' : 'primary', tier.isEnterprise ? 'info' : ''
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
  color: var(--color-light);
}

/* Base styles derived from Tailwind defaults */
.py-12 {
  padding-top: 3rem;
  /* 48px */
  padding-bottom: 3rem;
  /* 48px */
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

.golden-tag,
.popular-tag {
  top: 0;
  right: 0;
  margin-top: -1rem;
  /* -16px */
  margin-right: auto;
  margin-left: auto;
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

.block {
  display: block;
}

.w-full {
  width: 100%;
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


.flex-shrink-0 {
  flex-shrink: 0;
}

.text-green-500 {
  color: #22c55e;
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
  background-image: linear-gradient(to bottom right, var(--color-info-text), var(--color-dark));
  color: var(--color-light);
}

.popular-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15), 0 30px 40px rgba(0, 0, 0, 0.15);
}
</style>
