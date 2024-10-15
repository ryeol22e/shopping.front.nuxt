<template>
  <DisplayHeader :title="title" :desc="desc" />
  <slot />
</template>

<script setup lang="ts">
  import type { DisplayHeader } from '~/@types/global-type';

  const props = withDefaults(defineProps<DisplayHeader>(), {
    title: '',
    desc: '',
  });
</script>
