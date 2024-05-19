<template>
  <DisplayHeader :title="title" :desc="desc" />
  <slot />
</template>

<script setup lang="ts">
  interface DisplayHeader {
    title?: string;
    desc?: string;
  }
  const props = withDefaults(defineProps<DisplayHeader>(), {
    title: '',
    desc: '',
  });
</script>
