<template>
  <QPage>
    <NuxtLayout name="display" title="TOP" desc="상의">
      <ProductList />
    </NuxtLayout>
  </QPage>
</template>

<script setup lang="ts">
  import ProductList from '~/components/composition/display/ProductList.vue';

  const { setList } = useStoreProduct();

  definePageMeta({
    key: (route) => route.fullPath,
    name: 'Top',
  });

  await setList('1357900001');
</script>
