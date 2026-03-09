<template>
  <div class="flex flex-col gap-4">
    <div class="mx-4 flex flex-col gap-4">
      <Query @query="on_query" />
      <div class="flex flex-row flex-wrap gap-3">
        <BadgeButton
          v-for="genre in genres"
          @click="on_gerne_filter(genre)"
          :active="selectedGenre === genre"
          >{{ genre }}</BadgeButton
        >
      </div>
    </div>

    <div class="font-geist flex flex-col">
      <template v-for="track in result?.hits">
        <Track
          :track="track"
          class="even:bg-second-200 dark:even:bg-second-800 dark:odd:bg-second-900 odd:bg-second-100 not-first:border-t-second-300 dark:not-first:border-t-second-700 p-3 not-first:border-t"
        />
      </template>
      <Spinner
        v-if="searching"
        class="text-prime-500 mx-auto flex items-center justify-center"
      />
      <div v-else-if="!result?.hits?.length" class="text-center">
        No tracks found
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Spinner from '~/components/spinner.vue';

export default defineComponent({
  components: { Spinner },
  setup() {
    const { search, result } = useMeiliSearch('karaoke');

    const genres = ref<string[]>([]);
    search('', {
      facets: ['genre'],
      limit: 0,
    }).then(() => {
      const genreDistribution = result.value?.facetDistribution?.genre;
      if (genreDistribution) {
        genres.value = Object.keys(genreDistribution);
      }
    });

    return {
      search,
      result,
      genres,
      currentQuery: ref(''),
      selectedGenre: ref(''),
      searching: ref(false),
    };
  },
  methods: {
    async on_query(query: string) {
      this.currentQuery = query;
      this.searching = true;
      this.reset_search_results();
      await this.search(query, {
        facets: ['genre'],
      });
      const genreDistribution = this.result?.facetDistribution?.genre;
      if (genreDistribution) {
        this.genres = Object.keys(genreDistribution);
      }
      this.searching = false;
    },
    async on_gerne_filter(genre: string) {
      if (genre === this.selectedGenre) return this.reset_genre();
      this.selectedGenre = genre;
      this.searching = true;
      this.reset_search_results();
      await this.search(this.currentQuery, {
        filter: `genre = '${genre}'`,
      });
      this.searching = false;
    },
    reset_search_results() {
      if (this.result?.hits) this.result.hits = [];
    },
    reset_genre() {
      this.selectedGenre = '';
      this.on_query(this.currentQuery);
    },
  },
});
</script>
