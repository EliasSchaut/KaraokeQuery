<template>
  <nav
    class="border-second-200 flex items-center justify-between border-t px-4 sm:px-0 dark:border-white/10"
  >
    <div class="-mt-px flex w-0 flex-1">
      <button
        v-if="currentOffset > 0"
        class="text-second-500 hover:border-second-300 hover:text-second-700 dark:text-second-400 dark:hover:text-second-200 inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium dark:hover:border-white/20"
        @click="subOffset"
      >
        <ArrowLongLeftIcon
          class="text-second-400 dark:text-second-500 mr-3 size-5"
          aria-hidden="true"
        />
        {{ $t('home.list.previous') }}
      </button>
    </div>
    <div
      class="text-second-500 dark:text-second-400 -mt-px inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium md:hidden"
    >
      {{ currentOffset / limit + 1 }}/{{ Math.ceil(max_offset / limit) }}
    </div>
    <div class="hidden md:-mt-px md:flex">
      <button
        v-for="i in Array.from(
          { length: Math.min(Math.ceil(max_offset / limit), 10) },
          (_, i) => {
            if (i == 0) return 1;
            else if (i == 9) return Math.ceil(max_offset / limit);
            else if (currentOffset < 6 * limit) return i + 1;
            else if (currentOffset + 5 * limit > max_offset)
              return Math.ceil(max_offset / limit) - 10 + (i + 1);
            else return Math.floor(currentOffset / limit) + (i - 4);
          },
        )"
        :class="{
          'border-prime-500 text-prime-600 dark:border-prime-400 dark:text-prime-400':
            currentOffset === (i - 1) * limit,
          'text-second-500 hover:text-second-700 dark:text-second-400 dark:hover:border-white/20':
            !(currentOffset === (i - 1) * limit),
          'hover:border-second-300 dark:hover:text-second-200 inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium': true,
        }"
        @click="setOffset((i - 1) * limit)"
      >
        {{ i }}
      </button>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end">
      <button
        class="text-second-500 hover:border-second-300 hover:text-second-700 dark:text-second-400 dark:hover:text-second-200 inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium dark:hover:border-white/20"
        @click="addOffset"
        v-if="max_offset > currentOffset + limit"
      >
        {{ $t('home.list.next') }}
        <ArrowLongRightIcon
          class="text-second-400 dark:text-second-500 ml-3 size-5"
          aria-hidden="true"
        />
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid';
export default defineComponent({
  setup() {
    return {
      currentOffset: ref(0),
    };
  },
  props: {
    max_offset: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 1,
    },
  },
  components: { ArrowLongLeftIcon, ArrowLongRightIcon },
  emits: ['onOffsetChange'],
  methods: {
    setOffset(offset: number) {
      this.currentOffset = offset;
      this.emitOffset();
    },
    subOffset() {
      this.currentOffset -= this.limit;
      this.emitOffset();
    },
    addOffset() {
      this.currentOffset += this.limit;
      this.emitOffset();
    },
    emitOffset() {
      this.$emit('onOffsetChange', this.currentOffset);
    },
  },
});
</script>
