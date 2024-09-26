export const useStoreMain = defineStore('useStoreMain', () => {
  const { getFetch } = useAppFetch();

  const bannerList = ref<Array<any>>([]);

  const setBannerList = async (param: any): Promise<void> => {
    await getFetch('/display/main/banner', param)
      .then((res: any) => (bannerList.value = res.data))
      .catch((error) => console.log(error));
  };
  return {
    getBannerList: computed(() => bannerList.value),
    setBannerList,
  };
});
