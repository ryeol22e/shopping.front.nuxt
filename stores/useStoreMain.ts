import type { BannerInfo } from '~/@types/business-type';

export const useStoreMain = defineStore('useStoreMain', () => {
  const { getFetch } = useAppFetch();

  const bannerList = ref<Array<BannerInfo>>([]);

  const setBannerList = async (param: object): Promise<void> => {
    bannerList.value = await getFetch<Array<BannerInfo>>('/display/main/banner', param).catch(() => []);
  };
  return {
    getBannerList: computed(() => bannerList.value),
    setBannerList,
  };
});
