<template>
  <img :loading="loading" :src="src" :alt="alt" :onerror="`this.src='${noImageUrl}'`" />
</template>

<script setup lang="ts">
  import noImageUrl from '~/assets/images/no-image.jpg';

  interface Attribute {
    src: string;
    alt: string;
    loading: 'eager' | 'lazy' | undefined;
  }

  const props = withDefaults(defineProps<Attribute>(), {
    src: '',
    alt: '',
    loading: 'eager',
  });
</script>
