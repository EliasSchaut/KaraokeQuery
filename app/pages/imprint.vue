<template>
  <div class="mx-4 my-10 text-center">
      <p>{{ $t('imprint.declaration') }}</p><br>
      <p>{{ impressum.name }}</p>

      <p>
        <b>{{ $t('imprint.contact') }}:</b><br />
        {{ $t('imprint.email') }}: {{ impressum.email }}<br />
      </p>
  </div>
</template>

<script lang="ts">
import { IdentificationIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'privacy',
  methods: {
    IdentificationIcon,
  },
  data() {
    return {
      impressum: {
        name: 'Elias Lorenz Schaut',
        email: 'elias@schaut.dev',
      },
    };
  },
});
</script>
