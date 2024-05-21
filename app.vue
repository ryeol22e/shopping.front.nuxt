<template>
  <NuxtLayout name="gnb">
    <NuxtLoadingIndicator color="green" />

    <QPageContainer>
      <NuxtPage :pageKey="(route) => route.fullPath" />
    </QPageContainer>
  </NuxtLayout>
</template>
