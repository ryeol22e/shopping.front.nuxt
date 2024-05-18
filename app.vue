<template>
  <NuxtLoadingIndicator color="green" />

  <NuxtLayout name="gnb">
    <QPageContainer>
      <NuxtPage :pageKey="(route) => route.fullPath" />
    </QPageContainer>
  </NuxtLayout>
</template>
