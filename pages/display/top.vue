<template>
  <QPage>
    <NuxtLayout name="display" title="TOP" desc="상의">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/display/ProductList.vue';

  const storeProduct = useStoreProduct();

  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Top',
  });

  await storeProduct.setList('1357900001');
</script>
