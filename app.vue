<template>
  <NuxtLayout name="gnb">
    <NuxtLoadingIndicator color="green" :height="5" />

    <QPageContainer>
      <NuxtPage :page-key="(route) => route.fullPath" />
    </QPageContainer>
  </NuxtLayout>
</template>
