<template>
  <QPage>
    <QCarousel
      v-if="!isEmpty(bannerList)"
      arrows
      animated
      infinite
      v-model="slide"
      :autoplay="true"
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <QCarouselSlide
        v-for="(item, index) of bannerList"
        :key="index"
        :name="index"
        :img-src="`${item.imagePath}/${item.imageName}`"
      >
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">{{ item.title }}</div>
          <div class="text-subtitle1">{{ item.description }}</div>
        </div>
      </QCarouselSlide>
    </QCarousel>

    <div class="q-pa-md row items-start q-gutter-md">
      <QCard v-for="index of 10" :key="index" class="my-card">
        <Image src="https://cdn.quasar.dev/img/mountains.jpg" alt="img" />

        <QCardSection>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </QCardSection>

        <QCardSection class="q-pt-none"> hello </QCardSection>
      </QCard>
    </div>
  </QPage>
</template>

<script setup lang="ts">
  const { isEmpty } = useUtils();
  const slide = ref(0);
  const storeMain = useStoreMain();
  const bannerList = computed(() => storeMain.getBannerList);

  definePageMeta({
    key: (route) => route.fullPath,
  });

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
