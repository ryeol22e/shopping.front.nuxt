export const useStoreMain = defineStore('useStoreMain', () => {
  const { getFetch } = useAppFetch();

  const bannerList = ref<Array<any>>([]);

  const setBannerList = async (param: any): Promise<void> => {
    bannerList.value = await getFetch<any[]>('/display/main/banner', param).catch(() => []);
  };
  return {
    getBannerList: computed(() => bannerList.value),
    setBannerList,
  };
});
