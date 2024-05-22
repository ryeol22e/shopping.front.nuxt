<template>
  <NuxtLayout name="gnb">
    <NuxtLoadingIndicator color="green" />

    <QPageContainer>
      <NuxtPage :page-key="(route) => route.fullPath" />
    </QPageContainer>
  </NuxtLayout>
</template>
