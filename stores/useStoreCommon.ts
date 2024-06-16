export const useStoreCommon = defineStore('useStoreCommon', () => {
  const { setupGet } = useSetupFetch();

  const headers = ref([]);
  const adminLnb = ref([]);
  const mypageList = ref([]);

  const getHeaders = computed(() => headers.value);
  const getAdminLnb = computed(() => adminLnb.value);
  const getMypageList = computed(() => mypageList.value);

  const setHeaders = async (params: any): Promise<void> => {
    await setupGet('/common/10000', params)
      .then((res: any) => (headers.value = res.data))
      .catch((error) => console.log(error));
  };
  const setAdminLnb = async (params: any): Promise<void> => {
    await setupGet('/admin/menu', params)
      .then((res: any) => (adminLnb.value = res.data))
      .catch((error) => console.log(error));
  };
  const setMypageList = async (): Promise<void> => {
    await setupGet('/common/10002', {
      codeType: '10002',
      codeDepth: '1',
      useYn: 'Y',
    })
      .then((res: any) => (mypageList.value = res.data))
      .catch((error) => console.log(error));
  };

  return {
    getHeaders,
    getAdminLnb,
    getMypageList,
    setHeaders,
    setAdminLnb,
    setMypageList,
  };
});
