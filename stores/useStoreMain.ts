export const useStoreMain = defineStore('useStoreMain', () => {
  const { get } = useSetupFetch();
  const {} = useRunFetch();

  const bannerList = ref<Array<any>>([]);

  const setBannerList = async (param: any): Promise<void> => {
    await get('/display/main/banner', param)
      .then((res: any) => (bannerList.value = res.data))
      .catch((error) => console.log(error));
  };
  return {
    getBannerList: computed(() => bannerList.value),
    setBannerList,
  };
});
