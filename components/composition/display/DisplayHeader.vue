<template>
  <section>
    <h1>{{ title }}</h1>
    <p>{{ desc }}</p>
  </section>
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
