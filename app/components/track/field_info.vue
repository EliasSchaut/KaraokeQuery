<template>
  <div class="flex items-center gap-2 rounded-md bg-white p-2">
    <slot />
    <div>
      <h5 class="text-xs text-gray-500 dark:text-gray-400">
        {{ fkey }}
      </h5>
      <p class="mt-1 font-semibold text-gray-900 dark:text-white">
        {{ fval }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  fkey: {
    type: String,
    required: true,
  },
  fval: {
    type: String,
    required: true,
  },
});
</script>
