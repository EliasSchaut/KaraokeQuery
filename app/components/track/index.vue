<template>
  <div class="flex flex-col gap-y-3">
    <div
      class="flex w-full items-center justify-between gap-3"
      @click="is_open = !is_open"
    >
      <div class="shrink-0">
        <img
          width="60"
          height="60"
          :src="track.cover_url"
          :alt="`${track.title} cover`"
        />
      </div>
      <div class="flex-1">
        <h4 class="text-lg font-bold text-gray-900 dark:text-white">
          {{ track.title }}
        </h4>
        <p class="mt-1 text-gray-500 dark:text-gray-400">
          {{ track.artist }}
        </p>
      </div>
      <div class="shrink-0">
        <ChevronLeftIcon
          class="size-6 text-gray-400 transition-transform duration-100"
          :class="{ '-rotate-90': is_open }"
        />
      </div>
    </div>
    <div v-if="is_open" class="flex flex-col gap-3">
      <div class="flex justify-end gap-2">
        <BadgeGold v-if="track.golden_notes" class="flex items-center gap-2">
          <SparklesIcon class="h-4 w-4" />
          <span>{{ $t('home.track.golden') }}</span>
        </BadgeGold>
        <BadgePrime v-if="track.duet">Duett</BadgePrime>
        <BadgePrime>{{ track.year }}</BadgePrime>
      </div>
      <div class="flex flex-col gap-2">
        <TrackFieldInfo
          v-if="track.genre"
          :fkey="$t('home.track.genre')"
          :fval="track.genre"
        >
          <MusicalNoteIcon
            class="text-second-700 dark:text-second-300 size-6"
          />
        </TrackFieldInfo>
        <TrackFieldInfo
          v-if="track.language"
          :fkey="$t('home.track.language')"
          :fval="track.language"
        >
          <GlobeAltIcon class="text-second-700 dark:text-second-300 size-6" />
        </TrackFieldInfo>
        <TrackFieldInfo
          v-if="track.edition"
          :fkey="$t('home.track.edition')"
          :fval="track.edition"
        >
          <RectangleGroupIcon
            class="text-second-700 dark:text-second-300 size-6"
          />
        </TrackFieldInfo>
        <TrackFieldInfo
          v-if="track.tags"
          :fkey="$t('home.track.tags')"
          :fval="track.tags"
        >
          <TagIcon class="text-second-700 dark:text-second-300 size-6" />
        </TrackFieldInfo>
      </div>
      <div class="flex justify-center gap-2">
        <ButtonPrime
          v-if="track.audio_url"
          :href="track.audio_url"
          class="flex items-center justify-center gap-2"
        >
          <PlayIcon class="size-6" />
          <span>{{ $t('home.track.play') }}</span>
        </ButtonPrime>
        <ButtonPrime
          v-if="track.video_url"
          :href="track.video_url"
          class="flex items-center justify-center gap-2"
        >
          <VideoCameraIcon class="size-6" />
          <span>{{ $t('home.track.watch') }}</span>
        </ButtonPrime>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrackType } from '#shared/types/track';
import {
  ChevronLeftIcon,
  PlayIcon,
  VideoCameraIcon,
  SparklesIcon,
} from '@heroicons/vue/24/solid';

import {
  MusicalNoteIcon,
  GlobeAltIcon,
  RectangleGroupIcon,
  TagIcon,
} from '@heroicons/vue/24/outline';

defineProps({
  track: {
    type: TrackType,
    required: true,
  },
});

const is_open = ref(false);
</script>
