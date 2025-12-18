<template>
  <div class="mx-4 flex flex-col gap-4">
    <Query @query="on_query" class="mb-6" />
  </div>
  <div class="font-geist flex flex-col">
    <template v-for="track in result?.hits">
      <Track
        :track="track"
        class="even:bg-second-200 dark:even:bg-second-800 dark:odd:bg-second-900 odd:bg-second-100 not-first:border-t-second-300 dark:not-first:border-t-second-700 p-3 not-first:border-t"
      />
    </template>
    <div v-if="!result?.hits?.length" class="text-center">No tracks found</div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const { search, result } = useMeiliSearch('karaoke');

    return {
      search,
      result,
    };
  },
  methods: {
    async on_query(query: string) {
      await this.search(query);
    },
  },
});
</script>
