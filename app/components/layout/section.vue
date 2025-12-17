<template>
  <section class="py-24 sm:py-32">
    <div
      :class="{
        'mx-auto max-w-7xl': true,
        'px-6 lg:px-8': !no_padding,
      }"
    >
      <slot />
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps({
  no_padding: {
    type: Boolean,
    default: false,
  },
});
</script>
