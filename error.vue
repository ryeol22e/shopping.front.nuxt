<template>
  <QLayout>
    <NuxtLayout name="gnb">
      <QPageContainer>
        <QPage>
          <KeepAlive>
            <component :is="template" :key="code" />
          </KeepAlive>
        </QPage>
      </QPageContainer>
    </NuxtLayout>
  </QLayout>
</template>

<script setup lang="ts">
  import NotFound from '~/components/error/NotFound.vue';
  import ServerError from '~/components/error/ServerError.vue';

  const error = useError();
  const code = error.value?.statusCode;
  const template = shallowRef(NotFound);

  switch (code) {
    case 404:
      template.value = NotFound;
      break;
    case 500:
      template.value = ServerError;
      break;
    default:
      break;
  }
</script>
