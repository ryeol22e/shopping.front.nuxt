import type { CommonField } from '~/@types/global-type';

export const useStoreCommon = defineStore('useStoreCommon', () => {
  const { getFetch } = useAppFetch();
  const headers = ref<CommonField[]>([]);
  const adminLnb = ref([]);
  const mypageList = ref([]);

  const getHeaders = computed(() => headers.value);
  const getAdminLnb = computed(() => adminLnb.value);
  const getMypageList = computed(() => mypageList.value);

  const setHeaders = async (params: any): Promise<void> => {
    await getFetch<CommonField[]>('/common/10000', params)
      .then((res: CommonField[]) => {
        headers.value = res;
      })
      .catch((error) => console.log(error));
  };
  const setAdminLnb = async (params: any): Promise<void> => {
    await getFetch('/admin/menu', params)
      .then((res: any) => (adminLnb.value = res.data))
      .catch((error) => console.log(error));
  };
  const setMypageList = async (): Promise<void> => {
    await getFetch('/common/10002', {
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
