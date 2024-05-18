<template>
  <div v-if="!isEmpty(list as Array<any>)" class="q-pa-md row items-start q-gutter-md">
    <NuxtLink v-for="item of list" :key="item.prdtNo" :to="`/product/${item.prdtNo}`">
      <QCard class="my-card">
        <img :src="`${item.imagePath}/${item.imageName}`" :alt="item.prdtName" @error="noImage($event as Event)" />

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
  const storeProduct = useStoreProduct();

  const list = computed(() => storeProduct.getList);
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
  }

  .my-card {
    width: 100%;
    max-width: 300px;
  }
</style>
