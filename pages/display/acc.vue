<template>
  <QPage>
    <NuxtLayout name="display" title="ACC" desc="악세사리">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/composition/display/ProductList.vue';

  import { useStoreProduct } from '@/stores/useStoreProduct';

  const storeProduct = useStoreProduct();

  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Acc',
  });

  await storeProduct.setList('1357900005');
</script>
