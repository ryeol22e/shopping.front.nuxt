<template>
  <QPage>
    <NuxtLayout name="display" title="PANTS" desc="하의">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/display/ProductList.vue';

  const storeProduct = useStoreProduct();

  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Pants',
  });

  await storeProduct.setList('1357900003');
</script>
