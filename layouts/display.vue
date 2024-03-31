<template>
  <DisplayHeader :title="title" :desc="desc" />
  <slot />
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
  });
</script>
