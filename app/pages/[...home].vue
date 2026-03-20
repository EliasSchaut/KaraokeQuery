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
          :track="track as TrackType"
          @queueSongRequested="on_queue_song_requested"
          class="even:bg-second-200 dark:even:bg-second-800 dark:odd:bg-second-900 odd:bg-second-100 not-first:border-t-second-300 dark:not-first:border-t-second-700 p-3 not-first:border-t"
        />
      </template>
      <Pagination
        class="mx-4"
        :max_offset="result?.estimatedTotalHits ?? 0"
        :limit="result?.limit ?? 1"
        v-if="result?.hits?.length"
        @onOffsetChange="on_offset_change"
      />
      <Spinner
        v-if="searching"
        class="text-prime-500 mx-auto flex items-center justify-center"
      />
      <div v-else-if="!result?.hits?.length" class="text-center">
        No tracks found
      </div>
    </div>
  </div>
  <Modal ref="modal">
    <div>
      <div
        class="bg-prime-100 dark:bg-prime-500/10 mx-auto flex size-12 items-center justify-center rounded-full"
      >
        <UserCircleIcon
          class="text-prime-600 dark:text-prime-400 size-6"
          aria-hidden="true"
        />
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <DialogTitle
          as="h3"
          class="text-second-900 text-base font-semibold dark:text-white"
          >Set Your Name</DialogTitle
        >
        <form class="mt-2" @submit.prevent="on_username_submit">
          <p class="text-second-500 dark:text-second-400 text-sm">
            Please enter your name to be able to queue songs.
          </p>
          <input
            id="username"
            type="text"
            name="username"
            class="my-3 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            minlength="3"
            placeholder="Your beautiful name"
            required
          />
          <button
            type="submit"
            class="bg-prime-600 hover:bg-prime-500 focus-visible:outline-prime-600 dark:bg-prime-500 dark:hover:bg-prime-400 dark:focus-visible:outline-prime-500 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 dark:shadow-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { userStore } from '~/store/user';
import Spinner from '~/components/spinner.vue';
import Pagination from '~/components/pagination.vue';
import { UserCircleIcon } from '@heroicons/vue/24/outline';
import { DialogTitle } from '@headlessui/vue';
import Modal from '~/components/modal.vue';

export default defineComponent({
  components: { DialogTitle, UserCircleIcon, Pagination, Spinner, Modal },
  setup() {
    const user = userStore();
    const { use_queue, default_username } = useRuntimeConfig().public;
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
      use_queue,
      default_username,
      user,
      search,
      result,
      genres,
      currentQuery: ref(''),
      selectedGenre: ref(''),
      searching: ref(false),
    };
  },
  mounted() {
    if (this.use_queue && this.user.username === this.default_username) {
      this.show_new_user_modal();
    }
  },
  computed: {
    modal(): InstanceType<typeof Modal> {
      return this.$refs.modal as InstanceType<typeof Modal>;
    },
  },
  methods: {
    async show_new_user_modal() {
      this.modal.open();
    },
    async on_username_submit(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const username = String(form_data.get('username'));
      this.user.setName(username);
      this.modal.close();
    },
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
    async on_offset_change(offset: number) {
      this.searching = true;
      await this.search(this.currentQuery, {
        offset,
        filter: this.selectedGenre ? `genre = '${this.selectedGenre}'` : '',
      });
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
    async on_queue_song_requested(track: TrackType) {},
  },
});
</script>
