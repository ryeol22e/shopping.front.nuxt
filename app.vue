<template>
  <NuxtLoadingIndicator />
  <NuxtLayout name="gnb">
    <QPageContainer>
      <NuxtPage :pageKey="(route) => route.fullPath" />
    </QPageContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
  const storeCommon = useStoreCommon();

  await storeCommon.setHeaders({
    codeType: '10000',
    codeDepth: '1',
    useYn: 'Y',
  });
</script>
