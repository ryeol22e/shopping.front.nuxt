<template>
  <QLayout>
    <Header />
    <slot />
    <Footer />
    <Loading />
  </QLayout>
</template>

<script setup lang="ts">
  const storeCommon = useStoreCommon();

  await storeCommon.setHeaders({
    codeType: '10000',
    codeDepth: '1',
    useYn: 'Y',
  });
</script>
