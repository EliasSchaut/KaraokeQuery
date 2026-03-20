<template>
  <button
    class="rounded-md px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs transition-colors ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none"
    :class="
      showSuccess
        ? 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600 dark:bg-green-500 dark:hover:bg-green-400 dark:focus-visible:outline-green-500'
        : 'bg-prime-600 hover:bg-prime-500 focus-visible:outline-prime-600 dark:bg-prime-500 dark:hover:bg-prime-400 dark:focus-visible:outline-prime-500'
    "
    :disabled="loading || showSuccess"
  >
    <template v-if="showSuccess">
      <CheckCircleIcon class="size-4" />
    </template>
    <template v-else>
      <slot v-if="!loading" />
      <Spinner v-else class="size-4" />
    </template>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const showSuccess = ref(false);

watch(
  () => props.loading,
  (newVal, oldVal) => {
    if (oldVal && !newVal) {
      showSuccess.value = true;
      setTimeout(() => {
        showSuccess.value = false;
      }, 2000);
    }
  },
);
</script>
