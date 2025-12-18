<template>
  <form class="flex" @submit.prevent="on_form_submit">
    <div class="-mr-px grid grow grid-cols-1 focus-within:relative">
      <input
        type="text"
        name="query"
        id="query"
        class="text-second-900 outline-second-300 placeholder:text-second-400 focus:outline-prime-600 dark:outline-second-700 dark:placeholder:text-second-500 dark:focus:outline-prime-500 col-start-1 row-start-1 block w-full rounded-l-full bg-white py-1.5 pr-3 pl-10 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:pl-9 sm:text-sm/6 dark:bg-white/5 dark:text-white"
        :placeholder="`${$t('common.query')} ...`"
      />
      <MagnifyingGlassIcon
        class="text-second-400 dark:text-second-500 pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center sm:size-4"
        aria-hidden="true"
      />
    </div>
    <button
      type="submit"
      class="text-second-900 outline-second-300 hover:bg-second-50 focus:outline-prime-600 dark:outline-second-700 dark:focus:outline-prime-500 flex shrink-0 items-center gap-x-1.5 rounded-r-full bg-white px-3 py-2 text-sm font-semibold outline-1 -outline-offset-1 focus:relative focus:outline-2 focus:-outline-offset-2 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
    >
      {{ $t('common.search') }}
    </button>
  </form>
</template>

<script lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
  components: { MagnifyingGlassIcon },
  emits: ['query'],
  methods: {
    on_form_submit(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const query = form_data.get('query');
      this.$emit('query', query);
    },
  },
});
</script>
