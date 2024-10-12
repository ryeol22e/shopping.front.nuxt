<template>
  <QPage>
    <NuxtLayout name="display" title="TOP" desc="상의">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/display/ProductList.vue';

  const { setList } = useStoreProduct();
  const nuxtApp = useNuxtApp();
  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Top',
  });

  onMounted(async () => {
    await setList('1357900001');
  });
</script>
