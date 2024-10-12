import type { CommonField } from '~/@types/global-type';

export const useStoreCommon = defineStore('useStoreCommon', () => {
  const { getFetch } = useAppFetch();
  const headers = ref<CommonField[]>([]);
  const adminLnb = ref([]);
  const mypageList = ref([]);

  const setHeaders = async (params: any): Promise<void> => {
    headers.value = await getFetch<CommonField[]>('/common/10000', params);
  };
  const setAdminLnb = async (params: any): Promise<void> => {
    adminLnb.value = await getFetch('/admin/menu', params);
  };
  const setMypageList = async (): Promise<void> => {
    mypageList.value = await getFetch('/common/10002', {
      codeType: '10002',
      codeDepth: '1',
      useYn: 'Y',
    });
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
