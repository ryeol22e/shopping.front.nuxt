<template>
  <QLayout>
    <Header />
    <slot />
    <Footer />
  </QLayout>
</template>

<script setup lang="ts">
  const { setHeaders } = useStoreCommon();

  await setHeaders({
    codeType: '10000',
    codeDepth: '1',
    useYn: 'Y',
  });
</script>
