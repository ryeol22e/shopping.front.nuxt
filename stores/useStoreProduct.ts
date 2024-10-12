import type { KeyObject } from '~/@types/global-type';

export const useStoreProduct = defineStore('useStoreProduct', () => {
  const { getFetch } = useAppFetch();

  const list = ref<Array<any>>([]);
  const detail = ref<KeyObject>({});
  const cateList = ref<Array<any>>([]);
  const saveProductResult = ref<boolean>(false);

  const setList = async (cateNo: string): Promise<void> => {
    list.value = await getFetch<Array<any>>('/display/product/list', {
      cateNo,
      useYn: 'Y',
      dispYn: 'Y',
    }).catch(() => []);
  };
  const setDetail = async (prdtNo: string): Promise<void> => {
    detail.value = await getFetch<any>(`/product/${prdtNo}`).catch(() => {});
  };
  const setCateList = async (param: any): Promise<void> => {
    cateList.value = await getFetch<any>(`/cate/list`, param).catch(() => {});
  };
  const setProductData = async (param: FormData): Promise<void> => {
    const prdtNo = param.get('prdtNo');
    saveProductResult.value = await getFetch<boolean>(`/product/${prdtNo}`, param).catch(() => false);
  };

  return {
    getList: computed(() => list.value),
    getDetail: computed(() => detail.value),
    getCateList: computed(() => cateList.value),
    getPrdtResult: computed(() => saveProductResult.value),
    setList,
    setDetail,
    setCateList,
    setProductData,
  };
});
