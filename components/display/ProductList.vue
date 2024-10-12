<template>
  <div v-if="!isEmpty(getList as Array<any>)" class="row items-start q-gutter-md">
    <NuxtLink v-for="item of getList" :key="item.prdtNo" :to="`/product/${item.prdtNo}`">
      <QCard class="my-card">
        <Image :src="`${item.imagePath}/${item.imageName}`" :alt="item.prdtName" />

        <QCardSection>
          <div class="text-h6">{{ item.prdtName }}</div>
          <div class="text-subtitle2">판매가 : {{ insertComma(item.sellPrice) }}</div>
        </QCardSection>

        <QCardSection class="q-pt-none"> 구입하기 </QCardSection>
      </QCard>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  const { isEmpty, insertComma } = useUtils();
  const { getList } = storeToRefs(useStoreProduct());
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    color: black;
  }

  .my-card {
    width: 100%;
    max-width: 300px;
  }
</style>
