<template>
  <QPage>
    <NuxtLayout name="display" title="PROMOTION" desc="프로모션">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/composition/display/ProductList.vue';

  const storeProduct = useStoreProduct();

  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Promotion',
  });
</script>
