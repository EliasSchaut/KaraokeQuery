<template>
  <a
    class="bg-prime-600 hover:bg-prime-500 focus-visible:outline-prime-600 dark:bg-prime-500 dark:hover:bg-prime-400 dark:focus-visible:outline-prime-500 rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none"
    :href="href"
    target="_blank"
  >
    <slot class="pointer-events-none" />
  </a>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
