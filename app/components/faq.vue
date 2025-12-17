<template>
  <div class="bg-white dark:bg-second-900 rounded-md">
    <div class="mx-auto px-6 pb-6">
      <div class="mx-auto divide-y divide-second-900/10 dark:divide-white/10">
        <dl
          class="space-y-6 divide-y divide-second-900/10 dark:divide-white/10"
        >
          <Disclosure
            as="div"
            v-for="faq in faqs"
            :key="faq.question"
            class="pt-6"
            v-slot="{ open }"
          >
            <dt>
              <DisclosureButton
                class="flex w-full items-start justify-between text-left text-second-900 dark:text-white"
              >
                <span class="text-base font-semibold leading-7">{{
                  faq.question
                }}</span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusIcon
                    v-if="!open"
                    class="h-6 w-6"
                    aria-hidden="true"
                  />
                  <MinusIcon v-else class="h-6 w-6" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" class="mt-2 pr-12">
              <p
                class="text-base leading-7 text-second-600 dark:text-second-300"
              >
                {{ faq.answer }}
              </p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'faq',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MinusIcon,
    PlusIcon,
  },
  props: {
    faqs: {
      type: Array<{ question: string; answer: string }>,
      required: true,
    },
  },
});
</script>
