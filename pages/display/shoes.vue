<template>
  <QPage>
    <NuxtLayout name="display" title="SHOES" desc="신발">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/display/ProductList.vue';

  const storeProduct = useStoreProduct();

  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Shoes',
  });

  await storeProduct.setList('1357900004');
</script>
