<template>
  <div class="flex w-full">
    <div class="mr-4 shrink-0 self-center">
      <img
        width="60"
        height="60"
        :src="track.cover_url"
        :alt="`${track.title} cover`"
      />
    </div>
    <div>
      <h4 class="text-lg font-bold text-gray-900 dark:text-white">
        {{ track.title }}
      </h4>
      <p class="mt-1 text-gray-500 dark:text-gray-400">
        {{ track.artist }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrackType } from '#shared/types/track';

defineProps({
  track: {
    type: TrackType,
    required: true,
  },
});
</script>
