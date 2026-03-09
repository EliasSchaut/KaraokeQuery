<template>
  <button
    :class="{
      'bg-second-300 dark:bg-second-700': active,
      'bg-second-50 dark:bg-second-900': !active,
      'text-second-700 inset-ring-second-700/10 hover:bg-second-200 dark:hover:bg-second-800 dark:text-second-400 dark:inset-ring-second-400/30 inline-flex items-center rounded-full px-3 py-2 font-medium inset-ring': true,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
