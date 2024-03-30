<template>
  <QPage>
    <h1>{{ prdtNo }}</h1>
  </QPage>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const prdtNo = ref(route.params.prdtNo);

  onMounted(() => {});
</script>
