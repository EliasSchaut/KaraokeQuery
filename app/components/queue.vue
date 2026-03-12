<template>
  <Disclosure v-if="use_queue">
    <DisclosureButton></DisclosureButton>
    <DisclosurePanel></DisclosurePanel>
  </Disclosure>
</template>

<script lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
export default defineComponent({
  components: { Disclosure, DisclosureButton, DisclosurePanel },
  setup() {
    const { use_queue } = useRuntimeConfig().public;
    const queue: Ref<QueueType[]> = ref([]);

    if (use_queue) {
      useFetch(() => '/api/queue/tracks').then((data: QueueType[]) => {
        queue.value = data;
      });
    }

    return {
      use_queue,
      queue,
    };
  },
});
</script>
