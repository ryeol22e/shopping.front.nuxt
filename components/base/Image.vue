<template>
  <img :loading="loading" :src="src" :alt="alt" :onerror="`this.src='${noImageUrl}'`" />
</template>

<script setup lang="ts">
  import type { Attribute } from '~/@types/components-type';
  import noImageUrl from '~/assets/images/no-image.jpg';

  const props = withDefaults(defineProps<Attribute>(), {
    src: '',
    alt: '',
    loading: 'eager',
  });
</script>
