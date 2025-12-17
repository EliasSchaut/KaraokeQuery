<template>
  <div class="mx-4 my-10 flex flex-row justify-center">
    <Faq
        :faqs="[
          {
            question: $t('privacy.data.title'),
            answer: $t('privacy.data.body'),
          },
          {
            question: $t('privacy.cookies.title'),
            answer: $t('privacy.cookies.body'),
          },
          {
            question: $t('privacy.rights.title'),
            answer: $t('privacy.rights.body'),
          },
        ]"
    />
  </div>
</template>
