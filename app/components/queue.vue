<template>
  <div
    v-if="use_queue"
    class="fixed bottom-0 z-50 w-full border-t border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80"
  >
    <Disclosure v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex min-w-0 flex-1 items-center gap-3">
            <div
              class="bg-prime-100 text-prime-600 dark:bg-prime-500/10 dark:text-prime-400 flex size-10 shrink-0 items-center justify-center rounded-lg"
            >
              <QueueListIcon class="size-6" />
            </div>
            <div class="min-w-0 flex-1">
              <p
                v-if="queue.length > 0"
                class="truncate text-sm font-medium text-gray-900 dark:text-white"
              >
                <span class="font-bold">{{ queue[0]!.SongDto.Artist }}</span>
                — {{ queue[0]!.SongDto.Title }}
              </p>
              <p
                v-else
                class="text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                {{ $t('queue.empty') }}
              </p>
            </div>
          </div>

          <div class="ml-4 flex shrink-0 items-center gap-2">
            <BadgePrime v-if="queue.length > 0">
              {{ queue.length }}
            </BadgePrime>
            <DisclosureButton
              v-if="queue.length > 1"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <ChevronLeftIcon
                class="size-6 transition-transform duration-200"
                :class="{ '-rotate-90': open }"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-800">
          <li
            v-for="(item, index) in queue.slice(1)"
            :key="index"
            class="flex items-center justify-between py-3"
          >
            <div class="flex min-w-0 flex-1 items-center gap-3">
              <span class="text-xs font-bold text-gray-400 dark:text-gray-500">
                #{{ index + 2 }}
              </span>
              <p class="truncate text-sm text-gray-600 dark:text-gray-300">
                <span class="font-semibold">{{ item.SongDto.Artist }}</span>
                — {{ item.SongDto.Title }}
              </p>
            </div>
          </li>
        </ul>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { QueueListIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline';

const { use_queue } = useRuntimeConfig().public;
const queue = ref<QueueType[]>([]);

const fetchQueue = async () => {
  if (use_queue) {
    const data = await $fetch<QueueType[]>('/api/queue/tracks');
    if (data) {
      queue.value = data;
    }
  }
};

onMounted(() => {
  fetchQueue();
  if (use_queue) {
    const interval = setInterval(fetchQueue, 10000);
    onUnmounted(() => clearInterval(interval));
  }
});
</script>
