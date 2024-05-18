<template>
  <template v-if="isLoading">
    <main :style="`height:${sceenHeight}px;`"></main>
    <div class="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
      <div class="spinner-border" role="status" style="width: 3rem; height: 3rem">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  const storeVar = useStoreVariable();
  const sceenHeight = ref(0);
  const isLoading = computed(() => storeVar.isLoading);
  onBeforeMount(() => {
    sceenHeight.value = screen.height;
  });
</script>
