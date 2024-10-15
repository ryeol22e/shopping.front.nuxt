<template>
  <QPage>
    <NuxtLayout name="display" title="OUTER" desc="외투">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/composition/display/ProductList.vue';

  const storeProduct = useStoreProduct();

  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Outer',
  });

  await storeProduct.setList('1357900002');
</script>
