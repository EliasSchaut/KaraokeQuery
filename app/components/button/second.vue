<template>
  <a
    class="text-second-900 inset-ring-second-300 hover:bg-second-50 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-xs inset-ring dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
    :href="href"
    target="_blank"
  >
    <slot />
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
