import type { CommonField } from '~/@types/global-type';

export const useStoreCommon = defineStore('useStoreCommon', () => {
  const { getFetch } = useAppFetch();
  const headers = ref<Array<CommonField>>([]);
  const adminLnb = ref([]);
  const mypageList = ref<Array<CommonField>>([]);

  const setHeaders = async (params: any): Promise<void> => {
    headers.value = await getFetch<Array<CommonField>>('/common/10000', params).catch(() => []);
  };
  const setAdminLnb = async (params: any): Promise<void> => {
    adminLnb.value = await getFetch('/admin/menu', params);
  };
  const setMypageList = async (): Promise<void> => {
    mypageList.value = await getFetch<Array<CommonField>>('/common/10002', {
      codeType: '10002',
      codeDepth: '1',
      useYn: 'Y',
    }).catch(() => []);
  };

  return {
    getHeaders: computed(() => headers.value),
    getAdminLnb: computed(() => adminLnb.value),
    getMypageList: computed(() => mypageList.value),
    setHeaders,
    setAdminLnb,
    setMypageList,
  };
});
