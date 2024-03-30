<template>
  <QPage>
    <QCarousel v-if="bannerList.length > 0" arrows animated infinite v-model="slide" :autoplay="true" transition-prev="slide-right" transition-next="slide-left">
      <QCarouselSlide v-for="(item, index) in bannerList" :key="index" :name="index" :img-src="`data:image/png;base64,${item.image}`">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">{{ item.title }}</div>
          <div class="text-subtitle1">{{ item.description }}</div>
        </div>
      </QCarouselSlide>
    </QCarousel>

    <div class="q-pa-md row items-start q-gutter-md">
      <QCard v-for="index in 10" :key="index" class="my-card">
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />

        <QCardSection>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </QCardSection>

        <QCardSection class="q-pt-none"> hello </QCardSection>
      </QCard>
    </div>
  </QPage>
</template>

<script lang="ts" setup>
  const { isEmpty } = useUtils();
  const slide = ref(0);
  const storeMain = useStoreMain();
  const bannerList = computed((): Array<any> => storeMain.getBannerList);

  definePageMeta({
    key: (route) => route.fullPath,
  });
  onMounted(() => {});

  await storeMain.setBannerList({
    bannerType: '10000',
    useYn: 'Y',
    dispYn: 'Y',
  });
</script>

<style lang="scss" scoped>
  .custom-caption {
    text-align: center;
    padding: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .my-card {
    width: 100%;
    max-width: 300px;
  }
</style>
