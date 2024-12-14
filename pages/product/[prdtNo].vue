<template>
  <QPage class="absolute-center">
    <h1>{{ detail.prdtName }}</h1>
    <p>{{ prdtNo }}</p>
    <div>
      <span>판매가 : {{ insertComma(parseInt(detail.sellPrice)) }}원</span>
    </div>
  </QPage>
</template>

<script setup lang="ts">
  const route = useRoute();
  const storeProduct = useStoreProduct();
  const prdtNo = ref<string>(route.params.prdtNo as string);
  const detail = computed(() => storeProduct.getDetail);

  onMounted(() => {});

  await storeProduct.setDetail(prdtNo.value);
</script>
