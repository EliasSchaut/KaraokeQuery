<template>
  <div class="mx-4 flex flex-col gap-4">
    <Query @query="on_query" class="mb-6" />
  </div>
  <div class="flex flex-col">
    <template v-for="track in result?.hits">
      <Track
        :track="track"
        class="even:bg-second-200 odd:bg-second-100 not-first:border-t-second-300 p-3 not-first:border-t"
      />
    </template>
  </div>
  <div>{{ result }}</div>
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
