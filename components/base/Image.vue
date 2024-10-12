<template>
  <img ref="img" :loading="loading" :src="src" :alt="alt" />
</template>

<script setup lang="ts">
  import type { Attribute } from '~/@types/components-type';
  import noImageUrl from '~/assets/images/no-image.jpg';

  withDefaults(defineProps<Attribute>(), {
    src: '',
    alt: '',
    loading: 'eager',
  });

  const img = useTemplateRef('img');
  const imgErrorHandler = (event: Event) => {
    (event.target as HTMLImageElement).src = noImageUrl;
  };

  onMounted(() => {
    if (img.value) {
      img.value.src = img.value.src;
      img.value.addEventListener('error', imgErrorHandler);
    }
  });
</script>
